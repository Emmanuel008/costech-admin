import '../css/ViewConferenceModal.css';

export function ViewConferenceModal({ onClose, conference }) {
  if (!conference) return null;

  return (
    <div className="view-conference-overlay" onClick={onClose}>
      <div className="view-conference-modal" onClick={(e) => e.stopPropagation()}>
        <div className="view-conference-header">
          <h2 className="view-conference-title">Conference Details</h2>
          <button className="view-conference-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="view-conference-content">
          <div className="view-field">
            <label className="view-label">Name</label>
            <div className="view-value">{conference.name || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Abbreviation</label>
            <div className="view-value">{conference.abbreviation || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Organizer</label>
            <div className="view-value">{conference.organizer || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Theme</label>
            <div className="view-value">{conference.theme || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Tentative Start Date</label>
            <div className="view-value">
              {conference.tentative_start_date 
                ? new Date(conference.tentative_start_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                : 'N/A'}
            </div>
          </div>

          <div className="view-field">
            <label className="view-label">Tentative End Date</label>
            <div className="view-value">
              {conference.tentative_end_date 
                ? new Date(conference.tentative_end_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                : 'N/A'}
            </div>
          </div>

          <div className="view-field">
            <label className="view-label">Location</label>
            <div className="view-value">{conference.location || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Link</label>
            <div className="view-value">
              {conference.link ? (
                <a 
                  href={conference.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="view-link"
                >
                  {conference.link}
                </a>
              ) : (
                'N/A'
              )}
            </div>
          </div>
        </div>

        <div className="view-conference-actions">
          <button type="button" className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
