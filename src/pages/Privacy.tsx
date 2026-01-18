
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col font-sans">
            {/* Liquid Glass Header */}
            <div className="sticky top-0 z-50 w-full px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top))] flex items-center justify-between bg-black/60 backdrop-blur-xl border-b border-white/10">
                <button
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-all border border-white/10"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold tracking-tight uppercase text-white/90">Privacy Policy</h1>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>

            <main className="flex-1 w-full max-w-md mx-auto p-6 text-gray-300 leading-relaxed text-sm">
                <section className="space-y-6">
                    <div>
                        <h2 className="text-white font-bold text-lg mb-2">1. Introduction</h2>
                        <p>
                            Welcome to Petty Mayo ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how your information is collected, used, and disclosed by our mobile application.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-lg mb-2">2. Information Collection</h2>
                        <p>
                            We do not collect any personal information directly. However, our app uses third-party services that may collect information used to identify you.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-lg mb-2">3. Third Party Services</h2>
                        <p>
                            The app uses third-party services that may collect information used to identify you.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Google AdMob:</strong> Uses advertising ID to serve personalized ads.</li>
                            <li><strong>Google Analytics for Firebase:</strong> Collects usage data to help us improve the app.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-lg mb-2">4. Log Data</h2>
                        <p>
                            We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-lg mb-2">5. Security</h2>
                        <p>
                            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-lg mb-2">6. Changes to This Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold text-lg mb-2">7. Contact Us</h2>
                        <p>
                            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@pettymayo.com.
                        </p>
                    </div>
                </section>

                <div className="mt-12 py-8 border-t border-white/10 text-center">
                    <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-medium">Last updated: January 2025</p>
                </div>
                <div className="h-10" />
            </main>
        </div>
    );
}
