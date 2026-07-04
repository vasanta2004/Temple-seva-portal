import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Phone, CreditCard, ChevronLeft, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import PrasadService from '../services/PrasadService';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderItem, setOrderItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    phone: ''
  });

  useEffect(() => {
    const pending = localStorage.getItem('pendingOrder');
    if (!pending) {
      navigate('/prasad');
      return;
    }
    setOrderItem(JSON.parse(pending));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        address: formData.address,
        phone: formData.phone,
        items: [{
          name: orderItem.name,
          quantity: 1,
          price: orderItem.price
        }],
        totalAmount: orderItem.price,
        status: 'SUCCESS'
      };

      await PrasadService.createOrder(orderData);
      setOrderSuccess(true);
      localStorage.removeItem('pendingOrder');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 text-center"
        >
          <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glow border border-emerald-500/20">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-serif font-black text-white italic mb-4">Sacred Order <br /><span className="text-luxury">Manifested.</span></h2>
          <p className="text-gray-400 mb-8">Your offerings have been recorded in the divine ledger. Shipping to your sanctuary soon.</p>
          <div className="text-[10px] text-secondary font-black uppercase tracking-widest animate-pulse">Redirecting to Dashboard...</div>
        </motion.div>
      </div>
    );
  }

  if (!orderItem) return null;

  return (
    <div className="min-h-screen bg-surface pt-40 pb-20 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <button onClick={() => navigate('/prasad')} className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors mb-12 group">
           <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
           <span className="text-[10px] font-black uppercase tracking-widest">Back to Gallery</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h1 className="text-5xl font-serif font-black text-white italic mb-4">Finalize your <br /><span className="text-luxury">Offering.</span></h1>
              <p className="text-gray-500 font-medium">Please provide the destination for these sacred blessings.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-6">Delivery Address</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-6 text-gray-600" size={18} />
                  <textarea
                    required
                    rows="4"
                    className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-white focus:outline-none focus:border-secondary/30 focus:bg-white/10 transition-all font-medium placeholder-gray-700"
                    placeholder="Enter your complete address for delivery..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] ml-6">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input
                    type="tel"
                    required
                    className="w-full bg-white/5 border border-white/5 rounded-full py-6 pl-16 pr-8 text-white focus:outline-none focus:border-secondary/30 focus:bg-white/10 transition-all font-medium placeholder-gray-700"
                    placeholder="Active phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
                <div className="flex items-center space-x-4 mb-6 text-secondary">
                   <CreditCard size={20} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Payment Manifestation</span>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-blue-500/20 rounded border border-blue-500/20" />
                      <span className="text-xs font-medium text-gray-400">Razorpay Simulation</span>
                   </div>
                   <Sparkles size={16} className="text-secondary/50" />
                </div>
                <p className="mt-6 text-[10px] text-gray-600 font-medium leading-relaxed italic">
                  By proceeding, you agree to receive these sacred offerings with devotion. The transaction is secured via spiritual encryption.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all flex items-center justify-center space-x-4 shadow-2xl hover-divine-glow"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    <span>COMPLETE SACRED ORDER</span>
                    <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white/10 sticky top-40 shadow-4xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform" />
              <h3 className="text-2xl font-serif font-black text-white italic mb-8">Sacred Summary</h3>
              
              <div className="flex items-center space-x-6 mb-10 pb-10 border-b border-white/5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={orderItem.image} alt={orderItem.name} className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="text-secondary text-[10px] font-black uppercase tracking-widest mb-1">Prasadam</p>
                   <p className="text-xl font-serif font-black text-white italic">{orderItem.name}</p>
                   <p className="text-xs text-gray-500 font-medium mt-1">Qty: 1 Unit</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">Subtotal Offering</span>
                  <span className="text-white">₹{orderItem.price}</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">Divine Delivery</span>
                  <span className="text-emerald-400 uppercase tracking-widest text-[9px] font-black">Free Blessings</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-white/10">
                <span className="text-sm font-black uppercase tracking-widest text-white">Total Grace</span>
                <span className="text-4xl font-serif font-black text-primary italic">₹{orderItem.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
