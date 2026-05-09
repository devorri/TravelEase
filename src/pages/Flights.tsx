import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { useNotification } from '../context/NotificationContext.tsx';

interface FlightResult {
  id: string; airline: string; origin: string; destination: string;
  departure_time: string; arrival_time: string; price: number; type: string;
  flight_number?: string; aircraft_type?: string; duration_minutes?: number;
  go_lite_price?: number; go_basic_price?: number; go_plus_price?: number;
}
interface Passenger {
  title: string; firstName: string; lastName: string; birthDate: string;
  gender: string; nationality: string; contactNumber: string; email: string;
}
interface Addons {
  baggage: number; baggageFee: number; meal: string; mealFee: number;
  seatNumber: string; seatFee: number; insurance: boolean; insuranceFee: number;
}

const BAGGAGE_OPTIONS = [
  { kg: 0, label: 'Hand carry only (7kg)', fee: 0 },
  { kg: 20, label: '20 kg Checked', fee: 450 },
  { kg: 32, label: '32 kg Checked', fee: 750 },
  { kg: 40, label: '40 kg Checked', fee: 1050 },
];
const MEAL_OPTIONS = [
  { name: 'None', fee: 0 }, { name: 'Chicken Adobo Meal', fee: 199 },
  { name: 'Pork Sisig Meal', fee: 199 }, { name: 'Beef Tapa Meal', fee: 219 },
  { name: 'Vegetarian Meal', fee: 179 },
];
const SEAT_ROWS = 30;
const SEAT_COLS = ['A','B','C','D','E','F'];
const OCCUPIED_SEATS = ['1A','1B','2D','3F','5A','5B','5C','7E','8A','10C','10D','12F','14A','15B','18C','20D','22A','25E','27F','28B'];

const LOCATIONS = [
  'Manila (MNL)', 'Cebu (CEB)', 'Clark (CRK)', 'Davao (DVO)', 
  'Puerto Princesa (PPS)', 'El Nido (ENI)', 'Coron (USU)'
];

const generateRef = (fn: string) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `TE-${fn || '000'}-${code}`;
};

