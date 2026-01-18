import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, ExternalLink, LogOut } from 'lucide-react';
import { fetchPosts, type Post } from '../../data/posts';
import { db } from '../../lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this article? This cannot be undone.')) {
            try {
                // Delete from Firestore
                await deleteDoc(doc(db, 'posts', id));

                // Bust cache
                localStorage.removeItem('cached_posts_v2');
                localStorage.removeItem('local_posts'); // Also clean legacy local

                // Refresh
                await loadPosts();
            } catch (err) {
                console.error("Delete failed", err);
                alert("Failed to delete post");
            }
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin_authed');
        window.location.reload();
    };

    const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter text-white">Dashboard</h1>
                    <p className="text-zinc-500 mt-1">Manage content feed</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleLogout} className="p-2 text-zinc-500 hover:text-white transition-colors" aria-label="Logout">
                        <LogOut size={20} />
                    </button>
                    <Link
                        to="/admin/create"
                        className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} /> New Article
                    </Link>
                </div>
            </div>

            {/* Toolbar */}
            <div className="mb-8 relative">
                <Search className="absolute left-4 top-3 text-zinc-500" size={18} />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search titles..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-12 py-3 outline-none focus:border-zinc-600 transition-colors text-zinc-200 placeholder:text-zinc-700"
                />
            </div>

            {/* List */}
            {loading ? (
                <div className="text-center py-20 text-zinc-600 animate-pulse">Loading content...</div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map(post => (
                        <div key={post.id} className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 rounded-xl p-4 flex items-center gap-6 transition-all">
                            {/* Thumb */}
                            <div className="w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden shrink-0">
                                <img src={post.thumbnail} alt="" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded">{post.category}</span>
                                    {post.timestamp && <span className="text-[10px] text-zinc-600">{new Date(post.timestamp).toLocaleDateString()}</span>}
                                </div>
                                <h3 className="text-lg font-bold text-zinc-200 truncate group-hover:text-white transition-colors">{post.title}</h3>
                                <div className="text-xs text-zinc-600 font-mono mt-1 truncate">/{post.category}/{post.slug}</div>
                            </div>

                            {/* Actions */}
                            <div className="flex  items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <a
                                    href={`/${post.category}/${post.slug}`}
                                    target="_blank"
                                    className="p-2 text-zinc-500 hover:text-blue-400 transition-colors"
                                    title="View Live"
                                >
                                    <ExternalLink size={18} />
                                </a>
                                <button
                                    onClick={() => navigate(`/admin/edit/${post.id}`)}
                                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={(e) => handleDelete(post.id, e)}
                                    className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="text-center py-20 text-zinc-600">No articles found.</div>
                    )}
                </div>
            )}
        </div>
    );
}
