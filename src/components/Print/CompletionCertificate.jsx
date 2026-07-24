/**
 * CompletionCertificate.jsx — beautiful printable completion certificate.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Printer, Award } from 'lucide-react'
import { useStudy } from '../../hooks/useStudy'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const CERT_STYLES = `
@media print {
  body * { visibility: hidden !important; }
  #certificate-print, #certificate-print * { visibility: visible !important; }
  #certificate-print {
    position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
    background: white;
  }
  .no-print { display: none !important; }
  @page { margin: 1cm; }
}
`

export default function CompletionCertificate() {
  const { stats } = useStudy()
  const [userName, setUserName] = useLocalStorage('romans-user-name', '')
  const [editing, setEditing] = useState(false)
  const [tempName, setTempName] = useState(userName)

  const displayName = userName.trim() || 'Faithful Servant'
  const completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const isComplete = stats.completedCount >= stats.totalDays

  return (
    <div>
      <style>{CERT_STYLES}</style>

      {/* Name editor */}
      <div className="no-print" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {editing ? (
          <>
            <input
              type="text" value={tempName} onChange={e => setTempName(e.target.value)}
              placeholder="Enter your name…"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-primary)',
                background: 'white', border: '1.5px solid rgba(91,44,131,0.2)',
                borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary-purple)'}
              onBlur={e => e.target.style.borderColor = 'rgba(91,44,131,0.2)'}
              aria-label="Your name for the certificate"
            />
            <button
              onClick={() => { setUserName(tempName); setEditing(false) }}
              style={{
                padding: '0.5rem 1.25rem', background: 'var(--primary-purple)', color: 'white',
                border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: '600',
              }}
            >Save Name</button>
          </>
        ) : (
          <button
            onClick={() => { setTempName(userName); setEditing(true) }}
            style={{
              padding: '0.5rem 1.25rem', background: 'rgba(91,44,131,0.08)',
              border: '1.5px solid rgba(91,44,131,0.2)', borderRadius: 'var(--radius-full)',
              cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--primary-purple)',
            }}
          >
            ✏️ {userName ? `Change name (${userName})` : 'Add your name'}
          </button>
        )}

        {isComplete && (
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => window.print()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1.25rem',
              background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
              color: '#1a0a2e', border: 'none', borderRadius: 'var(--radius-full)',
              cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: '600',
            }}
            aria-label="Print certificate"
          >
            <Printer size={14} aria-hidden="true" />
            Print Certificate
          </motion.button>
        )}
      </div>

      {/* Certificate */}
      <div id="certificate-print">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            background: isComplete
              ? 'linear-gradient(135deg, #fdf9f0 0%, #fffdf7 100%)'
              : 'linear-gradient(135deg, #f8f5ff 0%, #fafaf8 100%)',
            border: `6px double ${isComplete ? 'var(--gold)' : 'rgba(91,44,131,0.2)'}`,
            borderRadius: '16px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: isComplete ? '0 8px 40px rgba(212,175,55,0.25)' : 'var(--shadow-sm)',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          {/* Corner ornaments */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
            <span key={pos} aria-hidden="true" style={{
              position: 'absolute',
              ...(pos.includes('top') ? { top: '12px' } : { bottom: '12px' }),
              ...(pos.includes('left') ? { left: '16px' } : { right: '16px' }),
              fontSize: '1.5rem', color: 'var(--gold)', opacity: 0.6,
            }}>✦</span>
          ))}

          {/* Cross watermark */}
          <span aria-hidden="true" style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontSize: '200px', color: 'rgba(91,44,131,0.04)',
            fontFamily: 'serif', fontWeight: 100, lineHeight: 1, pointerEvents: 'none',
          }}>✝</span>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ marginBottom: '1rem' }}>
              <Award size={40} color="var(--gold)" style={{ margin: '0 auto 0.5rem' }} aria-hidden="true" />
            </div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '700',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)',
              margin: '0 0 0.5rem',
            }}>Certificate of Completion</p>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: '700', color: 'var(--primary-purple)', margin: '0 0 0.5rem', lineHeight: 1.1,
            }}>Romans 21 Days Journey</h1>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 2rem',
            }}>This certifies that</p>
            <p style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '600',
              color: isComplete ? 'var(--gold-dark)' : 'var(--text-secondary)',
              borderBottom: '2px solid var(--gold)',
              paddingBottom: '0.4rem', display: 'inline-block',
              minWidth: '280px', margin: '0 0 2rem',
            }}>
              {displayName}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)',
              maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.6,
            }}>
              has faithfully completed the <strong>Romans 21 Days Bible Study Journey</strong>,
              studying all 16 chapters of Romans and growing in Salvation, Faith, Grace,
              the Holy Spirit, and Christian Living.
            </p>

            {isComplete ? (
              <>
                <p style={{
                  fontFamily: 'var(--font-heading)', fontStyle: 'italic',
                  fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0 0 1.5rem',
                }}>
                  "For I am not ashamed of the gospel, because it is the power of God
                  that brings salvation to everyone who believes." — Romans 1:16
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid rgba(212,175,55,0.3)', paddingTop: '1.25rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '1px', width: '180px', background: 'var(--text-muted)', marginBottom: '4px' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-muted)', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Date</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>{completionDate}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ height: '1px', width: '180px', background: 'var(--text-muted)', marginBottom: '4px' }} />
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'var(--text-muted)', margin: 0, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Romans Journey</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>✝ For His Glory</p>
                  </div>
                </div>
              </>
            ) : (
              <div style={{
                padding: '1rem 1.5rem', background: 'rgba(91,44,131,0.06)',
                borderRadius: 'var(--radius-lg)', border: '1px solid rgba(91,44,131,0.12)',
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--primary-purple)', margin: 0, fontWeight: '600' }}>
                  🎯 {stats.completedCount}/{stats.totalDays} Days Complete
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                  Complete all 21 days to unlock your certificate.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
