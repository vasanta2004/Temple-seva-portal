import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, ArrowRight, Sunrise, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Play temple bell sound
    try {
      const audio = new Audio('/temple_bell.mp3');
      audio.volume = 0.55;
      audio.play().catch((e) => console.log('Audio playback blocked or failed:', e));
    } catch (e) {
      console.log('Audio error:', e);
    }

    try {
      const user = await login(formData.username, formData.password);
      setTimeout(() => {
        setLoading(false);
        if (user.roles.includes('ROLE_ADMIN')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 800);
    } catch (err) {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 relative z-10 pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/5 backdrop-blur-2xl p-12 rounded-[4rem] shadow-4xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full -mr-20 -mt-20 blur-2xl" />
          
          <div className="text-center mb-12 relative z-10">
            <div className="w-20 h-20 bg-primary/20 text-secondary rounded-[2rem] flex items-center justify-center mx-auto mb-8 divine-glow border border-white/10">
              <Sunrise size={36} />
            </div>
            <h2 className="text-5xl font-serif font-black text-white italic mb-3">Welcome <br /><span className="text-luxury">Back.</span></h2>
            <p className="text-gray-400 text-[10px] tracking-[0.5em] uppercase font-black">Return to the Sanctuary</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-red-500/10 text-red-400 p-5 rounded-3xl text-xs text-center border border-red-500/20 font-bold">
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-white/20 text-[9px] font-black uppercase tracking-widest ml-6">Sacred Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-full py-5 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/30 focus:bg-white/10 transition-all font-medium"
                  placeholder="name@email.com"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-full py-5 pl-14 pr-6 text-white placeholder-gray-600 focus:outline-none focus:border-secondary/30 focus:bg-white/10 transition-all font-medium"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-black py-6 rounded-full shadow-2xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center space-x-4 disabled:opacity-50 text-xs tracking-widest hover-divine-glow"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <span className="mt-1">ASCEND TO PORTAL</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center relative z-10 border-t border-white/5 pt-8">
            <p className="text-gray-500 text-xs font-medium">
              New seeker?{' '}
              <Link to="/register" className="text-secondary font-black hover:text-white transition-colors uppercase tracking-widest ml-2">
                Register
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
