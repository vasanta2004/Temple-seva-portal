import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Calendar,
  Heart,
  ArrowRight,
  BookOpen,
  Sun,
  Moon,
  Compass,
  Star,
  Activity,
  Award,
  Sparkles,
  Sunrise,
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

// 📸 Custom Inline Instagram Icon component (compile-safe)
const InstagramIcon = ({ size = 12, className }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2.5" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
import swamiImg from '../assets/1.jpg';
import AnimatedWords from '../components/AnimatedWords';

// 🌸 Simulated Wind-Drift Marigold Flower Petals Component
const FallingPetals = () => {
  const petals = Array.from({ length: 22 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 14,
    size: 14 + Math.random() * 16,
    rotateStart: Math.random() * 360,
    wind: Math.random() * 80 - 40,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: p.left, top: -40 }}
          initial={{ y: -40, opacity: 0, rotate: p.rotateStart }}
          animate={{
            y: "115vh",
            x: [0, p.wind, p.wind * 2.5],
            opacity: [0, 0.9, 0.9, 0],
            rotate: p.rotateStart + 360,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        >
          {/* Saffron/Orange Marigold Petal SVG */}
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 24 24"
            fill="none"
            className="filter drop-shadow-[0_3px_5px_rgba(230,81,0,0.35)]"
          >
            <path
              d="M12 2C8 6 6 10 6 13C6 17 9 20 12 20C15 20 18 17 18 13C18 10 16 6 12 2Z"
              fill={p.id % 2 === 0 ? "#FF9100" : "#E65100"}
              opacity={0.88}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// ⛩️ Interactive Sliding Temple Gate Entrance Overlay Component
const TempleGateEntrance = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ delay: 2.2, duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex overflow-hidden"
      >
        {/* Left Gate Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-[#0B0806] border-r border-[#D4AF37]/35 flex items-center justify-end relative shadow-[10px_0_30px_rgba(0,0,0,0.8)]"
        >
          {/* Ornate Gold Mandalas on Left Gate */}
          <div className="absolute top-1/2 right-[-64px] -translate-y-1/2 w-32 h-64 border-[3px] border-[#D4AF37]/45 rounded-l-full bg-[#140E0C] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.25)] z-50">
            <span className="text-secondary text-5xl font-serif translate-x-3 select-none">ॐ</span>
          </div>
          {/* Sacred corner vectors */}
          <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 border-secondary/20 rounded-tl-xl" />
          <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 border-secondary/20 rounded-bl-xl" />
        </motion.div>

        {/* Right Gate Door */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          className="w-1/2 h-full bg-[#0B0806] border-l border-[#D4AF37]/35 flex items-center justify-start relative shadow-[-10px_0_30px_rgba(0,0,0,0.8)]"
        >
          {/* Ornate Gold Mandalas on Right Gate */}
          <div className="absolute top-1/2 left-[-64px] -translate-y-1/2 w-32 h-64 border-[3px] border-[#D4AF37]/45 rounded-r-full bg-[#140E0C] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.25)] z-50">
            <span className="text-secondary text-5xl font-serif -translate-x-3 select-none">ॐ</span>
          </div>
          {/* Sacred corner vectors */}
          <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 border-secondary/20 rounded-tr-xl" />
          <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 border-secondary/20 rounded-br-xl" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// 🔔 Custom Swinging Brass Bell Component
const SwingingBell = ({ className }) => {
  const [isRinging, setIsRinging] = useState(false);

  const ringBell = () => {
    setIsRinging(true);
    setTimeout(() => setIsRinging(false), 1500);

    try {
      const audio = new Audio('/temple_bell.mp3');
      audio.play().catch((e) => console.log('Audio playback blocked or failed:', e));
    } catch (e) {
      console.log('Audio not supported', e);
    }
  };

  return (
    <div
      onClick={ringBell}
      className={`flex flex-col items-center cursor-pointer transition-transform duration-300 group ${className} ${isRinging ? 'scale-110' : 'hover:scale-105'
        }`}
    >
      <div className="w-[3px] h-16 bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/50 to-[#D4AF37]" />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ transformOrigin: 'top center' }}
        className={`w-12 h-12 text-secondary fill-[#D4AF37]/15 stroke-[#D4AF37] stroke-[0.5] filter drop-shadow-[0_0_12px_rgba(212,175,55,0.55)] transition-all duration-300 ${isRinging
            ? 'animate-[bellSwing_1.5s_ease-in-out_infinite] text-amber-300 fill-amber-300/30'
            : 'bell-swing'
          }`}
      >
        <path d="M12 2a3 3 0 0 0-3 3v8H5a2 2 0 0 0-2 2v2h18v-2a2 2 0 0 0-2-2h-4V5a3 3 0 0 0-3-3zm0 18a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2z" />
      </svg>
      <span className="text-[7px] text-secondary/60 mt-1 uppercase tracking-widest pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">Ring</span>
    </div>
  );
};

// 🪔 Glowing Flickering Clay Diya Component
const FlickeringDiya = ({ className }) => (
  <div className={`flex flex-col items-center justify-center relative ${className}`}>
    {/* Diya Clay Base */}
    <svg viewBox="0 0 48 32" className="w-16 h-12 text-[#5D4037] fill-[#4E342E]/95 filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.6)]">
      <path d="M4 16C4 24 12 28 24 28C36 28 44 24 44 16C44 12 40 8 24 8C8 8 4 12 4 16Z" />
      <ellipse cx="24" cy="14" rx="16" ry="6" fill="#3E2723" />
    </svg>

    {/* Glowing Flicker Flame */}
    <div className="absolute top-[-6px] w-4.5 h-8 bg-gradient-to-t from-[#D50000] via-[#FF6D00] to-[#FFEE58] rounded-[50%_50%_20%_20%_/_70%_70%_30%_30%] diya-flame flex items-center justify-center">
      <div className="w-1.5 h-3.5 bg-white rounded-full blur-[0.3px] opacity-75" />
    </div>

    {/* Ambient Glow Aura */}
    <div className="absolute top-[-14px] w-14 h-14 bg-amber-500/15 rounded-full blur-xl animate-pulse pointer-events-none" />
  </div>
);

// 💫 Orbit Node Component with details expander
const OrbitNode = ({ link, icon, title, desc, spotlight }) => {
  const navigate = useNavigate();
  return (
    <div className="orbit-child relative flex items-center justify-center group/node">
      {/* Outer Glow Ring */}
      <div 
        className="absolute -inset-3 rounded-full opacity-0 group-hover/node:opacity-100 blur-md transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${spotlight} 0%, transparent 70%)`
        }}
      />
      
      {/* Expanding text container */}
      <div className="absolute left-16 bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/10 p-5 rounded-3xl w-56 shadow-2xl pointer-events-none opacity-0 translate-x-2 group-hover/node:opacity-100 group-hover/node:translate-x-0 transition-all duration-300 z-50">
        <h4 className="text-secondary font-serif font-black text-sm mb-1 italic">{title}</h4>
        <p className="text-gray-400 text-[10px] leading-relaxed font-light">{desc}</p>
        <span className="text-[7px] text-secondary/60 mt-2 block font-black uppercase tracking-widest leading-none">Click to enter</span>
      </div>

      {/* Circle Icon Button */}
      <button
        onClick={() => navigate(link)}
        className="w-13 h-13 bg-[#140E0C]/90 hover:bg-secondary text-secondary hover:text-[#0C0908] rounded-full border border-secondary/35 flex items-center justify-center transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-115 active:scale-95 group-hover/node:border-secondary"
      >
        {icon}
      </button>
    </div>
  );
};

// 🪔 Simulated Rising Incense Smoke Particle Overlay
const IncenseSmoke = () => {
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${15 + Math.random() * 70}%`,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 8,
    size: 20 + Math.random() * 30,
    drift: Math.random() * 80 - 40,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-gradient-to-t from-secondary/5 via-secondary/3 to-transparent filter blur-[10px]"
          style={{ left: p.left, width: p.size, height: p.size * 1.6 }}
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{
            y: "-110vh",
            x: [0, p.drift, -p.drift, p.drift * 1.5],
            opacity: [0, 0.4, 0.4, 0],
            scale: [0.8, 1.8, 2.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};



// 🌗 Day/Night Vedic dial theme controller
const ThemeToggle = ({ isVedicDay, setIsVedicDay }) => (
  <button
    onClick={() => setIsVedicDay(!isVedicDay)}
    className="fixed bottom-8 right-8 z-[999] bg-[#140E0C]/90 backdrop-blur-3xl p-3.5 rounded-full border border-secondary/35 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-secondary/60 transition-colors duration-300 text-secondary hover:scale-105 active:scale-95"
    title={isVedicDay ? "Switch to Midnight Darshan" : "Switch to Saffron Sunrise"}
  >
    {isVedicDay ? <Sun size={20} className="animate-spin-slow text-[#D4AF37]" /> : <Moon size={20} className="text-blue-200" />}
  </button>
);



// 🕉️ Sanskrit Quote & Shloka Panel Component
const SacredWisdomPanel = () => {
  const wisdomList = [
    {
      shloka: "ನಮೋ ಸದ್ಗುರು ಸಿದ್ಧಾರೂಢಾಯ ಕಲ್ಯಾಣಮೂರ್ತಯೇ | ಕಲ್ಯಾಣಗುಣಸಿಂಧವೇ ದೇವದೇವಾಯ ತೇ ನಮಃ ||",
      translation: "Salutations to Sadguru Siddharoodha, the embodiment of divine auspiciousness, the ocean of auspicious qualities, the supreme Lord of Lords."
    },
    {
      shloka: "ತಮೇವ ವಿದಿತ್ವಾತಿ ಮೃತ್ಯುಮೇತಿ ನಾನ್ಯಃ ಪಂಥಾ ವಿದ್ಯತೇಽಯನಾಯ |",
      translation: "Only by knowing Him does one cross beyond death; there is no other path for liberation."
    },
    {
      shloka: "ಓಂ ತತ್ಸದ್ ಬ್ರಹ್ಮಾರ್ಪಣಮಸ್ತು |",
      translation: "All actions offered to the Supreme Self are pure truth and lead to ultimate freedom."
    },
    {
      shloka: "ಆತ್ಮಾನಂ ವಿದ್ಧಿ | ಸರ್ವಂ ಹಿ ಆತ್ಮಮಯಂ ಜಗತ್ ||",
      translation: "Know thyself. The entire universe is indeed filled with the light of the Supreme Soul."
    },
    {
      shloka: "ಶ್ರದ್ಧಾವಾನ್ ಲಭತೇ ಜ್ಞಾನಂ ತತ್ಪರಃ ಸಂಯತೇಂದ್ರಿಯಃ |",
      translation: "The man of faith, who is devoted to the Supreme and has mastered his senses, attains spiritual wisdom."
    }
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleNext = () => {
    // Play a gentle bell chime as a blessing
    try {
      const audio = new Audio('/temple_bell.mp3');
      audio.volume = 0.45;
      audio.play().catch((e) => console.log('Audio playback blocked:', e));
    } catch (e) {
      console.log('Audio not supported:', e);
    }

    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % wisdomList.length);
      setFade(true);
    }, 300);
  };

  return (
    <div className="py-8 px-10 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-secondary/35 max-w-xl relative overflow-hidden group shadow-[0_25px_50px_rgba(0,0,0,0.65)] hover:-translate-y-1 transition-all duration-500">
      {/* Decorative Gold Leaf Inner Border Frame */}
      <div className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-secondary/15 rounded-[2.1rem] pointer-events-none" />

      {/* ॐ Sanskrit Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] text-secondary text-[160px] font-serif select-none transition-transform duration-1000 group-hover:scale-110">
        ॐ
      </div>

      <div className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'} relative z-10`}>
        <p className="font-serif font-black text-secondary text-xl select-none leading-relaxed min-h-[4rem] flex items-center drop-shadow-md">
          {wisdomList[index].shloka}
        </p>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-300 mt-4 leading-relaxed italic min-h-[3rem]">
          "{wisdomList[index].translation}"
        </p>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10 relative z-10">
        <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">
          Divine Wisdom • {index + 1} / {wisdomList.length}
        </span>
        <button
          onClick={handleNext}
          className="px-5 py-2 bg-secondary/10 hover:bg-secondary text-secondary hover:text-[#0C0908] border border-secondary/30 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-md hover:scale-103 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
        >
          Seek Wisdom
        </button>
      </div>
    </div>
  );
};


