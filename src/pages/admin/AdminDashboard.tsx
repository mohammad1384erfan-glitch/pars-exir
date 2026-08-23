import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, getAllArticles, getSiteSettings } from '@/lib/queries';
import { formatPrice } from '@/lib/inventory';


interface Stats {
  totalProducts: number;
  availableProducts: number;
  unavailableProducts: number;
  totalArticles: number;
  publishedArticles: number;
  flash120Price: string | null;
  flash140Price: string | null;
  settingsUpdated: string | null;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getAllProducts(), getAllArticles(), getSiteSettings()])
      .then(([products, articles, settings]) => {
        const flash120 = products.find(p => p.flash_point === 120);
        const flash140 = products.find(p => p.flash_point === 140);
        setStats({
          totalProducts: products.length,
          availableProducts: products.filter(p => p.stock_quantity > 0 && p.active).length,
          unavailableProducts: products.filter(p => p.stock_quantity === 0 || !p.active).length,
          totalArticles: articles.length,
          publishedArticles: articles.filter(a => a.published).length,
          flash120Price: flash120 ? formatPrice(flash120.price) : null,
          flash140Price: flash140 ? formatPrice(flash140.price) : null,
          settingsUpdated: settings?.updated_at ?? null,
        });
      })
      .catch(() => setError('خطا در بارگذاری آمار'))
      .finally(() => setLoading(false));
  }, []);

  function formatDateTime(dateStr: string | null): string {
    if (!dateStr) return '—';
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    }).format(new Date(dateStr));
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">داشبورد</h1>
        <p className="text-charcoal-400 text-sm mt-1">خلاصه وضعیت سایت پارس اکسیر</p>
      </div>

      {loading ? (
        <div className="text-charcoal-400 animate-pulse">در حال بارگذاری آمار...</div>
      ) : error ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>
      ) : stats ? (
        <>
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard
              label="تعداد محصولات"
              value={stats.totalProducts.toString()}
              icon="📦"
              color="blue"
            />
            <StatCard
              label="محصولات موجود"
              value={stats.availableProducts.toString()}
              icon="✅"
              color="green"
            />
            <StatCard
              label="محصولات ناموجود"
              value={stats.unavailableProducts.toString()}
              icon="❌"
              color="red"
            />
            <StatCard
              label="تعداد مقالات"
              value={`${stats.publishedArticles} / ${stats.totalArticles}`}
              icon="📝"
              color="purple"
            />
          </div>

          {/* Price cards */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="admin-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-charcoal-500 text-sm font-medium">قیمت فلش ۱۲۰</span>
                <Link to="/admin/products" className="text-xs text-navy-600 hover:underline">ویرایش</Link>
              </div>
              <p className="text-2xl font-bold text-navy-900">{stats.flash120Price ?? '—'}</p>
            </div>
            <div className="admin-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-charcoal-500 text-sm font-medium">قیمت فلش ۱۴۰</span>
                <Link to="/admin/products" className="text-xs text-navy-600 hover:underline">ویرایش</Link>
              </div>
              <p className="text-2xl font-bold text-navy-900">{stats.flash140Price ?? '—'}</p>
            </div>
          </div>

          {/* Settings updated at */}
          <div className="admin-card mb-8">
            <p className="text-sm text-charcoal-500">
              آخرین بروزرسانی تنظیمات: <strong className="text-navy-900">{formatDateTime(stats.settingsUpdated)}</strong>
            </p>
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-lg font-bold text-navy-900 mb-4">دسترسی سریع</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/admin/products" className="admin-card flex items-center gap-3 hover:border-navy-300 transition-colors cursor-pointer">
                <span className="text-2xl">📦</span>
                <div>
                  <div className="font-semibold text-navy-900">مدیریت محصولات</div>
                  <div className="text-xs text-charcoal-400">ویرایش قیمت و موجودی</div>
                </div>
              </Link>
              <Link to="/admin/articles" className="admin-card flex items-center gap-3 hover:border-navy-300 transition-colors cursor-pointer">
                <span className="text-2xl">📝</span>
                <div>
                  <div className="font-semibold text-navy-900">مدیریت مقالات</div>
                  <div className="text-xs text-charcoal-400">ایجاد و ویرایش مقاله</div>
                </div>
              </Link>
              <Link to="/admin/settings" className="admin-card flex items-center gap-3 hover:border-navy-300 transition-colors cursor-pointer">
                <span className="text-2xl">⚙️</span>
                <div>
                  <div className="font-semibold text-navy-900">تنظیمات سایت</div>
                  <div className="text-xs text-charcoal-400">شماره تماس، آدرس، لینک‌ها</div>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: 'blue' | 'green' | 'red' | 'purple' }) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    red: 'bg-red-50 border-red-200 text-red-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
  };
  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-70">{label}</div>
    </div>
  );
}
