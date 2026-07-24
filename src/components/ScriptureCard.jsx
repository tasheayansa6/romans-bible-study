/**
 * ScriptureCard.jsx
 * Displays key verses and chapter summary for a study day.
 */

import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function ScriptureCard({ keyVerses = [], chapterSummary = '' }) {
  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-labelledby="scripture-heading"
      style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid rgba(91,44,131,0.08)',
      }}
    >
      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, rgba(91,44,131,0.12), rgba(37,117,252,0.1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <BookOpen size={18} color="var(--primary-purple)" aria-hidden="true" />
        </div>
        <h2 id="scripture-heading" style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)',
          fontWeight: '600', color: 'var(--text-primary)', margin: 0,
        }}>
          Scripture Reading
        </h2>
      </div>

      {/* Chapter summary */}
      {chapterSummary && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.75,
          color: 'var(--text-secondary)', marginBottom: '1.75rem',
        }}>
          {chapterSummary}
        </p>
      )}

      {/* Key verses */}
      {keyVerses.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '600',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text-muted)', margin: 0,
          }}>
            Key Verses
          </h3>
          {keyVerses.map((verse, i) => (
            <blockquote
              key={i}
              style={{
                margin: 0,
                padding: '1rem 1.25rem',
                borderLeft: '3px solid var(--primary-purple)',
                background: 'linear-gradient(135deg, rgba(91,44,131,0.04), rgba(37,117,252,0.03))',
                borderRadius: '0 var(--radius-md) var(--radius-md) 0',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-heading)', fontStyle: 'italic',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                color: 'var(--text-primary)', lineHeight: 1.65, margin: '0 0 0.4rem',
              }}>
                "{verse.text}"
              </p>
              <cite style={{
                fontFamily: 'var(--font-body)', fontStyle: 'normal',
                fontSize: '0.78rem', fontWeight: '600',
                color: 'var(--primary-purple)', letterSpacing: '0.04em',
              }}>
                — {verse.ref}
              </cite>
            </blockquote>
          ))}
        </div>
      )}
    </motion.section>
  )
}
