import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSettings } from '@/lib/settingsContext';
import { PhoneIcon } from '@/components/ui';
import { Logo } from '@/components/ui/Logo';

const NAV_ITEMS = [
  { label: 'خانه', href: '/' },
  { label: 'پارافین صنعتی', href: '/industrial-paraffin' },
  { label: 'محصولات', href: '/products' },
  { label: 'قیمت‌ها', href: '/paraffin-price' },
  { label: 'انواع پارافین', href: '/paraffin-types' },
  { label: 'کاربردها', href: '/applications' },
  { label: 'مقالات', href: '/articles' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings } = useSettings();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-industrial-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="صفحه اصلی پارس اکسیر">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="لوگو پارس اکسیر" className="h-10 w-auto object-contain" />
            ) : (
              <Logo size="md" theme="light" />
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="ناوبری اصلی">
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    isActive
                      ? 'bg-navy-50 text-navy-800'
                      : 'text-charcoal-600 hover:text-navy-800 hover:bg-industrial-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Phone CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${settings.phone}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-navy-800 text-white text-sm font-semibold rounded-lg hover:bg-navy-700 transition-colors"
              aria-label="تماس تلفنی"
            >
              <PhoneIcon className="w-4 h-4" />
              <span className="font-mono ltr">{settings.phone}</span>
            </a>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-charcoal-600 hover:bg-industrial-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label="منوی موبایل"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-industrial-200 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1" aria-label="ناوبری موبایل">
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive ? 'bg-navy-50 text-navy-800' : 'text-charcoal-700 hover:bg-industrial-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={`tel:${settings.phone}`}
              className="mt-2 flex items-center gap-2 px-4 py-3 bg-navy-800 text-white font-semibold rounded-lg"
            >
              <PhoneIcon className="w-5 h-5" />
              <span>{settings.phone}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
