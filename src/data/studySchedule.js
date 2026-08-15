/**
 * studySchedule.js — Romans Bible Study Plan for Tashee Ayansa
 */

export const studyPartners = {
  leader: { name: 'Tashee', role: 'Study Leader' },
  partner: { name: 'Study Partner', role: 'Study Partner' },
  book: 'Romans (16 Chapters)',
  duration: '6 Weeks',
  meetingTime: '7:00 PM – 8:00 PM',
  meetingDays: ['Sunday', 'Tuesday', 'Thursday', 'Saturday'],
}

export const weeklySchedule = [
  {
    week: 1,
    theme: 'The Need for Salvation',
    sessions: [
      { day: 'Sunday',   chapter: 'Romans 1'  },
      { day: 'Tuesday',  chapter: 'Romans 2'  },
      { day: 'Thursday', chapter: 'Romans 3'  },
      { day: 'Saturday', chapter: 'Romans 4'  },
    ],
    memoryVerse: 'Romans 1:16–17',
    prayer: 'Lord, help us understand the Gospel and trust You completely.',
  },
  {
    week: 2,
    theme: 'Saved by Grace',
    sessions: [
      { day: 'Sunday',   chapter: 'Romans 5'  },
      { day: 'Tuesday',  chapter: 'Romans 6'  },
      { day: 'Thursday', chapter: 'Romans 7'  },
      { day: 'Saturday', chapter: 'Review (Romans 1–7)', isReview: true },
    ],
    memoryVerse: 'Romans 6:23',
    prayer: 'Lord, help us overcome sin and walk in holiness.',
  },
  {
    week: 3,
    theme: 'Life in the Holy Spirit',
    sessions: [
      { day: 'Sunday',   chapter: 'Romans 8'  },
      { day: 'Tuesday',  chapter: 'Romans 9'  },
      { day: 'Thursday', chapter: 'Romans 10' },
      { day: 'Saturday', chapter: 'Romans 11' },
    ],
    memoryVerse: 'Romans 8:1',
    prayer: 'Holy Spirit, guide us every day.',
  },
  {
    week: 4,
    theme: 'Christian Living',
    sessions: [
      { day: 'Sunday',   chapter: 'Romans 12' },
      { day: 'Tuesday',  chapter: 'Romans 13' },
      { day: 'Thursday', chapter: 'Romans 14' },
      { day: 'Saturday', chapter: 'Review (Romans 8–14)', isReview: true },
    ],
    memoryVerse: 'Romans 12:1–2',
    prayer: 'Lord, transform our minds and make us living sacrifices.',
  },
  {
    week: 5,
    theme: 'Unity & Service',
    sessions: [
      { day: 'Sunday',   chapter: 'Romans 15' },
      { day: 'Tuesday',  chapter: 'Romans 16' },
      { day: 'Thursday', chapter: 'Romans Review Part I', isReview: true },
      { day: 'Saturday', chapter: 'Romans Review Part II', isReview: true },
    ],
    memoryVerse: 'Romans 15:13',
    prayer: 'Help us encourage one another and serve faithfully.',
  },
  {
    week: 6,
    theme: 'Living the Gospel',
    sessions: [
      { day: 'Sunday',   chapter: 'Gospel Review', isReview: true },
      { day: 'Tuesday',  chapter: 'Memory Verses', isReview: true },
      { day: 'Thursday', chapter: 'Prayer & Discussion', isReview: true },
      { day: 'Saturday', chapter: 'Celebration & Thanksgiving', isCelebration: true },
    ],
    memoryVerse: 'Romans 15:13',
    prayer: 'Lord, we celebrate what You have done in our hearts through Your Word.',
  },
]

export const sessionStructure = [
  { time: '7:00–7:05 PM', activity: 'Opening Prayer',          emoji: '🙏' },
  { time: '7:05–7:20 PM', activity: 'Read the Chapter Together', emoji: '📖' },
  { time: '7:20–7:35 PM', activity: 'Explain the Chapter',      emoji: '💡' },
  { time: '7:35–7:45 PM', activity: 'Discussion Questions',     emoji: '💬' },
  { time: '7:45–7:55 PM', activity: 'Memory Verse',             emoji: '⭐' },
  { time: '7:55–8:00 PM', activity: 'Closing Prayer',           emoji: '✝' },
]

export const discussionQuestions = {
  observation:    ['What is happening in this chapter?', 'Who is speaking?', 'Who is the audience?'],
  interpretation: ["What does this teach about God?", "What does this teach about Jesus?", "What is the main message?"],
  application:    ['What should I change?', 'What promise can I trust?', 'How can I apply this today?'],
}

export const prayerList = [
  'Spiritual growth', 'Wisdom', 'Faith', 'Love', 'Holiness',
  'Family', 'Friends', 'Church', 'Ethiopia', "Strength to obey God's Word",
]

export const memoryVerses = [
  'Romans 1:16–17', 'Romans 3:23–24', 'Romans 5:8', 'Romans 6:23',
  'Romans 8:1', 'Romans 8:28', 'Romans 10:9–10', 'Romans 12:1–2', 'Romans 15:13',
]

export const covenantItems = [
  'Pray before every study.',
  'Read God\'s Word faithfully.',
  'Listen respectfully to one another.',
  'Encourage each other in Christ.',
  'Apply what we learn.',
  'Keep our study times consistent.',
  'Trust the Holy Spirit to guide us into truth.',
]
