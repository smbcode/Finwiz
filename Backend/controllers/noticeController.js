import Notice from '../models/Notice.js';

// Seed sample notices for fallback when DB is clean
const SEED_NOTICES = [
  {
    id: 'notice-01',
    title: 'FinHack 2026: Team Registrations Are Now Live!',
    category: 'Hackathon',
    priority: 'Urgent',
    date: '2026-08-28',
    day: '28',
    month: 'AUG',
    summary: 'Registrations are officially open for FinHack 2026. Form your teams (2-4 members) and submit your initial problem pitch by Sep 15.',
    content: 'FinWiz invites all students of NIT Warangal and premier engineering institutes across India to register for FinHack 2026. Teams will tackle real-world challenges in quant finance, DeFi, and AI wealth management. Cash prizes worth ₹1.5 Lakhs + internship opportunities at top trading desks.',
    author: 'Core Technical Committee',
    isPinned: true,
  },
  {
    id: 'notice-02',
    title: "FinTalks Ep. 16: 'High-Frequency Trading Architecture' with Morgan Stanley VP",
    category: 'Session',
    priority: 'High',
    date: '2026-09-05',
    day: '05',
    month: 'SEP',
    summary: 'Join us for an exclusive masterclass on ultra-low-latency C++ systems, kernel bypass, and algorithmic trading infrastructure.',
    content: 'We are thrilled to host an NITW alumnus currently serving as Vice President of Quantitative Execution at Morgan Stanley. Open to all students. Venue: Mini Auditorium & YouTube Live.',
    author: 'Events & PR Team',
    isPinned: true,
  },
  {
    id: 'notice-03',
    title: 'Annual Core & Sub-Core Recruitment Drive 2026',
    category: 'Recruitment',
    priority: 'Normal',
    date: '2026-09-12',
    day: '12',
    month: 'SEP',
    summary: 'Applications open for 1st, 2nd & 3rd year students for Quant Research, Web Development, Design, PR, and Event Management wings.',
    content: 'Are you passionate about finance, coding, design, or community building? FinWiz is looking for ambitious individuals to join our core crew. Round 1 questionnaire link inside portal.',
    author: 'President & General Secretary',
    isPinned: false,
  },
  {
    id: 'notice-04',
    title: 'Warangal Mock Trading Ring 2026 - Rulebook & Terminal Access',
    category: 'Workshop',
    priority: 'Normal',
    date: '2026-09-20',
    day: '20',
    month: 'SEP',
    summary: 'Virtual trading arena setup instructions and credential distribution for the campus-wide mock equity league.',
    content: 'Each participant will receive a virtual capital of ₹10,00,000 to trade simulated live NSE/BSE stocks. The leaderboard top 10 win certificates and direct interview fast-tracks.',
    author: 'Quant & Analytics Division',
    isPinned: false,
  },
];

/**
 * @desc    Get latest notices (max 15, sorted by date descending)
 * @route   GET /api/notices
 * @access  Public
 */
export const getNotices = async (req, res) => {
  try {
    let notices = [];
    try {
      notices = await Notice.find()
        .sort({ isPinned: -1, createdAt: -1, date: -1 })
        .limit(15);
    } catch {
      // In-memory fallback
    }

    if (!notices || notices.length === 0) {
      notices = SEED_NOTICES;
    }

    return res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create new notice (Admin only)
 * @route   POST /api/notices
 * @access  Private / Admin
 */
export const createNotice = async (req, res) => {
  try {
    const { title, summary, content, category, priority, isPinned, attachments } = req.body;

    const notice = await Notice.create({
      title,
      summary,
      content,
      category,
      priority,
      isPinned: !!isPinned,
      author: req.user?.name || 'FinWiz Core Committee',
      attachments: attachments || [],
    });

    return res.status(201).json({ success: true, data: notice });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
