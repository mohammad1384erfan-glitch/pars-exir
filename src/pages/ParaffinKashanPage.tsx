import { Link } from 'react-router-dom';
import { SEOHead, buildBreadcrumbSchema, buildFAQSchema, organizationSchema, BASE_URL } from '@/components/seo/SEOHead';
import { Section, Breadcrumb, PhoneIcon, WhatsAppIcon, TelegramIcon, MapPinIcon } from '@/components/ui';
import { useSettings } from '@/lib/settingsContext';

const FAQS = [
  {
    q: 'پارافین صنعتی در کاشان از کجا بخریم؟',
    a: 'پارس اکسیر در کاشان، ابتدای جاده قمصر، تأمین‌کننده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ است. برای خرید با شماره ۰۹۱۳۳۶۲۸۶۸۱ تماس بگیرید.',
  },
  {
    q: 'آیا پارس اکسیر به شهرهای دیگر نیز ارسال می‌کند؟',
    a: 'بله، پارس اکسیر علاوه بر کاشان، به صنایع در اصفهان و سایر شهرها نیز خدمات ارائه می‌دهد. برای اطلاع از شرایط ارسال تماس بگیرید.',
  },
  {
    q: 'فروش پارافین صنعتی در کاشان با چه شرایطی انجام می‌شود؟',
    a: 'فروش نقدی و مدت‌دار هر دو امکانپذیر است. مشاوره رایگان برای انتخاب گرید مناسب (فلش ۱۲۰ یا فلش ۱۴۰) در دسترس است.',
  },
];

const schemas = [
  {
    ...organizationSchema,
    '@type': 'LocalBusiness',
    name: 'پارس اکسیر',
    description: 'فروش پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ابتدای جاده قمصر',
      addressLocality: 'کاشان',
      addressRegion: 'اصفهان',
      addressCountry: 'IR',
    },
  },
  buildBreadcrumbSchema([
    { name: 'خانه', url: BASE_URL },
    { name: 'پارافین صنعتی در کاشان', url: `${BASE_URL}/paraffin-kashan` },
  ]),
  buildFAQSchema(FAQS),
];

export function ParaffinKashanPage() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead
        title="فروش پارافین صنعتی در کاشان | پارس اکسیر"
        description="خرید و فروش پارافین صنعتی در کاشان. پارس اکسیر تأمین‌کننده پارافین فلش ۱۲۰ و فلش ۱۴۰ در کاشان — ابتدای جاده قمصر. تماس: ۰۹۱۳۳۶۲۸۶۸۱"
        canonical="/paraffin-kashan"
        structuredData={schemas}
      />

      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'پارافین صنعتی در کاشان' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            فروش پارافین صنعتی در کاشان
          </h1>
          <p className="text-navy-300 mt-3 text-lg">
            پارس اکسیر — تأمین‌کننده معتمد پارافین صنعتی در کاشان، ابتدای جاده قمصر
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <article dir="rtl">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">پارافین صنعتی در کاشان</h2>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              <strong className="text-navy-800">پارس اکسیر</strong> تأمین‌کننده پارافین صنعتی در کاشان است.
              این مجموعه در <strong className="text-navy-800">ابتدای جاده قمصر کاشان</strong> مستقر است و هر دو گرید
              <strong className="text-navy-800"> پارافین فلش ۱۲۰</strong> و <strong className="text-navy-800">پارافین فلش ۱۴۰</strong> را
              به صنایع مختلف عرضه می‌کند.
            </p>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              کاشان به عنوان یکی از مراکز صنعتی استان اصفهان، خانه صنایع متعدد از جمله صنایع نساجی، شیمیایی،
              پوشش‌ها و شمع‌سازی است. دسترسی آسان پارس اکسیر از جاده قمصر، خدمات‌دهی به صنایع کاشان و
              شهرهای اطراف را تسهیل می‌کند.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mb-4 mt-10">محصولات موجود در کاشان</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-6 bg-industrial-50 rounded-xl border border-industrial-200 hover:border-navy-300 transition-colors">
                <h3 className="font-bold text-navy-900 text-lg mb-2">پارافین صنعتی فلش ۱۲۰</h3>
                <p className="text-charcoal-600 text-sm mb-4">
                  مناسب برای شمع‌سازی، بسته‌بندی مواد غذایی، تولید چسب و پولیش.
                  نقطه اشتعال حداقل ۱۲۰ درجه سانتیگراد.
                </p>
                <Link to="/products/paraffin-flash-120" className="text-sm text-navy-700 font-semibold hover:underline">
                  مشاهده قیمت و مشخصات ←
                </Link>
              </div>
              <div className="p-6 bg-industrial-50 rounded-xl border border-industrial-200 hover:border-navy-300 transition-colors">
                <h3 className="font-bold text-navy-900 text-lg mb-2">پارافین صنعتی فلش ۱۴۰</h3>
                <p className="text-charcoal-600 text-sm mb-4">
                  مناسب برای صنایع لاستیک، پوشش‌های صنعتی سنگین و فرایندهای دمابالا.
                  نقطه اشتعال حداقل ۱۴۰ درجه سانتیگراد.
                </p>
                <Link to="/products/paraffin-flash-140" className="text-sm text-navy-700 font-semibold hover:underline">
                  مشاهده قیمت و مشخصات ←
                </Link>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mb-4 mt-10">موقعیت پارس اکسیر در کاشان</h2>
            <div className="bg-industrial-50 rounded-xl p-6 mb-8 border border-industrial-200">
              <address className="not-italic space-y-3 text-charcoal-700">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-navy-900">آدرس</div>
                    <div className="text-sm">{settings.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-navy-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-navy-900">تلفن</div>
                    <a href={`tel:${settings.phone}`} className="text-sm font-mono hover:underline">{settings.phone}</a>
                  </div>
                </div>
              </address>
              <div className="mt-4">
                <a
                  href={settings.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-navy-700 font-semibold hover:underline"
                >
                  <MapPinIcon className="w-4 h-4" />
                  مشاهده روی نقشه گوگل ←
                </a>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mb-4 mt-10">چرا پارافین را از کاشان تهیه کنید؟</h2>
            <ul className="space-y-3 mb-8">
              {[
                'دسترسی مستقیم از جاده قمصر کاشان',
                'موجودی مستمر فلش ۱۲۰ و فلش ۱۴۰',
                'امکان خرید نقدی و مدت‌دار',
                'مشاوره رایگان برای انتخاب گرید مناسب',
                'ارسال به اصفهان و شهرهای اطراف',
                'ارتباط مستقیم از طریق واتساپ و تلگرام',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-charcoal-600">
                  <span className="w-2 h-2 bg-accent-600 rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            {/* FAQ */}
            <h2 className="text-2xl font-bold text-navy-900 mb-6 mt-10">سؤالات متداول</h2>
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
          </article>

          {/* CTA */}
          <div className="bg-navy-800 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">برای خرید پارافین صنعتی تماس بگیرید</h2>
            <p className="text-navy-200 mb-6">
              پارس اکسیر در کاشان آماده پاسخگویی به نیاز صنایع شما است.
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

          {/* Internal links */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              همه محصولات ←
            </Link>
            <Link to="/paraffin-price" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              قیمت پارافین صنعتی ←
            </Link>
            <Link to="/industrial-paraffin" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              پارافین صنعتی چیست؟ ←
            </Link>
            <Link to="/contact" className="text-sm text-accent-700 border border-accent-200 rounded-full px-4 py-1.5 hover:bg-accent-50 transition-colors">
              تماس با ما ←
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
