import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Loader2, Sparkles, Smartphone, QrCode, X } from 'lucide-react';

const UPIPaymentModal = ({ isOpen, onClose, onSuccess, amount, description }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  const upiId = 'iranna4@ptyes';
  const merchantName = 'Siddharoodha Temple';
  
  // Construct standard & app-specific deep links
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(description || 'Sacred Booking')}`;
  const phonepeLink = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(description || 'Sacred Booking')}`;
  const paytmLink = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(description || 'Sacred Booking')}`;
  
  // Use a public QR code API to generate the code dynamically
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}&color=1A237E&bgcolor=FFFFFF`;

  useEffect(() => {
    if (!isOpen) return;
    setTimer(300); // Reset timer on open

    // Automatically trigger UPI deep link for mobile redirection
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = upiLink;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, upiLink]);

  if (!isOpen) return null;


  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2500); // Simulate transaction verification
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-primary/60 backdrop-blur-xl" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-[#0F1115]/95 border border-white/10 rounded-[3.5rem] p-10 md:p-12 max-w-md w-full relative z-[301] shadow-4xl text-center overflow-hidden"
      >
        {/* Divine Background Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
        >
          <X size={20} />
        </button>

        <div className="space-y-6 relative z-10">
          {/* Header */}
          <div className="space-y-2">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-secondary/20 divine-glow">
              <QrCode className="text-secondary" size={28} />
            </div>
            <h3 className="text-3xl font-serif font-black text-white italic leading-none">
              UPI <span className="text-luxury">Contribution.</span>
            </h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
              {description}
            </p>
          </div>

          {/* Amount */}
          <div className="py-2">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest block mb-1">Amount to Transfer</span>
            <span className="text-4xl font-serif font-black text-secondary italic tracking-wide divine-glow">
              ₹{amount}
            </span>
          </div>

          {/* QR Code with scanning line */}
          <div className="relative inline-block bg-white p-5 rounded-[2.5rem] shadow-2xl border border-white/5 mx-auto overflow-hidden group">
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-48 h-48 object-contain"
            />
            {/* Moving Scanner Laser Line */}
            <div className="absolute left-5 right-5 h-[3px] bg-secondary opacity-70 blur-[1px] shadow-[0_0_10px_#D4AF37] scanner-line" 
                 style={{
                   animation: 'scan 2.5s ease-in-out infinite',
                   position: 'absolute',
                   top: 0
                 }}
            />
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes scan {
                0%, 100% { top: 20px; }
                50% { top: 190px; }
              }
            `}} />
          </div>

          {/* UPI Details */}
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="text-left">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">UPI Address</p>
                <p className="text-xs font-bold text-white font-mono">{upiId}</p>
              </div>
              <button 
                onClick={handleCopy}
                className="bg-white/5 hover:bg-white/10 text-secondary p-3 rounded-xl transition-all flex items-center space-x-1"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                <span className="text-[10px] font-black uppercase tracking-widest pl-1">
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>
            </div>

            {/* Direct Mobile UPI Apps */}
            <div className="space-y-3 pt-2">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest text-center">
                ⚡ Direct Mobile Redirection
              </p>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={phonepeLink}
                  className="flex items-center justify-center space-x-2 bg-[#5f259f] hover:bg-[#4d1e82] text-white py-3 px-4 rounded-2xl transition-all font-bold text-xs shadow-md border border-white/10"
                >
                  <span>PhonePe</span>
                </a>
                <a 
                  href={paytmLink}
                  className="flex items-center justify-center space-x-2 bg-[#00baf2] hover:bg-[#009fd0] text-white py-3 px-4 rounded-2xl transition-all font-bold text-xs shadow-md border border-white/10"
                >
                  <span>Paytm</span>
                </a>
              </div>
              <a 
                href={upiLink}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-[#4a1a15] py-3.5 px-4 rounded-2xl transition-all font-black text-xs uppercase tracking-wider shadow-lg border border-white/10"
              >
                <Smartphone size={14} />
                <span>Pay via Any UPI App</span>
              </a>
            </div>

            {/* Steps & Timer */}
            <div className="flex justify-between items-center text-left text-xs text-gray-400 px-2 font-medium">
              <div className="flex items-center space-x-2">
                <Smartphone size={16} className="text-secondary" />
                <span>Open GPay / PhonePe / Paytm</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-gray-500 block uppercase tracking-widest font-black">Expires in</span>
                <span className="font-mono text-white font-bold">{formatTime(timer)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4 pt-2">
            <button
              onClick={handleVerify}
              disabled={loading || timer === 0}
              className="w-full py-5 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-secondary hover:text-primary transition-all flex items-center justify-center space-x-3 shadow-2xl hover-divine-glow disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-secondary" size={16} />
                  <span>Verifying Ledger...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-secondary" />
                  <span>Verify & Confirm Payment</span>
                </>
              )}
            </button>
            
            <button
              onClick={onClose}
              className="text-[10px] text-gray-500 hover:text-primary font-black uppercase tracking-widest transition-colors block mx-auto"
            >
              Cancel & Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UPIPaymentModal;
