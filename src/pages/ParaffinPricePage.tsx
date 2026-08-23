import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead, buildBreadcrumbSchema, buildFAQSchema, organizationSchema, BASE_URL } from '@/components/seo/SEOHead';
import { Section, Breadcrumb, PageLoader, PhoneIcon, WhatsAppIcon, TelegramIcon } from '@/components/ui';
import { getActiveProducts } from '@/lib/queries';
import { formatPrice, getInventoryStatus } from '@/lib/inventory';
import { useSettings } from '@/lib/settingsContext';
import type { Product } from '@/types';

const FAQS = [
  {
    q: 'قیمت پارافین صنعتی چقدر است؟',
    a: 'قیمت پارافین صنعتی به صورت روزانه بر اساس نرخ بازار تعیین می‌شود. برای دریافت آخرین قیمت پارافین فلش ۱۲۰ و فلش ۱۴۰، با پارس اکسیر در کاشان تماس بگیرید: ۰۹۱۳۳۶۲۸۶۸۱',
  },
  {
    q: 'قیمت پارافین فلش ۱۲۰ و فلش ۱۴۰ چه تفاوتی دارد؟',
    a: 'پارافین فلش ۱۴۰ به دلیل نقطه اشتعال بالاتر و کاربرد در صنایع سنگین‌تر، معمولاً کمی گران‌تر از فلش ۱۲۰ است. هر دو گرید در پارس اکسیر موجود است.',
  },
  {
    q: 'آیا خرید پارافین با قیمت عمده ممکن است؟',
    a: 'بله، پارس اکسیر به صنایع و مشتریان عمده‌فروشی خدمات ارائه می‌دهد. برای استعلام قیمت عمده و شرایط خاص، تماس بگیرید.',
  },
  {
    q: 'آیا قیمت‌ها نقدی است؟',
    a: 'قیمت‌های اعلام‌شده در سایت نقدی است. برای خرید با مدت، شرایط مختلف از طریق تماس قابل بررسی است.',
  },
];

const schemas = [
  organizationSchema,
  buildBreadcrumbSchema([
    { name: 'خانه', url: BASE_URL },
    { name: 'قیمت پارافین صنعتی', url: `${BASE_URL}/paraffin-price` },
  ]),
  buildFAQSchema(FAQS),
];

export function ParaffinPricePage() {
  const { settings } = useSettings();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated] = useState(new Date());

  useEffect(() => {
    getActiveProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatLastUpdated = () =>
    new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(lastUpdated);

  return (
    <>
      <SEOHead
        title="قیمت پارافین صنعتی | فلش ۱۲۰ و فلش ۱۴۰ | پارس اکسیر"
        description="آخرین قیمت پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ از پارس اکسیر کاشان. قیمت‌ها نقدی است. برای استعلام قیمت روز تماس بگیرید: ۰۹۱۳۳۶۲۸۶۸۱"
        canonical="/paraffin-price"
        structuredData={schemas}
      />

      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'قیمت پارافین صنعتی' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            قیمت پارافین صنعتی
          </h1>
          <p className="text-navy-300 mt-3 text-lg">
            آخرین قیمت پارافین فلش ۱۲۰ و فلش ۱۴۰ — پارس اکسیر کاشان
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Important pricing notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <h2 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <span aria-hidden="true">⚠️</span>
              نکته مهم درباره قیمت‌گذاری
            </h2>
            <p className="text-amber-800 text-sm leading-relaxed">
              قیمت پارافین صنعتی روزانه بر اساس نرخ بازار تغییر می‌کند.
              قیمت‌های نمایش‌داده‌شده <strong>آخرین قیمت ثبت‌شده در سایت</strong> است و ممکن است با قیمت لحظه‌ای متفاوت باشد.
              برای دریافت <strong>قیمت روز</strong>، مستقیماً با ما تماس بگیرید.
            </p>
          </div>

          {/* Last updated */}
          <p className="text-xs text-charcoal-400 mb-6 text-left ltr" dir="ltr">
            آخرین بارگذاری: {formatLastUpdated()}
          </p>

          {/* Price table */}
          {loading ? (
            <PageLoader />
          ) : products.length > 0 ? (
            <div className="overflow-hidden border border-industrial-200 rounded-2xl mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    <th className="p-4 text-right font-semibold">محصول</th>
                    <th className="p-4 text-right font-semibold">نقطه اشتعال</th>
                    <th className="p-4 text-right font-semibold">قیمت نقدی (هر کیلوگرم)</th>
                    <th className="p-4 text-right font-semibold">وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    const status = getInventoryStatus(product.stock_quantity);
                    return (
                      <tr key={product.id} className="border-t border-industrial-200 hover:bg-industrial-50 transition-colors">
                        <td className="p-4">
                          <Link to={`/products/${product.slug}`} className="font-bold text-navy-800 hover:underline">
                            {product.name}
                          </Link>
                        </td>
                        <td className="p-4 text-charcoal-600">{product.flash_point}°C</td>
                        <td className="p-4">
                          {status.available ? (
                            <span className="font-bold text-navy-900">{formatPrice(product.price)}</span>
                          ) : (
                            <span className="text-red-600 font-semibold">استعلام بگیرید</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="p-4 bg-industrial-50 border-t border-industrial-200 text-xs text-charcoal-500">
                * قیمت‌ها نقدی است. برای خرید مدت‌دار و شرایط خاص تماس بگیرید.
                قیمت‌ها ممکن است تغییر کنند — برای قیمت دقیق روز استعلام بگیرید.
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-charcoal-500">
              برای اطلاع از قیمت با ما تماس بگیرید.
            </div>
          )}

          {/* CTA */}
          <div className="bg-navy-800 text-white rounded-2xl p-8 mb-10">
            <h2 className="text-xl font-bold mb-2">برای دریافت قیمت دقیق روز تماس بگیرید</h2>
            <p className="text-navy-200 text-sm mb-6">
              قیمت پارافین صنعتی روزانه تغییر می‌کند. برای استعلام دقیق و فوری با پارس اکسیر در کاشان تماس بگیرید.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${settings.phone}`} className="btn-phone flex items-center gap-2">
                <PhoneIcon />
                {settings.phone}
              </a>
              <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex items-center gap-2">
                <WhatsAppIcon />
                واتساپ
              </a>
              <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="btn-telegram flex items-center gap-2">
                <TelegramIcon />
                تلگرام
              </a>
            </div>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-navy-900 mb-6">سؤالات متداول درباره قیمت پارافین</h2>
          <div className="space-y-4 mb-10">
            {FAQS.map(faq => (
              <details key={faq.q} className="border border-industrial-200 rounded-xl overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer bg-industrial-50 hover:bg-industrial-100 transition-colors font-semibold text-navy-900">
                  {faq.q}
                  <svg className="w-5 h-5 text-charcoal-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-5 text-charcoal-600 leading-relaxed border-t border-industrial-200 bg-white">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          {/* Internal linking */}
          <div className="flex flex-wrap gap-3">
            <Link to="/products/paraffin-flash-120" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              مشخصات پارافین فلش ۱۲۰ ←
            </Link>
            <Link to="/products/paraffin-flash-140" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              مشخصات پارافین فلش ۱۴۰ ←
            </Link>
            <Link to="/industrial-paraffin" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              راهنمای خرید پارافین صنعتی ←
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
