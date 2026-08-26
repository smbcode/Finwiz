import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';

// Shared Layout Wrapper
import Layout from './components/common/Layout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NoticesPage from './pages/NoticesPage';
import HackathonPage from './pages/HackathonPage';
import NotFoundPage from './pages/NotFoundPage';

// External Stylesheets (Using CSS Root Variables & Josefin Sans font)
import './styles/index.css';
import './styles/App.css';
import './styles/auth.css';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy-google-client-id.apps.googleusercontent.com';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Shared Layout containing Navbar + Footer persists across all route changes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="notices" element={<NoticesPage />} />
              <Route path="hackathon" element={<HackathonPage />} />
              {/* 404 Catch-All Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
