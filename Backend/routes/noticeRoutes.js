import express from 'express';
import { getNotices, createNotice } from '../controllers/noticeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get latest notices (max 15)
router.get('/', getNotices);

// Publish new notice (Admins / Core members only)
router.post('/', protect, adminOnly, createNotice);

export default router;
