import { useState, useEffect } from 'react';
import '../css/AddManagementTeamModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddManagementTeamModal({ onClose, onSave, editMember = null, positions = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    position_id: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editMember) {
      setFormData({
        name: editMember.name || '',
        position_id: editMember.position_id || '',
        description: editMember.description || '',
        image: null // Don't preload image file
      });
      // Set image preview if member has image URL
      if (editMember.image) {
        setImagePreview(editMember.image);
      }
    }
  }, [editMember]);

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
    
    if (!formData.name.trim()) {
      setError('Please enter team member name');
      return;
    }

    // Image is optional for both new and updates
    // Position ID is optional (can be empty string which will be converted to null)

    // Call onSave with form data and edit member ID if editing
    if (onSave) {
      const saveData = {
        ...formData,
        position_id: formData.position_id ? parseInt(formData.position_id) : null
      };
      onSave(saveData, editMember?.id);
    }

    // Reset form only if not editing
    if (!editMember) {
      setFormData({
        name: '',
        position_id: '',
        description: '',
        image: null
      });
      setImagePreview(null);
      setError('');
    
      // Reset file input
      const fileInput = document.getElementById('add-member-image');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-management-team-overlay" onClick={onClose}>
      <div className="add-management-team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-management-team-header">
          <h2 className="add-management-team-title">{editMember ? 'Edit Team Member' : 'Add New Team Member'}</h2>
          <button className="add-management-team-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-management-team-form" onSubmit={handleSubmit}>
          {error && <div className="add-management-team-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-member-name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-member-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter team member name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-member-position" className="form-label">
              Position
            </label>
            <select
              id="add-member-position"
              name="position_id"
              className="form-select"
              value={formData.position_id}
              onChange={handleInputChange}
            >
              <option value="">Select a position</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="add-member-description" className="form-label">
              Description
            </label>
            <textarea
              id="add-member-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter team member description"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-member-image" className="form-label">
              Image
              <span className="form-hint">(Will be compressed automatically)</span>
            </label>
            <div className="image-upload-container">
              <input
                type="file"
                id="add-member-image"
                name="image"
                className="form-file-input"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label htmlFor="add-member-image" className="form-file-label">
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

          <div className="add-management-team-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editMember ? 'Update Team Member' : 'Save Team Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
