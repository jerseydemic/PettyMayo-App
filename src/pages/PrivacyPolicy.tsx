import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 py-12 max-w-2xl mx-auto space-y-8 text-zinc-300"
        >
            <Helmet>
                <title>Privacy Policy | Petty Mayo</title>
                <meta name="description" content="Privacy Policy for Petty Mayo." />
            </Helmet>

            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            </div>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">1. Introduction</h2>
                <p>
                    Welcome to Petty Mayo. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">2. Data We Collect</h2>
                <p>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                    <li><strong>Usage Data:</strong> includes information about how you use our website.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">3. Cookies and Advertising</h2>
                <p>
                    We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
                </p>
                <p>
                    We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.
                </p>
                <p>
                    You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">4. Third-Party Links</h2>
                <p>
                    This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">5. Contact Us</h2>
                <p>
                    If you have any questions about this privacy policy or our privacy practices, please contact us.
                </p>
            </section>

            <div className="pt-8 border-t border-white/10 text-sm text-zinc-500">
                Last Updated: {new Date().toLocaleDateString()}
            </div>
        </motion.div>
    );
}
