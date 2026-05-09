/* =========================================
   TravelEase Admin — admin-script.js
   Full CRUD for Tourism, Hotels, Flights, Transport
   + Read-only Bookings, Booking History & Feedback
   ========================================= */

// ──────────────────────────────────────────
//  STATE / DATABASE
// ──────────────────────────────────────────

let adminDB = {
  tourism: [
    { id:1, name:"Honda Bay", category:"Island", location:"Puerto Princesa", rating:4.8, entry:"₱150", best:"Nov–May", duration:"Full Day", difficulty:"Easy", desc:"A cluster of pristine islands including Luli, Pandan, Cowrie, and Starfish Island." },
    { id:2, name:"Coron Island", category:"Island", location:"Coron, Busuanga", rating:4.9, entry:"₱500", best:"Mar–May", duration:"Full Day", difficulty:"Moderate", desc:"Majestic island with towering limestone cliffs and sacred Kayangan Lake." },
    { id:3, name:"Nacpan Beach", category:"Beach", location:"El Nido", rating:4.9, entry:"₱50", best:"Nov–May", duration:"Full Day", difficulty:"Easy", desc:"A 4-kilometer stretch of golden sand, one of Southeast Asia's best beaches." },
    { id:4, name:"Big Lagoon", category:"Lagoon", location:"El Nido", rating:4.9, entry:"₱200", best:"Nov–May", duration:"Half Day", difficulty:"Easy", desc:"Iconic lagoon surrounded by vertical limestone karsts offering kayaking." },
    { id:5, name:"Puerto Princesa Underground River", category:"Cave", location:"Sabang, Puerto Princesa", rating:4.9, entry:"₱190", best:"Nov–May", duration:"Half Day", difficulty:"Easy", desc:"UNESCO World Heritage Site — an 8.2 km navigable underground river." },
    { id:6, name:"Kayangan Lake", category:"Lagoon", location:"Coron Island", rating:4.9, entry:"₱500", best:"Mar–May", duration:"Full Day", difficulty:"Moderate", desc:"The cleanest lake in Asia, nestled between towering limestone peaks." },
    { id:7, name:"Calauit Safari Island", category:"Wildlife", location:"Busuanga", rating:4.6, entry:"₱700", best:"Nov–May", duration:"Half Day", difficulty:"Easy", desc:"A unique African wildlife sanctuary with giraffes and zebras on a tropical island." },
    { id:8, name:"Long Beach San Vicente", category:"Beach", location:"San Vicente", rating:4.8, entry:"₱30", best:"Oct–May", duration:"Full Day", difficulty:"Easy", desc:"The longest white-sand beach in the Philippines at 14 kilometers." },
    { id:9, name:"Tubbataha Reef", category:"Diving", location:"Sulu Sea, Palawan", rating:5.0, entry:"₱2000", best:"Mar–Jun", duration:"Multi-day", difficulty:"Advanced", desc:"UNESCO World Heritage diving site with the richest marine biodiversity in Asia." },
    { id:10, name:"Iwahig Prison & Penal Farm", category:"Cultural", location:"Puerto Princesa", rating:4.2, entry:"Free", best:"All Year", duration:"Half Day", difficulty:"Easy", desc:"Unique open prison farm that has become a cultural tourism attraction." },
  ],

  hotels: [
    { id:1, name:"El Nido Resorts Miniloc Island", location:"El Nido", stars:5, rate:"₱18,500", rooms:8, status:"Available", email:"reservations@elnidoresorts.com", phone:"+63 2 8894 5644", desc:"Award-winning eco-resort nestled in a sheltered cove." },
    { id:2, name:"Two Seasons Coron Island Resort", location:"Coron", stars:5, rate:"₱12,000", rooms:4, status:"Limited", email:"coron@twoseasons.com.ph", phone:"+63 48 284 7777", desc:"Stunning overwater bungalows above crystal-clear Maquinit waters." },
    { id:3, name:"Huma Island Resort & Spa", location:"Coron", stars:5, rate:"₱15,000", rooms:12, status:"Available", email:"info@humaisland.com", phone:"+63 2 8556 8888", desc:"Private island luxury resort with world-class spa facilities." },
    { id:4, name:"Lexington Hotel Puerto Princesa", location:"Puerto Princesa", stars:4, rate:"₱4,500", rooms:22, status:"Available", email:"reservations@lexingtonpalawan.com", phone:"+63 48 434 4888", desc:"Premier business and leisure hotel in the heart of Puerto Princesa." },
    { id:5, name:"Cauayan Island Resort", location:"El Nido", stars:5, rate:"₱22,000", rooms:3, status:"Limited", email:"info@cauayanisland.com", phone:"+63 917 531 1111", desc:"Ultra-exclusive private island resort with helicopter access only." },
    { id:6, name:"Port Barton Diving Inn", location:"Port Barton", stars:3, rate:"₱2,200", rooms:15, status:"Available", email:"dive@portbartoninn.com", phone:"+63 918 777 2222", desc:"Charming dive-focused guesthouse on Port Barton's quiet beach." },
    { id:7, name:"San Vicente Beach Resort", location:"San Vicente", stars:4, rate:"₱6,800", rooms:0, status:"Sold Out", email:"info@svcresort.com", phone:"+63 919 888 3333", desc:"Beachfront resort along the longest white beach in the Philippines." },
  ],

  flights: [
    { id:1, airline:"Cebu Pacific", flightNo:"5J 399", route:"MNL → PPS", depart:"06:00", arrive:"07:30", price:"₱2,499", seats:82, class:"Economy" },
    { id:2, airline:"Philippine Airlines", flightNo:"PR 285", route:"MNL → PPS", depart:"08:30", arrive:"10:00", price:"₱4,850", seats:45, class:"Economy" },
    { id:3, airline:"AirAsia Philippines", flightNo:"Z2 741", route:"MNL → ENI", depart:"07:45", arrive:"09:00", price:"₱3,299", seats:28, class:"Economy" },
    { id:4, airline:"Cebu Pacific", flightNo:"5J 813", route:"MNL → USU", depart:"09:15", arrive:"10:35", price:"₱2,799", seats:64, class:"Economy" },
    { id:5, airline:"Philippine Airlines", flightNo:"PR 2981", route:"CEB → PPS", depart:"10:30", arrive:"11:45", price:"₱3,650", seats:38, class:"Economy" },
    { id:6, airline:"AirAsia Philippines", flightNo:"Z2 899", route:"CEB → USU", depart:"11:00", arrive:"12:10", price:"₱2,999", seats:52, class:"Economy" },
    { id:7, airline:"SkyJet Airlines", flightNo:"M8 605", route:"MNL → ENI", depart:"14:00", arrive:"15:25", price:"₱6,500", seats:12, class:"Business" },
  ],

  transport: [
    { id:1, operator:"Palawan Express Shuttle", type:"Van", route:"Puerto Princesa → El Nido", capacity:10, rate:"₱650/person", schedule:"6:00 AM, 12:00 PM, 3:00 PM", status:"Active" },
    { id:2, operator:"Rovic Tours", type:"Van", route:"Puerto Princesa → Port Barton", capacity:10, rate:"₱450/person", schedule:"7:00 AM, 2:00 PM", status:"Active" },
    { id:3, operator:"El Nido Tricycle Cooperative", type:"Tricycle", route:"El Nido Town Center", capacity:3, rate:"₱15–₱50/trip", schedule:"All Day", status:"Active" },
    { id:4, operator:"Coron Ferry Services", type:"Speedboat", route:"Coron → Busuanga", capacity:20, rate:"₱200/person", schedule:"8:00 AM, 2:00 PM", status:"Active" },
    { id:5, operator:"San Vicente Shuttle", type:"Shuttle", route:"Puerto Princesa → San Vicente", capacity:12, rate:"₱500/person", schedule:"7:00 AM, 1:00 PM", status:"Active" },
    { id:6, operator:"Island Navigator Ferry", type:"Ferry", route:"Puerto Princesa → Cuyo Islands", capacity:80, rate:"₱900/person", schedule:"Tue, Thu, Sat 6:00 AM", status:"Limited" },
    { id:7, operator:"Sabang Tricycle Association", type:"Tricycle", route:"Puerto Princesa → Sabang", capacity:3, rate:"₱150/person", schedule:"6:00 AM – 5:00 PM", status:"Active" },
  ],

  bookings: [
    { ref:"TE-2025-001", guest:"Maria Santos",   email:"maria.santos@email.com",   type:"Hotel",  property:"El Nido Resorts Miniloc Island",  checkin:"2025-07-15", guests:2, total:"₱55,500", status:"Confirmed" },
    { ref:"TE-2025-002", guest:"John Reyes",      email:"john.reyes@email.com",      type:"Flight", property:"5J 399 MNL → PPS",                checkin:"2025-07-18", guests:3, total:"₱7,497",  status:"Confirmed" },
    { ref:"TE-2025-003", guest:"Ana Cruz",        email:"ana.cruz@email.com",        type:"Hotel",  property:"Two Seasons Coron Island Resort",  checkin:"2025-07-20", guests:2, total:"₱36,000", status:"Pending"   },
    { ref:"TE-2025-004", guest:"Luis Dela Cruz",  email:"luis.delacruz@email.com",   type:"Flight", property:"PR 285 MNL → PPS",                 checkin:"2025-07-22", guests:1, total:"₱4,850",  status:"Confirmed" },
    { ref:"TE-2025-005", guest:"Sofia Ramos",     email:"sofia.ramos@email.com",     type:"Hotel",  property:"Cauayan Island Resort",            checkin:"2025-08-01", guests:4, total:"₱88,000", status:"Pending"   },
    { ref:"TE-2025-006", guest:"Marco Bautista",  email:"marco.bautista@email.com",  type:"Hotel",  property:"San Vicente Beach Resort",         checkin:"2025-06-15", guests:2, total:"₱13,600", status:"Cancelled" },
    { ref:"TE-2025-007", guest:"Pia Villanueva",  email:"pia.villanueva@email.com",  type:"Flight", property:"Z2 741 MNL → ENI",                 checkin:"2025-07-30", guests:2, total:"₱6,598",  status:"Confirmed" },
    { ref:"TE-2025-008", guest:"Diego Fernandez", email:"diego.fernandez@email.com", type:"Hotel",  property:"Huma Island Resort & Spa",         checkin:"2025-08-10", guests:2, total:"₱45,000", status:"Confirmed" },
  ],

  feedback: [
    { id:1, name:"Maria Santos", destination:"El Nido Lagoons", category:"Tourism", rating:5, text:"Absolutely breathtaking! The limestone cliffs and crystal-clear water are unlike anything I've ever seen. A must-visit for every Filipino." },
    { id:2, name:"James Walker", destination:"Tubbataha Reef", category:"Tourism", rating:5, text:"Best diving experience of my life. The visibility was 30+ meters and the marine life is extraordinary. Worth every peso." },
    { id:3, name:"Ana Cruz", destination:"El Nido Resorts Miniloc Island", category:"Hotel", rating:5, text:"Woke up to a view of the lagoon every morning. The staff were incredibly attentive and the food was outstanding." },
    { id:4, name:"Luis Dela Cruz", destination:"Puerto Princesa Underground River", category:"Tourism", rating:4, text:"Impressive natural wonder! Book tickets way in advance — it gets very crowded. The cave itself is magnificent." },
    { id:5, name:"Sofia Ramos", destination:"Cebu Pacific Flight", category:"Flight", rating:3, text:"Flight was delayed by 45 minutes with no explanation. The seat was comfortable enough but punctuality needs improvement." },
    { id:6, name:"Marco Bautista", destination:"Puerto Princesa City Tour", category:"Tourism", rating:4, text:"Great city tour with knowledgeable guides. The Palawan Wildlife Rescue Center was a highlight." },
    { id:7, name:"Pia Villanueva", destination:"Lexington Hotel", category:"Hotel", rating:4, text:"Excellent value for money. Great location, clean rooms, and a good breakfast spread. Will definitely book again." },
    { id:8, name:"Chen Wei", destination:"Coron Island Hopping", category:"Tourism", rating:5, text:"Kayangan Lake was a spiritual experience. The water clarity is impossible to describe — you have to see it yourself." },
  ]
};

