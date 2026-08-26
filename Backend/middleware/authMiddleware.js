import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'finwiz_nitw_secret_jwt_key_2026';

/**
 * Protect routes - verifies JWT in Authorization header
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attempt to load from MongoDB if connected
      const user = await User.findById(decoded.id).select('-password');
      req.user = user || { _id: decoded.id, role: decoded.role || 'student', name: decoded.name };
      return next();
    } catch (error) {
      console.error('Auth verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

/**
 * Admin role guard
 */
export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'core_member')) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied: Admin privileges required' });
};
