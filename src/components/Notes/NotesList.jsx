/**
 * NotesList.jsx
 * Searchable, filterable notes grid with inline edit/delete.
 */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Pencil, Trash2, Plus, BookMarked } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'
import NotesEditor from './NotesEditor'

const NOTE_TYPES = ['All', 'Quick Note', 'Bible Insight', 'Question', 'Sermon Note', 'Favourite Quote']

const TYPE_COLORS = {
  'Quick Note':      { bg: 'rgba(91,44,131,0.08)',  color: 'var(--primary-purple)' },
  'Bible Insight':   { bg: 'rgba(37,117,252,0.09)', color: 'var(--deep-blue)' },
  'Question':        { bg: 'rgba(212,175,55,0.1)',  color: '#a88c1f' },
  'Sermon Note':     { bg: 'rgba(45,138,78,0.09)',  color: '#2d8a4e' },
  'Favourite Quote': { bg: 'rgba(224,90,90,0.08)',  color: '#c0392b' },
}

export default function NotesList() {
  const { notes, deleteNote } = useStudy()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [showNew, setShowNew] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const matchSearch = !search ||
        n.title?.toLowerCase().includes(search.toLowerCase()) ||
        n.content?.toLowerCase().includes(search.toLowerCase()) ||
        n.verseRef?.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === 'All' || n.type === typeFilter
      return matchSearch && matchType
    })
  }, [notes, search, typeFilter])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* New note button */}
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => { setShowNew((p) => !p); setEditingId(null) }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          padding: '0.7rem',
          background: showNew ? 'rgba(91,44,131,0.07)' : 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
          color: showNew ? 'var(--primary-purple)' : 'white',
          border: showNew ? '1.5px dashed rgba(91,44,131,0.3)' : 'none',
          borderRadius: 'var(--radius-lg)', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '600',
          boxShadow: showNew ? 'none' : 'var(--shadow-sm)',
        }}
        aria-label={showNew ? 'Cancel new note' : 'Create new note'}
      >
        <Plus size={16} aria-hidden="true" />
        {showNew ? 'Cancel' : 'New Note'}
      </motion.button>

      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
            <NotesEditor onSave={() => setShowNew(false)} onCancel={() => setShowNew(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search + filter */}
      {notes.length > 0 && (
        <>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} aria-hidden="true" />
            <input
              type="search" placeholder="Search notes…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--text-primary)', background: 'white',
                border: '1.5px solid rgba(91,44,131,0.12)', borderRadius: 'var(--radius-full)',
                padding: '0.6rem 1rem 0.6rem 2.25rem', outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
              onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
              aria-label="Search notes"
            />
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {NOTE_TYPES.map((t) => (
              <button key={t} onClick={() => setTypeFilter(t)}
                style={{
                  padding: '0.25rem 0.8rem', borderRadius: 'var(--radius-full)',
                  border: `1.5px solid ${typeFilter === t ? 'var(--primary-purple)' : 'rgba(91,44,131,0.15)'}`,
                  background: typeFilter === t ? 'rgba(91,44,131,0.1)' : 'transparent',
                  color: typeFilter === t ? 'var(--primary-purple)' : 'var(--text-muted)',
                  cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.73rem', fontWeight: '500',
                }}
                aria-pressed={typeFilter === t}
              >{t}</button>
            ))}
          </div>
        </>
      )}

      {/* Notes grid */}
      {notes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} aria-hidden="true">📝</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-secondary)', margin: '0 0 0.3rem' }}>No notes yet</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Capture Bible insights and thoughts as you study.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '0.85rem' }}>
          <AnimatePresence>
            {filtered.map((note, i) => {
              const tc = TYPE_COLORS[note.type] ?? TYPE_COLORS['Quick Note']
              if (editingId === note.id) {
                return (
                  <motion.div key={note.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ gridColumn: '1 / -1' }}>
                    <NotesEditor note={note} onSave={() => setEditingId(null)} onCancel={() => setEditingId(null)} />
                  </motion.div>
                )
              }
              return (
                <motion.article
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  style={{
                    background: 'white', borderRadius: 'var(--radius-xl)',
                    padding: '1.1rem 1.25rem', boxShadow: 'var(--shadow-sm)',
                    border: '1px solid rgba(91,44,131,0.08)',
                    borderTop: `3px solid ${tc.color}`,
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: '600',
                      letterSpacing: '0.07em', textTransform: 'uppercase',
                      color: tc.color, background: tc.bg,
                      padding: '0.1rem 0.55rem', borderRadius: 'var(--radius-full)',
                    }}>
                      {note.type}
                    </span>
                    <div style={{ display: 'flex', gap: '0.1rem' }}>
                      <button onClick={() => setEditingId(note.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: 'var(--text-muted)' }} aria-label="Edit note"><Pencil size={13} /></button>
                      <button onClick={() => setConfirmDeleteId(note.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: '#e05a5a' }} aria-label="Delete note"><Trash2 size={13} /></button>
                    </div>
                  </div>

                  {note.verseRef && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <BookMarked size={11} color="var(--text-muted)" aria-hidden="true" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '500' }}>{note.verseRef}</span>
                    </div>
                  )}

                  {note.title && (
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{note.title}</h4>
                  )}
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {note.content.length > 140 ? note.content.slice(0, 140) + '…' : note.content}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0 }}>
                    {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>

                  <AnimatePresence>
                    {confirmDeleteId === note.id && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{
                          position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.95)',
                          borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem',
                        }}
                      >
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#c0392b', textAlign: 'center', margin: 0 }}>Delete this note?</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => setConfirmDeleteId(null)} style={{ padding: '0.3rem 0.85rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cancel</button>
                          <button onClick={() => { deleteNote(note.id); setConfirmDeleteId(null) }} style={{ padding: '0.3rem 0.85rem', background: '#e05a5a', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'white', fontWeight: '600' }}>Delete</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              )
            })}
          </AnimatePresence>
          {filtered.length === 0 && notes.length > 0 && (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1.5rem' }}>No notes match your search.</p>
          )}
        </div>
      )}
    </div>
  )
}
