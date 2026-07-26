/**
 * StudySchedule.jsx  —  /schedule
 * Romans Bible Study Plan — table view with reschedule feature for Dibora & Tashee.
 * Each row: Week | Day | Name | Study | Verse | Time | Status
 * Both partners can edit meeting times and mark sessions complete.
 */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit3, Check, X, Clock, BookOpen, RefreshCw, Printer, CheckCircle2, Circle } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
}

// ── Default schedule rows ─────────────────────────────────────
const DEFAULT_SCHEDULE = [
  // Week 1 — The Need for Salvation
  { id:'w1-1', week:1, theme:'The Need for Salvation', day:'Sunday',   chapter:'Romans 1',  verse:'Romans 1:16–17',  time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w1-2', week:1, theme:'The Need for Salvation', day:'Tuesday',  chapter:'Romans 2',  verse:'Romans 2:11',     time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w1-3', week:1, theme:'The Need for Salvation', day:'Thursday', chapter:'Romans 3',  verse:'Romans 3:23–24',  time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w1-4', week:1, theme:'The Need for Salvation', day:'Saturday', chapter:'Romans 4',  verse:'Romans 4:20–21',  time:'7:00 PM – 8:00 PM', completed:false },
  // Week 2 — Saved by Grace
  { id:'w2-1', week:2, theme:'Saved by Grace', day:'Sunday',   chapter:'Romans 5',  verse:'Romans 5:8',      time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w2-2', week:2, theme:'Saved by Grace', day:'Tuesday',  chapter:'Romans 6',  verse:'Romans 6:23',     time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w2-3', week:2, theme:'Saved by Grace', day:'Thursday', chapter:'Romans 7',  verse:'Romans 7:24–25',  time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w2-4', week:2, theme:'Saved by Grace', day:'Saturday', chapter:'Review (Romans 1–7)', verse:'Romans 6:23', time:'7:00 PM – 8:00 PM', completed:false, isReview:true },
  // Week 3 — Life in the Holy Spirit
  { id:'w3-1', week:3, theme:'Life in the Holy Spirit', day:'Sunday',   chapter:'Romans 8',  verse:'Romans 8:1',      time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w3-2', week:3, theme:'Life in the Holy Spirit', day:'Tuesday',  chapter:'Romans 9',  verse:'Romans 9:15–16',  time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w3-3', week:3, theme:'Life in the Holy Spirit', day:'Thursday', chapter:'Romans 10', verse:'Romans 10:9',     time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w3-4', week:3, theme:'Life in the Holy Spirit', day:'Saturday', chapter:'Romans 11', verse:'Romans 11:33',    time:'7:00 PM – 8:00 PM', completed:false },
  // Week 4 — Christian Living
  { id:'w4-1', week:4, theme:'Christian Living', day:'Sunday',   chapter:'Romans 12', verse:'Romans 12:1–2',   time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w4-2', week:4, theme:'Christian Living', day:'Tuesday',  chapter:'Romans 13', verse:'Romans 13:8',     time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w4-3', week:4, theme:'Christian Living', day:'Thursday', chapter:'Romans 14', verse:'Romans 14:19',    time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w4-4', week:4, theme:'Christian Living', day:'Saturday', chapter:'Review (Romans 8–14)', verse:'Romans 12:1–2', time:'7:00 PM – 8:00 PM', completed:false, isReview:true },
  // Week 5 — Unity & Service
  { id:'w5-1', week:5, theme:'Unity & Service', day:'Sunday',   chapter:'Romans 15', verse:'Romans 15:13',    time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w5-2', week:5, theme:'Unity & Service', day:'Tuesday',  chapter:'Romans 16', verse:'Romans 16:25–26', time:'7:00 PM – 8:00 PM', completed:false },
  { id:'w5-3', week:5, theme:'Unity & Service', day:'Thursday', chapter:'Review Part I', verse:'Romans 15:13', time:'7:00 PM – 8:00 PM', completed:false, isReview:true },
  { id:'w5-4', week:5, theme:'Unity & Service', day:'Saturday', chapter:'Review Part II', verse:'Romans 8:38–39', time:'7:00 PM – 8:00 PM', completed:false, isReview:true },
  // Week 6 — Living the Gospel
  { id:'w6-1', week:6, theme:'Living the Gospel', day:'Sunday',   chapter:'Gospel Review',          verse:'Romans 1:16',  time:'7:00 PM – 8:00 PM', completed:false, isReview:true },
  { id:'w6-2', week:6, theme:'Living the Gospel', day:'Tuesday',  chapter:'Memory Verses',          verse:'All Verses',   time:'7:00 PM – 8:00 PM', completed:false, isReview:true },
  { id:'w6-3', week:6, theme:'Living the Gospel', day:'Thursday', chapter:'Prayer & Discussion',    verse:'Romans 15:13', time:'7:00 PM – 8:00 PM', completed:false, isReview:true },
  { id:'w6-4', week:6, theme:'Living the Gospel', day:'Saturday', chapter:'Celebration & Thanksgiving', verse:'Romans 11:36', time:'7:00 PM – 8:00 PM', completed:false, isCelebration:true },
]

const PARTNERS = ['Dibora', 'Tashee']

const WEEK_COLORS = [
  'var(--primary-purple)',
  'var(--deep-blue)',
  '#2d8a4e',
  'var(--gold-dark)',
  '#9b59b6',
  '#c0392b',
]

const DAY_EMOJIS = { Sunday:'🌅', Tuesday:'✝', Thursday:'📖', Saturday:'🙏' }

// ── Inline cell editor ────────────────────────────────────────
function EditableCell({ value, onSave, type = 'text', placeholder = '' }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const save = () => { onSave(draft); setEditing(false) }
  const cancel = () => { setDraft(value); setEditing(false) }

  if (!editing) {
    return (
      <span
        style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
        onClick={() => setEditing(true)}
        title="Click to edit"
      >
        {value}
        <Edit3 size={11} color="rgba(91,44,131,0.4)" aria-hidden="true" />
      </span>
    )
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
      <input
        autoFocus
        type={type}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') cancel() }}
        placeholder={placeholder}
        style={{
          fontFamily: 'var(--font-body)', fontSize: '0.78rem',
          color: 'var(--text-primary)', background: 'white',
          border: '1.5px solid var(--primary-purple)', borderRadius: '6px',
          padding: '0.25rem 0.5rem', outline: 'none', width: '130px',
        }}
      />
      <button onClick={save} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2d8a4e', padding: '2px' }} aria-label="Save">
        <Check size={14} />
      </button>
      <button onClick={cancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', padding: '2px' }} aria-label="Cancel">
        <X size={14} />
      </button>
    </span>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function StudySchedule() {
  const [schedule, setSchedule] = useLocalStorage('romans-schedule', DEFAULT_SCHEDULE)
  const [activePartner, setActivePartner] = useState('Dibora')
  const [filterWeek, setFilterWeek] = useState('All')
  const [showReset, setShowReset] = useState(false)

  const completed = schedule.filter(s => s.completed).length
  const total = schedule.length
  const pct = Math.round((completed / total) * 100)

  // Update a single row field
  const updateRow = (id, field, value) => {
    setSchedule(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  const toggleComplete = (id) => updateRow(id, 'completed', !schedule.find(r => r.id === id)?.completed)

  const handleReset = () => {
    setSchedule(DEFAULT_SCHEDULE)
    setShowReset(false)
  }

  const filtered = useMemo(() =>
    filterWeek === 'All' ? schedule : schedule.filter(r => r.week === Number(filterWeek))
  , [schedule, filterWeek])

  // Group by week for display
  const weeks = useMemo(() => {
    const map = {}
    filtered.forEach(r => {
      if (!map[r.week]) map[r.week] = []
      map[r.week].push(r)
    })
    return map
  }, [filtered])

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      <Navbar />

      {/* ── Hero ── */}
      <header style={{
        background: 'var(--gradient-hero)',
        padding: 'clamp(5.5rem,10vw,7rem) 1.5rem clamp(2.5rem,5vw,4rem)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-15%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(91,44,131,.35) 0%,transparent 70%)', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(37,117,252,.25) 0%,transparent 70%)', filter: 'blur(50px)' }} />
        </div>
        <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(100px,18vw,260px)', color: 'rgba(255,255,255,.022)', fontFamily: 'serif', fontWeight: 100, userSelect: 'none', pointerEvents: 'none' }}>✝</span>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(212,175,55,.12)', border: '1px solid rgba(212,175,55,.3)', borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem', fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ✦ Bible Study Schedule
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5.5vw,4rem)', fontWeight: '600', color: 'white', margin: '0 0 .5rem', letterSpacing: '-.03em' }}>
            Romans Study Plan
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(.95rem,2vw,1.2rem)', color: 'var(--gold-light)', margin: '0 0 .4rem' }}>
            Dibora &amp; Tashee — 6 Weeks · 4 Days/Week
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .28 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '.88rem', color: 'rgba(255,255,255,.5)', margin: 0 }}>
            "Your word is a lamp to my feet and a light to my path." — Psalm 119:105
          </motion.p>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem,5vw,3rem) 1.25rem' }}>

        {/* ── Top controls ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>

          {/* Partner selector */}
          <div style={{ display: 'flex', gap: '.5rem' }}>
            {PARTNERS.map(p => (
              <button key={p} onClick={() => setActivePartner(p)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '.4rem',
                  padding: '.45rem 1.1rem', borderRadius: 'var(--radius-full)',
                  border: `2px solid ${activePartner === p ? 'var(--primary-purple)' : 'rgba(91,44,131,.18)'}`,
                  background: activePartner === p ? 'rgba(91,44,131,.1)' : 'white',
                  color: activePartner === p ? 'var(--primary-purple)' : 'var(--text-secondary)',
                  cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '.85rem', fontWeight: activePartner === p ? '700' : '400',
                  transition: 'all .2s ease', boxShadow: activePartner === p ? 'var(--shadow-sm)' : 'none',
                }}
                aria-pressed={activePartner === p}
              >
                {p === 'Dibora' ? '👑' : '✝'} {p}
              </button>
            ))}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '.75rem', color: 'var(--text-muted)', alignSelf: 'center', marginLeft: '.25rem' }}>
              editing as <strong style={{ color: 'var(--primary-purple)' }}>{activePartner}</strong>
            </span>
          </div>

          {/* Progress pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', background: 'white', borderRadius: 'var(--radius-full)', padding: '.5rem 1.1rem', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,.08)' }}>
            <div style={{ width: '80px', height: '6px', background: 'rgba(91,44,131,.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(to right,var(--primary-purple),var(--deep-blue))', borderRadius: 'var(--radius-full)', transition: 'width .5s ease' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '.78rem', fontWeight: '600', color: 'var(--primary-purple)', whiteSpace: 'nowrap' }}>
              {completed}/{total} sessions
            </span>
          </div>

          {/* Controls right */}
          <div style={{ display: 'flex', gap: '.5rem' }}>
            {/* Week filter */}
            <select value={filterWeek} onChange={e => setFilterWeek(e.target.value)}
              style={{ fontFamily: 'var(--font-body)', fontSize: '.82rem', color: 'var(--text-primary)', background: 'white', border: '1.5px solid rgba(91,44,131,.15)', borderRadius: 'var(--radius-full)', padding: '.4rem .85rem', cursor: 'pointer', outline: 'none' }}
              aria-label="Filter by week"
            >
              <option value="All">All Weeks</option>
              {[1,2,3,4,5,6].map(w => <option key={w} value={w}>Week {w}</option>)}
            </select>

            {/* Print */}
            <button onClick={() => window.print()}
              style={{ display: 'flex', alignItems: 'center', gap: '.35rem', padding: '.4rem .85rem', background: 'white', border: '1.5px solid rgba(91,44,131,.15)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '.78rem', color: 'var(--text-muted)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary-purple)'; e.currentTarget.style.borderColor = 'var(--primary-purple)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(91,44,131,.15)' }}
              aria-label="Print schedule"
            >
              <Printer size={13} aria-hidden="true" /> Print
            </button>

            {/* Reset */}
            <button onClick={() => setShowReset(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '.35rem', padding: '.4rem .85rem', background: 'white', border: '1.5px solid rgba(224,90,90,.25)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '.78rem', color: '#c0392b', transition: 'all .2s' }}
              aria-label="Reset schedule"
            >
              <RefreshCw size={13} aria-hidden="true" /> Reset
            </button>
          </div>
        </div>

        {/* ── Reset confirm ── */}
        <AnimatePresence>
          {showReset && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ background: 'rgba(224,90,90,.07)', border: '1px solid rgba(224,90,90,.2)', borderRadius: 'var(--radius-lg)', padding: '.85rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '.85rem', color: '#c0392b', fontWeight: '500' }}>⚠️ Reset all edits and mark all sessions incomplete?</span>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button onClick={handleReset} style={{ padding: '.3rem .9rem', background: '#e05a5a', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '.78rem', fontWeight: '600' }}>Yes, Reset</button>
                <button onClick={() => setShowReset(false)} style={{ padding: '.3rem .9rem', background: 'transparent', color: 'var(--text-muted)', border: '1px solid rgba(0,0,0,.15)', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '.78rem' }}>Cancel</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Instruction banner ── */}
        <div style={{ background: 'rgba(91,44,131,.05)', border: '1px solid rgba(91,44,131,.15)', borderRadius: 'var(--radius-lg)', padding: '.7rem 1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap' }}>
          <Edit3 size={14} color="var(--primary-purple)" aria-hidden="true" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--primary-purple)' }}>{activePartner}</strong> — click any <strong>Time</strong>, <strong>Study</strong>, or <strong>Verse</strong> cell to edit and reschedule. Changes save automatically. ✓ to mark sessions complete.
          </span>
        </div>

        {/* ── Tables per week ── */}
        {Object.keys(weeks).map((wk) => {
          const rows = weeks[wk]
          const wkColor = WEEK_COLORS[(Number(wk) - 1) % WEEK_COLORS.length]
          const wkCompleted = rows.filter(r => r.completed).length
          const wkTheme = rows[0]?.theme || ''

          return (
            <motion.div key={wk}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }} transition={{ duration: .45 }}
              style={{ marginBottom: '1.75rem', background: 'white', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,.08)', overflow: 'hidden' }}
            >
              {/* Week header */}
              <div style={{ background: `${wkColor}10`, borderBottom: `2px solid ${wkColor}30`, padding: '.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: `${wkColor}18`, border: `2px solid ${wkColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: '.75rem', fontWeight: '800', color: wkColor, flexShrink: 0 }}>W{wk}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '.62rem', fontWeight: '700', letterSpacing: '.1em', textTransform: 'uppercase', color: wkColor, margin: '0 0 .1rem' }}>Week {wk}</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: '600', fontSize: 'clamp(.95rem,2.2vw,1.15rem)', color: 'var(--text-primary)', margin: 0 }}>{wkTheme}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <div style={{ height: '6px', width: '80px', background: 'rgba(91,44,131,.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(wkCompleted / rows.length) * 100}%`, background: wkColor, borderRadius: 'var(--radius-full)', transition: 'width .4s ease' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '.72rem', fontWeight: '600', color: wkColor }}>{wkCompleted}/{rows.length}</span>
                </div>
              </div>

              {/* Scrollable table */}
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
                  <thead>
                    <tr style={{ background: 'rgba(91,44,131,.03)' }}>
                      {['✓','Day','Name (Presenter)','Study Chapter','Memory Verse','Meeting Time','Status'].map((h, i) => (
                        <th key={i} style={{
                          fontFamily: 'var(--font-body)', fontSize: '.65rem', fontWeight: '700',
                          letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)',
                          padding: '.6rem .85rem', textAlign: i === 0 ? 'center' : 'left',
                          borderBottom: '1px solid rgba(91,44,131,.08)', whiteSpace: 'nowrap',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, ri) => (
                      <tr key={row.id}
                        style={{ borderBottom: ri < rows.length - 1 ? '1px solid rgba(91,44,131,.06)' : 'none', background: row.completed ? 'rgba(45,138,78,.03)' : row.isCelebration ? 'rgba(212,175,55,.04)' : row.isReview ? 'rgba(37,117,252,.02)' : 'transparent', transition: 'background .2s' }}
                      >
                        {/* Complete toggle */}
                        <td style={{ padding: '.65rem .85rem', textAlign: 'center', width: '40px' }}>
                          <button onClick={() => toggleComplete(row.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            aria-label={row.completed ? 'Mark incomplete' : 'Mark complete'}
                          >
                            {row.completed
                              ? <CheckCircle2 size={18} color="#2d8a4e" aria-hidden="true" />
                              : <Circle size={18} color="rgba(91,44,131,.3)" aria-hidden="true" />}
                          </button>
                        </td>

                        {/* Day */}
                        <td style={{ padding: '.65rem .85rem', whiteSpace: 'nowrap' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                            {DAY_EMOJIS[row.day] || '📅'} {row.day}
                          </span>
                        </td>

                        {/* Name — editable */}
                        <td style={{ padding: '.65rem .85rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}>
                            <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: `${wkColor}15`, border: `1.5px solid ${wkColor}30`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', flexShrink: 0 }}>
                              {row.presenter === 'Tashee' ? '✝' : '👑'}
                            </span>
                            <EditableCell
                              value={row.presenter || activePartner}
                              onSave={v => updateRow(row.id, 'presenter', v)}
                              placeholder="Name…"
                            />
                          </span>
                        </td>

                        {/* Chapter — editable */}
                        <td style={{ padding: '.65rem .85rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>
                            <BookOpen size={13} color={row.isReview ? 'var(--gold-dark)' : wkColor} aria-hidden="true" />
                            <EditableCell
                              value={row.chapter}
                              onSave={v => updateRow(row.id, 'chapter', v)}
                              placeholder="Chapter…"
                            />
                          </span>
                        </td>

                        {/* Verse — editable */}
                        <td style={{ padding: '.65rem .85rem' }}>
                          <span style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '.8rem', color: wkColor }}>
                            <EditableCell
                              value={row.verse}
                              onSave={v => updateRow(row.id, 'verse', v)}
                              placeholder="Verse ref…"
                            />
                          </span>
                        </td>

                        {/* Time — editable */}
                        <td style={{ padding: '.65rem .85rem', whiteSpace: 'nowrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>
                            <Clock size={12} color="var(--text-muted)" aria-hidden="true" />
                            <EditableCell
                              value={row.time}
                              onSave={v => updateRow(row.id, 'time', v)}
                              placeholder="e.g. 7:00 PM"
                            />
                          </span>
                        </td>

                        {/* Status badge */}
                        <td style={{ padding: '.65rem .85rem' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '.25rem',
                            fontFamily: 'var(--font-body)', fontSize: '.62rem', fontWeight: '700',
                            letterSpacing: '.05em', textTransform: 'uppercase',
                            color: row.completed ? '#2d8a4e' : row.isCelebration ? 'var(--gold-dark)' : row.isReview ? 'var(--deep-blue)' : 'var(--text-muted)',
                            background: row.completed ? 'rgba(45,138,78,.1)' : row.isCelebration ? 'rgba(212,175,55,.1)' : row.isReview ? 'rgba(37,117,252,.08)' : 'rgba(0,0,0,.04)',
                            border: `1px solid ${row.completed ? 'rgba(45,138,78,.25)' : row.isCelebration ? 'rgba(212,175,55,.25)' : 'rgba(0,0,0,.07)'}`,
                            padding: '.15rem .55rem', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
                          }}>
                            {row.completed ? '✓ Done' : row.isCelebration ? '🎉 Celebration' : row.isReview ? '📋 Review' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )
        })}

        {/* ── Summary ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg,var(--primary-purple) 0%,var(--deep-blue) 100%)', borderRadius: 'var(--radius-xl)', padding: 'clamp(1.5rem,4vw,2.25rem)', textAlign: 'center', boxShadow: 'var(--shadow-glow-purple)' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: '600', color: 'white', margin: '0 0 .5rem' }}>
            🤝 Dibora &amp; Tashee — Study Covenant
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '.95rem', color: 'var(--gold-light)', margin: '0 0 1.25rem' }}>
            "Let the word of Christ dwell in you richly…" — Colossians 3:16
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Completed', value: completed, color: '#48bb78' },
              { label: 'Remaining', value: total - completed, color: 'var(--gold-light)' },
              { label: 'Progress',  value: `${pct}%`,          color: 'white' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '700', color, margin: '0 0 .1rem', lineHeight: 1 }}>{value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '.7rem', color: 'rgba(255,255,255,.55)', margin: 0, textTransform: 'uppercase', letterSpacing: '.07em' }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Print styles */}
      <style>{`
        @media print {
          nav, footer, button, .no-print { display: none !important; }
          body { background: white !important; }
          table { font-size: 10pt; }
          th, td { padding: 6px 8px !important; }
        }
      `}</style>

      <Footer />
    </motion.div>
  )
}
