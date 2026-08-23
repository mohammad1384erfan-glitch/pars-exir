import { useEffect, useState } from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Section, PageLoader, ErrorState, Breadcrumb } from '@/components/ui';
import { ProductCard } from '@/components/products/ProductCard';
import { getActiveProducts } from '@/lib/queries';
import type { Product } from '@/types';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getActiveProducts()
      .then(setProducts)
      .catch(() => setError('خطا در بارگذاری محصولات. لطفاً دوباره تلاش کنید.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'خانه', item: 'https://pars-exir.ir' },
      { '@type': 'ListItem', position: 2, name: 'محصولات', item: 'https://pars-exir.ir/products' },
    ],
  };

  return (
    <>
      <SEOHead
        title="محصولات پارافین صنعتی"
        description="خرید پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ از پارس اکسیر در کاشان. مشاهده قیمت و موجودی محصولات پارافین صنعتی."
        canonical="/products"
        structuredData={breadcrumbSchema}
      />

      {/* Page Header */}
      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'محصولات' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            محصولات پارافین صنعتی
          </h1>
          <p className="text-navy-300 mt-3 text-lg">
            پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ — مستقیم از کاشان
          </p>
        </div>
      </div>

      <Section>
        {loading ? (
          <PageLoader />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pricing note */}
            <div className="mt-12 max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h2 className="font-bold text-amber-900 mb-2">نکات مهم قیمت‌گذاری</h2>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                  قیمت‌ها نقدی است.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                  برای خرید با مدت تماس بگیرید.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                  قیمت‌ها ممکن است با نوسانات بازار تغییر کنند.
                </li>
              </ul>
            </div>

            {/* Internal links */}
            <div className="mt-10 text-center space-y-3">
              <p className="text-charcoal-500 text-sm">
                اطلاعات بیشتر:{' '}
                <a href="/industrial-paraffin" className="text-navy-700 hover:underline">پارافین صنعتی چیست؟</a>
                {' | '}
                <a href="/applications" className="text-navy-700 hover:underline">کاربردها</a>
                {' | '}
                <a href="/contact" className="text-navy-700 hover:underline">تماس با ما</a>
              </p>
            </div>
          </>
        )}
      </Section>
    </>
  );
}
