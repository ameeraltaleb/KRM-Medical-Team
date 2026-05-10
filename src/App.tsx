/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/public/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ServicesManager from './pages/admin/ServicesManager';
import TestimonialsManager from './pages/admin/TestimonialsManager';
import PackagesManager from './pages/admin/PackagesManager';
import SettingsManager from './pages/admin/SettingsManager';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
            </Route>

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="packages" element={<PackagesManager />} />
                <Route path="settings" element={<SettingsManager />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
