
import { useState, useEffect } from 'react';
import { Lock, LogIn, LayoutDashboard, Settings as SettingsIcon } from 'lucide-react';
import Create from './Create';
import Settings from './Settings';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'create' | 'settings'>('create');
    const [error, setError] = useState(false);

    useEffect(() => {
        const session = sessionStorage.getItem('admin_session');
        if (session === 'active') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded for now as requested
        if (password === 'admin123') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_session', 'active');
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_session');
        setPassword('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl animate-in zoom-in duration-300">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white/5 rounded-full ring-1 ring-white/10">
                            <Lock size={32} className="text-white/70" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
                    <p className="text-center text-white/40 text-sm mb-8">Enter secure password to continue</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full bg-black/40 border ${error ? 'border-red-500/50 text-red-300' : 'border-white/10 text-white'} rounded-xl p-4 transition-all focus:outline-none focus:ring-1 focus:ring-white/20 placeholder:text-white/20`}
                                placeholder="Password"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogIn size={20} />
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans">
            {/* Admin Header */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
                <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto w-full">
                    <h1 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Admin Panel
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="text-xs font-semibold text-white/50 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg"
                    >
                        LOGOUT
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-t border-white/5 max-w-2xl mx-auto w-full">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'create' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <LayoutDashboard size={16} />
                        Create Story
                        {activeTab === 'create' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'settings' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <SettingsIcon size={16} />
                        Settings
                        {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />}
                    </button>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 max-w-2xl mx-auto w-full">
                {activeTab === 'create' ? (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                        <Create embedded={true} />
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <Settings embedded={true} />
                    </div>
                )}
            </div>
        </div>
    );
}
