import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Search, FileText, Pencil, Eye, Filter, LayoutGrid, List as ListIcon } from 'lucide-react';
import { type Post } from '../../data/posts';

interface ManageContentProps {
    embedded?: boolean;
    onEdit?: (post: Post) => void;
}

export default function ManageContent({ embedded = false, onEdit }: ManageContentProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const allPosts = await import('../../data/posts').then(m => m.fetchPosts());
            setPosts(allPosts);
        } catch (e) {
            console.error("Failed to load posts", e);
        }
    };

    const handleDelete = async (post: any) => {
        if (!confirm('Are you sure you want to remove this story?')) return;

        try {
            const { doc, deleteDoc } = await import('firebase/firestore');
            const { db } = await import('../../lib/firebase');

            await deleteDoc(doc(db, "posts", post.id));
            loadPosts();
        } catch (e) {
            console.error("Delete failed", e);
            alert("Failed to delete. Is this a static post?");
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || (post.category || 'news') === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className={`font-sans text-white ${embedded ? 'h-full' : 'bg-[#09090b] min-h-screen p-6 md:p-8'}`}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 tracking-tight">
                        Content Manager
                    </h1>
                    <p className="text-white/40 mt-1 text-sm font-medium tracking-wide">
                        {posts.length} STORIES ACTIVE
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10 self-start md:self-auto backdrop-blur-md">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}
                    >
                        <ListIcon size={18} />
                    </button>
                </div>
            </div>

            {/* Glass Control Bar */}
            <div className="sticky top-4 z-20 mb-8">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50" />

                <div className="relative p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-white/40 group-focus-within:text-blue-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search stories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full h-11 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex w-full md:w-auto overflow-x-auto pb-1 md:pb-0 gap-2 no-scrollbar">
                        {[
                            { id: 'all', label: 'All' },
                            { id: 'news', label: 'News' },
                            { id: 'gossip', label: 'Gossip' },
                            { id: 'entertainment', label: 'Ent' },
                            { id: 'politics', label: 'Politics' },
                            { id: 'opinion', label: 'Opinion' },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`
                                    px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border
                                    ${selectedCategory === cat.id
                                        ? 'bg-blue-600 border-blue-500/50 text-white shadow-lg shadow-blue-900/40'
                                        : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/10'}
                                `}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            {filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <Filter className="text-white/20" size={32} />
                    </div>
                    <p className="text-white/40 font-medium">No stories found matching your criteria</p>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-3"}>
                    {filteredPosts.map((post: any) => (
                        <div
                            key={post.id}
                            className={`
                                group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden
                                ${viewMode === 'grid' ? 'rounded-3xl flex flex-col' : 'rounded-xl flex items-center p-2 gap-4'}
                            `}
                        >
                            {/* Card Image */}
                            <div className={`
                                relative overflow-hidden bg-black/50
                                ${viewMode === 'grid' ? 'aspect-video w-full' : 'w-24 h-16 rounded-lg flex-shrink-0'}
                            `}>
                                {post.thumbnail ? (
                                    <img
                                        src={post.thumbnail}
                                        alt=""
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FileText className="text-white/20" size={viewMode === 'grid' ? 48 : 24} />
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                {/* Category Badge (Grid Only) */}
                                {viewMode === 'grid' && (
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[10px] uppercase font-bold text-white/80 tracking-widest shadow-xl">
                                            {post.category || 'News'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className={viewMode === 'grid' ? "p-5 flex flex-col flex-1" : "flex-1 min-w-0 py-1"}>
                                {/* Meta info */}
                                {viewMode === 'list' && (
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                                            {post.category || 'News'}
                                        </span>
                                        <span className="text-[10px] text-white/30 font-mono">
                                            #{post.id.slice(0, 6)}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between gap-4">
                                    <h3 className={`
                                        font-bold text-white leading-tight group-hover:text-blue-400 transition-colors
                                        ${viewMode === 'grid' ? 'text-lg mb-2 line-clamp-2' : 'text-sm truncate'}
                                    `}>
                                        {post.title}
                                    </h3>
                                </div>

                                {viewMode === 'grid' && (
                                    <p className="text-xs text-white/40 font-mono truncate mb-6">
                                        /{post.slug}
                                    </p>
                                )}

                                {/* Actions */}
                                <div className={`
                                    flex items-center gap-2 
                                    ${viewMode === 'grid' ? 'mt-auto pt-4 border-t border-white/5' : ''}
                                `}>
                                    <Link
                                        to={`/${post.category || 'news'}/${post.slug || post.id}`}
                                        target="_blank"
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-white/20 transition-all"
                                        title="View Live"
                                    >
                                        <Eye size={14} />
                                    </Link>

                                    <div className="flex-1" />

                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(post)}
                                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 border border-blue-500/20 transition-all text-xs font-bold uppercase tracking-wider"
                                        >
                                            <Pencil size={12} />
                                            <span className={viewMode === 'list' ? 'hidden md:inline' : ''}>Edit</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(post)}
                                        className="flex items-center justify-center w-8 h-8 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
