import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { STATS_DATA } from "../../services/mockData";
import { ArrowRight, Trophy } from "lucide-react";

export default function HeroSection() {
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <section className="hero-section" aria-labelledby="hero-main-title">
      <div className="container">
        <div className="hero-grid">
          {/* Main Content (Expanding Full Width) */}
          <div className="hero-content" style={{ flex: 1 }}>
            <h1 id="hero-main-title" className="hero-title">
              Master the Code Behind{" "}
              <span className="text-brand">Money & Markets</span>
            </h1>

            <p className="hero-subtitle">
              Have an interest in Finance & Business? You are at the right
              place. We are NIT Warangal's official student club for algorithmic
              trading, quantitative finance, decentralized protocols, and
              valuation analysis.
            </p>

            <div className="hero-cta-group">
              {!isAuthenticated && (
                <button
                  className="btn-primary"
                  onClick={openAuthModal}
                  aria-label="Join FinWiz club"
                >
                  <span>Join the Club</span>
                  <ArrowRight size={18} />
                </button>
              )}

              <Link to="/notices" className="btn-secondary">
                <span>View Notice Board</span>
              </Link>
            </div>

            {/* 4-COLUMN STATS STRIP */}
            <div
              className="hero-stats-strip"
              role="region"
              aria-label="Club Statistics"
            >
              {STATS_DATA.map((stat) => (
                <div key={stat.id} className="stat-box">
                  <div className="stat-number">{stat.count}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
