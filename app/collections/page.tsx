"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCollections } from "@/context/CollectionContext";
import FallbackImage from "@/components/FallbackImage";

export default function CollectionsPage() {
    const { collections } = useCollections();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200 flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                    <h1 className="font-serif text-5xl md:text-6xl font-black italic mb-8 text-charcoal dark:text-white">
                        Curated Collections
                    </h1>
                    <p className="text-xl text-stone-500 mb-16 max-w-2xl">
                        Explore our carefully categorized aesthetic themes, from deep Victorian
                        goth to ethereal botanical wonders.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collections.map((collection) => (
                            <Link
                                key={collection.id}
                                href={`/collections/${collection.id}`}
                                className="group relative overflow-hidden rounded-2xl aspect-[4/3] block bg-stone-900 border border-white/5 shadow-2xl"
                            >
                                <FallbackImage
                                    src={collection.heroImage}
                                    alt={collection.title}
                                    title={collection.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                                    <h2 className="text-3xl font-serif font-bold text-white mb-2 italic">{collection.title}</h2>
                                    <p className="text-stone-300 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">
                                        {collection.description}
                                    </p>
                                    <span className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                        View Collection <span className="material-symbols-outlined">arrow_forward</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
