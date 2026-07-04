import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Bell, User, Search, Globe, ChevronDown, Sparkles, Type } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const { user, logout, fontSize, setFontSize } = useAuth();

  const navLinks = [
    { name: 'Sanctuary', path: '/' },
    { name: 'Legacy', path: '/about' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Sevas', path: '/sevas' },
    { name: 'Stay', path: '/rooms' },
    { name: 'Prasadam', path: '/prasad' },
    { name: 'Fair', path: '/events' },
    { name: 'Festivals', path: '/festivals' },
    { name: 'Live', path: '/live-darshan' },
    { name: 'Donate', path: '/donate' },
    { name: 'Ganga Aarti', path: '/ganga-aarti' },
  ];

  return (
    <nav className="absolute left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8 top-6 flex justify-center">
      <div className="max-w-[95%] xl:max-w-7xl w-full transition-all duration-700 navbar-modern rounded-full py-2.5 px-4 xl:px-8 bg-[#140E0C]/45 backdrop-blur-md border border-secondary/20 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center">
          {/* Minimal Brand */}
          <Link to="/" className="flex items-center space-x-2 xl:space-x-3 group">
            <div className="w-8 h-8 xl:w-10 xl:h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 group-hover:rotate-[360deg] transition-all duration-1000">
               <Sparkles size={16} className="text-secondary xl:w-5 xl:h-5" />
            </div>
            <span className="text-white font-serif font-black text-base lg:text-lg xl:text-[22px] tracking-tight group-hover:text-secondary transition-colors">SIDDHAROODHA</span>
          </Link>

          {/* Modern Central Nav */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="px-2.5 xl:px-3 py-2 text-xs xl:text-[14px] font-serif font-black uppercase tracking-wider text-white/80 hover:text-white transition-all relative"
              >
                <span>{link.name}</span>
                {(location.pathname === link.path || hoveredLink === link.name) && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="nav-dot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
 
          {/* Modern Actions */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
             <div className="w-8 h-8 xl:w-10 xl:h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                <Search size={16} className="xl:w-[18px] xl:h-[18px]" />
             </div>

             {/* Accessibility Font Size Selector */}
             <div className="flex items-center space-x-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full shadow-inner">
                <Type size={12} className="text-secondary" />
                {[
                  { key: 'medium', label: 'A', title: 'Normal Font' },
                  { key: 'large', label: 'A+', title: 'Large Font' },
                  { key: 'xlarge', label: 'A++', title: 'Extra Large Font' }
                ].map((sz) => {
                  const isSelected = fontSize === sz.key;
                  return (
                    <button
                      key={sz.key}
                      onClick={() => setFontSize(sz.key)}
                      title={sz.title}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-black cursor-pointer leading-none transition-all duration-200 ${isSelected ? 'bg-secondary text-primary' : 'text-white/60 hover:text-white'}`}
                    >
                      {sz.label}
                    </button>
                  );
                })}
             </div>
             
             <div className="w-[1px] h-6 bg-white/10" />
 
              {user ? (
                <div className="flex items-center space-x-2 xl:space-x-4">
                  <Link 
                    to={user?.roles?.includes('ROLE_ADMIN') ? "/admin" : "/dashboard"} 
                    className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-primary transition-all relative group/user"
                  >
                    <User size={16} className="xl:w-[18px] xl:h-[18px]" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-primary scale-0 group-hover/user:scale-100 transition-transform" />
                  </Link>
                  <button onClick={logout} className="text-xs xl:text-[13px] font-serif font-black uppercase tracking-wider text-primary bg-secondary px-4 xl:px-5 py-2 xl:py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 xl:space-x-3">
                  <Link to="/login" className="hidden sm:flex items-center space-x-1.5 bg-white/5 px-4 xl:px-5 py-2 xl:py-2.5 rounded-full border border-white/10 text-white hover:bg-white hover:text-primary transition-all group">
                    <span className="text-xs xl:text-[13px] font-serif font-black uppercase tracking-wider">Sign In</span>
                  </Link>
                  <Link to="/register" className="flex items-center space-x-1.5 bg-secondary px-4 xl:px-5 py-2 xl:py-2.5 rounded-full text-primary hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all group">
                    <span className="text-xs xl:text-[13px] font-serif font-black uppercase tracking-wider">Join Us</span>
                    <Sparkles size={12} className="group-hover:rotate-12 transition-transform xl:w-[14px] xl:h-[14px]" />
                  </Link>
                </div>
              )}
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Minimal Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-24 left-6 right-6 z-[110] bg-primary/95 backdrop-blur-2xl p-10 rounded-[3rem] shadow-3xl border border-white/10"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block py-4 text-center text-2xl font-serif font-black transition-all ${location.pathname === link.path ? 'text-secondary' : 'text-white/60'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile Font Size Accessibility Toggle */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-white/80 font-serif font-black text-sm uppercase tracking-wider flex items-center gap-2">
                  <Type size={16} className="text-secondary" /> Font Size
                </span>
                <div className="flex space-x-2">
                  {[
                    { key: 'medium', label: 'A', title: 'Normal' },
                    { key: 'large', label: 'A+', title: 'Large' },
                    { key: 'xlarge', label: 'A++', title: 'Extra Large' }
                  ].map((sz) => {
                    const isSelected = fontSize === sz.key;
                    return (
                      <button
                        key={sz.key}
                        onClick={() => setFontSize(sz.key)}
                        title={sz.title}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black cursor-pointer leading-none transition-all duration-200 ${isSelected ? 'bg-secondary text-primary' : 'bg-white/5 text-white/60 hover:text-white'}`}
                      >
                        {sz.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 grid grid-cols-1 gap-4">
                 {user ? (
                   <button onClick={logout} className="p-5 bg-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs">Logout</button>
                 ) : (
                   <Link to="/login" className="p-5 bg-secondary rounded-2xl text-primary font-black uppercase tracking-widest text-xs text-center" onClick={() => setIsMobileMenuOpen(false)}>Access Portal</Link>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
