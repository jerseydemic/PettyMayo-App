export default function Footer() {
    return (
        <footer className="mt-12 mb-8 px-6 w-full">
            <div className="mt-8 text-center">
                <p className="text-gray-600 text-[10px] uppercase tracking-widest font-medium">Stay Petty.</p>
                <p className="text-gray-800 text-[9px] mt-1">v1.20.14 (27)</p>
            </div>
            <div className="h-safe-area-bottom" /> {/* Safety spacing for iPhone Home Bar */}
        </footer >
    );
}
