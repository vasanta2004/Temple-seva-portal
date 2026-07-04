import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800', category: 'Temple', title: 'Main Temple Entrance' },
  { id: 2, url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800', category: 'Festival', title: 'Deepotsava Celebration' },
  { id: 3, url: 'https://images.unsplash.com/photo-1604514685561-8e7d908154a2?auto=format&fit=crop&q=80&w=800', category: 'Ritual', title: 'Morning Aarti' },
  { id: 4, url: 'https://images.unsplash.com/photo-1590059515059-867175960098?auto=format&fit=crop&q=80&w=800', category: 'Temple', title: 'Intricate Carvings' },
  { id: 5, url: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800', category: 'Social', title: 'Annadanam Seva' },
  { id: 6, url: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800', category: 'Ritual', title: 'Holy Samadhi' },
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Temple', 'Festival', 'Ritual', 'Social'];
  const filteredImages = filter === 'All' ? IMAGES : IMAGES.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-2">Visual Journey</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Temple <span className="text-primary">Gallery</span></h1>
          
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-2 rounded-full font-bold transition-all ${filter === cat ? 'bg-primary text-secondary shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -5 }}
                className="relative group cursor-pointer aspect-[4/3] rounded-3xl overflow-hidden shadow-lg"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest mb-1">{img.category}</span>
                  <h3 className="text-white font-bold text-xl">{img.title}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={20} className="text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              onClick={() => setSelectedImage(null)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-[101] max-w-5xl w-full"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors"
              >
                <X size={32} />
              </button>
              <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-auto rounded-3xl shadow-2xl" />
              <div className="mt-6 text-center text-white">
                <h3 className="text-2xl font-serif font-bold text-secondary">{selectedImage.title}</h3>
                <p className="text-white/60 uppercase tracking-widest text-sm mt-1">{selectedImage.category}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
