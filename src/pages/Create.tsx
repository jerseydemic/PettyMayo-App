
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Loader2, FileText, Search, Sparkles, Check } from 'lucide-react';
import type { Post } from '../data/posts';

export default function Create() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    const [step, setStep] = useState<'upload' | 'processing' | 'preview' | 'edit'>('upload');
    const [image, setImage] = useState<string | null>(null);
    const [processStage, setProcessStage] = useState<number>(0);
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [tweetInput, setTweetInput] = useState('');
    const [tweetId, setTweetId] = useState<string | null>(null);
    const [title] = useState("We Can't Believe What Just Happened");

    // Stub for embedded prop if needed later, but we removed it to simplify imports for now
    const embedded = window.location.pathname === '/admin';

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

    const startProcessing = async () => {
        if (!image) return;
        setStep('processing');

        // Simulate AI Pipeline
        setProcessStage(1); // Extract
        await new Promise(r => setTimeout(r, 2000));

        setProcessStage(2); // Research
        await new Promise(r => setTimeout(r, 2500));

        setProcessStage(3); // Generate
        await new Promise(r => setTimeout(r, 2000));

        // Mock Generation (Long Form - 550+ Words)
        setGeneratedTitle("TEA SPILLED: The Receipts Are In ☕️");

        // Extract Tweet ID if present
        if (tweetInput) {
            const id = tweetInput.split('/').pop()?.split('?')[0];
            if (id) setTweetId(id);
        }

        // Simulating the "Magic" Pipeline
        setTimeout(() => {
            generateMockContent();
            setStep('edit');
        }, 1500);
    };

    const generateMockContent = () => {
        const teaSpilled = `
Look, we don't want to say "we told you so," but... actually, yes we calculate do. The internet is absolutely losing its mind right now, and for once, the hysteria is completely justified. 
<br><br>
Sources close to the situation tell us that the tension has been brewing for weeks. "It wasn't just a random outburst," an insider whispered to Petty Mayo exclusively. "This has been a calculated move since the start of the season."
<br><br>
What makes this even messier is the timing. Just days after the public statement that everything was "fine," we get THIS? The math isn't mathing, and the receipts are starting to pile up. Experts in celebrity PR are calling this a "total strategic meltdown," while fans are just grabbing popcorn.
<br><br>
We've reached out to reps for comment, but predictably, it's radio silence. Usually, silence speaks volumes, but in this case, it's practically screaming. Expect a notes-app apology within 24 hours, or a cryptic Instagram story with a black background and white text.
<br><br>
Stay tuned, because this tea is still piping hot and we're just getting started. ☕️💅
        `;
        setGeneratedContent(teaSpilled.trim());
    };

    const handleSave = () => {
        const newPost: Post = {
            id: Date.now().toString(),
            thumbnail: image || '/placeholder.jpg',
            title: title || 'New Tea Spilled',
            time: 'Just Now',
            articleUrl: '#',
            content: generatedContent,
            tweetId: tweetId || undefined
        };

        const existing = localStorage.getItem('local_posts');
        const posts = existing ? JSON.parse(existing) : [];
        localStorage.setItem('local_posts', JSON.stringify([newPost, ...posts]));

        // Force reload posts
        window.location.href = '/';
    };

    return (
        <div className={`min-h-screen bg-black text-white flex flex-col font-sans ${embedded ? '' : ''}`}>
            {/* Header */}
            {!embedded && (
                <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl px-4 py-4 flex items-center border-b border-white/10">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/90 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="ml-4 font-bold uppercase tracking-widest text-lg">Magic Generator</span>
                </div>
            )}

            <div className="flex-1 p-6 flex flex-col max-w-md mx-auto w-full">

                {step === 'upload' && (
                    <div className="flex-1 flex flex-col gap-6 animate-in fade-in zoom-in duration-300">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-white">New Story</h2>
                            <p className="text-white/50 text-sm">Upload content to generate a viral article.</p>
                        </div>

                        {/* Combined Input Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
                            {/* Image Input */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`group relative aspect-video bg-black/40 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-all hover:bg-black/60 ${image ? 'border-yellow-500/50' : 'border-white/10 hover:border-white/30'}`}
                            >
                                {image ? (
                                    <>
                                        <img src={image} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold uppercase tracking-wider text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/30 group-hover:text-white/60 transition-colors">
                                        <div className="p-3 bg-white/5 rounded-full group-hover:scale-110 transition-transform">
                                            <Upload size={24} />
                                        </div>
                                        <span className="text-xs font-medium uppercase tracking-wider">Tap to Upload Image</span>
                                    </div>
                                )}
                                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                            </div>

                            {/* Tweet Input */}
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                                    <span className="text-xs font-bold">X</span>
                                </div>
                                <input
                                    value={tweetInput}
                                    onChange={(e) => setTweetInput(e.target.value)}
                                    className="w-full bg-black/40 text-sm pl-8 p-3 rounded-lg border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 font-mono text-blue-300 placeholder:text-white/10 transition-all"
                                    placeholder="Paste Tweet URL (Optional)"
                                />
                            </div>
                        </div>

                        {/* Start Button */}
                        <button
                            disabled={!image}
                            onClick={startProcessing}
                            className="mt-auto w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-yellow-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Sparkles size={20} className={!image ? "opacity-50" : "animate-pulse"} />
                            {image ? 'Generate Magic Story' : 'Select Image First'}
                        </button>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col gap-4 mt-8">
                        <PipelineStep
                            icon={<Search size={20} />}
                            label="Extract Research Query From Image"
                            active={processStage === 1}
                            completed={processStage > 1}
                            color="bg-blue-200 text-blue-900"
                        />
                        <PipelineStep
                            icon={<Sparkles size={20} />}
                            label="Conduct In-depth Topic Research"
                            active={processStage === 2}
                            completed={processStage > 2}
                            color="bg-blue-300 text-blue-900"
                        />
                        <PipelineStep
                            icon={<FileText size={20} />}
                            label="Generate Concise Article Content"
                            active={processStage === 3}
                            completed={processStage > 3}
                            color="bg-blue-400 text-blue-900"
                        />
                        <PipelineStep
                            icon={<FileText size={20} />}
                            label="Render Research Article Webpage"
                            active={processStage === 4}
                            completed={processStage > 4}
                            color="bg-green-300 text-green-900"
                        />
                    </div>
                )}

                {(step === 'preview' || step === 'edit') && (
                    <div className="flex flex-col gap-4 animate-in slide-in-from-bottom duration-500">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 gap-4 flex flex-col">
                            <input
                                value={generatedTitle}
                                onChange={(e) => setGeneratedTitle(e.target.value)}
                                className="bg-transparent text-xl font-bold border-b border-white/20 pb-2 focus:outline-none focus:border-white"
                                placeholder="Title"
                            />



                            <textarea
                                value={generatedContent}
                                onChange={(e) => setGeneratedContent(e.target.value)}
                                className="bg-transparent text-gray-300 text-sm leading-relaxed h-48 resize-none focus:outline-none"
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full bg-green-500 text-black py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-400 transition-colors"
                        >
                            Publish to App
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

function PipelineStep({ icon, label, active, completed, color }: { icon: any, label: string, active: boolean, completed: boolean, color: string }) {
    return (
        <div className={`p-4 rounded-lg flex items-center justify-between transition-all duration-500 ${active || completed ? color : 'bg-white/5 text-gray-500'}`}>
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-semibold text-sm">{label}</span>
            </div>
            {active && <Loader2 size={20} className="animate-spin" />}
            {completed && <Check size={20} />}
        </div>
    );
}
