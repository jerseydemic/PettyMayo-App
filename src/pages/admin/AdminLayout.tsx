import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLayout() {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem('pm_admin_auth') === 'true');
    const [pass, setPass] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pass === 'dontbepettyjj') {
            sessionStorage.setItem('pm_admin_auth', 'true');
            setAuthed(true);
        } else {
            alert('Nice try.');
        }
    };

    if (!authed) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                            <Lock size={20} className="text-pink-500" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-center mb-6">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            id="admin-password"
                            name="password"
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Password..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-pink-500/50 transition"
                            autoFocus
                        />
                        <button className="w-full bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition">
                            Unlock
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return <Outlet />;
}
