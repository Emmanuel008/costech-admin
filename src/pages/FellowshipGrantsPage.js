import '../css/FellowshipGrantsPage.css';
import { Pagination } from '../components/Pagination';

export function FellowshipGrantsPage({ onBack, onSave, fellowshipGrants = [], onAddGrantClick, onDelete, onEdit, pagination }) {

  return (
    <div className="fellowship-grants-page">
      <div className="fellowship-grants-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="fellowship-grants-page-title">Fellowship Grants Management</h1>
      </div>

      <div className="fellowship-grants-page-content">
        {/* Fellowship Grants List */}
        <div className="fellowship-grants-list-container">
          <div className="fellowship-grants-list-header">
            <h2 className="fellowship-grants-list-title">All Fellowship Grants ({fellowshipGrants.length})</h2>
            <button className="add-grant-button" onClick={onAddGrantClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Fellowship Grant</span>
            </button>
          </div>
          {fellowshipGrants.length === 0 ? (
            <div className="no-grants">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No fellowship grants uploaded yet. Create your first fellowship grant above!</p>
            </div>
          ) : (
            <div className="fellowship-grants-table-wrapper">
              <table className="fellowship-grants-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Link</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fellowshipGrants.map((grant) => (
                    <tr key={grant.id}>
                      <td className="table-title-cell">
                        <strong>{grant.title}</strong>
                      </td>
                      <td className="table-description-cell">
                        <div className="description-text">
                          {grant.description || 'No description'}
                        </div>
                      </td>
                      <td className="table-link-cell">
                        {grant.link ? (
                          <a href={grant.link} target="_blank" rel="noopener noreferrer" className="link-text">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Link
                          </a>
                        ) : (
                          <span className="no-link">No Link</span>
                        )}
                      </td>
                      <td className="table-status-cell">
                        <span className={`status-badge ${grant.status?.toLowerCase() || 'open'}`}>
                          {grant.status || 'OPEN'}
                        </span>
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(grant)}
                              title="Edit fellowship grant"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(grant.id)}
                              title="Delete fellowship grant"
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

