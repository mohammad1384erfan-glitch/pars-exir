-- ============================================================
-- PARS EXIR — Seed Data
-- Migration: 002_seed_data.sql
-- Safe to run multiple times (uses ON CONFLICT DO NOTHING)
-- ============================================================

-- ─── Initial Products ─────────────────────────────────────────

insert into public.products (
  id,
  name,
  slug,
  description,
  flash_point,
  price,
  stock_quantity,
  applications,
  active
) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'پارافین صنعتی فلش ۱۲۰',
  'paraffin-flash-120',
  'پارافین صنعتی با نقطه اشتعال ۱۲۰ درجه سانتیگراد، مناسب برای صنایع شمع‌سازی، بسته‌بندی، و چسب. دارای خلوص بالا و پایداری مناسب در دمای محیط.',
  120,
  1050000,
  100,
  ARRAY[
    'شمع‌سازی صنعتی و تزئینی',
    'بسته‌بندی مواد غذایی',
    'صنایع چسب',
    'تولید پولیش و واکس',
    'پوشش‌دهی سطوح'
  ],
  true
),
(
  'b2c3d4e5-f6a7-8901-bcde-fa2345678901',
  'پارافین صنعتی فلش ۱۴۰',
  'paraffin-flash-140',
  'پارافین صنعتی با نقطه اشتعال ۱۴۰ درجه سانتیگراد، مناسب برای صنایع لاستیک، پوشش‌های صنعتی سنگین، و فرآیندهای دمابالا. پایداری حرارتی بالاتر نسبت به فلش ۱۲۰.',
  140,
  1150000,
  80,
  ARRAY[
    'صنایع لاستیک و تایر',
    'پوشش‌های صنعتی سنگین',
    'عایق‌کاری الکتریکی',
    'فرآیندهای شیمیایی دمابالا',
    'صنایع نفت و گاز'
  ],
  true
)
on conflict (slug) do nothing;

-- ─── Initial Site Settings ───────────────────────────────────

insert into public.site_settings (
  id,
  business_name,
  phone,
  whatsapp_url,
  telegram_username,
  telegram_url,
  address,
  maps_url,
  description
) values (
  'c3d4e5f6-a7b8-9012-cdef-ab3456789012',
  'پارس اکسیر',
  '09133628681',
  'https://wa.me/qr/GKZXQWX4YUTMM1',
  'Erfan_panbekar',
  'https://t.me/Erfan_panbekar',
  'کاشان - ابتدای جاده قمصر',
  'https://maps.app.goo.gl/s2t4socYNXrJbKwZA',
  'پارس اکسیر، تأمین‌کننده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان. فروش مستقیم به صنایع با شرایط نقدی و مدت‌دار.'
)
on conflict (id) do nothing;
