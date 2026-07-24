/**
 * DailyStudy.jsx
 * Dynamic route: /study/:id
 * Renders the full study experience for a single day.
 */

import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import StudyHeader from '../components/StudyHeader'
import ScriptureCard from '../components/ScriptureCard'
import MemoryVerseCard from '../components/MemoryVerseCard'
import ReflectionCard from '../components/ReflectionCard'
import HomeworkCard from '../components/HomeworkCard'
import NavigationButtons from '../components/NavigationButtons'
import CompleteButton from '../components/Study/CompleteButton'
import PrintStudyDay from '../components/Print/PrintStudyDay'
import Footer from '../components/Footer'
import { romansStudy } from '../data/romansStudy'
import { useStudy } from '../hooks/useStudy'

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -16, transition: { duration: 0.3 } },
}

export default function DailyStudy() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDayComplete } = useStudy()

  const dayId = parseInt(id, 10)
  const day = romansStudy.find(d => d.id === dayId)

  // Redirect to study plan if invalid id
  useEffect(() => {
    if (!day) navigate('/study-plan', { replace: true })
  }, [day, navigate])

  // Scroll to top on day change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dayId])

  if (!day) return null

  const isReview = day.isReview
  const isCelebration = day.isCelebration

  return (
    <motion.div
      key={dayId}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}
    >
      <Navbar />

      {/* ── Day Header ── */}
      <StudyHeader day={day} />

      {/* ── Main Content ── */}
      <main style={{
        maxWidth: '780px',
        margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
          aria-label={`Progress: Day ${dayId} of ${romansStudy.length}`}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '0.4rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem',
              color: 'var(--text-muted)', letterSpacing: '0.05em',
            }}>
              Journey Progress
            </span>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem',
              color: isDayComplete(dayId) ? '#2d8a4e' : 'var(--primary-purple)', fontWeight: '600',
            }}>
              {isDayComplete(dayId) ? '✓ Completed' : `Day ${dayId} / ${romansStudy.length}`}
            </span>
          </div>
          <div style={{
            height: '4px', background: 'rgba(91,44,131,0.1)',
            borderRadius: 'var(--radius-full)', overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(dayId / romansStudy.length) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: isDayComplete(dayId)
                  ? 'linear-gradient(to right, #2d8a4e, #48bb78)'
                  : 'linear-gradient(to right, var(--primary-purple), var(--deep-blue))',
                borderRadius: 'var(--radius-full)',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Celebration banner */}
        {isCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem 1.75rem',
              textAlign: 'center',
              color: '#1a0a2e',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-heading)', fontWeight: '600', fontSize: '1.3rem',
              margin: '0 0 0.2rem',
            }}>
              🎉 Congratulations! You completed the 21-Day Journey!
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', margin: 0, opacity: 0.8,
            }}>
              "For from him and through him and for him are all things. To him be the glory forever!" — Romans 11:36
            </p>
          </motion.div>
        )}

        {/* Review day banner */}
        {isReview && !isCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.25)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: '1.3rem' }}>📋</span>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '0.88rem',
                color: 'var(--gold-dark)', margin: '0 0 0.15rem',
              }}>
                Review Day
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                color: 'var(--text-muted)', margin: 0,
              }}>
                Consolidate what you've learned before moving forward.
              </p>
            </div>
            {day.reviewTopics && (
              <div style={{ marginLeft: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.35rem', justifyContent: 'flex-end' }}>
                {day.reviewTopics.map(t => (
                  <span key={t} style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '500',
                    color: 'var(--gold-dark)', background: 'rgba(212,175,55,0.12)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    padding: '0.15rem 0.55rem', borderRadius: 'var(--radius-full)',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* 1. Scripture Reading */}
        <ScriptureCard keyVerses={day.keyVerses} chapterSummary={day.chapterSummary} />

        {/* 2. Memory Verse */}
        <MemoryVerseCard memoryVerse={day.memoryVerse} />

        {/* 3. Reflection Questions */}
        <ReflectionCard questions={day.reflectionQuestions} />

        {/* 4. Homework + Prayer */}
        <HomeworkCard homework={day.homework} prayerFocus={day.prayerFocus} />

        {/* ── Mark Complete ── */}
        <CompleteButton dayId={dayId} />

        {/* ── Print ── */}
        <PrintStudyDay day={day} />

        {/* ── Navigation ── */}
        <NavigationButtons currentId={dayId} totalDays={romansStudy.length} />
      </main>

      <Footer />
    </motion.div>
  )
}
