/**
 * Dashboard.jsx  —  /dashboard
 * Personal home base: progress, streak, journal, achievements, continue button.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, PenLine, HeartHandshake, StickyNote, Award, LayoutGrid } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useStudy } from '../hooks/useStudy'
import { romansStudy } from '../data/romansStudy'
import ContinueButton from '../components/Study/ContinueButton'
import ProgressCircle from '../components/Dashboard/ProgressCircle'
import StreakCard from '../components/Dashboard/StreakCard'
import JourneyStats from '../components/Dashboard/JourneyStats'
import DailyProgress from '../components/Dashboard/DailyProgress'
import Achievements from '../components/Dashboard/Achievements'
import DashboardCard from '../components/Dashboard/DashboardCard'
import VerseOfTheDay from '../components/Verses/VerseOfTheDay'

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
}

const QUICK_LINKS = [
  { to: '/journal',        icon: PenLine,       label: 'Journal',  color: 'var(--primary-purple)' },
  { to: '/prayer-journal', icon: HeartHandshake,label: 'Prayer',   color: 'var(--deep-blue)' },
  { to: '/notes',          icon: StickyNote,    label: 'Notes',    color: '#a88c1f' },
  { to: '/study-plan',     icon: LayoutGrid,    label: 'Study Plan', color: '#2d8a4e' },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { stats, journal, prayers, achievements } = useStudy()

  const nextDay = romansStudy.find((d) => d.id === stats.nextDay)
  const recentJournal = journal.slice(0, 3)
  const unansweredPrayers = prayers.filter((p) => !p.answered).slice(0, 3)

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden" animate="visible" exit="exit"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}
    >
      <Navbar />

      {/* ── Dark hero header ── */}
      <header style={{
        background: 'var(--gradient-hero)',
        padding: 'clamp(5.5rem, 10vw, 7rem) 1.5rem clamp(2.5rem, 5vw, 3.5rem)',
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,44,131,0.35) 0%, transparent 70%)', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,117,252,0.25) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        </div>
        <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(120px, 22vw, 300px)', color: 'rgba(255,255,255,0.02)', fontFamily: 'serif', fontWeight: '100', pointerEvents: 'none', userSelect: 'none' }}>✝</span>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem',
              fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: '600',
              color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            ✦ Your Journey ✦
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '600', color: 'white', margin: '0 0 0.5rem', letterSpacing: '-0.03em' }}
          >
            {getGreeting()} 👋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.62)', margin: '0 0 1.75rem' }}
          >
            {stats.completedCount === 0
              ? 'Your Romans journey awaits. Ready to begin?'
              : stats.completedCount >= stats.totalDays
                ? 'You completed the 21-Day Journey — To God be the glory!'
                : `You've completed ${stats.completedCount} of 21 days. Keep going!`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.35 }}
            style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <ContinueButton />
            <Link to="/study-plan" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.875rem 1.75rem',
              background: 'transparent', color: 'rgba(255,255,255,0.82)',
              border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)',
              textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '500',
            }}>
              <LayoutGrid size={15} aria-hidden="true" />
              View All Days
            </Link>
          </motion.div>
        </div>
      </header>

      {/* ── Main dashboard grid ── */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Quick links row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px,1fr))', gap: '0.75rem' }}>
          {QUICK_LINKS.map(({ to, icon: Icon, label, color }, i) => (
            <motion.div key={to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Link to={to} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                padding: '1.1rem 0.75rem', background: 'white', borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,0.08)',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
              aria-label={label}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={color} aria-hidden="true" />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: '500', color: 'var(--text-secondary)', textAlign: 'center' }}>{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Row: Progress circle + Streak */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {/* Progress */}
          <DashboardCard custom={0} accent="var(--primary-purple)" aria-labelledby="progress-heading">
            <h3 id="progress-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={16} color="var(--primary-purple)" aria-hidden="true" />
              Journey Progress
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <ProgressCircle percent={stats.percentComplete} completed={stats.completedCount} total={stats.totalDays} />
              <div style={{ flex: 1, minWidth: '140px' }}>
                {nextDay && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 0.2rem' }}>Next Up</p>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 0.1rem' }}>{nextDay.chapter}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{nextDay.theme}</p>
                  </div>
                )}
                <div style={{ height: '6px', background: 'rgba(91,44,131,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentComplete}%` }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    style={{ height: '100%', background: 'linear-gradient(to right, var(--primary-purple), var(--deep-blue))', borderRadius: 'var(--radius-full)' }}
                    aria-hidden="true"
                  />
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-muted)', margin: '0.3rem 0 0', textAlign: 'right' }}>
                  {stats.totalDays - stats.completedCount} days remaining
                </p>
              </div>
            </div>
          </DashboardCard>

          <StreakCard custom={1} />
        </div>

        {/* Stats tiles */}
        <DashboardCard custom={2} aria-labelledby="stats-heading">
          <h3 id="stats-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 1.25rem' }}>
            Journey Statistics
          </h3>
          <JourneyStats />
        </DashboardCard>

        {/* Daily progress grid */}
        <DashboardCard custom={3} aria-labelledby="daily-progress-heading">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 id="daily-progress-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
              Daily Progress
            </h3>
            <Link to="/study-plan" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--primary-purple)', textDecoration: 'none', fontWeight: '500' }}>
              View all →
            </Link>
          </div>
          <DailyProgress />
        </DashboardCard>

        {/* Row: Achievements + Today's Verse */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {/* Achievements */}
          <DashboardCard custom={4} aria-labelledby="achievements-heading">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 id="achievements-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={16} color="var(--gold-dark)" aria-hidden="true" />
                Achievements
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'white', background: 'var(--primary-purple)', borderRadius: 'var(--radius-full)', padding: '0.05rem 0.5rem', fontWeight: '600' }}>
                  {achievements.length}
                </span>
              </h3>
              <Link to="/dashboard#achievements" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--primary-purple)', textDecoration: 'none', fontWeight: '500' }}>See all →</Link>
            </div>
            <Achievements compact />
          </DashboardCard>

          {/* Today's verse + Recent journal + Prayers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Today's verse */}
            <VerseOfTheDay />

            {/* Recent journal */}
            {recentJournal.length > 0 && (
              <DashboardCard custom={6}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <PenLine size={14} color="var(--primary-purple)" aria-hidden="true" />
                    Recent Journal
                  </h3>
                  <Link to="/journal" style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--primary-purple)', textDecoration: 'none' }}>View all →</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {recentJournal.map((e) => (
                    <div key={e.id} style={{ padding: '0.6rem 0.85rem', background: 'rgba(91,44,131,0.04)', borderRadius: 'var(--radius-md)', borderLeft: '2px solid rgba(91,44,131,0.2)' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: '500', color: 'var(--text-primary)', margin: '0 0 0.1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.title || 'Untitled'}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>{new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            )}

            {/* Active prayers */}
            {unansweredPrayers.length > 0 && (
              <DashboardCard custom={7}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <HeartHandshake size={14} color="var(--deep-blue)" aria-hidden="true" />
                    Prayer Requests
                  </h3>
                  <Link to="/prayer-journal" style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--deep-blue)', textDecoration: 'none' }}>View all →</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {unansweredPrayers.map((p) => (
                    <div key={p.id} style={{ padding: '0.5rem 0.85rem', background: 'rgba(37,117,252,0.04)', borderRadius: 'var(--radius-md)', borderLeft: '2px solid rgba(37,117,252,0.25)' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>🙏 {p.request.slice(0, 60)}{p.request.length > 60 ? '…' : ''}</p>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            )}
          </div>
        </div>

        {/* All achievements */}
        <DashboardCard custom={8} aria-labelledby="all-achievements-heading" id="achievements">
          <h3 id="all-achievements-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={16} color="var(--gold-dark)" aria-hidden="true" />
            All Achievements
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '400' }}>
              ({achievements.length} / 14 unlocked)
            </span>
          </h3>
          <Achievements />
        </DashboardCard>
      </main>

      <Footer />
    </motion.div>
  )
}
