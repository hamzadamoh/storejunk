"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useJournal } from "@/context/JournalProvider";

export default function JournalPage() {
    const { articles, isLoading } = useJournal();

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200 flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow px-6 py-24">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl font-black italic mb-16 text-center text-charcoal dark:text-white">
                        The Journal
                    </h1>

                    {isLoading ? (
                        <div className="text-center py-20 text-stone-500 italic">Gathering stories...</div>
                    ) : articles.length === 0 ? (
                        <div className="text-center py-20 text-stone-500 italic">No records found in the grimoire yet.</div>
                    ) : (
                        <div className="space-y-12">
                            {articles.map((article) => (
                                <article key={article.id} className="border-b border-stone-200 dark:border-stone-800 pb-12">
                                    <div className="flex items-center gap-4 text-sm text-primary font-bold uppercase tracking-widest mb-3">
                                        <span>{new Date(article.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{article.tag}</span>
                                    </div>
                                    <Link href={`/journal/${article.id}`} className="group block cursor-pointer">
                                        <h2 className="text-3xl font-serif font-bold mb-4 group-hover:text-primary transition-colors text-charcoal dark:text-stone-100 italic">
                                            {article.title}
                                        </h2>
                                        <p className="text-stone-500 dark:text-stone-400 text-lg mb-6 leading-relaxed line-clamp-3">
                                            {article.excerpt}
                                        </p>
                                        <span className="text-charcoal dark:text-white font-bold text-sm underline underline-offset-4 decoration-primary group-hover:decoration-2 transition-all">
                                            Read Article
                                        </span>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
