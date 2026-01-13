import { useState, useMemo, useEffect } from 'react';
import '../css/InnovationSpacePage.css';

export function HerinInstitutionPage({ onBack, onSave, institutions = [], onAddInstitutionClick, onDelete, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(institutions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInstitutions = useMemo(() => {
    return institutions.slice(startIndex, endIndex);
  }, [institutions, startIndex, endIndex]);

  // Reset to page 1 when institutions change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [institutions.length, totalPages, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="innovation-space-page">
      <div className="innovation-space-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="innovation-space-page-title">HERIN Institutions Management</h1>
      </div>

      <div className="innovation-space-page-content">
        {/* Institutions List */}
        <div className="spaces-list-container">
          <div className="spaces-list-header">
            <h2 className="spaces-list-title">
              All HERIN Institutions ({institutions.length})
              {institutions.length > itemsPerPage && (
                <span style={{ fontSize: '14px', fontWeight: 'normal', color: '#6b7280', marginLeft: '8px' }}>
                  (Showing {startIndex + 1}-{Math.min(endIndex, institutions.length)} of {institutions.length})
                </span>
              )}
            </h2>
            <button className="add-space-button" onClick={onAddInstitutionClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Institution</span>
            </button>
          </div>
          {institutions.length === 0 ? (
            <div className="no-spaces">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p>No HERIN institutions added yet. Create your first institution above!</p>
            </div>
          ) : (
            <div className="spaces-table-wrapper">
              <table className="spaces-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Operation Area</th>
                    <th>Region</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInstitutions.map((institution) => (
                    <tr key={institution.id}>
                      <td className="table-name-cell">
                        <strong>{institution.name}</strong>
                      </td>
                      <td className="table-category-cell">
                        {institution.operation_area || 'N/A'}
                      </td>
                      <td className="table-sector-cell">
                        {institution.region || 'N/A'}
                      </td>
                      <td className="table-location-cell">
                        {institution.category || 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(institution)}
                              title="Edit institution"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(institution.id)}
                              title="Delete institution"
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
          
          {/* Pagination Controls */}
          {institutions.length > itemsPerPage && (
            <div className="pagination-container">
              <div className="pagination-info">
                Page {currentPage} of {totalPages}
              </div>
              <div className="pagination-controls">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  title="Previous page"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="pagination-ellipsis">...</span>;
                    }
                    return null;
                  })}
                </div>
                
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  title="Next page"
                >
                  Next
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

