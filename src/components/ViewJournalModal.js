import '../css/ViewJournalModal.css';

export function ViewJournalModal({ onClose, journal }) {
  if (!journal) return null;

  return (
    <div className="view-journal-overlay" onClick={onClose}>
      <div className="view-journal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="view-journal-header">
          <h2 className="view-journal-title">Journal Details</h2>
          <button className="view-journal-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="view-journal-content">
          <div className="view-field">
            <label className="view-label">ISSN</label>
            <div className="view-value">{journal.issn || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Title</label>
            <div className="view-value">{journal.title || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Publisher</label>
            <div className="view-value">{journal.publisher || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Mode</label>
            <div className="view-value">{journal.mode || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Frequency</label>
            <div className="view-value">{journal.frequency || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Subject</label>
            <div className="view-value">{journal.subject || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Language</label>
            <div className="view-value">{journal.language || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Indexed</label>
            <div className="view-value">{journal.indexed || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">University</label>
            <div className="view-value">{journal.university || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">URL</label>
            <div className="view-value">
              {journal.url ? (
                <a 
                  href={journal.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="view-link"
                >
                  {journal.url}
                </a>
              ) : (
                'N/A'
              )}
            </div>
          </div>
        </div>

        <div className="view-journal-actions">
          <button type="button" className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
