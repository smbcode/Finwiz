import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    rollNo: {
      type: String,
      trim: true,
      sparse: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    branch: {
      type: String,
      default: 'Computer Science & Engineering',
    },
    year: {
      type: String,
      default: '2nd Year',
    },
    primaryInterest: {
      type: String,
      default: 'Algorithmic Trading & Quant',
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['student', 'core_member', 'admin'],
      default: 'student',
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index on rollNo and email for fast search
userSchema.index({ email: 1 });
userSchema.index({ rollNo: 1 });

export default mongoose.models.User || mongoose.model('User', userSchema);
