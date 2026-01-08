import { useState, useEffect } from 'react';
import '../css/AddPressReleaseModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddPressReleaseModal({ onClose, onSave, editPressRelease = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editPressRelease) {
      setFormData({
        title: editPressRelease.title || '',
        description: editPressRelease.description || '',
        image: null // Don't preload image file
      });
      // Set image preview if press release has image URL
      if (editPressRelease.image) {
        setImagePreview(editPressRelease.image);
      }
    }
  }, [editPressRelease]);

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
    
    if (!formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    // Image is required - for new items, must upload; for edits, can use existing or upload new
    if (!editPressRelease && !formData.image) {
      setError('Please upload an image');
      return;
    }

    // For edits, if no new image uploaded, use existing image
    const dataToSave = { ...formData };
    if (editPressRelease && !formData.image && imagePreview) {
      // Keep existing image when editing without uploading new one
      dataToSave.image = imagePreview;
    }

    // Call onSave with form data and edit press release ID if editing
    if (onSave) {
      onSave(dataToSave, editPressRelease?.id);
    }

    // Reset form only if not editing
    if (!editPressRelease) {
      setFormData({
        title: '',
        description: '',
        image: null
      });
      setImagePreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-press-release-image');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-press-release-overlay" onClick={onClose}>
      <div className="add-press-release-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-press-release-header">
          <h2 className="add-press-release-title">{editPressRelease ? 'Edit Press Release' : 'Add New Press Release'}</h2>
          <button className="add-press-release-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-press-release-form" onSubmit={handleSubmit}>
          {error && <div className="add-press-release-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-press-release-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-press-release-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter press release title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-press-release-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-press-release-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter press release description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-press-release-image" className="form-label">
              Image <span className="required">*</span>
              <span className="form-hint">(Max 2MB, will be compressed automatically)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-press-release-image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
                required={!editPressRelease || !imagePreview}
              />
              <label htmlFor="add-press-release-image" className="form-file-label">
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

          <div className="add-press-release-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editPressRelease ? 'Update Press Release' : 'Save Press Release'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

