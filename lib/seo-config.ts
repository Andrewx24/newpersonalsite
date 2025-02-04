// lib/seo-config.ts
import { Metadata } from 'next'

interface SeoConfig {
  default: Metadata
  pages: Record<string, Metadata>
  formatTitle: (title: string) => string
  getMetadata: (path: string) => Metadata
}

const DEFAULT_TITLE = 'Andrew Aliaj - Software Engineer & Full Stack Developer'
const DEFAULT_DESCRIPTION = 'Experienced Software Engineer specializing in enterprise-grade solutions, SaaS applications, and cloud architectures using JavaScript, React, Next.js, Node.js, TypeScript, Python, and AWS.'

export const seoConfig: SeoConfig = {
  default: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://andrewaliaj.dev',
      siteName: 'Andrew Aliaj - Software Engineer',
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: 'https://andrewaliaj.dev/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Andrew Aliaj - Software Engineer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: ['https://andrewaliaj.dev/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  },
  pages: {
    '/': {
      title: DEFAULT_TITLE,
    },
    '/about': {
      title: 'About - Andrew Aliaj',
      description: 'Learn about my experience in software engineering, full-stack development, and enterprise solutions.',
    },
    '/contact': {
      title: 'Contact - Andrew Aliaj',
      description: 'Get in touch for software development projects, consulting, or collaboration opportunities.',
    },
  },
  formatTitle: (title: string) => {
    if (title === DEFAULT_TITLE) return title
    return `${title} | Andrew Aliaj`
  },
  getMetadata: (path: string): Metadata => {
    const page = seoConfig.pages[path] || {}
    return {
      ...seoConfig.default,
      ...page,
      title: seoConfig.formatTitle(page.title as string || seoConfig.default.title as string),
    }
  },
}

// Type for structured data
export interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

// Generate structured data for the website
export const generateStructuredData = (): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Andrew Aliaj',
  url: 'https://andrewaliaj.dev',
  jobTitle: 'Software Engineer',
  description: DEFAULT_DESCRIPTION,
  sameAs: [
    'https://github.com/Andrewx24',
    'https://www.linkedin.com/in/andrewaliaj/',
    'https://medium.com/@andrewaliaj'
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Independent Consultant'
  }
})