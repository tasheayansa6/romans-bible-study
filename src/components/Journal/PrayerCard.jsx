/**
 * PrayerCard.jsx
 * Single prayer request card with answer tracking.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Trash2, Clock } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'

const CATEGORY_COLORS = {
  Salvation:        { bg: 'rgba(37,117,252,0.1)',  border: 'rgba(37,117,252,0.3)',  color: '#2575fc' },
  Family:           { bg: 'rgba(212,175,55,0.1)',  border: 'rgba(212,175,55,0.3)',  color: '#a88c1f' },
  Friends:          { bg: 'rgba(91,44,131,0.1)',   border: 'rgba(91,44,131,0.25)',  color: '#5b2c83' },
  Church:           { bg: 'rgba(45,138,78,0.1)',   border: 'rgba(45,138,78,0.3)',   color: '#2d8a4e' },
  Work:             { bg: 'rgba(224,90,90,0.1)',   border: 'rgba(224,90,90,0.3)',   color: '#c0392b' },
  Health:           { bg: 'rgba(155,89,182,0.1)',  border: 'rgba(155,89,182,0.3)',  color: '#9b59b6' },
  'Spiritual Growth':{ bg: 'rgba(212,175,55,0.08)', border: 'rgba(212,175,55,0.25)', color: '#a88c1f' },
  Gratitude:        { bg: 'rgba(241,196,15,0.1)',  border: 'rgba(241,196,15,0.35)', color: '#d4ac0d' },
}

export default function PrayerCard({ prayer, index = 0 }) {
  const { deletePrayer, markPrayerAnswered } = useStudy()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const cat = CATEGORY_COLORS[prayer.category] ?? CATEGORY_COLORS.Church
  const date = new Date(prayer.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const answeredDate = prayer.answeredAt ? new Date(prayer.answeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,0.08)',
        overflow: 'hidden',
        opacity: prayer.answered ? 0.8 : 1,
      }}
      aria-label={`Prayer: ${prayer.request.slice(0, 60)}`}
    >
      <div style={{
        padding: '1.1rem 1.4rem',
        borderLeft: `3px solid ${prayer.answered ? '#2d8a4e' : cat.color}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
            {prayer.category && (
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '600',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: cat.color, background: cat.bg, border: `1px solid ${cat.border}`,
                padding: '0.1rem 0.55rem', borderRadius: 'var(--radius-full)',
              }}>
                {prayer.category}
              </span>
            )}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
              fontFamily: 'var(--font-body)', fontSize: '0.65rem',
              color: prayer.answered ? '#2d8a4e' : 'var(--text-muted)',
              background: prayer.answered ? 'rgba(45,138,78,0.1)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${prayer.answered ? 'rgba(45,138,78,0.25)' : 'rgba(0,0,0,0.08)'}`,
              padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-full)',
            }}>
              {prayer.answered
                ? <><CheckCircle2 size={9} aria-hidden="true" /> Answered</>
                : <><Clock size={9} aria-hidden="true" /> Praying</>}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.1rem', flexShrink: 0 }}>
            {!prayer.answered && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => markPrayerAnswered(prayer.id)}
                title="Mark as answered"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem', color: '#2d8a4e' }}
                aria-label="Mark prayer as answered"
              >
                <CheckCircle2 size={15} />
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setConfirmDelete(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem', color: '#e05a5a' }}
              aria-label="Delete prayer"
            >
              <Trash2 size={14} />
            </motion.button>
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.92rem',
          color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.5rem',
          textDecoration: prayer.answered ? 'line-through' : 'none',
          opacity: prayer.answered ? 0.7 : 1,
        }}>
          {prayer.request}
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            Requested: {date}
          </span>
          {answeredDate && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: '#2d8a4e', fontWeight: '600' }}>
              ✓ Answered: {answeredDate}
            </span>
          )}
        </div>

        {prayer.answer && (
          <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', background: 'rgba(45,138,78,0.05)', borderRadius: 'var(--radius-md)', borderLeft: '2px solid #2d8a4e' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700', color: '#2d8a4e', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.25rem' }}>How God Answered</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{prayer.answer}</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ padding: '0.75rem 1.4rem', background: 'rgba(224,90,90,0.05)', borderTop: '1px solid rgba(224,90,90,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#c0392b', margin: 0 }}>Delete this prayer?</p>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button onClick={() => setConfirmDelete(false)} style={{ padding: '0.3rem 0.8rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cancel</button>
              <button onClick={() => deletePrayer(prayer.id)} style={{ padding: '0.3rem 0.8rem', background: '#e05a5a', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'white', fontWeight: '600' }}>Delete</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
