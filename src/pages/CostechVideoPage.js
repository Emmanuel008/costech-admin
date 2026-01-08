import '../css/CostechVideoPage.css';

export function CostechVideoPage({ onBack, onSave, videos = [], onAddVideoClick, onDelete, onEdit }) {

  return (
    <div className="costech-video-page">
      <div className="costech-video-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="costech-video-page-title">Costech Video Management</h1>
      </div>

      <div className="costech-video-page-content">
        {/* Videos List */}
        <div className="costech-video-list-container">
          <div className="costech-video-list-header">
            <h2 className="costech-video-list-title">All Videos ({videos.length})</h2>
            <button className="add-video-button" onClick={onAddVideoClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Video</span>
            </button>
          </div>
          {videos.length === 0 ? (
            <div className="no-videos">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p>No videos uploaded yet. Create your first video above!</p>
            </div>
          ) : (
            <div className="costech-video-table-wrapper">
              <table className="costech-video-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Video Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((item) => (
                    <tr key={item.id}>
                      <td className="table-title-cell">
                        <strong>{item.title}</strong>
                      </td>
                      <td className="table-description-cell">
                        {item.description}
                      </td>
                      <td className="table-link-cell">
                        {item.video_link ? (
                          <a href={item.video_link} target="_blank" rel="noopener noreferrer" className="video-link">
                            {item.video_link}
                          </a>
                        ) : (
                          <span className="no-link">No Link</span>
                        )}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(item)}
                              title="Edit video"
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
                              title="Delete video"
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

