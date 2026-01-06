import '../css/GuidelineDocumentsPage.css';

export function GuidelineDocumentsPage({ onBack, onSave, guidelineDocuments = [], onAddDocumentClick, onDelete, onEdit }) {

  return (
    <div className="guideline-documents-page">
      <div className="guideline-documents-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="guideline-documents-page-title">Guideline Documents Management</h1>
      </div>

      <div className="guideline-documents-page-content">
        {/* Guideline Documents List */}
        <div className="guideline-documents-list-container">
          <div className="guideline-documents-list-header">
            <h2 className="guideline-documents-list-title">All Guideline Documents ({guidelineDocuments.length})</h2>
            <button className="add-document-button" onClick={onAddDocumentClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Guideline Document</span>
            </button>
          </div>
          {guidelineDocuments.length === 0 ? (
            <div className="no-documents">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p>No guideline documents uploaded yet. Create your first guideline document above!</p>
            </div>
          ) : (
            <div className="guideline-documents-table-wrapper">
              <table className="guideline-documents-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Document</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {guidelineDocuments.map((document) => (
                    <tr key={document.id}>
                      <td className="table-title-cell">
                        <strong>{document.title}</strong>
                      </td>
                      <td className="table-date-cell">
                        {document.date || 'N/A'}
                      </td>
                      <td className="table-document-cell">
                        {document.document ? (
                          <a href={document.document} target="_blank" rel="noopener noreferrer" className="document-link">
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
                              onClick={() => onEdit(document)}
                              title="Edit guideline document"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(document.id)}
                              title="Delete guideline document"
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

