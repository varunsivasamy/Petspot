import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords don't match!");
      return;
    }
    alert(`Registered: ${email}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h1>
      <label>Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <label>Password</label>
      <input
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <label>Confirm Password</label>
      <input
        type="password"
        required
        value={confirmPass}
        onChange={e => setConfirmPass(e.target.value)}
        placeholder="Confirm your password"
      />
      <button type="submit">Register</button>
    </form>
  );
}