/**
 * useFavorites.js — Favorite verses persistence hook.
 */

import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage('romans-favorites', [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    )
  }, [setFavorites])

  return { favorites, isFavorite, toggleFavorite }
}

export default useFavorites
