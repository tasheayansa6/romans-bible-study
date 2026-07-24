/**
 * DailyProgress.jsx
 * 21-dot progress grid showing completed / current / upcoming days.
 */

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useStudy } from '../../hooks/useStudy'
import { romansStudy } from '../../data/romansStudy'

export default function DailyProgress() {
  const navigate = useNavigate()
  const { isDayComplete, stats } = useStudy()

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.4rem',
        marginBottom: '0.75rem',
      }}>
        {romansStudy.map((day) => {
          const done = isDayComplete(day.id)
          const isCurrent = stats.nextDay === day.id
          const isReview = day.isReview

          let bg = 'rgba(91,44,131,0.07)'
          let border = 'rgba(91,44,131,0.12)'
          let color = 'var(--text-muted)'

          if (done) {
            bg = 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))'
            border = 'transparent'
            color = 'white'
          } else if (isCurrent) {
            bg = 'rgba(212,175,55,0.18)'
            border = 'rgba(212,175,55,0.5)'
            color = 'var(--gold-dark)'
          } else if (isReview) {
            bg = 'rgba(212,175,55,0.07)'
            border = 'rgba(212,175,55,0.2)'
          }

          return (
            <motion.button
              key={day.id}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(`/study/${day.id}`)}
              title={`${day.day} — ${day.theme}${done ? ' ✓' : ''}`}
              aria-label={`${day.day}: ${done ? 'Completed' : isCurrent ? 'Current' : 'Not started'}`}
              style={{
                aspectRatio: '1',
                background: bg, border: `1.5px solid ${border}`,
                borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: '700',
                color, transition: 'all 0.2s ease',
              }}
            >
              {done ? '✓' : day.id}
            </motion.button>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { color: 'linear-gradient(135deg,var(--primary-purple),var(--deep-blue))', label: 'Completed' },
          { color: 'rgba(212,175,55,0.4)', label: 'Current' },
          { color: 'rgba(91,44,131,0.07)', label: 'Upcoming' },
        ].map(({ color: c, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <div style={{
              width: '12px', height: '12px', borderRadius: '3px',
              background: c, border: '1px solid rgba(91,44,131,0.15)',
            }} aria-hidden="true" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
