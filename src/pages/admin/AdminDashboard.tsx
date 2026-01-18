import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reorder } from 'framer-motion';
import { Plus, GripVertical, Edit2, Trash2, Settings, Eye } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export default function AdminDashboard() {
    const { articles, reorderArticles, deleteArticle } = useContent();

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-12">
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-3xl font-bold tracking-tight">Manage Content</h1>
                <div className="flex gap-2">
                    <Link
                        to="/admin/settings"
                        className="bg-zinc-800 text-white px-4 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-700 transition flex items-center gap-2"
                    >
                        <Settings size={18} />
                    </Link>
                    <Link
                        to="/admin/new"
                        className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition flex items-center gap-2"
                    >
                        <Plus size={18} /> New Article
                    </Link>
                </div>
            </div>

            <div className="bg-zinc-900/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                <Reorder.Group axis="y" values={articles} onReorder={reorderArticles} className="divide-y divide-white/5">
                    {articles.map((item) => (
                        <Reorder.Item key={item.id} value={item} className="bg-transparent relative">
                            <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition group">
                                <div className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-white p-2">
                                    <GripVertical size={20} />
                                </div>

                                <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-70" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.category}</span>
                                    </div>
                                    <div className="font-bold text-zinc-200 truncate">{item.title}</div>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        to={`/${item.category.toLowerCase()}/${item.slug}`}
                                        className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition"
                                        target="_blank"
                                        title="View Article"
                                    >
                                        <Eye size={18} />
                                    </Link>
                                    <Link
                                        to={`/admin/edit/${item.id}`}
                                        className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition"
                                        title="Edit Article"
                                    >
                                        <Edit2 size={18} />
                                    </Link>
                                    <button
                                        onClick={() => deleteArticle(item.id)}
                                        className="p-2 rounded-full hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition"
                                        title="Delete Article"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>

            <p className="text-center text-zinc-600 mt-6 text-sm">Drag items to reorder the grid</p>
        </div>
    );
}
