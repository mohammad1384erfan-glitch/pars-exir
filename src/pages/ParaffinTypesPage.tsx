import { Link } from 'react-router-dom';
import { SEOHead, buildBreadcrumbSchema, buildFAQSchema, organizationSchema, BASE_URL } from '@/components/seo/SEOHead';
import { Section, Breadcrumb, PhoneIcon, WhatsAppIcon, TelegramIcon } from '@/components/ui';
import { useSettings } from '@/lib/settingsContext';

const FAQS = [
  {
    q: 'انواع اصلی پارافین صنعتی کدامند؟',
    a: 'پارافین‌های صنعتی عمدتاً به دو دسته پارافین جامد (تخته‌ای / قالبی) و پارافین مایع تقسیم می‌شوند. در دسته جامد، گریدهای مختلف بر اساس نقطه اشتعال (Flash Point) مانند فلش ۱۲۰ و فلش ۱۴۰ و درصد چربی (۱ تا ۳ درصد، ۳ تا ۵ درصد) دسته‌بندی می‌گردند.',
  },
  {
    q: 'پارافین فلش ۱۲۰ برای چه صنایعی کاربرد دارد؟',
    a: 'پارافین فلش ۱۲۰ به دلیل دمای ذوب مناسب و شکل‌پذیری عالی، در صنایع شمع‌سازی، تولید چسب‌های صنعتی، پولیش و واکس، پوشش‌های محافظ چوب و بسته‌بندی ضدآب بیشترین کاربرد را دارد.',
  },
  {
    q: 'چه زمانی باید از پارافین فلش ۱۴۰ استفاده کرد؟',
    a: 'در صنایعی که حرارت فرآیند بالاست یا مقاومت در برابر اکسیداسیون و اشتعال ضرورت دارد، نظیر صنایع لاستیک و تایر، عایق‌های الکتریکی، روکش کابل‌های فشار قوی و صنایع شیمیایی سنگین، گرید فلش ۱۴۰ انتخاب الزامی است.',
  },
  {
    q: 'حداقل سفارش پارافین صنعتی از پارس اکسیر چقدر است؟',
    a: 'پارس اکسیر امکان تأمین در تناژهای کارگاهی و تناژهای بالای کارخانه‌ای را داراست. برای هماهنگی حجم سفارش و دریافت نمونه، با واحد فروش کاشان تماس بگیرید.',
  },
];

const schemas = [
  organizationSchema,
  buildBreadcrumbSchema([
    { name: 'خانه', url: BASE_URL },
    { name: 'انواع پارافین صنعتی', url: `${BASE_URL}/paraffin-types` },
  ]),
  buildFAQSchema(FAQS),
];

