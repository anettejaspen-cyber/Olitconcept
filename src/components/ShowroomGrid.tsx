import React, { useState } from 'react';
import { DEVICES_SHOWROOM, ACCESSORIES_SHOWROOM, Device, Accessory } from '../types';
import { TiltCard } from './TiltCard';
import { ShoppingCart, Star, Eye, ShieldAlert, Sparkle, Tag, Check, Search } from 'lucide-react';

interface ShowroomGridProps {
  activeTab: 'devices' | 'accessories';
  setActiveTab: (tab: 'devices' | 'accessories') => void;
}

export function ShowroomGrid({ activeTab, setActiveTab }: ShowroomGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Device | Accessory | null>(null);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Quick brand or category filters
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filters = React.useMemo(() => {
    if (activeTab === 'devices') {
      return ['All', 'Laptops', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Asus', 'Dell'];
    } else {
      return ['All', 'Cases & Armor', 'Power & Adapters', 'Straps & Wearables', 'Screen Protection'];
    }
  }, [activeTab]);

  const filteredItems = React.useMemo(() => {
    let items: (Device | Accessory)[] = [];
    if (activeTab === 'devices') {
      const allDevices = DEVICES_SHOWROOM;
      if (activeFilter === 'All') {
        items = allDevices;
      } else if (activeFilter === 'Laptops') {
        items = allDevices.filter(item => item.isLaptop);
      } else {
        items = allDevices.filter(item => item.brand === activeFilter);
      }
    } else {
      const allAccessories = ACCESSORIES_SHOWROOM;
      if (activeFilter === 'All') {
        items = allAccessories;
      } else {
        items = allAccessories.filter(item => item.category === activeFilter);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => {
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = 'brand' in item && item.brand.toLowerCase().includes(query);
        const matchesCategory = 'category' in item && item.category.toLowerCase().includes(query);
        const matchesSpecs = item.specs && item.specs.some(spec => spec.toLowerCase().includes(query));
        return matchesName || matchesBrand || matchesCategory || matchesSpecs;
      });
    }

    return items;
  }, [activeTab, activeFilter, searchQuery]);

  return (
    <div id="showroom" className="w-full relative py-16 md:py-24 bg-cyber-dark text-white overflow-hidden">
      
      {/* Decorative cyber grid element */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
      
      {/* Dynamic ambient color glows */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-cyber-blue/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[400px] h-[400px] bg-cyber-cyan/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue font-mono text-[10px] uppercase tracking-widest mb-4">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Pristine Physical Deck</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              The Premium <span className="text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-blue">Showroom</span>
            </h2>
            <p className="font-sans text-white/60 text-sm max-w-xl mt-3.5">
              Explore our curation of premium, factory-seal, high-spec mobile hardware nodes alongside luxury armor casing systems engineered to secure your daily interface.
            </p>
          </div>

          {/* Toggle Tab Deck (Latest Devices vs Luxury Accessories) */}
          <div className="flex bg-cyber-gray/80 border border-white/5 p-1.5 rounded-2xl md:mt-0 mt-6 shrink-0 self-start md:self-end">
            <button
              onClick={() => {
                setActiveTab('devices');
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'devices'
                  ? 'bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-blue/90 text-cyber-dark glow-blue font-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Latest Devices
            </button>
            <button
              onClick={() => {
                setActiveTab('accessories');
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'accessories'
                  ? 'bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-blue/90 text-cyber-dark glow-blue font-black'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Luxury Accessories
            </button>
          </div>
        </div>

        {/* Search Bar Block */}
        <div className="mb-6 max-w-lg">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab === 'devices' ? 'phones, laptops, and brands' : 'cases, adapters, straps, and shields'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-[#f8fafc] border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-sans text-xs focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue/30 transition-all shadow-sm"
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 text-slate-400" />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-800 transition-colors text-[10px] font-mono tracking-wider font-bold uppercase cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-[#00f0ff] font-bold">
              Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </div>
          )}
        </div>

        {/* Dynamic Category/Brand Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 custom-scrollbar scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4.5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border cursor-pointer whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-white border-white text-cyber-dark font-black'
                  : 'bg-white/5 border-white/5 text-white/50 hover:text-white hover:border-white/15'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry-Style Item Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 mb-8">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <h3 className="font-display text-base font-bold text-slate-700 mb-1.5">No products found</h3>
            <p className="font-sans text-xs text-slate-400 max-w-xs mx-auto">
              We couldn't find matches for "{searchQuery}" under this category. Please try adjusting your search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-black/5 hover:bg-black/10 border border-slate-200 text-slate-700 text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => {
            const hasDiscount = item.originalPrice && item.originalPrice > item.price;
            const isDevice = 'specs' in item && 'features' in item;

            return (
              <TiltCard
                key={item.id}
                maxTilt={8}
                className="group flex flex-col justify-between"
              >
                {/* Product Thumbnail Section */}
                <div className="relative aspect-square overflow-hidden bg-cyber-dark flex items-center justify-center p-4">
                  {/* Glowing background gradient behind unboxing image */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyber-dark to-transparent z-10 pointer-events-none" />
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Top Badges (Luxury, Trending, etc) */}
                  {item.badge && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[9px] uppercase font-mono font-bold tracking-widest bg-cyber-cyan/15 border border-cyber-cyan/30 text-cyber-cyan glow-cyan">
                        <Sparkle className="w-3 h-3 text-current" />
                        <span>{item.badge}</span>
                      </span>
                    </div>
                  )}

                  {/* Overlays / Direct Quick View Trigger */}
                  <div className="absolute inset-0 bg-cyber-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center space-x-3">
                    <button 
                      onClick={() => setSelectedProduct(item as any)}
                      className="p-3 rounded-full bg-cyber-cyan text-cyber-dark glow-cyan cursor-pointer transform scale-90 group-hover:scale-100 transition-transform duration-300"
                    >
                      <Eye className="w-5 h-5 text-current" />
                    </button>
                    <button 
                      onClick={() => setActiveNotification(`Pre-order routing initialized for: ${item.name}. Secure terminal payment lock established.`)}
                      className="p-3 rounded-full bg-white text-cyber-dark hover:bg-cyber-cyan hover:text-cyber-dark hover:glow-cyan cursor-pointer transform scale-90 group-hover:scale-100 transition-transform duration-300"
                    >
                      <ShoppingCart className="w-5 h-5 text-current" />
                    </button>
                  </div>
                </div>

                {/* Info and Specs list */}
                <div className="p-6 flex-1 flex flex-col justify-between relative z-20">
                  <div>
                    {/* Creator rating panel */}
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-3.5 h-3.5 fill-current text-yellow-500 text-yellow-500" />
                      <span className="font-mono text-[10px] text-white/50">{item.rating} (Verified client core)</span>
                    </div>

                    <h3 className="font-display font-extrabold text-lg text-white leading-tight uppercase group-hover:text-cyber-cyan transition-colors duration-200">
                      {item.name}
                    </h3>
                    
                    {/* Quick Specs bullets */}
                    <div className="mt-3 space-y-1.5">
                      {item.specs.slice(0, 2).map((spec: string, sIdx: number) => (
                        <div key={sIdx} className="flex items-start space-x-1.5 font-mono text-[9px] text-white/50 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/40 mt-1 shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Costing values & CTAs */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="font-display text-xl font-black text-white text-glow-cyan">
                          ₦{item.price.toLocaleString()}
                        </span>
                        {hasDiscount && (
                          <span className="font-mono text-xs text-white/30 line-through">
                            ₦{item.originalPrice?.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-[8.5px] uppercase font-bold tracking-widest text-[#10b981]">
                        // OEM SEAL INTACT
                      </span>
                    </div>

                    <button 
                      onClick={() => setSelectedProduct(item as any)}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-cyan/50 hover:bg-cyber-cyan/10 hover:text-cyber-cyan text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Metrics
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
        )}

        {/* Fully Interactive Product SPECIFICATION MODAL Overlay */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-dark/85 backdrop-blur-md animate-fade-in">
            <div className="relative max-w-2xl w-full glass-panel border border-white/10 bg-cyber-gray/95 rounded-3xl p-6 sm:p-10 overflow-hidden shadow-2xl">
              {/* Scanline pattern */}
              <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 hover:text-cyber-cyan border border-white/10 text-white/60 flex items-center justify-center transition-all cursor-pointer z-20 font-display font-extrabold"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                {/* Modal Left column: Product shot */}
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/5 origin-center">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-cyber-green font-mono text-[9px] uppercase tracking-widest font-black">
                      INSTANT DISPATCH
                    </span>
                  </div>
                </div>

                {/* Modal Right column: Details and Specification lists */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* Brand or category info */}
                    <span className="font-mono text-[9px] uppercase text-cyber-cyan tracking-widest font-bold">
                      {'brand' in selectedProduct ? selectedProduct.brand : selectedProduct.category} Catalog Node
                    </span>
                    
                    <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mt-1.5 leading-none">
                      {selectedProduct.name}
                    </h3>

                    {/* Pricing with and without discounts */}
                    <div className="flex items-center space-x-2 mt-4.5">
                      <span className="font-display text-2xl font-black text-white text-glow-cyan">
                        ₦{selectedProduct.price.toLocaleString()}
                      </span>
                      {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="font-mono text-sm text-white/30 line-through">
                          ₦{selectedProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="border-t border-white/5 my-5" />

                    {/* Comprehensive specifications metadata list */}
                    <p className="font-mono text-[9px] uppercase font-bold text-white/40 mb-3 tracking-wider">// DETAILED SPECIFICATIONS MATRIX</p>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-narrow">
                      {selectedProduct.specs.map((spec, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-white/70">
                          <Check className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Extra features for devices */}
                    {'features' in selectedProduct && (
                      <div className="mt-4">
                        <p className="font-mono text-[9px] uppercase font-bold text-white/40 mb-2 tracking-wider">// EXTRAS</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(selectedProduct as Device).features.map((feature, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded bg-white/5 text-[9px] uppercase font-mono text-white/60">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="mt-8 pt-5 border-t border-white/5 flex gap-3">
                    <button
                      onClick={() => {
                        const whatsappNum = '2348082622765';
                        const message = `Hello Olit Concept! I would like to pre-order / purchase this item:\n\n` +
                          `🛍️ Product: ${selectedProduct.name}\n` +
                          `💰 Price: ₦${selectedProduct.price.toLocaleString()}\n` +
                          `⚙️ Specification Highlights:\n${selectedProduct.specs.slice(0, 3).map(s => `- ${s}`).join('\n')}`;
                        const encodedText = encodeURIComponent(message);
                        window.open(`https://wa.me/${whatsappNum}?text=${encodedText}`, '_blank');
                        setActiveNotification(`Connecting checkout with WhatsApp...`);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-dark font-display font-black text-xs uppercase tracking-wider text-center flex items-center justify-center space-x-1 cursor-pointer hover:brightness-110 shadow-2xl glow-blue active:scale-95 transition-all"
                    >
                      <ShoppingCart className="w-4.5 h-4.5 text-current mr-1" />
                      <span>Confirm Pre-Order</span>
                    </button>
                    <button
                      onClick={() => {
                        const whatsappNum = '2348082622765';
                        const message = `Hello Olit Concept! I have a general inquiry about: ${selectedProduct.name}. Could you advise on delivery timeframes and options?`;
                        const encodedText = encodeURIComponent(message);
                        window.open(`https://wa.me/${whatsappNum}?text=${encodedText}`, '_blank');
                        setActiveNotification(`Routing chat setup with WhatsApp...`);
                      }}
                      className="px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Chat Expert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Interactive Holographic Toast Overlay */}
        {activeNotification && (
          <div className="fixed bottom-6 right-6 z-50 animate-fade-in pointer-events-auto">
            <div className="bg-[#0e0e15] border-2 border-cyber-cyan text-white p-5 rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.25)] max-w-sm flex items-start space-x-3.5 backdrop-blur-xl">
              <div className="p-2.5 bg-cyber-cyan/15 rounded-xl border border-cyber-cyan text-cyber-cyan shrink-0">
                <Sparkle className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[9px] uppercase font-bold text-cyber-cyan tracking-widest">// SECURED PROTOCOL NOTICE</p>
                <p className="font-sans text-xs text-white/90 mt-1 leading-relaxed font-semibold">{activeNotification}</p>
                <div className="mt-3 flex justify-end">
                  <button 
                    type="button"
                    onClick={() => setActiveNotification(null)}
                    className="px-3 py-1 rounded bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/30 text-cyber-cyan font-mono text-[8.5px] uppercase font-bold tracking-wider transition-all active:scale-95 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
