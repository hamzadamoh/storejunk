export default function ContactPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-charcoal dark:text-stone-200">
            <div className="max-w-3xl mx-auto px-6 lg:px-20 py-24">
                <h1 className="font-serif text-5xl font-black italic mb-8">
                    Contact the Artist
                </h1>
                <p className="text-xl text-stone-500 mb-12">
                    Have a question about a digital kit? Need help with a custom order?
                    Reach out directly.
                </p>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-primary">Name</label>
                            <input type="text" className="w-full bg-stone-800 border-none rounded-lg p-4 text-white focus:ring-1 focus:ring-primary" placeholder="Jane Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-primary">Email</label>
                            <input type="email" className="w-full bg-stone-800 border-none rounded-lg p-4 text-white focus:ring-1 focus:ring-primary" placeholder="jane@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-primary">Message</label>
                        <textarea rows={6} className="w-full bg-stone-800 border-none rounded-lg p-4 text-white focus:ring-1 focus:ring-primary" placeholder="How can we help?"></textarea>
                    </div>
                    <button className="bg-primary text-charcoal font-bold py-4 px-10 rounded-lg hover:brightness-110 transition-all uppercase tracking-widest text-sm">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
