import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import posts from './posts.json'
import './styles.css'

const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://leadcontact.ai'
const firstImage = posts[0]?.image
const firstImageAbs = firstImage
  ? (firstImage.startsWith('http') ? firstImage : `${site}${firstImage}`)
  : undefined

export const metadata: Metadata = {
  title: 'LeadContact Blog',
  description: 'LeadContact Blog 分享邮箱查找、数据丰富与增长工作流的精选内容。',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'LeadContact Blog',
    description: 'LeadContact Blog 分享邮箱查找、数据丰富与增长工作流的精选内容。',
    url: '/blog',
    images: firstImageAbs ? [{ url: firstImageAbs }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadContact Blog',
    description: 'LeadContact Blog 分享邮箱查找、数据丰富与增长工作流的精选内容。',
    images: firstImageAbs ? [firstImageAbs] : undefined,
  },
}

const authors = ['Whales', 'Steven', 'Julia', 'Bonnie', 'Ethan'] as const
const rand = () => authors[Math.floor(Math.random() * authors.length)]
const authorNames = [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()]

const formatDate = (s: string) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'short', day: 'numeric'
}).format(new Date(s))

type SearchParams = { page?: string; tag?: string }
type Post = { title: string; slug: string; date: string; excerpt: string; image: string; tags?: string[] }

const allowedTagMap = new Map<string, string>([
  ['linkedin', 'LinkedIn'],
  ['leadcontact', 'LeadContact'],
  ['email', 'Email'],
  ['phone', 'Phone'],
])
const allowedTags = Array.from(allowedTagMap.values())
const normalizeAllowedTags = (tags?: string[]) =>
  (tags ?? [])
    .map(t => allowedTagMap.get(t.toLowerCase()))
    .filter((t): t is string => Boolean(t))

