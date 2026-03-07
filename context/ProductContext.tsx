"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export type Product = {
    id: string;
    title: string;
    full_title?: string;
    price: number;
    type: string;
    images: string[];
    collectionId: string;
    description?: string;
    sku?: string;
    tags?: string[];
};

type ProductContextType = {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => Promise<void>;
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    getProductsByCollection: (collectionId: string, page?: number) => Promise<{ products: Product[], hasMore: boolean }>;
    getProductById: (id: string) => Promise<Product | undefined>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const PRODUCTS_PER_PAGE = 12;
const CACHE_KEY_PREFIX = "ts_products_cache_";
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = useCallback(async (pageIndex: number, isInitial: boolean = false) => {
        try {
            if (isInitial) setIsLoading(true);

            const start = pageIndex * PRODUCTS_PER_PAGE;
            const end = start + PRODUCTS_PER_PAGE - 1;

            const { data, error, count } = await supabase
                .from('products')
                .select('id, title, price, collection, type, images:images[1]', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(start, end);

            if (error) {
                throw error;
            }

            if (data) {
                const formattedProducts: Product[] = data.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    price: Number(p.price),
                    type: p.type,
                    images: p.images || [],
                    collectionId: p.collection,
                }));

                setProducts(prev => isInitial ? formattedProducts : [...prev, ...formattedProducts]);
                setHasMore(count ? start + PRODUCTS_PER_PAGE < count : false);
            }
        } catch (err: any) {
            console.error("Failed to fetch products from Supabase", err);
            setError(err.message || "Failed to load products");
        } finally {
            if (isInitial) setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(0, true);
    }, [fetchProducts]);

    const loadMore = async () => {
        if (!hasMore || isLoading) return;
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchProducts(nextPage, false);
    };

    const addProduct = async (product: Product) => {
        console.warn("addProduct not fully implemented for Supabase direct insert yet in this context");
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const getProductsByCollection = async (collectionId: string, pageIndex: number = 0): Promise<{ products: Product[], hasMore: boolean }> => {
        const cacheKey = `${CACHE_KEY_PREFIX}collection_${collectionId}_page_${pageIndex}`;

        // Check SessionStorage Cache
        if (typeof window !== 'undefined') {
            const cachedParams = sessionStorage.getItem(cacheKey);
            if (cachedParams) {
                const { timestamp, data, hasMore: cachedHasMore } = JSON.parse(cachedParams);
                if (Date.now() - timestamp < CACHE_DURATION_MS) {
                    return { products: data, hasMore: cachedHasMore };
                }
            }
        }

        try {
            const start = pageIndex * PRODUCTS_PER_PAGE;
            const end = start + PRODUCTS_PER_PAGE - 1;

            const { data, error, count } = await supabase
                .from('products')
                .select('id, title, price, collection, type, images:images[1]', { count: 'exact' })
                .eq('collection', collectionId)
                .order('created_at', { ascending: false })
                .range(start, end);

            if (error) throw error;

            const results = data.map((p: any) => ({
                id: p.id,
                title: p.title,
                price: Number(p.price),
                type: p.type,
                images: p.images || [],
                collectionId: p.collection,
            })) as Product[];

            const hasMoreResults = count ? start + PRODUCTS_PER_PAGE < count : false;

            // Save to Cache
            if (typeof window !== 'undefined') {
                sessionStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    data: results,
                    hasMore: hasMoreResults
                }));
            }

            return { products: results, hasMore: hasMoreResults };
        } catch (err) {
            console.error("Failed to fetch products by collection", err);
            return { products: [], hasMore: false };
        }
    };

    const getProductById = async (id: string) => {
        const cacheKey = `${CACHE_KEY_PREFIX}product_${id}`;

        // Check Cache
        if (typeof window !== 'undefined') {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                const { timestamp, data } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION_MS) {
                    return data as Product;
                }
            }
        }

        try {
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
            if (error) throw error;
            const product = {
                id: data.id,
                title: data.title,
                full_title: data.full_title,
                price: Number(data.price),
                type: data.type,
                images: data.images || [],
                collectionId: data.collection,
                description: data.description,
                sku: data.sku,
                tags: data.tags || []
            } as Product;

            // Save to Cache
            if (typeof window !== 'undefined') {
                sessionStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    data: product
                }));
            }

            return product;
        } catch (err) {
            console.error("Failed to fetch product by id", err);
            return undefined;
        }
    }

    return (
        <ProductContext.Provider value={{ products, isLoading, error, hasMore, loadMore, addProduct, deleteProduct, getProductsByCollection, getProductById }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
