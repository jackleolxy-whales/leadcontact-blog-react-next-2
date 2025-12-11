import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://leadcontact.ai'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: site,
    sitemap: [`${site}/sitemap.xml`, `${site}/blog/sitemap.xml`],
  }
}
