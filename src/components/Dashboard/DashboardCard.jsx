/**
 * DashboardCard.jsx
 * Reusable glass-style card for dashboard sections.
 */

import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function DashboardCard({
  children,
  custom = 0,
  accent,    // optional top-border color
  className,
  style = {},
  animate = true,
  'aria-labelledby': labelId,
}) {
  const baseStyle = {
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    padding: 'clamp(1.25rem, 3vw, 1.75rem)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid rgba(91,44,131,0.08)',
    ...(accent ? { borderTop: `3px solid ${accent}` } : {}),
    ...style,
  }

  if (!animate) {
    return (
      <section style={baseStyle} aria-labelledby={labelId} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      custom={custom}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      style={baseStyle}
      className={className}
      aria-labelledby={labelId}
    >
      {children}
    </motion.section>
  )
}
