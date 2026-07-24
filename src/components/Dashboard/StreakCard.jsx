/**
 * StreakCard.jsx
 * Displays current reading streak with milestone badges.
 */

import { motion } from 'framer-motion'
import { useStudy } from '../../hooks/useStudy'
import DashboardCard from './DashboardCard'

const MILESTONES = [
  { target: 3,  label: '3 Days' },
  { target: 7,  label: '1 Week' },
  { target: 14, label: '2 Weeks' },
  { target: 21, label: 'Journey!' },
]

export default function StreakCard({ custom = 0 }) {
  const { streak } = useStudy()
  const current = streak?.current ?? 0
  const longest = streak?.longest ?? 0

  return (
    <DashboardCard custom={custom} accent="var(--gold)" aria-labelledby="streak-heading">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.4rem' }} aria-hidden="true">🔥</span>
        <h3 id="streak-heading" style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600',
          color: 'var(--text-primary)', margin: 0,
        }}>
          Study Streak
        </h3>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <motion.span
          animate={current > 0 ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'block', fontSize: '2.5rem', lineHeight: 1 }}
          aria-hidden="true"
        >
          🔥
        </motion.span>
        <p style={{
          fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '700',
          color: current > 0 ? 'var(--primary-purple)' : 'var(--text-muted)',
          margin: '0.3rem 0 0.1rem',
        }}>
          {current} {current === 1 ? 'Day' : 'Days'}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
          {current === 0
            ? 'Start studying to build your streak!'
            : 'Current streak — keep it going!'}
        </p>
      </div>

      {/* Milestone badges */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {MILESTONES.map(({ target, label }) => {
          const reached = current >= target
          return (
            <div key={target} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
              padding: '0.6rem 0.8rem',
              background: reached ? 'rgba(91,44,131,0.08)' : 'rgba(0,0,0,0.03)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${reached ? 'rgba(91,44,131,0.22)' : 'rgba(0,0,0,0.06)'}`,
              minWidth: '60px', opacity: reached ? 1 : 0.45,
              transition: 'all 0.3s ease',
            }}>
              <span style={{ fontSize: '1.1rem' }} aria-hidden="true">🔥</span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700',
                color: reached ? 'var(--primary-purple)' : 'var(--text-muted)',
              }}>{label}</span>
            </div>
          )
        })}
      </div>

      {longest > 0 && (
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.72rem',
          color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.85rem', margin: '0.85rem 0 0',
        }}>
          Personal best: <strong style={{ color: 'var(--primary-purple)' }}>{longest}</strong> day{longest !== 1 ? 's' : ''}
        </p>
      )}
    </DashboardCard>
  )
}
