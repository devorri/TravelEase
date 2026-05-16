import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { useNotification } from '../context/NotificationContext.tsx';

interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  price_per_night: number;
  image_url: string;
  images?: string[];
  stars: number;
  area: string;
  amenities: string[];
}

interface Room {
  id: string;
  room_number: string;
  building: string;
  room_type?: string;
  max_guests?: number;
  status: string;
}

const ROOM_TYPES = [
  { key: 'standard', label: 'Standard Room', desc: '1-2 Guests', maxGuests: 2, icon: '🛏️' },
  { key: 'deluxe',   label: 'Deluxe Room',   desc: '3-4 Guests', maxGuests: 4, icon: '🛋️' },
  { key: 'suite',    label: 'Suite Room',     desc: '5-6 Guests', maxGuests: 6, icon: '👑' },
];

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookedRoomIds, setBookedRoomIds] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [activeRoomType, setActiveRoomType] = useState('standard');
  const [galleryIdx, setGalleryIdx] = useState(0);
  
  const { user } = useAuth();
  const { notify } = useNotification();

  useEffect(() => { fetchHotels(); }, []);

  const fetchHotels = async () => {
    setLoading(true);
    const { data } = await supabase.from('hotels').select('*');
    if (data) setHotels(data);
    setLoading(false);
  };

  const [bookingDetails, setBookingDetails] = useState({ checkIn: '', checkOut: '', pax: 1 });

  useEffect(() => {
    if (selectedHotel && bookingDetails.checkIn && bookingDetails.checkOut) {
      fetchRoomsAndAvailability();
    }
  }, [selectedHotel, bookingDetails.checkIn, bookingDetails.checkOut]);

  const fetchRoomsAndAvailability = async () => {
    if (!selectedHotel) return;
    const { data: roomsData } = await supabase
      .from('hotel_rooms').select('*').eq('hotel_id', selectedHotel.id)
      .order('room_number', { ascending: true });
    if (roomsData) setRooms(roomsData);

    const { data: overlappingBookings } = await supabase
      .from('bookings').select('room_id, details')
      .eq('type', 'hotel').eq('entity_id', selectedHotel.id).neq('status', 'cancelled');

    if (overlappingBookings) {
      const bookedIds = overlappingBookings
        .filter(b => {
          const bCheckIn = new Date(b.details.check_in);
          const bCheckOut = new Date(b.details.check_out);
          const sCheckIn = new Date(bookingDetails.checkIn);
          const sCheckOut = new Date(bookingDetails.checkOut);
          return sCheckIn < bCheckOut && sCheckOut > bCheckIn;
        })
        .map(b => b.room_id).filter(id => id !== null);
      setBookedRoomIds(bookedIds);
    }
  };

  const handleBooking = async () => {
    if (!user) { notify('error', 'Login Required', 'Please login to book a hotel'); return; }
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) { notify('error', 'Missing Dates', 'Please select check-in and check-out dates'); return; }
    if (!selectedRoom) { notify('error', 'No Room Selected', 'Please select an available room from the list'); return; }

    const ref = `TE-HTL-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const roomType = ROOM_TYPES.find(rt => rt.key === (selectedRoom.room_type || 'standard'));

    // FINAL AVAILABILITY CHECK (Avoid double booking)
    const { data: finalCheck } = await supabase
      .from('bookings').select('id, details')
      .eq('room_id', selectedRoom.id)
      .neq('status', 'cancelled');

    const isDoubleBooked = finalCheck?.some(b => {
      const bCheckIn = new Date(b.details.check_in);
      const bCheckOut = new Date(b.details.check_out);
      const sCheckIn = new Date(bookingDetails.checkIn);
      const sCheckOut = new Date(bookingDetails.checkOut);
      return sCheckIn < bCheckOut && sCheckOut > bCheckIn;
    });

    if (isDoubleBooked) {
      notify('error', 'Booking Conflict', 'This room was just booked by someone else! Please choose another room or different dates.');
      fetchRoomsAndAvailability();
      return;
    }

    const { error } = await supabase.from('bookings').insert([{
      user_id: user.id,
      type: 'hotel',
      entity_id: selectedHotel?.id,
      room_id: selectedRoom.id,
      booking_reference: ref,
      details: {
        hotel_name: selectedHotel?.name,
        room_number: selectedRoom.room_number,
        room_type: selectedRoom.room_type,
        building: selectedRoom.building,
        max_guests: selectedRoom.max_guests,
        check_in: bookingDetails.checkIn,
        check_out: bookingDetails.checkOut,
        pax: bookingDetails.pax,
        price: selectedHotel?.price_per_night,
        total_amount: selectedHotel ? selectedHotel.price_per_night * 1 : 0, // Simplified for now
        booking_reference: ref
      }
    }]);

    if (!error) {
      setBookingRef(ref);
      setBookingSuccess(true);
      notify('success', 'Booking Confirmed', `Successfully reserved Room ${selectedRoom.room_number} at ${selectedHotel?.name}`);
    } else {
      notify('error', 'Booking Failed', error.message);
    }
  };

  const filteredHotels = hotels.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.area.toLowerCase().includes(search.toLowerCase())
  );

  // Map rooms by type — fall back to building name if room_type column doesn't exist yet
  const getRoomType = (r: Room): string => {
    if (r.room_type) return r.room_type;
    if (r.building === 'Building A') return 'standard';
    if (r.building === 'Building B') return 'deluxe';
    if (r.building === 'Building C') return 'suite';
    return 'standard';
  };

  const roomsByType = {
    standard: rooms.filter(r => getRoomType(r) === 'standard'),
    deluxe: rooms.filter(r => getRoomType(r) === 'deluxe'),
    suite: rooms.filter(r => getRoomType(r) === 'suite'),
  };

  const activeTypeInfo = ROOM_TYPES.find(rt => rt.key === activeRoomType)!;
  const hotelImages = selectedHotel?.images?.length ? selectedHotel.images : (selectedHotel?.image_url ? [selectedHotel.image_url] : []);

  return (
    <section className="tab-section container animate-fade-in">
      <div className="section-header-flex">
        <div>
          <p className="section-eyebrow">Accommodations</p>
          <h2 className="section-title">Palawan Hotels & Resorts</h2>
        </div>
        <div className="search-bar-premium glass">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search hotels or areas..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading hotels...</div>
      ) : (
        <div className="hotels-grid">
          {filteredHotels.map(hotel => (
            <div key={hotel.id} className="hotel-card glass">
              <img src={hotel.image_url} alt={hotel.name} className="hotel-image" />
              <div className="hotel-info">
                <div className="hotel-header">
                  <h3>{hotel.name}</h3>
                  <div className="hotel-stars">{'★'.repeat(hotel.stars)}</div>
                </div>
                <p className="hotel-area">📍 {hotel.area}</p>
                <div className="hotel-amenities">
                  {hotel.amenities?.slice(0, 3).map(a => (
                    <span key={a} className="amenity-badge">{a}</span>
                  ))}
                </div>
                <div className="hotel-footer">
                  <div className="hotel-price">
                    <span className="price">₱{hotel.price_per_night.toLocaleString()}</span>
                    <span className="per-night">/ night</span>
                  </div>
                  <button className="btn-primary" onClick={() => { setSelectedHotel(hotel); setGalleryIdx(0); }}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedHotel && (
        <div className="modal-overlay">
          <div className="modal-card glass animate-fade-in">
            <button className="close-btn" onClick={() => { setSelectedHotel(null); setBookingSuccess(false); setSelectedRoom(null); }}>×</button>
            {bookingSuccess ? (
              <div className="booking-success-msg">
                <div className="success-icon">✓</div>
                <h2>Reservation Confirmed!</h2>
                <p>Room <strong>{selectedRoom?.room_number}</strong> ({activeTypeInfo.label}) at <strong>{selectedHotel.name}</strong> is yours.</p>
                <div className="confirm-ref">
                  <span>Reference Number</span>
                  <strong>{bookingRef}</strong>
                </div>
                <button className="btn-primary" onClick={() => window.location.href = '/my-bookings'}>View My Bookings</button>
              </div>
            ) : (
              <>
                {/* Image Gallery */}
                <div className="modal-gallery">
                  <img src={hotelImages[galleryIdx] || selectedHotel.image_url} alt={selectedHotel.name} className="modal-image" />
                  {hotelImages.length > 1 && (
                    <div className="gallery-thumbs">
                      {hotelImages.map((img, i) => (
                        <img key={i} src={img} alt="" className={`gallery-thumb ${galleryIdx === i ? 'active' : ''}`} onClick={() => setGalleryIdx(i)} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="modal-body">
                  <h2>{selectedHotel.name}</h2>
                  <p className="modal-price">₱{selectedHotel.price_per_night.toLocaleString()} per night</p>

                  <div className="amenities-list">
                    <h4>Select Dates:</h4>
                    <div className="date-picker-row">
                      <div className="date-group">
                        <label>Check-in</label>
                        <input type="date" value={bookingDetails.checkIn} onChange={e => setBookingDetails({...bookingDetails, checkIn: e.target.value})} />
                      </div>
                      <div className="date-group">
                        <label>Check-out</label>
                        <input type="date" value={bookingDetails.checkOut} onChange={e => setBookingDetails({...bookingDetails, checkOut: e.target.value})} />
                      </div>
                    </div>

                    {bookingDetails.checkIn && bookingDetails.checkOut ? (
                      <>
                        <h4>Choose Room Type:</h4>
                        <div className="room-type-tabs">
                          {ROOM_TYPES.map(rt => (
                            <button
                              key={rt.key}
                              className={`room-type-tab ${activeRoomType === rt.key ? 'active' : ''}`}
                              onClick={() => { setActiveRoomType(rt.key); setSelectedRoom(null); }}
                            >
                              <span className="rt-icon">{rt.icon}</span>
                              <span className="rt-label">{rt.label}</span>
                              <span className="rt-desc">{rt.desc}</span>
                            </button>
                          ))}
                        </div>

                        <div className="room-grid">
                          {roomsByType[activeRoomType as keyof typeof roomsByType]?.map(room => {
                            const isBooked = bookedRoomIds.includes(room.id);
                            const isOccupied = room.status !== 'available';
                            const isDisabled = isBooked || isOccupied;
                            return (
                              <button key={room.id}
                                className={`room-btn ${selectedRoom?.id === room.id ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                                disabled={isDisabled}
                                onClick={() => setSelectedRoom(room)}
                                title={isOccupied ? 'Currently Occupied' : isBooked ? 'Already booked for these dates' : `Room ${room.room_number}`}
                              >
                                {room.room_number}
                              </button>
                            );
                          })}
                        </div>
                        {roomsByType[activeRoomType as keyof typeof roomsByType]?.length === 0 && (
                          <p className="no-rooms-msg">No rooms available for this type yet.</p>
                        )}

                        <h4>Stay Details:</h4>
                        <div className="details-picker-row">
                          <div className="detail-group">
                            <label>Guests (max {activeTypeInfo.maxGuests})</label>
                            <select
                              value={bookingDetails.pax}
                              onChange={e => setBookingDetails({...bookingDetails, pax: parseInt(e.target.value)})}
                            >
                              {Array.from({ length: activeTypeInfo.maxGuests }, (_, i) => i + 1).map(n =>
                                <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-center" style={{padding: '20px', color: '#94a3b8'}}>Please select dates to see available rooms.</p>
                    )}
                  </div>
                  <button className="btn-primary full-width" onClick={handleBooking} disabled={!selectedRoom}>
                    Confirm Reservation
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hotels;
