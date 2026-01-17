import { useState, useEffect, type ReactNode } from 'react';

interface AdminGuardProps {
    children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_authed');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple client-side check. In a real app, verify against backend.
        if (password === 'dontbepettyjj') {
            sessionStorage.setItem('admin_authed', 'true');
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 font-sans text-white">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tighter mb-2">Petty Mayo</h1>
                    <p className="text-zinc-500 text-sm tracking-wide uppercase">Restricted Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Passkey"
                        className={`w-full bg-transparent border-b ${error ? 'border-red-500 text-red-500' : 'border-zinc-800 focus:border-white'} py-3 text-center outline-none transition-colors placeholder:text-zinc-700`}
                        autoFocus
                    />

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 rounded mt-8 hover:bg-zinc-200 transition-colors"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}
