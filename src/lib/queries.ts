import { supabase } from './supabase';
import type { Product, Article, SiteSettings } from '@/types';

// ─── Products ───────────────────────────────────────────────

export async function getActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('flash_point', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
}

// Admin: get all products regardless of active status
export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('flash_point', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ─── Articles ────────────────────────────────────────────────

export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, excerpt, featured_image, category, tags, published_at, created_at, updated_at, published, seo_title, meta_description, content')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getArticleByIdAdmin(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function createArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateArticle(id: string, updates: Partial<Omit<Article, 'id' | 'created_at'>>): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// ─── Site Settings ───────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function updateSiteSettings(id: string, updates: Partial<Omit<SiteSettings, 'id'>>): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