export function ParaffinTypesPage() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead
        title="انواع پارافین صنعتی | راهنمای کامل گریدها و کاربردها — پارس اکسیر"
        description="بررسی انواع پارافین صنعتی جامد و مایع، تفاوت گریدهای فلش ۱۲۰ و فلش ۱۴۰، درصد چربی و کاربرد هر گرید در صنایع مختلف با تضمین کیفیت پارس اکسیر کاشان."
        canonical="/paraffin-types"
        structuredData={schemas}
      />

      {/* Header */}
      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'خانه', href: '/' },
              { label: 'انواع پارافین صنعتی' },
            ]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
            انواع پارافین صنعتی
          </h1>
          <p className="text-navy-300 mt-3 text-lg max-w-2xl">
            شناخت کامل گریدهای پارافین صنعتی، مشخصات فنی و کاربرد اختصاصی هر گرید در صنایع کشور
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Intro */}
          <article className="prose prose-lg max-w-none text-charcoal-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy-900 border-b border-industrial-200 pb-3">
              دسته‌بندی جامع پارافین‌های صنعتی در بازار ایران
            </h2>
            <p>
              پارافین صنعتی (Industrial Paraffin) یکی از مشتقات راهبردی صنایع پالایشگاهی است که از تصفیه و روغن‌گیری اسلاک وکس (Slack Wax) حاصل می‌شود. این ماده به دلیل پایداری شیمیایی، خنثی بودن، عایق‌بندی رطوبتی و حرارتی، و انعطاف‌پذیری فیزیکی، نقشی کلیدی در خطوط تولید مدرن ایفا می‌کند.
            </p>

            {/* Grid of Main Types */}
            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-industrial-50 border border-industrial-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-navy-900 text-amber-400 rounded-xl flex items-center justify-center font-bold text-xl mb-4">
                  ۱
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">پارافین جامد (تخته‌ای / قالبی)</h3>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                  پرکاربردترین نوع پارافین صنعتی که به صورت تخته‌های قالبی ۵ تا ۳۰ کیلویی بسته‌بندی می‌شود. درصد چربی متداول آن ۱ تا ۳ درصد و ۳ تا ۵ درصد است.
                </p>
                <div className="text-xs text-navy-800 font-semibold bg-white p-3 rounded-lg border border-industrial-200">
                  گریدهای اصلی پارس اکسیر: فلش ۱۲۰ و فلش ۱۴۰
                </div>
              </div>

              <div className="bg-industrial-50 border border-industrial-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-navy-900 text-amber-400 rounded-xl flex items-center justify-center font-bold text-xl mb-4">
                  ۲
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">پارافین مایع صنعتی</h3>
                <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                  روغنی شفاف، بدون رنگ و بو که در روان‌کاری صنعتی، فرمولاسیون روغن‌های نساجی، مواد چرم‌سازی و برخی افزودنی‌های پلیمری کاربرد دارد.
                </p>
                <div className="text-xs text-navy-800 font-semibold bg-white p-3 rounded-lg border border-industrial-200">
                  شاخص‌ها: ویسکوزیته و نقطه اشتعال کنترل‌شده
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 border-b border-industrial-200 pb-3 mt-10">
              بررسی گریدهای اختصاصی تولید پارس اکسیر کاشان
            </h2>
            <p>
              مجموعه تولیدی و بازرگانی <strong>پارس اکسیر</strong> در کاشان، با تکیه بر استانداردهای مهندسی، دو گرید پرتقاضای بازار صنعتی را با کنترل کیفیت دقیق عرضه می‌کند:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              {/* Flash 120 Card */}
              <div className="border-2 border-navy-800 rounded-2xl p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-navy-900">پارافین صنعتی فلش ۱۲۰</h3>
                    <span className="px-3 py-1 bg-navy-50 text-navy-800 rounded-full text-xs font-bold border border-navy-200">
                      Flash Point ≥ 120°C
                    </span>
                  </div>
                  <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                    مناسب برای صنایعی که به دمای ذوب متعادل، سوخت تمیز و عدم ایجاد دوده نیاز دارند.
                  </p>
                  <ul className="space-y-2 text-sm text-charcoal-700 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> شمع‌سازی صنعتی و زینتی
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> پوشش‌دهی کارتن و بسته‌بندی ضدآب
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> فرمولاسیون چسب‌های حرارتی
                    </li>
                  </ul>
                </div>
                <Link
                  to="/products/paraffin-flash-120"
                  className="btn-primary text-center text-sm py-2.5"
                >
                  مشاهده مشخصات و قیمت فلش ۱۲۰ ←
                </Link>
              </div>

              {/* Flash 140 Card */}
              <div className="border-2 border-amber-600 rounded-2xl p-6 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-navy-900">پارافین صنعتی فلش ۱۴۰</h3>
                    <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
                      Flash Point ≥ 140°C
                    </span>
                  </div>
                  <p className="text-charcoal-600 text-sm leading-relaxed mb-4">
                    پایداری حرارتی فوق‌العاده برای شرایط کاری پرحرارت و ایمنی خطوط سنگین کارخانه‌ای.
                  </p>
                  <ul className="space-y-2 text-sm text-charcoal-700 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-amber-600 font-bold">✓</span> صنایع لاستیک، تایر و تسمه
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-600 font-bold">✓</span> عایق‌کاری کابل و ژل‌های نفتی
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-amber-600 font-bold">✓</span> پوشش‌های ضدخوردگی قطعات فلزی
                    </li>
                  </ul>
                </div>
                <Link
                  to="/products/paraffin-flash-140"
                  className="btn-secondary text-center text-sm py-2.5 border-navy-800 text-navy-900 hover:bg-navy-50"
                >
                  مشاهده مشخصات و قیمت فلش ۱۴۰ ←
                </Link>
              </div>
            </div>
          </article>

          {/* CTA Box */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">نیاز به راهنمایی در انتخاب نوع پارافین دارید؟</h3>
            <p className="text-navy-200 text-sm max-w-xl mx-auto">
              کارشناسان فنی پارس اکسیر با تحلیل فرآیند تولید کارخانه شما، مناسب‌ترین گرید از لحاظ فنی و اقتصادی را پیشنهاد می‌کنند.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a href={`tel:${settings.phone}`} className="btn-phone flex items-center gap-2">
                <PhoneIcon />
                تماس مستقیم: {settings.phone}
              </a>
              <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex items-center gap-2">
                <WhatsAppIcon />
                مشاوره در واتساپ
              </a>
              <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="btn-telegram flex items-center gap-2">
                <TelegramIcon />
                ارتباط در تلگرام
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-6">سوالات متداول درباره انواع پارافین</h2>
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
            <Link to="/industrial-paraffin" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              پارافین صنعتی چیست؟ ←
            </Link>
            <Link to="/paraffin-price" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              استعلام قیمت روز پارافین ←
            </Link>
            <Link to="/paraffin-kashan" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              خرید پارافین در کاشان ←
            </Link>
            <Link to="/buying-guide" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              راهنمای خرید پارافین ←
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
