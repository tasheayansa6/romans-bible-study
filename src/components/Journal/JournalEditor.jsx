/**
 * JournalEditor.jsx
 * Rich journal entry form — creates or edits an entry.
 * Fields: title, reflection, application, prayer, mood, tags.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X, Tag } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'
import { romansStudy } from '../../data/romansStudy'

const MOODS = ['🙏 Prayerful', '😊 Joyful', '🤔 Reflective', '😔 Struggling', '🔥 Inspired', '☮️ Peaceful']
const PRESET_TAGS = ['Faith', 'Grace', 'Prayer', 'Conviction', 'Praise', 'Promise', 'Challenge']

const inputStyle = {
  width: '100%', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
  color: 'var(--text-primary)', background: 'rgba(91,44,131,0.03)',
  border: '1.5px solid rgba(91,44,131,0.12)', borderRadius: 'var(--radius-md)',
  padding: '0.7rem 1rem', outline: 'none', transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
}

const labelStyle = {
  fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: '600',
  color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase',
  display: 'block', marginBottom: '0.4rem',
}

export default function JournalEditor({ entry = null, dayId = null, onSave, onCancel }) {
  const { addJournalEntry, updateJournalEntry } = useStudy()
  const isEdit = !!entry

  const [form, setForm] = useState({
    title:       entry?.title       ?? '',
    reflection:  entry?.reflection  ?? '',
    application: entry?.application ?? '',
    prayer:      entry?.prayer      ?? '',
    mood:        entry?.mood        ?? '',
    tags:        entry?.tags        ?? [],
    dayId:       entry?.dayId       ?? dayId ?? '',
  })
  const [customTag, setCustomTag] = useState('')
  const [saving, setSaving] = useState(false)

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const toggleTag = (tag) => {
    setForm((p) => ({
      ...p,
      tags: p.tags.includes(tag) ? p.tags.filter((t) => t !== tag) : [...p.tags, tag],
    }))
  }

  const addCustomTag = () => {
    const t = customTag.trim()
    if (t && !form.tags.includes(t)) {
      setForm((p) => ({ ...p, tags: [...p.tags, t] }))
    }
    setCustomTag('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.reflection.trim()) return
    setSaving(true)

    const dayData = romansStudy.find((d) => d.id === Number(form.dayId))
    const payload = {
      ...form,
      dayLabel: dayData ? dayData.day : '',
      chapter:  dayData ? dayData.chapter : '',
    }

    if (isEdit) {
      updateJournalEntry(entry.id, payload)
    } else {
      addJournalEntry(payload)
    }

    setSaving(false)
    onSave?.()
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: 'var(--shadow-md)', border: '1px solid rgba(91,44,131,0.1)',
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '600',
          color: 'var(--text-primary)', margin: 0,
        }}>
          {isEdit ? 'Edit Entry' : '✍️ New Journal Entry'}
        </h2>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', padding: '0.25rem',
          }} aria-label="Cancel">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Date + Day selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Date</label>
          <input
            type="text" readOnly value={new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            style={{ ...inputStyle, cursor: 'default', color: 'var(--text-muted)' }}
          />
        </div>
        <div>
          <label htmlFor="journal-day" style={labelStyle}>Study Day</label>
          <select
            id="journal-day"
            value={form.dayId}
            onChange={set('dayId')}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">Select a day…</option>
            {romansStudy.map((d) => (
              <option key={d.id} value={d.id}>{d.day} — {d.chapter}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="journal-title" style={labelStyle}>Entry Title</label>
        <input
          id="journal-title" type="text" placeholder="Give your entry a title…"
          value={form.title} onChange={set('title')}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
          onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
        />
      </div>

      {/* Reflection */}
      <div>
        <label htmlFor="journal-reflection" style={labelStyle}>Reflection — What did God teach me today? *</label>
        <textarea
          id="journal-reflection" required rows={4}
          placeholder="Write your thoughts, insights, and what stood out from today's study…"
          value={form.reflection} onChange={set('reflection')}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
          onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
          onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
        />
      </div>

      {/* Application */}
      <div>
        <label htmlFor="journal-application" style={labelStyle}>Application — How will I live this out?</label>
        <textarea
          id="journal-application" rows={3}
          placeholder="What specific action or attitude change will you make this week?"
          value={form.application} onChange={set('application')}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
          onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
          onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
        />
      </div>

      {/* Prayer */}
      <div>
        <label htmlFor="journal-prayer" style={labelStyle}>Prayer Response</label>
        <textarea
          id="journal-prayer" rows={2}
          placeholder="Write a short prayer in response to what you studied…"
          value={form.prayer} onChange={set('prayer')}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }}
          onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
          onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
        />
      </div>

      {/* Mood */}
      <div>
        <label style={labelStyle}>How are you feeling?</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {MOODS.map((m) => (
            <button
              key={m} type="button" onClick={() => setForm((p) => ({ ...p, mood: p.mood === m ? '' : m }))}
              style={{
                padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: '500',
                border: `1.5px solid ${form.mood === m ? 'var(--primary-purple)' : 'rgba(91,44,131,0.15)'}`,
                background: form.mood === m ? 'rgba(91,44,131,0.1)' : 'transparent',
                color: form.mood === m ? 'var(--primary-purple)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
              }}
              aria-pressed={form.mood === m}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label style={labelStyle}>
          <Tag size={11} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} aria-hidden="true" />
          Tags
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
          {PRESET_TAGS.map((t) => (
            <button
              key={t} type="button" onClick={() => toggleTag(t)}
              style={{
                padding: '0.25rem 0.7rem', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '500',
                border: `1px solid ${form.tags.includes(t) ? 'var(--deep-blue)' : 'rgba(37,117,252,0.2)'}`,
                background: form.tags.includes(t) ? 'rgba(37,117,252,0.1)' : 'transparent',
                color: form.tags.includes(t) ? 'var(--deep-blue)' : 'var(--text-muted)',
                transition: 'all 0.2s ease',
              }}
              aria-pressed={form.tags.includes(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text" placeholder="Add custom tag…"
            value={customTag} onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
            style={{ ...inputStyle, flex: 1, padding: '0.5rem 0.85rem' }}
          />
          <button type="button" onClick={addCustomTag} style={{
            padding: '0.5rem 1rem', background: 'rgba(91,44,131,0.08)',
            border: '1px solid rgba(91,44,131,0.18)', borderRadius: 'var(--radius-md)',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem',
            color: 'var(--primary-purple)', fontWeight: '500',
          }}>
            Add
          </button>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '0.5rem', borderTop: '1px solid rgba(91,44,131,0.07)' }}>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{
            padding: '0.65rem 1.5rem', background: 'transparent',
            border: '1.5px solid rgba(91,44,131,0.15)', borderRadius: 'var(--radius-full)',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            color: 'var(--text-muted)',
          }}>
            Cancel
          </button>
        )}
        <motion.button
          type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          disabled={!form.reflection.trim() || saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.65rem 1.75rem',
            background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
            color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
            cursor: form.reflection.trim() ? 'pointer' : 'not-allowed',
            fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '600',
            opacity: form.reflection.trim() ? 1 : 0.5, boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Save size={15} aria-hidden="true" />
          {saving ? 'Saving…' : isEdit ? 'Update Entry' : 'Save Entry'}
        </motion.button>
      </div>
    </motion.form>
  )
}
