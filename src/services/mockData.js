/**
 * =========================================================
 * FINWIZ CLUB NIT WARANGAL - DATA REGISTRY
 * In-code data repository (No external database for notices)
 * =========================================================
 */

export const CLUB_INFO = {
  name: "FINWIZ",
  fullName: "FinWiz - The Finance & FinTech Club",
  college: "National Institute of Technology, Warangal",
  collegeShort: "NIT Warangal",
  tagline: "Finance, Quantitative Modeling & FinTech Engineering",
  description:
    "FinWiz is the official student-run Finance & FinTech club of NIT Warangal, helping students develop practical skills in algorithmic trading, corporate valuation, and financial technology.",
  email: "finwiz@student.nitw.ac.in",
  phone: "+91 870 245 9111",
  address: "NIT Warangal Campus, Hanamkonda, Warangal, Telangana - 506004",
  socials: {
    linkedin: "https://linkedin.com/company/finwiz-nitw",
    instagram: "https://instagram.com/finwiz_nitw",
    github: "https://github.com/finwiz-nitw",
    twitter: "https://twitter.com/finwiz_nitw",
  },
};

export const STATS_DATA = [
  { id: 1, count: "500+", label: "Active Members", desc: "Across all engineering & management branches" },
  { id: 2, count: "40+", label: "Events Conducted", desc: "Simulations, bootcamps, and workshops" },
  { id: 3, count: "₹2.5L+", label: "Prizes Awarded", desc: "Distributed across hackathon editions" },
  { id: 4, count: "3+", label: "Years Active", desc: "Building finance culture on campus" },
];

export const LIVE_TICKER_DATA = [
  { symbol: "NIFTY 50", price: "24,835.40", change: "+0.68%", isPositive: true },
  { symbol: "SENSEX", price: "81,520.10", change: "+0.54%", isPositive: true },
  { symbol: "FINHACK 2026", price: "REGISTRATIONS OPEN", change: "ACTIVE", isPositive: true },
  { symbol: "BTC/USDT", price: "$64,250", change: "+2.15%", isPositive: true },
  { symbol: "ETH/USDT", price: "$3,480", change: "-0.45%", isPositive: false },
  { symbol: "NITW RECRUITMENT", price: "PHASE 1", change: "OPEN", isPositive: true },
  { symbol: "INDIA VIX", price: "12.85", change: "-3.12%", isPositive: true },
];

export const DOMAINS_DATA = [
  {
    id: "algo-trading",
    title: "Algorithmic Trading & Quant",
    desc: "Backtesting quantitative trading models, statistical arbitrage, and order book simulation using Python and C++.",
  },
  {
    id: "defi-blockchain",
    title: "DeFi & Web3 FinTech",
    desc: "Smart contracts, automated market makers (AMMs), decentralized lending protocols, and blockchain architecture.",
  },
  {
    id: "corp-finance",
    title: "Investment Banking & Valuation",
    desc: "Discounted cash flow (DCF) models, comparative company analysis, financial statements, and equity research.",
  },
  {
    id: "fintech-dev",
    title: "FinTech Engineering",
    desc: "Developing payment integration tooling, personal wealth trackers, credit risk models, and quantitative APIs.",
  },
];

export const HACKATHON_DETAILS = {
  name: "FINHACK 2026",
  edition: "Annual National FinTech Hackathon",
  targetDate: "2026-09-25T09:00:00+05:30",
  mode: "Hybrid (Online Prelims + NITW Campus Finals)",
  prizePool: "₹1,50,000",
  teamSize: "2 - 4 Members",
  description:
    "FinHack is NIT Warangal's premier national hackathon challenging developers, quant traders, and product innovators to build high-impact financial technology solutions.",
  tracks: [
    {
      title: "Algorithmic Market Making & Strategy",
      desc: "Build automated trading bots with low latency and statistical risk control.",
    },
    {
      title: "AI-Powered Personal Wealth & Credit",
      desc: "Leverage machine learning and credit modeling for intelligent student and small business financing.",
    },
    {
      title: "Zero-Knowledge & Decentralized Finance",
      desc: "Privacy-preserving on-chain transactions and cross-chain liquidity aggregation.",
    },
    {
      title: "Open Innovation in FinTech",
      desc: "Reimagine insurance, micro-investments, fraud detection, and UPI tooling.",
    },
  ],
};

