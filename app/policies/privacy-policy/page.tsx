import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-charcoal dark:text-stone-200 font-display transition-colors duration-300 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow py-24 px-6 lg:px-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="font-serif text-4xl md:text-5xl font-black italic mb-8 text-charcoal dark:text-white">Privacy Policy</h1>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">1. Introduction</h2>
                        <p className="text-stone-500">
                            Welcome to TinyStepsArtLTD. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">2. Data We Collect</h2>
                        <p className="text-stone-500">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 text-stone-500 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> includes billing address, email address and telephone number.</li>
                            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">3. How We Use Your Data</h2>
                        <p className="text-stone-500">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-stone-500 space-y-2">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">4. Data Security</h2>
                        <p className="text-stone-500">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold">5. Contact Us</h2>
                        <p className="text-stone-500">
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: [Your Contact Email]
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
