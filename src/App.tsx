/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero3DCanvas } from './components/Hero3DCanvas';
import { RepairEngine } from './components/RepairEngine';
import { ShowroomGrid } from './components/ShowroomGrid';
import { SocialVibeGrid } from './components/SocialVibeGrid';
import { TrustAndFooter } from './components/TrustAndFooter';
import { Sparkle, ShieldCheck, ArrowRight, Star, Cpu } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showroomTab, setShowroomTab] = useState<'devices' | 'accessories'>('devices');

  // Trigger dynamic navigation to respective sections
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShowroomDevices = () => {
    setShowroomTab('devices');
    setTimeout(() => scrollToSection('showroom'), 100);
  };

  const handleShowroomAccessories = () => {
    setShowroomTab('accessories');
    setTimeout(() => scrollToSection('showroom'), 100);
  };

  const handleQuoteTrigger = () => {
    scrollToSection('repair-engine');
  };

  // Scroll animations: add active classes as viewport tracks them
  useEffect(() => {
    if (isLoading) return;
    
    const handleScrollFade = () => {
      const elements = document.querySelectorAll('.scroll-fade-in');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.88;
        if (isInViewport) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    };

    window.addEventListener('scroll', handleScrollFade);
    // Initial trigger to show above-the-fold content immediately
    setTimeout(handleScrollFade, 100);

    return () => window.removeEventListener('scroll', handleScrollFade);
  }, [isLoading]);

  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-cyber-cyan selection:text-black">
      {/* Structural ambient light pools */}
      <div className="absolute top-[8%] left-[-10%] w-[380px] h-[380px] bg-cyber-cyan/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[25%] right-[-10%] w-[380px] h-[380px] bg-cyber-blue/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Cyber-grid background layer */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Sticky blurred glassmorphism Navbar */}
      <Navbar 
        onQuoteTrigger={handleQuoteTrigger}
        onShowroomDevices={handleShowroomDevices}
        onShowroomAccessories={handleShowroomAccessories}
      />

      {/* HERO SECTION CONTAINER */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold modern typography and specs */}
            <div className="lg:col-span-7 space-y-8 text-left z-10">
              
              {/* Pulsating status banner */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan" />
                </span>
                <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-glow-cyan text-white">
                  Olit Concierge Services Fully Online
                </span>
              </div>

              {/* Main Landing Title Headings */}
              <div className="space-y-4">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
                  Smartphones. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-[#00f0ff] text-glow-cyan">
                    Premium Accessories.
                  </span> <br />
                  Expert Repairs.
                </h1>
                
                <h2 className="font-display text-lg sm:text-xl font-bold text-white/90 uppercase tracking-wide">
                  Done Right at Olit Concept.
                </h2>
              </div>

              {/* Premium description subtitle parameters */}
              <p className="font-sans text-sm sm:text-base text-white/60 max-w-xl leading-relaxed">
                Connect with the ultimate modern digital tech environment. High-end smartphone retail catalog, defense-armor casings, and precision component micro-surgery calibrated to absolute OEM benchmarks.
              </p>

              {/* Instant Call-to-actions buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 max-w-md pt-2">
                <button
                  onClick={handleQuoteTrigger}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-dark font-display font-black text-xs uppercase tracking-wider text-center flex items-center justify-center space-x-2 hover:brightness-110 shadow-2xl glow-cyan active:scale-95 transition-all cursor-pointer"
                >
                  <Cpu className="w-4.5 h-4.5 text-current" />
                  <span>Diagnose My Phone</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button
                  onClick={handleShowroomDevices}
                  className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-mono text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
                >
                  Explore Showroom
                </button>
              </div>

              {/* Technical Credibility numbers ribbon */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/5 max-w-lg font-mono">
                <div>
                  <div className="font-display text-3xl font-black text-white leading-none">25K+</div>
                  <span className="text-[8.5px] uppercase font-bold text-white/40 tracking-widest mt-1 block">Repairs Processed</span>
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-cyber-cyan leading-none">4.9★</div>
                  <span className="text-[8.5px] uppercase font-bold text-white/40 tracking-widest mt-1 block">Client Audit Rate</span>
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-white leading-none">30m</div>
                  <span className="text-[8.5px] uppercase font-bold text-white/40 tracking-widest mt-1 block">Avg Wait Duration</span>
                </div>
              </div>

            </div>

            {/* Right Column: Three.js Interactive Floating 3D Smartphone Skeleton */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-cyber-blue/5 rounded-full filter blur-[100px] pointer-events-none" />
              <Hero3DCanvas />
            </div>

          </div>
        </div>
      </header>

      {/* CORE MODULES DISPLAY GRID & SEGMENTS */}

      {/* SECTION 1: INTERACTIVE REPAIR DIAGNOSTICS DECK */}
      <section className="scroll-fade-in opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <RepairEngine />
      </section>

      {/* SECTION 2: LUXURY RETAIL HARDWARE CARRELS */}
      <section className="scroll-fade-in opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <ShowroomGrid 
          activeTab={showroomTab}
          setActiveTab={setShowroomTab}
        />
      </section>

      {/* SECTION 3: SOCIAL UNBOXINGS FEED & TESTIMONIALS */}
      <section className="scroll-fade-in opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <SocialVibeGrid />
      </section>

      {/* SECTION 4: TRUST SIGNALS & FOOTERS */}
      <TrustAndFooter />
    </div>
  );
}
