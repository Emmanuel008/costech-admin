import { useState, useEffect } from 'react';
import '../css/AddFooterContactUsModal.css';

export function AddFooterContactUsModal({ onClose, onSave, editContact = null, loading = false }) {
  const [formData, setFormData] = useState({
    phone_number: '',
    email: '',
    location: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editContact) {
      setFormData({
        phone_number: editContact.phone_number || '',
        email: editContact.email || '',
        location: editContact.location || ''
      });
    }
  }, [editContact]);

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
    
    if (!formData.phone_number) {
      setError('Please enter phone number');
      return;
    }

    if (!formData.email) {
      setError('Please enter email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!formData.location) {
      setError('Please enter location');
      return;
    }

    setError('');

    // Call onSave with form data and edit contact ID if editing
    if (onSave) {
      onSave(formData, editContact?.id);
    }

    // Reset form only if not editing
    if (!editContact) {
      setFormData({
        phone_number: '',
        email: '',
        location: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-footer-contact-us-overlay" onClick={onClose}>
      <div className="add-footer-contact-us-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-footer-contact-us-header">
          <h2 className="add-footer-contact-us-title">{editContact ? 'Edit Footer Contact Us' : 'Add New Footer Contact Us'}</h2>
          <button className="add-footer-contact-us-close" onClick={onClose} disabled={loading}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-footer-contact-us-form" onSubmit={handleSubmit}>
          {error && <div className="add-footer-contact-us-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-contact-phone" className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="add-contact-phone"
              name="phone_number"
              className="form-input"
              value={formData.phone_number}
              onChange={handleInputChange}
              placeholder="+255123456789"
              required
              disabled={loading}
            />
            <small className="form-hint">Enter phone number with country code (e.g., +255123456789)</small>
          </div>

          <div className="form-group">
            <label htmlFor="add-contact-email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="add-contact-email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="contact@example.com"
              required
              disabled={loading}
            />
            <small className="form-hint">Enter a valid email address</small>
          </div>

          <div className="form-group">
            <label htmlFor="add-contact-location" className="form-label">
              Location <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-contact-location"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Dar es Salaam, Tanzania"
              required
              disabled={loading}
            />
            <small className="form-hint">Enter the location address</small>
          </div>

          <div className="add-footer-contact-us-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : (editContact ? 'Update Contact' : 'Save Contact')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
