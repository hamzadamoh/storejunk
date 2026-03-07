"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useJournal, Article } from "@/context/JournalProvider";
import FallbackImage from "@/components/FallbackImage";

export default function ArticleDetailPage() {
    const { id } = useParams();
    const { getArticleById } = useJournal();
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadArticle = async () => {
            if (typeof id === 'string') {
                const data = await getArticleById(id);
                setArticle(data || null);
            }
            setIsLoading(false);
        };
        loadArticle();
    }, [id, getArticleById]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="text-stone-500 italic">Consulting the archives...</div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-background-dark text-white flex flex-col items-center justify-center p-6 text-center">
                <h1 className="font-serif text-4xl mb-4 italic">Story Not Found</h1>
                <p className="text-stone-400 mb-8">This page has been lost to time.</p>
                <Link href="/journal" className="text-primary hover:underline font-bold">Return to Journal</Link>
            </div>
        );
    }

    return (
        <div className="bg-background-light dark:bg-[#0d0d0d] min-h-screen text-charcoal dark:text-stone-200 flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Header */}
                <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                    <FallbackImage
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
                        <div className="flex items-center gap-3 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                            <span>{new Date(article.date).toLocaleDateString()}</span>
                            <span className="w-1 h-1 rounded-full bg-primary/50"></span>
                            <span>{article.tag}</span>
                        </div>
                        <h1 className="max-w-4xl font-serif text-4xl md:text-7xl font-black italic text-white leading-tight">
                            {article.title}
                        </h1>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-3xl mx-auto px-6 py-20">
                    <div className="flex items-center gap-4 mb-12 text-stone-500 text-sm italic">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/journal" className="hover:text-primary transition-colors">Journal</Link>
                        <span>/</span>
                        <span className="text-stone-400 line-clamp-1">{article.title}</span>
                    </div>

                    <div
                        className="prose prose-stone dark:prose-invert prose-lg max-w-none 
                                    prose-h3:font-serif prose-h3:italic prose-h3:text-primary
                                    prose-strong:text-stone-100 prose-p:leading-relaxed
                                    text-stone-400"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    <div className="mt-20 pt-12 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <Link href="/journal" className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                                <span className="material-symbols-outlined">arrow_back</span>
                                Back to Journal
                            </Link>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-stone-500 italic text-sm">Share this story:</span>
                            {/* Simple placeholders */}
                            <div className="flex gap-3 text-stone-400">
                                <span className="material-symbols-outlined cursor-pointer hover:text-primary text-xl">share</span>
                                <span className="material-symbols-outlined cursor-pointer hover:text-primary text-xl">bookmark</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
