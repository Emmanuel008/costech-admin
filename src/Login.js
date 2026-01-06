import { useState } from 'react';
import './css/Login.css';
import { authAPI } from './services/api';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login(email, password);

      if (data.status === 'OK') {
        // Store access token in localStorage
        if (data.returnData && data.returnData.access_token) {
          localStorage.setItem('access_token', data.returnData.access_token);
        }
        
        // Call onLogin to switch to admin panel
        if (onLogin) {
          onLogin();
        }
      } else {
        // Handle error response
        setError(data.errorMessage || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.errorMessage || err.message || 'Network error. Please check your connection and try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email1" className="form-label">Your email</label>
            <input 
              id="email1" 
              type="email" 
              className="form-input"
              placeholder="admin@admin.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password1" className="form-label">Your password</label>
            <input 
              id="password1" 
              type="password" 
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              disabled={loading}
            />
          </div>
          <div className="form-checkbox-group">
            <input 
              type="checkbox" 
              id="remember" 
              className="form-checkbox"
            />
            <label htmlFor="remember" className="form-checkbox-label">
              Remember me
            </label>
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
