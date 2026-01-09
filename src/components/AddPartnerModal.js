import { useState, useEffect } from 'react';
import '../css/AddPartnerModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddPartnerModal({ onClose, onSave, editPartner = null }) {
  const [formData, setFormData] = useState({
    name: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editPartner) {
      setFormData({
        name: editPartner.name || '',
        image: null // Don't preload image file
      });
      // Set image preview if partner has logo/image URL
      if (editPartner.logo || editPartner.image) {
        setImagePreview(editPartner.logo || editPartner.image);
      }
    }
  }, [editPartner]);

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
    
    if (!formData.name) {
      setError('Please enter partner name');
      return;
    }

    // Image is only required for new partners, not for updates
    if (!editPartner && !formData.image) {
      setError('Please upload a logo');
      return;
    }

    // Call onSave with form data and edit partner ID if editing
    if (onSave) {
      onSave(formData, editPartner?.id);
    }

    // Reset form only if not editing
    if (!editPartner) {
      setFormData({
        name: '',
        image: null
      });
      setImagePreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-partner-image');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-partner-overlay" onClick={onClose}>
      <div className="add-partner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-partner-header">
          <h2 className="add-partner-title">{editPartner ? 'Edit Partner' : 'Add New Partner'}</h2>
          <button className="add-partner-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-partner-form" onSubmit={handleSubmit}>
          {error && <div className="add-partner-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-partner-name" className="form-label">
              Partner Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-partner-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter partner name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-partner-image" className="form-label">
              Logo <span className="required">*</span>
              <span className="form-hint">(Will be compressed automatically)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-partner-image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
                required={!editPartner}
              />
              <label htmlFor="add-partner-image" className="form-file-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Choose Logo</span>
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

          <div className="add-partner-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editPartner ? 'Update Partner' : 'Save Partner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

