import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Register.css';
import Logo from '../components/Logo'

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="register-page">
      <div className="register-card">
        {/* Branding Section copied from Login page */}
        <div className="logo-section">
          <div className="logo-icon">
            <Logo />
          </div>
          <p>Create your account to get started</p>
        </div>

        <form className="register-form">
          <div className="input-group">
            <label>FULL NAME</label>
            <input type="text" placeholder="John Doe" />
          </div>

          <div className="input-group">
            <label>EMAIL ADDRESS</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="input-group password-field">
            <label>PASSWORD</label>
            <div className="password-wrapper">
              <input type="password" placeholder="At least 6 characters" />
              <button type="button" className="password-toggle-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>CONFIRM PASSWORD</label>
            <input type="password" placeholder="Re-enter your password" />
          </div>

          <button type="submit" className="create-btn">Create Account</button>
        </form>

        <div className="footer-links">
          <span>Already have an account? <a className="login-link" onClick={() => navigate("/Login")}>Login here</a></span>
        </div>
      </div>
    </div>
  );
};

export default Register;