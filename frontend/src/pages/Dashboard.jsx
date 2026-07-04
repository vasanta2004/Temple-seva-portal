import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User as UserIcon, 
  Settings, 
  CreditCard, 
  History, 
  MapPin, 
  Mail, 
  Phone,
  Edit2,
  Calendar,
  LogOut,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  Home,
  Ticket
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PrasadService from '../services/PrasadService';
import RoomService from '../services/RoomService';
import DarshanService from '../services/DarshanService';

const themes = {
  maroon: {
    name: 'Maha Maroon',
    primary: '#721C24',
    secondary: '#D4AF37',
    glowColor: 'bg-[#721C24]/15',
    glowPulse: 'rgba(114,28,36,0.15)',
    gradient: 'from-[#600B14] to-[#A82030]',
    sidebarActive: 'from-[#600B14]/90 to-[#600B14]/40',
    accentText: 'text-[#D4AF37]',
    accentBg: 'bg-[#D4AF37]/10',
    accentBorder: 'border-[#D4AF37]/20',
    avatarBg: 'bg-[#721C24]/20 text-[#D4AF37]',
    pillColor: 'bg-[#721C24]',
    cardHoverShadow: 'hover:shadow-[0_8px_30px_rgba(114,28,36,0.12)]',
    inputFocus: 'focus:border-[#D4AF37]/40 focus:ring-[#D4AF37]/20',
    btnGradient: 'from-[#600B14] to-[#8D1C28]'
  },
  indigo: {
    name: 'Cosmic Indigo',
    primary: '#1A237E',
    secondary: '#D4AF37',
    glowColor: 'bg-[#1A237E]/15',
    glowPulse: 'rgba(26,35,126,0.15)',
    gradient: 'from-[#1A237E] to-[#5C6BC0]',
    sidebarActive: 'from-[#1A237E]/90 to-[#1A237E]/40',
    accentText: 'text-[#D4AF37]',
    accentBg: 'bg-[#D4AF37]/10',
    accentBorder: 'border-[#D4AF37]/20',
    avatarBg: 'bg-[#1A237E]/20 text-[#D4AF37]',
    pillColor: 'bg-[#1A237E]',
    cardHoverShadow: 'hover:shadow-[0_8px_30px_rgba(26,35,126,0.12)]',
    inputFocus: 'focus:border-[#D4AF37]/40 focus:ring-[#D4AF37]/20',
    btnGradient: 'from-[#1A237E] to-[#1A237E]/80'
  },
  saffron: {
    name: 'Vedic Saffron',
    primary: '#D35400',
    secondary: '#F5B041',
    glowColor: 'bg-[#D35400]/15',
    glowPulse: 'rgba(211,84,32,0.15)',
    gradient: 'from-[#C0392B] to-[#F39C12]',
    sidebarActive: 'from-[#B22222]/90 to-[#D35400]/40',
    accentText: 'text-[#F5B041]',
    accentBg: 'bg-[#F5B041]/10',
    accentBorder: 'border-[#F5B041]/20',
    avatarBg: 'bg-[#D35400]/20 text-[#F5B041]',
    pillColor: 'bg-[#D35400]',
    cardHoverShadow: 'hover:shadow-[0_8px_30px_rgba(211,84,32,0.12)]',
    inputFocus: 'focus:border-[#F5B041]/40 focus:ring-[#F5B041]/20',
    btnGradient: 'from-[#C0392B] to-[#D35400]'
  },
  emerald: {
    name: 'Holy Emerald',
    primary: '#0F5132',
    secondary: '#E5D3B3',
    glowColor: 'bg-[#0F5132]/15',
    glowPulse: 'rgba(15,81,50,0.15)',
    gradient: 'from-[#064E3B] to-[#198754]',
    sidebarActive: 'from-[#064E3B]/90 to-[#0F5132]/40',
    accentText: 'text-[#E5D3B3]',
    accentBg: 'bg-[#E5D3B3]/10',
    accentBorder: 'border-[#E5D3B3]/20',
    avatarBg: 'bg-[#0F5132]/20 text-[#E5D3B3]',
    pillColor: 'bg-[#0F5132]',
    cardHoverShadow: 'hover:shadow-[0_8px_30px_rgba(15,81,50,0.12)]',
    inputFocus: 'focus:border-[#E5D3B3]/40 focus:ring-[#E5D3B3]/20',
    btnGradient: 'from-[#064E3B] to-[#0F5132]'
  },
  amber: {
    name: 'Sunset Amber',
    primary: '#B25E18',
    secondary: '#E2C792',
    glowColor: 'bg-[#B25E18]/15',
    glowPulse: 'rgba(178,94,24,0.15)',
    gradient: 'from-[#934A0C] to-[#D47A2A]',
    sidebarActive: 'from-[#934A0C]/90 to-[#934A0C]/40',
    accentText: 'text-[#E2C792]',
    accentBg: 'bg-[#E2C792]/10',
    accentBorder: 'border-[#E2C792]/20',
    avatarBg: 'bg-[#B25E18]/20 text-[#E2C792]',
    pillColor: 'bg-[#B25E18]',
    cardHoverShadow: 'hover:shadow-[0_8px_30px_rgba(178,94,24,0.12)]',
    inputFocus: 'focus:border-[#E2C792]/40 focus:ring-[#E2C792]/20',
    btnGradient: 'from-[#934A0C] to-[#D47A2A]'
  },
  lotus: {
    name: 'Sacred Lotus',
    primary: '#9D435C',
    secondary: '#E8D3A7',
    glowColor: 'bg-[#9D435C]/15',
    glowPulse: 'rgba(157,67,92,0.15)',
    gradient: 'from-[#8A3048] to-[#B85C77]',
    sidebarActive: 'from-[#8A3048]/90 to-[#8A3048]/40',
    accentText: 'text-[#E8D3A7]',
    accentBg: 'bg-[#E8D3A7]/10',
    accentBorder: 'border-[#E8D3A7]/20',
    avatarBg: 'bg-[#9D435C]/20 text-[#E8D3A7]',
    pillColor: 'bg-[#9D435C]',
    cardHoverShadow: 'hover:shadow-[0_8px_30px_rgba(157,67,92,0.12)]',
    inputFocus: 'focus:border-[#E8D3A7]/40 focus:ring-[#E8D3A7]/20',
    btnGradient: 'from-[#8A3048] to-[#B85C77]'
  }
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [userOrders, setUserOrders] = useState([]);
  const [roomBookings, setRoomBookings] = useState([]);
  const [darshanBookings, setDarshanBookings] = useState([]);

  const [auraGlow, setAuraGlow] = useState(true);
  const [spiritualTheme, setSpiritualTheme] = useState(localStorage.getItem('temple_admin_theme') || 'amber');
  const currentTheme = themes[spiritualTheme] || themes.amber;
  const [notifications, setNotifications] = useState({
    sevaAlerts: true,
    prasadDelivery: true,
    morningAlarm: false,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSettings = () => {
    localStorage.setItem('temple_admin_theme', spiritualTheme);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    window.dispatchEvent(new Event('storage'));
  };


  useEffect(() => {
    const fetchOrdersAndBookings = async () => {
      if (user?.id) {
        try {
          const [ordersRes, bookingsRes, darshanRes] = await Promise.all([
            PrasadService.getUserOrders(user.id),
            RoomService.getUserBookings(user.id),
            DarshanService.getUserSlots(user.id)
          ]);
          setUserOrders(ordersRes.data);
          setRoomBookings(bookingsRes.data);
          setDarshanBookings(darshanRes.data);
        } catch (err) {
          console.error('Orders/Bookings fetch error:', err);
        }
      }
    };
    fetchOrdersAndBookings();
  }, [user]);

  const bookings = [
    { id: 'BK-101', service: 'Rudrabhishek Seva', date: 'May 20, 2026', amount: '₹1,100', status: 'Confirmed' },
    { id: 'BK-098', service: 'Room - Normal 104', date: 'June 10-12, 2026', amount: '₹1,000', status: 'Pending' },
  ];

  const donations = [
    { id: 'DN-552', purpose: 'Annadanam', date: 'May 10, 2026', amount: '₹5,000', receipt: 'Download' },
    { id: 'DN-410', purpose: 'General Fund', date: 'April 15, 2026', amount: '₹1,001', receipt: 'Download' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0806] via-[#16100D] to-[#050302] pt-40 pb-20 overflow-hidden relative z-10">
      {/* Immersive Floating Star Dust Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-secondary/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Dynamic Ambient Mesh Glows */}
      <div className={`absolute top-[-10%] left-[-10%] w-[800px] h-[800px] blur-[180px] rounded-full z-0 pointer-events-none animate-pulse ${currentTheme.glowColor}`} />
      <div className="absolute top-[30%] right-[-10%] w-[650px] h-[650px] bg-secondary/5 blur-[150px] rounded-full z-0 pointer-events-none animate-pulse" />
      <div className={`absolute bottom-[10%] left-[-10%] w-[700px] h-[700px] blur-[180px] rounded-full z-0 pointer-events-none ${currentTheme.glowColor}`} />

      {/* Rotating Sacred Mandala Background */}
      <div className="absolute right-[-10%] bottom-[-10%] opacity-[0.03] z-0 pointer-events-none animate-[spin_120s_linear_infinite]">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none" stroke={currentTheme.secondary} strokeWidth="0.2" className="transition-all duration-1000">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="25" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="5"
              x2="50"
              y2="95"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx="50"
              cy="25"
              r="8"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar - Divine Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] border border-white/10 overflow-hidden shadow-4xl">
              <div className="p-10 text-center bg-white/[0.02] border-b border-white/5 relative group">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform" style={{ backgroundColor: currentTheme.primary, opacity: 0.1 }} />
                <div className={`w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl divine-glow border border-white/10 relative z-10 ${currentTheme.avatarBg}`}>
                  {user?.name?.[0] || 'U'}
                </div>
                <h2 className="text-3xl font-serif font-black text-white italic mb-2">{user?.name}</h2>
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full">
                  <Sparkles size={12} className="text-secondary" />
                  <p className="text-secondary font-black text-[9px] tracking-widest uppercase">Sacred Seeker</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { id: 'profile', name: 'Divine Profile', icon: <UserIcon size={18} /> },
                  { id: 'bookings', name: 'Holy Bookings', icon: <Calendar size={18} /> },
                  { id: 'orders', name: 'Prasad Orders', icon: <ShoppingBag size={18} /> },
                  { id: 'donations', name: 'Grace Offerings', icon: <CreditCard size={18} /> },
                  { id: 'history', name: 'Sacred History', icon: <History size={18} /> },
                  { id: 'settings', name: 'Portal Config', icon: <Settings size={18} /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === item.id ? `bg-gradient-to-r ${currentTheme.sidebarActive} text-white shadow-2xl border ${currentTheme.accentBorder}` : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                  >
                    <div className="flex items-center space-x-4">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    {activeTab === item.id && <ChevronRight size={14} className="text-secondary" />}
                  </button>
                ))}
                <div className="pt-6 mt-6 border-t border-white/5">
                  <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-4 px-6 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all"
                  >
                    <LogOut size={18} />
                    <span>Exit Sanctuary</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-10 lg:p-16 min-h-[700px] shadow-4xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] blur-[150px] rounded-full -z-10" style={{ backgroundColor: currentTheme.primary, opacity: 0.05 }} />

              {activeTab === 'profile' && (
                <div className="space-y-12">
                  <div className="flex justify-between items-end">
                    <div className="space-y-3">
                       <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">Personal Sanctuary</p>
                       <h3 className="text-5xl font-serif font-black text-white italic">Seekeer <span className="text-luxury">Insight.</span></h3>
                    </div>
                    <button className="flex items-center space-x-3 text-secondary font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10">
                      <Edit2 size={14} />
                      <span>Edit Essence</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: 'Name on Mandala', value: user?.name, icon: <UserIcon /> },
                      { label: 'Divine Address', value: user?.email, icon: <Mail /> },
                      { label: 'Connection', value: '+91 98765 43210', icon: <Phone /> },
                      { label: 'Pilgrim Hub', value: 'Old Hubli, Karnataka', icon: <MapPin /> },
                    ].map((info, i) => (
                      <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex items-start space-x-6 hover:border-white/10 transition-all group">
                        <div className={`bg-white/5 p-4 rounded-2xl shadow-2xl border border-white/10 group-hover:scale-110 transition-transform ${currentTheme.accentText}`}>{React.cloneElement(info.icon, { size: 20 })}</div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1.5">{info.label}</p>
                          <p className="font-bold text-white text-lg italic">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-10 rounded-[3rem] relative overflow-hidden group" style={{ backgroundColor: `${currentTheme.primary}1A`, borderColor: `${currentTheme.primary}33`, borderWidth: '1px' }}>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-2">
                        <h4 className="text-2xl font-serif font-black text-white italic">Legacy Membership</h4>
                        <p className="text-gray-400 font-medium max-w-lg">Part of the Siddharoodha Temple digital lineage since 2026. Your contributions fuel the eternal flame of the sanctum.</p>
                      </div>
                      <div className={`flex items-center space-x-3 px-6 py-3 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl divine-glow bg-gradient-to-r ${currentTheme.btnGradient}`}>
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-glow" />
                        <span>Sacred Status: Active</span>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:scale-150 transition-transform" />
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-10">
                   <div className="space-y-3">
                      <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">Acquisitions of Grace</p>
                      <h3 className="text-5xl font-serif font-black text-white italic">My <span className="text-luxury">Orders.</span></h3>
                   </div>
                   <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                     <table className="w-full text-left">
                       <thead>
                         <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/5">
                           <th className="px-8 py-6">Prasadam Item</th>
                           <th className="px-8 py-6">Delivery Address</th>
                           <th className="px-8 py-6">Total Grace</th>
                           <th className="px-8 py-6 text-right">Manifestation</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                         {userOrders.map((order, i) => (
                           <tr key={i} className="group hover:bg-white/5 transition-all">
                             <td className="px-8 py-8">
                                <div className="flex items-center space-x-3">
                                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${currentTheme.avatarBg}`}>
                                      {order.items?.[0]?.name?.[0]}
                                   </div>
                                   <span className="font-black text-white italic text-lg">{order.items?.[0]?.name}</span>
                                </div>
                             </td>
                             <td className="px-8 py-8 text-gray-400 font-medium truncate max-w-[200px]">{order.address}</td>
                             <td className={`px-8 py-8 font-black text-xl italic ${currentTheme.accentText || 'text-secondary'}`}>₹{order.totalAmount}</td>
                             <td className="px-8 py-8 text-right">
                               <span className={`text-[9px] uppercase font-black px-4 py-1.5 rounded-full border ${order.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                 {order.status === 'SUCCESS' ? 'Blessed' : 'Pending'}
                               </span>
                             </td>
                           </tr>
                         ))}
                         {userOrders.length === 0 && (
                           <tr>
                             <td colSpan="4" className="px-8 py-20 text-center text-gray-500 font-black uppercase tracking-widest text-xs italic">
                               Your sacred order history is empty.
                             </td>
                           </tr>
                         )}
                       </tbody>
                     </table>
                   </div>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="space-y-12">
                   {/* Sevas Table */}
                   <div className="space-y-4">
                      <div className="space-y-1">
                         <p className="text-secondary text-[9px] font-black uppercase tracking-[0.4em]">Sacred Calendar</p>
                         <h3 className="text-3xl font-serif font-black text-white italic">My <span className="text-luxury">Sevas.</span></h3>
                      </div>
                      <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/5">
                              <th className="px-8 py-5">Sacred Ritual</th>
                              <th className="px-8 py-5">Divine Date</th>
                              <th className="px-8 py-5">Contribution</th>
                              <th className="px-8 py-5 text-right">Grace Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {bookings.map((bk, i) => (
                              <tr key={i} className="group hover:bg-white/5 transition-all">
                                <td className="px-8 py-6 font-black text-white italic text-base">{bk.service}</td>
                                <td className="px-8 py-6 text-gray-400 font-medium text-xs">{bk.date}</td>
                                <td className={`px-8 py-6 font-black text-lg italic ${currentTheme.accentText || 'text-secondary'}`}>{bk.amount}</td>
                                <td className="px-8 py-6 text-right">
                                  <span className={`text-[8px] uppercase font-black px-4 py-1.5 rounded-full border ${bk.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                    {bk.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                   </div>

                   {/* Stay Reservations Table */}
                   <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="space-y-1 flex justify-between items-center">
                         <div>
                            <p className="text-secondary text-[9px] font-black uppercase tracking-[0.4em]">Sacred Accommodations</p>
                            <h3 className="text-3xl font-serif font-black text-white italic">My Stay <span className="text-luxury">Reservations.</span></h3>
                         </div>
                         <Home size={22} className="text-secondary animate-pulse" />
                      </div>
                      <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/5">
                              <th className="px-8 py-5">Sanctuary Room</th>
                              <th className="px-8 py-5">Check-In / Out</th>
                              <th className="px-8 py-5">Capacity Details</th>
                              <th className="px-8 py-5">Total Sourced</th>
                              <th className="px-8 py-5 text-right">Reservation Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {roomBookings.map((rb, i) => {
                              const checkInStr = rb.checkInDate ? new Date(rb.checkInDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';
                              const checkOutStr = rb.checkOutDate ? new Date(rb.checkOutDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';
                              return (
                                <tr key={i} className="group hover:bg-white/5 transition-all">
                                  <td className="px-8 py-6 font-black text-white italic text-base">{rb.roomName || 'Sanctuary Stay'}</td>
                                  <td className="px-8 py-6 text-gray-400 font-medium text-xs">
                                     {checkInStr} — {checkOutStr}
                                  </td>
                                  <td className="px-8 py-6 text-gray-400 font-bold text-xs uppercase tracking-wider">{rb.guests || 1} Devotee(s)</td>
                                  <td className={`px-8 py-6 font-black text-lg italic ${currentTheme.accentText || 'text-secondary'}`}>₹{rb.totalAmount}</td>
                                  <td className="px-8 py-6 text-right">
                                    <span className="text-[8px] uppercase font-black px-4 py-1.5 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-md">
                                      {rb.status || 'Confirmed'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                            {roomBookings.length === 0 && (
                              <tr>
                                <td colSpan="5" className="px-8 py-16 text-center text-gray-500 font-black uppercase tracking-widest text-xs italic">
                                  No active sanctuary room bookings found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                   </div>

                   {/* Darshan Slot Passes */}
                   <div className="space-y-4 pt-8 border-t border-white/5 mt-6">
                      <div className="space-y-1 flex justify-between items-center">
                         <div>
                            <p className="text-secondary text-[9px] font-black uppercase tracking-[0.4em]">Sacred Entry passes</p>
                            <h3 className="text-3xl font-serif font-black text-white italic">My Darshan <span className="text-luxury">Entry Passes.</span></h3>
                         </div>
                         <Ticket size={22} className="text-secondary animate-pulse" />
                      </div>
                      <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/5">
                              <th className="px-8 py-5">Devotee Name</th>
                              <th className="px-8 py-5">Scheduled Date / Slot</th>
                              <th className="px-8 py-5">Gotra</th>
                              <th className="px-8 py-5">Group Size</th>
                              <th className="px-8 py-5 text-right">Entrance Pass</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {darshanBookings.map((db, i) => (
                              <tr key={i} className="group hover:bg-white/5 transition-all">
                                <td className="px-8 py-6 font-black text-white italic text-base">{db.devoteeName}</td>
                                <td className="px-8 py-6 text-gray-400 font-medium text-xs">
                                   {db.bookingDate} at <span className="text-secondary font-bold">{db.slotTime}</span>
                                </td>
                                <td className="px-8 py-6 text-gray-400 font-bold text-xs">{db.gotra}</td>
                                <td className="px-8 py-6 text-gray-400 font-bold text-xs">{db.groupSize} Persons</td>
                                <td className="px-8 py-6 text-right">
                                  <span className={`text-[8px] uppercase font-black px-4 py-1.5 rounded-full border ${db.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                                    {db.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                            {darshanBookings.length === 0 && (
                              <tr>
                                <td colSpan="5" className="px-8 py-16 text-center text-gray-500 font-black uppercase tracking-widest text-xs italic">
                                   No active Darshan slot passes found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                   </div>

                </div>
              )}

              {activeTab === 'donations' && (
                <div className="space-y-10">
                   <div className="space-y-3">
                      <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">Offerings of Grace</p>
                      <h3 className="text-5xl font-serif font-black text-white italic">Sacred <span className="text-luxury">Giving.</span></h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                     <div className="p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})` }}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform" />
                        <p className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-3">Total Contribution</p>
                        <h4 className="text-5xl font-serif font-black italic text-white">₹6,001</h4>
                     </div>
                     <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden">
                        <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-3">Offerings this Cycle</p>
                        <h4 className="text-5xl font-serif font-black italic text-white">2</h4>
                     </div>
                   </div>
                   <div className="overflow-x-auto rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
                     <table className="w-full text-left">
                       <thead>
                         <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/5">
                           <th className="px-8 py-6">Divine Purpose</th>
                           <th className="px-8 py-6">Date</th>
                           <th className="px-8 py-6">Grace Amount</th>
                           <th className="px-8 py-6 text-right">Proof of Giving</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5">
                         {donations.map((dn, i) => (
                           <tr key={i} className="group hover:bg-white/5 transition-all">
                             <td className="px-8 py-8 font-black text-white italic text-lg">{dn.purpose}</td>
                             <td className="px-8 py-8 text-gray-400 font-medium">{dn.date}</td>
                             <td className={`px-8 py-8 font-black text-xl italic ${currentTheme.accentText || 'text-secondary'}`}>{dn.amount}</td>
                             <td className="px-8 py-8 text-right">
                               <button className="bg-white/5 text-secondary border border-white/10 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all">
                                 {dn.receipt}
                               </button>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-12">
                   <div className="space-y-3">
                      <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">Chronicles of Devotion</p>
                      <h3 className="text-5xl font-serif font-black text-white italic">Sacred <span className="text-luxury">History.</span></h3>
                   </div>
                   
                   <div className="relative pl-8 border-l border-secondary/30 ml-4 space-y-12 py-4">
                      {[
                        { title: "Devotional Sanctuary Entry", desc: "Digital portal session initiated. Devotional security keys updated in the local session manager.", date: "Today", icon: <Sparkles size={14} />, style: { backgroundColor: currentTheme.secondary, color: currentTheme.primary } },
                        { title: "Room Sanctuary Reservation Completed", desc: "Successfully reserved accommodations in the Dharamshala Stay module via secure UPI confirmation.", date: "May 24, 2026", icon: <ShieldCheck size={14} />, style: { backgroundColor: '#10B981', color: '#fff' } },
                        { title: "Annadanam Donation Contributed", desc: "Contributed ₹5,000 to sustain the daily community meal distribution program.", date: "May 10, 2026", icon: <CreditCard size={14} />, style: { backgroundColor: currentTheme.primary, color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } },
                        { title: "Sanctum Portal Account Activated", desc: "devotee profile generated and linked to the digital ledger under Swami Siddharoodha's grace.", date: "May 01, 2026", icon: <UserIcon size={14} />, style: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' } }
                      ].map((evt, idx) => (
                        <div key={idx} className="relative group">
                          {/* Timeline Dot */}
                          <div 
                            className={`absolute -left-[48px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 divine-glow`}
                            style={evt.style}
                          >
                            {evt.icon}
                          </div>
                          <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group-hover:border-secondary/20 transition-all duration-300 relative overflow-hidden">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                              <h4 className="text-xl font-serif font-black text-white italic group-hover:text-secondary transition-colors">{evt.title}</h4>
                              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">{evt.date}</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed font-medium">{evt.desc}</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-12">
                   <div className="space-y-3">
                      <p className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">Portal Config</p>
                      <h3 className="text-5xl font-serif font-black text-white italic">Devotional <span className="text-luxury">Settings.</span></h3>
                   </div>
                   
                   <div className="space-y-10">
                      {/* Section 1: Divine Color Scheme */}
                      <div className="space-y-4">
                         <h4 className="text-lg font-serif font-black text-white italic tracking-wider">Sanctum Color Palette</h4>
                         <p className="text-xs text-gray-500 font-medium">Select a dynamic spiritual theme to paint the buttons and components across your sanctuary journey.</p>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.keys(themes).map((themeKey) => {
                              const t = themes[themeKey];
                              const isSelected = spiritualTheme === themeKey;
                              return (
                                <button
                                  key={themeKey}
                                  type="button"
                                  onClick={() => setSpiritualTheme(themeKey)}
                                  className={`p-6 rounded-3xl border flex flex-col items-center space-y-3 transition-all ${isSelected ? 'bg-white/5 border-secondary shadow-2xl scale-[1.03]' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                                >
                                  <div className={`w-10 h-10 rounded-full shadow-inner ${t.pillColor} border border-white/10`} />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-white">{t.name}</span>
                                </button>
                              );
                            })}
                         </div>
                      </div>

                      {/* Section 2: Visual Glow Toggle */}
                      <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-between gap-6">
                         <div className="space-y-1">
                            <h4 className="text-lg font-serif font-black text-white italic">Divine Orbits & Aura Glow</h4>
                            <p className="text-xs text-gray-500 font-medium">Enable deep breathing ambient glows, golden micro-animations, and floating star dust effects.</p>
                         </div>
                         <button 
                           type="button"
                           onClick={() => setAuraGlow(!auraGlow)}
                           className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${auraGlow ? 'bg-secondary' : 'bg-white/10'}`}
                         >
                           <div className={`w-6 h-6 rounded-full bg-[#0F1115] transition-transform duration-300 ${auraGlow ? 'translate-x-6' : 'translate-x-0'}`} />
                         </button>
                      </div>

                      {/* Section 3: Notification LED Toggles */}
                      <div className="space-y-6">
                         <h4 className="text-lg font-serif font-black text-white italic tracking-wider">Spiritual Alerts Config</h4>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                              { key: 'sevaAlerts', label: 'Daily Seva Alerts', desc: 'Alerts before Maha Aarti and Deepotsava rituals.' },
                              { key: 'prasadDelivery', label: 'Prasad Dispatch Ledger', desc: 'Updates when your blessed offering is dispatched.' },
                              { key: 'morningAlarm', label: 'Suprabhata Alarm', desc: 'Play spiritual hymns at 05:30 AM Suprabhata.' },
                            ].map((opt) => (
                              <div key={opt.key} className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 flex flex-col justify-between h-44">
                                 <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{opt.label}</span>
                                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{opt.desc}</p>
                                 </div>
                                 <button 
                                   type="button"
                                   onClick={() => setNotifications({ ...notifications, [opt.key]: !notifications[opt.key] })}
                                   className={`w-fit px-5 py-2.5 rounded-full font-black text-[9px] uppercase tracking-widest border transition-all ${notifications[opt.key] ? 'bg-secondary/15 text-secondary border-secondary/30 divine-glow' : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/10'}`}
                                 >
                                   {notifications[opt.key] ? 'Sanctified (ON)' : 'Silenced (OFF)'}
                                 </button>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* Save Button */}
                      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                         <div>
                            {saveSuccess && (
                               <motion.div 
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 className="text-emerald-400 font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 divine-glow"
                               >
                                 <ShieldCheck size={14} />
                                 <span>Divine configurations stored in local ledger successfully!</span>
                               </motion.div>
                            )}
                         </div>
                         <button 
                           type="button"
                           onClick={handleSaveSettings}
                           className="text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl bg-gradient-to-r"
                           style={{ backgroundImage: `linear-gradient(to right, ${currentTheme.primary}, ${currentTheme.secondary})` }}
                         >
                           Save Portal Essence
                         </button>
                      </div>
                   </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
