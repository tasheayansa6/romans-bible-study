/**
 * DayCard.jsx
 * Individual study day card for the Study Plan timeline.
 * Shows day number, chapter, theme, and a "Start Study" button.
 */

import { motion } from 'framer-motion'
import { BookOpen, RefreshCw, Trophy, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../hooks/useStudy'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: 'easeOut' },
  }),
}

// Colour accent per card position for visual variety
const ACCENTS = [
  'var(--primary-purple)',
  'var(--deep-blue)',
  '#7b4da3',
  '#1050cc',
  '#5596fd',
  'var(--primary-purple)',
]

export default function DayCard({ day, index }) {
  const navigate = useNavigate()
  const { isDayComplete, stats } = useStudy()

  const accent = ACCENTS[index % ACCENTS.length]
  const isReview = day.isReview
  const isCelebration = day.isCelebration
  const completed = isDayComplete(day.id)
  const isCurrent = stats.nextDay === day.id && !completed

  const Icon = isCelebration ? Trophy : isReview ? RefreshCw : BookOpen

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      style={{
        background: completed ? 'linear-gradient(135deg, rgba(45,138,78,0.04), white)' : 'white',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
        border: completed
          ? '1px solid rgba(45,138,78,0.2)'
          : isCurrent
            ? '1px solid rgba(212,175,55,0.35)'
            : `1px solid rgba(91,44,131,0.09)`,
        borderTop: completed
          ? '3px solid #2d8a4e'
          : isCurrent
            ? '3px solid var(--gold)'
            : `3px solid ${accent}`,
        cursor: 'pointer',
        transition: 'box-shadow 0.25s ease',
        position: 'relative',
      }}
      onClick={() => navigate(`/study/${day.id}`)}
      onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
      aria-label={`${day.day}: ${day.chapter} — ${day.theme}${completed ? ' (Completed)' : ''}`}
    >
      {/* Day number + icon row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: completed ? '#2d8a4e' : isCurrent ? 'var(--gold-dark)' : accent,
          background: completed ? 'rgba(45,138,78,0.1)' : isCurrent ? 'rgba(212,175,55,0.12)' : `${accent}18`,
          padding: '0.2rem 0.7rem', borderRadius: 'var(--radius-full)',
        }}>
          {day.day}
        </span>
        <div style={{
          width: '34px', height: '34px', borderRadius: 'var(--radius-md)',
          background: completed ? 'rgba(45,138,78,0.12)' : `${accent}14`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {completed
            ? <CheckCircle2 size={16} color="#2d8a4e" aria-hidden="true" />
            : <Icon size={16} color={isCurrent ? 'var(--gold-dark)' : accent} aria-hidden="true" />}
        </div>
      </div>

      {/* Chapter */}
      <h3 style={{
        fontFamily: 'var(--font-heading)', fontWeight: '600',
        fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
        color: 'var(--text-primary)', margin: '0 0 0.2rem', lineHeight: 1.2,
      }}>
        {day.chapter}
      </h3>

      {/* Theme */}
      <p style={{
        fontFamily: 'var(--font-heading)', fontStyle: 'italic',
        fontSize: '0.9rem', color: 'var(--text-muted)',
        margin: '0 0 1rem', lineHeight: 1.4,
      }}>
        {day.theme}
      </p>

      {/* Review badge */}
      {isReview && (
        <span style={{
          fontSize: '0.68rem', fontFamily: 'var(--font-body)', fontWeight: '600',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--gold-dark)', background: 'rgba(212,175,55,0.12)',
          border: '1px solid rgba(212,175,55,0.25)',
          padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)',
          marginBottom: '0.85rem',
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
        }}>
          {isCelebration ? '🎉 Celebration' : '📋 Review Day'}
        </span>
      )}

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={e => { e.stopPropagation(); navigate(`/study/${day.id}`) }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          width: '100%', padding: '0.6rem',
          background: completed
            ? 'linear-gradient(135deg, rgba(45,138,78,0.12), rgba(45,138,78,0.06))'
            : isCurrent
              ? 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.08))'
              : `linear-gradient(135deg, ${accent}22, ${accent}10)`,
          border: completed
            ? '1px solid rgba(45,138,78,0.25)'
            : isCurrent
              ? '1px solid rgba(212,175,55,0.4)'
              : `1px solid ${accent}30`,
          borderRadius: 'var(--radius-lg)',
          color: completed ? '#2d8a4e' : isCurrent ? 'var(--gold-dark)' : accent,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: '600',
          transition: 'all 0.2s ease',
          marginTop: isReview ? 0 : '0.1rem',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = completed ? 'rgba(45,138,78,0.18)' : `${accent}28` }}
        onMouseLeave={e => { e.currentTarget.style.background = completed ? 'linear-gradient(135deg,rgba(45,138,78,0.12),rgba(45,138,78,0.06))' : `linear-gradient(135deg, ${accent}22, ${accent}10)` }}
        aria-label={completed ? `Review ${day.day}` : `Start ${day.day}`}
      >
        {completed
          ? <><CheckCircle2 size={13} aria-hidden="true" /> Review Day</>
          : isCurrent
            ? <><BookOpen size={13} aria-hidden="true" /> Continue</>
            : <><BookOpen size={13} aria-hidden="true" /> Start Study</>}
      </motion.button>
    </motion.article>
  )
}
