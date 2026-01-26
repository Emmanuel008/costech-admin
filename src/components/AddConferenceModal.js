import { useState, useEffect } from 'react';
import '../css/AddConferenceModal.css';

export function AddConferenceModal({ onClose, onSave, editConference = null, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    organizer: '',
    theme: '',
    tentative_start_date: '',
    tentative_end_date: '',
    location: '',
    link: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editConference) {
      setFormData({
        name: editConference.name || '',
        abbreviation: editConference.abbreviation || '',
        organizer: editConference.organizer || '',
        theme: editConference.theme || '',
        tentative_start_date: editConference.tentative_start_date || '',
        tentative_end_date: editConference.tentative_end_date || '',
        location: editConference.location || '',
        link: editConference.link || ''
      });
    }
  }, [editConference]);

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
      setError('Please enter conference name');
      return;
    }

    if (!formData.abbreviation) {
      setError('Please enter abbreviation');
      return;
    }

    if (!formData.organizer) {
      setError('Please enter organizer');
      return;
    }

    if (!formData.tentative_start_date) {
      setError('Please enter tentative start date');
      return;
    }

    if (!formData.tentative_end_date) {
      setError('Please enter tentative end date');
      return;
    }

    // Validate dates
    if (new Date(formData.tentative_start_date) > new Date(formData.tentative_end_date)) {
      setError('End date must be after start date');
      return;
    }

    // Validate link if provided
    if (formData.link) {
      try {
        new URL(formData.link);
      } catch (err) {
        setError('Please enter a valid URL for the link');
        return;
      }
    }

    setError('');

    // Call onSave with form data and edit conference ID if editing
    if (onSave) {
      onSave(formData, editConference?.id);
    }

    // Reset form only if not editing
    if (!editConference) {
      setFormData({
        name: '',
        abbreviation: '',
        organizer: '',
        theme: '',
        tentative_start_date: '',
        tentative_end_date: '',
        location: '',
        link: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-conference-overlay" onClick={onClose}>
      <div className="add-conference-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-conference-header">
          <h2 className="add-conference-title">{editConference ? 'Edit Conference' : 'Add New Conference'}</h2>
          <button className="add-conference-close" onClick={onClose} disabled={loading}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-conference-form" onSubmit={handleSubmit}>
          {error && <div className="add-conference-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-conference-name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-conference-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter conference name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-conference-abbreviation" className="form-label">
              Abbreviation <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-conference-abbreviation"
              name="abbreviation"
              className="form-input"
              value={formData.abbreviation}
              onChange={handleInputChange}
              placeholder="e.g., GHB"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-conference-organizer" className="form-label">
              Organizer <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-conference-organizer"
              name="organizer"
              className="form-input"
              value={formData.organizer}
              onChange={handleInputChange}
              placeholder="Enter organizer name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-conference-theme" className="form-label">
              Theme
            </label>
            <input
              type="text"
              id="add-conference-theme"
              name="theme"
              className="form-input"
              value={formData.theme}
              onChange={handleInputChange}
              placeholder="Enter conference theme"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="add-conference-start-date" className="form-label">
                Tentative Start Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="add-conference-start-date"
                name="tentative_start_date"
                className="form-input"
                value={formData.tentative_start_date}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-conference-end-date" className="form-label">
                Tentative End Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="add-conference-end-date"
                name="tentative_end_date"
                className="form-input"
                value={formData.tentative_end_date}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="add-conference-location" className="form-label">
              Location
            </label>
            <input
              type="text"
              id="add-conference-location"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter conference location"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-conference-link" className="form-label">
              Link
            </label>
            <input
              type="url"
              id="add-conference-link"
              name="link"
              className="form-input"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
              disabled={loading}
            />
            <small className="form-hint">Enter a valid URL (must start with http:// or https://)</small>
          </div>

          <div className="add-conference-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : (editConference ? 'Update Conference' : 'Save Conference')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
