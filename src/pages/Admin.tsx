import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { useAuth } from '../context/AuthContext.tsx';

const Admin: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'dashboard' | 'destinations' | 'hotels' | 'flights' | 'transportation' | 'bookings' | 'feedback'>('dashboard');
  const [data, setData] = useState<any[]>([]);
  const [counts, setCounts] = useState({
    destinations: 0,
    hotels: 0,
    flights: 0,
    transportation: 0,
    bookings: 0,
    feedback: 0
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchCounts();
  }, []);

  useEffect(() => {
    if (activePanel !== 'dashboard') {
      fetchTableData();
    }
  }, [activePanel]);

  const fetchCounts = async () => {
    const [d, h, f, t, b, r] = await Promise.all([
      supabase.from('destinations').select('*', { count: 'exact', head: true }),
      supabase.from('hotels').select('*', { count: 'exact', head: true }),
      supabase.from('flights').select('*', { count: 'exact', head: true }),
      supabase.from('transportation').select('*', { count: 'exact', head: true }),
      supabase.from('bookings').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true })
    ]);

    setCounts({
      destinations: d.count || 0,
      hotels: h.count || 0,
      flights: f.count || 0,
      transportation: t.count || 0,
      bookings: b.count || 0,
      feedback: r.count || 0
    });
  };

  const fetchTableData = async () => {
    setLoading(true);
    const table = activePanel === 'feedback' ? 'reviews' : activePanel;
    const { data } = await supabase.from(table).select('*');
    if (data) setData(data);
    setLoading(false);
  };

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to the bucket matching the active panel name
      const { error: uploadError, data } = await supabase.storage
        .from(activePanel)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(activePanel)
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const table = activePanel === 'feedback' ? 'reviews' : activePanel;
    const { id, ...payload } = formData;
    
    if (activePanel === 'hotels' && typeof payload.amenities === 'string') {
      payload.amenities = payload.amenities.split(',').map((s: string) => s.trim());
    }

    if (id) {
      await supabase.from(table).update(payload).eq('id', id);
    } else {
      await supabase.from(table).insert([payload]);
    }
    setShowModal(false);
    fetchTableData();
    fetchCounts();
  };

  const handleDelete = async (id: string) => {
    const table = activePanel === 'feedback' ? 'reviews' : activePanel;
    if (window.confirm('Are you sure you want to delete this record?')) {
      await supabase.from(table).delete().eq('id', id);
      fetchTableData();
      fetchCounts();
    }
  };

  const openModal = (item: any = {}) => {
    setFormData(item);
    setShowModal(true);
  };

  return (
    <div className="admin-layout animate-fade-in">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">✦</span>
          <div>
            <div className="brand-name">TravelEase</div>
            <div className="brand-sub">Admin Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Overview</div>
          <button className={`sidebar-link ${activePanel === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePanel('dashboard')}>
            <span className="nav-icon">◈</span> Dashboard
          </button>

          <div className="nav-section-label">Manage</div>
          <button className={`sidebar-link ${activePanel === 'destinations' ? 'active' : ''}`} onClick={() => setActivePanel('destinations')}>
            <span className="nav-icon">🏝</span> Destinations
          </button>
          <button className={`sidebar-link ${activePanel === 'hotels' ? 'active' : ''}`} onClick={() => setActivePanel('hotels')}>
            <span className="nav-icon">🏨</span> Hotels
          </button>
          <button className={`sidebar-link ${activePanel === 'flights' ? 'active' : ''}`} onClick={() => setActivePanel('flights')}>
            <span className="nav-icon">✈</span> Flights
          </button>
          <button className={`sidebar-link ${activePanel === 'transportation' ? 'active' : ''}`} onClick={() => setActivePanel('transportation')}>
            <span className="nav-icon">🚐</span> Transport
          </button>

          <div className="nav-section-label">Records</div>
          <button className={`sidebar-link ${activePanel === 'bookings' ? 'active' : ''}`} onClick={() => setActivePanel('bookings')}>
            <span className="nav-icon">📋</span> Bookings
          </button>
          <button className={`sidebar-link ${activePanel === 'feedback' ? 'active' : ''}`} onClick={() => setActivePanel('feedback')}>
            <span className="nav-icon">💬</span> Feedback
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn-admin" onClick={logout}>
            <span>⏻</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        <header className="topbar">
          <div className="page-breadcrumb">
            <span className="breadcrumb-root">TravelEase</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-stat"><span className="ts-dot green"></span> System Online</div>
          </div>
        </header>

        <main className="content-area">
          {activePanel === 'dashboard' ? (
            <div className="panel animate-fade-in">
              <div className="panel-header">
                <div>
                  <p className="panel-eyebrow">Overview</p>
                  <h2 className="panel-title">System Dashboard</h2>
                </div>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-icon teal">🏝</div>
                  <div className="kpi-info">
                    <div className="kpi-label">Destinations</div>
                    <div className="kpi-value">{counts.destinations}</div>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-icon gold">🏨</div>
                  <div className="kpi-info">
                    <div className="kpi-label">Hotels</div>
                    <div className="kpi-value">{counts.hotels}</div>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-icon dark">✈</div>
                  <div className="kpi-info">
                    <div className="kpi-label">Flights</div>
                    <div className="kpi-value">{counts.flights}</div>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-icon teal">📋</div>
                  <div className="kpi-info">
                    <div className="kpi-label">Bookings</div>
                    <div className="kpi-value">{counts.bookings}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="panel animate-fade-in">
              <div className="admin-header">
                <div>
                  <p className="panel-eyebrow">Manage</p>
                  <h2 className="panel-title">{activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}</h2>
                </div>
                {activePanel !== 'bookings' && activePanel !== 'feedback' && (
                  <button className="btn-add" onClick={() => openModal()}>+ Add New</button>
                )}
              </div>

              <div className="admin-table-container">
                {loading ? <p>Loading records...</p> : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Preview</th>
                        <th>Identifier</th>
                        <th>Details</th>
                        <th>Info</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(item => (
                        <tr key={item.id}>
                          <td>
                            {item.image_url ? (
                              <img src={item.image_url} alt="" className="admin-thumb" />
                            ) : (
                              <div className="admin-thumb-placeholder">No Image</div>
                            )}
                          </td>
                          <td>{item.name || item.airline || item.type || item.user_name || item.id.slice(0,8)}</td>
                          <td>{item.location || item.address || item.route || item.comment || 'N/A'}</td>
                          <td>{item.price || item.fare || item.rating || item.status || '-'}</td>
                          <td>
                            <div className="tbl-actions">
                              <button className="btn-edit" onClick={() => openModal(item)}>Edit</button>
                              <button className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Shared Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">{formData.id ? 'Edit' : 'Add New'} {activePanel}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSave} className="modal-body modal-form">
              <div className="form-row full">
                <div className="form-group">
                  <label>Name / Label</label>
                  <input 
                    type="text" 
                    value={formData.name || formData.airline || formData.type || ''} 
                    onChange={e => setFormData({...formData, [activePanel === 'flights' ? 'airline' : activePanel === 'transportation' ? 'type' : 'name']: e.target.value})}
                    required 
                  />
                </div>
              </div>
              <div className="form-row full">
                <div className="form-group">
                  <label>Cover Image</label>
                  <div className="upload-wrapper">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    {uploading && <span className="upload-status">Uploading...</span>}
                    {formData.image_url && (
                      <img src={formData.image_url} alt="Preview" className="upload-preview" />
                    )}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location / Route</label>
                  <input 
                    type="text" 
                    value={formData.location || formData.address || formData.route || ''} 
                    onChange={e => setFormData({...formData, [activePanel === 'destinations' ? 'location' : activePanel === 'hotels' ? 'address' : 'route']: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Price / Fare</label>
                  <input 
                    type="number" 
                    value={formData.price || formData.price_per_night || formData.fare || ''} 
                    onChange={e => setFormData({...formData, [activePanel === 'hotels' ? 'price_per_night' : activePanel === 'flights' ? 'price' : 'fare']: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row full">
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    rows={3}
                    value={formData.description || ''} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-modal-save">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
