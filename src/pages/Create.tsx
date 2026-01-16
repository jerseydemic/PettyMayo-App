
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Image as ImageIcon, FileText, Check, Eye } from 'lucide-react';
import type { Post } from '../data/posts';

interface CreateProps {
    embedded?: boolean;
    editingPost?: Post;
    onClearEdit?: () => void;
}

export default function Create({ embedded, editingPost, onClearEdit }: CreateProps) {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Tab State
    const [activeCreatorTab, setActiveCreatorTab] = useState<'media' | 'details' | 'preview'>('media');

    // Content State
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState("We Can't Believe What Just Happened");
    const [slug, setSlug] = useState("we-cant-believe-what-just-happened");
    const [category, setCategory] = useState("news");
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
    const [content, setContent] = useState('');
    const [tweetInput, setTweetInput] = useState('');
    const [tweetId, setTweetId] = useState<string | null>(null);

    // Populate form on edit
    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setSlug(editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            setCategory(editingPost.category || 'news');
            setContent(editingPost.content || '');
            setImage(editingPost.thumbnail);
            setTweetId(editingPost.tweetId || null);
            if (editingPost.tweetId) setTweetInput(`https://twitter.com/x/status/${editingPost.tweetId}`);
            setActiveCreatorTab('details');
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
                if (!content) setActiveCreatorTab('details');
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


    const handleSave = () => {
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

        const existing = localStorage.getItem('local_posts');
        let posts: Post[] = existing ? JSON.parse(existing) : [];

        if (editingPost) {
            // Update existing
            posts = posts.map(p => p.id === newPost.id ? newPost : p);
            // If it was a static post being converted to local (overridden), it won't be in local_posts yet.
            // Check if we found it. If not, add it.
            if (!posts.find(p => p.id === newPost.id)) {
                posts = [newPost, ...posts];
            }
        } else {
            // Create new
            posts = [newPost, ...posts];
        }

        localStorage.setItem('local_posts', JSON.stringify(posts));

        if (onClearEdit) {
            onClearEdit();
            alert('Story Updated!');
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className={`h-full flex flex-col font-sans ${embedded ? '' : 'min-h-screen bg-[#121212] text-white'}`}>
            {/* Header if not embedded */}
            {!embedded && (
                <div className="sticky top-0 z-20 bg-[#1e1e1e] shadow-md px-4 py-4 flex items-center border-b border-[#2c2c2c]">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-400 hover:text-white rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="ml-4 font-bold uppercase tracking-widest text-lg text-white">Story Creator</span>
                    <div className="ml-auto">
                        <button
                            onClick={handleSave}
                            disabled={!title}
                            className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-gray-200 disabled:opacity-50 transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col h-full min-h-0 bg-[#121212]">
                {/* Creator Tabs - Material Style */}
                <div className="bg-[#1e1e1e] border-b border-[#2c2c2c] px-4 pt-2">
                    <div className="flex gap-4">
                        <TabButton
                            active={activeCreatorTab === 'media'}
                            icon={<ImageIcon size={16} />}
                            label="Media"
                            onClick={() => setActiveCreatorTab('media')}
                        />
                        <TabButton
                            active={activeCreatorTab === 'details'}
                            icon={<FileText size={16} />}
                            label="Content"
                            onClick={() => setActiveCreatorTab('details')}
                        />
                        <TabButton
                            active={activeCreatorTab === 'preview'}
                            icon={<Eye size={16} />}
                            label="Preview"
                            onClick={() => setActiveCreatorTab('preview')}
                        />
                    </div>
                </div>

                <div className="flex-1 relative overflow-hidden flex flex-col">

                    {/* --- TAB: MEDIA --- */}
                    {activeCreatorTab === 'media' && (
                        <div className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-300 overflow-y-auto max-w-2xl mx-auto w-full">
                            <div className="space-y-4 mb-8">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Main Article Photo</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`group relative h-96 bg-[#1e1e1e] rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-all hover:bg-[#252525] ${image ? 'border-green-500/50' : 'border-[#333] hover:border-gray-500'}`}
                                >
                                    {image ? (
                                        <>
                                            <img src={image} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-xs font-bold uppercase tracking-wider text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Change</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 group-hover:text-gray-300 transition-colors">
                                            <Upload size={32} />
                                            <span className="text-xs font-medium uppercase tracking-wider">Upload Image</span>
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Embedded Tweet (Optional)</label>
                                <input
                                    value={tweetInput}
                                    onChange={(e) => handleTweetExtract(e.target.value)}
                                    className="w-full bg-[#1e1e1e] text-white text-sm p-4 rounded-xl border border-[#333] focus:border-blue-500 focus:outline-none transition-all font-mono placeholder:text-gray-500"
                                    placeholder="https://twitter.com/user/status/1234..."
                                />
                                {tweetId && (
                                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2">
                                        <Check size={16} className="text-blue-400" />
                                        <span className="text-xs text-blue-300">Tweet ID extracted: {tweetId}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- TAB: DETAILS --- */}
                    {activeCreatorTab === 'details' && (
                        <div className="p-6 flex flex-col gap-6 animate-in fade-in zoom-in duration-300 h-full overflow-y-auto max-w-3xl mx-auto w-full">

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Headline</label>
                                <input
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        // Auto-generate slug if not manually edited (simple check: if slug matches previous title slug)
                                        // For simplicity, we'll just auto-update slug if it's empty or matches standard transform
                                        // But better to just let them see it update live or have a "regenerate" button? 
                                        // Let's just auto-update it live for now until they manually touch the slug field (we'd need strict state for that).
                                        // Actually, let's just make it a one-way sync that stops if they edit the slug.
                                        if (!isSlugManuallyEdited) {
                                            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                                        }
                                    }}
                                    className="w-full bg-[#1e1e1e] text-white text-xl font-bold p-4 rounded-xl border border-[#333] focus:border-gray-500 focus:outline-none transition-all placeholder:text-gray-500"
                                    placeholder="Enter a catchy title..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-[#1e1e1e] text-white text-sm p-4 rounded-xl border border-[#333] focus:border-gray-500 focus:outline-none appearance-none"
                                    >
                                        <option value="news">News</option>
                                        <option value="gossip">Gossip</option>
                                        <option value="politics">Politics</option>
                                        <option value="entertainment">Entertainment</option>
                                        <option value="reality-tv">Reality TV</option>
                                        <option value="opinion">Opinion</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">URL Slug (SEO)</label>
                                    <input
                                        value={slug}
                                        onChange={(e) => {
                                            setSlug(e.target.value);
                                            setIsSlugManuallyEdited(true);
                                        }}
                                        className="w-full bg-[#1e1e1e] text-gray-400 text-sm p-4 rounded-xl border border-[#333] focus:border-blue-500 focus:outline-none font-mono"
                                        placeholder="url-friendly-slug"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Article Body (HTML Supported)</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="flex-1 w-full bg-[#1e1e1e] text-white text-base p-4 rounded-xl border border-[#333] focus:border-gray-500 focus:outline-none transition-all placeholder:text-gray-500 leading-relaxed resize-none min-h-[300px]"
                                    placeholder="Write the tea here... Use <br> for line breaks."
                                />
                            </div>
                        </div>
                    )}

                    {/* --- TAB: PREVIEW --- */}
                    {activeCreatorTab === 'preview' && (
                        <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300 bg-[#f0f0f0] items-center py-6">
                            {/* Simulated Phone */}
                            <div className="w-full max-w-[375px] bg-white h-full shadow-2xl rounded-[2rem] border-8 border-gray-900 overflow-hidden flex flex-col relative">
                                {/* Notch/Status */}
                                <div className="bg-white px-6 py-3 flex justify-between items-center text-[10px] font-bold text-black select-none">
                                    <span>9:41</span>
                                    <span>5G</span>
                                </div>

                                <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
                                    {image && (
                                        <div className="w-full aspect-video bg-gray-200">
                                            <img src={image} className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <div className="p-5">
                                        <h1 className="text-2xl font-bold leading-tight mb-4 font-serif text-black">{title}</h1>

                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold font-sans text-xs">PM</div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold font-sans text-black">Petty Mayo</span>
                                                <span className="text-[10px] text-gray-400 font-sans uppercase">Just Now</span>
                                            </div>
                                        </div>
                                        {/* Content Render with Ad Slot Preview */}
                                        <div className="text-gray-800 leading-relaxed text-base font-serif space-y-4">
                                            {(content || '').split('\n\n').map((p, i) => (
                                                <div key={i}>
                                                    <p className="mb-4" dangerouslySetInnerHTML={{ __html: p || '<span class="text-gray-300 italic">No content...</span>' }} />

                                                    {/* Mock Ad Injection logic for Preview - Matches default of 2 */}
                                                    {(i + 1) === 2 && (
                                                        <div className="my-8 py-8 bg-gray-100 border-y-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 select-none">
                                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Advertisement Placeholder</span>
                                                            <div className="w-[300px] h-[250px] bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-gray-400 text-sm font-sans font-medium">
                                                                Middle Ad Slot (300x250)
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {tweetId && (
                                            <div className="my-6">
                                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 text-xs text-center">
                                                    Tweet Embed: {tweetId} (Mock)
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Bottom Action */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent">
                                    <button
                                        onClick={handleSave}
                                        disabled={!title || !content}
                                        className="w-full py-3 bg-black text-white rounded-full font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-95 transition-all"
                                    >
                                        <Check size={16} />
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-4 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all border ${active ? 'bg-white text-black border-white' : 'text-gray-500 border-transparent hover:text-white hover:bg-white/5'}`}
        >
            {icon}
            {label}
        </button>
    );
}
