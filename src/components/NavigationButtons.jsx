/**
 * NavigationButtons.jsx
 * Previous / Next day navigation for the DailyStudy page.
 */

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function NavigationButtons({ currentId, totalDays }) {
  const navigate = useNavigate()
  const hasPrev = currentId > 1
  const hasNext = currentId < totalDays

  return (
    <nav
      aria-label="Study day navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: 'clamp(1.5rem, 4vw, 2.5rem) 0',
        flexWrap: 'wrap',
      }}
    >
      {/* Previous */}
      <motion.button
        whileHover={hasPrev ? { x: -4 } : {}}
        whileTap={hasPrev ? { scale: 0.97 } : {}}
        onClick={() => hasPrev && navigate(`/study/${currentId - 1}`)}
        disabled={!hasPrev}
        aria-label={hasPrev ? `Go to Day ${currentId - 1}` : 'No previous day'}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.7rem 1.4rem',
          background: hasPrev ? 'white' : 'rgba(0,0,0,0.04)',
          border: `1.5px solid ${hasPrev ? 'rgba(91,44,131,0.2)' : 'rgba(0,0,0,0.08)'}`,
          borderRadius: 'var(--radius-full)',
          color: hasPrev ? 'var(--primary-purple)' : 'var(--text-muted)',
          cursor: hasPrev ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: '500',
          boxShadow: hasPrev ? 'var(--shadow-sm)' : 'none',
          transition: 'all 0.2s ease',
          opacity: hasPrev ? 1 : 0.45,
        }}
        onMouseEnter={e => { if (hasPrev) { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--primary-purple)' } }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = hasPrev ? 'var(--shadow-sm)' : 'none'; e.currentTarget.style.borderColor = hasPrev ? 'rgba(91,44,131,0.2)' : 'rgba(0,0,0,0.08)' }}
      >
        <ChevronLeft size={16} aria-hidden="true" />
        {hasPrev ? `Day ${currentId - 1}` : 'Start'}
      </motion.button>

      {/* Back to plan */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/study-plan')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.6rem 1.1rem',
          background: 'transparent',
          border: '1.5px solid rgba(91,44,131,0.15)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: '400',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(91,44,131,0.05)'; e.currentTarget.style.color = 'var(--primary-purple)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
        aria-label="Back to all 21 days"
      >
        <LayoutGrid size={13} aria-hidden="true" />
        All Days
      </motion.button>

      {/* Next */}
      <motion.button
        whileHover={hasNext ? { x: 4 } : {}}
        whileTap={hasNext ? { scale: 0.97 } : {}}
        onClick={() => hasNext && navigate(`/study/${currentId + 1}`)}
        disabled={!hasNext}
        aria-label={hasNext ? `Go to Day ${currentId + 1}` : 'Journey complete'}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.7rem 1.4rem',
          background: hasNext
            ? 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))'
            : 'rgba(0,0,0,0.04)',
          border: `1.5px solid ${hasNext ? 'transparent' : 'rgba(0,0,0,0.08)'}`,
          borderRadius: 'var(--radius-full)',
          color: hasNext ? 'white' : 'var(--text-muted)',
          cursor: hasNext ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: '600',
          boxShadow: hasNext ? 'var(--shadow-md)' : 'none',
          transition: 'all 0.2s ease',
          opacity: hasNext ? 1 : 0.45,
        }}
        onMouseEnter={e => { if (hasNext) e.currentTarget.style.boxShadow = 'var(--shadow-glow-purple)' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = hasNext ? 'var(--shadow-md)' : 'none' }}
      >
        {hasNext ? `Day ${currentId + 1}` : 'Complete!'}
        <ChevronRight size={16} aria-hidden="true" />
      </motion.button>
    </nav>
  )
}
