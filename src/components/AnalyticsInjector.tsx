import { useEffect } from 'react';
import { useContent } from '../context/ContentContext';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export default function AnalyticsInjector() {
    const { settings } = useContent();

    useEffect(() => {
        if (settings.analyticsId) {
            if (document.querySelector('script[data-analytics-injected]')) return;

            // Load the script
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.analyticsId}`;
            script.async = true;
            script.dataset.analyticsInjected = "true";
            document.head.appendChild(script);

            // Initialize gtag
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { window.dataLayer.push(arguments); }
            window.gtag('js', new Date());
            window.gtag('config', settings.analyticsId);

            console.log('GA4 Initialized:', settings.analyticsId);
        }
    }, [settings.analyticsId]);

    return null;
}
