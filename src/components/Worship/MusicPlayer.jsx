/**
 * MusicPlayer.jsx — fixed bottom music player bar.
 */

import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX } from 'lucide-react'

const btnBase = {
  background: 'none', border: 'none', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 'var(--radius-full)', padding: '0.4rem', transition: 'all 0.2s ease',
}

export default function MusicPlayer({ player }) {
  const { currentSong, isPlaying, volume, progress, duration, isShuffle, isRepeat,
          togglePlay, next, prev, seek, setVolume, toggleShuffle, toggleRepeat, formatTime } = player

  if (!currentSong) return null

  const currentTime = (progress / 100) * (duration || 0)

  const handleProgressClick = (e) => {
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    seek(((e.clientX - rect.left) / rect.width) * 100)
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', damping: 20 }}
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2000,
        background: 'rgba(10,5,21,0.92)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(212,175,55,0.2)',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
        padding: '0.6rem 1.5rem 0.75rem',
      }}
      role="region"
      aria-label="Music player"
    >
      {/* Progress bar */}
      <div
        onClick={handleProgressClick}
        style={{
          height: '3px', borderRadius: 'var(--radius-full)',
          background: 'rgba(255,255,255,0.12)', cursor: 'pointer', marginBottom: '0.65rem',
          position: 'relative',
        }}
        role="slider"
        aria-label="Song progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            background: 'linear-gradient(to right, var(--primary-purple), var(--deep-blue))',
            borderRadius: 'var(--radius-full)',
            width: `${progress}%`,
            transition: 'width 0.3s linear',
          }}
        />
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          left: `${progress}%`, marginLeft: '-5px',
          width: '10px', height: '10px', borderRadius: '50%',
          background: 'var(--gold)', boxShadow: '0 0 6px rgba(212,175,55,0.6)',
        }} aria-hidden="true" />
      </div>

      {/* Main controls row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Song info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: '600', fontSize: '0.85rem',
            color: 'var(--gold-light)', margin: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{currentSong.title}</p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.5)', margin: 0,
          }}>{currentSong.artist}</p>
        </div>

        {/* Playback controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <button
            style={{ ...btnBase, color: isShuffle ? 'var(--gold)' : 'rgba(255,255,255,0.45)', opacity: isShuffle ? 1 : 0.6 }}
            onClick={toggleShuffle}
            aria-label={`Shuffle ${isShuffle ? 'on' : 'off'}`}
          >
            <Shuffle size={15} />
          </button>

          <button
            style={{ ...btnBase, color: 'rgba(255,255,255,0.75)' }}
            onClick={prev}
            aria-label="Previous song"
          >
            <SkipBack size={19} />
          </button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            style={{
              ...btnBase,
              width: '42px', height: '42px', padding: 0,
              background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
              boxShadow: isPlaying ? '0 0 20px rgba(91,44,131,0.6)' : '0 4px 12px rgba(91,44,131,0.35)',
            }}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <Pause  size={18} color="white" aria-hidden="true" />
              : <Play   size={18} color="white" aria-hidden="true" />}
          </motion.button>

          <button
            style={{ ...btnBase, color: 'rgba(255,255,255,0.75)' }}
            onClick={next}
            aria-label="Next song"
          >
            <SkipForward size={19} />
          </button>

          <button
            style={{ ...btnBase, color: isRepeat ? 'var(--gold)' : 'rgba(255,255,255,0.45)', opacity: isRepeat ? 1 : 0.6 }}
            onClick={toggleRepeat}
            aria-label={`Repeat ${isRepeat ? 'on' : 'off'}`}
          >
            <Repeat size={15} />
          </button>
        </div>

        {/* Time */}
        <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>
            {formatTime(currentTime)}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)' }}>
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <button
            style={{ ...btnBase, color: volume > 0 ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)', padding: '0.25rem' }}
            onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
            aria-label={volume > 0 ? 'Mute' : 'Unmute'}
          >
            {volume > 0
              ? <Volume2 size={15} aria-hidden="true" />
              : <VolumeX size={15} aria-hidden="true" />}
          </button>
          <input
            type="range" min="0" max="1" step="0.05" value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            aria-label="Volume"
            style={{
              width: '70px', height: '3px', cursor: 'pointer',
              accentColor: 'var(--primary-purple)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
