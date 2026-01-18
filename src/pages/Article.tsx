import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Browser } from '@capacitor/browser';
import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';
import { STATIC_POSTS, type Post } from '../data/posts';
import ShareOptions from '../components/ShareOptions';
import Footer from '../components/Footer';

export default function Article() {
    const { state } = useLocation();
    const { slug, id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);

    // Load Twitter Widget Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            // Optional cleanup
        }
    }, [post?.tweetId]);

    // Dynamic Settings State
    const [settings, setSettings] = useState({
        adMobAndroidBannerId: 'ca-app-pub-3940256099942544/6300978111',
        adMobIosBannerId: 'ca-app-pub-3940256099942544/2934735716',
        showTopAd: false,
        showMiddleAd: false,
        showBottomAd: true,
        middleAdInterval: 2
    });

    useEffect(() => {
        if (!post) return;
        try {
            const today = new Date().toISOString().split('T')[0];
            const stored = localStorage.getItem('petty_mayo_analytics');
            const data = stored ? JSON.parse(stored) : { totalViews: 0, articleViews: {}, visitsByDate: {} };

            // Update Total
            data.totalViews = (data.totalViews || 0) + 1;

            // Update Daily
            data.visitsByDate = data.visitsByDate || {};
            data.visitsByDate[today] = (data.visitsByDate[today] || 0) + 1;

            // Update Article Specific
            data.articleViews = data.articleViews || {};
            // Track by ID for consistency if possible, else slug
            const key = post.id || post.slug;
            data.articleViews[key] = (data.articleViews[key] || 0) + 1;

            localStorage.setItem('petty_mayo_analytics', JSON.stringify(data));
        } catch (e) { console.error("Analytics Error", e); }
    }, [post?.id, post?.slug]);

    useEffect(() => {
        // 1. Resolve Post Data
        if (state?.post) {
            setPost(state.post);
        } else {
            // Fetch All Posts
            const local = localStorage.getItem('local_posts');
            const customPosts = local ? JSON.parse(local) : [];
            const allPosts = [...customPosts, ...STATIC_POSTS];

            let found;
            if (slug) {
                found = allPosts.find((p: Post) => p.slug === slug);
            } else if (id) {
                found = allPosts.find((p: Post) => p.id === id);
            }

            if (found) setPost(found);
        }

        // 2. Load Settings & Initialize Ads
        const loadSettingsAndAds = async () => {
            const stored = localStorage.getItem('admin_settings');
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
        // Use custom interval or default to 2
        const injectionIndex = (settings as any).middleAdInterval || 2;

        if (paragraphs.length <= injectionIndex) return <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap font-light text-lg">{post.content || ''}</p>;

        return (
            <>
                {paragraphs.slice(0, injectionIndex).map((p, i) => (
                    <p key={i} className="text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap font-light text-lg">{p}</p>
                ))}

                {/* Middle Ad Placeholder / Slot */}
                <div className="my-8 py-6 bg-gray-900/50 border-y border-white/5 flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-white/30 tracking-widest uppercase">Advertisement</span>
                    <div className="w-[300px] h-[250px] bg-white/5 rounded-md flex items-center justify-center text-white/20">
                        Middle Ad Slot (300x250)
                    </div>
                </div>

                {paragraphs.slice(injectionIndex).map((p, i) => (
                    <p key={i + injectionIndex} className="text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap font-light text-lg">{p}</p>
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

            {/* Liquid Glass Header (Absolute Overlay) */}
            <div className="absolute top-0 w-full z-50 px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center justify-between pointer-events-none">
                <button
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-all pointer-events-auto border border-white/10"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex gap-3 pointer-events-auto">
                    <button onClick={() => {
                        Browser.open({ url: 'https://instagram.com/realpettymay0' });
                    }}
                        aria-label="Visit Instagram"
                        className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-all border border-white/10">
                        <Instagram size={20} />
                    </button>
                </div>
            </div>

            {/* ... rest of the component ... */}
            <article className="flex-1 max-w-md mx-auto w-full pb-32">
                {/* ... existing article content ... */}
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





                    {/* Tweet Embed */}
                    {post.tweetId && (
                        <div className="mb-8 w-full flex justify-center border-y border-white/10 py-4 bg-white/5">
                            <div className="w-full max-w-[550px] overflow-hidden rounded-xl">
                                <blockquote className="twitter-tweet" data-theme="dark" data-align="center">
                                    <a href={`https://twitter.com/i/status/${post.tweetId}`}>Loading Tweet...</a>
                                </blockquote>
                            </div>
                        </div>
                    )}

                    {/* Article Content with Middle Ad Logic */}
                    {renderContent()}

                    <div className="mt-4">
                        <Footer />
                    </div>


                </div>
            </article>
            {/* Share Options (Fixed Overlay) */}
            <ShareOptions title={post.title} url={window.location.href} />
        </div>
    );
}
