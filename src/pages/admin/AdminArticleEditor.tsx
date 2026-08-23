import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getArticleByIdAdmin, createArticle, updateArticle } from '@/lib/queries';
import type { Article } from '@/types';
import { LoadingSpinner } from '@/components/ui';

type FormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string;
  seo_title: string;
  meta_description: string;
  published: boolean;
};

const EMPTY_FORM: FormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featured_image: '',
  category: '',
  tags: '',
  seo_title: '',
  meta_description: '',
  published: false,
};

function slugify(text: string): string {
  const latinMap: Record<string, string> = {
    'پ': 'p', 'ا': 'a', 'ر': 'r', 'ف': 'f', 'ی': 'y', 'ن': 'n', 'ص': 's',
    'ع': 'a', 'ت': 't', 'ی‌': 'i', 'ه': 'h', 'و': 'v', 'ک': 'k', 'ش': 'sh',
    'م': 'm', 'ل': 'l', 'ب': 'b', 'ج': 'j', 'د': 'd', 'ز': 'z', 'خ': 'kh',
    'ق': 'gh', 'ط': 't', 'ض': 'z', 'ث': 's', 'ح': 'h', 'چ': 'ch', 'گ': 'g',
  };
  const converted = text.split('').map(c => latinMap[c] ?? c).join('');
  return converted
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .slice(0, 80);
}

