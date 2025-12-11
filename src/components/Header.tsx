'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()
  const isBlogActive = pathname?.startsWith('/blog')
  const [hasShadow, setHasShadow] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const [leftEl, setLeftEl] = useState<HTMLDivElement | null>(null)
  const [rightEl, setRightEl] = useState<HTMLDivElement | null>(null)
  const [ctaEl, setCtaEl] = useState<HTMLAnchorElement | null>(null)
  const logoLocal = '/assets/logo-56586a.png'

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 0)
    const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKeydown)
    }
  }, [])

  useEffect(() => {
    const measure = () => {
      const cw = containerEl?.clientWidth ?? window.innerWidth
      const lw = leftEl?.scrollWidth ?? 0
      const rw = rightEl?.scrollWidth ?? 0
      const free = cw - lw - rw
      const ctaWrapped = (() => {
        const el = ctaEl
        if (!el) return false
        return el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
      })()
      setCompact(free < 24 || ctaWrapped)
    }
    measure()
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [containerEl, leftEl, rightEl, ctaEl])

  return (
    <header className={`${styles.header} ${hasShadow ? styles.withShadow : ''} ${compact ? styles.compact : ''}`}>
      <div className={styles.container} ref={setContainerEl}>
        <nav className={styles.nav}>
          <div className={styles.left} ref={setLeftEl}>
            <div className={styles.logoBox}>
              <a href="https://leadcontact.ai/" className={styles.logo} target="_blank" rel="noopener noreferrer">
                <Image src={logoLocal} alt="LeadContact" width={120} height={32} className={styles.logoImg} priority />
              </a>
            </div>
            <div className={styles.list}>
              <a href="https://leadcontact.ai/" className={styles.item} target="_blank" rel="noopener noreferrer">Home</a>
              <a href="https://leadcontact.ai/chrome-extension" className={styles.item} target="_blank" rel="noopener noreferrer">Chrome Extension</a>
              <a href="https://leadcontact.ai/pricing" className={styles.item} target="_blank" rel="noopener noreferrer">Pricing</a>
              <Link href="/blog" className={`${styles.item} ${isBlogActive ? styles.itemActive : ''}`}>Blog</Link>
            </div>
          </div>
          <div className={styles.right} ref={setRightEl}>
            <a href="https://chromewebstore.google.com/detail/imhlnhlbiencamnbpigopiibddajimep" className={styles.cta} target="_blank" rel="noopener noreferrer" ref={setCtaEl}>
              <img className={styles.ctaIcon} alt="Chrome" src="https://leadcontact.ai/images/google.svg" />
              Add to Chrome
            </a>
            <button className={styles.menuBtn} onClick={() => setIsMenuOpen(v => !v)} aria-expanded={isMenuOpen ? 'true' : 'false'} aria-controls="mobile-drawer" aria-label="Open navigation">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </nav>
      </div>
      {isMenuOpen && (
        <div className={styles.mobileDrawer} id="mobile-drawer" role="dialog" aria-modal="true" onClick={(e) => { if (e.currentTarget === e.target) setIsMenuOpen(false) }}>
          <div className={styles.drawerPanel}>
            <a href="https://leadcontact.ai/" className={styles.drawerItem} target="_blank" rel="noopener noreferrer">Home</a>
            <a href="https://leadcontact.ai/chrome-extension" className={styles.drawerItem} target="_blank" rel="noopener noreferrer">Chrome Extension</a>
            <a href="https://leadcontact.ai/pricing" className={styles.drawerItem} target="_blank" rel="noopener noreferrer">Pricing</a>
            <Link href="/blog" className={`${styles.drawerItem} ${isBlogActive ? styles.drawerItemActive : ''}`} onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <div className={styles.drawerDivider}></div>
            <a href="https://chromewebstore.google.com/detail/imhlnhlbiencamnbpigopiibddajimep" className={styles.drawerCta} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
              <img className={styles.ctaIcon} alt="Chrome" src="https://leadcontact.ai/images/google.svg" />
              Add to Chrome
            </a>
            <button className={styles.drawerClose} onClick={() => setIsMenuOpen(false)} aria-label="Close navigation">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l12 12M18 6l-12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
