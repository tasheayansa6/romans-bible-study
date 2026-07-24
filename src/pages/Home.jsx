/**
 * Home.jsx
 * Main landing page — assembles Navbar, Hero, Introduction, and Footer.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import Footer from '../components/Footer'

/* ── Introduction section card data ──────────────────────── */
const INTRO_CARDS = [
  {
    emoji: '📖',
    title: 'Daily Scripture',
    description:
      'Dive deep into the Book of Romans — chapter by chapter, verse by verse — over 21 transformative days.',
  },
  {
    emoji: '🙏',
    title: 'Prayer & Reflection',
    description:
      'Each day includes guided prayer prompts and reflective questions to connect scripture to your daily life.',
  },
  {
    emoji: '✍️',
    title: 'Memory Verses',
    description:
      "Hide God's Word in your heart with curated memory verses that anchor the truths of Romans.",
  },
  {
    emoji: '📓',
    title: 'Journal Your Journey',
    description:
      'Document your spiritual growth with structured journal prompts that deepen your understanding.',
  },
]

/* ── Card entrance animation ──────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Hero ── */}
      <Hero />

      {/* ── Introduction Section ── */}
      <section
        id="intro"
        style={{
          background: 'var(--gradient-section)',
          padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft background orb */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(300px, 60vw, 700px)',
            height: 'clamp(300px, 60vw, 700px)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(91,44,131,0.07) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Section heading */}
          <SectionTitle
            title="Begin Your 21-Day Transformation"
            subtitle="The Book of Romans is the most complete presentation of the gospel ever written. Join thousands on a journey through Paul's masterpiece."
          />

          {/* Feature cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem',
            }}
          >
            {INTRO_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(91,44,131,0.08)',
                  cursor: 'default',
                  transition: 'box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = 'var(--shadow-md)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')
                }
              >
                {/* Emoji icon */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    background:
                      'linear-gradient(135deg, rgba(91,44,131,0.1), rgba(37,117,252,0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                  }}
                  aria-hidden="true"
                >
                  {card.emoji}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.35rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Scripture highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background:
                'linear-gradient(135deg, var(--primary-purple) 0%, var(--deep-blue) 100%)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-glow-purple)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background cross */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(80px, 15vw, 180px)',
                color: 'rgba(255,255,255,0.04)',
                fontFamily: 'serif',
                fontWeight: '100',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              ✝
            </span>

            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                color: 'var(--gold)',
                fontSize: '2rem',
                marginBottom: '1rem',
                filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))',
              }}
            >
              ✦
            </span>

            <blockquote style={{ margin: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
                  color: 'white',
                  lineHeight: 1.55,
                  marginBottom: '1.25rem',
                  fontWeight: '400',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                "I am not ashamed of the gospel, because it is the power of
                God that brings salvation to everyone who believes."
              </p>
              <cite
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'normal',
                  fontSize: '0.9rem',
                  color: 'var(--gold)',
                  fontWeight: '500',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Romans 1:16 (NIV)
              </cite>
            </blockquote>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
              }}
            >
              Fully free. No account required. Just you and God's Word.
            </p>
            <motion.div
              whileHover={{
                scale: 1.04,
                boxShadow: '0 8px 32px rgba(91,44,131,0.45)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/study/1"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2.5rem',
                  background:
                    'linear-gradient(135deg, var(--primary-purple) 0%, var(--deep-blue) 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: 'var(--shadow-md)',
                }}
                aria-label="Begin Day 1 of the Romans study"
              >
                📖 Begin Day 1
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  )
}
