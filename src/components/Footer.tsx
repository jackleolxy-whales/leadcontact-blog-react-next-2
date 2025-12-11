import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  const footerLogoUrl = '/assets/logo-footer-56586a.png'
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <a href="https://leadcontact.ai/" className={styles.brandLink} target="_blank" rel="noopener noreferrer">
              <Image src={footerLogoUrl} alt="LeadContact" width={160} height={40} className={styles.brandLogo} />
            </a>
            <div className={styles.info}>
              <div className={styles.row}>
                <span className={styles.label}>Contact Us:</span>
                <a href="mailto:hello@leadcontact.ai" className={styles.contact}>
                  <img src="/assets/icon-mail.svg" alt="Mail" className={styles.icon20} />
                  <span className={styles.text}>hello@leadcontact.ai</span>
                </a>
              </div>
              <div className={`${styles.row} ${styles.follow}`}>
                <span className={`${styles.label} ${styles.followLabel}`}>Follow Us:</span>
                <a href="https://www.linkedin.com/company/linkedcrm-ai/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedCRM on LinkedIn" title="LinkedCRM on LinkedIn">
                  <img src="/assets/icon-follow-1.svg" alt="Follow 1" className={styles.icon40x32} />
                </a>
                <a href="https://x.com/LinkedCRM_AI" target="_blank" rel="noopener noreferrer" aria-label="LinkedCRM on X" title="LinkedCRM on X">
                  <img src="/assets/icon-follow-2.svg" alt="Follow 2" className={styles.icon32} />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.section}>
              <div className={styles.heading}>About</div>
              <div className={styles.links}>
                <Link href="/blog" className={styles.link}>Blog</Link>
                <a href="https://leadcontact.ai/pricing" className={styles.link} target="_blank" rel="noopener noreferrer">Pricing</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>© 2025 WILLING TECH PTE. LTD. All rights reserved.</div>
          <a href="https://leadcontact.ai/privacy" className={styles.policies} target="_blank" rel="noopener noreferrer">Privacy Policy & Terms</a>
        </div>
      </div>
    </footer>
  )
}
