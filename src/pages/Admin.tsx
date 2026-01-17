import { Routes, Route } from 'react-router-dom';
import AdminGuard from '../components/AdminGuard';
import AdminDashboard from './admin/AdminDashboard';
import AdminEditor from './admin/AdminEditor';

export default function Admin() {
    return (
        <AdminGuard>
            <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-purple-900 selection:text-white">
                <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="create" element={<AdminEditor />} />
                    <Route path="edit/:id" element={<AdminEditor />} />
                </Routes>
            </div>
        </AdminGuard>
    );
}
