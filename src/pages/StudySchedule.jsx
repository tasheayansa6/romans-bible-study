/**
 * StudySchedule.jsx  —  /schedule
 * Romans Bible Study Plan for Dibora & Tashee — 6 weeks, 4 days/week.
 */

import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  studyPartners, weeklySchedule, sessionStructure,
  discussionQuestions, prayerList, memoryVerses, covenantItems,
} from '../data/studySchedule'

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
}

const WEEK_COLORS = [
  { bg: 'rgba(91,44,131,0.07)',  border: 'rgba(91,44,131,0.25)',  accent: 'var(--primary-purple)' },
  { bg: 'rgba(37,117,252,0.07)', border: 'rgba(37,117,252,0.25)', accent: 'var(--deep-blue)' },
  { bg: 'rgba(45,138,78,0.07)',  border: 'rgba(45,138,78,0.25)',  accent: '#2d8a4e' },
  { bg: 'rgba(212,175,55,0.08)', border: 'rgba(212,175,55,0.35)', accent: 'var(--gold-dark)' },
  { bg: 'rgba(155,89,182,0.08)', border: 'rgba(155,89,182,0.28)', accent: '#9b59b6' },
  { bg: 'rgba(224,90,90,0.07)',  border: 'rgba(224,90,90,0.25)',  accent: '#c0392b' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' } }),
}

const sectionStyle = {
  background: 'white', borderRadius: 'var(--radius-xl)',
  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
  boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(91,44,131,0.08)',
  marginBottom: '1.5rem',
}

const labelStyle = {
  fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: '700',
  letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)',
  display: 'block', marginBottom: '0.85rem',
}

