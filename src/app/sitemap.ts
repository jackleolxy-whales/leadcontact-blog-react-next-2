import type { MetadataRoute } from 'next'
import posts from './blog/posts.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://leadcontact.ai'
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${site}/blog`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  type Post = { slug: string; date: string }
  const postEntries: MetadataRoute.Sitemap = (posts as Post[]).map((p) => ({
    url: `${site}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...baseEntries, ...postEntries]
}
