import Link from "next/link";

export default function CollectionsPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                <h1 className="font-serif text-5xl md:text-6xl font-black italic mb-8">
                    Curated Collections
                </h1>
                <p className="text-xl text-stone-500 mb-16 max-w-2xl">
                    Explore our carefully categorized aesthetic themes, from deep Victorian
                    goth to ethereal botanical wonders.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Gothic Noir */}
                    <Link
                        href="/collections/gothic-noir"
                        className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhkpEyBUsuL0v4i0q-_bsdQHvtK85z2OHdy4JhQATRUtQCCzLh2Mz385d9O4EznGPS_k4xV_3xWtRPUBokEYRuBQQBXcj5d8yOva8K3NjPUkZy6WTHCPnrG5Q4Fywyw_ztmXaXm56sKvYpefF4qe1JceCb4Xi2j7S9nhJuK-DPeFfQUt3FcYmjRcFst7MQtPvYmDINsnLneMfk8sW4P8yTUJ4mfHkyigbZcCaCt3KcRS9RKZgXV1rtnVqU0Cf21ALKDDCMxWdW2QMF"
                            alt="Gothic Noir"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Gothic Noir</h2>
                            <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                View Collection <span className="material-symbols-outlined">arrow_forward</span>
                            </span>
                        </div>
                    </Link>

                    {/* Victorian Ephemera */}
                    <Link
                        href="/collections/victorian-ephemera"
                        className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEeciNi-E9j6cBXIcX5t_vSYYqaUx4xOS6h6cDpT72hL5WPOHu-e9KdiN8mPEPSP9-rJFpEouBareTwFAHBm27U9v7H_kzyDhR0t4f6CQ2h-cWG-mhVC5akscMWvXIAa-7SByxFK3AJWX4KwSXl7gVuzr_6CS6ZDKNiioPOK-40OqSSLQU7V-QLNj4NHFseTwxjvCYdNOTM8tjMNCHE00GBOlXWNFAmqrVM5LwNDr78briLlem-3rWHNaQvS4CfSETaqmHDLi7AHFG"
                            alt="Victorian Ephemera"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Victorian Ephemera</h2>
                            <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                View Collection <span className="material-symbols-outlined">arrow_forward</span>
                            </span>
                        </div>
                    </Link>

                    {/* Botanical Grimoires */}
                    <Link
                        href="/collections/botanical-grimoires"
                        className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                    >
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpIGtkNEZrJkq_lUZ_op8cstVgXFPtA-LY-aM3Puzran46FD-jW7C6lM83fxXT_5UDG8OESAvBQXMAHMRvVNw1fXxHQoAXHxqky6QRbGmQ3bsdAXsXYcHwTlviafpyl5xRODMZm5NuRm5kFWjI4gCo9xruI1CQQEJPGfr0_l0soRTlKNu-j-vBJ8EAeCKWVARLijGcjdWOLFX266_uqunhD6rLF899DLhXRZr4TB6TUMcBZu5AUoUAQDmWVwCT_6SEi5X4YNy8DuKt"
                            alt="Botanical Grimoires"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Botanical Grimoires</h2>
                            <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                View Collection <span className="material-symbols-outlined">arrow_forward</span>
                            </span>
                        </div>
                    </Link>

                    {/* Celestial Maps (New Placeholder) */}
                    <Link
                        href="/product/botanical-grimoire"
                        className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
                    >
                        <div className="w-full h-full bg-stone-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-stone-600">public</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Celestial Maps</h2>
                            <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                Coming Soon
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
