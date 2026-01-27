import React from 'react';
import '../css/Loader.css';

export function Loader({ message = 'Loading...' }) {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-spinner"></div>
        {message && <p className="loader-message">{message}</p>}
      </div>
    </div>
  );
}
