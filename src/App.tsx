import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ContentProvider } from './context/ContentContext';
import Home from './pages/Home';
import Article from './pages/Article';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditor from './pages/admin/AdminEditor';
import AdminSettings from './pages/admin/AdminSettings';
import AdSenseInjector from './components/AdSenseInjector';
import AnalyticsInjector from './components/AnalyticsInjector';
import InstallPrompt from './components/InstallPrompt';
import AndroidAdMob from './components/AndroidAdMob';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

                {/* SEO Friendly URL: /category/slug-title */}
                <Route path="/:category/:slug" element={<Article />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="new" element={<AdminEditor />} />
                    <Route path="edit/:id" element={<AdminEditor />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>



                {/* 404 Catch-All */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <HelmetProvider>
            <ContentProvider>
                <AdSenseInjector />
                <AnalyticsInjector />
                <InstallPrompt />
                <AndroidAdMob />
                <BrowserRouter>
                    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-500 selection:text-white pb-20 md:pb-0 flex flex-col pt-[env(safe-area-inset-top)]">
                        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-center px-4 mt-[env(safe-area-inset-top)]">
                            <Link to="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                                Petty Mayo
                            </Link>
                        </header>

                        <main className="pt-16 max-w-4xl mx-auto w-full flex-grow">
                            <AnimatedRoutes />
                        </main>

                        <footer className="py-8 text-center text-zinc-600 text-xs">
                            <p>&copy; {new Date().getFullYear()} Petty Mayo. All rights reserved.</p>
                            <div className="mt-2 space-x-4">
                                <Link to="/privacy" className="hover:text-zinc-400 transition">Privacy Policy</Link>
                                <Link to="/terms" className="hover:text-zinc-400 transition">Terms of Service</Link>
                            </div>
                        </footer>
                    </div>
                </BrowserRouter>
            </ContentProvider>
        </HelmetProvider>
    )
}

export default App
