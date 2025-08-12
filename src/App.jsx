import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SellerDashboard from './pages/SellerDashboard';
import SellerListingPage from './pages/SellerListingPage';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/seller-listing" element={<SellerListingPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
