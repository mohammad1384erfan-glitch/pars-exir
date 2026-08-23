import { useSettings } from '@/lib/settingsContext';
import { PhoneIcon, WhatsAppIcon, TelegramIcon } from '@/components/ui';

export function MobileContactBar() {
  const { settings } = useSettings();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-industrial-200 shadow-lg"
      role="complementary"
      aria-label="دسترسی سریع به تماس"
    >
      <div className="grid grid-cols-3 divide-x divide-x-reverse divide-industrial-200">
        <a
          href={`tel:${settings.phone}`}
          className="flex flex-col items-center gap-1 py-3 text-navy-800 hover:bg-navy-50 transition-colors active:bg-navy-100"
          aria-label="تماس تلفنی"
        >
          <PhoneIcon className="w-5 h-5" />
          <span className="text-xs font-semibold">تماس</span>
        </a>
        <a
          href={settings.whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-green-600 hover:bg-green-50 transition-colors active:bg-green-100"
          aria-label="واتساپ"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span className="text-xs font-semibold">واتساپ</span>
        </a>
        <a
          href={settings.telegram_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-sky-600 hover:bg-sky-50 transition-colors active:bg-sky-100"
          aria-label="تلگرام"
        >
          <TelegramIcon className="w-5 h-5" />
          <span className="text-xs font-semibold">تلگرام</span>
        </a>
      </div>
    </div>
  );
}
