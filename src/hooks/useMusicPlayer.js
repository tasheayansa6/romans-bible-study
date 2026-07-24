/**
 * useMusicPlayer.js
 * Custom hook managing audio playback for Worship Mode.
 * Uses HTML Audio API. Persists volume to localStorage.
 */

import { useState, useRef, useEffect } from 'react'
import { worshipSongs } from '../data/worshipSongs'

const VOLUME_KEY = 'romans-volume'

function getSavedVolume() {
  try { return parseFloat(localStorage.getItem(VOLUME_KEY) ?? '0.8') } catch { return 0.8 }
}

export function useMusicPlayer() {
  const audioRef    = useRef(null)
  const isPlayRef   = useRef(false)
  const isRepeatRef = useRef(false)
  const isShuffRef  = useRef(false)

  const [currentIdx,  setCurrentIdx]  = useState(0)
  const [isPlaying,   setIsPlaying]   = useState(false)
  const [volume,      setVolumeState] = useState(getSavedVolume)
  const [progress,    setProgress]    = useState(0)
  const [duration,    setDuration]    = useState(0)
  const [isShuffle,   setIsShuffle]   = useState(false)
  const [isRepeat,    setIsRepeat]    = useState(false)

  // Keep refs in sync with state (avoids stale closure in Audio event handlers)
  useEffect(() => { isPlayRef.current  = isPlaying  }, [isPlaying])
  useEffect(() => { isRepeatRef.current = isRepeat  }, [isRepeat])
  useEffect(() => { isShuffRef.current  = isShuffle }, [isShuffle])

  // Init Audio element once
  useEffect(() => {
    const audio = new Audio()
    audio.volume = getSavedVolume()
    audioRef.current = audio

    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
    }
    const onLoadedMeta = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      if (isRepeatRef.current) {
        audio.currentTime = 0
        audio.play().catch(() => {})
        return
      }
      // advance to next
      setCurrentIdx(prev => {
        if (isShuffRef.current) {
          const r = Math.floor(Math.random() * worshipSongs.length)
          return r === prev ? (r + 1) % worshipSongs.length : r
        }
        return (prev + 1) % worshipSongs.length
      })
    }

    audio.addEventListener('timeupdate',    onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMeta)
    audio.addEventListener('ended',          onEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate',    onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMeta)
      audio.removeEventListener('ended',          onEnded)
    }
  }, []) // run once

  // Load song when index changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = worshipSongs[currentIdx].file
    audio.load()
    setProgress(0)
    setDuration(0)
    if (isPlayRef.current) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [currentIdx])

  // ── Actions ──────────────────────────────────────────────
  function play(song) {
    const idx = worshipSongs.findIndex(s => s.id === song.id)
    if (idx === currentIdx) {
      audioRef.current?.play().catch(() => {})
      setIsPlaying(true)
    } else {
      setIsPlaying(true)
      setCurrentIdx(idx)
    }
  }

  function pause() {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlayRef.current) { audio.pause(); setIsPlaying(false) }
    else { audio.play().catch(() => {}); setIsPlaying(true) }
  }

  function next() {
    setCurrentIdx(prev => {
      if (isShuffRef.current) {
        const r = Math.floor(Math.random() * worshipSongs.length)
        return r === prev ? (r + 1) % worshipSongs.length : r
      }
      return (prev + 1) % worshipSongs.length
    })
  }

  function prev() {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
    } else {
      setCurrentIdx(p => (p - 1 + worshipSongs.length) % worshipSongs.length)
    }
  }

  function seek(pct) {
    const audio = audioRef.current
    if (!audio || !duration) return
    audio.currentTime = (pct / 100) * duration
    setProgress(pct)
  }

  function setVolume(v) {
    const clamped = Math.min(1, Math.max(0, v))
    if (audioRef.current) audioRef.current.volume = clamped
    setVolumeState(clamped)
    try { localStorage.setItem(VOLUME_KEY, String(clamped)) } catch { /* quota */ }
  }

  function toggleShuffle() { setIsShuffle(p => !p) }
  function toggleRepeat()  { setIsRepeat(p => !p) }

  function formatTime(secs) {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return {
    currentSong: worshipSongs[currentIdx],
    currentIdx, isPlaying, volume, progress, duration,
    isShuffle, isRepeat,
    play, pause, togglePlay, next, prev,
    seek, setVolume, toggleShuffle, toggleRepeat, formatTime,
  }
}

export default useMusicPlayer
