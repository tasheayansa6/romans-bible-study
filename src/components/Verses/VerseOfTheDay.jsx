/**
 * VerseOfTheDay.jsx — today's verse rotates by day-of-year.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Share2, Check, Sparkles } from 'lucide-react'
import { allVerses } from '../../data/allVerses'

function getDayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now - start) / 86400000)
}

export default function VerseOfTheDay({ dark = true }) {
  const verse = allVerses[getDayOfYear() % allVerses.length]
  const [copied, setCopied] = useState(false)

  const fullText = `"${verse.text}" — ${verse.ref}`
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(fullText); setCopied(true); setTimeout(() => setCopied(false), 2200) } catch { /* clipboard unavailable */ }
  }
  const handleShare = async () => {
    if (navigator.share) { try { await navigator.share({ title: 'Verse of the Day', text: fullText }) } catch { /* share cancelled */ } }
    else handleCopy()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: dark
          ? 'linear-gradient(135deg, #1a0a2e 0%, #0d1535 60%, #2d1155 100%)'
          : 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
        border: '1px solid rgba(212,175,55,0.2)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(91,44,131,0.3)',
      }}
      aria-label="Verse of the Day"
    >
      {/* Cross watermark */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: '50%', right: '-2%', transform: 'translateY(-50%)',
        fontSize: 'clamp(80px, 14vw, 160px)', color: 'rgba(255,255,255,0.03)',
        fontFamily: 'serif', fontWeight: 100, lineHeight: 1, userSelect: 'none',
      }}>✝</span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Sparkles size={14} color="var(--gold)" aria-hidden="true" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Verse of the Day
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>{today}</span>
        </div>

        {/* Verse */}
        <blockquote style={{ margin: '0 0 1rem' }}>
          <p style={{
            fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: '500',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: 'var(--gold-light)',
            lineHeight: 1.65, margin: '0 0 0.75rem',
            textShadow: '0 0 30px rgba(212,175,55,0.15)',
          }}>"{verse.text}"</p>
          <cite style={{
            fontFamily: 'var(--font-body)', fontStyle: 'normal', fontWeight: '600',
            fontSize: '0.78rem', color: 'rgba(212,175,55,0.75)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>— {verse.ref}</cite>
        </blockquote>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.35rem 0.9rem', background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.25)', borderRadius: 'var(--radius-full)',
              cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem',
              color: 'var(--gold-light)', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.12)'}
            aria-label="Copy verse"
          >
            <AnimatePresence mode="wait">
              {copied
                ? <motion.span key="c" initial={{scale:0.7}} animate={{scale:1}} exit={{scale:0.7}} style={{display:'flex',alignItems:'center',gap:'0.3rem'}}><Check size={12}/>Copied!</motion.span>
                : <motion.span key="d" initial={{scale:0.7}} animate={{scale:1}} exit={{scale:0.7}} style={{display:'flex',alignItems:'center',gap:'0.3rem'}}><Copy size={12}/>Copy</motion.span>}
            </AnimatePresence>
          </button>
          <button
            onClick={handleShare}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.35rem 0.9rem', background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: 'var(--radius-full)',
              cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.65)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
            aria-label="Share verse"
          >
            <Share2 size={12} aria-hidden="true" />
            Share
          </button>
        </div>
      </div>
    </motion.div>
  )
}
