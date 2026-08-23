import { useEffect, useState } from 'react';
import { getSiteSettings, updateSiteSettings } from '@/lib/queries';
import { useSettings } from '@/lib/settingsContext';
import type { SiteSettings } from '@/types';
import { LoadingSpinner } from '@/components/ui';

type FormData = Omit<SiteSettings, 'id' | 'updated_at'>;

export function AdminSettingsPage() {
  const { refresh: refreshSettings } = useSettings();
  const [settingsId, setSettingsId] = useState<string>('');
  const [form, setForm] = useState<FormData>({
    business_name: '',
    phone: '',
    whatsapp_url: '',
    telegram_username: '',
    telegram_url: '',
    address: '',
    maps_url: '',
    description: '',
    logo_url: null,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    getSiteSettings()
      .then(settings => {
        if (settings) {
          setSettingsId(settings.id);
          setForm({
            business_name: settings.business_name,
            phone: settings.phone,
            whatsapp_url: settings.whatsapp_url,
            telegram_username: settings.telegram_username,
            telegram_url: settings.telegram_url,
            address: settings.address,
            maps_url: settings.maps_url,
            description: settings.description,
            logo_url: settings.logo_url,
          });
        }
      })
      .catch(() => setNotification({ type: 'error', message: 'خطا در بارگذاری تنظیمات' }))
      .finally(() => setLoading(false));
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.business_name.trim()) newErrors.business_name = 'نام کسب‌وکار الزامی است.';
    if (!form.phone.trim()) newErrors.phone = 'شماره تماس الزامی است.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setNotification(null);

    try {
      await updateSiteSettings(settingsId, form);
      await refreshSettings();
      setNotification({ type: 'success', message: 'تنظیمات با موفقیت ذخیره شد. سایت به‌روز شد.' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'خطای ناشناخته';
      setNotification({ type: 'error', message: `خطا: ${message}` });
    } finally {
      setSubmitting(false);
    }
  };

  const set = (field: keyof FormData, value: string | null) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (loading) return <div className="flex items-center gap-3 text-charcoal-400 p-8"><LoadingSpinner size="sm" />در حال بارگذاری...</div>;

  return (
    <div className="max-w-2xl">
      {notification && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-semibold ${
          notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">تنظیمات سایت</h1>
        <p className="text-charcoal-400 text-sm mt-1">
          تغییر این اطلاعات بلافاصله در تمام بخش‌های سایت (هدر، فوتر، صفحه تماس) اعمال می‌شود.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Business info */}
        <div className="admin-card space-y-5">
          <h2 className="font-bold text-navy-900">اطلاعات کسب‌وکار</h2>

          <div>
            <label className="label" htmlFor="business_name">نام کسب‌وکار <span className="text-red-500">*</span></label>
            <input
              id="business_name"
              type="text"
              className={`input-field ${errors.business_name ? 'border-red-400' : ''}`}
              value={form.business_name}
              onChange={e => set('business_name', e.target.value)}
              placeholder="پارس اکسیر"
            />
            {errors.business_name && <p className="text-red-500 text-xs mt-1">{errors.business_name}</p>}
          </div>

          <div>
            <label className="label" htmlFor="description">توضیحات کسب‌وکار</label>
            <textarea
              id="description"
              className="input-field resize-none h-20"
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="توضیح کوتاه درباره کسب‌وکار..."
            />
          </div>

          <div>
            <label className="label" htmlFor="logo_url">آدرس لوگو (URL)</label>
            <input
              id="logo_url"
              type="url"
              className="input-field"
              value={form.logo_url ?? ''}
              onChange={e => set('logo_url', e.target.value || null)}
              dir="ltr"
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="admin-card space-y-5">
          <h2 className="font-bold text-navy-900">اطلاعات تماس</h2>

          <div>
            <label className="label" htmlFor="phone">شماره تماس <span className="text-red-500">*</span></label>
            <input
              id="phone"
              type="tel"
              className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              dir="ltr"
              placeholder="09133628681"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="label" htmlFor="whatsapp_url">لینک واتساپ</label>
            <input
              id="whatsapp_url"
              type="url"
              className="input-field"
              value={form.whatsapp_url}
              onChange={e => set('whatsapp_url', e.target.value)}
              dir="ltr"
              placeholder="https://wa.me/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="telegram_username">نام کاربری تلگرام</label>
              <input
                id="telegram_username"
                type="text"
                className="input-field"
                value={form.telegram_username}
                onChange={e => set('telegram_username', e.target.value)}
                dir="ltr"
                placeholder="Erfan_panbekar"
              />
            </div>
            <div>
              <label className="label" htmlFor="telegram_url">لینک تلگرام</label>
              <input
                id="telegram_url"
                type="url"
                className="input-field"
                value={form.telegram_url}
                onChange={e => set('telegram_url', e.target.value)}
                dir="ltr"
                placeholder="https://t.me/..."
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="address">آدرس</label>
            <input
              id="address"
              type="text"
              className="input-field"
              value={form.address}
              onChange={e => set('address', e.target.value)}
              placeholder="کاشان - ابتدای جاده قمصر"
            />
          </div>

          <div>
            <label className="label" htmlFor="maps_url">لینک Google Maps</label>
            <input
              id="maps_url"
              type="url"
              className="input-field"
              value={form.maps_url}
              onChange={e => set('maps_url', e.target.value)}
              dir="ltr"
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting && <LoadingSpinner size="sm" />}
            {submitting ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
          </button>
        </div>
      </form>
    </div>
  );
}
