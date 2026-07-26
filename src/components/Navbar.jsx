/**
 * Navbar.jsx — Fixed top navigation. Fully responsive for Android/mobile.
 * Mobile: hamburger with full slide-down menu.
 * Desktop: horizontal links + search + settings + CTA.
 */

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import GlobalSearch from './Search/GlobalSearch'

const NAV_LINKS = [
  { label: 'Home',       href: '/'              },
  { label: '21 Days',    href: '/study-plan'    },
  { label: 'Dashboard',  href: '/dashboard'     },
  { label: 'Worship',    href: '/worship'       },
  { label: 'Verses',     href: '/verses'        },
  { label: 'Journal',    href: '/journal'       },
  { label: 'Prayer',     href: '/prayer-journal'},
  { label: 'Notes',      href: '/notes'         },
  { label: 'Schedule',   href: '/schedule'      },
  { label: 'Our Team',   href: '/team'          },
]

const menuVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.28, ease: 'easeInOut' } },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.32, ease: 'easeInOut' } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.055, duration: 0.28 } }),
}

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location  = useLocation()
  const prevPath  = useRef(location.pathname)

  // Close mobile menu when navigating
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname
      const t = setTimeout(() => setIsOpen(false), 0)
      return () => clearTimeout(t)
    }
  }, [location.pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isActive = (href) => location.pathname === href

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(10,5,21,0.94)' : 'rgba(10,5,21,0.55)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(212,175,55,0.22)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.35)' : 'none',
        transition: 'background 0.4s, box-shadow 0.4s, border-color 0.4s',
      }}
      aria-label="Main navigation"
    >
      {/* ── Main bar ── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 1rem',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '0.75rem',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: '0.45rem',
          textDecoration: 'none', color: 'white', flexShrink: 0,
        }} aria-label="Romans Journey Home">
          <span style={{ fontSize: '1.4rem', color: 'var(--gold)', lineHeight: 1 }} aria-hidden="true">✝</span>
          <span style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 3.5vw, 1.35rem)',
            fontWeight: '600', letterSpacing: '-0.01em',
            background: 'linear-gradient(135deg,#fff 40%,var(--gold))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Romans Journey
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: 'none', listStyle: 'none', gap: '0.1rem',
          alignItems: 'center', margin: 0, padding: 0,
          /* shown via media query in inline style tag below */
        }} id="desktop-nav">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link to={link.href} style={{
                color: isActive(link.href) ? 'white' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                fontSize: '0.82rem', fontWeight: isActive(link.href) ? '600' : '400',
                padding: '0.35rem 0.7rem', borderRadius: 'var(--radius-full)',
                background: isActive(link.href) ? 'rgba(255,255,255,0.1)' : 'transparent',
                display: 'inline-block', letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
                borderBottom: isActive(link.href) ? '1px solid rgba(212,175,55,0.5)' : '1px solid transparent',
              }}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
          {/* Search — desktop only shown via CSS */}
          <div id="desktop-search">
            <GlobalSearch />
          </div>

          {/* Settings icon */}
          <Link to="/settings" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '34px', height: '34px',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 'var(--radius-sm)', color: 'rgba(255,255,255,0.65)',
            textDecoration: 'none', transition: 'all 0.2s ease', flexShrink: 0,
          }} aria-label="Settings">
            <Settings size={15} aria-hidden="true" />
          </Link>

          {/* CTA — desktop only */}
          <div id="desktop-cta">
            <Link to="/dashboard" style={{
              background: 'var(--gradient-purple-blue)', color: 'white',
              textDecoration: 'none', fontFamily: 'var(--font-body)',
              fontSize: '0.82rem', fontWeight: '600',
              padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)',
              boxShadow: '0 4px 15px rgba(91,44,131,0.35)',
              display: 'inline-block', whiteSpace: 'nowrap',
            }}>
              My Journey
            </Link>
          </div>

          {/* Hamburger — mobile only */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setIsOpen(p => !p)}
            id="hamburger-btn"
            style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius-sm)', color: 'white', cursor: 'pointer',
              padding: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden" animate="visible" exit="hidden"
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(8,3,18,0.97)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Mobile search bar */}
            <div style={{ padding: '0.85rem 1rem 0' }}>
              <GlobalSearch />
            </div>

            <ul style={{
              listStyle: 'none', padding: '0.75rem 1rem 1rem',
              margin: 0, display: 'flex', flexDirection: 'column', gap: '0.15rem',
            }}>
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.href} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                  <Link to={link.href} style={{
                    color: isActive(link.href) ? 'white' : 'rgba(255,255,255,0.8)',
                    textDecoration: 'none', fontFamily: 'var(--font-body)',
                    fontSize: '1rem', fontWeight: isActive(link.href) ? '600' : '400',
                    padding: '0.7rem 1rem', borderRadius: 'var(--radius-md)',
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    background: isActive(link.href) ? 'rgba(255,255,255,0.07)' : 'transparent',
                    borderLeft: `2px solid ${isActive(link.href) ? 'var(--gold)' : 'transparent'}`,
                    transition: 'all 0.15s ease',
                  }}>
                    {link.label}
                    {isActive(link.href) && <span style={{ color: 'var(--gold)', fontSize: '0.6rem', marginLeft: 'auto' }}>●</span>}
                  </Link>
                </motion.li>
              ))}

              {/* Mobile CTA */}
              <motion.li custom={NAV_LINKS.length} variants={itemVariants} initial="hidden" animate="visible"
                style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <Link to="/dashboard" style={{
                  background: 'var(--gradient-purple-blue)', color: 'white',
                  textDecoration: 'none', fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem', fontWeight: '600',
                  padding: '0.8rem 1rem', borderRadius: 'var(--radius-lg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  📖 My Journey
                </Link>
              </motion.li>

              <motion.li custom={NAV_LINKS.length + 1} variants={itemVariants} initial="hidden" animate="visible"
                style={{ marginTop: '0.4rem' }}>
                <Link to="/settings" style={{
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                  padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <Settings size={14} aria-hidden="true" />
                  Settings
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS — show/hide desktop vs mobile elements */}
      <style>{`
        #desktop-nav { display: none !important; }
        #desktop-cta { display: none !important; }
        #desktop-search { display: none !important; }
        #hamburger-btn { display: flex !important; }
        @media (min-width: 900px) {
          #desktop-nav { display: flex !important; }
          #desktop-cta { display: block !important; }
          #desktop-search { display: block !important; }
          #hamburger-btn { display: none !important; }
        }
      `}</style>
    </motion.nav>
  )
}
