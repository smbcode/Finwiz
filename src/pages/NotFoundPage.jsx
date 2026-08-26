import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container not-found-container">
      <section className="glass-card not-found-card" aria-labelledby="not-found-heading">
        <div className="not-found-icon-wrapper">
          <AlertCircle size={40} className="not-found-icon" />
        </div>
        <h1 id="not-found-heading" className="not-found-title">
          404 - Page Not Found
        </h1>
        <p className="not-found-text">
          The page you requested does not exist or has been moved. Use the navigation links above or return to the FinWiz home page.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
          <Link to="/notices" className="btn-secondary">
            <span>Notice Board</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
