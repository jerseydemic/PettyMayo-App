
import { useState, useEffect } from 'react';
import { Lock, LogIn, LayoutDashboard, Library, LogOut, Globe } from 'lucide-react';
import Create from './Create';
import ManageContent from './admin/ManageContent';
import { type Post } from '../data/posts';


export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'create' | 'manage'>('manage');
    const [error, setError] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    // Keep the desktop breakout for usability, but remove the "flashy" styles if that was the issue. 
    // If the user hates the breakout, they can request that next. 
    // For now, I'll keep the logic but simplify the CSS significantly.
    useEffect(() => {
        document.body.classList.add('admin-mode');
        return () => {
            document.body.classList.remove('admin-mode');
        };
    }, []);

    useEffect(() => {
        const session = sessionStorage.getItem('admin_session');
        if (session === 'active') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'dontbepettyjj') {
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

    const handleEditPost = (post: Post) => {
        setEditingPost(post);
        setActiveTab('create');
    };



    if (!isAuthenticated) {
        return (

            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden">
                {/* Aurora Gradients */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="w-full max-w-md relative z-10">
                    {/* Glassmorphic Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative group">

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="flex flex-col items-center mb-12">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-lg ring-1 ring-white/5">
                                <Lock size={32} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Portal</h1>
                            <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">Secure Workspace</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2 group/input">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 group-focus-within/input:text-blue-400 transition-colors">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full bg-black/40 border ${error ? 'border-red-500/50 text-red-200' : 'border-white/10 text-white'} rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-gray-500`}
                                    placeholder="••••••••••••"
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 group/btn"
                            >
                                <LogIn size={20} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                <span className="tracking-wide">Authenticate</span>
                            </button>
                        </form>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-600 font-medium tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity cursor-default">
                            Petty Mayo • v1.20
                        </p>
                    </div>
                </div>
            </div>
        );

    }

    const NavButton = ({ tab, icon: Icon, label }: { tab: typeof activeTab, icon: any, label: string }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`w-full h-12 px-4 rounded-xl flex items-center gap-3 transition-all text-left border ${activeTab === tab
                ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_-5px_rgba(37,99,235,0.3)]'
                : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
        >
            <div className={`p-1.5 rounded-lg ${activeTab === tab ? 'text-blue-400' : 'text-gray-400'}`}>
                <Icon size={18} />
            </div>
            <div>
                <div className={`font-medium text-sm tracking-wide ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
                    {label}
                </div>
            </div>
        </button>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-sans selection:bg-blue-500/30">

            {/* Background Ambient Glow (System Level) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            {/* Sidebar - Desktop Only (Glass Shell) */}
            <aside className="hidden md:flex w-72 bg-black/20 backdrop-blur-2xl flex-col py-8 z-20 border-r border-white/5 fixed h-full left-0 top-0">
                <div className="px-6 mb-10">
                    <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </div>
                        Petty Mayo
                    </h1>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] ml-6 mt-1 block">Admin Workspace</span>
                </div>

                <nav className="flex-1 flex flex-col px-4 gap-2">
                    <div className="px-2 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-3">Dashboards</div>

                    <NavButton tab="manage" icon={Library} label="Content Manager" />
                    <NavButton tab="create" icon={LayoutDashboard} label="Story Studio" />

                    <div className="my-6 px-4">
                        <div className="h-px bg-white/5" />
                    </div>

                    <div className="px-2 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-3">System</div>

                    <a href="/" target="_blank" className="w-full h-12 px-4 rounded-xl flex items-center gap-3 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm group border border-transparent hover:border-white/5">
                        <div className="p-1.5 rounded-lg text-gray-500 group-hover:text-white transition-colors"><Globe size={18} /></div>
                        <span className="font-medium tracking-wide">Live Site</span>
                    </a>
                </nav>

                <div className="px-4 mt-auto space-y-4">
                    <button
                        onClick={handleLogout}
                        className="w-full h-12 px-4 rounded-xl flex items-center gap-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 group"
                    >
                        <div className="p-1.5 rounded-lg group-hover:text-red-400 transition-colors"><LogOut size={18} /></div>
                        <span className="font-medium text-sm tracking-wide">Sign Out</span>
                    </button>
                    <div className="text-[10px] text-gray-600 font-mono text-center tracking-wider">
                        SECURE • v1.20 ID:4A
                    </div>
                </div>
            </aside>

            {/* Bottom Nav - Mobile Only (Floating Glass) */}
            <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 bg-[#111]/80 backdrop-blur-2xl border border-white/10 rounded-2xl z-50 flex items-center justify-around shadow-2xl shadow-black/80 ring-1 ring-white/5">
                <button
                    onClick={() => setActiveTab('manage')}
                    className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${activeTab === 'manage' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500'}`}
                >
                    <Library size={20} />
                </button>
                <div className="w-px h-6 bg-white/10" />
                <button
                    onClick={() => setActiveTab('create')}
                    className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${activeTab === 'create' ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500'}`}
                >
                    <LayoutDashboard size={20} />
                </button>
                <div className="w-px h-6 bg-white/10" />
                <a
                    href="/"
                    target="_blank"
                    className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-gray-500 hover:bg-white/5 transition-colors"
                >
                    <Globe size={20} />
                </a>
                <div className="w-px h-6 bg-white/10" />
                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={20} />
                </button>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-72 min-h-screen relative z-10 pb-32 md:pb-0 transition-all duration-300">
                <div className="max-w-7xl mx-auto p-6 md:p-12">
                    <header className="mb-10 lg:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
                                {activeTab === 'manage' && 'Content Manager'}
                                {activeTab === 'create' && (editingPost ? 'Edit Story' : 'Story Studio')}
                            </h2>
                            <p className="text-gray-400 text-sm tracking-wide">
                                {activeTab === 'manage' && 'Deep control over your content ecosystem.'}
                                {activeTab === 'create' && 'Craft award-winning stories with AI assistance.'}
                            </p>
                        </div>
                    </header>

                    {activeTab === 'manage' && (
                        <ManageContent embedded={true} onEdit={handleEditPost} />
                    )}
                    {activeTab === 'create' && (
                        <Create
                            embedded={true}
                            editingPost={editingPost || undefined}
                            onClearEdit={() => setEditingPost(null)}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
