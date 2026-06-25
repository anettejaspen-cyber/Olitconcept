import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Check, 
  ShoppingCart, 
  X, 
  Tag, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Smartphone,
  Cpu,
  Headphones,
  Layers,
  Phone,
  Search,
  ChevronDown,
  Zap,
  SlidersHorizontal,
  AlertCircle
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  label: string;
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'iPhone 7 Plus (32GB)',
    price: 70000,
    image: 'https://i.postimg.cc/prXG64bp/IMG-20260624-WA0010.jpg',
    label: '📱 iPhone',
    category: 'iPhone'
  },
  {
    id: 2,
    name: 'JBL Pure Bass',
    price: 14000,
    image: 'https://i.postimg.cc/KjvqHwS1/IMG-20260624-WA0011.jpg',
    label: '🎧 Audio',
    category: 'Accessories'
  },
  {
    id: 3,
    name: 'JBL Headset',
    price: 15000,
    image: 'https://i.postimg.cc/Gt77wKdc/IMG-20260624-WA0012.jpg',
    label: '🎧 Audio',
    category: 'Accessories'
  },
  {
    id: 4,
    name: '17 Pro Max Chip (Physical Only)',
    price: 1700000,
    image: 'https://i.postimg.cc/brCCcgpy/IMG-20260624-WA0013.jpg',
    label: '🛠️ Chip / Spare Parts',
    category: 'Spare Parts'
  },
  {
    id: 5,
    name: 'iPhone 11 (64GB) Direct BH',
    price: 250000,
    image: 'https://i.postimg.cc/Y0nnKRM0/IMG-20260624-WA0015.jpg',
    label: '🔥 Direct BH',
    category: 'iPhone'
  },
  {
    id: 6,
    name: 'iPhone 11 (128GB) Direct BH',
    price: 290000,
    image: 'https://i.postimg.cc/Y0nnKRM0/IMG-20260624-WA0015.jpg',
    label: '🔥 Direct BH',
    category: 'iPhone'
  },
  {
    id: 7,
    name: 'iPhone 11 (256GB) Direct BH',
    price: 315000,
    image: 'https://i.postimg.cc/Y0nnKRM0/IMG-20260624-WA0015.jpg',
    label: '🔥 Direct BH',
    category: 'iPhone'
  },
  {
    id: 8,
    name: 'Apple iPhone 11 (128GB)',
    price: 270000,
    image: 'https://i.postimg.cc/90885bCM/IMG-20260624-WA0016.jpg',
    label: '📱 iPhone',
    category: 'iPhone'
  },
  {
    id: 9,
    name: 'Samsung A05',
    price: 50000,
    image: 'https://i.postimg.cc/k47f2z5V/IMG-20260624-WA0017.jpg',
    label: '📱 Samsung',
    category: 'Samsung'
  },
  {
    id: 10,
    name: 'UK Used iPhone XR',
    price: 0,
    image: 'https://i.postimg.cc/FRhhCrT2/IMG-20260624-WA0023.jpg',
    label: '📱 UK Used',
    category: 'iPhone'
  },
  {
    id: 11,
    name: 'Original iPhone Charger',
    price: 8000,
    image: 'https://i.postimg.cc/zBqq2zx0/IMG-20260625-WA0000.jpg',
    label: '⚡ Charger',
    category: 'Accessories'
  },
  {
    id: 12,
    name: 'Bluetooth Earphones',
    price: 13000,
    image: 'https://i.postimg.cc/cHddkxFh/IMG-20260625-WA0001.jpg',
    label: '🎧 Audio',
    category: 'Accessories'
  },
  {
    id: 13,
    name: 'New Age Powerbank (33000mAh)',
    price: 26000,
    image: 'https://i.postimg.cc/zBqq2zxk/IMG-20260625-WA0002.jpg',
    label: '🔋 Power Bank',
    category: 'Accessories'
  },
  {
    id: 14,
    name: 'WUF MP Wireless',
    price: 16000,
    image: 'https://i.postimg.cc/ZRJJsbwj/IMG-20260625-WA0003.jpg',
    label: '🎵 Audio',
    category: 'Accessories'
  },
  {
    id: 15,
    name: 'JBL Harman Speaker',
    price: 14000,
    image: 'https://i.postimg.cc/9MkNR1wZ/IMG-20260625-WA0005.jpg',
    label: '🔊 Speaker',
    category: 'Accessories'
  },
  {
    id: 16,
    name: 'JBL Harman Tune 64D',
    price: 15000,
    image: 'https://i.postimg.cc/tTcmZDnh/IMG-20260625-WA0006.jpg',
    label: '🎧 Audio',
    category: 'Accessories'
  },
  {
    id: 17,
    name: 'JBL Harman Tune 760',
    price: 14000,
    image: 'https://i.postimg.cc/NMnP9b2R/IMG-20260625-WA0007.jpg',
    label: '🎧 Audio',
    category: 'Accessories'
  },
  {
    id: 18,
    name: 'No Face ID iPhone XS Max',
    price: 120000,
    image: 'https://i.postimg.cc/0jjRWkw3/IMG-20260624-WA0018.jpg',
    label: '📱 iPhone',
    category: 'iPhone'
  },
  {
    id: 19,
    name: 'Used Itel 2160',
    price: 7000,
    image: 'https://i.postimg.cc/C55TPhq9/IMG-20260624-WA0019.jpg',
    label: '📞 Feature Phone',
    category: 'Feature Phone'
  },
  {
    id: 20,
    name: 'Zealot S64 Speaker',
    price: 40000,
    image: 'https://i.postimg.cc/HnnDZYMC/IMG-20260624-WA0020.jpg',
    label: '🔊 Speaker',
    category: 'Accessories'
  }
];

