
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, AlertTriangle, Code, Smartphone, LayoutTemplate } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppSettings {
    adMobAndroidBannerId: string;
    adMobIosBannerId: string;
    adSensePublisherId: string; // Deprecated but kept for compatibility if needed
    adSenseHTML: string; // New: Full HTML/Script injection
    showTopAd: boolean;
    showMiddleAd: boolean;
    showBottomAd: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
    adMobAndroidBannerId: 'ca-app-pub-3940256099942544/6300978111', // Test ID
    adMobIosBannerId: 'ca-app-pub-3940256099942544/2934735716',     // Test ID
    adSensePublisherId: '',
    adSenseHTML: '',
    showTopAd: false,
    showMiddleAd: false,
    showBottomAd: true,
};

interface SettingsProps {
    embedded?: boolean;
}

export default function Settings({ embedded = false }: SettingsProps) {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('app_settings');
        if (stored) {
            setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
        }
    }, []);

    const handleChange = (field: keyof AppSettings, value: string | boolean) => {
        setSettings(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem('app_settings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className={`min-h-full bg-transparent text-white flex flex-col font-sans ${embedded ? 'min-h-0' : ''}`}>
            {/* Legacy Header for non-embedded view */}
            {!embedded && (
                <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl px-4 py-4 flex items-center border-b border-white/10">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/90 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="ml-4 font-bold uppercase tracking-widest text-lg">App Settings</span>
                </div>
            )}

            <div className={`flex-1 flex flex-col gap-8 ${embedded ? '' : 'p-6 max-w-lg mx-auto w-full'}`}>

                {/* Section: Native AdMob */}
                <section className="space-y-4 animate-in slide-in-from-bottom duration-500">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Smartphone size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Native App Ads (AdMob)</h2>
                            <p className="text-xs text-white/40">Banner IDs for Android & iOS</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                                Android Banner ID
                            </label>
                            <input
                                value={settings.adMobAndroidBannerId}
                                onChange={(e) => handleChange('adMobAndroidBannerId', e.target.value)}
                                className="w-full bg-black/40 text-sm p-4 rounded-xl border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-mono text-gray-300 placeholder:text-white/10"
                                placeholder="ca-app-pub-..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                                iOS Banner ID
                            </label>
                            <input
                                value={settings.adMobIosBannerId}
                                onChange={(e) => handleChange('adMobIosBannerId', e.target.value)}
                                className="w-full bg-black/40 text-sm p-4 rounded-xl border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-mono text-gray-300 placeholder:text-white/10"
                                placeholder="ca-app-pub-..."
                            />
                        </div>
                    </div>
                </section>

                {/* Section: Web/HTML Ads */}
                <section className="space-y-4 animate-in slide-in-from-bottom duration-500 delay-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Code size={20} className="text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Web & Injection Ads</h2>
                            <p className="text-xs text-white/40">Google AdSense or Custom Scripts</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-2">
                                Global AdSense / Script HTML
                            </label>
                            <textarea
                                value={settings.adSenseHTML}
                                onChange={(e) => handleChange('adSenseHTML', e.target.value)}
                                className="w-full h-32 bg-black/40 text-sm p-4 rounded-xl border border-white/5 focus:border-purple-500/50 focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition-all font-mono text-gray-300 placeholder:text-white/10 resize-none leading-relaxed"
                                placeholder={`<script async src="..."></script>\n<ins class="adsbygoogle" ...></ins>`}
                            />
                            <p className="text-[10px] text-white/30">Paste your full AdSense embed code, or any other HTML to inject. This renders in WebView/Web environments.</p>
                        </div>
                    </div>
                </section>

                {/* Section: Placements */}
                <section className="space-y-4 animate-in slide-in-from-bottom duration-500 delay-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <LayoutTemplate size={20} className="text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Ad Placements</h2>
                            <p className="text-xs text-white/40">Control visibility across app</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
                        <PlacementToggle
                            label="Top Sticky Banner"
                            description="Fixed to the top of the screen."
                            checked={settings.showTopAd}
                            onChange={(v) => handleChange('showTopAd', v)}
                            tag="Sticky"
                            tagColor="blue"
                        />
                        <PlacementToggle
                            label="Middle Content"
                            description="Injected after paragraph 2."
                            checked={settings.showMiddleAd}
                            onChange={(v) => handleChange('showMiddleAd', v)}
                            tag="Inline"
                            tagColor="purple"
                        />
                        <PlacementToggle
                            label="Bottom Sticky Banner"
                            description="Fixed to the bottom of the screen."
                            checked={settings.showBottomAd}
                            onChange={(v) => handleChange('showBottomAd', v)}
                            tag="Sticky"
                            tagColor="blue"
                        />
                    </div>
                </section>

                <div className="mt-4 pb-8">
                    <div className="flex gap-3 bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl mb-6">
                        <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
                        <p className="text-xs text-yellow-200/60 leading-relaxed">
                            <strong>Note:</strong> AdMob IDs update after app restart. HTML scripts apply on next page load.
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all active:scale-[0.99] ${saved ? 'bg-green-500 text-black' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                        <Save size={20} />
                        {saved ? 'Settings Saved!' : 'Save Configuration'}
                    </button>
                </div>

            </div>
        </div>
    );
}

function PlacementToggle({ label, description, checked, onChange, tag, tagColor }: {
    label: string, description: string, checked: boolean, onChange: (v: boolean) => void, tag: string, tagColor: string
}) {
    // Map string color to full tailwind classes for the tag
    const tagClasses = tagColor === 'blue'
        ? 'bg-blue-500/20 text-blue-300'
        : 'bg-purple-500/20 text-purple-300';

    return (
        <div className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer" onClick={() => onChange(!checked)}>
            <div className="pr-4">
                <div className="font-semibold text-white flex items-center gap-2">
                    {label}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${tagClasses}`}>{tag}</span>
                </div>
                <div className="text-xs text-white/40 mt-1 leading-relaxed">
                    {description}
                </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 pointer-events-none">
                <input type="checkbox" checked={checked} readOnly className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 transition-colors"></div>
            </label>
        </div>
    );
}
