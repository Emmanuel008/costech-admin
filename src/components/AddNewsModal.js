import { useState, useEffect } from 'react';
import '../css/AddNewsModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddNewsModal({ onClose, onSave, editNews = null }) {
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editNews) {
      setFormData({
        date: editNews.date || editNews.created_at ? new Date(editNews.date || editNews.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        title: editNews.title || '',
        description: editNews.description || '',
        image: null // Don't preload image file
      });
      // Set image preview if news has image URL
      if (editNews.image) {
        setImagePreview(editNews.image);
      }
    } else {
      // Set default date to today for new news
      setFormData(prev => ({
        ...prev,
        date: new Date().toISOString().split('T')[0]
      }));
    }
  }, [editNews]);

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
    
    if (!formData.date || !formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    // Image is only required for new news, not for updates
    if (!editNews && !formData.image) {
      setError('Please upload an image');
      return;
    }

    // Call onSave with form data and edit news ID if editing
    if (onSave) {
      onSave(formData, editNews?.id);
    }

    // Reset form only if not editing
    if (!editNews) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        title: '',
        description: '',
        image: null
      });
      setImagePreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-news-image');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-news-overlay" onClick={onClose}>
      <div className="add-news-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-news-header">
          <h2 className="add-news-title">{editNews ? 'Edit News' : 'Add New News'}</h2>
          <button className="add-news-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-news-form" onSubmit={handleSubmit}>
          {error && <div className="add-news-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-news-date" className="form-label">
              Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="add-news-date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-news-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-news-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter news title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-news-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-news-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter news description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-news-image" className="form-label">
              Image <span className="required">*</span>
              <span className="form-hint">(Will be compressed automatically)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-news-image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
                required={!editNews}
              />
              <label htmlFor="add-news-image" className="form-file-label">
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

          <div className="add-news-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editNews ? 'Update News' : 'Save News'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

