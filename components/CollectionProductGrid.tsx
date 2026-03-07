"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useProducts, Product } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import FallbackImage from "@/components/FallbackImage";

export default function CollectionProductGrid({ slug }: { slug: string }) {
    const { getProductsByCollection } = useProducts();
    const { addToCart } = useCart();
    const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loadProducts = async (pageIndex: number, isInitial: boolean = false) => {
        if (isInitial) setIsLoading(true);
        else setIsLoadingMore(true);

        const data = await getProductsByCollection(slug, pageIndex);

        if (isInitial) {
            setCategoryProducts(data.products);
        } else {
            setCategoryProducts(prev => [...prev, ...data.products]);
        }

        setHasMore(data.hasMore);

        if (isInitial) setIsLoading(false);
        else setIsLoadingMore(false);
    };

    useEffect(() => {
        loadProducts(0, true);
        setPage(0);
    }, [slug, getProductsByCollection]);

    const handleLoadMore = () => {
        if (isLoadingMore || !hasMore) return;
        const nextPage = page + 1;
        setPage(nextPage);
        loadProducts(nextPage, false);
    };

    if (isLoading) {
        return <div className="col-span-full text-center py-20 text-stone-500">Loading products...</div>;
    }

    if (categoryProducts.length === 0) {
        return (
            <div className="col-span-full text-center py-20 text-stone-500 italic">
                No products found in this collection yet.
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categoryProducts.map((product) => (
                    <div key={product.id} className="group space-y-4">
                        <Link href={`/product/${product.id}`} className="block relative overflow-hidden rounded-xl bg-white dark:bg-stone-800 shadow-xl aspect-square">
                            <FallbackImage
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
                                alt={product.title}
                                title={product.title}
                                src={product.images?.[0]}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart({
                                            id: product.id,
                                            title: product.title,
                                            price: product.price,
                                            img: product.images[0],
                                            type: product.type
                                        });
                                    }}
                                    className="p-3 bg-primary text-charcoal rounded-full hover:bg-white transition-colors flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined">
                                        add_shopping_cart
                                    </span>
                                </button>
                                <Link href={`/product/${product.id}`} className="p-3 bg-white text-charcoal rounded-full hover:bg-primary transition-colors flex items-center justify-center">
                                    <span className="material-symbols-outlined">
                                        visibility
                                    </span>
                                </Link>
                            </div>
                        </Link>
                        <div>
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg dark:text-stone-200">
                                    {product.title}
                                </h3>
                                <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                            </div>
                            <p className="text-stone-500 text-sm">
                                {product.type}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="col-span-full flex justify-center mt-12">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-charcoal transition-colors disabled:opacity-50"
                    >
                        {isLoadingMore ? "Loading..." : "Load More Products"}
                    </button>
                </div>
            )}
        </>
    );
}
