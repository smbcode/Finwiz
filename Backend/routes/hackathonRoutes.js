import express from 'express';
import { getHackathonInfo, registerTeam } from '../controllers/hackathonController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get hackathon info and tracks
router.get('/info', getHackathonInfo);

// Register team
router.post('/register', registerTeam);

export default router;
