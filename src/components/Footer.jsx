/**
 * Footer.jsx — Full footer with navigation, team contacts, study info, and branding.
 * Mobile-first responsive layout.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Send, Mail, Phone } from 'lucide-react'

const NAV_COL1 = [
  { label: 'Home',        href: '/' },
  { label: '21 Days Plan',href: '/study-plan' },
  { label: 'Dashboard',   href: '/dashboard' },
  { label: 'Worship',     href: '/worship' },
  { label: 'Verses',      href: '/verses' },
]
const NAV_COL2 = [
  { label: 'Journal',     href: '/journal' },
  { label: 'Prayer',      href: '/prayer-journal' },
  { label: 'Notes',       href: '/notes' },
  { label: 'Certificate', href: '/certificate' },
  { label: 'Our Team',    href: '/team' },
  { label: 'Settings',    href: '/settings' },
]

const TEAM_CONTACTS = [
  {
    name: 'Tashee Ayansa',
    role: 'Founder & Developer',
    contacts: [
      { icon: Send,  label: 'Telegram',  value: '@tasheea5',               href: 'https://t.me/tasheea5' },
      { icon: Mail,  label: 'Email',     value: 'tasheayansa6@gmail.com',  href: 'mailto:tasheayansa6@gmail.com' },
      { icon: Phone, label: 'Phone',     value: '0926 637 774',            href: 'tel:+251926637774' },
      { icon: null,  label: 'Instagram', value: '@tasheayansa',             href: 'https://instagram.com/tasheayansa', emoji: '📸' },
    ],
  },
  {
    name: 'Dibora Diriba (DD)',
    role: 'Content & Spiritual Direction',
    contacts: [
      { icon: Send,  label: 'Telegram',  value: '@Ddaughterofjesus',       href: 'https://t.me/Ddaughterofjesus' },
      { icon: Mail,  label: 'Email',     value: 'Coming soon',             href: null },
      { icon: Phone, label: 'Phone',     value: 'Coming soon',             href: null },
      { icon: null,  label: 'Instagram', value: '@Daughter_jesus1212',      href: 'https://instagram.com/Daughter_jesus1212', emoji: '📸' },
    ],
  },
]

const linkStyle = {
  color: 'rgba(255,255,255,0.55)',
  textDecoration: 'none',
  fontFamily: 'var(--font-body)',
  fontSize: '0.88rem',
  transition: 'color 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.35rem',
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0a0515 0%, #05020d 100%)',
      borderTop: '1px solid rgba(212,175,55,0.15)',
      padding: 'clamp(2.5rem, 5vw, 4.5rem) max(1rem, 4vw) 1.75rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative cross */}
      <span aria-hidden="true" style={{
        position: 'absolute', bottom: '-5%', right: '4%',
        fontSize: 'clamp(100px, 18vw, 240px)',
        color: 'rgba(255,255,255,0.018)', fontFamily: 'serif',
        fontWeight: '100', lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>✝</span>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Main grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>

          {/* ── Brand + verse ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{ gridColumn: 'span 1' }}
          >
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none', marginBottom: '1.1rem' }} aria-label="Romans Journey">
              <span style={{ fontSize: '1.5rem', color: 'var(--gold)', lineHeight: 1 }} aria-hidden="true">✝</span>
              <span style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '600',
                background: 'linear-gradient(135deg,#fff 40%,var(--gold))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Romans 21 Days</span>
            </Link>

            <blockquote style={{
              margin: 0, padding: '0.85rem 1rem',
              borderLeft: '3px solid var(--gold)', background: 'rgba(212,175,55,0.06)',
              borderRadius: '0 var(--radius-md) var(--radius-md) 0',
            }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: '0 0 0.35rem' }}>
                "Your word is a lamp to my feet and a light to my path."
              </p>
              <cite style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontStyle: 'normal', color: 'var(--gold)', fontWeight: '500', letterSpacing: '0.04em' }}>
                — Psalm 119:105
              </cite>
            </blockquote>
          </motion.div>

          {/* ── Nav col 1 ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              Explore
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {NAV_COL1.map(l => (
                <li key={l.href}>
                  <Link to={l.href} style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }} aria-hidden="true">✦</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Nav col 2 ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.13 }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              Tools
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {NAV_COL2.map(l => (
                <li key={l.href}>
                  <Link to={l.href} style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.5rem' }} aria-hidden="true">✦</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact: Tashee ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.18 }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.35rem' }}>
              Contact
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)', margin: '0 0 0.75rem' }}>
              {TEAM_CONTACTS[0].name}
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '400', display: 'block' }}>{TEAM_CONTACTS[0].role}</span>
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {TEAM_CONTACTS[0].contacts.map(({ icon: Icon, label, value, href, emoji }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      style={{ ...linkStyle, color: 'rgba(255,255,255,0.6)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                      aria-label={`${label}: ${value}`}
                    >
                      {Icon ? <Icon size={12} color="var(--gold)" aria-hidden="true" /> : <span aria-hidden="true" style={{ fontSize: '0.75rem' }}>{emoji}</span>}
                      <span style={{ fontSize: '0.82rem' }}>{value}</span>
                    </a>
                  ) : (
                    <span style={{ ...linkStyle, cursor: 'default', opacity: 0.45 }}>
                      {Icon ? <Icon size={12} color="var(--gold)" aria-hidden="true" /> : <span aria-hidden="true" style={{ fontSize: '0.75rem' }}>{emoji}</span>}
                      <span style={{ fontSize: '0.82rem' }}>{value}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact: Dibora ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.23 }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.35rem', visibility: 'hidden' }}>
              ·
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: '600', color: 'rgba(255,255,255,0.7)', margin: '0 0 0.75rem' }}>
              {TEAM_CONTACTS[1].name}
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '400', display: 'block' }}>{TEAM_CONTACTS[1].role}</span>
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {TEAM_CONTACTS[1].contacts.map(({ icon: Icon, label, value, href, emoji }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      style={{ ...linkStyle, color: 'rgba(255,255,255,0.6)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                      aria-label={`${label}: ${value}`}
                    >
                      {Icon ? <Icon size={12} color="var(--gold)" aria-hidden="true" /> : <span aria-hidden="true" style={{ fontSize: '0.75rem' }}>{emoji}</span>}
                      <span style={{ fontSize: '0.82rem' }}>{value}</span>
                    </a>
                  ) : (
                    <span style={{ ...linkStyle, cursor: 'default', opacity: 0.4 }}>
                      {Icon ? <Icon size={12} color="var(--gold)" aria-hidden="true" /> : <span aria-hidden="true" style={{ fontSize: '0.75rem' }}>{emoji}</span>}
                      <span style={{ fontSize: '0.82rem', fontStyle: 'italic' }}>{value}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: '1px', background: 'linear-gradient(to right,transparent,rgba(212,175,55,0.2),transparent)', marginBottom: '1.5rem' }} />

        {/* ── Bottom bar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.6rem',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)', margin: 0 }}>
            © {year} Romans 21 Days Journey. Built for His glory.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)',
            margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}>
            Made with <Heart size={11} fill="var(--gold)" color="var(--gold)" aria-label="love" /> for the Kingdom
          </p>
        </div>
      </div>
    </footer>
  )
}
