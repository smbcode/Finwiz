import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Hackathon', 'Session', 'Recruitment', 'Workshop', 'General'],
      default: 'General',
    },
    priority: {
      type: String,
      enum: ['Urgent', 'High', 'Normal', 'Low'],
      default: 'Normal',
    },
    date: {
      type: String, // e.g. "2026-08-28"
      required: true,
      default: () => new Date().toISOString().split('T')[0],
    },
    day: {
      type: String, // e.g. "28"
    },
    month: {
      type: String, // e.g. "AUG"
    },
    author: {
      type: String,
      default: 'FinWiz Core Committee',
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        name: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index on createdAt and date for fast top 10-15 notices lookup
noticeSchema.index({ createdAt: -1 });
noticeSchema.index({ date: -1 });

export default mongoose.models.Notice || mongoose.model('Notice', noticeSchema);
