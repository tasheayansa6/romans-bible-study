/**
 * CompleteButton.jsx
 * "Mark Today's Study Complete" button — sits at the bottom of DailyStudy.
 * Triggers progress save, achievement check, and animated feedback.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, Sparkles } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'

export default function CompleteButton({ dayId }) {
  const { markDayComplete, isDayComplete, checkAchievements } = useStudy()
  const [justCompleted, setJustCompleted] = useState(false)

  const completed = isDayComplete(dayId)

  const handleComplete = () => {
    if (completed) return
    markDayComplete(dayId)
    setJustCompleted(true)
    checkAchievements()
    setTimeout(() => setJustCompleted(false), 3500)
  }

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        {justCompleted && (
          <motion.div
            key="congrats"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            style={{
              position: 'absolute', top: '-4.5rem', left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
              color: 'white', borderRadius: 'var(--radius-lg)',
              padding: '0.6rem 1.25rem',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: '600',
              whiteSpace: 'nowrap', boxShadow: 'var(--shadow-md)',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              zIndex: 10,
            }}
          >
            <Sparkles size={14} />
            Day {dayId} complete! Well done! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={!completed ? { scale: 1.03, boxShadow: '0 8px 30px rgba(91,44,131,0.45)' } : {}}
        whileTap={!completed ? { scale: 0.97 } : {}}
        onClick={handleComplete}
        disabled={completed}
        aria-label={completed ? `Day ${dayId} already completed` : `Mark Day ${dayId} as complete`}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem',
          padding: '1rem 2rem',
          background: completed
            ? 'linear-gradient(135deg, #2d8a4e, #1a6b35)'
            : 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
          color: 'white', border: 'none', borderRadius: 'var(--radius-xl)',
          cursor: completed ? 'default' : 'pointer',
          fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: '600',
          boxShadow: completed ? '0 4px 16px rgba(45,138,78,0.35)' : 'var(--shadow-md)',
          transition: 'all 0.3s ease',
          letterSpacing: '0.01em',
        }}
      >
        {completed ? (
          <>
            <CheckCircle2 size={20} aria-hidden="true" />
            Day {dayId} Completed ✓
          </>
        ) : (
          <>
            <Circle size={20} aria-hidden="true" />
            Mark Today&apos;s Study Complete
          </>
        )}
      </motion.button>
    </div>
  )
}
