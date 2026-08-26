import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowLeft, CheckCircle2, AlertCircle, Sparkles, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const {
    user,
    isAuthenticated,
    loginWithGoogle,
    loginDemoUser,
    authError,
    isLoading,
  } = useAuth();

  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (isAuthenticated && user?.isOnboarded) {
    return (
      <div className="container page-content-container">
        <section className="glass-card login-authenticated-card" aria-labelledby="auth-success-title">
          <CheckCircle2 size={48} className="success-icon-emerald" />
          <h1 id="auth-success-title" className="login-auth-title">
            You are Logged In
          </h1>
          <p className="login-auth-desc">
            Welcome back, <strong>{user.name}</strong> ({user.rollNo ? `Roll: ${user.rollNo}` : 'NITW Student'}).
          </p>
          <div className="login-auth-actions">
            <Link to="/" className="btn-primary">Go to Home</Link>
            <Link to="/notices" className="btn-secondary">Check Notices</Link>
          </div>
        </section>
      </div>
    );
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container page-content-container">
      <div className="login-page-wrapper">
        <Link to="/" className="back-nav-link" aria-label="Back to home page">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <section className="auth-modal-card login-card-static" aria-labelledby="login-page-title">
          <header className="auth-header">
            <div className="auth-logo-badge">
              <img
                src="/finwiz-logo.svg"
                alt="FinWiz official club emblem representing finance and technology at NIT Warangal"
                className="auth-logo-img"
              />
            </div>
            <h1 id="login-page-title" className="auth-title">
              Student Sign-In
            </h1>
            <p className="auth-subtitle">FinWiz Portal · NIT Warangal</p>
          </header>

          <div className="auth-body">
            {authError && (
              <div className="auth-error-banner" role="alert">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <p className="auth-intro-text">
              Sign in with your Google account. First-time users will complete a quick one-time profile verification with your NITW Roll Number.
            </p>

            {googleClientId ? (
              <div className="google-oauth-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.warn('Google login failed')}
                  theme="filled_black"
                  shape="rectangular"
                  width="100%"
                />
              </div>
            ) : (
              <button
                className="google-auth-btn"
                onClick={() => loginDemoUser('student')}
                disabled={isLoading}
                aria-label="Sign in with Google Account"
              >
                <svg className="google-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
              </button>
            )}

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
                  <span>Student Demo</span>
                </button>
                <button
                  className="btn-secondary demo-flex-btn"
                  onClick={() => loginDemoUser('admin')}
                >
                  <span>Admin Demo</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
