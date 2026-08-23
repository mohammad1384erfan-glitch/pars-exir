import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';

const ADMIN_NAV = [
  { label: 'داشبورد', href: '/admin', icon: '📊', end: true },
  { label: 'محصولات', href: '/admin/products', icon: '📦' },
  { label: 'مقالات', href: '/admin/articles', icon: '📝' },
  { label: 'تنظیمات سایت', href: '/admin/settings', icon: '⚙️' },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-industrial-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col fixed inset-y-0 right-0 z-40 hidden lg:flex">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-navy-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">PE</span>
            </div>
            <span className="text-white font-bold">پارس اکسیر</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {ADMIN_NAV.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-navy-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-navy-700">
          <div className="text-navy-400 text-xs mb-3 truncate">{user?.email}</div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-navy-300 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            خروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:mr-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-industrial-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <h1 className="text-navy-900 font-bold text-lg">پنل مدیریت</h1>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-navy-600 hover:text-navy-800 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            مشاهده سایت
          </a>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
