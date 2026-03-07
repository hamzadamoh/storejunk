"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import FallbackImage from "@/components/FallbackImage";

export default function NewArrivalsPage() {
    const { products, isLoading, hasMore, loadMore } = useProducts();
    const { addToCart } = useCart();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200 flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
                        <div>
                            <h1 className="font-serif text-5xl md:text-6xl font-black italic mb-4 text-charcoal dark:text-white">
                                New Arrivals
                            </h1>
                            <p className="text-stone-500 text-lg">Fresh from the studio. Digital downloads for instant creativity.</p>
                        </div>
                    </div>

                    {isLoading && products.length === 0 ? (
                        <div className="py-20 text-center text-stone-500 italic">
                            Setting the stage for new wonders...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="group space-y-4">
                                    <Link href={`/product/${product.id}`} className="block relative overflow-hidden rounded-xl bg-white dark:bg-stone-800 shadow-xl aspect-square">
                                        <div className="absolute top-3 left-3 z-10 bg-[#4a1c1c] text-[#f4ebd8] px-2 py-0.5 text-[10px] font-serif font-bold uppercase tracking-widest rounded-sm border border-black/20 shadow-lg">New</div>
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
                                                        img: product.images?.[0],
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
                                            <h3 className="font-bold text-lg dark:text-stone-200 line-clamp-1">
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
                    )}

                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={loadMore}
                                disabled={isLoading}
                                className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-charcoal transition-colors disabled:opacity-50"
                            >
                                {isLoading ? "Loading..." : "Load More Arrivals"}
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
