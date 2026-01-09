import { useState, useEffect } from 'react';
import '../css/AddSectionModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddSectionModal({ onClose, onSave, editSection = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editSection) {
      setFormData({
        title: editSection.title || '',
        description: editSection.description || '',
        content: editSection.content || '',
        image: null // Don't preload image file
      });
      // Set image preview if section has image URL
      if (editSection.image) {
        setImagePreview(editSection.image);
      }
    }
  }, [editSection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      e.target.value = '';
      return;
    }

    setError('');
    
    try {
      // Compress the image before storing
      const compressedFile = await compressImage(file, 1920, 1080, 0.8);
      
    setFormData(prev => ({
      ...prev,
        image: compressedFile
    }));

      // Create preview from compressed file
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error('Error compressing image:', err);
      setError('Failed to process image. Please try again.');
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    // Image is only required for new sections, not for updates
    if (!editSection && !formData.image) {
      setError('Please upload an image');
      return;
    }

    // Call onSave with form data and edit section ID if editing
    if (onSave) {
      onSave(formData, editSection?.id);
    }

    // Reset form only if not editing
    if (!editSection) {
    setFormData({
      title: '',
      description: '',
      content: '',
      image: null
    });
    setImagePreview(null);
    setError('');
    
    // Reset file input
    const fileInput = document.getElementById('add-section-image');
    if (fileInput) {
      fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-section-overlay" onClick={onClose}>
      <div className="add-section-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-section-header">
          <h2 className="add-section-title">{editSection ? 'Edit Section' : 'Add New Section'}</h2>
          <button className="add-section-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-section-form" onSubmit={handleSubmit}>
          {error && <div className="add-section-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-section-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-section-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter section title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-section-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-section-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter section description"
              rows="2"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-section-content" className="form-label">
              Content <span className="required">*</span>
            </label>
            <textarea
              id="add-section-content"
              name="content"
              className="form-textarea"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter section content"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-section-image" className="form-label">
              Image <span className="required">*</span>
              <span className="form-hint">(Will be compressed automatically)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-section-image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
                required={!editSection}
              />
              <label htmlFor="add-section-image" className="form-file-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Choose Image</span>
              </label>
              {formData.image && (
                <div className="image-info">
                  <span>{formData.image.name}</span>
                  <span className="image-size">
                    ({(formData.image.size / 1024).toFixed(2)} KB - compressed)
                  </span>
                </div>
              )}
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="add-section-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editSection ? 'Update Section' : 'Save Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

