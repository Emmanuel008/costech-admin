import { useState, useEffect } from 'react';
import '../css/AddFinancialReportModal.css';

export function AddFinancialReportModal({ onClose, onSave, editReport = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document: null
  });
  const [documentPreview, setDocumentPreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editReport) {
      setFormData({
        title: editReport.title || '',
        description: editReport.description || '',
        document: null // Don't preload document file
      });
      // Set document preview if report has document URL
      if (editReport.document) {
        setDocumentPreview(editReport.document);
      }
    }
  }, [editReport]);

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
      setError('Please enter report title');
      return;
    }

    // Document is only required for new reports, not for updates
    if (!editReport && !formData.document) {
      setError('Please upload a document');
      return;
    }

    setError('');

    // Call onSave with form data and edit report ID if editing
    if (onSave) {
      onSave(formData, editReport?.id);
    }

    // Reset form only if not editing
    if (!editReport) {
      setFormData({
        title: '',
        description: '',
        document: null
      });
      setDocumentPreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-report-document');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-financial-report-overlay" onClick={onClose}>
      <div className="add-financial-report-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-financial-report-header">
          <h2 className="add-financial-report-title">{editReport ? 'Edit Financial Report' : 'Add New Financial Report'}</h2>
          <button className="add-financial-report-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-financial-report-form" onSubmit={handleSubmit}>
          {error && <div className="add-financial-report-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-report-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-report-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter report title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-report-description" className="form-label">
              Description
            </label>
            <textarea
              id="add-report-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter report description"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-report-document" className="form-label">
              Document (PDF) <span className="required">*</span>
              <span className="form-hint">(Max 10MB, PDF only)</span>
            </label>
            <div className="document-upload-container">
              <input
                type="file"
                id="add-report-document"
                name="document"
                className="form-file-input"
                accept="application/pdf"
                onChange={handleDocumentChange}
                required={!editReport}
              />
              <label htmlFor="add-report-document" className="form-file-label">
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

          <div className="add-financial-report-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editReport ? 'Update Report' : 'Save Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

