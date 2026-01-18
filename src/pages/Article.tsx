import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart } from 'lucide-react';
import { Tweet } from 'react-tweet';
import { useContent } from '../context/ContentContext';
import AdUnit from '../components/AdUnit';
import SEO from '../components/SEO';
import Newsletter from '../components/Newsletter';
import RelatedArticles from '../components/RelatedArticles';

export default function Article() {
    // Get slug from URL params
    const { slug } = useParams();
    const { getArticle } = useContent();

    // Find article by slug
    const article = getArticle(slug || '');

    if (!article) return <div className="p-20 text-center text-zinc-500">Article not found</div>;

    // Extract Tweet ID from URL if present
    const tweetMatch = article.tweetUrl ? article.tweetUrl.match(/\/status\/(\d+)/) : null;
    const tweetId = tweetMatch ? tweetMatch[1] : null;

    const handleShare = async () => {
        const shareData = {
            title: article.title,
            text: article.content.substring(0, 100) + '...',
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-black min-h-screen"
        >
            <SEO
                title={article.title}
                description={article.content.substring(0, 160) + "..."}
                image={article.image}
                url={window.location.href}
                type="article"
                date={article.date}
                author={article.author}
            />

            {/* Sticky Header Actions */}
            <div className="sticky top-16 z-40 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link to="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition pointer-events-auto">
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex gap-2 pointer-events-auto">
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-pink-500/20 hover:text-pink-500 transition"
                        aria-label="Like article"
                    >
                        <Heart size={20} />
                    </button>
                    <button
                        onClick={handleShare}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition"
                        aria-label="Share article"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <div className="px-4 pb-20">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-2xl shadow-pink-900/20">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                            {article.category}
                        </span>
                    </div>
                </div>

                <div className="space-y-4 max-w-2xl mx-auto">
                    <AdUnit />

                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                        {article.title}
                    </h1>

                    <div className="h-px w-20 bg-gradient-to-r from-pink-500 to-transparent my-6" />

                    {/* Tweet Embed */}
                    {tweetId && (
                        <div className="flex justify-center my-8" data-theme="dark">
                            <Tweet id={tweetId} />
                        </div>
                    )}

                    <p className="text-lg leading-relaxed text-zinc-300 whitespace-pre-line">
                        {article.content}
                    </p>

                    <AdUnit />

                    <AdUnit />

                    {/* Engagement Section */}
                    <div className="mt-12">
                        <Newsletter />
                    </div>

                    <RelatedArticles currentArticleId={article.id} category={article.category} />

                </div>
            </div>
        </motion.div>
    );
}
