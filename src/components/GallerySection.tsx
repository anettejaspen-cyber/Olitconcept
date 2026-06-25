import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Video, ChevronRight, MonitorPlay, Sparkles, ShieldCheck, Cpu, ExternalLink, Maximize2, X, ChevronLeft } from 'lucide-react';

interface GalleryVideo {
  id: string;
  driveId: string;
  title: string;
  description: string;
  tag: string;
  duration: string;
  category: 'Stock' | 'Repair' | 'Testing';
}

function VideoSkeletonLoader({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 bg-slate-950 flex flex-col justify-between p-6 z-20 select-none">
      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_95%,rgba(255,255,255,0.015)_95%)] bg-[size:100%_4px] pointer-events-none z-10" />

      {/* Top Indicators */}
      <div className="flex items-center justify-between w-full opacity-60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
          <div className="h-2 w-20 bg-white/10 rounded-full animate-pulse" />
        </div>
        <div className="h-2 w-10 bg-white/10 rounded-full animate-pulse" />
      </div>

      {/* Center play button & loader */}
      <div className="flex flex-col items-center justify-center gap-4 my-auto">
        <div className="w-14 h-14 rounded-full bg-cyber-cyan/5 border border-cyber-cyan/30 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-cyber-cyan/5 animate-ping" style={{ animationDuration: '3s' }} />
          <Play className="w-5 h-5 text-cyber-cyan fill-cyber-cyan/20 ml-0.5 animate-pulse" />
        </div>
        <div className="text-center space-y-1.5 max-w-sm px-4">
          <p className="text-[10px] font-mono text-cyber-cyan tracking-widest uppercase font-black flex items-center justify-center gap-2">
            <span className="w-3 h-3 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin shrink-0" />
            Connecting Feed...
          </p>
          <p className="text-[10px] text-slate-500 font-medium truncate">
            {title}
          </p>
        </div>
      </div>

      {/* Bottom video player controls skeleton */}
      <div className="space-y-3 opacity-40">
        {/* Progress bar mock */}
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-cyber-cyan/20 rounded-full" />
        </div>
        
        {/* Row of controls mock */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white/25 rounded-full" />
            <div className="w-3 h-3 bg-white/20 rounded-sm" />
            <div className="h-1.5 w-12 bg-white/10 rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-3 w-7 bg-cyber-cyan/15 border border-cyber-cyan/20 rounded text-[7px] font-mono text-cyber-cyan font-bold flex items-center justify-center">
              LIVE
            </div>
            <div className="w-3 h-3 bg-white/25 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

const VIDEOS: GalleryVideo[] = [
  {
    id: 'vid-1',
    driveId: '1-Ed7SKcajEPktecM5OLX2CS5deHeQOsb',
    title: 'UK Used Premium Smartphone Quality Inspection',
    description: 'A detailed walkthrough of our physical grading standards, casing inspections, and diagnostic checkups for premium UK used iPhones.',
    tag: 'Grade-A Inspection',
    duration: '0:52',
    category: 'Stock'
  },
  {
    id: 'vid-2',
    driveId: '1p7vlUiSDZt7HsMwqHTXgE-Wliur_-oqf',
    title: 'New Smartphone Unboxing & Accessory Diagnostics',
    description: 'Witness the authentication process of sealed accessories and unboxing the pristine physical design of our newest flagship inventory.',
    tag: 'Primacy Stock',
    duration: '1:14',
    category: 'Stock'
  },
  {
    id: 'vid-3',
    driveId: '1EyL1qr_zYkUT6vX4GZSIa95ZtPV8i1ox',
    title: 'High-Precision Motherboard & Chip Diagnostic',
    description: 'Our expert hardware technician performing live thermal imaging, micro-soldering, and OEM chip replacement under a high-power microscope.',
    tag: 'Micro-Surgery',
    duration: '0:45',
    category: 'Repair'
  },
  {
    id: 'vid-4',
    driveId: '1wZcLkCo4kI-1GyAInvv0QCusfyq7vYcj',
    title: 'Touch Screen Assembly & Liquid-Cooling Diagnostic',
    description: 'Precision physical screen separation, dustless gasket sealing, and adhesive polymerization under custom UV curing chambers.',
    tag: 'Glass Restoration',
    duration: '1:01',
    category: 'Repair'
  },
  {
    id: 'vid-5',
    driveId: '1eb_LBhRQl3zQ8uMQqb6fapDPcEJFEtm2',
    title: 'Acoustic Soundstage & Haptic Feedback Calibration',
    description: 'Final calibration testing for physical speakers, pure-bass transducers, haptic engines, and waterproof sealant performance.',
    tag: 'Acoustic Test',
    duration: '0:38',
    category: 'Testing'
  }
];

export function GallerySection() {
  const [selectedVideo, setSelectedVideo] = useState<GalleryVideo>(VIDEOS[0]);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalIframeLoading, setIsModalIframeLoading] = useState(true);

  // Prevent background scroll when immersive theater modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleVideoSelect = (video: GalleryVideo) => {
    if (selectedVideo.id === video.id) return;
    setIsIframeLoading(true);
    setIsModalIframeLoading(true);
    setSelectedVideo(video);
  };

  const handleOpenModal = () => {
    setIsModalIframeLoading(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextVideo = () => {
    const currentIndex = VIDEOS.findIndex(v => v.id === selectedVideo.id);
    const nextIndex = (currentIndex + 1) % VIDEOS.length;
    setIsModalIframeLoading(true);
    setIsIframeLoading(true);
    setSelectedVideo(VIDEOS[nextIndex]);
  };

  const handlePrevVideo = () => {
    const currentIndex = VIDEOS.findIndex(v => v.id === selectedVideo.id);
    const prevIndex = (currentIndex - 1 + VIDEOS.length) % VIDEOS.length;
    setIsModalIframeLoading(true);
    setIsIframeLoading(true);
    setSelectedVideo(VIDEOS[prevIndex]);
  };

  const getEmbedUrl = (driveId: string) => {
    return `https://drive.google.com/file/d/${driveId}/preview`;
  };

  const getDirectUrl = (driveId: string) => {
    return `https://drive.google.com/file/d/${driveId}/view?usp=drivesdk`;
  };

  return (
    <div id="media-gallery" className="relative py-24 bg-slate-950 border-t border-b border-white/5 overflow-hidden font-sans">
      {/* Visual Background Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyber-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-rose-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      {/* Tech-grid subtle pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-cyber-cyan tracking-wider uppercase">Live Video Showroom</span>
          </div>
          
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
            MULTIMEDIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-rose-500">EXPERIENCE CENTER</span>
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Inspect our direct physical stock, witness live smartphone chip micro-surgery, and watch precision diagnostics from our premium Lagos laboratory.
          </p>
        </div>

        {/* Bento Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Theater Console Player (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video w-full rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl group flex flex-col justify-between">
              
              {/* Subtle Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_95%,rgba(255,255,255,0.015)_95%)] bg-[size:100%_4px] pointer-events-none z-10" />

              {/* Loader Backdrop */}
              {isIframeLoading && (
                <VideoSkeletonLoader title={selectedVideo.title} />
              )}

              {/* Iframe element */}
              <iframe
                src={getEmbedUrl(selectedVideo.driveId)}
                className="w-full h-full border-0 absolute inset-0 z-0"
                allow="autoplay; fullscreen"
                onLoad={() => setIsIframeLoading(false)}
                title={selectedVideo.title}
              />

              {/* Controls bar / overlay indicator */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                <div className="flex gap-2 pointer-events-auto">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    Live Feed
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-slate-300 uppercase tracking-widest">
                    {selectedVideo.category}
                  </span>
                </div>

                <button
                  onClick={handleOpenModal}
                  className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 hover:border-cyber-cyan/50 text-[9px] font-mono text-slate-200 hover:text-cyber-cyan font-bold uppercase tracking-widest flex items-center gap-1 transition-all cursor-pointer pointer-events-auto shadow-lg"
                  title="Expand to Fullscreen Theater Mode"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Theater Mode</span>
                </button>
              </div>
            </div>

            {/* Selected Video Meta Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <span className="text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-wider">
                  {selectedVideo.tag} • Duration: {selectedVideo.duration}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                  {selectedVideo.description}
                </p>
              </div>

              <div className="shrink-0 pt-2 sm:pt-0">
                <a
                  href={getDirectUrl(selectedVideo.driveId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-cyan/30 text-white hover:text-cyber-cyan text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all group"
                >
                  <span>Direct Link</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Playlist Selection Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <MonitorPlay className="w-4 h-4 text-cyber-cyan" />
                <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Showcase Playlist</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                5 Videos Available
              </span>
            </div>

            {/* List box */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {VIDEOS.map((video, index) => {
                const isActive = selectedVideo.id === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer flex items-start gap-4 ${
                      isActive
                        ? 'bg-gradient-to-r from-white/10 to-white/5 border-cyber-cyan shadow-lg glow-cyan'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Active index banner */}
                    <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 select-none">
                      0{index + 1}
                    </div>

                    {/* Left Icon Panel */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? 'bg-cyber-cyan text-slate-950 scale-105'
                        : 'bg-slate-900 border border-white/10 text-slate-400 group-hover:text-white'
                    }`}>
                      {isActive ? (
                        isIframeLoading ? (
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Play className="w-4 h-4 fill-current animate-pulse" />
                        )
                      ) : (
                        <Video className="w-4 h-4" />
                      )}
                    </div>

                    {/* Meta information */}
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          video.category === 'Stock'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : video.category === 'Repair'
                            ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {video.category}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">
                          {video.duration}
                        </span>
                      </div>
                      
                      <h4 className={`text-xs font-bold truncate transition-colors ${
                        isActive ? 'text-cyber-cyan' : 'text-white group-hover:text-cyber-cyan'
                      }`}>
                        {video.title}
                      </h4>
                      
                      <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    {/* Direct arrow transition feedback */}
                    <div className="self-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4 text-cyber-cyan" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Trust signal tag under playlist */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed">
                All physical stock and repair methods shown in these videos represent authentic Olit Concept deliveries and live diagnostic operations.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Full-screen Focused Theater Mode Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto"
          >
            {/* Ambient Background Glow inside Modal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/5 rounded-full filter blur-[150px] pointer-events-none" />

            {/* Top Bar Controls */}
            <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <MonitorPlay className="w-5 h-5 text-cyber-cyan" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-widest block">
                    Olit Concept Theater
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans hidden sm:inline">
                    Focused high-resolution diagnostic showcase
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider"
                aria-label="Close theater mode"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Middle Stage (Main Large Iframe Player & Side Navigation Arrows) */}
            <div className="relative z-10 w-full max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Previous Button (Left Sidebar on Large) */}
              <div className="hidden lg:flex lg:col-span-1 justify-center">
                <button
                  onClick={handlePrevVideo}
                  className="p-4 rounded-full bg-white/5 hover:bg-cyber-cyan hover:text-slate-950 border border-white/10 hover:border-cyber-cyan transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer shadow-lg text-white"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>

              {/* Central Video Frame */}
              <div className="col-span-1 lg:col-span-10 space-y-6">
                <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl bg-slate-900 border border-white/15 overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                  {/* Loader Backdrop */}
                  {isModalIframeLoading && (
                    <VideoSkeletonLoader title={selectedVideo.title} />
                  )}

                  <iframe
                    src={getEmbedUrl(selectedVideo.driveId)}
                    className="w-full h-full border-0 absolute inset-0 z-0"
                    allow="autoplay; fullscreen"
                    onLoad={() => setIsModalIframeLoading(false)}
                    title={`Modal - ${selectedVideo.title}`}
                  />
                  
                  {/* Subtle Scanline Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_95%,rgba(255,255,255,0.015)_95%)] bg-[size:100%_4px] pointer-events-none z-10" />
                </div>

                {/* Video Info Panel */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 text-[9px] font-mono font-bold uppercase tracking-wider">
                        {selectedVideo.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 text-[9px] font-mono uppercase tracking-wider">
                        {selectedVideo.tag}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 ml-1">
                        Duration: {selectedVideo.duration}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {selectedVideo.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
                      {selectedVideo.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex gap-2">
                    <a
                      href={getDirectUrl(selectedVideo.driveId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-cyan/30 text-white hover:text-cyber-cyan text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all group"
                    >
                      <span>Direct Drive Link</span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Next Button (Right Sidebar on Large) */}
              <div className="hidden lg:flex lg:col-span-1 justify-center">
                <button
                  onClick={handleNextVideo}
                  className="p-4 rounded-full bg-white/5 hover:bg-cyber-cyan hover:text-slate-950 border border-white/10 hover:border-cyber-cyan transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer shadow-lg text-white"
                  aria-label="Next video"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

            </div>

            {/* Mobile/Tablet Arrow Navigation Bar */}
            <div className="relative z-10 flex lg:hidden items-center justify-center gap-6 mt-4 pb-4">
              <button
                onClick={handlePrevVideo}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>
              <button
                onClick={handleNextVideo}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom mini-track playlist carousel for immediate switching */}
            <div className="relative z-10 w-full max-w-6xl mx-auto mt-6 border-t border-white/10 pt-6">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
                Jump To Video
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {VIDEOS.map((video, idx) => {
                  const isCurrent = video.id === selectedVideo.id;
                  return (
                    <button
                      key={`modal-nav-${video.id}`}
                      onClick={() => {
                        if (isCurrent) return;
                        setIsModalIframeLoading(true);
                        setSelectedVideo(video);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-300 group cursor-pointer ${
                        isCurrent
                          ? 'bg-cyber-cyan/10 border-cyber-cyan'
                          : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className={`text-[8px] font-mono block mb-1 uppercase tracking-wider ${
                        isCurrent ? 'text-cyber-cyan font-bold' : 'text-slate-500'
                      }`}>
                        {isCurrent && isModalIframeLoading ? 'Buffering...' : `Video 0${idx + 1}`}
                      </span>
                      <h4 className={`text-[10px] font-bold truncate ${
                        isCurrent ? 'text-white' : 'text-slate-400 group-hover:text-cyber-cyan'
                      }`}>
                        {video.title}
                      </h4>
                    </button>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
