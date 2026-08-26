import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User as UserIcon, Shield, ChevronDown, Award } from 'lucide-react';

export default function UserProfileBadge() {
  const { user, logout, openOnboardingModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="user-menu-wrapper" ref={dropdownRef}>
      <button
        className="user-profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="User account menu"
      >
        <div className="user-avatar-circle">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`Avatar for ${user.name || 'User'}`}
              className="user-avatar-img"
            />
          ) : (
            <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
          )}
        </div>
        
        <div className="user-info-text">
          <span className="user-display-name">{user.name || 'NITW Student'}</span>
          <span className="user-roll-badge">
            {user.rollNo ? `Roll: ${user.rollNo}` : (user.isTeam ? 'Team Member' : 'Student')}
          </span>
        </div>

        <ChevronDown size={14} className="dropdown-chevron" />
      </button>

      {isOpen && (
        <div className="user-dropdown-menu" role="menu">
          <div className="dropdown-user-header">
            <p className="dropdown-name">{user.name}</p>
            <p className="dropdown-email">{user.email || user.teamName || 'NIT Warangal'}</p>
            {user.rollNo && (
              <span className="badge-pill gold user-roll-pill">
                NITW #{user.rollNo}
              </span>
            )}
          </div>

          {!user.isTeam && (
            <button
              className="dropdown-item"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                openOnboardingModal();
              }}
            >
              <UserIcon size={16} />
              <span>Edit Student Profile</span>
            </button>
          )}

          {user.role === 'admin' && (
            <div className="dropdown-item dropdown-admin-tag" role="menuitem">
              <Shield size={16} />
              <span>Admin Access Active</span>
            </div>
          )}

          {user.isTeam && (
            <div className="dropdown-item dropdown-team-tag" role="menuitem">
              <Award size={16} />
              <span>Hackathon Team Account</span>
            </div>
          )}

          <button
            className="dropdown-item danger"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
