import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Restore session from localStorage on initial boot
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('finwiz_token');
      const storedUser = localStorage.getItem('finwiz_user');

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);

        // Check if student still needs one-time onboarding
        if (!parsedUser.isOnboarded && !parsedUser.isTeam) {
          setIsOnboardingModalOpen(true);
        }
      }
    } catch (err) {
      console.error('Failed to restore auth session:', err);
      localStorage.removeItem('finwiz_token');
      localStorage.removeItem('finwiz_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save/remove session in localStorage
  const saveSession = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    if (newToken) {
      localStorage.setItem('finwiz_token', newToken);
    }
    if (newUser) {
      localStorage.setItem('finwiz_user', JSON.stringify(newUser));
    }
  };

  // Google OAuth Login
  const loginWithGoogle = async (credentialResponse) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await apiService.loginWithGoogle(credentialResponse?.credential);
      saveSession(result.token, result.user);
      setIsAuthModalOpen(false);

      if (result.needsOnboarding || !result.user.isOnboarded) {
        setIsOnboardingModalOpen(true);
      }
      return result;
    } catch (err) {
      setAuthError(err.message || 'Google Sign-in failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Instant Dev / Demo Login for testing
  const loginDemoUser = async (role = 'student') => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const mockUserData = {
        _id: 'usr_' + Date.now(),
        googleId: 'google_demo_101',
        name: role === 'admin' ? 'Club President (Admin)' : 'Shaun (NITW Student)',
        email: role === 'admin' ? 'president@student.nitw.ac.in' : 'student22714@student.nitw.ac.in',
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`,
        role: role,
        isOnboarded: false, // will trigger onboarding form so user can test it!
      };

      const result = await apiService.loginWithGoogle('mock_token', mockUserData);
      saveSession(result.token, result.user);
      setIsAuthModalOpen(false);

      if (!result.user.isOnboarded) {
        setIsOnboardingModalOpen(true);
      }
      return result;
    } catch (err) {
      setAuthError(err.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Team Login (for Hackathon team members sharing a Team Password)
  const loginAsTeam = async (teamName, teamPassword) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await apiService.loginTeam(teamName, teamPassword);
      const teamUser = {
        _id: 'team_' + Date.now(),
        name: `Team ${result.team.teamName}`,
        teamName: result.team.teamName,
        isTeam: true,
        isOnboarded: true,
        role: 'team_member',
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${teamName}`,
      };
      saveSession(result.token, teamUser);
      setIsAuthModalOpen(false);
      return result;
    } catch (err) {
      setAuthError(err.message || 'Team login failed. Verify Team Name and Password.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Complete Student One-Time Onboarding Form (Roll No, Phone, Branch)
  const completeOnboarding = async (onboardingData) => {
    setIsLoading(true);
    try {
      const result = await apiService.submitOnboarding(onboardingData);
      const updatedUser = {
        ...(user || {}),
        ...onboardingData,
        isOnboarded: true,
      };
      saveSession(token, updatedUser);
      setIsOnboardingModalOpen(false);
      return result;
    } catch (err) {
      setAuthError(err.message || 'Failed to submit student details.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('finwiz_token');
    localStorage.removeItem('finwiz_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        authError,
        isAuthModalOpen,
        isOnboardingModalOpen,
        openAuthModal: () => { setAuthError(null); setIsAuthModalOpen(true); },
        closeAuthModal: () => setIsAuthModalOpen(false),
        openOnboardingModal: () => setIsOnboardingModalOpen(true),
        closeOnboardingModal: () => setIsOnboardingModalOpen(false),
        loginWithGoogle,
        loginDemoUser,
        loginAsTeam,
        completeOnboarding,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
