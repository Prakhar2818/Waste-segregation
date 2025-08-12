import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authUtils from '../utils/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!authUtils.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Get current user data
    const currentUser = authUtils.getCurrentUser();
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    authUtils.logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="bi bi-recycle me-2"></i>
            Waste Segregation
          </a>
          <div className="navbar-nav ms-auto">
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, {user.name}
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4">Dashboard</h1>
            
            {/* Welcome Card */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Welcome to Waste Segregation System</h5>
                <p className="card-text">
                  Hello {user.name}! You have successfully logged in to the waste segregation management system.
                </p>
                <p className="text-muted">
                  <small>Last login: {new Date(user.loginTime).toLocaleString()}</small>
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card text-white bg-success">
                  <div className="card-body">
                    <h5 className="card-title">Recyclable</h5>
                    <h2>245</h2>
                    <p className="card-text">Items processed</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-warning">
                  <div className="card-body">
                    <h5 className="card-title">Organic</h5>
                    <h2>189</h2>
                    <p className="card-text">Items processed</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-danger">
                  <div className="card-body">
                    <h5 className="card-title">Hazardous</h5>
                    <h2>23</h2>
                    <p className="card-text">Items processed</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white bg-info">
                  <div className="card-body">
                    <h5 className="card-title">General</h5>
                    <h2>156</h2>
                    <p className="card-text">Items processed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <button className="btn btn-outline-primary w-100">
                      <i className="bi bi-camera me-2"></i>
                      Scan Waste Item
                    </button>
                  </div>
                  <div className="col-md-4 mb-3">
                    <button className="btn btn-outline-success w-100">
                      <i className="bi bi-bar-chart me-2"></i>
                      View Reports
                    </button>
                  </div>
                  <div className="col-md-4 mb-3">
                    <button className="btn btn-outline-info w-100">
                      <i className="bi bi-gear me-2"></i>
                      Settings
                    </button>
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

export default Dashboard;
