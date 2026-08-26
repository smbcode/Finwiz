import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Hash, BookOpen, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function OnboardingModal() {
  const { user, isOnboardingModalOpen, closeOnboardingModal, completeOnboarding, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    rollNo: user?.rollNo || '',
    phone: user?.phone || '',
    branch: user?.branch || 'Computer Science & Engineering',
    year: user?.year || '2nd Year',
    primaryInterest: user?.primaryInterest || 'Algorithmic Trading & Quant',
  });

  const [validationError, setValidationError] = useState('');

  if (!isOnboardingModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setValidationError('Please provide your full name.');
      return;
    }
    // Alphanumeric Roll Number validation (allows 227145, CS22B001, BT23M012, etc.)
    if (!formData.rollNo.trim() || formData.rollNo.trim().length < 2) {
      setValidationError('Please enter a valid NITW Roll Number (alphanumeric).');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setValidationError('Please provide a valid 10-digit phone number.');
      return;
    }

    setValidationError('');
    try {
      await completeOnboarding(formData);
    } catch (err) {
      setValidationError(err.message || 'Failed to save student profile.');
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="auth-modal-card onboarding-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="auth-header onboarding-header">
          <div className="auth-logo-badge onboarding-logo-badge">
            <GraduationCap size={28} className="onboarding-cap-icon" />
          </div>
          <h2 id="onboarding-title" className="auth-title">
            Complete Student Profile
          </h2>
          <p className="auth-subtitle">
            One-time verification for NIT Warangal students
          </p>
        </header>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="auth-body" aria-label="Student onboarding details">
          {validationError && (
            <div className="auth-error-banner" role="alert">
              <span>{validationError}</span>
            </div>
          )}

          <div className="form-row-2col">
            {/* Full Name */}
            <div className="auth-form-group">
              <label htmlFor="onboarding-name" className="auth-label">Full Name *</label>
              <div className="auth-input-wrapper">
                <User size={16} className="auth-input-icon" />
                <input
                  id="onboarding-name"
                  type="text"
                  name="name"
                  className="auth-input"
                  placeholder="e.g. Shaun K."
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* NITW Roll Number (Alphanumeric) */}
            <div className="auth-form-group">
              <label htmlFor="onboarding-roll" className="auth-label">NITW Roll Number * (Alphanumeric)</label>
              <div className="auth-input-wrapper">
                <Hash size={16} className="auth-input-icon" />
                <input
                  id="onboarding-roll"
                  type="text"
                  name="rollNo"
                  className="auth-input"
                  placeholder="e.g. CS22B001 or 227145"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row-2col">
            {/* Student Email */}
            <div className="auth-form-group">
              <label htmlFor="onboarding-email" className="auth-label">Student Email *</label>
              <div className="auth-input-wrapper">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="onboarding-email"
                  type="email"
                  name="email"
                  className="auth-input"
                  placeholder="name@student.nitw.ac.in"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="auth-form-group">
              <label htmlFor="onboarding-phone" className="auth-label">Contact Phone No *</label>
              <div className="auth-input-wrapper">
                <Phone size={16} className="auth-input-icon" />
                <input
                  id="onboarding-phone"
                  type="tel"
                  name="phone"
                  className="auth-input"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row-2col">
            {/* Branch */}
            <div className="auth-form-group">
              <label htmlFor="onboarding-branch" className="auth-label">Department / Branch</label>
              <div className="auth-input-wrapper">
                <BookOpen size={16} className="auth-input-icon" />
                <select
                  id="onboarding-branch"
                  name="branch"
                  className="auth-input auth-select"
                  value={formData.branch}
                  onChange={handleChange}
                >
                  <option value="Computer Science & Engineering">Computer Science (CSE)</option>
                  <option value="Electronics & Communication">Electronics (ECE)</option>
                  <option value="Electrical & Electronics">Electrical (EEE)</option>
                  <option value="Mechanical Engineering">Mechanical (ME)</option>
                  <option value="Chemical Engineering">Chemical (CHE)</option>
                  <option value="Civil Engineering">Civil (CE)</option>
                  <option value="Metallurgical & Materials">Metallurgy (MME)</option>
                  <option value="Biotechnology">Biotechnology (BT)</option>
                  <option value="Mathematics & Computing">Math & Computing (MnC)</option>
                  <option value="School of Management / MBA">School of Management (SOM)</option>
                </select>
              </div>
            </div>

            {/* Year */}
            <div className="auth-form-group">
              <label htmlFor="onboarding-year" className="auth-label">Year of Study</label>
              <div className="auth-input-wrapper">
                <GraduationCap size={16} className="auth-input-icon" />
                <select
                  id="onboarding-year"
                  name="year"
                  className="auth-input auth-select"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Primary FinTech Interest */}
          <div className="auth-form-group">
            <label htmlFor="onboarding-interest" className="auth-label">Primary Club Domain Interest</label>
            <select
              id="onboarding-interest"
              name="primaryInterest"
              className="auth-input auth-select interest-select"
              value={formData.primaryInterest}
              onChange={handleChange}
            >
              <option value="Algorithmic Trading & Quant">Algorithmic Trading & Quantitative Finance</option>
              <option value="DeFi & Web3 FinTech">DeFi & Web3 Blockchain Systems</option>
              <option value="Investment Banking & Valuation">Investment Banking & Corporate Valuation</option>
              <option value="FinTech Engineering">FinTech Software Engineering & AI</option>
            </select>
          </div>

          <div className="onboarding-actions-row">
            <button
              type="button"
              className="btn-secondary onboarding-skip-btn"
              onClick={closeOnboardingModal}
            >
              Skip for Now
            </button>
            <button
              type="submit"
              className="btn-primary onboarding-submit-btn"
              disabled={isLoading}
            >
              <CheckCircle2 size={16} />
              <span>{isLoading ? 'Saving Profile...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
