import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { HACKATHON_DETAILS } from '../services/mockData';
import {
  Users,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Layers,
  LogIn,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HackathonPage() {
  const { user, loginAsTeam, logout } = useAuth();

  // Active Tab: 'register' | 'team-login'
  const [activeTab, setActiveTab] = useState('register');

  // Team Registration Form State
  const [regForm, setRegForm] = useState({
    teamName: '',
    leaderName: user?.name || '',
    leaderEmail: user?.email || '',
    leaderRollNo: user?.rollNo || '',
    leaderPhone: user?.phone || '',
    track: HACKATHON_DETAILS.tracks[0].title,
    teamPassword: '',
    confirmPassword: '',
  });

  // Team Login Form State
  const [teamLoginForm, setTeamLoginForm] = useState({
    teamName: '',
    teamPassword: '',
  });

  // Submission State
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const [regSuccess, setRegSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync logged in student details if available
  useEffect(() => {
    if (user && !user.isTeam) {
      setRegForm((prev) => ({
        ...prev,
        leaderName: user.name || prev.leaderName,
        leaderEmail: user.email || prev.leaderEmail,
        leaderRollNo: user.rollNo || prev.leaderRollNo,
        leaderPhone: user.phone || prev.leaderPhone,
      }));
    }
  }, [user]);

  const handleRegChange = (e) => {
    const { name, value } = e.target;
    setRegForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamLoginChange = (e) => {
    const { name, value } = e.target;
    setTeamLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regForm.teamName.trim()) {
      setErrorMessage('Please enter a team name.');
      return;
    }
    if (!regForm.leaderRollNo.trim()) {
      setErrorMessage('Please enter leader NITW Roll Number (alphanumeric).');
      return;
    }
    if (regForm.teamPassword.length < 6) {
      setErrorMessage('Team password must be at least 6 characters.');
      return;
    }
    if (regForm.teamPassword !== regForm.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setRegSuccess(true);
    }, 600);
  };

  const handleTeamLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!teamLoginForm.teamName || !teamLoginForm.teamPassword) {
      setErrorMessage('Please provide both Team Name and Password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginAsTeam(teamLoginForm.teamName, teamLoginForm.teamPassword);
    } catch (err) {
      setErrorMessage(err.message || 'Invalid Team Name or Password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!submissionUrl) return;
    setSubmissionSuccess(true);
  };

  return (
    <div className="container page-content-container">
      <Link to="/" className="back-nav-link" aria-label="Back to home page">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </Link>

      {/* HERO BANNER */}
      <header className="glass-card hackathon-hero-card" aria-labelledby="hackathon-page-title">
        <div className="section-subtitle-tag">
          NIT WARANGAL ANNUAL FLAGSHIP HACKATHON · PRIZE POOL {HACKATHON_DETAILS.prizePool}
        </div>
        <h1 id="hackathon-page-title" className="hackathon-page-title">
          FINHACK <span className="text-brand">2026</span>
        </h1>
        <p className="hackathon-page-desc">
          {HACKATHON_DETAILS.description}
        </p>

        {/* Quick Info Text Row */}
        <div className="hackathon-info-chips">
          <span className="hackathon-info-item">
            <strong>Prize Pool:</strong> {HACKATHON_DETAILS.prizePool}
          </span>
          <span className="hackathon-info-item">
            <Users size={14} /> <strong>Team Size:</strong> {HACKATHON_DETAILS.teamSize}
          </span>
          <span className="hackathon-info-item">
            <Calendar size={14} /> <strong>Mode:</strong> {HACKATHON_DETAILS.mode}
          </span>
        </div>
      </header>

      {/* 2-COLUMN FULL-WIDTH LAYOUT: TRACKS ON LEFT + TEAM HUB ON RIGHT */}
      <div className="hackathon-main-grid">
        {/* LEFT: Problem Statement Tracks */}
        <section className="hackathon-tracks-col" aria-labelledby="tracks-main-title">
          <div className="hackathon-tracks-header">
            <div className="section-subtitle-tag">
              <Layers size={14} /> COMPETITION TRACKS
            </div>
            <h2 id="tracks-main-title" className="section-main-title">Problem Tracks</h2>
            <p className="section-desc left-aligned">
              Choose one track for your team&apos;s hackathon project submission.
            </p>
          </div>

          <div className="hackathon-tracks-list">
            {HACKATHON_DETAILS.tracks.map((track, idx) => (
              <article key={idx} className="glass-card track-card" aria-labelledby={`track-head-${idx}`}>
                <div className="track-card-header">
                  <span className="track-tag-num">
                    TRACK 0{idx + 1}
                  </span>
                  <h3 id={`track-head-${idx}`} className="track-title">{track.title}</h3>
                </div>
                <p className="track-desc">
                  {track.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* RIGHT: Dedicated Hackathon Hub */}
        <section className="glass-card hackathon-hub-card" aria-labelledby="hub-main-title">
          {/* If Logged In as a Hackathon Team */}
          {user?.isTeam ? (
            <div className="team-dashboard-view">
              <header className="team-dash-header">
                <div>
                  <span className="team-active-tag">
                    <CheckCircle2 size={14} /> TEAM LOGGED IN
                  </span>
                  <h2 id="hub-main-title" className="team-dash-name">{user.teamName}</h2>
                </div>
                <button className="btn-secondary team-logout-btn" onClick={logout}>
                  Log Out Team
                </button>
              </header>

              {submissionSuccess ? (
                <div className="submission-success-view">
                  <CheckCircle2 size={48} className="success-icon-emerald" />
                  <h3 className="submission-success-title">Project Submitted Successfully!</h3>
                  <p className="submission-success-text">
                    Your project link has been recorded. The FinWiz evaluation committee will review your submission.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleProjectSubmit} className="team-submission-form" aria-label="Submit team project">
                  <h3 className="team-submission-title">Submit Your Project</h3>
                  <p className="team-submission-desc">
                    Provide your GitHub repository URL and live demo link before the submission deadline.
                  </p>

                  <div className="auth-form-group">
                    <label htmlFor="repo-submission-url" className="auth-label">GitHub / Project Repository URL *</label>
                    <input
                      id="repo-submission-url"
                      type="url"
                      className="auth-input input-no-icon"
                      placeholder="https://github.com/team-repo"
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary form-submit-btn">
                    <Send size={16} />
                    <span>Submit Hackathon Project</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Team Registration / Team Login Tabs */
            <div>
              <div className="hackathon-tabs-row" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'register'}
                  className={activeTab === 'register' ? 'btn-primary tab-flex-btn' : 'btn-secondary tab-flex-btn'}
                  onClick={() => { setActiveTab('register'); setErrorMessage(''); }}
                >
                  <FileCode size={16} />
                  <span>Team Registration</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'team-login'}
                  className={activeTab === 'team-login' ? 'btn-primary tab-flex-btn' : 'btn-secondary tab-flex-btn'}
                  onClick={() => { setActiveTab('team-login'); setErrorMessage(''); }}
                >
                  <LogIn size={16} />
                  <span>Team Login</span>
                </button>
              </div>

              {errorMessage && (
                <div className="auth-error-banner" role="alert">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {activeTab === 'register' ? (
                /* TEAM REGISTRATION FORM */
                regSuccess ? (
                  <div className="team-registered-success">
                    <CheckCircle2 size={48} className="success-icon-emerald" />
                    <h3 className="submission-success-title">Team Registered!</h3>
                    <p className="team-registered-text">
                      Team <strong>&quot;{regForm.teamName}&quot;</strong> has been registered. Teammates can log in with the team password.
                    </p>
                    <button className="btn-secondary" onClick={() => setRegSuccess(false)}>
                      Register Another Team
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterSubmit} aria-label="Register a new hackathon team">
                    <h2 id="hub-main-title" className="hackathon-hub-form-title">
                      Register Your Team
                    </h2>
                    <p className="hackathon-hub-form-desc">
                      Set a <strong>Team Shared Password</strong> so your teammates can log in from their own computers.
                    </p>

                    {/* Team Name */}
                    <div className="auth-form-group">
                      <label htmlFor="hack-team-name" className="auth-label">Team Name *</label>
                      <input
                        id="hack-team-name"
                        type="text"
                        name="teamName"
                        className="auth-input input-no-icon"
                        placeholder="e.g. QuantWarriors_NITW"
                        value={regForm.teamName}
                        onChange={handleRegChange}
                        required
                      />
                    </div>

                    {/* Selected Track */}
                    <div className="auth-form-group">
                      <label htmlFor="hack-team-track" className="auth-label">Selected Track *</label>
                      <select
                        id="hack-team-track"
                        name="track"
                        className="auth-input auth-select select-no-icon"
                        value={regForm.track}
                        onChange={handleRegChange}
                      >
                        {HACKATHON_DETAILS.tracks.map((t, i) => (
                          <option key={i} value={t.title}>
                            Track {i + 1}: {t.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Leader Details */}
                    <div className="form-row-2col">
                      <div className="auth-form-group">
                        <label htmlFor="hack-leader-name" className="auth-label">Leader Name *</label>
                        <input
                          id="hack-leader-name"
                          type="text"
                          name="leaderName"
                          className="auth-input input-no-icon"
                          placeholder="e.g. Shaun K."
                          value={regForm.leaderName}
                          onChange={handleRegChange}
                          required
                        />
                      </div>
                      <div className="auth-form-group">
                        <label htmlFor="hack-leader-roll" className="auth-label">Leader Roll No * (Alphanumeric)</label>
                        <input
                          id="hack-leader-roll"
                          type="text"
                          name="leaderRollNo"
                          className="auth-input input-no-icon"
                          placeholder="e.g. CS22B001 or 227145"
                          value={regForm.leaderRollNo}
                          onChange={handleRegChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row-2col">
                      <div className="auth-form-group">
                        <label htmlFor="hack-leader-email" className="auth-label">Leader Email *</label>
                        <input
                          id="hack-leader-email"
                          type="email"
                          name="leaderEmail"
                          className="auth-input input-no-icon"
                          placeholder="leader@student.nitw.ac.in"
                          value={regForm.leaderEmail}
                          onChange={handleRegChange}
                          required
                        />
                      </div>
                      <div className="auth-form-group">
                        <label htmlFor="hack-leader-phone" className="auth-label">Leader Phone *</label>
                        <input
                          id="hack-leader-phone"
                          type="tel"
                          name="leaderPhone"
                          className="auth-input input-no-icon"
                          placeholder="9876543210"
                          value={regForm.leaderPhone}
                          onChange={handleRegChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Shared Team Password */}
                    <div className="form-row-2col">
                      <div className="auth-form-group">
                        <label htmlFor="hack-team-pwd" className="auth-label">Team Password *</label>
                        <input
                          id="hack-team-pwd"
                          type="password"
                          name="teamPassword"
                          className="auth-input input-no-icon"
                          placeholder="••••••••"
                          value={regForm.teamPassword}
                          onChange={handleRegChange}
                          required
                        />
                      </div>
                      <div className="auth-form-group">
                        <label htmlFor="hack-team-confirm-pwd" className="auth-label">Confirm Password *</label>
                        <input
                          id="hack-team-confirm-pwd"
                          type="password"
                          name="confirmPassword"
                          className="auth-input input-no-icon"
                          placeholder="••••••••"
                          value={regForm.confirmPassword}
                          onChange={handleRegChange}
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary form-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Registering Team...' : 'Complete Team Registration'}
                    </button>
                  </form>
                )
              ) : (
                /* TEAM MEMBER LOGIN FORM */
                <form onSubmit={handleTeamLoginSubmit} aria-label="Log into registered hackathon team">
                  <h2 id="hub-main-title" className="hackathon-hub-form-title">
                    Team Member Login
                  </h2>
                  <p className="hackathon-hub-form-desc">
                    Enter your Registered Team Name and shared password to access your team submission portal.
                  </p>

                  <div className="auth-form-group">
                    <label htmlFor="login-team-name" className="auth-label">Registered Team Name *</label>
                    <input
                      id="login-team-name"
                      type="text"
                      name="teamName"
                      className="auth-input input-no-icon"
                      placeholder="e.g. QuantWarriors_NITW"
                      value={teamLoginForm.teamName}
                      onChange={handleTeamLoginChange}
                      required
                    />
                  </div>

                  <div className="auth-form-group">
                    <label htmlFor="login-team-pwd" className="auth-label">Team Shared Password *</label>
                    <input
                      id="login-team-pwd"
                      type="password"
                      name="teamPassword"
                      className="auth-input input-no-icon"
                      placeholder="••••••••"
                      value={teamLoginForm.teamPassword}
                      onChange={handleTeamLoginChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary form-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging In...' : 'Login as Team'}
                  </button>
                </form>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
