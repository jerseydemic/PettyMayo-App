
import { useState, useEffect } from 'react';
import { ArrowLeft, Save, AlertTriangle, Code, Smartphone, LayoutTemplate, BarChart2, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AppSettings {
    adMobAndroidBannerId: string;
    adMobIosBannerId: string;
    adSensePublisherId: string;
    adSenseHTML: string;
    googleAnalyticsId: string;
    showTopAd: boolean;
    showMiddleAd: boolean;
    middleAdInterval: number; // New: Paragraph interval
    showBottomAd: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
    adMobAndroidBannerId: 'ca-app-pub-3940256099942544/6300978111',
    adMobIosBannerId: 'ca-app-pub-3940256099942544/2934735716',
    adSensePublisherId: '',
    adSenseHTML: '',
    googleAnalyticsId: '',
    showTopAd: false,
    showMiddleAd: false,
    middleAdInterval: 2,
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

    const handleChange = (field: keyof AppSettings, value: string | boolean | number) => {
        setSettings(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem('app_settings', JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className={`min-h-full flex flex-col font-sans ${embedded ? 'min-h-0' : 'bg-[#121212] text-white'}`}>
            {!embedded && (
                <div className="sticky top-0 z-20 bg-[#1e1e1e] shadow-md px-4 py-4 flex items-center border-b border-[#2c2c2c]">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-400 hover:text-white rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <span className="ml-4 font-bold uppercase tracking-widest text-lg text-white">App Settings</span>
                </div>
            )}

            <div className={`flex-1 flex flex-col gap-6 ${embedded ? '' : 'p-6 max-w-lg mx-auto w-full'}`}>

                {/* Section: Analytics */}
                <section className="bg-[#1e1e1e] rounded-lg shadow-lg border border-[#2c2c2c] overflow-hidden">
                    <div className="p-4 border-b border-[#2c2c2c] flex items-center gap-3 bg-[#252525]">
                        <BarChart2 size={18} className="text-orange-500" />
                        <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Analytics</h2>
                    </div>
                    <div className="p-6">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                            GA4 Measurement ID
                        </label>
                        <input
                            value={settings.googleAnalyticsId}
                            onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                            className="w-full bg-[#121212] text-white text-sm p-3 rounded border border-[#333] focus:border-orange-500 focus:outline-none transition-colors font-mono placeholder:text-gray-500"
                            placeholder="G-XXXXXXXXXX"
                        />
                    </div>
                </section>

                {/* Section: Native Ads */}
                <section className="bg-[#1e1e1e] rounded-lg shadow-lg border border-[#2c2c2c] overflow-hidden">
                    <div className="p-4 border-b border-[#2c2c2c] flex items-center gap-3 bg-[#252525]">
                        <Smartphone size={18} className="text-blue-500" />
                        <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Native AdMob</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                                Android Banner ID
                            </label>
                            <input
                                value={settings.adMobAndroidBannerId}
                                onChange={(e) => handleChange('adMobAndroidBannerId', e.target.value)}
                                className="w-full bg-[#121212] text-white text-sm p-3 rounded border border-[#333] focus:border-blue-500 focus:outline-none transition-colors font-mono placeholder:text-gray-500"
                                placeholder="ca-app-pub-..."
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                                iOS Banner ID
                            </label>
                            <input
                                value={settings.adMobIosBannerId}
                                onChange={(e) => handleChange('adMobIosBannerId', e.target.value)}
                                className="w-full bg-[#121212] text-white text-sm p-3 rounded border border-[#333] focus:border-blue-500 focus:outline-none transition-colors font-mono placeholder:text-gray-500"
                                placeholder="ca-app-pub-..."
                            />
                        </div>
                    </div>
                </section>

                {/* Section: Web / Injection */}
                <section className="bg-[#1e1e1e] rounded-lg shadow-lg border border-[#2c2c2c] overflow-hidden">
                    <div className="p-4 border-b border-[#2c2c2c] flex items-center gap-3 bg-[#252525]">
                        <Code size={18} className="text-purple-500" />
                        <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Web Injection</h2>
                    </div>
                    <div className="p-6">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                            Global Scripts / AdSense HTML
                        </label>
                        <textarea
                            value={settings.adSenseHTML}
                            onChange={(e) => handleChange('adSenseHTML', e.target.value)}
                            className="w-full h-32 bg-[#121212] text-white text-sm p-3 rounded border border-[#333] focus:border-purple-500 focus:outline-none transition-colors font-mono placeholder:text-gray-500 resize-none"
                            placeholder="<script>...</script>"
                        />
                    </div>
                </section>

                {/* Section: Placements */}
                <section className="bg-[#1e1e1e] rounded-lg shadow-lg border border-[#2c2c2c] overflow-hidden">
                    <div className="p-4 border-b border-[#2c2c2c] flex items-center gap-3 bg-[#252525]">
                        <LayoutTemplate size={18} className="text-green-500" />
                        <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Ad Placements</h2>
                    </div>
                    <div className="flex flex-col gap-4 p-4 bg-[#1e1e1e]">
                        <PlacementToggle
                            label="Top Sticky Banner"
                            description="Fixed to top of screen"
                            checked={settings.showTopAd}
                            onChange={(v) => handleChange('showTopAd', v)}
                        />

                        <div
                            className={`rounded-xl border transition-all duration-200 overflow-hidden ${settings.showMiddleAd ? 'bg-[#252525] border-purple-500/50 shadow-lg shadow-purple-900/10' : 'bg-[#121212] border-[#333] hover:border-[#555]'}`}
                        >
                            <div
                                className="p-4 flex items-center justify-between cursor-pointer group"
                                onClick={() => handleChange('showMiddleAd', !settings.showMiddleAd)}
                            >
                                <div>
                                    <div className={`font-bold transition-colors ${settings.showMiddleAd ? 'text-purple-400' : 'text-white group-hover:text-purple-200'}`}>Middle Content</div>
                                    <div className="text-xs text-gray-500 mt-1">Injects ad between paragraphs</div>
                                </div>
                                <div className={`w-12 h-7 rounded-full transition-colors relative ${settings.showMiddleAd ? 'bg-purple-600' : 'bg-[#333]'}`}>
                                    <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${settings.showMiddleAd ? 'translate-x-5' : 'translate-x-0'}`} />
                                </div>
                            </div>

                            {/* Interval Input - Expanded Area */}
                            {settings.showMiddleAd && (
                                <div className="px-4 pb-4 pt-0 animate-in slide-in-from-top-2 duration-200">
                                    <div className="bg-[#1a1a1a] p-3 rounded-lg border border-purple-500/20 flex items-center gap-4">
                                        <Hash size={16} className="text-purple-500" />
                                        <div className="flex-1">
                                            <label className="text-xs font-bold text-gray-300 block uppercase tracking-wider">Injection Interval</label>
                                            <span className="text-[10px] text-gray-500">Inject ad after every {settings.middleAdInterval} paragraphs</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleChange('middleAdInterval', Math.max(1, settings.middleAdInterval - 1))}
                                                className="w-8 h-8 rounded hover:bg-[#333] flex items-center justify-center text-gray-400"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                max="20"
                                                value={settings.middleAdInterval}
                                                onChange={(e) => handleChange('middleAdInterval', parseInt(e.target.value) || 1)}
                                                className="w-12 bg-[#252525] text-white font-bold text-center p-1 rounded border border-[#444] focus:border-purple-500 outline-none"
                                            />
                                            <button
                                                onClick={() => handleChange('middleAdInterval', Math.min(20, settings.middleAdInterval + 1))}
                                                className="w-8 h-8 rounded hover:bg-[#333] flex items-center justify-center text-gray-400"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <PlacementToggle
                            label="Bottom Sticky Banner"
                            description="Fixed to bottom of screen"
                            checked={settings.showBottomAd}
                            onChange={(v) => handleChange('showBottomAd', v)}
                        />
                    </div>
                </section>

                <div className="mt-4 pb-8">
                    <div className="flex gap-3 bg-yellow-900/20 border border-yellow-700/30 p-4 rounded-lg mb-6">
                        <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
                        <p className="text-xs text-yellow-500/80 leading-relaxed">
                            <strong>Note:</strong> Restart app to apply native AdMob ID changes.
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${saved ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                        <Save size={18} />
                        {saved ? 'Saved Successfully' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function PlacementToggle({ label, description, checked, onChange }: {
    label: string, description: string, checked: boolean, onChange: (v: boolean) => void
}) {
    return (
        <div
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${checked ? 'bg-[#252525] border-blue-500/50 shadow-lg shadow-blue-900/10' : 'bg-[#121212] border-[#333] hover:border-[#555]'}`}
            onClick={() => onChange(!checked)}
        >
            <div>
                <div className={`font-bold transition-colors ${checked ? 'text-blue-400' : 'text-white group-hover:text-blue-200'}`}>{label}</div>
                <div className="text-xs text-gray-500 mt-1">{description}</div>
            </div>
            <div className={`w-12 h-7 rounded-full transition-colors relative ${checked ? 'bg-blue-600' : 'bg-[#333]'}`}>
                <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </div>
    );
}
