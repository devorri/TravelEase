import React from 'react';

const MapViewer: React.FC = () => {
  return (
    <div className="map-page">
      <section className="map-hero container">
        <div className="section-header text-center">
          <p className="section-eyebrow">Explore the Archipelago</p>
          <h1 className="section-title">Interactive <em>Palawan</em> Map</h1>
          <p className="section-desc">
            Discover the best of Palawan, from the hidden lagoons of El Nido to the shipwrecks of Coron. 
            Navigate through our curated locations.
          </p>
        </div>

        <div className="map-container glass">
          <iframe 
            title="Palawan Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4024193.583513414!2d119.10993360000002!3d9.9442285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b5bce750b99e45%3A0xdfc65f6c0c8d3beb!2sPalawan!5e0!3m2!1sen!2sph!4v1777782050627!5m2!1sen!2sph"
            width="100%" 
            height="600" 
            style={{ border: 0, borderRadius: '16px' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="map-overlay-info glass">
            <h3>Quick Destinations</h3>
            <ul className="map-dest-list">
              <li>
                <span className="dest-dot"></span>
                <div>
                  <strong>El Nido</strong>
                  <p>Lagoons & Limestone</p>
                </div>
              </li>
              <li>
                <span className="dest-dot"></span>
                <div>
                  <strong>Coron</strong>
                  <p>Diving & Lakes</p>
                </div>
              </li>
              <li>
                <span className="dest-dot"></span>
                <div>
                  <strong>Puerto Princesa</strong>
                  <p>Underground River</p>
                </div>
              </li>
              <li>
                <span className="dest-dot"></span>
                <div>
                  <strong>San Vicente</strong>
                  <p>Long Beach</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="map-info-cards container">
        <div className="map-grid">
          <div className="info-card glass">
            <div className="info-icon">🚢</div>
            <h4>Getting Around</h4>
            <p>Ferry services connect major islands like El Nido and Coron daily.</p>
          </div>
          <div className="info-card glass">
            <div className="info-icon">🛵</div>
            <h4>Local Transport</h4>
            <p>Tricycles and motorbike rentals are the most common ways to explore town centers.</p>
          </div>
          <div className="info-card glass">
            <div className="info-icon">🌤️</div>
            <h4>Best Time to Visit</h4>
            <p>Dry season (November to May) offers the clearest waters and best weather.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapViewer;
