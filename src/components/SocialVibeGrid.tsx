import React, { useState } from 'react';
import { SOCIAL_POSTS, CLIENT_REVIEWS, SocialPost } from '../types';
import { Star, Play, Heart, Eye, Sparkles, MessageCircle, HelpCircle, Check, Quote } from 'lucide-react';

export function SocialVibeGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<SocialPost | null>(null);

  // Before/After comparison slider percentage coordinates
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  // Filter posts list
  const filteredPosts = React.useMemo(() => {
    if (activeCategory === 'all') return SOCIAL_POSTS;
    return SOCIAL_POSTS.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    const offsetPercent = Math.max(0, Math.min(100, (x / containerRect.width) * 100));
    setSliderPosition(offsetPercent);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSliding) return;
    const container = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, container);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX, container);
    }
  };

  return (
    <div id="vibe-grid" className="w-full relative py-16 md:py-24 bg-cyber-gray/20 overflow-hidden">
      
      {/* Visual cyber layout borders */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] bg-cyber-green/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[450px] h-[450px] bg-cyber-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green font-mono text-[10px] uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Social Feed Proof & Transforms</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
            The Olit <span className="text-glow-green text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#00f0ff]">Vibe Deck</span>
          </h2>
          <p className="font-sans text-white/60 text-sm sm:text-base mt-4">
            Witness pristine unboxings, titanium custom setups, and extreme repair restorations. Our unvarnished craft feed mirrors the exact digital showcases shared across our networks.
          </p>
        </div>



        {/* SECTION B: INSTAGRAM/TIKTOK SHOT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {filteredPosts.map((post) => (
            <div 
              key={post.id}
              className="group glass-panel border border-white/5 bg-cyber-gray/40 rounded-3xl overflow-hidden relative shadow-xl hover:border-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Scanning visual overlay */}
              <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />

              {/* Media Thumbnail Container with glowing play */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={post.thumbnailUrl} 
                  alt="Social post" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                
                {/* Neon cyber cyan radial backdrop inside unboxings */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent z-10" />

                {/* Floating category Pill */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[8.5px] uppercase font-mono font-bold tracking-widest text-[#00f0ff] border border-white/10">
                    #{post.category}
                  </span>
                </div>

                {/* Video duration tag */}
                {post.duration && (
                  <div className="absolute bottom-3 right-3 z-20 px-1.5 py-0.5 rounded bg-black/80 text-[8.5px] font-mono text-white/70 tracking-widest">
                    {post.duration}
                  </div>
                )}

                {/* Action hovering overlays */}
                <button 
                  onClick={() => {
                    setActiveVideo(post);
                  }}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-tr from-cyber-cyan to-cyber-blue text-cyber-dark glow-cyan flex items-center justify-center cursor-pointer transform scale-90 group-hover:scale-100 transition-all duration-300 z-20 hover:brightness-110"
                >
                  <Play className="w-6 h-6 fill-current text-current ml-1" />
                </button>
              </div>

              {/* Feed Card description info */}
              <div className="p-6 relative z-10">
                <p className="font-sans text-xs text-white/75 leading-relaxed italic line-clamp-3">
                  "{post.caption}"
                </p>

                {/* Likes / Views Stats parameters */}
                <div className="mt-5 pt-4.5 border-t border-white/5 flex items-center justify-between font-mono text-[9px] uppercase font-bold text-white/40 tracking-wider">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-red-500">
                      <Heart className="w-3.5 h-3.5 fill-current text-current mr-1 animate-pulse" />
                      {post.likes}
                    </span>
                    {post.views && (
                      <span className="flex items-center text-cyber-cyan">
                        <Eye className="w-3.5 h-3.5 text-current mr-1" />
                        {post.views} Views
                      </span>
                    )}
                  </div>
                  <span className="text-white/30">TikTok Feed</span>
                </div>
              </div>
            </div>
          ))}
        </div>



        {/* Floating Social Post Video simulation Overlay Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-dark/85 backdrop-blur-md">
            <div className="max-w-xl w-full glass-panel border border-white/10 bg-cyber-gray/95 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
              
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer z-10 text-xs leading-none"
              >
                ✕
              </button>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-5">
                {/* Simulated video playback loading states */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 text-center px-4">
                  <div className="w-10 h-10 rounded-full border-2 border-t-2 border-transparent border-t-cyber-cyan animate-spin mb-3" />
                  <p className="font-mono text-xs text-cyber-cyan tracking-widest uppercase font-bold text-glow-cyan">Streaming Core Feed...</p>
                  <p className="text-[10px] text-white/40 font-mono mt-1">// secure video tunnel active</p>
                </div>
                <img 
                  src={activeVideo.thumbnailUrl} 
                  alt="Video playback" 
                  className="w-full h-full object-cover filter blur-[2px]" 
                />
              </div>

              <div>
                <span className="font-mono text-[9px] uppercase text-cyber-cyan tracking-widest font-bold">// INSTREAM DEMO REVISE</span>
                <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed mt-1.5 italic">
                  "{activeVideo.caption}"
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] uppercase font-bold text-white/40">
                  <span className="text-[#10b981]">Likes: {activeVideo.likes}</span>
                  <span>Category: {activeVideo.category}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
