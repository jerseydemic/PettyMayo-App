import { useEffect } from 'react';
import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export default function AndroidAdMob() {
    useEffect(() => {
        if (Capacitor.getPlatform() !== 'android') return;

        const initAdMob = async () => {
            try {
                await AdMob.initialize({
                    initializeForTesting: false,
                });

                await AdMob.showBanner({
                    adId: 'ca-app-pub-4912312432648988/8226042510',
                    adSize: BannerAdSize.BANNER,
                    position: BannerAdPosition.BOTTOM_CENTER,
                    margin: 0,
                    isTesting: false
                });

                console.log('AdMob Banner Initialized');
            } catch (error) {
                console.error('AdMob Init Failed:', error);
            }
        };

        initAdMob();

        // Cleanup: Use with caution as we want persistent banner usually, but good practice to hide if component unmounts widely.
        // For a global component in App.tsx, this only runs on app close, which is fine.
        return () => {
            if (Capacitor.isNativePlatform()) {
                AdMob.hideBanner().catch(console.error);
            }
        };
    }, []);

    return null; // Logic only
}
