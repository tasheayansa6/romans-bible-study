/**
 * GlobalSearch.jsx — Ctrl+K modal search across days, verses, memory verses.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen, Star, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { romansStudy } from '../../data/romansStudy'
import { allVerses } from '../../data/allVerses'
import { memoryVerses } from '../../data/memoryVerses'

function highlight(text, query) {
  if (!query || !text) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: 'rgba(212,175,55,0.35)', borderRadius: '2px', padding: '0 1px' }}>{part}</mark>
      : part
  )
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ days: [], verses: [], memory: [] })
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(p => !p)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Focus input when opened
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50) }, [open])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const q = query.trim().toLowerCase()
      if (!q) { setResults({ days: [], verses: [], memory: [] }); return }
      setResults({
        days: romansStudy.filter(d =>
          d.chapter.toLowerCase().includes(q) ||
          d.theme.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q)
        ).slice(0, 4),
        verses: allVerses.filter(v =>
          v.ref.toLowerCase().includes(q) ||
          v.text.toLowerCase().includes(q) ||
          v.theme?.toLowerCase().includes(q)
        ).slice(0, 5),
        memory: memoryVerses.filter(v =>
          v.ref.toLowerCase().includes(q) ||
          v.text.toLowerCase().includes(q) ||
          v.theme?.toLowerCase().includes(q)
        ).slice(0, 3),
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = useCallback((type, id) => {
    if (type === 'day') navigate(`/study/${id}`)
    else navigate('/verses')
    setOpen(false)
    setQuery('')
  }, [navigate])

  const hasResults = results.days.length + results.verses.length + results.memory.length > 0

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.4rem 0.85rem',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 'var(--radius-full)', color: 'rgba(255,255,255,0.65)',
          cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'white' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
        aria-label="Search (Ctrl+K)"
      >
        <Search size={13} aria-hidden="true" />
        <span className="hidden md:inline">Search</span>
        <kbd style={{
          fontFamily: 'var(--font-body)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '3px', padding: '0.05rem 0.3rem',
        }} aria-hidden="true">⌘K</kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(10,5,21,0.75)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
              paddingTop: 'clamp(4rem, 10vh, 8rem)',
              padding: 'clamp(4rem,10vh,8rem) 1rem 1rem',
            }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Global search"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, type: 'spring', damping: 25 }}
              style={{
                width: '100%', maxWidth: '600px',
                background: 'rgba(16,8,32,0.98)',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Search input */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <Search size={18} color="var(--gold)" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search chapters, verses, themes…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    fontFamily: 'var(--font-body)', fontSize: '1rem',
                    color: 'white', caretColor: 'var(--gold)',
                  }}
                  aria-label="Search query"
                />
                {query && (
                  <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: '0.2rem' }} aria-label="Clear search">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Results */}
              <div style={{ maxHeight: '400px', overflowY: 'auto', padding: query ? '0.5rem 0' : '1.5rem', textAlign: query ? 'left' : 'center' }}>
                {!query && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
                    Start typing to search…
                  </p>
                )}
                {query && !hasResults && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '1.5rem' }}>
                    No results for "{query}"
                  </p>
                )}

                {results.days.length > 0 && (
                  <section>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '0.5rem 1.25rem 0.25rem' }}>
                      <BookOpen size={10} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} aria-hidden="true" />
                      Study Days
                    </p>
                    {results.days.map(d => (
                      <button key={d.id} onClick={() => handleSelect('day', d.id)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '0.7rem 1.25rem', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        aria-label={`Go to ${d.day}: ${d.chapter}`}
                      >
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.62rem', color: 'var(--gold)', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block' }}>{d.day}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'white', fontWeight: '500' }}>{highlight(d.chapter, query)}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', display: 'block' }}>{highlight(d.theme, query)}</span>
                      </button>
                    ))}
                  </section>
                )}

                {results.verses.length > 0 && (
                  <section>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '0.5rem 1.25rem 0.25rem' }}>
                      <FileText size={10} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} aria-hidden="true" />
                      Verses
                    </p>
                    {results.verses.map(v => (
                      <button key={v.id} onClick={() => handleSelect('verse', v.id)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '0.7rem 1.25rem', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        aria-label={`View verse ${v.ref}`}
                      >
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--primary-purple)', fontWeight: '600' }}>{v.ref}</span>
                        <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', margin: '0.1rem 0 0', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          "{highlight(v.text, query)}"
                        </p>
                      </button>
                    ))}
                  </section>
                )}

                {results.memory.length > 0 && (
                  <section>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '0.5rem 1.25rem 0.25rem' }}>
                      <Star size={10} style={{ marginRight: '0.3rem', verticalAlign: 'middle' }} aria-hidden="true" />
                      Memory Verses
                    </p>
                    {results.memory.map(v => (
                      <button key={v.id} onClick={() => handleSelect('verse', v.id)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '0.7rem 1.25rem', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        aria-label={`View memory verse ${v.ref}`}
                      >
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--gold)', fontWeight: '600' }}>{v.ref}</span>
                        <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', margin: '0.1rem 0 0', lineHeight: 1.5 }}>
                          "{v.text.slice(0, 80)}{v.text.length > 80 ? '…' : ''}"
                        </p>
                      </button>
                    ))}
                  </section>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
