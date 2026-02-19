"use client";

import Link from "next/link";
import CollectionProductGrid from "@/components/CollectionProductGrid";
import { useCollections } from "@/context/CollectionContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CollectionPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { getCollectionById } = useCollections();
    const [collection, setCollection] = useState<any>(null);

    useEffect(() => {
        if (slug) {
            const c = getCollectionById(slug);
            if (c) {
                setCollection(c);
            }
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
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200">
            {/* Hero Header */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src={collection.heroImage}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-6">
                    <div className="max-w-3xl space-y-6">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">
                            Curated Collection
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl font-black italic text-white">
                            {collection.title}
                        </h1>
                        <p className="text-xl text-stone-300 font-medium leading-relaxed">
                            {collection.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 py-24">
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <CollectionProductGrid slug={slug} />
                </div>
            </div>
        </div>
    );
}
