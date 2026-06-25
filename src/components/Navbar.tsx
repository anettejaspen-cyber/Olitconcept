import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, ShoppingCart, Search, Compass, Ticket, Check, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  onQuoteTrigger: () => void;
}

export function Navbar({ onQuoteTrigger }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track Order state details
  const [trackOpen, setTrackOpen] = useState(false);
  const [trackTicket, setTrackTicket] = useState('');
  const [foundTicketData, setFoundTicketData] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    // Fetch from localStorage
    const savedTickets = JSON.parse(localStorage.getItem('olit_tickets') || '[]');
    const matched = savedTickets.find((t: any) => t.ticketId.trim().toUpperCase() === trackTicket.trim().toUpperCase());
    
    if (matched) {
      setFoundTicketData(matched);
    } else {
      setFoundTicketData(null);
    }
  };

  const closeTrackModal = () => {
    setTrackOpen(false);
    setTrackTicket('');
    setFoundTicketData(null);
    setHasSearched(false);
  };

  const navLinks = [
    { name: 'Shop Catalog', href: '#order-section' },
    { name: 'Price Guide', href: '#price-guide' },
    { name: 'Book a Repair', href: '#repair-engine' },
    { name: 'Track Order', action: () => setTrackOpen(true) },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'glass-panel py-3 bg-cyber-dark/85 shadow-lg border-b border-white/5' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Brand Core */}
            <a href="#" className="flex items-center space-x-2.5 group">
              <img 
                src="https://i.ibb.co/cHzPLT9/IMG-20260602-WA0011.jpg" 
                alt="Olit Concept Logo" 
                className="w-10 h-10 rounded-xl object-cover border border-cyber-cyan/30 shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:border-cyber-cyan/60 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
              />
              <span className="font-display text-lg sm:text-xl font-black tracking-widest text-white uppercase group-hover:text-cyber-cyan transition-colors duration-200">
                OLIT<span className="text-cyber-cyan">CONCEPT</span>
              </span>
            </a>

            {/* Desktop Navigation Link Deck */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (link.action) {
                      link.action();
                    } else if (link.href) {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="font-mono text-[10px] tracking-widest uppercase font-bold text-white/70 hover:text-cyber-cyan transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* CTA action Button: Get a Quote */}
            <div className="hidden md:block">
              <button
                onClick={onQuoteTrigger}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-dark font-display font-black text-xs uppercase tracking-wider glow-cyan hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile collapsible Menu toggle button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden glass-panel border-b border-white/5 bg-cyber-gray/95 animate-slide-down">
            <div className="px-2 pt-2 pb-6 space-y-2.5 sm:px-3 text-center">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsOpen(false);
                    if (link.action) {
                      link.action();
                    } else if (link.href) {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block w-full py-3 font-mono text-[11px] tracking-widest uppercase font-bold text-white/80 hover:text-cyber-cyan"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-white/5 max-w-[200px] mx-auto">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onQuoteTrigger();
                  }}
                  className="w-full py-3 rounded-lg bg-cyber-cyan text-cyber-dark font-display font-bold text-xs uppercase tracking-wider text-center"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* TRACK REPAIR ORDER POPUP MODAL */}
      {trackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-dark/85 backdrop-blur-md animate-fade-in">
          <div className="max-w-md w-full glass-panel border border-white/10 bg-cyber-gray/95 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

            {/* Modal Close */}
            <button
              onClick={closeTrackModal}
              className="absolute top-4 right-4 text-xs font-display font-bold text-white/50 hover:text-white"
            >
              ✕
            </button>

            <div className="text-center">
              <Ticket className="w-12 h-12 text-cyber-cyan mx-auto mb-4 glow-cyan" />
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-white leading-none">
                Track Diagnostic Flow
              </h3>
              <p className="font-sans text-xs text-white/40 mt-1.5 uppercase font-mono tracking-wider">
                // input your holographic ticket ID
              </p>

              {/* Action track query form */}
              <form onSubmit={handleTrackSubmit} className="mt-6 flex gap-2">
                <input
                  required
                  type="text"
                  placeholder="e.g. OLIT-265142X"
                  value={trackTicket}
                  onChange={(e) => setTrackTicket(e.target.value)}
                  className="flex-1 bg-cyber-dark rounded-xl py-3 px-4 border border-white/10 text-xs font-display uppercase tracking-widest font-black focus:outline-none focus:border-cyber-cyan"
                />
                <button 
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-cyber-cyan text-cyber-dark font-display font-black text-xs uppercase tracking-wider cursor-pointer"
                >
                  Trace
                </button>
              </form>

              {/* SEARCH OUTCOME INTERFACES */}
              {hasSearched && (
                <div className="mt-6 text-left border-t border-white/5 pt-5 animate-fade-in">
                  {foundTicketData ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-[#10b981]/10 px-3 py-2 rounded border border-[#10b981]/25">
                        <span className="font-mono text-[9px] uppercase text-[#10b981] font-bold">STATE: CYBER_ACTIVE</span>
                        <span className="px-2 py-0.5 rounded bg-[#10b981] text-cyber-dark font-mono text-[8.5px] uppercase font-black">
                          {foundTicketData.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 font-mono text-[10px]">
                        <div className="flex justify-between text-white/40">
                          <span>CLIENT NAME</span>
                          <span className="text-white font-bold">{foundTicketData.fullName}</span>
                        </div>
                        <div className="flex justify-between text-white/40">
                          <span>HARDWARE DEVICE</span>
                          <span className="text-white uppercase font-bold">{foundTicketData.brand} {foundTicketData.model}</span>
                        </div>
                        <div className="flex justify-between text-white/40">
                          <span>DIAGNOSTIC FAULT</span>
                          <span className="text-white uppercase font-bold">{foundTicketData.issue}</span>
                        </div>
                        <div className="flex justify-between text-white/40">
                          <span>COUPLER REGISTER</span>
                          <span className="text-cyber-cyan">{foundTicketData.ticketId}</span>
                        </div>
                        <div className="flex justify-between text-white/40">
                          <span>VALUATION CHARGE</span>
                          <span className="text-cyber-green font-bold">${foundTicketData.cost}</span>
                        </div>
                      </div>

                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 font-mono text-[8px] text-white/50">
                        * A pristine lockbox courier has been allocated to coordinates: {foundTicketData.address}. Keep your terminal active.
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-red-500/10 rounded-xl border border-red-500/20">
                      <p className="font-mono text-xs text-red-500 uppercase font-bold tracking-wider">Ticket ID Not Logged</p>
                      <p className="text-[10px] text-white/40 font-sans mt-1">If you just booked a collection, verify the ID parameter in your browser.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Sample Ticket reminder */}
              <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[8.5px] text-white/30 text-center uppercase">
                * SYSTEM AUTO-SYNC WITH REPAIR REGISTRY DATABASE
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
