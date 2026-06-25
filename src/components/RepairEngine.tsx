import React, { useState, useMemo } from 'react';
import { 
  BRANDS, 
  MODELS, 
  REPAIR_ISSUES, 
  RepairIssue 
} from '../types';
import { TiltCard } from './TiltCard';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  Laptop, 
  Smartphone, 
  Apple, 
  Sparkle, 
  Truck, 
  Search, 
  Calendar, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export function RepairEngine() {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  
  // Custom collection booking fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [notes, setNotes] = useState('');
  
  // Completed Order Ticket ID
  const [ticketId, setTicketId] = useState('');
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  // Brand brand-logo mappings or styled text
  const brandIcons: Record<string, React.ReactNode> = {
    Apple: <Apple className="w-10 h-10 group-hover:text-cyber-cyan" />,
    Samsung: <span className="text-xl font-bold tracking-widest font-display text-glow group-hover:text-cyber-cyan">SAMSG</span>,
    Google: <span className="text-3xl font-extrabold font-display group-hover:text-cyber-cyan">G</span>,
    OnePlus: <span className="text-xl font-display font-black group-hover:text-cyber-cyan">1+</span>,
    Xiaomi: <span className="text-2xl font-sans font-extrabold group-hover:text-cyber-cyan">mi</span>
  };

  const selectedIssue = useMemo(() => {
    return REPAIR_ISSUES.find(issue => issue.id === selectedIssueId);
  }, [selectedIssueId]);

  // Model matching list filtered by brand and searchQuery
  const availableModels = useMemo(() => {
    if (!selectedBrand) return [];
    const list = MODELS[selectedBrand] || [];
    if (!searchQuery.trim()) return list;
    return list.filter(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [selectedBrand, searchQuery]);

  // Pricing calculations
  const quoteDetails = useMemo(() => {
    if (!selectedIssue) return { partsCost: 0, labor: 0, total: 0 };
    
    // Add realistic model-based weight modifiers (high-end phones cost slightly more to repair due to OLED prices)
    let multiplier = 1.0;
    if (selectedModel.toLowerCase().includes('pro max') || selectedModel.toLowerCase().includes('ultra') || selectedModel.toLowerCase().includes('fold')) {
      multiplier = 1.45;
    } else if (selectedModel.toLowerCase().includes('pro') || selectedModel.toLowerCase().includes('+')) {
      multiplier = 1.25;
    }

    const partsCost = Math.round(selectedIssue.baseCost * multiplier * 0.65);
    const labor = Math.round(selectedIssue.baseCost * multiplier * 0.35);
    const total = partsCost + labor;

    return { partsCost, labor, total };
  }, [selectedIssue, selectedModel]);

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleBookCollection = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate organic cyber-tech order ticket id (e.g. OLIT-5917X)
    const randomID = Math.floor(1000 + Math.random() * 9000);
    const ticket = `OLIT-26${randomID}X`;
    
    // Save order data to mock persistence layer / localStorage if desired
    const savedTickets = JSON.parse(localStorage.getItem('olit_tickets') || '[]');
    savedTickets.push({
      ticketId: ticket,
      brand: selectedBrand,
      model: selectedModel,
      issue: selectedIssue?.name,
      cost: quoteDetails.total,
      fullName,
      email,
      phone,
      address,
      pickupDate,
      status: 'AWAITING_PICKUP',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('olit_tickets', JSON.stringify(savedTickets));

    // Construct WhatsApp order message details
    const message = `Hello Olit Concept! I have registered a smartphone repair request:\n\n` +
      `🎫 Ticket ID: ${ticket}\n` +
      `👤 Client Name: ${fullName}\n` +
      `📞 Phone: ${phone}\n` +
      `✉️ Email: ${email}\n` +
      `📱 Hardware: ${selectedBrand} ${selectedModel}\n` +
      `🔩 Fault: ${selectedIssue?.name}\n` +
      `💰 Est. Total: ₦${quoteDetails.total.toLocaleString()}\n` +
      `📅 Pickup Date: ${pickupDate}\n` +
      `📍 Address: ${address}\n` +
      `📝 Instructions: ${notes || 'None'}`;
    
    const encodedText = encodeURIComponent(message);
    const whatsappNum = '2348130060812'; // Authentic Olit Concept business contact number
    const url = `https://wa.me/${whatsappNum}?text=${encodedText}`;
    
    setWhatsAppUrl(url);
    setTicketId(ticket);
    setStep(5);

    // Dynamic auto open trigger
    window.open(url, '_blank');
  };

  const handleReset = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedIssueId('');
    setSearchQuery('');
    setFullName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setPickupDate('');
    setNotes('');
    setTicketId('');
    setStep(1);
  };

  return (
    <div id="repair-engine" className="w-full relative py-12 md:py-20 bg-cyber-dark/40 overflow-hidden">
      
      {/* Structural ambient light spots */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-cyber-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-cyber-green/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan font-mono text-[10px] uppercase tracking-widest mb-4">
            <Wrench className="w-3.5 h-3.5 animate-pulse" />
            <span>OLIT FLUID DIAGNOSTIC ENGINE v2.1</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-green">Repair Engine</span>
          </h2>
          <p className="font-sans text-white/60 text-sm sm:text-base mt-4">
            Match your model, isolate issues, secure instant estimations based on OEM certified parts formulas, and request dynamic luxury collection dispatch instantly.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="max-w-4xl mx-auto mb-10 px-2.5">
          <div className="relative flex justify-between items-center">
            {/* Dark background line */}
            <div className="absolute h-0.5 bg-white/5 left-4 right-4 top-1/2 -translate-y-1/2 z-0" />
            
            {/* Progress filling line */}
            <div 
              className="absolute h-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-green left-4 transition-all duration-500 z-0 ease-out"
              style={{ width: `${((step - 1) / 4) * 94}%` }}
            />

            {[
              { num: 1, label: 'Brand Selection' },
              { num: 2, label: 'Model' },
              { num: 3, label: 'Diagnostics' },
              { num: 4, label: 'Instant Quote' },
              { num: 5, label: 'Completion' }
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  disabled={s.num > step && !ticketId}
                  onClick={() => s.num < step && setStep(s.num)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display font-bold text-xs sm:text-sm border transition-all duration-300 ${
                    step === s.num
                      ? 'bg-cyber-cyan text-cyber-dark border-cyber-cyan glow-cyan scale-110'
                      : step > s.num
                      ? 'bg-cyber-green text-white border-cyber-green'
                      : 'bg-cyber-gray border-white/10 text-white/40'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4 sm:w-5 h-5" /> : s.num}
                </button>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-white/50 mt-2.5 hidden md:block">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Control Console (Card container) */}
        <div className="max-w-4xl mx-auto glass-panel border border-white/5 bg-cyber-gray/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />

          {/* Core Multi-Step Visualizer */}
          <div className="flex-1 flex flex-col justify-center">
            
            {/* STEP 1: SELECT BRAND */}
            {step === 1 && (
              <div className="animate-fade-in">
                <p className="font-mono text-xs uppercase text-cyber-cyan font-bold tracking-wider mb-6 text-center">
                  DIAGNOSTIC PROCESSOR • PHASE 01: SELECT MANUFACTURER
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setSelectedModel('');
                        handleNextStep();
                      }}
                      className={`group p-6 rounded-2xl flex flex-col items-center justify-center h-32 border transition-all duration-300 backdrop-blur-md relative ${
                        selectedBrand === brand
                          ? 'bg-gradient-to-b from-cyber-cyan/20 to-transparent border-cyber-cyan text-white glow-cyan'
                          : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {brandIcons[brand] || <Smartphone className="w-8 h-8" />}
                      </div>
                      <span className="font-display font-bold text-xs uppercase tracking-widest">{brand}</span>
                      
                      {selectedBrand === brand && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-cyber-cyan flex items-center justify-center">
                          <Check className="w-3 h-3 text-cyber-dark font-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: SELECT MODEL */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <p className="font-mono text-xs uppercase text-cyber-cyan font-bold tracking-wider">
                    DIAGNOSTIC PROCESSOR • PHASE 02: HARDWARE SPECIFICATION
                  </p>
                  <button 
                    onClick={handlePrevStep}
                    className="flex items-center space-x-1 font-mono text-xs text-white/40 hover:text-white transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                </div>

                {/* Filter / Search Box */}
                <div className="relative mb-6 max-w-md mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder={`Search ${selectedBrand} models...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-cyber-dark/80 rounded-xl py-3 pl-11 pr-4 border border-white/5 focus:border-cyber-cyan/50 focus:outline-none text-sm transition-all font-sans"
                  />
                </div>

                {availableModels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                    {availableModels.map((model) => (
                      <button
                        key={model}
                        onClick={() => {
                          setSelectedModel(model);
                          handleNextStep();
                        }}
                        className={`p-4 rounded-xl text-left border flex justify-between items-center transition-all duration-200 uppercase font-mono text-[11px] font-bold tracking-wider ${
                          selectedModel === model
                            ? 'bg-cyber-cyan/10 border-cyber-cyan text-cyber-cyan'
                            : 'bg-white/5 border-white/5 hover:border-white/15 text-white/80 hover:text-white'
                        }`}
                      >
                        <span>{model}</span>
                        {selectedModel === model ? (
                          <CheckCircle className="w-4 h-4 text-cyber-cyan shrink-0 ml-2" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-white/20 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <HelpCircle className="w-12 h-12 text-white/20 mx-auto mb-2" />
                    <p className="font-mono text-xs text-white/40 uppercase">No custom models found matching query</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="mt-2 text-xs font-mono text-cyber-cyan border-b border-transparent hover:border-current"
                    >
                      Clear Search Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: ISOLATE DIAGNOSTIC ISSUE */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <p className="font-mono text-xs uppercase text-cyber-cyan font-bold tracking-wider">
                    DIAGNOSTIC PROCESSOR • PHASE 03: CLASSIFY MALFUNCTION
                  </p>
                  <button 
                    onClick={handlePrevStep}
                    className="flex items-center space-x-1 font-mono text-xs text-white/40 hover:text-white transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {REPAIR_ISSUES.map((issue) => (
                    <button
                      key={issue.id}
                      onClick={() => {
                        setSelectedIssueId(issue.id);
                        handleNextStep();
                      }}
                      className={`p-4 rounded-xl border text-left flex items-start justify-between transition-all duration-300 relative ${
                        selectedIssueId === issue.id
                          ? 'bg-cyber-cyan/10 border-cyber-cyan glow-cyan'
                          : 'bg-white/5 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-start space-x-3.5">
                        <div className={`p-2.5 rounded-lg border ${
                          selectedIssueId === issue.id ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan' : 'bg-white/5 border-white/10 text-white/60'
                        }`}>
                          <Sparkle className="w-4.5 h-4.5 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-display font-extrabold text-sm text-white">{issue.name}</h4>
                          <p className="font-sans text-[11px] text-white/60 mt-1">{issue.description}</p>
                          <div className="flex items-center space-x-3 mt-2.5 font-mono text-[9px] uppercase font-bold text-white/40">
                            <span className="flex items-center text-cyber-cyan">
                              <Clock className="w-3 h-3 text-current mr-1" />
                              {issue.estimatedTime}
                            </span>
                            <span className="flex items-center text-cyber-green">
                              <ShieldCheck className="w-3 h-3 text-current mr-1" />
                              90-DAY WARRANTY
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4 shrink-0 mt-0.5">
                        <div className="font-display text-base font-extrabold text-white text-glow">
                          ₦{issue.baseCost.toLocaleString()}
                        </div>
                        <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-bold">Base Est.</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: QUOTE BREAKDOWN & BOOKING REQUEST */}
            {step === 4 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <p className="font-mono text-xs uppercase text-cyber-cyan font-bold tracking-wider">
                    DIAGNOSTIC PROCESSOR • PHASE 04: PRISTINE COST MATRIX
                  </p>
                  <button 
                    onClick={handlePrevStep}
                    className="flex items-center space-x-1 font-mono text-xs text-white/40 hover:text-white transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  
                  {/* Left Column: Cost Summary */}
                  <div className="md:col-span-3 space-y-4">
                    <div className="glass-panel p-5 rounded-2xl border-white/5">
                      <div className="font-mono text-[9px] uppercase text-cyber-cyan tracking-widest mb-3.5">
                        Target Hardware Diagnostic
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-display text-lg font-black text-white uppercase tracking-tight">
                            {selectedBrand} {selectedModel}
                          </div>
                          <div className="font-sans text-xs text-[#10b981] font-bold mt-1">
                            {selectedIssue?.name}
                          </div>
                        </div>
                        <div className="px-2.5 py-1 rounded bg-[#10b981]/15 text-[#10b981] font-mono text-[9px] font-bold tracking-widest uppercase">
                          ACTIVE
                        </div>
                      </div>
                    </div>

                    {/* Numerical breakdown */}
                    <div className="space-y-2.5 text-xs font-sans px-1">
                      <div className="flex justify-between text-white/60">
                        <span>Genuine OEM Certified Parts Cost</span>
                        <span className="font-mono text-white">₦{quoteDetails.partsCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Expert Tech Microsoldering & Labor</span>
                        <span className="font-mono text-white">₦{quoteDetails.labor.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Secure Premium Lockbox Pickup & Delivery</span>
                        <span className="font-mono text-[#00f0ff] uppercase font-bold text-[10px]">Free Courier</span>
                      </div>
                      <div className="border-t border-white/5 my-2.5" />
                      <div className="flex justify-between text-sm py-1 font-bold">
                        <span className="text-white/80">Guaranteed Valuation Total</span>
                        <span className="font-display text-lg font-extrabold text-[#00f0ff] text-glow-cyan">
                          ₦{quoteDetails.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Trust Seals */}
                    <div className="grid grid-cols-3 gap-2 mt-4 font-mono text-[8px] uppercase font-bold text-white/50 text-center">
                      <div className="p-2 py-3 rounded bg-white/5 border border-white/5">
                        <ShieldCheck className="w-4 h-4 mx-auto text-cyber-cyan mb-1" />
                        90-Day Parts Warranty
                      </div>
                      <div className="p-2 py-3 rounded bg-white/5 border border-white/5">
                        <Clock className="w-4 h-4 mx-auto text-cyber-green mb-1" />
                        {selectedIssue?.estimatedTime} Repair
                      </div>
                      <div className="p-2 py-3 rounded bg-white/5 border border-white/5">
                        <Truck className="w-4 h-4 mx-auto text-cyber-blue mb-1" />
                        Same-Day Pickup
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dispatch request form */}
                  <form onSubmit={handleBookCollection} className="md:col-span-2 space-y-3.5">
                    <p className="font-mono text-[9px] uppercase text-[#10b981] font-bold tracking-widest">
                      // SECURE BOOKING REGISTRY
                    </p>
                    
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-cyber-dark/80 rounded-xl py-2 px-3 text-xs border border-white/5 focus:border-cyber-cyan/50 focus:outline-none text-white transition-all"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-cyber-dark/80 rounded-xl py-2 px-3 text-xs border border-white/5 focus:border-cyber-cyan/50 focus:outline-none text-white transition-all"
                      />
                      <input
                        required
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-cyber-dark/80 rounded-xl py-2 px-3 text-xs border border-white/5 focus:border-cyber-cyan/50 focus:outline-none text-white transition-all text-white"
                      />
                    </div>

                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-cyber-dark/80 rounded-xl py-2 px-3 text-xs border border-white/5 focus:border-cyber-cyan/50 focus:outline-none text-white transition-all"
                    />

                    <input
                      required
                      type="text"
                      placeholder="Pickup Address (Home / Office)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-cyber-dark/80 rounded-xl py-2 px-3 text-xs border border-white/5 focus:border-cyber-cyan/50 focus:outline-none text-white transition-all"
                    />

                    <textarea
                      placeholder="Special Instructions (e.g. gate code, specific pickup details...)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-cyber-dark/80 rounded-xl py-2 px-3 text-xs border border-white/5 focus:border-cyber-cyan/50 focus:outline-none text-white transition-all h-14 resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full mt-2.5 py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-green text-cyber-dark font-display font-black text-xs uppercase tracking-wider glow-cyan hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <Truck className="w-4 h-4 text-cyber-dark mr-1" />
                      <span>Confirm Collection Courier</span>
                    </button>
                  </form>

                </div>
              </div>
            )}

            {/* STEP 5: COMPLETED CONSOLE DISPLAY */}
            {step === 5 && (
              <div className="animate-fade-in text-center py-6">
                <div className="w-16 h-16 rounded-full bg-cyber-green/10 border-2 border-cyber-green flex items-center justify-center mx-auto mb-6 glow-green">
                  <Check className="w-8 h-8 text-cyber-green" />
                </div>
                
                <p className="font-mono text-xs uppercase text-cyber-green font-bold tracking-wider mb-2">
                  DISPATCH PROTOCOL SUCCESSFUL
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                  Repair Order Locked In!
                </h3>
                
                <div className="max-w-md mx-auto my-6 p-5 glass-panel rounded-2xl border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
                  
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1.5">
                    Holographic Tracking Ticket
                  </div>
                  <div className="font-display font-black text-2xl tracking-widest text-cyber-cyan text-glow-cyan mb-3">
                    {ticketId}
                  </div>
                  
                  <div className="border-t border-white/5 my-3.5" />
                  
                  <div className="text-left text-xs space-y-2 font-mono">
                    <div className="flex justify-between text-white/50">
                      <span>CLIENT</span>
                      <span className="text-white font-bold">{fullName}</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>HARDWARE</span>
                      <span className="text-white uppercase font-bold">{selectedBrand} {selectedModel}</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>PROCEDURE</span>
                      <span className="text-white uppercase font-bold">{selectedIssue?.name}</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>PICKUP DATE</span>
                      <span className="text-white font-bold">{pickupDate}</span>
                    </div>
                    <div className="flex justify-between text-white/50">
                      <span>VALUATION Est.</span>
                      <span className="text-cyber-green font-bold">₦{quoteDetails.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/60 max-w-lg mx-auto">
                  A high-priority dispatch courier has been queued to pick up your secure lockbox. Our master techs will restore your device to OEM factory specifications within minutes of arrival!
                </p>

                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-lg mx-auto">
                  {whatsAppUrl && (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-lg hover:scale-[1.02]"
                    >
                      <span className="font-bold text-white font-sans">Send to WhatsApp</span>
                    </a>
                  )}
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyber-cyan text-cyber-dark font-display font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                  >
                    Diagnose Another Device
                  </button>
                  <a
                    href="#track-status"
                    onClick={(e) => {
                      e.preventDefault();
                      setStep(4); // Or keep order showing
                      setActiveNotification(`Tracking ${ticketId}. Currently: Queued for Pickup Courier Dispatch.`);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs uppercase hover:bg-white/10 transition-all text-center"
                  >
                    Track Live Flow
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Quick Stats bottom banner (Shown on steps 1-3) */}
          {step <= 3 && (
            <div className="border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[9px] uppercase font-bold text-white/40 tracking-wider space-y-3 sm:space-y-0 text-center sm:text-left">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
                <span>Diagnostics secure connection protocol online</span>
              </div>
              <div className="flex space-x-6">
                <span>Warranty: 90 Days</span>
                <span>Speed: Express Same-Day</span>
                <span>Courier: Direct Hand-Off</span>
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
    </div>
  );
}
