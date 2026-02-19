"use client";

import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

function ThankYouContent() {
    const searchParams = useSearchParams();
    // Expect productIds as comma-separated string, e.g. ?products=id1,id2
    const productIdsParam = searchParams.get("products");
    const { getProductById, products } = useProducts();
    const [purchasedProducts, setPurchasedProducts] = useState<any[]>([]);

    useEffect(() => {
        if (productIdsParam && products.length > 0) {
            const ids = productIdsParam.split(",");
            const foundProducts = ids.map(id => getProductById(id)).filter(Boolean);
            setPurchasedProducts(foundProducts);
        }
    }, [productIdsParam, products, getProductById]);

    return (
        <div className="bg-background-light dark:bg-background-dark text-charcoal dark:text-stone-200 font-display transition-colors duration-300 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-24 px-6 lg:px-20">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <div className="inline-block p-4 rounded-full bg-primary/20 text-primary mb-4">
                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-black italic text-charcoal dark:text-white">
                        Order Confirmed
                    </h1>
                    <p className="text-lg text-stone-500 max-w-xl mx-auto">
                        Thank you for your purchase! Your digital downloads are ready. You will also receive an email confirmation shortly.
                    </p>

                    <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-xl border border-border-gold/20 text-left mt-12">
                        <h2 className="text-xl font-bold dark:text-white mb-6 border-b border-stone-200 dark:border-stone-700 pb-4">
                            Your Downloads
                        </h2>
                        {purchasedProducts.length > 0 ? (
                            <div className="space-y-6">
                                {purchasedProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between gap-4 p-4 rounded-lg bg-stone-50 dark:bg-stone-900/50">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded overflow-hidden bg-stone-200">
                                                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold dark:text-white">{product.title}</h3>
                                                <p className="text-xs text-stone-500 uppercase tracking-widest">{product.type}</p>
                                            </div>
                                        </div>
                                        {product.fileUrl ? (
                                            <a
                                                href={product.fileUrl}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-primary text-charcoal font-bold py-2 px-4 rounded-lg hover:brightness-110 transition-all text-sm"
                                            >
                                                <span className="material-symbols-outlined text-lg">download</span>
                                                Download
                                            </a>
                                        ) : (
                                            <span className="text-xs text-stone-400 italic">Download unavailable</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-stone-500">Loading order details...</p>
                            </div>
                        )}
                    </div>

                    <div className="pt-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                            Return to Shop
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    );
}
