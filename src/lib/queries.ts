import { supabase } from './supabase';
import type { Product, Article, SiteSettings } from '@/types';
import { DEFAULT_PRODUCTS, DEFAULT_ARTICLES, DEFAULT_SITE_SETTINGS } from './seedData';

const CUSTOM_PRODUCTS_KEY = 'pars_exir_custom_products';
const CUSTOM_SETTINGS_KEY = 'pars_exir_custom_settings';

// Helper to get local override products
function getLocalCustomProducts(): Product[] | null {
  try {
    const data = localStorage.getItem(CUSTOM_PRODUCTS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    //
  }
  return null;
}

// Helper to save local override products
function saveLocalCustomProduct(product: Product) {
  try {
    const list = getLocalCustomProducts() ?? [...DEFAULT_PRODUCTS];
    const index = list.findIndex(p => p.id === product.id || p.slug === product.slug);
    if (index >= 0) {
      list[index] = product;
    } else {
      list.push(product);
    }
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(list));
  } catch {
    //
  }
}

// ─── Products ───────────────────────────────────────────────

export async function getActiveProducts(): Promise<Product[]> {
  // 1. Try Supabase
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('flash_point', { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Fallback
  }

  // 2. Check local custom overrides (saved by admin)
  const localList = getLocalCustomProducts();
  if (localList) {
    return localList.filter(p => p.active);
  }

  // 3. Fallback to default verified products
  return DEFAULT_PRODUCTS.filter(p => p.active);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (!error && data) {
      return data;
    }
  } catch {
    // Fallback
  }

  const localList = getLocalCustomProducts();
  if (localList) {
    const found = localList.find(p => p.slug === slug && p.active);
    if (found) return found;
  }

  return DEFAULT_PRODUCTS.find(p => p.slug === slug && p.active) ?? null;
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('flash_point', { ascending: true });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Fallback
  }

  const localList = getLocalCustomProducts();
  if (localList) {
    return localList;
  }

  return DEFAULT_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      return data;
    }
  } catch {
    // Fallback
  }

  const localList = getLocalCustomProducts();
  if (localList) {
    const found = localList.find(p => p.id === id);
    if (found) return found;
  }

  return DEFAULT_PRODUCTS.find(p => p.id === id) ?? null;
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const newProduct: Product = {
    ...product,
    id: 'prod-' + Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (!error && data) {
      saveLocalCustomProduct(data);
      return data;
    }
  } catch {
    // Supabase offline, use local storage
  }

  saveLocalCustomProduct(newProduct);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product> {
  const existing = await getProductById(id) ?? DEFAULT_PRODUCTS.find(p => p.id === id) ?? DEFAULT_PRODUCTS[0];
  const updatedProduct: Product = {
    ...existing,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      saveLocalCustomProduct(data);
      return data;
    }
  } catch {
    // Supabase offline, update in local storage
  }

  saveLocalCustomProduct(updatedProduct);
  return updatedProduct;
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await supabase.from('products').delete().eq('id', id);
  } catch {
    //
  }

  try {
    const list = (getLocalCustomProducts() ?? [...DEFAULT_PRODUCTS]).filter(p => p.id !== id);
    localStorage.setItem(CUSTOM_PRODUCTS_KEY, JSON.stringify(list));
  } catch {
    //
  }
}

// ─── Articles ────────────────────────────────────────────────

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug, excerpt, featured_image, category, tags, published_at, created_at, updated_at, published, seo_title, meta_description, content')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Fallback
  }
  return DEFAULT_ARTICLES.filter(a => a.published);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!error && data) {
      return data;
    }
  } catch {
    // Fallback
  }
  return DEFAULT_ARTICLES.find(a => a.slug === slug && a.published) ?? null;
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch {
    // Fallback
  }
  return DEFAULT_ARTICLES;
}

export async function getArticleByIdAdmin(id: string): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      return data;
    }
  } catch {
    // Fallback
  }
  return DEFAULT_ARTICLES.find(a => a.id === id) ?? null;
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
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single();

    if (!error && data) {
      return data;
    }
  } catch {
    // Fallback
  }

  try {
    const local = localStorage.getItem(CUSTOM_SETTINGS_KEY);
    if (local) {
      return JSON.parse(local);
    }
  } catch {
    //
  }

  return DEFAULT_SITE_SETTINGS;
}

export async function updateSiteSettings(id: string, updates: Partial<Omit<SiteSettings, 'id'>>): Promise<SiteSettings> {
  const existing = await getSiteSettings() ?? DEFAULT_SITE_SETTINGS;
  const updated: SiteSettings = {
    ...existing,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      try {
        localStorage.setItem(CUSTOM_SETTINGS_KEY, JSON.stringify(data));
      } catch {
        //
      }
      return data;
    }
  } catch {
    //
  }

  try {
    localStorage.setItem(CUSTOM_SETTINGS_KEY, JSON.stringify(updated));
  } catch {
    //
  }

  return updated;
}