export default async function BlogListPage({ searchParams }: { searchParams?: Promise<SearchParams> }) {
  const sp = searchParams ? await searchParams : undefined
  const pageSize = 9
  const current = Number(sp?.page ?? '1') || 1
  const tag = sp?.tag
  const allPosts = posts as unknown as Post[]
  const uniqueTags = allowedTags
  const filtered = tag ? allPosts.filter(p => normalizeAllowedTags(p.tags).includes(tag)) : allPosts
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const start = (current - 1) * pageSize
  const end = start + pageSize
  const pagePosts = filtered.slice(start, end)
  const recentPosts = allPosts.slice(0, 3)
  const buildPages = (curr: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages: (number | '…')[] = []
    const sibStart = Math.max(2, curr - 1)
    const sibEnd = Math.min(total - 1, curr + 1)
    pages.push(1)
    if (sibStart > 2) pages.push('…')
    for (let p = sibStart; p <= sibEnd; p++) pages.push(p)
    if (sibEnd < total - 1) pages.push('…')
    pages.push(total)
    return pages
  }
  const pages = buildPages(current, totalPages)
  return (
    <div className="page">
      <section className="hero container">
        <h1 className="heroTitle">
          <span className="strong">Insights & Updates:</span>
          <span className="strong">Explore Our Latest Blog Posts</span>
        </h1>
      </section>

      <main className="container">
        <section className="section">
          <h2 className="sectionTitle">Recent blog posts</h2>
          <div className="grid">
          {recentPosts.map((post, i) => (
            <article key={post.slug} className="card">
            <Link
              className="thumb"
              href={`/blog/${post.slug}`}
              aria-label={`Read more: ${post.title}`}
              title={`Read more: ${post.title}`}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </Link>
            <div className="content contentMin">
              <div className="info">
                <span className="time">{formatDate(post.date)}</span>
                <div className="author">
                  <Image src="/assets/logo-56586a.png" alt="LeadContact" width={24} height={24} className="authorAvatar" />
                  <span className="authorName">{authorNames[i % authorNames.length]}</span>
                </div>
              </div>
              <h3 className="title">
                <Link href={`/blog/${post.slug}`} aria-label={`Read more: ${post.title}`} title={`Read more: ${post.title}`}>
                  <span>{post.title}</span>
                </Link>
              </h3>
              <Link className="excerpt" href={`/blog/${post.slug}`} aria-label={`Read more: ${post.title}`} title={`Read more: ${post.title}`}>
                {post.excerpt}
              </Link>
              <div data-ws-track="BlogReadMoreButtonClick">
                <Link href={`/blog/${post.slug}`} className="btnDark" aria-label={`Read more: ${post.title}`} title={`Read more: ${post.title}`}>
                  Read more
                </Link>
              </div>
            </div>
          </article>
          ))}
          </div>
        </section>

        <section className="section">
          <h2 className="sectionTitle">All blog posts</h2>
          <div className="tagsBar">
            <Link href={{ pathname: '/blog' }} scroll={false} className={`tagChip ${tag ? '' : 'tagChipActive'}`}>All</Link>
            {allowedTags.map(t => (
              <Link key={t} href={{ pathname: '/blog', query: { tag: t } }} scroll={false} className={`tagChip ${tag === t ? 'tagChipActive' : ''}`}>{t}</Link>
            ))}
          </div>
          <div className="grid">
            {pagePosts.map((post, i) => (
              <article key={post.slug} className="card">
                <Link className="thumb" href={`/blog/${post.slug}`} aria-label={`Read more: ${post.title}`} title={`Read more: ${post.title}`}>
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </Link>
                <div className="content">
                  <div className="info">
                    <span className="time">{formatDate(post.date)}</span>
                    <div className="author">
                      <Image src="/assets/logo-56586a.png" alt="LeadContact" width={24} height={24} className="authorAvatar" />
                      <span className="authorName">{authorNames[i % authorNames.length]}</span>
                    </div>
                  </div>
                  <h3 className="title">
                    <Link href={`/blog/${post.slug}`} aria-label={`Read more: ${post.title}`} title={`Read more: ${post.title}`}>
                      <span>{post.title}</span>
                    </Link>
                  </h3>
                  <Link className="excerpt" href={`/blog/${post.slug}`} aria-label={`Read more: ${post.title}`} title={`Read more: ${post.title}`}>
                    {post.excerpt}
                  </Link>
                  <div className="tagsBar">
                    {normalizeAllowedTags(post.tags).map((t) => (
                      <Link key={t} href={{ pathname: '/blog', query: { tag: t } }} scroll={false} className="tagChip">{t}</Link>
                    ))}
                  </div>
                  <div data-ws-track="BlogReadMoreButtonClick">
                    <Link href={`/blog/${post.slug}`} className="btnDark" aria-label={`Read more: ${post.title}`} title={`Read more: ${post.title}`}>
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="pagination">
            <Link
              href={{ pathname: '/blog', query: tag ? { page: String(Math.max(1, current - 1)), tag } : { page: String(Math.max(1, current - 1)) } }}
              aria-disabled={current === 1}
              className={`pageNav prev ${current === 1 ? 'pageNavDisabled' : ''}`}
              scroll={false}
            >
              ← Previous
            </Link>
            {pages.map((p, idx) => {
              if (p === '…') return <span key={`e-${idx}`} className="ellipsis">…</span>
              const isActive = p === current
              const query = tag ? { page: String(p), tag } : { page: String(p) }
              return (
                <Link key={p} href={{ pathname: '/blog', query }} scroll={false} className={`pageBtn ${isActive ? 'pageBtnActive' : ''}`}>{p}</Link>
              )
            })}
            <Link
              href={{ pathname: '/blog', query: tag ? { page: String(Math.min(totalPages, current + 1)), tag } : { page: String(Math.min(totalPages, current + 1)) } }}
              aria-disabled={current === totalPages}
              className={`pageNav next ${current === totalPages ? 'pageNavDisabled' : ''}`}
              scroll={false}
            >
              Next →
            </Link>
          </div>
        </section>
      </main>

      <section className="preFooter">
        <div className="preContainer">
          <h2 className="preTitle">Great conversations start with the right contact.</h2>
          <p className="preDesc">It&#39;s time to find yours.</p>
          <div data-ws-track="BlogFooterInstallPlugin">
            <a href="https://chromewebstore.google.com/detail/imhlnhlbiencamnbpigopiibddajimep" className="preCta" target="_blank" rel="noopener noreferrer">
              <img className="preCtaIcon preCtaIconWeb" alt="Chrome" src="https://leadcontact.ai/images/google.svg" />
              Add to Chrome - It&#39;s Free
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
