
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
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 blur-xl pointer-events-none" />

                <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl animate-in zoom-in duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                    <div className="flex justify-center mb-8">
                        <div className="p-5 bg-white/5 rounded-full ring-1 ring-white/10 shadow-lg">
                            <Lock size={32} className="text-white/80" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">Admin Portal</h1>
                    <p className="text-center text-white/40 text-sm mb-8 font-medium">Enter secure credentials to proceed</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full bg-black/40 border ${error ? 'border-red-500/50 text-red-300' : 'border-white/10 text-white group-hover:border-white/20'} rounded-xl p-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-white/20`}
                                placeholder="Password"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-white/10"
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
        <div className="min-h-screen bg-black text-white flex font-sans overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent pointer-events-none" />

            {/* Sidebar */}
            <aside className="w-20 lg:w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col items-center lg:items-stretch py-8 z-20">
                <div className="px-4 mb-8 hidden lg:block">
                    <h1 className="text-lg font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-white/90">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        PettyMayo
                    </h1>
                    <p className="text-[10px] text-white/30 pl-4 mt-1">Admin Configuration v1.12</p>
                </div>

                <div className="lg:hidden mb-8">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <span className="font-bold text-xl">P</span>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-2 px-2 lg:px-4">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`p-3 lg:px-4 rounded-xl flex items-center gap-3 transition-all duration-300 group ${activeTab === 'create' ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="hidden lg:block font-medium">Create Story</span>
                        {activeTab === 'create' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 hidden lg:block" />}
                    </button>

                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`p-3 lg:px-4 rounded-xl flex items-center gap-3 transition-all duration-300 group ${activeTab === 'settings' ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <SettingsIcon size={20} />
                        <span className="hidden lg:block font-medium">App Settings</span>
                        {activeTab === 'settings' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 hidden lg:block" />}
                    </button>
                </nav>

                <div className="px-2 lg:px-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full p-3 lg:px-4 rounded-xl flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogIn size={20} className="rotate-180" />
                        <span className="hidden lg:block font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-y-auto">
                <div className="max-w-5xl mx-auto p-4 lg:p-10 min-h-screen">
                    <header className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-1">{activeTab === 'create' ? 'Story Studio' : 'Configuration'}</h2>
                            <p className="text-white/40">
                                {activeTab === 'create' ? 'Design and publish new viral content.' : 'Manage application infrastructure and ads.'}
                            </p>
                        </div>
                    </header>

                    {activeTab === 'create' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Create embedded={true} />
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            <Settings embedded={true} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
