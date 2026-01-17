import React, { useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface PullToRefreshProps {
    onRefresh: () => Promise<void>;
    children: React.ReactNode;
    threshold?: number; // Distance to pull before triggering refresh (default 80)
}

export default function PullToRefresh({ onRefresh, children, threshold = 80 }: PullToRefreshProps) {
    const [pullY, setPullY] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [startTouchY, setStartTouchY] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Reset touch tracking
    const reset = () => {
        setPullY(0);
        setStartTouchY(null);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        // Only enable pull if at the very top of the scroll
        if (window.scrollY > 0) return;
        setStartTouchY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startTouchY === null || isRefreshing || window.scrollY > 0) return;

        const currentY = e.touches[0].clientY;
        const delta = currentY - startTouchY;

        // Only allow pulling down, and apply resistance (logarithmic/root feel)
        if (delta > 0) {
            // Resistance formula: easier to pull at first, harder as it goes down
            const resistance = 0.4;
            setPullY(delta * resistance);
        }
    };

    const handleTouchEnd = async () => {
        if (startTouchY === null || isRefreshing) return;

        if (pullY > threshold) {
            setIsRefreshing(true);
            setPullY(threshold); // Snap to threshold position while refreshing

            try {
                await onRefresh();
            } finally {
                setIsRefreshing(false);
                reset();
            }
        } else {
            reset(); // Spring back
        }
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex flex-col min-h-screen relative"
        >
            {/* Loading Indicator Layer - effectively behind content conceptually but visible when pulled */}
            <div
                className="absolute top-0 left-0 w-full flex justify-center pointer-events-none z-0"
                style={{
                    height: `${threshold}px`,
                    transform: `translateY(${pullY > 0 ? pullY - 40 : -40}px)`,
                    opacity: Math.min(pullY / threshold, 1),
                    transition: isRefreshing ? 'transform 0.2s' : 'none' // Instant follow during drag
                }}
            >
                <div className="mt-4 p-2 bg-white/10 rounded-full backdrop-blur-md shadow-xl border border-white/5">
                    <Loader2
                        className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`}
                        style={{ transform: `rotate(${pullY * 3}deg)` }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div
                ref={contentRef}
                className="flex-1 w-full bg-black z-10 transition-transform ease-out duration-200"
                style={{
                    transform: `translateY(${pullY}px)`,
                    // Removing transition during drag for 1:1 feel, adding it back on release
                    transition: startTouchY !== null && !isRefreshing ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                {children}
            </div>
        </div>
    );
}
