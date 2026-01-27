import '../css/InnovationSpacePage.css';
import { Pagination } from '../components/Pagination';

export function DirectoratePage({ onBack, onSave, directorates = [], onAddDirectorateClick, onDelete, onEdit, onView, pagination }) {

  return (
    <div className="innovation-space-page">
      <div className="innovation-space-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="innovation-space-page-title">Directorate Management</h1>
      </div>

      <div className="innovation-space-page-content">
        {/* Directorates List */}
        <div className="spaces-list-container">
          <div className="spaces-list-header">
            <h2 className="spaces-list-title">All Directorates ({directorates.length})</h2>
            <button className="add-space-button" onClick={onAddDirectorateClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Directorate</span>
            </button>
          </div>
          {directorates.length === 0 ? (
            <div className="no-spaces">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p>No directorates added yet. Create your first directorate above!</p>
            </div>
          ) : (
            <div className="spaces-table-wrapper">
              <table className="spaces-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Director Name</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {directorates.map((directorate) => (
                    <tr key={directorate.id}>
                      <td className="table-name-cell">
                        <strong>{directorate.name}</strong>
                      </td>
                      <td className="table-category-cell">
                        {directorate.director_name || 'N/A'}
                      </td>
                      <td className="table-location-cell">
                        {directorate.date || directorate.createdAt 
                          ? new Date(directorate.date || directorate.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })
                          : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onView && (
                            <button
                              className="view-button"
                              onClick={() => onView(directorate)}
                              title="View directorate"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          )}
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(directorate)}
                              title="Edit directorate"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(directorate.id)}
                              title="Delete directorate"
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
          {pagination && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={pagination.totalItems}
              onPageChange={pagination.onPageChange}
              onItemsPerPageChange={pagination.onItemsPerPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

