"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (pathname === '/dashboard/login') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        document.cookie = "dashboard_session=; path=/; max-age=0;";
        router.push('/dashboard/login');
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: "dashboard" },
        { name: "Orders", href: "/dashboard/orders", icon: "shopping_bag" },
        { name: "Products", href: "/dashboard/products", icon: "inventory_2" },
        { name: "Add Product", href: "/dashboard/products/add", icon: "add_circle_outline" },
        { name: "Reviews", href: "/dashboard/reviews", icon: "rate_review" },
    ];

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-stone-200 flex font-sans">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1a1a1a] border-r border-stone-800 transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6">
                    <h1 className="text-2xl font-serif font-black text-[#e6b319]">TinyStepsArt<span className="font-light">LTD</span></h1>
                    <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest">Admin Panel</p>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#e6b319]/10 text-[#e6b319]' : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'}`}
                            >
                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-stone-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="h-16 border-b border-stone-800 bg-[#1a1a1a]/50 backdrop-blur-md flex items-center justify-between px-6 lg:hidden shrink-0">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-stone-400 hover:text-stone-200"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                    <h1 className="text-lg font-serif font-bold text-[#e6b319]">TinyStepsArt</h1>
                    <div className="w-6"></div> {/* Spacer for centering */}
                </header>

                <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