export function AdminArticleEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(!isNew);
  const [submitting, setSubmitting] = useState(false);
  const [saveAsDraft, setSaveAsDraft] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!isNew && id) {
      getArticleByIdAdmin(id)
        .then(article => {
          if (article) {
            setForm({
              title: article.title,
              slug: article.slug,
              excerpt: article.excerpt ?? '',
              content: article.content,
              featured_image: article.featured_image ?? '',
              category: article.category ?? '',
              tags: (article.tags ?? []).join(', '),
              seo_title: article.seo_title ?? '',
              meta_description: article.meta_description ?? '',
              published: article.published,
            });
          }
        })
        .catch(() => setNotification({ type: 'error', message: 'خطا در بارگذاری مقاله' }))
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.title.trim()) newErrors.title = 'عنوان الزامی است.';
    if (!form.slug.trim()) newErrors.slug = 'اسلاگ الزامی است.';
    else if (!/^[a-z0-9-]+$/.test(form.slug)) newErrors.slug = 'اسلاگ فقط می‌تواند شامل حروف لاتین کوچک، اعداد و خط‌تیره باشد.';
    if (!form.content.trim()) newErrors.content = 'محتوا الزامی است.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setNotification(null);

    const payload: Omit<Article, 'id' | 'created_at' | 'updated_at'> = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      featured_image: form.featured_image.trim() || null,
      category: form.category.trim() || null,
      tags: form.tags.trim() ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : null,
      seo_title: form.seo_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      published: publish,
      published_at: publish ? (isNew ? new Date().toISOString() : undefined as unknown as string) : null,
    };

    try {
      if (isNew) {
        await createArticle(payload);
        setNotification({ type: 'success', message: publish ? 'مقاله منتشر شد.' : 'پیش‌نویس ذخیره شد.' });
        setTimeout(() => navigate('/admin/articles'), 1500);
      } else if (id) {
        await updateArticle(id, payload);
        setNotification({ type: 'success', message: 'مقاله بروزرسانی شد.' });
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
    <div className="max-w-3xl">
      {notification && (
        <div className={`mb-6 p-4 rounded-xl text-sm font-semibold ${
          notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/articles" className="text-charcoal-400 hover:text-charcoal-700 text-sm">← بازگشت</Link>
        <h1 className="text-2xl font-bold text-navy-900">
          {isNew ? 'مقاله جدید' : 'ویرایش مقاله'}
        </h1>
        {!isNew && (
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
            form.published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {form.published ? 'منتشر شده' : 'پیش‌نویس'}
          </span>
        )}
      </div>

      <form noValidate className="space-y-5">
        {/* Title */}
        <div className="admin-card">
          <label className="label" htmlFor="title">عنوان مقاله <span className="text-red-500">*</span></label>
          <input
            id="title"
            type="text"
            className={`input-field ${errors.title ? 'border-red-400' : ''}`}
            value={form.title}
            onChange={e => {
              set('title', e.target.value);
              if (isNew) set('slug', slugify(e.target.value));
            }}
            placeholder="عنوان مقاله را وارد کنید"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}

          <div className="mt-4">
            <label className="label" htmlFor="slug">اسلاگ (URL) <span className="text-red-500">*</span></label>
            <input
              id="slug"
              type="text"
              className={`input-field ${errors.slug ? 'border-red-400' : ''}`}
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              dir="ltr"
              placeholder="article-slug"
            />
            {errors.slug ? (
              <p className="text-red-500 text-xs mt-1">{errors.slug}</p>
            ) : (
              <p className="text-charcoal-400 text-xs mt-1">آدرس: /articles/{form.slug || '...'}</p>
            )}
          </div>
        </div>

        {/* Excerpt */}
        <div className="admin-card">
          <label className="label" htmlFor="excerpt">خلاصه مقاله</label>
          <textarea
            id="excerpt"
            className="input-field resize-none h-20"
            value={form.excerpt}
            onChange={e => set('excerpt', e.target.value)}
            placeholder="خلاصه‌ای از مقاله برای نمایش در لیست..."
          />
        </div>

        {/* Content */}
        <div className="admin-card">
          <label className="label" htmlFor="content">
            محتوا <span className="text-red-500">*</span>
            <span className="text-charcoal-400 text-xs font-normal mr-2">(Markdown پشتیبانی می‌شود)</span>
          </label>
          <textarea
            id="content"
            className={`input-field resize-y h-64 font-mono text-sm ${errors.content ? 'border-red-400' : ''}`}
            value={form.content}
            onChange={e => set('content', e.target.value)}
            placeholder="## عنوان&#10;&#10;محتوای مقاله..."
          />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
        </div>

        {/* Meta */}
        <div className="admin-card">
          <h2 className="font-bold text-navy-900 mb-4">تصویر و دسته‌بندی</h2>
          <div className="space-y-4">
            <div>
              <label className="label" htmlFor="featured_image">تصویر شاخص (URL)</label>
              <input id="featured_image" type="url" className="input-field" value={form.featured_image} onChange={e => set('featured_image', e.target.value)} dir="ltr" placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="category">دسته‌بندی</label>
                <input id="category" type="text" className="input-field" value={form.category} onChange={e => set('category', e.target.value)} placeholder="پارافین صنعتی" />
              </div>
              <div>
                <label className="label" htmlFor="tags">تگ‌ها (با کاما جدا کنید)</label>
                <input id="tags" type="text" className="input-field" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="پارافین, فلش ۱۲۰, کاشان" />
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="admin-card">
          <h2 className="font-bold text-navy-900 mb-4">تنظیمات SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="label" htmlFor="seo_title">عنوان SEO</label>
              <input id="seo_title" type="text" className="input-field" value={form.seo_title} onChange={e => set('seo_title', e.target.value)} placeholder="عنوان برای موتورهای جستجو" />
              <p className="text-xs text-charcoal-400 mt-1">{form.seo_title.length}/60 کاراکتر</p>
            </div>
            <div>
              <label className="label" htmlFor="meta_description">توضیح متا</label>
              <textarea id="meta_description" className="input-field resize-none h-20" value={form.meta_description} onChange={e => set('meta_description', e.target.value)} placeholder="توضیح کوتاه برای موتورهای جستجو..." />
              <p className="text-xs text-charcoal-400 mt-1">{form.meta_description.length}/160 کاراکتر</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            type="button"
            onClick={e => handleSubmit(e, true)}
            disabled={submitting}
            className="btn-primary"
          >
            {submitting && !saveAsDraft && <LoadingSpinner size="sm" />}
            {form.published ? 'ذخیره تغییرات' : 'انتشار'}
          </button>
          <button
            type="button"
            onClick={e => { setSaveAsDraft(true); handleSubmit(e, false); }}
            disabled={submitting}
            className="btn-secondary"
          >
            {submitting && saveAsDraft && <LoadingSpinner size="sm" />}
            ذخیره پیش‌نویس
          </button>
          <Link to="/admin/articles" className="btn-secondary">انصراف</Link>
        </div>
      </form>
    </div>
  );
}
