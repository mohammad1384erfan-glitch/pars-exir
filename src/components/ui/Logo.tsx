interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({
  className = '',
  variant = 'full',
  theme = 'light',
  size = 'md',
}: LogoProps) {
  const isDark = theme === 'dark';

  const sizeDimensions = {
    sm: { mark: 32, text: 'text-sm', subText: 'text-[9px]' },
    md: { mark: 40, text: 'text-base', subText: 'text-[10px]' },
    lg: { mark: 48, text: 'text-lg', subText: 'text-xs' },
    xl: { mark: 64, text: 'text-2xl', subText: 'text-sm' },
  }[size];

  // Professional Industrial Paraffin & Petrochemical Emblem
  const LogoMark = (
    <svg
      width={sizeDimensions.mark}
      height={sizeDimensions.mark}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        {/* Navy Petroleum Gradient */}
        <linearGradient id="petroNavy" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3E62" />
          <stop offset="50%" stopColor="#0B192C" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>

        {/* Pure Golden Amber Refinery Flame Gradient */}
        <linearGradient id="amberGold" x1="30" y1="15" x2="70" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Industrial Crystal Sheen */}
        <linearGradient id="crystalSheen" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Hexagonal Petroleum / Molecular Base Shield */}
      <polygon
        points="50,5 88,27 88,73 50,95 12,73 12,27"
        fill="url(#petroNavy)"
        stroke={isDark ? '#F59E0B' : '#1E3E62'}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Modern Faceted Crystal Structure Lines */}
      <polygon
        points="50,14 80,31 80,69 50,86 20,69 20,31"
        fill="none"
        stroke="url(#crystalSheen)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.6"
      />

      {/* Central Refined Paraffin Droplet & Golden Flame Symbol */}
      <path
        d="M50 18 C50 18 68 44 68 58 C68 68 59.9 76 50 76 C40.1 76 32 68 32 58 C32 44 50 18 50 18 Z"
        fill="url(#amberGold)"
      />

      {/* Inner Pure Wax / Core Light Ray */}
      <path
        d="M50 32 C50 32 60 48 60 58 C60 63.5 55.5 68 50 68 C44.5 68 40 63.5 40 58 C40 48 50 32 50 32 Z"
        fill="#FFFFFF"
        opacity="0.9"
      />

      {/* Core Dynamic Flame Spark */}
      <circle cx="50" cy="56" r="4.5" fill="#F59E0B" />
    </svg>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {LogoMark}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {LogoMark}
      <div className="flex flex-col justify-center leading-none select-none">
        <span
          className={`font-black tracking-tight ${sizeDimensions.text} ${
            isDark ? 'text-white' : 'text-navy-950'
          }`}
        >
          پارس اکسیر
        </span>
        <span
          className={`font-mono font-semibold tracking-wider ${sizeDimensions.subText} mt-1 ${
            isDark ? 'text-amber-400' : 'text-amber-600'
          }`}
        >
          PARS EXIR
        </span>
      </div>
    </div>
  );
}
