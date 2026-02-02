import { useState, useEffect } from 'react';
import '../css/AddExhibitionModal.css';

export function AddExhibitionModal({ onClose, onSave, editExhibition = null, loading = false }) {
  const [formData, setFormData] = useState({
    name: '',
    popular_name: '',
    host_institution: '',
    focus: '',
    tentative_start_date: '',
    tentative_end_date: '',
    location: '',
    link: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editExhibition) {
      setFormData({
        name: editExhibition.name || '',
        popular_name: editExhibition.popular_name || '',
        host_institution: editExhibition.host_institution || '',
        focus: editExhibition.focus || '',
        tentative_start_date: editExhibition.tentative_start_date || '',
        tentative_end_date: editExhibition.tentative_end_date || '',
        location: editExhibition.location || '',
        link: editExhibition.link || ''
      });
    }
  }, [editExhibition]);

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
      setError('Please enter exhibition name');
      return;
    }

    if (!formData.popular_name) {
      setError('Please enter popular name');
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

    // Call onSave with form data and edit exhibition ID if editing
    if (onSave) {
      onSave(formData, editExhibition?.id);
    }

    // Reset form only if not editing
    if (!editExhibition) {
      setFormData({
        name: '',
        popular_name: '',
        host_institution: '',
        focus: '',
        tentative_start_date: '',
        tentative_end_date: '',
        location: '',
        link: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-exhibition-overlay" onClick={onClose}>
      <div className="add-exhibition-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-exhibition-header">
          <h2 className="add-exhibition-title">{editExhibition ? 'Edit Exhibition' : 'Add New Exhibition'}</h2>
          <button className="add-exhibition-close" onClick={onClose} disabled={loading}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-exhibition-form" onSubmit={handleSubmit}>
          {error && <div className="add-exhibition-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-exhibition-name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-exhibition-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter exhibition name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-exhibition-popular-name" className="form-label">
              Popular Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-exhibition-popular-name"
              name="popular_name"
              className="form-input"
              value={formData.popular_name}
              onChange={handleInputChange}
              placeholder="Enter popular name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-exhibition-host-institution" className="form-label">
              Host Institution
            </label>
            <input
              type="text"
              id="add-exhibition-host-institution"
              name="host_institution"
              className="form-input"
              value={formData.host_institution}
              onChange={handleInputChange}
              placeholder="Enter host institution"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-exhibition-focus" className="form-label">
              Focus
            </label>
            <input
              type="text"
              id="add-exhibition-focus"
              name="focus"
              className="form-input"
              value={formData.focus}
              onChange={handleInputChange}
              placeholder="Enter exhibition focus"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="add-exhibition-start-date" className="form-label">
                Tentative Start Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="add-exhibition-start-date"
                name="tentative_start_date"
                className="form-input"
                value={formData.tentative_start_date}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-exhibition-end-date" className="form-label">
                Tentative End Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="add-exhibition-end-date"
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
            <label htmlFor="add-exhibition-location" className="form-label">
              Location
            </label>
            <input
              type="text"
              id="add-exhibition-location"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter exhibition location"
              disabled={loading}
            />
              </div>

          <div className="form-group">
            <label htmlFor="add-exhibition-link" className="form-label">
              Link
            </label>
            <input
              type="url"
              id="add-exhibition-link"
              name="link"
              className="form-input"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
              disabled={loading}
            />
            <small className="form-hint">Enter a valid URL (must start with http:// or https://)</small>
          </div>

          <div className="add-exhibition-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : (editExhibition ? 'Update Exhibition' : 'Save Exhibition')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
