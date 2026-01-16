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

        // Mock Generation
        setGeneratedTitle("Viral Update: Breaking News");
        setGeneratedContent(`Here is the deep dive on the image you just uploaded. 
    
    The internet is buzzing about this latest development. Fans are divided, with some calling it a PR stunt and others seeing it as a genuine moment.
    
    "It's absolutely wild," one commentator noted. Stay tuned as this story develops.`);

        setProcessStage(4); // Done
        setTimeout(() => setStep('preview'), 500);
    };

    const savePost = () => {
        const newPost: Post = {
            id: Date.now().toString(),
            title: generatedTitle,
            thumbnail: image || '',
            articleUrl: 'https://instagram.com/realpettymay0',
            content: generatedContent
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
