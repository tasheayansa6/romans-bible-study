/**
 * StudyContext.jsx
 * Central state provider for the Phase 3 personal study system.
 * Only exports React components and hooks (required by react-refresh).
 */

import { createContext, useCallback, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { romansStudy } from '../data/romansStudy'
import { ACHIEVEMENT_DEFS } from '../data/achievementDefs'

/* ── LocalStorage keys ──────────────────────────────────── */
const LS_KEYS = {
  PROGRESS:     'romans-progress',
  JOURNAL:      'romans-journal',
  PRAYERS:      'romans-prayers',
  NOTES:        'romans-notes',
  ACHIEVEMENTS: 'romans-achievements',
  LAST_STUDY:   'romans-last-study',
  STREAK:       'romans-streak',
}

/* ── Default state shapes ───────────────────────────────── */
const DEFAULT_PROGRESS = {
  completedDays: [],
  streak: 0,
  lastStudyDate: null,
  memorizedVerses: [],
}

const DEFAULT_STREAK = {
  current: 0,
  longest: 0,
  lastDate: null,
}

/* ── Context ────────────────────────────────────────────── */
const StudyContext = createContext(null)
export default StudyContext

export function StudyProvider({ children }) {
  const [progress,     setProgress]     = useLocalStorage(LS_KEYS.PROGRESS,     DEFAULT_PROGRESS)
  const [journal,      setJournal]       = useLocalStorage(LS_KEYS.JOURNAL,      [])
  const [prayers,      setPrayers]       = useLocalStorage(LS_KEYS.PRAYERS,      [])
  const [notes,        setNotes]         = useLocalStorage(LS_KEYS.NOTES,        [])
  const [achievements, setAchievements]  = useLocalStorage(LS_KEYS.ACHIEVEMENTS, [])
  const [lastStudy,    setLastStudy]     = useLocalStorage(LS_KEYS.LAST_STUDY,   null)
  const [streak,       setStreak]        = useLocalStorage(LS_KEYS.STREAK,       DEFAULT_STREAK)

  /* ── Streak management ──────────────────────────────── */
  const updateStreak = useCallback(() => {
    const today = new Date().toDateString()
    setStreak((prev) => {
      if (prev.lastDate === today) return prev
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const isConsecutive = prev.lastDate === yesterday.toDateString()
      const newCurrent = isConsecutive ? prev.current + 1 : 1
      const newLongest = Math.max(newCurrent, prev.longest)
      return { current: newCurrent, longest: newLongest, lastDate: today }
    })
  }, [setStreak])

  /* ── Mark a day complete ────────────────────────────── */
  const markDayComplete = useCallback(
    (dayId) => {
      const today = new Date().toISOString()
      setProgress((prev) => {
        if (prev.completedDays.includes(dayId)) return prev
        return { ...prev, completedDays: [...prev.completedDays, dayId], lastStudyDate: today }
      })
      setLastStudy({ dayId, date: today })
      updateStreak()
    },
    [setProgress, setLastStudy, updateStreak]
  )

  const isDayComplete = useCallback(
    (dayId) => progress.completedDays.includes(dayId),
    [progress]
  )

  /* ── Next incomplete day ────────────────────────────── */
  const getNextDay = useCallback(() => {
    for (let i = 1; i <= romansStudy.length; i++) {
      if (!progress.completedDays.includes(i)) return i
    }
    return romansStudy.length
  }, [progress.completedDays])

  /* ── Achievement checker ────────────────────────────── */
  const checkAchievements = useCallback(() => {
    const newUnlocks = []
    ACHIEVEMENT_DEFS.forEach((def) => {
      const alreadyUnlocked = achievements.some((a) => a.id === def.id)
      if (!alreadyUnlocked && def.condition(progress, journal, prayers)) {
        newUnlocks.push({ ...def, unlockedAt: new Date().toISOString() })
      }
    })
    if (newUnlocks.length > 0) {
      setAchievements((prev) => [...prev, ...newUnlocks])
    }
    return newUnlocks
  }, [achievements, progress, journal, prayers, setAchievements])

  useEffect(() => {
    checkAchievements()
  }, [progress.completedDays.length, journal.length, prayers.length, streak.current]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Journal CRUD ───────────────────────────────────── */
  const addJournalEntry = useCallback((entry) => {
    const newEntry = { id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...entry }
    setJournal((prev) => [newEntry, ...prev])
    return newEntry
  }, [setJournal])

  const updateJournalEntry = useCallback((id, updates) => {
    setJournal((prev) => prev.map((e) => e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e))
  }, [setJournal])

  const deleteJournalEntry = useCallback((id) => setJournal((prev) => prev.filter((e) => e.id !== id)), [setJournal])

  /* ── Prayer CRUD ────────────────────────────────────── */
  const addPrayer = useCallback((prayer) => {
    const newPrayer = { id: Date.now().toString(), createdAt: new Date().toISOString(), answered: false, answeredAt: null, ...prayer }
    setPrayers((prev) => [newPrayer, ...prev])
    return newPrayer
  }, [setPrayers])

  const updatePrayer = useCallback((id, updates) => {
    setPrayers((prev) => prev.map((p) => p.id === id ? { ...p, ...updates } : p))
  }, [setPrayers])

  const deletePrayer = useCallback((id) => setPrayers((prev) => prev.filter((p) => p.id !== id)), [setPrayers])

  const markPrayerAnswered = useCallback((id) =>
    updatePrayer(id, { answered: true, answeredAt: new Date().toISOString() }),
  [updatePrayer])

  /* ── Notes CRUD ─────────────────────────────────────── */
  const addNote = useCallback((note) => {
    const newNote = { id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), ...note }
    setNotes((prev) => [newNote, ...prev])
    return newNote
  }, [setNotes])

  const updateNote = useCallback((id, updates) => {
    setNotes((prev) => prev.map((n) => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n))
  }, [setNotes])

  const deleteNote = useCallback((id) => setNotes((prev) => prev.filter((n) => n.id !== id)), [setNotes])

  /* ── Stats derivations ──────────────────────────────── */
  const stats = {
    totalDays:        romansStudy.length,
    completedCount:   progress.completedDays.length,
    percentComplete:  Math.round((progress.completedDays.length / romansStudy.length) * 100),
    streak:           streak.current,
    longestStreak:    streak.longest,
    journalCount:     journal.length,
    prayerCount:      prayers.length,
    answeredPrayers:  prayers.filter((p) => p.answered).length,
    noteCount:        notes.length,
    achievementCount: achievements.length,
    nextDay:          getNextDay(),
    completedDays:    progress.completedDays,
  }

  const value = {
    progress, journal, prayers, notes, achievements, lastStudy, streak,
    stats,
    markDayComplete, isDayComplete, getNextDay,
    addJournalEntry, updateJournalEntry, deleteJournalEntry,
    addPrayer, updatePrayer, deletePrayer, markPrayerAnswered,
    addNote, updateNote, deleteNote,
    checkAchievements,
  }

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
}
