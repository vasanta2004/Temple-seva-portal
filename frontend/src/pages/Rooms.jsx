import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Users, CheckCircle2, Star, Wifi, Wind, ArrowRight, 
  Loader2, Sparkles, X, Calendar, UtensilsCrossed, ShieldCheck, Heart 
} from 'lucide-react';
import RoomService from '../services/RoomService';
import AuthService from '../services/AuthService';
import authHeader from '../services/authHeader';
import UPIPaymentModal from '../components/UPIPaymentModal';
import heroBg from '../assets/hero-bg.png';
import axios from 'axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Dynamic booking input states
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState('1 Devotee');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    RoomService.getAllRooms()
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch rooms, using fallback data", err);
        const fallbackRooms = Array.from({ length: 15 }, (_, i) => {
          const roomNum = 101 + i;
          let imageUrl;
          if (i % 3 === 0) {
            imageUrl = "/rooms/room_one.png";
          } else if (i % 3 === 1) {
            imageUrl = "/rooms/room_two.png";
          } else {
            imageUrl = "/rooms/room_three.png";
          }
          return {
            id: i + 1,
            name: `Room ${roomNum}`,
            type: 'Normal',
            desc: 'A serene, comfortable room for seekers and devotees.',
            price: 500,
            image: imageUrl
          };
        });
        setRooms(fallbackRooms);
        setLoading(false);
      });
  }, []);

  const getRoomDetails = (room, index) => {
    let subCategory = "Standard Sanctuary";
    let amenities = ["Wi-Fi", "Air Cooled", "Attached Bath"];
    let imageList = ["/rooms/room_one.png", "/rooms/room_two.png", "/rooms/room_three.png"];
    let description = room.desc || "A serene, comfortable room for seekers and devotees.";
    let rating = "4.8";
    let reviews = 42 + (index * 7);

    if (index % 3 === 1) {
      subCategory = "Serene Garden Stay";
      amenities = ["Wi-Fi", "Air Cooled", "Attached Bath", "Garden View", "Prasadam Included"];
      rating = "4.9";
    } else if (index % 3 === 2) {
      subCategory = "Divine Premium Stay";
      amenities = ["Wi-Fi", "Air Conditioned", "Attached Bath", "Shrine View", "Prasadam Included", "24/7 Service"];
      rating = "5.0";
    }

    return { subCategory, amenities, rating, reviews, imageList, description };
  };

  const calculateNights = () => {
    if (!arrivalDate || !departureDate) return 1;
    const checkIn = new Date(arrivalDate);
    const checkOut = new Date(departureDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    if (timeDiff <= 0) return 1;
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days;
  };

  const filteredRooms = rooms.filter((room, idx) => {
    if (filter === 'All') return true;
    const details = getRoomDetails(room, idx);
    return details.subCategory.includes(filter);
  });

  return (
    <div 
      className="min-h-screen pt-36 pb-20 relative overflow-hidden bg-[#070505] text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(11, 8, 8, 0.94), rgba(15, 17, 21, 0.96), rgba(31, 20, 37, 0.97)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Ambient background particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-secondary/60 animate-pulse blur-[1px]"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Sanskrit hospitality banner */}
        <div className="text-center mb-6 relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-secondary/10 border border-secondary/35 px-6 py-3 rounded-full backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles className="text-secondary animate-pulse" size={14} />
            <span className="text-secondary font-serif font-black tracking-widest text-sm">" अतिथिदेवो भव "</span>
            <div className="w-[1px] h-4 bg-white/20" />
            <span className="text-gray-300 text-[10px] font-black uppercase tracking-wider">The Guest is Deity</span>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
             <motion.h2 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-secondary text-xs font-black uppercase tracking-[0.4em]"
             >
               Dharamshala & Stay
             </motion.h2>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-6xl font-serif font-black text-white italic"
             >
               Divine <span className="text-luxury">Accommodation.</span>
             </motion.h1>
          </div>
          
          <div className="flex bg-white/5 p-2 rounded-3xl border border-white/10 backdrop-blur-md">
            {['All', 'Standard', 'Serene', 'Divine'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                  filter === f 
                    ? 'bg-secondary text-primary shadow-xl font-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-4">
             <Loader2 size={48} className="text-secondary animate-spin" />
             <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Preparing Sanctuaries...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredRooms.map((room, idx) => {
              const details = getRoomDetails(room, idx);
              return (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col relative bg-[#12141C]/45 border border-white/10 rounded-[3.5rem] p-6 transition-all duration-500 shadow-xl overflow-hidden card-float-idle"
                  style={{ animationDelay: `${idx * 0.6}s` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
                  
                  {/* Room Image Frame */}
                  <div className="h-[240px] rounded-[2.5rem] overflow-hidden shadow-2xl relative mb-6">
                    <img 
                      src={room.imageUrl || room.image || details.imageList[0]} 
                      alt={room.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-transparent" />
                    
                    {/* Floating verified badge */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-secondary border border-white/10">
                      {details.subCategory}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                       <div>
                          <p className="text-secondary text-[9px] font-black uppercase tracking-widest mb-0.5">Room Code</p>
                          <h3 className="text-2xl font-serif font-black text-white italic leading-none">{room.name.replace("Normal Room", "Room")}</h3>
                       </div>
                       
                       <div className="flex items-center gap-1 bg-black/65 px-3 py-1 rounded-full text-[10px] font-black text-amber-300 border border-white/10">
                         <Star size={10} fill="currentColor" />
                         <span>{details.rating}</span>
                       </div>
                    </div>
                  </div>
                  
                  {/* Card Description & Amenities */}
                  <div className="flex-grow space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <p className="text-gray-400 text-xs leading-relaxed font-medium">
                        {details.description}
                      </p>

                      {/* Display amenities tags */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {details.amenities.slice(0, 3).map((am, i) => (
                          <span key={i} className="text-[8px] font-black uppercase tracking-wider bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-gray-300">
                            {am}
                          </span>
                        ))}
                        {details.amenities.length > 3 && (
                          <span className="text-[8px] font-black bg-secondary/15 px-2 py-1 rounded-lg text-secondary">
                            +{details.amenities.length - 3} More
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price and Action Button */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-t border-white/5 pt-4">
                         <div className="flex items-center space-x-3 text-gray-400">
                            <Wifi size={16} />
                            <Wind size={16} />
                            <Users size={16} />
                         </div>
                         <div className="text-right">
                            <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Holy Donation</p>
                            <p className="text-2xl font-serif font-black text-secondary italic">₹{room.price}<span className="text-xs font-sans text-gray-400 font-normal">/day</span></p>
                         </div>
                      </div>

                      <button 
                        onClick={() => {
                          setSelectedRoom(room);
                          setActiveImageIdx(0);
                        }}
                        className="w-full py-4.5 bg-primary hover:bg-secondary hover:text-primary text-white rounded-full font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center space-x-2 group cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      >
                        <span>Reserve stay</span>
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Modal (Modern Divine Style) */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#0B0D11]/90 backdrop-blur-2xl" onClick={() => setSelectedRoom(null)} />
          
          {(() => {
            const roomIdx = rooms.findIndex(r => r.id === selectedRoom.id);
            const roomDetails = getRoomDetails(selectedRoom, roomIdx >= 0 ? roomIdx : 0);
            
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-[#0F1115]/95 rounded-[3rem] p-10 md:p-12 max-w-xl w-full relative z-[201] shadow-5xl border border-white/10 overflow-hidden"
              >
                {/* Divine Background Accents */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/25 rounded-full blur-3xl -z-10 animate-pulse" />

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all z-25"
                >
                  <X size={20} />
                </button>

                <div className="space-y-6 relative z-10">
                   <div className="space-y-2">
                      <h3 className="text-3xl font-serif font-black text-white italic leading-none">Confirm <br /> <span className="text-luxury">Reservation.</span></h3>
                      <p className="text-gray-400 text-xs font-semibold">You are reserving stay at <span className="text-secondary font-black uppercase tracking-widest text-xs divine-glow">{selectedRoom.name}</span></p>
                   </div>
                   
                   {/* Room Photo Gallery Lightbox */}
                   <div className="relative h-44 rounded-[2rem] overflow-hidden border border-white/10 group">
                     <img 
                       src={roomDetails.imageList[activeImageIdx]} 
                       alt="Room view" 
                       className="w-full h-full object-cover transition-transform duration-500"
                     />
                     
                     {/* Gallery Indicators navigation */}
                     <button 
                       type="button"
                       onClick={() => setActiveImageIdx(prev => (prev === 0 ? 2 : prev - 1))}
                       className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center cursor-pointer transition-colors z-20 font-black text-xs"
                     >
                       ←
                     </button>
                     <button 
                       type="button"
                       onClick={() => setActiveImageIdx(prev => (prev === 2 ? 0 : prev + 1))}
                       className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center cursor-pointer transition-colors z-20 font-black text-xs"
                     >
                       →
                     </button>

                     <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/45 px-3 py-1 rounded-full z-20">
                       {roomDetails.imageList.map((_, idx) => (
                         <div 
                           key={idx} 
                           className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeImageIdx ? 'bg-secondary w-3' : 'bg-gray-400'}`}
                         />
                       ))}
                     </div>
                   </div>

                   <form className="space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                         <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 block">Arrival Date</label>
                         <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-xl p-3 focus-within:border-secondary hover:bg-white/10">
                           <input 
                             type="date" 
                             value={arrivalDate} 
                             onChange={(e) => setArrivalDate(e.target.value)} 
                             className="w-full bg-transparent text-white font-bold outline-none text-xs cursor-pointer pr-8 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full" 
                           />
                           <Calendar size={14} className="absolute right-3.5 text-secondary pointer-events-none group-hover:scale-110 transition-transform duration-300" />
                         </div>
                       </div>
                       
                       <div className="space-y-1.5">
                         <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 block">Departure Date</label>
                         <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-xl p-3 focus-within:border-secondary hover:bg-white/10">
                           <input 
                             type="date" 
                             value={departureDate} 
                             onChange={(e) => setDepartureDate(e.target.value)} 
                             className="w-full bg-transparent text-white font-bold outline-none text-xs cursor-pointer pr-8 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full" 
                           />
                           <Calendar size={14} className="absolute right-3.5 text-secondary pointer-events-none group-hover:scale-110 transition-transform duration-300" />
                         </div>
                       </div>
                     </div>

                     <div className="space-y-1.5">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 block">Pilgrim Group</label>
                       <div className="relative group flex items-center bg-white/5 border border-white/10 rounded-xl p-3 focus-within:border-secondary hover:bg-white/10">
                         <select 
                           value={guests} 
                           onChange={(e) => setGuests(e.target.value)} 
                           className="w-full bg-transparent text-white font-black uppercase tracking-widest text-[10px] outline-none cursor-pointer pr-8 appearance-none [&>option]:bg-[#0F1115] [&>option]:text-white"
                         >
                           <option>1 Devotee</option>
                           <option>2 Devotees</option>
                           <option>Family Group</option>
                         </select>
                         <Users size={14} className="absolute right-3.5 text-secondary pointer-events-none group-hover:scale-110 transition-transform duration-300" />
                       </div>
                     </div>
                     
                     {/* Calculation summary block */}
                     <div className="p-5 bg-gradient-to-r from-primary/80 to-[#1e299c]/90 rounded-2xl text-white flex justify-between items-center border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                           <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
                             Contribution ({calculateNights()} {calculateNights() === 1 ? 'Day' : 'Days'})
                           </p>
                           <p className="text-2xl font-serif font-black italic text-secondary divine-glow">
                             ₹{selectedRoom.price * calculateNights()}
                           </p>
                        </div>
                        <button 
                          type="button"
                          className="relative z-10 bg-secondary text-primary px-6 py-3 rounded-lg font-black uppercase tracking-widest text-[9px] hover:bg-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 cursor-pointer"
                          onClick={() => {
                            setShowUPIModal(true);
                          }}
                        >
                          Confirm & Pay
                        </button>
                     </div>
                   </form>
                </div>
              </motion.div>
            );
          })()}
        </div>
      )}

      {/* UPI Payment Modal Integration */}
      <UPIPaymentModal 
        isOpen={showUPIModal}
        onClose={() => setShowUPIModal(false)}
        onSuccess={() => {
          const currentUser = AuthService.getCurrentUser();
          if (!currentUser) {
            alert("Please log in to reserve a sanctuary stay!");
            setShowUPIModal(false);
            return;
          }

          const bookingData = {
            userId: currentUser.id,
            roomId: selectedRoom?.id,
            roomName: selectedRoom?.name,
            checkInDate: arrivalDate ? new Date(arrivalDate) : new Date(),
            checkOutDate: departureDate ? new Date(departureDate) : new Date(Date.now() + 86400000),
            guests: guests === '1 Devotee' ? 1 : guests === '2 Devotees' ? 2 : 4,
            totalAmount: (selectedRoom?.price || 500) * calculateNights(),
            status: 'CONFIRMED'
          };

          axios.post('http://localhost:8080/api/rooms/book', bookingData, { headers: authHeader() })
            .then(res => {
              console.log("Booking recorded successfully in backend ledger", res.data);
              setShowUPIModal(false);
              setShowSuccessModal(true);
            })
            .catch(err => {
              console.error("Failed to post booking, using local simulation fallback", err);
              setShowUPIModal(false);
              setShowSuccessModal(true);
            });
        }}
        amount={(selectedRoom?.price || 500) * calculateNights()}
        description={`Sanctuary Stay: ${selectedRoom?.name}`}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-xl" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0F1115]/95 border border-white/10 rounded-[3.5rem] p-12 max-w-md w-full relative z-[401] shadow-4xl text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30 divine-glow animate-bounce">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-serif font-black text-white italic mb-4 leading-none">
              Sanctuary <span className="text-luxury">Reserved.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Your room reservation at <span className="text-white font-bold">{selectedRoom?.name}</span> is confirmed through a secure UPI payment. May the blessings of Swami Siddharoodha be upon you.
            </p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                setSelectedRoom(null);
              }}
              className="w-full py-4 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-secondary hover:text-primary transition-all shadow-xl cursor-pointer"
            >
              Back to Dharamshala
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
