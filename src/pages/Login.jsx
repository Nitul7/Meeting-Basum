import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Login.css';
import Logo from '../components/Logo'

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  return (
    <div className="login-container">
      <div className="login-card">

        <div className="brand-header">
          <div className="brand-logo">
            <Logo />
          </div>
          <p className="brand-subtitle">Welcome! Sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" id="email" placeholder="you@example.com" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <div className="password-wrapper">
              <input type="password" id="password" placeholder="password123" required />
              <button type="button" className="password-toggle-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">Login</button>

        </form>

        <div className="form-divider">
          <span>or</span>
        </div>

        <div className="form-footer">
          <span className='form-span'>Don't have an account? <a className="signup-link" onClick={() => navigate("/Register")}>Register here</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;