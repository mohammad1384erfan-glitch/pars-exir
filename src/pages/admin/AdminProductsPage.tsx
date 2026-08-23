import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct, updateProduct } from '@/lib/queries';
import { getInventoryStatus, formatPrice } from '@/lib/inventory';
import type { Product } from '@/types';
import { LoadingSpinner } from '@/components/ui';

export function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const load = () => {
    setLoading(true);
    getAllProducts()
      .then(setProducts)
      .catch(() => setError('خطا در بارگذاری محصولات'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const notify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleToggleActive = async (product: Product) => {
    setActionLoading(product.id);
    try {
      await updateProduct(product.id, { active: !product.active });
      load();
      notify('success', `محصول ${product.active ? 'غیرفعال' : 'فعال'} شد.`);
    } catch {
      notify('error', 'خطا در تغییر وضعیت محصول.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`آیا از حذف "${product.name}" اطمینان دارید؟ این عمل قابل بازگشت نیست.`)) return;
    setActionLoading(product.id);
    try {
      await deleteProduct(product.id);
      load();
      notify('success', 'محصول با موفقیت حذف شد.');
    } catch {
      notify('error', 'خطا در حذف محصول.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-xl text-white text-sm font-semibold ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">مدیریت محصولات</h1>
          <p className="text-charcoal-400 text-sm mt-1">ویرایش قیمت، موجودی، و اطلاعات محصولات</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary text-sm">
          + افزودن محصول جدید
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-charcoal-400">
          <LoadingSpinner size="sm" />
          در حال بارگذاری...
        </div>
      ) : error ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>
      ) : (
        <div className="admin-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-industrial-50 border-b border-industrial-200">
                <tr>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">نام محصول</th>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">فلش</th>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">قیمت</th>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">موجودی</th>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">وضعیت</th>
                  <th className="px-6 py-4 text-right font-semibold text-charcoal-600">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-100">
                {products.map(product => {
                  const status = getInventoryStatus(product.stock_quantity);
                  const isLoading = actionLoading === product.id;
                  return (
                    <tr key={product.id} className="hover:bg-industrial-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-navy-900">{product.name}</div>
                        <div className="text-xs text-charcoal-400 mt-0.5">{product.slug}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-navy-100 text-navy-800 rounded font-bold text-xs">
                          فلش {product.flash_point}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-navy-900">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={status.available ? 'text-green-700 font-semibold' : 'text-red-600 font-semibold'}>
                          {product.stock_quantity}
                        </span>
                        <span className="text-charcoal-400 text-xs mr-1">واحد</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.active ? 'bg-green-100 text-green-700' : 'bg-charcoal-100 text-charcoal-500'
                        }`}>
                          {product.active ? 'فعال' : 'غیرفعال'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/products/${product.id}`}
                            className="text-xs px-3 py-1.5 bg-navy-50 text-navy-700 rounded-lg hover:bg-navy-100 transition-colors font-medium"
                          >
                            ویرایش
                          </Link>
                          <button
                            onClick={() => handleToggleActive(product)}
                            disabled={isLoading}
                            className="text-xs px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium disabled:opacity-50"
                          >
                            {product.active ? 'غیرفعال کردن' : 'فعال کردن'}
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            disabled={isLoading}
                            className="text-xs px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {products.length === 0 && (
              <div className="text-center py-12 text-charcoal-400">محصولی یافت نشد.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
