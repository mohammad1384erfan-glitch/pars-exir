import { Link } from 'react-router-dom';
import { SEOHead, buildBreadcrumbSchema, buildFAQSchema, BASE_URL } from '@/components/seo/SEOHead';
import { Section, Breadcrumb } from '@/components/ui';

const FAQS = [
  {
    q: 'پارافین صنعتی چیست؟',
    a: 'پارافین صنعتی یک ماده هیدروکربنی جامد است که از تصفیه نفت خام به دست می‌آید. از زنجیره‌های آلکانی با طول ۲۰ تا ۴۰ اتم کربن تشکیل شده و در دمای اتاق جامد است. در صنایع شمع‌سازی، لاستیک، بسته‌بندی، چسب و پولیش کاربرد گسترده دارد.',
  },
  {
    q: 'فلش ۱۲۰ و فلش ۱۴۰ چه تفاوتی دارند؟',
    a: 'تفاوت اصلی در نقطه اشتعال است. فلش ۱۲۰ دارای نقطه اشتعال حداقل ۱۲۰ درجه سانتیگراد است و برای صنایع شمع و بسته‌بندی مناسب است. فلش ۱۴۰ با نقطه اشتعال بالاتر برای صنایع لاستیک و پوشش‌های سنگین‌تر توصیه می‌شود.',
  },
  {
    q: 'چطور گرید مناسب پارافین را انتخاب کنیم؟',
    a: 'انتخاب گرید به نوع صنعت و دمای فرایند تولید شما بستگی دارد. برای شمع و بسته‌بندی معمولاً فلش ۱۲۰ مناسب است. برای لاستیک و پوشش‌های صنعتی سنگین‌تر فلش ۱۴۰ توصیه می‌شود. پارس اکسیر مشاوره رایگان برای انتخاب گرید مناسب ارائه می‌دهد.',
  },
  {
    q: 'پارافین صنعتی در کاشان از کجا تهیه کنیم؟',
    a: 'پارس اکسیر در کاشان، ابتدای جاده قمصر، هر دو گرید فلش ۱۲۰ و فلش ۱۴۰ را تأمین می‌کند. برای خرید با شماره ۰۹۱۳۳۶۲۸۶۸۱ تماس بگیرید.',
  },
];

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/industrial-paraffin#webpage`,
    name: 'پارافین صنعتی چیست؟ — راهنمای جامع',
    description: 'بررسی کامل پارافین صنعتی، ویژگی‌ها، گریدهای فلش ۱۲۰ و فلش ۱۴۰، کاربردها و راهنمای خرید',
    url: `${BASE_URL}/industrial-paraffin`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    breadcrumb: {
      '@id': `${BASE_URL}/industrial-paraffin#breadcrumb`,
    },
  },
  buildBreadcrumbSchema([
    { name: 'خانه', url: BASE_URL },
    { name: 'پارافین صنعتی', url: `${BASE_URL}/industrial-paraffin` },
  ]),
  buildFAQSchema(FAQS),
];

