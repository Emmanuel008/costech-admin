import '../css/ExhibitionPage.css';

export function ExhibitionPage({ onBack, onSave, exhibitions = [], onAddExhibitionClick, onDelete, onEdit }) {

  return (
    <div className="exhibition-page">
      <div className="exhibition-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="exhibition-page-title">Exhibition Management</h1>
      </div>

      <div className="exhibition-page-content">
        {/* Exhibitions List */}
        <div className="exhibition-list-container">
          <div className="exhibition-list-header">
            <h2 className="exhibition-list-title">All Exhibitions ({exhibitions.length})</h2>
            <button className="add-exhibition-button" onClick={onAddExhibitionClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Exhibition</span>
            </button>
          </div>
          {exhibitions.length === 0 ? (
            <div className="no-exhibitions">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p>No exhibitions uploaded yet. Create your first exhibition above!</p>
            </div>
          ) : (
            <div className="exhibition-table-wrapper">
              <table className="exhibition-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {exhibitions.map((exhibition) => (
                    <tr key={exhibition.id}>
                      <td className="table-image-cell">
                        {exhibition.image ? (
                          <img 
                            src={exhibition.image.startsWith('http') ? exhibition.image : `https://costech.kingdomsolutions.co.tz/${exhibition.image}`}
                            alt={exhibition.title}
                            className="exhibition-image"
                            onError={(e) => {
                              e.target.src = '/assets/img/placeholder.png';
                            }}
                          />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </td>
                      <td className="table-title-cell">
                        <strong>{exhibition.title}</strong>
                      </td>
                      <td className="table-date-cell">
                        {exhibition.date || 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(exhibition)}
                              title="Edit exhibition"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(exhibition.id)}
                              title="Delete exhibition"
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

