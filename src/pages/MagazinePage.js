import '../css/MagazinePage.css';

export function MagazinePage({ onBack, onSave, magazines = [], onAddMagazineClick, onDelete, onEdit }) {

  return (
    <div className="magazine-page">
      <div className="magazine-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="magazine-page-title">Magazines Management</h1>
      </div>

      <div className="magazine-page-content">
        {/* Magazines List */}
        <div className="magazine-list-container">
          <div className="magazine-list-header">
            <h2 className="magazine-list-title">All Magazines ({magazines.length})</h2>
            <button className="add-magazine-button" onClick={onAddMagazineClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Magazine</span>
            </button>
          </div>
          {magazines.length === 0 ? (
            <div className="no-magazines">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p>No magazines uploaded yet. Create your first magazine above!</p>
            </div>
          ) : (
            <div className="magazine-table-wrapper">
              <table className="magazine-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Document</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {magazines.map((magazine) => (
                    <tr key={magazine.id}>
                      <td className="table-title-cell">
                        <strong>{magazine.title}</strong>
                      </td>
                      <td className="table-date-cell">
                        {magazine.date || 'N/A'}
                      </td>
                      <td className="table-document-cell">
                        {magazine.document ? (
                          <a href={magazine.document} target="_blank" rel="noopener noreferrer" className="document-link">
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
                              onClick={() => onEdit(magazine)}
                              title="Edit magazine"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(magazine.id)}
                              title="Delete magazine"
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

