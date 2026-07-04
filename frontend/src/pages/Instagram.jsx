import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Send, Bookmark, Grid, 
  Tv, User, Sparkles, Check, Copy, ExternalLink, X, Plus,
  Camera, Info, MapPin, Calendar, HeartOff, Share2
} from 'lucide-react';
import swamiShrine from '../assets/swami-shrine.jpg';
import swamiYellow from '../assets/swami-yellow.jpg';
import swamiGreen from '../assets/swami-green.jpg';

const shivaImg = "/shiva.png";
const guruImg = "/guru.png";

const INITIAL_POSTS = [
  {
    id: 1,
    imageUrl: shivaImg,
    category: "Ritual",
    likes: 18450,
    isLiked: false,
    caption: "Mahashivratri Alankara at Shri Siddharoodha Swamiji Temple. The Shiva Linga is adorned in sacred sandalwood paste and bilva leaves, radiating cosmic energy. 🔱✨",
    date: "2 days ago",
    comments: [
      { id: 101, username: "om_namah_shivaya", text: "Hara Hara Mahadev! What a divine sight!" },
      { id: 102, username: "dharwad_pilgrim", text: "Felt absolute peace looking at this alankara." },
      { id: 103, username: "vedic_student", text: "Siddharoodha Swamiji Maharaj ki Jai!" }
    ]
  },
  {
    id: 2,
    imageUrl: guruImg,
    category: "Festival",
    likes: 12100,
    isLiked: false,
    caption: "Honoring the legacy of Swami Siddharoodha on this auspicious Guru Purnima. Hundreds of devotees gathered in Old Hubli to offer prayers and seek Guru blessings. 🙏👑",
    date: "1 week ago",
    comments: [
      { id: 201, username: "guru_shishya", text: "Blessed to be a disciple. Jai Guru Siddharoodha!" },
      { id: 202, username: "hubli_local", text: "The decoration was exceptionally beautiful this year." }
    ]
  },
  {
    id: 3,
    imageUrl: swamiShrine,
    category: "Temple",
    likes: 9540,
    isLiked: false,
    caption: "A serene morning at the main Samadhi Mandir of Shri Siddharoodha Swamiji. The atmosphere is filled with the chanting of 'Om Namah Shivaya'. 🌸🧘‍♂️",
    date: "3 days ago",
    comments: [
      { id: 301, username: "shanthi_yoga", text: "Nothing is more peaceful than this place." }
    ]
  },
  {
    id: 4,
    imageUrl: swamiYellow,
    category: "Darshan",
    likes: 15300,
    isLiked: false,
    caption: "Sri Siddharoodha Swamiji in His radiant yellow alankara, symbolizing knowledge and spirituality. May His grace be with all. 💛✨",
    date: "5 days ago",
    comments: [
      { id: 401, username: "bhakti_path", text: "Sadguru Maharaj ki Jai!" }
    ]
  },
  {
    id: 5,
    imageUrl: swamiGreen,
    category: "Darshan",
    likes: 14220,
    isLiked: false,
    caption: "Divine alankara in pure green garments. The energy of Siddharoodha Swamiji is omnipresent and ever-guiding. 💚🏼",
    date: "6 days ago",
    comments: [
      { id: 501, username: "dharwad_resident", text: "Simply divine. Jai Ajja." }
    ]
  }
];

