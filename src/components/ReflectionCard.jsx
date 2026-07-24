/**
 * ReflectionCard.jsx
 * Displays reflection questions as interactive numbered cards.
 */

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const questionVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function ReflectionCard({ questions = [] }) {
  if (!questions.length) return null

  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-labelledby="reflection-heading"
      style={{
        background: 'white',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid rgba(91,44,131,0.08)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.75rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
          background: 'linear-gradient(135deg, rgba(37,117,252,0.12), rgba(91,44,131,0.1))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <MessageCircle size={18} color="var(--deep-blue)" aria-hidden="true" />
        </div>
        <div>
          <h2 id="reflection-heading" style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)',
            fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 0.1rem',
          }}>
            Reflection Questions
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            color: 'var(--text-muted)', margin: 0,
          }}>
            Take time to journal your answers
          </p>
        </div>
      </div>

      {/* Questions */}
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {questions.map((question, i) => (
          <motion.li
            key={i}
            custom={i}
            variants={questionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(37,117,252,0.04), rgba(91,44,131,0.03))',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(91,44,131,0.07)',
              alignItems: 'flex-start',
            }}
          >
            {/* Question number */}
            <span style={{
              flexShrink: 0,
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
              color: 'white',
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '700',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} aria-hidden="true">
              {i + 1}
            </span>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.92rem',
              color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0,
              paddingTop: '0.15rem',
            }}>
              {question}
            </p>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  )
}
