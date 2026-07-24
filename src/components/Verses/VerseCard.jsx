/**
 * VerseCard.jsx — verse display with favorite, copy, share actions.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Copy, Share2, Check } from 'lucide-react'
import { useFavorites } from '../../hooks/useFavorites'

export default function VerseCard({ verse, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [copied, setCopied] = useState(false)
  const fav = isFavorite(verse.id)
  const fullText = `"${verse.text}" — ${verse.ref}`

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(fullText); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard unavailable */ }
  }
  const handleShare = async () => {
    if (navigator.share) { try { await navigator.share({ title: verse.ref, text: fullText }) } catch { /* share cancelled */ } }
    else handleCopy()
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,0.08)',
        borderLeft: `4px solid ${fav ? 'var(--gold)' : 'var(--primary-purple)'}`,
        padding: '1.25rem 1.5rem',
        transition: 'border-left-color 0.25s ease',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '700',
            color: 'var(--primary-purple)', background: 'rgba(91,44,131,0.09)',
            padding: '0.1rem 0.6rem', borderRadius: 'var(--radius-full)', letterSpacing: '0.04em',
          }}>{verse.ref}</span>
          {verse.theme && (
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '500',
              color: 'var(--text-muted)', background: 'rgba(0,0,0,0.04)',
              padding: '0.1rem 0.6rem', borderRadius: 'var(--radius-full)',
            }}>{verse.theme}</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => toggleFavorite(verse.id)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', flexShrink: 0,
            color: fav ? 'var(--gold)' : 'var(--text-muted)',
          }}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={fav}
        >
          <Heart size={16} fill={fav ? 'var(--gold)' : 'none'} aria-hidden="true" />
        </motion.button>
      </div>

      {/* Verse text */}
      <blockquote style={{ margin: 0 }}>
        <p style={{
          fontFamily: 'var(--font-heading)', fontStyle: 'italic',
          fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
          color: 'var(--text-primary)', lineHeight: 1.65, margin: 0,
        }}>"{verse.text}"</p>
      </blockquote>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem' }}>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.3rem 0.8rem', background: 'transparent',
            border: '1px solid rgba(91,44,131,0.15)', borderRadius: 'var(--radius-full)',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.72rem',
            color: 'var(--text-muted)', transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(91,44,131,0.06)'; e.currentTarget.style.color = 'var(--primary-purple)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
          aria-label="Copy verse"
        >
          <AnimatePresence mode="wait">
            {copied
              ? <motion.span key="c" initial={{scale:0.7}} animate={{scale:1}} exit={{scale:0.7}} style={{display:'flex',alignItems:'center',gap:'0.3rem'}}><Check size={11} />Copied!</motion.span>
              : <motion.span key="d" initial={{scale:0.7}} animate={{scale:1}} exit={{scale:0.7}} style={{display:'flex',alignItems:'center',gap:'0.3rem'}}><Copy size={11} />Copy</motion.span>}
          </AnimatePresence>
        </button>
        <button
          onClick={handleShare}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.3rem 0.8rem', background: 'transparent',
            border: '1px solid rgba(91,44,131,0.15)', borderRadius: 'var(--radius-full)',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.72rem',
            color: 'var(--text-muted)', transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,117,252,0.06)'; e.currentTarget.style.color = 'var(--deep-blue)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
          aria-label="Share verse"
        >
          <Share2 size={11} aria-hidden="true" />
          Share
        </button>
      </div>
    </motion.article>
  )
}