let nextIds = {
  tourism:   11,
  hotels:    8,
  flights:   8,
  transport: 8,
  feedback:  9
};

// ──────────────────────────────────────────
//  NAV
// ──────────────────────────────────────────

const panelNames = {
  dashboard:        'Dashboard',
  tourism:          'Manage Tourism',
  hotels:           'Manage Hotels',
  flights:          'Manage Flights',
  transport:        'Manage Transport',
  bookings:         'View Bookings',
  'booking-history':'Booking History',
  feedback:         'View Feedback'
};

function switchPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar-link').forEach(l => {
    l.classList.toggle('active', l.dataset.panel === name);
  });
  const target = document.getElementById('panel-' + name);
  if (target) target.classList.add('active');
  document.getElementById('breadcrumb-current').textContent = panelNames[name] || name;

  if (name === 'dashboard')        renderDashboard();
  if (name === 'tourism')          renderTourismTable();
  if (name === 'hotels')           renderHotelsTable();
  if (name === 'flights')          renderFlightsTable();
  if (name === 'transport')        renderTransportTable();
  if (name === 'bookings')         renderBookingsTable();
  if (name === 'booking-history')  renderBookingHistoryTable();
  if (name === 'feedback')         renderFeedbackTable();
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const mw = document.querySelector('.main-wrapper');
  if (window.innerWidth <= 800) {
    sb.classList.toggle('open');
  } else {
    sb.classList.toggle('collapsed');
    mw.classList.toggle('expanded');
  }
}

