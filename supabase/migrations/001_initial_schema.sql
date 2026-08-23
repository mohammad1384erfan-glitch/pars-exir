-- ============================================================
-- PARS EXIR — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── Products ────────────────────────────────────────────────

create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  slug            text not null unique,
  description     text not null default '',
  flash_point     integer not null,
  price           numeric(15, 0) not null check (price >= 0),
  stock_quantity  integer not null default 0 check (stock_quantity >= 0),
  image_url       text,
  specifications  jsonb,
  applications    text[],
  active          boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_active_idx on public.products (active);
create index if not exists products_flash_point_idx on public.products (flash_point);

-- ─── Articles ────────────────────────────────────────────────

create table if not exists public.articles (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  excerpt          text not null default '',
  content          text not null default '',
  featured_image   text,
  category         text,
  tags             text[],
  seo_title        text,
  meta_description text,
  published        boolean not null default false,
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists articles_slug_idx on public.articles (slug);
create index if not exists articles_published_idx on public.articles (published);
create index if not exists articles_published_at_idx on public.articles (published_at desc);

-- ─── Site Settings ───────────────────────────────────────────

create table if not exists public.site_settings (
  id                 uuid primary key default gen_random_uuid(),
  business_name      text not null default 'پارس اکسیر',
  phone              text not null default '09133628681',
  whatsapp_url       text not null default 'https://wa.me/qr/GKZXQWX4YUTMM1',
  telegram_username  text not null default 'Erfan_panbekar',
  telegram_url       text not null default 'https://t.me/Erfan_panbekar',
  address            text not null default 'کاشان - ابتدای جاده قمصر',
  maps_url           text not null default 'https://maps.app.goo.gl/s2t4socYNXrJbKwZA',
  description        text not null default 'پارس اکسیر، تأمین‌کننده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان',
  logo_url           text,
  updated_at         timestamptz not null default now()
);

-- ─── Admin Profiles ──────────────────────────────────────────

create table if not exists public.admin_profiles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade unique,
  role       text not null default 'admin',
  created_at timestamptz not null default now()
);

create index if not exists admin_profiles_user_id_idx on public.admin_profiles (user_id);

-- ─── Row Level Security ──────────────────────────────────────

alter table public.products enable row level security;
alter table public.articles enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_profiles enable row level security;

-- Helper function: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
  );
$$;

-- ─── Products RLS Policies ───────────────────────────────────

-- Public: read active products only
create policy "public_read_active_products"
  on public.products for select
  using (active = true);

-- Admin: full access
create policy "admin_all_products"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- ─── Articles RLS Policies ───────────────────────────────────

-- Public: read published articles only
create policy "public_read_published_articles"
  on public.articles for select
  using (published = true);

-- Admin: full access
create policy "admin_all_articles"
  on public.articles for all
  using (public.is_admin())
  with check (public.is_admin());

-- ─── Site Settings RLS Policies ──────────────────────────────

-- Public: read settings (everyone)
create policy "public_read_settings"
  on public.site_settings for select
  using (true);

-- Admin: update settings
create policy "admin_update_settings"
  on public.site_settings for update
  using (public.is_admin())
  with check (public.is_admin());

-- ─── Admin Profiles RLS Policies ─────────────────────────────

-- Admin can read own profile
create policy "admin_read_own_profile"
  on public.admin_profiles for select
  using (user_id = auth.uid());

-- Only admins can create/manage admin profiles
create policy "admin_manage_profiles"
  on public.admin_profiles for all
  using (public.is_admin())
  with check (public.is_admin());
