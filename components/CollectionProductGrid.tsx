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

    useEffect(() => {
        let isMounted = true;
        getProductsByCollection(slug).then((data) => {
            if (isMounted) {
                setCategoryProducts(data);
                setIsLoading(false);
            }
        });
        return () => { isMounted = false; };
    }, [slug, getProductsByCollection]);

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
        </>
    );
}
