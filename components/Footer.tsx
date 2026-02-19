import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-charcoal text-stone-400 py-16 px-6 lg:px-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <h3 className="font-serif text-2xl font-bold text-white italic">
                        TinyStepsArtLTD
                    </h3>
                    <p className="text-sm leading-relaxed">
                        Modern Vintage & Gothic Chic digital ephemera for the creative soul.
                        Bringing tactile history to the digital age.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">public</span>
                        </Link>
                        <Link href="https://pinterest.com" target="_blank" className="hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">photo_camera</span>
                        </Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">
                            <span className="material-symbols-outlined">mail</span>
                        </Link>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
                        The Shop
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li>
                            <Link href="/product/botanical-grimoire" className="hover:text-primary transition-colors">
                                Digital Paper Packs
                            </Link>
                        </li>
                        <li>
                            <Link href="/product/botanical-grimoire" className="hover:text-primary transition-colors">
                                Ephemera Kits
                            </Link>
                        </li>
                        <li>
                            <Link href="/licenses" className="hover:text-primary transition-colors">
                                Commercial Licenses
                            </Link>
                        </li>
                        <li>
                            <Link href="/resources" className="hover:text-primary transition-colors">
                                Freebie Resource Library
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
                        Help & Support
                    </h4>
                    <ul className="space-y-4 text-sm">
                        <li>
                            <Link href="/contact" className="hover:text-primary transition-colors">
                                Contact Artist
                            </Link>
                        </li>
                        <li>
                            <Link href="/help" className="hover:text-primary transition-colors">
                                Download Guide
                            </Link>
                        </li>
                        <li>
                            <Link href="/help" className="hover:text-primary transition-colors">
                                Printing Tips
                            </Link>
                        </li>
                        <li>
                            <Link href="/policies/refund-policy" className="hover:text-primary transition-colors">
                                Return Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/policies/shipping-policy" className="hover:text-primary transition-colors">
                                Delivery Info
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">
                        The Inner Circle
                    </h4>
                    <p className="text-sm">
                        Join for exclusive Gothic Noir freebies and early access.
                    </p>
                    <div className="flex flex-col gap-2">
                        <input
                            type="email"
                            placeholder="Your raven address..."
                            className="bg-stone-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary placeholder:text-stone-600"
                        />
                        <button type="button" className="bg-primary text-charcoal font-bold py-3 rounded-lg hover:brightness-110 transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest">
                <p>© 2024 TinyStepsArtLTD. All Rights Reserved.</p>
                <div className="flex gap-6">
                    <Link href="/policies/privacy-policy" className="hover:text-white">
                        Privacy
                    </Link>
                    <Link href="/policies/terms-of-service" className="hover:text-white">
                        Terms
                    </Link>
                    <Link href="/policies/refund-policy" className="hover:text-white">
                        Refunds
                    </Link>
                    <Link href="/policies/shipping-policy" className="hover:text-white">
                        Delivery
                    </Link>
                    <Link href="/dashboard" className="hover:text-white">
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
}
