import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, MessageSquare, ListPlus, LogOut, ShieldPlus, Package } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const links = [
    { name: 'لوحة التحكم', path: '/admin', icon: LayoutDashboard },
    { name: 'الخدمات', path: '/admin/services', icon: ListPlus },
    { name: 'الباقات', path: '/admin/packages', icon: Package },
    { name: 'آراء العملاء', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'الإعدادات العامة', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
           <ShieldPlus className="w-8 h-8 text-primary" />
           <span className="font-bold text-xl text-secondary">لوحة الإدارة</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
               <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
                  isActive 
                    ? "bg-primary-light text-primary-dark" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-secondary"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
           <span className="font-bold text-secondary">لوحة الإدارة</span>
           <Link to="/" className="text-sm text-primary font-medium">عرض الموقع</Link>
        </header>

        <div className="p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
