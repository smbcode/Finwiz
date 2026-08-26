/**
 * =========================================================
 * FINWIZ API & LOCAL NOTICE REPOSITORY
 * Notices are stored directly in-code / browser state (Max 10 limit)
 * =========================================================
 */

import { INITIAL_NOTICES, HACKATHON_DETAILS } from './mockData';

const MAX_NOTICES_LIMIT = 10;
const NOTICES_STORAGE_KEY = 'finwiz_notices_list';

// Helper to get in-code notices with local persistence
function getStoredNotices() {
  try {
    const data = localStorage.getItem(NOTICES_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, MAX_NOTICES_LIMIT);
      }
    }
  } catch (e) {
    console.warn('Could not read notices from storage:', e);
  }
  return INITIAL_NOTICES.slice(0, MAX_NOTICES_LIMIT);
}

function saveStoredNotices(notices) {
  const trimmed = notices.slice(0, MAX_NOTICES_LIMIT);
  try {
    localStorage.setItem(NOTICES_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('Could not save notices:', e);
  }
  return trimmed;
}

export const apiService = {
  // --- AUTHENTICATION ---
  async loginWithGoogle(credentialToken, mockUserData = null) {
    const user = mockUserData || {
      _id: 'usr_' + Date.now(),
      googleId: 'google_user_' + Date.now(),
      name: 'NITW Student',
      email: 'student@student.nitw.ac.in',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=finwiz_nitw',
      role: 'student',
      isOnboarded: false,
    };

    return {
      success: true,
      token: 'jwt_token_' + Date.now(),
      user,
      needsOnboarding: !user.isOnboarded,
    };
  },

  async submitOnboarding(onboardingData) {
    const existing = JSON.parse(localStorage.getItem('finwiz_user') || '{}');
    const updatedUser = {
      ...existing,
      ...onboardingData,
      isOnboarded: true,
    };
    return {
      success: true,
      user: updatedUser,
      message: 'Onboarding completed successfully!',
    };
  },

  async loginTeam(teamName) {
    return {
      success: true,
      team: {
        teamName: teamName,
        leaderName: 'Team Leader',
        track: 'Algorithmic Market Making & Strategy',
      },
      token: 'team_token_' + Date.now(),
    };
  },

  // --- IN-CODE NOTICES MANAGEMENT (MAX 10 AT A TIME) ---
  getNotices() {
    return getStoredNotices();
  },

  addNotice(newNotice) {
    const current = getStoredNotices();
    const noticeObj = {
      id: 'notice-' + Date.now(),
      title: newNotice.title || 'New Announcement',
      category: newNotice.category || 'General',
      priority: newNotice.priority || 'Normal',
      date: newNotice.date || new Date().toISOString().split('T')[0],
      day: newNotice.date ? newNotice.date.split('-')[2] : String(new Date().getDate()).padStart(2, '0'),
      month: newNotice.date
        ? new Date(newNotice.date).toLocaleString('default', { month: 'short' }).toUpperCase()
        : 'AUG',
      summary: newNotice.summary || '',
      content: newNotice.content || '',
      author: newNotice.author || 'FinWiz Admin',
      isPinned: !!newNotice.isPinned,
    };

    // Prepend to maintain latest-first, enforce max 10
    const updated = [noticeObj, ...current].slice(0, MAX_NOTICES_LIMIT);
    return saveStoredNotices(updated);
  },

  updateNotice(id, updatedFields) {
    const current = getStoredNotices();
    const updated = current.map((n) => {
      if (n.id === id) {
        return {
          ...n,
          ...updatedFields,
          day: updatedFields.date ? updatedFields.date.split('-')[2] : n.day,
          month: updatedFields.date
            ? new Date(updatedFields.date).toLocaleString('default', { month: 'short' }).toUpperCase()
            : n.month,
        };
      }
      return n;
    });
    return saveStoredNotices(updated);
  },

  deleteNotice(id) {
    const current = getStoredNotices();
    const updated = current.filter((n) => n.id !== id);
    return saveStoredNotices(updated);
  },

  // --- HACKATHON INFO ---
  getHackathonInfo() {
    return {
      success: true,
      data: HACKATHON_DETAILS,
    };
  },

  // --- NEWSLETTER SUBSCRIPTION ---
  async subscribeNewsletter(email) {
    return {
      success: true,
      message: `Thank you for subscribing! Updates will be sent to ${email}`,
    };
  },
};
