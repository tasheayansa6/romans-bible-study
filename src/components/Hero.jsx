/**
 * Hero.jsx
 * Full-screen premium landing hero section.
 * Features animated entrance, floating cross, glow effects,
 * floating particles, and a large cross watermark.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Headphones, ChevronDown } from 'lucide-react'

/* ── Framer Motion Variants ────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
}

const floatingCross = {
  animate: {
    y: [-14, 14, -14],
    rotate: [-1.5, 1.5, -1.5],
    transition: { duration: 7, ease: 'easeInOut', repeat: Infinity },
  },
}

/* ── Particle data generator ───────────────────────────────── */
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    color:
      i % 3 === 0
        ? 'rgba(212, 175, 55, 0.55)'
        : i % 3 === 1
        ? 'rgba(91, 44, 131, 0.45)'
        : 'rgba(37, 117, 252, 0.4)',
  }))
}

const PARTICLES = generateParticles(22)

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--gradient-hero)',
      }}
    >
      {/* ── Background: Gradient Orbs ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Purple orb — top left */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: 'clamp(300px, 50vw, 700px)',
            height: 'clamp(300px, 50vw, 700px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(91,44,131,0.38) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Blue orb — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: 'clamp(250px, 45vw, 650px)',
            height: 'clamp(250px, 45vw, 650px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(37,117,252,0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Gold orb — center top */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(150px, 25vw, 400px)',
            height: 'clamp(150px, 25vw, 400px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      {/* ── Floating Particles ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: '-20px',
              width: p.size,
              height: p.size,
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Large Cross Watermark ── */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.018, 0.035, 0.018] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(240px, 45vw, 620px)',
          color: 'white',
          lineHeight: 1,
          fontFamily: 'serif',
          fontWeight: '100',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        ✝
      </motion.div>

      {/* ── Main Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '7rem 1.5rem 4rem',
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Small label */}
        <motion.div variants={fadeIn}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 1rem',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-body)',
              fontWeight: '500',
              color: 'var(--gold-light)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.75rem',
            }}
          >
            <span>✦</span>
            <span>21-Day Bible Study</span>
            <span>✦</span>
          </span>
        </motion.div>

        {/* Floating cross icon */}
        <motion.div
          variants={fadeUp}
          style={{ marginBottom: '1.5rem' }}
        >
          <motion.span
            animate={floatingCross.animate}
            style={{
              display: 'inline-block',
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              filter:
                'drop-shadow(0 0 30px rgba(212,175,55,0.6)) drop-shadow(0 0 60px rgba(91,44,131,0.5))',
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            ✝
          </motion.span>
        </motion.div>

        {/* Main Title */}
        <motion.h1 variants={fadeUp}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              fontWeight: '600',
              color: 'white',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              textShadow: '0 0 60px rgba(255,255,255,0.15)',
            }}
          >
            Romans
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
              fontWeight: '400',
              fontStyle: 'italic',
              background:
                'linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-dark) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginTop: '0.2rem',
              letterSpacing: '0.02em',
            }}
          >
            21 Days Journey
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            margin: '1.5rem auto',
          }}
        >
          <span
            style={{
              height: '1px',
              width: 'clamp(40px, 8vw, 80px)',
              background:
                'linear-gradient(to right, transparent, rgba(212,175,55,0.5))',
            }}
          />
          <span
            style={{
              color: 'var(--gold)',
              fontSize: '1rem',
              opacity: 0.7,
            }}
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            style={{
              height: '1px',
              width: 'clamp(40px, 8vw, 80px)',
              background:
                'linear-gradient(to left, transparent, rgba(212,175,55,0.5))',
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p variants={fadeUp}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.7,
              display: 'block',
              maxWidth: '640px',
              margin: '0 auto 2.5rem',
            }}
          >
            Growing Together in Salvation, Faith, Grace,
            <br />
            the Holy Spirit and Christian Living
          </span>
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Primary CTA */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: '0 8px 32px rgba(91,44,131,0.55), 0 0 0 1px rgba(212,175,55,0.3)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/study-plan"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--deep-blue) 100%)',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 20px rgba(91,44,131,0.45)',
                letterSpacing: '0.01em',
              }}
              aria-label="Start your 21-day Romans journey"
            >
              <BookOpen size={18} aria-hidden="true" />
              Start Journey
            </Link>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: 'transparent',
                color: 'rgba(255,255,255,0.88)',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: '500',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid rgba(212,175,55,0.45)',
                transition: 'all 0.3s ease',
                letterSpacing: '0.01em',
              }}
              aria-label="Go to your personal dashboard"
            >
              <Headphones size={18} aria-hidden="true" />
              My Dashboard
            </Link>
          </motion.div>
        </motion.div>

        {/* Verse teaser */}
        <motion.p
          variants={fadeIn}
          style={{
            fontFamily: 'var(--font-heading)',
            fontStyle: 'italic',
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.4)',
            marginTop: '3rem',
            letterSpacing: '0.02em',
          }}
        >
          "For I am not ashamed of the gospel..." — Romans 1:16
        </motion.p>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          color: 'rgba(255,255,255,0.35)',
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
