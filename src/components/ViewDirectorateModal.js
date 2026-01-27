import '../css/ViewDirectorateModal.css';

export function ViewDirectorateModal({ onClose, directorate }) {
  if (!directorate) return null;

  return (
    <div className="view-directorate-overlay" onClick={onClose}>
      <div className="view-directorate-modal" onClick={(e) => e.stopPropagation()}>
        <div className="view-directorate-header">
          <h2 className="view-directorate-title">Directorate Details</h2>
          <button className="view-directorate-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="view-directorate-content">
          <div className="view-field">
            <label className="view-label">Name</label>
            <div className="view-value">{directorate.name || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Director Name</label>
            <div className="view-value">{directorate.director_name || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Message From Director</label>
            <div className="view-value">{directorate.message_from_director || 'N/A'}</div>
          </div>

          <div className="view-field">
            <label className="view-label">Date</label>
            <div className="view-value">
              {directorate.date || directorate.createdAt
                ? new Date(directorate.date || directorate.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'N/A'}
            </div>
          </div>

          <div className="view-field">
            <label className="view-label">Services Offered</label>
            <div className="view-value">
              {directorate.service_offered && Array.isArray(directorate.service_offered) && directorate.service_offered.length > 0
                ? (
                    <ul className="view-list">
                      {directorate.service_offered.map((service, idx) => (
                        <li key={idx}>{service}</li>
                      ))}
                    </ul>
                  )
                : 'None'}
            </div>
          </div>

          <div className="view-field">
            <label className="view-label">Downloads</label>
            <div className="view-value">
              {directorate.downloads && Array.isArray(directorate.downloads) && directorate.downloads.length > 0
                ? (
                    <ul className="view-list">
                      {directorate.downloads.map((download, idx) => (
                        <li key={idx}>
                          {download.name || 'Unnamed'}
                          {download.document && (
                            <a href={download.document} target="_blank" rel="noopener noreferrer" className="view-link">
                              {' '}(View Document)
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )
                : 'No downloads'}
            </div>
          </div>

          {directorate.document && (
            <div className="view-field">
              <label className="view-label">Document</label>
              <div className="view-value">
                <a href={directorate.document} target="_blank" rel="noopener noreferrer" className="view-link">
                  View Document
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="view-directorate-actions">
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
