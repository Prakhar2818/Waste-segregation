// components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with your actual API endpoint
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Handle successful login
      const { token, user } = response.data;

      // Store token in localStorage (or use a state management solution)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 auth-background" style={{
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div className="container-fluid h-100">
        <div className="row min-vh-100 g-0">
          {/* Left Panel - Welcome Section */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
            <div className="text-center text-white w-100" style={{ maxWidth: 'px' }}>
              {/* Logo/Icon Section */}
              <div className="mb-5">
                <div className="position-relative d-inline-block">
                  <i className="bi bi-recycle display-1 text-success mb-3 icon-bounce"></i>
                  <div className="position-absolute top-0 start-100 translate-middle">
                    <span className="badge bg-success rounded-pill">
                      <i className="bi bi-check-lg"></i>
                    </span>
                  </div>
                </div>
              </div>

              {/* Welcome Text */}
              <div className="mb-5">
                <h1 className="display-4 fw-bold mb-3">Welcome Back!</h1>
                <p className="lead fs-5 mb-4 opacity-90">
                  Join us in making the world cleaner through smart waste segregation
                </p>
                <div className="border-top border-bottom border-light py-3 mb-4">
                  <small className="text-light opacity-75">
                    Transforming waste management with intelligent solutions
                  </small>
                </div>
              </div>

              {/* Feature Icons */}
              <div className="row g-4">
                <div className="col-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <i className="bi bi-leaf display-6 text-success mb-2"></i>
                    <h6 className="fw-semibold">Eco-Friendly</h6>
                    <small className="opacity-75">Sustainable solutions</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <i className="bi bi-graph-up display-6 text-info mb-2"></i>
                    <h6 className="fw-semibold">Smart Analytics</h6>
                    <small className="opacity-75">Data-driven insights</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-3 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <i className="bi bi-people display-6 text-warning mb-2"></i>
                    <h6 className="fw-semibold">Community</h6>
                    <small className="opacity-75">Together we grow</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
            <div className="w-100" style={{ maxWidth: '450px' }}>
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden glass-card">
                <div className="card-header bg-white border-0 text-center py-4">
                  <h2 className="card-title mb-1 fw-bold text-dark">Sign In</h2>
                  <p className="text-muted mb-0">Enter your credentials to access your account</p>
                </div>

                <div className="card-body p-4 p-md-5">
                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {error}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError('')}
                        aria-label="Close"
                      ></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label fw-semibold text-dark">
                        <i className="bi bi-envelope me-2"></i>Email address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg rounded-3 border-2"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email address"
                        style={{
                          backgroundColor: '#f8f9fa',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-semibold text-dark">
                        <i className="bi bi-lock me-2"></i>Password
                      </label>
                      <input
                        type="password"
                        className="form-control form-control-lg rounded-3 border-2"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        style={{
                          backgroundColor: '#f8f9fa',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                        />
                        <label className="form-check-label text-muted" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <Link
                        to="#"
                        className="text-decoration-none text-primary fw-semibold"
                        style={{ fontSize: '0.9rem' }}
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100 mb-4 rounded-3 fw-semibold"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        padding: '12px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-center mb-4">
                    <div className="d-flex align-items-center">
                      <hr className="flex-grow-1" />
                      <span className="px-3 text-muted small">OR</span>
                      <hr className="flex-grow-1" />
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <p className="mb-0 text-muted">
                      Don't have an account?
                      <Link
                        to="/signup"
                        className="text-decoration-none text-primary fw-semibold ms-1"
                      >
                        Create Account
                      </Link>
                    </p>
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

export default Login;
