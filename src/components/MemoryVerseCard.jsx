/**
 * MemoryVerseCard.jsx
 * Premium memory verse display card — dark background, gold text, copy/share.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Copy, Share2, Check } from 'lucide-react'

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function MemoryVerseCard({ memoryVerse }) {
  const [copied, setCopied] = useState(false)

  if (!memoryVerse) return null

  const fullText = `"${memoryVerse.text}" — ${memoryVerse.ref}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard not available — silently fail
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Memory Verse — Romans Journey',
          text: fullText,
          url: window.location.href,
        })
      } catch {
        // Share cancelled — silently fail
      }
    } else {
      handleCopy()
    }
  }

  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-labelledby="memory-verse-heading"
      style={{
        background: 'linear-gradient(135deg, #1a0a2e 0%, #0d1535 50%, #2d1155 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.75rem, 4vw, 2.75rem)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(91,44,131,0.3)',
        border: '1px solid rgba(212,175,55,0.18)',
      }}
    >
      {/* Background cross watermark */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: '50%', right: '-2%',
        transform: 'translateY(-50%)',
        fontSize: 'clamp(100px, 18vw, 200px)',
        color: 'rgba(255,255,255,0.03)', fontFamily: 'serif', fontWeight: '100',
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>✝</span>

      {/* Gold orb */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-30%', right: '-10%',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
            background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Star size={18} color="var(--gold)" fill="rgba(212,175,55,0.3)" aria-hidden="true" />
          </div>
          <h2 id="memory-verse-heading" style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)',
            fontWeight: '600', color: 'white', margin: 0,
          }}>
            Memory Verse
          </h2>
        </div>

        {/* Decorative line */}
        <div style={{
          height: '1px', marginBottom: '1.5rem',
          background: 'linear-gradient(to right, rgba(212,175,55,0.4), transparent)',
        }} />

        {/* The verse */}
        <blockquote style={{ margin: 0, marginBottom: '1.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: '500',
            fontSize: 'clamp(1.1rem, 3vw, 1.45rem)',
            color: 'var(--gold-light)', lineHeight: 1.65, margin: '0 0 1rem',
            textShadow: '0 0 30px rgba(212,175,55,0.2)',
          }}>
            "{memoryVerse.text}"
          </p>
          <cite style={{
            fontFamily: 'var(--font-body)', fontStyle: 'normal', fontWeight: '600',
            fontSize: '0.82rem', color: 'rgba(212,175,55,0.8)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            — {memoryVerse.ref}
          </cite>
        </blockquote>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleCopy}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)',
              color: 'var(--gold-light)', borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1.1rem', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.12)'}
            aria-label="Copy verse to clipboard"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Check size={13} />
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Copy size={13} />
                  Copy Verse
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleShare}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.65)', borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1.1rem', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
            aria-label="Share this verse"
          >
            <Share2 size={13} />
            Share
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}
