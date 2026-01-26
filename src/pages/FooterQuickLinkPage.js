import '../css/FooterQuickLinkPage.css';
import { Pagination } from '../components/Pagination';

export function FooterQuickLinkPage({ onBack, onSave, links = [], onAddLinkClick, onDelete, onEdit, pagination }) {

  return (
    <div className="footer-quick-link-page">
      <div className="footer-quick-link-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="footer-quick-link-page-title">Footer Quick Link Management</h1>
      </div>

      <div className="footer-quick-link-page-content">
        {/* Links List */}
        <div className="footer-quick-link-list-container">
          <div className="footer-quick-link-list-header">
            <h2 className="footer-quick-link-list-title">All Footer Quick Links ({links.length})</h2>
            <button className="add-link-button" onClick={onAddLinkClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Quick Link</span>
            </button>
          </div>
          {links.length === 0 ? (
            <div className="no-links">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <p>No footer quick links created yet. Create your first link above!</p>
            </div>
          ) : (
            <div className="footer-quick-link-table-wrapper">
              <table className="footer-quick-link-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id}>
                      <td className="table-name-cell">
                        <strong>{link.name}</strong>
                      </td>
                      <td className="table-link-cell">
                        <a href={link.link} target="_blank" rel="noopener noreferrer" className="link-url">
                          {link.link}
                        </a>
                      </td>
                      <td className="table-date-cell">
                        {link.createdAt ? new Date(link.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(link)}
                              title="Edit link"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(link.id)}
                              title="Delete link"
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
