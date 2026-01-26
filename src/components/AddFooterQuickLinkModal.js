import { useState, useEffect } from 'react';
import '../css/AddFooterQuickLinkModal.css';

export function AddFooterQuickLinkModal({ onClose, onSave, editLink = null, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    link: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editLink) {
      setFormData({
        name: editLink.name || '',
        link: editLink.link || ''
      });
    }
  }, [editLink]);

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
      setError('Please enter link name');
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
      setError('Please enter a valid URL (e.g., http://example.com)');
      return;
    }

    setError('');

    // Call onSave with form data and edit link ID if editing
    if (onSave) {
      onSave(formData, editLink?.id);
    }

    // Reset form only if not editing
    if (!editLink) {
      setFormData({
        name: '',
        link: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-footer-quick-link-overlay" onClick={onClose}>
      <div className="add-footer-quick-link-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-footer-quick-link-header">
          <h2 className="add-footer-quick-link-title">{editLink ? 'Edit Footer Quick Link' : 'Add New Footer Quick Link'}</h2>
          <button className="add-footer-quick-link-close" onClick={onClose} disabled={loading}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-footer-quick-link-form" onSubmit={handleSubmit}>
          {error && <div className="add-footer-quick-link-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-link-name" className="form-label">
              Link Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-link-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter link name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-link-url" className="form-label">
              Link URL <span className="required">*</span>
            </label>
            <input
              type="url"
              id="add-link-url"
              name="link"
              className="form-input"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
              required
              disabled={loading}
            />
            <small className="form-hint">Enter the full URL (e.g., http://example.com or https://example.com)</small>
          </div>

          <div className="add-footer-quick-link-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : (editLink ? 'Update Link' : 'Save Link')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
