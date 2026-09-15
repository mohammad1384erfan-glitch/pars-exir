import { Link } from 'react-router-dom';
import { SEOHead, buildBreadcrumbSchema, buildFAQSchema, organizationSchema, BASE_URL } from '@/components/seo/SEOHead';
import { Section, Breadcrumb, PhoneIcon, WhatsAppIcon, TelegramIcon } from '@/components/ui';
import { useSettings } from '@/lib/settingsContext';

const FAQS = [
  {
    q: 'مهم‌ترین فاکتورها هنگام خرید پارافین صنعتی چیست؟',
    a: 'نقطه اشتعال (Flash Point)، درصد چربی (Oil Content)، نقطه ذوب (Melting Point)، رنگ و شفافیت، و عدم وجود ناخالصی یا بوی نامطبوع اسیدی از مهم‌ترین فاکتورهای سنجش کیفی هنگام خرید پارافین است.',
  },
  {
    q: 'نحوه تسویه و خرید عمده در پارس اکسیر چگونه است؟',
    a: 'فروش به دو صورت نقدی (با تخفیف ویژه همکاری) و مدت‌دار (ویژه کارخانجات و تولیدکنندگان معتبر طرف قرارداد) انجام می‌شود. برای بررسی شرایط اعتباری با امور مالی و فروش تماس بگیرید.',
  },
  {
    q: 'آیا امکان ارسال نمونه برای تست آزمایشگاهی وجود دارد؟',
    a: 'بله، پارس اکسیر به درخواست صنایع و آزمایشگاه‌های کنترل کیفیت، نمونه تست پارافین فلش ۱۲۰ و فلش ۱۴۰ را قبل از ثبت تناژ نهایی ارسال می‌نماید.',
  },
  {
    q: 'محصولات چگونه بسته‌بندی و بارگیری می‌شوند؟',
    a: 'پارافین‌های قالبی در کارتن‌ها یا گونی‌های لمینت مقاوم در برابر رطوبت و پارگی، روی پالت استاندارد قرار گرفته و از انبار مرکزی کاشان به صورت مستقیم بارگیری می‌گردند.',
  },
];

const schemas = [
  organizationSchema,
  buildBreadcrumbSchema([
    { name: 'خانه', url: BASE_URL },
    { name: 'راهنمای خرید پارافین صنعتی', url: `${BASE_URL}/buying-guide` },
  ]),
  buildFAQSchema(FAQS),
];

