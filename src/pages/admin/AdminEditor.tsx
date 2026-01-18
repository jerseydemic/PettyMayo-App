import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { fetchPosts, type Post } from '../../data/posts';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AdminEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('news');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const [tweetUrl, setTweetUrl] = useState('');
    const [tweetId, setTweetId] = useState<string | null>(null);

    // UI State
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            loadPost(id);
        }
    }, [id]);

    const loadPost = async (postId: string) => {
        const posts = await fetchPosts();
        const found = posts.find(p => p.id === postId);
        if (found) {
            setTitle(found.title);
            setSlug(found.slug);
            setCategory(found.category);
            setThumbnail(found.thumbnail);
            setContent(found.content || '');
            setTweetId(found.tweetId || null);
            if (found.tweetId) setTweetUrl(`https://twitter.com/x/status/${found.tweetId}`);
            setIsSlugManuallyEdited(true); // Don't auto-update slug on edit
        }
        setLoading(false);
    };

    // Auto-generate Slug
    useEffect(() => {
        if (!isSlugManuallyEdited && title) {
            const generated = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphen
                .replace(/^-+|-+$/g, '');   // Trim hyphens
            setSlug(generated);
        }
    }, [title, isSlugManuallyEdited]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTweetUrl = (url: string) => {
        setTweetUrl(url);
        // Extract ID
        const extractedId = url.split('/').pop()?.split('?')[0];
        if (extractedId && /^\d+$/.test(extractedId)) {
            setTweetId(extractedId);
        } else {
            setTweetId(null);
        }
    };

    const handleSave = async () => {
        if (!title || !slug || !thumbnail) {
            alert('Missing required fields (Title, Slug, Thumbnail)');
            return;
        }

        setSaving(true);
        const postId = id || Date.now().toString();

        const newPost: Post = {
            id: postId,
            title,
            slug,
            category,
            thumbnail,
            articleUrl: `https://instagram.com/realpettymay0`, // Legacy field, keeping generic
            content,
            tweetId,
            timestamp: Date.now()
        };

        try {
            await setDoc(doc(db, 'posts', postId), newPost);

            // Bust cache
            localStorage.removeItem('cached_posts_v2');

            navigate('/admin');
        } catch (e) {
            console.error(e);
            alert('Failed to save');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-12 text-center text-zinc-500">Loading editor...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-12 pb-32">
            {/* Nav */}
            <div className="flex items-center justify-between mb-8 sticky top-0 z-10 bg-[#09090b]/80 backdrop-blur py-4 border-b border-white/5">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider"
                >
                    <ArrowLeft size={18} /> Cancel
                </button>
                <div className="flex items-center gap-4">
                    <span className="text-zinc-600 text-xs uppercase tracking-widest">{id ? 'Editing' : 'New Draft'}</span>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-white text-black px-8 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? 'Saving...' : <><Save size={18} /> Publish</>}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Column */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Title */}
                    <div className="group">
                        <textarea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Article Title"
                            className="w-full bg-transparent text-5xl font-bold text-white placeholder:text-zinc-800 outline-none resize-none overflow-hidden leading-tight"
                            rows={2}
                            style={{ minHeight: '1.2em' }}
                        />
                        {/* Slug Field */}
                        <div className="flex items-center gap-2 mt-4 text-zinc-500 group-focus-within:text-zinc-400 transition-colors">
                            <LinkIcon size={14} />
                            <span className="text-zinc-600">/</span>
                            <span className="text-zinc-400 font-mono text-xs">{category}/</span>
                            <input
                                value={slug}
                                onChange={(e) => {
                                    setSlug(e.target.value);
                                    setIsSlugManuallyEdited(true);
                                }}
                                className="bg-transparent text-zinc-400 font-mono text-xs outline-none flex-1 border-b border-transparent focus:border-zinc-700 focus:text-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tell the story..."
                        className="w-full min-h-[500px] bg-transparent text-lg text-zinc-300 placeholder:text-zinc-800 outline-none resize-none leading-relaxed font-serif"
                    />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Image Upload */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Thumbnail</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-video bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-600 transition-colors relative group"
                        >
                            {thumbnail ? (
                                <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 gap-2">
                                    <ImageIcon size={24} />
                                    <span className="text-[10px] uppercase font-bold">Upload Image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Category</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['news', 'gossip', 'politics', 'entertainment', 'reality-tv', 'opinion'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border transition-all ${category === cat ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tweet Embed */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">X (Twitter) Embed</label>
                        <input
                            value={tweetUrl}
                            onChange={(e) => handleTweetUrl(e.target.value)}
                            placeholder="https://x.com/status/..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-white outline-none focus:border-zinc-600"
                        />
                        {tweetId && (
                            <div className="text-[10px] text-green-500 flex items-center gap-1">
                                ✓ ID Extracted: {tweetId}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
