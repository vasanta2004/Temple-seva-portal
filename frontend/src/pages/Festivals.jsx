import React from 'react';
import { motion } from 'framer-motion';

const FESTIVAL_CATEGORIES = [
  {
    category: "Annual Festivals",
    festivals: [
      "Maha Shivaratri", "Rama Navami", "Hanuman Jayanti", "Krishna Janmashtami", 
      "Ganesh Chaturthi", "Navaratri", "Vijayadashami", "Deepavali", "Makar Sankranti", "Ugadi"
    ]
  },
  {
    category: "Temple-Specific Festivals",
    festivals: [
      "Brahmotsavam", "Rathotsavam (Car Festival)", "Kumbhabhishekam", "Temple Anniversary", 
      "Laksha Deepotsava", "Jatra / Annual Fair", "Teppotsavam (Float Festival)", "Pallakki Utsava (Palanquin Festival)"
    ]
  },
  {
    category: "Monthly Observances",
    festivals: [
      "Ekadashi", "Pradosha", "Purnima", "Amavasya", "Sankashti Chaturthi", "Shashti"
    ]
  },
  {
    category: "Special Temple Events",
    festivals: [
      "Annadana", "Bhajan Sandhya", "Spiritual Discourses", "Cultural Programs", 
      "Veda Parayana", "Health Camps", "Blood Donation Camps"
    ]
  }
];

const Festivals = () => {
  return (
    <div className="min-h-screen bg-surface pt-40 pb-20 overflow-hidden relative text-white">
      {/* Abstract Decorative Background elements */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Controls */}
        <div className="space-y-4 mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-secondary text-base font-black uppercase tracking-[0.4em]"
          >
            Sacred Observances
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-serif font-black text-white italic"
          >
            Temple <span className="text-luxury">Festivals.</span>
          </motion.h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-xl font-medium leading-relaxed">
            Explore the diverse spiritual events celebrated with grandeur at our temple throughout the year.
          </p>
        </div>

        {/* Festival Categories Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FESTIVAL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-prism p-8 rounded-[2.5rem] border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <h3 className="text-2xl font-serif font-black text-secondary italic mb-6">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.festivals.map((fest, fIdx) => (
                  <span 
                    key={fIdx}
                    className="px-4 py-2 bg-black/40 border border-white/10 rounded-full text-sm font-medium text-gray-200 hover:border-secondary/50 hover:text-white transition-colors shadow-sm"
                  >
                    {fest}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Festivals;
