import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
                        <span className="text-white">Privacy Policy</span>
                    </nav>

                    <div className="mb-16">
                        <h1 className="font-serif text-5xl md:text-6xl font-black italic text-white mb-6">Privacy Policy</h1>
                        <div className="h-px w-full bg-gradient-to-r from-primary/50 to-transparent"></div>
                    </div>

                    <div className="space-y-16">
                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">01</span> Introduction
                            </h2>
                            <p className="text-stone-400 leading-relaxed text-lg font-serif italic">
                                Welcome to TinyStepsArtLTD. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">02</span> Data We Collect
                            </h2>
                            <p className="text-stone-400 leading-relaxed">
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <span className="text-primary font-bold mt-1.5 text-xs">◆</span>
                                    <span className="text-stone-400"><strong className="text-white font-serif italic">Identity Data:</strong> includes first name, last name, username or similar identifier.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-primary font-bold mt-1.5 text-xs">◆</span>
                                    <span className="text-stone-400"><strong className="text-white font-serif italic">Contact Data:</strong> includes billing address, email address and telephone number.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-primary font-bold mt-1.5 text-xs">◆</span>
                                    <span className="text-stone-400"><strong className="text-white font-serif italic">Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-primary font-bold mt-1.5 text-xs">◆</span>
                                    <span className="text-stone-400"><strong className="text-white font-serif italic">Technical Data:</strong> includes IP address, login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</span>
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">03</span> How We Use Your Data
                            </h2>
                            <p className="text-stone-400 leading-relaxed">
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4 items-start">
                                    <span className="text-primary font-bold mt-1.5 text-xs">◆</span>
                                    <span className="text-stone-400">Where we need to perform the contract we are about to enter into or have entered into with you.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-primary font-bold mt-1.5 text-xs">◆</span>
                                    <span className="text-stone-400">Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-primary font-bold mt-1.5 text-xs">◆</span>
                                    <span className="text-stone-400">Where we need to comply with a legal or regulatory obligation.</span>
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">04</span> Data Security
                            </h2>
                            <p className="text-stone-400 leading-relaxed">
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those who have a business need to know.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black font-serif italic flex items-center gap-4 text-white">
                                <span className="text-primary text-sm not-italic font-sans">05</span> Contact Us
                            </h2>
                            <p className="text-stone-400 leading-relaxed italic font-serif">
                                If you have any questions about this privacy policy or our privacy practices, please contact us at: <span className="text-primary underline decoration-primary/30 underline-offset-4">support@tinystepsart.com</span>
                            </p>
                        </section>
                    </div>

                    {/* Footer Policy Links */}
                    <div className="mt-24 pt-8 border-t border-stone-900 flex flex-wrap gap-8 justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">
                        <Link href="/policies/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/policies/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
                        <Link href="/policies/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
