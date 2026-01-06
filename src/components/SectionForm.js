import { useState } from 'react';
import '../css/SectionForm.css';

export function SectionForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError('Image size must be less than 5MB');
      e.target.value = ''; // Clear the input
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      e.target.value = '';
      return;
    }

    setError('');
    setFormData(prev => ({
      ...prev,
      image: file
    }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.image) {
      setError('Please upload an image');
      return;
    }

    // Call onSave with form data
    if (onSave) {
      onSave(formData);
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      description: '',
      image: null
    });
    setImagePreview(null);
    setError('');
    
    if (onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      description: '',
      image: null
    });
    setImagePreview(null);
    setError('');
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="section-form-overlay" onClick={handleClose}>
      <div className="section-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="section-form-header">
          <h2 className="section-form-title">Add New Section</h2>
          <button className="section-form-close" onClick={handleClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="section-form" onSubmit={handleSubmit}>
          {error && <div className="section-form-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter section title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content <span className="required">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              className="form-textarea"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter section content"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter section description"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image <span className="required">*</span>
              <span className="form-hint">(Max 5MB)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              <label htmlFor="image" className="form-file-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Choose Image</span>
              </label>
              {formData.image && (
                <div className="image-info">
                  <span>{formData.image.name}</span>
                  <span className="image-size">
                    ({(formData.image.size / 1024 / 1024).toFixed(2)} MB)
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

          <div className="section-form-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

