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
        <div className="w-full py-6 my-6 border-y border-white/5">
            <div className="grid grid-cols-4 gap-4">

                {/* X (Twitter) */}
                <button
                    onClick={handleShareX}
                    className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex flex-col items-center justify-center gap-2 group transition-all active:scale-95"
                >
                    {/* Visual adjustment: Scale down X logo slightly to match stroke weight of other icons */}
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white group-hover:scale-110 transition-transform" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                    <span className="text-[10px] font-medium text-white/40 group-hover:text-white/70">Post</span>
                </button>

                {/* SMS */}
                <button
                    onClick={handleShareSMS}
                    className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex flex-col items-center justify-center gap-2 group transition-all active:scale-95"
                >
                    <MessageCircle size={20} className="text-white group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-medium text-white/40 group-hover:text-white/70">Text</span>
                </button>

                {/* Copy */}
                <button
                    onClick={handleCopyLink}
                    className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex flex-col items-center justify-center gap-2 group transition-all active:scale-95"
                >
                    {copied ? (
                        <Check size={20} className="text-green-400" />
                    ) : (
                        <Link size={20} className="text-white group-hover:scale-110 transition-transform" />
                    )}
                    <span className={`text-[10px] font-medium transition-colors ${copied ? 'text-green-400' : 'text-white/40 group-hover:text-white/70'}`}>
                        {copied ? 'Copied' : 'Copy'}
                    </span>
                </button>

                {/* System Share */}
                <button
                    onClick={handleSystemShare}
                    className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex flex-col items-center justify-center gap-2 group transition-all active:scale-95"
                >
                    <Share2 size={20} className="text-white group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-medium text-white/40 group-hover:text-white/70">Share</span>
                </button>

            </div>
        </div>
    );
}
