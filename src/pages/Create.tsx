
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Check, Sparkles, Twitter, X } from 'lucide-react';
import { generateStoryFromImage } from '../lib/gemini';
import type { Post } from '../data/posts';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface CreateProps {
    embedded?: boolean;
    editingPost?: Post;
    onClearEdit?: () => void;
}

export default function Create({ embedded, editingPost, onClearEdit }: CreateProps) {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Content State
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState("We Can't Believe What Just Happened");
    const [slug, setSlug] = useState("we-cant-believe-what-just-happened");
    const [category, setCategory] = useState("news");
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
    const [content, setContent] = useState('');
    const [tweetInput, setTweetInput] = useState('');

    const [tweetId, setTweetId] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Populate form on edit
    useEffect(() => {
        if (editingPost) {
            // eslint-disable-next-line
            setTitle(editingPost.title);
            setSlug(editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            setCategory(editingPost.category || 'news');
            setContent(editingPost.content || '');
            setImage(editingPost.thumbnail);
            setTweetId(editingPost.tweetId || null);
            if (editingPost.tweetId) setTweetInput(`https://twitter.com/x/status/${editingPost.tweetId}`);
        } else {
            // Reset if editingPost is removed (e.g. cancelled)
            setTitle("We Can't Believe What Just Happened");
            setSlug("we-cant-believe-what-just-happened");
            setCategory("news");
            setIsSlugManuallyEdited(false);
            setContent('');
            setImage(null);
            setTweetId(null);
            setTweetInput('');
        }
    }, [editingPost]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTweetExtract = (url: string) => {
        setTweetInput(url);
        // Simple extraction logic
        const id = url.split('/').pop()?.split('?')[0];
        if (id && /^\d+$/.test(id)) {
            setTweetId(id);
        } else {
            setTweetId(null);
        }
    };

    const handleTagsGenerate = async () => {
        if (!image) return;
        setIsGenerating(true);
        try {
            const story = await generateStoryFromImage(image);
            setTitle(story.headline);
            setSlug(story.slug);
            setCategory(story.category);
            setContent(story.body);
        } catch (e: any) {
            console.error(e);
            const msg = e.message || e.toString();
            alert(`Generation Error: ${msg}\n\nPlease verify your API Key in Vercel settings.`);
        } finally {
            setIsGenerating(false);
        }
    };


    const handleSave = async () => {
        const newPost: Post = {
            id: editingPost?.id || Date.now().toString(),
            thumbnail: image || '/placeholder.jpg',
            title: title || 'New Tea Spilled',
            slug: slug || 'new-tea-spilled',
            category: category || 'news',
            articleUrl: '#',
            content: content,
            tweetId: tweetId || undefined,
            timestamp: Date.now() // Always bump timestamp
        };

        try {
            await setDoc(doc(db, "posts", newPost.id), newPost);

            if (onClearEdit) {
                onClearEdit();
                alert('Story Synced to Cloud!');
            } else {
                window.location.href = '/';
            }
        } catch (e) {
            console.error("Error saving post: ", e);
            alert("Failed to save. Check console.");
        }
    };

    return (
        <div className={`h-full flex flex-col font-sans text-white ${embedded ? '' : 'min-h-screen bg-[#050505]'}`}>

            {/* Header */}
            {!embedded && (
                <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl px-6 py-4 flex items-center border-b border-white/5 shadow-lg">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="ml-4 font-bold uppercase tracking-widest text-lg text-white">New Story</span>
                </div>
            )}

            {/* Top Bar Actions (for Embedded Mode) */}
            {embedded && (
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6 flex items-center justify-between shadow-lg shadow-black/20">
                    <div className="flex items-center gap-2">
                        {editingPost && (
                            <button onClick={onClearEdit} className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10">
                                <X size={18} />
                            </button>
                        )}
                        <h3 className="font-bold text-gray-200 tracking-tight flex items-center gap-2">
                            {editingPost ? <span className="text-blue-400">Editing Mode</span> : <span className="text-emerald-400">New Draft</span>}
                        </h3>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={!title}
                        className="bg-white text-black h-10 px-6 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-200 disabled:opacity-50 transition-all flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] active:scale-95"
                    >
                        <Check size={16} />
                        Save Story
                    </button>
                </div>
            )}


            <div className="flex-1 overflow-y-auto pb-20 custom-scrollbar">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Main Creation Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column: Visuals & AI */}
                        <div className="space-y-6">
                            {/* Visual Asset Card */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-4 block flex items-center gap-2">
                                    <Sparkles size={12} className="text-purple-400" />
                                    Visual Intelligence
                                </label>

                                <div className="space-y-4">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`w-full aspect-video bg-black/40 rounded-xl cursor-pointer border border-dashed flex items-center justify-center overflow-hidden transition-all group relative ${image ? 'border-green-500/50' : 'border-white/10 hover:border-blue-500/50 hover:bg-black/60'}`}
                                    >
                                        {image ? (
                                            <img src={image} alt="Uploaded" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-blue-400 transition-colors">
                                                <div className="p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform">
                                                    <Upload size={20} />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Upload Image</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>

                                    <button
                                        onClick={handleTagsGenerate}
                                        disabled={!image || isGenerating}
                                        className={`w-full h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!image
                                            ? 'bg-white/5 border border-white/5 text-gray-600 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-purple-900/20 active:scale-[0.98]'
                                            }`}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span className="text-xs uppercase tracking-wider">Processing...</span>
                                            </>
                                        ) : !image ? (
                                            <>
                                                <Sparkles size={16} className="opacity-30" />
                                                <span className="text-xs uppercase tracking-wider opacity-50">Upload to Generate</span>
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={16} />
                                                <span className="text-xs uppercase tracking-wider">Magic Generate</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Meta Card */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-4 block">Publication Data</label>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] text-gray-400 font-bold mb-1.5 block">CATEGORY</label>
                                        <div className="relative">
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full h-12 bg-black/40 text-white px-4 rounded-lg border border-white/10 focus:border-blue-500/50 focus:bg-black/60 focus:outline-none text-sm appearance-none transition-all"
                                            >
                                                <option value="news">News</option>
                                                <option value="gossip">Gossip</option>
                                                <option value="politics">Politics</option>
                                                <option value="entertainment">Entertainment</option>
                                                <option value="reality-tv">Reality TV</option>
                                                <option value="opinion">Opinion</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] text-gray-400 font-bold mb-1.5 block flex items-center gap-1.5"><Twitter size={10} className="text-blue-400" /> TWEET URL</label>
                                        <input
                                            value={tweetInput}
                                            onChange={(e) => handleTweetExtract(e.target.value)}
                                            className="w-full h-12 bg-black/40 text-gray-300 text-xs px-4 rounded-lg border border-white/10 focus:border-blue-500/50 focus:bg-black/60 focus:outline-none font-mono placeholder:text-gray-700 transition-all"
                                            placeholder="https://twitter.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Content Editor */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl backdrop-blur-sm min-h-[600px] flex flex-col">
                                <div className="space-y-6 mb-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em]">Headline</label>
                                        <input
                                            value={title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                                if (!isSlugManuallyEdited) {
                                                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                                                }
                                            }}
                                            className="w-full bg-black/20 text-white text-3xl font-bold p-4 -ml-4 rounded-xl border border-transparent focus:border-white/10 focus:bg-black/40 focus:outline-none transition-all placeholder:text-gray-700"
                                            placeholder="Enter a catchy headline..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em]">Slug (SEO)</label>
                                        <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-white/5 px-3 py-2">
                                            <span className="text-xs text-gray-600 font-mono">/story/</span>
                                            <input
                                                value={slug}
                                                onChange={(e) => {
                                                    setSlug(e.target.value);
                                                    setIsSlugManuallyEdited(true);
                                                }}
                                                className="flex-1 bg-transparent text-gray-400 font-mono text-xs focus:outline-none focus:text-blue-400 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 flex-1 flex flex-col">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em]">Story Content</label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full flex-1 bg-transparent text-gray-300 p-0 border-none focus:ring-0 focus:outline-none transition-all font-serif text-lg leading-relaxed resize-none placeholder:text-gray-700 placeholder:italic"
                                        placeholder="Start writing your masterpiece..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
