import { Share2, MessageCircle, Link, Check } from 'lucide-react';
import { useState } from 'react';
import { Share as CapacitorShare } from '@capacitor/share';

interface ShareOptionsProps {
    title: string;
    url: string;
}

export default function ShareOptions({ title, url }: ShareOptionsProps) {
    const [copied, setCopied] = useState(false);

    const handleShareX = () => {
        const text = encodeURIComponent(`Check out this tea! ☕️ ${title}`);
        const shareUrl = encodeURIComponent(url);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
    };

    const handleShareSMS = () => {
        const body = encodeURIComponent(`Check out this story: ${title} ${url}`);
        window.location.href = `sms:?&body=${body}`;
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleSystemShare = async () => {
        try {
            await CapacitorShare.share({
                title: title,
                text: `Check out this tea! ☕️ ${title}`,
                url: url,
                dialogTitle: 'Share with friends',
            });
        } catch (e) {
            console.log('Share cancelled or failed', e);
        }
    };

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[320px] h-16 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-evenly px-2 shadow-2xl animate-in slide-in-from-bottom-20 duration-500">

            {/* X (Twitter) */}
            <button
                onClick={handleShareX}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
            </button>

            <div className="w-px h-6 bg-white/5" />

            {/* SMS */}
            <button
                onClick={handleShareSMS}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
                <MessageCircle size={20} />
            </button>

            <div className="w-px h-6 bg-white/5" />

            {/* Copy */}
            <button
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
                {copied ? <Check size={20} className="text-green-400" /> : <Link size={20} />}
            </button>

            <div className="w-px h-6 bg-white/5" />

            {/* System Share */}
            <button
                onClick={handleSystemShare}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
                <Share2 size={20} />
            </button>

        </div>
    );
}
