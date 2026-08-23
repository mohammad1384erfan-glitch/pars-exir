import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { SiteSettings } from '@/types';
import { getSiteSettings } from './queries';

// Default fallback settings (used only if DB is unavailable)
const DEFAULT_SETTINGS: SiteSettings = {
  id: '',
  business_name: 'پارس اکسیر',
  phone: '09133628681',
  whatsapp_url: 'https://wa.me/qr/GKZXQWX4YUTMM1',
  telegram_username: 'Erfan_panbekar',
  telegram_url: 'https://t.me/Erfan_panbekar',
  address: 'کاشان - ابتدای جاده قمصر',
  maps_url: 'https://maps.app.goo.gl/s2t4socYNXrJbKwZA',
  description: 'پارس اکسیر، تأمین‌کننده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان',
  logo_url: null,
  updated_at: '',
};

interface SettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  loading: true,
  error: null,
  refresh: async () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSiteSettings();
      if (data) setSettings(data);
    } catch {
      setError('خطا در بارگذاری تنظیمات سایت');
      // Keep default settings on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, error, refresh: load }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
