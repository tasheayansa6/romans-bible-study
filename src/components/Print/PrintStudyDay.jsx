/**
 * PrintStudyDay.jsx — print-friendly study day layout with browser print().
 */

import { motion } from 'framer-motion'
import { Printer } from 'lucide-react'

const PRINT_STYLES = `
@media print {
  body * { visibility: hidden !important; }
  #print-study-content, #print-study-content * { visibility: visible !important; }
  #print-study-content { position: fixed; inset: 0; padding: 2cm; font-family: Georgia, serif; }
  .no-print { display: none !important; }
  h1 { font-size: 22pt; } h2 { font-size: 16pt; } h3 { font-size: 13pt; }
  p { font-size: 11pt; line-height: 1.6; }
  blockquote { border-left: 3px solid #5b2c83; padding-left: 1em; margin: 1em 0; }
  .print-section { margin-bottom: 1.5em; page-break-inside: avoid; }
  .print-divider { border: none; border-top: 1px solid #ccc; margin: 1em 0; }
  @page { margin: 2cm; }
}
`

export default function PrintStudyDay({ day }) {
  if (!day) return null

  return (
    <div>
      <style>{PRINT_STYLES}</style>

      {/* Print button */}
      <motion.button
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        onClick={() => window.print()}
        className="no-print"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.65rem 1.5rem',
          background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
          color: 'white', border: 'none', borderRadius: 'var(--radius-full)',
          cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: '600',
          boxShadow: 'var(--shadow-sm)', marginBottom: '1rem',
        }}
        aria-label="Print or save as PDF"
      >
        <Printer size={15} aria-hidden="true" />
        Print / Save as PDF
      </motion.button>

      {/* Printable content */}
      <div id="print-study-content" style={{ display: 'none' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Romans 21 Days Journey</p>
            <h1 style={{ margin: '4px 0 2px', color: '#5b2c83' }}>{day.chapter}</h1>
            <p style={{ fontStyle: 'italic', color: '#666', margin: 0 }}>{day.theme}</p>
            <p style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>{day.day} · Printed {new Date().toLocaleDateString()}</p>
          </div>
          <hr className="print-divider" />

          {day.chapterSummary && (
            <div className="print-section">
              <h2>Chapter Overview</h2>
              <p>{day.chapterSummary}</p>
            </div>
          )}

          {day.keyVerses?.length > 0 && (
            <div className="print-section">
              <h2>Key Verses</h2>
              {day.keyVerses.map((v, i) => (
                <blockquote key={i} style={{ marginBottom: '8px' }}>
                  <p>"{v.text}"</p>
                  <p style={{ fontWeight: 'bold', fontSize: '10pt', color: '#5b2c83' }}>— {v.ref}</p>
                </blockquote>
              ))}
            </div>
          )}

          {day.memoryVerse && (
            <div className="print-section">
              <h2>Memory Verse</h2>
              <blockquote>
                <p>"{day.memoryVerse.text}"</p>
                <p style={{ fontWeight: 'bold', color: '#a88c1f' }}>— {day.memoryVerse.ref}</p>
              </blockquote>
            </div>
          )}

          {day.reflectionQuestions?.length > 0 && (
            <div className="print-section">
              <h2>Reflection Questions</h2>
              <ol style={{ paddingLeft: '1.5em' }}>
                {day.reflectionQuestions.map((q, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>{q}<br /><br />_________________________</li>
                ))}
              </ol>
            </div>
          )}

          {day.homework && (
            <div className="print-section">
              <h2>Daily Homework</h2>
              <p>{day.homework}</p>
              <div style={{ marginTop: '16px', borderTop: '1px solid #ccc', paddingTop: '8px' }}>
                <p style={{ fontStyle: 'italic', color: '#999', fontSize: '10pt' }}>Your response:</p>
                <div style={{ height: '80px', borderBottom: '1px solid #ddd' }} />
              </div>
            </div>
          )}

          {day.prayerFocus && (
            <div className="print-section">
              <h2>Prayer Focus</h2>
              <p style={{ fontStyle: 'italic' }}>{day.prayerFocus}</p>
            </div>
          )}

          <hr className="print-divider" />
          <p style={{ textAlign: 'center', fontSize: '9pt', color: '#bbb' }}>
            Romans 21 Days Journey — "For I am not ashamed of the gospel." Romans 1:16
          </p>
        </div>
      </div>
    </div>
  )
}
