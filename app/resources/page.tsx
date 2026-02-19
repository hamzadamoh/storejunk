import Link from "next/link";

export default function ResourcesPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold uppercase tracking-widest text-xs">Community Perks</span>
                    <h1 className="font-serif text-5xl md:text-6xl font-black italic mt-4 mb-6">
                        Freebie Library
                    </h1>
                    <p className="text-stone-500 max-w-xl mx-auto">
                        A collection of free samples, vintage textures, and printable elements for our community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-stone-800 rounded-xl overflow-hidden group">
                            <div className="h-48 bg-stone-700 flex items-center justify-center">
                                <span className="material-symbols-outlined text-6xl text-stone-600 group-hover:text-primary transition-colors">
                                    folder_zip
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-white text-lg mb-2">Vintage Sample Pack 0{item}</h3>
                                <p className="text-stone-400 text-sm mb-6">
                                    Includes 5 high-res textures and 3 ephemera cuts.
                                </p>
                                <button className="w-full py-3 border border-stone-600 rounded-lg text-stone-300 hover:text-white hover:border-white transition-all flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
