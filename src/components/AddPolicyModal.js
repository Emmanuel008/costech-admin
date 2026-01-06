import { useState, useEffect } from 'react';
import '../css/AddPolicyModal.css';

export function AddPolicyModal({ onClose, onSave, editPolicy = null }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    document: null
  });
  const [documentPreview, setDocumentPreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editPolicy) {
      setFormData({
        title: editPolicy.title || '',
        date: editPolicy.date || '',
        document: null // Don't preload document file
      });
      // Set document preview if policy has document URL
      if (editPolicy.document) {
        setDocumentPreview(editPolicy.document);
      }
    }
  }, [editPolicy]);

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

    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
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
      setError('Please enter policy title');
      return;
    }

    if (!formData.date) {
      setError('Please enter policy date');
      return;
    }

    // Document is only required for new policies, not for updates
    if (!editPolicy && !formData.document) {
      setError('Please upload a document');
      return;
    }

    setError('');

    // Call onSave with form data and edit policy ID if editing
    if (onSave) {
      onSave(formData, editPolicy?.id);
    }

    // Reset form only if not editing
    if (!editPolicy) {
      setFormData({
        title: '',
        date: '',
        document: null
      });
      setDocumentPreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-policy-document');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-policy-overlay" onClick={onClose}>
      <div className="add-policy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-policy-header">
          <h2 className="add-policy-title">{editPolicy ? 'Edit Policy' : 'Add New Policy'}</h2>
          <button className="add-policy-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-policy-form" onSubmit={handleSubmit}>
          {error && <div className="add-policy-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-policy-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-policy-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter policy title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-policy-date" className="form-label">
              Date <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-policy-date"
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
            <label htmlFor="add-policy-document" className="form-label">
              Document (PDF) <span className="required">*</span>
              <span className="form-hint">(Max 10MB, PDF only)</span>
            </label>
            <div className="document-upload-container">
              <input
                type="file"
                id="add-policy-document"
                name="document"
                className="form-file-input"
                accept="application/pdf"
                onChange={handleDocumentChange}
                required={!editPolicy}
              />
              <label htmlFor="add-policy-document" className="form-file-label">
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

          <div className="add-policy-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editPolicy ? 'Update Policy' : 'Save Policy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

