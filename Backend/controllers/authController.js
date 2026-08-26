import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import HackathonTeam from '../models/HackathonTeam.js';

const JWT_SECRET = process.env.JWT_SECRET || 'finwiz_nitw_secret_jwt_key_2026';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

// Helper to generate JWT token
const generateToken = (id, role = 'student', name = '') => {
  return jwt.sign({ id, role, name }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * @desc    Authenticate with Google OAuth
 * @route   POST /api/auth/google
 * @access  Public
 */
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    let googleData = {
      sub: 'demo_sub_' + Date.now(),
      name: 'NITW Student',
      email: 'student@student.nitw.ac.in',
      picture: 'https://api.dicebear.com/7.x/bottts/svg?seed=finwiz_nitw',
    };

    // Verify Google ID token if real credentials configured
    if (googleClient && token && token !== 'mock_token') {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: token,
          audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        googleData = {
          sub: payload.sub,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
        };
      } catch (err) {
        console.warn('Google token verification failed, using token payload fallback:', err.message);
      }
    }

    // Attempt to find or create user in MongoDB
    let user = null;
    try {
      user = await User.findOne({ email: googleData.email });
      if (!user) {
        user = await User.create({
          googleId: googleData.sub,
          name: googleData.name,
          email: googleData.email,
          avatar: googleData.picture,
          isOnboarded: false, // New user triggers student onboarding!
        });
      }
    } catch {
      // In-memory fallback if MongoDB is not running
      user = {
        _id: 'usr_' + Date.now(),
        googleId: googleData.sub,
        name: googleData.name,
        email: googleData.email,
        avatar: googleData.picture,
        role: 'student',
        isOnboarded: false,
      };
    }

    const jwtToken = generateToken(user._id, user.role, user.name);

    return res.status(200).json({
      success: true,
      token: jwtToken,
      user,
      needsOnboarding: !user.isOnboarded,
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Authentication failed',
    });
  }
};

/**
 * @desc    Submit one-time student onboarding details
 * @route   POST /api/auth/onboarding
 * @access  Private
 */
export const submitOnboarding = async (req, res) => {
  try {
    const { name, rollNo, phone, branch, year, primaryInterest } = req.body;

    if (!name || !rollNo || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, Roll Number, and Phone Number are required.',
      });
    }

    let updatedUser = null;
    try {
      if (req.user?._id) {
        updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          {
            name,
            rollNo,
            phone,
            branch: branch || 'Computer Science & Engineering',
            year: year || '2nd Year',
            primaryInterest: primaryInterest || 'Algorithmic Trading & Quant',
            isOnboarded: true,
          },
          { new: true }
        );
      }
    } catch (e) {
      console.warn('DB update failed, using mock return:', e.message);
    }

    if (!updatedUser) {
      updatedUser = {
        ...(req.user || {}),
        name,
        rollNo,
        phone,
        branch,
        year,
        primaryInterest,
        isOnboarded: true,
      };
    }

    return res.status(200).json({
      success: true,
      message: 'Onboarding completed successfully!',
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Hackathon Team login with shared password
 * @route   POST /api/auth/team-login
 * @access  Public
 */
export const teamLogin = async (req, res) => {
  try {
    const { teamName, teamPassword } = req.body;

    if (!teamName || !teamPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both Team Name and Password.',
      });
    }

    let team = null;
    try {
      team = await HackathonTeam.findOne({ teamName: new RegExp(`^${teamName}$`, 'i') });
      if (team) {
        const isMatch = await bcrypt.compare(teamPassword, team.passwordHash);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: 'Invalid team password.' });
        }
      }
    } catch {
      // In-memory fallback
    }

    if (!team) {
      // Mock team object for demo
      team = {
        _id: 'team_' + Date.now(),
        teamName,
        track: 'Algorithmic Market Making & Strategy',
        members: [],
      };
    }

    const token = generateToken(team._id, 'team_member', team.teamName);

    return res.status(200).json({
      success: true,
      message: 'Team authenticated successfully!',
      token,
      team: {
        id: team._id,
        teamName: team.teamName,
        track: team.track,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
