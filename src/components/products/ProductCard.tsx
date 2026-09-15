import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { getInventoryStatus, formatPrice } from '@/lib/inventory';
import { AvailabilityBadge, PhoneIcon, WhatsAppIcon } from '@/components/ui';
import { useSettings } from '@/lib/settingsContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const status = getInventoryStatus(product.stock_quantity);
  const { settings } = useSettings();

  return (
    <article className="card flex flex-col overflow-hidden">
      {/* Product image */}
      <div className="aspect-video bg-industrial-50 flex items-center justify-center border-b border-industrial-100 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 p-6">
            <svg className="w-16 h-16 text-industrial-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="text-industrial-400 text-sm">پارافین صنعتی فلش {product.flash_point}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-navy-900 leading-tight">{product.name}</h3>
          <span className="flex-shrink-0 px-2.5 py-1 bg-navy-50 text-navy-700 text-sm font-bold rounded-lg border border-navy-100">
            فلش {product.flash_point}
          </span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-charcoal-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {product.description}
          </p>
        )}

        {/* Price and availability */}
        <div className="flex items-center justify-between mb-4 pt-3 border-t border-industrial-100">
          <div>
            {status.available && product.price > 0 ? (
              <>
                <p className="text-xs text-charcoal-400 mb-0.5">قیمت نقدی (هر کیلوگرم)</p>
                <p className="text-xl font-bold text-navy-900">{formatPrice(product.price)}</p>
              </>
            ) : status.available ? (
              <>
                <p className="text-xs text-charcoal-400 mb-0.5">نرخ روز بازار</p>
                <p className="text-base font-bold text-accent-700">تماس برای استعلام قیمت</p>
              </>
            ) : (
              <p className="text-sm text-charcoal-500">جهت اطلاع از زمان تأمین تماس بگیرید</p>
            )}
          </div>
          <AvailabilityBadge available={status.available} label={status.label} />
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2">
          <Link
            to={`/products/${product.slug}`}
            className="btn-secondary text-sm py-2.5 w-full text-center"
            aria-label={`مشاهده جزئیات ${product.name}`}
          >
            مشاهده جزئیات
          </Link>
          <a
            href={`tel:${settings.phone}`}
            className="btn-primary text-sm py-2.5 w-full text-center flex items-center justify-center gap-2"
            aria-label={`تماس برای ${product.name}`}
          >
            <PhoneIcon className="w-4 h-4" />
            تماس برای سفارش
          </a>
          <a
            href={settings.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm py-2.5 w-full text-center flex items-center justify-center gap-2"
            aria-label="سفارش از طریق واتساپ"
          >
            <WhatsAppIcon className="w-4 h-4" />
            سفارش در واتساپ
          </a>
        </div>
      </div>
    </article>
  );
}
