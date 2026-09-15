import { Link } from 'react-router-dom';
import { SEOHead, buildBreadcrumbSchema, buildFAQSchema, organizationSchema, BASE_URL } from '@/components/seo/SEOHead';
import { Section, Breadcrumb, PhoneIcon, WhatsAppIcon, TelegramIcon } from '@/components/ui';
import { useSettings } from '@/lib/settingsContext';

const FAQS = [
  {
    q: 'حداقل تناژ سفارش عمده پارافین از پارس اکسیر چقدر است؟',
    a: 'فروش عمده از تناژهای کارگاهی (۱ تن به بالا) تا محموله‌های کانتینری و تریلی (۱۰ تا ۲۵ تن) مستقیماً از انبار کارخانه کاشان امکان‌پذیر است.',
  },
  {
    q: 'شرایط خرید عمده مدت‌دار و اعتباری چگونه است؟',
    a: 'برای کارخانجات و شرکت‌های تولیدی معتبر، پس از اعتبارسنجی اولیه، امکان تسویه به صورت چک صیادی و قراردادهای دوره‌ای تأمین مواد اولیه فراهم می‌باشد.',
  },
  {
    q: 'نحوه تحویل و بارگیری پارافین عمده چگونه انجام می‌شود؟',
    a: 'بارگیری از انبار مرکزی پارس اکسیر در کاشان (ابتدای جاده قمصر) بر روی تریلی، جفت یا تک در قالب‌های تخته‌ای پالت‌پوش انجام و بارنامه رسمی صادر می‌گردد.',
  },
  {
    q: 'تفاوت قیمت خرید نقدی و عمده در چیست؟',
    a: 'در خریدهای نقدی تناژ بالا، بیشترین میزان تخفیف شرکتی و قیمت کف بازار پتروشیمی اعمال می‌گردد.',
  },
];

const schemas = [
  organizationSchema,
  buildBreadcrumbSchema([
    { name: 'خانه', url: BASE_URL },
    { name: 'فروش عمده پارافین صنعتی', url: `${BASE_URL}/wholesale-paraffin` },
  ]),
  buildFAQSchema(FAQS),
];

