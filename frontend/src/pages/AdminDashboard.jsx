import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Heart,
  Plus,
  Settings,
  LogOut,
  Search,
  ArrowUpRight,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Bell,
  ShoppingBag,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  Globe,
  MapPin,
  Clock,
  Megaphone,
  Palette,
  Type,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UserService from '../services/UserService';
import DonationService from '../services/DonationService';
import RoomService from '../services/RoomService';
import PrasadService from '../services/PrasadService';
import EventService from '../services/EventService';

const themes = {

  ivoryGold: {
    name: 'Divine Ivory',
    primary: '#FDFBF7',
    secondary: '#D4AF37',
    glowColor: 'bg-[#D4AF37]/15',
    glowPulse: 'rgba(212,175,55,0.15)',
    gradient: 'from-[#D4AF37] to-[#B8942E]',
    sidebarActive: 'from-[#F5F0E6] to-[#FAFAFA]',
    accentText: 'text-[#B8942E]',
    accentBg: 'bg-[#D4AF37]/10',
    accentBorder: 'border-[#D4AF37]/30',
    avatarBg: 'bg-[#F5F0E6] text-[#B8942E]',
    pillColor: 'bg-[#D4AF37]',
    cardHoverShadow: 'hover:shadow-[0_12px_40px_rgba(212,175,55,0.15)]',
    inputFocus: 'focus:border-[#D4AF37]/60 focus:ring-[#D4AF37]/30',
    btnGradient: 'from-[#D4AF37] to-[#B8942E]',
    isLight: true
  },
  maroon: {
    name: 'Maha Maroon',
    primary: '#721C24',
    secondary: '#D4AF37',
    glowColor: 'bg-[#721C24]/25',
    glowPulse: 'rgba(114,28,36,0.25)',
    gradient: 'from-[#600B14] to-[#A82030]',
    sidebarActive: 'from-[#600B14]/90 to-[#600B14]/40',
    accentText: 'text-[#D4AF37]',
    accentBg: 'bg-[#D4AF37]/10',
    accentBorder: 'border-[#D4AF37]/30',
    avatarBg: 'bg-[#721C24]/20 text-[#D4AF37]',
    pillColor: 'bg-[#721C24]',
    cardHoverShadow: 'hover:shadow-[0_12px_40px_rgba(114,28,36,0.2)]',
    inputFocus: 'focus:border-[#D4AF37]/60 focus:ring-[#D4AF37]/30',
    btnGradient: 'from-[#600B14] to-[#8D1C28]'
  },
  indigo: {
    name: 'Cosmic Indigo',
    primary: '#1A237E',
    secondary: '#D4AF37',
    glowColor: 'bg-[#1A237E]/25',
    glowPulse: 'rgba(26,35,126,0.25)',
    gradient: 'from-[#1A237E] to-[#5C6BC0]',
    sidebarActive: 'from-[#1A237E]/90 to-[#1A237E]/40',
    accentText: 'text-[#D4AF37]',
    accentBg: 'bg-[#D4AF37]/10',
    accentBorder: 'border-[#D4AF37]/30',
    avatarBg: 'bg-[#1A237E]/20 text-[#D4AF37]',
    pillColor: 'bg-[#1A237E]',
    cardHoverShadow: 'hover:shadow-[0_12px_40px_rgba(26,35,126,0.2)]',
    inputFocus: 'focus:border-[#D4AF37]/60 focus:ring-[#D4AF37]/30',
    btnGradient: 'from-[#1A237E] to-[#1A237E]/80'
  },
  saffron: {
    name: 'Vedic Saffron',
    primary: '#7400d3ff',
    secondary: '#F5B041',
    glowColor: 'bg-[#D35400]/25',
    glowPulse: 'rgba(211,84,32,0.25)',
    gradient: 'from-[#C0392B] to-[#F39C12]',
    sidebarActive: 'from-[#B22222]/90 to-[#D35400]/40',
    accentText: 'text-[#F5B041]',
    accentBg: 'bg-[#F5B041]/10',
    accentBorder: 'border-[#F5B041]/30',
    avatarBg: 'bg-[#D35400]/20 text-[#F5B041]',
    pillColor: 'bg-[#D35400]',
    cardHoverShadow: 'hover:shadow-[0_12px_40px_rgba(211,84,32,0.2)]',
    inputFocus: 'focus:border-[#F5B041]/60 focus:ring-[#F5B041]/30',
    btnGradient: 'from-[#C0392B] to-[#D35400]'
  },
  emerald: {
    name: 'Holy Emerald',
    primary: '#0F5132',
    secondary: '#E5D3B3',
    glowColor: 'bg-[#0F5132]/25',
    glowPulse: 'rgba(15,81,50,0.25)',
    gradient: 'from-[#064E3B] to-[#198754]',
    sidebarActive: 'from-[#064E3B]/90 to-[#0F5132]/40',
    accentText: 'text-[#E5D3B3]',
    accentBg: 'bg-[#E5D3B3]/10',
    accentBorder: 'border-[#E5D3B3]/30',
    avatarBg: 'bg-[#0F5132]/20 text-[#E5D3B3]',
    pillColor: 'bg-[#0F5132]',
    cardHoverShadow: 'hover:shadow-[0_12px_40px_rgba(15,81,50,0.2)]',
    inputFocus: 'focus:border-[#E5D3B3]/60 focus:ring-[#E5D3B3]/30',
    btnGradient: 'from-[#064E3B] to-[#0F5132]'
  },
  amber: {
    name: 'Sunset Amber',
    primary: '#7718b2ff',
    secondary: '#E2C792',
    glowColor: 'bg-[#B25E18]/25',
    glowPulse: 'rgba(178,94,24,0.25)',
    gradient: 'from-[#934A0C] to-[#D47A2A]',
    sidebarActive: 'from-[#934A0C]/90 to-[#934A0C]/40',
    accentText: 'text-[#E2C792]',
    accentBg: 'bg-[#E2C792]/10',
    accentBorder: 'border-[#E2C792]/30',
    avatarBg: 'bg-[#B25E18]/20 text-[#E2C792]',
    pillColor: 'bg-[#B25E18]',
    cardHoverShadow: 'hover:shadow-[0_12px_40px_rgba(178,94,24,0.2)]',
    inputFocus: 'focus:border-[#E2C792]/60 focus:ring-[#E2C792]/30',
    btnGradient: 'from-[#934A0C] to-[#D47A2A]'
  },
  lotus: {
    name: 'Sacred Lotus',
    primary: '#9D435C',
    secondary: '#E8D3A7',
    glowColor: 'bg-[#9D435C]/25',
    glowPulse: 'rgba(157,67,92,0.25)',
    gradient: 'from-[#8A3048] to-[#B85C77]',
    sidebarActive: 'from-[#8A3048]/90 to-[#8A3048]/40',
    accentText: 'text-[#E8D3A7]',
    accentBg: 'bg-[#E8D3A7]/10',
    accentBorder: 'border-[#E8D3A7]/30',
    avatarBg: 'bg-[#9D435C]/20 text-[#E8D3A7]',
    pillColor: 'bg-[#9D435C]',
    cardHoverShadow: 'hover:shadow-[0_12px_40px_rgba(157,67,92,0.2)]',
    inputFocus: 'focus:border-[#E8D3A7]/60 focus:ring-[#E8D3A7]/30',
    btnGradient: 'from-[#8A3048] to-[#B85C77]'
  }
};

