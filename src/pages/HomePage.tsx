import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead, organizationSchema, websiteSchema } from '@/components/seo/SEOHead';
import { Section, SectionHeader, PageLoader, ErrorState, PhoneIcon, WhatsAppIcon, TelegramIcon, MapPinIcon } from '@/components/ui';
import { ProductCard } from '@/components/products/ProductCard';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useSettings } from '@/lib/settingsContext';
import { getActiveProducts, getPublishedArticles } from '@/lib/queries';
import type { Product, Article } from '@/types';

export function HomePage() {
  const { settings } = useSettings();
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  useEffect(() => {
    getActiveProducts()
      .then(setProducts)
      .catch(() => setErrorProducts('خطا در بارگذاری محصولات'))
      .finally(() => setLoadingProducts(false));

    getPublishedArticles()
      .then(data => setArticles(data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoadingArticles(false));
  }, []);

  return (
    <>
      <SEOHead
        title="فروش پارافین صنعتی در کاشان"
        description="پارس اکسیر تأمین‌کننده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان. خرید پارافین صنعتی با کیفیت بالا و قیمت مناسب. تماس: ۰۹۱۳۳۶۲۸۶۸۱"
        canonical="/"
        structuredData={[organizationSchema, websiteSchema]}
      />

      {/* Hero */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-navy-200 mb-6 border border-white/10">
                <span className="w-2 h-2 bg-accent-400 rounded-full" />
                تأمین‌کننده معتمد پارافین صنعتی در کاشان
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                فروش
                <span className="block text-accent-400">پارافین صنعتی</span>
              </h1>

              <p className="text-navy-200 text-lg md:text-xl leading-relaxed mb-8">
                {settings.business_name}، تأمین پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ با کیفیت تضمین‌شده.
                مناسب برای صنایع شمع‌سازی، لاستیک، چسب و بسته‌بندی.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href={`tel:${settings.phone}`}
                  className="btn-phone flex items-center gap-2 text-base"
                  aria-label="تماس برای ثبت سفارش"
                >
                  <PhoneIcon />
                  تماس برای ثبت سفارش
                </a>
                <a
                  href={settings.whatsapp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex items-center gap-2 text-base"
                  aria-label="تماس در واتساپ"
                >
                  <WhatsAppIcon />
                  تماس در واتساپ
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="text-2xl font-bold text-white">۲</div>
                  <div className="text-navy-300 text-sm">گرید محصول</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">کاشان</div>
                  <div className="text-navy-300 text-sm">محل تأمین</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">مستقیم</div>
                  <div className="text-navy-300 text-sm">فروش به صنایع</div>
                </div>
              </div>
            </div>

            {/* Right side — Product quick view */}
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-white font-bold text-xl mb-4">محصولات ما</h2>
                <div className="space-y-3">
                  {loadingProducts ? (
                    <div className="text-navy-300 text-sm animate-pulse">در حال بارگذاری...</div>
                  ) : products.length > 0 ? (
                    products.map(product => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <div className="text-white font-semibold text-sm">{product.name}</div>
                          <div className="text-navy-300 text-xs mt-0.5">فلش {product.flash_point}</div>
                        </div>
                        <div className="text-left">
                          {product.stock_quantity > 0 ? (
                            <>
                              <div className="text-accent-400 font-bold text-sm">
                                {new Intl.NumberFormat('fa-IR').format(product.price)} ریال
                              </div>
                              <div className="text-green-400 text-xs">موجود</div>
                            </>
                          ) : (
                            <div className="text-red-400 text-sm font-semibold">ناموجود</div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-navy-300 text-sm">محصولی یافت نشد</div>
                  )}
                </div>
                <Link to="/products" className="mt-4 block text-center text-sm text-navy-300 hover:text-white transition-colors">
                  مشاهده همه محصولات ←
                </Link>
              </div>

              {/* Address card */}
              <a
                href={settings.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                aria-label="مشاهده آدرس روی نقشه"
              >
                <MapPinIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">موقعیت ما</div>
                  <div className="text-navy-300 text-xs">{settings.address}</div>
                </div>
                <svg className="w-4 h-4 text-navy-400 mr-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="bg-industrial-50 border-b border-industrial-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🏭', title: 'کیفیت صنعتی', desc: 'پارافین با خلوص بالا' },
              { icon: '🚚', title: 'تحویل سریع', desc: 'از کاشان به سراسر ایران' },
              { icon: '💬', title: 'مشاوره رایگان', desc: 'انتخاب گرید مناسب' },
              { icon: '📋', title: 'خرید نقدی و مدت‌دار', desc: 'شرایط انعطاف‌پذیر' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2 py-4">
                <span className="text-3xl">{item.icon}</span>
                <div className="font-bold text-navy-900 text-sm">{item.title}</div>
                <div className="text-charcoal-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <Section id="products">
        <SectionHeader
          title="محصولات پارافین صنعتی"
          subtitle="پارافین صنعتی با کیفیت بالا — فلش ۱۲۰ و فلش ۱۴۰"
        />
        {loadingProducts ? (
          <PageLoader />
        ) : errorProducts ? (
          <ErrorState message={errorProducts} />
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-charcoal-400 mb-2">* قیمت‌ها نقدی است.</p>
          <p className="text-sm text-charcoal-400">برای خرید با مدت تماس بگیرید.</p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/products" className="btn-secondary inline-flex">
            مشاهده همه محصولات
          </Link>
        </div>
      </Section>

      {/* About / Why us */}
      <Section className="bg-navy-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">چرا پارس اکسیر؟</h2>
          <p className="text-navy-200 text-lg leading-relaxed mb-12">
            پارس اکسیر با تمرکز بر تأمین پارافین صنعتی با کیفیت بالا در کاشان، پاسخگوی نیاز صنایع مختلف است.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'فلش ۱۲۰ و ۱۴۰',
                desc: 'دو گرید استاندارد صنعتی که نیاز اکثر فرایندهای صنعتی را پوشش می‌دهند.',
              },
              {
                icon: '📍',
                title: 'مستقر در کاشان',
                desc: 'دسترسی آسان از ابتدای جاده قمصر، ارائه خدمات به صنایع اصفهان و سراسر کشور.',
              },
              {
                icon: '🤝',
                title: 'خرید راحت',
                desc: 'امکان خرید نقدی و مدت‌دار. مشاوره رایگان برای انتخاب گرید مناسب.',
              },
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-navy-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/about" className="btn-secondary bg-transparent border-white/30 text-white hover:bg-white/10">
              بیشتر درباره ما
            </Link>
          </div>
        </div>
      </Section>

      {/* Applications teaser */}
      <Section>
        <SectionHeader
          title="کاربردهای پارافین صنعتی"
          subtitle="پارافین صنعتی در صنایع مختلف کاربرد دارد"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {[
            { icon: '🕯️', label: 'شمع‌سازی' },
            { icon: '🏭', label: 'صنایع لاستیک' },
            { icon: '🔧', label: 'صنایع چسب' },
            { icon: '🎨', label: 'پوشش‌ها' },
            { icon: '✨', label: 'پولیش‌ها' },
            { icon: '📦', label: 'بسته‌بندی' },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-2 p-4 bg-industrial-50 rounded-xl border border-industrial-100 hover:border-navy-200 transition-colors">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-sm font-medium text-navy-800 text-center">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/applications" className="btn-secondary">
            مشاهده همه کاربردها
          </Link>
        </div>
      </Section>

      {/* Articles Section */}
      {!loadingArticles && articles.length > 0 && (
        <Section className="bg-industrial-50">
          <SectionHeader
            title="مقالات تخصصی"
            subtitle="آموزش و راهنمای خرید پارافین صنعتی"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/articles" className="btn-secondary">
              مشاهده همه مقالات
            </Link>
          </div>
        </Section>
      )}

      {/* CTA Banner */}
      <Section className="bg-accent-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">آماده سفارش هستید؟</h2>
          <p className="text-accent-100 text-lg mb-8">
            برای استعلام قیمت، اطلاع از موجودی و ثبت سفارش با ما تماس بگیرید.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${settings.phone}`} className="btn-primary bg-white text-accent-700 hover:bg-accent-50 flex items-center gap-2">
              <PhoneIcon />
              {settings.phone}
            </a>
            <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white text-white hover:bg-white/10 flex items-center gap-2">
              <WhatsAppIcon />
              واتساپ
            </a>
            <a href={settings.telegram_url} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white text-white hover:bg-white/10 flex items-center gap-2">
              <TelegramIcon />
              تلگرام
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
