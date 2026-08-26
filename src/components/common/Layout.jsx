import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AuthModal from '../auth/AuthModal';
import OnboardingModal from '../auth/OnboardingModal';

/**
 * Shared Layout Component
 * Keeps Navbar and Footer persistent across all route transitions
 */
export default function Layout() {
  return (
    <div className="app-wrapper">
      {/* Persistent Global Header */}
      <Header />

      {/* Dynamic Route Content */}
      <main id="main-content" className="main-content">
        <Outlet />
      </main>

      {/* Persistent Global Footer */}
      <Footer />

      {/* Global Auth Modals */}
      <AuthModal />
      <OnboardingModal />
    </div>
  );
}
