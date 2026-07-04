import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sunrise, Sun, Moon, Clock, ArrowRight, X, CheckCircle2, Calendar, User, Mail } from 'lucide-react';
import UPIPaymentModal from '../components/UPIPaymentModal';
import AuthService from '../services/AuthService';
import authHeader from '../services/authHeader';
import axios from 'axios';

const SCHEDULE_ITEMS = [
  { id: 'S1', name: 'Suprabhata Seva', desc: 'Morning wake-up ritual', icon: <Sunrise size={20} />, price: 101 },
  { id: 'S2', name: 'Nirmalya Darshan', desc: 'Early morning darshan', icon: <Sunrise size={20} />, price: 51 },
  { id: 'S3', name: 'Abhishekam', desc: 'Sacred bath to the deity', icon: <Sunrise size={20} />, price: 251 },
  { id: 'S4', name: 'Alankara Pooja', desc: 'Decoration of the deity', icon: <Sunrise size={20} />, price: 301 },
  { id: 'S5', name: 'Archana', desc: 'Chanting names of the deity', icon: <Sunrise size={20} />, price: 101 },
  { id: 'S6', name: 'Ashtottara Archana', desc: '108 names recitation', icon: <Sunrise size={20} />, price: 151 },
  { id: 'S7', name: 'Sahasranama Archana', desc: '1000 names recitation', icon: <Sunrise size={20} />, price: 501 },
  { id: 'S8', name: 'Pushpa Pooja', desc: 'Flower offering', icon: <Sunrise size={20} />, price: 201 },
  { id: 'S9', name: 'Deepa Aradhana', desc: 'Lamp worship', icon: <Sun size={20} />, price: 151 },
  { id: 'S10', name: 'Naivedyam', desc: 'Food offering', icon: <Sun size={20} />, price: 251 },
  { id: 'S11', name: 'Maha Mangala Arati', desc: 'Grand arati', icon: <Sun size={20} />, price: 201 },
  { id: 'S12', name: 'Pradakshina & Namaskara', desc: 'Circumambulation and prayers', icon: <Sun size={20} />, price: 51 },
  { id: 'S13', name: 'Madhyahna Pooja', desc: 'Noon pooja', icon: <Sun size={20} />, price: 251 },
  { id: 'S14', name: 'Sayankala Pooja', desc: 'Evening pooja', icon: <Moon size={20} />, price: 151 },
  { id: 'S15', name: 'Sandhya Arati', desc: 'Sunset arati', icon: <Moon size={20} />, price: 101 },
  { id: 'S16', name: 'Dolotsava/Unjal Seva', desc: 'Swing service (if applicable)', icon: <Moon size={20} />, price: 501 },
  { id: 'S17', name: 'Ekanta Seva', desc: 'Night resting ritual for the deity', icon: <Moon size={20} />, price: 501 },
  { id: 'S18', name: 'Shayana Arati', desc: 'Final night arati', icon: <Moon size={20} />, price: 101 }
];

