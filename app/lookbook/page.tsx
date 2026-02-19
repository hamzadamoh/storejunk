export default function LookbookPage() {
    return (
        <div className="bg-charcoal min-h-screen text-stone-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24 text-center">
                <span className="text-primary font-bold uppercase tracking-widest text-sm">
                    Visual Inspiration
                </span>
                <h1 className="font-serif text-5xl md:text-7xl font-black italic mt-4 mb-16 text-white">
                    The Lookbook
                </h1>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    <img
                        className="w-full rounded-xl shadow-2xl"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhkpEyBUsuL0v4i0q-_bsdQHvtK85z2OHdy4JhQATRUtQCCzLh2Mz385d9O4EznGPS_k4xV_3xWtRPUBokEYRuBQQBXcj5d8yOva8K3NjPUkZy6WTHCPnrG5Q4Fywyw_ztmXaXm56sKvYpefF4qe1JceCb4Xi2j7S9nhJuK-DPeFfQUt3FcYmjRcFst7MQtPvYmDINsnLneMfk8sW4P8yTUJ4mfHkyigbZcCaCt3KcRS9RKZgXV1rtnVqU0Cf21ALKDDCMxWdW2QMF"
                        alt="Lookbook 1"
                    />
                    <img
                        className="w-full rounded-xl shadow-2xl"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEeciNi-E9j6cBXIcX5t_vSYYqaUx4xOS6h6cDpT72hL5WPOHu-e9KdiN8mPEPSP9-rJFpEouBareTwFAHBm27U9v7H_kzyDhR0t4f6CQ2h-cWG-mhVC5akscMWvXIAa-7SByxFK3AJWX4KwSXl7gVuzr_6CS6ZDKNiioPOK-40OqSSLQU7V-QLNj4NHFseTwxjvCYdNOTM8tjMNCHE00GBOlXWNFAmqrVM5LwNDr78briLlem-3rWHNaQvS4CfSETaqmHDLi7AHFG"
                        alt="Lookbook 2"
                    />
                    <img
                        className="w-full rounded-xl shadow-2xl"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpIGtkNEZrJkq_lUZ_op8cstVgXFPtA-LY-aM3Puzran46FD-jW7C6lM83fxXT_5UDG8OESAvBQXMAHMRvVNw1fXxHQoAXHxqky6QRbGmQ3bsdAXsXYcHwTlviafpyl5xRODMZm5NuRm5kFWjI4gCo9xruI1CQQEJPGfr0_l0soRTlKNu-j-vBJ8EAeCKWVARLijGcjdWOLFX266_uqunhD6rLF899DLhXRZr4TB6TUMcBZu5AUoUAQDmWVwCT_6SEi5X4YNy8DuKt"
                        alt="Lookbook 3"
                    />
                    <div className="w-full aspect-[3/4] bg-stone-800 rounded-xl flex items-center justify-center p-12 text-center text-stone-500 italic">
                        More curation in progress...
                    </div>
                </div>
            </div>
        </div>
    );
}
