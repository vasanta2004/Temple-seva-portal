import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Play, Heart, ShieldCheck, Flame, 
  Volume2, BellRing, Award, Star, Eye, HelpCircle,
  Music, VolumeX
} from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

const GangaAarti = () => {
  const [isAartiStarted, setIsAartiStarted] = useState(false);
  const [diyas, setDiyas] = useState([]);
  const [bellRingsCount, setBellRingsCount] = useState(0);
  const [isRinging, setIsRinging] = useState(false);
  const [showKarpurAarti, setShowKarpurAarti] = useState(false);
  const [isChantPlaying, setIsChantPlaying] = useState(false);
  
  // Conch (Shankh) blast ripple effect state
  const [conchRipples, setConchRipples] = useState([]);
  const [isConchBlowing, setIsConchBlowing] = useState(false);

  // Virtual Aarti Plate cursor tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringPlayer, setIsHoveringPlayer] = useState(false);

  // Live devotee activity ticker
  const [recentActivity, setRecentActivity] = useState("Devotee Anjali from Bengaluru just floated a Diya");

  // Periodic activity simulation ticker
  useEffect(() => {
    const activities = [
      "Devotee Anjali from Bengaluru just floated a Diya",
      "Devotee Ramesh from Hubli just rang the Temple Bell",
      "Devotee Suman from New Delhi offered Camphor Aarti",
      "Devotee Gurupreet from Amritsar just blew the Shankha",
      "Devotee Keerthi from Mysuru floated 3 golden Diyas",
      "Devotee Vasanta from Chennai offered prayers to Swami Siddharoodha"
    ];
    
    const interval = setInterval(() => {
      const randomAct = activities[Math.floor(Math.random() * activities.length)];
      setRecentActivity(randomAct);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  // Offer a virtuales Diya
  const handleOfferDiya = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newDiya = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.random() * 20 + 20,
    };
    
    setDiyas((prev) => [...prev, newDiya]);
    
    setTimeout(() => {
      setDiyas((prev) => prev.filter((d) => d.id !== newDiya.id));
    }, 8500);
  };

  // Ring temple bell
  const handleRingBell = () => {
    setBellRingsCount((c) => c + 1);
    setIsRinging(true);
    
    setTimeout(() => {
      setIsRinging(false);
    }, 1500);

    try {
      const audio = new Audio('/temple_bell.mp3');
      audio.play().catch((e) => {});
    } catch (e) {}
  };

  // Blow Conch Shell (Shankha)
  const handleBlowConch = () => {
    setIsConchBlowing(true);
    
    // Add ripple coordinates (centered in viewport)
    const newRipple = {
      id: Date.now(),
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    setConchRipples([newRipple]);

    // Play conch sound
    try {
      const audio = new Audio('/temple_bell.mp3'); // Fallback to bell if no separate conch file
      audio.play().catch((e) => {});
    } catch (e) {}

    setTimeout(() => {
      setIsConchBlowing(false);
      setConchRipples([]);
    }, 4000);
  };

  const triggerKarpurAarti = () => {
    setShowKarpurAarti(true);
    try {
      const audio = new Audio('/temple_bell.mp3');
      audio.play().catch((e) => {});
    } catch (e) {}

    setTimeout(() => {
      setShowKarpurAarti(false);
    }, 5500);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="min-h-screen text-white pt-36 pb-20 relative overflow-hidden bg-[#070505]"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(11, 8, 8, 0.93), rgba(31, 20, 37, 0.95), rgba(45, 22, 18, 0.97)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      
      {/* Styles for advanced interactive animations */}
      <style>{`
        @keyframes spinMandala {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes rippleOut {
          0% { transform: scale(0.1); opacity: 1; border-width: 8px; }
          50% { opacity: 0.5; }
          100% { transform: scale(3); opacity: 0; border-width: 1px; }
        }
        @keyframes audioBar {
          0%, 100% { height: 4px; }
          50% { height: 28px; }
        }
        @keyframes riverDrift {
          0% { background-position-x: 0px; }
          100% { background-position-x: -1000px; }
        }
        @keyframes flameSway {
          0%, 100% { transform: scale(1) rotate(-1deg); }
          30% { transform: scale(1.1) rotate(2deg) skewX(2deg); }
          60% { transform: scale(0.95) rotate(-3deg) skewX(-1deg); }
          80% { transform: scale(1.05) rotate(1deg); }
        }
        .mandala-rotate {
          animation: spinMandala 200s linear infinite;
        }
        .conch-ripple {
          animation: rippleOut 3.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
        .flame-sway {
          animation: flameSway 0.2s ease-in-out infinite;
        }
        .audio-eq-bar {
          animation: audioBar 1.2s ease-in-out infinite;
        }
        .river-bg-flow {
          background-image: radial-gradient(circle at 50% 120%, rgba(13, 27, 84, 0.4) 0%, rgba(10, 12, 32, 0.95) 80%);
        }
        .gold-metallic-border {
          box-shadow: 0 0 0 1px rgba(212, 175, 55, 0.2), 0 0 35px rgba(212, 175, 55, 0.05), inset 0 0 15px rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.15);
        }
        .divine-brass-glow {
          text-shadow: 0 0 25px rgba(212, 175, 55, 0.3), 0 0 50px rgba(212, 175, 55, 0.1);
        }
      `}</style>

      {/* Parallax ambient mist layers */}
      <div className="absolute top-0 inset-x-0 h-[450px] bg-gradient-to-b from-black to-transparent opacity-95 pointer-events-none z-0" />
      <div className="absolute -bottom-20 inset-x-0 h-96 bg-gradient-to-t from-black to-transparent opacity-90 z-0 pointer-events-none" />

      {/* Floating glowing embers particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-t from-red-500 to-amber-400 blur-[1px] animate-pulse"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 4}s`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Slowly Rotating Sacred Geometry Mandala */}
      <div className="absolute top-1/3 left-1/2 w-[900px] h-[900px] opacity-[0.04] pointer-events-none select-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-secondary fill-none stroke-[0.2] mandala-rotate absolute top-1/2 left-1/2">
          <circle cx="50" cy="50" r="46" />
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="32" />
          <circle cx="50" cy="50" r="22" />
          {[...Array(36)].map((_, idx) => (
            <line 
              key={idx} 
              x1="50" y1="2" x2="50" y2="98" 
              transform={`rotate(${idx * 5} 50 50)`} 
            />
          ))}
          {[...Array(12)].map((_, idx) => (
            <circle 
              key={idx} 
              cx="50" cy="50" r={idx * 4} 
              strokeDasharray="2, 2" 
            />
          ))}
        </svg>
      </div>

      {/* Blow Conch Shell Cosmic Ripple Overlays */}
      <AnimatePresence>
        {conchRipples.map((ripple) => (
          <div 
            key={ripple.id}
            className="fixed inset-0 pointer-events-none z-[150] flex items-center justify-center"
          >
            <div className="w-[100vw] h-[100vw] border-4 border-secondary/60 rounded-full conch-ripple" />
          </div>
        ))}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Sacred Header with Glowing Typography */}
        <div className="text-center mb-16 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/35 px-4 py-2 rounded-full backdrop-blur-md"
          >
            <Sparkles className="text-secondary animate-pulse" size={14} />
            <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px]">Dev Prayag Sanctum</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-serif font-black tracking-tight leading-none block select-none">
            <span className="bg-gradient-to-r from-amber-100 via-secondary to-rose-300 bg-clip-text text-transparent divine-brass-glow">
              GANGA <span className="italic font-normal font-serif text-white drop-shadow-none">Aarti</span>
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-300 text-lg sm:text-xl font-light leading-relaxed italic drop-shadow-md">
            Experience the divine synchronization of fire, music, and prayer offered to the sacred mother Ganga. Elevate your spiritual essence from anywhere in the universe.
          </p>


        </div>

        {/* Dashboard layout splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Visual player & controls (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Visual Player with Gold Border Frame */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringPlayer(true)}
              onMouseLeave={() => setIsHoveringPlayer(false)}
              className={`relative max-w-[450px] mx-auto aspect-[9/16] bg-[#0b0b0f] rounded-[3.5rem] overflow-hidden gold-metallic-border shadow-[0_15px_60px_rgba(0,0,0,0.8)] group flex items-center justify-center ${isAartiStarted && isHoveringPlayer ? 'cursor-none' : ''}`}
            >
              
              {/* Pulsing Live Badge Overlay */}
              <div className="absolute top-8 left-8 flex items-center space-x-3 bg-red-600/90 backdrop-blur-md px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest text-white shadow-xl z-20 pointer-events-none animate-pulse">
                <span className="w-2.5 h-2.5 bg-white rounded-full" />
                <span>SACRED LIVE</span>
              </div>

              {isAartiStarted ? (
                <div className="w-full h-full relative">
                  <video
                    className="w-full h-full object-cover"
                    src="/ganga arti.mp4"
                    autoPlay
                    loop
                    controls
                  />

                  {/* 🪔 Interactive Virtual Aarti Plate Cursor Overlay */}
                  {isHoveringPlayer && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: mousePos.x,
                        top: mousePos.y,
                        translateX: '-50%',
                        translateY: '-50%',
                        pointerEvents: 'none',
                      }}
                      className="z-50 flex flex-col items-center select-none"
                    >
                      {/* Glowing aura ring */}
                      <div className="absolute -inset-6 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
                      
                      {/* Golden Plate circular frame */}
                      <div className="w-16 h-16 rounded-full border-2 border-secondary bg-[#1a120c]/90 flex items-center justify-center relative shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                        <div className="w-12 h-12 rounded-full border border-dashed border-secondary/50 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-1.5" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 absolute bottom-1.5" />
                        </div>
                        {/* Centered oil flame container */}
                        <div className="w-6 h-6 bg-amber-900 rounded-full absolute flex items-center justify-center border border-secondary shadow-md">
                          {/* Diya Flame */}
                          <div className="w-4 h-7 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-full blur-[0.5px] animate-bounce flame-sway" />
                        </div>
                      </div>
                      <span className="text-[6px] font-black uppercase tracking-widest text-secondary mt-1 bg-black/60 px-1.5 py-0.5 rounded-full border border-secondary/20">WAVE AARTI</span>
                    </motion.div>
                  )}

                  {/* Karpur Aarti Camphor overlay fire effect */}
                  <AnimatePresence>
                    {showKarpurAarti && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-amber-600/40 via-amber-500/10 to-transparent flex flex-col justify-end p-12 pointer-events-none z-10"
                      >
                        <div className="text-center space-y-4">
                          <div className="w-28 h-40 bg-gradient-to-t from-red-600 via-amber-400 to-yellow-100 rounded-full blur-[4px] mx-auto animate-bounce flame-sway" />
                          <h4 className="text-3xl font-serif font-black italic text-secondary divine-glow drop-shadow-md">Offering Camphor Aarti...</h4>
                          <p className="text-white/80 text-[10px] font-black uppercase tracking-widest">May your path be illuminated with wisdom</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center p-10 relative z-20 space-y-6">
                  {/* Custom Glowing Play Button */}
                  <div className="relative inline-block">
                    <motion.div 
                      className="absolute -inset-4 bg-secondary/25 rounded-full blur-2xl animate-pulse"
                    />
                    <motion.button 
                      onClick={() => setIsAartiStarted(true)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-24 h-24 bg-gradient-to-br from-secondary to-yellow-500 text-primary rounded-full flex items-center justify-center relative z-10 cursor-pointer shadow-[0_0_35px_rgba(212,175,55,0.4)]"
                    >
                      <Play size={36} fill="currentColor" className="ml-1 text-[#2d1612]" />
                    </motion.button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-black text-secondary tracking-wider uppercase">Connect Live Ganga Aarti</h3>
                    <p className="text-gray-400 text-[10px] tracking-widest uppercase font-black">Broadcasting Live from Dev Prayag Sanctum</p>
                  </div>
                </div>
              )}
            </div>


          </div>

          {/* Right Column: Audio visualizer, Scripture Scroll & Swinging Bell Card (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 🔔 Hanging Brass Temple Bell Card */}
            <div className="bg-gradient-to-b from-[#191513] to-[#0D0E12] p-8 rounded-[3.5rem] relative shadow-2xl overflow-hidden border border-secondary/20 flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
              
              <div className="relative mb-6">
                {/* Hanging brass chain */}
                <div className="w-1.5 h-16 bg-gradient-to-b from-secondary/80 to-secondary mx-auto rounded-full" />
                
                {/* Swinging Bell Dome */}
                <motion.div 
                  animate={isRinging ? {
                    rotate: [0, 16, -14, 10, -7, 4, 0],
                    transition: { duration: 1.5, ease: "easeInOut" }
                  } : {}}
                  style={{ transformOrigin: 'top center' }}
                  onClick={handleRingBell}
                  className="cursor-pointer select-none filter drop-shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.75)] transition-all"
                >
                  <div className="w-20 h-20 bg-gradient-to-b from-[#bda030] via-secondary to-[#876e1a] rounded-t-full border border-secondary/40 relative flex items-end justify-center pb-2">
                    {/* Bell clapper */}
                    <div className="w-3.5 h-6 bg-amber-300 rounded-full absolute -bottom-3 shadow-md" />
                  </div>
                  <div className="w-24 h-4.5 bg-gradient-to-r from-[#876e1a] via-[#fcd443] to-[#876e1a] rounded-full -mt-1 border border-secondary/35" />
                </motion.div>
              </div>

              <div className="space-y-2 relative z-10">
                <h4 className="text-secondary font-serif font-black tracking-widest text-xs uppercase">Sacred Chime Bell</h4>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Tap to Ring for Auspicious Energy</p>
              </div>
            </div>



            {/* Spiritual Blessings Card */}
            <div className="bg-gradient-to-br from-secondary/10 via-rose-600/5 to-rose-600/10 border border-secondary/20 p-8 rounded-[3rem] relative overflow-hidden gold-metallic-border">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <h4 className="text-secondary font-black text-xs tracking-widest uppercase flex items-center space-x-2">
                  <ShieldCheck size={16} />
                  <span>Divine Blessings</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed italic font-medium">
                  Participating in Ganga Aarti purifies the inner consciousness and invokes cosmic peace. Every diya floated on the virtual riverbed represents a silent prayer of gratitude to the universe.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default GangaAarti;