const Flights: React.FC = () => {
  const { user } = useAuth();
  const { notify } = useNotification();
  const [step, setStep] = useState(1);

  // Step 1 state
  const [from, setFrom] = useState('Manila (MNL)');
  const [to, setTo] = useState('Puerto Princesa (PPS)');
  const [date, setDate] = useState('');
  const [paxCount, setPaxCount] = useState(1);
  const [results, setResults] = useState<FlightResult[]>([]);
  const [searching, setSearching] = useState(false);

  // Step 2 state
  const [selectedFlight, setSelectedFlight] = useState<FlightResult | null>(null);
  const [fareTier, setFareTier] = useState<'lite'|'basic'|'plus'>('basic');

  // Step 3 state
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  // Step 4 state
  const [addons, setAddons] = useState<Addons>({ baggage: 0, baggageFee: 0, meal: 'None', mealFee: 0, seatNumber: '', seatFee: 0, insurance: false, insuranceFee: 0 });

  // Step 5 state
  const [bookingRef, setBookingRef] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [featuredFlights, setFeaturedFlights] = useState<FlightResult[]>([]);

  useEffect(() => {
    fetchFeaturedFlights();
  }, []);

  const fetchFeaturedFlights = async () => {
    const { data } = await supabase.from('flights').select('*').limit(3);
    if (data) setFeaturedFlights(data);
  };

  const getFarePrice = (f: FlightResult) => {
    if (fareTier === 'lite') return f.go_lite_price || f.price * 0.8;
    if (fareTier === 'plus') return f.go_plus_price || f.price * 1.4;
    return f.go_basic_price || f.price;
  };

  const totalAmount = () => {
    if (!selectedFlight) return 0;
    const base = getFarePrice(selectedFlight) * paxCount;
    return base + addons.baggageFee + addons.mealFee + addons.seatFee + (addons.insurance ? addons.insuranceFee : 0);
  };

  const formatTime = (t: string) => {
    try { 
      const date = new Date(t);
      // If invalid date, return original
      if (isNaN(date.getTime())) return t;
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    catch { return t; }
  };

  // Step 1: Search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (from === to) {
      notify('info', 'Invalid Route', 'Origin and destination cannot be the same.');
      return;
    }
    setSearching(true);
    const { data, error } = await supabase.from('flights')
      .select('*')
      .eq('origin', from.split('(')[1].replace(')', ''))
      .eq('destination', to.split('(')[1].replace(')', ''));
    
    setTimeout(() => { 
      if (data && data.length > 0) {
        setResults(data); 
      } else {
        setResults([]);
        notify('info', 'No Flights Found', 'Sorry, we couldn\'t find any flights for this route and date.');
      }
      setSearching(false); 
    }, 800);
  };

  // Step 2: Select flight
  const handleSelectFlight = (f: FlightResult, tier: 'lite'|'basic'|'plus') => {
    setSelectedFlight(f);
    setFareTier(tier);
    const pax: Passenger[] = Array.from({ length: paxCount }, () => ({
      title: 'Mr', firstName: '', lastName: '', birthDate: '', gender: 'Male',
      nationality: 'Filipino', contactNumber: '', email: ''
    }));
    setPassengers(pax);
    setStep(3);
  };

  // Step 3: Validate passengers
  const handlePassengerNext = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.firstName.trim() || !p.lastName.trim()) {
        notify('error', 'Missing Information', `Please fill in name for Passenger ${i + 1}`);
        return;
      }
    }
    if (!passengers[0].email && !passengers[0].contactNumber) {
      notify('error', 'Contact Needed', 'Please provide email or contact number for the primary passenger');
      return;
    }
    setStep(4);
  };

  const updatePassenger = (idx: number, field: keyof Passenger, val: string) => {
    const updated = [...passengers];
    updated[idx] = { ...updated[idx], [field]: val };
    setPassengers(updated);
  };

  // Step 5: Confirm booking
  const handleConfirm = async () => {
    if (!user) { notify('error', 'Login Required', 'Please login to book'); return; }
    if (!selectedFlight) return;
    setSubmitting(true);

    const ref = generateRef(selectedFlight.flight_number || '000');
    const { data: bookingData, error } = await supabase.from('bookings').insert([{
      user_id: user.id, type: 'flight', entity_id: selectedFlight.id,
      booking_reference: ref,
      details: {
        airline: selectedFlight.airline,
        flight_number: selectedFlight.flight_number || 'TE-000',
        origin: selectedFlight.origin, destination: selectedFlight.destination,
        departure_time: selectedFlight.departure_time, arrival_time: selectedFlight.arrival_time,
        travel_date: date, fare_type: fareTier === 'lite' ? 'Go Lite' : fareTier === 'plus' ? 'Go Plus' : 'Go Basic',
        base_fare: getFarePrice(selectedFlight), pax: paxCount,
        baggage_kg: addons.baggage, baggage_fee: addons.baggageFee,
        meal_selection: addons.meal, meal_fee: addons.mealFee,
        seat_number: addons.seatNumber, seat_fee: addons.seatFee,
        insurance: addons.insurance, insurance_fee: addons.insurance ? addons.insuranceFee : 0,
        total_amount: totalAmount(), booking_reference: ref,
        passengers: passengers.map(p => ({ ...p }))
      }
    }]).select().single();

    if (!error && bookingData) {
      // Insert passengers
      const passengerRows = passengers.map((p, i) => ({
        booking_id: bookingData.id,
        first_name: p.firstName, last_name: p.lastName,
        birth_date: p.birthDate || null, gender: p.gender,
        nationality: p.nationality,
        contact_number: i === 0 ? p.contactNumber : null,
        email: i === 0 ? p.email : null,
        seat_number: i === 0 ? addons.seatNumber : null
      }));
      await supabase.from('passengers').insert(passengerRows);
      setBookingRef(ref);
      setStep(5);
      notify('success', 'Booking Confirmed', `Your flight ${selectedFlight.flight_number} to ${selectedFlight.destination} is booked!`);
    } else {
      notify('error', 'Booking Failed', error?.message || 'Unknown error');
    }
    setSubmitting(false);
  };

  const getSeatType = (row: number) => {
    if (row <= 3) return 'premium';
    if (row <= 5) return 'extra';
    return 'standard';
  };
  const getSeatFee = (row: number) => {
    if (row <= 3) return 350;
    if (row <= 5) return 200;
    return 0;
  };

  return (
    <section className="tab-section container animate-fade-in">
      {/* Stepper */}
      <div className="booking-stepper">
        {['Search', 'Select Flight', 'Passengers', 'Add-ons', 'Confirmed'].map((label, i) => (
          <div key={i} className={`stepper-step ${step > i + 1 ? 'completed' : ''} ${step === i + 1 ? 'active' : ''}`}>
            <div className="stepper-circle">{step > i + 1 ? '✓' : i + 1}</div>
            <span className="stepper-label">{label}</span>
          </div>
        ))}
      </div>

      {/* STEP 1: SEARCH */}
      {step === 1 && (
        <div className="booking-step animate-fade-in">
          <div className="section-header">
            <p className="section-eyebrow">TravelEase Air</p>
            <h2 className="section-title">Search Flights to & from Palawan</h2>
          </div>
          <div className="flight-search-card glass">
            <form onSubmit={handleSearch} className="flight-form">
              <div className="form-row">
                <div className="form-group">
                  <label>From</label>
                  <select value={from} onChange={e => setFrom(e.target.value)}>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                <div className="flight-swap" onClick={() => { const t = from; setFrom(to); setTo(t); }}>⇄</div>
                <div className="form-group">
                  <label>To</label>
                  <select value={to} onChange={e => setTo(e.target.value)}>
                    {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Departure Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Passengers</label>
                  <select value={paxCount} onChange={e => setPaxCount(parseInt(e.target.value))}>
                    {[...Array(9)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1} Passenger{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary full-width" disabled={searching}>
                {searching ? '✈ Searching flights...' : 'Search Available Flights'}
              </button>
            </form>
          </div>

          {!searching && results.length === 0 && featuredFlights.length > 0 && (
            <div className="featured-flights-section animate-fade-in">
              <h3 className="section-subtitle">Recommended Flights</h3>
              <div className="featured-grid">
                {featuredFlights.map(f => (
                  <div key={f.id} className="featured-flight-card glass">
                    <div className="feat-route">
                      <strong>{f.origin} → {f.destination}</strong>
                      <span>{f.airline || 'TravelEase Air'}</span>
                    </div>
                    <div className="feat-price">
                      <span>Starts at</span>
                      <strong>₱{Math.round(f.price * 0.8).toLocaleString()}</strong>
                    </div>
                    <button className="btn-primary-sm" onClick={() => {
                      setFrom(LOCATIONS.find(l => l.includes(f.origin)) || f.origin);
                      setTo(LOCATIONS.find(l => l.includes(f.destination)) || f.destination);
                      handleSelectFlight(f, 'basic');
                    }}>Book Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searching && <div className="search-loading"><div className="loader-plane">✈</div><p>Searching TravelEase Flights...</p></div>}

          {results.length > 0 && !searching && (
            <div className="flight-results-list">
              <h3 className="results-count">{results.length} flight{results.length > 1 ? 's' : ''} found</h3>
              {results.map(f => (
                <div key={f.id} className="fare-card glass animate-fade-in">
                  <div className="fare-card-header">
                    <div className="fare-flight-info">
                      <div className="fare-airline"><span className="fare-logo">✈</span><div><strong>{f.airline || 'TravelEase Air'}</strong><span className="flight-num">{f.flight_number || 'TE-000'}</span></div></div>
                      <div className="fare-route">
                        <div className="fare-time"><strong>{formatTime(f.departure_time)}</strong><span>{f.origin}</span></div>
                        <div className="fare-duration"><span>{f.duration_minutes || 75} min</span><div className="dur-line"></div><span>Direct</span></div>
                        <div className="fare-time"><strong>{formatTime(f.arrival_time)}</strong><span>{f.destination}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="fare-tiers">
                    {[
                      { tier: 'lite' as const, label: 'Go Lite', price: f.go_lite_price || f.price * 0.8, features: ['7kg hand carry', 'No seat selection', 'No rebooking'] },
                      { tier: 'basic' as const, label: 'Go Basic', price: f.go_basic_price || f.price, features: ['7kg hand carry', '20kg checked bag', 'Seat selection', 'Rebooking allowed'] },
                      { tier: 'plus' as const, label: 'Go Plus', price: f.go_plus_price || f.price * 1.4, features: ['7kg hand carry', '32kg checked bag', 'Premium seat', 'Meal included', 'Free rebooking'] },
                    ].map(t => (
                      <div key={t.tier} className={`fare-tier-col ${t.tier}`}>
                        <div className="tier-name">{t.label}</div>
                        <div className="tier-price">₱{Math.round(t.price).toLocaleString()}</div>
                        <ul className="tier-features">{t.features.map(ft => <li key={ft}>{ft}</li>)}</ul>
                        <button className="btn-select-fare" onClick={() => handleSelectFlight(f, t.tier)}>Select</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 3: PASSENGER DETAILS */}
      {step === 3 && (
        <div className="booking-step animate-fade-in">
          <div className="section-header">
            <p className="section-eyebrow">Step 3 of 5</p>
            <h2 className="section-title">Passenger Details</h2>
            <p>Enter details for {paxCount} passenger{paxCount > 1 ? 's' : ''} as shown on valid ID.</p>
          </div>
          <div className="passengers-form">
            {passengers.map((p, i) => (
              <div key={i} className="passenger-card glass">
                <h3 className="pax-card-title">
                  <span className="pax-number">{i + 1}</span>
                  Passenger {i + 1} {i === 0 && <span className="pax-primary">Primary</span>}
                </h3>
                <div className="pax-form-grid">
                  <div className="form-group pax-title-group">
                    <label>Title</label>
                    <select value={p.title} onChange={e => updatePassenger(i, 'title', e.target.value)}>
                      <option>Mr</option><option>Mrs</option><option>Ms</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" value={p.firstName} onChange={e => updatePassenger(i, 'firstName', e.target.value)} placeholder="Juan" required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" value={p.lastName} onChange={e => updatePassenger(i, 'lastName', e.target.value)} placeholder="Dela Cruz" required />
                  </div>
                  <div className="form-group dob-group">
                    <label>Date of Birth</label>
                    <div className="dob-selects">
                      <select 
                        value={p.birthDate ? p.birthDate.split('-')[2] : ''} 
                        onChange={e => {
                          const parts = (p.birthDate || '0000-01-01').split('-');
                          updatePassenger(i, 'birthDate', `${parts[0]}-${parts[1]}-${e.target.value.padStart(2, '0')}`);
                        }}
                      >
                        <option value="">Day</option>
                        {Array.from({length: 31}, (_, i) => (
                          <option key={i+1} value={i+1}>{i+1}</option>
                        ))}
                      </select>
                      <select 
                        value={p.birthDate ? p.birthDate.split('-')[1] : ''} 
                        onChange={e => {
                          const parts = (p.birthDate || '0000-01-01').split('-');
                          updatePassenger(i, 'birthDate', `${parts[0]}-${e.target.value}-${parts[2]}`);
                        }}
                      >
                        <option value="">Month</option>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, mi) => (
                          <option key={m} value={(mi + 1).toString().padStart(2, '0')}>{m}</option>
                        ))}
                      </select>
                      <select 
                        value={p.birthDate ? p.birthDate.split('-')[0] : ''} 
                        onChange={e => {
                          const parts = (p.birthDate || '0000-01-01').split('-');
                          updatePassenger(i, 'birthDate', `${e.target.value}-${parts[1]}-${parts[2]}`);
                        }}
                      >
                        <option value="">Year</option>
                        {Array.from({length: 100}, (_, k) => new Date().getFullYear() - k).map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select value={p.gender} onChange={e => updatePassenger(i, 'gender', e.target.value)}>
                      <option>Male</option><option>Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Nationality</label>
                    <input type="text" value={p.nationality} onChange={e => updatePassenger(i, 'nationality', e.target.value)} />
                  </div>
                </div>
                {i === 0 && (
                  <div className="pax-contact-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" value={p.email} onChange={e => updatePassenger(i, 'email', e.target.value)} placeholder="your@email.com" />
                    </div>
                    <div className="form-group">
                      <label>Contact Number</label>
                      <input type="tel" value={p.contactNumber} onChange={e => updatePassenger(i, 'contactNumber', e.target.value)} placeholder="+63 9XX XXX XXXX" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="step-actions">
            <button className="btn-ghost-dark" onClick={() => setStep(1)}>← Back</button>
            <button className="btn-primary" onClick={handlePassengerNext}>Continue to Add-ons →</button>
          </div>
        </div>
      )}

      {/* STEP 4: ADD-ONS */}
      {step === 4 && (
        <div className="booking-step animate-fade-in">
          <div className="section-header">
            <p className="section-eyebrow">Step 4 of 5</p>
            <h2 className="section-title">Customize Your Trip</h2>
          </div>
          <div className="addons-grid">
            {/* Baggage */}
            <div className="addon-section glass">
              <h3>🧳 Checked Baggage</h3>
              <div className="addon-options">
                {BAGGAGE_OPTIONS.map(b => (
                  <label key={b.kg} className={`addon-option ${addons.baggage === b.kg ? 'selected' : ''}`}>
                    <input type="radio" name="baggage" checked={addons.baggage === b.kg}
                      onChange={() => setAddons({ ...addons, baggage: b.kg, baggageFee: b.fee })} />
                    <div className="addon-option-info">
                      <strong>{b.label}</strong>
                      <span className="addon-price">{b.fee === 0 ? 'Free' : `+₱${b.fee}`}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            {/* Meals */}
            <div className="addon-section glass">
              <h3>🍱 In-flight Meal</h3>
              <div className="addon-options">
                {MEAL_OPTIONS.map(m => (
                  <label key={m.name} className={`addon-option ${addons.meal === m.name ? 'selected' : ''}`}>
                    <input type="radio" name="meal" checked={addons.meal === m.name}
                      onChange={() => setAddons({ ...addons, meal: m.name, mealFee: m.fee })} />
                    <div className="addon-option-info">
                      <strong>{m.name}</strong>
                      <span className="addon-price">{m.fee === 0 ? 'Free' : `+₱${m.fee}`}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Seat Map */}
          <div className="seat-section glass">
            <h3>💺 Seat Selection</h3>
            <div className="seat-legend">
              <span><span className="seat-dot available"></span> Available</span>
              <span><span className="seat-dot selected"></span> Selected</span>
              <span><span className="seat-dot occupied"></span> Occupied</span>
              <span><span className="seat-dot premium"></span> Premium (+₱350)</span>
              <span><span className="seat-dot extra"></span> Extra Legroom (+₱200)</span>
            </div>
            <div className="seat-map-wrapper">
              <div className="aircraft-nose">✈ TravelEase</div>
              <div className="seat-map">
                <div className="seat-row seat-header-row">
                  <span className="row-num"></span>
                  {SEAT_COLS.map((c, i) => (
                    <React.Fragment key={c}>
                      <span className="seat-col-label">{c}</span>
                      {i === 2 && <span className="aisle"></span>}
                    </React.Fragment>
                  ))}
                </div>
                {Array.from({ length: SEAT_ROWS }, (_, r) => r + 1).map(row => (
                  <div key={row} className="seat-row">
                    <span className="row-num">{row}</span>
                    {SEAT_COLS.map((col, ci) => {
                      const seatId = `${row}${col}`;
                      const isOccupied = OCCUPIED_SEATS.includes(seatId);
                      const isSelected = addons.seatNumber === seatId;
                      const type = getSeatType(row);
                      return (
                        <React.Fragment key={col}>
                          <button
                            className={`seat ${type} ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
                            disabled={isOccupied}
                            onClick={() => setAddons({ ...addons, seatNumber: seatId, seatFee: getSeatFee(row) })}
                            title={`Seat ${seatId}${isOccupied ? ' (Occupied)' : ''}`}
                          />
                          {ci === 2 && <span className="aisle"></span>}
                        </React.Fragment>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            {addons.seatNumber && (
              <div className="seat-selected-info">
                Selected: <strong>Seat {addons.seatNumber}</strong>
                {addons.seatFee > 0 && <span> (+₱{addons.seatFee})</span>}
              </div>
            )}
          </div>

          {/* Travel Insurance */}
          <div className="addon-section glass insurance-section">
            <label className={`addon-option wide ${addons.insurance ? 'selected' : ''}`}>
              <input type="checkbox" checked={addons.insurance}
                onChange={e => setAddons({ ...addons, insurance: e.target.checked, insuranceFee: 299 })} />
              <div className="addon-option-info">
                <strong>🛡️ TravelEase Protect — Travel Insurance</strong>
                <span className="addon-desc">Coverage for trip cancellation, delays, and medical emergencies.</span>
                <span className="addon-price">+₱299</span>
              </div>
            </label>
          </div>

          {/* Summary before confirm */}
          <div className="pre-confirm-summary glass">
            <h3>Booking Summary</h3>
            <div className="summary-grid">
              <div className="summary-item"><span>Base Fare ({fareTier === 'lite' ? 'Go Lite' : fareTier === 'plus' ? 'Go Plus' : 'Go Basic'}) × {paxCount}</span><span>₱{(getFarePrice(selectedFlight!) * paxCount).toLocaleString()}</span></div>
              {addons.baggageFee > 0 && <div className="summary-item"><span>Checked Baggage ({addons.baggage}kg)</span><span>₱{addons.baggageFee.toLocaleString()}</span></div>}
              {addons.mealFee > 0 && <div className="summary-item"><span>Meal: {addons.meal}</span><span>₱{addons.mealFee.toLocaleString()}</span></div>}
              {addons.seatFee > 0 && <div className="summary-item"><span>Seat {addons.seatNumber}</span><span>₱{addons.seatFee.toLocaleString()}</span></div>}
              {addons.insurance && <div className="summary-item"><span>Travel Insurance</span><span>₱{addons.insuranceFee.toLocaleString()}</span></div>}
              <div className="summary-total"><span>Total</span><span>₱{totalAmount().toLocaleString()}</span></div>
            </div>
          </div>

          <div className="step-actions">
            <button className="btn-ghost-dark" onClick={() => setStep(3)}>← Back</button>
            <button className="btn-primary btn-confirm" onClick={handleConfirm} disabled={submitting}>
              {submitting ? 'Confirming...' : `Confirm Booking — ₱${totalAmount().toLocaleString()}`}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: CONFIRMATION */}
      {step === 5 && selectedFlight && (
        <div className="booking-step animate-fade-in">
          <div className="confirmation-card glass">
            <div className="confirm-success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p className="confirm-sub">Your flight has been successfully booked with TravelEase.</p>
            <div className="confirm-ref">
              <span>Booking Reference</span>
              <strong>{bookingRef}</strong>
            </div>
            <div className="confirm-details">
              <div className="confirm-flight-info">
                <div className="confirm-route">
                  <div><strong>{formatTime(selectedFlight.departure_time)}</strong><span>{selectedFlight.origin}</span></div>
                  <div className="confirm-arrow">✈ →</div>
                  <div><strong>{formatTime(selectedFlight.arrival_time)}</strong><span>{selectedFlight.destination}</span></div>
                </div>
                <div className="confirm-meta">
                  <span>📅 {date}</span>
                  <span>🎫 {fareTier === 'lite' ? 'Go Lite' : fareTier === 'plus' ? 'Go Plus' : 'Go Basic'}</span>
                  <span>👥 {paxCount} Pax</span>
                  {addons.seatNumber && <span>💺 Seat {addons.seatNumber}</span>}
                </div>
              </div>
              <div className="confirm-passengers">
                <h4>Passengers</h4>
                {passengers.map((p, i) => (
                  <div key={i} className="confirm-pax-row">
                    <span>{p.title} {p.firstName} {p.lastName}</span>
                    {i === 0 && addons.seatNumber && <span className="confirm-seat">Seat {addons.seatNumber}</span>}
                  </div>
                ))}
              </div>
              <div className="confirm-total">
                <span>Total Amount</span>
                <strong>₱{totalAmount().toLocaleString()}</strong>
              </div>
            </div>
            <div className="confirm-actions">
              <a href="/my-bookings" className="btn-primary">View My Bookings</a>
              <button className="btn-ghost-dark" onClick={() => { setStep(1); setResults([]); setSelectedFlight(null); setBookingRef(''); }}>Book Another Flight</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Flights;
