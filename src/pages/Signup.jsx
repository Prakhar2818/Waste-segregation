// components/Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Simulate loading delay
    setTimeout(() => {
      try {
        // Get existing users from localStorage or initialize empty array
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

        // Check if user already exists
        const userExists = existingUsers.some(user => user.email === formData.email);

        if (userExists) {
          setError('An account with this email already exists.');
          setLoading(false);
          return;
        }

        // Create new user object
        const newUser = {
          id: Date.now().toString(), // Simple ID generation
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password, // In real app, this should be hashed
          createdAt: new Date().toISOString()
        };

        // Add new user to the list
        existingUsers.push(newUser);

        // Save updated users list to localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        setSuccess('Account created successfully! Redirecting to login...');

        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Redirect to login after successful signup
        setTimeout(() => {
          navigate('/login');
        }, 2000);

      } catch (error) {
        setError('Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1000); // 1 second delay to simulate network request
  };

  return (
    <div className="container-fluid min-vh-100 auth-background">
      <div className="row min-vh-100 g-0">
        <div className="col-md-6 d-flex align-items-center justify-content-center p-3">
          <div className="card shadow-lg border-0 rounded-4 glass-card compact-form scrollable-form" style={{ width: '480px', maxHeight: '90vh' }}>
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-gradient mb-2" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-person-plus text-white" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <h3 className="card-title fw-bold text-dark mb-1">Create Account</h3>
                <p className="text-muted small mb-0">Join our eco-friendly community today</p>
              </div>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label fw-semibold text-dark small">
                      <i className="bi bi-person me-1"></i>First Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3 border-2"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="First name"
                      style={{ backgroundColor: '#f8f9fa', border: '2px solid #e9ecef', padding: '0.5rem 0.75rem' }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label fw-semibold text-dark small">
                      <i className="bi bi-person me-1"></i>Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3 border-2"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Last name"
                      style={{ backgroundColor: '#f8f9fa', border: '2px solid #e9ecef', padding: '0.5rem 0.75rem' }}
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold text-dark small">
                    <i className="bi bi-envelope me-1"></i>Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-3 border-2"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email address"
                    style={{ backgroundColor: '#f8f9fa', border: '2px solid #e9ecef', padding: '0.5rem 0.75rem' }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold text-dark small">
                    <i className="bi bi-lock me-1"></i>Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-3 border-2"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create password"
                    style={{ backgroundColor: '#f8f9fa', border: '2px solid #e9ecef', padding: '0.5rem 0.75rem' }}
                  />
                  <div className="form-text text-muted" style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-info-circle me-1"></i>Min 6 characters
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label fw-semibold text-dark small">
                    <i className="bi bi-lock-fill me-1"></i>Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-3 border-2"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm password"
                    style={{ backgroundColor: '#f8f9fa', border: '2px solid #e9ecef', padding: '0.5rem 0.75rem' }}
                  />
                </div>
                
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="terms" required />
                  <label className="form-check-label text-muted small" htmlFor="terms">
                    I agree to the <Link to="#" className="text-decoration-none text-primary fw-semibold">Terms</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mb-3 rounded-3 fw-semibold"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(45deg, #28a745, #20c997)',
                    border: 'none',
                    padding: '0.75rem 0',
                    boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>
                      Create Account
                    </>
                  )}
                </button>
              </form>
              
              <div className="text-center">
                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="px-2 text-muted" style={{ fontSize: '0.8rem' }}>OR</span>
                  <hr className="flex-grow-1" />
                </div>

                <p className="mb-0 text-muted small">
                  Already have an account?
                  <Link to="/login" className="text-decoration-none fw-semibold text-primary ms-1">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="text-center text-white px-4">
            <div className="mb-3">
              <i className="bi bi-globe2 floating" style={{ fontSize: '3.5rem', color: '#28a745' }}></i>
            </div>
            <h1 className="display-4 fw-bold mb-3">Join Our Mission!</h1>
            <p className="lead mb-4" style={{ fontSize: '1.1rem' }}>
              Be part of the solution. Help create a sustainable future through intelligent waste management.
            </p>

            <div className="row text-center">
              <div className="col-12 mb-3">
                <div className="d-flex align-items-center justify-content-start mb-2">
                  <div className="rounded-circle bg-success bg-gradient p-2 me-3" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-check-circle text-white d-flex align-items-center justify-content-center h-100" style={{ fontSize: '1.2rem' }}></i>
                  </div>
                  <div className="text-start">
                    <h6 className="mb-1 fw-bold">Smart Classification</h6>
                    <p className="mb-0 text-light small opacity-90">AI-powered waste sorting</p>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="d-flex align-items-center justify-content-start mb-2">
                  <div className="rounded-circle bg-info bg-gradient p-2 me-3" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-graph-up-arrow text-white d-flex align-items-center justify-content-center h-100" style={{ fontSize: '1.2rem' }}></i>
                  </div>
                  <div className="text-start">
                    <h6 className="mb-1 fw-bold">Track Progress</h6>
                    <p className="mb-0 text-light small opacity-90">Monitor your environmental impact</p>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="d-flex align-items-center justify-content-start mb-2">
                  <div className="rounded-circle bg-warning bg-gradient p-2 me-3" style={{ width: '45px', height: '45px' }}>
                    <i className="bi bi-people text-white d-flex align-items-center justify-content-center h-100" style={{ fontSize: '1.2rem' }}></i>
                  </div>
                  <div className="text-start">
                    <h6 className="mb-1 fw-bold">Community Impact</h6>
                    <p className="mb-0 text-light small opacity-90">Join thousands making a difference</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
