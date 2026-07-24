/**
 * Navbar.jsx
 * Fixed top navigation with glassmorphism effect.
 * Responsive: full menu on desktop, hamburger on mobile.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'
import GlobalSearch from './Search/GlobalSearch'

const NAV_LINKS = [
  { label: 'Home',      href: '/',              isRoute: true },
  { label: '21 Days',   href: '/study-plan',    isRoute: true },
  { label: 'Dashboard', href: '/dashboard',     isRoute: true },
  { label: 'Worship',   href: '/worship',       isRoute: true },
  { label: 'Verses',    href: '/verses',        isRoute: true },
  { label: 'Journal',   href: '/journal',       isRoute: true },
]

// Mobile menu animation variants
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: 'easeInOut' },
  },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.3 },
  }),
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add background tint after scrolling past 60px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.4s ease, box-shadow 0.4s ease',
        background: scrolled
          ? 'rgba(10, 5, 21, 0.82)'
          : 'rgba(10, 5, 21, 0.35)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '1px solid rgba(212, 175, 55, 0.2)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
      aria-label="Main navigation"
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Logo ── */}
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: 'white',
          }}
          aria-label="Romans Journey - Home"
        >
          <span
            style={{
              fontSize: '1.5rem',
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
              fontSize: '1.45rem',
              fontWeight: '600',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #ffffff 40%, var(--gold))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Romans Journey
          </span>
        </Link>

        {/* ── Desktop Menu ── */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '0.25rem',
            alignItems: 'center',
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  onClick={closeMenu}
                  style={{
                    color: 'rgba(255,255,255,0.78)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all 0.25s ease',
                    display: 'inline-block',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.78)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  style={{
                    color: 'rgba(255,255,255,0.78)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: '400',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    transition: 'all 0.25s ease',
                    display: 'inline-block',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.78)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}

          {/* CTA Button */}
          <li style={{ marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Global Search */}
            <GlobalSearch />

            {/* Settings icon */}
            <Link
              to="/settings"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '32px', height: '32px',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-sm)', color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
              aria-label="Settings"
            >
              <Settings size={15} aria-hidden="true" />
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/dashboard"
                style={{
                  background: 'var(--gradient-purple-blue)',
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 15px rgba(91,44,131,0.35)',
                  display: 'inline-block',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                My Journey
              </Link>
            </motion.div>
          </li>
        </ul>

        {/* ── Hamburger Button (mobile) ── */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="flex md:hidden"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 'var(--radius-sm)',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(10, 5, 21, 0.96)',
              backdropFilter: 'blur(20px)',
            }}
            className="md:hidden"
          >
            <ul
              style={{
                listStyle: 'none',
                padding: '1rem 1.5rem 1.5rem',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {link.isRoute ? (
                    <Link
                      to={link.href}
                      onClick={closeMenu}
                      style={{
                        color: 'rgba(255,255,255,0.82)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        fontWeight: '400',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'block',
                        transition: 'all 0.2s ease',
                        borderLeft: '2px solid transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      style={{
                        color: 'rgba(255,255,255,0.82)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        fontWeight: '400',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'block',
                        transition: 'all 0.2s ease',
                        borderLeft: '2px solid transparent',
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </motion.li>
              ))}

              {/* Mobile CTA */}
              <motion.li
                custom={NAV_LINKS.length}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                style={{ marginTop: '0.75rem' }}
              >
                <Link
                  to="/study-plan"
                  onClick={closeMenu}
                  style={{
                    background: 'var(--gradient-purple-blue)',
                    color: 'white',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  📖 Start Journey
                </Link>              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
