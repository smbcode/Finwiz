import { IDENTITY_DATA } from '../../services/mockData';

export default function IdentityPillars() {
  return (
    <section className="identity-section" aria-labelledby="identity-heading">
      <div className="container">
        <header className="section-header">
          <div className="section-subtitle-tag">OUR IDENTITY</div>
          <h2 id="identity-heading" className="section-main-title">
            Who <span className="text-emerald">We Are</span>
          </h2>
          <p className="section-desc">
            The core pillars that shape the culture, drive, and vision of FinWiz at NIT Warangal.
          </p>
        </header>

        <div className="identity-grid">
          {IDENTITY_DATA.map((item) => (
            <article key={item.id} className="identity-card" aria-labelledby={`identity-title-${item.id}`}>
              <div className="identity-letter" aria-hidden="true">{item.letter}</div>
              <h3 id={`identity-title-${item.id}`} className="identity-title">{item.title}</h3>
              <p className="identity-subtitle">
                {item.subtitle}
              </p>
              <p className="identity-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
