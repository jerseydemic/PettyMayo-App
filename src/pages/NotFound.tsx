import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
        >
            <Helmet>
                <title>404: Lost in the Sauce | Petty Mayo</title>
            </Helmet>

            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-8 border border-white/10 shadow-2xl shadow-pink-500/10">
                <span className="text-4xl">🫣</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent mb-4">
                404
            </h1>

            <h2 className="text-2xl font-bold text-white mb-4">
                Lost in the Sauce?
            </h2>

            <p className="text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed">
                The page you're looking for has been deleted, moved, or never existed.
                Don't worry, the tea is still hot back home.
            </p>

            <Link
                to="/"
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition flex items-center gap-2"
            >
                <Home size={20} /> Back to Home
            </Link>
        </motion.div>
    );
}
