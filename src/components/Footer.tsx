import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-icon">✦</span>
            <h3>TravelEase Palawan</h3>
            <p>Your ultimate guide to the Last Frontier of the Philippines. Experience nature like never before.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/destinations">Destinations</a></li>
              <li><a href="/hotels">Hotels</a></li>
              <li><a href="/flights">Flights</a></li>
              <li><a href="/feedback">Reviews</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Puerto Princesa, Palawan</p>
            <p>info@travelease.com</p>
            <p>+63 912 345 6789</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 TravelEase. Academic Capstone Project · Fullbright College</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
