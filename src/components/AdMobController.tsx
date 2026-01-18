import { useEffect } from 'react';
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const ADMOB_AD_UNIT_ID = 'ca-app-pub-4912312432648988/8226042510';
const TEST_AD_UNIT_ID = 'ca-app-pub-3940256099942544/6300978111';

export default function AdMobController() {
    useEffect(() => {
        const initAdMob = async () => {
            // Only run on native devices
            if (!Capacitor.isNativePlatform()) return;

            try {
                await AdMob.requestTrackingAuthorization();
                await AdMob.initialize({
                    tagForChildDirectedTreatment: false,
                });

                // Use Test ID for Dev, Real ID for Prod
                const adId = import.meta.env.DEV ? TEST_AD_UNIT_ID : ADMOB_AD_UNIT_ID;

                await AdMob.showBanner({
                    adId: adId,
                    adSize: BannerAdSize.ADAPTIVE_BANNER,
                    position: BannerAdPosition.BOTTOM_CENTER,
                    margin: 0,
                    isTesting: import.meta.env.DEV
                });
            } catch (err) {
                console.error('AdMob Init Fail:', err);
            }
        };

        initAdMob();

        // Cleanup not strictly necessary for a persistent banner, 
        // but good practice if this component unmounts.
        return () => {
            if (Capacitor.isNativePlatform()) {
                AdMob.hideBanner().catch(console.error);
            }
        };
    }, []);

    return null; // This component is logic-only, no visual render
}
