import { useState, useEffect } from 'react';
import '../css/AddFaqCategoryModal.css';

export function AddFaqCategoryModal({ onClose, onSave, editCategory = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name || '',
        description: editCategory.description || ''
      });
    }
  }, [editCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Please enter category name');
      return;
    }

    // Call onSave with form data and edit category ID if editing
    if (onSave) {
      onSave(formData, editCategory?.id);
    }

    // Reset form only if not editing
    if (!editCategory) {
      setFormData({
        name: '',
        description: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-faq-category-overlay" onClick={onClose}>
      <div className="add-faq-category-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-faq-category-header">
          <h2 className="add-faq-category-title">{editCategory ? 'Edit FAQ Category' : 'Add New FAQ Category'}</h2>
          <button className="add-faq-category-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-faq-category-form" onSubmit={handleSubmit}>
          {error && <div className="add-faq-category-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-faq-category-name" className="form-label">
              Category Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-faq-category-name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-faq-category-description" className="form-label">
              Description
            </label>
            <textarea
              id="add-faq-category-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter category description"
              rows="4"
            />
          </div>

          <div className="add-faq-category-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editCategory ? 'Update Category' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
