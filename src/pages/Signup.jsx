// Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EcoLogo from "../assets/eco-worth.png";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must agree to the Terms");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Account created successfully (dummy)");
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        {/* Left - Signup Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div className="text-center mb-4">
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#2ecc71',
                  borderRadius: '50%',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  color: 'white'
                }}
              >
                👤+
              </div>
              <h3 className="mt-3 fw-bold">Create Account</h3>
              <p className="text-muted">Join our eco-friendly community today</p>
            </div>

            <form onSubmit={handleSignup}>
              {/* First & Last Name */}
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: '8px' }}
                />
              </div>

              {/* Password */}
              <div className="mb-1">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: '8px' }}
                />
              </div>
              <small className="text-muted d-block mb-3">Min 6 characters</small>

              {/* Confirm Password */}
              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ borderRadius: '8px' }}
                />
              </div>

              {/* Terms */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agree"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="agree">
                  I agree to the <Link to="#" className="text-primary text-decoration-none">Terms</Link>
                </label>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                className="btn w-100 mb-3"
                style={{
                  background: 'linear-gradient(90deg, #00c853, #00e676)',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 'bold'
                }}
              >
                👤+ Create Account
              </button>

              {/* Divider */}
              <div className="d-flex align-items-center mb-3">
                <hr className="flex-grow-1" />
                <span className="mx-2 text-muted">OR</span>
                <hr className="flex-grow-1" />
              </div>

              <p className="text-muted text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-primary text-decoration-none">Sign in</Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right - Blue section with Logo & Circles */}
        <div
          className="col-md-6 d-none d-md-flex justify-content-center align-items-center position-relative"
          style={{
            backgroundColor: '#0D1B3E',
            overflow: 'hidden'
          }}
        >
          <img src={EcoLogo} alt="EcoLogo" height={350} />
          {[
            { color: '#1E2A5A', top: '10%', left: '15%', size: 100 },
            { color: '#233B75', top: '25%', left: '60%', size: 80 },
            { color: '#1A285A', top: '50%', left: '20%', size: 120 },
            { color: '#2A4C9C', top: '70%', left: '50%', size: 90 },
            { color: '#3366CC', top: '15%', left: '80%', size: 70 },
            { color: '#4B79A1', top: '80%', left: '15%', size: 110 },
            { color: '#2980B9', top: '60%', left: '75%', size: 100 }
          ].map((circle, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: circle.top,
                left: circle.left,
                width: `${circle.size}px`,
                height: `${circle.size}px`,
                backgroundColor: circle.color,
                borderRadius: '50%',
                opacity: 0.9
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
