import { Link } from 'react-router-dom';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="card flex flex-col overflow-hidden group">
      {article.featured_image && (
        <div className="aspect-video overflow-hidden bg-industrial-50">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6">
        {article.category && (
          <span className="inline-block mb-3 px-3 py-1 bg-navy-50 text-navy-700 text-xs font-semibold rounded-full border border-navy-100 w-fit">
            {article.category}
          </span>
        )}
        <h3 className="text-lg font-bold text-navy-900 mb-2 leading-snug line-clamp-2 group-hover:text-navy-700 transition-colors">
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.excerpt && (
          <p className="text-charcoal-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-industrial-100">
          {article.published_at && (
            <time dateTime={article.published_at} className="text-xs text-charcoal-400">
              {formatDate(article.published_at)}
            </time>
          )}
          <Link
            to={`/articles/${article.slug}`}
            className="text-navy-700 hover:text-navy-900 text-sm font-semibold transition-colors"
            aria-label={`مطالعه کامل: ${article.title}`}
          >
            مطالعه بیشتر ←
          </Link>
        </div>
      </div>
    </article>
  );
}