export default function StudySchedule() {
  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      <Navbar />

      {/* Hero Header */}
      <header style={{
        background: 'var(--gradient-hero)',
        padding: 'clamp(5.5rem, 10vw, 7rem) 1.5rem clamp(3rem, 6vw, 5rem)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-15%', left: '-5%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,44,131,0.35) 0%, transparent 70%)', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,117,252,0.25) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        </div>
        <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(100px,20vw,300px)', color: 'rgba(255,255,255,0.022)', fontFamily: 'serif', fontWeight: 100, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>✝</span>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '740px', margin: '0 auto' }}>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem', fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            ✦ Bible Study Schedule
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: '600', color: 'white', margin: '0 0 0.5rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Romans Study Plan
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', color: 'var(--gold-light)', margin: '0 0 0.5rem' }}>
            For {studyPartners.leader.name} &amp; {studyPartners.partner.name}
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', color: 'rgba(255,255,255,0.55)', margin: '0 0 2rem' }}>
            "Your word is a lamp to my feet and a light to my path." — Psalm 119:105
          </motion.p>

          {/* Info badges */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {[
              { emoji: '📖', label: studyPartners.book },
              { emoji: '📅', label: studyPartners.duration },
              { emoji: '⏰', label: studyPartners.meetingTime },
              { emoji: '📍', label: studyPartners.meetingDays.join(' · ') },
            ].map(({ emoji, label }) => (
              <span key={label} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-full)', padding: '0.35rem 0.85rem',
                fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)',
              }}>
                <span aria-hidden="true">{emoji}</span>{label}
              </span>
            ))}
          </motion.div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 3.5rem) 1.5rem' }}>

        {/* Study Partners */}
        <motion.div variants={cardVariants} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ ...sectionStyle, background: 'linear-gradient(135deg, rgba(91,44,131,0.06), rgba(37,117,252,0.04))', borderTop: '3px solid var(--primary-purple)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🤝 Study Partners
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[studyPartners.leader, studyPartners.partner].map((p, i) => (
              <div key={p.name} style={{
                padding: '1.1rem 1.3rem',
                background: 'white', borderRadius: 'var(--radius-lg)',
                border: `2px solid ${i === 0 ? 'var(--primary-purple)' : 'var(--deep-blue)'}`,
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: i === 0 ? 'rgba(91,44,131,0.12)' : 'rgba(37,117,252,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}
                  aria-hidden="true">{i === 0 ? '👑' : '✝'}</div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 0.1rem' }}>{p.name}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: i === 0 ? 'var(--primary-purple)' : 'var(--deep-blue)', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 6-Week Schedule */}
        <motion.div variants={cardVariants} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📅 6-Week Study Schedule
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {weeklySchedule.map((week, wi) => {
            const clr = WEEK_COLORS[wi]
            return (
              <motion.div key={week.week} variants={cardVariants} custom={wi + 2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-30px' }}
                style={{ background: clr.bg, border: `1.5px solid ${clr.border}`, borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                {/* Week header */}
                <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${clr.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${clr.accent}20`, border: `2px solid ${clr.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: '700', color: clr.accent, flexShrink: 0 }}>
                      W{week.week}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: clr.accent, margin: '0 0 0.1rem' }}>Week {week.week}</p>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{week.theme}</p>
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: clr.accent, fontWeight: '600', background: `${clr.accent}12`, padding: '0.2rem 0.7rem', borderRadius: 'var(--radius-full)' }}>
                    ⭐ {week.memoryVerse}
                  </span>
                </div>

                {/* Sessions grid */}
                <div style={{ padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.65rem' }}>
                  {week.sessions.map((s) => (
                    <div key={s.day} style={{
                      background: s.isCelebration ? `linear-gradient(135deg,${clr.accent}18,${clr.accent}08)` : s.isReview ? 'rgba(212,175,55,0.07)' : 'white',
                      border: `1px solid ${s.isCelebration ? `${clr.accent}35` : s.isReview ? 'rgba(212,175,55,0.25)' : 'rgba(91,44,131,0.08)'}`,
                      borderRadius: 'var(--radius-lg)', padding: '0.75rem 0.9rem',
                    }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 0.25rem' }}>{s.day}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: '600', color: s.isCelebration ? clr.accent : s.isReview ? 'var(--gold-dark)' : 'var(--text-primary)', margin: 0 }}>
                        {s.isCelebration ? '🎉 ' : s.isReview ? '📋 ' : '📖 '}{s.chapter}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Prayer */}
                <div style={{ padding: '0.75rem 1.5rem 1rem', borderTop: `1px solid ${clr.border}` }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                    🙏 {week.prayer}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Session Structure */}
        <motion.div variants={cardVariants} custom={9} initial="hidden" whileInView="visible" viewport={{ once: true }} style={sectionStyle}>
          <span style={labelStyle}>⏱ Every Study Session (60 Minutes)</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 1.25rem' }}>
            Session Structure
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {sessionStructure.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: i % 2 === 0 ? 'rgba(91,44,131,0.04)' : 'transparent', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }} aria-hidden="true">{s.emoji}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: '600', color: 'var(--primary-purple)', minWidth: '130px', flexShrink: 0 }}>{s.time}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '500' }}>{s.activity}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Discussion Questions */}
        <motion.div variants={cardVariants} custom={10} initial="hidden" whileInView="visible" viewport={{ once: true }} style={sectionStyle}>
          <span style={labelStyle}>💬 Daily Discussion Questions</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.5vw, 1.65rem)', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 1.25rem' }}>
            How to Study Each Chapter
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { title: '👁 Observation', color: 'var(--deep-blue)',      bg: 'rgba(37,117,252,0.06)',  qs: discussionQuestions.observation },
              { title: '📖 Interpretation', color: 'var(--primary-purple)', bg: 'rgba(91,44,131,0.05)', qs: discussionQuestions.interpretation },
              { title: '✅ Application', color: '#2d8a4e',               bg: 'rgba(45,138,78,0.06)',   qs: discussionQuestions.application },
            ].map(({ title, color, bg, qs }) => (
              <div key={title} style={{ background: bg, borderRadius: 'var(--radius-lg)', padding: '1.1rem', border: `1px solid ${color}25` }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: '700', color, margin: '0 0 0.75rem', letterSpacing: '0.04em' }}>{title}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {qs.map((q, i) => (
                    <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.4rem', lineHeight: 1.5 }}>
                      <span style={{ color, flexShrink: 0 }}>→</span>{q}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Memory Verses + Prayer List side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <motion.div variants={cardVariants} custom={11} initial="hidden" whileInView="visible" viewport={{ once: true }} style={sectionStyle}>
            <span style={labelStyle}>⭐ Memory Verses</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {memoryVerses.map((v, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 0.85rem', background: 'rgba(91,44,131,0.04)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary-purple)' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: '700', color: 'var(--primary-purple)', background: 'rgba(91,44,131,0.12)', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-full)', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: '500' }}>{v}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={cardVariants} custom={12} initial="hidden" whileInView="visible" viewport={{ once: true }} style={sectionStyle}>
            <span style={labelStyle}>🙏 Prayer List</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {prayerList.map((item, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: '500',
                  color: 'var(--primary-purple)', background: 'rgba(91,44,131,0.08)',
                  border: '1px solid rgba(91,44,131,0.18)',
                  padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
                }}>🙏 {item}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Study Covenant */}
        <motion.div variants={cardVariants} custom={13} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ ...sectionStyle, background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--deep-blue) 100%)', border: 'none' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }} aria-hidden="true">🤝</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: '600', color: 'white', margin: '0.5rem 0 0.3rem' }}>
              Study Covenant
            </h2>
            <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--gold-light)', margin: 0 }}>
              {studyPartners.leader.name} 🤝 {studyPartners.partner.name}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.3rem' }}>We commit to:</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem', marginBottom: '1.5rem' }}>
            {covenantItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.07)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '1px' }} aria-hidden="true">✓</span>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>
          <blockquote style={{ textAlign: 'center', margin: 0 }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--gold-light)', margin: 0 }}>
              "Let the word of Christ dwell in you richly..." — Colossians 3:16
            </p>
          </blockquote>
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  )
}