// ──────────────────────────────────────────
//  LOGOUT
// ──────────────────────────────────────────

function handleLogout() {
  document.getElementById('logout-modal').style.display = 'flex';
}

function confirmLogout() {
  showToast('Logging out…', 'success');
  setTimeout(() => {
    document.getElementById('logout-modal').style.display = 'none';
    // Replace with actual logout/redirect logic as needed
    alert('You have been logged out. Redirect to login page here.');
  }, 1200);
}

// ──────────────────────────────────────────
//  DASHBOARD
// ──────────────────────────────────────────

function renderDashboard() {
  document.getElementById('kpi-destinations').textContent = adminDB.tourism.length;
  document.getElementById('kpi-hotels').textContent       = adminDB.hotels.length;
  document.getElementById('kpi-flights').textContent      = adminDB.flights.length;
  document.getElementById('kpi-transport').textContent    = adminDB.transport.length;
  document.getElementById('kpi-bookings').textContent     = adminDB.bookings.length;
  document.getElementById('kpi-feedback').textContent     = adminDB.feedback.length;

  // Recent bookings (last 5)
  const rb = document.getElementById('dash-recent-bookings');
  rb.innerHTML = '';
  adminDB.bookings.slice(-5).reverse().forEach(b => {
    const div = document.createElement('div');
    div.className = 'mini-row';
    div.innerHTML = `
      <div>
        <div class="mini-guest">${b.guest}</div>
        <div class="mini-prop">${b.property}</div>
      </div>
      <span class="mini-badge badge-${b.status.toLowerCase()}">${b.status}</span>
    `;
    rb.appendChild(div);
  });

  // Recent feedback (last 5)
  const rf = document.getElementById('dash-recent-feedback');
  rf.innerHTML = '';
  adminDB.feedback.slice(-5).reverse().forEach(f => {
    const div = document.createElement('div');
    div.className = 'mini-row';
    div.innerHTML = `
      <div>
        <div class="mini-guest">${f.name}</div>
        <div class="mini-prop">${f.destination}</div>
      </div>
      <span class="stars-cell">${'★'.repeat(f.rating)}</span>
    `;
    rf.appendChild(div);
  });
}

// ──────────────────────────────────────────
//  TOURISM TABLE
// ──────────────────────────────────────────

