import { useState, useEffect } from 'react';
import '../css/AddSocialMediaPlatformModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddSocialMediaPlatformModal({ onClose, onSave, editPlatform = null, loading = false }) {
  const [formData, setFormData] = useState({
    icon: null,
    link: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editPlatform) {
      setFormData({
        icon: null, // Don't preload image file
        link: editPlatform.link || ''
      });
      // Set image preview if platform has icon URL
      if (editPlatform.icon) {
        setImagePreview(editPlatform.icon);
      }
    }
  }, [editPlatform]);

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
      // Compress the image before storing (icons are typically small, so use 512x512 max)
      const compressedFile = await compressImage(file, 512, 512, 0.8);
      
      // Convert compressed file to base64 data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is already a data URL (base64)
        setFormData(prev => ({
          ...prev,
          icon: base64String
        }));
        setImagePreview(base64String);
      };
      reader.onerror = () => {
        setError('Failed to read file. Please try again.');
        e.target.value = '';
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
    
    if (loading) return;
    
    // Icon is only required for new platforms, not for updates
    if (!editPlatform && !formData.icon) {
      setError('Please upload an icon image');
      return;
    }

    if (!formData.link) {
      setError('Please enter link URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(formData.link);
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setError('');

    // Call onSave with form data and edit platform ID if editing
    if (onSave) {
      onSave(formData, editPlatform?.id);
    }

    // Reset form only if not editing
    if (!editPlatform) {
      setFormData({
        icon: null,
        link: ''
      });
      setImagePreview(null);
      setError('');
      
      // Reset file input
      const fileInput = document.getElementById('add-platform-icon');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-social-media-platform-overlay" onClick={onClose}>
      <div className="add-social-media-platform-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-social-media-platform-header">
          <h2 className="add-social-media-platform-title">{editPlatform ? 'Edit Social Media Platform' : 'Add New Social Media Platform'}</h2>
          <button className="add-social-media-platform-close" onClick={onClose} disabled={loading}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-social-media-platform-form" onSubmit={handleSubmit}>
          {error && <div className="add-social-media-platform-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-platform-icon" className="form-label">
              Icon Image <span className="required">*</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-platform-icon"
                name="icon"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                className="file-input"
              />
              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Icon preview" className="image-preview" />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, icon: null }));
                      setImagePreview(null);
                      const fileInput = document.getElementById('add-platform-icon');
                      if (fileInput) {
                        fileInput.value = '';
                      }
                    }}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <small className="form-hint">Upload an icon image (recommended: 512x512px or smaller)</small>
          </div>

          <div className="form-group">
            <label htmlFor="add-platform-link" className="form-label">
              Link URL <span className="required">*</span>
            </label>
            <input
              type="url"
              id="add-platform-link"
              name="link"
              className="form-input"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="https://example.com"
              required
              disabled={loading}
            />
            <small className="form-hint">Enter a valid URL (must start with http:// or https://)</small>
          </div>

          <div className="add-social-media-platform-actions">
            <button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Saving...' : (editPlatform ? 'Update Platform' : 'Save Platform')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
