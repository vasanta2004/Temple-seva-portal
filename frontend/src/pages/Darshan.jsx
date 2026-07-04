import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Calendar, Bell, Share2, Users, CheckCircle2, Clock, Loader2, Sparkles, Ticket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DarshanService from '../services/DarshanService';

const TIME_SLOTS = [
  '06:00 AM - 07:00 AM',
  '07:00 AM - 08:00 AM',
  '08:00 AM - 09:00 AM',
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM',
  '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM',
  '08:00 PM - 09:00 PM'
];

const Darshan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('stream'); // 'stream' or 'booking'
  const [isPlaying, setIsPlaying] = useState(false);
  const playlist = ['/new.mp4', '/22.mp4'];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Booking states
  const [bookingDate, setBookingDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[3]); // Default 09:00 AM
  const [gotra, setGotra] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [devoteeName, setDevoteeName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [successBooking, setSuccessBooking] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch availability when date or slot changes
  useEffect(() => {
    if (activeTab === 'booking') {
      checkSlotAvailability();
    }
  }, [bookingDate, selectedSlot, activeTab]);

  // Update devotee name if user loads after mount
  useEffect(() => {
    if (user) {
      setDevoteeName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const checkSlotAvailability = async () => {
    try {
      const res = await DarshanService.getAvailability(bookingDate, selectedSlot);
      setAvailability(res.data);
    } catch (err) {
      console.error('Failed to get availability:', err);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Verify availability first
      const checkRes = await DarshanService.getAvailability(bookingDate, selectedSlot);
      if (checkRes.data.available < groupSize) {
        setErrorMsg(`Not enough slots available! Only ${checkRes.data.available} slots left.`);
        setLoading(false);
        return;
      }

      // 2. Book
      const bookingData = {
        userId: user.id,
        devoteeName,
        email,
        bookingDate,
        slotTime: selectedSlot,
        gotra: gotra || 'Not Specified',
        groupSize,
        status: 'CONFIRMED'
      };

      const bookRes = await DarshanService.bookSlot(bookingData);
      setSuccessBooking(bookRes.data);
    } catch (err) {
      console.error('Booking failed:', err);
      setErrorMsg('Failed to process entry pass. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 p-2 rounded-full border border-white/10 flex space-x-2">
            <button
              onClick={() => setActiveTab('stream')}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'stream'
                  ? 'bg-primary text-white shadow-glow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Watch Live Stream
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'booking'
                  ? 'bg-primary text-white shadow-glow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Book Entry Pass
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'stream' ? (
            <motion.div
              key="stream-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-10"
            >
              <div className="text-center mb-6">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-secondary font-bold tracking-[0.6em] uppercase text-sm mb-4"
                >
                  Digital Presence of Swami Ji
                </motion.h2>
                <h1 className="text-5xl md:text-8xl font-serif font-black mb-8 divine-text-glow">LIVE <span className="text-secondary">DARSHAN</span></h1>
              </div>

              {/* Player side */}
              <div className="max-w-[450px] mx-auto aspect-[9/16] bg-gray-900 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(139,0,0,0.3)] relative group border-4 border-white/5">
                {isPlaying ? (
                  <video
                    key={currentVideoIndex}
                    className="w-full h-full object-cover"
                    src={playlist[currentVideoIndex]}
                    autoPlay
                    controls
                    onEnded={() => {
                      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
                    }}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <motion.button 
                          onClick={() => setIsPlaying(true)}
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-28 h-28 bg-secondary text-primary rounded-full flex items-center justify-center mb-8 mx-auto divine-glow shadow-[0_0_50px_rgba(212,175,55,0.5)] cursor-pointer"
                        >
                          <Play size={40} fill="currentColor" />
                        </motion.button>
                        <p className="text-3xl font-serif font-bold text-secondary tracking-widest uppercase">Connect Live Darshan</p>
                        <div className="mt-4 flex items-center justify-center space-x-2 text-white/60">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                          <span className="text-sm font-bold uppercase tracking-widest">Connect to Temple Stream</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Controls Overlays */}
                <div className="absolute top-8 left-8 flex items-center space-x-4 bg-red-600 px-6 py-2 rounded-2xl text-xs font-black tracking-[0.2em] animate-pulse shadow-lg pointer-events-none z-20">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>LIVE NOW</span>
                </div>
                
                <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md px-6 py-2 rounded-2xl text-xs font-bold border border-white/10 pointer-events-none z-20">
                  4,281 Devotees Watching
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <div className="w-20 h-20 bg-gradient-to-tr from-primary to-secondary rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl">S</div>
                  <div>
                    <h3 className="font-serif font-bold text-3xl text-secondary">Maha Aarti Darshan</h3>
                    <p className="text-white/60 text-lg">Presided by Sri Siddharoodha Matha Trust</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="p-5 rounded-[1.5rem] bg-white/10 hover:bg-primary transition-all group shadow-xl"><Bell size={24} className="group-hover:scale-125 transition-transform" /></button>
                  <button className="p-5 rounded-[1.5rem] bg-white/10 hover:bg-secondary hover:text-primary transition-all group shadow-xl"><Share2 size={24} className="group-hover:scale-125 transition-transform" /></button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="booking-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-serif font-black mb-4 italic text-luxury">Crowd Control Gateway</h1>
                <p className="text-gray-400 max-w-lg mx-auto">Book your hourly entry slot pass to visit the shrine during peak festival hours.</p>
              </div>

              {!user ? (
                <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-12 text-center max-w-md mx-auto space-y-6">
                  <Ticket size={48} className="mx-auto text-secondary animate-bounce" />
                  <h3 className="text-2xl font-serif font-black">Authentication Required</h3>
                  <p className="text-gray-400 text-sm">Please sign in or register an account to book your crowd entry slots.</p>
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    SIGN IN NOW
                  </button>
                </div>
              ) : successBooking ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto space-y-8"
                >
                  {/* Golden Ticket Pass */}
                  <div className="bg-gradient-to-b from-[#2e1c0c] to-[#120a04] border-2 border-secondary/30 rounded-[3rem] p-8 relative overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.15)]">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
                    
                    {/* Cutout edges styling */}
                    <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-black rounded-full border-r-2 border-secondary/30" />
                    <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-black rounded-full border-l-2 border-secondary/30" />
                    
                    <div className="text-center pb-6 border-b border-white/10">
                      <Sparkles className="text-secondary mx-auto mb-2 animate-pulse" size={24} />
                      <h2 className="font-serif font-black text-2xl tracking-wide text-white uppercase">Siddharoodha Matha</h2>
                      <p className="text-[9px] text-secondary font-black uppercase tracking-[0.35em] mt-1">Divine Darshan Pass</p>
                    </div>

                    <div className="flex justify-center py-8">
                      <div className="bg-white p-3 rounded-2xl border-4 border-secondary/40 shadow-2xl">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${successBooking.id}`} 
                          alt="QR Ticket Code" 
                          className="w-40 h-40"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 font-medium text-xs border-t border-dashed border-white/20 pt-6">
                      <div className="flex justify-between">
                        <span className="text-gray-500">PASS ID:</span>
                        <span className="text-white font-mono font-bold">{successBooking.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Devotee:</span>
                        <span className="text-white">{successBooking.devoteeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Gotra:</span>
                        <span className="text-white">{successBooking.gotra}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Scheduled Date:</span>
                        <span className="text-white font-bold">{successBooking.bookingDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time Slot:</span>
                        <span className="text-secondary font-black">{successBooking.slotTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Group Count:</span>
                        <span className="text-white">{successBooking.groupSize} Persons</span>
                      </div>
                    </div>

                    <div className="mt-8 text-center bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest py-3 rounded-full border border-emerald-500/20 flex items-center justify-center space-x-2">
                      <CheckCircle2 size={14} />
                      <span>Pass Confirmed & Emailed</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSuccessBooking(null);
                      setGotra('');
                      setGroupSize(1);
                    }}
                    className="w-full py-5 bg-white/5 border border-white/10 hover:bg-white/15 text-white rounded-full font-black text-xs uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    BOOK ANOTHER ENTRY PASS
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Form */}
                  <form onSubmit={handleBooking} className="lg:col-span-7 bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6">
                    {errorMsg && (
                      <div className="bg-red-500/10 text-red-400 text-xs font-bold p-4 rounded-2xl border border-red-500/20">
                        {errorMsg}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-4">Devotee Name</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-white/5 border border-white/5 rounded-full py-4 px-6 text-white focus:outline-none focus:border-secondary/30 transition-all font-medium"
                          value={devoteeName}
                          onChange={(e) => setDevoteeName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-4">Gotra</label>
                        <input
                          type="text"
                          placeholder="e.g. Kashyapa"
                          className="w-full bg-white/5 border border-white/5 rounded-full py-4 px-6 text-white focus:outline-none focus:border-secondary/30 transition-all font-medium placeholder-gray-700"
                          value={gotra}
                          onChange={(e) => setGotra(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-4">Visit Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            className="w-full bg-white/5 border border-white/5 rounded-full py-4 px-6 text-white focus:outline-none focus:border-secondary/30 transition-all font-medium"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-4">Time Slot</label>
                        <select
                          className="w-full bg-black border border-white/5 rounded-full py-4 px-6 text-white focus:outline-none focus:border-secondary/30 transition-all font-medium"
                          value={selectedSlot}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-4">Group Size (Including You)</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        required
                        className="w-full bg-white/5 border border-white/5 rounded-full py-4 px-6 text-white focus:outline-none focus:border-secondary/30 transition-all font-medium"
                        value={groupSize}
                        onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all flex items-center justify-center space-x-3 shadow-2xl cursor-pointer"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : (
                        <>
                          <span>SECURE CROWD ENTRANCE PASS</span>
                          <CheckCircle2 size={16} />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Availability Sidebar Info */}
                  <div className="lg:col-span-5 bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6">
                    <h3 className="text-xl font-serif font-black text-secondary italic">Live Capacity Monitor</h3>
                    
                    <div className="space-y-4 font-medium text-sm">
                      <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-gray-500">Selected Slot:</span>
                        <span className="text-white font-mono text-xs">{selectedSlot}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-white/5">
                        <span className="text-gray-500">Capacity Limit:</span>
                        <span className="text-white">100 / Hour</span>
                      </div>

                      {availability ? (
                        <>
                          <div className="flex justify-between items-center py-3 border-b border-white/5">
                            <span className="text-gray-500">Already Booked:</span>
                            <span className="text-secondary font-black">{availability.booked} slots</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-3">
                            <span className="text-gray-500">Available Space:</span>
                            <span className={`font-black ${availability.available > 10 ? 'text-emerald-400' : 'text-amber-400'}`}>
                              {availability.available} slots left
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-center py-4">
                          <Loader2 className="animate-spin text-secondary" size={20} />
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex items-center space-x-2 text-[10px] font-black tracking-widest text-secondary uppercase">
                        <Clock size={14} />
                        <span>Entry Guidelines</span>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-relaxed italic">
                        Please arrive strictly inside your scheduled hour slot. Tickets are scan-verified at the math entrance doors. One booking pass supports a group count of up to 10 family members.
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Darshan;
