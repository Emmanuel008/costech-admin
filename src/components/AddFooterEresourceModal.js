import { useState, useEffect } from 'react';
import '../css/AddFooterEresourceModal.css';

export function AddFooterEresourceModal({ onClose, onSave, editResource = null, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    link: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editResource) {
      setFormData({
        name: editResource.name || '',
        link: editResource.link || ''
      });
    }
  }, [editResource]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (loading) return;
    
    if (!formData.name) {
      setError('Please enter e-resource name');
      return;
    }

    if (!formData.link) {
      setError('Please enter link URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(formData.link);
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setError('');

    // Call onSave with form data and edit resource ID if editing
    if (onSave) {
      onSave(formData, editResource?.id);
    }

    // Reset form only if not editing
    if (!editResource) {
      setFormData({
        name: '',
        link: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-footer-eresource-overlay" onClick={onClose}>
      <div className="add-footer-eresource-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-footer-eresource-header">
          <h2 className="add-footer-eresource-title">{editResource ? 'Edit Footer E-Resource' : 'Add New Footer E-Resource'}</h2>
          <button className="add-footer-eresource-close" onClick={onClose} disabled={loading}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-footer-eresource-form" onSubmit={handleSubmit}>
          {error && <div className="add-footer-eresource-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-resource-name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-resource-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="E-Resource Name"
              required
              disabled={loading}
            />
            <small className="form-hint">Enter a descriptive name for the e-resource</small>
          </div>

          <div className="form-group">
            <label htmlFor="add-resource-link" className="form-label">
              Link URL <span className="required">*</span>
            </label>
            <input
              type="url"
              id="add-resource-link"
              name="link"
              className="form-input"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
              required
              disabled={loading}
            />
            <small className="form-hint">Enter a valid URL (must start with http:// or https://)</small>
          </div>

          <div className="add-footer-eresource-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : (editResource ? 'Update E-Resource' : 'Save E-Resource')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
