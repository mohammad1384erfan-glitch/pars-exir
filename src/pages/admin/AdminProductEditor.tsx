import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, createProduct, updateProduct } from '@/lib/queries';
import type { Product } from '@/types';
import { LoadingSpinner } from '@/components/ui';

type FormData = {
  name: string;
  slug: string;
  description: string;
  flash_point: string;
  price: string;
  stock_quantity: string;
  image_url: string;
  applications: string;
  active: boolean;
};

const EMPTY_FORM: FormData = {
  name: '',
  slug: '',
  description: '',
  flash_point: '',
  price: '',
  stock_quantity: '',
  image_url: '',
  applications: '',
  active: true,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function AdminProductEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!isNew && id) {
      getProductById(id)
        .then(product => {
          if (product) {
            setForm({
              name: product.name,
              slug: product.slug,
              description: product.description ?? '',
              flash_point: String(product.flash_point),
              price: String(product.price),
              stock_quantity: String(product.stock_quantity),
              image_url: product.image_url ?? '',
              applications: (product.applications ?? []).join('\n'),
              active: product.active,
            });
          }
        })
        .catch(() => setNotification({ type: 'error', message: 'خطا در بارگذاری اطلاعات محصول' }))
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'نام محصول الزامی است.';
    if (!form.slug.trim()) newErrors.slug = 'اسلاگ الزامی است.';
    else if (!/^[a-z0-9-]+$/.test(form.slug)) newErrors.slug = 'اسلاگ فقط می‌تواند شامل حروف لاتین کوچک، اعداد و خط‌تیره باشد.';
    if (!form.flash_point || isNaN(Number(form.flash_point)) || Number(form.flash_point) <= 0) newErrors.flash_point = 'نقطه اشتعال معتبر نیست.';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0) newErrors.price = 'قیمت باید عدد غیرمنفی باشد.';
    if (!form.stock_quantity || isNaN(Number(form.stock_quantity)) || Number(form.stock_quantity) < 0) newErrors.stock_quantity = 'موجودی باید عدد غیرمنفی باشد.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setNotification(null);

    const payload: Omit<Product, 'id' | 'created_at' | 'updated_at'> = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      flash_point: Number(form.flash_point),
      price: Number(form.price),
      stock_quantity: Number(form.stock_quantity),
      image_url: form.image_url.trim() || null,
      applications: form.applications.trim() ? form.applications.split('\n').map(s => s.trim()).filter(Boolean) : null,
      specifications: null,
      active: form.active,
    };

    try {
      if (isNew) {
        await createProduct(payload);
        setNotification({ type: 'success', message: 'محصول با موفقیت ایجاد شد.' });
        setTimeout(() => navigate('/admin/products'), 1500);
      } else if (id) {
        await updateProduct(id, payload);
        setNotification({ type: 'success', message: 'محصول با موفقیت بروزرسانی شد.' });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'خطای ناشناخته';
      setNotification({ type: 'error', message: `خطا: ${message}` });
    } finally {
      setSubmitting(false);
    }
  };

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (loading) return <div className="flex items-center gap-3 text-charcoal-400 p-8"><LoadingSpinner size="sm" />در حال بارگذاری...</div>;

  return (
    <div className="max-w-2xl">
      {/* Notification */}
      {notification && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-semibold ${
          notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/products" className="text-charcoal-400 hover:text-charcoal-700 text-sm">
          ← بازگشت
        </Link>
        <h1 className="text-2xl font-bold text-navy-900">
          {isNew ? 'افزودن محصول جدید' : 'ویرایش محصول'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="admin-card space-y-5" noValidate>
        {/* Name */}
        <div>
          <label className="label" htmlFor="name">نام محصول <span className="text-red-500">*</span></label>
          <input
            id="name"
            type="text"
            className={`input-field ${errors.name ? 'border-red-400' : ''}`}
            value={form.name}
            onChange={e => {
              set('name', e.target.value);
              if (isNew) set('slug', slugify(e.target.value));
            }}
            placeholder="پارافین صنعتی فلش ۱۲۰"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Slug */}
        <div>
          <label className="label" htmlFor="slug">اسلاگ (URL) <span className="text-red-500">*</span></label>
          <input
            id="slug"
            type="text"
            className={`input-field ${errors.slug ? 'border-red-400' : ''}`}
            value={form.slug}
            onChange={e => set('slug', e.target.value)}
            placeholder="paraffin-flash-120"
            dir="ltr"
          />
          {errors.slug ? (
            <p className="text-red-500 text-xs mt-1">{errors.slug}</p>
          ) : (
            <p className="text-charcoal-400 text-xs mt-1">آدرس صفحه: /products/{form.slug || '...'}</p>
          )}
        </div>

        {/* Flash point + Price + Stock */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label" htmlFor="flash_point">نقطه اشتعال <span className="text-red-500">*</span></label>
            <input
              id="flash_point"
              type="number"
              className={`input-field ${errors.flash_point ? 'border-red-400' : ''}`}
              value={form.flash_point}
              onChange={e => set('flash_point', e.target.value)}
              placeholder="120"
              min="0"
              dir="ltr"
            />
            {errors.flash_point && <p className="text-red-500 text-xs mt-1">{errors.flash_point}</p>}
          </div>
          <div>
            <label className="label" htmlFor="price">قیمت (ریال) <span className="text-red-500">*</span></label>
            <input
              id="price"
              type="number"
              className={`input-field ${errors.price ? 'border-red-400' : ''}`}
              value={form.price}
              onChange={e => set('price', e.target.value)}
              placeholder="1050000"
              min="0"
              dir="ltr"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="label" htmlFor="stock_quantity">موجودی <span className="text-red-500">*</span></label>
            <input
              id="stock_quantity"
              type="number"
              className={`input-field ${errors.stock_quantity ? 'border-red-400' : ''}`}
              value={form.stock_quantity}
              onChange={e => set('stock_quantity', e.target.value)}
              placeholder="100"
              min="0"
              dir="ltr"
            />
            {errors.stock_quantity && <p className="text-red-500 text-xs mt-1">{errors.stock_quantity}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label" htmlFor="description">توضیحات</label>
          <textarea
            id="description"
            className="input-field resize-none h-28"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="توضیح کوتاه محصول..."
          />
        </div>

        {/* Applications */}
        <div>
          <label className="label" htmlFor="applications">کاربردها (هر کاربرد در یک خط)</label>
          <textarea
            id="applications"
            className="input-field resize-none h-24"
            value={form.applications}
            onChange={e => set('applications', e.target.value)}
            placeholder="شمع‌سازی&#10;صنایع لاستیک&#10;صنایع چسب"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="label" htmlFor="image_url">آدرس تصویر (URL)</label>
          <input
            id="image_url"
            type="url"
            className="input-field"
            value={form.image_url}
            onChange={e => set('image_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
            dir="ltr"
          />
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3">
          <input
            id="active"
            type="checkbox"
            className="w-4 h-4 accent-navy-700"
            checked={form.active}
            onChange={e => set('active', e.target.checked)}
          />
          <label htmlFor="active" className="text-sm font-medium text-charcoal-700 cursor-pointer">
            محصول فعال باشد (نمایش در سایت)
          </label>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting && <LoadingSpinner size="sm" />}
            {submitting ? 'در حال ذخیره...' : (isNew ? 'ایجاد محصول' : 'ذخیره تغییرات')}
          </button>
          <Link to="/admin/products" className="btn-secondary">انصراف</Link>
        </div>
      </form>
    </div>
  );
}
