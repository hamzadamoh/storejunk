"use client";

import Link from "next/link";
import CollectionProductGrid from "@/components/CollectionProductGrid";
import { useCollections } from "@/context/CollectionContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CollectionPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { getCollectionById } = useCollections();
    const [collection, setCollection] = useState<any>(null);
    const [itemCount, setItemCount] = useState<number | null>(null);

    useEffect(() => {
        if (slug) {
            const c = getCollectionById(slug);
            if (c) {
                setCollection(c);
            }

            // Fetch product count for this collection
            const fetchCount = async () => {
                const { count, error } = await supabase
                    .from('products')
                    .select('*', { count: 'exact', head: true })
                    .eq('collection', slug);

                if (!error) {
                    setItemCount(count);
                }
            };
            fetchCount();
        }
    }, [slug, getCollectionById]);

    if (!collection) {
        return (
            <div className="min-h-screen bg-charcoal flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black italic">Collection Not Found</h1>
                    <p className="text-stone-400">Searching specifically for: {slug}</p>
                    <Link href="/" className="text-primary hover:underline">
                        View all collections
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200 flex flex-col transition-colors duration-300">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Header */}
                <div className="relative h-[60vh] overflow-hidden group">
                    <img
                        src={collection.heroImage}
                        alt={collection.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background-dark flex items-center justify-center text-center px-6">
                        <div className="max-w-4xl space-y-8">
                            <div className="space-y-4">
                                <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
                                    Curated Wonders
                                </span>
                                <h1 className="font-serif text-6xl md:text-8xl font-black italic text-white drop-shadow-2xl">
                                    {collection.title}
                                </h1>
                            </div>

                            <div className="space-y-6">
                                <p className="text-xl md:text-2xl text-stone-300 font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                                    {collection.description}
                                </p>

                                <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#d4c5b0]">
                                        {itemCount !== null ? `${itemCount} Curated Items` : 'Exploring Collection...'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                    {/* Products Grid */}
                    <CollectionProductGrid slug={slug} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
