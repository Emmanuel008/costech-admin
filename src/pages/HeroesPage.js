import '../css/HeroesPage.css';

export function HeroesPage({ onBack, onSave, heroes = [], onAddHeroClick, onDelete, onEdit }) {

  return (
    <div className="heroes-page">
      <div className="heroes-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="heroes-page-title">Heroes Management</h1>
      </div>

      <div className="heroes-page-content">
        {/* Heroes List */}
        <div className="heroes-list-container">
          <div className="heroes-list-header">
            <h2 className="heroes-list-title">All Heroes ({heroes.length})</h2>
            <button className="add-hero-button" onClick={onAddHeroClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Hero</span>
            </button>
          </div>
          {heroes.length === 0 ? (
            <div className="no-heroes">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 4a2 2 0 002 2m0 0a2 2 0 002-2m-2 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>No heroes uploaded yet. Create your first hero above!</p>
            </div>
          ) : (
            <div className="heroes-table-wrapper">
              <table className="heroes-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Tagline</th>
                    <th>Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {heroes.map((item, index) => (
                    <tr key={item.uuid || item.id || `hero-row-${index}`}>
                      <td className="table-image-cell">
                        {item.image ? (
                          <div className="table-image">
                            <img src={item.image} alt={item.title} />
                          </div>
                        ) : (
                          <span className="no-image">No Image</span>
                        )}
                      </td>
                      <td className="table-title-cell">
                        <strong>{item.title}</strong>
                      </td>
                      <td className="table-tagline-cell">
                        {item.tagline}
                      </td>
                      <td className="table-content-cell">
                        {item.content ? (item.content.length > 100 ? item.content.substring(0, 100) + '...' : item.content) : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(item)}
                              title="Edit hero"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(item.uuid || item.id)}
                              title="Delete hero"
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

