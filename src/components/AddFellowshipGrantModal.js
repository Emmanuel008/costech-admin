import { useState, useEffect } from 'react';
import '../css/AddFellowshipGrantModal.css';

export function AddFellowshipGrantModal({ onClose, onSave, editGrant = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'OPEN'
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editGrant) {
      setFormData({
        title: editGrant.title || '',
        description: editGrant.description || '',
        status: editGrant.status || 'OPEN'
      });
    }
  }, [editGrant]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setError('');

    // Call onSave with form data and edit grant ID if editing
    if (onSave) {
      onSave(formData, editGrant?.id);
    }

    // Reset form only if not editing
    if (!editGrant) {
      setFormData({
        title: '',
        description: '',
        status: 'OPEN'
      });
      setError('');
    }
  };

  return (
    <div className="add-grant-overlay" onClick={onClose}>
      <div className="add-grant-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-grant-header">
          <h2 className="add-grant-title">{editGrant ? 'Edit Fellowship Grant' : 'Add New Fellowship Grant'}</h2>
          <button className="add-grant-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-grant-form" onSubmit={handleSubmit}>
          {error && <div className="add-grant-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-grant-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-grant-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter fellowship grant title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-grant-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-grant-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter fellowship grant description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-grant-status" className="form-label">
              Status <span className="required">*</span>
            </label>
            <select
              id="add-grant-status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="OPEN">OPEN</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>

          <div className="add-grant-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editGrant ? 'Update Fellowship Grant' : 'Save Fellowship Grant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

