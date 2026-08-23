import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, deleteArticle, updateArticle } from '@/lib/queries';
import type { Article } from '@/types';
import { LoadingSpinner } from '@/components/ui';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(dateStr));
}

export function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const load = () => {
    setLoading(true);
    getAllArticles()
      .then(setArticles)
      .catch(() => setError('خطا در بارگذاری مقالات'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const notify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleTogglePublish = async (article: Article) => {
    setActionLoading(article.id);
    try {
      await updateArticle(article.id, {
        published: !article.published,
        published_at: !article.published ? new Date().toISOString() : article.published_at,
      });
      load();
      notify('success', `مقاله ${article.published ? 'unpublish' : 'منتشر'} شد.`);
    } catch {
      notify('error', 'خطا در تغییر وضعیت انتشار.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (article: Article) => {
    if (!window.confirm(`آیا از حذف "${article.title}" اطمینان دارید؟`)) return;
    setActionLoading(article.id);
    try {
      await deleteArticle(article.id);
      load();
      notify('success', 'مقاله با موفقیت حذف شد.');
    } catch {
      notify('error', 'خطا در حذف مقاله.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div>
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-xl text-white text-sm font-semibold ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">مدیریت مقالات</h1>
          <p className="text-charcoal-400 text-sm mt-1">ایجاد، ویرایش و انتشار مقالات</p>
        </div>
        <Link to="/admin/articles/new" className="btn-primary text-sm">
          + مقاله جدید
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-charcoal-400"><LoadingSpinner size="sm" />در حال بارگذاری...</div>
      ) : error ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>
      ) : (
        <div className="admin-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-industrial-50 border-b border-industrial-200">
                <tr>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">عنوان</th>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">وضعیت</th>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">تاریخ انتشار</th>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-100">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-industrial-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-navy-900 line-clamp-1">{article.title}</div>
                      <div className="text-xs text-charcoal-400 mt-0.5">{article.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        article.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {article.published ? 'منتشر شده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-charcoal-500 text-xs">
                      {formatDate(article.published_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/articles/${article.id}`}
                          className="text-xs px-3 py-1.5 bg-navy-50 text-navy-700 rounded-lg hover:bg-navy-100 font-medium"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleTogglePublish(article)}
                          disabled={actionLoading === article.id}
                          className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 font-medium disabled:opacity-50"
                        >
                          {article.published ? 'unpublish' : 'انتشار'}
                        </button>
                        {article.published && (
                          <a
                            href={`/articles/${article.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium"
                          >
                            مشاهده
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(article)}
                          disabled={actionLoading === article.id}
                          className="text-xs px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 font-medium disabled:opacity-50"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {articles.length === 0 && (
              <div className="text-center py-12 text-charcoal-400">مقاله‌ای یافت نشد.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
