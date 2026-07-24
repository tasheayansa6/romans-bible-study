/**
 * ThemeSelector.jsx — visual theme picker with color swatches.
 */

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeSelector() {
  const { themes, activeThemeId, setTheme } = useTheme()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
      {themes.map((theme, i) => {
        const isActive = theme.id === activeThemeId
        return (
          <motion.button
            key={theme.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setTheme(theme.id)}
            style={{
              background: isActive ? 'rgba(91,44,131,0.07)' : 'white',
              border: `2px solid ${isActive ? 'var(--primary-purple)' : 'rgba(91,44,131,0.1)'}`,
              borderRadius: 'var(--radius-xl)',
              padding: '1.1rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.25s ease',
              boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              position: 'relative',
            }}
            aria-pressed={isActive}
            aria-label={`Select ${theme.name} theme`}
          >
            {isActive && (
              <div style={{
                position: 'absolute', top: '10px', right: '10px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: 'var(--primary-purple)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Check size={12} color="white" aria-hidden="true" />
              </div>
            )}

            {/* Color swatches */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '0.75rem' }}>
              {[theme.vars['--primary-purple'], theme.vars['--deep-blue'], theme.vars['--gold']].map((color, ci) => (
                <div key={ci} style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: color, border: '2px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} aria-hidden="true" />
              ))}
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-primary)', margin: '0 0 0.2rem' }}>
              {theme.emoji} {theme.name}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
              {theme.description}
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}
