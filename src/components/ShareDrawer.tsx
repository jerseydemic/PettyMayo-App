import { X, MessageSquare, Link2, Share2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Share as CapacitorShare } from '@capacitor/share';

interface ShareDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    url: string;
    thumbnail?: string;
}

export default function ShareDrawer({ isOpen, onClose, title, url, thumbnail }: ShareDrawerProps) {
    const [copied, setCopied] = useState(false);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

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
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Drawer/Modal */}
            <div className="relative w-full max-w-sm sm:max-w-md bg-[#1e1e1e]/90 backdrop-blur-xl border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-full duration-300 pb-10 sm:pb-6">

                {/* Drag Handle (Mobile Visual) */}
                <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6 sm:hidden" />

                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-bold text-white tracking-wide">Share Story</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close share drawer"
                        className="p-1 text-gray-400 hover:text-white bg-white/5 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Article Preview */}
                <div className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5 mb-6">
                    {thumbnail && (
                        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-800">
                            <img src={thumbnail} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight pr-2">{title}</h3>
                        <p className="text-[10px] text-gray-400 mt-1 truncate">{url}</p>
                    </div>
                </div>

                {/* Share Grid */}
                <div className="grid grid-cols-4 gap-4 mb-2">
                    {/* X (Twitter) */}
                    <button onClick={handleShareX} className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-lg group-active:scale-95 transition-all text-white">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </div>
                        <span className="text-[10px] font-medium text-gray-300">X</span>
                    </button>

                    {/* SMS */}
                    <button onClick={handleShareSMS} className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-active:scale-95 transition-all text-white">
                            <MessageSquare size={24} fill="currentColor" className="text-white" />
                        </div>
                        <span className="text-[10px] font-medium text-gray-300">Message</span>
                    </button>

                    {/* Copy Link */}
                    <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shadow-lg group-active:scale-95 transition-all text-white relative">
                            {copied ? (
                                <Check size={24} className="text-green-400 animate-in zoom-in spin-in-90 duration-200" />
                            ) : (
                                <Link2 size={24} />
                            )}
                        </div>
                        <span className="text-[10px] font-medium text-gray-300">{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>

                    {/* System */}
                    <button onClick={handleSystemShare} className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shadow-lg group-active:scale-95 transition-all text-white">
                            <Share2 size={24} />
                        </div>
                        <span className="text-[10px] font-medium text-gray-300">More</span>
                    </button>
                </div>

            </div>
        </div>
    );
}
