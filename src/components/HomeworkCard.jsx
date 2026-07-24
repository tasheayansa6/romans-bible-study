/**
 * HomeworkCard.jsx
 * Displays the daily homework assignment and prayer focus.
 */

import { motion } from 'framer-motion'
import { PenLine, HandMetal } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function Block({ icon: Icon, color, bgColor, label, labelId, children }) {
  return (
    <section
      aria-labelledby={labelId}
      style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
          background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={18} color={color} aria-hidden="true" />
        </div>
        <h2 id={labelId} style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)',
          fontWeight: '600', color: 'var(--text-primary)', margin: 0,
        }}>
          {label}
        </h2>
      </div>
      {children}
    </section>
  )
}

export default function HomeworkCard({ homework, prayerFocus }) {
  return (
    <>
      {/* Homework */}
      {homework && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <Block
            icon={PenLine}
            color="#d4af37"
            bgColor="rgba(212,175,55,0.12)"
            label="Daily Homework"
            labelId="homework-heading"
          >
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.03))',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderLeft: '3px solid var(--gold)',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0,
              }}>
                {homework}
              </p>
            </div>
          </Block>
        </motion.div>
      )}

      {/* Prayer Focus */}
      {prayerFocus && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          <Block
            icon={HandMetal}
            color="var(--primary-purple)"
            bgColor="rgba(91,44,131,0.1)"
            label="Prayer Focus"
            labelId="prayer-heading"
          >
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(91,44,131,0.05), rgba(37,117,252,0.04))',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(91,44,131,0.1)',
              borderLeft: '3px solid var(--primary-purple)',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)', fontStyle: 'italic',
                fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
                color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0,
              }}>
                {prayerFocus}
              </p>
            </div>
          </Block>
        </motion.div>
      )}
    </>
  )
}
