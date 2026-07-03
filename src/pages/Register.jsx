import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/Register.css';
import Logo from '../components/Logo'
import { register as registerUser } from '../services/AuthService';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { RegisterFormSchemaResolver } from '../schemas/RegisterForm.schema';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: RegisterFormSchemaResolver,
  });



  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data.name, data.email, data.password);

      if (response.status === 201) {
        toast.success('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.data.message || 'Registration failed! Please try again.');
      }
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

        <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group">
            <label>FULL NAME</label>
            <input type="text" placeholder="Your Name" {...register("name")} />
            {errors.name && <span className="error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.name.message}</span>}
          </div>

          <div className="input-group">
            <label>EMAIL ADDRESS</label>
            <input type="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <span className="error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.email.message}</span>}
          </div>

          <div className="input-group password-field">
            <label>PASSWORD</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="At least 6 characters" {...register("password")} />
              {errors.password && <span className="error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.password.message}</span>}
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
              <input type={showPassword ? "text" : "password"} placeholder="Re-enter your password" {...register("confirmPassword")} />
              <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            {errors.confirmPassword && <span className="error" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.confirmPassword.message}</span>}
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