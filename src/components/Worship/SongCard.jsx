/**
 * SongCard.jsx — clickable worship song card.
 */

import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

const LANG_COLORS = {
  Amharic: { bg: 'rgba(91,44,131,0.12)',  color: 'var(--primary-purple)' },
  Oromo:   { bg: 'rgba(37,117,252,0.1)',  color: 'var(--deep-blue)' },
  English: { bg: 'rgba(45,138,78,0.1)',   color: '#2d8a4e' },
}
const CAT_COLORS = {
  Worship: { bg: 'rgba(212,175,55,0.12)', color: 'var(--gold-dark)' },
  Praise:  { bg: 'rgba(224,90,90,0.1)',   color: '#c0392b' },
  Gospel:  { bg: 'rgba(45,138,78,0.1)',   color: '#2d8a4e' },
}

export default function SongCard({ song, isActive, isPlaying, onPlay, onPause, index = 0 }) {
  const lc = LANG_COLORS[song.language] ?? LANG_COLORS.English
  const cc = CAT_COLORS[song.category]  ?? CAT_COLORS.Worship

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(91,44,131,0.12), rgba(37,117,252,0.08))'
          : 'rgba(255,255,255,0.05)',
        border: `1.5px solid ${isActive ? 'rgba(212,175,55,0.45)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: '1.1rem 1.25rem',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex', alignItems: 'center', gap: '1rem',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={() => isActive && isPlaying ? onPause() : onPlay(song)}
      role="button"
      aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${song.title} by ${song.artist}`}
    >
      {/* Play/pause icon */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        style={{
          width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
          background: isActive
            ? 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))'
            : 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: isActive ? '0 4px 15px rgba(91,44,131,0.4)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        {isActive && isPlaying
          ? <Pause size={16} color="white" aria-hidden="true" />
          : <Play  size={16} color={isActive ? 'white' : 'rgba(255,255,255,0.7)'} aria-hidden="true" />}
      </motion.div>

      {/* Song info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '0.9rem',
          color: isActive ? 'var(--gold-light)' : 'white',
          margin: '0 0 0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{song.title}</p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.55)', margin: 0,
        }}>{song.artist}</p>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: '600',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          background: lc.bg, color: lc.color,
          padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-full)',
        }}>{song.language}</span>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: '600',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          background: cc.bg, color: cc.color,
          padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-full)',
        }}>{song.category}</span>
      </div>

      {/* Equalizer animation when playing */}
      {isActive && isPlaying && (
        <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '20px', flexShrink: 0 }}>
          {[0.6, 1, 0.7, 0.9, 0.5].map((h, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [h, 1, h * 0.5, 1, h] }}
              transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '3px', height: '20px', borderRadius: '2px',
                background: 'var(--gold-light)', transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      )}

      {/* Track number when not active */}
      {!isActive && (
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)',
          flexShrink: 0, minWidth: '20px', textAlign: 'right',
        }}>
          {String(song.id).padStart(2, '0')}
        </span>
      )}
    </motion.article>
  )
}
