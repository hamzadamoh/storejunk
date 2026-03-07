"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    getProductsByCollection: (collectionId: string) => Promise<Product[]>;
    getProductById: (id: string) => Promise<Product | undefined>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from('products')
                    .select('*');

                if (error) {
                    throw error;
                }

                if (data) {
                    const formattedProducts: Product[] = data.map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        full_title: p.full_title,
                        price: Number(p.price),
                        type: p.type,
                        images: p.images || [],
                        collectionId: p.collection,
                        description: p.description,
                        sku: p.sku,
                        tags: p.tags || []
                    }));
                    setProducts(formattedProducts);
                }
            } catch (err: any) {
                console.error("Failed to fetch products from Supabase", err);
                setError(err.message || "Failed to load products");
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const addProduct = async (product: Product) => {
        console.warn("addProduct not fully implemented for Supabase direct insert yet in this context");
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        // TODO: Add API Delete endpoint if needed
    };

    const getProductsByCollection = async (collectionId: string) => {
        try {
            const { data, error } = await supabase.from('products').select('*').eq('collection', collectionId);
            if (error) throw error;
            return data.map((p: any) => ({
                id: p.id,
                title: p.title,
                full_title: p.full_title,
                price: Number(p.price),
                type: p.type,
                images: p.images || [],
                collectionId: p.collection,
                description: p.description,
                sku: p.sku,
                tags: p.tags || []
            })) as Product[];
        } catch (err) {
            console.error("Failed to fetch products by collection", err);
            return [];
        }
    };

    const getProductById = async (id: string) => {
        try {
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
            if (error) throw error;
            return {
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
        } catch (err) {
            console.error("Failed to fetch product by id", err);
            return undefined;
        }
    }

    return (
        <ProductContext.Provider value={{ products, isLoading, error, addProduct, deleteProduct, getProductsByCollection, getProductById }}>
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
