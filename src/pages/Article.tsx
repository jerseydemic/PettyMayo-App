import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchPosts, type Post } from '../data/posts';

export default function Article() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(location.state?.post || null);

    useEffect(() => {
        // Fallback: If accessed directly via URL or refresh
        if (!post && id) {
            fetchPosts().then(posts => {
                const found = posts.find(p => p.id === id);
                if (found) setPost(found);
            });
        }
    }, [id, post]);

    if (!post) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col animate-in fade-in duration-300">
            {/* Liquid Glass Header */}
            <div className="sticky top-0 z-20 bg-black/60 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-white/10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                    <ArrowLeft size={24} />
                </button>
                <span className="text-sm font-semibold tracking-widest uppercase text-white/70">Article</span>
                <button className="p-2 text-white/90 hover:text-white transition-colors rounded-full hover:bg-white/10">
                    <Share2 size={20} />
                </button>
            </div>

            {/* Article Content */}
            <div className="flex-1 overflow-y-auto pb-20">
                <div className="w-full aspect-square relative">
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="px-6 -mt-16 relative z-10">
                    {/* Title Card */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl mb-8">
                        <h1 className="text-2xl font-bold leading-tight font-serif text-white">{post.title}</h1>
                    </div>

                    {/* Body Text */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line text-lg font-light">
                            {post.content}
                        </p>
                    </div>

                    <div className="mt-12 py-8 border-t border-white/10 text-center">
                        <p className="text-xs text-white/30 uppercase tracking-[0.2em]">Real Petty Mayo • 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
