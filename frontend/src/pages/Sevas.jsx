import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Clock, Calendar, CheckCircle2, Sparkles, ArrowRight, 
  Loader2, ShoppingCart, Trash2, X, Plus, FileText, Bell, 
  BellOff, Globe, BookOpen, Activity, Flame, Gift, Home, 
  MapPin, User, ChevronRight, UserPlus
} from 'lucide-react';
import { translations } from '../utils/Translation';
import UPIPaymentModal from '../components/UPIPaymentModal';
import AuthService from '../services/AuthService';
import axios from 'axios';
import authHeader from '../services/authHeader';

const Sevas = () => {
  const [lang, setLang] = useState('en'); // 'en' or 'kn'
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'history'
  const [selectedCategory, setSelectedCategory] = useState('dailySevas');
  
  // Cart & Booking States
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(null); // stores booking object
  const [showLiveDarshan, setShowLiveDarshan] = useState(false);

  // Form Fields
  const [gotra, setGotra] = useState('');
  const [nakshatra, setNakshatra] = useState('Ashwini');
  const [rashi, setRashi] = useState('Mesha');
  const [sevaDate, setSevaDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('morning');
  const [familyMembers, setFamilyMembers] = useState([]); // [{ name, relationship, age }]
  const [tempMemberName, setTempMemberName] = useState('');
  const [tempMemberRel, setTempMemberRel] = useState('');
  const [tempMemberAge, setTempMemberAge] = useState('');

  // Persisted Bookings List
  const [bookings, setBookings] = useState([]);
  const [remindersEnabled, setRemindersEnabled] = useState({}); // bookingId -> boolean

  // Nakshatra and Rashi standard lists
  const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", 
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", 
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", 
    "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", 
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
  ];

  const rashis = [
    "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", 
    "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena"
  ];

  // Sevas master catalog
  const sevasCatalog = [
    // Daily Sevas
    { id: 'suprabhata', category: 'dailySevas', titleKey: 'suprabhata', descKey: 'suprabhataDesc', price: 101, time: '05:00 AM' },
    { id: 'morningPooja', category: 'dailySevas', titleKey: 'morningPooja', descKey: 'morningPoojaDesc', price: 151, time: '07:30 AM' },
    { id: 'eveningAarti', category: 'dailySevas', titleKey: 'eveningAarti', descKey: 'eveningAartiDesc', price: 151, time: '06:30 PM' },
    { id: 'deepaSeva', category: 'dailySevas', titleKey: 'deepaSeva', descKey: 'deepaSevaDesc', price: 251, time: '06:00 PM' },
    { id: 'tulasiPooja', category: 'dailySevas', titleKey: 'tulasiPooja', descKey: 'tulasiPoojaDesc', price: 101, time: '08:00 AM' },
    
    // Special Poojas
    { id: 'ganahoma', category: 'specialPoojas', titleKey: 'ganahoma', descKey: 'ganahomaDesc', price: 501, time: '06:30 AM' },
    { id: 'rudrabhisheka', category: 'specialPoojas', titleKey: 'rudrabhisheka', descKey: 'rudrabhishekaDesc', price: 501, time: '08:00 AM' },
    { id: 'satyanarayana', category: 'specialPoojas', titleKey: 'satyanarayana', descKey: 'satyanarayanaDesc', price: 1001, time: '09:30 AM' },
    { id: 'lakshmiPooja', category: 'specialPoojas', titleKey: 'lakshmiPooja', descKey: 'lakshmiPoojaDesc', price: 1001, time: '10:00 AM' },
    { id: 'navagraha', category: 'specialPoojas', titleKey: 'navagraha', descKey: 'navagrahaDesc', price: 751, time: '08:30 AM' },
    { id: 'mahaMangala', category: 'specialPoojas', titleKey: 'mahaMangala', descKey: 'mahaMangalaDesc', price: 251, time: '07:00 PM' },

    // Abhisheka Sevas
    { id: 'milkAbhisheka', category: 'abhishekaSevas', titleKey: 'milkAbhisheka', descKey: 'milkAbhishekaDesc', price: 351, time: '06:00 AM' },
    { id: 'panchamruta', category: 'abhishekaSevas', titleKey: 'panchamruta', descKey: 'panchamrutaDesc', price: 501, time: '07:00 AM' },
    { id: 'honeyAbhisheka', category: 'abhishekaSevas', titleKey: 'honeyAbhisheka', descKey: 'honeyAbhishekaDesc', price: 401, time: '06:30 AM' },
    { id: 'coconutAbhisheka', category: 'abhishekaSevas', titleKey: 'coconutAbhisheka', descKey: 'coconutAbhishekaDesc', price: 301, time: '08:30 AM' },
    { id: 'specialAlankara', category: 'abhishekaSevas', titleKey: 'specialAlankara', descKey: 'specialAlankaraDesc', price: 2501, time: '10:30 AM' },

    // Festival Sevas
    { id: 'ugadi', category: 'festivalSevas', titleKey: 'ugadi', descKey: 'ugadiDesc', price: 501, time: '09:00 AM' },
    { id: 'navaratri', category: 'festivalSevas', titleKey: 'navaratri', descKey: 'navaratriDesc', price: 1501, time: '08:00 AM' },
    { id: 'deepavali', category: 'festivalSevas', titleKey: 'deepavali', descKey: 'deepavaliDesc', price: 1501, time: '06:30 PM' },
    { id: 'ganeshChaturthi', category: 'festivalSevas', titleKey: 'ganeshChaturthi', descKey: 'ganeshChaturthiDesc', price: 501, time: '09:30 AM' },
    { id: 'rathotsava', category: 'festivalSevas', titleKey: 'rathotsava', descKey: 'rathotsavaDesc', price: 5001, time: '04:00 PM' },
    { id: 'brahmotsava', category: 'festivalSevas', titleKey: 'brahmotsava', descKey: 'brahmotsavaDesc', price: 10001, time: '08:00 AM' },

    // Devotee Occasions
    { id: 'birthday', category: 'devoteeOccasions', titleKey: 'birthday', descKey: 'birthdayDesc', price: 251, time: '08:00 AM' },
    { id: 'anniversary', category: 'devoteeOccasions', titleKey: 'anniversary', descKey: 'anniversaryDesc', price: 351, time: '08:30 AM' },
    { id: 'gruhapravesha', category: 'devoteeOccasions', titleKey: 'gruhapravesha', descKey: 'gruhapraveshaDesc', price: 2501, time: '07:30 AM' },
    { id: 'vehiclePooja', category: 'devoteeOccasions', titleKey: 'vehiclePooja', descKey: 'vehiclePoojaDesc', price: 251, time: '10:00 AM' },
    { id: 'naming', category: 'devoteeOccasions', titleKey: 'naming', descKey: 'namingDesc', price: 1001, time: '11:00 AM' },
    { id: 'vidyarambha', category: 'devoteeOccasions', titleKey: 'vidyarambha', descKey: 'vidyarambhaDesc', price: 351, time: '09:00 AM' },

    // Donation Linked
    { id: 'annadanam', category: 'donationLinked', titleKey: 'annadanam', descKey: 'annadanamDesc', price: 1001, time: '12:00 PM' },
    { id: 'gauSeva', category: 'donationLinked', titleKey: 'gauSeva', descKey: 'gauSevaDesc', price: 501, time: '08:00 AM' },
    { id: 'vastradana', category: 'donationLinked', titleKey: 'vastradana', descKey: 'vastradanaDesc', price: 2001, time: '09:00 AM' },
    { id: 'vidyadana', category: 'donationLinked', titleKey: 'vidyadana', descKey: 'vidyadanaDesc', price: 1001, time: '10:00 AM' },
    { id: 'maintenance', category: 'donationLinked', titleKey: 'maintenance', descKey: 'maintenanceDesc', price: 2501, time: '09:00 AM' }
  ];

  // Load bookings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('booked_sevas');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookings, clearing corrupt storage", e);
        localStorage.removeItem('booked_sevas');
      }
    }
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSevaDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const saveBookingsToLocal = (newBookings) => {
    setBookings(newBookings);
    localStorage.setItem('booked_sevas', JSON.stringify(newBookings));
  };

  const handleAddCategoryToCart = (seva) => {
    if (cart.some(item => item.id === seva.id)) {
      setCart(cart.filter(item => item.id !== seva.id));
    } else {
      setCart([...cart, seva]);
    }
  };

  const handleAddFamilyMember = () => {
    if (!tempMemberName || !tempMemberRel || !tempMemberAge) {
      alert("Please enter Name, Relationship, and Age.");
      return;
    }
    setFamilyMembers([...familyMembers, { 
      name: tempMemberName, 
      relationship: tempMemberRel, 
      age: tempMemberAge 
    }]);
    setTempMemberName('');
    setTempMemberRel('');
    setTempMemberAge('');
  };

  const handleRemoveFamilyMember = (idx) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== idx));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!gotra || !gotra.trim()) {
      alert(t.alertRequired);
      return;
    }
    if (cart.length === 0) {
      alert(t.alertEmptyCart);
      return;
    }
    setShowUPIModal(true);
  };

  const handlePaymentSuccess = () => {
    // Generate simulated bookings
    const currentUser = AuthService.getCurrentUser();
    const newBookingObj = {
      id: 'BK-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      date: new Date().toLocaleDateString(),
      sevaDate: sevaDate,
      timeSlot: timeSlot,
      sevas: cart.map(item => ({
        id: item.id,
        title: t[item.titleKey],
        price: item.price
      })),
      totalAmount: cart.reduce((sum, item) => sum + item.price, 0),
      devoteeName: currentUser?.name || 'Devotee',
      gotra: gotra,
      nakshatra: nakshatra,
      rashi: rashi,
      family: familyMembers,
      status: 'CONFIRMED',
      txnId: 'TXN-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      receiptId: 'REC-' + Math.random().toString(36).substr(2, 8).toUpperCase()
    };

    // Post to backend database & send email
    const bookingData = {
      userId: currentUser?.id || null,
      email: currentUser?.email || '',
      userName: currentUser?.name || 'Devotee',
      gotra: gotra,
      nakshatra: nakshatra,
      rashi: rashi,
      sevaDate: sevaDate,
      timeSlot: timeSlot,
      sevas: cart.map(item => ({
        id: item.id,
        title: t[item.titleKey],
        price: item.price
      })),
      totalAmount: cart.reduce((sum, item) => sum + item.price, 0)
    };

    axios.post('http://localhost:8080/api/bookings/book', bookingData, { headers: authHeader() })
      .then(res => {
        console.log("Seva booking successfully synced with server and email sent", res.data);
      })
      .catch(err => {
        console.error("Failed to sync Seva booking with server", err);
      });

    const updated = [newBookingObj, ...bookings];
    saveBookingsToLocal(updated);
    setCart([]);
    setFamilyMembers([]);
    setGotra('');
    setShowUPIModal(false);
    setShowCheckoutModal(false);
    setShowSuccessModal(true);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this Seva and request a refund?")) {
      const updated = bookings.map(b => {
        if (b.id === bookingId) {
          return { ...b, status: 'CANCELLED' };
        }
        return b;
      });
      saveBookingsToLocal(updated);
      alert("Seva cancelled successfully. Refund of full amount will be credited to your source UPI account within 2-3 business days.");
    }
  };

  const toggleReminder = (bookingId) => {
    const active = !remindersEnabled[bookingId];
    setRemindersEnabled({
      ...remindersEnabled,
      [bookingId]: active
    });
    alert(active ? "Reminder alarms enabled! You will receive notification alerts before the Seva." : "Reminders disabled.");
  };

  const totalCartCost = cart.reduce((sum, item) => sum + item.price, 0);

  const categories = [
    { id: 'dailySevas', label: t.dailySevas },
    { id: 'specialPoojas', label: t.specialPoojas },
    { id: 'abhishekaSevas', label: t.abhishekaSevas },
    { id: 'festivalSevas', label: t.festivalSevas },
    { id: 'devoteeOccasions', label: t.devoteeOccasions },
    { id: 'donationLinked', label: t.donationLinked }
  ];

  return (
    <div className="min-h-screen bg-[#040306] pt-40 pb-20 overflow-hidden relative">
      {/* Abstract Decorative Background elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-secondary text-base font-black uppercase tracking-[0.4em]"
            >
              {t.subtitle}
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl font-serif font-black text-white italic"
            >
              {t.title} <span className="text-luxury">Management.</span>
            </motion.h1>
            <p className="text-gray-200 max-w-3xl text-xl font-medium leading-relaxed">
              {t.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
              className="flex items-center space-x-2 px-6 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl transition-all text-white font-black text-sm uppercase tracking-widest"
            >
              <Globe size={16} className="text-secondary" />
              <span>{t.language}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Cart Indicator */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 mb-12 gap-6">
          <div className="flex bg-white/5 p-2 rounded-3xl border border-white/10">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-8 py-5 rounded-2xl text-sm sm:text-base font-black uppercase tracking-widest transition-all ${
                activeTab === 'browse' ? 'bg-primary text-white shadow-xl' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.browseTab}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-8 py-5 rounded-2xl text-sm sm:text-base font-black uppercase tracking-widest transition-all ${
                activeTab === 'history' ? 'bg-primary text-white shadow-xl' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.historyTab} ({bookings.length})
            </button>
          </div>

          {/* Floating Cart Launcher */}
          {activeTab === 'browse' && (
            <button 
              onClick={() => setShowCart(true)}
              className="relative flex items-center space-x-3 px-8 py-5 bg-secondary text-primary rounded-2xl font-black uppercase tracking-widest text-sm sm:text-base hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105"
            >
              <ShoppingCart size={18} />
              <span>{t.cartTitle} ({cart.length})</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-black animate-bounce shadow-md">
                  {cart.length}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Tab content view 1: Browse Sevas */}
        {activeTab === 'browse' && (
          <div className="space-y-12">
            
            {/* Category selection bar */}
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-none custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-6 py-4 rounded-2xl border text-sm sm:text-base font-black uppercase tracking-widest transition-all ${
                    selectedCategory === cat.id 
                      ? 'bg-secondary/20 border-secondary text-secondary shadow-[0_0_10px_rgba(212,175,55,0.15)]' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sevasCatalog.filter(s => s.category === selectedCategory).map((seva, idx) => {
                const isInCart = cart.some(item => item.id === seva.id);
                return (
                  <motion.div
                    key={seva.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className={`glass-prism p-10 rounded-[3rem] group border backdrop-blur-xl transition-all duration-300 flex flex-col relative ${
                      isInCart ? 'border-secondary/40 shadow-[0_0_25px_rgba(212,175,55,0.15)] bg-white/[0.08]' : 'border-white/10 hover:border-secondary/30 bg-white/[0.03] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="absolute top-0 right-8 w-16 h-16 bg-white/5 rounded-b-2xl flex items-center justify-center divine-glow">
                      <Sparkles size={20} className="text-secondary" />
                    </div>

                    <div className="flex-grow space-y-6 pr-6">
                      <div className="space-y-2">
                        <span className="text-sm font-black uppercase tracking-widest text-secondary">
                          {t[seva.category]}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-serif font-black text-white italic group-hover:text-secondary transition-colors line-clamp-1">
                          {t[seva.titleKey]}
                        </h3>
                      </div>

                      <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-medium line-clamp-3">
                        {t[seva.descKey]}
                      </p>

                      <div className="flex items-center text-gray-200 text-sm sm:text-base font-bold uppercase tracking-widest space-x-6">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-secondary" />
                          <span>{seva.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-secondary" />
                          <span>{t.sevaDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-gray-400">{t.contribution}</p>
                        <p className="text-4xl font-serif font-black text-secondary italic">₹{seva.price}</p>
                      </div>
                      <button
                        onClick={() => handleAddCategoryToCart(seva)}
                        className={`px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-sm sm:text-base transition-all flex items-center space-x-2 ${
                          isInCart 
                            ? 'bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white' 
                            : 'bg-primary text-white hover:bg-secondary hover:text-primary shadow-lg'
                        }`}
                      >
                        {isInCart ? t.removeCart : t.addCart}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab content view 2: My Bookings History */}
        {activeTab === 'history' && (
          <div className="glass-prism bg-white/[0.03] backdrop-blur-xl rounded-[3.5rem] p-10 md:p-14 border border-white/10 space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
            <h2 className="text-3xl font-serif font-black text-white italic">{t.historyTitle}</h2>

            {bookings.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <FileText size={48} className="text-gray-600 mx-auto" />
                <p className="text-gray-400 font-black uppercase tracking-widest text-base">{t.noHistory}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map(booking => (
                  <div 
                    key={booking.id} 
                    className="p-8 bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 shadow-lg"
                  >
                    <div className="space-y-4 flex-grow">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-black uppercase tracking-widest text-gray-300">
                          {booking.id}
                        </span>
                        <span className="text-sm font-black uppercase tracking-widest text-gray-400">
                          Booked: {booking.date}
                        </span>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest ${
                          booking.status === 'CONFIRMED' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}>
                          {booking.status === 'CONFIRMED' ? t.confirmed : t.cancelled}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-base font-black uppercase tracking-widest text-secondary">{t.cartTitle}:</h4>
                        <div className="flex flex-wrap gap-3">
                          {booking.sevas.map((s, idx) => (
                            <span key={idx} className="bg-primary/30 border border-primary/20 px-3.5 py-1.5 rounded-xl text-base font-bold text-white">
                              {s.title} (₹{s.price})
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-white/5 text-base text-gray-200">
                        <div>
                          <p className="uppercase tracking-widest text-sm font-black text-gray-400">{t.sevaDate}</p>
                          <p className="font-bold text-white mt-1">{booking.sevaDate} ({booking.timeSlot.toUpperCase()})</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-widest text-sm font-black text-gray-400">{t.devoteeDetails}</p>
                          <p className="font-bold text-white mt-1">{booking.devoteeName}</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-widest text-sm font-black text-gray-400">{t.gotra} / {t.nakshatra}</p>
                          <p className="font-bold text-white mt-1">{booking.gotra} / {booking.nakshatra} ({booking.rashi})</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-widest text-sm font-black text-gray-400">{t.familyMembers}</p>
                          <p className="font-bold text-white mt-1">{booking.family.length} Members</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap lg:flex-col items-stretch lg:items-end gap-3 w-full lg:w-auto">
                      <div className="text-left lg:text-right mb-2 lg:mb-0">
                        <p className="text-sm font-black uppercase tracking-widest text-gray-400">{t.grandTotal}</p>
                        <p className="text-5xl font-serif font-black text-secondary italic">₹{booking.totalAmount}</p>
                      </div>

                      <div className="flex flex-wrap lg:flex-row gap-3 w-full lg:w-auto">
                        <button
                          onClick={() => setShowReceiptModal(booking)}
                          className="flex-1 py-4 px-8 bg-white/5 border border-white/10 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/10 hover:text-white transition-all text-gray-300 flex items-center justify-center space-x-2"
                        >
                          <FileText size={14} />
                          <span>{t.receipt}</span>
                        </button>

                        <button
                          onClick={() => toggleReminder(booking.id)}
                          className="py-4 px-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-secondary flex items-center justify-center"
                          title={t.reminderToggle}
                        >
                          {remindersEnabled[booking.id] ? <Bell size={16} className="animate-swing" /> : <BellOff size={16} />}
                        </button>

                        {booking.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="flex-1 py-4 px-8 bg-red-600/10 hover:bg-red-600 border border-red-500/20 text-red-400 hover:text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center space-x-2"
                          >
                            <Trash2 size={14} />
                            <span>{t.cancel}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cart Summary Drawer Panel (Side Slider) */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-[200] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setShowCart(false)}
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-[#09070c]/90 backdrop-blur-2xl border-l border-white/10 h-full relative z-[201] p-10 flex flex-col justify-between shadow-5xl overflow-hidden"
            >
              {/* Backlight Glows */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -z-10" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-[80px] -z-10" />

              <div className="space-y-8 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <h3 className="text-3xl font-serif font-black text-white italic">{t.cartTitle}</h3>
                  <button 
                    onClick={() => setShowCart(false)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="py-20 text-center text-gray-500 font-medium space-y-4">
                    <ShoppingCart size={40} className="mx-auto" />
                    <p className="text-base uppercase tracking-widest font-black">{t.emptyCart}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="p-5 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 flex justify-between items-center group hover:border-secondary transition-all shadow-md">
                        <div className="space-y-1">
                          <h4 className="font-serif font-black italic text-white text-2xl">{t[item.titleKey]}</h4>
                          <p className="text-sm text-secondary font-black uppercase tracking-widest">₹{item.price}</p>
                        </div>
                        <button 
                          onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                          className="p-2 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/5 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-8 border-t border-white/10 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-black uppercase tracking-widest text-sm">{t.grandTotal}</span>
                    <span className="text-6xl font-serif font-black text-secondary italic">₹{totalCartCost}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckoutModal(true);
                    }}
                    className="w-full py-6 bg-secondary text-primary font-black uppercase tracking-widest text-base hover:bg-white transition-all rounded-full flex items-center justify-center space-x-3 shadow-xl shadow-secondary/10"
                  >
                    <span>{t.checkout}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Advanced Checkout Details Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0B0D11]/85 backdrop-blur-2xl" onClick={() => setShowCheckoutModal(false)} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#09070c]/95 backdrop-blur-2xl rounded-[3.5rem] p-10 md:p-12 max-w-2xl w-full relative z-[251] shadow-5xl border border-white/10 overflow-y-auto max-h-[90vh] custom-scrollbar"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
            >
              <X size={24} />
            </button>

            <form onSubmit={handleCheckoutSubmit} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-4xl font-serif font-black text-white italic">{t.devoteeDetails}</h3>
                <p className="text-gray-400 text-base uppercase tracking-widest font-black">Fill in details for sacred rituals alignment</p>
              </div>

              {/* Grid 1: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest block ml-1">{t.gotra}</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Kashyapa"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-secondary transition-all font-bold placeholder:text-gray-600 text-base sm:text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest block ml-1">{t.nakshatra}</label>
                  <select 
                    value={nakshatra}
                    onChange={(e) => setNakshatra(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-secondary cursor-pointer [&>option]:bg-[#0F1115] font-black uppercase tracking-widest text-sm sm:text-base"
                  >
                    {nakshatras.map(star => (
                      <option key={star} value={star}>{star}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest block ml-1">{t.rashi}</label>
                  <select 
                    value={rashi}
                    onChange={(e) => setRashi(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-secondary cursor-pointer [&>option]:bg-[#0F1115] font-black uppercase tracking-widest text-sm sm:text-base"
                  >
                    {rashis.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid 2: Date & Slot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest block ml-1">{t.sevaDate}</label>
                  <input 
                    type="date"
                    required
                    value={sevaDate}
                    onChange={(e) => setSevaDate(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-secondary cursor-pointer font-bold text-base sm:text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest block ml-1">{t.timeSlot}</label>
                  <select 
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-secondary cursor-pointer [&>option]:bg-[#0F1115] font-black uppercase tracking-widest text-sm sm:text-base"
                  >
                    <option value="morning">{t.morning}</option>
                    <option value="afternoon">{t.afternoon}</option>
                    <option value="evening">{t.evening}</option>
                  </select>
                </div>
              </div>

              {/* Family Members Section */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h4 className="text-2xl font-serif font-black text-white italic">{t.familyMembers}</h4>
                
                {/* Inputs for adding member */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-white/[0.02] backdrop-blur-xl p-5 rounded-2xl border border-white/10">
                  <div className="space-y-1">
                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">{t.name}</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh" 
                      value={tempMemberName}
                      onChange={(e) => setTempMemberName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-base outline-none focus:border-secondary font-bold placeholder:text-gray-700" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">{t.relationship}</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Brother" 
                      value={tempMemberRel}
                      onChange={(e) => setTempMemberRel(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-base outline-none focus:border-secondary font-bold placeholder:text-gray-700" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">{t.age}</label>
                    <input 
                      type="number" 
                      placeholder="Age" 
                      value={tempMemberAge}
                      onChange={(e) => setTempMemberAge(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-base outline-none focus:border-secondary font-bold placeholder:text-gray-700" 
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddFamilyMember}
                    className="py-3 bg-secondary text-primary font-black uppercase tracking-widest text-sm hover:bg-white rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md"
                  >
                    <Plus size={14} />
                    <span>{t.addFamily}</span>
                  </button>
                </div>

                {/* Family Members list table */}
                {familyMembers.length > 0 && (
                  <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                    <table className="w-full text-left text-base">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-sm uppercase tracking-widest font-black text-gray-400">
                          <th className="p-4">{t.name}</th>
                          <th className="p-4">{t.relationship}</th>
                          <th className="p-4">{t.age}</th>
                          <th className="p-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {familyMembers.map((member, i) => (
                          <tr key={i} className="border-b border-white/5 text-gray-300 font-bold">
                            <td className="p-4">{member.name}</td>
                            <td className="p-4">{member.relationship}</td>
                            <td className="p-4">{member.age}</td>
                            <td className="p-4 text-right">
                              <button 
                                type="button" 
                                onClick={() => handleRemoveFamilyMember(i)}
                                className="text-red-400 hover:text-red-500 font-black uppercase text-sm"
                              >
                                {t.removeCart}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Total checkout calculation card */}
              <div className="p-6 bg-gradient-to-r from-primary/80 to-[#1e299c]/90 rounded-3xl text-white flex justify-between items-center border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <p className="text-sm font-black uppercase tracking-widest text-gray-400 mb-0.5">{t.grandTotal}</p>
                  <p className="text-5xl font-serif font-black italic text-secondary divine-glow">₹{totalCartCost}</p>
                </div>
                <button 
                  type="submit"
                  className="relative z-10 bg-secondary text-primary px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm sm:text-base hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105"
                >
                  {t.confirmBook}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* UPI Payment Modal integration */}
      <UPIPaymentModal 
        isOpen={showUPIModal}
        onClose={() => setShowUPIModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={totalCartCost}
        description={`Seva Booking Bundle`}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-xl" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#09070c]/95 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] p-12 max-w-md w-full relative z-[401] shadow-4xl text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30 divine-glow">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-serif font-black text-white italic mb-4 leading-none">
              Seva <span className="text-luxury">Manifested.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Your seva booking is complete. All details have been logged in the temple ledger and Swami Siddharoodha's blessings are upon you.
              <br /><br />
              <span className="text-xs text-secondary font-black tracking-wider uppercase block mt-2">
                ✉️ A confirmation email and entry pass have been sent to <span className="text-white normal-case font-bold">{AuthService.getCurrentUser()?.email}</span>.
              </span>
            </p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                setActiveTab('history');
              }}
              className="w-full py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-secondary hover:text-primary transition-all shadow-xl"
            >
              Go to Booking History
            </button>
          </motion.div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={() => setShowReceiptModal(null)} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] p-10 max-w-xl w-full relative z-[301] shadow-5xl text-black"
            id="printable-seva-receipt"
          >
            {/* Close */}
            <button 
              onClick={() => setShowReceiptModal(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-all print:hidden"
            >
              <X size={20} />
            </button>

            {/* Receipt Styling */}
            <div className="space-y-6">
              {/* Temple Title Header */}
              <div className="text-center pb-4 border-b-2 border-dashed border-gray-300">
                <Sparkles size={36} className="text-yellow-600 mx-auto mb-2" />
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900">Sri Siddharoodha Swamy Temple</h2>
                <p className="text-[10px] uppercase font-bold text-gray-500">Hubballi, Karnataka, India</p>
                <p className="text-xs font-bold text-gray-700 mt-2">{t.receipt} - {showReceiptModal.receiptId}</p>
              </div>

              {/* Devotee Details */}
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 font-bold block">{t.name}:</span>
                    <span className="font-black text-gray-900 text-sm">{showReceiptModal.devoteeName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block">{t.gotra} / {t.nakshatra}:</span>
                    <span className="font-black text-gray-900">{showReceiptModal.gotra} / {showReceiptModal.nakshatra} ({showReceiptModal.rashi})</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="text-gray-400 font-bold block">{t.sevaDate}:</span>
                    <span className="font-black text-gray-900">{showReceiptModal.sevaDate} ({showReceiptModal.timeSlot.toUpperCase()})</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block">{t.txnId}:</span>
                    <span className="font-black text-gray-700">{showReceiptModal.txnId}</span>
                  </div>
                </div>
              </div>

              {/* Seva details table */}
              <div className="pt-4 border-t border-gray-200">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-widest text-[9px] font-black">
                      <th className="py-2">Seva Item</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showReceiptModal.sevas.map((s, idx) => (
                      <tr key={idx} className="border-b border-gray-100 font-bold text-gray-800">
                        <td className="py-2.5">{s.title}</td>
                        <td className="py-2.5 text-right">₹{s.price}</td>
                      </tr>
                    ))}
                    <tr className="font-black text-gray-900 border-t-2 border-double border-gray-300">
                      <td className="py-3 text-sm uppercase tracking-wider">{t.grandTotal}</td>
                      <td className="py-3 text-right text-base text-yellow-600">₹{showReceiptModal.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Blessings message */}
              <div className="text-center p-4 bg-yellow-50/50 rounded-xl border border-yellow-200 text-[11px] font-medium text-yellow-800 italic leading-relaxed">
                "{t.blessings}"
              </div>

              {/* Simulated barcode */}
              <div className="text-center pt-2">
                <div className="inline-block border border-gray-300 px-6 py-2 bg-gray-50 text-[11px] font-mono tracking-[0.6em] text-gray-600 shadow-inner">
                  ||||||||||| | ||| |||| | | |||| ||
                </div>
                <p className="text-[8px] uppercase font-bold text-gray-400 mt-2">Verified Transaction Ledger Receipt</p>
              </div>

              {/* print triggering action button */}
              <div className="pt-4 flex gap-4 print:hidden">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-4 bg-yellow-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-yellow-700 transition-all flex items-center justify-center space-x-2"
                >
                  <FileText size={14} />
                  <span>{t.downloadReceipt}</span>
                </button>
                <button 
                  onClick={() => setShowReceiptModal(null)}
                  className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Live Darshan Video Player Modal */}
      {showLiveDarshan && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0B0D11]/90 backdrop-blur-2xl" onClick={() => setShowLiveDarshan(false)} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#09070c]/95 backdrop-blur-2xl rounded-[3.5rem] p-8 md:p-10 max-w-4xl w-full relative z-[501] shadow-5xl border border-white/10 overflow-hidden"
          >
            <button 
              onClick={() => setShowLiveDarshan(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all z-20"
            >
              <X size={20} />
            </button>
            <div className="space-y-6 text-center">
              <h3 className="text-3xl font-serif font-black text-white italic leading-none flex items-center justify-center space-x-3">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <span className="text-luxury">LIVE DARSHAN</span>
              </h3>
              <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-black relative shadow-inner">
                {/* Embed local mp4 asset */}
                <video src="/22.mp4" controls autoPlay loop className="w-full h-full object-cover" />
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-widest font-black">Streaming live from Sri Siddharoodha Math, Hubballi</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Sevas;