const Instagram = () => {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [filter, setFilter] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  const categories = ["All", "Ritual", "Festival", "Temple", "Darshan"];

  const handleLike = (id, e) => {
    if (e) e.stopPropagation();
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === id) {
          const updatedLiked = !post.isLiked;
          const updatedLikes = updatedLiked ? post.likes + 1 : post.likes - 1;
          const updatedPost = { ...post, isLiked: updatedLiked, likes: updatedLikes };
          
          if (selectedPost && selectedPost.id === id) {
            setSelectedPost(updatedPost);
          }
          return updatedPost;
        }
        return post;
      })
    );
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedPost) return;

    const newCommentObj = {
      id: Date.now(),
      username: "devotee_user",
      text: newComment.trim()
    };

    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === selectedPost.id) {
          const updatedPost = {
            ...post,
            comments: [...post.comments, newCommentObj]
          };
          setSelectedPost(updatedPost);
          return updatedPost;
        }
        return post;
      })
    );

    setNewComment("");
  };

  const handleShare = (post, e) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}/instagram#post-${post.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filteredPosts = filter === "All" 
    ? posts 
    : posts.filter(post => post.category === filter);

  return (
    <div className="min-h-screen bg-[#0F1115] pt-32 pb-20 text-white selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-3">
            <span className="h-[2px] w-8 bg-[#D4AF37] block"></span>
            <span className="text-[#D4AF37] font-serif font-bold tracking-widest text-xs uppercase flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#D4AF37]" /> Devotional Feed
            </span>
            <span className="h-[2px] w-8 bg-[#D4AF37] block"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">
            Spiritual <span className="text-[#D4AF37] text-shimmer">Gallery</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Experience the divine alankaras, daily rituals, and sacred festivals of Siddharoodha Swamiji Maharaj in Hubli.
          </p>

          {/* Categories / Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all border ${
                  filter === cat 
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10' 
                    : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative aspect-square rounded-2xl overflow-hidden card-luminous cursor-pointer bg-white/5 border border-white/5 shadow-2xl"
              onClick={() => setSelectedPost(post)}
            >
              <img 
                src={post.imageUrl} 
                alt={post.caption} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
              
              {/* Overlay with stats on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                <div className="flex items-center gap-1 text-white font-black text-sm">
                  <Heart size={20} className={`${post.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-white font-black text-sm">
                  <MessageCircle size={20} className="text-white" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-[#D4AF37]">
                {post.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Post details overlay */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              onClick={() => setSelectedPost(null)} 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-[101] max-w-4xl w-full bg-[#13161A] border-gold-leaf rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[600px]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-black/40 p-1.5 rounded-full z-[105]"
              >
                <X size={20} />
              </button>

              {/* Left Side: Post Image */}
              <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative h-1/2 md:h-full">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.caption} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Details and Devotee Interaction */}
              <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full">
                
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#1A237E] flex items-center justify-center font-bold text-xs">
                    S
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-white">siddharoodha_temple</span>
                      <Check size={12} className="text-[#D4AF37] fill-[#D4AF37]" />
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">Sri Siddharoodha Mutt, Hubli</span>
                  </div>
                </div>

                {/* Caption + Devotee Comments List */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {/* Original Caption */}
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#1A237E] flex items-center justify-center font-bold text-[9px] flex-shrink-0">
                      S
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        <span className="font-black mr-1.5 text-[#D4AF37]">siddharoodha_temple</span>
                        {selectedPost.caption}
                      </p>
                      <span className="text-[10px] text-gray-500 mt-1 block">{selectedPost.date}</span>
                    </div>
                  </div>

                  {/* Devotee Comments */}
                  {selectedPost.comments.map(comment => (
                    <div key={comment.id} className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-[9px] uppercase text-[#D4AF37] flex-shrink-0">
                        {comment.username.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">
                          <span className="font-black mr-1.5 text-gray-400">{comment.username}</span>
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interaction & Likes/Actions Bar */}
                <div className="border-t border-white/5 bg-white/[0.01]">
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => handleLike(selectedPost.id, e)}
                        className="text-gray-300 hover:text-white hover:scale-110 transition-all cursor-pointer"
                      >
                        <Heart 
                          size={22} 
                          className={selectedPost.isLiked ? 'fill-red-500 text-red-500' : ''} 
                        />
                      </button>
                      
                      <button 
                        onClick={(e) => handleShare(selectedPost, e)}
                        className="text-gray-300 hover:text-white hover:scale-110 transition-all cursor-pointer flex items-center gap-1.5 relative"
                      >
                        <Share2 size={22} />
                        {copiedId === selectedPost.id && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-[9px] font-black py-0.5 px-1.5 rounded uppercase tracking-wider">
                            Copied
                          </span>
                        )}
                      </button>
                    </div>

                    <button className="text-gray-300 hover:text-white hover:scale-110 transition-all cursor-pointer">
                      <Bookmark size={22} />
                    </button>
                  </div>

                  {/* Likes description */}
                  <div className="px-4 pb-4">
                    <p className="text-xs font-black text-white">{selectedPost.likes.toLocaleString()} likes</p>
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-black pt-1 block">May 31, 2026</span>
                  </div>

                  {/* Form input to add new devotee comments */}
                  <form onSubmit={handleAddComment} className="border-t border-white/5 flex items-center p-3 gap-2">
                    <input 
                      type="text" 
                      placeholder="Add a comment to the spiritual board..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-grow bg-transparent text-xs text-white border-none outline-none px-3 font-medium placeholder-gray-500"
                    />
                    <button 
                      type="submit"
                      disabled={!newComment.trim()}
                      className="text-[#D4AF37] disabled:text-gray-600 font-black uppercase tracking-widest text-[10px] px-3 py-1 cursor-pointer transition-colors"
                    >
                      Post
                    </button>
                  </form>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Instagram;
