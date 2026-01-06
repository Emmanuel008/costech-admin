import { useState, useEffect } from 'react';
import '../css/AddAreaOfPartnershipModal.css';

export function AddAreaOfPartnershipModal({ onClose, onSave, editArea = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editArea) {
      setFormData({
        title: editArea.title || '',
        description: editArea.description || ''
      });
    }
  }, [editArea]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Please enter area of partnership title');
      return;
    }

    setError('');

    // Call onSave with form data and edit area ID if editing
    if (onSave) {
      onSave(formData, editArea?.id);
    }

    // Reset form only if not editing
    if (!editArea) {
      setFormData({
        title: '',
        description: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-area-overlay" onClick={onClose}>
      <div className="add-area-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-area-header">
          <h2 className="add-area-title">{editArea ? 'Edit Area of Partnership' : 'Add New Area of Partnership'}</h2>
          <button className="add-area-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-area-form" onSubmit={handleSubmit}>
          {error && <div className="add-area-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-area-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-area-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter area of partnership title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-area-description" className="form-label">
              Description
            </label>
            <textarea
              id="add-area-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter area of partnership description"
              rows="5"
            />
          </div>

          <div className="add-area-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editArea ? 'Update Area of Partnership' : 'Save Area of Partnership'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

