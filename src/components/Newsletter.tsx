import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setStatus('loading');
        try {
            await addDoc(collection(db, 'subscribers'), {
                email,
                source: 'web_article_footer',
                joinedAt: serverTimestamp(),
            });
            setStatus('success');
            setEmail('');
        } catch (error) {
            console.error('Newsletter error:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-gradient-to-br from-green-900/40 to-black border border-green-500/30 p-8 rounded-3xl text-center space-y-4 my-12 relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-500/10 blur-3xl opacity-20 group-hover:opacity-30 transition duration-1000" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-2">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">You're on the list!</h3>
                    <p className="text-zinc-400">Welcome to the club. The tea will be served hot. 🍵</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 md:p-12 rounded-3xl text-center space-y-6 my-12 relative overflow-hidden group">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/20 blur-[100px] rounded-full pointer-events-none opacity-50 group-hover:opacity-70 transition duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto space-y-6">
                <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                        Don't Miss the Tea.
                    </h3>
                    <p className="text-lg text-zinc-400">
                        Join 50k+ petty fans. Get the latest drama delivered straight to your inbox.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading'}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 outline-none focus:border-pink-500/50 focus:bg-white/10 transition disabled:opacity-50"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-zinc-200 active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {status === 'loading' ? 'Joining...' : <>Join <ArrowRight size={18} /></>}
                    </button>
                </form>

                {status === 'error' && (
                    <p className="text-red-400 text-sm">Something went wrong. Try again later.</p>
                )}

                <p className="text-xs text-zinc-600">
                    No spam. Just quality content. Unsubscribe anytime.
                </p>
            </div>
        </div>
    );
}
