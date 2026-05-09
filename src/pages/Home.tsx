import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container animate-fade-in">
          <p className="hero-eyebrow">The Last Frontier of the Philippines</p>
          <h1 className="hero-title">Discover <em>Palawan</em></h1>
          <p className="hero-desc">
            Crystal waters, hidden lagoons, and world-class adventure await. 
            Your complete travel companion for Palawan's most remarkable destinations.
          </p>
          <div className="hero-actions">
            <Link to="/destinations" className="btn-primary">Explore Destinations</Link>
            <Link to="/hotels" className="btn-ghost">Find Hotels</Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>100+</strong><span>Destinations</span></div>
            <div className="stat-divider"></div>
            <div className="stat"><strong>50+</strong><span>Hotels</span></div>
            <div className="stat-divider"></div>
            <div className="stat"><strong>12+</strong><span>Airlines</span></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="section-header text-center">
          <p className="section-eyebrow">Why Choose TravelEase</p>
          <h2 className="section-title">Everything you need in one place</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon">🏨</div>
            <h3>Hotel Bookings</h3>
            <p>Access hundreds of verified accommodations from luxury resorts to cozy homestays.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">✈️</div>
            <h3>Flight Schedules</h3>
            <p>Real-time airline information and fare comparison for all Palawan airports.</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">📍</div>
            <h3>Local Insights</h3>
            <p>Detailed information on destinations, hidden gems, and local transportation.</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="home-map container">
        <div className="map-widget glass">
          <div className="map-widget-content">
            <p className="section-eyebrow">Plan Your Route</p>
            <h2 className="section-title">Explore Palawan Interactively</h2>
            <p>
              Get a bird's eye view of the islands. Our interactive map helps you locate the best 
              resorts, airports, and hidden gems across the province.
            </p>
            <Link to="/map" className="btn-primary">Open Interactive Map</Link>
          </div>
          <div className="map-widget-preview">
            <img src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800" alt="Map Preview" />
            <div className="preview-overlay">
              <span>📍 El Nido</span>
              <span>📍 Coron</span>
              <span>📍 Port Barton</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section container">
        <div className="cta-card glass-dark">
          <h2>Ready to start your journey?</h2>
          <p>Join thousands of travelers who have discovered the magic of Palawan with TravelEase.</p>
          <Link to="/login" className="btn-primary">Get Started Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
