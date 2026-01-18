import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

export default function Home() {
    const { articles } = useContent();

    return (
        <div className="p-1">
            <div className="grid grid-cols-3 gap-1">
                {articles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        {/* Link Structure: /Category/Slug */}
                        <Link
                            to={`/${article.category.toLowerCase()}/${article.slug}`}
                            className="block relative aspect-square group overflow-hidden bg-zinc-900"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-1">{article.category}</span>
                                <h3 className="text-xs font-bold text-white line-clamp-2 leading-tight">{article.title}</h3>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
