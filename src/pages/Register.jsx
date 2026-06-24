import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Register.css';
import Logo from '../components/Logo'
import { register } from '../services/AuthService';
import { toast } from 'react-toastify';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await register(fullName, email, password);
      toast.success('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Registration failed! Please try again.');
    }
  };
  return (
    <div className="register-page">
      <img className="reglogoo" src="/ntclogoo.png"></img>
      <div className="register-card">
        {/* Branding Section copied from Login page */}
        <div className="logo-section">
          <div className="logo-icon">
            <Logo />
          </div>
          <p>Create your account to get started</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>FULL NAME</label>
            <input type="text" placeholder="Your Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>EMAIL ADDRESS</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group password-field">
            <label>PASSWORD</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <div className="input-group password-field">
            <label>CONFIRM PASSWORD</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
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