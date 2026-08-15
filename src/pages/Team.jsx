/**
 * Team.jsx  —  /team
 * Our Team page with photos, bios, and contact information.
 */

import { motion } from 'framer-motion'
import { Send, Mail, Phone } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit:   { opacity: 0, transition: { duration: 0.25 } },
}

const TEAM = [
  {
    name: 'Tashee Ayansa',
    role: 'Founder & Lead Developer',
    photo: '/photo_2026-07-23_20-05-32.jpg',
    bio: 'Passionate about combining faith and technology to create meaningful devotional experiences. Driven by the belief that every believer deserves a premium tool to encounter God\'s Word.',
    tags: ['React', 'Design', 'Vision'],
    verse: '"For I am not ashamed of the gospel." — Romans 1:16',
    contacts: [
      { icon: Send,  label: 'Telegram',  value: '@tasheea5',              href: 'https://t.me/tasheea5' },
      { icon: Mail,  label: 'Email',     value: 'tasheayansa6@gmail.com', href: 'mailto:tasheayansa6@gmail.com' },
      { icon: Phone, label: 'Phone',     value: '0926 637 774',           href: 'tel:+251926637774' },
      { icon: null,  label: 'Instagram', value: '@tasheayansa',            href: 'https://instagram.com/tasheayansa', emoji: '📸' },
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' } }),
}

export default function Team() {
  return (
    <motion.div
      variants={pageVariants} initial="hidden" animate="visible" exit="exit"
      style={{ minHeight: '100vh', background: 'var(--off-white)' }}
    >
      <Navbar />

      {/* Dark hero header */}
      <header style={{
        background: 'var(--gradient-hero)',
        padding: 'clamp(5.5rem, 10vw, 7rem) 1.5rem clamp(3rem, 6vw, 5rem)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Orbs */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-15%', left: '-5%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,44,131,0.35) 0%, transparent 70%)', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,117,252,0.25) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        </div>
        <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(120px, 22vw, 320px)', color: 'rgba(255,255,255,0.022)', fontFamily: 'serif', fontWeight: 100, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>✝</span>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 'var(--radius-full)', padding: '0.3rem 1rem', fontSize: '0.72rem', fontFamily: 'var(--font-body)', fontWeight: '600', color: 'var(--gold-light)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            ✦ Meet the Team
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: '600', color: 'white', margin: '0 0 0.75rem', letterSpacing: '-0.03em' }}>
            Our Team
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
            style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.65 }}>
            The hearts behind the Romans 21 Days Journey —<br />
            building bridges between faith and everyday life.
          </motion.p>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(3rem, 6vw, 5rem) 1.5rem' }}>

        {/* ── Study Schedule Banner (FIRST) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(91,44,131,0.06), rgba(37,117,252,0.04))',
            border: '1.5px solid rgba(91,44,131,0.18)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1.25rem',
          }}>
            <div>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary-purple)', display: 'block', marginBottom: '0.35rem' }}>
                📅 Romans Bible Study
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 0.4rem', lineHeight: 1.15 }}>
                Study Plan: Tashee Ayansa
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0 0 0.85rem', lineHeight: 1.6 }}>
                6-week Romans study · 4 sessions/week · Sun, Tue, Thu, Sat · 7:00–8:00 PM
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['Week 1: Romans 1–4', 'Week 2: Romans 5–7', 'Week 3: Romans 8–11', 'Week 4: Romans 12–14', 'Week 5: Romans 15–16', 'Week 6: Celebration'].map((w, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: '500',
                    color: i < 3 ? 'var(--primary-purple)' : 'var(--deep-blue)',
                    background: i < 3 ? 'rgba(91,44,131,0.08)' : 'rgba(37,117,252,0.08)',
                    border: `1px solid ${i < 3 ? 'rgba(91,44,131,0.18)' : 'rgba(37,117,252,0.18)'}`,
                    padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)',
                  }}>{w}</span>
                ))}
              </div>
            </div>
            <motion.a
              href="/schedule"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.75rem 1.6rem',
                background: 'linear-gradient(135deg, var(--primary-purple), var(--deep-blue))',
                color: 'white', textDecoration: 'none', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '600',
                boxShadow: 'var(--shadow-md)', whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              📋 View Full Schedule
            </motion.a>
          </div>
        </motion.div>

        {/* ── Team Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          {TEAM.map((member, i) => (
            <motion.article
              key={member.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              style={{
                background: 'white', borderRadius: 'var(--radius-xl)',
                padding: '2rem', textAlign: 'center',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(91,44,131,0.1)',
                transition: 'box-shadow 0.25s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
            >
              {/* Photo */}
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
                <div style={{
                  width: 'clamp(120px, 20vw, 160px)', height: 'clamp(120px, 20vw, 160px)',
                  borderRadius: '50%', overflow: 'hidden',
                  border: '4px solid var(--gold)',
                  boxShadow: '0 0 30px rgba(212,175,55,0.35), 0 8px 24px rgba(91,44,131,0.2)',
                  margin: '0 auto',
                }}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    loading="lazy"
                  />
                </div>
                {/* Gold ring pulse */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: '-6px', borderRadius: '50%',
                    border: '2px solid var(--gold)', pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Name */}
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 0.35rem', lineHeight: 1.15,
              }}>
                {member.name}
              </h2>

              {/* Role badge */}
              <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: '600',
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: 'var(--primary-purple)', background: 'rgba(91,44,131,0.09)',
                padding: '0.2rem 0.85rem', borderRadius: 'var(--radius-full)',
                marginBottom: '1rem',
              }}>
                {member.role}
              </span>

              {/* Bio */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--text-secondary)', lineHeight: 1.7,
                margin: '0 0 1.25rem',
              }}>
                {member.bio}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {member.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: '600',
                    color: 'var(--deep-blue)', background: 'rgba(37,117,252,0.08)',
                    border: '1px solid rgba(37,117,252,0.18)',
                    padding: '0.1rem 0.6rem', borderRadius: 'var(--radius-full)',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Favourite verse */}
              <blockquote style={{
                margin: '0 0 1.25rem', padding: '0.75rem 1rem',
                background: 'rgba(91,44,131,0.04)',
                borderRadius: 'var(--radius-lg)',
                borderLeft: '3px solid var(--primary-purple)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-heading)', fontStyle: 'italic',
                  fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0,
                }}>
                  {member.verse}
                </p>
              </blockquote>

              {/* Contact links */}
              <div style={{
                borderTop: '1px solid rgba(91,44,131,0.1)',
                paddingTop: '1.1rem',
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 0.75rem' }}>
                  Get in touch
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {member.contacts.map(({ icon: Icon, label, value, href, emoji }) => (
                    <div key={label}>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                            color: 'var(--text-secondary)', textDecoration: 'none',
                            fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                            transition: 'color 0.2s ease', padding: '0.2rem 0',
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-purple)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                          aria-label={`${label}: ${value}`}
                        >
                          <div style={{
                            width: '28px', height: '28px', borderRadius: 'var(--radius-sm)',
                            background: 'rgba(91,44,131,0.08)', border: '1px solid rgba(91,44,131,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            {Icon
                              ? <Icon size={13} color="var(--primary-purple)" aria-hidden="true" />
                              : <span style={{ fontSize: '0.85rem' }} aria-hidden="true">{emoji}</span>}
                          </div>
                          <span>{value}</span>
                        </a>
                      ) : (
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                          color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem', opacity: 0.55,
                        }}>
                          <div style={{
                            width: '28px', height: '28px', borderRadius: 'var(--radius-sm)',
                            background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            {Icon
                              ? <Icon size={13} color="var(--text-muted)" aria-hidden="true" />
                              : <span style={{ fontSize: '0.85rem' }} aria-hidden="true">{emoji}</span>}
                          </div>
                          <span style={{ fontStyle: 'italic' }}>{value}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mission statement */}
        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--deep-blue) 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-glow-purple)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(80px, 15vw, 180px)', color: 'rgba(255,255,255,0.04)', fontFamily: 'serif', fontWeight: 100, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>✝</span>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span aria-hidden="true" style={{ display: 'block', fontSize: '2rem', color: 'var(--gold)', marginBottom: '1rem', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))' }}>✦</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: '600', color: 'white', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
              Our Mission
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 1.5rem' }}>
              To build a digital space where every believer — regardless of background or experience — can encounter the transforming power of Romans, grow in faith, and be equipped for Christian living.
            </p>
            <blockquote style={{ margin: 0 }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', color: 'var(--gold-light)', margin: '0 0 0.5rem', lineHeight: 1.55 }}>
                "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes."
              </p>
              <cite style={{ fontFamily: 'var(--font-body)', fontStyle: 'normal', fontSize: '0.8rem', color: 'rgba(212,175,55,0.75)', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Romans 1:16
              </cite>
            </blockquote>
          </div>
        </motion.section>
      </main>

      <Footer />
    </motion.div>
  )
}
