import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-charcoal dark:text-stone-200 font-display transition-colors duration-300 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-24 px-6 lg:px-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="font-serif text-4xl md:text-5xl font-black italic mb-8 text-charcoal dark:text-white">Terms of Service</h1>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">1. Overview</h2>
                        <p className="text-stone-500">
                            This website is operated by TinyStepsArtLTD. Throughout the site, the terms “we”, “us” and “our” refer to TinyStepsArtLTD. TinyStepsArtLTD offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">2. Digital Products</h2>
                        <p className="text-stone-500">
                            All products listed in our shop are digital downloads. No physical product will be shipped. Upon purchase, you strictly receive a license to use the digital files for personal or small commercial use as defined in our specific license terms. You may not resell, redistribute, or share the original digital files.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">3. Accuracy, Completeness and Timeliness of Information</h2>
                        <p className="text-stone-500">
                            We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">4. Modifications to the Service and Prices</h2>
                        <p className="text-stone-500">
                            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">5. Governing Law</h2>
                        <p className="text-stone-500">
                            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of [Your Jurisdiction].
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