const Schedule = () => {
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Booking form state
  const [bookingDate, setBookingDate] = useState('');
  const [devoteeName, setDevoteeName] = useState('');
  const [devoteeEmail, setDevoteeEmail] = useState('');

  const handleBookClick = (pooja) => {
    setSelectedPooja(pooja);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
    
    const user = AuthService.getCurrentUser();
    if (user) {
      setDevoteeName(user.name);
      setDevoteeEmail(user.email);
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate || !devoteeName || !devoteeEmail) {
      alert("Please fill in all details.");
      return;
    }
    setShowUPIModal(true);
  };

  const handlePaymentSuccess = () => {
    const currentUser = AuthService.getCurrentUser();
    
    const bookingData = {
      userId: currentUser?.id || null,
      email: devoteeEmail,
      userName: devoteeName,
      sevaDate: bookingDate,
      sevas: [{
        id: selectedPooja.id,
        title: selectedPooja.name,
        price: selectedPooja.price
      }],
      totalAmount: selectedPooja.price
    };

    axios.post('http://localhost:8080/api/bookings/book', bookingData, { headers: authHeader() })
      .then(res => console.log("Daily Pooja booking recorded", res.data))
      .catch(err => console.error("Failed to post daily pooja booking", err));

    setShowUPIModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-surface pt-40 pb-20 overflow-hidden relative text-white">
      {/* Abstract Decorative Background elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Controls */}
        <div className="space-y-4 mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-secondary text-base font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-2"
          >
            <Clock size={18} />
            <span>Sacred Timings</span>
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-black text-white italic"
          >
            Daily Pooja <span className="text-luxury">Schedule.</span>
          </motion.h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Experience the divine rhythm of the temple through our daily rituals and offerings from early dawn to night.
          </p>
        </div>

        {/* Schedule List */}
        <div className="space-y-6">
          {SCHEDULE_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-prism p-6 md:p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-secondary/30 transition-all duration-300 flex items-center space-x-6 group"
            >
              <div className="w-14 h-14 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-black transition-colors shadow-inner">
                {item.icon}
              </div>
              <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-black text-white italic mb-1 group-hover:text-secondary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-0">
                    {item.desc}
                  </p>
                </div>
                
                <div className="flex flex-col items-end w-full md:w-auto">
                  <p className="text-2xl font-serif font-black text-secondary italic mb-2">₹{item.price}</p>
                  <button
                    onClick={() => handleBookClick(item)}
                    className="px-6 py-2.5 rounded-full font-black uppercase tracking-widest text-xs bg-white/5 border border-white/10 text-white hover:bg-secondary hover:text-primary transition-all flex items-center space-x-2"
                  >
                    <span>Book Seva</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Booking Modal */}
      {selectedPooja && !showSuccessModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0B0D11]/90 backdrop-blur-2xl" onClick={() => setSelectedPooja(null)} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#0F1115]/95 rounded-[3rem] p-10 max-w-lg w-full relative z-[201] shadow-5xl border border-white/10 overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPooja(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all z-25"
            >
              <X size={20} />
            </button>

            <div className="space-y-6 relative z-10">
               <div className="space-y-2">
                  <h3 className="text-3xl font-serif font-black text-white italic leading-none">Book <br /> <span className="text-luxury">Ritual.</span></h3>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">Reserve {selectedPooja.name}</p>
               </div>
               
               <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                 <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 block">Devotee Name</label>
                   <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-xl p-3 focus-within:border-secondary hover:bg-white/10">
                     <input 
                       type="text" 
                       required
                       value={devoteeName} 
                       onChange={(e) => setDevoteeName(e.target.value)} 
                       className="w-full bg-transparent text-white font-bold outline-none text-sm pr-8" 
                     />
                     <User size={14} className="absolute right-3.5 text-secondary pointer-events-none group-hover:scale-110 transition-transform" />
                   </div>
                 </div>

                 <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 block">Email Address</label>
                   <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-xl p-3 focus-within:border-secondary hover:bg-white/10">
                     <input 
                       type="email" 
                       required
                       value={devoteeEmail} 
                       onChange={(e) => setDevoteeEmail(e.target.value)} 
                       className="w-full bg-transparent text-white font-bold outline-none text-sm pr-8" 
                     />
                     <Mail size={14} className="absolute right-3.5 text-secondary pointer-events-none group-hover:scale-110 transition-transform" />
                   </div>
                 </div>

                 <div className="space-y-1.5">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 block">Date of Seva</label>
                   <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-xl p-3 focus-within:border-secondary hover:bg-white/10">
                     <input 
                       type="date" 
                       required
                       value={bookingDate} 
                       onChange={(e) => setBookingDate(e.target.value)} 
                       className="w-full bg-transparent text-white font-bold outline-none text-sm cursor-pointer pr-8 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full" 
                     />
                     <Calendar size={14} className="absolute right-3.5 text-secondary pointer-events-none group-hover:scale-110 transition-transform" />
                   </div>
                 </div>

                 {/* Calculation summary block */}
                 <div className="p-5 bg-gradient-to-r from-primary/80 to-[#1e299c]/90 rounded-2xl text-white flex justify-between items-center border border-white/5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                       <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Contribution</p>
                       <p className="text-2xl font-serif font-black italic text-secondary divine-glow">₹{selectedPooja.price}</p>
                    </div>
                    <button 
                      type="submit"
                      className="relative z-10 bg-secondary text-primary px-6 py-3 rounded-lg font-black uppercase tracking-widest text-[9px] hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 cursor-pointer"
                    >
                      Pay via UPI
                    </button>
                 </div>
               </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* UPI Payment Modal Integration */}
      {selectedPooja && (
        <UPIPaymentModal 
          isOpen={showUPIModal}
          onClose={() => setShowUPIModal(false)}
          onSuccess={handlePaymentSuccess}
          amount={selectedPooja.price}
          description={`Daily Pooja: ${selectedPooja.name}`}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && selectedPooja && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-xl" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0F1115]/95 border border-white/10 rounded-[3.5rem] p-12 max-w-md w-full relative z-[401] shadow-4xl text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30 divine-glow animate-bounce">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-serif font-black text-white italic mb-4 leading-none">
              Seva <span className="text-luxury">Booked.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Your offering for <span className="text-white font-bold">{selectedPooja.name}</span> on {bookingDate} is confirmed. May the blessings of Swami Siddharoodha be upon you.
            </p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                setSelectedPooja(null);
              }}
              className="w-full py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-secondary hover:text-primary transition-all shadow-xl cursor-pointer"
            >
              Back to Schedule
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
