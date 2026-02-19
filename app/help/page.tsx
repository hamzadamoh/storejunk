export default function HelpPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200">
            <div className="max-w-3xl mx-auto px-6 lg:px-20 py-24">
                <h1 className="font-serif text-5xl font-black italic mb-12">
                    Help Center
                </h1>

                <div className="space-y-8">
                    <div className="bg-stone-800/50 p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">download</span>
                            Download Guide
                        </h2>
                        <p className="text-stone-400 leading-relaxed">
                            After purchase, you will receive an email with a secure download link.
                            Files are typically provided in ZIP format. Please download and unzip them
                            on a computer (desktop/laptop) rather than a mobile device for the best experience.
                        </p>
                    </div>

                    <div className="bg-stone-800/50 p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">print</span>
                            Printing Tips
                        </h2>
                        <p className="text-stone-400 leading-relaxed">
                            For best results, we recommend printing on matte photo paper or high-quality presentation paper (32lb+).
                            Ensure your printer settings are set to "Best Quality" and "Fill Page" or "100% Scale".
                        </p>
                    </div>

                    <div className="bg-stone-800/50 p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">replay</span>
                            Return Policy
                        </h2>
                        <p className="text-stone-400 leading-relaxed">
                            Due to the nature of digital downloads, <strong className="text-white">all sales are final</strong>.
                            We cannot offer refunds once files have been sent. However, if you have trouble accessing your files
                            or receive a corrupted file, please contact support and we will resolve it immediately.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
