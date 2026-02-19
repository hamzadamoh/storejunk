export default function LicensesPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200">
            <div className="max-w-4xl mx-auto px-6 lg:px-20 py-24">
                <h1 className="font-serif text-5xl font-black italic mb-12">
                    Commercial & Personal Licenses
                </h1>

                <div className="space-y-12">
                    <section className="bg-stone-800/50 p-8 rounded-2xl border border-stone-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Personal Use License</h2>
                        <div className="text-stone-400 space-y-4 leading-relaxed">
                            <p>Every purchase includes a Personal Use License by default. You are free to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Print unlimited copies for your own personal crafting projects.</li>
                                <li>Use the files in personal digital collages that are not sold.</li>
                                <li>Share photos of your finished physical creations on social media.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="bg-stone-800/50 p-8 rounded-2xl border border-primary/30">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-primary">Commercial Use License</h2>
                            <span className="bg-primary text-charcoal text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Add-on</span>
                        </div>

                        <div className="text-stone-400 space-y-4 leading-relaxed">
                            <p>Required if you plan to sell items made with our designs. Allows you to:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Create and sell physical junk journals containing our printed papers.</li>
                                <li>Sell physical ephemeral packs (printed) up to 500 units.</li>
                            </ul>
                            <p className="text-white font-bold mt-4">Prohibited:</p>
                            <ul className="list-disc pl-5 space-y-2 text-red-300">
                                <li>Reselling the digital files as-is.</li>
                                <li>Sharing the digital files with others.</li>
                                <li>Print-on-demand usage without an Extended License.</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
