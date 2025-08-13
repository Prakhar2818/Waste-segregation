import React, { useState, useEffect } from "react";
import "../assets/scss/style.scss";
import { mockData } from "../assets/ConstantData";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setListings(mockData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredListings =
    activeCategory === "all"
      ? listings
      : listings.filter((item) => item.category === activeCategory);

  return (
    <div className="recycle-app">
      <Navbar />
      <HeroSection />

      <div className="container">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>AI is analyzing waste streams...</p>
          </div>
        ) : (
          <>
            <StatsBar listings={filteredListings} />
            <ListingsGrid listings={filteredListings} />
          </>
        )}
      </div>

      <HowItWorks />
      <Footer />
    </div>
  );
};

const HeroSection = () => (
  <section className="hero">
    <div className="container">
      <div className="hero-content">
        <h2>Transform Waste into Value</h2>
        <p className="subtitle">
          Our AI-powered marketplace connects sustainable businesses with
          quality recycled plastics
        </p>
        <div className="hero-buttons">
          <button className="btn-primary px-3 p-2 border border-0 rounded-5">
            List Your Materials
          </button>
          <button className="btn-secondary px-3 p-2 border border-0 rounded-5">
            Find Recycled Plastics
          </button>
        </div>
        <div className="trust-badges">
          <span className="mx-2">✓ Verified Suppliers</span>
          <span className="mx-2">✓ Quality Guaranteed</span>
          <span className="mx-2">✓ Sustainable Partners</span>
        </div>
      </div>
      <div className="hero-image" >
        <div className="ai-chip">
          <span className="ai-icon">⚡</span> Smart Matching Algorithm
        </div>
      </div>
    </div>
  </section>
);

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: "all", name: "All Plastics" },
    { id: "pet", name: "PET" },
    { id: "hdpe", name: "HDPE" },
    { id: "ldpe", name: "LDPE" },
    { id: "pvc", name: "PVC" },
    { id: "pe", name: "PE" },
  ];

  return (
    <div className="category-filter">
      <h3 className="filter-title">Filter by Material Type:</h3>
      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${
              activeCategory === cat.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const StatsBar = ({ listings }) => (
  <div className="stats-bar">
    <div className="stat-item">
      <div className="stat-value">{listings.length}</div>
      <div className="stat-label">Active Listings</div>
    </div>
    <div className="stat-item">
      <div className="stat-value">24h</div>
      <div className="stat-label">Avg. Response</div>
    </div>
    <div className="stat-item">
      <div className="stat-value">98%</div>
      <div className="stat-label">Verified</div>
    </div>
    <div className="stat-item highlight">
      <div className="stat-value">AI</div>
      <div className="stat-label">Optimized Pricing</div>
    </div>
  </div>
);

const ListingsGrid = ({ listings }) => (
  <div className="listings-grid my-5">
    {listings.length > 0 ? (
      listings.map((listing) => <ListingCard key={listing.id} data={listing} />)
    ) : (
      <div className="no-results">
        <div className="no-results-icon">🔍</div>
        <h3>No listings in this category</h3>
        <p>Try adjusting your filters or check back later</p>
        <button className="btn-outline">Reset Filters</button>
      </div>
    )}
  </div>
);


const HowItWorks = () => (
  <section className="how-it-works">
    <div className="container">
      <h2 className="section-title">Our Circular Economy Process</h2>
      <p className="section-subtitle">
        How we're revolutionizing plastic recycling with technology
      </p>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Material Analysis</h3>
            <p>
              Our AI classifies your plastic waste and determines optimal
              pricing based on current market trends
            </p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Smart Matching</h3>
            <p>
              Advanced algorithms connect you with verified buyers who need your
              specific materials
            </p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Efficient Transactions</h3>
            <p>
              Secure payments and logistics coordination for seamless material
              exchange
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);



export default HomePage;
