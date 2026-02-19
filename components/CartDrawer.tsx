"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, cartTotal } = useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={toggleCart}
            ></div>

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-surface-dark border-l border-border-dark shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div
                    className="absolute -left-12 top-1/2 -translate-y-1/2 bg-primary py-4 px-2 rounded-l-xl cursor-pointer shadow-lg"
                    onClick={toggleCart}
                >
                    <span className="material-symbols-outlined text-background-dark rotate-180">
                        double_arrow
                    </span>
                </div>

                <div className="flex flex-col h-full p-8 text-white">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black uppercase tracking-widest text-primary">
                            Your Cart
                        </h2>
                        <button
                            onClick={toggleCart}
                            className="hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 overflow-y-auto flex-1 pr-2">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                                <span className="material-symbols-outlined text-6xl">shopping_bag</span>
                                <p className="font-serif italic text-xl">Your cart is empty.</p>
                            </div>
                        ) : (
                            cartItems.map((item, i) => (
                                <div key={`${item.id}-${i}`} className="flex gap-4 bg-background-dark/50 p-4 rounded-xl border border-border-dark group">
                                    <div className="size-20 shrink-0 bg-stone-800 rounded-lg overflow-hidden border border-border-dark">
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold line-clamp-1">{item.title}</p>
                                            <span className="text-xs text-primary font-bold">${item.price.toFixed(2)}</span>
                                        </div>
                                        <p className="text-[10px] uppercase text-muted-gold">{item.type}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-[10px] text-red-400 hover:text-red-300 uppercase font-bold tracking-widest mt-2 block"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-border-dark space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-sm text-muted-gold uppercase tracking-widest">Subtotal</span>
                                <span className="text-2xl font-black italic">${cartTotal.toFixed(2)}</span>
                            </div>
                            <Link
                                href="/checkout"
                                onClick={toggleCart}
                                className="w-full py-4 bg-primary text-charcoal font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
