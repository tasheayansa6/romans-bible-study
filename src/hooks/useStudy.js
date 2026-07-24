/**
 * useStudy.js
 * Re-exports the useStudy hook from StudyContext so the context file
 * only exports the Provider component (required by react-refresh).
 */
import { useContext } from 'react'
import StudyContext from '../contexts/StudyContext'

export function useStudy() {
  const ctx = useContext(StudyContext)
  if (!ctx) throw new Error('useStudy must be used within <StudyProvider>')
  return ctx
}

export default useStudy
