import { Metadata } from 'next';
import { seoConfig } from '@/config/seo.config';

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Helper function to generate standardized metadata for any page.
 */
export function constructMetadata({
  title,
  description = seoConfig.description,
  image = seoConfig.ogImage,
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    title: {
      default: seoConfig.title,
      template: `%s | ${seoConfig.title}`,
    },
    description,
    keywords: seoConfig.keywords,
    authors: seoConfig.authors,
    creator: 'MalishaEdu',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: seoConfig.url,
      title: title ? `${title} | ${seoConfig.title}` : seoConfig.title,
      description,
      siteName: seoConfig.title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || seoConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${seoConfig.title}` : seoConfig.title,
      description,
      images: [image],
      creator: '@malishaedu',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    metadataBase: new URL(seoConfig.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
