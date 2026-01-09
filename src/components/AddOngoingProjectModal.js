import { useState, useEffect } from 'react';
import '../css/AddOngoingProjectModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddOngoingProjectModal({ onClose, onSave, editProject = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editProject) {
      setFormData({
        title: editProject.title || '',
        description: editProject.description || '',
        image: null // Don't preload image file
      });
      // Set image preview if project has image URL
      if (editProject.image) {
        const imageUrl = editProject.image.startsWith('http') 
          ? editProject.image 
          : `https://costech.kingdomsolutions.co.tz/${editProject.image}`;
        setImagePreview(imageUrl);
      }
    }
  }, [editProject]);

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
      
      // Convert compressed file to base64 data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result; // This is already a data URL (base64)
        setFormData(prev => ({
          ...prev,
          image: base64String
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
    
    if (!formData.title || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    // Image is only required for new projects, not for updates
    if (!editProject && !formData.image) {
      setError('Please upload an image');
      return;
    }

    setError('');

    // Call onSave with form data and edit project ID if editing
    if (onSave) {
      onSave(formData, editProject?.id);
    }

    // Reset form only if not editing
    if (!editProject) {
      setFormData({
        title: '',
        description: '',
        image: null
      });
      setImagePreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-project-image');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-project-overlay" onClick={onClose}>
      <div className="add-project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-project-header">
          <h2 className="add-project-title">{editProject ? 'Edit Ongoing Project' : 'Add New Ongoing Project'}</h2>
          <button className="add-project-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-project-form" onSubmit={handleSubmit}>
          {error && <div className="add-project-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-project-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-project-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter ongoing project title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-project-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-project-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter ongoing project description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-project-image" className="form-label">
              Image <span className="required">*</span>
              <span className="form-hint">(JPG/PNG, will be compressed automatically)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-project-image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
                required={!editProject}
              />
              <label htmlFor="add-project-image" className="form-file-label">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Choose Image</span>
              </label>
              {formData.image && (
                <div className="image-info">
                  <span>Image Selected</span>
                  <span className="image-size">
                    ({(formData.image.length * 3 / 4 / 1024).toFixed(2)} KB - base64)
                  </span>
                </div>
              )}
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" className="preview-image" />
              </div>
            )}
          </div>

          <div className="add-project-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editProject ? 'Update Ongoing Project' : 'Save Ongoing Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

