import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Browser } from '@capacitor/browser';
import { fetchPosts, type Post } from '../data/posts';
import { Loader2, Instagram, Facebook } from 'lucide-react';

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
            <header className="sticky top-0 z-10 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex justify-center items-center">
                <h1 className="text-xl font-bold tracking-tight uppercase text-white/90 drop-shadow-sm">Petty Mayo</h1>
            </header>

            {/* Content */}
            <main className="flex-1 pb-20">
                {/* Hero Banner */}
                <div className="w-full mb-0.5">
                    <img
                        src="/banner.jpg"
                        alt="Petty Mayonnaise"
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Grid Content */}
                <div className="px-0.5">
                    {loading ? (
                        <div className="flex h-[40vh] items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-1.5"> {/* Increased gap for cleaner look */}
                            {posts.map((post) => (
                                <button
                                    key={post.id}
                                    onClick={() => handlePostClick(post)}
                                    className="relative aspect-square w-full run-in bg-white/5 active:opacity-80 transition-opacity overflow-hidden rounded-sm"
                                >
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Social Footer */}
            <footer className="py-8 px-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex justify-center gap-6 mb-4">
                    <a href="https://instagram.com/realpettymay0" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <Instagram size={24} className="text-white" />
                    </a>
                    <a href="https://facebook.com/realpettymayo" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <Facebook size={24} className="text-white" />
                    </a>
                </div>
                <p className="text-center text-xs text-white/40 uppercase tracking-widest font-medium">Follow for more tea ☕️</p>
            </footer>
        </div>
    );
}
