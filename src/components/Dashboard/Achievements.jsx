/**
 * Achievements.jsx
 * Achievement cards grid — locked achievements shown dimmed.
 * Animated unlock when a new achievement is earned.
 */

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'
import { ACHIEVEMENT_DEFS } from '../../data/achievementDefs'

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.4, delay: i * 0.06, type: 'spring', bounce: 0.3 },
  }),
}

export default function Achievements({ compact = false }) {
  const { achievements } = useStudy()
  const unlockedIds = achievements.map((a) => a.id)

  const display = compact ? ACHIEVEMENT_DEFS.slice(0, 6) : ACHIEVEMENT_DEFS

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: compact
        ? 'repeat(auto-fill, minmax(110px, 1fr))'
        : 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: '0.75rem',
    }}>
      {display.map((def, i) => {
        const unlocked = unlockedIds.includes(def.id)
        const unlockedData = achievements.find((a) => a.id === def.id)

        return (
          <motion.div
            key={def.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            title={unlocked ? def.desc : `Locked: ${def.desc}`}
            style={{
              background: unlocked
                ? 'linear-gradient(135deg, rgba(91,44,131,0.08), rgba(37,117,252,0.06))'
                : 'rgba(0,0,0,0.03)',
              border: `1px solid ${unlocked ? 'rgba(91,44,131,0.18)' : 'rgba(0,0,0,0.07)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '0.9rem 0.75rem',
              textAlign: 'center',
              opacity: unlocked ? 1 : 0.45,
              filter: unlocked ? 'none' : 'grayscale(0.6)',
              transition: 'all 0.3s ease',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shine effect on unlock */}
            {unlocked && (
              <motion.div
                initial={{ x: '-100%', opacity: 0.6 }}
                animate={{ x: '200%', opacity: 0 }}
                transition={{ duration: 0.8, delay: i * 0.06 + 0.2 }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  pointerEvents: 'none',
                }}
              />
            )}

            <div style={{ fontSize: '1.6rem', marginBottom: '0.3rem', lineHeight: 1 }} aria-hidden="true">
              {unlocked ? def.emoji : <Lock size={18} color="var(--text-muted)" />}
            </div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '600',
              color: unlocked ? 'var(--text-primary)' : 'var(--text-muted)',
              margin: 0, lineHeight: 1.3,
            }}>
              {def.title}
            </p>
            {unlocked && unlockedData?.unlockedAt && !compact && (
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                color: 'var(--text-muted)', marginTop: '0.2rem',
              }}>
                {new Date(unlockedData.unlockedAt).toLocaleDateString()}
              </p>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
