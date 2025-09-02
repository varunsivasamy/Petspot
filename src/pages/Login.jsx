import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as: ${email}`);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <form onSubmit={onSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4 text-center">Login</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}