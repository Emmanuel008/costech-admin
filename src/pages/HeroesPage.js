import '../css/HeroesPage.css';
import { Pagination } from '../components/Pagination';
import { getHtmlPreview } from '../utils/htmlUtils';

export function HeroesPage({ onBack, onSave, heroes = [], onAddHeroClick, onDelete, onEdit, pagination }) {

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <p>No heroes added yet. Create your first hero above!</p>
            </div>
          ) : (
            <div className="heroes-table-wrapper">
              <table className="heroes-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Reference</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {heroes.map((hero) => (
                    <tr key={hero.id}>
                      <td className="table-image-cell">
                        {hero.image ? (
                          <div className="table-image">
                            <img src={hero.image} alt={hero.title || 'Hero'} />
                          </div>
                        ) : (
                          <span className="no-image">No Image</span>
                        )}
                      </td>
                      <td className="table-title-cell">
                        {hero.title || 'N/A'}
                      </td>
                      <td className="table-description-cell">
                        {hero.description ? (
                          <div 
                            className="description-text html-content" 
                            title={getHtmlPreview(hero.description, 200)}
                            dangerouslySetInnerHTML={{ __html: hero.description }}
                          />
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="table-reference-cell">
                        {hero.reference !== null && hero.reference !== undefined ? hero.reference : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(hero)}
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
                              onClick={() => onDelete(hero.id)}
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
