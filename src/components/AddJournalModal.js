import { useState, useEffect } from 'react';
import '../css/AddJournalModal.css';

export function AddJournalModal({ onClose, onSave, editJournal = null, loading = false }) {
  const [formData, setFormData] = useState({
    issn: '',
    title: '',
    publisher: '',
    mode: '',
    frequency: '',
    subject: '',
    url: '',
    language: '',
    indexed: '',
    university: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editJournal) {
      setFormData({
        issn: editJournal.issn || '',
        title: editJournal.title || '',
        publisher: editJournal.publisher || '',
        mode: editJournal.mode || '',
        frequency: editJournal.frequency || '',
        subject: editJournal.subject || '',
        url: editJournal.url || '',
        language: editJournal.language || '',
        indexed: editJournal.indexed || '',
        university: editJournal.university || ''
      });
    }
  }, [editJournal]);

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
    
    if (!formData.issn) {
      setError('Please enter ISSN');
      return;
    }

    if (!formData.title) {
      setError('Please enter title');
      return;
    }

    // Validate URL if provided
    if (formData.url) {
      try {
        new URL(formData.url);
      } catch (err) {
        setError('Please enter a valid URL for the URL field');
        return;
      }
    }

    setError('');

    // Call onSave with form data and edit journal ID if editing
    if (onSave) {
      onSave(formData, editJournal?.id);
    }

    // Reset form only if not editing
    if (!editJournal) {
      setFormData({
        issn: '',
        title: '',
        publisher: '',
        mode: '',
        frequency: '',
        subject: '',
        url: '',
        language: '',
        indexed: '',
        university: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-journal-overlay" onClick={onClose}>
      <div className="add-journal-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-journal-header">
          <h2 className="add-journal-title">{editJournal ? 'Edit Journal' : 'Add New Journal'}</h2>
          <button className="add-journal-close" onClick={onClose} disabled={loading}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-journal-form" onSubmit={handleSubmit}>
          {error && <div className="add-journal-error">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="add-journal-issn" className="form-label">
                ISSN <span className="required">*</span>
              </label>
              <input
                type="text"
                id="add-journal-issn"
                name="issn"
                className="form-input"
                value={formData.issn}
                onChange={handleInputChange}
                placeholder="e.g., S/1"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-journal-title" className="form-label">
                Title <span className="required">*</span>
              </label>
              <input
                type="text"
                id="add-journal-title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter journal title"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="add-journal-publisher" className="form-label">
                Publisher
              </label>
              <input
                type="text"
                id="add-journal-publisher"
                name="publisher"
                className="form-input"
                value={formData.publisher}
                onChange={handleInputChange}
                placeholder="Enter publisher name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-journal-mode" className="form-label">
                Mode
              </label>
              <input
                type="text"
                id="add-journal-mode"
                name="mode"
                className="form-input"
                value={formData.mode}
                onChange={handleInputChange}
                placeholder="Enter mode"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="add-journal-frequency" className="form-label">
                Frequency
              </label>
              <input
                type="text"
                id="add-journal-frequency"
                name="frequency"
                className="form-input"
                value={formData.frequency}
                onChange={handleInputChange}
                placeholder="e.g., Monthly, Quarterly"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-journal-language" className="form-label">
                Language
              </label>
              <input
                type="text"
                id="add-journal-language"
                name="language"
                className="form-input"
                value={formData.language}
                onChange={handleInputChange}
                placeholder="e.g., English"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="add-journal-subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              id="add-journal-subject"
              name="subject"
              className="form-input"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter subject"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="add-journal-indexed" className="form-label">
                Indexed
              </label>
              <input
                type="text"
                id="add-journal-indexed"
                name="indexed"
                className="form-input"
                value={formData.indexed}
                onChange={handleInputChange}
                placeholder="e.g., Yes, No"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="add-journal-university" className="form-label">
                University
              </label>
              <input
                type="text"
                id="add-journal-university"
                name="university"
                className="form-input"
                value={formData.university}
                onChange={handleInputChange}
                placeholder="Enter university"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="add-journal-url" className="form-label">
              URL
            </label>
            <input
              type="url"
              id="add-journal-url"
              name="url"
              className="form-input"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              disabled={loading}
            />
            <small className="form-hint">Enter a valid URL (must start with http:// or https://)</small>
          </div>

          <div className="add-journal-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : (editJournal ? 'Update Journal' : 'Save Journal')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
