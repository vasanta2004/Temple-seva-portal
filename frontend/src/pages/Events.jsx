import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Volume2, VolumeX, Eye, Sparkles, X 
} from 'lucide-react';

const REELS = [
  { id: 1, title: 'Temple Fair Celebrations', url: '/fair.mp4', views: '142' },
  { id: 2, title: 'Sacred Chariot Festival', url: '/fair1.mp4', views: '94' },
  { id: 3, title: 'Devotional Fair Bhajans', url: '/fair2.mp4', views: '67' },
  { id: 4, title: 'Holy Deepotsava Highlights', url: '/fair3.mp4', views: '108' },
  { id: 5, title: 'Grand Annadanam Feast', url: '/fair4.mp4', views: '156' },
];


const Events = () => {
  const [selectedReel, setSelectedReel] = useState(null);
  const [muted, setMuted] = useState(true);

  return (
    <div className="min-h-screen bg-surface pt-40 pb-20 overflow-hidden relative text-white">
      {/* Abstract Decorative Background elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Controls */}
        <div className="space-y-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-secondary text-base font-black uppercase tracking-[0.4em]"
          >
            Temple Chronicles
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-serif font-black text-white italic"
          >
            Divine <span className="text-luxury">Fairs.</span>
          </motion.h1>
          <p className="text-gray-300 max-w-3xl text-xl font-medium leading-relaxed">
            Stay updated with the sacred programs, dynamic events, and divine highlights of the fairs at Sri Siddharoodha Swamy Temple.
          </p>
        </div>

        {/* Fair Highlights Reels section */}
        <div className="mb-24 space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-6 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-black italic text-white">Fair Highlights & Reels</h2>
              <p className="text-gray-400 text-base">Glimpses of divine celebrations. Hover to play, click to watch full screen.</p>
            </div>
            <span className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-secondary bg-secondary/10 px-5 py-2.5 rounded-xl border border-secondary/20">
              <Sparkles size={14} />
              <span>{REELS.length} Videos</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {REELS.map((reel) => (
              <motion.div
                key={reel.id}
                whileHover={{ y: -8 }}
                className="glass-prism rounded-[2.5rem] border border-white/10 overflow-hidden group relative aspect-[9/16] bg-black/40 flex flex-col justify-end cursor-pointer"
                onClick={() => setSelectedReel(reel)}
              >
                {/* Video Component */}
                <video
                  src={reel.url}
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Overlay card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Hover Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25">
                  <div className="w-16 h-16 rounded-full bg-secondary/90 text-primary flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play size={28} className="fill-primary ml-1" />
                  </div>
                </div>

                {/* Content info */}
                <div className="relative z-10 p-6 space-y-2 pointer-events-none">
                  <h3 className="text-xl font-serif font-black text-white italic drop-shadow-md leading-tight">
                    {reel.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-xs font-black uppercase tracking-widest text-secondary/90">
                    <span className="flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{reel.views} views</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>

      {/* Full-Screen Reel Lightbox */}
      <AnimatePresence>
        {selectedReel && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0B0D11]/95 backdrop-blur-2xl" 
              onClick={() => setSelectedReel(null)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0F1115]/95 border border-white/10 rounded-[3rem] p-6 max-w-lg w-full relative z-[501] shadow-5xl overflow-hidden aspect-[9/16] flex flex-col justify-end"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedReel(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white p-2.5 bg-black/60 rounded-full hover:bg-white/5 transition-all z-20"
              >
                <X size={24} />
              </button>

              {/* Mute Button */}
              <button 
                onClick={() => setMuted(!muted)}
                className="absolute top-6 left-6 text-gray-400 hover:text-white p-2.5 bg-black/60 rounded-full hover:bg-white/5 transition-all z-20"
              >
                {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>

              {/* Full screen Video Player */}
              <video
                src={selectedReel.url}
                autoPlay
                loop
                muted={muted}
                controls
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Title & Info */}
              <div className="relative z-10 space-y-3 p-4">
                <span className="px-3.5 py-1.5 bg-secondary/20 border border-secondary/30 rounded-full text-xs font-black uppercase tracking-widest text-secondary">
                  Live Highlight
                </span>
                <h3 className="text-2xl font-serif font-black text-white italic drop-shadow-lg">
                  {selectedReel.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  Beautiful spiritual moment captured live during the Sri Siddharoodha temple fair.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
