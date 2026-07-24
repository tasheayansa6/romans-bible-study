/**
 * ProgressCircle.jsx
 * Animated SVG circular progress ring showing journey completion %.
 */

import { motion } from 'framer-motion'

const SIZE = 160
const STROKE = 10
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ProgressCircle({ percent = 0, completed = 0, total = 21 }) {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
          {/* Track */}
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
            fill="none" stroke="rgba(91,44,131,0.1)" strokeWidth={STROKE}
          />
          {/* Progress arc */}
          <motion.circle
            cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
            fill="none"
            stroke="url(#progressGrad)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5b2c83" />
              <stop offset="100%" stopColor="#2575fc" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '700',
              color: 'var(--primary-purple)', lineHeight: 1,
            }}
          >
            {percent}%
          </motion.span>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.68rem',
            color: 'var(--text-muted)', letterSpacing: '0.05em', marginTop: '0.15rem',
          }}>
            Complete
          </span>
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '0.82rem',
        color: 'var(--text-secondary)', textAlign: 'center', margin: 0,
      }}>
        <strong style={{ color: 'var(--primary-purple)' }}>{completed}</strong>
        <span style={{ color: 'var(--text-muted)' }}> / {total} Days</span>
      </p>
    </div>
  )
}
