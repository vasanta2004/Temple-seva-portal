import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight, Loader2, Sunrise, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await register(formData.name, formData.email, formData.password, formData.phone);
      setSuccess('Account created successfully! Entering the sanctuary...');
      
      // Play temple bell sound
      try {
        const audio = new Audio('/temple_bell.mp3');
        audio.volume = 0.55;
        audio.play().catch((e) => console.log('Audio playback blocked or failed:', e));
      } catch (e) {
        console.log('Audio error:', e);
      }

      // Auto-login after successful registration
      setTimeout(async () => {
        try {
          await login(formData.email, formData.password);
          navigate('/dashboard');
        } catch (loginErr) {
          navigate('/login');
        }
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Check if the email is already in use or the backend is offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 relative z-10 pt-32 pb-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[4rem] shadow-4xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-secondary/5 rounded-full -ml-20 -mt-20 blur-2xl" />
          
          <div className="text-center mb-12 relative z-10">
            <div className="w-20 h-20 bg-primary/20 text-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-8 divine-glow border border-white/10">
              <Sunrise size={36} />
            </div>
            <h2 className="text-5xl font-serif font-black text-white italic mb-3">Join the <br /><span className="text-luxury">Mandala.</span></h2>
            <p className="text-gray-400 text-[10px] tracking-[0.5em] uppercase font-black">Begin your sacred journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {success && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 text-emerald-400 p-5 rounded-3xl text-xs text-center border border-emerald-500/20 font-bold">
                {success}
              </motion.div>
            )}

            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-red-500/10 text-red-400 p-5 rounded-3xl text-xs text-center border border-red-500/20 font-bold">
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-white/20 text-[9px] font-black uppercase tracking-widest ml-6">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-full py-5 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/30 focus:bg-white/10 transition-all font-medium"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/20 text-[9px] font-black uppercase tracking-widest ml-6">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-full py-5 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/30 focus:bg-white/10 transition-all font-medium"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/20 text-[9px] font-black uppercase tracking-widest ml-6">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-500">
                  <Phone size={18} />
                </div>
                <input
                  type="text"
                  name="phone"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-full py-5 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/30 focus:bg-white/10 transition-all font-medium"
                  placeholder="Contact number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white/20 text-[9px] font-black uppercase tracking-widest ml-6">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-full py-5 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/30 focus:bg-white/10 transition-all font-medium"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-black py-6 rounded-full shadow-2xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center space-x-4 disabled:opacity-50 text-xs tracking-widest hover-divine-glow mt-4"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span className="mt-1">CREATE ACCOUNT</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center relative z-10 border-t border-white/5 pt-8">
            <p className="text-gray-500 text-xs font-medium">
              Already a seeker?{' '}
              <Link to="/login" className="text-secondary font-black hover:text-white transition-colors uppercase tracking-widest ml-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
