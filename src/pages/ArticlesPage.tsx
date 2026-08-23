import { useEffect, useState } from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { Section, PageLoader, ErrorState, EmptyState, Breadcrumb } from '@/components/ui';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { getPublishedArticles } from '@/lib/queries';
import type { Article } from '@/types';

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getPublishedArticles()
      .then(setArticles)
      .catch(() => setError('خطا در بارگذاری مقالات'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <SEOHead
        title="مقالات پارافین صنعتی"
        description="مقالات تخصصی درباره پارافین صنعتی، قیمت پارافین، خرید پارافین در کاشان، و راهنمای انتخاب گرید مناسب."
        canonical="/articles"
      />

      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'مقالات' },
          ]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            مقالات پارافین صنعتی
          </h1>
          <p className="text-navy-300 mt-3 text-lg">
            راهنماهای تخصصی، قیمت‌گذاری، و کاربردهای پارافین صنعتی
          </p>
        </div>
      </div>

      <Section>
        {loading ? (
          <PageLoader />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : articles.length === 0 ? (
          <EmptyState message="هنوز مقاله‌ای منتشر نشده است." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
