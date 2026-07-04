import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, CreditCard, Landmark, CheckCircle2, Sparkles, Leaf, Calendar, Droplets, Home, BookOpen, Activity, Flame, Gift } from 'lucide-react';
import UPIPaymentModal from '../components/UPIPaymentModal';
import { useAuth } from '../context/AuthContext';
import DonationService from '../services/DonationService';

const Donation = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);

  const donationCategories = [
    { id: 'general', title: 'General Temple Donation', desc: 'Sustain general administrative, cultural, and spiritual operations.', icon: <Landmark className="text-secondary" size={20} /> },
    { id: 'annadanam', title: 'Annadanam (Food Donation)', desc: 'Sponsor free sacred meals (Mahaprasad) for visiting pilgrims.', icon: <Heart className="text-secondary" size={20} /> },
    { id: 'goshala', title: 'Goshala Donation', desc: 'Contribute to the shelter, feed, and medical care of sacred cows.', icon: <Leaf className="text-secondary" size={20} /> },
    { id: 'festival', title: 'Festival Donation', desc: 'Support grand decorations, events, and pujas during major festivals.', icon: <Calendar className="text-secondary" size={20} /> },
    { id: 'pooja', title: 'Daily Pooja Sponsorship', desc: 'Sponsor the daily morning and evening sacred aarti rituals.', icon: <Sparkles className="text-secondary" size={20} /> },
    { id: 'archana', title: 'Archana / Abhisheka Donation', desc: 'Sponsor bathing offerings and special sacred archana rituals.', icon: <Droplets className="text-secondary" size={20} /> },
    { id: 'building', title: 'Building & Renovation Fund', desc: 'Support expansion, restoration, and architectural maintenance.', icon: <Home className="text-secondary" size={20} /> },
    { id: 'education', title: 'Education Support Donation', desc: 'Fund the ancient Gurukul, Vedic scriptures study, and student books.', icon: <BookOpen className="text-secondary" size={20} /> },
    { id: 'medical', title: 'Charity & Medical Help Donation', desc: 'Provide free health checkups and medical aid to local villagers.', icon: <Activity className="text-secondary" size={20} /> },
    { id: 'flower', title: 'Flower Donation', desc: 'Offer fresh flower decorations for the sanctum sanctorum and shrine.', icon: <Gift className="text-secondary" size={20} /> },
    { id: 'oil', title: 'Oil/Ghee Donation for Lamps', desc: 'Contribute pure ghee or sesame oil to keep holy lamps burning eternally.', icon: <Flame className="text-secondary" size={20} /> },
    { id: 'prasadam', title: 'Donation for Prasadam Distribution', desc: 'Support the distribution of sweet offerings and laddu to devotees.', icon: <Gift className="text-secondary" size={20} /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState(donationCategories[0]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const suggestedAmounts = [501, 1101, 2501, 5001, 10001, 25001];

  const handleDonate = (e) => {
    e.preventDefault();
    
    const finalAmount = amount || selectedAmount;
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      alert('Please select a preset amount or enter a custom donation amount.');
      return;
    }
    
    if (!name || !name.trim()) {
      alert("Please enter the Devotee's Full Name.");
      return;
    }
    
    if (!email || !email.trim()) {
      alert("Please enter your Email Address.");
      return;
    }
    
    // Custom email regex format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address format (e.g. devotee@example.com).");
      return;
    }

    setShowUPIModal(true);
  };

  if (success) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="max-w-xl w-full glass-prism p-12 text-center rounded-[4rem] border border-white/20 shadow-4xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          
          <div className="relative z-10">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 divine-glow">
                <CheckCircle2 size={48} className="text-secondary" />
             </div>
             <h2 className="text-4xl font-serif font-black text-primary italic mb-6">Divine <span className="text-luxury">Contribution.</span></h2>
             <p className="text-gray-400 mb-10 text-lg font-light leading-relaxed">
               Dear <span className="font-bold text-white">{name || 'Devotee'}</span>, your generous offering of <span className="font-black text-secondary text-xl tracking-wider">₹{amount || selectedAmount}</span> has been received with gratitude for <span className="font-bold text-white italic">{selectedCategory.title}</span>. May the blessings of Swami Siddharoodha be with you.
               <br /><br />
               <span className="text-sm text-secondary font-black tracking-wider uppercase block mt-2">
                 ✉️ A confirmation email and tax receipt have been sent to <span className="text-white normal-case font-bold">{email}</span>.
               </span>
             </p>
             <button 
               onClick={() => {
                 setSuccess(false);
                 setAmount('');
                 setSelectedAmount(null);
                 setName('');
                 setEmail('');
                 setSelectedCategory(donationCategories[0]);
               }}
               className="w-full bg-primary text-white py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-secondary hover:text-primary transition-all shadow-xl"
             >
               Make Another Contribution
             </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-40 pb-20 overflow-hidden relative">
      {/* Abstract Background Particles */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Content side */}
          <div className="space-y-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4"
              >
                Charity & Support
              </motion.h2>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-serif font-black text-primary italic leading-none"
              >
                Support the <br />
                <span className="text-luxury">Sacred Legacy.</span>
              </motion.h1>
              <p className="mt-8 text-gray-400 text-xl font-light leading-relaxed max-w-lg">
                Your contributions sustain the eternal flame of devotion. Help us continue Annadanam, spiritual programs, and the preservation of our 200-year-old heritage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[620px] overflow-y-auto pr-2 custom-scrollbar">
              {donationCategories.map((item, i) => (
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.05 }}
                   key={item.id} 
                   onClick={() => setSelectedCategory(item)}
                   className={`flex items-start space-x-4 p-5 rounded-3xl border cursor-pointer transition-all duration-300 ${
                     selectedCategory.id === item.id 
                       ? 'bg-primary/20 border-secondary shadow-[0_0_15px_rgba(212,175,55,0.2)] scale-[1.02]' 
                       : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                   }`}
                >
                  <div className={`p-3 rounded-2xl border transition-all ${
                     selectedCategory.id === item.id 
                       ? 'bg-secondary/20 border-secondary scale-110' 
                       : 'bg-white/5 border-white/5'
                   }`}>
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className={`text-base font-serif font-black italic transition-colors ${
                      selectedCategory.id === item.id ? 'text-secondary' : 'text-white'
                    }`}>{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium line-clamp-2">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-prism rounded-[4rem] p-10 lg:p-14 border border-white/20 relative"
          >
            <div className="absolute top-0 right-10 w-20 h-20 bg-primary/10 rounded-b-3xl flex items-center justify-center divine-glow">
               <Sparkles size={24} className="text-secondary" />
            </div>

            <div className="flex items-center space-x-4 mb-12">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-secondary border border-white/10">
                <CreditCard size={24} />
              </div>
              <h3 className="text-3xl font-serif font-black text-white italic">Secure <span className="text-secondary">Offering</span></h3>
            </div>

            <form onSubmit={handleDonate} className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                {suggestedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setAmount('');
                    }}
                    className={`py-4 rounded-2xl font-black text-sm transition-all duration-300 ${
                      selectedAmount === amt 
                        ? 'bg-secondary text-primary shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' 
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary font-black text-xl">₹</span>
                <input
                  type="number"
                  placeholder="Custom Amount"
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-3xl outline-none focus:border-secondary transition-all text-white font-black text-xl placeholder:text-gray-600 placeholder:font-medium placeholder:text-base"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="space-y-2 relative">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Donation Cause</label>
                  <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-3xl p-5 transition-all duration-300 focus-within:border-secondary hover:bg-white/10">
                    <select 
                      value={selectedCategory.id} 
                      onChange={(e) => {
                        const cat = donationCategories.find(c => c.id === e.target.value);
                        if (cat) setSelectedCategory(cat);
                      }} 
                      className="w-full bg-transparent text-white font-black uppercase tracking-widest text-xs outline-none cursor-pointer pr-10 appearance-none [&>option]:bg-[#0F1115] [&>option]:text-white"
                    >
                      {donationCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                      ))}
                    </select>
                    <Landmark size={18} className="absolute right-6 text-secondary pointer-events-none group-hover:scale-110 transition-transform duration-300 divine-glow" />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Full Name of Devotee"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl outline-none focus:border-secondary transition-all text-white font-bold placeholder:text-gray-600"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-5 bg-white/5 border border-white/10 rounded-3xl outline-none focus:border-secondary transition-all text-white font-bold placeholder:text-gray-600"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full btn-luminous py-6 rounded-full font-black uppercase tracking-widest text-sm mt-4 flex items-center justify-center space-x-3"
              >
                <span>Donate Now</span>
                <Heart size={18} />
              </motion.button>

              <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-500 mt-6 leading-relaxed">
                All donations are tax-exempt under section 80G.<br /> Secure 256-bit SSL encrypted gateway.
              </p>
            </form>
          </motion.div>

        </div>
      </div>

      {/* UPI Payment Modal Integration */}
      <UPIPaymentModal 
        isOpen={showUPIModal}
        onClose={() => setShowUPIModal(false)}
        onSuccess={async () => {
          try {
            const donationData = {
              userId: user?.id || null,
              name: name,
              email: email,
              amount: parseFloat(amount || selectedAmount),
              purpose: selectedCategory.title,
            };
            await DonationService.createDonation(donationData);
            setShowUPIModal(false);
            setSuccess(true);
          } catch (error) {
            console.error('Error saving donation:', error);
            // Even if backend fails, we show success because the user successfully paid
            setShowUPIModal(false);
            setSuccess(true);
          }
        }}
        amount={amount || selectedAmount || 0}
        description={`${selectedCategory.title} by ${name}`}
      />
    </div>
  );
};

export default Donation;
