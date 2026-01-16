import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Browser } from '@capacitor/browser';
import { fetchPosts, type Post } from '../data/posts';
import { Loader2, Instagram, Facebook, Settings } from 'lucide-react';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchPosts();
            setPosts(data);
            setLoading(false);
        };
        loadData();
    }, []);

    const handlePostClick = async (post: Post) => {
        if (post.content) {
            navigate(`/article/${post.id}`, { state: { post } });
        } else {
            await Browser.open({ url: post.articleUrl });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col">
            {/* Liquid Glass Header */}
            <header className="sticky top-0 z-10 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex justify-between items-center">
                <div className="w-6" /> {/* Spacer */}
                <h1 className="text-xl font-bold tracking-tight uppercase text-white/90 drop-shadow-sm">Petty Mayo</h1>
                <button onClick={() => navigate('/settings')} className="text-white/50 hover:text-white transition-colors">
                    <Settings size={20} />
                </button>
            </header>

            {/* Content */}
            <main className="flex-1 w-full max-w-md mx-auto">
                {/* Hero Banner */}
                <div className="w-full mb-0.5">
                    <img
                        src="/banner.jpg"
                        alt="Petty Mayonnaise"
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Grid Content */}
                {/* Grid Content */}
                <div className="w-full">
                    {loading ? (
                        <div className="flex h-[40vh] items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-1">
                            {posts.map((post) => (
                                <button
                                    key={post.id}
                                    onClick={() => handlePostClick(post)}
                                    // Removed aspect-square to allow natural height? No, grid needs structure.
                                    // Using aspect-square + object-contain ensures full image visible in square.
                                    // User said "entire image needs to fit". 
                                    // User said "Remove the white space borders u added".
                                    className="relative aspect-square w-full active:opacity-80 transition-opacity overflow-hidden bg-black"
                                >
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="h-full w-full object-contain"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Social Footer */}
            <footer className="mt-12 mb-8 px-6">
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
                </div>
                <div className="h-safe-area-bottom" /> {/* Safety spacing for iPhone Home Bar */}
            </footer>
        </div>
    );
}
