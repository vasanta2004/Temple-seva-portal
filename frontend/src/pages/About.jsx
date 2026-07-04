import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Users, Heart, History, Sparkles, Gift, Activity, Map, Compass, Flame, ArrowRight, Quote } from 'lucide-react';
import swamiImg from '../assets/1.jpg';
import swamiYellow from '../assets/swami-yellow.jpg';
import swamiShrine from '../assets/swami-shrine.jpg';
import swamiGreen from '../assets/swami-green.jpg';
import AnimatedWords from '../components/AnimatedWords';

const About = () => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: 0,
      title: "Divine Birth & Vision",
      subtitle: "The Descent of Lord Shiva (1837)",
      story: "One morning, Guru Shantappa had a dream in which Lord Shiva appeared in the form of an ascetic and merged into his heart. His wife simultaneously dreamed of Goddess Saraswati, who foretold the birth of Lord Shiva in her womb. Thirteen days after birth, the baby boy was named 'Siddha' (meaning 'already perfected soul'), displaying deep spiritual maturity from his earliest days.",
      quote: "Siddha was born as a perfected soul, a true sage who from childhood showed traits of supreme spiritual maturity.",
      icon: Sparkles,
      image: swamiYellow,
    },
    {
      id: 1,
      title: "Sesame & Jaggery",
      subtitle: "The Miracle of Infinite Sweetness",
      story: "At age five, on the day of Sankranti, young Siddha broke a high-hanging pot of sesame and jaggery to distribute sweets to all his friends. As more and more townspeople came, the small pot miraculously never emptied. When his surprised mother questioned him, Siddha replied: 'Mother, it is because of your greatness; you are the pure form of God, timeless and full of His infinite powers.'",
      quote: "Even in childhood, Siddha possessed divine powers to manifest abundance out of pure devotion.",
      icon: Gift,
      image: swamiImg,
    },
    {
      id: 2,
      title: "The Buffalo Miracle",
      subtitle: "Restoring Life to the Dead",
      story: "While playing with friends, Siddha jumped on a buffalo's back, declaring it to be his royal elephant. When the buffalo wouldn't move, Siddha said, 'So you are too arrogant, then you die,' and the animal collapsed dead. Seeing his mother weep in grief for their pregnant buffalo, Siddha felt compassion, placed his hand gently over its back, and instantly revived the animal.",
      quote: "A demonstration of absolute power over life, tempered with deep compassion and love.",
      icon: Activity,
      image: swamiGreen,
    },
    {
      id: 3,
      title: "The Sacred Quest",
      subtitle: "Finding Guru Gajananda Swami",
      story: "Desiring to find a guru but kept at home by his protective parents, Siddha used his yogic power to manifest a serpent to bite him. He agreed to be cured only if his parents allowed him to leave. Once freed, he traveled and arrived at the ashram of Gajananda Swami. Tested with hard physical labor, Siddha's complete devotion earned him initiation and the name 'Parama Siddharoodha Bharati'.",
      quote: "The path of discipleship requires total surrender, turning trials into spiritual gold.",
      icon: Compass,
      image: swamiShrine,
    },
    {
      id: 4,
      title: "Universal Wanderings",
      subtitle: "Spreading Advaita Across Nations",
      story: "Directed by his Guru to spread the teachings of Advaita (Non-Duality), Swami Siddharoodha traveled across the lengths and breadths of India, Nepal, Ceylon, and Tibet. He visited holy sites and enlightened thousands against ignorance, superstition, and blind belief, guiding them to realize their inner divinity. Although he never performed miracles for show, miracles occurred naturally to soothe the miseries of those who sought him.",
      quote: "He traveled through snowy peaks and tropical shores, reminding all of their inherent divinity.",
      icon: Map,
      image: swamiImg,
    },
    {
      id: 5,
      title: "The Hubli Era & Samadhi",
      subtitle: "Equality, 3000+ Ashrams, and Eternity (1929)",
      story: "In 1877, at age 41, the saint settled in Hubli, Karnataka. He became a beacon of solace for millions, rejecting caste discrimination and declaring that every soul—not just a selected few—is entitled to moksha (liberation). Over 3,000 ashrams were established globally under his path. On August 21, 1929, the great Sadguru relinquished his mortal body, leaving a legacy of eternal light.",
      quote: "A true sage of equality, whose light continues to shine through thousands of spiritual centers worldwide.",
      icon: Flame,
      image: swamiYellow,
    }
  ];

  const ActiveIcon = chapters[activeChapter].icon;

  return (
    <div className="min-h-screen bg-surface relative z-10 overflow-hidden">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-secondary/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#1A237E]/20 to-transparent text-center pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 border border-secondary rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 border border-secondary rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-4">
          <span className="inline-flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-4 py-1.5 rounded-full text-secondary font-bold text-xs uppercase tracking-widest">
            <Sparkles size={12} className="text-secondary divine-glow" />
            <span>Divine Life & History</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-black mb-4 flex flex-col items-center">
            <AnimatedWords text="Sadguru Siddharoodha Maharaj" type="words" luxury={true} />
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            The story of an illumined wandering yogi who transcended caste barriers, preached Advaita, and saw divinity in all.
          </p>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Premium Image Display */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-secondary to-primary rounded-[2.5rem] opacity-30 group-hover:opacity-60 blur-xl transition-all duration-750" />
              <div className="relative border-gold-leaf rounded-[2.5rem] overflow-hidden bg-surface">
                <img 
                  src={swamiImg} 
                  className="w-full aspect-[4/5] object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
                  alt="Sadguru Siddharoodha Swami" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass-prism border border-white/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-secondary">Earthly Journey</p>
                      <h4 className="text-lg font-serif font-bold text-white">1837 – 1929</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wider text-secondary">Core Principle</p>
                      <h4 className="text-lg font-serif font-bold text-white">Advaita (Non-Duality)</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Detailed Biography Intro */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-secondary font-semibold text-sm">
                <History size={16} className="text-secondary" />
                <span>Asceticism & Divine Reincarnation</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                An Illumined Soul in <span className="text-secondary text-shimmer">Humble Appearance</span>
              </h2>
              
              <div className="text-white/80 leading-relaxed text-lg space-y-6">
                <p>
                  Sadguru Siddharoodha Maharaj lived in the pure, uncompromising style of an ascetic throughout his life. 
                  Though he appeared simple on the outside, he was a true sage of supreme spiritual realization. 
                  He firmly disagreed with the traditional notion that spiritual liberation was reserved for select classes, 
                  proclaiming that every human being is entitled to attain <strong>Moksha</strong>.
                </p>
                <p>
                  By his devotees, he is considered a reincarnation of <strong>Nijaguna Shivayogi</strong>, a medieval king turned saint, 
                  while many others revere him as an incarnation of Lord Shiva Himself. Renouncing his family at a young age to seek 
                  ultimate truth, he wandered the sub-continent, demonstrating traits of spiritual maturity from early childhood.
                </p>
                <p>
                  His life story serves as a guide for seekers, exemplifying pure conduct, spiritual equality, and the non-dualistic 
                  philosophy of Advaita.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div className="space-y-1">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Caste Equality</span>
                  <p className="text-white font-medium">Universal Liberation</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Lineage</span>
                  <p className="text-white font-medium">Reincarnation of Shiva</p>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Ashrams Founded</span>
                  <p className="text-secondary font-bold">3,000+ Globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stories Timeline */}
      <section className="py-24 border-t border-white/5 relative bg-gradient-to-b from-transparent to-[#1A237E]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-secondary text-sm font-bold uppercase tracking-wider">Spiritual Milestones</span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mt-2">
            The Divine Leelas <span className="text-secondary">& Journeys</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4 text-base">
            Click on the timeline nodes below to explore the miraculous events, teachings, and journey of Swami Siddharoodha.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Timeline Selector Nodes */}
          <div className="relative mb-16 flex items-center justify-between overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 select-none">
            {/* Connecting line */}
            <div className="absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-white/10 -z-10 hidden md:block" />
            <div 
              className="absolute top-[28px] left-[5%] h-[2px] bg-secondary transition-all duration-500 -z-10 hidden md:block"
              style={{ width: `${(activeChapter / (chapters.length - 1)) * 90}%` }}
            />

            {chapters.map((chapter, idx) => {
              const Icon = chapter.icon;
              const isActive = activeChapter === idx;
              return (
                <button
                  key={chapter.id}
                  onClick={() => setActiveChapter(idx)}
                  className="flex flex-col items-center min-w-[120px] md:min-w-0 flex-1 relative group focus:outline-none cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive 
                        ? 'bg-secondary text-surface border-secondary divine-glow scale-110 shadow-lg shadow-secondary/20' 
                        : 'bg-surface text-white/50 border-white/10 group-hover:border-white/30 group-hover:text-white'
                    }`}
                  >
                    <Icon size={24} className={isActive ? 'text-surface' : ''} />
                  </motion.div>
                  <span className={`text-xs mt-3 font-semibold text-center tracking-wide transition-colors duration-300 max-w-[100px] ${
                    isActive ? 'text-secondary font-bold' : 'text-white/40 group-hover:text-white/70'
                  }`}>
                    {chapter.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Story Card Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="card-luminous glass-prism border border-white/10 p-8 md:p-12 overflow-hidden relative"
            >
              {/* Corner watermark icon */}
              <div className="absolute right-6 top-6 opacity-5 text-white pointer-events-none hidden md:block">
                <ActiveIcon size={240} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Story Image */}
                <div className="lg:col-span-5 relative group rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/10 z-10 pointer-events-none" />
                  <img 
                    src={chapters[activeChapter].image} 
                    alt={chapters[activeChapter].title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Story text info */}
                <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
                  <div className="space-y-2">
                    <p className="text-secondary font-serif font-bold text-sm md:text-base uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                      {chapters[activeChapter].subtitle}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif font-black text-white">
                      {chapters[activeChapter].title}
                    </h3>
                  </div>

                  <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">
                    {chapters[activeChapter].story}
                  </p>

                  <div className="pt-4 border-t border-white/5 flex items-start gap-4 text-secondary/90 italic font-serif">
                    <Quote className="flex-shrink-0 text-secondary opacity-60 w-6 h-6 rotate-180" />
                    <p className="text-sm md:text-base leading-relaxed">
                      {chapters[activeChapter].quote}
                    </p>
                  </div>

                  {/* Navigation Arrows for Convenience */}
                  <div className="pt-4 flex justify-between items-center">
                    <button 
                      onClick={() => setActiveChapter(prev => prev > 0 ? prev - 1 : chapters.length - 1)}
                      className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors group focus:outline-none"
                    >
                      <ArrowRight size={14} className="rotate-180 transition-transform group-hover:-translate-x-1" />
                      <span>Previous Story</span>
                    </button>
                    <button 
                      onClick={() => setActiveChapter(prev => prev < chapters.length - 1 ? prev + 1 : 0)}
                      className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors group focus:outline-none"
                    >
                      <span>Next Story</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Philosophy & Values */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
          <span className="text-secondary text-sm font-bold uppercase tracking-wider">Philosophical Foundation</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
            The Three Pillars of <span className="text-secondary">His Teachings</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4 text-base">
            Sadguru Siddharoodha's life demonstrated core spiritual principles that remain highly relevant to seekers today.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { 
              icon: <Landmark />, 
              title: 'Advaita Vedanta', 
              desc: 'Emphasizing the non-dualistic realization of Self. Realize that divinity is within you and that all paths lead to the same ultimate consciousness.' 
            },
            { 
              icon: <Users />, 
              title: 'Radical Equality', 
              desc: 'Refusing discrimination based on caste, creed, gender, or religion. Declaring that liberation (Moksha) is a birthright open to every single soul.' 
            },
            { 
              icon: <Heart />, 
              title: 'Compassion & Seva', 
              desc: 'Commitment to alleviating spiritual and material suffering. Demonstrating selfless service to humanity through solace, devotion, and hospitality.' 
            },
          ].map((val, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="glass-prism p-8 md:p-10 rounded-[2.5rem] border border-white/10 hover:border-secondary/30 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white/5 text-secondary rounded-2xl flex items-center justify-center mb-6 divine-glow">
                {React.cloneElement(val.icon, { size: 32 })}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-4">{val.title}</h3>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
