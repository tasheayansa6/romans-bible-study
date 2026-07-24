/**
 * AmbientEffects.jsx — animated background ambient effects for Worship Mode.
 */

import { motion } from 'framer-motion'
import { useMemo } from 'react'

function rand(min, max) { return Math.random() * (max - min) + min }

export default function AmbientEffects({ isPlaying = false }) {
  const orbs = useMemo(() => Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: rand(200, 500),
    top: `${rand(-20, 80)}%`,
    left: `${rand(-10, 90)}%`,
    color: i % 2 === 0
      ? 'rgba(91,44,131,0.12)'
      : i % 3 === 0
        ? 'rgba(212,175,55,0.07)'
        : 'rgba(37,117,252,0.1)',
    dur: rand(8, 16),
  })), [])

  const particles = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${rand(0, 100)}%`,
    size: rand(2, 5),
    dur: rand(10, 20),
    delay: rand(0, 10),
    color: i % 3 === 0
      ? 'rgba(212,175,55,0.55)'
      : i % 3 === 1
        ? 'rgba(91,44,131,0.45)'
        : 'rgba(37,117,252,0.4)',
  })), [])

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Gradient orbs */}
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          animate={{ scale: isPlaying ? [1, 1.15, 1] : [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: orb.top, left: orb.left,
            width: orb.size, height: orb.size, borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map(p => (
        <motion.span
          key={p.id}
          animate={{ y: [0, -window.innerHeight - 100], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: '-20px', left: p.left,
            width: p.size, height: p.size, borderRadius: '50%', background: p.color,
          }}
        />
      ))}

      {/* Cross watermarks */}
      {[{ top: '10%', left: '5%', size: 160 }, { top: '55%', right: '3%', size: 200 }].map((c, i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.015, 0.04, 0.015] }}
          transition={{ duration: 7 + i * 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', ...c, fontSize: c.size,
            color: 'white', fontFamily: 'serif', fontWeight: 100,
            lineHeight: 1, userSelect: 'none',
          }}
        >✝</motion.span>
      ))}
    </div>
  )
}