function renderTourismTable() {
  const search = (document.getElementById('tourism-search')?.value || '').toLowerCase();
  const filter = document.getElementById('tourism-filter')?.value || '';
  const tbody = document.getElementById('tourism-tbody');
  tbody.innerHTML = '';

  const rows = adminDB.tourism.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search) || d.location.toLowerCase().includes(search);
    const matchFilter = !filter || d.category === filter;
    return matchSearch && matchFilter;
  });

  if (!rows.length) { tbody.innerHTML = emptyRow(8); return; }

  rows.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${d.id}</td>
      <td><strong>${d.name}</strong></td>
      <td>${d.category}</td>
      <td>${d.location}</td>
      <td class="stars-cell">${starsStr(d.rating)} <span style="color:#888;font-size:12px">${d.rating}</span></td>
      <td>${d.entry}</td>
      <td>${d.best}</td>
      <td>
        <div class="tbl-actions">
          <button class="btn-edit"   onclick="editTourism(${d.id})">Edit</button>
          <button class="btn-delete" onclick="deleteTourism(${d.id})">Delete</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function editTourism(id) {
  const d = adminDB.tourism.find(x => x.id === id);
  if (!d) return;
  openModal('tourism-edit', d);
}

function deleteTourism(id) {
  if (!confirm('Delete this destination?')) return;
  adminDB.tourism = adminDB.tourism.filter(x => x.id !== id);
  renderTourismTable();
  renderDashboard();
  showToast('Destination deleted.', 'success');
}

// ──────────────────────────────────────────
//  HOTELS TABLE
// ──────────────────────────────────────────

