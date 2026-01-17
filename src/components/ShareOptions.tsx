import { Share2, MessageSquare, Link2, Check, Twitter } from 'lucide-react';
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
        <div className="w-full flex items-center justify-between gap-3 py-6 border-y border-white/5 my-6">

            {/* X (Twitter) */}
            <button
                onClick={handleShareX}
                className="flex-1 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 transition-all active:scale-95 group"
            >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
            </button>

            {/* SMS */}
            <button
                onClick={handleShareSMS}
                className="flex-1 h-12 rounded-xl bg-gray-900 border border-white/10 flex items-center justify-center text-green-400/80 hover:text-green-400 hover:bg-green-400/10 hover:border-green-400/30 transition-all active:scale-95"
            >
                <MessageSquare size={20} />
            </button>

            {/* Copy */}
            <button
                onClick={handleCopyLink}
                className="flex-1 h-12 rounded-xl bg-gray-900 border border-white/10 flex items-center justify-center text-blue-400/80 hover:text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30 transition-all active:scale-95 relative overflow-hidden"
            >
                {copied ? (
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider animate-in zoom-in">
                        <Check size={16} />
                    </span>
                ) : (
                    <Link2 size={20} />
                )}
            </button>

            {/* System Share */}
            <button
                onClick={handleSystemShare}
                className="flex-1 h-12 rounded-xl bg-gray-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all active:scale-95"
            >
                <Share2 size={20} />
            </button>

        </div>
    );
}
