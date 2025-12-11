import type { Metadata, ResolvingMetadata } from 'next'
import posts from '../posts.json'
import '../styles.css'

type Params = { slug: string }

export function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const p = await params
  const post = posts.find(pst => pst.slug === p.slug)
  const title = post ? post.title : 'LeadContact Blog'
  const desc = p.slug === 'how-to-find-email-on-linkedin-just-1-minute-with-leadcontact'
    ? '用 LeadContact 在 LinkedIn 快速找到并验证邮箱，一分钟完成。'
    : p.slug === 'how-to-find-someone-on-linkedin-by-email-address'
    ? '通过邮箱地址搜索 LinkedIn 个人主页：单次与批量方法详解。'
    : '精选文章：增长工作流、产品迁移、自动化与集成实践。'
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://leadcontact.ai'
  const url = `${site}/blog/${p.slug}`
  const imageAbs = post?.image
    ? (post.image.startsWith('http') ? post.image : `${site}${post.image}`)
    : undefined
  return {
    title: `${title} | LeadContact Blog`,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description: desc,
      url,
      images: imageAbs ? [{ url: imageAbs }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: imageAbs ? [imageAbs] : undefined,
    }
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<Params> }) {
  const p = await params
  const isEmailMinute = p.slug === 'how-to-find-email-on-linkedin-just-1-minute-with-leadcontact'
  const isEmailFind = p.slug === 'how-to-find-someone-on-linkedin-by-email-address'
  const post = posts.find(ps => ps.slug === p.slug)
  const pageTitle = post?.title || 'LeadContact Blog'
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://leadcontact.ai'
  const imageAbs = post?.image
    ? (post.image.startsWith('http') ? post.image : `${site}${post.image}`)
    : undefined
  const ldJson = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: imageAbs,
    author: { '@type': 'Organization', name: 'LeadContact' },
    publisher: { '@type': 'Organization', name: 'LeadContact' },
    mainEntityOfPage: `${site}/blog/${post.slug}`,
  } : null
  const breadcrumbLd = post ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: `${site}/blog` },
      { '@type': 'ListItem', position: 2, name: post.title, item: `${site}/blog/${post.slug}` },
    ],
  } : null
  const videoLd = isEmailMinute && post ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: post.title,
    description: post.excerpt,
    thumbnailUrl: imageAbs ? [imageAbs] : undefined,
    uploadDate: post.date,
    embedUrl: 'https://www.youtube.com/embed/xtalM4OLZg0',
    publisher: { '@type': 'Organization', name: 'LeadContact' },
  } : null
  return (
    <div className="page">
      <section className="hero container">
        <h1 className="heroTitle"><span>{pageTitle}</span></h1>
      </section>
      <main className="container">
        <article className="post">
          {ldJson && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
          )}
          {breadcrumbLd && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
          )}
          {videoLd && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }} />
          )}
          {isEmailMinute ? (
            <section className="richtext">
              <div className="video">
                <iframe width="1120" height="630" src="https://www.youtube.com/embed/xtalM4OLZg0?si=50fGKKhcgZZEbMgc" title="YouTube video player" loading="lazy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
              </div>
              <p className="p">LeadContact helps you find verified emails fast — on LinkedIn and across the web — so you can reach the right people in minutes.</p>
              <h2 className="h2">Core Capabilities</h2>
              <p className="p">Chrome extension: find and verify emails directly on LinkedIn pages; copy and save with one click.</p>
              <p className="p">Single lookup: enter a name or email to instantly get matching contact details and company information.</p>
              <p className="p">Bulk enrichment: upload a CSV with Name + Company/Domain to enrich records with LinkedIn URLs, emails, titles, and phone numbers.</p>
              <p className="p">Workflow integration: export data or connect to your stack to speed up follow‑ups.</p>
              <h2 className="h2">One‑Minute Flow</h2>
              <p className="p">1) Install and open the LeadContact Chrome extension; 2) open the target LinkedIn page; 3) run the lookup and copy the results.</p>
              <h2 className="h2">Use Cases</h2>
              <p className="p">Sales prospecting, recruiting, BD outreach, and partnerships where quick email verification matters.</p>
            </section>
          ) : isEmailFind ? (
            <section className="richtext">
              <p className="p">LinkedIn is a popular channel to attract leads. Finding a LinkedIn profile using an email address can be done through single searches or bulk methods.</p>
              <h2 className="h2">Single Search Methods</h2>
              <p className="p">Email Lookup Tools: Use tools like LeadContact Email Lookup to find profiles, names, locations, and companies instantly.</p>
              <p className="p">Google Search: Search the full name + email + &quot;LinkedIn&quot;. Or name + company + &quot;LinkedIn&quot;.</p>
              <p className="p">On LinkedIn:</p>
              <p className="p">Sync: Use &quot;My Network&quot; -&gt; &quot;My Contacts&quot; to sync email contact lists (Note: feature likelihood to decrease).</p>
              <p className="p">Communities/Groups: If the email reveals the company, search the company on LinkedIn, go to &quot;People,&quot; and search for the name found in the email handle.</p>
              <h2 className="h2">Bulk Search Methods</h2>
              <p className="p">Data Enrichment Tools: Upload a CSV with contact lists (Name + Company/Domain) to tools like LeadContact to retreive LinkedIn URLs, phones, and job titles.</p>
              <p className="p">Google Sheets Add-ons: Use extensions within Google Sheets to enrich leads directly in rows.</p>
              <p className="p">GPT Formula: Use a Google Sheets script with a Custom Search API key to run a formula searching for LinkedIn profiles based on email data (requires technical setup).</p>
              <h2 className="h2">Summary</h2>
              <p className="p">Fastest single way is Email Lookup. Best bulk way is Data Enrichment tools. Google search is a free manual alternative.</p>
            </section>
          ) : (
            <section className="richtext">
              <h2 className="h2">The Future of CRM and Marketing Automation is Here!</h2>
              <p className="p">We&#39;ve got exciting news for all the business growth enthusiasts out there! LinkedCRM is thrilled to announce a game-changing <span className="markInline">integration</span> with HubSpot, the leading inbound marketing and sales platform. This powerful partnership is set to redefine the way you manage customer relationships and automate marketing tasks.</p>
              <h2 className="h2">Welcome to the Era of <span className="markInline">Seamless</span> <span className="markInline">Integration</span></h2>
              <p className="p">With LinkedCRM and HubSpot now working in perfect harmony, you can bid farewell to data silos and manual data entry.</p>
              <h2 className="h2">Smartly <span className="markInline">redefine</span> your automation</h2>
              <p className="p">Build flows that reduce repetitive tasks and give your team time back.</p>
              <h2 className="h2">Scale with confidence</h2>
              <p className="p">Use proven patterns to keep quality high while increasing velocity.</p>
            </section>
          )}
        </article>
      </main>
    </div>
  )
}
