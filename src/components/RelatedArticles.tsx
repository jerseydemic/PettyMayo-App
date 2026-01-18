import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowRight } from 'lucide-react';

interface RelatedArticlesProps {
    currentArticleId: string;
    category: string;
}

export default function RelatedArticles({ currentArticleId, category }: RelatedArticlesProps) {
    const { articles } = useContent();

    // Recommendation Logic:
    // 1. Filter out current article
    // 2. Prioritize same category
    // 3. Fallback to recent if not enough category matches
    // 4. Take top 3

    const related = articles
        .filter(a => a.id !== currentArticleId)
        .sort((a, b) => {
            // Give score: Same Category = +10, Else = 0
            const scoreA = a.category === category ? 10 : 0;
            const scoreB = b.category === category ? 10 : 0;

            // If scores equal, sort by date (newest first) - assuming ID/Order correlates or just use index
            if (scoreA === scoreB) return (b.order || 0) - (a.order || 0);
            return scoreB - scoreA;
        })
        .slice(0, 3);

    if (related.length === 0) return null;

    return (
        <div className="my-16 space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">Read This Next</h3>
                <Link to="/" className="text-sm font-bold text-pink-500 hover:text-pink-400 transition flex items-center gap-1">
                    View All <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(article => (
                    <Link key={article.id} to={`/${article.slug}`} className="group block space-y-4">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition" />
                            <div className="absolute top-3 left-3">
                                <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold text-white px-2 py-1 rounded-full uppercase tracking-wider border border-white/10">
                                    {article.category}
                                </span>
                            </div>
                        </div>
                        <h4 className="text-lg font-bold text-white leading-tight group-hover:text-pink-500 transition line-clamp-2">
                            {article.title}
                        </h4>
                        <p className="text-sm text-zinc-400 line-clamp-2">
                            {article.content.substring(0, 80)}...
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
