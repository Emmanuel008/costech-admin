import '../css/SocialMediaPlatformPage.css';
import { Pagination } from '../components/Pagination';

export function SocialMediaPlatformPage({ onBack, onSave, platforms = [], onAddPlatformClick, onDelete, onEdit, pagination }) {


  return (
    <div className="social-media-platform-page">
      <div className="social-media-platform-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="social-media-platform-page-title">Social Media Platform Management</h1>
      </div>

      <div className="social-media-platform-page-content">
        {/* Platforms List */}
        <div className="social-media-platform-list-container">
          <div className="social-media-platform-list-header">
            <h2 className="social-media-platform-list-title">All Social Media Platforms ({platforms.length})</h2>
            <button className="add-platform-button" onClick={onAddPlatformClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Platform</span>
            </button>
          </div>
          {platforms.length === 0 ? (
            <div className="no-platforms">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>No social media platforms created yet. Create your first platform above!</p>
            </div>
          ) : (
            <div className="social-media-platform-table-wrapper">
              <table className="social-media-platform-table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Link</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((platform) => (
                    <tr key={platform.id}>
                      <td className="table-icon-cell">
                        {platform.icon ? (
                          <img 
                            src={platform.icon} 
                            alt="Platform icon" 
                            className="platform-icon-image"
                          />
                        ) : (
                          <span className="platform-icon-name">N/A</span>
                        )}
                      </td>
                      <td className="table-link-cell">
                        <a href={platform.link} target="_blank" rel="noopener noreferrer" className="platform-link">
                          {platform.link || 'N/A'}
                        </a>
                      </td>
                      <td className="table-date-cell">
                        {platform.createdAt ? new Date(platform.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(platform)}
                              title="Edit platform"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(platform.id)}
                              title="Delete platform"
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
