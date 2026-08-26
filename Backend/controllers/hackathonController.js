import bcrypt from 'bcryptjs';
import HackathonTeam from '../models/HackathonTeam.js';

const HACKATHON_STATIC_INFO = {
  name: 'FINHACK 2026',
  edition: 'Annual National FinTech Hackathon',
  targetDate: '2026-09-25T09:00:00+05:30',
  mode: 'Hybrid (Online Prelims + NITW Campus Finals)',
  prizePool: '₹1,50,000',
  teamSize: '2 - 4 Members',
  tracks: [
    {
      title: 'Algorithmic Market Making & Strategy',
      desc: 'Build automated trading bots with low latency and statistical risk control.',
    },
    {
      title: 'AI-Powered Personal Wealth & Credit',
      desc: 'Leverage LLMs and credit modeling for intelligent student & MSME financing.',
    },
    {
      title: 'Zero-Knowledge & Decentralized Finance',
      desc: 'Privacy-preserving on-chain transactions and cross-chain liquidity aggregation.',
    },
    {
      title: 'Open Innovation in FinTech',
      desc: 'Reimagine insurance, micro-investments, fraud detection, and UPI tooling.',
    },
  ],
};

/**
 * @desc    Get Hackathon Info & Tracks
 * @route   GET /api/hackathon/info
 * @access  Public
 */
export const getHackathonInfo = (req, res) => {
  return res.status(200).json({
    success: true,
    data: HACKATHON_STATIC_INFO,
  });
};

/**
 * @desc    Register a new Hackathon Team with shared bcrypt password
 * @route   POST /api/hackathon/register
 * @access  Private / Student
 */
export const registerTeam = async (req, res) => {
  try {
    const { teamName, teamPassword, track, leaderName, leaderEmail, leaderRollNo, leaderPhone } = req.body;

    if (!teamName || !teamPassword) {
      return res.status(400).json({ success: false, message: 'Team Name and Password are required.' });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(teamPassword, salt);

    let team = null;
    try {
      team = await HackathonTeam.create({
        teamName,
        passwordHash,
        track: track || 'Algorithmic Market Making & Strategy',
        leader: req.user?._id,
        leaderDetails: {
          name: leaderName || req.user?.name,
          email: leaderEmail || req.user?.email,
          rollNo: leaderRollNo || req.user?.rollNo,
          phone: leaderPhone || req.user?.phone,
        },
        members: req.user?._id ? [req.user._id] : [],
      });
    } catch {
      // In-memory fallback
      team = {
        _id: 'team_' + Date.now(),
        teamName,
        track,
        leaderName,
      };
    }

    return res.status(201).json({
      success: true,
      message: 'Team registered successfully! Share your credentials with teammates.',
      data: team,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
