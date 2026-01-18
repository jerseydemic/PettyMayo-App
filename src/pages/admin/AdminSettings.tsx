import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { ArrowLeft, Save, DollarSign, Sparkles } from 'lucide-react';

export default function AdminSettings() {
    const navigate = useNavigate();
    const { settings, updateSettings } = useContent();
    const [adsenseId, setAdsenseId] = useState(settings.adsenseId || '');
    const [adsenseSlotId, setAdsenseSlotId] = useState(settings.adsenseSlotId || '');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings({ adsenseId, adsenseSlotId });
        alert('Settings Saved!');
        navigate('/admin');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 md:p-12">
            <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition">
                <ArrowLeft size={18} /> Back
            </button>

            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <DollarSign className="text-green-500" /> Monetization Settings
            </h1>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                    <h2 className="text-lg font-bold">Google AdSense</h2>
                    <p className="text-zinc-400 text-sm">
                        Enter your Publisher ID to automatically inject the AdSense script across the site.
                    </p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Publisher ID</label>
                            <input
                                value={adsenseId}
                                onChange={e => setAdsenseId(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500/50 transition font-mono text-sm"
                                placeholder="ca-pub-0000000000000000"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Ad Slot ID (Data-Ad-Slot)</label>
                            <input
                                value={adsenseSlotId}
                                onChange={e => setAdsenseSlotId(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500/50 transition font-mono text-sm"
                                placeholder="1234567890"
                            />
                            <p className="text-[10px] text-zinc-500">
                                Required for rendering. Find this in AdSense: Ads {'>'} By ad unit {'>'} Get Code {'>'} data-ad-slot.
                            </p>
                        </div>
                    </div>
                </div>

                {/* AI Configuration Removed (Handled via Environment Variables) */}

                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                    <h2 className="text-lg font-bold">Database Tools</h2>
                    <p className="text-zinc-400 text-sm">
                        If your database is empty, you can restore the default demo articles here.
                        <br /><span className="text-red-400 font-bold">Warning: This will add 9 demo articles.</span>
                    </p>
                    <button
                        type="button"
                        onClick={async () => {
                            if (!confirm('Are you sure you want to seed the database with default content?')) return;
                            const { ARTICLES } = await import('../../data/mock');
                            const { doc, setDoc } = await import('firebase/firestore');
                            const { db } = await import('../../lib/firebase');

                            let count = 0;
                            for (const article of ARTICLES) {
                                await setDoc(doc(db, 'articles', article.id), article);
                                count++;
                            }
                            alert(`Success! Added ${count} articles to the live database.`);
                        }}
                        className="bg-zinc-800 text-white font-bold py-3 px-6 rounded-xl hover:bg-zinc-700 transition"
                    >
                        Restore Default Content
                    </button>

                    <div className="h-px bg-white/10 my-4" />

                    <p className="text-zinc-400 text-sm">
                        Missing articles from before the update?
                        <br /><span className="text-yellow-400 font-bold">Use this to move your old local articles to the cloud.</span>
                    </p>
                    <button
                        type="button"
                        onClick={async () => {
                            if (!confirm('Import old articles from this browser? This will upload them to the cloud.')) return;

                            try {
                                const localData = localStorage.getItem('pm_articles');
                                if (!localData) {
                                    alert('No legacy articles found in this browser.');
                                    return;
                                }

                                const parsed = JSON.parse(localData);
                                if (!Array.isArray(parsed) || parsed.length === 0) {
                                    alert('No valid articles found.');
                                    return;
                                }

                                const { doc, setDoc } = await import('firebase/firestore');
                                const { db } = await import('../../lib/firebase');

                                let count = 0;
                                for (const article of parsed) {
                                    // Ensure we don't overwrite if ID exists, or just overwrite?
                                    // Overwrite is safer to ensure it matches legacy state.
                                    await setDoc(doc(db, 'articles', article.id), article);
                                    count++;
                                }
                                alert(`Success! Migrated ${count} legacy articles to the cloud.`);
                            } catch (e) {
                                console.error(e);
                                alert('Error migrating data. Check console.');
                            }
                        }}
                        className="bg-yellow-600/20 text-yellow-500 border border-yellow-500/50 font-bold py-3 px-6 rounded-xl hover:bg-yellow-600/30 transition"
                    >
                        Migrate Legacy Data
                    </button>
                </div>

                <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition flex items-center justify-center gap-2">
                    <Save size={20} /> Save Settings
                </button>
            </form>
        </div>
    );
}
