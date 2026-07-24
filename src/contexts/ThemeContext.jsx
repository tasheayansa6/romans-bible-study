/**
 * ThemeContext.jsx — applies CSS variable themes globally.
 * Only exports ThemeProvider (react-refresh compliant).
 */

import { createContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { THEMES } from '../data/themes'

const ThemeContext = createContext(null)
export default ThemeContext

function applyTheme(themeId) {
  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0]
  const root = document.documentElement
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v))
}

export function ThemeProvider({ children }) {
  const [activeThemeId, setActiveThemeId] = useLocalStorage('romans-theme', 'classic')

  useEffect(() => { applyTheme(activeThemeId) }, [activeThemeId])

  const setTheme = (id) => setActiveThemeId(id)
  const activeTheme = THEMES.find(t => t.id === activeThemeId) ?? THEMES[0]

  return (
    <ThemeContext.Provider value={{ activeThemeId, activeTheme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}
