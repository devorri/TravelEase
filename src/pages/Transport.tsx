import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';

interface Transport {
  id: string;
  type: string;
  route: string;
  fare: number;
  description: string;
}

const Transport: React.FC = () => {
  const [transport, setTransport] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransport();
  }, []);

  const fetchTransport = async () => {
    const { data } = await supabase.from('transportation').select('*');
    if (data) setTransport(data);
    setLoading(false);
  };

  return (
    <section className="tab-section container animate-fade-in">
      <div className="section-header">
        <p className="section-eyebrow">Getting Around</p>
        <h2 className="section-title">Transportation Fares in Palawan</h2>
        <p>Reliable fare information for local and inter-city travel.</p>
      </div>

      {loading ? (
        <div className="text-center">Loading transportation info...</div>
      ) : (
        <div className="transport-grid">
          {transport.map(item => (
            <div key={item.id} className="transport-card glass">
              <div className="transport-icon">
                {item.type.includes('Van') ? '🚐' : item.type.includes('Tricycle') ? '🛺' : '🚤'}
              </div>
              <div className="transport-content">
                <div className="transport-header">
                  <h3>{item.type}</h3>
                  <span className="fare">₱{item.fare.toLocaleString()}</span>
                </div>
                <p className="route"><strong>Route:</strong> {item.route}</p>
                <p className="desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Transport;
