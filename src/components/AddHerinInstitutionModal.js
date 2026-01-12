import { useState, useEffect } from 'react';
import '../css/AddPositionModal.css';

// Region data
const TANZANIA_MAINLAND_REGIONS = [
  'Arusha',
  'Dar es Salaam',
  'Dodoma',
  'Geita',
  'Iringa',
  'Kagera',
  'Katavi',
  'Kigoma',
  'Kilimanjaro',
  'Lindi',
  'Manyara',
  'Mara',
  'Mbeya',
  'Morogoro',
  'Mtwara',
  'Mwanza',
  'Njombe',
  'Pwani (Coast)',
  'Rukwa',
  'Ruvuma',
  'Shinyanga',
  'Simiyu',
  'Singida',
  'Songwe',
  'Tabora',
  'Tanga'
];

const ZANZIBAR_REGIONS = [
  'Kaskazini Unguja (North Unguja)',
  'Kusini Unguja (South Unguja)',
  'Mjini Magharibi (Urban/West Unguja)',
  'Kaskazini Pemba (North Pemba)',
  'Kusini Pemba (South Pemba)'
];

export function AddHerinInstitutionModal({ onClose, onSave, editInstitution = null }) {
  const [formData, setFormData] = useState({
    name: '',
    institution_name: '',
    description: '',
    operation_area: '',
    region: '',
    category: ''
  });
  const [error, setError] = useState('');
  
  // Get available regions based on operation area
  const getAvailableRegions = () => {
    if (formData.operation_area === 'Tanzania Mainland') {
      return TANZANIA_MAINLAND_REGIONS;
    } else if (formData.operation_area === 'Zanzibar') {
      return ZANZIBAR_REGIONS;
    }
    return [];
  };

  // Load edit data if editing
  useEffect(() => {
    if (editInstitution) {
      setFormData({
        name: editInstitution.name || editInstitution.institution_name || '',
        institution_name: editInstitution.institution_name || editInstitution.name || '',
        description: editInstitution.description || '',
        operation_area: editInstitution.operation_area || '',
        region: editInstitution.region || '',
        category: editInstitution.category || ''
      });
    }
  }, [editInstitution]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // If operation area changes, reset region
      if (name === 'operation_area') {
        newData.region = '';
      }
      
      // Sync name and institution_name
      if (name === 'name') {
        newData.institution_name = value;
      } else if (name === 'institution_name') {
        newData.name = value;
      }
      
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() && !formData.institution_name.trim()) {
      setError('Please enter institution name');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please enter description');
      return;
    }

    if (!formData.operation_area) {
      setError('Please select operation area');
      return;
    }

    if (!formData.region) {
      setError('Please select region');
      return;
    }

    if (!formData.category) {
      setError('Please select category');
      return;
    }

    setError('');

    // Call onSave with form data and edit institution ID if editing
    if (onSave) {
      onSave(formData, editInstitution?.id);
    }

    // Reset form only if not editing
    if (!editInstitution) {
      setFormData({
        name: '',
        institution_name: '',
        description: '',
        operation_area: '',
        region: '',
        category: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-position-overlay" onClick={onClose}>
      <div className="add-position-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-position-header">
          <h2 className="add-position-title">{editInstitution ? 'Edit HERIN Institution' : 'Add New HERIN Institution'}</h2>
          <button className="add-position-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-position-form" onSubmit={handleSubmit}>
          {error && <div className="add-position-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-herin-institution-name" className="form-label">
              Institution Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-herin-institution-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter institution name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-herin-institution-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-herin-institution-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter institution description"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-herin-institution-operation-area" className="form-label">
              Operation Area <span className="required">*</span>
            </label>
            <select
              id="add-herin-institution-operation-area"
              name="operation_area"
              className="form-select"
              value={formData.operation_area}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Operation Area</option>
              <option value="Tanzania Mainland">Tanzania Mainland</option>
              <option value="Zanzibar">Zanzibar</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="add-herin-institution-region" className="form-label">
              Region <span className="required">*</span>
            </label>
            <select
              id="add-herin-institution-region"
              name="region"
              className="form-select"
              value={formData.region}
              onChange={handleInputChange}
              required
              disabled={!formData.operation_area}
            >
              <option value="">
                {formData.operation_area 
                  ? `Select Region (${getAvailableRegions().length} available)`
                  : 'Select Operation Area first'}
              </option>
              {getAvailableRegions().map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="add-herin-institution-category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="add-herin-institution-category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              <option value="HLI">HLI</option>
              <option value="R&D">R&D</option>
              <option value="TTC">TTC</option>
              <option value="TVET">TVET</option>
              <option value="FDC">FDC</option>
              <option value="Regulator">Regulator</option>
            </select>
          </div>

          <div className="add-position-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editInstitution ? 'Update Institution' : 'Save Institution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

