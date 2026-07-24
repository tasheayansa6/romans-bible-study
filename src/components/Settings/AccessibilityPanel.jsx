/**
 * AccessibilityPanel.jsx — font size, contrast, motion controls.
 */

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const SIZES = [
  { id: 'sm',  label: 'Small',    px: '14px' },
  { id: 'md',  label: 'Medium',   px: '16px' },
  { id: 'lg',  label: 'Large',    px: '19px' },
  { id: 'xl',  label: 'X-Large',  px: '22px' },
]

const DEFAULT_A11Y = { fontSize: 'md', highContrast: false, reduceMotion: false }

function Toggle({ label, description, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.85rem 0', borderBottom: '1px solid rgba(91,44,131,0.07)' }}>
      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-primary)', margin: '0 0 0.1rem' }}>{label}</p>
        {description && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        style={{
          width: '44px', height: '24px', borderRadius: 'var(--radius-full)',
          background: checked ? 'var(--primary-purple)' : 'rgba(91,44,131,0.15)',
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background 0.25s ease', flexShrink: 0,
        }}
      >
        <motion.span
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            position: 'absolute', top: '2px',
            width: '20px', height: '20px', borderRadius: '50%', background: 'white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)', display: 'block',
          }}
        />
      </button>
    </div>
  )
}

export default function AccessibilityPanel() {
  const [a11y, setA11y] = useLocalStorage('romans-accessibility', DEFAULT_A11Y)

  useEffect(() => {
    const size = SIZES.find(s => s.id === a11y.fontSize) ?? SIZES[1]
    document.documentElement.style.fontSize = size.px

    const root = document.documentElement
    if (a11y.highContrast) {
      root.style.setProperty('--text-primary', '#000000')
      root.style.setProperty('--text-secondary', '#111111')
      root.style.setProperty('--off-white', '#ffffff')
    } else {
      root.style.removeProperty('--text-primary')
      root.style.removeProperty('--text-secondary')
      root.style.removeProperty('--off-white')
    }

    if (a11y.reduceMotion) {
      root.style.setProperty('--transition-fast', '0ms')
      root.style.setProperty('--transition-base', '0ms')
      root.style.setProperty('--transition-slow', '0ms')
    } else {
      root.style.removeProperty('--transition-fast')
      root.style.removeProperty('--transition-base')
      root.style.removeProperty('--transition-slow')
    }
  }, [a11y])

  const set = (key) => (value) => setA11y(prev => ({ ...prev, [key]: value }))

  return (
    <div>
      {/* Font size */}
      <div style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 0.75rem' }}>
          Text Size
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {SIZES.map(size => (
            <button
              key={size.id}
              onClick={() => set('fontSize')(size.id)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${a11y.fontSize === size.id ? 'var(--primary-purple)' : 'rgba(91,44,131,0.15)'}`,
                background: a11y.fontSize === size.id ? 'rgba(91,44,131,0.1)' : 'transparent',
                color: a11y.fontSize === size.id ? 'var(--primary-purple)' : 'var(--text-muted)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: size.px,
                fontWeight: a11y.fontSize === size.id ? '600' : '400',
                transition: 'all 0.2s ease',
              }}
              aria-pressed={a11y.fontSize === size.id}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <Toggle
        label="High Contrast"
        description="Increases text contrast for better readability"
        checked={a11y.highContrast}
        onChange={set('highContrast')}
      />
      <Toggle
        label="Reduce Motion"
        description="Minimizes animations and transitions"
        checked={a11y.reduceMotion}
        onChange={set('reduceMotion')}
      />
    </div>
  )
}
