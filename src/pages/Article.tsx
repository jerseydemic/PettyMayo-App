import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share, Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Browser } from '@capacitor/browser';
import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { STATIC_POSTS, type Post } from '../data/posts';

export default function Article() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    // Dynamic Settings State
    const [settings, setSettings] = useState({
        adMobAndroidBannerId: 'ca-app-pub-3940256099942544/6300978111',
        adMobIosBannerId: 'ca-app-pub-3940256099942544/2934735716',
        showTopAd: false,
        showMiddleAd: false,
        showBottomAd: true
    });

    useEffect(() => {
        // 1. Resolve Post Data
        if (state?.post) {
            setPost(state.post);
        } else {
            // Fallback for direct URL access
            const found = STATIC_POSTS.find(p => p.id === id);
            if (found) setPost(found);
            else {
                // Check local storage for custom posts
                const local = localStorage.getItem('custom_posts');
                if (local) {
                    const customPosts = JSON.parse(local);
                    const customFound = customPosts.find((p: Post) => p.id === id);
                    if (customFound) setPost(customFound);
                }
            }
        }

        // 2. Load Settings & Initialize Ads
        const loadSettingsAndAds = async () => {
            const stored = localStorage.getItem('app_settings');
            const currentSettings = stored ? { ...settings, ...JSON.parse(stored) } : settings;
            setSettings(currentSettings); // Update local state for rendering

            const platform = Capacitor.getPlatform();
            if (platform === 'android' || platform === 'ios') {
                try {
                    await AdMob.requestTrackingAuthorization();
                    await AdMob.initialize({
                        initializeForTesting: true, // safe default for test ads
                    });

                    // Only show Sticky Banner if 'Bottom' is enabled
                    // Note: AdMob sticky banners are strictly top or bottom. 
                    // To support "Middle", we would need Native Ads or Inline Adaptive Banners which are more complex.
                    // For this iteration, we keep the Sticky Bottom Banner logic if 'showBottomAd' is true.
                    if (currentSettings.showBottomAd) {
                        const adId = platform === 'ios'
                            ? currentSettings.adMobIosBannerId
                            : currentSettings.adMobAndroidBannerId;

                        await AdMob.showBanner({
                            adId: adId,
                            position: BannerAdPosition.BOTTOM_CENTER,
                            adSize: BannerAdSize.ADAPTIVE_BANNER,
                            margin: 0
                        });
                    } else {
                        // If bottom ad is disabled, ensure we hide any existing banner
                        await AdMob.hideBanner();
                    }
                } catch (e) {
                    console.error('AdMob Init Error:', e);
                }
            }
        };

        loadSettingsAndAds();

        return () => {
            // Cleanup: We don't necessarily want to hide banner on unmount if we want it persistent,
            // but usually good practice to clean up or basic navigation might overlap.
            // For now, removing this to keep ad persistent across articles if desired, 
            // OR keep it to refresh ad on new article load. 
            // Let's hide it to avoid "ghost" ads if navigating to a non-ad page.
            const platform = Capacitor.getPlatform();
            if (platform !== 'web') {
                AdMob.hideBanner().catch(() => { });
            }
        };
    }, [id, state]);

    if (!post) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    // Helper to split content for Middle Ad
    const renderContent = () => {
        if (!settings.showMiddleAd) return <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap font-light text-lg">{post.content}</p>;

        const paragraphs = (post.content || '').split('\n\n');
        if (paragraphs.length < 3) return <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap font-light text-lg">{post.content || ''}</p>;

        return (
            <>
                {paragraphs.slice(0, 2).map((p, i) => (
                    <p key={i} className="text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap font-light text-lg">{p}</p>
                ))}

                {/* Middle Ad Placeholder / Slot */}
                <div className="my-8 py-6 bg-gray-900/50 border-y border-white/5 flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-white/30 tracking-widest uppercase">Advertisement</span>
                    <div className="w-[300px] h-[250px] bg-white/5 rounded-md flex items-center justify-center text-white/20">
                        Middle Ad Slot (300x250)
                    </div>
                </div>

                {paragraphs.slice(2).map((p, i) => (
                    <p key={i + 2} className="text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap font-light text-lg">{p}</p>
                ))}
            </>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans">

            {/* Top Ad Placeholder (Web/Native) */}
            {settings.showTopAd && (
                <div className="w-full bg-gray-900 border-b border-white/5 py-4 flex flex-col items-center justify-center">
                    <span className="text-[10px] text-white/30 tracking-widest uppercase mb-1">Sponsored</span>
                    <div className="w-[320px] h-[50px] bg-white/5 rounded flex items-center justify-center text-white/20 text-xs">
                        Top Ad Slot
                    </div>
                </div>
            )}

            {/* Liquid Glass Header */}
            <div className="sticky top-0 z-20 bg-black/60 backdrop-blur-xl px-4 py-4 flex items-center justify-between border-b border-white/10">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-white/90 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex gap-2">
                    <button onClick={() => {
                        Browser.open({ url: 'https://instagram.com/realpettymay0' });
                    }} className="p-2 text-white/70 hover:text-white transition-colors">
                        <Instagram size={20} />
                    </button>
                    <button className="p-2 text-white/70 hover:text-white transition-colors">
                        <Share size={20} />
                    </button>
                </div>
            </div>

            <article className="flex-1 max-w-md mx-auto w-full pb-32">
                {/* Image */}
                <div className="w-full aspect-video bg-gray-900 relative overflow-hidden group">
                    <img
                        src={post.thumbnail}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        alt={post.title}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="px-6 -mt-12 relative z-10">
                    <h1 className="text-3xl font-bold mb-6 leading-tight drop-shadow-xl text-white font-serif tracking-wide">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-yellow-500 p-[2px]">
                            <img src="/icon.png" className="w-full h-full rounded-full border-2 border-black object-cover" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Petty Mayo</p>
                            <p className="text-white/50 text-xs">Just now • 5 min read</p>
                        </div>
                    </div>

                    {/* Tweet Embed */}
                    {post.tweetId && (
                        <div className="mb-8 w-full flex justify-center border-y border-white/10 py-4 bg-white/5">
                            <div className="w-full max-w-[550px] overflow-hidden rounded-xl">
                                <TwitterTweetEmbed
                                    tweetId={post.tweetId}
                                    options={{ theme: 'dark', align: 'center', conversation: 'none' }}
                                    placeholder={
                                        <div className="h-64 flex flex-col items-center justify-center bg-black/40 text-white/50 gap-2 border border-white/10 rounded-xl">
                                            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-xs tracking-wider uppercase">Loading Tweet...</span>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    )}

                    {/* Article Content with Middle Ad Logic */}
                    {renderContent()}

                    <div className="mt-12 py-8 border-t border-white/10 text-center">
                        <p className="text-xs text-white/30 uppercase tracking-[0.2em]">Real Petty Mayo • 2024</p>
                    </div>

                    {/* Web Ad Placeholder (Bottom - if enabled) */}
                    {Capacitor.getPlatform() === 'web' && settings.showBottomAd && (
                        <div className="mt-8 w-full h-[50px] bg-gray-800 flex items-center justify-center text-gray-500 text-xs uppercase tracking-widest border border-white/5 rounded-lg">
                            Bottom Banner Ad Space
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
}
