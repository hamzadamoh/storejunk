import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-charcoal dark:text-stone-200 font-display transition-colors duration-300 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-24 px-6 lg:px-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="font-serif text-4xl md:text-5xl font-black italic mb-8 text-charcoal dark:text-white">Refund Policy</h1>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Digital Goods</h2>
                        <p className="text-stone-500">
                            All of our products are digital downloads. Due to the nature of digital goods, they cannot be returned. Therefore, <strong>all sales are final</strong> and we are unable to offer refunds or exchanges once a purchase has been made and the files have been downloaded.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Exceptions</h2>
                        <p className="text-stone-500">
                            We want you to be happy with your purchase. If you encounter any technical issues with the file (e.g., corruption, wrong file), please contact us within 14 days of purchase. We will work with you to resolve the issue by providing a replacement file.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Duplicate Purchases</h2>
                        <p className="text-stone-500">
                            If you accidentally purchase the same digital product twice, please contact us with your order details, and we will issue a refund for the duplicate purchase.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                        <p className="text-stone-500">
                            For any issues regarding your order, please contact our support team at: [Your Support Email]
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
