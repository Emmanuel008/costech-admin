import { useState, useEffect } from 'react';
import '../css/AddInnovationSpaceModal.css';

export function AddDirectorateModal({ onClose, onSave, editDirectorate = null }) {
  const [formData, setFormData] = useState({
    name: '',
    message_from_director: '',
    director_name: '',
    service_offered: [],
    downloads: []
  });
  const [serviceInput, setServiceInput] = useState('');
  const [downloadName, setDownloadName] = useState('');
  const [downloadDocument, setDownloadDocument] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editDirectorate) {
      setFormData({
        name: editDirectorate.name || '',
        message_from_director: editDirectorate.message_from_director || '',
        director_name: editDirectorate.director_name || '',
        service_offered: Array.isArray(editDirectorate.service_offered) ? editDirectorate.service_offered : [],
        downloads: Array.isArray(editDirectorate.downloads) ? editDirectorate.downloads : []
      });
    }
  }, [editDirectorate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddService = () => {
    if (serviceInput.trim()) {
      setFormData(prev => ({
        ...prev,
        service_offered: [...prev.service_offered, serviceInput.trim()]
      }));
      setServiceInput('');
    }
  };

  const handleRemoveService = (index) => {
    setFormData(prev => ({
      ...prev,
      service_offered: prev.service_offered.filter((_, i) => i !== index)
    }));
  };

  const handleAddDownload = () => {
    if (!downloadName.trim()) {
      setError('Please enter download name');
      return;
    }
    
    if (!downloadDocument) {
      setError('Please upload a PDF document for the download');
      return;
    }

    setError('');
    
    setFormData(prev => ({
      ...prev,
      downloads: [...prev.downloads, {
        name: downloadName.trim(),
        document: downloadDocument
      }]
    }));
    setDownloadName('');
    setDownloadDocument(null);
    
    // Reset the file input
    const fileInput = document.getElementById('add-directorate-download-document');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleRemoveDownload = (index) => {
    setFormData(prev => ({
      ...prev,
      downloads: prev.downloads.filter((_, i) => i !== index)
    }));
  };

  const handleDownloadDocumentChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      e.target.value = '';
      return;
    }

    setError('');
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDownloadDocument(reader.result);
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
    
    if (!formData.name.trim()) {
      setError('Please enter directorate name');
      return;
    }

    if (!formData.director_name.trim()) {
      setError('Please enter director name');
      return;
    }

    // service_offered cannot be empty (backend requirement)
    if (!formData.service_offered || formData.service_offered.length === 0) {
      setError('Please add at least one service offered');
      return;
    }

    setError('');

    // Call onSave with form data and edit directorate ID if editing
    if (onSave) {
      onSave(formData, editDirectorate?.id);
    }

    // Reset form only if not editing
    if (!editDirectorate) {
      setFormData({
        name: '',
        message_from_director: '',
        director_name: '',
        service_offered: [],
        downloads: []
      });
      setServiceInput('');
      setDownloadName('');
      setDownloadDocument(null);
      setError('');
    
      // Reset file inputs
      const fileInput = document.getElementById('add-directorate-download-document');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-innovation-space-overlay" onClick={onClose}>
      <div className="add-innovation-space-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-innovation-space-header">
          <h2 className="add-innovation-space-title">{editDirectorate ? 'Edit Directorate' : 'Add New Directorate'}</h2>
          <button className="add-innovation-space-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-innovation-space-form" onSubmit={handleSubmit}>
          {error && <div className="add-innovation-space-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-directorate-name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-directorate-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter directorate name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-directorate-director-name" className="form-label">
              Director Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-directorate-director-name"
              name="director_name"
              className="form-input"
              value={formData.director_name}
              onChange={handleInputChange}
              placeholder="Enter director name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-directorate-message" className="form-label">
              Message From Director
            </label>
            <textarea
              id="add-directorate-message"
              name="message_from_director"
              className="form-textarea"
              value={formData.message_from_director}
              onChange={handleInputChange}
              placeholder="Enter message from director or date (e.g., 12/07/2016)"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Services Offered <span className="required">*</span>
            </label>
            <div className="array-input-container">
              <div className="array-input-row">
                <input
                  type="text"
                  className="form-input"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  placeholder="Enter service name"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddService();
                    }
                  }}
                />
                <button type="button" className="btn-add-item" onClick={handleAddService}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add
                </button>
              </div>
              {formData.service_offered.length > 0 && (
                <div className="array-items-list">
                  {formData.service_offered.map((service, index) => (
                    <div key={index} className="array-item">
                      <span>{service}</span>
                      <button type="button" className="btn-remove-item" onClick={() => handleRemoveService(index)}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Downloads</label>
            <div className="array-input-container">
              <div className="download-input-section">
                <div className="array-input-row">
                  <input
                    type="text"
                    className="form-input"
                    value={downloadName}
                    onChange={(e) => setDownloadName(e.target.value)}
                    placeholder="Enter download name"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDownload();
                      }
                    }}
                  />
                </div>
                <div className="array-input-row" style={{ marginTop: '8px' }}>
                  <input
                    type="file"
                    id="add-directorate-download-document"
                    accept="application/pdf"
                    onChange={handleDownloadDocumentChange}
                    className="form-file-input"
                  />
                  <label htmlFor="add-directorate-download-document" className="form-file-label" style={{ flex: 1, margin: 0 }}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>{downloadDocument ? 'PDF Selected' : 'Choose PDF Document'}</span>
                  </label>
                  <button type="button" className="btn-add-item" onClick={handleAddDownload}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Download
                  </button>
                </div>
                {downloadDocument && (
                  <div className="document-info" style={{ marginTop: '8px' }}>
                    <span>PDF Document Ready - Click "Add Download" to add it to the list</span>
                  </div>
                )}
              </div>
              {formData.downloads.length > 0 && (
                <div className="array-items-list" style={{ marginTop: '12px' }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                    Added Downloads ({formData.downloads.length}):
                  </div>
                  {formData.downloads.map((download, index) => (
                    <div key={index} className="array-item">
                      <span>
                        <strong>{download.name || 'Unnamed'}</strong>
                        {download.document && ' (PDF)'}
                      </span>
                      <button type="button" className="btn-remove-item" onClick={() => handleRemoveDownload(index)}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="14" height="14">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="add-innovation-space-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editDirectorate ? 'Update Directorate' : 'Save Directorate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

