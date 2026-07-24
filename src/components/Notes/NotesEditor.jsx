/**
 * NotesEditor.jsx
 * Quick note creation / editing form.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'

const NOTE_TYPES = ['Quick Note', 'Bible Insight', 'Question', 'Sermon Note', 'Favourite Quote']

const inputStyle = {
  width: '100%', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
  color: 'var(--text-primary)', background: 'rgba(91,44,131,0.03)',
  border: '1.5px solid rgba(91,44,131,0.12)', borderRadius: 'var(--radius-md)',
  padding: '0.7rem 1rem', outline: 'none', transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
}

const labelStyle = {
  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '600',
  color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase',
  display: 'block', marginBottom: '0.35rem',
}

export default function NotesEditor({ note = null, onSave, onCancel }) {
  const { addNote, updateNote } = useStudy()
  const isEdit = !!note

  const [form, setForm] = useState({
    title:    note?.title    ?? '',
    content:  note?.content  ?? '',
    type:     note?.type     ?? 'Quick Note',
    verseRef: note?.verseRef ?? '',
  })

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.content.trim()) return
    if (isEdit) {
      updateNote(note.id, form)
    } else {
      addNote(form)
    }
    onSave?.()
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleSubmit}
      style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        padding: '1.5rem', boxShadow: 'var(--shadow-md)',
        border: '1px solid rgba(91,44,131,0.1)',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
          {isEdit ? 'Edit Note' : '📝 New Note'}
        </h3>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} aria-label="Cancel">
            <X size={18} />
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
        <div>
          <label htmlFor="note-type" style={labelStyle}>Type</label>
          <select id="note-type" value={form.type} onChange={set('type')} style={{ ...inputStyle, cursor: 'pointer' }}>
            {NOTE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="note-verse" style={labelStyle}>Verse Reference</label>
          <input id="note-verse" type="text" placeholder="e.g. Romans 8:28"
            value={form.verseRef} onChange={set('verseRef')} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
            onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="note-title" style={labelStyle}>Title</label>
        <input id="note-title" type="text" placeholder="Note title…"
          value={form.title} onChange={set('title')} style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
          onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
        />
      </div>

      <div>
        <label htmlFor="note-content" style={labelStyle}>Content *</label>
        <textarea id="note-content" required rows={4}
          placeholder="Write your note, insight, or question…"
          value={form.content} onChange={set('content')}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
          onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end', paddingTop: '0.25rem' }}>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{
            padding: '0.55rem 1.25rem', background: 'transparent',
            border: '1.5px solid rgba(91,44,131,0.15)', borderRadius: 'var(--radius-full)',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)',
          }}>Cancel</button>
        )}
        <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          disabled={!form.content.trim()}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.55rem 1.5rem',
            background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
            color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
            cursor: form.content.trim() ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: '600',
            opacity: form.content.trim() ? 1 : 0.5,
          }}
        >
          <Save size={14} aria-hidden="true" />
          {isEdit ? 'Update Note' : 'Save Note'}
        </motion.button>
      </div>
    </motion.form>
  )
}
