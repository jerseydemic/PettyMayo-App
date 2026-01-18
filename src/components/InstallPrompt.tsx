import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, PlusSquare } from 'lucide-react';

export default function InstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        // 1. Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }

        // 2. Check if previously dismissed
        if (localStorage.getItem('pm_install_dismissed')) {
            return;
        }

        // 3. Detect Platform
        const userAgent = window.navigator.userAgent.toLowerCase();
        const ios = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(ios);

        if (ios) {
            // Show immediately on iOS if not dismissed
            // Wait a bit so it doesn't compete with page load
            setTimeout(() => setShowPrompt(true), 3000);
        } else {
            // 4. Capture event on Chrome/Android
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                setDeferredPrompt(e);
                setTimeout(() => setShowPrompt(true), 3000);
            });
        }
    }, []);

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pm_install_dismissed', 'true');
    };

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                handleDismiss();
            }
        }
    };

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
                >
                    <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl relative">
                        <button
                            onClick={handleDismiss}
                            className="absolute top-2 right-2 p-2 text-zinc-500 hover:text-white transition"
                            aria-label="Close install prompt"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-violet-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/20">
                                <span className="font-bold text-white">PM</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Install Petty Mayo</h3>
                                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                                    {isIOS
                                        ? "Install our app for the best experience. It's free and takes up almost no space."
                                        : "Add to your home screen for the full full-screen news experience."}
                                </p>

                                {isIOS ? (
                                    <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-300">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-zinc-800 p-1.5 rounded-md"><Share size={14} /></span>
                                            <span>1. Tap <span className="font-bold text-white">Share</span> below</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-zinc-800 p-1.5 rounded-md"><PlusSquare size={14} /></span>
                                            <span>2. Select <span className="font-bold text-white">Add to Home Screen</span></span>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleInstallClick}
                                        className="mt-4 bg-white text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-zinc-200 transition w-full"
                                    >
                                        Install App
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
