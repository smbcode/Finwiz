import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { X, AlertCircle, Sparkles, UserCheck } from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithGoogle,
    loginDemoUser,
    authError,
    isLoading,
  } = useAuth();

  if (!isAuthModalOpen) return null;

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse);
    } catch (err) {
      console.error('Google Auth Failed:', err);
    }
  };

  const handleGoogleError = () => {
    console.warn('Google Sign-in failed or client ID not configured.');
  };

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div className="modal-backdrop" onClick={closeAuthModal} role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={closeAuthModal}
          aria-label="Close authentication dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <header className="auth-header">
          <div className="auth-logo-badge">
            <img
              src="/finwiz-logo.svg"
              alt="FinWiz official club emblem representing finance and technology at NIT Warangal"
              className="auth-logo-img"
            />
          </div>
          <h2 id="auth-modal-title" className="auth-title">
            Student Sign-In
          </h2>
          <p className="auth-subtitle">
            FinWiz Portal · NIT Warangal
          </p>
        </header>

        {/* Modal Body */}
        <div className="auth-body">
          {/* Global Error Banner */}
          {authError && (
            <div className="auth-error-banner" role="alert">
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          <p className="auth-intro-text">
            Sign in with your Google account. First-time users will complete a quick one-time profile verification with your NITW Roll Number.
          </p>

          {/* Real Google OAuth Component */}
          {googleClientId ? (
            <div className="google-oauth-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="filled_black"
                shape="rectangular"
                text="signin_with"
                width="100%"
              />
            </div>
          ) : (
            /* Solid Clean Google Sign-in Action */
            <button
              className="google-auth-btn"
              onClick={() => loginDemoUser('student')}
              disabled={isLoading}
              aria-label="Sign in with Google Account"
            >
              <svg className="google-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>
          )}

          <div className="auth-divider">
            <span>Or Instant Demo Mode</span>
          </div>

          {/* Dev Simulation Buttons */}
          <div className="demo-auth-box">
            <p className="demo-auth-desc">
              <Sparkles size={12} className="demo-sparkle-icon" />
              Developer / Demo Quick Access
            </p>
            <div className="demo-buttons-row">
              <button
                className="btn-secondary demo-flex-btn"
                onClick={() => loginDemoUser('student')}
              >
                <UserCheck size={14} />
                <span>Student Login</span>
              </button>
              <button
                className="btn-secondary demo-flex-btn"
                onClick={() => loginDemoUser('admin')}
              >
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
