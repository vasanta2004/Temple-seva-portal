import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-accent/20 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-2">Get in Touch</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Connect with <span className="text-primary">The Temple</span></h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about sevas, donations, or visits? Our team is here to assist you on your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {[
              { icon: <Phone />, title: 'Phone', value: '+91 836 221 XXXX', desc: 'Mon-Sun, 6 AM - 9 PM' },
              { icon: <Mail />, title: 'Email', value: 'info@siddharoodhatemple.org', desc: 'Typically replies within 24h' },
              { icon: <MapPin />, title: 'Location', value: 'Old Hubli, Karnataka', desc: 'Hubballi-Dharwad, 580024' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10 }}
                className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex items-start space-x-4"
              >
                <div className="bg-primary/10 p-3 rounded-2xl text-primary">{React.cloneElement(item.icon, { size: 24 })}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-primary font-semibold">{item.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            <button className="w-full bg-green-500 text-white py-4 rounded-3xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-green-200">
              <MessageCircle size={24} />
              <span>Chat on WhatsApp</span>
            </button>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-gray-100"
            >
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                  <input type="text" placeholder="Your Name" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                  <input type="email" placeholder="Your Email" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                  <input type="text" placeholder="How can we help?" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                  <textarea rows="5" placeholder="Write your message here..." className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="w-full bg-primary text-secondary py-5 rounded-2xl font-bold text-xl flex items-center justify-center space-x-2 divine-glow">
                    <Send size={24} />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-16 h-96 bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-inner relative group border border-white/5"
        >
           <img 
             src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" 
             className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3000ms] ease-out" 
             alt="Map" 
           />
           <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2, duration: 0.6 }}
               className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white text-center hover:scale-103 transition-transform duration-300"
             >
               <div className="relative mb-3 flex items-center justify-center h-12">
                 {/* Pulsing Radar Ring Waves */}
                 <motion.div
                   animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                   className="absolute w-8 h-8 rounded-full bg-primary/40"
                 />
                 <motion.div
                   animate={{ scale: [1, 3], opacity: [0.4, 0] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                   className="absolute w-8 h-8 rounded-full bg-primary/20"
                 />
                 {/* Bouncing Pin */}
                 <motion.div
                   animate={{ y: [0, -6, 0] }}
                   transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                   className="z-10 text-primary"
                 >
                   <MapPin size={32} />
                 </motion.div>
               </div>
               <h4 className="font-bold text-gray-900">Siddharoodha Temple</h4>
               <p className="text-sm text-gray-500">Old Hubli, Hubballi-Dharwad</p>
               <button className="mt-4 text-primary font-bold text-xs uppercase tracking-widest border-b-2 border-primary cursor-pointer hover:text-primary-dark hover:border-primary-dark transition-colors">Get Directions</button>
             </motion.div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
