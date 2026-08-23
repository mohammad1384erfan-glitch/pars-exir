import type { InventoryStatus } from '@/types';

/**
 * Single source of truth for inventory/availability logic.
 * Use this function everywhere availability is displayed.
 */
export function getInventoryStatus(stockQuantity: number): InventoryStatus {
  if (stockQuantity > 0) {
    return {
      available: true,
      label: 'موجود',
      badgeClass: 'badge-available',
    };
  }
  return {
    available: false,
    label: 'فعلاً ناموجود',
    badgeClass: 'badge-unavailable',
  };
}

/**
 * Format price in Persian style with Rial currency.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price) + ' ریال';
}

/**
 * Format price in Persian compact style (for cards).
 */
export function formatPriceCompact(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price) + ' ریال';
}
