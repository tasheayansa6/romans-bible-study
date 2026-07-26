/**
 * App.jsx — Root component with all routes for Phase 1–4.
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider } from './contexts/ThemeContext'
import { StudyProvider } from './contexts/StudyContext'

import Home            from './pages/Home'
import StudyPlan       from './pages/StudyPlan'
import DailyStudy      from './pages/DailyStudy'
import Dashboard       from './pages/Dashboard'
import Journal         from './pages/Journal'
import PrayerJournalPage from './pages/PrayerJournalPage'
import Notes           from './pages/Notes'
import WorshipMode     from './pages/WorshipMode'
import Certificate     from './pages/Certificate'
import Verses          from './pages/Verses'
import Settings        from './pages/Settings'
import Team            from './pages/Team'
import StudySchedule   from './pages/StudySchedule'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<Home />} />
        <Route path="/study-plan"     element={<StudyPlan />} />
        <Route path="/study/:id"      element={<DailyStudy />} />
        <Route path="/dashboard"      element={<Dashboard />} />
        <Route path="/journal"        element={<Journal />} />
        <Route path="/prayer-journal" element={<PrayerJournalPage />} />
        <Route path="/notes"          element={<Notes />} />
        <Route path="/worship"        element={<WorshipMode />} />
        <Route path="/certificate"    element={<Certificate />} />
        <Route path="/verses"         element={<Verses />} />
        <Route path="/settings"       element={<Settings />} />
        <Route path="/team"           element={<Team />} />
        <Route path="/schedule"       element={<StudySchedule />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <StudyProvider>
          <AnimatedRoutes />
        </StudyProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
