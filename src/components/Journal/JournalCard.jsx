/**
 * JournalCard.jsx
 * Single journal entry display card with edit/delete actions.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2, ChevronDown, ChevronUp, Tag } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'
import JournalEditor from './JournalEditor'

export default function JournalCard({ entry, index = 0 }) {
  const { deleteJournalEntry } = useStudy()
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })

  if (editing) {
    return (
      <JournalEditor
        entry={entry}
        onSave={() => setEditing(false)}
        onCancel={() => setEditing(false)}
      />
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,0.08)',
        overflow: 'hidden',
      }}
      aria-label={`Journal entry: ${entry.title || 'Untitled'}`}
    >
      {/* Card header — always visible */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderLeft: '3px solid var(--primary-purple)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem',
        }}
        onClick={() => setExpanded((p) => !p)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded((p) => !p)}
        aria-expanded={expanded}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
            {entry.dayLabel && (
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '700',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--primary-purple)', background: 'rgba(91,44,131,0.09)',
                padding: '0.1rem 0.55rem', borderRadius: 'var(--radius-full)',
              }}>
                {entry.dayLabel}
              </span>
            )}
            {entry.mood && (
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                color: 'var(--text-muted)',
              }}>
                {entry.mood}
              </span>
            )}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: '600',
            color: 'var(--text-primary)', margin: '0 0 0.2rem',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {entry.title || 'Untitled Entry'}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.78rem',
            color: 'var(--text-muted)', margin: 0,
          }}>
            {date}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); setEditing(true) }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.35rem', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)',
            }}
            aria-label="Edit entry"
          >
            <Pencil size={14} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); setConfirmDelete(true) }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.35rem', color: '#e05a5a', borderRadius: 'var(--radius-sm)',
            }}
            aria-label="Delete entry"
          >
            <Trash2 size={14} />
          </motion.button>
          <div style={{ color: 'var(--text-muted)', padding: '0.35rem' }} aria-hidden="true">
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {entry.reflection && (
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.35rem' }}>Reflection</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{entry.reflection}</p>
                </div>
              )}
              {entry.application && (
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.35rem' }}>Application</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{entry.application}</p>
                </div>
              )}
              {entry.prayer && (
                <div style={{ padding: '0.75rem 1rem', background: 'rgba(91,44,131,0.04)', borderRadius: 'var(--radius-md)', borderLeft: '2px solid var(--primary-purple)' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700', color: 'var(--primary-purple)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.3rem' }}>🙏 Prayer</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{entry.prayer}</p>
                </div>
              )}
              {entry.tags?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', alignItems: 'center' }}>
                  <Tag size={11} color="var(--text-muted)" aria-hidden="true" />
                  {entry.tags.map((t) => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '500',
                      color: 'var(--deep-blue)', background: 'rgba(37,117,252,0.08)',
                      border: '1px solid rgba(37,117,252,0.18)',
                      padding: '0.1rem 0.55rem', borderRadius: 'var(--radius-full)',
                    }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              padding: '1rem 1.5rem',
              background: 'rgba(224,90,90,0.06)',
              borderTop: '1px solid rgba(224,90,90,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#c0392b', margin: 0 }}>
              Delete this journal entry?
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setConfirmDelete(false)} style={{
                padding: '0.35rem 0.85rem', background: 'transparent',
                border: '1px solid rgba(0,0,0,0.15)', borderRadius: 'var(--radius-full)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}>Cancel</button>
              <button onClick={() => deleteJournalEntry(entry.id)} style={{
                padding: '0.35rem 0.85rem', background: '#e05a5a',
                border: 'none', borderRadius: 'var(--radius-full)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                color: 'white', fontWeight: '600',
              }}>Delete</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
