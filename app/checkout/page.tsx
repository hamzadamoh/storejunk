"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cartItems, cartTotal } = useCart();
    const { products: allProducts } = useProducts();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const finalTotal = cartTotal;

    const handleCompletePurchase = () => {
        if (!email) {
            alert("Please enter your email address to continue.");
            return;
        }

        setIsProcessing(true);

        // Build the Polar.sh checkout URL
        const polarProductIds = cartItems.map(item => {
            // Find the product in allProducts to get the polar_product_id
            const product = allProducts.find(p => p.id === item.id);
            return product?.polar_product_id;
        }).filter(Boolean);

        if (polarProductIds.length === 0) {
            alert("No Polar products found in your cart. Please contact support.");
            setIsProcessing(false);
            return;
        }

        const queryParams = new URLSearchParams();
        polarProductIds.forEach(id => queryParams.append("products", id!));
        queryParams.append("customerEmail", email);

        router.push(`/api/checkout?${queryParams.toString()}`);
    };

    if (cartItems.length === 0) {
        return (
            <div className="bg-background-light dark:bg-background-dark font-display text-white min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6 p-8 bg-surface-dark border border-border-dark rounded-xl">
                    <h1 className="text-3xl font-black italic">Your Cart is Empty</h1>
                    <p className="text-muted-gold">Looks like you haven't added any kits yet.</p>
                    <Link href="/" className="px-8 py-3 bg-primary text-charcoal font-bold rounded-lg hover:bg-white transition-colors inline-block">
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white overflow-x-hidden parchment-texture min-h-screen flex flex-col">
            <header className="flex items-center justify-between border-b border-solid border-border-dark px-6 md:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-primary size-8 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-3xl">auto_stories</span>
                    </Link>
                    <h2 className="text-white text-xl font-black uppercase tracking-widest">
                        TinyStepsArtLTD
                    </h2>
                </div>
            </header>

            <main className="flex-1 px-6 md:px-20 py-12 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                <div className="lg:col-span-7 space-y-12">
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl font-black text-white tracking-tight">Checkout</h1>
                            <span className="text-muted-gold text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">lock</span> Secure Transaction
                            </span>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center size-8 rounded-full border border-primary text-primary font-bold text-sm">1</span>
                                <h2 className="text-xl font-bold tracking-tight">Contact Information</h2>
                            </div>
                            <div className="bg-surface-dark/50 p-6 rounded-xl border border-border-dark space-y-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-gold">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="collector@artisan.com"
                                        className="w-full bg-background-dark border-border-dark rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-gold/40"
                                    />
                                    <p className="text-[10px] text-stone-500 italic mt-1 font-serif">Your digital downloads will be sent to this address.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border-dark"></div>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center size-8 rounded-full border border-primary text-primary font-bold text-sm">2</span>
                            <h2 className="text-xl font-bold tracking-tight">Complete Payment</h2>
                        </div>
                        <div className="bg-surface-dark/50 p-8 rounded-xl border border-border-dark text-center space-y-6">
                            <div className="flex flex-col items-center gap-4 text-muted-gold">
                                <span className="material-symbols-outlined text-5xl">verified_user</span>
                                <p className="text-sm font-serif italic max-w-sm">We use Polar.sh for secure checkout. Your connection is encrypted and your files will be delivered instantly upon payment.</p>
                            </div>
                            <button
                                onClick={handleCompletePurchase}
                                disabled={isProcessing}
                                className="w-full py-5 bg-primary text-charcoal font-serif font-black text-xl rounded-xl shadow-[0_10px_30px_rgba(230,179,25,0.2)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin"></span>
                                        Preparing Secure Checkout...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined font-black">lock_open</span>
                                        Complete Purchase — ${finalTotal.toFixed(2)}
                                    </>
                                )}
                            </button>
                        </div>
                    </section>
                </div>

                <aside className="lg:col-span-5 relative">
                    <div className="lg:sticky lg:top-32 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-border-dark flex items-center justify-between">
                            <h3 className="text-lg font-bold tracking-tight uppercase tracking-widest text-xs">Order Summary</h3>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{cartItems.length} Kits</span>
                        </div>
                        <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
                            {cartItems.map((item, i) => (
                                <div key={`${item.id}-${i}`} className="flex gap-4 group">
                                    <div className="size-20 bg-background-dark rounded-lg border border-border-dark overflow-hidden shrink-0">
                                        <img className="w-full h-full object-cover transition-all" alt={item.title} src={item.img} />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="font-bold text-sm tracking-tight">{item.title}</h4>
                                            <p className="text-[10px] uppercase tracking-widest text-muted-gold flex items-center gap-1 mt-1">
                                                <span className="material-symbols-outlined text-[12px] text-primary">download</span> {item.type}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-muted-gold">Qty: 1</span>
                                            <span className="font-bold text-sm">${item.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-background-dark/30 space-y-3">
                            <div className="flex justify-between text-sm text-muted-gold font-serif italic">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <div className="pt-3 border-t border-border-dark flex justify-between items-center">
                                <span className="font-black uppercase tracking-widest text-xs">Total Amount</span>
                                <span className="font-black text-2xl text-primary tracking-tighter italic font-serif">${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
