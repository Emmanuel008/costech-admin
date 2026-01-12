import '../css/InnovationSpacePage.css';

export function HerinPointOfPresencePage({ onBack, onSave, pointsOfPresence = [], onAddPointClick, onDelete, onEdit }) {

  return (
    <div className="innovation-space-page">
      <div className="innovation-space-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="innovation-space-page-title">HERIN Points of Presence Management</h1>
      </div>

      <div className="innovation-space-page-content">
        {/* Points of Presence List */}
        <div className="spaces-list-container">
          <div className="spaces-list-header">
            <h2 className="spaces-list-title">All Points of Presence ({pointsOfPresence.length})</h2>
            <button className="add-space-button" onClick={onAddPointClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Point of Presence</span>
            </button>
          </div>
          {pointsOfPresence.length === 0 ? (
            <div className="no-spaces">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>No points of presence added yet. Create your first point above!</p>
            </div>
          ) : (
            <div className="spaces-table-wrapper">
              <table className="spaces-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pointsOfPresence.map((point) => (
                    <tr key={point.id}>
                      <td className="table-name-cell">
                        <strong>{point.name}</strong>
                      </td>
                      <td className="table-description-cell">
                        <div className="description-text">
                          {point.description || 'No description'}
                        </div>
                      </td>
                      <td className="table-location-cell">
                        {point.location || 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(point)}
                              title="Edit point of presence"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(point.id)}
                              title="Delete point of presence"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

