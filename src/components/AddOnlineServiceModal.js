import { useState, useEffect } from 'react';
import '../css/AddOnlineServiceModal.css';

export function AddOnlineServiceModal({ onClose, onSave, editService = null }) {
  const [formData, setFormData] = useState({
    name: '',
    link: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editService) {
      setFormData({
        name: editService.name || '',
        link: editService.link || ''
      });
    }
  }, [editService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      setError('Please enter service name');
      return;
    }

    if (!formData.link) {
      setError('Please enter service link');
      return;
    }

    // Basic URL validation
    try {
      new URL(formData.link);
    } catch (err) {
      setError('Please enter a valid URL (e.g., http://example.com)');
      return;
    }

    setError('');

    // Call onSave with form data and edit service ID if editing
    if (onSave) {
      onSave(formData, editService?.id);
    }

    // Reset form only if not editing
    if (!editService) {
      setFormData({
        name: '',
        link: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-online-service-overlay" onClick={onClose}>
      <div className="add-online-service-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-online-service-header">
          <h2 className="add-online-service-title">{editService ? 'Edit Online Service' : 'Add New Online Service'}</h2>
          <button className="add-online-service-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-online-service-form" onSubmit={handleSubmit}>
          {error && <div className="add-online-service-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-service-name" className="form-label">
              Service Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-service-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter service name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-service-link" className="form-label">
              Service Link <span className="required">*</span>
            </label>
            <input
              type="url"
              id="add-service-link"
              name="link"
              className="form-input"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
              required
            />
            <small className="form-hint">Enter the full URL (e.g., http://example.com or https://example.com)</small>
          </div>

          <div className="add-online-service-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editService ? 'Update Service' : 'Save Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

