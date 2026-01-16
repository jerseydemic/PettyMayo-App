
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Loader2, Sparkles, Image as ImageIcon, FileText, Check, Eye } from 'lucide-react';
import type { Post } from '../data/posts';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default function Create({ embedded }: { embedded?: boolean }) {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Tab State
    const [activeCreatorTab, setActiveCreatorTab] = useState<'media' | 'details' | 'preview'>('media');

    // Content State
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState("We Can't Believe What Just Happened");
    const [content, setContent] = useState('');
    const [tweetInput, setTweetInput] = useState('');
    const [tweetId, setTweetId] = useState<string | null>(null);

    // AI Mock Logic
    const [isGenerating, setIsGenerating] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                // Auto switch to details after upload if it's the first time
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

    const handleMagicGenerate = () => {
        if (!image) return;
        setIsGenerating(true);
        setActiveCreatorTab('details'); // Move to details to show loading effect overlaid

        // Mock AI Delay
        setTimeout(() => {
            const teaSpilled = `
Look, we don't want to say "we told you so," but... actually, yes we calculate do. The internet is absolutely losing its mind right now, and for once, the hysteria is completely justified. 
<br><br>
Sources close to the situation tell us that the tension has been brewing for weeks. "It wasn't just a random outburst," an insider whispered to Petty Mayo exclusively. "This has been a calculated move since the start of the season."
<br><br>
What makes this even messier is the timing. Just days after the public statement that everything was "fine," we get THIS? The math isn't mathing, and the receipts are starting to pile up. Experts in celebrity PR are calling this a "total strategic meltdown," while fans are just grabbing popcorn.
<br><br>
Stay tuned, because this tea is still piping hot and we're just getting started. ☕️💅
            `;
            setTitle("TEA SPILLED: The Receipts Are In ☕️");
            setContent(teaSpilled.trim());
            setIsGenerating(false);
        }, 2000);
    };

    const handleSave = () => {
        const newPost: Post = {
            id: Date.now().toString(),
            thumbnail: image || '/placeholder.jpg',
            title: title || 'New Tea Spilled',
            articleUrl: '#',
            content: content,
            tweetId: tweetId || undefined
        };

        const existing = localStorage.getItem('local_posts');
        const posts = existing ? JSON.parse(existing) : [];
        localStorage.setItem('local_posts', JSON.stringify([newPost, ...posts]));

        window.location.href = '/';
    };

    return (
        <div className={`h-full flex flex-col font-sans ${embedded ? '' : 'min-h-screen bg-black text-white'}`}>
            {/* Header if not embedded */}
            {!embedded && (
                <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl px-4 py-4 flex items-center border-b border-white/10">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/90 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="ml-4 font-bold uppercase tracking-widest text-lg">Story Creator</span>
                </div>
            )}

            <div className="flex-1 flex flex-col h-full min-h-0">
                {/* Creator Tabs */}
                <div className="flex border-b border-white/10 bg-white/5 mx-4 mt-4 rounded-t-xl overflow-hidden">
                    <TabButton
                        active={activeCreatorTab === 'media'}
                        icon={<ImageIcon size={18} />}
                        label="Media"
                        onClick={() => setActiveCreatorTab('media')}
                    />
                    <TabButton
                        active={activeCreatorTab === 'details'}
                        icon={<FileText size={18} />}
                        label="Content"
                        onClick={() => setActiveCreatorTab('details')}
                    />
                    <TabButton
                        active={activeCreatorTab === 'preview'}
                        icon={<Eye size={18} />}
                        label="Preview"
                        onClick={() => setActiveCreatorTab('preview')}
                    />
                </div>

                <div className="flex-1 bg-white/5 mx-4 mb-4 rounded-b-xl border-x border-b border-white/10 relative overflow-hidden flex flex-col">

                    {/* --- TAB: MEDIA --- */}
                    {activeCreatorTab === 'media' && (
                        <div className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-300 overflow-y-auto">
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Main Article Photo</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`group relative aspect-video bg-black/40 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-all hover:bg-black/60 ${image ? 'border-green-500/50' : 'border-white/10 hover:border-white/30'}`}
                                >
                                    {image ? (
                                        <>
                                            <img src={image} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-xs font-bold uppercase tracking-wider text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Change</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/30 group-hover:text-white/60 transition-colors">
                                            <Upload size={32} />
                                            <span className="text-xs font-medium uppercase tracking-wider">Upload Image</span>
                                        </div>
                                    )}
                                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Embedded Tweet (Optional)</label>
                                <input
                                    value={tweetInput}
                                    onChange={(e) => handleTweetExtract(e.target.value)}
                                    className="w-full bg-black/40 text-sm p-4 rounded-xl border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-mono text-blue-300 placeholder:text-white/10"
                                    placeholder="https://twitter.com/user/status/1234..."
                                />
                                {tweetId && (
                                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-2">
                                        <Check size={16} className="text-blue-400" />
                                        <span className="text-xs text-blue-300">Tweet ID extracted: {tweetId}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-auto pt-4">
                                <button
                                    onClick={handleMagicGenerate}
                                    disabled={!image}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:from-purple-500 hover:to-indigo-500 transition-all"
                                >
                                    <Sparkles size={18} />
                                    Auto-Generate Content from Image
                                </button>
                                <p className="text-[10px] text-center text-white/30 mt-2">Or switch to "Content" tab to write manually</p>
                            </div>
                        </div>
                    )}

                    {/* --- TAB: DETAILS --- */}
                    {activeCreatorTab === 'details' && (
                        <div className="p-6 flex flex-col gap-6 animate-in fade-in zoom-in duration-300 h-full overflow-y-auto">
                            {isGenerating ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                                    <Loader2 size={48} className="text-purple-500 animate-spin mb-4" />
                                    <p className="text-white/80 font-medium animate-pulse">Consulting the oracle...</p>
                                </div>
                            ) : null}

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Headline</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-black/40 text-lg font-bold p-4 rounded-xl border border-white/5 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all placeholder:text-white/10"
                                    placeholder="Enter a catchy title..."
                                />
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Article Body (HTML Supported)</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="flex-1 w-full bg-black/40 text-sm p-4 rounded-xl border border-white/5 focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all placeholder:text-white/10 leading-relaxed resize-none min-h-[300px]"
                                    placeholder="Write the tea here... Use <br> for line breaks."
                                />
                            </div>
                        </div>
                    )}

                    {/* --- TAB: PREVIEW --- */}
                    {activeCreatorTab === 'preview' && (
                        <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                            {/* Preview box fixes for user feedback: min-height, scrolling, clear readability */}
                            <div className="flex-1 overflow-y-auto bg-white text-black font-serif relative">
                                {/* Simulated Phone Header */}
                                <div className="sticky top-0 bg-white/90 backdrop-blur z-10 p-4 border-b border-gray-100 flex items-center justify-center">
                                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-black/40">Preview of "{title.slice(0, 15)}..."</span>
                                </div>

                                <div className="p-4 pb-20">
                                    <h1 className="text-3xl font-bold leading-tight mb-4 font-sans">{title}</h1>

                                    {image && (
                                        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                                            <img src={image} className="w-full h-auto object-cover" />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold font-sans">PM</div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold font-sans">Petty Mayo</span>
                                            <span className="text-xs text-gray-400 font-sans">Just Now</span>
                                        </div>
                                    </div>

                                    {/* Content Render */}
                                    <div
                                        className="prose prose-lg prose-gray max-w-none text-gray-800 leading-relaxed text-lg"
                                        dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-300 italic">No content yet...</p>' }}
                                    />

                                    {tweetId && (
                                        <div className="my-8 flex justify-center">
                                            <div className="w-full max-w-[500px]">
                                                <TwitterTweetEmbed tweetId={tweetId} options={{ theme: 'light' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={!title || !content}
                                className="absolute bottom-6 right-6 left-6 py-4 bg-green-500 rounded-xl font-bold text-black shadow-xl hover:bg-green-400 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                            >
                                <Check size={20} />
                                Publish Article
                            </button>
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
            className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider transition-all ${active ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60 hover:bg-white/5'}`}
        >
            {icon}
            {label}
        </button>
    );
}
