import '../css/PositionPage.css';

export function PositionPage({ onBack, onSave, positions = [], onAddPositionClick, onDelete, onEdit }) {

  return (
    <div className="position-page">
      <div className="position-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="position-page-title">Position/Cheo Management</h1>
      </div>

      <div className="position-page-content">
        {/* Positions List */}
        <div className="positions-list-container">
          <div className="positions-list-header">
            <h2 className="positions-list-title">All Positions ({positions.length})</h2>
            <button className="add-position-button" onClick={onAddPositionClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Position</span>
            </button>
          </div>
          {positions.length === 0 ? (
            <div className="no-positions">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>No positions created yet. Create your first position above!</p>
            </div>
          ) : (
            <div className="positions-table-wrapper">
              <table className="positions-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((position) => (
                    <tr key={position.id}>
                      <td className="table-name-cell">
                        <strong>{position.name}</strong>
                      </td>
                      <td className="table-description-cell">
                        {position.description || 'N/A'}
                      </td>
                      <td className="table-date-cell">
                        {position.createdAt ? new Date(position.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(position)}
                              title="Edit position"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(position.id)}
                              title="Delete position"
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
