"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButtonWrapper from "@/components/PayPalButtonWrapper";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { isTestMode } = useSettings();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("card");

    const finalTotal = cartTotal;

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
            {/* Top Navigation - Checkout Specific */}
            <header className="flex items-center justify-between border-b border-solid border-border-dark px-6 md:px-20 py-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-primary size-8 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-3xl">auto_stories</span>
                    </Link>
                    <h2 className="text-white text-xl font-black uppercase tracking-widest">
                        TinyStepsArtLTD
                    </h2>
                </div>
                <nav className="hidden md:flex flex-1 justify-end gap-10">
                    <Link href="/" className="text-muted-gold hover:text-primary transition-colors text-sm font-medium uppercase tracking-tighter">Shop</Link>
                    <Link href="/collections" className="text-muted-gold hover:text-primary transition-colors text-sm font-medium uppercase tracking-tighter">Collections</Link>
                </nav>
            </header>

            {/* Checkout Content Area */}
            <main className="flex-1 px-6 md:px-20 py-12 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                {/* Left Column: Email & Payment */}
                <div className="lg:col-span-7 space-y-12">
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl font-black text-white tracking-tight">Checkout</h1>
                            <span className="text-muted-gold text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">lock</span> Secure Transaction
                            </span>
                        </div>
                        {/* Step 1: Contact */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center size-8 rounded-full border border-primary text-primary font-bold text-sm">1</span>
                                <h2 className="text-xl font-bold tracking-tight">Contact Information</h2>
                            </div>
                            <div className="bg-surface-dark/50 p-6 rounded-xl border border-border-dark space-y-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-gold">Email Address</label>
                                    <input type="email" placeholder="collector@artisan.com" className="w-full bg-background-dark border-border-dark rounded-lg px-4 py-3 text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-gold/40" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border-dark"></div>

                    {/* Step 2: Payment */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center size-8 rounded-full border border-primary text-primary font-bold text-sm">2</span>
                            <h2 className="text-xl font-bold tracking-tight">Payment Method</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button onClick={() => setPaymentMethod("card")} className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === "card" ? "border-primary bg-primary/5 text-white" : "border-border-dark bg-surface-dark text-muted-gold hover:border-muted-gold"}`}>
                                    <span className="material-symbols-outlined">credit_card</span> <span className="font-bold">Card</span>
                                </button>
                                <button onClick={() => setPaymentMethod("paypal")} className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${paymentMethod === "paypal" ? "border-primary bg-primary/5 text-white" : "border-border-dark bg-surface-dark text-muted-gold hover:border-muted-gold"}`}>
                                    <span className="material-symbols-outlined">payments</span> <span className="font-bold">PayPal</span>
                                </button>
                            </div>

                            {/* Payment Action Area */}
                            <div className="mt-8 bg-surface-dark/50 p-6 rounded-xl border border-border-dark">
                                {isTestMode && (
                                    <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-500 p-4 rounded-xl text-center font-bold mb-6">
                                        <span className="material-symbols-outlined align-middle mr-2">warning</span>
                                        TEST MODE ACTIVE - No real payments will be processed
                                    </div>
                                )}

                                {isTestMode ? (
                                    <button
                                        onClick={() => {
                                            const productIds = cartItems.map(item => item.id).join(",");
                                            console.log("Test Payment successful");
                                            clearCart();
                                            router.push(`/thank-you?products=${productIds}`);
                                        }}
                                        className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined">check_circle</span>
                                        SIMULATE SUCCESSFUL PAYMENT
                                    </button>
                                ) : (
                                    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", components: "buttons", currency: "USD" }}>
                                        {paymentMethod === "paypal" ? (
                                            <div className="space-y-4">
                                                <p className="text-sm text-muted-gold mb-2 text-center">Pay with your PayPal account</p>
                                                <PayPalButtonWrapper
                                                    currency={"USD"}
                                                    showSpinner={true}
                                                    amount={finalTotal.toFixed(2)}
                                                    fundingSource="paypal"
                                                    onSuccess={(details) => {
                                                        const productIds = cartItems.map(item => item.id).join(",");
                                                        console.log("Payment successful", details);
                                                        clearCart();
                                                        router.push(`/thank-you?products=${productIds}`);
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <p className="text-sm text-muted-gold mb-2 text-center">Pay with Debit or Credit Card</p>
                                                <PayPalButtonWrapper
                                                    currency={"USD"}
                                                    showSpinner={true}
                                                    amount={finalTotal.toFixed(2)}
                                                    fundingSource="card"
                                                    onSuccess={(details) => {
                                                        const productIds = cartItems.map(item => item.id).join(",");
                                                        console.log("Payment successful", details);
                                                        clearCart();
                                                        router.push(`/thank-you?products=${productIds}`);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </PayPalScriptProvider>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Order Summary */}
                <aside className="lg:col-span-5 relative">
                    <div className="lg:sticky lg:top-32 bg-surface-dark border border-border-dark rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-border-dark flex items-center justify-between">
                            <h3 className="text-lg font-bold tracking-tight">Order Summary</h3>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">{cartItems.length} Kits</span>
                        </div>
                        <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
                            {cartItems.map((item, i) => (
                                <div key={`${item.id}-${i}`} className="flex gap-4 group">
                                    <div className="size-20 bg-background-dark rounded-lg border border-border-dark overflow-hidden shrink-0">
                                        <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={item.title} src={item.img} />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="font-bold text-sm">{item.title}</h4>
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
                        {/* Pricing Breakdown */}
                        <div className="p-6 bg-background-dark/30 space-y-3">
                            <div className="flex justify-between text-sm text-muted-gold">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <div className="pt-3 border-t border-border-dark flex justify-between">
                                <span className="font-black uppercase tracking-widest">Total</span>
                                <span className="font-black text-xl text-primary tracking-tighter">${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
