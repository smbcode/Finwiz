import express from 'express';
import { googleAuth, submitOnboarding, getMe, teamLogin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Google OAuth Login
router.post('/google', googleAuth);

// One-time student onboarding (requires auth)
router.post('/onboarding', protect, submitOnboarding);

// Current user profile
router.get('/me', protect, getMe);

// Hackathon team login
router.post('/team-login', teamLogin);

export default router;
