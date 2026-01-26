import '../css/ViewExhibitionModal.css';

export function ViewExhibitionModal({ onClose, exhibition }) {
  if (!exhibition) return null;

  return (
    <div className="view-exhibition-overlay" onClick={onClose}>
      <div className="view-exhibition-modal" onClick={(e) => e.stopPropagation()}>
        <div className="view-exhibition-header">
          <h2 className="view-exhibition-title">Exhibition Details</h2>
          <button className="view-exhibition-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="view-exhibition-content">
          <div className="view-field">
            <label className="view-label">Name</label>
            <div className="view-value">{exhibition.name || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Popular Name</label>
            <div className="view-value">{exhibition.popular_name || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Host Institution</label>
            <div className="view-value">{exhibition.host_institution || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Focus</label>
            <div className="view-value">{exhibition.focus || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Tentative Start Date</label>
            <div className="view-value">
              {exhibition.tentative_start_date 
                ? new Date(exhibition.tentative_start_date).toLocaleDateString('en-US', { 
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
              {exhibition.tentative_end_date 
                ? new Date(exhibition.tentative_end_date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                : 'N/A'}
            </div>
          </div>

          <div className="view-field">
            <label className="view-label">Location</label>
            <div className="view-value">{exhibition.location || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Link</label>
            <div className="view-value">
              {exhibition.link ? (
                <a 
                  href={exhibition.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="view-link"
                >
                  {exhibition.link}
                </a>
              ) : (
                'N/A'
              )}
            </div>
          </div>
        </div>

        <div className="view-exhibition-actions">
          <button type="button" className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