export function WholesaleParaffinPage() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead
        title="فروش عمده پارافین صنعتی | تأمین تناژ بالا و قیمت کارخانه — پارس اکسیر"
        description="تأمین و فروش عمده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در تناژ بالا مستقیم از کاشان. شرایط خرید نقدی و مدت‌دار ویژه کارخانجات شمع‌سازی، لاستیک و چسب با پارس اکسیر."
        canonical="/wholesale-paraffin"
        structuredData={schemas}
      />

      {/* Header */}
      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'خانه', href: '/' },
              { label: 'فروش عمده پارافین' },
            ]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
            فروش عمده پارافین صنعتی در تناژ بالا
          </h1>
          <p className="text-navy-300 mt-3 text-lg max-w-2xl">
            تأمین مستقیم، پایدار و بدون واسطه انواع پارافین فلش ۱۲۰ و ۱۴۰ برای کارخانجات و مراکز صنعتی سراسر کشور
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Content */}
          <article className="prose prose-lg max-w-none text-charcoal-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy-900 border-b border-industrial-200 pb-3">
              تأمین دست‌اول مواد اولیه پتروشیمی از قطب کاشان
            </h2>
            <p>
              مجموعه تولیدی و بازرگانی <strong>پارس اکسیر</strong> به عنوان مرجع معتبر تأمین پارافین صنعتی در استان اصفهان و مرکز کشور، آمادگی دارد نیاز دوره‌ای و تناژ بالای کارخانجات شمع‌سازی، صنایع لاستیک و تایر، صنایع چسب و رنگ، و پوشش‌های محافظ را با بالاترین استانداردهای کنترل کیفی تأمین نماید.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="p-6 bg-industrial-50 rounded-2xl border border-industrial-200 text-center">
                <div className="text-3xl mb-2">🏭</div>
                <h3 className="font-bold text-navy-900 mb-2">تأمین مستمر کارخانه‌ای</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  تضمین عدم توقف خطوط تولید با دپوی مداوم در انبارهای مجهز کاشان
                </p>
              </div>
              <div className="p-6 bg-industrial-50 rounded-2xl border border-industrial-200 text-center">
                <div className="text-3xl mb-2">⚖️</div>
                <h3 className="font-bold text-navy-900 mb-2">کنترل دقیق گرید و فلش</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  تست مداوم نقطه اشتعال ۱۲۰ و ۱۴۰ و سنجش درصد چربی برای هر محموله
                </p>
              </div>
              <div className="p-6 bg-industrial-50 rounded-2xl border border-industrial-200 text-center">
                <div className="text-3xl mb-2">💳</div>
                <h3 className="font-bold text-navy-900 mb-2">انعطاف در پرداخت</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  تخفیف استثنایی تسویه نقدی و قراردادهای همکاری مدت‌دار شرکتی
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 border-b border-industrial-200 pb-3 mt-10">
              گریدهای عمده قابل سفارش پارس اکسیر
            </h2>

            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              {/* Product 1 */}
              <div className="border border-industrial-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-1">عمده پارافین فلش ۱۲۰</h3>
                  <p className="text-xs text-amber-600 font-semibold mb-3">حداقل سفارش ۱ تن • بسته‌بندی پالت</p>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-4">
                    مناسب برای صنایع بسته‌بندی، کارگاه‌ها و کارخانه‌های بزرگ شمع‌سازی، چسب‌های گرماذوب و کارخانجات واکس.
                  </p>
                </div>
                <Link to="/products/paraffin-flash-120" className="btn-secondary text-sm text-center py-2.5">
                  مشاهده مشخصات فنی فلش ۱۲۰ ←
                </Link>
              </div>

              {/* Product 2 */}
              <div className="border border-industrial-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-navy-900 mb-1">عمده پارافین فلش ۱۴۰</h3>
                  <p className="text-xs text-amber-600 font-semibold mb-3">حداقل سفارش ۱ تن • مقاومت حرارتی عالی</p>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-4">
                    فرموله شده برای صنایع تایر و قطعات لاستیکی خودرو، روکش کابل‌های مخابراتی و فرآیندهای شیمیایی سنگین.
                  </p>
                </div>
                <Link to="/products/paraffin-flash-140" className="btn-secondary text-sm text-center py-2.5">
                  مشاهده مشخصات فنی فلش ۱۴۰ ←
                </Link>
              </div>
            </div>
          </article>

          {/* CTA Box */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">درخواست پیش‌فاکتور عمده و عقد قرارداد تأمین</h3>
            <p className="text-navy-200 text-sm max-w-xl mx-auto">
              جهت استعلام قیمت تناژ بالا، بررسی شرایط تحویل در محل کارخانه شما و هماهنگی ارسال نمونه آزمایشگاهی، با مدیریت فروش تماس بگیرید.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a href={`tel:${settings.phone}`} className="btn-phone flex items-center gap-2">
                <PhoneIcon />
                تماس با بخش فروش عمده: {settings.phone}
              </a>
              <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex items-center gap-2">
                <WhatsAppIcon />
                استعلام در واتساپ
              </a>
              <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="btn-telegram flex items-center gap-2">
                <TelegramIcon />
                واحد تلگرام
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-6">پرسش‌های متداول فروش عمده</h2>
            <div className="space-y-4">
              {FAQS.map(faq => (
                <details key={faq.q} className="border border-industrial-200 rounded-xl overflow-hidden group bg-white">
                  <summary className="flex items-center justify-between p-5 cursor-pointer bg-industrial-50 hover:bg-industrial-100 transition-colors font-semibold text-navy-900">
                    {faq.q}
                    <svg className="w-5 h-5 text-charcoal-400 flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-5 text-charcoal-600 leading-relaxed border-t border-industrial-200">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Internal links */}
          <div className="pt-6 border-t border-industrial-200 flex flex-wrap gap-3">
            <Link to="/paraffin-price" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              استعلام قیمت روز پارافین ←
            </Link>
            <Link to="/buying-guide" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              راهنمای خرید پارافین صنعتی ←
            </Link>
            <Link to="/paraffin-types" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              بررسی انواع پارافین ←
            </Link>
            <Link to="/contact" className="text-sm text-accent-700 border border-accent-200 rounded-full px-4 py-1.5 hover:bg-accent-50 transition-colors">
              آدرس کارخانه کاشان و تماس ←
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
