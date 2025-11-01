import { Metadata } from 'next';
import { personalInfo } from '@/lib/data/personal';

// Base URL for the application
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourportfolio.com';

// Default SEO configuration
export const DEFAULT_SEO = {
  title: `${personalInfo.name} - Full Stack Developer`,
  description: personalInfo.description,
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Web Development',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript Developer',
    'Node.js Developer',
    'UI/UX Developer',
    personalInfo.name,
    personalInfo.location
  ],
  author: personalInfo.name,
  creator: personalInfo.name,
  publisher: personalInfo.name,
  robots: 'index, follow',
  language: 'en',
  type: 'website',
  image: `${BASE_URL}/images/og-image.jpg`,
  favicon: '/favicon.ico'
};

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags = [],
  noIndex = false
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noIndex?: boolean;
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${personalInfo.name}` : DEFAULT_SEO.title;
  const metaDescription = description || DEFAULT_SEO.description;
  const metaKeywords = [...DEFAULT_SEO.keywords, ...keywords];
  const metaImage = image || DEFAULT_SEO.image;
  const metaUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords.join(', '),
    authors: [{ name: authors?.[0] || DEFAULT_SEO.author }],
    creator: DEFAULT_SEO.creator,
    publisher: DEFAULT_SEO.publisher,
    robots: noIndex ? 'noindex, nofollow' : DEFAULT_SEO.robots,
    
    // Open Graph
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: `${personalInfo.name} - Portfolio`,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        }
      ],
      locale: 'en_US',
      type: type,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: authors || [personalInfo.name],
        section,
        tags
      })
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@yourtwitterhandle', // Replace with actual Twitter handle
      site: '@yourtwitterhandle'
    },
    
    // Additional meta tags
    other: {
      'theme-color': '#3B82F6',
      'color-scheme': 'light dark',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': personalInfo.name,
      'application-name': personalInfo.name,
      'msapplication-TileColor': '#3B82F6',
      'msapplication-config': '/browserconfig.xml'
    },
    
    // Verification
    verification: {
      google: 'your-google-verification-code', // Replace with actual verification code
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
      other: {
        'facebook-domain-verification': 'your-facebook-verification-code'
      }
    },
    
    // Manifest
    manifest: '/manifest.json',
    
    // Icons
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
      ],
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3B82F6' }
      ]
    }
  };

  return metadata;
}

// Generate structured data (JSON-LD)
export function generateStructuredData({
  type = 'Person',
  data = {}
}: {
  type?: 'Person' | 'WebSite' | 'Article' | 'BlogPosting' | 'Organization';
  data?: Record<string, any>;
} = {}) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type
  };

  switch (type) {
    case 'Person':
      return {
        ...baseStructuredData,
        name: personalInfo.name,
        jobTitle: 'Full Stack Developer',
        description: personalInfo.description,
        url: BASE_URL,
        image: `${BASE_URL}/images/profile.jpg`,
        email: personalInfo.email,
        telephone: personalInfo.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: personalInfo.location
        },
        sameAs: [
          // Add your social media URLs here
          'https://linkedin.com/in/yourprofile',
          'https://github.com/yourusername',
          'https://twitter.com/yourhandle'
        ],
        knowsAbout: [
          'Web Development',
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Full Stack Development'
        ],
        ...data
      };

    case 'WebSite':
      return {
        ...baseStructuredData,
        name: `${personalInfo.name} - Portfolio`,
        description: personalInfo.description,
        url: BASE_URL,
        author: {
          '@type': 'Person',
          name: personalInfo.name
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE_URL}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        },
        ...data
      };

    case 'Article':
    case 'BlogPosting':
      return {
        ...baseStructuredData,
        headline: data.title,
        description: data.description,
        image: data.image || `${BASE_URL}/images/og-image.jpg`,
        datePublished: data.publishedAt,
        dateModified: data.modifiedAt || data.publishedAt,
        author: {
          '@type': 'Person',
          name: data.author || personalInfo.name,
          url: BASE_URL
        },
        publisher: {
          '@type': 'Person',
          name: personalInfo.name,
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/images/logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}${data.url}`
        },
        keywords: data.tags?.join(', '),
        articleSection: data.category,
        wordCount: data.wordCount,
        ...data
      };

    case 'Organization':
      return {
        ...baseStructuredData,
        name: personalInfo.name,
        description: personalInfo.description,
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: personalInfo.phone,
          contactType: 'customer service',
          email: personalInfo.email
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: personalInfo.location
        },
        sameAs: [
          // Add your social media URLs here
          'https://linkedin.com/in/yourprofile',
          'https://github.com/yourusername'
        ],
        ...data
      };

    default:
      return { ...baseStructuredData, ...data };
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: `${BASE_URL}${breadcrumb.url}`
    }))
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Generate sitemap URLs
export function generateSitemapUrls() {
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/projects', priority: 0.9, changefreq: 'weekly' },
    { url: '/blog', priority: 0.9, changefreq: 'daily' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' }
  ];

  return staticPages.map(page => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.changefreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: page.priority
  }));
}

// Utility functions for SEO
export const seoUtils = {
  // Clean and optimize title
  cleanTitle: (title: string, maxLength = 60): string => {
    return title.length > maxLength ? `${title.substring(0, maxLength - 3)}...` : title;
  },

  // Clean and optimize description
  cleanDescription: (description: string, maxLength = 160): string => {
    return description.length > maxLength ? `${description.substring(0, maxLength - 3)}...` : description;
  },

  // Generate slug from title
  generateSlug: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  // Extract keywords from text
  extractKeywords: (text: string, maxKeywords = 10): string[] => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, maxKeywords)
      .map(([word]) => word);
  },

  // Calculate reading time
  calculateReadingTime: (text: string, wordsPerMinute = 200): number => {
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  },

  // Validate URL
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
};

export default {
  generateMetadata,
  generateStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
  generateSitemapUrls,
  seoUtils,
  DEFAULT_SEO,
  BASE_URL
};