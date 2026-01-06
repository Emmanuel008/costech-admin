import '../css/OnlineServicePage.css';

export function OnlineServicePage({ onBack, onSave, services = [], onAddServiceClick, onDelete, onEdit }) {

  return (
    <div className="online-service-page">
      <div className="online-service-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="online-service-page-title">Online Services Management</h1>
      </div>

      <div className="online-service-page-content">
        {/* Services List */}
        <div className="online-service-list-container">
          <div className="online-service-list-header">
            <h2 className="online-service-list-title">All Online Services ({services.length})</h2>
            <button className="add-service-button" onClick={onAddServiceClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Online Service</span>
            </button>
          </div>
          {services.length === 0 ? (
            <div className="no-services">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <p>No online services created yet. Create your first service above!</p>
            </div>
          ) : (
            <div className="online-service-table-wrapper">
              <table className="online-service-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Link</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id}>
                      <td className="table-name-cell">
                        <strong>{service.name}</strong>
                      </td>
                      <td className="table-link-cell">
                        <a href={service.link} target="_blank" rel="noopener noreferrer" className="service-link">
                          {service.link}
                        </a>
                      </td>
                      <td className="table-date-cell">
                        {service.createdAt ? new Date(service.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(service)}
                              title="Edit service"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(service.id)}
                              title="Delete service"
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

