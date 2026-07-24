/**
 * achievementDefs.js
 * Achievement definitions — separated so StudyContext only exports components/hooks.
 */

export const ACHIEVEMENT_DEFS = [
  { id: 'started',        emoji: '📖', title: 'Started the Journey',     desc: 'You opened your first study day.',           condition: (p) => p.completedDays.length >= 1 },
  { id: 'first_complete', emoji: '✅', title: 'First Day Complete',       desc: 'You completed your first study session.',    condition: (p) => p.completedDays.length >= 1 },
  { id: 'streak_3',       emoji: '🔥', title: '3-Day Streak',             desc: 'Three days of faithful study.',              condition: (p) => p.streak >= 3 },
  { id: 'streak_7',       emoji: '🔥', title: '7-Day Streak',             desc: 'A full week of daily study!',               condition: (p) => p.streak >= 7 },
  { id: 'streak_14',      emoji: '⚡', title: '14-Day Streak',            desc: 'Two weeks of consistent devotion.',          condition: (p) => p.streak >= 14 },
  { id: 'week_one',       emoji: '📚', title: 'Week One Complete',        desc: 'Finished the first 7 days of Romans.',      condition: (p) => p.completedDays.includes(7) },
  { id: 'midpoint',       emoji: '🌟', title: 'Halfway There',            desc: 'Completed Day 10 — keep going!',            condition: (p) => p.completedDays.includes(10) },
  { id: 'prayer_warrior', emoji: '🕊', title: 'Prayer Warrior',           desc: 'Saved 5 or more prayer requests.',           condition: (_, __, prayers) => prayers.length >= 5 },
  { id: 'journaler',      emoji: '✍️', title: 'Faithful Journaler',      desc: 'Written 5 or more journal entries.',         condition: (_, journal) => journal.length >= 5 },
  { id: 'memory_5',       emoji: '⭐', title: 'Verse Memorizer',          desc: 'Copied or noted 5 memory verses.',           condition: (p) => (p.memorizedVerses || []).length >= 5 },
  { id: 'grace_learner',  emoji: '💙', title: 'Grace Learner',            desc: 'Completed Romans 3–5 (Days 3–5).',          condition: (p) => [3,4,5].every(d => p.completedDays.includes(d)) },
  { id: 'holy_spirit',    emoji: '🌿', title: 'Spirit-Led',               desc: 'Completed the Holy Spirit chapters (8–9).',  condition: (p) => [9,10].every(d => p.completedDays.includes(d)) },
  { id: 'week_two',       emoji: '🏆', title: 'Week Two Complete',        desc: 'Finished Days 8–14.',                       condition: (p) => [8,9,10,11,12,13,14].every(d => p.completedDays.includes(d)) },
  { id: 'graduate',       emoji: '✝',  title: 'Romans Graduate',          desc: 'Completed all 21 days of the journey!',     condition: (p) => p.completedDays.length >= 21 },
]
