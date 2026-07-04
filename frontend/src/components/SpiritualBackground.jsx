import React from 'react';
import { motion } from 'framer-motion';

const SpiritualBackground = () => {
  const rays = Array.from({ length: 6 });
  const dust = Array.from({ length: 30 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-surface marble-texture">
      {/* Soft Light Rays */}
      {rays.map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: [0, 0.1, 0], x: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, delay: i * 2 }}
          className="light-ray"
          style={{
            left: `${i * 20}%`,
            top: '-10%',
            width: '2px',
            height: '100vh',
            transform: 'rotate(-45deg)'
          }}
        />
      ))}

      {/* Sandalwood Dust */}
      {dust.map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          initial={{ 
            x: `${Math.random() * 100}vw`, 
            y: `${Math.random() * 100}vh`,
            opacity: 0
          }}
          animate={{ 
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100 - 10}vh`],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: Math.random() * 8 + 8, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute w-1 h-1 bg-accent rounded-full blur-[2px]"
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.2)_100%)]" />
    </div>
  );
};

export default SpiritualBackground;
