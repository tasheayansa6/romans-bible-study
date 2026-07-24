/**
 * SectionTitle.jsx
 * Reusable elegant section heading with gold accent line.
 * Props:
 *   title    {string}  — main heading text
 *   subtitle {string}  — optional supporting text beneath the title
 *   light    {bool}    — use white text variant (for dark backgrounds)
 *   center   {bool}    — center align (default true)
 */

import { motion } from 'framer-motion'

const sectionTitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

export default function SectionTitle({
  title = '',
  subtitle = '',
  light = false,
  center = true,
}) {
  return (
    <motion.div
      variants={sectionTitleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      style={{
        textAlign: center ? 'center' : 'left',
        marginBottom: '3rem',
      }}
    >
      {/* Gold accent line — top */}
      <span
        aria-hidden="true"
        style={{
          display: center ? 'block' : 'inline-block',
          width: '48px',
          height: '3px',
          background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
          borderRadius: 'var(--radius-full)',
          marginBottom: '1rem',
          ...(center ? { margin: '0 auto 1rem' } : {}),
        }}
      />

      {/* Main title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: '600',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          color: light ? 'white' : 'var(--text-primary)',
          marginBottom: subtitle ? '1rem' : 0,
        }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            fontWeight: '400',
            color: light ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)',
            lineHeight: 1.65,
            maxWidth: '540px',
            ...(center ? { margin: '0 auto' } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
