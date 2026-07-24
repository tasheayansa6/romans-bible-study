/**
 * JournalHistory.jsx
 * Searchable, filterable list of all journal entries.
 */

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'
import JournalCard from './JournalCard'

const MOODS = ['All', '🙏 Prayerful', '😊 Joyful', '🤔 Reflective', '😔 Struggling', '🔥 Inspired', '☮️ Peaceful']

const inputStyle = {
  fontFamily: 'var(--font-body)', fontSize: '0.88rem',
  color: 'var(--text-primary)', background: 'white',
  border: '1.5px solid rgba(91,44,131,0.12)', borderRadius: 'var(--radius-full)',
  padding: '0.6rem 1rem', outline: 'none', flex: 1,
}

export default function JournalHistory() {
  const { journal } = useStudy()
  const [search, setSearch] = useState('')
  const [moodFilter, setMoodFilter] = useState('All')

  const filtered = useMemo(() => {
    return journal.filter((e) => {
      const matchSearch =
        !search ||
        (e.title?.toLowerCase().includes(search.toLowerCase())) ||
        (e.reflection?.toLowerCase().includes(search.toLowerCase())) ||
        (e.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase())))

      const matchMood = moodFilter === 'All' || e.mood === moodFilter

      return matchSearch && matchMood
    })
  }, [journal, search, moodFilter])

  if (journal.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} aria-hidden="true">📓</p>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-secondary)', margin: '0 0 0.4rem' }}>
          Your journal is empty
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Start writing to capture what God is teaching you.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} aria-hidden="true" />
          <input
            type="search" placeholder="Search entries…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.25rem', width: '100%' }}
            onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
            onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
            aria-label="Search journal entries"
          />
        </div>
        <select
          value={moodFilter} onChange={(e) => setMoodFilter(e.target.value)}
          style={{ ...inputStyle, flex: 'none', cursor: 'pointer', paddingRight: '2rem' }}
          aria-label="Filter by mood"
        >
          {MOODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
        {filtered.length} of {journal.length} entr{journal.length !== 1 ? 'ies' : 'y'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <AnimatePresence>
          {filtered.map((entry, i) => (
            <JournalCard key={entry.id} entry={entry} index={i} />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-muted)', padding: '1.5rem' }}>
            No entries match your search.
          </p>
        )}
      </div>
    </div>
  )
}
