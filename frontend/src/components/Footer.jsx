import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#E67E00] pt-24 pb-12 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-primary font-black text-2xl shadow-2xl">S</div>
              <div>
                <h2 className="text-2xl font-serif font-bold divine-text-glow leading-none">Siddharoodha</h2>
                <p className="text-secondary text-[10px] uppercase tracking-[0.3em] font-bold mt-1">Matha Hubli</p>
              </div>
            </div>
            <p className="text-white/60 text-lg font-body italic leading-relaxed">
              "Experience the divine grace and eternal peace at the holy abode of Sadguru Swami Siddharoodha. A beacon of light for spiritual seekers."
            </p>
            <div className="flex space-x-6">
              {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-secondary hover:bg-secondary hover:text-primary transition-all duration-500 shadow-xl border border-white/5">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-secondary mb-10">Sacred Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Our History', path: '/about' },
                { name: 'Pooja & Sevas', path: '/sevas' },
                { name: 'Room Booking', path: '/rooms' },
                { name: 'Live Darshan', path: '/live-darshan' },
                { name: 'Photo Gallery', path: '/gallery' },
                { name: 'Online Donation', path: '/donate' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/70 hover:text-secondary transition-all flex items-center group">
                    <span className="w-0 group-hover:w-4 h-px bg-secondary mr-0 group-hover:mr-2 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Timings */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-secondary mb-10">Divine Hours</h4>
            <div className="space-y-6">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-xs font-bold text-secondary uppercase mb-1">Morning Darshan</p>
                <p className="text-xl font-serif">6:00 AM — 12:30 PM</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-xs font-bold text-secondary uppercase mb-1">Evening Darshan</p>
                <p className="text-xl font-serif">4:30 PM — 9:00 PM</p>
              </div>
              <p className="text-[10px] text-white/40 italic">* Special timings apply on Festival & Lunar days.</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-secondary mb-10">Reach Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="text-secondary shrink-0" size={24} />
                <span className="text-white/70 leading-relaxed">Old Hubli, Hubballi-Dharwad,<br />Karnataka 580024</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="text-secondary shrink-0" size={24} />
                <span className="text-white/70 font-bold">+91 836 221 XXXX</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="text-secondary shrink-0" size={24} />
                <span className="text-white/70">info@siddharoodhamatha.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Siddharoodha Matha Hubli</p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center space-x-2 text-secondary/60">
            <span>Made with Devotion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
