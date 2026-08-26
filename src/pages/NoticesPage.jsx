import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  X,
  FileText,
  Plus,
  Edit2,
  Trash2,
  Shield,
  CheckCircle2,
  Pin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NoticesPage() {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNoticeModal, setActiveNoticeModal] = useState(null);

  // Admin Mode state
  const [isAdminMode, setIsAdminMode] = useState(user?.role === 'admin');

  // Form modal state for Add / Edit
  const [noticeFormOpen, setNoticeFormOpen] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hackathon',
    date: new Date().toISOString().split('T')[0],
    author: 'FinWiz Executive Committee',
    summary: '',
    content: '',
    isPinned: false,
  });

  // Load notices from in-code storage
  const loadNotices = () => {
    const list = apiService.getNotices();
    setNotices(list);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const categories = ['All', 'Hackathon', 'Session', 'Recruitment', 'Workshop'];

  // Filter notices purely by category
  const filteredNotices = notices.filter((n) => {
    return selectedCategory === 'All' || n.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Open Add Notice Form
  const handleOpenAdd = () => {
    setEditingNoticeId(null);
    setFormData({
      title: '',
      category: 'Hackathon',
      date: new Date().toISOString().split('T')[0],
      author: user?.name || 'FinWiz Admin',
      summary: '',
      content: '',
      isPinned: false,
    });
    setNoticeFormOpen(true);
  };

  // Open Edit Notice Form
  const handleOpenEdit = (notice, e) => {
    e.stopPropagation();
    setEditingNoticeId(notice.id);
    setFormData({
      title: notice.title,
      category: notice.category,
      date: notice.date || new Date().toISOString().split('T')[0],
      author: notice.author,
      summary: notice.summary,
      content: notice.content,
      isPinned: !!notice.isPinned,
    });
    setNoticeFormOpen(true);
  };

  // Handle Delete Notice
  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this notice?')) {
      const updated = apiService.deleteNotice(id);
      setNotices(updated);
      if (activeNoticeModal?.id === id) {
        setActiveNoticeModal(null);
      }
    }
  };

  // Save Notice (Add or Update)
  const handleSaveNotice = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim()) return;

    if (editingNoticeId) {
      const updated = apiService.updateNotice(editingNoticeId, formData);
      setNotices(updated);
    } else {
      const updated = apiService.addNotice(formData);
      setNotices(updated);
    }

    setNoticeFormOpen(false);
    setEditingNoticeId(null);
  };

  return (
    <div className="container page-content-container">
      {/* Header */}
      <header className="page-header-block">
        <Link to="/" className="back-nav-link" aria-label="Back to home page">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="notices-header-row">
          <div>
            <div className="section-subtitle-tag">
              OFFICIAL BULLETIN · NIT WARANGAL
            </div>
            <h1 className="page-main-title">
              Club <span className="text-brand">Notice Board</span>
            </h1>
            <p className="page-main-subtitle">
              Official circulars, recruitment schedules, and competition updates stored in the club registry (Max 10 active notices).
            </p>
          </div>

          {/* Admin Mode Toggle */}
          <button
            className={isAdminMode ? 'btn-primary admin-toggle-btn' : 'btn-secondary admin-toggle-btn'}
            onClick={() => setIsAdminMode(!isAdminMode)}
            aria-label="Toggle Admin Portal Controls"
          >
            <Shield size={16} />
            <span>{isAdminMode ? 'Admin Portal Active' : 'Admin Portal Controls'}</span>
          </button>
        </div>
      </header>

      {/* ADMIN CONTROL BAR (Visible in Admin Mode) */}
      {isAdminMode && (
        <aside className="admin-portal-banner" aria-label="Notice Admin Controls">
          <div className="admin-banner-left">
            <Shield size={18} className="text-brand" />
            <div>
              <h2 className="admin-banner-title">Admin Notice Manager</h2>
              <p className="admin-banner-sub">
                Notices active: <strong>{notices.length} / 10 max limit</strong> (In-code list)
              </p>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleOpenAdd}
            disabled={notices.length >= 10}
            aria-label="Add new notice"
          >
            <Plus size={16} />
            <span>Add New Notice</span>
          </button>
        </aside>
      )}

      {/* CATEGORY FILTER PANEL */}
      <section className="notices-category-row" aria-label="Category Filters">
        <div className="notices-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'btn-primary cat-filter-btn' : 'btn-secondary cat-filter-btn'}
              aria-pressed={selectedCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="notices-count-tag">
          Showing {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''}
        </span>
      </section>

      {/* NOTICES LIST (EXPANDS TO FULL CONTAINER WIDTH) */}
      <section className="notices-list-container" aria-label="Announcements List">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <article
              key={notice.id}
              className="glass-card notice-full-card"
              onClick={() => setActiveNoticeModal(notice)}
              aria-labelledby={`notice-title-${notice.id}`}
            >
              {/* Date Box */}
              <div className="notice-date-badge date-badge-large">
                <span className="notice-day day-large">
                  {notice.day || notice.date?.slice(8, 10) || '28'}
                </span>
                <span className="notice-month">{notice.month || 'AUG'}</span>
              </div>

              {/* Notice Details */}
              <div className="notice-card-content">
                <div className="notice-meta-tags">
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

                <h2 id={`notice-title-${notice.id}`} className="notice-card-heading">
                  {notice.title}
                </h2>
                <p className="notice-card-text">
                  {notice.summary}
                </p>

                <div className="notice-card-cta">
                  <FileText size={14} />
                  <span>Click to view complete details</span>
                </div>
              </div>

              {/* Admin Actions on Card */}
              {isAdminMode && (
                <div className="notice-admin-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="btn-secondary notice-edit-btn"
                    onClick={(e) => handleOpenEdit(notice, e)}
                    aria-label={`Edit notice: ${notice.title}`}
                  >
                    <Edit2 size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    className="btn-danger"
                    onClick={(e) => handleDelete(notice.id, e)}
                    aria-label={`Delete notice: ${notice.title}`}
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </article>
          ))
        ) : (
          <div className="notices-empty-state">
            <p>No notices available in category &quot;{selectedCategory}&quot;.</p>
          </div>
        )}
      </section>

      {/* NOTICE FULL DETAILS MODAL */}
      {activeNoticeModal && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveNoticeModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-notice-heading"
        >
          <div className="auth-modal-card notice-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveNoticeModal(null)}
              aria-label="Close notice dialog"
            >
              <X size={18} />
            </button>

            <header className="auth-header notice-modal-header">
              <div className="notice-modal-meta">
                <span className={`notice-cat-tag ${activeNoticeModal.category?.toLowerCase()}`}>
                  {activeNoticeModal.category}
                </span>
                <span className="notice-modal-date">
                  Date: {activeNoticeModal.date}
                </span>
              </div>
              <h2 id="modal-notice-heading" className="notice-modal-title">
                {activeNoticeModal.title}
              </h2>
            </header>

            <div className="auth-body notice-modal-body">
              <h3 className="notice-modal-section-title">Official Circular</h3>
              <p className="notice-modal-content-text">
                {activeNoticeModal.content || activeNoticeModal.summary}
              </p>

              <aside className="notice-modal-issuer-box">
                <p>
                  Issued by: <strong>{activeNoticeModal.author}</strong><br />
                  FinWiz Club · NIT Warangal
                </p>
              </aside>

              <button
                className="btn-secondary notice-modal-close-action"
                onClick={() => setActiveNoticeModal(null)}
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN ADD / EDIT NOTICE MODAL */}
      {noticeFormOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setNoticeFormOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="form-modal-title"
        >
          <div className="auth-modal-card notice-form-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setNoticeFormOpen(false)}
              aria-label="Close form"
            >
              <X size={18} />
            </button>

            <header className="auth-header">
              <h2 id="form-modal-title" className="auth-title">
                {editingNoticeId ? 'Edit Notice' : 'Add New Notice'}
              </h2>
              <p className="auth-subtitle">
                Stored in code registry (Max 10 limit)
              </p>
            </header>

            <form onSubmit={handleSaveNotice} className="auth-body">
              <div className="auth-form-group">
                <label htmlFor="notice-title" className="auth-label">Notice Title *</label>
                <input
                  id="notice-title"
                  type="text"
                  className="auth-input input-no-icon"
                  placeholder="e.g. FinHack 2026: Prelims Guidelines"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-2col">
                <div className="auth-form-group">
                  <label htmlFor="notice-cat" className="auth-label">Category *</label>
                  <select
                    id="notice-cat"
                    className="auth-input auth-select select-no-icon"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Session">Session</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Workshop">Workshop</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="auth-form-group">
                  <label htmlFor="notice-date" className="auth-label">Publication Date *</label>
                  <input
                    id="notice-date"
                    type="date"
                    className="auth-input input-no-icon"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="notice-author" className="auth-label">Issuing Authority *</label>
                <input
                  id="notice-author"
                  type="text"
                  className="auth-input input-no-icon"
                  placeholder="e.g. Core Technical Committee"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="notice-summary" className="auth-label">Brief Summary *</label>
                <textarea
                  id="notice-summary"
                  rows={2}
                  className="auth-input input-no-icon"
                  placeholder="Short description displayed on notice cards..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  required
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="notice-content" className="auth-label">Full Circular Content</label>
                <textarea
                  id="notice-content"
                  rows={4}
                  className="auth-input input-no-icon"
                  placeholder="Detailed circular text, links, eligibility..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="onboarding-actions-row">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setNoticeFormOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <CheckCircle2 size={16} />
                  <span>{editingNoticeId ? 'Update Notice' : 'Publish Notice'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
