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
        return <div className="col-span-full text-center py-20 text-stone-500 italic">Preparing the collection...</div>;
    }

    if (categoryProducts.length === 0) {
        return (
            <div className="col-span-full text-center py-20 text-stone-500 italic border-2 border-dashed border-white/5 rounded-3xl">
                No products found in this collection yet.
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categoryProducts.map((product) => (
                    <div key={product.id} className="group flex flex-col h-full bg-stone-900/30 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
                        <Link href={`/product/${product.id}`} className="block relative overflow-hidden aspect-square bg-stone-800">
                            {/* "NEW" Badge */}
                            <div className="absolute top-4 left-4 z-20 bg-primary text-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                New
                            </div>

                            <FallbackImage
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt={product.title}
                                title={product.title}
                                src={product.images?.[0]}
                            />

                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-30">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart({
                                            id: product.id,
                                            title: product.title,
                                            price: product.price,
                                            img: product.images?.[0],
                                            type: product.type
                                        });
                                    }}
                                    className="w-12 h-12 bg-primary text-charcoal rounded-full hover:bg-white transition-colors flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-300"
                                    title="Add to Cart"
                                >
                                    <span className="material-symbols-outlined font-bold">add_shopping_cart</span>
                                </button>
                                <Link
                                    href={`/product/${product.id}`}
                                    className="w-12 h-12 bg-white text-charcoal rounded-full hover:bg-primary transition-colors flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                                    title="Quick View"
                                >
                                    <span className="material-symbols-outlined font-bold">visibility</span>
                                </Link>
                            </div>
                        </Link>

                        <div className="p-6 flex-grow flex flex-col justify-between space-y-3">
                            <div>
                                <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                    {product.title}
                                </h3>
                                <p className="text-stone-500 text-xs uppercase tracking-widest mt-1 font-medium">
                                    {product.type}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <span className="text-xl font-black text-primary italic">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-stone-600 line-through text-xs font-bold">
                                    ${(product.price * 1.42).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="col-span-full flex justify-center mt-16">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-12 py-4 rounded-full border border-primary/30 text-primary font-bold hover:bg-primary hover:text-charcoal hover:border-primary transition-all duration-300 disabled:opacity-50 uppercase tracking-widest text-xs shadow-lg"
                    >
                        {isLoadingMore ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin"></span>
                                Manifesting more...
                            </span>
                        ) : "Load More Treasures"}
                    </button>
                </div>
            )}
        </>
    );
}
