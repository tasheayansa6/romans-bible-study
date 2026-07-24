/**
 * useTheme.js — hook to access ThemeContext. Separated for react-refresh compliance.
 */

import { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

export default useTheme
