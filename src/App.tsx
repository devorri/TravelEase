import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Destinations from './pages/Destinations.tsx';
import Hotels from './pages/Hotels.tsx';
import Flights from './pages/Flights.tsx';
import Transport from './pages/Transport.tsx';
import Feedback from './pages/Feedback.tsx';
import Admin from './pages/Admin.tsx';
import MyBookings from './pages/MyBookings.tsx';
import MapViewer from './pages/MapViewer.tsx';
import { useAuth } from './context/AuthContext.tsx';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  if (loading) {
    return <div className="loading-screen">Loading TravelEase...</div>;
  }

  return (
    <div className={`app-container ${isAdminPage ? 'admin-mode' : ''}`}>
      {!isAdminPage && <Navbar />}
      <main className={isAdminPage ? 'admin-main' : 'content'}>
        <Routes>
          <Route path="/" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Home />} />
          <Route path="/login" element={!user ? <Login /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/" />)} />
          <Route path="/destinations" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Destinations />} />
          <Route path="/hotels" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Hotels />} />
          <Route path="/flights" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Flights />} />
          <Route path="/transport" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Transport />} />
          <Route path="/feedback" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Feedback />} />
          <Route path="/map" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <MapViewer />} />
          <Route path="/my-bookings" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <MyBookings />} />
          <Route 
            path="/admin" 
            element={user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default App;
