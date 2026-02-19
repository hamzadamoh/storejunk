import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShippingPolicyPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-charcoal dark:text-stone-200 font-display transition-colors duration-300 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-24 px-6 lg:px-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="font-serif text-4xl md:text-5xl font-black italic mb-8 text-charcoal dark:text-white">Delivery Policy</h1>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Digital Delivery Only</h2>
                        <p className="text-stone-500">
                            <strong>TinyStepsArtLTD sells exclusively digital products. No physical items will be shipped to your address.</strong>
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Instant Download</h2>
                        <p className="text-stone-500">
                            Upon successful payment, you will receive an immediate download link on the checkout confirmation page. Additionally, an email containing your download links will be sent to the email address provided during checkout.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Delivery Time</h2>
                        <p className="text-stone-500">
                            Files are available for download instantly after payment processing is complete. In rare cases where payment processing is delayed by the payment provider (e.g., PayPal eCheck), delivery will occur once the payment has cleared.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">Lost Files</h2>
                        <p className="text-stone-500">
                            If you lose your files or your download link expires, please contact us with your order number, and we will resend your download links.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