export function IndustrialParaffinPage() {
  return (
    <>
      <SEOHead
        title="پارافین صنعتی چیست؟ — راهنمای جامع خرید در کاشان"
        description="پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان. بررسی کامل ویژگی‌ها، کاربردها، تفاوت گریدها و نکات مهم خرید پارافین صنعتی از پارس اکسیر."
        canonical="/industrial-paraffin"
        structuredData={schemas}
      />

      {/* Header */}
      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'پارافین صنعتی' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            پارافین صنعتی چیست؟
          </h1>
          <p className="text-navy-300 mt-3 text-lg">
            راهنمای جامع پارافین صنعتی — ویژگی‌ها، گریدها، کاربردها و خرید در کاشان
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-4xl mx-auto">
          <article dir="rtl">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">پارافین صنعتی چیست؟</h2>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              پارافین صنعتی (Industrial Paraffin Wax) یک ماده هیدروکربنی جامد است که از فرایند تصفیه نفت خام به دست می‌آید.
              این ماده از زنجیره‌های آلکانی با طول بین ۲۰ تا ۴۰ اتم کربن تشکیل شده و دارای رنگ سفید تا کرم است.
              پارافین در دمای اتاق جامد و در دماهای بالاتر به مایع تبدیل می‌شود.
            </p>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              یکی از مهم‌ترین ویژگی‌های پارافین صنعتی، <strong className="text-navy-800">نقطه اشتعال (Flash Point)</strong> آن است که بر اساس آن گریدهای مختلف
              طبقه‌بندی می‌شوند. <strong className="text-navy-800">گرید فلش ۱۲۰</strong> و <strong className="text-navy-800">فلش ۱۴۰</strong> دو گرید پرکاربرد در صنایع ایران هستند که هر دو در پارس اکسیر کاشان موجود هستند.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mb-4 mt-10">ویژگی‌های عمومی پارافین صنعتی</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { prop: 'ظاهر', val: 'جامد سفید تا کرم رنگ' },
                { prop: 'بو', val: 'بدون بو یا بوی ملایم' },
                { prop: 'حلالیت در آب', val: 'نامحلول' },
                { prop: 'نقطه ذوب', val: 'معمولاً ۴۲ تا ۶۸ درجه سانتیگراد' },
                { prop: 'رسانایی الکتریکی', val: 'عایق الکتریکی خوب' },
                { prop: 'پایداری شیمیایی', val: 'پایداری بالا در شرایط عادی' },
              ].map(item => (
                <div key={item.prop} className="flex justify-between p-4 bg-industrial-50 rounded-xl border border-industrial-200">
                  <span className="text-charcoal-600 text-sm font-medium">{item.prop}</span>
                  <span className="text-navy-900 text-sm font-semibold">{item.val}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mb-4 mt-10">مقایسه پارافین فلش ۱۲۰ و فلش ۱۴۰</h2>
            <p className="text-charcoal-600 leading-relaxed mb-4">
              انتخاب درست بین این دو گرید بستگی به نوع صنعت و دمای فرایند تولید شما دارد:
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-navy-800 text-white">
                    <th className="p-4 text-right font-semibold">ویژگی</th>
                    <th className="p-4 text-right font-semibold">فلش ۱۲۰</th>
                    <th className="p-4 text-right font-semibold">فلش ۱۴۰</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['نقطه اشتعال', '≥ ۱۲۰°C', '≥ ۱۴۰°C'],
                    ['کاربرد اصلی', 'شمع، چسب، بسته‌بندی', 'لاستیک، پوشش‌های صنعتی'],
                    ['پایداری حرارتی', 'متوسط', 'بالا'],
                    ['صنایع مناسب', 'شمع‌سازی، بسته‌بندی، چسب', 'لاستیک، عایق‌کاری، پوشش'],
                    ['قیمت نسبی', 'اقتصادی‌تر', 'کمی گران‌تر'],
                  ].map(([prop, f120, f140]) => (
                    <tr key={prop} className="border-b border-industrial-200 even:bg-industrial-50">
                      <td className="p-4 font-medium text-charcoal-700">{prop}</td>
                      <td className="p-4 text-charcoal-600">{f120}</td>
                      <td className="p-4 text-charcoal-600">{f140}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mb-4 mt-10">نکات مهم نگهداری پارافین صنعتی</h2>
            <ul className="space-y-3 mb-8">
              {[
                'در محل خشک و دور از رطوبت نگهداری شود.',
                'دور از منابع حرارتی و آتش نگهداری شود.',
                'در محل تهویه مناسب انبار شود.',
                'از تماس با مواد اکسیدکننده قوی اجتناب شود.',
                'بسته‌بندی را تا زمان استفاده سربسته نگهداری کنید.',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-charcoal-600">
                  <span className="w-2 h-2 bg-navy-700 rounded-full flex-shrink-0 mt-2" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mb-4 mt-10">راهنمای خرید پارافین صنعتی در کاشان</h2>
            <p className="text-charcoal-600 leading-relaxed mb-4">
              <strong className="text-navy-800">پارس اکسیر</strong> در کاشان، ابتدای جاده قمصر، پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ را
              مستقیماً به صنایع عرضه می‌کند. هنگام خرید این نکات را مدنظر داشته باشید:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'گرید مناسب برای فرایند تولیدتان را انتخاب کنید (فلش ۱۲۰ یا ۱۴۰).',
                'از تأمین‌کننده معتبر با امکان ارائه مشاوره فنی خرید کنید.',
                'درباره شرایط پرداخت (نقدی یا مدت‌دار) مذاکره کنید.',
                'حداقل سفارش و شرایط تحویل را از پیش مشخص کنید.',
                'موجودی انبار تأمین‌کننده را بررسی کنید تا از تداوم تأمین مطمئن شوید.',
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
          <div className="bg-navy-800 text-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">برای خرید پارافین صنعتی آماده‌اید؟</h2>
            <p className="text-navy-200 mb-6">
              پارس اکسیر هر دو گرید فلش ۱۲۰ و فلش ۱۴۰ را از کاشان، با قیمت رقابتی و مشاوره رایگان تأمین می‌کند.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
                مشاهده محصولات و قیمت
              </Link>
              <Link to="/contact" className="btn-phone">
                تماس برای استعلام
              </Link>
            </div>
          </div>

          {/* Internal links */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/products/paraffin-flash-120" className="text-sm text-navy-700 hover:underline border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              پارافین فلش ۱۲۰ — قیمت و مشخصات ←
            </Link>
            <Link to="/products/paraffin-flash-140" className="text-sm text-navy-700 hover:underline border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              پارافین فلش ۱۴۰ — قیمت و مشخصات ←
            </Link>
            <Link to="/applications" className="text-sm text-navy-700 hover:underline border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              کاربردهای پارافین ←
            </Link>
            <Link to="/articles/tafavot-paraffin-flash-120-140" className="text-sm text-navy-700 hover:underline border border-navy-200 rounded-full px-4 py-1.5 hover:bg-navy-50 transition-colors">
              تفاوت فلش ۱۲۰ و ۱۴۰ ←
            </Link>
            <Link to="/contact" className="text-sm text-accent-700 hover:underline border border-accent-200 rounded-full px-4 py-1.5 hover:bg-accent-50 transition-colors">
              تماس برای استعلام قیمت ←
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
