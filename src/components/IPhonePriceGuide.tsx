import React, { useState, useMemo } from 'react';
import { Search, Smartphone, Send, HelpCircle, Truck, HelpCircle as AlertIcon, RefreshCw, BadgePercent } from 'lucide-react';

interface IPhoneItem {
  id: string;
  name: string;
  storage: string;
  price: string;
  simType: string;
  condition: string; // 'UK Used' or 'Brand New'
  series: 'XR/11' | '12' | '13' | '14/15/16';
  notes?: string;
}

export function IPhonePriceGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSeriesTab, setActiveSeriesTab] = useState<'All' | 'XR/11' | '12' | '13' | '14/15/16'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const priceGuideData: IPhoneItem[] = [
    // iPhone XR Series
    { id: 'xr-64', name: 'iPhone XR', storage: '64GB', price: '225,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },
    { id: 'xr-128', name: 'iPhone XR', storage: '128GB', price: '255,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },
    { id: 'xr-256', name: 'iPhone XR', storage: '256GB', price: '275,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },

    // iPhone 11 Series
    { id: 'i11-64', name: 'iPhone 11', storage: '64GB', price: '265,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },
    { id: 'i11-128', name: 'iPhone 11', storage: '128GB', price: '300,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },
    { id: 'i11-256', name: 'iPhone 11', storage: '256GB', price: '330,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },
    { id: 'i11p-64', name: 'iPhone 11 Pro', storage: '64GB', price: '305,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },
    { id: 'i11p-256', name: 'iPhone 11 Pro', storage: '256GB', price: '375,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },
    { id: 'i11pm-64', name: 'iPhone 11 Pro Max', storage: '64GB', price: '345,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },
    { id: 'i11pm-256', name: 'iPhone 11 Pro Max', storage: '256GB', price: '425,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: 'XR/11' },

    // iPhone 12 Series
    { id: 'i12-64', name: 'iPhone 12', storage: '64GB', price: '300,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '12' },
    { id: 'i12-128', name: 'iPhone 12', storage: '128GB', price: '340,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '12' },
    { id: 'i12p-128', name: 'iPhone 12 Pro', storage: '128GB', price: '415,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '12' },
    { id: 'i12p-256', name: 'iPhone 12 Pro', storage: '256GB', price: '460,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '12' },
    { id: 'i12pm-128', name: 'iPhone 12 Pro Max', storage: '128GB', price: '505,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '12' },
    { id: 'i12pm-256', name: 'iPhone 12 Pro Max', storage: '256GB', price: '555,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '12' },

    // iPhone 13 Series
    { id: 'i13-128', name: 'iPhone 13', storage: '128GB', price: '450,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '13' },
    { id: 'i13-256', name: 'iPhone 13', storage: '256GB', price: '495,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '13' },
    { id: 'i13p-128', name: 'iPhone 13 Pro', storage: '128GB', price: '530,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '13' },
    { id: 'i13p-256', name: 'iPhone 13 Pro', storage: '256GB', price: '580,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '13' },

    // iPhone 14, 15, 16 Premium Series
    { id: 'i16-phy-esim', name: 'iPhone 16', storage: '128GB', price: '910,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '14/15/16' },
    { id: 'i16-128-phy', name: 'iPhone 16', storage: '128GB', price: '790,000', simType: 'Physical SIM Only', condition: 'UK Used 🇬🇧', series: '14/15/16' },
    { id: 'i16-plus-phy', name: 'iPhone 16 Plus', storage: '128GB', price: '840,000', simType: 'Physical SIM Only', condition: 'UK Used 🇬🇧', series: '14/15/16' },
    { id: 'i15-ord-128-ca', name: 'iPhone 15 Standard', storage: '128GB', price: '755,000', simType: 'Physical SIM + eSIM 🇨🇦', condition: 'UK Used', series: '14/15/16' },
    { id: 'i14-pm-esim-ca', name: 'iPhone 14 Pro Max', storage: '128GB', price: '880,000', simType: 'Physical SIM + eSIM 🇨🇦 (Not LLA)', condition: 'UK Used', series: '14/15/16' },
    { id: 'i14-pm-512-gb', name: 'iPhone 14 Pro Max', storage: '512GB', price: '930,000', simType: 'Physical SIM + eSIM 🇬🇧', condition: 'UK Used', series: '14/15/16' },
    { id: 'i14-p-128', name: 'iPhone 14 Pro', storage: '128GB', price: '750,000', simType: 'Physical SIM + eSIM', condition: 'UK Used 🇬🇧', series: '14/15/16' },
    { id: 'i14-128-esim', name: 'iPhone 14', storage: '128GB', price: '555,000', simType: 'eSIM Only', condition: 'UK Used', series: '14/15/16' },
    { id: 'i14-256-esim-gb', name: 'iPhone 14', storage: '256GB', price: '595,000', simType: 'eSIM Only 🇬🇧', condition: 'UK Used', series: '14/15/16' },
    { id: 'i14-p-esim-us', name: 'iPhone 14 Pro', storage: '128GB', price: '640,000', simType: 'eSIM Only 🇺🇸', condition: 'UK Used', series: '14/15/16' }
  ];

  const handleOrderWhatsApp = (item: IPhoneItem) => {
    const whatsappNum = '2348082622765';
    const messageText = `Hello Olit Concept! I would like to inquire about / buy this iPhone from your Price Guide:\n\n` +
      `📱 Model: ${item.name}\n` +
      `💾 Storage: ${item.storage}\n` +
      `🔌 SIM Type: ${item.simType}\n` +
      `📊 Condition: ${item.condition}\n` +
      `💰 Guide Price: ₦${item.price}\n\n` +
      `Please let me know if this is currently available in stock. Thank you!`;
    
    const encodedMessage = encodeURIComponent(messageText);
    const url = `https://wa.me/${whatsappNum}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const filteredGuide = useMemo(() => {
    return priceGuideData.filter((item) => {
      // Series filter
      if (activeSeriesTab !== 'All' && item.series !== activeSeriesTab) {
        return false;
      }
      
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesStorage = item.storage.toLowerCase().includes(query);
        const matchesSim = item.simType.toLowerCase().includes(query);
        const matchesPrice = item.price.includes(query);
        return matchesName || matchesStorage || matchesSim || matchesPrice;
      }

      return true;
    });
  }, [searchQuery, activeSeriesTab]);

  return (
    <div id="price-guide" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-100">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 mb-4 shadow-sm">
          <BadgePercent className="w-4 h-4 text-cyber-blue" />
          <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-slate-600">
            Official Olit Smartphone Quotation
          </span>
        </div>
        
        <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-800 tracking-tight uppercase">
          iPhone Price Guide
        </h2>
        <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">
          // Interactive Market Catalog: XR to 16 Pro Series
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Quick Information Badges */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Important Fluctuation Notice */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/10 rounded-full filter blur-xl pointer-events-none" />
            <div className="flex items-start space-x-3">
              <AlertIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Market Volatility Notice
                </h4>
                <p className="font-sans text-xs text-amber-700/90 leading-relaxed mt-2">
                  Prices are market estimates. Prices change dynamically with dollar exchange rates and available local stock. Values may fluctuate by <span className="font-bold">±₦10,000</span>. Please double-check while confirming your order!
                </p>
              </div>
            </div>
          </div>

          {/* Core Trust & Delivery Banner */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-cyan/5 rounded-full filter blur-xl pointer-events-none" />
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-cyber-blue/10 text-cyber-blue">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Nationwide Delivery
                  </h4>
                  <p className="font-sans text-[11px] text-slate-500">
                    Free secure packaging based on your orders
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-slate-200/50">
                <span className="text-base">💯</span>
                <div>
                  <h4 className="font-display text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Premium Quality UK Used
                  </h4>
                  <p className="font-sans text-[11px] text-slate-500">
                    Strict diagnostic & hardware testing on all inventory
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Box */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full filter blur-2xl pointer-events-none" />
            <h4 className="font-display text-xs font-black uppercase tracking-wider text-emerald-400 mb-2">
              Have customized specifications?
            </h4>
            <p className="font-sans text-xs text-slate-300 leading-relaxed mb-4">
              Reach out to our sales agents directly to ask about color choices, physical device snapshots, or custom orders!
            </p>
            <a
              href="https://wa.me/2348082622765?text=Hello%20Olit%20Concept!%20I%20have%20a%20special%20smartphone%20order%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact Sales Agent</span>
            </a>
          </div>

        </div>

        {/* Right Side: Search, Filter Tabs, and Grid List */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Search Bar + Filters Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder="Search guide (e.g. 11 Pro, eSIM)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-sans text-xs focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue/20 transition-all shadow-sm"
              />
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-3.5 h-3.5 text-slate-400" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-800 text-[9px] font-mono font-bold uppercase cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Series Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1.5 md:pb-0 scrollbar-none">
              {(['All', 'XR/11', '12', '13', '14/15/16'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSeriesTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                    activeSeriesTab === tab
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  {tab === 'All' ? 'Show All' : tab + ' Series'}
                </button>
              ))}
            </div>

          </div>

          {/* Results Metadata */}
          <div className="flex items-center justify-between px-1.5">
            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">
              Showing {filteredGuide.length} matching iPhone models
            </span>
            <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-widest font-black">
              Sim type tags available
            </span>
          </div>

          {/* Dynamic Grid List */}
          {filteredGuide.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <Smartphone className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h3 className="font-display text-sm font-bold text-slate-600 mb-1">No iPhones matched your search</h3>
              <p className="font-sans text-xs text-slate-400 max-w-xs mx-auto mb-4">
                We couldn't find a price model in our guide matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveSeriesTab('All');
                }}
                className="px-4 py-2 rounded-lg bg-slate-800 text-white text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer hover:bg-slate-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGuide.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/70 hover:border-cyber-blue/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Condition Badges & Name */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        {item.condition}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[8px] uppercase font-bold">
                        {item.storage}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                        <Smartphone className="w-4 h-4 text-slate-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-sm uppercase tracking-tight text-slate-800">
                          {item.name}
                        </h3>
                        <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">
                          {item.simType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Price & Action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="block font-mono text-[8px] uppercase font-extrabold text-slate-400 tracking-wider">
                        Estimated Quote
                      </span>
                      <span className="font-display text-base font-black text-slate-800">
                        ₦{item.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOrderWhatsApp(item)}
                      className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-display text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
