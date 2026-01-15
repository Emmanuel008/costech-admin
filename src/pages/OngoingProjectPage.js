import '../css/OngoingProjectPage.css';
import { Pagination } from '../components/Pagination';

export function OngoingProjectPage({ onBack, onSave, ongoingProjects = [], onAddProjectClick, onDelete, onEdit, pagination }) {

  return (
    <div className="ongoing-project-page">
      <div className="ongoing-project-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="ongoing-project-page-title">Ongoing Project Management</h1>
      </div>

      <div className="ongoing-project-page-content">
        {/* Ongoing Projects List */}
        <div className="ongoing-project-list-container">
          <div className="ongoing-project-list-header">
            <h2 className="ongoing-project-list-title">All Ongoing Projects ({ongoingProjects.length})</h2>
            <button className="add-project-button" onClick={onAddProjectClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Ongoing Project</span>
            </button>
          </div>
          {ongoingProjects.length === 0 ? (
            <div className="no-projects">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p>No ongoing projects uploaded yet. Create your first ongoing project above!</p>
            </div>
          ) : (
            <div className="ongoing-project-table-wrapper">
              <table className="ongoing-project-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ongoingProjects.map((project) => (
                    <tr key={project.id}>
                      <td className="table-image-cell">
                        {project.image ? (
                          <img 
                            src={project.image.startsWith('http') ? project.image : `https://costech.kingdomsolutions.co.tz/${project.image}`}
                            alt={project.title}
                            className="project-image"
                            onError={(e) => {
                              e.target.src = '/assets/img/placeholder.png';
                            }}
                          />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </td>
                      <td className="table-title-cell">
                        <strong>{project.title}</strong>
                      </td>
                      <td className="table-description-cell">
                        <div className="description-text">
                          {project.description || 'No description'}
                        </div>
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(project)}
                              title="Edit ongoing project"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(project.id)}
                              title="Delete ongoing project"
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

