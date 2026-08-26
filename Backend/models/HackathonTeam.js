import mongoose from 'mongoose';

const hackathonTeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Hashed with bcryptjs so teammates can authenticate with team shared password
    passwordHash: {
      type: String,
      required: true,
    },
    track: {
      type: String,
      required: true,
      default: 'Algorithmic Market Making & Strategy',
    },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    leaderDetails: {
      name: String,
      email: String,
      rollNo: String,
      phone: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    problemStatement: {
      type: String,
      default: '',
    },
    projectSubmissionUrl: {
      type: String,
      default: '',
    },
    isShortlisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

hackathonTeamSchema.index({ teamName: 1 });

export default mongoose.models.HackathonTeam || mongoose.model('HackathonTeam', hackathonTeamSchema);
