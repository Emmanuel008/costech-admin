import { useState, useEffect } from 'react';
import '../css/AddCostechVideoModal.css';

export function AddCostechVideoModal({ onClose, onSave, editVideo = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_link: ''
  });
  const [error, setError] = useState('');

  // Load edit data if editing
  useEffect(() => {
    if (editVideo) {
      setFormData({
        title: editVideo.title || '',
        description: editVideo.description || '',
        video_link: editVideo.video_link || ''
      });
    }
  }, [editVideo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.video_link) {
      setError('Please fill in all required fields');
      return;
    }

    // Basic URL validation
    try {
      new URL(formData.video_link);
    } catch (err) {
      setError('Please enter a valid video link URL');
      return;
    }

    // Call onSave with form data and edit video ID if editing
    if (onSave) {
      onSave(formData, editVideo?.id);
    }

    // Reset form only if not editing
    if (!editVideo) {
      setFormData({
        title: '',
        description: '',
        video_link: ''
      });
      setError('');
    }
  };

  return (
    <div className="add-costech-video-overlay" onClick={onClose}>
      <div className="add-costech-video-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-costech-video-header">
          <h2 className="add-costech-video-title">{editVideo ? 'Edit Video' : 'Add New Video'}</h2>
          <button className="add-costech-video-close" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="add-costech-video-form" onSubmit={handleSubmit}>
          {error && <div className="add-costech-video-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="add-video-title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="add-video-title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter video title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-video-description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="add-video-description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter video description"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="add-video-link" className="form-label">
              Video Link <span className="required">*</span>
              <span className="form-hint">(YouTube, Vimeo, or other video URL)</span>
            </label>
            <input
              type="url"
              id="add-video-link"
              name="video_link"
              className="form-input"
              value={formData.video_link}
              onChange={handleInputChange}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>

          <div className="add-costech-video-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editVideo ? 'Update Video' : 'Save Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

