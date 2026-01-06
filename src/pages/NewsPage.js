import '../css/NewsPage.css';

export function NewsPage({ onBack, onSave, news = [], onAddNewsClick, onDelete, onEdit }) {

  return (
    <div className="news-page">
      <div className="news-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="news-page-title">News Management</h1>
      </div>

      <div className="news-page-content">
        {/* News List */}
        <div className="news-list-container">
          <div className="news-list-header">
            <h2 className="news-list-title">All News ({news.length})</h2>
            <button className="add-news-button" onClick={onAddNewsClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add News</span>
            </button>
          </div>
          {news.length === 0 ? (
            <div className="no-news">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 4a2 2 0 002 2m0 0a2 2 0 002-2m-2 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>No news uploaded yet. Create your first news article above!</p>
            </div>
          ) : (
            <div className="news-table-wrapper">
              <table className="news-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item) => (
                    <tr key={item.id}>
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
                      <td className="table-description-cell">
                        {item.description}
                      </td>
                      <td className="table-date-cell">
                        {item.date ? new Date(item.date).toLocaleDateString() : (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A')}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(item)}
                              title="Edit news"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(item.id)}
                              title="Delete news"
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

