import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';

interface Destination {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  location: string;
}

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Island', 'Beach', 'Diving', 'Cave', 'Lagoon', 'Wildlife', 'Cultural', 'Adventure'];

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('destinations')
      .select('*');
    
    if (data) setDestinations(data);
    setLoading(false);
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase()) || 
                          dest.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || dest.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  return (
    <section className="tab-section container animate-fade-in">
      <div className="section-header-flex">
        <div>
          <p className="section-eyebrow">Explore</p>
          <h2 className="section-title">Palawan Destinations</h2>
        </div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search destinations..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-chips">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}s
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center">Loading destinations...</div>
      ) : (
        <div className="destinations-grid">
          {filteredDestinations.map(dest => (
            <div key={dest.id} className="destination-card glass">
              <div className="dest-image">
                <img src={dest.image_url} alt={dest.name} />
                <span className="dest-category">{dest.category}</span>
              </div>
              <div className="dest-info">
                <h3>{dest.name}</h3>
                <p className="dest-location">📍 {dest.location}</p>
                <p className="dest-desc">{dest.description}</p>
                <button className="btn-text" onClick={() => setSelectedDest(dest)}>View Details →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Destination Detail Modal */}
      {selectedDest && (
        <div className="modal-overlay" onClick={() => setSelectedDest(null)}>
          <div className="modal-card glass animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedDest(null)}>×</button>
            <img src={selectedDest.image_url} alt={selectedDest.name} className="modal-image" />
            <div className="modal-body">
              <span className="dest-category-badge">{selectedDest.category}</span>
              <h2>{selectedDest.name}</h2>
              <p className="modal-location">📍 {selectedDest.location}</p>
              <div className="modal-divider"></div>
              <p className="modal-desc-full">{selectedDest.description}</p>
              <button className="btn-primary full-width" onClick={() => setSelectedDest(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Destinations;
