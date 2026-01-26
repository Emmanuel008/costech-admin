import '../css/ConferencePage.css';
import { Pagination } from '../components/Pagination';

export function ConferencePage({ onBack, onSave, conferences = [], onAddConferenceClick, onDelete, onEdit, onView, pagination }) {

  return (
    <div className="conference-page">
      <div className="conference-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="conference-page-title">Conference Management</h1>
      </div>

      <div className="conference-page-content">
        {/* Conferences List */}
        <div className="conference-list-container">
          <div className="conference-list-header">
            <h2 className="conference-list-title">All Conferences ({conferences.length})</h2>
            <button className="add-conference-button" onClick={onAddConferenceClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Conference</span>
            </button>
          </div>
          {conferences.length === 0 ? (
            <div className="no-conferences">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p>No conferences created yet. Create your first conference above!</p>
            </div>
          ) : (
            <div className="conference-table-wrapper">
              <table className="conference-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Abbreviation</th>
                    <th>Organizer</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {conferences.map((conference) => (
                    <tr key={conference.id}>
                      <td className="table-name-cell">
                        <strong>{conference.name || 'N/A'}</strong>
                      </td>
                      <td className="table-abbreviation-cell">
                        {conference.abbreviation || 'N/A'}
                      </td>
                      <td className="table-organizer-cell">
                        {conference.organizer || 'N/A'}
                      </td>
                      <td className="table-location-cell">
                        {conference.location || 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onView && (
                            <button
                              className="view-button"
                              onClick={() => onView(conference)}
                              title="View conference details"
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
                              onClick={() => onEdit(conference)}
                              title="Edit conference"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(conference.id)}
                              title="Delete conference"
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
