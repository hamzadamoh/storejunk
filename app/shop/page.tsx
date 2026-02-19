"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
    const { products } = useProducts();
    const { addToCart } = useCart();

    return (
        <div className="bg-background-light dark:bg-background-dark text-charcoal dark:text-stone-200 font-display transition-colors duration-300 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <section className="py-24 px-6 lg:px-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12">
                            <h1 className="font-serif text-5xl md:text-6xl font-black italic mb-4 text-charcoal dark:text-white">
                                All Products
                            </h1>
                            <p className="text-stone-500 text-lg max-w-2xl">
                                Browse our complete collection of digital kits, textures, and ephemera for your creative journals.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="group space-y-4">
                                    <Link href={`/product/${product.id}`} className="block relative overflow-hidden rounded-xl bg-white dark:bg-stone-800 shadow-xl aspect-square">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            alt={product.title}
                                            src={product.images[0]}
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
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
