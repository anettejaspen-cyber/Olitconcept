import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Youtube, 
  Globe, 
  Sparkles, 
  Send 
} from 'lucide-react';

export function TrustAndFooter() {
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setSubscribed(true);
      setNewsEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const trustSignals = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-cyber-cyan" />,
      title: '90-Day Parts Warranty',
      desc: 'All expert screen installations, battery cycles calibration, and chip replacements are backed by our pristine 90-day parts exchange warranty guarantee.',
      glowClass: 'glow-cyan hover:border-cyber-cyan/30',
      tag: 'SECURE'
    },
    {
      icon: <Cpu className="w-10 h-10 text-cyber-green" />,
      title: 'Genuine OEM Parts Only',
      desc: 'We feed only factory-quality materials, display monitors, and high-health cycle batteries into your device. Standard calibration is fully intact.',
      glowClass: 'glow-green hover:border-cyber-green/30',
      tag: 'CERTIFIED'
    },
    {
      icon: <Zap className="w-10 h-10 text-cyber-blue" />,
      title: 'Same-Day Turnaround',
      desc: 'Most screen replacements and port cleans take under 45 minutes direct at our expert counter bars. Remote couriers bring them back pristine in hours.',
      glowClass: 'glow-blue hover:border-cyber-blue/30',
      tag: 'EXPRESS'
    }
  ];

  return (
    <footer className="w-full relative bg-cyber-dark text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
      
      {/* Structural ambient spots */}
      <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-cyber-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION 1: TRUST SIGNALS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {trustSignals.map((sig, idx) => (
            <div 
              key={idx}
              className={`glass-panel p-8 rounded-3xl border border-white/5 bg-cyber-gray/40 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${sig.glowClass}`}
            >
              <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />
              <div className="absolute top-4 right-4 bg-white/5 px-2.5 py-0.5 rounded text-[8px] font-mono tracking-widest text-white/50 font-bold uppercase border border-white/5">
                {sig.tag}
              </div>

              <div className="mb-6 transform hover:scale-105 transition-transform duration-300">{sig.icon}</div>
              
              <h3 className="font-display font-extrabold text-lg text-white mb-3 text-glow-cyan">
                {sig.title}
              </h3>
              <p className="font-sans text-xs text-white/60 leading-relaxed">
                {sig.desc}
              </p>
            </div>
          ))}
        </div>

        {/* SECTION 2: PHYSICAL ADDRESS MAP & NEWSLETTER GRAB */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-white/5 pb-16 mb-16">
          
          {/* Column A: Contact Info details (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="https://i.ibb.co/cHzPLT9/IMG-20260602-WA0011.jpg" 
                alt="Olit Concept Logo" 
                className="w-10 h-10 rounded-xl object-cover border border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                referrerPolicy="no-referrer"
              />
              <span className="font-display text-xl font-black tracking-widest uppercase text-white hover:text-cyber-cyan transition-colors">
                OLIT<span className="text-cyber-cyan">CONCEPT</span>
              </span>
            </div>
            
            <p className="font-sans text-xs text-white/50 leading-relaxed max-w-sm uppercase font-mono tracking-wider">
              // premium smartphones, elite cases accessories retail, and expert hardware motherboard repairs.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Showroom HQ Address</h4>
                  <p className="font-sans text-xs text-white/60 mt-1">
                    99 Cyber Plaza, Luxury Retail Concourse, Sector 7-X, London
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Phone className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Secure Direct Line</h4>
                  <p className="font-mono text-xs text-white/60 mt-1">
                    +1-800-OLIT-CON (654-8266)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <Mail className="w-5 h-5 text-cyber-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Secure Tech Mailbox</h4>
                  <p className="font-sans text-xs text-white/60 mt-1">
                    support@olitconcept.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Interactive/Mock holographic Grid Maps (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center">
              <Clock className="w-4 h-4 text-cyber-cyan mr-1.5 animate-pulse" />
              HQ Operation timings & Map
            </h4>

            {/* Simulated Grid GPS Area Location Card */}
            <div className="glass-panel rounded-2xl border-white/5 overflow-hidden aspect-video relative flex items-center justify-center p-4">
              <div className="absolute inset-0 cyber-grid animate-grid-scroll opacity-30 pointer-events-none" />
              
              {/* Radar circular lines scanning mock position */}
              <div className="absolute w-24 h-24 rounded-full border border-cyber-cyan/30 animate-ping" />
              <div className="absolute w-12 h-12 rounded-full border border-cyber-blue/40 animate-pulse" />
              
              {/* Central pinpoint node */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-cyber-cyan glow-cyan flex items-center justify-center animate-bounce">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <span className="px-2.5 py-1 rounded-md bg-black/90 text-[8px] font-mono text-cyber-cyan uppercase font-bold border border-white/10 mt-1.5">
                  OLIT HQ GPS: OK
                </span>
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-[10px] text-white/60 uppercase">
              <div className="flex justify-between">
                <span>WEEKDAYS (EXPERT TECHS)</span>
                <span className="text-white">09:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>WEEKENDS (RETAIL BLOCK)</span>
                <span className="text-white">10:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Column C: Instant Newsletter dispatch opt-in (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center">
              <Sparkles className="w-4 h-4 text-[#10b981] mr-1.5" />
              Join the Tech Registry
            </h4>
            <p className="font-sans text-xs text-white/50 leading-relaxed">
              Opt into Olit Concept's custom technical alerts. Receive immediate notices about accessory range price cuts, same-day repair giveaways, and brand releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5 pt-2">
              <div className="relative">
                <input
                  required
                  type="email"
                  placeholder="Enter email identifier..."
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="w-full bg-cyber-dark/80 rounded-xl py-3 pl-4 pr-12 text-xs border border-white/10 focus:border-cyber-cyan/50 focus:outline-none text-white font-sans"
                />
                <button 
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-cyber-cyan hover:brightness-110 text-cyber-dark transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 fill-current text-current" />
                </button>
              </div>

              {subscribed && (
                <p className="font-mono text-[9px] text-cyber-green uppercase font-bold animate-pulse">
                  // Email address registered. Welcome to Olit Concept.
                </p>
              )}
            </form>

            <div className="flex space-x-3.5 pt-4">
              <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan text-white/60 hover:transform hover:scale-105 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan text-white/60 hover:transform hover:scale-105 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan text-white/60 hover:transform hover:scale-105 transition-all">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* SECTION 3: COPYRIGHT & CREDITS */}
        <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-[9px] uppercase font-bold text-white/30 tracking-widest text-center sm:text-left space-y-4 sm:space-y-0">
          <div>
            © 2026 Olit Concept. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-cyber-cyan">Privacy parameters</a>
            <a href="#terms" className="hover:text-cyber-cyan">Secure terms</a>
            <a href="#cookies" className="hover:text-cyber-cyan">Cookie cache</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
