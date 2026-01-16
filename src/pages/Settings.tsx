
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppSettings {
    adMobAndroidBannerId: string;
    adMobIosBannerId: string;
    adSensePublisherId: string;
    showTopAd: boolean;
    showMiddleAd: boolean;
    showBottomAd: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
    adMobAndroidBannerId: 'ca-app-pub-3940256099942544/6300978111', // Test ID
    adMobIosBannerId: 'ca-app-pub-3940256099942544/2934735716',     // Test ID
    adSensePublisherId: '',
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
        <div className={`min-h-screen bg-black text-white flex flex-col font-sans ${embedded ? 'min-h-0' : ''}`}>
            {/* Header */}
            {!embedded && (
                <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl px-4 py-4 flex items-center border-b border-white/10">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/90 hover:bg-white/10 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="ml-4 font-bold uppercase tracking-widest text-lg">App Settings</span>
                </div>
            )}

            <div className="flex-1 p-6 max-w-lg mx-auto w-full flex flex-col gap-8">

                {/* Ad IDs Section */}
                {/* Ad IDs Section */}
                <section className="space-y-4 animate-in slide-in-from-bottom duration-500">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <h2 className="text-xl font-bold text-blue-400">$</h2>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Monetization IDs</h2>
                            <p className="text-xs text-white/40">Configure your AdMob ad units</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
                                Android Banner ID
                            </label>
                            <input
                                value={settings.adMobAndroidBannerId}
                                onChange={(e) => handleChange('adMobAndroidBannerId', e.target.value)}
                                className="w-full bg-black/40 text-sm p-4 rounded-xl border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-mono text-gray-300 placeholder:text-white/10"
                                placeholder="ca-app-pub-..."
                            />
                            <p className="text-[10px] text-white/30 pl-1">Found in AdMob Console > App > Ad Units</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
                                iOS Banner ID
                            </label>
                            <input
                                value={settings.adMobIosBannerId}
                                onChange={(e) => handleChange('adMobIosBannerId', e.target.value)}
                                className="w-full bg-black/40 text-sm p-4 rounded-xl border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all font-mono text-gray-300 placeholder:text-white/10"
                                placeholder="ca-app-pub-..."
                            />
                            <p className="text-[10px] text-white/30 pl-1">Found in AdMob Console > App > Ad Units</p>
                        </div>
                    </div>
                </section>

                {/* Placement Section */}
                <section className="space-y-4 animate-in slide-in-from-bottom duration-500 delay-100">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <h2 className="text-xl font-bold text-green-400">▣</h2>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Ad Placements</h2>
                            <p className="text-xs text-white/40">Control where ads appear in articles</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden divide-y divide-white/5">

                        <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="pr-4">
                                <div className="font-semibold text-white flex items-center gap-2">
                                    Top Banner
                                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">Sticky</span>
                                </div>
                                <div className="text-xs text-white/40 mt-1 leading-relaxed">
                                    Appears immediately below the navigation bar. High visibility.
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" checked={settings.showTopAd} onChange={(e) => handleChange('showTopAd', e.target.checked)} className="sr-only peer" />
                                <div className="w-12 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 transition-colors"></div>
                            </label>
                        </div>

                        <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="pr-4">
                                <div className="font-semibold text-white flex items-center gap-2">
                                    Middle Content
                                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Inline</span>
                                </div>
                                <div className="text-xs text-white/40 mt-1 leading-relaxed">
                                    Injected seamlessly after the 2nd paragraph of the story.
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" checked={settings.showMiddleAd} onChange={(e) => handleChange('showMiddleAd', e.target.checked)} className="sr-only peer" />
                                <div className="w-12 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 transition-colors"></div>
                            </label>
                        </div>

                        <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="pr-4">
                                <div className="font-semibold text-white flex items-center gap-2">
                                    Bottom Banner
                                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">Sticky</span>
                                </div>
                                <div className="text-xs text-white/40 mt-1 leading-relaxed">
                                    Anchored to the bottom of the screen. Standard mobile practice.
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" checked={settings.showBottomAd} onChange={(e) => handleChange('showBottomAd', e.target.checked)} className="sr-only peer" />
                                <div className="w-12 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 transition-colors"></div>
                            </label>
                        </div>

                    </div>
                </section>

                <div className="mt-auto pt-8">
                    <div className="flex gap-3 bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg mb-6">
                        <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
                        <p className="text-xs text-yellow-200/80 leading-relaxed">
                            Changes saved locally. AdMob IDs usually take a few minutes to propagate if changed live. Restart app if needed.
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all ${saved ? 'bg-green-500 text-black' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                    >
                        <Save size={20} />
                        {saved ? 'Settings Saved!' : 'Save Configuration'}
                    </button>
                </div>

            </div>
        </div>
    );
}
