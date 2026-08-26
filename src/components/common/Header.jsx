import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserProfileBadge from '../auth/UserProfileBadge';
import { LogIn, Menu, X, Bell, Trophy, Home } from 'lucide-react';

export default function Header() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* LEFT: Logo from public folder + Solid Consistent Color Branding */}
        <Link to="/" className="header-logo-group" onClick={closeMobileMenu} aria-label="FinWiz NIT Warangal Home">
          <img
            src="/finwiz-logo.svg"
            alt="FinWiz official club emblem representing finance and technology at NIT Warangal"
            className="header-logo-icon"
          />
          <div className="header-logo-text">
            <div className="header-brand-name">FINWIZ</div>
            <div className="header-brand-sub">Finance Club · NITW</div>
          </div>
        </Link>

        {/* CENTER / RIGHT: Desktop Nav */}
        <nav className="header-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/hackathon"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Fintech Hackathon
            <span className="nav-tag-badge">2026</span>
          </NavLink>

          <NavLink
            to="/notices"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Notice Board
          </NavLink>
        </nav>

        {/* RIGHT: Auth Action / Profile Badge & Mobile Toggle */}
        <div className="header-actions">
          {isAuthenticated ? (
            <UserProfileBadge />
          ) : (
            <button
              className="btn-primary header-login-btn"
              onClick={openAuthModal}
              aria-label="Open student sign-in modal"
            >
              <LogIn size={16} />
              <span>Student Sign-In</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <nav className="mobile-drawer open" aria-label="Mobile Navigation">
          <NavLink
            to="/"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/hackathon"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Trophy size={18} />
            <span>Fintech Hackathon 2026</span>
          </NavLink>

          <NavLink
            to="/notices"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Bell size={18} />
            <span>Notice Board</span>
          </NavLink>

          {!isAuthenticated && (
            <button
              className="btn-primary mobile-login-btn"
              onClick={() => {
                closeMobileMenu();
                openAuthModal();
              }}
            >
              <LogIn size={16} />
              <span>Student Sign-In</span>
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