// 🕉️ Scrolling Sanskrit Mantra Belt Component
const MantraMarquee = () => {
  return (
    <div className="w-full bg-[#0C0908]/75 backdrop-blur-md border-t border-b border-secondary/20 py-4.5 overflow-hidden relative z-20">
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {Array.from({ length: 8 }).map((_, idx) => (
          <span key={idx} className="text-secondary font-serif font-black text-xs sm:text-sm tracking-[0.25em] mx-10 opacity-75 select-none">
            ಓಂ ನಮೋ ಭಗವತೇ ಸಿದ್ಧಾರೂಢಾಯ ನಮಃ • ಶ್ರೀ ಸದ್ಗುರು ಸಿದ್ಧಾರೂಢ ಮಹಾರಾಜ್ ಕೀ ಜೈ •
          </span>
        ))}
      </div>
    </div>
  );
};



const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  // Day/Night state toggle
  const [isVedicDay, setIsVedicDay] = useState(true);

  // Scroll Progress logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollProgressSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.04]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);



  // 6 Devotional Service Cards
  const poojaCards = [
    { icon: <Calendar size={24} />, title: 'Seva Booking', desc: 'Secure reservations for ancient Vedic rituals, Archana, and Abhishek.', link: '/sevas', spotlight: 'rgba(230,81,0,0.2)' },
    { icon: <Heart size={24} />, title: 'Online Donations', desc: 'Contribute gracefully to Annadanam, infrastructure, and spiritual legacy.', link: '/donate', spotlight: 'rgba(212,175,55,0.2)' },
    { icon: <Clock size={24} />, title: 'Temple Festivals', desc: 'View complete details of upcoming holy festivals and celebrations.', link: '/festivals', spotlight: 'rgba(183,28,28,0.2)' },
    { icon: <Compass size={24} />, title: 'Prasada Delivery', desc: 'Receive blessed dry sweets, flowers, and holy threads directly at home.', link: '/prasad', spotlight: 'rgba(230,81,0,0.2)' },
    { icon: <Sunrise size={24} />, title: 'Daily Pooja Schedule', desc: 'Browse early dawn hymns, Maha Aarti timings, and holy chanting slots.', link: '/schedule', spotlight: 'rgba(212,175,55,0.2)' },
    { icon: <Play size={24} />, title: 'Live Streaming Darshan', desc: 'Virtual gateway to the inner sanctum of Swami Siddharoodha.', link: '/live-darshan', spotlight: 'rgba(183,28,28,0.2)' },
  ];

  // Daily pooja events schedule timeline
  const poojaTimeline = [
    { time: '05:30 AM', event: 'Suprabhata Darshan', icon: <Sunrise />, desc: 'Waking the Sadguru deity with auspicious Vedic chanting.' },
    { time: '06:30 AM', event: 'Maha Aarti Puja', icon: <Sun />, desc: 'Sacred fire offerings accompanied by bell resonance.' },
    { time: '12:30 PM', event: 'Holy Annadanam', icon: <Compass />, desc: 'Prasadam community dining served in deep gratitude.' },
    { time: '07:30 PM', event: 'Maha Deepotsava', icon: <Moon />, desc: 'Illumination of thousands of flickering brass oil lamps.' },
  ];

  return (
    <div
      ref={containerRef}
      className={`flex flex-col relative z-10 transition-colors duration-1000 overflow-hidden ${isVedicDay
          ? 'bg-gradient-to-b from-[#060408] via-[#0B080E] to-[#040306]'
          : 'bg-gradient-to-b from-[#030204] via-[#050407] to-[#010102]'
        }`}
    >



      {/* 🌸 Saffron Marigold Flower Petals Shower Overlay */}
      <FallingPetals />

      {/* 🪔 Rising Incense Smoke Plumes */}
      <IncenseSmoke />

      {/* ⛩️ Temple Gate Opening Animation */}
      <TempleGateEntrance />



      {/* 🌗 day night toggle dials */}
      <ThemeToggle isVedicDay={isVedicDay} setIsVedicDay={setIsVedicDay} />

      {/* 🌌 Atmospheric Sunburst / Midnight Star Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-10%] left-[-15%] w-[1000px] h-[1000px] blur-[220px] rounded-full transition-all duration-1000 ${isVedicDay ? 'bg-secondary/15' : 'bg-blue-900/10'
          }`} />
        <div className={`absolute top-[35%] right-[-10%] w-[900px] h-[900px] blur-[200px] rounded-full transition-all duration-1000 ${isVedicDay ? 'bg-[#FF5E00]/10' : 'bg-indigo-900/5'
          }`} />
        <div className={`absolute bottom-[20%] left-[-10%] w-[1000px] h-[1000px] blur-[220px] rounded-full transition-all duration-1000 ${isVedicDay ? 'bg-secondary/5' : 'bg-[#140E0C]/5'
          }`} />
      </div>

      {/* 🌅 CINEMATIC SUNRISE HERO SCREEN */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center justify-center py-28 overflow-hidden group/hero z-10"
      >

        {/* Dynamic Zooming Sunburst Background */}
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0 select-none">
          <div className={`absolute inset-0 z-10 transition-colors duration-1000 ${isVedicDay
              ? 'bg-gradient-to-b from-[#0B0806]/45 via-[#16100D]/90 to-[#050302]'
              : 'bg-gradient-to-b from-[#050508]/35 via-[#0A0A10]/95 to-[#020203]'
            }`} />
          <div className="absolute inset-0 bg-black/60 z-5" />
          <img
            src={heroBg}
            alt="Sunrise Temple Backing"
            className="w-full h-full object-cover opacity-55 scale-102 transition-transform duration-[6000ms] ease-out"
          />
          {/* Sunrise ray vectors */}
          {isVedicDay && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,145,0,0.15)_0%,transparent_75%)] z-8 pointer-events-none animate-pulse" />
          )}
        </motion.div>

        {/* Floating Divine Golden Dust Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-secondary/35 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.15, 0.9, 0.15],
                scale: [1, 1.6, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Swinging brass bell on top right of hero arch */}
        <SwingingBell className="absolute top-10 right-[12%] z-30 hidden md:flex" />
        <SwingingBell className="absolute top-10 left-[12%] z-30 hidden md:flex" />

        <div className="max-w-6xl mx-auto px-8 lg:px-12 w-full relative z-20 flex flex-col items-center justify-center">
          
          {/* Header Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-6 max-w-3xl mb-12"
          >
            <div className="inline-flex items-center space-x-3 bg-secondary/15 px-6 py-2.5 rounded-full border border-secondary/25 shadow-inner">
              <Compass className="w-3.5 h-3.5 text-secondary animate-spin-slow" />
              <span className="text-[9px] font-black uppercase tracking-[0.45em] text-[#F3EFE0] leading-none">The Gateway to Grace</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif font-black leading-tight text-[#F3EFE0] drop-shadow-2xl">
                <AnimatedWords text="DIVINE" type="letters" stagger={0.06} />
                <AnimatedWords text="MAJESTY." type="letters" stagger={0.06} luxury={true} />
              </h1>
              
              {/* Gold-Leaf Ornamental Line */}
              <div className="flex items-center space-x-4 py-2 max-w-md mx-auto">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-secondary/30" />
                <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-secondary/30" />
              </div>

              <p className="text-gray-300 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                Ascend to a higher state of being. Step into the digital sanctuary of Swami Siddharoodha and explore ancient wisdom modernized.
              </p>
            </div>
          </motion.div>

          {/* Interactive Sun Chakra & Orbiting Portal Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative w-[600px] h-[600px] flex items-center justify-center cursor-pointer group/chakra"
          >
            {/* Pulsing Auric Backing Rays */}
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-r from-secondary/15 via-[#FF5E00]/10 to-transparent rounded-full blur-[80px] animate-[spin_40s_linear_infinite] pointer-events-none opacity-80 group-hover/chakra:scale-105 transition-all duration-1000" />
            
            {/* Concentric Rotating Sacred Rings */}
            <div className="absolute w-[82%] h-[82%] border border-secondary/20 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] animate-[morph_14s_ease-in-out_infinite] scale-102 group-hover/chakra:border-secondary/40 transition-all duration-700 pointer-events-none" />
            <div className="absolute w-[86%] h-[86%] border border-secondary/10 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] animate-[morph_20s_ease-in-out_infinite_reverse] scale-105 group-hover/chakra:border-secondary/25 transition-all duration-700 pointer-events-none" />

            {/* Gold Vector Mandala Backdrop */}
            <div className="absolute w-[92%] h-[92%] opacity-[0.18] animate-[spin_90s_linear_infinite] z-0 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none" stroke="#FFD700" strokeWidth="0.2" className="filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                <circle cx="50" cy="50" r="45" />
                <circle cx="50" cy="50" r="38" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="22" />
                {Array.from({ length: 36 }).map((_, i) => (
                  <line key={i} x1="50" y1="5" x2="50" y2="95" transform={`rotate(${i * 5} 50 50)`} />
                ))}
              </svg>
            </div>

            {/* Morphing Inner Circle Swamiji Frame */}
            <div className="w-80 h-80 border-[5px] border-secondary/40 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] overflow-hidden animate-[morph_10s_ease-in-out_infinite] relative shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(212,175,55,0.15)] group-hover/chakra:border-secondary transition-all duration-700 z-10">
              <img
                src={swamiImg}
                alt="Swami Siddharoodha Swamiji"
                className="w-full h-full object-cover object-[center_0%] scale-100 group-hover/chakra:scale-105 transition-transform duration-[4000ms] ease-out select-none pointer-events-none"
              />
            </div>

            {/* Orbit Circle Container */}
            <div className="absolute inset-0 z-20 orbit-container pointer-events-none">
              
              {/* Orbiting Node 1: Seva Booking */}
              <div 
                className="absolute pointer-events-auto"
                style={{
                  left: 'calc(50% + 280px)',
                  top: 'calc(50% + 0px)',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <OrbitNode 
                  link="/sevas" 
                  icon={<Calendar size={20} />} 
                  title="Reserve Seva" 
                  desc="Book ancient Vedic poojas & archana offerings."
                  spotlight="rgba(230,81,0,0.4)"
                />
              </div>

              {/* Orbiting Node 2: Online Donations */}
              <div 
                className="absolute pointer-events-auto"
                style={{
                  left: 'calc(50% + 86px)',
                  top: 'calc(50% + 266px)',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <OrbitNode 
                  link="/donate" 
                  icon={<Heart size={20} />} 
                  title="Gracious Giving" 
                  desc="Contribute to Annadanam and temple expansion."
                  spotlight="rgba(212,175,55,0.4)"
                />
              </div>

              {/* Orbiting Node 3: Live Darshan */}
              <div 
                className="absolute pointer-events-auto"
                style={{
                  left: 'calc(50% - 227px)',
                  top: 'calc(50% + 165px)',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <OrbitNode 
                  link="/live-darshan" 
                  icon={<Play size={20} />} 
                  title="Live Darshan" 
                  desc="Watch direct stream from the inner sanctum."
                  spotlight="rgba(183,28,28,0.4)"
                />
              </div>

              {/* Orbiting Node 4: Daily Schedule */}
              <div 
                className="absolute pointer-events-auto"
                style={{
                  left: 'calc(50% - 227px)',
                  top: 'calc(50% - 165px)',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <OrbitNode 
                  link="/about" 
                  icon={<Clock size={20} />} 
                  title="Daily Schedule" 
                  desc="Browse daily hymns, Aarti, and darshan slots."
                  spotlight="rgba(212,175,55,0.4)"
                />
              </div>

              {/* Orbiting Node 5: Prasada Delivery */}
              <div 
                className="absolute pointer-events-auto"
                style={{
                  left: 'calc(50% + 86px)',
                  top: 'calc(50% - 266px)',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <OrbitNode 
                  link="/prasad" 
                  icon={<Compass size={20} />} 
                  title="Prasada Home" 
                  desc="Receive blessed sweets directly at your home."
                  spotlight="rgba(230,81,0,0.4)"
                />
              </div>

            </div>

          </motion.div>

        </div>


      </section>



      {/* 🕉️ SCRIPTURAL DECOY BANNER & SANSKRIT SHLOKA */}
      <section id="wisdom" className="py-24 relative overflow-hidden bg-[#040306]/75 backdrop-blur-xl border-t border-b border-white/10 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5E00]/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="font-serif font-black text-secondary text-2xl md:text-3xl tracking-wide select-none leading-relaxed">
              ಓಂ ಅಸತೋ ಮಾ ಸದ್ಗಮಯ | ತಮಸೋ ಮಾ ಜ್ಯೋತಿರ್ಗಮಯ | ಮೃತ್ಯೋರ್ಮಾ ಅಮೃತಂ ಗಮಯ ||
            </p>
            <p className="text-[12px] font-medium tracking-wider text-gray-400 max-w-2xl mx-auto leading-relaxed">
              "ಅಸತ್ಯದಿಂದ ಸತ್ಯದೆಡೆಗೆ ನಮ್ಮನ್ನು ಮುನ್ನಡೆಸು • ಅಂಧಕಾರದಿಂದ ಬೆಳಕಿನೆಡೆಗೆ ನಮ್ಮನ್ನು ಮುನ್ನಡೆಸು • ಮರಣದಿಂದ ಅಮರತ್ವದೆಡೆಗೆ ನಮ್ಮನ್ನು ಮುನ್ನಡೆಸು"
            </p>
          </motion.div>
        </div>
      </section>

      {/* ⛩️ SACRED SHOWCASE: SWAMI SIDDHAROODHA SWAMIJI */}
      <section id="showcase" className="py-48 relative overflow-hidden bg-black/10">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">

            {/* Left Column: Temple Silhouette Archway Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex justify-center relative group/legacyArch cursor-pointer"
            >
              <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-[100px] transition-all group-hover/legacyArch:bg-[#FF5E00]/10" />

              {/* Double bordered halo overlay */}
              <div className="absolute -inset-2 border border-secondary/20 rounded-[10.5rem_10.5rem_0_0] blur-[0.5px] z-0 pointer-events-none" />

              {/* Silhouette temple gopura arch frame */}
              <div className="w-full max-w-[340px] aspect-[3/4.2] rounded-[10rem_10rem_0_0] overflow-hidden border-[8px] border-secondary/20 hover:border-secondary/40 transition-all duration-700 relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.05)]">
                <img
                  src={swamiImg}
                  alt="Sadguru Shri Siddharoodha"
                  className="w-full h-full object-cover object-[center_0%] scale-100 group-hover/legacyArch:scale-105 transition-all duration-[3000ms]"
                />
              </div>

              <div className="absolute bottom-6 right-[4%] bg-white/[0.03] backdrop-blur-xl p-7 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 float-luxury border border-white/10 text-secondary hover:border-secondary/40 hover:scale-103 transition-all duration-300">
                <Award size={36} className="mb-3 text-secondary animate-pulse" />
                <p className="font-serif font-black text-xl italic text-white">Since 1929</p>
                <p className="text-secondary text-[8px] font-black uppercase tracking-wider mt-1">Upholding Truth</p>
              </div>
            </motion.div>

            {/* Right Column: Devotional Chronicle and Sanskrit Quotes */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <h2 className="text-secondary text-[9px] font-black uppercase tracking-[0.55em] leading-none">Spiritual Showcase</h2>
                <h3 className="text-4xl md:text-5xl font-serif text-white font-black italic leading-tight flex flex-col items-start">
                  <AnimatedWords text="Shri Siddharoodha" type="words" />
                  <AnimatedWords text="Swamiji." type="words" luxury={true} />
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-gray-300 text-lg font-light leading-relaxed">
                  Swami Siddharoodha's divine presence is a vibrating, timeless reality. His spiritual pathway of universal Advaita Vedanta is open to all seekers globally. Step into the digital sanctuary, book holy sevas, and welcome his divine grace into your household.
                </p>

                {/* Sanskrit Shloka & Quote Generator */}
                <SacredWisdomPanel />

                <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-3.5 h-3.5 text-secondary animate-pulse" />
                      <p className="text-3xl font-serif font-black text-white italic">200+</p>
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-secondary">Years of Spiritual Legacy</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Star className="w-3.5 h-3.5 text-secondary animate-pulse" />
                      <p className="text-3xl font-serif font-black text-white italic">∞</p>
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-secondary">Seekers Guided Globally</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/about" className="inline-flex px-10 py-4.5 bg-gradient-to-r from-secondary to-amber-600 border border-secondary/20 text-[#0C0908] font-black rounded-full hover:scale-105 active:scale-98 transition-all duration-300 uppercase tracking-widest text-[9px] items-center space-x-3 w-fit shadow-lg">
                  <span>OUR HISTORY</span>
                  <BookOpen size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🪔 FEATURES SECTION: DEVOTIONAL SERVICE CARDS */}
      <section id="services" className="py-44 relative bg-black/25 overflow-hidden border-t border-secondary/15">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">

          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
            <div className="space-y-4">
              <h2 className="text-secondary text-[9px] font-black uppercase tracking-[0.55em] leading-none">Temple Services</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white font-black leading-tight italic flex flex-col items-start">
                <AnimatedWords text="Sacred Seva" type="words" />
                <AnimatedWords text="Offerings." type="words" className="text-secondary" />
              </h3>
            </div>
            <p className="text-gray-400 max-w-sm text-sm font-medium leading-relaxed">
              Explore blessed packages, direct prasad shipments, online offerings, and holy digital streams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poojaCards.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.015 }}
                onClick={() => navigate(m.link)}
                className="glass-prism p-10 rounded-[3rem] group border border-white/10 hover:border-secondary/40 backdrop-blur-xl bg-white/[0.03] hover:bg-white/[0.06] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
              >
                {/* Double border leaf effect */}
                <div className="absolute inset-0 border border-secondary/10 rounded-[2.9rem] pointer-events-none" />

                {/* Spotlight hover effect */}
                <div
                  className="absolute -inset-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-[80px] rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${m.spotlight} 0%, transparent 60%)`
                  }}
                />

                <div className="w-13 h-13 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-[#0C0908] transition-all duration-500 divine-glow relative z-10 border border-secondary/20">
                  {m.icon}
                </div>

                <h4 className="text-2xl font-serif font-black text-white mb-3 italic tracking-tight group-hover:text-secondary transition-colors word-glow-hover relative z-10">
                  {m.title}
                </h4>

                <p className="text-gray-400 text-xs leading-relaxed mb-8 group-hover:text-gray-300 transition-colors relative z-10">{m.desc}</p>

                <Link to={m.link} className="flex items-center space-x-3.5 text-[9px] font-black uppercase tracking-[0.25em] text-secondary group-hover:text-white transition-all word-reveal-underline relative z-10">
                  <span>ENTER MODULE</span>
                  <div className="w-6 h-[1px] bg-secondary group-hover:w-12 group-hover:bg-white transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>







      {/* 🪔 ROYAL SPIRITUAL FOOTER WITH FLICKERING DIYAS */}
      <footer className="relative overflow-hidden bg-black/75 border-t-2 border-secondary/20 pt-28 pb-16 z-20">
        {/* Sandalwood Rangoli pattern vector border overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.06)_0%,transparent_75%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">

          {/* Flickering Diyas Basin Decoration */}
          <div className="flex items-center justify-center space-x-12 mb-16 pb-12 border-b border-secondary/15">
            <FlickeringDiya />
            <div className="flex flex-col items-center text-center">
              <span className="text-secondary font-serif font-black text-2xl tracking-widest leading-none mb-1">ॐ</span>
              <p className="text-[8px] font-black uppercase tracking-[0.35em] text-gray-500">Sacred Flame Sanctuary</p>
            </div>
            <FlickeringDiya />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-400 text-sm">
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/25">
                  <Sparkles size={16} className="text-secondary" />
                </div>
                <span className="text-white font-serif font-black text-lg tracking-wider">SIDDHAROODHA</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Empowering ancient Vedic connectivity and spiritual seekers under the supreme grace of Sadguru Shri Siddharoodha Swamiji.
              </p>
            </div>

            {/* Timings Column */}
            <div className="space-y-4">
              <h4 className="text-white font-serif font-black tracking-wide text-md">Temple Timings</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center space-x-2.5">
                  <Clock size={12} className="text-secondary" />
                  <span>Morning Darshan: 05:00 AM - 12:30 PM</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Clock size={12} className="text-secondary" />
                  <span>Evening Darshan: 04:30 PM - 09:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Address Column */}
            <div className="space-y-4">
              <h4 className="text-white font-serif font-black tracking-wide text-md">Holy Shrine</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-start space-x-2.5">
                  <MapPin size={12} className="text-secondary mt-0.5" />
                  <span>Shri Siddharoodha Swamiji Temple Road, Old Hubli, Hubballi, Karnataka 580024</span>
                </li>
              </ul>
            </div>

            {/* Inquiries Column */}
            <div className="space-y-4">
              <h4 className="text-white font-serif font-black tracking-wide text-md">Portal Assistance</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center space-x-2.5">
                  <Phone size={12} className="text-secondary" />
                  <span>+91 836 2202029</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Mail size={12} className="text-secondary" />
                  <span>seva@siddharoodhatemple.org</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <InstagramIcon size={12} className="text-secondary" />
                  <Link to="/instagram" className="hover:text-secondary transition-colors">@siddharoodha_temple</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Devotional Quote & Ornamental Divider */}
          <div className="mt-20 pt-8 border-t border-secondary/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
              © {new Date().getFullYear()} Shri Siddharoodha Swamiji Temple Hubli.
            </p>
            <p className="text-[9px] font-serif font-black tracking-widest text-secondary italic">
              "Pure devotion is the pathway to eternal liberation."
            </p>
          </div>

        </div>
      </footer>

      {/* Embedded Morph blob, Shimmer Sweep, and Marquee CSS Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes morph {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
        }
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        .btn-shimmer-sweep::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.35) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmerSweep 3.5s infinite ease-in-out;
        }
        .orbit-container {
          animation: spin 35s linear infinite;
        }
        .orbit-container:hover {
          animation-play-state: paused;
        }
        .orbit-child {
          animation: spin-reverse 35s linear infinite;
        }
        .orbit-container:hover .orbit-child {
          animation-play-state: paused;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;
