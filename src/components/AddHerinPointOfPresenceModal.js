import { useState, useEffect } from 'react';
import '../css/AddPositionModal.css';

export function AddHerinPointOfPresenceModal({ onClose, onSave, editPoint = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editPoint) {
      setFormData({
        name: editPoint.name || '',
        description: editPoint.description || '',
        location: editPoint.location || ''
      });
    }
  }, [editPoint]);

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
      setError('Please enter point of presence name');
      return;
    }

    setError('');

    // Call onSave with form data and edit point ID if editing
    if (onSave) {
      onSave(formData, editPoint?.id);
    }

    // Reset form only if not editing
    if (!editPoint) {
      setFormData({
        name: '',
        description: '',
        location: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-position-overlay" onClick={onClose}>
      <div className="add-position-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-position-header">
          <h2 className="add-position-title">{editPoint ? 'Edit Point of Presence' : 'Add New Point of Presence'}</h2>
          <button className="add-position-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-position-form" onSubmit={handleSubmit}>
          {error && <div className="add-position-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-herin-point-name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-herin-point-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter point of presence name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-herin-point-description" className="form-label">
              Description
            </label>
            <textarea
              id="add-herin-point-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-herin-point-location" className="form-label">
              Location
            </label>
            <input
              type="text"
              id="add-herin-point-location"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter location"
            />
          </div>

          <div className="add-position-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editPoint ? 'Update Point of Presence' : 'Save Point of Presence'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

