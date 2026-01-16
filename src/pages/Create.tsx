import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Play, Check, Loader2, FileText, Search, Sparkles } from 'lucide-react';
import type { Post } from '../data/posts';

export default function Create() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // State
    const [step, setStep] = useState<'upload' | 'processing' | 'preview'>('upload');
    const [image, setImage] = useState<string | null>(null);
    const [processStage, setProcessStage] = useState<number>(0); // 0: Idle, 1: Extract, 2: Research, 3: Generate
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [tweetInput, setTweetInput] = useState('');

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
        setGeneratedContent(`Matches are burnt, bridges are crisp, and honey... the tea is SCALDING today. 🔥

We just got the exclusive scoop on this situation and let me tell you, it is MESSY. Sources close to the drama are saying that this was not accidental. It wasn't just a slip-up; it was a calculated move that has left everyone in their inner circle absolutely reeling.

"I have never seen anything like it," one insider whispered to us exclusively. "It's giving chaos. It's giving destruction. It's giving exactly what we expected from them, but multiplied by ten."

But let's back up a second. To understand the gravity of this situation, you have to look at the history. This isn't the first time we've seen this kind of behavior, but it is certainly the most public. For years, fans have speculated about the tension bubbling beneath the surface. We've seen the cryptic tweets, the unfollows, the side-eyes at red carpet events. But this? This is the main event.

The internet, naturally, is having a field day. Twitter (or X, whatever we're calling it this week) is absolutely lit up with theories. Some are saying it's a PR stunt designed to distract from other news. Others are convinced it's genuine, raw emotion spilling over after years of keeping it together.

"It's absolutely wild," one commentator noted. "You think you know a person, and then they go and do this. It changes everything."

And what about the fallout? Brands are supposedly already scrambling. Sponsorships might be on the line. When you build a brand on a specific image, shattering that image comes with a heavy price tag. We reached out to their reps for comment, and the silence? It's deafening. Usually, we'd get a "no comment" or a generic denial. Today? Crickets. That tells you everything you need to know.

Let's dive deeper into the specifics. The image you see above? That's the smoking gun. Analyzing the background, the timing, the people present—it all paints a picture of a night gone wrong. Or right, depending on whose side you're on.

We spoke to a body language expert who analyzed the footage leading up to this moment. "There's high anxiety," they confirmed. "Micro-expressions of contempt and fear. This wasn't a happy gathering."

So where do we go from here? The court of public opinion is already in session, and the verdict is looking guilty. But as with all great celebrity scandals, the comeback is often just as meticulously planning as the downfall. Will they issue an apology video? Will they go silent and let it blow over? Or will they double down and go full villain era?

Personally, I'm rooting for the villain era. It makes for better headlines. 💅

Stay petty, because we are digging for more. We have notifications on, alerts set, and our DMs are open. If you know something, say something. But for now, sip slowly. This tea is hot enough to burn.`);

        setProcessStage(4); // Done
        setTimeout(() => setStep('preview'), 500);
    };

    const savePost = () => {
        // Extract Tweet ID if a URL is pasted
        let finalTweetId = undefined;
        if (tweetInput.trim()) {
            // Simple extraction logic: looks for the last numeric segment or takes the whole string
            const match = tweetInput.match(/status\/(\d+)/);
            finalTweetId = match ? match[1] : tweetInput.trim();
        }

        const newPost: Post = {
            id: Date.now().toString(),
            title: generatedTitle,
            thumbnail: image || '',
            articleUrl: 'https://instagram.com/realpettymay0',
            content: generatedContent,
            tweetId: finalTweetId
        };

        // Save to LocalStorage
        const existing = localStorage.getItem('custom_posts');
        const posts = existing ? JSON.parse(existing) : [];
        localStorage.setItem('custom_posts', JSON.stringify([newPost, ...posts]));

        navigate('/');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-black/60 backdrop-blur-xl px-4 py-4 flex items-center border-b border-white/10">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/90 hover:bg-white/10 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <span className="ml-4 font-bold uppercase tracking-widest">Content Dashboard</span>
            </div>

            <div className="flex-1 p-6 flex flex-col max-w-md mx-auto w-full">

                {step === 'upload' && (
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Image Input */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`bg-yellow-100 text-black rounded-lg p-4 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity ${image ? 'border-2 border-yellow-500' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <Upload size={20} />
                                <span className="font-semibold">{image ? 'Image Selected' : 'Input Image'}</span>
                            </div>
                            <Play size={20} className="fill-black" />
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                        </div>

                        {/* Preview Selected */}
                        {image && (
                            <div className="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                                <img src={image} className="w-full h-full object-cover" />
                            </div>
                        )}

                        {/* Start Button */}
                        <button
                            disabled={!image}
                            onClick={startProcessing}
                            className="mt-auto w-full bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 active:scale-95 transition-transform"
                        >
                            Start Magic Generator
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

                {step === 'preview' && (
                    <div className="flex flex-col gap-4 animate-in slide-in-from-bottom duration-500">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 gap-4 flex flex-col">
                            <input
                                value={generatedTitle}
                                onChange={(e) => setGeneratedTitle(e.target.value)}
                                className="bg-transparent text-xl font-bold border-b border-white/20 pb-2 focus:outline-none focus:border-white"
                                placeholder="Title"
                            />

                            {/* Tweet Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-white/50 uppercase tracking-wider">Embed Tweet (Optional)</label>
                                <input
                                    value={tweetInput}
                                    onChange={(e) => setTweetInput(e.target.value)}
                                    className="bg-black/20 text-blue-400 text-sm p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                                    placeholder="Paste Tweet Link or ID"
                                />
                            </div>

                            <textarea
                                value={generatedContent}
                                onChange={(e) => setGeneratedContent(e.target.value)}
                                className="bg-transparent text-gray-300 text-sm leading-relaxed h-48 resize-none focus:outline-none"
                            />
                        </div>

                        <button
                            onClick={savePost}
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
