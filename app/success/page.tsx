"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import FallbackImage from "@/components/FallbackImage";

function SuccessContent() {
    const searchParams = useSearchParams();
    const idsString = searchParams.get("ids");
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPurchasedProducts = async () => {
            if (!idsString) {
                setIsLoading(false);
                return;
            }

            const ids = idsString.split(",");
            try {
                const { data, error } = await supabase
                    .from("products")
                    .select("id, title, price, images, drive_url")
                    .in("id", ids);

                if (error) throw error;
                setProducts(data || []);
            } catch (err) {
                console.error("Failed to fetch purchased products", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPurchasedProducts();
    }, [idsString]);

    const totalPrice = products.reduce((sum, p) => sum + Number(p.price), 0);

    return (
        <main className="flex-grow px-6 py-24 relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            {/* Dark Gothic Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border-2 border-primary mb-6 animate-pulse">
                        <span className="material-symbols-outlined text-primary text-4xl font-bold">check_circle</span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-8xl font-black italic text-white drop-shadow-2xl">
                        Thank you for your order! 🖤
                    </h1>
                    <p className="text-stone-400 text-xl max-w-2xl mx-auto italic font-serif">
                        Your grimoire has been expanded. Your treasures are ready for download below.
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center py-20 text-stone-500 italic">Manifesting your downloads...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-stone-900/50 rounded-2xl border border-white/5 space-y-6">
                        <p className="text-stone-400">No products found in this order.</p>
                        <Link href="/shop" className="inline-block text-primary font-bold hover:underline">Return to Shop</Link>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Download List */}
                        <div className="bg-stone-950/80 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                            <h2 className="font-serif text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 italic">
                                Ready for Download
                            </h2>
                            <div className="space-y-8">
                                {products.map((product) => (
                                    <div key={product.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/5 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                                                <FallbackImage
                                                    src={product.images?.[0]}
                                                    alt={product.title}
                                                    title={product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-lg mb-1">{product.title}</h3>
                                                <p className="text-stone-500 text-sm">Digital Kit &middot; Instant Download</p>
                                            </div>
                                        </div>
                                        <a
                                            href={product.drive_url || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-8 py-3 bg-primary text-charcoal font-bold rounded-xl shadow-[0_0_20px_rgba(230,179,25,0.3)] hover:shadow-[0_0_30px_rgba(230,179,25,0.5)] transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
                                        >
                                            <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">cloud_download</span>
                                            Download Your Files
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Block */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-stone-900/30 p-8 rounded-2xl border border-white/5">
                            <div className="text-center md:text-left">
                                <p className="text-stone-500 text-sm uppercase tracking-widest font-bold mb-1">Order Summary</p>
                                <p className="text-white font-serif text-xl italic">{products.length} Items &middot; Total Paid: ${totalPrice.toFixed(2)}</p>
                            </div>
                            <Link
                                href="/"
                                className="px-10 py-4 border border-stone-700 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined">home</span>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <div className="bg-background-dark min-h-screen text-stone-200 flex flex-col transition-colors duration-300">
            <Navbar />
            <Suspense fallback={<div className="flex-grow flex items-center justify-center text-stone-500 italic">Synchronizing with destiny...</div>}>
                <SuccessContent />
            </Suspense>
            <Footer />
        </div>
    );
}
