/**
 * JourneyStats.jsx
 * Grid of stat tiles for the Dashboard — days completed, journal entries, etc.
 */

import { motion } from 'framer-motion'
import { BookOpen, PenLine, HeartHandshake, StickyNote, Award, Flame } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' },
  }),
}

export default function JourneyStats() {
  const { stats } = useStudy()

  const tiles = [
    { icon: BookOpen, label: 'Days Completed', value: stats.completedCount,   total: stats.totalDays, color: 'var(--primary-purple)' },
    { icon: Flame,    label: 'Day Streak',      value: stats.streak,           total: null,           color: '#e05a1a' },
    { icon: PenLine,  label: 'Journal Entries', value: stats.journalCount,     total: null,           color: 'var(--deep-blue)' },
    { icon: HeartHandshake, label: 'Prayers',   value: stats.prayerCount,     total: null,           color: '#7b4da3' },
    { icon: StickyNote, label: 'Notes Saved',   value: stats.noteCount,        total: null,           color: '#1050cc' },
    { icon: Award,    label: 'Achievements',    value: stats.achievementCount, total: null,           color: 'var(--gold-dark)' },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
      gap: '0.85rem',
    }}>
      {tiles.map(({ icon: Icon, label, value, total, color }, i) => (
        <motion.div
          key={label}
          custom={i}
          variants={tileVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            background: 'white', borderRadius: 'var(--radius-lg)',
            padding: '1rem', boxShadow: 'var(--shadow-sm)',
            border: '1px solid rgba(91,44,131,0.07)',
            textAlign: 'center',
          }}
        >
          <div style={{
            width: '38px', height: '38px', borderRadius: 'var(--radius-md)',
            background: `${color}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 0.6rem',
          }}>
            <Icon size={17} color={color} aria-hidden="true" />
          </div>
          <p style={{
            fontFamily: 'var(--font-heading)', fontSize: '1.55rem', fontWeight: '700',
            color, margin: '0 0 0.1rem', lineHeight: 1,
          }}>
            {value}
            {total !== null && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '400' }}>
                /{total}
              </span>
            )}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.68rem',
            color: 'var(--text-muted)', margin: 0, lineHeight: 1.3,
          }}>
            {label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