/**
 * INITIAL NOTICES LIST (Stored inside the code itself)
 * Maximum limit of 10 notices at a time
 */
export const INITIAL_NOTICES = [
  {
    id: "notice-01",
    title: "FinHack 2026: Team Registrations Are Now Live",
    category: "Hackathon",
    priority: "Urgent",
    date: "2026-08-28",
    day: "28",
    month: "AUG",
    summary:
      "Registrations are officially open for FinHack 2026. Form your teams (2-4 members) and submit your initial problem pitch by Sep 15.",
    content:
      "FinWiz invites all students of NIT Warangal and engineering institutes across India to register for FinHack 2026. Teams will tackle real-world challenges in quant finance, DeFi, and AI wealth management. Cash prizes worth ₹1.5 Lakhs and mentorship opportunities.",
    author: "Core Technical Committee",
    isPinned: true,
  },
  {
    id: "notice-02",
    title: "FinTalks Guest Session: Quantitative Execution Architecture",
    category: "Session",
    priority: "High",
    date: "2026-09-05",
    day: "05",
    month: "SEP",
    summary:
      "Join us for an exclusive session on ultra-low-latency C++ systems, market microstructure, and quantitative trading infrastructure.",
    content:
      "We are hosting an interactive session with an industry quantitative trader on market data architecture and execution algos. Venue: Mini Auditorium & Online Stream.",
    author: "Events Team",
    isPinned: true,
  },
  {
    id: "notice-03",
    title: "Annual Core & Sub-Core Recruitment Drive 2026",
    category: "Recruitment",
    priority: "Normal",
    date: "2026-09-12",
    day: "12",
    month: "SEP",
    summary:
      "Applications open for 1st, 2nd & 3rd year students for Quant Research, Web Development, Design, and Event Management wings.",
    content:
      "Are you interested in finance, software development, design, or event organization? FinWiz is recruiting motivated students to join our core team. Questionnaire link is inside the portal.",
    author: "President & General Secretary",
    isPinned: false,
  },
  {
    id: "notice-04",
    title: "Warangal Mock Trading Ring 2026 - Rulebook & Guidelines",
    category: "Workshop",
    priority: "Normal",
    date: "2026-09-20",
    day: "20",
    month: "SEP",
    summary:
      "Virtual trading arena setup instructions and credential distribution for the campus-wide mock equity league.",
    content:
      "Each participant will receive a virtual capital of ₹10,00,000 to trade simulated live NSE/BSE stocks. The leaderboard top 10 win certificates and fast-track interview opportunities.",
    author: "Quant Division",
    isPinned: false,
  },
  {
    id: "notice-05",
    title: "Personal Finance & Tax Planning Bootcamp for Students",
    category: "Workshop",
    priority: "Normal",
    date: "2026-09-24",
    day: "24",
    month: "SEP",
    summary:
      "Learn mutual funds, sovereign gold bonds, tax deductions under new regime, and disciplined student budgeting.",
    content:
      "A hands-on practical masterclass explaining how students and graduating engineers should manage their first paychecks, build emergency funds, and construct passive investment portfolios.",
    author: "Education Wing",
    isPinned: false,
  },
];

export const IDENTITY_DATA = [
  {
    id: 1,
    letter: "L",
    title: "Learners",
    subtitle: "Financial Literacy First",
    desc: "Understanding balance sheets, macroeconomics, derivatives, and monetary policies through interactive workshops and peer study circles.",
  },
  {
    id: 2,
    letter: "B",
    title: "Builders",
    subtitle: "Turning Theory Into Code",
    desc: "Engineering backtesting engines, quantitative indicators, portfolio trackers, and FinTech software from scratch.",
  },
  {
    id: 3,
    letter: "C",
    title: "Connectors",
    subtitle: "Bridging Campus & Industry",
    desc: "Facilitating networking sessions with alumni at investment banks, quant hedge funds, and prominent FinTech startups.",
  },
];
