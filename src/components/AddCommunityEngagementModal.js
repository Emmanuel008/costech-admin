import { useState, useEffect } from 'react';
import '../css/AddCommunityEngagementModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddCommunityEngagementModal({ onClose, onSave, editEngagement = null }) {
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
    if (editEngagement) {
      setFormData({
        date: editEngagement.date || editEngagement.created_at ? new Date(editEngagement.date || editEngagement.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        title: editEngagement.title || '',
        description: editEngagement.description || '',
        image: null // Don't preload image file
      });
      // Set image preview if engagement has image URL
      if (editEngagement.image) {
        setImagePreview(editEngagement.image);
      }
    } else {
      // Set default date to today for new engagement
      setFormData(prev => ({
        ...prev,
        date: new Date().toISOString().split('T')[0]
      }));
    }
  }, [editEngagement]);

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
    
    if (!formData.date || !formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    // Image is required for both new and updates
    if (!formData.image && !imagePreview) {
      setError('Please upload an image');
      return;
    }

    // For edits, if no new image uploaded, use existing image
    const dataToSave = { ...formData };
    if (editEngagement && !formData.image && imagePreview) {
      // Keep existing image when editing without uploading new one
      dataToSave.image = imagePreview;
    }

    // Call onSave with form data and edit engagement ID if editing
    if (onSave) {
      onSave(dataToSave, editEngagement?.id);
    }

    // Reset form only if not editing
    if (!editEngagement) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        title: '',
        description: '',
        image: null
      });
      setImagePreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-engagement-image');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-community-engagement-overlay" onClick={onClose}>
      <div className="add-community-engagement-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-community-engagement-header">
          <h2 className="add-community-engagement-title">{editEngagement ? 'Edit Community Engagement' : 'Add New Community Engagement'}</h2>
          <button className="add-community-engagement-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-community-engagement-form" onSubmit={handleSubmit}>
          {error && <div className="add-community-engagement-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-engagement-date" className="form-label">
              Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="add-engagement-date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-engagement-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-engagement-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter engagement title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-engagement-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-engagement-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter engagement description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-engagement-image" className="form-label">
              Image <span className="required">*</span>
              <span className="form-hint">(Max 2MB, will be compressed automatically)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-engagement-image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
                required={!editEngagement || !imagePreview}
              />
              <label htmlFor="add-engagement-image" className="form-file-label">
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

          <div className="add-community-engagement-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editEngagement ? 'Update Engagement' : 'Save Engagement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

