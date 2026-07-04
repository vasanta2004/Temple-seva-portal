import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Festivals from './pages/Festivals';
import Schedule from './pages/Schedule';
import Rooms from './pages/Rooms';
import Prasad from './pages/Prasad';
import Dashboard from './pages/Dashboard';
import { PrivacyPolicy, TermsConditions } from './pages/Legal';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Darshan from './pages/Darshan';
import GangaAarti from './pages/GangaAarti';
import Login from './pages/Login';
import Register from './pages/Register';
import Sevas from './pages/Sevas';
import Donation from './pages/Donation';
import Instagram from './pages/Instagram';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import SpiritualBackground from './components/SpiritualBackground';
import AIChatbot from './components/AIChatbot';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop />
      <SpiritualBackground />
      <AIChatbot />
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/prasad" element={<Prasad />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/live-darshan" element={<Darshan />} />
          <Route path="/ganga-aarti" element={<GangaAarti />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sevas" element={<Sevas />} />
          <Route path="/donate" element={<Donation />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
