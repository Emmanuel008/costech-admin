import { useState, useEffect } from 'react';
import '../css/AddInnovationSpaceModal.css';
import { compressImage } from '../utils/imageCompression';

export function AddInnovationSpaceModal({ onClose, onSave, editSpace = null }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sector: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    beneficiary: '',
    year_established: '',
    target_audience: '',
    support_needed: '',
    collaboration: '',
    main_challenges: '',
    interest_in_training: '',
    area_of_capacity_building: '',
    interest_in_events: '',
    events_focus: '',
    open_to_partnership: '',
    partnership_type: '',
    contact_person_name: '',
    contact_person_email: '',
    contact_person_phone: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editSpace) {
      setFormData({
        name: editSpace.name || '',
        category: editSpace.category || '',
        sector: editSpace.sector || '',
        location: editSpace.location || '',
        latitude: editSpace.latitude || '',
        longitude: editSpace.longitude || '',
        description: editSpace.description || '',
        beneficiary: editSpace.beneficiary || '',
        year_established: editSpace.year_established || '',
        target_audience: editSpace.target_audience || '',
        support_needed: editSpace.support_needed || '',
        collaboration: editSpace.collaboration || '',
        main_challenges: editSpace.main_challenges || '',
        interest_in_training: editSpace.interest_in_training || '',
        area_of_capacity_building: editSpace.area_of_capacity_building || '',
        interest_in_events: editSpace.interest_in_events || '',
        events_focus: editSpace.events_focus || '',
        open_to_partnership: editSpace.open_to_partnership || '',
        partnership_type: editSpace.partnership_type || '',
        contact_person_name: editSpace.contact_person_name || '',
        contact_person_email: editSpace.contact_person_email || '',
        contact_person_phone: editSpace.contact_person_phone || '',
        image: null
      });
      if (editSpace.image) {
        setImagePreview(editSpace.image);
      }
    }
  }, [editSpace]);

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

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      e.target.value = '';
      return;
    }

    setError('');
    
    try {
      const compressedFile = await compressImage(file, 1920, 1080, 0.8, 1500);
      
      setFormData(prev => ({
        ...prev,
        image: compressedFile
      }));

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
      setError('Please enter innovation space name');
      return;
    }

    if (onSave) {
      onSave(formData, editSpace?.id);
    }

    if (!editSpace) {
      setFormData({
        name: '',
        category: '',
        sector: '',
        location: '',
        latitude: '',
        longitude: '',
        description: '',
        beneficiary: '',
        year_established: '',
        target_audience: '',
        support_needed: '',
        collaboration: '',
        main_challenges: '',
        interest_in_training: '',
        area_of_capacity_building: '',
        interest_in_events: '',
        events_focus: '',
        open_to_partnership: '',
        partnership_type: '',
        contact_person_name: '',
        contact_person_email: '',
        contact_person_phone: '',
        image: null
      });
      setImagePreview(null);
      setError('');
      const fileInput = document.getElementById('add-space-image');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  return (
    <div className="add-innovation-space-overlay" onClick={onClose}>
      <div className="add-innovation-space-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-innovation-space-header">
          <h2 className="add-innovation-space-title">
            {editSpace ? 'Edit Innovation Space' : 'Add New Innovation Space'}
          </h2>
          <button className="add-innovation-space-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-innovation-space-form" onSubmit={handleSubmit}>
          {error && <div className="add-innovation-space-error">{error}</div>}

          {/* Basic Information */}
          <div className="form-section">
            <h3 className="form-section-title">Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="add-space-name" className="form-label">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="add-space-name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter innovation space name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="add-space-category" className="form-label">Category</label>
                <input
                  type="text"
                  id="add-space-category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Enter category"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="add-space-sector" className="form-label">Sector</label>
                <input
                  type="text"
                  id="add-space-sector"
                  name="sector"
                  className="form-input"
                  value={formData.sector}
                  onChange={handleInputChange}
                  placeholder="Enter sector"
                />
              </div>
              <div className="form-group">
                <label htmlFor="add-space-year" className="form-label">Year Established</label>
                <input
                  type="number"
                  id="add-space-year"
                  name="year_established"
                  className="form-input"
                  value={formData.year_established}
                  onChange={handleInputChange}
                  placeholder="e.g., 2020"
                  min="1900"
                  max="2100"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="add-space-description" className="form-label">Description</label>
              <textarea
                id="add-space-description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                rows="3"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="form-section">
            <h3 className="form-section-title">Location Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="add-space-location" className="form-label">Location</label>
                <input
                  type="text"
                  id="add-space-location"
                  name="location"
                  className="form-input"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="add-space-latitude" className="form-label">Latitude</label>
                <input
                  type="text"
                  id="add-space-latitude"
                  name="latitude"
                  className="form-input"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="Enter latitude"
                />
              </div>
              <div className="form-group">
                <label htmlFor="add-space-longitude" className="form-label">Longitude</label>
                <input
                  type="text"
                  id="add-space-longitude"
                  name="longitude"
                  className="form-input"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="Enter longitude"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3 className="form-section-title">Additional Information</h3>
            <div className="form-group">
              <label htmlFor="add-space-beneficiary" className="form-label">Beneficiary</label>
              <input
                type="text"
                id="add-space-beneficiary"
                name="beneficiary"
                className="form-input"
                value={formData.beneficiary}
                onChange={handleInputChange}
                placeholder="Enter beneficiary"
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-space-target-audience" className="form-label">Target Audience</label>
              <input
                type="text"
                id="add-space-target-audience"
                name="target_audience"
                className="form-input"
                value={formData.target_audience}
                onChange={handleInputChange}
                placeholder="Enter target audience"
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-space-support-needed" className="form-label">Support Needed</label>
              <textarea
                id="add-space-support-needed"
                name="support_needed"
                className="form-textarea"
                value={formData.support_needed}
                onChange={handleInputChange}
                placeholder="Enter support needed"
                rows="2"
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-space-collaboration" className="form-label">Collaboration</label>
              <input
                type="text"
                id="add-space-collaboration"
                name="collaboration"
                className="form-input"
                value={formData.collaboration}
                onChange={handleInputChange}
                placeholder="Enter collaboration details"
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-space-main-challenges" className="form-label">Main Challenges</label>
              <textarea
                id="add-space-main-challenges"
                name="main_challenges"
                className="form-textarea"
                value={formData.main_challenges}
                onChange={handleInputChange}
                placeholder="Enter main challenges"
                rows="2"
              />
            </div>
          </div>

          {/* Training & Events */}
          <div className="form-section">
            <h3 className="form-section-title">Training & Events</h3>
            <div className="form-group">
              <label htmlFor="add-space-interest-training" className="form-label">Interest in Training</label>
              <input
                type="text"
                id="add-space-interest-training"
                name="interest_in_training"
                className="form-input"
                value={formData.interest_in_training}
                onChange={handleInputChange}
                placeholder="Enter interest in training"
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-space-capacity-building" className="form-label">Area of Capacity Building</label>
              <input
                type="text"
                id="add-space-capacity-building"
                name="area_of_capacity_building"
                className="form-input"
                value={formData.area_of_capacity_building}
                onChange={handleInputChange}
                placeholder="Enter area of capacity building"
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-space-interest-events" className="form-label">Interest in Events</label>
              <input
                type="text"
                id="add-space-interest-events"
                name="interest_in_events"
                className="form-input"
                value={formData.interest_in_events}
                onChange={handleInputChange}
                placeholder="Enter interest in events"
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-space-events-focus" className="form-label">Events Focus</label>
              <input
                type="text"
                id="add-space-events-focus"
                name="events_focus"
                className="form-input"
                value={formData.events_focus}
                onChange={handleInputChange}
                placeholder="Enter events focus"
              />
            </div>
          </div>

          {/* Partnership */}
          <div className="form-section">
            <h3 className="form-section-title">Partnership</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="add-space-open-partnership" className="form-label">Open to Partnership</label>
                <input
                  type="text"
                  id="add-space-open-partnership"
                  name="open_to_partnership"
                  className="form-input"
                  value={formData.open_to_partnership}
                  onChange={handleInputChange}
                  placeholder="Yes/No"
                />
              </div>
              <div className="form-group">
                <label htmlFor="add-space-partnership-type" className="form-label">Partnership Type</label>
                <input
                  type="text"
                  id="add-space-partnership-type"
                  name="partnership_type"
                  className="form-input"
                  value={formData.partnership_type}
                  onChange={handleInputChange}
                  placeholder="Enter partnership type"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h3 className="form-section-title">Contact Information</h3>
            <div className="form-group">
              <label htmlFor="add-space-contact-name" className="form-label">Contact Person Name</label>
              <input
                type="text"
                id="add-space-contact-name"
                name="contact_person_name"
                className="form-input"
                value={formData.contact_person_name}
                onChange={handleInputChange}
                placeholder="Enter contact person name"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="add-space-contact-email" className="form-label">Contact Email</label>
                <input
                  type="email"
                  id="add-space-contact-email"
                  name="contact_person_email"
                  className="form-input"
                  value={formData.contact_person_email}
                  onChange={handleInputChange}
                  placeholder="Enter contact email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="add-space-contact-phone" className="form-label">Contact Phone</label>
                <input
                  type="tel"
                  id="add-space-contact-phone"
                  name="contact_person_phone"
                  className="form-input"
                  value={formData.contact_person_phone}
                  onChange={handleInputChange}
                  placeholder="Enter contact phone"
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="form-section">
            <h3 className="form-section-title">Image</h3>
            <div className="form-group">
              <label htmlFor="add-space-image" className="form-label">
                Image
                <span className="form-hint">(Will be compressed automatically)</span>
              </label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="add-space-image"
                  name="image"
                  className="form-file-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="add-space-image" className="form-file-label">
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
          </div>

          <div className="add-innovation-space-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editSpace ? 'Update Innovation Space' : 'Save Innovation Space'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
