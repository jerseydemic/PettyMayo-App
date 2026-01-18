import { useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';

import { Capacitor } from '@capacitor/core';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdUnit() {
    const { settings } = useContent();

    // Hide AdSense on Native (Android/iOS)
    if (Capacitor.isNativePlatform()) return null;

    const adRef = useRef<HTMLModElement>(null);
    const initiated = useRef(false);

    // Fallback to the user's provided ID if not in settings
    const activeSlotId = settings.adsenseSlotId || "2149210018";



    useEffect(() => {
        if (settings.adsenseId && adRef.current && !initiated.current) {
            // Retry loop to wait for script
            const interval = setInterval(() => {
                if (window.adsbygoogle) {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                        initiated.current = true;
                        console.log('AdUnit pushed.');
                        clearInterval(interval);
                    } catch (e) {
                        console.error('AdUnit push failed:', e);
                    }
                }
            }, 500); // Check every 500ms

            // Cleanup
            return () => clearInterval(interval);
        }
    }, [settings.adsenseId]);

    // if (!settings.adsenseId) return null; // FORCE SHOW

    return (
        <div className="w-full flex justify-center my-8 overflow-hidden min-h-[100px] items-center text-xs text-zinc-700 relative">
            {!settings.adsenseId ? null : (
                <>
                    <ins
                        ref={adRef}
                        className="adsbygoogle block w-full"
                        data-ad-client={settings.adsenseId}
                        data-ad-slot={activeSlotId}
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    />
                    {!initiated.current && <span className="absolute pointer-events-none">Loading Google Ad... ({settings.adsenseId})</span>}
                </>
            )}
        </div>
    );
}
