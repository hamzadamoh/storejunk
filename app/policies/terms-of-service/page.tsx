import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsOfServicePage() {
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
                        <span className="text-white">Terms of Service</span>
                    </nav>

                    <div className="mb-16">
                        <h1 className="font-serif text-5xl md:text-6xl font-black italic text-white mb-6">Terms of Service</h1>
                        <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent"></div>
                    </div>

                    <div className="space-y-16">
                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">01</span> Overview
                            </h2>
                            <p className="text-stone-400 leading-relaxed text-lg font-serif italic">
                                This website is operated by TinyStepsArtLTD. Throughout the site, the terms “we”, “us” and “our” refer to TinyStepsArtLTD. TinyStepsArtLTD offers this website, including all information, tools and services available from this site to you.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">02</span> Digital Products
                            </h2>
                            <div className="bg-primary/5 border-l-2 border-primary/30 p-6 space-y-4">
                                <p className="text-stone-400 leading-relaxed font-serif italic">
                                    All products listed in our shop are digital downloads. <span className="text-white font-bold">No physical product will be shipped.</span>
                                </p>
                                <p className="text-stone-400 leading-relaxed">
                                    Upon purchase, you receive a license to use the digital files for personal or small commercial use as defined in our specific license terms. You may not resell, redistribute, or share the original digital files.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">03</span> Information Accuracy
                            </h2>
                            <p className="text-stone-400 leading-relaxed">
                                We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">04</span> Service Modifications
                            </h2>
                            <p className="text-stone-400 leading-relaxed">
                                Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">05</span> Governing Law
                            </h2>
                            <p className="text-stone-400 leading-relaxed italic font-serif">
                                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of <span className="text-white">your jurisdiction</span>.
                            </p>
                        </section>
                    </div>

                    {/* Footer Policy Links */}
                    <div className="mt-24 pt-8 border-t border-stone-900 flex flex-wrap gap-8 justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">
                        <Link href="/policies/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/policies/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
                        <Link href="/policies/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