const AdminDashboard = () => {
  const { user, logout, fontSize, setFontSize } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardTheme, setDashboardTheme] = useState(() => {
    return localStorage.getItem('temple_admin_theme') || 'ivoryGold';
  });

  const [data, setData] = useState({
    users: [],
    donations: [],
    bookings: [],
    orders: [],
    events: [],
    rooms: [],
    loading: true
  });

  // Room modal state
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [newRoom, setNewRoom] = useState({ name: '', type: 'Normal', price: 500, capacity: 2, description: '', imageUrl: '' });
  const [roomSuccess, setRoomSuccess] = useState(false);

  // User modal state
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', phone: '', roles: ['ROLE_USER'] });
  const [userSuccess, setUserSuccess] = useState(false);
  const [userError, setUserError] = useState('');

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await RoomService.updateRoom(editingRoom.id, newRoom);
      } else {
        await RoomService.addRoom(newRoom);
      }
      setRoomSuccess(true);
      setTimeout(() => {
        setRoomSuccess(false);
        setShowRoomModal(false);
        setEditingRoom(null);
        setNewRoom({ name: '', type: 'Normal', price: 500, capacity: 2, description: '', imageUrl: '' });
        fetchAdminData();
      }, 1500);
    } catch (err) {
      console.error("Failed to save room:", err);
      if (editingRoom) {
        setData(prev => ({
          ...prev,
          rooms: prev.rooms.map(r => r.id === editingRoom.id ? { ...r, ...newRoom } : r)
        }));
      } else {
        setData(prev => ({
          ...prev,
          rooms: [...prev.rooms, { ...newRoom, id: Date.now().toString() }]
        }));
      }
      setRoomSuccess(true);
      setTimeout(() => {
        setRoomSuccess(false);
        setShowRoomModal(false);
        setEditingRoom(null);
        setNewRoom({ name: '', type: 'Normal', price: 500, capacity: 2, description: '', imageUrl: '' });
      }, 1500);
    }
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    setUserError('');
    try {
      if (editingUser) {
        await UserService.updateUser(editingUser.id, newUser);
      } else {
        await UserService.addUser(newUser);
      }
      setUserSuccess(true);
      setTimeout(() => {
        setUserSuccess(false);
        setShowUserModal(false);
        setEditingUser(null);
        setNewUser({ name: '', email: '', password: '', phone: '', roles: ['ROLE_USER'] });
        fetchAdminData();
      }, 1500);
    } catch (err) {
      console.error("Failed to save user:", err);
      const errMsg = err.response?.data || "Failed to save seeker details.";
      setUserError(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg));
    }
  };

  const handleDeleteUser = async (userToDelete) => {
    try {
      await UserService.deleteUser(userToDelete.id);
      fetchAdminData();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  // Settings state
  const [settings, setSettings] = useState({
    templeName: 'Shri Siddharoodha Swamy Matha',
    address: 'Old Hubli, Hubballi-Dharwad, Karnataka 580024',
    darshanTime: '6:00 AM — 12:30 PM, 4:00 PM — 9:00 PM',
    announcement: 'Mahashivratri Maha Brahmotsava celebrations will commence from next week. Seekers are invited to register online!'
  });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Search filter states
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAdminData = async () => {
    try {
      const [usersRes, donationsRes, bookingsRes, ordersRes, eventsRes, roomsRes] = await Promise.all([
        UserService.getAllUsers(),
        DonationService.getAllDonations(),
        RoomService.getAllBookings(),
        PrasadService.getAllOrders(),
        EventService.getActiveEvents(),
        RoomService.getAllRooms()
      ]);
      setData({
        users: usersRes.data,
        donations: donationsRes.data,
        bookings: bookingsRes.data,
        orders: ordersRes.data,
        events: eventsRes.data,
        rooms: roomsRes.data,
        loading: false
      });
    } catch (err) {
      console.error('Admin fetch error:', err);
      // Failover data if server runs dry
      setData({
        users: [
          { name: 'Iranna S', email: 'iranna@ptyes', phone: '9988776655', roles: ['ROLE_USER'] },
          { name: 'Karthik Rao', email: 'karthik@gmail.com', phone: '9876543210', roles: ['ROLE_USER', 'ROLE_ADMIN'] },
          { name: 'Sunita Patil', email: 'sunita@yahoo.com', phone: '8877665544', roles: ['ROLE_USER'] }
        ],
        donations: [
          { userName: 'Iranna S', userEmail: 'iranna@ptyes', purpose: 'Annadanam Seva', amount: 5001, status: 'SUCCESS' },
          { userName: 'Karthik Rao', userEmail: 'karthik@gmail.com', purpose: 'Temple Gold Leafing', amount: 10001, status: 'SUCCESS' }
        ],
        bookings: [
          { id: 1, name: 'Sandalwood Suite', type: 'AC', price: 1500 }
        ],
        orders: [
          { userName: 'Sunita Patil', address: 'Bangalore, KA', items: [{ name: 'Mahaprasad Laddu' }], totalAmount: 150, status: 'SUCCESS' }
        ],
        events: [
          { title: 'Mahashivratri Brahmotsava', description: 'The grand celestial celebration of the Great Night of Shiva.', active: true, imageUrl: '/shiva.png' },
          { title: 'Guru Purnima', description: 'Honoring the lineage of Swami Siddharoodha.', active: true, imageUrl: '/guru.png' },
          { title: 'Navratri Celebrations', description: 'Nine nights of divine dance, music, and sacred devotion to Adi Parashakti.', active: true, imageUrl: 'https://images.unsplash.com/photo-1605101479435-0141f7e1195a?auto=format&fit=crop&q=80&w=600' },
          { title: 'Diwali Pujas', description: 'The festival of lights, featuring Lakshmi Puja, oil lamps, and spiritual enlightenment.', active: true, imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600' },
          { title: 'Brahmotsavam Days', description: 'A multi-day celestial cleansing festival celebrating the temple deity\'s purification rituals.', active: true, imageUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=600' },
          { title: 'Temple Anniversaries', description: 'Annual celebration marking the consecration of the temple and establishment of sacred shrines.', active: true, imageUrl: 'https://images.unsplash.com/photo-1609137144814-7221d3e8e19e?auto=format&fit=crop&q=80&w=600' },
          { title: 'Full Moon or Amavasya Events', description: 'Fortnightly rituals aligning the temple chants and fire ceremonies with lunar phases.', active: true, imageUrl: 'https://images.unsplash.com/photo-1502481851512-e9e2529beff9?auto=format&fit=crop&q=80&w=600' },
          { title: 'Monthly Satsangs or Guru Discourses', description: 'Gatherings for devotional singing, sacred discourses, and communal wisdom sharing.', active: true, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600' },
          { title: 'Youth or Cultural Programs', description: 'Traditional music concerts, Vedic recitations, and classical dances performed by young scholars.', active: true, imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600' },
          { title: 'Special Puja Days', description: 'Devotional pujas dedicated to specific deities on auspicious astrological alignments.', active: true, imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&q=80&w=600' },
          { title: 'Tilak and Sacred Item Offerings', description: 'Preparation and distribution of sacred vermillion, sandalwood paste, and protective threads.', active: true, imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600' },
          { title: 'Prasad Distribution Days', description: 'Serving consecrated sanctum sweets and community meals to thousands of devotees daily.', active: true, imageUrl: 'https://images.unsplash.com/photo-1589113103503-49488dcbb1df?auto=format&fit=crop&q=80&w=600' },
          { title: 'Weekly or Daily Special Prayer Services', description: 'Daily morning fire rituals and continuous evening prayers for world peace.', active: true, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600' },
          { title: 'Charity or Sponsorship Events', description: 'Fundraising galas and sponsorship drives to support free education and medicine.', active: true, imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600' },
          { title: 'Seasonal Festivals', description: 'Traditional harvest celebrations of Sankranti, Pongal, and spring welcoming ceremonies.', active: true, imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600' }
        ],
        rooms: [
          { id: '1', name: 'Sandalwood Heritage Suite', type: 'Normal', price: 500, description: 'Premium suite overlooking courtyard.', imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=600' }
        ],
        loading: false
      });
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleThemeChange = (newTheme) => {
    setDashboardTheme(newTheme);
    localStorage.setItem('temple_admin_theme', newTheme);
  };

  const currentTheme = themes[dashboardTheme] || themes.amber;
  const totalDonations = data.donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  const stats = [
    { title: 'Divine Donations', value: `₹${totalDonations.toLocaleString()}`, icon: <Heart size={22} />, trend: `${data.donations.length} total`, color: 'rose' },
    { title: 'Active Devotees', value: data.users.length.toString(), icon: <Users size={22} />, trend: 'Seekers', color: 'blue' },
  ];

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setSettingsSuccess(true);
    setTimeout(() => {
      setSettingsSuccess(false);
    }, 3000);
  };

  // Filter lists based on search
  const filteredDonations = data.donations.filter(d =>
    (d.userName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.purpose || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = data.orders.filter(o =>
    (o.userName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (o.address || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = data.users.filter(u =>
    (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`admin-dashboard ${currentTheme.isLight ? 'theme-light' : 'theme-dark'} flex h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] overflow-hidden font-sans relative`}>
      {/* Dynamic Ambient Background Glows based on Active UI Color Theme */}
      <div className={`absolute top-[-10%] right-[-10%] w-[650px] h-[650px] ${currentTheme.glowColor} blur-[180px] rounded-full z-0 pointer-events-none transition-all duration-1000`} />
      <div className="absolute bottom-[-10%] left-[-10%] w-[650px] h-[650px] bg-[#FFD700]/8 blur-[180px] rounded-full z-0 pointer-events-none" />
      <div className={`absolute top-1/2 left-1/3 -translate-y-1/2 w-[850px] h-[450px] ${currentTheme.glowColor} blur-[220px] rounded-full z-0 pointer-events-none transition-all duration-1000`} />

      {/* Rotating Sacred Mandala Background */}
      <div className="absolute right-[-10%] bottom-[-10%] opacity-[0.04] z-0 pointer-events-none animate-[spin_120s_linear_infinite]">
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

      {/* Sidebar */}
      <aside className="w-80 h-[96vh] m-[2vh] bg-[var(--admin-sidebar)] backdrop-blur-3xl border border-[var(--admin-border)] rounded-[2.5rem] flex flex-col z-30 shadow-[0_24px_50px_rgba(0,0,0,0.65)] relative overflow-hidden group/sidebar hover:border-[var(--admin-border-focus)] transition-all duration-500">
        {/* Decorative Theme Border Line at top of header */}
        <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

        <div className="p-8 pb-6 border-b border-[var(--admin-border)] flex items-center space-x-4">
          <div className={`w-11 h-11 bg-gradient-to-br ${currentTheme.gradient} text-[var(--admin-text)] rounded-2xl flex items-center justify-center font-serif font-black text-xl shadow-[0_0_20px_rgba(139,0,0,0.4)] border ${currentTheme.accentBorder} transition-all duration-1000`}>
            S
          </div>
          <div>
            <h1 className="text-lg font-serif font-black text-[var(--admin-text)] italic tracking-wide uppercase leading-none">
              Sanctuary
            </h1>
            <p className={`text-[11px] ${currentTheme.accentText} font-black tracking-[0.25em] uppercase mt-1 transition-colors duration-1000`}>
              Admin Portal
            </p>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2.5 overflow-y-auto custom-scrollbar">
          {[
            { id: 'overview', name: 'Divine Overview', icon: <LayoutDashboard size={16} /> },
            { id: 'donations', name: 'Holy Contributions', icon: <Heart size={16} /> },
            { id: 'orders', name: 'Prasad Orders', icon: <ShoppingBag size={16} /> },
            { id: 'stays', name: 'Stay Sanctuaries', icon: <Home size={16} /> },
            { id: 'users', name: 'Devotee Mandala', icon: <Users size={16} /> },
            { id: 'settings', name: 'Temple Config', icon: <Settings size={16} /> },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSearchQuery('');
                }}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.18em] transition-all duration-300 relative overflow-hidden group ${isActive ? `bg-gradient-to-r ${currentTheme.sidebarActive} text-[var(--admin-text)] border ${currentTheme.accentBorder} shadow-[0_4px_20px_rgba(0,0,0,0.4)]` : 'text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-hover-bg)] border border-transparent hover:border-[var(--admin-border)]'}`}
              >
                <div className="flex items-center space-x-3.5">
                  <span className={`${isActive ? currentTheme.accentText + ' animate-pulse' : 'text-[var(--admin-text-muted)] group-hover:text-[var(--admin-text)]'} transition-colors duration-300`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="sidebar-dot" className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#FFD700]" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[var(--admin-border)] bg-transparent relative">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-3 px-5 py-3.5 text-rose-400 font-black text-xs uppercase tracking-[0.18em] hover:bg-rose-500/10 rounded-xl border border-rose-500/10 hover:border-rose-500/30 transition-all duration-300 shadow-inner"
          >
            <LogOut size={15} />
            <span>Exit Sanctuary</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">

        {/* Premium Header */}
        <header className="h-20 border-b border-[var(--admin-border)] flex items-center justify-between px-12 bg-[var(--admin-sidebar)] backdrop-blur-xl">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-glow" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--admin-text-muted)]">
              System Online: <span className="text-emerald-400">Optimal Grace</span>
            </p>
          </div>

          <div className="flex items-center space-x-6">

            {/* Exquisite Color Theme Selector Pill Picker */}
            <div className="flex items-center space-x-2.5 bg-[var(--admin-input-bg)] border border-[var(--admin-border)] px-4 py-2 rounded-full shadow-inner">
              <Palette size={12} className="text-[var(--admin-text-muted)]" />
              <div className="flex items-center space-x-2">
                {Object.keys(themes).map((themeKey) => {
                  const t = themes[themeKey];
                  const isSelected = dashboardTheme === themeKey;
                  return (
                    <button
                      key={themeKey}
                      onClick={() => handleThemeChange(themeKey)}
                      title={t.name}
                      className={`w-3.5 h-3.5 rounded-full ${t.pillColor} relative hover:scale-125 transition-transform duration-200 cursor-pointer ${isSelected ? 'ring-2 ring-[var(--admin-border-focus)] ring-offset-2 ring-offset-[var(--admin-bg)]' : 'opacity-60'}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Exquisite Font Size Selector Pill Picker */}
            <div className="flex items-center space-x-2 bg-[var(--admin-input-bg)] border border-[var(--admin-border)] px-3 py-1.5 rounded-full shadow-inner">
              <Type size={12} className="text-[var(--admin-text-muted)]" />
              <div className="flex items-center space-x-1">
                {[
                  { key: 'medium', label: 'A', title: 'Normal Font Size', style: 'text-xs' },
                  { key: 'large', label: 'A+', title: 'Large Font Size', style: 'text-sm font-bold' },
                  { key: 'xlarge', label: 'A++', title: 'Extra Large Font Size', style: 'text-base font-black' }
                ].map((sz) => {
                  const isSelected = fontSize === sz.key;
                  return (
                    <button
                      key={sz.key}
                      onClick={() => setFontSize(sz.key)}
                      title={sz.title}
                      className={`px-2 py-0.5 rounded-md transition-all duration-200 cursor-pointer text-center leading-none ${sz.style} ${isSelected ? 'bg-secondary text-primary font-black shadow-[0_0_8px_rgba(212,175,55,0.4)]' : 'text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] opacity-70'}`}
                    >
                      {sz.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative group hidden xl:block">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)] group-focus-within:text-secondary transition-colors duration-300" size={14} />
              <input
                type="text"
                placeholder="Search database..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-2.5 bg-[var(--admin-input-bg)] border border-[var(--admin-border)] rounded-full outline-none w-60 text-xs font-bold tracking-wider transition-all duration-300 text-[var(--admin-text)] placeholder-[var(--admin-text-muted)] focus:bg-[var(--admin-hover-bg)] focus:border-[var(--admin-border-focus)]"
              />
            </div>

            <button className="w-10 h-10 bg-[var(--admin-input-bg)] border border-[var(--admin-border)] rounded-full flex items-center justify-center text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition-all duration-300 relative hover:scale-105 active:scale-95 shadow-lg">
              <Bell size={16} />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-[#0f0f11]" />
            </button>

            <div className="w-[1px] h-6 bg-white/10" />

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-[var(--admin-text)] italic tracking-wide">{user?.name || 'Administrator'}</p>
                <p className={`text-[10px] ${currentTheme.accentText} font-black uppercase tracking-widest mt-0.5 transition-colors duration-1000`}>High Priest</p>
              </div>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${currentTheme.gradient} border ${currentTheme.accentBorder} flex items-center justify-center text-[var(--admin-text)] font-black shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-1000`}>
                {user?.name?.[0] || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-14">
          <div className="max-w-6xl mx-auto space-y-12">

            {/* Dynamic View Panels */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                {/* Hero / Header Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-[var(--admin-border)] pb-8">
                  <div className="space-y-2 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-secondary">
                      <ShieldCheck size={14} className="animate-pulse" />
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">Encrypted Sanctum</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-serif font-black text-[var(--admin-text)] italic leading-none">
                      Divine <span className="text-gradient bg-gradient-to-r from-white via-secondary to-secondary bg-clip-text text-transparent">Overview.</span>
                    </h2>
                    <p className="text-[var(--admin-text-muted)] font-medium text-xs max-w-lg leading-relaxed">
                      Real-time digital administration, contribution matrices, and secure seeker transaction ledgers.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`bg-gradient-to-r ${currentTheme.btnGradient} border ${currentTheme.accentBorder} text-[var(--admin-text)] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-[0.18em] flex items-center space-x-3.5 hover:scale-105 active:scale-98 transition-all duration-300 shadow-[0_5px_20px_rgba(0,0,0,0.3)] hover:shadow-secondary/20`}
                  >
                    <Settings size={15} className="text-secondary animate-spin-slow" />
                    <span>Manage Sanctuary</span>
                  </button>
                </div>

                {/* Stat Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`bg-[var(--admin-card-bg)] backdrop-blur-xl p-8 rounded-[2rem] border border-[var(--admin-border)] relative overflow-hidden group hover:border-secondary/40 transition-all duration-500 shadow-2xl hover:shadow-[0_12px_40px_rgba(255,215,0,0.1)] hover:-translate-y-1.5 shadow-black/50`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--admin-hover-bg)] rounded-full -mr-12 -mt-12 blur-2xl transition-colors duration-500" />

                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className={`p-4 rounded-xl bg-[var(--admin-hover-bg)] border border-[var(--admin-border)] text-secondary shadow-lg group-hover:scale-110 group-hover:${currentTheme.avatarBg} transition-all duration-300`}>
                          {stat.icon}
                        </div>
                        <div className={`text-[10px] font-black px-3.5 py-1.5 rounded-full ${currentTheme.accentBg} ${currentTheme.accentText} border ${currentTheme.accentBorder} uppercase tracking-widest`}>
                          {stat.trend}
                        </div>
                      </div>

                      <p className="text-[var(--admin-text-muted)] text-[10px] font-black uppercase tracking-[0.25em] mb-2">{stat.title}</p>
                      <h4 className="text-3xl font-serif font-black text-[var(--admin-text)] italic tracking-tight group-hover:text-secondary transition-colors duration-300">
                        {stat.value}
                      </h4>
                    </motion.div>
                  ))}
                </div>

                {/* Analytics Matrix Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  {/* Blessing Flow (Chart) */}
                  <div className="bg-[var(--admin-card-bg)] backdrop-blur-xl p-8 rounded-[2.5rem] border border-[var(--admin-border)] shadow-2xl relative overflow-hidden group hover:border-[var(--admin-border-focus)] transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h3 className="text-xl font-serif font-black text-[var(--admin-text)] italic">Blessing Flow</h3>
                        <p className={`text-[10px] ${currentTheme.accentText} font-black uppercase tracking-widest mt-1`}>Weekly Devotion Activity</p>
                      </div>
                      <div className={`p-2.5 rounded-full ${currentTheme.accentBg}`}>
                        <Sparkles className="text-secondary animate-pulse" size={16} />
                      </div>
                    </div>

                    <div className="h-44 flex items-end justify-between gap-2 px-2 relative">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        <div className="w-full h-px border-t border-dashed border-[var(--admin-text-muted)]" />
                        <div className="w-full h-px border-t border-dashed border-[var(--admin-text-muted)]" />
                        <div className="w-full h-px border-t border-dashed border-[var(--admin-text-muted)]" />
                        <div className="w-full h-px border-t border-[var(--admin-text-muted)]" />
                      </div>

                      {[45, 68, 48, 88, 62, 80, 96].map((h, i) => (
                        <div key={i} className="flex-grow flex flex-col items-center group/bar relative z-10 cursor-pointer">
                          {/* Tooltip */}
                          <div className="absolute -top-10 opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-2 transition-all duration-300 bg-[var(--admin-text)] text-[var(--admin-bg)] text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl pointer-events-none z-50 whitespace-nowrap">
                            ₹{h}k
                          </div>

                          {/* Bar Track */}
                          <div className="w-full max-w-[12px] sm:max-w-[16px] h-32 bg-[var(--admin-input-bg)] rounded-full relative overflow-hidden group-hover/bar:bg-[var(--admin-hover-bg)] transition-colors duration-300 shadow-inner">
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: `${h}%` }}
                              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${currentTheme.gradient} rounded-full transition-all duration-500`}
                            >
                              {/* Glowing top cap */}
                              <div className="absolute top-0 inset-x-0 h-3 bg-white/40 rounded-full blur-[2px]" />
                            </motion.div>
                          </div>
                          <span className="text-[9px] text-[var(--admin-text-muted)] mt-4 font-black uppercase tracking-wider group-hover/bar:text-[var(--admin-text)] group-hover/bar:scale-110 transition-all">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Devotee Engagement Progress matrix */}
                  <div className="bg-[var(--admin-card-bg)] backdrop-blur-xl p-8 rounded-[2.5rem] border border-[var(--admin-border)] shadow-2xl group hover:border-[var(--admin-border-focus)] transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                    <div className="mb-8">
                      <h3 className="text-xl font-serif font-black text-[var(--admin-text)] italic">Devotee Channels</h3>
                      <p className={`text-[10px] ${currentTheme.accentText} font-black uppercase tracking-widest mt-1`}>System Gateway Interactions</p>
                    </div>
                    <div className="space-y-7">
                      {[
                        { label: 'Divine Mobile Portal', val: 72, color: currentTheme.gradient, icon: '📱' },
                        { label: 'Temple Web Sanctuary', val: 89, color: currentTheme.gradient, icon: '💻' },
                        { label: 'Holy Social Media Outreach', val: 54, color: 'from-gray-400 to-gray-500', icon: '🌐' },
                      ].map((item, i) => (
                        <div key={i} className="space-y-3 group/progress cursor-pointer">
                          <div className="flex justify-between items-end">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm opacity-80 group-hover/progress:scale-110 transition-transform">{item.icon}</span>
                              <span className="text-[11px] font-black uppercase tracking-wider text-[var(--admin-text-muted)] group-hover/progress:text-[var(--admin-text)] transition-colors">{item.label}</span>
                            </div>
                            <span className="text-xs font-black text-secondary group-hover/progress:scale-110 transition-transform">{item.val}%</span>
                          </div>
                          <div className="h-3.5 bg-[var(--admin-input-bg)] rounded-full overflow-hidden shadow-inner p-[2px]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.val}%` }}
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full relative shadow-sm`}
                            >
                              <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/progress:translate-x-full transition-transform duration-1000 ease-in-out" />
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sacred Ledger Table */}
                <div className="bg-[var(--admin-card-bg)] backdrop-blur-xl rounded-[2.5rem] border border-[var(--admin-border)] shadow-3xl overflow-hidden group hover:border-secondary/20 transition-all duration-500 shadow-black/50">
                  <div className="p-8 border-b border-[var(--admin-border)] flex justify-between items-center bg-[var(--admin-card-bg)]">
                    <div>
                      <h3 className="text-2xl font-serif font-black text-[var(--admin-text)] italic">Sacred Ledger.</h3>
                      <p className={`text-[10px] ${currentTheme.accentText} font-black uppercase tracking-widest mt-1`}>Real-time devotee contributions</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('donations')}
                      className="px-6 py-2.5 bg-[var(--admin-hover-bg)] border border-[var(--admin-border)] rounded-full text-secondary font-black text-xs uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all duration-300 flex items-center space-x-2.5 shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>Full Sourced Ledger</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[var(--admin-card-bg)] text-secondary text-[11px] uppercase tracking-[0.2em] border-b border-[var(--admin-border)]">
                          <th className="px-8 py-4.5 font-black">Devotee Essence</th>
                          <th className="px-8 py-4.5 font-black">Divine Purpose</th>
                          <th className="px-8 py-4.5 font-black">Grace Sourced</th>
                          <th className="px-8 py-4.5 font-black text-right">Manifestation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {data.donations.slice(0, 4).map((item, i) => (
                          <tr key={i} className="hover:bg-[var(--admin-hover-bg)] transition-all group duration-300">
                            <td className="px-8 py-5">
                              <div className="flex items-center space-x-4">
                                <div className={`w-9 h-9 ${currentTheme.avatarBg} rounded-lg flex items-center justify-center font-serif font-black text-sm border ${currentTheme.accentBorder} shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                                  {item.userName?.[0] || 'D'}
                                </div>
                                <div>
                                  <p className="font-black text-[var(--admin-text)] italic text-sm leading-none">{item.userName || 'Anonymous Seeker'}</p>
                                  <p className="text-[10px] text-[var(--admin-text-muted)] font-bold uppercase tracking-widest mt-1.5">
                                    {item.userEmail || 'undisclosed@sacred.com'}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex items-center space-x-2">
                                <Sparkles size={11} className="text-secondary animate-pulse" />
                                <span className="text-[var(--admin-text-muted)] font-medium text-xs">
                                  {item.purpose || 'General Devotion'}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <p className="text-xl font-serif font-black text-secondary italic">₹{item.amount?.toLocaleString()}</p>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-md">
                                Blessed
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Donations Tab */}
            {activeTab === 'donations' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-[var(--admin-border)] pb-6">
                  <div>
                    <h2 className="text-4xl font-serif font-black text-[var(--admin-text)] italic">Holy Contributions.</h2>
                    <p className="text-[var(--admin-text-muted)] text-xs font-medium mt-1">Comprehensive record of devotees financially supporting the temple legacy.</p>
                  </div>
                  <div className={`${currentTheme.avatarBg} border ${currentTheme.accentBorder} px-6 py-3 rounded-2xl flex flex-col items-center sm:items-end`}>
                    <p className="text-[10px] text-[var(--admin-text-muted)] font-black uppercase tracking-widest">Total Sourced Sanchaya</p>
                    <p className="text-2xl font-serif font-black text-secondary italic">₹{totalDonations.toLocaleString()}</p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" size={16} />
                  <input
                    type="text"
                    placeholder="Search ledgers by devotee name or sacred purpose..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-4.5 pl-14 pr-6 text-xs text-[var(--admin-text)] placeholder-[var(--admin-text-muted)] focus:outline-none focus:bg-[var(--admin-card-bg)] transition-all font-bold focus:border-[var(--admin-border-focus)]"
                  />
                </div>

                <div className="bg-[var(--admin-card-bg)] backdrop-blur-xl rounded-[2.5rem] border border-[var(--admin-border)] overflow-hidden shadow-2xl shadow-black/50">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[var(--admin-input-bg)] text-secondary text-[11px] uppercase tracking-[0.2em] border-b border-[var(--admin-border)]">
                        <th className="px-8 py-4.5 font-black">Devotee</th>
                        <th className="px-8 py-4.5 font-black">Email ID</th>
                        <th className="px-8 py-4.5 font-black">Sacred Purpose</th>
                        <th className="px-8 py-4.5 font-black">Contribution</th>
                        <th className="px-8 py-4.5 font-black text-right">Ledger Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredDonations.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[var(--admin-input-bg)] transition-colors duration-300">
                          <td className="px-8 py-5 font-black text-[var(--admin-text)] italic text-sm">{item.userName || 'Anonymous Seeker'}</td>
                          <td className="px-8 py-5 text-[var(--admin-text-muted)] font-medium text-xs">{item.userEmail || 'undisclosed@sacred.com'}</td>
                          <td className="px-8 py-5 text-[var(--admin-text-muted)] font-medium text-xs italic">{item.purpose}</td>
                          <td className="px-8 py-5 text-2xl font-serif font-black text-secondary italic">₹{item.amount?.toLocaleString()}</td>
                          <td className="px-8 py-5 text-right">
                            <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Blessed
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredDonations.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-8 py-16 text-center text-gray-600 font-black uppercase tracking-widest text-xs italic">
                            No matching contributions found in temple vault.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="border-b border-[var(--admin-border)] pb-6">
                  <h2 className="text-4xl font-serif font-black text-[var(--admin-text)] italic">Prasad Orders.</h2>
                  <p className="text-[var(--admin-text-muted)] text-xs font-medium mt-1">Holy sweets and protective items dispatched globally to seekers.</p>
                </div>

                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" size={16} />
                  <input
                    type="text"
                    placeholder="Search prasad order registry by recipient or destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-4.5 pl-14 pr-6 text-xs text-[var(--admin-text)] placeholder-[var(--admin-text-muted)] focus:outline-none focus:bg-[var(--admin-card-bg)] transition-all font-bold focus:border-[var(--admin-border-focus)]"
                  />
                </div>

                <div className="bg-[var(--admin-card-bg)] backdrop-blur-xl rounded-[2.5rem] border border-[var(--admin-border)] overflow-hidden shadow-2xl shadow-black/50">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[var(--admin-input-bg)] text-secondary text-[11px] uppercase tracking-[0.2em] border-b border-[var(--admin-border)]">
                        <th className="px-8 py-4.5 font-black">Recipient Seeker</th>
                        <th className="px-8 py-4.5 font-black">Destination</th>
                        <th className="px-8 py-4.5 font-black">Sacred Prasadam</th>
                        <th className="px-8 py-4.5 font-black">Total Grace Sourced</th>
                        <th className="px-8 py-4.5 font-black text-right">Shipment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredOrders.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[var(--admin-input-bg)] transition-colors duration-300">
                          <td className="px-8 py-5 font-black text-[var(--admin-text)] italic text-sm">{item.userName || 'Anonymous Seeker'}</td>
                          <td className="px-8 py-5 text-[var(--admin-text-muted)] font-medium text-xs">{item.address}</td>
                          <td className="px-8 py-5 text-[var(--admin-text-muted)] font-bold text-xs uppercase tracking-wider">
                            {item.items?.[0]?.name || 'Holy Prasadam'}
                          </td>
                          <td className="px-8 py-5 text-2xl font-serif font-black text-secondary italic">₹{item.totalAmount?.toLocaleString()}</td>
                          <td className="px-8 py-5 text-right">
                            <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Dispatched
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-8 py-16 text-center text-gray-600 font-black uppercase tracking-widest text-xs italic">
                            No matching prasad dispatches recorded.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}



            {/* Stay Sanctuaries Tab */}
            {activeTab === 'stays' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <div className="flex justify-between items-center border-b border-[var(--admin-border)] pb-6">
                  <div>
                    <h2 className="text-4xl font-serif font-black text-[var(--admin-text)] italic">Stay Sanctuaries.</h2>
                    <p className="text-[var(--admin-text-muted)] text-xs font-medium mt-1">Manage guest rooms, AC/Non-AC status, pilgrim capacity, and pricing.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingRoom(null);
                      setNewRoom({ name: '', type: 'Normal', price: 500, capacity: 2, description: '', imageUrl: '' });
                      setShowRoomModal(true);
                    }}
                    className={`bg-gradient-to-r ${currentTheme.btnGradient} border ${currentTheme.accentBorder} text-[var(--admin-text)] px-6 py-3 rounded-full font-black text-xs uppercase tracking-[0.18em] flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/45`}
                  >
                    <Plus size={14} className="text-secondary" />
                    <span>Add Sanctuary Room</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(data.rooms || []).map((room, idx) => (
                    <div key={idx} className="bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-[2rem] overflow-hidden group hover:border-secondary/40 transition-all duration-500 shadow-2xl flex flex-col hover:-translate-y-1.5 shadow-black/50">
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={room.imageUrl || room.image || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=600'}
                          alt={room.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-md">
                          {room.type}
                        </div>
                        {room.id && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingRoom(room);
                                setNewRoom({
                                  name: room.name,
                                  type: room.type || 'Normal',
                                  price: room.price,
                                  capacity: room.capacity || 2,
                                  description: room.description || room.desc || '',
                                  imageUrl: room.imageUrl || room.image || ''
                                });
                                setShowRoomModal(true);
                              }}
                              className="absolute top-5 right-15 w-8 h-8 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center text-secondary hover:text-[var(--admin-text)] hover:bg-white/10 transition-all border border-[var(--admin-border)] hover:scale-105 cursor-pointer z-10"
                              title="Edit Room"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  await RoomService.deleteRoom(room.id);
                                  fetchAdminData();
                                } catch (err) {
                                  console.error("Failed to delete room:", err);
                                }
                              }}
                              className="absolute top-5 right-5 w-8 h-8 bg-black/60 backdrop-blur-md rounded-xl flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-white/10 transition-all border border-[var(--admin-border)] hover:scale-105 cursor-pointer z-10"
                              title="Delete Room"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-serif font-black text-[var(--admin-text)] italic group-hover:text-secondary transition-colors duration-300">
                            {room.name}
                          </h3>
                          <p className="text-[var(--admin-text-muted)] text-xs leading-relaxed line-clamp-3">
                            {room.description || room.desc}
                          </p>
                        </div>
                        <div className="pt-2 flex justify-between items-center text-[11px] font-black text-secondary tracking-widest uppercase border-t border-[var(--admin-border)]">
                          <span>Capacity: {room.capacity || 2} Devotees</span>
                          <span className="text-lg font-serif font-black text-[var(--admin-text)] italic">₹{room.price}/day</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-center border-b border-[var(--admin-border)] pb-6">
                  <div>
                    <h2 className="text-4xl font-serif font-black text-[var(--admin-text)] italic">Devotee Mandala.</h2>
                    <p className="text-[var(--admin-text-muted)] text-xs font-medium mt-1">Spiritual register of seekers, pilgrims, and high priests of the sanctuary.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setNewUser({ name: '', email: '', password: '', phone: '', roles: ['ROLE_USER'] });
                      setUserError('');
                      setShowUserModal(true);
                    }}
                    className={`bg-gradient-to-r ${currentTheme.btnGradient} border ${currentTheme.accentBorder} text-[var(--admin-text)] px-6 py-3 rounded-full font-black text-xs uppercase tracking-[0.18em] flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/45`}
                  >
                    <Plus size={14} className="text-secondary" />
                    <span>Add Devotee</span>
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--admin-text-muted)]" size={16} />
                  <input
                    type="text"
                    placeholder="Search seekers by name or spiritual email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-4.5 pl-14 pr-6 text-xs text-[var(--admin-text)] placeholder-[var(--admin-text-muted)] focus:outline-none focus:bg-[var(--admin-card-bg)] transition-all font-bold focus:border-[var(--admin-border-focus)]"
                  />
                </div>

                <div className="bg-[var(--admin-card-bg)] backdrop-blur-xl rounded-[2.5rem] border border-[var(--admin-border)] overflow-hidden shadow-2xl shadow-black/50">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[var(--admin-input-bg)] text-secondary text-[11px] uppercase tracking-[0.2em] border-b border-[var(--admin-border)]">
                        <th className="px-8 py-4.5 font-black">Pilgrim Avatar</th>
                        <th className="px-8 py-4.5 font-black">Pilgrim Name</th>
                        <th className="px-8 py-4.5 font-black">Sacred Email</th>
                        <th className="px-8 py-4.5 font-black">Registered Phone</th>
                        <th className="px-8 py-4.5 font-black">Sanctum Roles</th>
                        <th className="px-8 py-4.5 font-black text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredUsers.map((item, idx) => (
                        <tr key={idx} className="hover:bg-[var(--admin-input-bg)] transition-colors duration-300">
                          <td className="px-8 py-4">
                            <div className={`w-9 h-9 ${currentTheme.avatarBg} rounded-lg flex items-center justify-center font-serif font-black text-sm border ${currentTheme.accentBorder} shadow-inner`}>
                              {item.name?.[0] || 'D'}
                            </div>
                          </td>
                          <td className="px-8 py-4 font-black text-[var(--admin-text)] italic text-sm">{item.name}</td>
                          <td className="px-8 py-4 text-[var(--admin-text-muted)] font-medium text-xs">{item.email}</td>
                          <td className="px-8 py-4 text-[var(--admin-text-muted)] font-medium text-xs">{item.phone || '—'}</td>
                          <td className="px-8 py-4 space-x-2">
                            {(item.roles || ['ROLE_USER']).map((r, i) => (
                              <span key={i} className={`text-[9.5px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider border ${r === 'ROLE_ADMIN' ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-[var(--admin-hover-bg)] text-[var(--admin-text-muted)] border-[var(--admin-border)]'}`}>
                                {r.replace('ROLE_', '')}
                              </span>
                            ))}
                          </td>
                          <td className="px-8 py-4 text-right space-x-3">
                            <button
                              onClick={() => {
                                setEditingUser(item);
                                setNewUser({
                                  name: item.name,
                                  email: item.email,
                                  password: '',
                                  phone: item.phone || '',
                                  roles: item.roles || ['ROLE_USER']
                                });
                                setUserError('');
                                setShowUserModal(true);
                              }}
                              className="text-secondary hover:text-[var(--admin-text)] transition-colors"
                              title="Edit Devotee"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(item)}
                              className="text-rose-400 hover:text-rose-600 transition-colors"
                              title="Delete Devotee"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="border-b border-[var(--admin-border)] pb-6">
                  <h2 className="text-4xl font-serif font-black text-[var(--admin-text)] italic">Temple Configuration.</h2>
                  <p className="text-[var(--admin-text-muted)] text-xs font-medium mt-1">Adjust coordinate fields, sacred Announcements, and dial dial cosmic timings.</p>
                </div>

                <form onSubmit={handleSettingsSubmit} className="space-y-6 max-w-2xl bg-[var(--admin-card-bg)] border border-[var(--admin-border)] p-10 rounded-[2.5rem] shadow-2xl relative shadow-black/50">

                  {settingsSuccess && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 text-emerald-400 p-5 rounded-2xl text-xs text-center border border-emerald-500/20 font-black flex items-center justify-center space-x-2.5 uppercase tracking-widest shadow-lg">
                      <CheckCircle2 size={16} className="animate-bounce" />
                      <span>Sanctuary Configuration Applied Successfully</span>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-secondary ml-1">
                      <Globe size={12} />
                      <span>Temple Name</span>
                    </label>
                    <input
                      type="text"
                      value={settings.templeName}
                      onChange={(e) => setSettings({ ...settings, templeName: e.target.value })}
                      className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-4 px-6 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs focus:bg-[var(--admin-card-bg)] ${currentTheme.inputFocus}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-secondary ml-1">
                      <MapPin size={12} />
                      <span>Physical Address</span>
                    </label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-4 px-6 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs focus:bg-[var(--admin-card-bg)] ${currentTheme.inputFocus}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-secondary ml-1">
                      <Clock size={12} />
                      <span>Darshan Timings</span>
                    </label>
                    <input
                      type="text"
                      value={settings.darshanTime}
                      onChange={(e) => setSettings({ ...settings, darshanTime: e.target.value })}
                      className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-4 px-6 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs focus:bg-[var(--admin-card-bg)] ${currentTheme.inputFocus}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-secondary ml-1">
                      <Megaphone size={12} />
                      <span>Announcement Broadcast Banner</span>
                    </label>
                    <textarea
                      rows="3"
                      value={settings.announcement}
                      onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                      className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-4 px-6 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs focus:bg-[var(--admin-card-bg)] resize-none ${currentTheme.inputFocus}`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${currentTheme.btnGradient} border ${currentTheme.accentBorder} text-[var(--admin-text)] py-4.5 rounded-full font-black uppercase tracking-[0.18em] text-xs hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-xl`}
                  >
                    Apply Sacred Configurations
                  </button>
                </form>
              </motion.div>
            )}

          </div>
        </main>
      </div>



      {/* Add Room Modal Overlay */}
      <AnimatePresence>
        {showRoomModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setShowRoomModal(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="bg-[#0b0b0d]/90 backdrop-blur-2xl border border-[var(--admin-border)] rounded-[3rem] p-10 max-w-md w-full relative z-[501] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Gold Shimmer border line in modal */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

              <button
                type="button"
                onClick={() => setShowRoomModal(false)}
                className="absolute top-6 right-6 text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] p-2 rounded-full hover:bg-[var(--admin-hover-bg)] transition-all"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-serif font-black text-[var(--admin-text)] italic mb-6">
                {editingRoom ? 'Edit' : 'Manifest'} <span className="text-secondary">Sanctuary Room.</span>
              </h3>

              <form onSubmit={handleAddRoom} className="space-y-4">

                {roomSuccess && (
                  <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl text-xs text-center border border-emerald-500/20 font-black uppercase tracking-widest animate-pulse">
                    {editingRoom ? 'Sanctuary Room Updated Successfully' : 'Sanctuary Room Published Successfully'}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Room Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lotus AC Sanctuary"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs ${currentTheme.inputFocus}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Type</label>
                    <select
                      value={newRoom.type}
                      onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                      className={`w-full bg-[#0c0c0e] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-black text-xs uppercase tracking-wider ${currentTheme.inputFocus}`}
                    >
                      <option value="Normal">Normal</option>
                      <option value="AC">AC</option>
                      <option value="Non-AC">Non-AC</option>
                      <option value="Deluxe">Deluxe</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Price per Day (₹)</label>
                    <input
                      type="number"
                      required
                      value={newRoom.price}
                      onChange={(e) => setNewRoom({ ...newRoom, price: Number(e.target.value) })}
                      className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs ${currentTheme.inputFocus}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Capacity</label>
                    <input
                      type="number"
                      required
                      value={newRoom.capacity}
                      onChange={(e) => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })}
                      className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs ${currentTheme.inputFocus}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={newRoom.imageUrl}
                      onChange={(e) => setNewRoom({ ...newRoom, imageUrl: e.target.value })}
                      className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs ${currentTheme.inputFocus}`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Description</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Describe the room, spiritual vibes, view, facilities..."
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                    className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs resize-none ${currentTheme.inputFocus}`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 bg-gradient-to-r ${currentTheme.btnGradient} border ${currentTheme.accentBorder} text-[var(--admin-text)] rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-xl`}
                >
                  {editingRoom ? 'Update Sanctuary Room' : 'Publish Sanctuary Room'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Devotee Modal Overlay */}
      <AnimatePresence>
        {showUserModal && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setShowUserModal(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="bg-[#0b0b0d]/90 backdrop-blur-2xl border border-[var(--admin-border)] rounded-[3rem] p-10 max-w-md w-full relative z-[501] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Gold Shimmer border line in modal */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="absolute top-6 right-6 text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] p-2 rounded-full hover:bg-[var(--admin-hover-bg)] transition-all"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-serif font-black text-[var(--admin-text)] italic mb-6">
                {editingUser ? 'Edit' : 'Add'} <span className="text-secondary">Devotee.</span>
              </h3>

              <form onSubmit={handleSaveUser} className="space-y-4">

                {userSuccess && (
                  <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-xl text-xs text-center border border-emerald-500/20 font-black uppercase tracking-widest animate-pulse">
                    Devotee Saved Successfully
                  </div>
                )}

                {userError && (
                  <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl text-xs text-center border border-rose-500/20 font-black uppercase tracking-widest">
                    {userError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adesh Patil"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs ${currentTheme.inputFocus}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Spiritual Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. adesh@temple.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs ${currentTheme.inputFocus}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">
                    {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
                  </label>
                  <input
                    type="password"
                    required={!editingUser}
                    placeholder={editingUser ? "••••••••" : "e.g. user123"}
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs ${currentTheme.inputFocus}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 9876543210"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      className={`w-full bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-bold text-xs ${currentTheme.inputFocus}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--admin-text-muted)] ml-1">Role</label>
                    <select
                      value={newUser.roles?.[0] || 'ROLE_USER'}
                      onChange={(e) => setNewUser({ ...newUser, roles: [e.target.value] })}
                      className={`w-full bg-[#0c0c0e] border border-[var(--admin-border)] rounded-2xl py-3 px-5 text-[var(--admin-text)] focus:outline-none transition-all font-black text-xs uppercase tracking-wider ${currentTheme.inputFocus}`}
                    >
                      <option value="ROLE_USER">User</option>
                      <option value="ROLE_ADMIN">Admin</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 mt-2 bg-gradient-to-r ${currentTheme.btnGradient} border ${currentTheme.accentBorder} text-[var(--admin-text)] rounded-full font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-98 transition-all duration-300 shadow-xl`}
                >
                  {editingUser ? 'Update Devotee' : 'Register Devotee'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
