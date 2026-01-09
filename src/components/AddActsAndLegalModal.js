import { useState, useEffect } from 'react';
import '../css/AddActsAndLegalModal.css';

export function AddActsAndLegalModal({ onClose, onSave, editAct = null }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    document: null
  });
  const [documentPreview, setDocumentPreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editAct) {
      setFormData({
        title: editAct.title || '',
        date: editAct.date || '',
        document: null // Don't preload document file
      });
      // Set document preview if act has document URL
      if (editAct.document) {
        setDocumentPreview(editAct.document);
      }
    }
  }, [editAct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type (PDF)
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      e.target.value = '';
      return;
    }

    setError('');
    
    try {
      // Convert file to base64 data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          document: reader.result
        }));
        setDocumentPreview(reader.result);
      };
      reader.onerror = () => {
        setError('Failed to read file. Please try again.');
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing document:', err);
      setError('Failed to process document. Please try again.');
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title) {
      setError('Please enter act and legal title');
      return;
    }

    if (!formData.date) {
      setError('Please enter act and legal date');
      return;
    }

    // Document is only required for new acts, not for updates
    if (!editAct && !formData.document) {
      setError('Please upload a document');
      return;
    }

    setError('');

    // Call onSave with form data and edit act ID if editing
    if (onSave) {
      onSave(formData, editAct?.id);
    }

    // Reset form only if not editing
    if (!editAct) {
      setFormData({
        title: '',
        date: '',
        document: null
      });
      setDocumentPreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-act-document');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-act-overlay" onClick={onClose}>
      <div className="add-act-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-act-header">
          <h2 className="add-act-title">{editAct ? 'Edit Act and Legal' : 'Add New Act and Legal'}</h2>
          <button className="add-act-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-act-form" onSubmit={handleSubmit}>
          {error && <div className="add-act-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-act-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-act-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter act and legal title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-act-date" className="form-label">
              Date <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-act-date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="DD/MM/YYYY (e.g., 06/01/2026)"
              required
            />
            <span className="form-hint">Format: DD/MM/YYYY</span>
          </div>

          <div className="form-group">
            <label htmlFor="add-act-document" className="form-label">
              Document (PDF) <span className="required">*</span>
              <span className="form-hint">(PDF only)</span>
            </label>
            <div className="document-upload-container">
              <input
                type="file"
                id="add-act-document"
                name="document"
                className="form-file-input"
                accept="application/pdf"
                onChange={handleDocumentChange}
                required={!editAct}
              />
              <label htmlFor="add-act-document" className="form-file-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Choose PDF Document</span>
              </label>
              {formData.document && (
                <div className="document-info">
                  <span>PDF Document Selected</span>
                  <span className="document-size">
                    ({(formData.document.length * 3 / 4 / 1024).toFixed(2)} KB - base64)
                  </span>
                </div>
              )}
            </div>
            {documentPreview && (
              <div className="document-preview">
                <iframe 
                  src={documentPreview} 
                  title="Document Preview"
                  className="document-preview-iframe"
                />
                <a href={documentPreview} target="_blank" rel="noopener noreferrer" className="document-preview-link">
                  Open in New Tab
                </a>
              </div>
            )}
          </div>

          <div className="add-act-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editAct ? 'Update Act and Legal' : 'Save Act and Legal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

