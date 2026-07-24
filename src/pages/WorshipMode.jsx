/**
 * WorshipMode.jsx  —  /worship
 * Full worship experience with music player, ambient effects, song library.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Music } from 'lucide-react'
import Navbar from '../components/Navbar'
import AmbientEffects from '../components/Worship/AmbientEffects'
import SongCard from '../components/Worship/SongCard'
import MusicPlayer from '../components/Worship/MusicPlayer'
import { useMusicPlayer } from '../hooks/useMusicPlayer'
import { worshipSongs } from '../data/worshipSongs'

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit:   { opacity: 0, transition: { duration: 0.3 } },
}

const CATEGORIES = ['All', 'Praise', 'Worship', 'Gospel']
const LANGUAGES  = ['All', 'Amharic', 'Oromo', 'English']

export default function WorshipMode() {
  const player = useMusicPlayer()
  const [catFilter, setCatFilter] = useState('All')
  const [langFilter, setLangFilter] = useState('All')

  const filtered = worshipSongs.filter(s =>
    (catFilter  === 'All' || s.category === catFilter) &&
    (langFilter === 'All' || s.language === langFilter)
  )

  const { currentSong, isPlaying, play, pause } = player

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden" animate="visible" exit="exit"
      style={{ minHeight: '100vh', background: 'var(--gradient-hero)', paddingBottom: '100px' }}
    >
      <Navbar />

      {/* Hero header with ambient effects */}
      <header style={{
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(6rem, 12vw, 9rem) 1.5rem clamp(2.5rem, 5vw, 4rem)',
        textAlign: 'center', minHeight: '380px', display: 'flex', alignItems: 'center',
      }}>
        <AmbientEffects isPlaying={isPlaying} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto', width: '100%' }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem',
              fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: '600',
              color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Music size={12} aria-hidden="true" />
            Worship Mode ✦ {worshipSongs.length} Songs
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: '600', color: 'white', margin: '0 0 0.75rem', letterSpacing: '-0.03em',
            }}
          >
            Ethiopian Praise &amp; Worship
          </motion.h1>

          {/* Currently playing */}
          {currentSong && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem',
              }}
            >
              {isPlaying && (
                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px' }}>
                  {[0.7,1,0.5,0.9].map((h, i) => (
                    <motion.div key={i} animate={{ scaleY: [h, 1, h*0.4, 1, h] }}
                      transition={{ duration: 0.7, delay: i*0.1, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: '2px', height: '16px', borderRadius: '2px', background: 'var(--gold-light)', transformOrigin: 'bottom' }}
                    />
                  ))}
                </div>
              )}
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'white', fontWeight: '500' }}>
                {isPlaying ? 'Now Playing: ' : 'Paused: '}
                <strong style={{ color: 'var(--gold-light)' }}>{currentSong.title}</strong>
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
                — {currentSong.artist}
              </span>
            </motion.div>
          )}
        </div>
      </header>

      {/* Song library */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 1.5rem' }}>
        {/* Filter row */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              style={{
                padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${catFilter === c ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.12)'}`,
                background: catFilter === c ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.05)',
                color: catFilter === c ? 'var(--gold-light)' : 'rgba(255,255,255,0.55)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
              aria-pressed={catFilter === c}
            >{c}</button>
          ))}
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.25rem' }} aria-hidden="true" />
          {LANGUAGES.map(l => (
            <button key={l} onClick={() => setLangFilter(l)}
              style={{
                padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${langFilter === l ? 'rgba(91,44,131,0.55)' : 'rgba(255,255,255,0.1)'}`,
                background: langFilter === l ? 'rgba(91,44,131,0.15)' : 'rgba(255,255,255,0.04)',
                color: langFilter === l ? 'var(--primary-purple-light)' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                transition: 'all 0.2s ease',
              }}
              aria-pressed={langFilter === l}
            >{l}</button>
          ))}
        </div>

        {/* Songs grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filtered.map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              index={i}
              isActive={currentSong?.id === song.id}
              isPlaying={currentSong?.id === song.id && isPlaying}
              onPlay={play}
              onPause={pause}
            />
          ))}
          {filtered.length === 0 && (
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.35)', padding: '2rem' }}>
              No songs match this filter.
            </p>
          )}
        </div>
      </main>

      {/* Fixed music player */}
      <MusicPlayer player={player} />
    </motion.div>
  )
}
