import { useState, useEffect } from 'react';
import { Lock, LogIn, LayoutDashboard, Settings as SettingsIcon, Library, LogOut } from 'lucide-react';
import Create from './Create';
import Settings from './Settings';
import ManageContent from './admin/ManageContent';
import { type Post } from '../data/posts';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'create' | 'settings' | 'manage'>('manage');
    const [error, setError] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    useEffect(() => {
        const session = sessionStorage.getItem('admin_session');
        if (session === 'active') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded for now as requested
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

    const NavButton = ({ tab, icon: Icon, label }: { tab: typeof activeTab, icon: any, label: string }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`w-full p-3 lg:px-4 rounded-lg flex items-center gap-3 transition-all duration-200 group ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <Icon size={20} className={`${activeTab === tab ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
            <span className="hidden lg:block font-medium">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-[#121212] text-white flex font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-20 lg:w-72 bg-[#1E1E1E] flex flex-col items-center lg:items-stretch py-6 z-20 shadow-xl border-r border-[#2C2C2C]">
                <div className="px-6 mb-8 hidden lg:block">
                    <h1 className="text-xl font-bold tracking-tight flex items-center gap-3 text-white">
                        <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</span>
                        ADMIN
                    </h1>
                </div>

                <div className="lg:hidden mb-8">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-xl text-white">P</span>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-1 px-3 lg:px-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 hidden lg:block px-2 mt-2">Menu</div>
                    <NavButton tab="manage" icon={Library} label="Manage Content" />
                    <NavButton tab="create" icon={LayoutDashboard} label="Story Studio" />

                    <div className="my-4 border-t border-[#2C2C2C] w-full hidden lg:block" />

                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 hidden lg:block px-2">System</div>
                    <NavButton tab="settings" icon={SettingsIcon} label="Settings" />
                </nav>

                <div className="px-3 lg:px-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full p-3 rounded-lg flex items-center gap-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:block font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-y-auto bg-[#121212] custom-scrollbar">
                <div className="max-w-7xl mx-auto p-6 lg:p-10 min-h-screen">
                    <header className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-1">
                            {activeTab === 'manage' && 'Content Manager'}
                            {activeTab === 'create' && (editingPost ? 'Edit Story' : 'Story Studio')}
                            {activeTab === 'settings' && 'System Configuration'}
                        </h2>
                        <p className="text-gray-400">
                            {activeTab === 'manage' && 'Overview of your published content.'}
                            {activeTab === 'create' && 'Create and distribute new stories.'}
                            {activeTab === 'settings' && 'Manage application preferences.'}
                        </p>
                    </header>

                    {activeTab === 'manage' && (
                        <div className="animate-in fade-in duration-300">
                            <ManageContent embedded={true} onEdit={handleEditPost} />
                        </div>
                    )}
                    {activeTab === 'create' && (
                        <div className="animate-in fade-in duration-300">
                            <Create
                                embedded={true}
                                editingPost={editingPost || undefined}
                                onClearEdit={() => setEditingPost(null)}
                            />
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div className="animate-in fade-in duration-300">
                            <Settings embedded={true} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
