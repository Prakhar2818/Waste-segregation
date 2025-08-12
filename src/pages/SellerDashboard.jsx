import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { statesWithCities } from "../assets/ConstantData";
import Logo from "../assets/logo.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import WasteTable from "../components/WasteMOdal";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Static Data for categories
  const staticData = [
    { category: "PET", quantity: 120 },
    { category: "HDPE", quantity: 90 },
    { category: "PVC", quantity: 60 },
    { category: "LDPE", quantity: 45 },
    { category: "PP", quantity: 80 },
  ];

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    quantity: "",
    pricePerKg: "",
    description: "",
    location: "",
    contactNumber: "",
  });

  const handleListClick = (category) => {
    // Find the item data for this category
    const itemData = staticData.find(item => item.category === category);
    
    setSelectedItem({
      category,
      quantity: itemData?.quantity || 0,
      pricePerKg: 50,
      location: city || "Mumbai"
    });
    
    setFormData({
      category,
      quantity: itemData?.quantity || 0,
      pricePerKg: 50,
      description: "",
      location: city || "Mumbai",
      contactNumber: "",
    });
    
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
      id: Date.now(),
      ...formData,
      datePosted: new Date().toISOString(),
      seller: "Current User",
      status: "available"
    };
    
    // Save to localStorage
    const savedListings = localStorage.getItem("wasteListings");
    const listings = savedListings ? JSON.parse(savedListings) : [];
    const updatedListings = [...listings, newListing];
    localStorage.setItem("wasteListings", JSON.stringify(updatedListings));
    
    setShowModal(false);
    // Navigate to listing page to show all listings
    navigate("/seller-listing", { 
      state: { 
        category: selectedItem.category
      } 
    });
  };

  // Forecast Data (City + Category)
  const forecastDataByCity = {
    Mumbai: {
      PET: [
        { month: "Aug 2025", price: 78 },
        { month: "Sep 2025", price: 85 },
        { month: "Oct 2025", price: 88 },
        { month: "Nov 2025", price: 91 },
        { month: "Dec 2025", price: 95 },
        { month: "Jan 2026", price: 98 },
        { month: "Feb 2026", price: 100 },
        { month: "Mar 2026", price: 103 },
        { month: "Apr 2026", price: 105 },
      ],
    },
    Bengaluru: {
      PET: [
        { month: "Aug 2025", price: 70 },
        { month: "Sep 2025", price: 76 },
        { month: "Oct 2025", price: 80 },
        { month: "Nov 2025", price: 85 },
        { month: "Dec 2025", price: 90 },
        { month: "Jan 2026", price: 95 },
        { month: "Feb 2026", price: 100 },
        { month: "Mar 2026", price: 104 },
        { month: "Apr 2026", price: 108 },
      ],
    },
  };

  // State and City selection
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [city, setCity] = useState(statesWithCities["Maharashtra"][0] || "");

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("PET");
  const [forecastMonths, setForecastMonths] = useState(3);

  const forecastOptions = [3, 6, 9];

  // Handlers
  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    // Auto-select first city of that state
    const firstCity = statesWithCities[newState]?.[0] || "";
    setCity(firstCity);
  };

  const handleCityChange = (e) => setCity(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleMonthsChange = (e) => setForecastMonths(Number(e.target.value));

  // Chart Data with fallback if city/category is missing
  const chartData =
    forecastDataByCity[city]?.[selectedCategory]?.slice(0, forecastMonths) ||
    Array.from({ length: forecastMonths }, (_, i) => ({
      month: `Month ${i + 1}`,
      price: 0,
    }));

  return (
    <div
      className="min-vh-100 auth-background"
      style={{ fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}
    >
      <div className="container-fluid p-0">
        {/* Header with Logo */}
        <div className="row g-0 m-0">
          <div className="col-12">
            <div className="glass-card border-0 rounded-0 shadow-sm">
              <div className="card-body py-3 px-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={Logo} alt="EcoWorth Logo" height={80} />
                    <h1 className="display-6 fw-bold text-white mb-0">Waste Dashboard</h1>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('isAuthenticated');
                      localStorage.removeItem('authToken');
                      localStorage.removeItem('user');
                      navigate('/login');
                    }}
                    className="btn btn-danger rounded-3"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="container-fluid py-4">
          <div className="row mb-4">
            <div className="col-12">
              <div className="card glass-card border-0 shadow-lg rounded-4">
                <div className="card-body p-4">
                  <h4 className="card-title fw-bold text-dark mb-4">
                    <i className="bi bi-funnel me-2 text-primary"></i>Filter Options
                  </h4>
                  <div className="row g-4">
                    {/* State Dropdown */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <i className="bi bi-geo-alt me-2 text-primary"></i>Select State
                      </label>
                      <select
                        value={selectedState}
                        onChange={handleStateChange}
                        className="form-select form-select-lg rounded-3 border-2"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        {Object.keys(statesWithCities).map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City Dropdown */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <i className="bi bi-building me-2 text-primary"></i>Select City
                      </label>
                      <select
                        value={city}
                        onChange={handleCityChange}
                        className="form-select form-select-lg rounded-3 border-2"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        {statesWithCities[selectedState]?.map((ct) => (
                          <option key={ct} value={ct}>
                            {ct}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Category Dropdown */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <i className="bi bi-tags me-2 text-primary"></i>Select Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="form-select form-select-lg rounded-3 border-2"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        {staticData.map((item) => (
                          <option key={item.category} value={item.category}>
                            {item.category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Forecast Months */}
                    <div className="col-md-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        <i className="bi bi-calendar-range me-2 text-primary"></i>
                        Forecast Months
                      </label>
                      <select
                        value={forecastMonths}
                        onChange={handleMonthsChange}
                        className="form-select form-select-lg rounded-3 border-2"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        {forecastOptions.map((m) => (
                          <option key={m} value={m}>
                            {m} months
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            marginBottom: "30px"
          }}>
            <h3 style={{ marginBottom: "15px", color: "#334155" }}>♻ Waste Quantities</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f1f5f9" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Category</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Quantity (kg)</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {staticData.map((item, index) => (
                  <tr className="w-100" key={item.category} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                    <td style={{ padding: "12px" }}>{item.category}</td>
                    <td style={{ padding: "12px" }}>{item.quantity}</td>
                    <td style={{ padding: "12px" }}>
                      <button 
                        className="btn btn-success"
                        onClick={() => handleListClick(item.category)}
                      >
                        List
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content rounded-4 border-0">
                  <div className="modal-header border-0 pb-0">
                    <h5 className="modal-title fw-bold">
                      <i className="bi bi-file-plus me-2 text-primary"></i>
                      Create New {selectedItem?.category} Listing
                    </h5>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Category</label>
                          <div className="form-control rounded-3 bg-light d-flex align-items-center">
                            <i className="bi bi-tag me-2 text-primary"></i>
                            <strong>{selectedItem?.category}</strong>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Quantity (kg)</label>
                          <div className="form-control rounded-3 bg-light d-flex align-items-center">
                            <i className="bi bi-box me-2 text-primary"></i>
                            <strong>{selectedItem?.quantity} kg</strong>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Price per kg (₹)</label>
                          <div className="form-control rounded-3 bg-light d-flex align-items-center">
                            <i className="bi bi-currency-rupee me-2 text-primary"></i>
                            <strong>₹{selectedItem?.pricePerKg}/kg</strong>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Contact Number</label>
                          <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            required
                            placeholder="Enter your contact number"
                          />
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">Location</label>
                          <div className="form-control rounded-3 bg-light d-flex align-items-center">
                            <i className="bi bi-geo-alt me-2 text-primary"></i>
                            <strong>{selectedItem?.location}</strong>
                          </div>
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">Description</label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-control rounded-3"
                            rows="3"
                            placeholder="Additional details about the waste material..."
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-end gap-2 mt-4">
                        <button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="btn btn-outline-secondary rounded-3"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success rounded-3"
                        >
                          <i className="bi bi-plus-circle me-2"></i>
                          Create Listing
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chart Section */}
          <div className="row">
            <div className="col-12">
              <div className="card glass-card border-0 shadow-lg rounded-4">
                <div className="card-body p-4">
                  <h4 className="card-title fw-bold text-dark mb-4">
                    <i className="bi bi-graph-up-arrow me-2 text-success"></i>
                    Price Forecast
                  </h4>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      {chartData > 0 && (
                        <>
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="price" fill="#82ca9d" />
                        </>
                      )
                      }
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Waste Table */}
          <div className="row mt-4">
            <div className="col-12">
              <WasteTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
