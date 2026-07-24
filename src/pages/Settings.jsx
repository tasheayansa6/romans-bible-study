/**
 * Settings.jsx  —  /settings
 * Theme selector, accessibility, data management.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, RotateCcw, Palette, Eye, Info, Database, AlertTriangle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ThemeSelector from '../components/Settings/ThemeSelector'
import AccessibilityPanel from '../components/Settings/AccessibilityPanel'
import { useStudy } from '../hooks/useStudy'
import { allVerses } from '../data/allVerses'
import { romansStudy } from '../data/romansStudy'

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
}

const sectionHeadingStyle = {
  fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)',
  fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 1.25rem',
  display: 'flex', alignItems: 'center', gap: '0.5rem',
}

const sectionStyle = {
  background: 'white', borderRadius: 'var(--radius-xl)',
  padding: 'clamp(1.5rem, 4vw, 2rem)',
  boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,0.08)',
}

export default function Settings() {
  const { stats, journal, achievements } = useStudy()
  const [confirmReset, setConfirmReset] = useState(false)
  const [resetDone, setResetDone] = useState(false)

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      progress:     JSON.parse(localStorage.getItem('romans-progress')     || '{}'),
      journal:      JSON.parse(localStorage.getItem('romans-journal')      || '[]'),
      prayers:      JSON.parse(localStorage.getItem('romans-prayers')      || '[]'),
      notes:        JSON.parse(localStorage.getItem('romans-notes')        || '[]'),
      achievements: JSON.parse(localStorage.getItem('romans-achievements') || '[]'),
      favorites:    JSON.parse(localStorage.getItem('romans-favorites')    || '[]'),
      streak:       JSON.parse(localStorage.getItem('romans-streak')       || '{}'),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `romans-journey-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    const keys = ['romans-progress','romans-journal','romans-prayers','romans-notes',
                  'romans-achievements','romans-last-study','romans-streak','romans-favorites']
    keys.forEach(k => localStorage.removeItem(k))
    setConfirmReset(false)
    setResetDone(true)
    setTimeout(() => window.location.reload(), 1500)
  }

  return (
    <motion.div
      variants={pageVariants} initial="hidden" animate="visible" exit="exit"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}
    >
      <Navbar />

      {/* Header */}
      <header style={{
        background: 'var(--gradient-hero)',
        padding: 'clamp(5.5rem, 10vw, 7rem) 1.5rem clamp(2.5rem, 5vw, 3.5rem)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(100px,18vw,250px)', color: 'rgba(255,255,255,0.022)', fontFamily: 'serif', fontWeight: 100, pointerEvents: 'none', userSelect: 'none' }}>✝</span>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem', fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ✦ Settings
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '600', color: 'white', margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}>
            Preferences
          </motion.h1>
        </div>
      </header>

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Appearance */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={sectionStyle}>
          <h2 style={sectionHeadingStyle}><Palette size={18} color="var(--primary-purple)" aria-hidden="true" /> Appearance</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1.25rem' }}>
            Choose a theme that fits your devotional mood.
          </p>
          <ThemeSelector />
        </motion.section>

        {/* Accessibility */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} style={sectionStyle}>
          <h2 style={sectionHeadingStyle}><Eye size={18} color="var(--deep-blue)" aria-hidden="true" /> Accessibility</h2>
          <AccessibilityPanel />
        </motion.section>

        {/* About */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} style={sectionStyle}>
          <h2 style={sectionHeadingStyle}><Info size={18} color="var(--gold-dark)" aria-hidden="true" /> About</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.85rem' }}>
            {[
              { label: 'App Version', value: 'v4.0.0' },
              { label: 'Study Days',  value: romansStudy.length },
              { label: 'Key Verses',  value: allVerses.length },
              { label: 'Your Progress', value: `${stats.percentComplete}%` },
              { label: 'Journal Entries', value: journal.length },
              { label: 'Achievements', value: `${achievements.length}/14` },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'rgba(91,44,131,0.04)', borderRadius: 'var(--radius-lg)', padding: '0.85rem', textAlign: 'center', border: '1px solid rgba(91,44,131,0.07)' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary-purple)', margin: '0 0 0.2rem' }}>{value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Data management */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} style={sectionStyle}>
          <h2 style={sectionHeadingStyle}><Database size={18} color="var(--text-muted)" aria-hidden="true" /> Your Data</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
            All your data is stored locally in your browser. Export a backup or reset your progress.
          </p>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            {/* Export */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={handleExport}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.4rem',
                background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
                color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: '600',
                boxShadow: 'var(--shadow-sm)',
              }}
              aria-label="Download your study data as JSON"
            >
              <Download size={15} aria-hidden="true" />
              Export Data
            </motion.button>

            {/* Reset — with confirmation */}
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.65rem 1.4rem',
                  background: 'transparent', border: '1.5px solid rgba(224,90,90,0.3)',
                  borderRadius: 'var(--radius-full)', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#c0392b',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(224,90,90,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                aria-label="Reset all study progress"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Reset Progress
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 1rem', background: 'rgba(224,90,90,0.06)', border: '1px solid rgba(224,90,90,0.2)', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap' }}>
                <AlertTriangle size={15} color="#c0392b" aria-hidden="true" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#c0392b' }}>This cannot be undone.</span>
                <button onClick={handleReset} style={{ padding: '0.3rem 0.85rem', background: '#e05a5a', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: '600' }}>Confirm Reset</button>
                <button onClick={() => setConfirmReset(false)} style={{ padding: '0.3rem 0.85rem', background: 'transparent', color: 'var(--text-muted)', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem' }}>Cancel</button>
              </div>
            )}
          </div>

          {resetDone && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#2d8a4e', marginTop: '0.75rem', fontWeight: '500' }}>
              ✓ Progress reset. Reloading…
            </p>
          )}
        </motion.section>
      </main>
      <Footer />
    </motion.div>
  )
}
