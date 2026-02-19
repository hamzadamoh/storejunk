import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { toggleCart, cartItems } = useCart();
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-charcoal/95 backdrop-blur-md px-6 lg:px-20 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-charcoal font-bold">
                            auto_stories
                        </span>
                    </div>
                    <h1 className="font-serif text-2xl font-bold tracking-tight text-white italic">
                        TinyStepsArtLTD
                    </h1>
                </div>

                {/* Main Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                    <Link
                        href="/collections"
                        className="text-stone-400 hover:text-primary text-sm font-medium transition-colors"
                    >
                        Collections
                    </Link>
                    <Link
                        href="/new-arrivals"
                        className="text-stone-400 hover:text-primary text-sm font-medium transition-colors"
                    >
                        New Arrivals
                    </Link>
                    <Link
                        href="/product/botanical-grimoire"
                        className="text-stone-400 hover:text-primary text-sm font-medium transition-colors"
                    >
                        Digital Kits
                    </Link>
                    <Link
                        href="/journal"
                        className="text-stone-400 hover:text-primary text-sm font-medium transition-colors"
                    >
                        Journal
                    </Link>
                </div>

                {/* Utility Icons */}
                <div className="flex items-center gap-5">
                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search aesthetics..."
                            className="bg-stone-800/50 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary w-48 transition-all focus:w-64 placeholder:text-stone-500 text-stone-200"
                        />
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-xl">
                            search
                        </span>
                    </div>
                    <button className="text-stone-300 hover:text-primary transition-colors p-2">
                        <span className="material-symbols-outlined">person</span>
                    </button>
                    <button onClick={toggleCart} className="relative text-stone-300 hover:text-primary transition-colors p-2">
                        <span className="material-symbols-outlined">shopping_bag</span>
                        {cartItems.length > 0 && (
                            <span className="absolute top-1 right-1 bg-primary text-charcoal text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}
