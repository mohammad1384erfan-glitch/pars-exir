import { SEOHead, organizationSchema } from '@/components/seo/SEOHead';
import { Section, Breadcrumb, PhoneIcon, WhatsAppIcon, TelegramIcon, MapPinIcon } from '@/components/ui';
import { useSettings } from '@/lib/settingsContext';
import { Link } from 'react-router-dom';

export function ContactPage() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead
        title="تماس با پارس اکسیر | فروش پارافین صنعتی در کاشان"
        description="با پارس اکسیر برای خرید پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ تماس بگیرید. آدرس: کاشان، ابتدای جاده قمصر. تلفن: ۰۹۱۳۳۶۲۸۶۸۱. واتساپ و تلگرام نیز در دسترس است."
        canonical="/contact"
        structuredData={organizationSchema}
      />

      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'تماس با ما' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">تماس با ما</h1>
          <p className="text-navy-300 mt-3 text-lg">
            برای استعلام قیمت، ثبت سفارش و مشاوره با ما در تماس باشید
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact methods */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-navy-900">راه‌های ارتباطی</h2>

              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-5 p-6 card hover:border-navy-300 transition-colors"
                aria-label="تماس تلفنی"
              >
                <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-sm text-charcoal-400 mb-1">تماس تلفنی</div>
                  <div className="text-xl font-bold text-navy-900 font-mono ltr">{settings.phone}</div>
                </div>
              </a>

              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-6 card hover:border-green-300 transition-colors"
                aria-label="واتساپ"
              >
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-sm text-charcoal-400 mb-1">واتساپ</div>
                  <div className="text-lg font-bold text-navy-900">ارسال پیام در واتساپ</div>
                </div>
              </a>

              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-6 card hover:border-sky-300 transition-colors"
                aria-label="تلگرام"
              >
                <div className="w-14 h-14 bg-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TelegramIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-sm text-charcoal-400 mb-1">تلگرام</div>
                  <div className="text-lg font-bold text-navy-900">@{settings.telegram_username}</div>
                </div>
              </a>

              <a
                href={settings.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-6 card hover:border-red-300 transition-colors"
                aria-label="مشاهده آدرس روی نقشه"
              >
                <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-sm text-charcoal-400 mb-1">آدرس</div>
                  <div className="text-base font-bold text-navy-900">{settings.address}</div>
                  <div className="text-xs text-navy-600 mt-1">مشاهده روی نقشه ←</div>
                </div>
              </a>
            </div>

            {/* Map embed area + CTA */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">برای چه موضوعاتی تماس بگیرید؟</h2>
              <div className="space-y-4 mb-8">
                {[
                  'استعلام قیمت پارافین فلش ۱۲۰ و فلش ۱۴۰',
                  'بررسی موجودی و زمان تأمین',
                  'انتخاب گرید مناسب برای صنعت شما',
                  'شرایط خرید مدت‌دار',
                  'اطلاع از جزئیات ارسال و تحویل',
                ].map(topic => (
                  <div key={topic} className="flex items-center gap-3 text-charcoal-600">
                    <span className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0" />
                    {topic}
                  </div>
                ))}
              </div>

              {/* Business Hours note */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-amber-900 mb-2">نکته</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  برای پاسخگویی سریع‌تر، از طریق واتساپ یا تلگرام پیام دهید.
                  درخواست شما در اسرع وقت پاسخ داده خواهد شد.
                </p>
              </div>

              {/* Product links */}
              <div className="bg-industrial-50 rounded-xl p-5">
                <h3 className="font-bold text-navy-900 mb-3">محصولات ما</h3>
                <div className="space-y-2">
                  <Link to="/products/paraffin-flash-120" className="block text-sm text-navy-700 hover:underline">
                    ← پارافین صنعتی فلش ۱۲۰
                  </Link>
                  <Link to="/products/paraffin-flash-140" className="block text-sm text-navy-700 hover:underline">
                    ← پارافین صنعتی فلش ۱۴۰
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