export function BuyingGuidePage() {
  const { settings } = useSettings();

  return (
    <>
      <SEOHead
        title="راهنمای جامع خرید پارافین صنعتی | نکات فنی و تجاری — پارس اکسیر"
        description="راهنمای گام‌به‌گام خرید پارافین صنعتی، بررسی درصد چربی، نقطه اشتعال، نحوه ارسال بار و شرایط خرید نقدی و مدت‌دار مستقیم از کارخانه پارس اکسیر در کاشان."
        canonical="/buying-guide"
        structuredData={schemas}
      />

      {/* Header */}
      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'خانه', href: '/' },
              { label: 'راهنمای خرید پارافین صنعتی' },
            ]}
          />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
            راهنمای خرید پارافین صنعتی
          </h1>
          <p className="text-navy-300 mt-3 text-lg max-w-2xl">
            نکات حیاتی پیش از خرید، سنجش اصالت و کیفیت پارافین و مراحل ثبت سفارش مستقیم از پارس اکسیر
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Content */}
          <article className="prose prose-lg max-w-none text-charcoal-700 leading-relaxed">
            <h2 className="text-2xl font-bold text-navy-900 border-b border-industrial-200 pb-3">
              ۵ گام ضروری قبل از انتخاب و خرید پارافین صنعتی
            </h2>
            <p>
              خرید پارافین صنعتی برای کارخانجات و کارگاه‌ها تأثیر مستقیمی بر راندمان خط تولید و کیفیت محصول نهایی دارد. انتخاب گرید اشتباه یا پارافین با درصد چربی و ناخالصی بالا، موجب پس‌زدن روغن، تغییر رنگ و افت شدید کیفیت کالای نهایی می‌شود.
            </p>

            <div className="space-y-6 my-8 not-prose">
              {[
                {
                  step: '۱',
                  title: 'تعیین دقیق نقطه اشتعال (Flash Point) مورد نیاز خط تولید',
                  desc: 'اگر فرآیند شما نیازمند حرارت متوسط است (نظیر شمع، چسب و بسته‌بندی)، پارافین فلش ۱۲۰ انتخاب بهینه است. اما اگر با دماهای بالا و فرآیندهای سنگین پلیمری مواجهید، پارافین فلش ۱۴۰ ایمنی و پایداری را تضمین می‌کند.',
                },
                {
                  step: '۲',
                  title: 'بررسی درصد چربی (Oil Content)',
                  desc: 'درصد روغن پارافین صنعتی بسته به کاربرد بین ۱ تا ۵ درصد متغیر است. برای شمع‌های باکیفیت و محصولات صادراتی، درصد چربی پایین‌تر (۱ تا ۳ درصد) مانع از دوده زدن و چکه کردن وکس می‌شود.',
                },
                {
                  step: '۳',
                  title: 'بررسی فیزیکی، رنگ و بوی پارافین',
                  desc: 'پارافین مرغوب باید دارای رنگ سفید یکنواخت باشد و هیچ‌گونه بوی تند یا اسیدی نفتی نامتعارف نداشته باشد که نشان‌دهنده پالایش ناقص است.',
                },
                {
                  step: '۴',
                  title: 'تست نمونه آزمایشگاهی پیش از خرید تناژ بالا',
                  desc: 'همواره از تأمین‌کننده بخواهید نمونه‌ای منطبق بر بچ تولیدی برای تست خط به شما تحویل دهد. پارس اکسیر این امکان را برای صنایع فراهم ساخته است.',
                },
                {
                  step: '۵',
                  title: 'بررسی استمرار و پایداری تأمین در تمام فصول',
                  desc: 'خرید از تأمین‌کننده‌ای مستقر در قطب مرکزی کشور مانند کاشان، خیالتان را از دسترسی بی‌وقفه و عدم وقفه در خطوط تولید راحت می‌کند.',
                },
              ].map(item => (
                <div key={item.step} className="flex gap-4 p-5 bg-industrial-50 rounded-xl border border-industrial-200">
                  <span className="w-10 h-10 rounded-lg bg-navy-900 text-amber-400 font-bold flex items-center justify-center flex-shrink-0 text-lg">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-bold text-navy-900 text-base mb-1">{item.title}</h3>
                    <p className="text-charcoal-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-navy-900 border-b border-industrial-200 pb-3 mt-10">
              چرا خرید مستقیم از پارس اکسیر کاشان؟
            </h2>
            <p>
              مجموعه <strong>پارس اکسیر</strong> به نشانی <em>کاشان، ابتدای جاده قمصر</em> به عنوان تأمین‌کننده تخصصی پارافین صنعتی در مرکز ایران، امکان خرید بدون واسطه را با مزایای زیر فراهم کرده است:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
              <div className="p-4 bg-white rounded-xl border border-industrial-200">
                <div className="font-bold text-navy-900 mb-1 text-sm">💰 نرخ دست اول و رقابتی</div>
                <div className="text-xs text-charcoal-600 leading-relaxed">حذف دلالان و دلال‌بازی‌های بازار مواد شیمیایی تهران و اصفهان</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-industrial-200">
                <div className="font-bold text-navy-900 mb-1 text-sm">🚛 موقعیت لجستیکی عالی</div>
                <div className="text-xs text-charcoal-600 leading-relaxed">بارگیری فوری و ارسال اقتصادی به سراسر شهرها و شهرک‌های صنعتی ایران</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-industrial-200">
                <div className="font-bold text-navy-900 mb-1 text-sm">📦 بسته‌بندی استاندارد صنعتی</div>
                <div className="text-xs text-charcoal-600 leading-relaxed">قالب‌های یکپارچه تخته‌ای بدون خردشدگی در کارتن‌های محافظ</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-industrial-200">
                <div className="font-bold text-navy-900 mb-1 text-sm">🤝 شرایط پرداخت نقدی و مدت‌دار</div>
                <div className="text-xs text-charcoal-600 leading-relaxed">تخفیف ویژه نقدی و همراهی با شرایط پرداخت دوره‌ای کارخانجات معتبر</div>
              </div>
            </div>
          </article>

          {/* Direct CTA */}
          <div className="bg-navy-900 text-white rounded-2xl p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">برای استعلام قیمت روز و ثبت سفارش تماس بگیرید</h3>
            <p className="text-navy-200 text-sm max-w-xl mx-auto">
              تیم فروش پارس اکسیر در تمامی روزهای کاری آماده پاسخگویی، استعلام قیمت لحظه‌ای و تنظیم پیش‌فاکتور رسمی است.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a href={`tel:${settings.phone}`} className="btn-phone flex items-center gap-2">
                <PhoneIcon />
                تلفن تماس: {settings.phone}
              </a>
              <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex items-center gap-2">
                <WhatsAppIcon />
                سفارش در واتساپ
              </a>
              <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="btn-telegram flex items-center gap-2">
                <TelegramIcon />
                ارتباط در تلگرام
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-6">سوالات متداول خریداران پارافین</h2>
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
            <Link to="/products" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              مشاهده محصولات پارس اکسیر ←
            </Link>
            <Link to="/paraffin-types" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              بررسی انواع پارافین ←
            </Link>
            <Link to="/paraffin-price" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              قیمت پارافین صنعتی ←
            </Link>
            <Link to="/contact" className="text-sm text-accent-700 border border-accent-200 rounded-full px-4 py-1.5 hover:bg-accent-50 transition-colors">
              اطلاعات تماس و آدرس کاشان ←
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
