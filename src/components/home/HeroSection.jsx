import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { STATS_DATA } from '../../services/mockData';
import { ArrowRight, Trophy, Terminal, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <section className="hero-section" aria-labelledby="hero-main-title">
      <div className="container">
        <div className="hero-grid">
          {/* LEFT: Text, Subtitle, CTAs, and Stats */}
          <div className="hero-content">
            <h1 id="hero-main-title" className="hero-title">
              Master the Code Behind <span className="text-brand">Money & Markets</span>
            </h1>

            <p className="hero-subtitle">
              Have an interest in Finance & Business? You are at the right place. We are NIT Warangal's official student club for algorithmic trading, quantitative finance, decentralized protocols, and valuation analysis.
            </p>

            <div className="hero-cta-group">
              {isAuthenticated ? (
                <Link to="/hackathon" className="btn-primary">
                  <Trophy size={18} />
                  <span>Go to FinHack '26</span>
                </Link>
              ) : (
                <button className="btn-primary" onClick={openAuthModal} aria-label="Join FinWiz club">
                  <span>Join the Club</span>
                  <ArrowRight size={18} />
                </button>
              )}

              <Link to="/notices" className="btn-secondary">
                <span>View Notice Board</span>
              </Link>
            </div>

            {/* 4-COLUMN STATS STRIP */}
            <div className="hero-stats-strip" role="region" aria-label="Club Statistics">
              {STATS_DATA.map((stat) => (
                <div key={stat.id} className="stat-box">
                  <div className="stat-number">{stat.count}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: High-tech Interactive Solid Card / Terminal Widget */}
          <aside className="hero-visual-card" aria-label="FinWiz Quant Backtesting Engine Terminal">
            <div className="hero-visual-header">
              <div className="hero-visual-title">
                <Terminal size={18} className="terminal-header-icon" />
                <span>finwiz_quant_engine.py</span>
              </div>
              <div className="terminal-live-status">
                <span className="live-status-dot" />
                <span>NITW NODES LIVE</span>
              </div>
            </div>

            {/* Code / Terminal Simulation */}
            <div className="terminal-card">
              <div className="terminal-line">
                <span className="terminal-dim">1</span>
                <span className="terminal-prompt">&gt;</span>
                <span>import finwiz_quant as fq</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-dim">2</span>
                <span className="terminal-prompt">&gt;</span>
                <span>engine = fq.Engine(campus="NITW")</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-dim">3</span>
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-accent">strategy.backtest(pairs=["NIFTY", "BANKNIFTY"])</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-dim">4</span>
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-success-text">[SUCCESS] Sharpe: 2.84 | Alpha: +18.4%</span>
              </div>
              <div className="terminal-line terminal-spaced-line">
                <span className="terminal-dim">5</span>
                <span className="terminal-prompt">&gt;</span>
                <span className="terminal-info-text">FinHack '26 Status: REGISTRATIONS OPEN</span>
              </div>
            </div>

            {/* Core Domain Chips */}
            <div className="domain-chips">
              <div className="domain-chip">
                <Zap size={14} className="chip-gold-icon" />
                <span>Algorithmic Trading</span>
              </div>
              <div className="domain-chip">
                <ShieldCheck size={14} className="chip-emerald-icon" />
                <span>DeFi & Smart Contracts</span>
              </div>
              <div className="domain-chip">
                <Sparkles size={14} className="chip-cyan-icon" />
                <span>Equity Valuations</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
