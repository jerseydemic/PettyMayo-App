import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-6 py-12 max-w-2xl mx-auto space-y-8 text-zinc-300"
        >
            <Helmet>
                <title>Terms of Service | Petty Mayo</title>
                <meta name="description" content="Terms and Conditions for Petty Mayo." />
            </Helmet>

            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
            </div>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
                <p>
                    By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">2. Use License</h2>
                <p>
                    Permission is granted to temporarily view the materials (information or software) on Petty Mayo's website for personal, non-commercial transitory viewing only.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">3. Disclaimer</h2>
                <p>
                    The materials on Petty Mayo's website are provided on an 'as is' basis. Petty Mayo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-bold text-white">4. Limitations</h2>
                <p>
                    In no event shall Petty Mayo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Petty Mayo's website.
                </p>
            </section>

            <div className="pt-8 border-t border-white/10 text-sm text-zinc-500">
                Last Updated: {new Date().toLocaleDateString()}
            </div>
        </motion.div>
    );
}
