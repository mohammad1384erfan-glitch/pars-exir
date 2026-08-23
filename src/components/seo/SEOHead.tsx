import { HelmetProvider, Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  structuredData?: object | object[];
  publishedTime?: string;
  modifiedTime?: string;
}

export const SITE_NAME = 'پارس اکسیر';
export const BASE_URL = 'https://pars-exir.ir';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.svg`;

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  type = 'website',
  noIndex = false,
  structuredData,
  publishedTime,
  modifiedTime,
}: SEOHeadProps) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | فروش پارافین صنعتی در کاشان`;
  const metaDescription =
    description ??
    'پارس اکسیر تأمین‌کننده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان. برای خرید پارافین صنعتی با ما تماس بگیرید.';
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;
  const resolvedOgImageAlt = ogImageAlt ?? `${SITE_NAME} — پارافین صنعتی`;

  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:alt" content={resolvedOgImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fa_IR" />

      {/* Article-specific OG */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={resolvedOgImageAlt} />

      {/* Structured Data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

// Re-export HelmetProvider for use in main.tsx
export { HelmetProvider };

// ─── Organization / LocalBusiness schema ─────────────────────
// Only fields we can verify are included.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#organization`,
  name: 'پارس اکسیر',
  alternateName: 'PARS EXIR',
  description: 'تأمین‌کننده پارافین صنعتی فلش ۱۲۰ و فلش ۱۴۰ در کاشان',
  url: BASE_URL,
  telephone: '+989133628681',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ابتدای جاده قمصر',
    addressLocality: 'کاشان',
    addressRegion: 'اصفهان',
    addressCountry: 'IR',
  },
  hasMap: 'https://maps.app.goo.gl/s2t4socYNXrJbKwZA',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+989133628681',
    contactType: 'sales',
    availableLanguage: 'fa',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Iran',
  },
};

// ─── Website schema (NO SearchAction — route doesn't exist) ──
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: SITE_NAME,
  url: BASE_URL,
  inLanguage: 'fa',
  publisher: {
    '@id': `${BASE_URL}/#organization`,
  },
};

// ─── Product schema builder ───────────────────────────────────
export function buildProductSchema(product: {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock_quantity: number;
  flash_point: number;
  updated_at: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${BASE_URL}/products/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'پارس اکسیر',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'نقطه اشتعال',
        value: `${product.flash_point}°C`,
      },
    ],
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/products/${product.slug}`,
      price: product.price,
      priceCurrency: 'IRR',
      priceValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      availability:
        product.stock_quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'پارس اکسیر',
        url: BASE_URL,
      },
    },
  };
}

// ─── Breadcrumb schema builder ────────────────────────────────
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

// ─── Article schema builder ───────────────────────────────────
export function buildArticleSchema(article: {
  title: string;
  slug: string;
  excerpt: string;
  published_at: string | null;
  updated_at: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `${BASE_URL}/articles/${article.slug}`,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    inLanguage: 'fa',
    publisher: {
      '@type': 'Organization',
      name: 'پارس اکسیر',
      url: BASE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/articles/${article.slug}`,
    },
  };
}

// ─── FAQ schema builder ───────────────────────────────────────
export function buildFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

// Wrapper that includes HelmetProvider
export function SEOProvider({ children }: { children: ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
