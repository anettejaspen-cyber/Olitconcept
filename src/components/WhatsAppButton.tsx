import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, ShoppingBag, Wrench, Shield, Check } from 'lucide-react';

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  // Show a helpful tooltip after 4 seconds to prompt interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const WHATSAPP_NUMBER = '2348130060812'; // OLIT-CON HQ Support Line (International Format)

  const handleQuickInquiry = (type: 'order' | 'repair' | 'tech') => {
    let message = '';
    if (type === 'order') {
      message = 'Hello Olit Concept! I am interested in placing an order for one of your smartphones/accessories from your landing page. Please guide me on availability and pricing.';
    } else if (type === 'repair') {
      message = 'Hello Olit Concept Support! I have a device repair inquiry. I would like to get a quote and turnaround estimation for my hardware repair.';
    } else {
      message = 'Hi! I would like to speak directly with an expert hardware technician regarding a motherboard or chip replacement diagnostic.';
    }
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    const encodedMessage = encodeURIComponent(customMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    setCustomMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 font-sans">
      
      {/* Dynamic Tooltip Invitation */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-16 left-0 bg-white dark:bg-slate-900 border border-slate-150 dark:border-white/10 p-3.5 rounded-2xl shadow-xl w-64 text-left pointer-events-auto flex items-start gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mt-1.5 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-800 dark:text-white mb-0.5">
                Chat with Olit Concept Support
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                Order inquiries, custom phone stock, or direct hardware quotes.
              </p>
              <button 
                onClick={() => {
                  setIsOpen(true);
                  setShowTooltip(false);
                }}
                className="text-[10px] font-mono font-bold text-emerald-500 hover:text-emerald-600 dark:text-emerald-400 uppercase tracking-wider cursor-pointer flex items-center gap-1"
              >
                Inquire Now &rarr;
              </button>
            </div>
            <button 
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 shrink-0"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating WhatsApp Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-16 left-0 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl w-80 overflow-hidden text-left"
          >
            {/* Header branding */}
            <div className="bg-emerald-600 dark:bg-emerald-950/60 p-4 border-b border-emerald-500/10 flex items-center justify-between relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent)] pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <img 
                    src="https://i.ibb.co/cHzPLT9/IMG-20260602-WA0011.jpg" 
                    alt="Olit Concept logo" 
                    className="w-10 h-10 rounded-xl object-cover border border-white/20"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-950 rounded-full" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-white uppercase tracking-wider">
                    OLIT CONCEPT
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] font-mono text-emerald-100 dark:text-emerald-300 font-medium">
                      Online Support
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer relative z-10"
                aria-label="Close support chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body & Action suggestions */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto bg-slate-50 dark:bg-slate-900/40">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="mb-1">
                  👋 <strong>Hello!</strong> Welcome to Olit Concept premium client conciergerie.
                </p>
                <p>
                  How can we assist you today? Select a quick inquiry topic below or type a custom message to connect immediately via WhatsApp.
                </p>
              </div>

              {/* Fast Action Categories */}
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Quick-Inquiry Templates
                </p>
                
                <button
                  onClick={() => handleQuickInquiry('order')}
                  className="w-full flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 rounded-xl transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-white">Smartphone / Accessories Order</p>
                      <p className="text-[9.5px] text-slate-400 dark:text-slate-500 mt-0.5">Check stock & make secure purchase</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleQuickInquiry('repair')}
                  className="w-full flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 rounded-xl transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4 text-cyber-cyan" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-white">Device Repair Inquiry</p>
                      <p className="text-[9.5px] text-slate-400 dark:text-slate-500 mt-0.5">Get a physical fix & repair estimation</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleQuickInquiry('tech')}
                  className="w-full flex items-center justify-between p-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 rounded-xl transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyber-green/10 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-cyber-green" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-white">Speak with Technician</p>
                      <p className="text-[9.5px] text-slate-400 dark:text-slate-500 mt-0.5">Diagnostic & hardware chip questions</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Custom Send Form */}
            <form onSubmit={handleCustomSend} className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 flex gap-2">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type custom message..."
                className="flex-1 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Send message to WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className={`p-3.5 rounded-full bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer relative flex items-center justify-center ${
          isOpen ? 'bg-rose-500 rotate-90' : 'hover:bg-emerald-600 hover:shadow-emerald-500/20 shadow-emerald-500/10 animate-glow'
        }`}
        aria-label="Open support chat on WhatsApp"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            {/* Pulsing indicator ring */}
            <span className="absolute -inset-0.5 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-75" />
            <MessageCircle className="w-5.5 h-5.5 relative z-10" />
          </>
        )}
      </button>

    </div>
  );
}
