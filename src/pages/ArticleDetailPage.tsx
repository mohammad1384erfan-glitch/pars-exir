import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { SEOHead, buildArticleSchema, buildBreadcrumbSchema, BASE_URL } from '@/components/seo/SEOHead';
import { Section, PageLoader, ErrorState, Breadcrumb } from '@/components/ui';
import { getArticleBySlug } from '@/lib/queries';
import type { Article } from '@/types';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));
}

// Simple markdown-to-HTML renderer (no external deps)
function renderContent(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-navy-900 mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-navy-900 mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h2 class="text-3xl font-bold text-navy-900 mt-10 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-navy-800">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 mb-1"><span class="w-1.5 h-1.5 bg-navy-700 rounded-full flex-shrink-0 mt-2" aria-hidden="true"></span><span>$1</span></li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="mb-4 space-y-1 list-none">$&</ul>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-charcoal-600 leading-relaxed">')
    .replace(/^(?!<[hul])(.+)$/gm, '<p class="mb-4 text-charcoal-600 leading-relaxed">$1</p>');
}

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getArticleBySlug(slug)
      .then(setArticle)
      .catch(() => setError('خطا در بارگذاری مقاله'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} />;
  if (article === null) return <Navigate to="/articles" replace />;
  if (!article) return null;

  const schemas = [
    buildArticleSchema(article),
    buildBreadcrumbSchema([
      { name: 'خانه', url: BASE_URL },
      { name: 'مقالات', url: `${BASE_URL}/articles` },
      { name: article.title, url: `${BASE_URL}/articles/${article.slug}` },
    ]),
  ];

  return (
    <>
      <SEOHead
        title={article.seo_title ?? article.title}
        description={article.meta_description ?? article.excerpt}
        canonical={`/articles/${article.slug}`}
        ogImage={article.featured_image ?? undefined}
        ogImageAlt={article.title}
        type="article"
        publishedTime={article.published_at ?? undefined}
        modifiedTime={article.updated_at}
        structuredData={schemas}
      />

      {/* Page Header */}
      <div className="bg-navy-950 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'خانه', href: '/' },
            { label: 'مقالات', href: '/articles' },
            { label: article.title },
          ]} />
          <h1 className="text-2xl md:text-4xl font-bold text-white mt-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-navy-300 text-sm">
            {article.category && (
              <span className="px-3 py-1 bg-white/10 rounded-full">{article.category}</span>
            )}
            {article.published_at && (
              <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
            )}
            <span className="text-navy-400">پارس اکسیر</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {article.featured_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      )}

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Excerpt */}
          {article.excerpt && (
            <div className="mb-8 p-6 bg-navy-50 border-r-4 border-navy-700 rounded-lg">
              <p className="text-navy-800 text-lg leading-relaxed font-medium">{article.excerpt}</p>
            </div>
          )}

          {/* Article content */}
          <div
            className="article-content text-charcoal-700 leading-loose"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-industrial-200">
              <div className="flex flex-wrap gap-2" aria-label="برچسب‌های مقاله">
                {article.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-industrial-100 text-charcoal-600 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Publisher info (E-E-A-T signal) */}
          <div className="mt-8 pt-6 border-t border-industrial-200 flex items-center gap-3 text-sm text-charcoal-500">
            <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">PE</span>
            </div>
            <div>
              <div className="font-medium text-charcoal-700">تیم محتوای پارس اکسیر</div>
              <div className="text-xs">تأمین‌کننده پارافین صنعتی در کاشان</div>
            </div>
          </div>

          {/* Internal links to products */}
          <div className="mt-10 bg-industrial-50 rounded-2xl p-6">
            <h2 className="font-bold text-navy-900 mb-3">مشاهده محصولات پارافین صنعتی</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/products/paraffin-flash-120" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-white transition-colors">
                پارافین فلش ۱۲۰ — قیمت و مشخصات ←
              </Link>
              <Link to="/products/paraffin-flash-140" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-white transition-colors">
                پارافین فلش ۱۴۰ — قیمت و مشخصات ←
              </Link>
              <Link to="/industrial-paraffin" className="text-sm text-navy-700 border border-navy-200 rounded-full px-4 py-1.5 hover:bg-white transition-colors">
                پارافین صنعتی چیست؟ ←
              </Link>
              <Link to="/contact" className="text-sm text-accent-700 border border-accent-200 rounded-full px-4 py-1.5 hover:bg-accent-50 transition-colors">
                تماس برای استعلام قیمت ←
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
