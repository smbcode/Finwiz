import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import { Bell, ArrowRight, Pin } from 'lucide-react';

export default function NoticePreview() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const list = apiService.getNotices();
    setNotices(list.slice(0, 3));
  }, []);

  return (
    <section className="notices-section" aria-labelledby="notice-preview-title">
      <div className="container">
        <header className="notices-preview-header">
          <div>
            <div className="section-subtitle-tag">
              <Bell size={14} /> NOTICE BOARD
            </div>
            <h2 id="notice-preview-title" className="section-main-title notice-preview-title">
              Latest <span className="text-brand">Announcements</span>
            </h2>
            <p className="section-desc">
              Official circulars, recruitment deadlines, and guest lecture schedules.
            </p>
          </div>

          <Link to="/notices" className="btn-secondary notice-view-all-btn">
            <span>View Notice Board</span>
            <ArrowRight size={16} />
          </Link>
        </header>

        {/* NOTICES LIST */}
        <div className="notices-grid">
          {notices.map((notice) => (
            <article key={notice.id} className="notice-card" aria-labelledby={`notice-head-${notice.id}`}>
              <div className="notice-left">
                {/* Date Badge */}
                <div className="notice-date-badge">
                  <span className="notice-day">{notice.day || notice.date?.slice(8, 10) || '28'}</span>
                  <span className="notice-month">{notice.month || 'AUG'}</span>
                </div>

                {/* Details */}
                <div className="notice-body">
                  <div className="notice-meta">
                    <span className={`notice-cat-tag ${notice.category?.toLowerCase()}`}>
                      {notice.category}
                    </span>
                    {notice.isPinned && (
                      <span className="notice-pinned-tag">
                        <Pin size={12} /> Pinned
                      </span>
                    )}
                    <span className="notice-author-tag">
                      By {notice.author}
                    </span>
                  </div>

                  <h3 id={`notice-head-${notice.id}`} className="notice-title">{notice.title}</h3>
                  <p className="notice-snippet">{notice.summary}</p>
                </div>
              </div>

              <Link
                to="/notices"
                className="notice-action-btn"
                aria-label={`Read full notice: ${notice.title}`}
              >
                <ArrowRight size={20} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
