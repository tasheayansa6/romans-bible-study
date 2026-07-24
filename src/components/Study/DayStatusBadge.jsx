/**
 * DayStatusBadge.jsx
 * Small badge shown on DayCard to indicate completion status.
 */

import { CheckCircle2, Clock } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'

export default function DayStatusBadge({ dayId }) {
  const { isDayComplete, stats } = useStudy()

  const completed = isDayComplete(dayId)
  const isCurrent = stats.nextDay === dayId && !completed

  if (completed) {
    return (
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          background: 'rgba(45,138,78,0.12)', border: '1px solid rgba(45,138,78,0.3)',
          color: '#2d8a4e', borderRadius: 'var(--radius-full)',
          padding: '0.15rem 0.6rem',
          fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '600',
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}
        aria-label="Completed"
      >
        <CheckCircle2 size={10} aria-hidden="true" />
        Done
      </span>
    )
  }

  if (isCurrent) {
    return (
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.4)',
          color: 'var(--gold-dark)', borderRadius: 'var(--radius-full)',
          padding: '0.15rem 0.6rem',
          fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '600',
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}
        aria-label="Current day"
      >
        <Clock size={10} aria-hidden="true" />
        Up Next
      </span>
    )
  }

  return null
}
