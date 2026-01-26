import '../css/FooterContactUsPage.css';
import { Pagination } from '../components/Pagination';

export function FooterContactUsPage({ onBack, onSave, contacts = [], onAddContactClick, onDelete, onEdit, pagination }) {

  return (
    <div className="footer-contact-us-page">
      <div className="footer-contact-us-page-header">
        <button className="back-button" onClick={onBack}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Dashboard</span>
        </button>
        <h1 className="footer-contact-us-page-title">Footer Contact Us Management</h1>
      </div>

      <div className="footer-contact-us-page-content">
        {/* Contacts List */}
        <div className="footer-contact-us-list-container">
          <div className="footer-contact-us-list-header">
            <h2 className="footer-contact-us-list-title">All Footer Contact Us ({contacts.length})</h2>
            <button className="add-contact-button" onClick={onAddContactClick}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Contact</span>
            </button>
          </div>
          {contacts.length === 0 ? (
            <div className="no-contacts">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p>No footer contact us entries created yet. Create your first entry above!</p>
            </div>
          ) : (
            <div className="footer-contact-us-table-wrapper">
              <table className="footer-contact-us-table">
                <thead>
                  <tr>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td className="table-phone-cell">
                        <strong>{contact.phone_number || 'N/A'}</strong>
                      </td>
                      <td className="table-email-cell">
                        <a href={`mailto:${contact.email}`} className="contact-email">
                          {contact.email || 'N/A'}
                        </a>
                      </td>
                      <td className="table-location-cell">
                        {contact.location || 'N/A'}
                      </td>
                      <td className="table-date-cell">
                        {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="table-actions-cell">
                        <div className="action-buttons">
                          {onEdit && (
                            <button
                              className="edit-button"
                              onClick={() => onEdit(contact)}
                              title="Edit contact"
                            >
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          )}
                          {onDelete && (
                            <button
                              className="delete-button"
                              onClick={() => onDelete(contact.id)}
                              title="Delete contact"
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
