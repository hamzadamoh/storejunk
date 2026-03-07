"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cartItems, addToCart, removeFromCart, cartTotal } = useCart();

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
                    className="absolute -left-12 top-1/2 -translate-y-1/2 bg-[#4a1c1c] text-[#f4ebd8] py-4 px-2 rounded-l-xl cursor-pointer shadow-lg"
                    onClick={toggleCart}
                >
                    <span className="material-symbols-outlined rotate-180">
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

                    {/* Reassurance line */}
                    <div className="bg-[#4a1c1c]/20 border border-[#4a1c1c]/50 p-3 rounded-lg mb-6 flex items-start gap-3">
                        <span className="text-xl">⚡</span>
                        <p className="text-xs font-serif italic text-[#f4ebd8]">
                            Instant Digital Delivery — files sent to your email immediately
                        </p>
                    </div>

                    {/* Progress Bar Message */}
                    {cartItems.length > 0 && (
                        <div className="mb-6 space-y-2">
                            <div className="flex justify-between text-xs font-bold text-primary uppercase tracking-widest">
                                <span>Bonus unlocks at $50</span>
                                <span>${Math.max(0, 50 - cartTotal).toFixed(2)} away</span>
                            </div>
                            <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden border border-stone-700">
                                <div className="h-full bg-primary" style={{ width: `${Math.min(100, (cartTotal / 50) * 100)}%` }}></div>
                            </div>
                            <p className="text-[10px] text-stone-400 italic">Add ${Math.max(0, 50 - cartTotal).toFixed(2)} more for a free bonus kit!</p>
                        </div>
                    )}

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

                        {/* Upsell Row */}
                        {cartItems.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-stone-800">
                                <p className="text-xs font-bold uppercase tracking-widest text-[#d4c5b0] mb-3 font-serif italic">Complete the set —</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-stone-800/30 border border-stone-700/50 p-2 rounded-lg flex flex-col gap-2">
                                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpIGtkNEZrJkq_lUZ_op8cstVgXFPtA-LY-aM3Puzran46FD-jW7C6lM83fxXT_5UDG8OESAvBQXMAHMRvVNw1fXxHQoAXHxqky6QRbGmQ3bsdAXsXYcHwTlviafpyl5xRODMZm5NuRm5kFWjI4gCo9xruI1CQQEJPGfr0_l0soRTlKNu-j-vBJ8EAeCKWVARLijGcjdWOLFX266_uqunhD6rLF899DLhXRZr4TB6TUMcBZu5AUoUAQDmWVwCT_6SEi5X4YNy8DuKt" className="w-full h-16 object-cover rounded opacity-80 hover:opacity-100 transition-opacity" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-stone-300 truncate font-serif">Botanical Add-on</span>
                                            <button
                                                onClick={() => addToCart({ id: "botanical-addon", title: "Botanical Add-on", price: 4.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpIGtkNEZrJkq_lUZ_op8cstVgXFPtA-LY-aM3Puzran46FD-jW7C6lM83fxXT_5UDG8OESAvBQXMAHMRvVNw1fXxHQoAXHxqky6QRbGmQ3bsdAXsXYcHwTlviafpyl5xRODMZm5NuRm5kFWjI4gCo9xruI1CQQEJPGfr0_l0soRTlKNu-j-vBJ8EAeCKWVARLijGcjdWOLFX266_uqunhD6rLF899DLhXRZr4TB6TUMcBZu5AUoUAQDmWVwCT_6SEi5X4YNy8DuKt", type: "Add-on" }, false)}
                                                className="text-[10px] bg-[#4a1c1c] text-[#f4ebd8] px-2 py-1 rounded hover:bg-[#3d1717] font-bold transition-colors w-full uppercase tracking-widest text-[8px]"
                                            >+$4.00 Quick Add</button>
                                        </div>
                                    </div>
                                    <div className="bg-stone-800/30 border border-stone-700/50 p-2 rounded-lg flex flex-col gap-2">
                                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhkpEyBUsuL0v4i0q-_bsdQHvtK85z2OHdy4JhQATRUtQCCzLh2Mz385d9O4EznGPS_k4xV_3xWtRPUBokEYRuBQQBXcj5d8yOva8K3NjPUkZy6WTHCPnrG5Q4Fywyw_ztmXaXm56sKvYpefF4qe1JceCb4Xi2j7S9nhJuK-DPeFfQUt3FcYmjRcFst7MQtPvYmDINsnLneMfk8sW4P8yTUJ4mfHkyigbZcCaCt3KcRS9RKZgXV1rtnVqU0Cf21ALKDDCMxWdW2QMF" className="w-full h-16 object-cover rounded opacity-80 hover:opacity-100 transition-opacity" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-stone-300 truncate font-serif">Vintage Labels</span>
                                            <button
                                                onClick={() => addToCart({ id: "vintage-labels", title: "Vintage Labels", price: 5.00, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhkpEyBUsuL0v4i0q-_bsdQHvtK85z2OHdy4JhQATRUtQCCzLh2Mz385d9O4EznGPS_k4xV_3xWtRPUBokEYRuBQQBXcj5d8yOva8K3NjPUkZy6WTHCPnrG5Q4Fywyw_ztmXaXm56sKvYpefF4qe1JceCb4Xi2j7S9nhJuK-DPeFfQUt3FcYmjRcFst7MQtPvYmDINsnLneMfk8sW4P8yTUJ4mfHkyigbZcCaCt3KcRS9RKZgXV1rtnVqU0Cf21ALKDDCMxWdW2QMF", type: "Add-on" }, false)}
                                                className="text-[10px] bg-[#4a1c1c] text-[#f4ebd8] px-2 py-1 rounded hover:bg-[#3d1717] font-bold transition-colors w-full uppercase tracking-widest text-[8px]"
                                            >+$5.00 Quick Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                className="w-full py-4 bg-primary hover:bg-white text-charcoal font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(230,179,25,0.3)]"
                            >
                                Proceed to Checkout
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>

                            {/* Trust Badges */}
                            <div className="flex items-center justify-center gap-2 text-[10px] font-serif italic text-stone-500 pt-2">
                                <span className="flex items-center gap-1"><span className="text-sm">🔒</span> Secure checkout</span>
                                <span>&bull;</span>
                                <span>No shipping</span>
                                <span>&bull;</span>
                                <span>Instant download</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