function renderHotelsTable() {
  const search = (document.getElementById('hotels-search')?.value || '').toLowerCase();
  const filter = document.getElementById('hotels-filter')?.value || '';
  const tbody = document.getElementById('hotels-tbody');
  tbody.innerHTML = '';

  const rows = adminDB.hotels.filter(h => {
    const matchSearch = !search || h.name.toLowerCase().includes(search) || h.location.toLowerCase().includes(search);
    const matchFilter = !filter || h.location === filter;
    return matchSearch && matchFilter;
  });

  if (!rows.length) { tbody.innerHTML = emptyRow(8); return; }

  rows.forEach(h => {
    const pillClass = h.status === 'Available' ? 'pill-available' : h.status === 'Limited' ? 'pill-limited' : 'pill-soldout';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${h.id}</td>
      <td><strong>${h.name}</strong></td>
      <td>${h.location}</td>
      <td class="stars-cell">${'★'.repeat(h.stars)}</td>
      <td>${h.rate}<span style="color:#888;font-size:11px">/night</span></td>
      <td>${h.rooms}</td>
      <td><span class="pill ${pillClass}">${h.status}</span></td>
      <td>
        <div class="tbl-actions">
          <button class="btn-edit"   onclick="editHotel(${h.id})">Edit</button>
          <button class="btn-delete" onclick="deleteHotel(${h.id})">Delete</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function editHotel(id) {
  const h = adminDB.hotels.find(x => x.id === id);
  if (!h) return;
  openModal('hotels-edit', h);
}

function deleteHotel(id) {
  if (!confirm('Delete this hotel?')) return;
  adminDB.hotels = adminDB.hotels.filter(x => x.id !== id);
  renderHotelsTable();
  renderDashboard();
  showToast('Hotel deleted.', 'success');
}

// ──────────────────────────────────────────
//  FLIGHTS TABLE
// ──────────────────────────────────────────

function renderFlightsTable() {
  const search = (document.getElementById('flights-search')?.value || '').toLowerCase();
  const filter = document.getElementById('flights-filter')?.value || '';
  const tbody = document.getElementById('flights-tbody');
  tbody.innerHTML = '';

  const rows = adminDB.flights.filter(f => {
    const matchSearch = !search || f.airline.toLowerCase().includes(search) || f.flightNo.toLowerCase().includes(search) || f.route.toLowerCase().includes(search);
    const matchFilter = !filter || f.route === filter;
    return matchSearch && matchFilter;
  });

  if (!rows.length) { tbody.innerHTML = emptyRow(9); return; }

  rows.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${f.id}</td>
      <td><strong>${f.airline}</strong></td>
      <td>${f.flightNo}</td>
      <td>${f.route}</td>
      <td>${f.depart}</td>
      <td>${f.arrive}</td>
      <td><strong style="color:var(--teal)">${f.price}</strong></td>
      <td>${f.seats}</td>
      <td>
        <div class="tbl-actions">
          <button class="btn-edit"   onclick="editFlight(${f.id})">Edit</button>
          <button class="btn-delete" onclick="deleteFlight(${f.id})">Delete</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function editFlight(id) {
  const f = adminDB.flights.find(x => x.id === id);
  if (!f) return;
  openModal('flights-edit', f);
}

function deleteFlight(id) {
  if (!confirm('Delete this flight?')) return;
  adminDB.flights = adminDB.flights.filter(x => x.id !== id);
  renderFlightsTable();
  renderDashboard();
  showToast('Flight deleted.', 'success');
}

// ──────────────────────────────────────────
//  TRANSPORT TABLE
// ──────────────────────────────────────────

function renderTransportTable() {
  const search = (document.getElementById('transport-search')?.value || '').toLowerCase();
  const filter = document.getElementById('transport-filter')?.value || '';
  const tbody = document.getElementById('transport-tbody');
  tbody.innerHTML = '';

  const rows = adminDB.transport.filter(t => {
    const matchSearch = !search ||
      t.operator.toLowerCase().includes(search) ||
      t.route.toLowerCase().includes(search) ||
      t.type.toLowerCase().includes(search);
    const matchFilter = !filter || t.type === filter;
    return matchSearch && matchFilter;
  });

  if (!rows.length) { tbody.innerHTML = emptyRow(9); return; }

  rows.forEach(t => {
    const pillClass = t.status === 'Active' ? 'pill-available' : t.status === 'Limited' ? 'pill-limited' : 'pill-soldout';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${t.id}</td>
      <td><strong>${t.operator}</strong></td>
      <td>${t.type}</td>
      <td>${t.route}</td>
      <td>${t.capacity} pax</td>
      <td><strong style="color:var(--teal)">${t.rate}</strong></td>
      <td style="font-size:12px;color:var(--text-light)">${t.schedule}</td>
      <td><span class="pill ${pillClass}">${t.status}</span></td>
      <td>
        <div class="tbl-actions">
          <button class="btn-edit"   onclick="editTransport(${t.id})">Edit</button>
          <button class="btn-delete" onclick="deleteTransport(${t.id})">Delete</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function editTransport(id) {
  const t = adminDB.transport.find(x => x.id === id);
  if (!t) return;
  openModal('transport-edit', t);
}

function deleteTransport(id) {
  if (!confirm('Delete this transport option?')) return;
  adminDB.transport = adminDB.transport.filter(x => x.id !== id);
  renderTransportTable();
  renderDashboard();
  showToast('Transport deleted.', 'success');
}

// ──────────────────────────────────────────
//  BOOKINGS TABLE
// ──────────────────────────────────────────

function renderBookingsTable() {
  const search = (document.getElementById('bookings-search')?.value || '').toLowerCase();
  const filter = document.getElementById('bookings-filter')?.value || '';
  const tbody = document.getElementById('bookings-tbody');
  tbody.innerHTML = '';

  const rows = adminDB.bookings.filter(b => {
    const matchSearch = !search || b.guest.toLowerCase().includes(search) || b.property.toLowerCase().includes(search) || b.ref.toLowerCase().includes(search) || (b.email || '').toLowerCase().includes(search);
    const matchFilter = !filter || b.type === filter;
    return matchSearch && matchFilter;
  });

  if (!rows.length) { tbody.innerHTML = emptyRow(9); return; }

  rows.forEach(b => {
    const pillClass   = b.status === 'Confirmed' ? 'pill-confirmed' : b.status === 'Pending' ? 'pill-pending' : 'pill-cancelled';
    const isCancelled = b.status === 'Cancelled';
    const isConfirmed = b.status === 'Confirmed';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong class="booking-ref">${b.ref}</strong></td>
      <td>
        <div class="booking-guest-name">${b.guest}</div>
        <div class="booking-email">${b.email || '—'}</div>
      </td>
      <td>${b.type}</td>
      <td>${b.property}</td>
      <td>${b.checkin}</td>
      <td>${b.guests}</td>
      <td><strong>${b.total}</strong></td>
      <td><span class="pill ${pillClass}">${b.status}</span></td>
      <td>
        <div class="tbl-actions">
          ${!isConfirmed  ? `<button class="btn-edit" onclick="updateBookingStatus('${b.ref}','Confirmed')">Confirm</button>`  : ''}
          ${!isCancelled  ? `<button class="btn-delete" onclick="updateBookingStatus('${b.ref}','Cancelled')">Cancel</button>` : ''}
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function updateBookingStatus(ref, newStatus) {
  const label = newStatus === 'Confirmed' ? 'confirm' : 'cancel';
  if (!confirm(`Are you sure you want to ${label} booking ${ref}?`)) return;
  const idx = adminDB.bookings.findIndex(b => b.ref === ref);
  if (idx < 0) return;
  adminDB.bookings[idx].status = newStatus;
  renderBookingsTable();
  renderBookingHistoryTable();
  renderDashboard();
  showToast(`Booking ${ref} ${newStatus.toLowerCase()}.`, newStatus === 'Confirmed' ? 'success' : 'error');
}

// ──────────────────────────────────────────
//  BOOKING HISTORY TABLE (All bookings, read-only)
// ──────────────────────────────────────────

function renderBookingHistoryTable() {
  const search       = (document.getElementById('history-search')?.value || '').toLowerCase();
  const typeFilter   = document.getElementById('history-type-filter')?.value || '';
  const statusFilter = document.getElementById('history-status-filter')?.value || '';
  const tbody = document.getElementById('history-tbody');
  tbody.innerHTML = '';

  const rows = adminDB.bookings.filter(b => {
    const matchSearch = !search ||
      b.guest.toLowerCase().includes(search) ||
      b.property.toLowerCase().includes(search) ||
      b.ref.toLowerCase().includes(search) ||
      (b.email || '').toLowerCase().includes(search);
    const matchType   = !typeFilter   || b.type   === typeFilter;
    const matchStatus = !statusFilter || b.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  if (!rows.length) { tbody.innerHTML = emptyRow(8); return; }

  rows.forEach(b => {
    const pillClass = b.status === 'Confirmed' ? 'pill-confirmed' : b.status === 'Pending' ? 'pill-pending' : 'pill-cancelled';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong class="booking-ref">${b.ref}</strong></td>
      <td>
        <div class="booking-guest-name">${b.guest}</div>
        <div class="booking-email">${b.email || '—'}</div>
      </td>
      <td>${b.type}</td>
      <td>${b.property}</td>
      <td>${b.checkin}</td>
      <td>${b.guests}</td>
      <td><strong>${b.total}</strong></td>
      <td><span class="pill ${pillClass}">${b.status}</span></td>`;
    tbody.appendChild(tr);
  });
}

// ──────────────────────────────────────────
//  FEEDBACK TABLE
// ──────────────────────────────────────────

function renderFeedbackTable() {
  const search = (document.getElementById('feedback-search')?.value || '').toLowerCase();
  const filter = document.getElementById('feedback-filter')?.value || '';
  const tbody = document.getElementById('feedback-tbody');
  tbody.innerHTML = '';

  const rows = adminDB.feedback.filter(f => {
    const matchSearch = !search || f.name.toLowerCase().includes(search) || f.destination.toLowerCase().includes(search) || f.text.toLowerCase().includes(search);
    const matchFilter = !filter || f.category === filter;
    return matchSearch && matchFilter;
  });

  if (!rows.length) { tbody.innerHTML = emptyRow(7); return; }

  rows.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>#${f.id}</td>
      <td><strong>${f.name}</strong></td>
      <td>${f.destination}</td>
      <td>${f.category}</td>
      <td class="stars-cell">${'★'.repeat(f.rating)}</td>
      <td><div class="review-cell" title="${f.text}">${f.text}</div></td>
      <td>
        <div class="tbl-actions">
          <button class="btn-view"   onclick="viewFeedback(${f.id})">View</button>
          <button class="btn-delete" onclick="deleteFeedback(${f.id})">Delete</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function viewFeedback(id) {
  const f = adminDB.feedback.find(x => x.id === id);
  if (!f) return;
  document.getElementById('modal-title').textContent = `Feedback #${f.id}`;
  document.getElementById('modal-body').innerHTML = `
    <div style="margin-bottom:14px">
      <div style="font-weight:700;font-size:16px;color:var(--dark)">${f.name}</div>
      <div style="color:var(--text-light);font-size:13px;margin-top:2px">${f.destination} · ${f.category}</div>
    </div>
    <div style="margin-bottom:16px;font-size:22px;color:var(--gold)">${'★'.repeat(f.rating)}</div>
    <p style="line-height:1.7;color:var(--text);font-size:14.5px">"${f.text}"</p>
    <div class="modal-actions">
      <button class="btn-modal-cancel" onclick="closeModal()">Close</button>
      <button class="btn-modal-delete" onclick="deleteFeedback(${f.id});closeModal()">Delete Review</button>
    </div>`;
  document.getElementById('modal-overlay').style.display = 'flex';
}

function deleteFeedback(id) {
  if (!confirm('Delete this feedback?')) return;
  adminDB.feedback = adminDB.feedback.filter(x => x.id !== id);
  renderFeedbackTable();
  renderDashboard();
  showToast('Feedback deleted.', 'success');
}

// ──────────────────────────────────────────
//  MODAL SYSTEM
// ──────────────────────────────────────────

function openModal(type, data) {
  const overlay = document.getElementById('modal-overlay');
  const title   = document.getElementById('modal-title');
  const body    = document.getElementById('modal-body');
  const isEdit  = !!data;

  if (type === 'tourism' || type === 'tourism-edit') {
    title.textContent = isEdit ? 'Edit Destination' : 'Add Destination';
    body.innerHTML = tourismForm(data);
  } else if (type === 'hotels' || type === 'hotels-edit') {
    title.textContent = isEdit ? 'Edit Hotel' : 'Add Hotel';
    body.innerHTML = hotelForm(data);
  } else if (type === 'flights' || type === 'flights-edit') {
    title.textContent = isEdit ? 'Edit Flight' : 'Add Flight';
    body.innerHTML = flightForm(data);
  } else if (type === 'transport' || type === 'transport-edit') {
    title.textContent = isEdit ? 'Edit Transport' : 'Add Transport';
    body.innerHTML = transportForm(data);
  }

  overlay.style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}

function closeModalOverlay(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

// ── Tourism Form ──
function tourismForm(d) {
  const v = d || {};
  return `
  <div class="modal-form">
    <div class="form-row">
      <div class="form-group">
        <label>Destination Name</label>
        <input id="f-name" value="${v.name||''}" placeholder="e.g. Nacpan Beach" />
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="f-category">
          ${['Island','Beach','Diving','Cave','Lagoon','Wildlife','Cultural','Adventure'].map(c=>`<option ${v.category===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Location</label>
        <input id="f-location" value="${v.location||''}" placeholder="e.g. El Nido" />
      </div>
      <div class="form-group">
        <label>Rating (0–5)</label>
        <input id="f-rating" type="number" min="0" max="5" step="0.1" value="${v.rating||4.5}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Entry Fee</label>
        <input id="f-entry" value="${v.entry||'Free'}" placeholder="e.g. ₱150" />
      </div>
      <div class="form-group">
        <label>Best Season</label>
        <input id="f-best" value="${v.best||'Nov–May'}" placeholder="e.g. Nov–May" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Duration</label>
        <select id="f-duration">
          ${['Half Day','Full Day','2-3 Hours','Multi-day','2-3 Days'].map(c=>`<option ${v.duration===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Difficulty</label>
        <select id="f-difficulty">
          ${['Easy','Moderate','Advanced'].map(c=>`<option ${v.difficulty===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row full">
      <div class="form-group">
        <label>Description</label>
        <textarea id="f-desc" rows="3" placeholder="Describe the destination...">${v.desc||''}</textarea>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn-modal-cancel" onclick="closeModal()">Cancel</button>
      ${d ? `<button class="btn-modal-delete" onclick="deleteTourism(${d.id});closeModal()">Delete</button>` : ''}
      <button class="btn-modal-save" onclick="saveTourism(${d?d.id:0})">${d?'Save Changes':'Add Destination'}</button>
    </div>
  </div>`;
}

function saveTourism(id) {
  const name     = document.getElementById('f-name').value.trim();
  const category = document.getElementById('f-category').value;
  const location = document.getElementById('f-location').value.trim();
  const rating   = parseFloat(document.getElementById('f-rating').value);
  const entry    = document.getElementById('f-entry').value.trim();
  const best     = document.getElementById('f-best').value.trim();
  const duration = document.getElementById('f-duration').value;
  const difficulty = document.getElementById('f-difficulty').value;
  const desc     = document.getElementById('f-desc').value.trim();

  if (!name || !location) { showToast('Name and location are required.', 'error'); return; }

  if (id) {
    const idx = adminDB.tourism.findIndex(x => x.id === id);
    if (idx >= 0) adminDB.tourism[idx] = { id, name, category, location, rating, entry, best, duration, difficulty, desc };
    showToast('Destination updated!', 'success');
  } else {
    adminDB.tourism.push({ id: nextIds.tourism++, name, category, location, rating, entry, best, duration, difficulty, desc });
    showToast('Destination added!', 'success');
  }

  closeModal();
  renderTourismTable();
  renderDashboard();
}

// ── Hotel Form ──
function hotelForm(h) {
  const v = h || {};
  return `
  <div class="modal-form">
    <div class="form-row">
      <div class="form-group">
        <label>Property Name</label>
        <input id="h-name" value="${v.name||''}" placeholder="Hotel name" />
      </div>
      <div class="form-group">
        <label>Location</label>
        <select id="h-location">
          ${['Puerto Princesa','El Nido','Coron','Port Barton','San Vicente'].map(l=>`<option ${v.location===l?'selected':''}>${l}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Star Rating</label>
        <select id="h-stars">
          ${[1,2,3,4,5].map(s=>`<option value="${s}" ${v.stars===s?'selected':''}>${s} Star${s>1?'s':''}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Base Rate / Night</label>
        <input id="h-rate" value="${v.rate||'₱3,500'}" placeholder="e.g. ₱3,500" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Rooms Available</label>
        <input id="h-rooms" type="number" min="0" value="${v.rooms!==undefined?v.rooms:10}" />
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="h-status">
          ${['Available','Limited','Sold Out'].map(s=>`<option ${v.status===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Email</label>
        <input id="h-email" type="email" value="${v.email||''}" placeholder="reservations@hotel.com" />
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input id="h-phone" value="${v.phone||''}" placeholder="+63 48 xxx xxxx" />
      </div>
    </div>
    <div class="form-row full">
      <div class="form-group">
        <label>Description</label>
        <textarea id="h-desc" rows="2" placeholder="Hotel description...">${v.desc||''}</textarea>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn-modal-cancel" onclick="closeModal()">Cancel</button>
      ${h ? `<button class="btn-modal-delete" onclick="deleteHotel(${h.id});closeModal()">Delete</button>` : ''}
      <button class="btn-modal-save" onclick="saveHotel(${h?h.id:0})">${h?'Save Changes':'Add Hotel'}</button>
    </div>
  </div>`;
}

function saveHotel(id) {
  const name    = document.getElementById('h-name').value.trim();
  const location= document.getElementById('h-location').value;
  const stars   = parseInt(document.getElementById('h-stars').value);
  const rate    = document.getElementById('h-rate').value.trim();
  const rooms   = parseInt(document.getElementById('h-rooms').value);
  const status  = document.getElementById('h-status').value;
  const email   = document.getElementById('h-email').value.trim();
  const phone   = document.getElementById('h-phone').value.trim();
  const desc    = document.getElementById('h-desc').value.trim();

  if (!name) { showToast('Hotel name is required.', 'error'); return; }

  if (id) {
    const idx = adminDB.hotels.findIndex(x => x.id === id);
    if (idx >= 0) adminDB.hotels[idx] = { id, name, location, stars, rate, rooms, status, email, phone, desc };
    showToast('Hotel updated!', 'success');
  } else {
    adminDB.hotels.push({ id: nextIds.hotels++, name, location, stars, rate, rooms, status, email, phone, desc });
    showToast('Hotel added!', 'success');
  }

  closeModal();
  renderHotelsTable();
  renderDashboard();
}

// ── Flight Form ──
function flightForm(f) {
  const v = f || {};
  const routes = ['MNL → PPS','MNL → ENI','MNL → USU','CEB → PPS','CEB → USU'];
  const classes = ['Economy','Business','First Class'];
  return `
  <div class="modal-form">
    <div class="form-row">
      <div class="form-group">
        <label>Airline</label>
        <input id="fl-airline" value="${v.airline||''}" placeholder="e.g. Cebu Pacific" />
      </div>
      <div class="form-group">
        <label>Flight Number</label>
        <input id="fl-no" value="${v.flightNo||''}" placeholder="e.g. 5J 399" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Route</label>
        <select id="fl-route">
          ${routes.map(r=>`<option ${v.route===r?'selected':''}>${r}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Class</label>
        <select id="fl-class">
          ${classes.map(c=>`<option ${v.class===c?'selected':''}>${c}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Depart Time</label>
        <input id="fl-depart" type="time" value="${v.depart||'08:00'}" />
      </div>
      <div class="form-group">
        <label>Arrive Time</label>
        <input id="fl-arrive" type="time" value="${v.arrive||'09:30'}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Price (PHP)</label>
        <input id="fl-price" value="${v.price||'₱2,999'}" placeholder="e.g. ₱2,999" />
      </div>
      <div class="form-group">
        <label>Seats Available</label>
        <input id="fl-seats" type="number" min="0" value="${v.seats!==undefined?v.seats:80}" />
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn-modal-cancel" onclick="closeModal()">Cancel</button>
      ${f ? `<button class="btn-modal-delete" onclick="deleteFlight(${f.id});closeModal()">Delete</button>` : ''}
      <button class="btn-modal-save" onclick="saveFlight(${f?f.id:0})">${f?'Save Changes':'Add Flight'}</button>
    </div>
  </div>`;
}

function saveFlight(id) {
  const airline  = document.getElementById('fl-airline').value.trim();
  const flightNo = document.getElementById('fl-no').value.trim();
  const route    = document.getElementById('fl-route').value;
  const cls      = document.getElementById('fl-class').value;
  const depart   = document.getElementById('fl-depart').value;
  const arrive   = document.getElementById('fl-arrive').value;
  const price    = document.getElementById('fl-price').value.trim();
  const seats    = parseInt(document.getElementById('fl-seats').value);

  if (!airline || !flightNo) { showToast('Airline and flight number are required.', 'error'); return; }

  if (id) {
    const idx = adminDB.flights.findIndex(x => x.id === id);
    if (idx >= 0) adminDB.flights[idx] = { id, airline, flightNo, route, class: cls, depart, arrive, price, seats };
    showToast('Flight updated!', 'success');
  } else {
    adminDB.flights.push({ id: nextIds.flights++, airline, flightNo, route, class: cls, depart, arrive, price, seats });
    showToast('Flight added!', 'success');
  }

  closeModal();
  renderFlightsTable();
  renderDashboard();
}

// ── Transport Form ──
function transportForm(t) {
  const v = t || {};
  const types    = ['Van','Tricycle','Shuttle','Jeepney','Speedboat','Ferry','Motorcycle'];
  const statuses = ['Active','Limited','Inactive'];
  return `
  <div class="modal-form">
    <div class="form-row">
      <div class="form-group">
        <label>Operator Name</label>
        <input id="tr-operator" value="${v.operator||''}" placeholder="e.g. Palawan Express" />
      </div>
      <div class="form-group">
        <label>Vehicle Type</label>
        <select id="tr-type">
          ${types.map(tp=>`<option ${v.type===tp?'selected':''}>${tp}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row full">
      <div class="form-group">
        <label>Route</label>
        <input id="tr-route" value="${v.route||''}" placeholder="e.g. Puerto Princesa → El Nido" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Passenger Capacity</label>
        <input id="tr-capacity" type="number" min="1" value="${v.capacity||10}" />
      </div>
      <div class="form-group">
        <label>Rate</label>
        <input id="tr-rate" value="${v.rate||'₱500/person'}" placeholder="e.g. ₱500/person" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Schedule</label>
        <input id="tr-schedule" value="${v.schedule||'6:00 AM, 12:00 PM'}" placeholder="e.g. 6:00 AM, 12:00 PM" />
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="tr-status">
          ${statuses.map(s=>`<option ${v.status===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn-modal-cancel" onclick="closeModal()">Cancel</button>
      ${t ? `<button class="btn-modal-delete" onclick="deleteTransport(${t.id});closeModal()">Delete</button>` : ''}
      <button class="btn-modal-save" onclick="saveTransport(${t?t.id:0})">${t?'Save Changes':'Add Transport'}</button>
    </div>
  </div>`;
}

function saveTransport(id) {
  const operator = document.getElementById('tr-operator').value.trim();
  const type     = document.getElementById('tr-type').value;
  const route    = document.getElementById('tr-route').value.trim();
  const capacity = parseInt(document.getElementById('tr-capacity').value);
  const rate     = document.getElementById('tr-rate').value.trim();
  const schedule = document.getElementById('tr-schedule').value.trim();
  const status   = document.getElementById('tr-status').value;

  if (!operator || !route) { showToast('Operator name and route are required.', 'error'); return; }

  if (id) {
    const idx = adminDB.transport.findIndex(x => x.id === id);
    if (idx >= 0) adminDB.transport[idx] = { id, operator, type, route, capacity, rate, schedule, status };
    showToast('Transport updated!', 'success');
  } else {
    adminDB.transport.push({ id: nextIds.transport++, operator, type, route, capacity, rate, schedule, status });
    showToast('Transport added!', 'success');
  }

  closeModal();
  renderTransportTable();
  renderDashboard();
}

// ──────────────────────────────────────────
//  HELPERS
// ──────────────────────────────────────────

function starsStr(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function emptyRow(cols) {
  return `<tr><td colspan="${cols}">
    <div class="empty-state">
      <div class="empty-icon">🔍</div>
      <p>No records found.</p>
    </div>
  </td></tr>`;
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => { toast.className = 'toast'; }, 3200);
}

function updateTopbarDate() {
  const el = document.getElementById('topbar-date');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-PH', { weekday:'short', year:'numeric', month:'short', day:'numeric' });
}

// ──────────────────────────────────────────
//  INIT
// ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  updateTopbarDate();
  renderDashboard();
});
