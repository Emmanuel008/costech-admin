import { useState, useEffect } from 'react';
import '../css/AddFaqModal.css';

export function AddFaqModal({ onClose, onSave, editFaq = null, categories = [] }) {
  const [formData, setFormData] = useState({
    faq_category_id: '',
    question: '',
    answer: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editFaq) {
      setFormData({
        faq_category_id: editFaq.faq_category_id || '',
        question: editFaq.question || '',
        answer: editFaq.answer || ''
      });
    }
  }, [editFaq]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.faq_category_id) {
      setError('Please select a category');
      return;
    }

    if (!formData.question.trim()) {
      setError('Please enter a question');
      return;
    }

    if (!formData.answer.trim()) {
      setError('Please enter an answer');
      return;
    }

    setError('');

    // Call onSave with form data and edit FAQ ID if editing
    if (onSave) {
      onSave({
        ...formData,
        faq_category_id: parseInt(formData.faq_category_id, 10)
      }, editFaq?.id);
    }

    // Reset form only if not editing
    if (!editFaq) {
      setFormData({
        faq_category_id: '',
        question: '',
        answer: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-faq-overlay" onClick={onClose}>
      <div className="add-faq-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-faq-header">
          <h2 className="add-faq-title">{editFaq ? 'Edit FAQ' : 'Add New FAQ'}</h2>
          <button className="add-faq-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-faq-form" onSubmit={handleSubmit}>
          {error && <div className="add-faq-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-faq-category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="add-faq-category"
              name="faq_category_id"
              className="form-select"
              value={formData.faq_category_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="add-faq-question" className="form-label">
              Question <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-faq-question"
              name="question"
              className="form-input"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="Enter question"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-faq-answer" className="form-label">
              Answer <span className="required">*</span>
            </label>
            <textarea
              id="add-faq-answer"
              name="answer"
              className="form-textarea"
              value={formData.answer}
              onChange={handleInputChange}
              placeholder="Enter answer"
              rows="6"
              required
            />
          </div>

          <div className="add-faq-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editFaq ? 'Update FAQ' : 'Save FAQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
