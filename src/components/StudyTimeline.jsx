/**
 * StudyTimeline.jsx
 * Vertical timeline of all 21 study days with animated reveal.
 * Gold timeline line with day markers and DayCards in a responsive grid.
 */

import { motion } from 'framer-motion'
import DayCard from './DayCard'

export default function StudyTimeline({ days }) {
  return (
    <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>

      {/* ── Vertical gold timeline line (desktop) ── */}
      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        aria-hidden="true"
        style={{
          display: 'none', /* shown via CSS below */
          position: 'absolute',
          left: '50%',
          top: 0, bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--gold) 8%, var(--gold) 92%, transparent)',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}
        className="timeline-line"
      />

      {/* ── Days Grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {days.map((day, index) => (
          <DayCard key={day.id} day={day} index={index} />
        ))}
      </div>

      {/* Inline style to show timeline on md+ */}
      <style>{`
        @media (min-width: 900px) {
          .timeline-line { display: block !important; }
        }
      `}</style>
    </div>
  )
}
