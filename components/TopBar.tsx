"use client";

import { usePathname } from "next/navigation";

export default function TopBar() {
    const pathname = usePathname();

    // Hide top bar on specific routes
    const isDashboard = pathname?.startsWith('/dashboard');
    const isLogin = pathname?.startsWith('/login');

    if (isDashboard || isLogin) {
        return null;
    }

    return (
        <div className="bg-[#4a1c1c] text-[#f4ebd8] text-center text-xs py-2 relative z-[100]">
            ✨ Free Gothic Noir freebie with every order &middot; Instant download
        </div>
    );
}
