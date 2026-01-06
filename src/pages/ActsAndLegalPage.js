import '../css/ActsAndLegalPage.css';

export function ActsAndLegalPage({ onBack, onSave, actsAndLegal = [], onAddActClick, onDelete, onEdit }) {

  return (
    <div className="acts-and-legal-page">
      <div className="acts-and-legal-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="acts-and-legal-page-title">Acts and Legal Management</h1>
      </div>

      <div className="acts-and-legal-page-content">
        {/* Acts and Legal List */}
        <div className="acts-and-legal-list-container">
          <div className="acts-and-legal-list-header">
            <h2 className="acts-and-legal-list-title">All Acts and Legal ({actsAndLegal.length})</h2>
            <button className="add-act-button" onClick={onAddActClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Act and Legal</span>
            </button>
          </div>
          {actsAndLegal.length === 0 ? (
            <div className="no-acts">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p>No acts and legal documents uploaded yet. Create your first document above!</p>
            </div>
          ) : (
            <div className="acts-and-legal-table-wrapper">
              <table className="acts-and-legal-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Document</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {actsAndLegal.map((act) => (
                    <tr key={act.id}>
                      <td className="table-title-cell">
                        <strong>{act.title}</strong>
                      </td>
                      <td className="table-date-cell">
                        {act.date || 'N/A'}
                      </td>
                      <td className="table-document-cell">
                        {act.document ? (
                          <a href={act.document} target="_blank" rel="noopener noreferrer" className="document-link">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            View Document
                          </a>
                        ) : (
                          <span className="no-document">No Document</span>
                        )}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(act)}
                              title="Edit act and legal"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(act.id)}
                              title="Delete act and legal"
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

