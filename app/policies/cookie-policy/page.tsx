import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CookiePolicyPage() {
    return (
        <div className="bg-[#0f0f0f] text-stone-200 font-display transition-colors duration-300 min-h-screen flex flex-col relative overflow-hidden">
            {/* Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <Navbar />

            <main className="flex-grow py-24 px-6 lg:px-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-12 font-bold">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="text-stone-700">/</span>
                        <span className="text-stone-700">Policies</span>
                        <span className="text-stone-700">/</span>
                        <span className="text-white">Cookie Policy</span>
                    </nav>

                    <div className="mb-16">
                        <h1 className="font-serif text-5xl md:text-6xl font-black italic text-white mb-6">Cookie Policy</h1>
                        <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent"></div>
                    </div>

                    <div className="space-y-16">
                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">01</span> What are Cookies?
                            </h2>
                            <p className="text-stone-400 leading-relaxed text-lg font-serif italic">
                                Cookies are small pieces of text sent to your web browser by a website you visit. They help the website remember information about your visit, which can make it easier to visit the site again and make the site more useful to you.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">02</span> Essential Cookies
                            </h2>
                            <p className="text-stone-400 leading-relaxed">
                                We use essential cookies to authenticate users and prevent fraudulent use of user accounts. These are strictly necessary for the operation of the store and cannot be turned off.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">03</span> Analytics & Preferences
                            </h2>
                            <p className="text-stone-400 leading-relaxed">
                                We may use cookies to remember your preferences (like theme or cart contents) and to understand how you interact with our shop. This helps us improve our collection and provide a better experience.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">04</span> Managing Cookies
                            </h2>
                            <p className="text-stone-400 leading-relaxed italic font-serif">
                                Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you.
                            </p>
                        </section>
                    </div>

                    {/* Footer Policy Links */}
                    <div className="mt-24 pt-8 border-t border-stone-900 flex flex-wrap gap-8 justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">
                        <Link href="/policies/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/policies/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/policies/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
