/**
 * Verses.jsx  —  /verses — verse library with search, favorites, memory verses.
 */

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VerseCard from '../components/Verses/VerseCard'
import VerseOfTheDay from '../components/Verses/VerseOfTheDay'
import { allVerses } from '../data/allVerses'
import { memoryVerses } from '../data/memoryVerses'
import { useFavorites } from '../hooks/useFavorites'

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
}

const TABS = ['All Verses', 'Favorites', 'Memory Verses']

export default function Verses() {
  const [tab, setTab] = useState('All Verses')
  const [search, setSearch] = useState('')
  const { favorites } = useFavorites()

  // Convert memoryVerses to allVerses-compatible shape
  const memAsVerses = useMemo(() => memoryVerses.map(v => ({
    id: `mv-${v.id}`, ref: v.ref, text: v.text, chapter: v.ref.split(':')[0],
    dayId: v.day, theme: v.theme,
  })), [])

  const pool = tab === 'Memory Verses' ? memAsVerses
    : tab === 'Favorites'   ? allVerses.filter(v => favorites.includes(v.id))
    : allVerses

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return pool
    return pool.filter(v =>
      v.ref.toLowerCase().includes(q) ||
      v.text.toLowerCase().includes(q) ||
      v.theme?.toLowerCase().includes(q) ||
      v.chapter?.toLowerCase().includes(q)
    )
  }, [pool, search])

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      <Navbar />

      <header style={{ background: 'var(--gradient-hero)', padding: 'clamp(5.5rem,10vw,7rem) 1.5rem clamp(2.5rem,5vw,3.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(100px,18vw,250px)', color: 'rgba(255,255,255,0.022)', fontFamily: 'serif', fontWeight: 100, pointerEvents: 'none', userSelect: 'none' }}>✝</span>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem', fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ✦ Verse Library
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: '600', color: 'white', margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}>
            Romans Verses
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(0.95rem,2vw,1.15rem)', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            {allVerses.length} key verses · {memoryVerses.length} memory verses · {favorites.length} favourites
          </motion.p>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(2rem,5vw,3.5rem) 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <VerseOfTheDay />

        {/* Tabs + search */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)',
                  border: `1.5px solid ${tab === t ? 'var(--primary-purple)' : 'rgba(91,44,131,0.15)'}`,
                  background: tab === t ? 'rgba(91,44,131,0.1)' : 'transparent',
                  color: tab === t ? 'var(--primary-purple)' : 'var(--text-muted)',
                  cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: '500',
                  transition: 'all 0.2s ease',
                }}
                aria-pressed={tab === t}
              >{t}</button>
            ))}
          </div>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <Search size={13} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} aria-hidden="true" />
            <input type="search" placeholder="Search verses…" value={search} onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-primary)',
                background: 'white', border: '1.5px solid rgba(91,44,131,0.12)', borderRadius: 'var(--radius-full)',
                padding: '0.5rem 1rem 0.5rem 2.1rem', outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
              onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.12)'}
              aria-label="Search verses"
            />
          </div>
        </div>

        {/* Verse grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }} aria-hidden="true">📖</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-secondary)', margin: '0 0 0.3rem' }}>
              {tab === 'Favorites' ? 'No favourites yet' : 'No verses found'}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {tab === 'Favorites' ? 'Tap the heart icon on any verse to save it.' : 'Try a different search term.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filtered.map((v, i) => <VerseCard key={v.id} verse={v} index={i} />)}
          </div>
        )}
      </main>
      <Footer />
    </motion.div>
  )
}
