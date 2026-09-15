import { Link } from 'react-router-dom';
import { useSettings } from '@/lib/settingsContext';
import { PhoneIcon, WhatsAppIcon, TelegramIcon, MapPinIcon } from '@/components/ui';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo size="lg" theme="dark" />
            </div>
            <p className="text-navy-300 text-sm leading-relaxed mb-3">
              {settings.description}
            </p>
            <address className="not-italic text-navy-400 text-xs leading-relaxed">
              <span className="block">کاشان — ابتدای جاده قمصر</span>
              <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">{settings.phone}</a>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-base">صفحات مهم</h3>
            <ul className="space-y-2">
              {[
                { label: 'پارافین صنعتی چیست؟', href: '/industrial-paraffin' },
                { label: 'محصولات', href: '/products' },
                { label: 'قیمت پارافین', href: '/paraffin-price' },
                { label: 'انواع پارافین صنعتی', href: '/paraffin-types' },
                { label: 'راهنمای خرید پارافین', href: '/buying-guide' },
                { label: 'پارافین در کاشان', href: '/paraffin-kashan' },
                { label: 'کاربردها', href: '/applications' },
                { label: 'مقالات', href: '/articles' },
                { label: 'درباره ما', href: '/about' },
                { label: 'تماس با ما', href: '/contact' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-navy-300 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-bold mb-4 text-base">محصولات</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/paraffin-flash-120" className="text-navy-300 hover:text-white text-sm transition-colors">
                  پارافین صنعتی فلش ۱۲۰
                </Link>
              </li>
              <li>
                <Link to="/products/paraffin-flash-140" className="text-navy-300 hover:text-white text-sm transition-colors">
                  پارافین صنعتی فلش ۱۴۰
                </Link>
              </li>
              <li>
                <Link to="/paraffin-price" className="text-navy-300 hover:text-white text-sm transition-colors">
                  استعلام قیمت
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-base">تماس با ما</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-2 text-navy-300 hover:text-white text-sm transition-colors group"
                  aria-label="تماس تلفنی"
                >
                  <PhoneIcon className="w-4 h-4 flex-shrink-0 text-accent-400" />
                  <span className="font-mono ltr">{settings.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={settings.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-navy-300 hover:text-green-400 text-sm transition-colors"
                  aria-label="واتساپ"
                >
                  <WhatsAppIcon className="w-4 h-4 flex-shrink-0 text-green-400" />
                  <span>واتساپ</span>
                </a>
              </li>
              <li>
                <a
                  href={settings.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-navy-300 hover:text-sky-400 text-sm transition-colors"
                  aria-label="تلگرام"
                >
                  <TelegramIcon className="w-4 h-4 flex-shrink-0 text-sky-400" />
                  <span>@{settings.telegram_username}</span>
                </a>
              </li>
              <li>
                <a
                  href={settings.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-navy-300 hover:text-white text-sm transition-colors"
                  aria-label="مشاهده روی نقشه"
                >
                  <MapPinIcon className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                  <span>{settings.address}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-navy-400 text-sm">
            © {currentYear} پارس اکسیر. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/admin/login" className="text-navy-500 hover:text-amber-400 transition-colors">
              🔐 ورود مدیریت
            </Link>
            <span className="text-navy-700">|</span>
            <span className="text-navy-500">
              طراحی و توسعه شده با ❤️ برای صنعت ایران
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
