import '../css/FaqPage.css';
import { Pagination } from '../components/Pagination';

export function FaqPage({ onBack, onSave, faqs = [], categories = [], onAddFaqClick, onDelete, onEdit, pagination }) {

  return (
    <div className="faq-page">
      <div className="faq-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="faq-page-title">FAQ Management</h1>
      </div>

      <div className="faq-page-content">
        {/* FAQs List */}
        <div className="faqs-list-container">
          <div className="faqs-list-header">
            <h2 className="faqs-list-title">All FAQs ({faqs.length})</h2>
            <button className="add-faq-button" onClick={onAddFaqClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add FAQ</span>
            </button>
          </div>
          {faqs.length === 0 ? (
            <div className="no-faqs">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No FAQs created yet. Create your first FAQ above!</p>
            </div>
          ) : (
            <div className="faqs-table-wrapper">
              <table className="faqs-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq) => {
                    // Match category by ID (handle both string and number types)
                    const category = categories.find(c => {
                      const categoryId = typeof c.id === 'string' ? parseInt(c.id, 10) : c.id;
                      const faqCategoryId = typeof faq.faq_category_id === 'string' ? parseInt(faq.faq_category_id, 10) : faq.faq_category_id;
                      return categoryId === faqCategoryId;
                    });
                    return (
                      <tr key={faq.id}>
                        <td className="table-category-cell">
                          {category?.name || 'N/A'}
                        </td>
                        <td className="table-question-cell">
                          <strong>{faq.question || 'N/A'}</strong>
                        </td>
                        <td className="table-answer-cell">
                          {faq.answer ? (
                            <div className="answer-text" title={faq.answer}>
                              {faq.answer.length > 100 
                                ? `${faq.answer.substring(0, 100)}...` 
                                : faq.answer}
                            </div>
                          ) : (
                            'N/A'
                          )}
                        </td>
                        <td className="table-date-cell">
                          {faq.createdAt ? new Date(faq.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="table-actions-cell">
                          <div className="action-buttons">
                            {onEdit && (
                              <button
                                className="edit-button"
                                onClick={() => onEdit(faq)}
                                title="Edit FAQ"
                              >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            )}
                            {onDelete && (
                              <button
                                className="delete-button"
                                onClick={() => onDelete(faq.id)}
                                title="Delete FAQ"
                              >
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
