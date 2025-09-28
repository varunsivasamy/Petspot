import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        alert("Registration successful! Please login.");
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join Pet Bazaar to find your perfect companion</p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                id="name"
                type="text" 
                placeholder="Enter your full name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                placeholder="Create a password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