export function OrderSection() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'details' | 'success'>('review');
  
  // Quick direct single-product checkout bypass modal
  const [directCheckoutProduct, setDirectCheckoutProduct] = useState<Product | null>(null);
  const [directQuantity, setDirectQuantity] = useState<number>(1);

  // Search, Category Filter, and Sorting
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Custom Toast Notification System State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    state: 'Lagos',
    deliveryMethod: 'Standard Delivery (2-3 Days)',
    paymentOption: 'Bank Transfer'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger Toast Notification Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
  };

  // Auto-dismiss Toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const formatPrice = (amount: number) => {
    if (amount === 0) return 'Price on Request';
    return '₦' + amount.toLocaleString();
  };

  const hasUnpricedInCart = () => {
    return Object.keys(cart).some(id => {
      const p = PRODUCTS.find(prod => prod.id === Number(id));
      return p && p.price === 0;
    });
  };

  const getCartTotalDisplay = (): string => {
    const total = getCartTotalPrice();
    const hasUnpriced = hasUnpricedInCart();
    if (total === 0) return 'Price on Request';
    if (hasUnpriced) return `₦${total.toLocaleString()} + Custom Quote`;
    return '₦' + total.toLocaleString();
  };

  const getCartTotalItems = (): number => {
    return Object.keys(cart).reduce((sum, id) => sum + (cart[Number(id)] || 0), 0);
  };

  const getCartTotalPrice = (): number => {
    return Object.entries(cart).reduce((sum: number, [id, qty]) => {
      const p = PRODUCTS.find(prod => prod.id === Number(id));
      const q = qty as number;
      return sum + (p ? p.price * q : 0);
    }, 0);
  };

  // Direct In-Grid Quantity Increments and Add to Cart
  const handleAddToCartDirectly = (productId: number) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = currentQty + 1;
      return { ...prev, [productId]: newQty };
    });
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) {
      showToast(`Added ${prod.name} to cart!`);
    }
  };

  const handleDecrementCartQuantity = (productId: number) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      if (currentQty <= 1) {
        const copy = { ...prev };
        delete copy[productId];
        const prod = PRODUCTS.find(p => p.id === productId);
        if (prod) {
          showToast(`Removed ${prod.name} from cart`, 'info');
        }
        return copy;
      }
      return { ...prev, [productId]: currentQty - 1 };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Send Compiled Order to WhatsApp
  const executeWhatsAppOrder = (itemsString: string, totalAmountString: string) => {
    const whatsappMessage = `🛍️ *NEW ORDER FROM OLIT CONCEPT*
----------------------------------
*ITEMS ORDERED:*
${itemsString}
*TOTAL AMOUNT:* ${totalAmountString}
----------------------------------
_Hello Olit Concept! I would like to place an order for the items listed above. Let's arrange delivery and payment!_

_Sent via Olit Concept Interactive Store_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/2348130060812?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build items description
    let itemsString = '';
    Object.entries(cart).forEach(([id, qty]) => {
      const p = PRODUCTS.find(prod => prod.id === Number(id));
      const q = qty as number;
      if (p) {
        itemsString += `• *${p.name}* x ${q} (${formatPrice(p.price * q)})\n`;
      }
    });

    const totalAmount = getCartTotalDisplay();

    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutStep('success');
      executeWhatsAppOrder(itemsString, totalAmount);
    }, 1500);
  };

  // Direct checkout bypass submission (single product)
  const handleDirectCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directCheckoutProduct) return;
    if (!formData.name || !formData.phone || !formData.address) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    setIsSubmitting(true);

    const singleItemPrice = directCheckoutProduct.price * directQuantity;
    const itemTotalDisplay = directCheckoutProduct.price === 0 
      ? 'Price on Request' 
      : `₦${singleItemPrice.toLocaleString()}`;

    const itemsString = `• *${directCheckoutProduct.name}* x ${directQuantity} (${formatPrice(singleItemPrice)})\n`;

    setTimeout(() => {
      setIsSubmitting(false);
      setDirectCheckoutProduct(null);
      showToast('Direct order sent to WhatsApp!', 'success');
      executeWhatsAppOrder(itemsString, itemTotalDisplay);
    }, 1500);
  };

  const handleResetOrder = () => {
    setCart({});
    setFormData({
      name: '',
      phone: '',
      address: '',
      state: 'Lagos',
      deliveryMethod: 'Standard Delivery (2-3 Days)',
      paymentOption: 'Bank Transfer'
    });
    setCheckoutStep('review');
    setIsCartOpen(false);
  };

  // Memoized filter and sort system to prevent layouth shifts
  const filterCategories = useMemo(() => [
    { id: 'All', name: 'All Products', icon: Layers, count: PRODUCTS.length },
    { id: 'Smartphones', name: 'Smartphones', icon: Smartphone, count: PRODUCTS.filter(p => p.category === 'iPhone' || p.category === 'Samsung').length },
    { id: 'Accessories', name: 'Accessories', icon: Headphones, count: PRODUCTS.filter(p => p.category === 'Accessories').length },
    { id: 'Spare Parts', name: 'Spare Parts', icon: Cpu, count: PRODUCTS.filter(p => p.category === 'Spare Parts').length },
    { id: 'Feature Phone', name: 'Feature Phones', icon: Phone, count: PRODUCTS.filter(p => p.category === 'Feature Phone').length }
  ], []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      // Category Filter
      const matchesCategory = selectedCategory === 'All' ||
        (selectedCategory === 'Smartphones' && (p.category === 'iPhone' || p.category === 'Samsung')) ||
        (p.category === selectedCategory);

      // Search Query Filter
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div id="order-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative font-sans">
      
      {/* Toast Notification HUD Overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl border border-cyber-cyan/20 backdrop-blur-md text-white bg-slate-900/95"
          >
            {toast.type === 'success' && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'info' && <Sparkles className="w-4 h-4 text-cyber-cyan shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
            <span className="text-xs font-mono font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-cyber-cyan/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyber-blue/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* HEADER HERO AREA */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold bg-cyber-cyan/10 text-cyber-cyan mb-4 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Showroom Hub
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-4">
          PREMIUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-green">GADGET SHOWCASE</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Browse our carefully vetted collection of high-spec smartphones, certified pristine used products, original audio components, and spare parts. Add items to your active cart and place your order instantly.
        </p>
      </div>

      {/* MAIN TWO-COLUMN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 relative z-10 items-start">
        
        {/* LEFT COLUMN: FILTERS AND PRODUCT LISTING GRID */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* FILTER, SEARCH, & SORT NAVIGATION DOCK */}
          <div className="bg-slate-50/85 dark:bg-slate-50/85 border border-slate-100 dark:border-slate-200/50 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex flex-col xl:flex-row xl:items-center gap-6 justify-between">
              
              {/* Categories Tab Pillboxes */}
              <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none -mx-2 px-2 xl:mx-0 xl:px-0 xl:flex-wrap">
                {filterCategories.map((cat) => {
                  const IconComponent = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-wider border transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-95 ${
                        isActive
                          ? 'bg-cyber-cyan border-cyber-cyan text-slate-900 shadow-lg shadow-cyber-cyan/25 font-bold'
                          : 'bg-white border-slate-100 dark:bg-white dark:border-slate-200/50 text-slate-500 dark:text-slate-600 hover:text-slate-800 dark:hover:text-slate-800'
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-slate-900' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span>{cat.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive 
                          ? 'bg-slate-900/15 text-slate-900' 
                          : 'bg-slate-50 dark:bg-slate-50 text-slate-400 dark:text-slate-500'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Utility Controls */}
              <div className="flex flex-col sm:flex-row gap-3 min-w-[300px] xl:max-w-md w-full">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search premium devices..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-200/60 bg-white dark:bg-white text-slate-900 dark:text-slate-900 text-xs outline-none transition-all focus:border-cyber-cyan placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-slate-900 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-100 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Price Sorting Select */}
                <div className="relative shrink-0 min-w-[150px]">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-200/60 bg-white dark:bg-white text-slate-800 dark:text-slate-800 text-xs outline-none transition-all cursor-pointer focus:border-cyber-cyan appearance-none font-mono tracking-wider"
                  >
                    <option value="default">Default Order</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

          {/* PRODUCTS DISPLAY GRID */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4 max-w-md mx-auto relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-cyber-cyan/10 text-cyber-cyan flex items-center justify-center mx-auto">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sans font-bold text-slate-800 dark:text-white text-base">No Matching Devices Found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">We couldn't find any products in category "{selectedCategory}" matching "{searchQuery}". Try modifying your filters or terms.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 relative z-10">
              {filteredAndSortedProducts.map((p) => {
                const currentCartQty = cart[p.id] || 0;
                const inCart = currentCartQty > 0;

                return (
                  <div 
                    key={p.id}
                    className="flex flex-col bg-white dark:bg-white backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-slate-200/50 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-100/30 dark:hover:shadow-none transition-all duration-300 group"
                  >
                    {/* Product Image and Visual Badging */}
                    <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-50/50 flex items-center justify-center border-b border-slate-100/50 dark:border-slate-200/30">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        loading="lazy"
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Status indicator pill label */}
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 py-1 text-[8px] sm:text-[9px] font-mono font-bold bg-cyber-cyan/15 backdrop-blur-sm text-cyber-cyan rounded-lg border border-cyber-cyan/30 shadow-md">
                        {p.label}
                      </span>
                      
                      {/* Quantity Indicator Overlay */}
                      {inCart && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-emerald-500/90 text-white font-mono text-[9px] font-bold px-2 py-1 rounded-lg border border-emerald-400/20 shadow-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{currentCartQty} in Cart</span>
                        </div>
                      )}
                    </div>

                    {/* Product details */}
                    <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider font-mono">
                          <Tag className="w-2.5 h-2.5 text-cyber-cyan shrink-0" />
                          <span>{p.category}</span>
                        </div>
                        
                        <h3 className="font-sans font-semibold text-slate-900 dark:text-slate-900 text-xs sm:text-sm tracking-tight leading-snug mb-1 sm:mb-2 line-clamp-2 h-8 sm:h-10">
                          {p.name}
                        </h3>

                        {/* Highly stylized Pricing Display */}
                        <div className="text-sm sm:text-lg font-mono font-black text-cyber-blue dark:text-cyber-blue mb-4 flex items-baseline gap-1">
                          {formatPrice(p.price)}
                        </div>
                      </div>

                      {/* Interactive Shopping Stepper & Instant Buy Bypass */}
                      <div className="space-y-2 pt-2 border-t border-slate-50 dark:border-slate-100/10">
                        
                        {/* Add-to-Cart Action Container */}
                        {inCart ? (
                          /* Morphing In-Card Counter Controller */
                          <div className="flex items-center justify-between p-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <button
                              onClick={() => handleDecrementCartQuantity(p.id)}
                              className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-900 hover:bg-emerald-600 flex items-center justify-center transition-all cursor-pointer border border-emerald-400/20 shadow-sm"
                              title="Decrease Quantity"
                            >
                              <Minus className="w-3.5 h-3.5 font-bold" />
                            </button>
                            <span className="text-[11px] font-mono font-black text-cyber-blue dark:text-emerald-400 px-2">
                              Qty: {currentCartQty}
                            </span>
                            <button
                              onClick={() => handleAddToCartDirectly(p.id)}
                              className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-900 hover:bg-emerald-600 flex items-center justify-center transition-all cursor-pointer border border-emerald-400/20 shadow-sm"
                              title="Increase Quantity"
                            >
                              <Plus className="w-3.5 h-3.5 font-bold" />
                            </button>
                          </div>
                        ) : (
                          /* Clean Add Button */
                          <button
                            onClick={() => handleAddToCartDirectly(p.id)}
                            className="w-full py-2.5 sm:py-3 rounded-xl bg-cyber-cyan hover:bg-cyber-cyan/90 text-slate-900 font-bold font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] hover:shadow-lg hover:shadow-cyber-cyan/20"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                            Add To Order
                          </button>
                        )}

                        {/* Instant Direct Checkout bypass button */}
                        <button
                          onClick={() => {
                            // Add to cart and scroll to checkout form
                            if (!cart[p.id]) {
                              handleAddToCartDirectly(p.id);
                            }
                            const el = document.getElementById('checkout-form-container');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="w-full py-2.5 sm:py-3 rounded-xl bg-cyber-blue hover:bg-cyber-blue/90 text-white font-bold font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] hover:shadow-lg hover:shadow-cyber-blue/25"
                        >
                          <Zap className="w-3.5 h-3.5 text-white group-hover:scale-110 shrink-0" />
                          Buy Instantly
                        </button>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STICKY BASKET & CHECKOUT FORM */}
        <div id="checkout-form-container" className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-6 z-10">
          
          <div className="bg-white dark:bg-white border border-slate-200/80 dark:border-slate-200/80 rounded-3xl shadow-xl overflow-hidden flex flex-col">
            
            {/* Panel Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-200/40 bg-slate-50 dark:bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyber-cyan/10 text-cyber-cyan shrink-0">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-slate-900 dark:text-slate-900 uppercase text-sm tracking-tight leading-none mb-1">
                    Your Shopping Basket
                  </h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {getCartTotalItems()} {getCartTotalItems() === 1 ? 'item' : 'items'} selected
                  </p>
                </div>
              </div>
              {getCartTotalItems() > 0 && (
                <button 
                  onClick={handleResetOrder}
                  className="text-[10px] font-mono text-slate-400 hover:text-cyber-cyan uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>

            {/* Panel Body */}
            <div className="p-6 space-y-6">
              
              {/* Basket list */}
              {Object.keys(cart).length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50/50 dark:bg-slate-50/50 flex items-center justify-center mx-auto text-slate-300 dark:text-slate-400 border border-slate-100 dark:border-slate-200/50">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-slate-800 dark:text-slate-800 text-xs uppercase tracking-tight">Your order is empty</h4>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-relaxed">Select premium devices and accessories from the showroom to begin your checkout.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-[240px] overflow-y-auto pr-1">
                  {Object.entries(cart).map(([idStr, qty]) => {
                    const id = Number(idStr);
                    const p = PRODUCTS.find(prod => prod.id === id);
                    if (!p) return null;

                    return (
                      <motion.div 
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-50 border border-slate-100 dark:border-slate-200/40 flex items-center gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white dark:bg-white border border-slate-200/50 dark:border-slate-200/40 shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-sans font-bold text-slate-900 dark:text-slate-900 text-xs truncate leading-snug">{p.name}</h4>
                          <p className="text-[11px] text-cyber-blue font-mono font-medium mt-0.5">{formatPrice(p.price)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-white border border-slate-100 dark:border-slate-200/40 rounded-lg">
                            <button
                              onClick={() => handleDecrementCartQuantity(p.id)}
                              className="w-5 h-5 rounded bg-slate-50 dark:bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-800 w-3 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleAddToCartDirectly(p.id)}
                              className="w-5 h-5 rounded bg-slate-50 dark:bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              setCart(prev => {
                                  const copy = { ...prev };
                                  delete copy[p.id];
                                  return copy;
                              });
                              showToast(`Removed ${p.name}`, 'info');
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyber-cyan hover:bg-cyber-cyan/5 transition-all cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Delivery Details Form */}
              {Object.keys(cart).length > 0 && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-200/20">
                  <div className="p-4 rounded-2xl bg-cyber-cyan/5 border border-cyber-cyan/15 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-cyber-cyan/10">
                      <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Estimated Total:</span>
                      <span className="text-base font-mono font-black text-slate-900 dark:text-slate-900 leading-none">{getCartTotalDisplay()}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                      <AlertCircle className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                      <span>
                        No form filling required! Simply click the button below to send your items directly to our sales team on WhatsApp to finalize your delivery and payment details instantly.
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 mt-2 rounded-xl bg-cyber-cyan hover:bg-cyber-cyan/95 disabled:opacity-50 text-slate-900 font-mono text-xs font-bold uppercase tracking-widest text-center transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-cyber-cyan/15 hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 shrink-0" />
                        Complete Order on WhatsApp
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* FOOTER CORE PROPOSITIONS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-slate-100 dark:border-slate-200/40 relative z-10">
        <div className="flex gap-4 p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-50/50 border border-slate-100/50 dark:border-slate-200/30">
          <div className="p-3.5 rounded-2xl bg-cyber-cyan/10 text-cyber-cyan shrink-0 h-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-900 text-sm mb-1 uppercase tracking-tight">Olit Certified Quality</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Each item undergoes a thorough 25-point visual and functional inspection process, guaranteeing pristine performance and battery longevity.</p>
          </div>
        </div>

        <div className="flex gap-4 p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-50/50 border border-slate-100/50 dark:border-slate-200/30">
          <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-500 shrink-0 h-fit">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-900 text-sm mb-1 uppercase tracking-tight">Swift Nationwide Dispatch</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Enjoy secured standard delivery nationwide. Same-day premium dispatch is fully available for orders placed within Lagos state before 3 PM.</p>
          </div>
        </div>

        <div className="flex gap-4 p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-50/50 border border-slate-100/50 dark:border-slate-200/30">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0 h-fit">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-slate-900 dark:text-slate-900 text-sm mb-1 uppercase tracking-tight">Hassle-Free Swap Plans</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Upgrade your gadgets easily. Hand over your older device for an instant valuation and deduct the value from your chosen showroom purchase.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
