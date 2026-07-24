/**
 * Footer.jsx
 * Professional footer with brand identity and key scripture verse.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',        href: '/',               isRoute: true },
  { label: '21 Days Plan',href: '/study-plan',     isRoute: true },
  { label: 'Dashboard',   href: '/dashboard',      isRoute: true },
  { label: 'Worship',     href: '/worship',        isRoute: true },
  { label: 'Verses',      href: '/verses',         isRoute: true },
  { label: 'Journal',     href: '/journal',        isRoute: true },
  { label: 'Prayer',      href: '/prayer-journal', isRoute: true },
  { label: 'Certificate', href: '/certificate',    isRoute: true },
  { label: 'Our Team',    href: '/team',           isRoute: true },
  { label: 'Settings',    href: '/settings',       isRoute: true },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #0a0515 0%, #05020d 100%)',
        borderTop: '1px solid rgba(212,175,55,0.15)',
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background subtle cross */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '5%',
          fontSize: 'clamp(120px, 20vw, 260px)',
          color: 'rgba(255,255,255,0.018)',
          fontFamily: 'serif',
          fontWeight: '100',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        ✝
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Top Row ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                marginBottom: '1.25rem',
              }}
              aria-label="Romans Journey - Back to top"
            >
              <span
                style={{
                  fontSize: '1.6rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                  fontWeight: '300',
                }}
                aria-hidden="true"
              >
                ✝
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  background:
                    'linear-gradient(135deg, #ffffff 40%, var(--gold))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Romans 21 Days Journey
              </span>
            </Link>

            {/* Scripture verse */}
            <blockquote
              style={{
                margin: 0,
                padding: '1rem 1.25rem',
                borderLeft: '3px solid var(--gold)',
                background: 'rgba(212,175,55,0.06)',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.65,
                  marginBottom: '0.4rem',
                }}
              >
                "Your word is a lamp to my feet and a light to my path."
              </p>
              <cite
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontStyle: 'normal',
                  color: 'var(--gold)',
                  fontWeight: '500',
                  letterSpacing: '0.04em',
                }}
              >
                — Psalm 119:105
              </cite>
            </blockquote>
          </motion.div>

          {/* Navigation Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1.25rem',
              }}
            >
              Navigate
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      <span aria-hidden="true" style={{ color: 'var(--gold)', fontSize: '0.55rem' }}>✦</span>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-light)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      <span aria-hidden="true" style={{ color: 'var(--gold)', fontSize: '0.55rem' }}>✦</span>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Study Info Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1.25rem',
              }}
            >
              The Study
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              {[
                { emoji: '📖', text: '21 Daily Devotionals' },
                { emoji: '✍️', text: 'Scripture Memory Cards' },
                { emoji: '🙏', text: 'Daily Prayer Guides' },
                { emoji: '📓', text: 'Personal Journal Prompts' },
                { emoji: '🎵', text: 'Worship Mode' },
              ].map((item) => (
                <li
                  key={item.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                  }}
                >
                  <span aria-hidden="true">{item.emoji}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)',
            marginBottom: '1.75rem',
          }}
        />

        {/* ── Bottom Row ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.3)',
              margin: 0,
            }}
          >
            © {currentYear} Romans 21 Days Journey. Built for His glory.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.3)',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            Made with{' '}
            <Heart
              size={12}
              fill="var(--gold)"
              color="var(--gold)"
              aria-label="love"
            />{' '}
            for the Kingdom
          </p>
        </div>
      </div>
    </footer>
  )
}
