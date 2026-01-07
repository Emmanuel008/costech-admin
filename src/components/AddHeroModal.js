import { useState, useEffect } from 'react';
import '../css/AddHeroModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddHeroModal({ onClose, onSave, editHero = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    title: '',
    tagline: '',
    content: '',
    preference: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editHero) {
      setFormData({
        name: editHero.name || editHero.title || '',
        description: editHero.description || '',
        title: editHero.title || '',
        tagline: editHero.tagline || '',
        content: editHero.content || '',
        preference: editHero.preference || '',
        image: null // Don't preload image file
      });
      // Set image preview if hero has image URL
      if (editHero.image) {
        setImagePreview(editHero.image);
      }
    }
  }, [editHero]);

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

    // Validate file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      setError('Image size must be less than 2MB');
      e.target.value = '';
      return;
    }

    setError('');
    
    try {
      // Compress the image before storing
      // Target 1.5MB to account for base64 encoding overhead (~33%)
      // This ensures the final payload stays under 2MB server limit
      const compressedFile = await compressImage(file, 1920, 1080, 0.8, 1500);
      
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
    
    if (!formData.name || !formData.description || !formData.title || !formData.tagline || !formData.content) {
      setError('Please fill in all required fields');
      return;
    }

    // Convert preference to number if provided
    const heroDataToSave = {
      ...formData,
      preference: formData.preference ? parseInt(formData.preference, 10) : null
    };

    // Image is optional for both new and updates
    // Call onSave with form data and edit hero ID if editing
    if (onSave) {
      onSave(heroDataToSave, editHero?.id || editHero?.uuid);
    }

    // Reset form only if not editing
    if (!editHero) {
      setFormData({
        name: '',
        description: '',
        title: '',
        tagline: '',
        content: '',
        preference: '',
        image: null
      });
      setImagePreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-hero-image');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-hero-overlay" onClick={onClose}>
      <div className="add-hero-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-hero-header">
          <h2 className="add-hero-title">{editHero ? 'Edit Hero' : 'Add New Hero'}</h2>
          <button className="add-hero-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-hero-form" onSubmit={handleSubmit}>
          {error && <div className="add-hero-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-hero-name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-hero-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter hero name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-hero-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-hero-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter hero description"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-hero-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-hero-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter hero title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-hero-tagline" className="form-label">
              Tagline <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-hero-tagline"
              name="tagline"
              className="form-input"
              value={formData.tagline}
              onChange={handleInputChange}
              placeholder="Enter hero tagline"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-hero-content" className="form-label">
              Content <span className="required">*</span>
            </label>
            <textarea
              id="add-hero-content"
              name="content"
              className="form-textarea"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter hero content"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-hero-preference" className="form-label">
              Preference
            </label>
            <input
              type="number"
              id="add-hero-preference"
              name="preference"
              className="form-input"
              value={formData.preference}
              onChange={handleInputChange}
              placeholder="Enter preference (e.g., 1)"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-hero-image" className="form-label">
              Image
              <span className="form-hint">(Max 2MB, will be compressed automatically)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-hero-image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="add-hero-image" className="form-file-label">
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

          <div className="add-hero-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editHero ? 'Update Hero' : 'Save Hero'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

