/**
 * StudyHeader.jsx
 * Dark hero header for the DailyStudy page.
 * Shows day number, chapter, theme, and progress indicator.
 */

import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function StudyHeader({ day }) {
  const navigate = useNavigate()

  return (
    <header
      style={{
        background: 'var(--gradient-hero)',
        padding: 'clamp(5rem, 10vw, 7rem) 1.5rem clamp(3rem, 6vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-5%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,44,131,0.35) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-5%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,117,252,0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
      </div>

      {/* Watermark cross */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(150px, 28vw, 380px)',
        color: 'rgba(255,255,255,0.022)', fontFamily: 'serif', fontWeight: '100',
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>✝</span>

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/study-plan')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.75)', borderRadius: 'var(--radius-full)',
            padding: '0.45rem 1rem', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: '400',
            marginBottom: '1.75rem', transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'white' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
          aria-label="Back to study plan"
        >
          <ArrowLeft size={14} />
          All 21 Days
        </motion.button>

        {/* Day badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem',
            fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: '600',
            color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            <BookOpen size={12} aria-hidden="true" />
            {day.day}
          </span>
        </motion.div>

        {/* Chapter & theme */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-heading)', fontWeight: '600', color: 'white',
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.05,
            letterSpacing: '-0.03em', margin: '0 0 0.5rem',
          }}
        >
          {day.chapter}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-heading)', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--gold-light)',
            margin: '0 0 1.25rem', fontWeight: '400',
          }}
        >
          {day.theme}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
            color: 'rgba(255,255,255,0.62)', lineHeight: 1.7,
            maxWidth: '600px', margin: '0 auto',
          }}
        >
          {day.description}
        </motion.p>
      </div>
    </header>
  )
}
