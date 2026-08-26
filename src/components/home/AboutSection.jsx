import { DOMAINS_DATA } from '../../services/mockData';
import { TrendingUp, Cpu, BarChart3, Code2, ArrowUpRight } from 'lucide-react';

const ICON_MAP = {
  TrendingUp: TrendingUp,
  Cpu: Cpu,
  BarChart3: BarChart3,
  Code2: Code2,
};

export default function AboutSection() {
  return (
    <section id="about-section" className="about-section" aria-labelledby="about-main-title">
      <div className="container">
        <header className="section-header">
          <div className="section-subtitle-tag">ABOUT US</div>
          <h2 id="about-main-title" className="section-main-title">
            What is <span className="text-gold">FinWiz?</span>
          </h2>
          <p className="section-desc">
            FinWiz is a student-run finance and FinTech club dedicated to building deep financial literacy, market awareness, and technical acumen at NIT Warangal. Through simulated trading rings, hackathons, workshops, and research discussions, we turn theory into practical experience.
          </p>
        </header>

        {/* 4-COLUMN DOMAIN GRID */}
        <div className="domain-grid">
          {DOMAINS_DATA.map((domain) => {
            const IconComponent = ICON_MAP[domain.iconName] || TrendingUp;
            return (
              <article key={domain.id} className="domain-card" aria-labelledby={`domain-heading-${domain.id}`}>
                <div className="domain-icon-wrapper">
                  <IconComponent size={22} />
                </div>
                <h3 id={`domain-heading-${domain.id}`} className="domain-title">
                  {domain.title}
                </h3>
                <p className="domain-desc">{domain.desc}</p>
                <div className="domain-learn-more">
                  <span>Domain Overview</span>
                  <ArrowUpRight size={14} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
