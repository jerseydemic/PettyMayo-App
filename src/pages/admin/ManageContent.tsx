import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Search, FileText, Pencil, AlertCircle, Eye } from 'lucide-react';
import { type Post, STATIC_POSTS } from '../../data/posts';

interface ManageContentProps {
    embedded?: boolean;
    onEdit?: (post: Post) => void;
}

export default function ManageContent({ embedded = false, onEdit }: ManageContentProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [deletedStaticIds, setDeletedStaticIds] = useState<string[]>([]);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = () => {
        try {
            // 1. Load Local Custom Posts
            const savedLocal = localStorage.getItem('local_posts');
            const localPosts: Post[] = savedLocal ? JSON.parse(savedLocal) : [];

            // 2. Load Deleted Static IDs
            const savedDeleted = localStorage.getItem('deleted_static_ids');
            const deletedIds: string[] = savedDeleted ? JSON.parse(savedDeleted) : [];
            setDeletedStaticIds(deletedIds);

            // 3. Merge: Local + Static (excluding deleted)
            // We want local posts to potentially OVERRIDE static ones if they share IDs?
            // For now, let's assume specific IDs for static (1-9) vs random UUIDs for local.
            // If a local post has same ID as static, we show the local one (edit mode).

            const staticActive = STATIC_POSTS.filter(p => !deletedIds.includes(p.id));

            // Map for easy override check
            const allPostsMap = new Map<string, Post>();

            // Add static first
            staticActive.forEach(p => allPostsMap.set(p.id, { ...p, _isStatic: true } as any));

            // Add local (overrides static if same ID)
            localPosts.forEach(p => allPostsMap.set(p.id, { ...p, _isLocal: true } as any));

            // Convert back to array and sort by ID (descending) or just put local first?
            // Let's sort by ID for stability, assuming numeric content for static.
            const merged = Array.from(allPostsMap.values());
            setPosts(merged);

        } catch (e) {
            console.error("Failed to load posts", e);
        }
    };

    const handleDelete = (post: any) => {
        if (!confirm('Are you sure you want to remove this story?')) return;

        try {
            if (post._isLocal) {
                // Permanently delete local post
                const savedLocal = localStorage.getItem('local_posts');
                const localPosts: Post[] = savedLocal ? JSON.parse(savedLocal) : [];
                const updated = localPosts.filter(p => p.id !== post.id);
                localStorage.setItem('local_posts', JSON.stringify(updated));
            } else {
                // Soft delete static post
                const newDeleted = [...deletedStaticIds, post.id];
                setDeletedStaticIds(newDeleted);
                localStorage.setItem('deleted_static_ids', JSON.stringify(newDeleted));
            }
            // Reload to reflect changes
            loadPosts();
        } catch (e) {
            console.error("Delete failed", e);
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || (post.category || 'news') === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={`font-sans text-white ${embedded ? 'h-full' : 'bg-[#121212] min-h-screen p-6'}`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-xl font-bold tracking-wide text-white uppercase">Content Manager</h1>
                    <p className="text-gray-400 text-xs mt-1">Audit and manage your publication's feed.</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-[#1e1e1e] border border-[#333] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="all">All Categories</option>
                        <option value="news">News</option>
                        <option value="gossip">Gossip</option>
                        <option value="politics">Politics</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="reality-tv">Reality TV</option>
                        <option value="opinion">Opinion</option>
                    </select>

                    <div className="relative flex-1 md:w-auto group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search stories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-64 bg-[#1e1e1e] border border-[#333] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-500"
                        />
                    </div>
                </div>
            </div>

            {filteredPosts.length === 0 ? (
                // ... (empty state)
                <div className="flex flex-col items-center justify-center p-12 text-gray-500 border border-[#333] border-dashed rounded-xl">
                    <AlertCircle size={32} className="mb-3 opacity-50" />
                    <p>No stories found matching your filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPosts.map((post: any) => (
                        <div key={post.id} className="group bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-[#2c2c2c] hover:border-gray-500 transition-colors flex flex-col">
                            {/* Card Image */}
                            <div className="aspect-video relative overflow-hidden bg-[#121212]">
                                {post.thumbnail ? (
                                    <img src={post.thumbnail} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                                        <FileText size={48} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    {/* Category Badge */}
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                                        {post.category || 'news'}
                                    </span>
                                    {/* Source Badge */}
                                    {post._isLocal ? (
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-500/90 text-white shadow-sm">
                                            Local
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-500/90 text-white shadow-sm">
                                            Static
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Card Content ... */}
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-bold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <div className="text-[10px] text-gray-500 font-mono mb-4">
                                    ID: {post.id}
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#333]">
                                    <div className="text-xs text-gray-400">
                                        {/* Placeholder for views or date if available */}
                                        <span className="flex items-center gap-1"><FileText size={12} /> Article</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link to={`/${post.category || 'news'}/${post.slug || post.id}`} target="_blank" className="p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded-lg transition-colors" title="View Story">
                                            <Eye size={18} />
                                        </Link>
                                        <button
                                            onClick={() => onEdit?.(post)}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-[#333] rounded-lg transition-colors"
                                            title="Edit Story"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete Story"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-8 text-center text-xs text-gray-600 uppercase tracking-widest">
                Showing {filteredPosts.length} stories
            </div>
        </div>
    );
}
