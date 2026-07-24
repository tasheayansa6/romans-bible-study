/**
 * useLocalStorage.js
 * Custom hook that syncs React state with localStorage.
 * Handles JSON serialization, SSR safety, and storage events.
 */

import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage(key, initialValue) {
  // Read from localStorage on first render (lazy init)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  // Write to localStorage whenever value changes
  const setValue = useCallback(
    (value) => {
      try {
        // Support functional updater pattern
        setStoredValue((prev) => {
          const next = typeof value === 'function' ? value(prev) : value
          window.localStorage.setItem(key, JSON.stringify(next))
          return next
        })
      } catch {
        // Quota exceeded or private-mode — fail silently
      }
    },
    [key]
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      // Reset to the initial value passed at hook instantiation.
      // Intentionally not reactive on `initialValue` to avoid re-render loops.
      setStoredValue(initialValue)
    } catch {
      // fail silently
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Sync across tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch {
          // ignore parse errors from other tabs
        }
      }
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [key])

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage
