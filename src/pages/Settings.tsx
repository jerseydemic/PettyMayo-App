
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

export default function Settings() {
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
        <div className="min-h-screen bg-black text-white flex flex-col font-sans">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl px-4 py-4 flex items-center border-b border-white/10">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/90 hover:bg-white/10 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <span className="ml-4 font-bold uppercase tracking-widest text-lg">App Settings</span>
            </div>

            <div className="flex-1 p-6 max-w-lg mx-auto w-full flex flex-col gap-8">

                {/* Ad IDs Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Monetization IDs
                    </h2>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">AdMob Android Banner ID</label>
                            <input
                                value={settings.adMobAndroidBannerId}
                                onChange={(e) => handleChange('adMobAndroidBannerId', e.target.value)}
                                className="w-full bg-black/40 text-sm p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 font-mono text-gray-300"
                                placeholder="ca-app-pub-..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">AdMob iOS Banner ID</label>
                            <input
                                value={settings.adMobIosBannerId}
                                onChange={(e) => handleChange('adMobIosBannerId', e.target.value)}
                                className="w-full bg-black/40 text-sm p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 font-mono text-gray-300"
                                placeholder="ca-app-pub-..."
                            />
                        </div>
                        {/* 
                        <div className="space-y-2">
                            <label className="text-xs text-white/50 uppercase tracking-wider">AdSense Publisher ID (Web)</label>
                            <input 
                                value={settings.adSensePublisherId}
                                onChange={(e) => handleChange('adSensePublisherId', e.target.value)}
                                className="w-full bg-black/40 text-sm p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 font-mono text-gray-300"
                                placeholder="pub-..."
                            />
                        </div>
                        */}
                    </div>
                </section>

                {/* Placement Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">
                        Ad Placements
                    </h2>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 divide-y divide-white/10">

                        <div className="flex items-center justify-between py-3">
                            <div>
                                <div className="font-semibold">Top of Article</div>
                                <div className="text-xs text-white/40">Sticky banner below nav</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={settings.showTopAd} onChange={(e) => handleChange('showTopAd', e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <div>
                                <div className="font-semibold">Middle of Content</div>
                                <div className="text-xs text-white/40">Injected after 2nd paragraph</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={settings.showMiddleAd} onChange={(e) => handleChange('showMiddleAd', e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between py-3">
                            <div>
                                <div className="font-semibold">Bottom of Article</div>
                                <div className="text-xs text-white/40">Sticky or inline at end</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={settings.showBottomAd} onChange={(e) => handleChange('showBottomAd', e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
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
