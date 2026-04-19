import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/prints/viewing-room/'],
      },
    ],
    sitemap: 'https://fraseredwardsphotography.com/sitemap.xml',
  }
}
