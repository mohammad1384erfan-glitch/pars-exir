import type { InventoryStatus } from '@/types';

/**
 * Single source of truth for inventory/availability logic.
 * Use this function everywhere availability is displayed.
 */
export function getInventoryStatus(stockQuantity: number): InventoryStatus {
  if (stockQuantity > 0) {
    return {
      available: true,
      label: 'موجود در انبار',
      badgeClass: 'badge-available',
    };
  }
  return {
    available: false,
    label: 'تماس برای تأمین',
    badgeClass: 'badge-unavailable',
  };
}

/**
 * Format price in Persian style with Rial currency.
 * If price is 0 or negative, returns call for price message.
 */
export function formatPrice(price: number): string {
  if (!price || price <= 0) {
    return 'تماس برای استعلام قیمت';
  }
  return new Intl.NumberFormat('fa-IR').format(price) + ' ریال';
}

/**
 * Format price in Persian compact style (for cards).
 */
export function formatPriceCompact(price: number): string {
  return formatPrice(price);
}
