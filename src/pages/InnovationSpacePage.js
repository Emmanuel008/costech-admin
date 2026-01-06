import '../css/InnovationSpacePage.css';

export function InnovationSpacePage({ onBack, onSave, spaces = [], onAddSpaceClick, onDelete, onEdit }) {

  return (
    <div className="innovation-space-page">
      <div className="innovation-space-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="innovation-space-page-title">Innovation Space</h1>
      </div>

      <div className="innovation-space-page-content">
        {/* Spaces List */}
        <div className="spaces-list-container">
          <div className="spaces-list-header">
            <h2 className="spaces-list-title">All Innovation Spaces ({spaces.length})</h2>
            <button className="add-space-button" onClick={onAddSpaceClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Innovation Space</span>
            </button>
          </div>
          {spaces.length === 0 ? (
            <div className="no-spaces">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p>No innovation spaces added yet. Create your first space above!</p>
            </div>
          ) : (
            <div className="spaces-table-wrapper">
              <table className="spaces-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Sector</th>
                    <th>Location</th>
                    <th>Contact Person</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {spaces.map((space) => (
                    <tr key={space.id}>
                      <td className="table-image-cell">
                        {space.image ? (
                          <div className="table-image">
                            <img src={space.image} alt={space.name} />
                          </div>
                        ) : (
                          <span className="no-image">No Image</span>
                        )}
                      </td>
                      <td className="table-name-cell">
                        <strong>{space.name}</strong>
                      </td>
                      <td className="table-category-cell">
                        {space.category || 'N/A'}
                      </td>
                      <td className="table-sector-cell">
                        {space.sector || 'N/A'}
                      </td>
                      <td className="table-location-cell">
                        {space.location || 'N/A'}
                      </td>
                      <td className="table-contact-cell">
                        <div className="contact-info">
                          <div>{space.contact_person_name || 'N/A'}</div>
                          <div className="contact-email">{space.contact_person_email || ''}</div>
                        </div>
                      </td>
                      <td className="table-date-cell">
                        {space.createdAt ? new Date(space.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(space)}
                              title="Edit space"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(space.id)}
                              title="Delete space"
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
