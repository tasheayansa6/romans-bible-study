/**
 * PrayerJournal.jsx
 * Prayer request form + filtered list with category tabs.
 */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Send } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'
import PrayerCard from './PrayerCard'

const CATEGORIES = ['All', 'Salvation', 'Family', 'Friends', 'Church', 'Work', 'Health', 'Spiritual Growth', 'Gratitude']
const STATUS_TABS = ['All', 'Praying', 'Answered']

const inputStyle = {
  width: '100%', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
  color: 'var(--text-primary)', background: 'white',
  border: '1.5px solid rgba(91,44,131,0.12)', borderRadius: 'var(--radius-md)',
  padding: '0.7rem 1rem', outline: 'none', transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
}

export default function PrayerJournal() {
  const { prayers, addPrayer } = useStudy()
  const [showForm, setShowForm] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [form, setForm] = useState({ request: '', category: 'Spiritual Growth', answer: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.request.trim()) return
    addPrayer(form)
    setForm({ request: '', category: 'Spiritual Growth', answer: '' })
    setShowForm(false)
  }

  const filtered = useMemo(() => {
    return prayers.filter((p) => {
      const catMatch = categoryFilter === 'All' || p.category === categoryFilter
      const statusMatch =
        statusFilter === 'All' ||
        (statusFilter === 'Answered' && p.answered) ||
        (statusFilter === 'Praying' && !p.answered)
      return catMatch && statusMatch
    })
  }, [prayers, categoryFilter, statusFilter])

  const answered = prayers.filter((p) => p.answered).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Stats bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Prayers', value: prayers.length, color: 'var(--primary-purple)' },
          { label: 'Answered',      value: answered,        color: '#2d8a4e' },
          { label: 'Still Praying', value: prayers.length - answered, color: 'var(--deep-blue)' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'white', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,0.07)' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '700', color }}>{value}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Add prayer button */}
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={() => setShowForm((p) => !p)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          padding: '0.75rem', background: showForm ? 'rgba(91,44,131,0.07)' : 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
          color: showForm ? 'var(--primary-purple)' : 'white', border: showForm ? '1.5px dashed rgba(91,44,131,0.3)' : 'none',
          borderRadius: 'var(--radius-lg)', cursor: 'pointer',
          fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '600',
          boxShadow: showForm ? 'none' : 'var(--shadow-sm)',
        }}
        aria-expanded={showForm}
        aria-label={showForm ? 'Close prayer form' : 'Add new prayer request'}
      >
        <Plus size={16} aria-hidden="true" />
        {showForm ? 'Cancel' : 'Add Prayer Request'}
      </motion.button>

      {/* Prayer form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              background: 'white', borderRadius: 'var(--radius-xl)',
              padding: '1.5rem', boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(91,44,131,0.1)',
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}>
              <div>
                <label htmlFor="prayer-cat" style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '0.4rem' }}>Category</label>
                <select id="prayer-cat" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="prayer-req" style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '0.4rem' }}>Prayer Request *</label>
                <textarea
                  id="prayer-req" required rows={3}
                  placeholder="Write your prayer request…"
                  value={form.request} onChange={(e) => setForm((p) => ({ ...p, request: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  disabled={!form.request.trim()}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.6rem 1.5rem',
                    background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
                    color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
                    cursor: form.request.trim() ? 'pointer' : 'not-allowed',
                    fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: '600',
                    opacity: form.request.trim() ? 1 : 0.5,
                  }}
                >
                  <Send size={14} aria-hidden="true" />
                  Submit Prayer
                </motion.button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Filters */}
      {prayers.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {STATUS_TABS.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{
                padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${statusFilter === s ? 'var(--primary-purple)' : 'rgba(91,44,131,0.15)'}`,
                background: statusFilter === s ? 'rgba(91,44,131,0.1)' : 'transparent',
                color: statusFilter === s ? 'var(--primary-purple)' : 'var(--text-muted)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: '500',
              }}
              aria-pressed={statusFilter === s}
            >{s}</button>
          ))}
          <div style={{ width: '1px', background: 'rgba(91,44,131,0.12)', margin: '0 0.25rem' }} aria-hidden="true" />
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategoryFilter(c)}
              style={{
                padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${categoryFilter === c ? 'var(--deep-blue)' : 'rgba(37,117,252,0.15)'}`,
                background: categoryFilter === c ? 'rgba(37,117,252,0.08)' : 'transparent',
                color: categoryFilter === c ? 'var(--deep-blue)' : 'var(--text-muted)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem',
              }}
              aria-pressed={categoryFilter === c}
            >{c}</button>
          ))}
        </div>
      )}

      {/* Prayer list */}
      {prayers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} aria-hidden="true">🙏</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-secondary)', margin: '0 0 0.3rem' }}>No prayers yet</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Add your first prayer request above.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <AnimatePresence>
            {filtered.map((p, i) => <PrayerCard key={p.id} prayer={p} index={i} />)}
          </AnimatePresence>
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1.5rem' }}>
              No prayers match these filters.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
