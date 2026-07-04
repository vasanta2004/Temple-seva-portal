import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import vibhutiImg from '../assets/prasad/vibhuti.png';
import kumkumImg from '../assets/prasad/kumkum.png';
import kesariImg from '../assets/prasad/kesari.png';

const PRASAD_ITEMS = [
  {
    id: 4,
    name: 'Sacred Vibhuti',
    price: 50,
    desc: 'Holy ash blessed during the morning Aarti. A symbol of purity and detachment from the material world.',
    image: vibhutiImg,
    weight: '100g',
    rating: 5.0
  },
  {
    id: 5,
    name: 'Divine Kumkum',
    price: 50,
    desc: 'Vibrant red vermilion powder used for tilak, representing the energy of the divine mother.',
    image: kumkumImg,
    weight: '100g',
    rating: 5.0
  },
  {
    id: 6,
    name: 'Kesar Tilak',
    price: 150,
    desc: 'Pure, premium sandalwood powder blended with fragrant saffron.',
    image: kesariImg,
    weight: '100g',
    rating: 5.0
  }
];

const Prasad = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleOrder = (item) => {
    if (!user) {
      // If guest clicks order, send to register
      navigate('/register');
      return;
    }

    // If logged in, proceed to checkout
    const orderItem = {
      ...item,
      quantity: 1
    };
    localStorage.setItem('pendingOrder', JSON.stringify(orderItem));
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#040306] pt-28 pb-20 overflow-hidden relative">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl space-y-4">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-secondary text-xs font-black uppercase tracking-[0.4em]"
            >
              Sacred Offerings
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-serif font-black text-white italic"
            >
              Divine <span className="text-luxury">Prasadam.</span>
            </motion.h1>
            <p className="mt-4 text-gray-400 text-lg font-light leading-relaxed">
              Receive the blessings of Swami Siddharoodha in your home. Order pure, satvik prasadam prepared with devotion.
            </p>
          </div>

          <button className="bg-white/[0.03] backdrop-blur-xl p-4 rounded-full border border-white/10 flex items-center space-x-6 hover:bg-white/[0.08] transition-all group shadow-lg">
            <div className="w-14 h-14 bg-primary text-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
            <div className="text-left pr-6">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Spiritual Bag</p>
              <p className="font-black text-white italic">{cart.length} Sacred Items</p>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRASAD_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col relative bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-secondary/40 rounded-[3rem] p-6 transition-all duration-500 hover:-translate-y-2 shadow-2xl hover:shadow-[0_15px_40px_rgba(255,215,0,0.08)]"
            >
              <div className="h-[260px] rounded-[2.2rem] overflow-hidden shadow-xl relative mb-6">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/20 flex items-center space-x-1.5">
                  <Star size={12} className="text-secondary" fill="currentColor" />
                  <span>{item.rating} Rating</span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-secondary text-[10px] font-black uppercase tracking-widest mb-1">Blessed Harvest</p>
                  <h3 className="text-2xl font-serif font-black text-white italic leading-tight">{item.name}</h3>
                </div>
              </div>

              <div className="px-2 space-y-4 flex-grow flex flex-col justify-between">
                <p className="text-gray-400 text-xs leading-relaxed font-medium min-h-[72px]">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                    Weight: {item.weight}
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-serif font-black text-secondary italic">₹{item.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleOrder(item)}
                  className="w-full py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-secondary hover:text-primary transition-all flex items-center justify-center space-x-2 group/btn hover-divine-glow"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section - High End Banner */}
        <motion.div
          whileInView={{ opacity: [0, 1], y: [20, 0] }}
          className="mt-32 bg-white/[0.03] backdrop-blur-2xl rounded-[4rem] p-16 border border-white/10 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
          <div className="w-24 h-24 bg-primary text-secondary rounded-[2rem] flex items-center justify-center shadow-2xl divine-glow">
            <Sparkles size={40} />
          </div>
          <div className="text-center lg:text-left flex-grow space-y-2">
            <h4 className="text-3xl font-serif font-black text-white italic">Purity & Devotion Guaranteed.</h4>
            <p className="text-gray-400 max-w-2xl text-lg font-light">
              All prasadam is prepared in the temple's sacred kitchen following traditional methods. We ensure hygienic packaging and worldwide shipping.
            </p>
          </div>
          <button className="lg:ml-auto px-12 py-5 bg-white text-primary rounded-full font-black uppercase tracking-widest text-xs hover:bg-secondary transition-all">
            Shipping Policy
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Prasad;
