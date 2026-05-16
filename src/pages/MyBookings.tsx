import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { Navigate, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext.tsx';

interface Booking {
  id: string;
  type: 'hotel' | 'flight';
  entity_id: string;
  status: string;
  booking_date: string;
  booking_reference: string;
  details: any;
  created_at: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<Booking | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'flight' | 'hotel'>('all');
  const { user } = useAuth();
  const { notify } = useNotification();

  useEffect(() => { if (user) fetchBookings(); }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('bookings').select('*').eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    if (data) setBookings(data);
    setLoading(false);
  };

  const handleCancel = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
    if (!error) {
      notify('success', 'Booking Cancelled', 'Your booking has been successfully cancelled.');
      fetchBookings();
    } else {
      notify('error', 'Cancellation Failed', error.message);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!user) return <Navigate to="/login" />;

  const filteredBookings = bookings.filter(b => filterType === 'all' || b.type === filterType);
  const activeBookings = filteredBookings.filter(b => b.status !== 'cancelled');
  const pastBookings = filteredBookings.filter(b => b.status === 'cancelled');

  return (
    <section className="bookings-page container animate-fade-in">
      <div className="bookings-hero glass">
        <div className="hero-content">
          <p className="hero-eyebrow">Welcome back, {user.full_name}</p>
          <h1 className="hero-title">Your Travel Dashboard</h1>
          <div className="stats-row">
            <div className="stat-item">
              <strong>{activeBookings.length}</strong>
              <span>{filterType === 'all' ? 'Active Bookings' : filterType.charAt(0).toUpperCase() + filterType.slice(1) + 's'}</span>
            </div>
            <div className="stat-item">
              <strong>{pastBookings.length}</strong>
              <span>Past/Cancelled</span>
            </div>
          </div>
        </div>
        <div className="hero-actions">
          <Link to="/flights" className="btn-primary">Book New Flight</Link>
          <Link to="/hotels" className="btn-outline-primary">Find Hotels</Link>
        </div>
      </div>

      <div className="bookings-container">
        <div className="bookings-sidebar">
          <div className="filter-card glass">
            <h3>Filter Bookings</h3>
            <div className="filter-group">
              <label className={filterType === 'all' ? 'active' : ''}>
                <input type="radio" name="filter" checked={filterType === 'all'} onChange={() => setFilterType('all')} /> All Bookings
              </label>
              <label className={filterType === 'flight' ? 'active' : ''}>
                <input type="radio" name="filter" checked={filterType === 'flight'} onChange={() => setFilterType('flight')} /> Flights
              </label>
              <label className={filterType === 'hotel' ? 'active' : ''}>
                <input type="radio" name="filter" checked={filterType === 'hotel'} onChange={() => setFilterType('hotel')} /> Hotels
              </label>
            </div>
            <hr />
            <p className="filter-hint">Manage your trips and download receipts for your travel records.</p>
          </div>
        </div>

        <div className="bookings-main">
          {loading ? (
            <div className="loading-state">
              <div className="loader-dots"><span></span><span></span><span></span></div>
              <p>Fetching your adventures...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="empty-state glass">
              <div className="empty-icon">🌍</div>
              <h2>No {filterType !== 'all' ? filterType + ' ' : ''}bookings yet</h2>
              <p>Your travel history is empty. Time to start planning your next escape to Palawan!</p>
              <Link to="/destinations" className="btn-primary">Explore Destinations</Link>
            </div>
          ) : (
            <>
              {activeBookings.length > 0 && filterType === 'all' && (
                <div className="latest-confirmation glass animate-fade-in">
                  <div className="latest-badge">LATEST TRANSACTION</div>
                  <div className="latest-content">
                    <div className="latest-info">
                      <h3>{activeBookings[0].type === 'flight' ? 'Flight to ' + activeBookings[0].details.destination : activeBookings[0].details.hotel_name}</h3>
                      <p>Reference: <strong>{activeBookings[0].booking_reference}</strong></p>
                    </div>
                    <button className="btn-primary" onClick={() => setSelectedReceipt(activeBookings[0])}>View Receipt</button>
                  </div>
                </div>
              )}
              
              <div className="bookings-list-modern">
                {filteredBookings.map(booking => (
                  <div key={booking.id} className={`booking-card-modern glass ${booking.status === 'cancelled' ? 'cancelled' : ''}`}>
                    <div className="card-top">
                      <div className="type-tag">{booking.type === 'hotel' ? '🏨 Hotel Stay' : '✈️ Flight'}</div>
                      <div className={`status-pill ${booking.status}`}>{booking.status.toUpperCase()}</div>
                    </div>
                    <div className="card-body">
                      <div className="card-main-info">
                        <h3 className="booking-title">
                          {booking.type === 'flight'
                            ? `${booking.details?.origin || ''} to ${booking.details?.destination || ''}`
                            : booking.details?.hotel_name || 'Accommodation'}
                        </h3>
                        <div className="booking-ref-tag">Ref: <span>{booking.booking_reference || booking.details?.booking_reference || 'N/A'}</span></div>
                      </div>
                      <div className="info-grid">
                        <div className="info-cell">
                          <label>Date</label>
                          <strong>{booking.details?.travel_date || booking.details?.check_in || new Date(booking.created_at).toLocaleDateString()}</strong>
                        </div>
                        {booking.type === 'flight' ? (
                          <div className="info-cell"><label>Flight No.</label><strong>{booking.details?.flight_number || 'TE-000'}</strong></div>
                        ) : (
                          <div className="info-cell"><label>Room Type</label><strong>{booking.details?.room_type || 'Standard Room'}</strong></div>
                        )}
                        <div className="info-cell">
                          <label>Total Price</label>
                          <strong className="price-text">₱{(booking.details?.total_amount || booking.details?.price || 0).toLocaleString()}</strong>
                        </div>
                      </div>
                      {expandedId === booking.id && (
                        <div className="card-expanded-content animate-slide-down">
                          <hr />
                          <div className="details-sub-grid">
                            {booking.type === 'hotel' ? (
                              <>
                                <div className="sub-item"><label>Check-out</label><span>{booking.details?.check_out}</span></div>
                                <div className="sub-item"><label>Room #</label><span>{booking.details?.room_number || 'N/A'}</span></div>
                                <div className="sub-item"><label>Guests</label><span>{booking.details?.pax} Pax</span></div>
                              </>
                            ) : (
                              <>
                                <div className="sub-item"><label>Class</label><span>{booking.details?.fare_type}</span></div>
                                <div className="sub-item"><label>Seat</label><span>{booking.details?.seat_number || 'Auto'}</span></div>
                                <div className="sub-item"><label>Baggage</label><span>{booking.details?.baggage_kg}kg</span></div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="card-footer">
                      <button className="btn-text" onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}>
                        {expandedId === booking.id ? 'Show Less' : 'View Full Details'}
                      </button>
                      <div className="footer-actions">
                        {booking.status !== 'cancelled' && (
                          <>
                            <button className="btn-icon-label" onClick={() => setSelectedReceipt(booking)}><span>📄</span> Receipt</button>
                            <button className="btn-icon-label danger" onClick={() => handleCancel(booking.id)}><span>✕</span> Cancel</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Receipt Modal — fixed for printing */}
      {selectedReceipt && (
        <div className="modal-overlay receipt-overlay">
          <div className="receipt-modal glass animate-fade-in" id="printable-receipt">
            <button className="close-btn no-print" onClick={() => setSelectedReceipt(null)}>×</button>
            <div className="receipt-header">
              <span className="receipt-logo">🌴</span>
              <h2 className="receipt-title">TravelEase Receipt</h2>
              <p>Official Booking Confirmation</p>
            </div>
            <div className="receipt-body">
              <div className="receipt-row">
                <span className="receipt-label">Booking Reference</span>
                <span className="receipt-value">{selectedReceipt.booking_reference}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Customer</span>
                <span className="receipt-value">{user.full_name}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Date</span>
                <span className="receipt-value">{new Date(selectedReceipt.created_at).toLocaleDateString()}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Service</span>
                <span className="receipt-value">{selectedReceipt.type === 'flight' ? 'Flight Booking' : 'Hotel Reservation'}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Details</span>
                <span className="receipt-value">
                  {selectedReceipt.type === 'flight'
                    ? `${selectedReceipt.details.origin} to ${selectedReceipt.details.destination} (${selectedReceipt.details.flight_number})`
                    : `${selectedReceipt.details.hotel_name} - ${selectedReceipt.details.room_type || 'Room'} ${selectedReceipt.details.room_number}`}
                </span>
              </div>
              {selectedReceipt.type === 'hotel' && (
                <>
                  <div className="receipt-row">
                    <span className="receipt-label">Check-in</span>
                    <span className="receipt-value">{selectedReceipt.details.check_in}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Check-out</span>
                    <span className="receipt-value">{selectedReceipt.details.check_out}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Guests</span>
                    <span className="receipt-value">{selectedReceipt.details.pax} Pax</span>
                  </div>
                </>
              )}
              {selectedReceipt.type === 'flight' && (
                <>
                  <div className="receipt-row">
                    <span className="receipt-label">Travel Date</span>
                    <span className="receipt-value">{selectedReceipt.details.travel_date}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Fare Type</span>
                    <span className="receipt-value">{selectedReceipt.details.fare_type}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Passengers</span>
                    <span className="receipt-value">{selectedReceipt.details.pax}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Seat</span>
                    <span className="receipt-value">{selectedReceipt.details.seat_number || 'Auto-assigned'}</span>
                  </div>
                </>
              )}
              <div className="receipt-row total-row">
                <span className="receipt-label">Total Amount</span>
                <span className="receipt-value">₱{(selectedReceipt.details.total_amount || selectedReceipt.details.price).toLocaleString()}</span>
              </div>
            </div>
            <div className="receipt-footer">
              <p>Thank you for choosing TravelEase Palawan!</p>
              <p>This is a computer-generated receipt.</p>
            </div>
            <button className="btn-primary btn-print no-print" onClick={handlePrint}>Print Receipt</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyBookings;
