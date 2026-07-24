/**
 * ContinueButton.jsx
 * "Continue where you left off" button — used on Dashboard.
 * Reads lastStudy and nextDay from context to navigate correctly.
 */

import { motion } from 'framer-motion'
import { PlayCircle, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../../hooks/useStudy'

export default function ContinueButton({ size = 'lg' }) {
  const navigate = useNavigate()
  const { stats, lastStudy } = useStudy()

  const dayId = stats.nextDay
  const isResume = lastStudy && !stats.completedDays?.includes(lastStudy.dayId)
  const label = stats.completedCount === 0
    ? 'Begin Day 1'
    : stats.completedCount >= stats.totalDays
      ? 'Review Journey'
      : `Continue — Day ${dayId}`

  const isSmall = size === 'sm'

  return (
    <motion.button
      whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(91,44,131,0.45)' }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/study/${dayId}`)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: isSmall ? '0.6rem 1.4rem' : '0.9rem 2rem',
        background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
        color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
        cursor: 'pointer', fontFamily: 'var(--font-body)',
        fontSize: isSmall ? '0.85rem' : '1rem',
        fontWeight: '600', boxShadow: 'var(--shadow-md)',
        transition: 'all 0.3s ease',
      }}
      aria-label={label}
    >
      {isResume ? <PlayCircle size={isSmall ? 15 : 18} aria-hidden="true" /> : <BookOpen size={isSmall ? 15 : 18} aria-hidden="true" />}
      {label}
    </motion.button>
  )
}
