import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-12 mb-8 px-6 w-full">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 mx-auto max-w-sm">
                <div className="flex justify-center gap-16">
                    <a href="https://instagram.com/realpettymay0" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors transform hover:scale-110">
                        <Instagram size={28} />
                    </a>
                    <a href="https://facebook.com/realpettymayo" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors transform hover:scale-110">
                        <Facebook size={28} />
                    </a>
                </div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-medium pt-2 border-t border-white/5 w-full text-center">
                    Stay Petty 💅
                </p>
                <Link to="/privacy" className="text-[10px] text-white/30 hover:text-white/50 transition-colors uppercase tracking-widest">
                    Privacy Policy
                </Link>
            </div>
            <div className="h-safe-area-bottom" /> {/* Safety spacing for iPhone Home Bar */}
        </footer>
    );
}
