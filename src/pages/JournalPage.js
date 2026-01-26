import '../css/JournalPage.css';
import { Pagination } from '../components/Pagination';

export function JournalPage({ onBack, onSave, journals = [], onAddJournalClick, onDelete, onEdit, onView, pagination }) {

  return (
    <div className="journal-page">
      <div className="journal-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="journal-page-title">Journal Management</h1>
      </div>

      <div className="journal-page-content">
        {/* Journals List */}
        <div className="journal-list-container">
          <div className="journal-list-header">
            <h2 className="journal-list-title">All Journals ({journals.length})</h2>
            <button className="add-journal-button" onClick={onAddJournalClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Journal</span>
            </button>
          </div>
          {journals.length === 0 ? (
            <div className="no-journals">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p>No journals created yet. Create your first journal above!</p>
            </div>
          ) : (
            <div className="journal-table-wrapper">
              <table className="journal-table">
                <thead>
                  <tr>
                    <th>ISSN</th>
                    <th>Title</th>
                    <th>Publisher</th>
                    <th>Subject</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {journals.map((journal) => (
                    <tr key={journal.id}>
                      <td className="table-issn-cell">
                        <strong>{journal.issn || 'N/A'}</strong>
                      </td>
                      <td className="table-title-cell">
                        {journal.title || 'N/A'}
                      </td>
                      <td className="table-publisher-cell">
                        {journal.publisher || 'N/A'}
                      </td>
                      <td className="table-subject-cell">
                        {journal.subject || 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onView && (
                            <button
                              className="view-button"
                              onClick={() => onView(journal)}
                              title="View journal details"
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
                              onClick={() => onEdit(journal)}
                              title="Edit journal"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(journal.id)}
                              title="Delete journal"
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
