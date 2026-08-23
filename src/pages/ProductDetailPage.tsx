import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead, buildProductSchema, buildBreadcrumbSchema, buildFAQSchema, BASE_URL } from '@/components/seo/SEOHead';
import { Section, PageLoader, ErrorState, AvailabilityBadge, Breadcrumb, PhoneIcon, WhatsAppIcon, TelegramIcon } from '@/components/ui';
import { getProductBySlug, getActiveProducts, getPublishedArticles } from '@/lib/queries';
import { getInventoryStatus, formatPrice } from '@/lib/inventory';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ProductCard } from '@/components/products/ProductCard';
import { useSettings } from '@/lib/settingsContext';
import type { Product, Article } from '@/types';

const PRODUCT_FAQS: Record<number, Array<{ q: string; a: string }>> = {
  120: [
    {
      q: 'پارافین صنعتی فلش ۱۲۰ چه کاربردی دارد؟',
      a: 'پارافین فلش ۱۲۰ در صنایع شمع‌سازی، بسته‌بندی مواد غذایی، تولید چسب و پولیش کاربرد دارد. نقطه اشتعال ۱۲۰ درجه سانتیگراد آن را برای فرایندهای صنعتی دمای متوسط مناسب می‌کند.',
    },
    {
      q: 'قیمت پارافین فلش ۱۲۰ چقدر است؟',
      a: 'قیمت پارافین صنعتی فلش ۱۲۰ به صورت روزانه از طریق تماس با پارس اکسیر اعلام می‌شود. برای استعلام قیمت با شماره ۰۹۱۳۳۶۲۸۶۸۱ تماس بگیرید.',
    },
    {
      q: 'آیا امکان خرید مدت‌دار پارافین فلش ۱۲۰ وجود دارد؟',
      a: 'بله، پارس اکسیر برای مشتریان حقوقی و صنعتی امکان خرید مدت‌دار را فراهم می‌کند. برای اطلاع از شرایط تماس بگیرید.',
    },
  ],
  140: [
    {
      q: 'پارافین صنعتی فلش ۱۴۰ چه کاربردی دارد؟',
      a: 'پارافین فلش ۱۴۰ به دلیل نقطه اشتعال بالاتر در صنایع لاستیک، پوشش‌های صنعتی سنگین، و فرایندهای دمابالا کاربرد دارد. پایداری حرارتی بالاتری نسبت به فلش ۱۲۰ دارد.',
    },
    {
      q: 'قیمت پارافین فلش ۱۴۰ چقدر است؟',
      a: 'قیمت پارافین صنعتی فلش ۱۴۰ را می‌توانید با تماس مستقیم با پارس اکسیر به شماره ۰۹۱۳۳۶۲۸۶۸۱ استعلام بگیرید.',
    },
    {
      q: 'تفاوت پارافین فلش ۱۴۰ با فلش ۱۲۰ چیست؟',
      a: 'مهم‌ترین تفاوت در نقطه اشتعال است: فلش ۱۴۰ دارای نقطه اشتعال حداقل ۱۴۰ درجه سانتیگراد است و پایداری حرارتی بالاتری دارد. برای صنایع سنگین‌تر مانند لاستیک مناسب‌تر است.',
    },
  ],
};

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { settings } = useSettings();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    Promise.all([
      getProductBySlug(slug),
      getActiveProducts(),
      getPublishedArticles(),
    ])
      .then(([prod, allProducts, allArticles]) => {
        setProduct(prod);
        if (prod) {
          setRelatedProducts(allProducts.filter(p => p.id !== prod.id).slice(0, 1));
          const related = allArticles.filter(a =>
            a.tags?.some(t => t.includes(String(prod.flash_point))) ||
            a.title.includes(String(prod.flash_point))
          ).slice(0, 3);
          setRelatedArticles(related.length > 0 ? related : allArticles.slice(0, 3));
        }
      })
      .catch(() => setError('خطا در بارگذاری اطلاعات محصول'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} />;
  if (product === null) return <Navigate to="/products" replace />;
  if (!product) return null;

  const status = getInventoryStatus(product.stock_quantity);
  const faqs = PRODUCT_FAQS[product.flash_point] ?? [];

  const schemas = [
    buildProductSchema(product),
    buildBreadcrumbSchema([
      { name: 'خانه', url: BASE_URL },
      { name: 'محصولات', url: `${BASE_URL}/products` },
      { name: product.name, url: `${BASE_URL}/products/${product.slug}` },
    ]),
    ...(faqs.length > 0 ? [buildFAQSchema(faqs)] : []),
  ];

  const seoDescription = `${product.name} با نقطه اشتعال ${product.flash_point} درجه سانتیگراد. ${product.description?.slice(0, 100) ?? ''} قیمت و موجودی از پارس اکسیر در کاشان. تماس: ۰۹۱۳۳۶۲۸۶۸۱`;

  return (
    <>
      <SEOHead
        title={`${product.name} | قیمت، مشخصات و خرید از پارس اکسیر`}
        description={seoDescription}
        canonical={`/products/${product.slug}`}
        structuredData={schemas}
        modifiedTime={product.updated_at}
      />

      {/* Page Header */}
      <div className="bg-navy-950 text-white py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'محصولات', href: '/products' },
            { label: product.name },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">{product.name}</h1>
          <p className="text-navy-300 mt-2 text-base">
            خرید مستقیم از پارس اکسیر — کاشان، ابتدای جاده قمصر
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div>
            <div className="aspect-square bg-industrial-50 rounded-2xl border border-industrial-200 flex items-center justify-center overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={`${product.name} — پارافین صنعتی فلش ${product.flash_point}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  width={600}
                  height={600}
                />
              ) : (
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <svg className="w-24 h-24 text-industrial-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="text-industrial-400 font-medium">{product.name}</span>
                </div>
              )}
            </div>

            {/* Trust signals below image */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 bg-industrial-50 rounded-lg text-center border border-industrial-100">
                <div className="font-bold text-navy-800 text-sm">نقطه اشتعال</div>
                <div className="text-charcoal-600 text-xs mt-0.5">≥ {product.flash_point}°C</div>
              </div>
              <div className="p-3 bg-industrial-50 rounded-lg text-center border border-industrial-100">
                <div className="font-bold text-navy-800 text-sm">مشاوره رایگان</div>
                <div className="text-charcoal-600 text-xs mt-0.5">انتخاب گرید مناسب</div>
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div>
            {/* Flash badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-navy-800 text-white font-bold rounded-lg text-lg">
                فلش {product.flash_point}
              </span>
              <AvailabilityBadge available={status.available} label={status.label} />
            </div>

            {/* Price */}
            <div className="bg-industrial-50 rounded-xl p-6 mb-6 border border-industrial-200">
              {status.available ? (
                <>
                  <p className="text-charcoal-500 text-sm mb-1">آخرین قیمت ثبت‌شده (هر کیلوگرم — نقدی)</p>
                  <p className="text-3xl font-bold text-navy-900">{formatPrice(product.price)}</p>
                  <p className="text-xs text-charcoal-400 mt-2">
                    * قیمت‌ها نقدی است. برای خرید با مدت تماس بگیرید.
                    قیمت ممکن است تغییر کند.
                  </p>
                </>
              ) : (
                <div>
                  <p className="text-red-700 font-bold text-lg mb-2">فعلاً ناموجود</p>
                  <p className="text-charcoal-500 text-sm">جهت اطلاع از زمان تأمین تماس بگیرید</p>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h2 className="font-bold text-navy-900 mb-2 text-lg">درباره {product.name}</h2>
                <p className="text-charcoal-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-6">
                <h2 className="font-bold text-navy-900 mb-3 text-lg">مشخصات فنی</h2>
                <div className="divide-y divide-industrial-100 border border-industrial-200 rounded-xl overflow-hidden">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 even:bg-industrial-50">
                      <span className="text-charcoal-600 text-sm">{key}</span>
                      <span className="font-semibold text-navy-900 text-sm">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-3">
              <a
                href={`tel:${settings.phone}`}
                className="btn-phone w-full flex items-center justify-center gap-2"
                aria-label={`تماس برای خرید ${product.name}`}
              >
                <PhoneIcon />
                تماس برای سفارش: {settings.phone}
              </a>
              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full flex items-center justify-center gap-2"
                aria-label={`سفارش ${product.name} در واتساپ`}
              >
                <WhatsAppIcon />
                سفارش در واتساپ
              </a>
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-telegram w-full flex items-center justify-center gap-2"
                aria-label={`سفارش ${product.name} در تلگرام`}
              >
                <TelegramIcon />
                سفارش در تلگرام
              </a>
            </div>
          </div>
        </div>

        {/* Applications */}
        {product.applications && product.applications.length > 0 && (
          <div className="max-w-5xl mx-auto mt-14">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">کاربردهای {product.name}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {product.applications.map((app) => (
                <div key={app} className="flex items-center gap-3 p-4 bg-industrial-50 rounded-xl border border-industrial-100">
                  <span className="w-2 h-2 bg-navy-700 rounded-full flex-shrink-0" aria-hidden="true" />
                  <span className="text-charcoal-700 text-sm">{app}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <div className="max-w-5xl mx-auto mt-14">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">سؤالات متداول</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
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
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-5xl mx-auto mt-14">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">محصولات مرتبط</h2>
            <div className="grid sm:grid-cols-2 gap-8 max-w-lg">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-5xl mx-auto mt-14">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">مقالات مرتبط</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map(a => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        )}

        {/* Internal link to compare */}
        <div className="max-w-5xl mx-auto mt-10">
          <div className="bg-navy-50 rounded-xl p-5 flex flex-wrap gap-4 items-center">
            <span className="text-charcoal-600 text-sm font-medium">مقالات مرتبط:</span>
            <Link to="/articles/tafavot-paraffin-flash-120-140" className="text-sm text-navy-700 hover:underline border border-navy-200 rounded-full px-4 py-1.5">
              تفاوت پارافین فلش ۱۲۰ و فلش ۱۴۰ ←
            </Link>
            <Link to="/industrial-paraffin" className="text-sm text-navy-700 hover:underline border border-navy-200 rounded-full px-4 py-1.5">
              پارافین صنعتی چیست؟ ←
            </Link>
            <Link to="/contact" className="text-sm text-accent-700 hover:underline border border-accent-200 rounded-full px-4 py-1.5">
              استعلام قیمت ←
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
