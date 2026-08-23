// ============================================================
// Shared TypeScript types for PARS EXIR
// ============================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  flash_point: number;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  specifications: Record<string, string> | null;
  applications: string[] | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category: string | null;
  tags: string[] | null;
  seo_title: string | null;
  meta_description: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  business_name: string;
  phone: string;
  whatsapp_url: string;
  telegram_username: string;
  telegram_url: string;
  address: string;
  maps_url: string;
  description: string;
  logo_url: string | null;
  updated_at: string;
}

export interface AdminProfile {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export interface InventoryStatus {
  available: boolean;
  label: string;
  badgeClass: string;
}
