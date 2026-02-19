import Link from "next/link";

export default function JournalPage() {
    const articles = [
        {
            title: "The Art of Coffee Staining Paper",
            excerpt: "Achieve that perfect vintage look with simple kitchen ingredients.",
            date: "Oct 12, 2024",
            tag: "Tutorial"
        },
        {
            title: "Layering Textures in Digital Collages",
            excerpt: "How to use blend modes to create depth in your junk journal pages.",
            date: "Sep 28, 2024",
            tag: "Technique"
        },
        {
            title: "History of Victorian Calling Cards",
            excerpt: "Exploring the etiquette and aesthetics of 19th-century socialite ephemera.",
            date: "Sep 15, 2024",
            tag: "History"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200">
            <div className="max-w-4xl mx-auto px-6 lg:px-20 py-24">
                <h1 className="font-serif text-5xl md:text-6xl font-black italic mb-16 text-center">
                    The Journal
                </h1>

                <div className="space-y-12">
                    {articles.map((article, i) => (
                        <article key={i} className="border-b border-stone-800 pb-12">
                            <div className="flex items-center gap-4 text-sm text-primary font-bold uppercase tracking-widest mb-3">
                                <span>{article.date}</span>
                                <span>•</span>
                                <span>{article.tag}</span>
                            </div>
                            <Link href="/journal" className="group">
                                <h2 className="text-3xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-stone-400 text-lg mb-6 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <span className="text-white font-bold text-sm underline underline-offset-4 decoration-primary group-hover:no-underline">
                                    Read Article
                                </span>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
