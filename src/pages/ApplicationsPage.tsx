import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';
import { Section, Breadcrumb } from '@/components/ui';

const APPLICATIONS = [
  {
    icon: '🕯️',
    title: 'صنایع شمع‌سازی',
    slug: 'shameasazi',
    desc: 'پارافین صنعتی ماده اولیه اصلی در تولید شمع‌های صنعتی، تزئینی و آرایشی است. گرید فلش ۱۲۰ به دلیل نقطه ذوب مناسب، رایج‌ترین گرید مورد استفاده در این صنعت است.',
    products: ['paraffin-flash-120'],
  },
  {
    icon: '🏭',
    title: 'صنایع لاستیک',
    slug: 'rubber',
    desc: 'در صنایع لاستیک، پارافین صنعتی به عنوان روان‌کننده، ضد چسبندگی قالب، و محافظ سطحی استفاده می‌شود. گرید فلش ۱۴۰ به دلیل پایداری حرارتی بالاتر، در این صنعت ترجیح داده می‌شود.',
    products: ['paraffin-flash-140'],
  },
  {
    icon: '🔧',
    title: 'صنایع چسب',
    slug: 'adhesive',
    desc: 'پارافین در تولید برخی انواع چسب‌های صنعتی، به عنوان ماده تنظیم‌کننده ویسکوزیته و سختی محصول نهایی کاربرد دارد.',
    products: ['paraffin-flash-120', 'paraffin-flash-140'],
  },
  {
    icon: '🎨',
    title: 'پوشش‌ها و رنگ‌ها',
    slug: 'coatings',
    desc: 'پارافین در تولید برخی پوشش‌های صنعتی، واکس‌های زمین، و پوشش‌های محافظ فلزات به عنوان ماده مؤثر استفاده می‌شود.',
    products: ['paraffin-flash-140'],
  },
  {
    icon: '✨',
    title: 'پولیش و واکس',
    slug: 'polish',
    desc: 'در تولید واکس و پولیش‌های خودرویی، مبلمان و کفش، پارافین صنعتی یکی از مواد اولیه اصلی است که ایجاد سطح صاف و براق می‌کند.',
    products: ['paraffin-flash-120'],
  },
  {
    icon: '📦',
    title: 'بسته‌بندی',
    slug: 'packaging',
    desc: 'پارافین صنعتی در پوشش‌دهی بسته‌بندی‌های کاغذی و مقوایی، به‌ویژه برای محصولات غذایی‌ای که با مواد نگهداری خاص بسته‌بندی می‌شوند، استفاده می‌شود.',
    products: ['paraffin-flash-120'],
  },
  {
    icon: '⚗️',
    title: 'فرآیندهای شیمیایی',
    slug: 'chemical',
    desc: 'در برخی فرآیندهای شیمیایی صنعتی، پارافین به عنوان ماده حامل، عایق حرارتی، یا ماده کمکی در واکنش‌های خاص استفاده می‌شود.',
    products: ['paraffin-flash-140'],
  },
  {
    icon: '🔌',
    title: 'عایق‌کاری الکتریکی',
    slug: 'electrical',
    desc: 'به دلیل خواص عایق الکتریکی خوب پارافین، در برخی کاربردهای عایق‌کاری سیم‌ها و تجهیزات الکتریکی از آن استفاده می‌شود.',
    products: ['paraffin-flash-140'],
  },
];

export function ApplicationsPage() {
  return (
    <>
      <SEOHead
        title="کاربردهای پارافین صنعتی"
        description="پارافین صنعتی در صنایع مختلف از شمع‌سازی و لاستیک تا چسب و بسته‌بندی کاربرد دارد. بررسی کامل کاربردهای پارافین فلش ۱۲۰ و فلش ۱۴۰."
        canonical="/applications"
      />

      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'کاربردها' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            کاربردهای پارافین صنعتی
          </h1>
          <p className="text-navy-300 mt-3 text-lg">
            پارافین صنعتی در کدام صنایع استفاده می‌شود؟
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto">
          <p className="text-charcoal-600 text-lg leading-relaxed mb-12 text-center max-w-3xl mx-auto">
            پارافین صنعتی به دلیل ویژگی‌های منحصربه‌فردش — از جمله نقطه ذوب مناسب، بی‌اثری شیمیایی،
            و خواص عایق — در طیف گسترده‌ای از صنایع کاربرد دارد.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {APPLICATIONS.map(app => (
              <div key={app.slug} className="card p-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{app.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-navy-900 mb-2">{app.title}</h2>
                    <p className="text-charcoal-600 text-sm leading-relaxed mb-4">{app.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {app.products.map(p => (
                        <Link
                          key={p}
                          to={`/products/${p}`}
                          className="text-xs px-3 py-1 bg-navy-50 text-navy-700 rounded-full border border-navy-200 hover:bg-navy-100 transition-colors"
                        >
                          {p === 'paraffin-flash-120' ? 'فلش ۱۲۰' : 'فلش ۱۴۰'}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Internal links */}
          <div className="mt-14 bg-industrial-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">محصول مناسب برای نیاز شما</h2>
            <p className="text-charcoal-500 mb-6">
              برای انتخاب گرید مناسب پارافین برای صنعت خود، با ما مشورت کنید.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products/paraffin-flash-120" className="btn-secondary">
                پارافین فلش ۱۲۰
              </Link>
              <Link to="/products/paraffin-flash-140" className="btn-secondary">
                پارافین فلش ۱۴۰
              </Link>
              <Link to="/contact" className="btn-primary">
                مشاوره رایگان
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
