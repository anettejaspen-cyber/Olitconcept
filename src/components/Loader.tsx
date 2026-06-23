import React, { useState, useEffect } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Initializing holographic matrices...');
  const [visible, setVisible] = useState(true);

  const tasks = [
    'Initializing holographic matrices...',
    'Loading 3D smartphone schematics...',
    'Calibrating precision repair estimators...',
    'Connecting secure OEM secure servers...',
    'Polishing accessories display deck...',
    'Olit Concept terminal virtual online.'
  ];

  useEffect(() => {
    // Increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Dynamic speed variations
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dynamic subsystem task updates
    const taskIndex = Math.min(Math.floor((progress / 100) * tasks.length), tasks.length - 1);
    setCurrentTask(tasks[taskIndex]);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
        // Delay callback for beautiful fade-out animation
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(completeTimeout);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-cyber-dark transition-opacity duration-500 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyber-cyan/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Loading Spinner Core (Rotating Data Circuit) */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          
          {/* Outermost dotted circuit */}
          <div className="absolute inset-0 rounded-full border-2 border-dotted border-cyber-cyan/30 animate-spin-slow" />

          {/* Middle segmented fast spinning circuit */}
          <div className="absolute p-2 inset-2 rounded-full border-t-2 border-r-2 border-b-2 border-transparent border-t-cyber-blue border-r-cyber-cyan animate-spin" style={{ animationDuration: '1.5s' }} />

          {/* Inner slow reverse spinning circuit */}
          <div className="absolute p-4 inset-4 rounded-full border-2 border-l-2 border-b-2 border-transparent border-l-cyber-green border-b-cyber-green animate-spin-reverse" />

          {/* Micro-nodes */}
          <div className="absolute top-0 left-12 w-2 h-2 rounded-full bg-cyber-cyan glow-cyan" />
          <div className="absolute bottom-6 right-2 w-1.5 h-1.5 rounded-full bg-cyber-green" />
          <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-cyber-blue glow-blue" />

          {/* Floating diagnostic percentage */}
          <div className="flex flex-col items-center text-center z-10">
            <span className="font-display text-4xl font-extrabold text-white text-glow-cyan">
              {progress}%
            </span>
            <span className="font-mono text-[9px] tracking-widest text-cyber-cyan uppercase font-bold mt-1">
              Engine OK
            </span>
          </div>
        </div>

        {/* Brand Core */}
        <div className="mt-10 text-center z-10 px-6 flex flex-col items-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <img 
              src="https://i.ibb.co/cHzPLT9/IMG-20260602-WA0011.jpg" 
              alt="Olit Concept Logo" 
              className="w-12 h-12 rounded-xl object-cover border border-cyber-cyan/45 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
              referrerPolicy="no-referrer"
            />
            <span className="font-display text-2xl font-black tracking-wider text-white uppercase">
              OLIT<span className="text-cyber-cyan">CONCEPT</span>
            </span>
          </div>
          <p className="font-mono text-[10px] tracking-widest text-[#00f0ff]/80 font-black uppercase mt-1">
            // ELITE BRAND PORTAL ONLINE
          </p>
          <p className="font-mono text-[9px] text-white/50 tracking-wider font-semibold mt-1 max-w-[200px] sm:max-w-[400px]">
            PREMIUM SMARTPHONES • ACCESSORIES • EXPERT REPAIRS
          </p>
        </div>

        {/* Dynamic Diagnostics Terminal */}
        <div className="mt-8 max-w-xs sm:max-w-md w-full px-4 text-center z-10">
          <div className="glass-panel p-3.5 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
            {/* Holographic grid scanline inside terminal */}
            <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
            
            <div className="flex items-center space-x-2 justify-center mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest text-[#10b981] font-bold uppercase">
                Diagnostic Subsystem State
              </span>
            </div>
            
            <p className="font-mono text-xs text-white/70 h-4 truncate">
              {currentTask}
            </p>
          </div>
          
          <div className="mt-4 flex justify-between px-2 font-mono text-[9px] text-white/40 uppercase">
            <span>Server: Cloud-Core-01</span>
            <span>Version: 3.1.5 (Pro)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
