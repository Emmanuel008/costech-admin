import { useState, useEffect } from 'react';
import '../css/AddPositionModal.css';

export function AddPositionModal({ onClose, onSave, editPosition = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editPosition) {
      setFormData({
        name: editPosition.name || '',
        description: editPosition.description || ''
      });
    }
  }, [editPosition]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Please enter position name');
      return;
    }

    // Call onSave with form data and edit position ID if editing
    if (onSave) {
      onSave(formData, editPosition?.id);
    }

    // Reset form only if not editing
    if (!editPosition) {
      setFormData({
        name: '',
        description: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-position-overlay" onClick={onClose}>
      <div className="add-position-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-position-header">
          <h2 className="add-position-title">{editPosition ? 'Edit Position' : 'Add New Position'}</h2>
          <button className="add-position-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-position-form" onSubmit={handleSubmit}>
          {error && <div className="add-position-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-position-name" className="form-label">
              Position Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-position-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter position name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-position-description" className="form-label">
              Description
            </label>
            <textarea
              id="add-position-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter position description"
              rows="4"
            />
          </div>

          <div className="add-position-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editPosition ? 'Update Position' : 'Save Position'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
