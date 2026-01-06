import '../css/DeleteConfirmationModal.css';

export function DeleteConfirmationModal({ onClose, onConfirm, itemName, itemType = 'item' }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="delete-confirmation-overlay" onClick={onClose}>
      <div className="delete-confirmation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-confirmation-header">
          <div className="delete-icon-wrapper">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="delete-confirmation-title">Confirm Deletion</h2>
        </div>

        <div className="delete-confirmation-content">
          <p className="delete-confirmation-message">
            Are you sure you want to delete <strong>"{itemName}"</strong>?
          </p>
          <p className="delete-confirmation-warning">
            This action cannot be undone. The {itemType} will be permanently removed.
          </p>
        </div>

        <div className="delete-confirmation-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-delete" onClick={handleConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

