import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts, type Post } from '../data/posts';
import { Loader2 } from 'lucide-react';
import Footer from '../components/Footer';
import PullToRefresh from '../components/PullToRefresh';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        const data = await fetchPosts();
        setPosts(data);
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await loadData();
            setLoading(false);
        };
        init();
    }, []);

    const handleRefresh = async () => {
        // Add artificial delay for better UX (so user sees the spinner)
        await new Promise(resolve => setTimeout(resolve, 1000));
        await loadData();
    };

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col">
            {/* Liquid Glass Header */}
            <header className="sticky top-0 z-10 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top))] flex justify-center items-center relative">
                <h1 className="text-xl font-bold tracking-tight uppercase text-white/90 drop-shadow-sm">Petty Mayo</h1>
            </header>

            {/* Content */}
            <main className="flex-1 w-full max-w-md mx-auto">
                <PullToRefresh onRefresh={handleRefresh}>
                    {/* Hero Banner */}
                    {/* Hero Banner - HIDDEN
                    <div className="w-full mb-0.5 pointer-events-none">
                        <img
                            src="/banner.jpg"
                            alt="Petty Mayonnaise"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    */}

                    {/* Grid Content */}
                    <div className="w-full">
                        {loading ? (
                            <div className="flex h-[40vh] items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-1">
                                {posts.map((post) => (
                                    <Link
                                        key={post.id}
                                        to={`/${post.category || 'news'}/${post.slug || post.id}`} // Fallback for old/custom posts without slugs
                                        className="group relative aspect-[4/5] overflow-hidden bg-gray-900 border border-white/10"
                                    >
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="h-full w-full object-contain"
                                            loading="lazy"
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Social Footer */}
                    <Footer />
                </PullToRefresh>
            </main>
        </div>
    );
}
