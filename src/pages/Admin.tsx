import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { useAuth } from '../context/AuthContext.tsx';

type PanelType = 'dashboard' | 'destinations' | 'hotels' | 'flights' | 'transportation' | 'hotel-bookings' | 'flight-bookings' | 'feedback';

const Admin: React.FC = () => {
  const [activePanel, setActivePanel] = useState<PanelType>('dashboard');
  const [data, setData] = useState<any[]>([]);
  const [counts, setCounts] = useState({
    destinations: 0, hotels: 0, flights: 0, transportation: 0, hotelBookings: 0, flightBookings: 0, feedback: 0
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const { logout } = useAuth();

  // Room management state
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomHotel, setRoomHotel] = useState<any>(null);
  const [hotelRooms, setHotelRooms] = useState<any[]>([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [newRoom, setNewRoom] = useState({ room_number: '', building: 'Building A', room_type: 'standard', max_guests: 2 });
  const [bulkCount, setBulkCount] = useState(10);

  useEffect(() => { fetchCounts(); }, []);
  useEffect(() => { if (activePanel !== 'dashboard') fetchTableData(); }, [activePanel]);

  const isBookingPanel = activePanel === 'hotel-bookings' || activePanel === 'flight-bookings';

  const fetchCounts = async () => {
    const [d, h, f, t, bh, bf, r] = await Promise.all([
      supabase.from('destinations').select('*', { count: 'exact', head: true }),
      supabase.from('hotels').select('*', { count: 'exact', head: true }),
      supabase.from('flights').select('*', { count: 'exact', head: true }),
      supabase.from('transportation').select('*', { count: 'exact', head: true }),
      supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('type', 'hotel'),
      supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('type', 'flight'),
      supabase.from('reviews').select('*', { count: 'exact', head: true })
    ]);
    setCounts({
      destinations: d.count || 0, hotels: h.count || 0, flights: f.count || 0,
      transportation: t.count || 0, hotelBookings: bh.count || 0, flightBookings: bf.count || 0, feedback: r.count || 0
    });
  };

  const fetchTableData = async () => {
    setLoading(true);
    if (activePanel === 'hotel-bookings') {
      const { data: result } = await supabase.from('bookings').select('*').eq('type', 'hotel').order('created_at', { ascending: false });
      if (result) setData(result);
    } else if (activePanel === 'flight-bookings') {
      const { data: result } = await supabase.from('bookings').select('*').eq('type', 'flight').order('created_at', { ascending: false });
      if (result) setData(result);
    } else {
      const table = activePanel === 'feedback' ? 'reviews' : activePanel;
      const { data: result } = await supabase.from(table).select('*').order('created_at', { ascending: false });
      if (result) setData(result);
    }
    setLoading(false);
  };

  /* ── Image Upload (multiple) ── */
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const currentImages: string[] = formData.images || [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from(activePanel).upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from(activePanel).getPublicUrl(fileName);
        currentImages.push(publicUrl);
      }
      // First image is always the cover
      setFormData({ ...formData, images: currentImages, image_url: currentImages[0] });
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    const imgs = [...(formData.images || [])];
    imgs.splice(idx, 1);
    setFormData({ ...formData, images: imgs, image_url: imgs[0] || '' });
  };

  /* ── Save ── */
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

  /* ── Room Management ── */
  const openRoomManager = async (hotel: any) => {
    setRoomHotel(hotel);
    setShowRoomModal(true);
    setNewRoom({ room_number: '', building: 'Building A', room_type: 'standard', max_guests: 2 });
    await fetchRooms(hotel.id);
  };

  const fetchRooms = async (hotelId: string) => {
    setRoomsLoading(true);
    const { data } = await supabase.from('hotel_rooms').select('*').eq('hotel_id', hotelId).order('room_number', { ascending: true });
    if (data) setHotelRooms(data);
    setRoomsLoading(false);
  };

  const addRoom = async () => {
    if (!newRoom.room_number.trim()) return alert('Please enter a room number');
    if (!roomHotel) return;
    const { error } = await supabase.from('hotel_rooms').insert([{
      hotel_id: roomHotel.id,
      room_number: newRoom.room_number.trim(),
      building: newRoom.building,
      room_type: newRoom.room_type,
      max_guests: newRoom.max_guests,
      status: 'available'
    }]);
    if (error) {
      alert(error.message.includes('unique') ? 'Room number already exists for this hotel.' : error.message);
    } else {
      setNewRoom({ ...newRoom, room_number: '' });
      fetchRooms(roomHotel.id);
    }
  };

  const addBulkRooms = async () => {
    if (!roomHotel) return;
    const building = newRoom.building;
    const prefix = building === 'Building A' ? '1' : building === 'Building B' ? '2' : '3';
    const type = building === 'Building A' ? 'standard' : building === 'Building B' ? 'deluxe' : 'suite';
    const maxG = building === 'Building A' ? 2 : building === 'Building B' ? 4 : 6;
    const rooms = Array.from({ length: bulkCount }, (_, i) => ({
      hotel_id: roomHotel.id,
      room_number: `${prefix}${String(i + 1).padStart(2, '0')}`,
      building,
      room_type: type,
      max_guests: maxG,
      status: 'available'
    }));
    const { error } = await supabase.from('hotel_rooms').insert(rooms);
    if (error) {
      alert('Some rooms may already exist: ' + error.message);
    }
    fetchRooms(roomHotel.id);
  };

  const deleteRoom = async (roomId: string) => {
    if (!window.confirm('Delete this room?')) return;
    const { error } = await supabase.from('hotel_rooms').delete().eq('id', roomId);
    if (error) {
      alert('Cannot delete: ' + error.message);
    } else {
      fetchRooms(roomHotel.id);
    }
  };

  const openModal = (item: any = {}) => {
    // Ensure images array exists
    const images = item.images || (item.image_url ? [item.image_url] : []);
    setFormData({ ...item, images });
    setShowModal(true);
  };

  /* ── Panel-specific form fields ── */
  const renderFormFields = () => {
    switch (activePanel) {
      case 'destinations':
        return (
          <>
            <div className="form-row full"><div className="form-group">
              <label>Destination Name</label>
              <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div></div>
            <div className="form-row"><div className="form-group">
              <label>Location</label>
              <input type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
            </div><div className="form-group">
              <label>Category</label>
              <select value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="">Select</option>
                {['Island','Beach','Diving','Cave','Lagoon','Wildlife','Cultural','Adventure'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div></div>
            <div className="form-row full"><div className="form-group">
              <label>Description</label>
              <textarea rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div></div>
          </>
        );
      case 'hotels':
        return (
          <>
            <div className="form-row full"><div className="form-group">
              <label>Hotel Name</label>
              <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div></div>
            <div className="form-row"><div className="form-group">
              <label>Address</label>
              <input type="text" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div><div className="form-group">
              <label>Area</label>
              <input type="text" value={formData.area || ''} onChange={e => setFormData({...formData, area: e.target.value})} placeholder="e.g. El Nido" />
            </div></div>
            <div className="form-row"><div className="form-group">
              <label>Price Per Night (₱)</label>
              <input type="number" value={formData.price_per_night || ''} onChange={e => setFormData({...formData, price_per_night: e.target.value})} />
            </div><div className="form-group">
              <label>Stars</label>
              <select value={formData.stars || 3} onChange={e => setFormData({...formData, stars: parseInt(e.target.value)})}>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
              </select>
            </div></div>
            <div className="form-row full"><div className="form-group">
              <label>Amenities (comma-separated)</label>
              <input type="text" value={Array.isArray(formData.amenities) ? formData.amenities.join(', ') : (formData.amenities || '')} onChange={e => setFormData({...formData, amenities: e.target.value})} placeholder="WiFi, Pool, Spa" />
            </div></div>
            <div className="form-row full"><div className="form-group">
              <label>Description</label>
              <textarea rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div></div>
          </>
        );
      case 'flights':
        return (
          <>
            <div className="form-row"><div className="form-group">
              <label>Airline</label>
              <input type="text" value={formData.airline || ''} onChange={e => setFormData({...formData, airline: e.target.value})} required />
            </div><div className="form-group">
              <label>Flight Number</label>
              <input type="text" value={formData.flight_number || ''} onChange={e => setFormData({...formData, flight_number: e.target.value})} placeholder="TE-101" />
            </div></div>
            <div className="form-row"><div className="form-group">
              <label>Origin</label>
              <input type="text" value={formData.origin || ''} onChange={e => setFormData({...formData, origin: e.target.value})} />
            </div><div className="form-group">
              <label>Destination</label>
              <input type="text" value={formData.destination || ''} onChange={e => setFormData({...formData, destination: e.target.value})} />
            </div></div>
            <div className="form-row"><div className="form-group">
              <label>Departure Time</label>
              <input type="text" value={formData.departure_time || ''} onChange={e => setFormData({...formData, departure_time: e.target.value})} placeholder="08:00" />
            </div><div className="form-group">
              <label>Arrival Time</label>
              <input type="text" value={formData.arrival_time || ''} onChange={e => setFormData({...formData, arrival_time: e.target.value})} placeholder="09:15" />
            </div></div>
            <div className="form-row"><div className="form-group">
              <label>Base Price (₱)</label>
              <input type="number" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div><div className="form-group">
              <label>Duration (min)</label>
              <input type="number" value={formData.duration_minutes || ''} onChange={e => setFormData({...formData, duration_minutes: e.target.value})} />
            </div></div>
          </>
        );
      case 'transportation':
        return (
          <>
            <div className="form-row full"><div className="form-group">
              <label>Transport Type</label>
              <input type="text" value={formData.type || ''} onChange={e => setFormData({...formData, type: e.target.value})} required placeholder="e.g. Van, Tricycle" />
            </div></div>
            <div className="form-row"><div className="form-group">
              <label>Route</label>
              <input type="text" value={formData.route || ''} onChange={e => setFormData({...formData, route: e.target.value})} />
            </div><div className="form-group">
              <label>Fare (₱)</label>
              <input type="number" value={formData.fare || ''} onChange={e => setFormData({...formData, fare: e.target.value})} />
            </div></div>
            <div className="form-row full"><div className="form-group">
              <label>Description</label>
              <textarea rows={3} value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div></div>
          </>
        );
      default: return null;
    }
  };

  /* ── Table columns per panel ── */
  const getTableHeaders = () => {
    switch (activePanel) {
      case 'destinations': return ['Image', 'Name', 'Location', 'Category', 'Actions'];
      case 'hotels': return ['Image', 'Name', 'Area', 'Price/Night', 'Stars', 'Rooms', 'Actions'];
      case 'flights': return ['Airline', 'Flight #', 'Route', 'Price', 'Actions'];
      case 'transportation': return ['Image', 'Type', 'Route', 'Fare', 'Actions'];
      case 'feedback': return ['User', 'Rating', 'Comment', 'Date', 'Actions'];
      default: return [];
    }
  };

  const renderTableRow = (item: any) => {
    switch (activePanel) {
      case 'destinations':
        return (<>
          <td>{item.image_url ? <img src={item.image_url} alt="" className="admin-thumb" /> : <div className="admin-thumb-placeholder">No Image</div>}</td>
          <td className="td-bold">{item.name}</td>
          <td>{item.location || 'N/A'}</td>
          <td><span className="cell-badge">{item.category}</span></td>
        </>);
      case 'hotels':
        return (<>
          <td>{item.image_url ? <img src={item.image_url} alt="" className="admin-thumb" /> : <div className="admin-thumb-placeholder">No Image</div>}</td>
          <td className="td-bold">{item.name}</td>
          <td>{item.area || 'N/A'}</td>
          <td>₱{Number(item.price_per_night || 0).toLocaleString()}</td>
          <td><span style={{color:'#fbbf24'}}>{'★'.repeat(item.stars || 0)}</span></td>
          <td><button className="btn-rooms" onClick={() => openRoomManager(item)}>🚪 Manage</button></td>
        </>);
      case 'flights':
        return (<>
          <td className="td-bold">{item.airline}</td>
          <td>{item.flight_number || '—'}</td>
          <td>{item.origin} → {item.destination}</td>
          <td>₱{Number(item.price || 0).toLocaleString()}</td>
        </>);
      case 'transportation':
        return (<>
          <td>{item.image_url ? <img src={item.image_url} alt="" className="admin-thumb" /> : <div className="admin-thumb-placeholder">No Image</div>}</td>
          <td className="td-bold">{item.type}</td>
          <td>{item.route || 'N/A'}</td>
          <td>₱{Number(item.fare || 0).toLocaleString()}</td>
        </>);
      case 'feedback':
        return (<>
          <td className="td-bold">{item.user_name || 'Anonymous'}</td>
          <td><span style={{color:'#fbbf24'}}>{'★'.repeat(item.rating || 0)}</span></td>
          <td style={{maxWidth:'300px'}}>{item.comment?.slice(0,80)}{item.comment?.length > 80 ? '...' : ''}</td>
          <td>{item.created_at ? new Date(item.created_at).toLocaleDateString() : '—'}</td>
        </>);
      default: return null;
    }
  };

  /* ── Hotel Bookings Panel ── */
  const renderHotelBookingsPanel = () => (
    <div className="panel animate-fade-in">
      <div className="admin-header">
        <div>
          <p className="panel-eyebrow">Records</p>
          <h2 className="panel-title">🏨 Hotel Bookings</h2>
        </div>
      </div>
      {loading ? <p>Loading hotel bookings...</p> : data.length === 0 ? (
        <div className="admin-empty-state">
          <span>🏨</span>
          <h3>No hotel bookings yet</h3>
          <p>When travelers reserve hotel rooms, they'll appear here.</p>
        </div>
      ) : (
        <div className="admin-bookings-list">
          {data.map(booking => {
            const d = booking.details || {};
            const isExpanded = expandedBookingId === booking.id;
            return (
              <div key={booking.id} className={`admin-booking-card ${booking.status === 'cancelled' ? 'cancelled' : ''}`}>
                <div className="ab-top">
                  <div className="ab-type">🏨 Hotel</div>
                  <div className={`ab-status ${booking.status || 'confirmed'}`}>{(booking.status || 'confirmed').toUpperCase()}</div>
                </div>
                <div className="ab-body">
                  <div className="ab-main">
                    <h3>{d.hotel_name || 'Hotel Booking'}</h3>
                    <div className="ab-ref">Ref: <strong>{booking.booking_reference || d.booking_reference || 'N/A'}</strong></div>
                  </div>
                  <div className="ab-grid">
                    <div className="ab-cell"><label>Room</label><span>{d.room_type || 'Standard'} — #{d.room_number || 'N/A'}</span></div>
                    <div className="ab-cell"><label>Check-in</label><span>{d.check_in || '—'}</span></div>
                    <div className="ab-cell"><label>Check-out</label><span>{d.check_out || '—'}</span></div>
                    <div className="ab-cell"><label>Guests</label><span>{d.pax || 1}</span></div>
                    <div className="ab-cell"><label>Amount</label><span className="ab-amount">₱{(d.total_amount || d.price || 0).toLocaleString()}</span></div>
                  </div>
                  {isExpanded && (
                    <div className="ab-expanded">
                      <hr />
                      <div className="ab-detail-grid">
                        <div><label>Hotel</label><span>{d.hotel_name}</span></div>
                        <div><label>Room Type</label><span>{d.room_type || d.building || 'N/A'}</span></div>
                        <div><label>Room #</label><span>{d.room_number}</span></div>
                        <div><label>Max Guests</label><span>{d.max_guests || '—'}</span></div>
                        <div><label>Check-in</label><span>{d.check_in}</span></div>
                        <div><label>Check-out</label><span>{d.check_out}</span></div>
                        <div><label>Guests</label><span>{d.pax}</span></div>
                        <div><label>Price/Night</label><span>₱{(d.price || 0).toLocaleString()}</span></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="ab-footer">
                  <button className="btn-text" onClick={() => setExpandedBookingId(isExpanded ? null : booking.id)}>
                    {isExpanded ? 'Show Less' : 'View Full Details'}
                  </button>
                  <span className="ab-date">Booked: {booking.created_at ? new Date(booking.created_at).toLocaleDateString() : '—'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  /* ── Flight Bookings Panel ── */
  const renderFlightBookingsPanel = () => (
    <div className="panel animate-fade-in">
      <div className="admin-header">
        <div>
          <p className="panel-eyebrow">Records</p>
          <h2 className="panel-title">✈️ Flight Bookings</h2>
        </div>
      </div>
      {loading ? <p>Loading flight bookings...</p> : data.length === 0 ? (
        <div className="admin-empty-state">
          <span>✈️</span>
          <h3>No flight bookings yet</h3>
          <p>When travelers book flights, they'll appear here.</p>
        </div>
      ) : (
        <div className="admin-bookings-list">
          {data.map(booking => {
            const d = booking.details || {};
            const isExpanded = expandedBookingId === booking.id;
            return (
              <div key={booking.id} className={`admin-booking-card ${booking.status === 'cancelled' ? 'cancelled' : ''}`}>
                <div className="ab-top">
                  <div className="ab-type">✈️ Flight</div>
                  <div className={`ab-status ${booking.status || 'confirmed'}`}>{(booking.status || 'confirmed').toUpperCase()}</div>
                </div>
                <div className="ab-body">
                  <div className="ab-main">
                    <h3>{d.origin || ''} → {d.destination || ''}</h3>
                    <div className="ab-ref">Ref: <strong>{booking.booking_reference || d.booking_reference || 'N/A'}</strong></div>
                  </div>
                  <div className="ab-grid">
                    <div className="ab-cell"><label>Passenger</label><span>{d.passengers?.[0] ? `${d.passengers[0].firstName} ${d.passengers[0].lastName}` : 'N/A'}</span></div>
                    <div className="ab-cell"><label>Flight</label><span>{d.flight_number || '—'}</span></div>
                    <div className="ab-cell"><label>Fare</label><span>{d.fare_type || 'Basic'}</span></div>
                    <div className="ab-cell"><label>Travel Date</label><span>{d.travel_date || '—'}</span></div>
                    <div className="ab-cell"><label>Amount</label><span className="ab-amount">₱{(d.total_amount || 0).toLocaleString()}</span></div>
                  </div>
                  {isExpanded && (
                    <div className="ab-expanded">
                      <hr />
                      <div className="ab-detail-grid">
                        <div><label>Airline</label><span>{d.airline}</span></div>
                        <div><label>Flight #</label><span>{d.flight_number}</span></div>
                        <div><label>Route</label><span>{d.origin} → {d.destination}</span></div>
                        <div><label>Departure</label><span>{d.departure_time}</span></div>
                        <div><label>Arrival</label><span>{d.arrival_time}</span></div>
                        <div><label>Fare Type</label><span>{d.fare_type}</span></div>
                        <div><label>Base Fare</label><span>₱{(d.base_fare || 0).toLocaleString()}</span></div>
                        <div><label>Passengers</label><span>{d.pax}</span></div>
                        <div><label>Seat</label><span>{d.seat_number || 'Auto'}</span></div>
                        <div><label>Baggage</label><span>{d.baggage_kg}kg (+₱{(d.baggage_fee || 0).toLocaleString()})</span></div>
                        <div><label>Meal</label><span>{d.meal_selection || 'None'} (+₱{(d.meal_fee || 0).toLocaleString()})</span></div>
                        <div><label>Insurance</label><span>{d.insurance ? `Yes (+₱${(d.insurance_fee || 0).toLocaleString()})` : 'No'}</span></div>
                      </div>
                      {d.passengers && d.passengers.length > 0 && (
                        <div className="ab-passengers">
                          <label>Passenger List</label>
                          {d.passengers.map((p: any, i: number) => (
                            <div key={i} className="ab-pax-row">{p.title} {p.firstName} {p.lastName} {p.nationality ? `(${p.nationality})` : ''}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="ab-footer">
                  <button className="btn-text" onClick={() => setExpandedBookingId(isExpanded ? null : booking.id)}>
                    {isExpanded ? 'Show Less' : 'View Full Details'}
                  </button>
                  <span className="ab-date">Booked: {booking.created_at ? new Date(booking.created_at).toLocaleDateString() : '—'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="admin-layout animate-fade-in">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-icon">✦</span>
          <div>
            <div className="brand-name">TravelEase</div>
            <div className="brand-sub">Admin Portal</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Overview</div>
          <button className={`sidebar-link ${activePanel === 'dashboard' ? 'active' : ''}`} onClick={() => { setActivePanel('dashboard'); setSidebarOpen(false); }}>
            <span className="nav-icon">◈</span> Dashboard
          </button>
          <div className="nav-section-label">Manage</div>
          {(['destinations','hotels','flights','transportation'] as PanelType[]).map(p => (
            <button key={p} className={`sidebar-link ${activePanel === p ? 'active' : ''}`} onClick={() => { setActivePanel(p); setSidebarOpen(false); }}>
              <span className="nav-icon">{p === 'destinations' ? '🏝' : p === 'hotels' ? '🏨' : p === 'flights' ? '✈' : '🚐'}</span> {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <div className="nav-section-label">Bookings</div>
          <button className={`sidebar-link ${activePanel === 'hotel-bookings' ? 'active' : ''}`} onClick={() => { setActivePanel('hotel-bookings'); setSidebarOpen(false); }}>
            <span className="nav-icon">🏨</span> Hotel Bookings
            {counts.hotelBookings > 0 && <span className="nav-badge">{counts.hotelBookings}</span>}
          </button>
          <button className={`sidebar-link ${activePanel === 'flight-bookings' ? 'active' : ''}`} onClick={() => { setActivePanel('flight-bookings'); setSidebarOpen(false); }}>
            <span className="nav-icon">✈️</span> Flight Bookings
            {counts.flightBookings > 0 && <span className="nav-badge">{counts.flightBookings}</span>}
          </button>
          <div className="nav-section-label">Records</div>
          <button className={`sidebar-link ${activePanel === 'feedback' ? 'active' : ''}`} onClick={() => { setActivePanel('feedback'); setSidebarOpen(false); }}>
            <span className="nav-icon">💬</span> Feedback
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn-admin" onClick={logout}><span>⏻</span> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-wrapper">
        <header className="topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span /><span /><span />
            </button>
            <div className="page-breadcrumb">
              <span className="breadcrumb-root">TravelEase</span>
              <span className="breadcrumb-sep">›</span>
              <span className="breadcrumb-current">{activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}</span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-stat"><span className="ts-dot green"></span> System Online</div>
          </div>
        </header>

        <main className="content-area">
          {activePanel === 'dashboard' ? (
            <div className="panel animate-fade-in">
              <div className="panel-header"><div>
                <p className="panel-eyebrow">Overview</p>
                <h2 className="panel-title">System Dashboard</h2>
              </div></div>
              <div className="kpi-grid">
                {[
                  { icon: '🏝', label: 'Destinations', value: counts.destinations, color: 'teal' },
                  { icon: '🏨', label: 'Hotels', value: counts.hotels, color: 'gold' },
                  { icon: '✈', label: 'Flights', value: counts.flights, color: 'dark' },
                  { icon: '🏨', label: 'Hotel Bookings', value: counts.hotelBookings, color: 'gold' },
                  { icon: '✈️', label: 'Flight Bookings', value: counts.flightBookings, color: 'teal' },
                ].map(k => (
                  <div key={k.label} className="kpi-card">
                    <div className={`kpi-icon ${k.color}`}>{k.icon}</div>
                    <div className="kpi-info">
                      <div className="kpi-label">{k.label}</div>
                      <div className="kpi-value">{k.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activePanel === 'hotel-bookings' ? renderHotelBookingsPanel() : activePanel === 'flight-bookings' ? renderFlightBookingsPanel() : (
            <div className="panel animate-fade-in">
              <div className="admin-header">
                <div>
                  <p className="panel-eyebrow">Manage</p>
                  <h2 className="panel-title">{activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}</h2>
                </div>
                {activePanel !== 'feedback' && (
                  <button className="btn-add" onClick={() => openModal()}>+ Add New</button>
                )}
              </div>
              <div className="admin-table-container">
                {loading ? <p>Loading records...</p> : (
                  <table className="admin-table">
                    <thead><tr>{getTableHeaders().map(h => <th key={h}>{h}</th>)}</tr></thead>
                    <tbody>
                      {data.map(item => (
                        <tr key={item.id}>
                          {renderTableRow(item)}
                          <td>
                            <div className="tbl-actions">
                              {activePanel !== 'feedback' && <button className="btn-edit" onClick={() => openModal(item)}>Edit</button>}
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

      {/* Modal — panel-specific fields */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3 className="modal-title">{formData.id ? 'Edit' : 'Add New'} {activePanel.slice(0, -1)}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSave} className="modal-body modal-form">
              {renderFormFields()}

              {/* Multi-image upload */}
              <div className="form-row full">
                <div className="form-group">
                  <label>Images (up to 6)</label>
                  <div className="upload-wrapper">
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading || (formData.images?.length || 0) >= 6} />
                    {uploading && <span className="upload-status">Uploading...</span>}
                  </div>
                  {formData.images && formData.images.length > 0 && (
                    <div className="upload-gallery">
                      {formData.images.map((url: string, idx: number) => (
                        <div key={idx} className="upload-gallery-item">
                          <img src={url} alt={`Image ${idx + 1}`} />
                          <button type="button" className="upload-remove" onClick={() => removeImage(idx)}>×</button>
                          {idx === 0 && <span className="upload-cover-badge">Cover</span>}
                        </div>
                      ))}
                    </div>
                  )}
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

      {/* Room Management Modal */}
      {showRoomModal && roomHotel && (
        <div className="modal-overlay">
          <div className="modal-box room-modal">
            <div className="modal-header">
              <h3 className="modal-title">🚪 Rooms — {roomHotel.name}</h3>
              <button className="modal-close" onClick={() => setShowRoomModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {/* Add single room */}
              <div className="room-add-section">
                <h4>Add Room</h4>
                <div className="room-add-row">
                  <input
                    type="text" placeholder="Room # (e.g. 101)"
                    value={newRoom.room_number}
                    onChange={e => setNewRoom({ ...newRoom, room_number: e.target.value })}
                  />
                  <select value={newRoom.building} onChange={e => {
                    const b = e.target.value;
                    setNewRoom({
                      ...newRoom,
                      building: b,
                      room_type: b === 'Building A' ? 'standard' : b === 'Building B' ? 'deluxe' : 'suite',
                      max_guests: b === 'Building A' ? 2 : b === 'Building B' ? 4 : 6
                    });
                  }}>
                    <option value="Building A">Building A (Standard)</option>
                    <option value="Building B">Building B (Deluxe)</option>
                    <option value="Building C">Building C (Suite)</option>
                  </select>
                  <button className="btn-modal-save" type="button" onClick={addRoom}>+ Add</button>
                </div>
              </div>

              {/* Bulk add rooms */}
              <div className="room-add-section">
                <h4>Quick Add (Bulk)</h4>
                <div className="room-add-row">
                  <select value={newRoom.building} onChange={e => setNewRoom({ ...newRoom, building: e.target.value })}>
                    <option value="Building A">Building A (Standard)</option>
                    <option value="Building B">Building B (Deluxe)</option>
                    <option value="Building C">Building C (Suite)</option>
                  </select>
                  <select value={bulkCount} onChange={e => setBulkCount(parseInt(e.target.value))}>
                    {[5, 10, 15, 20].map(n => <option key={n} value={n}>{n} rooms</option>)}
                  </select>
                  <button className="btn-modal-save" type="button" onClick={addBulkRooms}>Generate</button>
                </div>
              </div>

              {/* Room list */}
              <div className="room-list-section">
                <h4>Current Rooms ({hotelRooms.length})</h4>
                {roomsLoading ? <p>Loading rooms...</p> : hotelRooms.length === 0 ? (
                  <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>No rooms added yet. Use the form above to add rooms.</p>
                ) : (
                  <div className="room-type-groups">
                    {['Building A', 'Building B', 'Building C'].map(bld => {
                      const bldRooms = hotelRooms.filter(r => r.building === bld);
                      if (bldRooms.length === 0) return null;
                      const typeLabel = bld === 'Building A' ? '🛏️ Standard' : bld === 'Building B' ? '🛋️ Deluxe' : '👑 Suite';
                      return (
                        <div key={bld} className="room-group">
                          <div className="room-group-header">
                            <span>{typeLabel} — {bld}</span>
                            <span className="room-group-count">{bldRooms.length} rooms</span>
                          </div>
                          <div className="room-grid-admin">
                            {bldRooms.map(room => (
                              <div key={room.id} className={`room-chip ${room.status === 'available' ? '' : 'booked'}`}>
                                <span>{room.room_number}</span>
                                <button className="room-chip-delete" onClick={() => deleteRoom(room.id)} title="Delete room">×</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
