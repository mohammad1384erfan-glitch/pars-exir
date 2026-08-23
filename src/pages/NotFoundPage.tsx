import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';

export function NotFoundPage() {
  return (
    <>
      <SEOHead title="صفحه یافت نشد" noIndex />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold text-industrial-200 mb-4">۴۰۴</div>
          <h1 className="text-2xl font-bold text-navy-900 mb-3">صفحه یافت نشد</h1>
          <p className="text-charcoal-500 mb-8">
            صفحه‌ای که دنبال آن هستید وجود ندارد یا منتقل شده است.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">بازگشت به صفحه اصلی</Link>
            <Link to="/products" className="btn-secondary">مشاهده محصولات</Link>
          </div>
        </div>
      </div>
    </>
  );
}
