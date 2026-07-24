/**
 * Journal.jsx  —  /journal
 * Personal Bible study journal page.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import JournalEditor from '../components/Journal/JournalEditor'
import JournalHistory from '../components/Journal/JournalHistory'

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
}

export default function Journal() {
  const [showEditor, setShowEditor] = useState(false)

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden" animate="visible" exit="exit"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}
    >
      <Navbar />

      {/* Header */}
      <header style={{
        background: 'var(--gradient-hero)',
        padding: 'clamp(5.5rem, 10vw, 7rem) 1.5rem clamp(2.5rem, 5vw, 3.5rem)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-15%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,44,131,0.35) 0%, transparent 70%)', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,117,252,0.25) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        </div>
        <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(100px, 18vw, 250px)', color: 'rgba(255,255,255,0.022)', fontFamily: 'serif', fontWeight: '100', pointerEvents: 'none', userSelect: 'none' }}>✝</span>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem', fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}
          >
            ✦ Personal Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '600', color: 'white', margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}
          >
            Your Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.6)', margin: '0 0 1.75rem' }}
          >
            Capture what God is teaching you, one entry at a time.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowEditor((p) => !p)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.8rem 1.75rem',
              background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
              color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
              cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: '600',
              boxShadow: 'var(--shadow-md)',
            }}
            aria-label={showEditor ? 'Close editor' : 'Write new journal entry'}
          >
            {showEditor ? 'Close Editor' : <><Plus size={16} aria-hidden="true" /> New Entry</>}
          </motion.button>
        </div>
      </header>

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {showEditor && (
          <JournalEditor onSave={() => setShowEditor(false)} onCancel={() => setShowEditor(false)} />
        )}
        <JournalHistory />
      </main>

      <Footer />
    </motion.div>
  )
}
