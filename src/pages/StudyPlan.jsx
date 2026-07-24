/**
 * StudyPlan.jsx
 * The /study-plan page — shows all 21 days in a visual timeline layout.
 */

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calendar, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import StudyTimeline from '../components/StudyTimeline'
import Footer from '../components/Footer'
import { romansStudy } from '../data/romansStudy'

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const STATS = [
  { icon: Calendar, label: '21 Days', sub: 'of study' },
  { icon: BookOpen, label: '16 Chapters', sub: 'of Romans' },
  { icon: Star, label: '15 Verses', sub: 'to memorize' },
]

export default function StudyPlan() {
  const navigate = useNavigate()
  const totalDays = romansStudy.length
  const reviewDays = romansStudy.filter(d => d.isReview).length
  const studyDays = totalDays - reviewDays

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}
    >
      <Navbar />

      {/* ── Hero Header ── */}
      <header style={{
        background: 'var(--gradient-hero)',
        padding: 'clamp(6rem, 12vw, 9rem) 1.5rem clamp(3rem, 6vw, 5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orbs */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-15%', left: '-5%',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91,44,131,0.35) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-15%', right: '-5%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,117,252,0.25) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }} />
        </div>

        {/* Cross watermark */}
        <span aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(150px, 28vw, 350px)',
          color: 'rgba(255,255,255,0.022)', fontFamily: 'serif', fontWeight: '100',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        }}>✝</span>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem',
              fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: '600',
              color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            ✦ Romans Study Plan ✦
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)', fontWeight: '600', color: 'white',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05,
              margin: '0 0 0.5rem', letterSpacing: '-0.03em',
            }}
          >
            21 Days Journey
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            style={{
              fontFamily: 'var(--font-heading)', fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
              color: 'rgba(255,255,255,0.65)', lineHeight: 1.65,
              margin: '0 0 2.5rem',
            }}
          >
            A complete walk through the Book of Romans — one chapter, one truth, one day at a time.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{
              display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {STATS.map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-full)', padding: '0.5rem 1.1rem',
              }}>
                <Icon size={14} color="var(--gold)" aria-hidden="true" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'white', fontWeight: '600' }}>{label}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>{sub}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(91,44,131,0.5)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/study/1')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
              color: 'white', cursor: 'pointer',
              border: 'none', borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: '600',
              boxShadow: 'var(--shadow-md)',
            }}
            aria-label="Start from Day 1"
          >
            <BookOpen size={18} aria-hidden="true" />
            Begin Day 1
          </motion.button>
        </div>
      </header>

      {/* ── All 21 Days ── */}
      <main style={{
        padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Section heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span aria-hidden="true" style={{
            display: 'block', width: '48px', height: '3px',
            background: 'linear-gradient(135deg, var(--gold-dark), var(--gold-light))',
            borderRadius: 'var(--radius-full)', margin: '0 auto 1rem',
          }} />
          <h2 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 0.5rem',
          }}>
            Your Study Plan
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.95rem',
            color: 'var(--text-muted)', margin: 0,
          }}>
            {studyDays} chapter studies · {reviewDays} review &amp; celebration days
          </p>
        </div>

        <StudyTimeline days={romansStudy} />
      </main>

      <Footer />
    </motion.div>
  )
}
