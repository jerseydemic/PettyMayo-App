import { useEffect } from 'react';
import { useContent } from '../context/ContentContext';

export default function AdSenseInjector() {
    const { settings } = useContent();

    useEffect(() => {
        if (settings.adsenseId) {
            // Check if already exists to prevent duplicates
            const existingScript = document.querySelector(`script[src*="adsbygoogle.js"]`);
            if (existingScript) return;

            const script = document.createElement('script');
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adsenseId}`;
            script.async = true;
            script.crossOrigin = "anonymous";

            document.head.appendChild(script);
            console.log('AdSense Injected:', settings.adsenseId);
        }
    }, [settings.adsenseId]);

    return null;
}
