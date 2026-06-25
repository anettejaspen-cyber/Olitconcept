import React, { useState, useEffect } from 'react';
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
  Phone
} from 'lucide-react';

// No local image imports needed as we use the direct hosting URLs resolved from the postimg pages.

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
  // Cart state: { [productId]: quantity }
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  // Product quantities before adding to cart: { [productId]: quantity }
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [addedItems, setAddedItems] = useState<{ [key: number]: boolean }>({});

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    state: 'Lagos',
    deliveryMethod: 'Standard Delivery (2-3 Days)',
    paymentOption: 'Bank Transfer'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Initialize helper quantities to 0
  useEffect(() => {
    const initialQuantities: { [key: number]: number } = {};
    PRODUCTS.forEach(p => {
      initialQuantities[p.id] = 0;
    });
    setQuantities(initialQuantities);
  }, []);

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

  const getCartTotalDisplay = () => {
    const total = getCartTotalPrice();
    const hasUnpriced = hasUnpricedInCart();
    if (total === 0) return 'Price on Request';
    if (hasUnpriced) return `₦${total.toLocaleString()} + Custom Quote`;
    return '₦' + total.toLocaleString();
  };

  const getCartTotalItems = () => {
    return Object.values(cart).reduce((sum: number, qty) => sum + (qty as number), 0);
  };

  const getCartTotalPrice = () => {
    return Object.entries(cart).reduce((sum: number, [id, qty]) => {
      const p = PRODUCTS.find(prod => prod.id === Number(id));
      const q = qty as number;
      return sum + (p ? p.price * q : 0);
    }, 0);
  };

  const handleQtyChange = (productId: number, change: number) => {
    setQuantities(prev => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + change);
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (productId: number) => {
    const qty = quantities[productId] || 0;
    if (qty === 0) {
      alert('Please select a quantity first using the + and - buttons!');
      return;
    }

    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + qty
    }));

    // Reset pre-add quantity
    setQuantities(prev => ({
      ...prev,
      [productId]: 0
    }));

    // Trigger visual checkmark feedback
    setAddedItems(prev => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [productId]: false }));
    }, 1500);
  };

  const handleCartQtyChange = (productId: number, change: number) => {
    setCart(prev => {
      const current = prev[productId] || 0;
      const next = current + change;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prev => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Build items string for WhatsApp message
    let itemsString = '';
    Object.entries(cart).forEach(([id, qty]) => {
      const p = PRODUCTS.find(prod => prod.id === Number(id));
      const q = qty as number;
      if (p) {
        itemsString += `• *${p.name}* x ${q} (${formatPrice(p.price * q)})\n`;
      }
    });

    const totalAmount = getCartTotalDisplay();

    // Create the custom-styled WhatsApp message
    const whatsappMessage = `🛍️ *NEW ORDER FROM OLIT CONCEPT*
----------------------------------
*ITEMS ORDERED:*
${itemsString}
*TOTAL AMOUNT:* ${totalAmount}

*CUSTOMER DETAILS:*
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📍 *Address:* ${formData.address}
🗺️ *State:* ${formData.state}

*SHIPPING PREFERENCE:*
🚚 *Method:* ${formData.deliveryMethod}

*PAYMENT PREFERENCE:*
💵 *Option:* ${formData.paymentOption}
----------------------------------
_Sent via Olit Concept Interactive Store_`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/2348130080812?text=${encodedMessage}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutStep('success');
      // Open WhatsApp in a new tab
      window.open(whatsappURL, '_blank');
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
    setCheckoutStep('cart');
    setIsCartOpen(false);
  };

  const filterCategories = [
    { id: 'All', name: 'All Products', icon: Layers, count: PRODUCTS.length },
    { id: 'Smartphones', name: 'Smartphones', icon: Smartphone, count: PRODUCTS.filter(p => p.category === 'iPhone' || p.category === 'Samsung').length },
    { id: 'Accessories', name: 'Accessories', icon: Headphones, count: PRODUCTS.filter(p => p.category === 'Accessories').length },
    { id: 'Spare Parts', name: 'Spare Parts', icon: Cpu, count: PRODUCTS.filter(p => p.category === 'Spare Parts').length },
    { id: 'Feature Phone', name: 'Feature Phones', icon: Phone, count: PRODUCTS.filter(p => p.category === 'Feature Phone').length }
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Smartphones') return p.category === 'iPhone' || p.category === 'Samsung';
    return p.category === selectedCategory;
  });

  return (
    <div id="order-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 dark:border-slate-800">
      
      {/* SECTION HEADER & CART TOGGLE BUTTON */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-4 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Catalog Store
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-slate-900 dark:text-white mb-2">
            Olit Concept Order Section
          </h2>
          <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Browse our verified inventory. Add items to your dynamic cart and checkout instantly. Your orders are securely processed directly to WhatsApp.
          </p>
        </div>

        <button 
          onClick={() => {
            setCheckoutStep('cart');
            setIsCartOpen(true);
          }}
          className="self-start md:self-end px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-rose-600 dark:bg-white dark:hover:bg-rose-500 text-white dark:text-slate-900 dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 shadow-lg shadow-rose-500/5 cursor-pointer hover:scale-[1.02] active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          View Cart
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white dark:bg-slate-900 dark:text-white">
            {getCartTotalItems()}
          </span>
        </button>
      </div>

      {/* CATEGORIES FILTER SYSTEM */}
      <div className="flex gap-2 pb-5 overflow-x-auto scrollbar-none mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {filterCategories.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider border transition-all duration-300 whitespace-nowrap cursor-pointer hover:scale-[1.02] active:scale-95 ${
                isActive
                  ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-white border-slate-100 hover:border-slate-200 dark:bg-slate-900/20 dark:border-white/5 dark:hover:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isActive 
                  ? 'bg-white/25 text-white' 
                  : 'bg-slate-50 dark:bg-slate-950/60 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-white/5'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        {filteredProducts.map((p) => {
          const preQty = quantities[p.id] || 0;
          const isAdded = addedItems[p.id];

          return (
            <div 
              key={p.id}
              className="flex flex-col bg-white dark:bg-slate-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-100/30 dark:hover:shadow-none transition-all duration-300 group"
            >
              {/* Product Image and Label Badge */}
              <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center border-b border-slate-50 dark:border-white/5">
                <img 
                  src={p.image} 
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Label */}
                <span className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-mono font-semibold bg-slate-900/80 text-white dark:bg-white dark:text-slate-900 rounded-md sm:rounded-lg shadow-sm">
                  {p.label}
                </span>
              </div>

              {/* Product details */}
              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mb-0.5 sm:mb-1">
                    <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500" />
                    <span>{p.category}</span>
                  </div>
                  <h3 className="font-sans font-semibold text-slate-900 dark:text-white text-xs sm:text-sm tracking-tight leading-tight mb-1 sm:mb-2 line-clamp-2 h-8 sm:h-10">
                    {p.name}
                  </h3>
                  <div className="text-sm sm:text-lg font-mono font-semibold text-slate-900 dark:text-white mb-2 sm:mb-4">
                    {formatPrice(p.price)}
                  </div>
                </div>

                {/* Interactive Actions */}
                <div className="space-y-2 pt-1 sm:pt-2">
                  {/* Quantity adjustment */}
                  <div className="flex items-center justify-between p-0.5 sm:p-1 bg-slate-50 dark:bg-slate-950/60 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-white/5">
                    <button
                      onClick={() => handleQtyChange(p.id, -1)}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer border border-slate-100 dark:border-white/5"
                    >
                      <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-800 dark:text-slate-200 min-w-6 sm:min-w-8 text-center">
                      {preQty}
                    </span>
                    <button
                      onClick={() => handleQtyChange(p.id, 1)}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all cursor-pointer border border-slate-100 dark:border-white/5"
                    >
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => handleAddToCart(p.id)}
                    className={`w-full py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 ${
                      isAdded 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                        : 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/10 hover:shadow-rose-500/20'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DYNAMIC SHOPPING CART SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Dark glass backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Slide-out Sidebar Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white dark:bg-slate-950 border-l border-slate-100 dark:border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-slate-900/25">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-slate-900 dark:text-white text-lg">Your Showroom Order</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{getCartTotalItems()} items loaded</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive Steps container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {checkoutStep === 'cart' && (
                  <>
                    {/* CART ITEMS VIEW */}
                    {Object.keys(cart).length === 0 ? (
                      <div className="py-24 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto text-slate-300 dark:text-slate-700">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="font-sans font-semibold text-slate-800 dark:text-slate-200 text-sm">Your order list is empty</h4>
                          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[240px] mx-auto mt-1">Select products and set custom quantities in the catalog above to add them here.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
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
                              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 flex items-center gap-4 group"
                            >
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 shrink-0">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="font-sans font-semibold text-slate-900 dark:text-white text-xs truncate">{p.name}</h4>
                                <p className="text-xs text-rose-500 font-mono font-medium mt-0.5">{formatPrice(p.price)} each</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2.5 p-1 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl">
                                  <button
                                    onClick={() => handleCartQtyChange(p.id, -1)}
                                    className="w-6 h-6 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 flex items-center justify-center cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 w-4 text-center">
                                    {qty}
                                  </span>
                                  <button
                                    onClick={() => handleCartQtyChange(p.id, 1)}
                                    className="w-6 h-6 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 flex items-center justify-center cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => handleRemoveFromCart(p.id)}
                                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 transition-all cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'form' && (
                  <motion.form 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleCheckoutSubmit}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 mb-2">
                      <p className="text-[10px] font-mono font-medium text-rose-600 dark:text-rose-400 uppercase tracking-wider">Estimated Total</p>
                      <h4 className="text-2xl font-mono font-bold text-slate-900 dark:text-white mt-0.5">{getCartTotalDisplay()}</h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Orders are compiled into a beautiful template format to send directly to our verified sales representative on WhatsApp.</p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Blessing Adewale"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +234 813 008 0812"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">
                        Delivery Address <span className="text-rose-500">*</span>
                      </label>
                      <textarea 
                        name="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete home or office delivery address..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    {/* State & Payment Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">
                          State
                        </label>
                        <select 
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                        >
                          <option value="Lagos">Lagos</option>
                          <option value="Abuja">Abuja</option>
                          <option value="Port Harcourt">Port Harcourt</option>
                          <option value="Oyo">Oyo</option>
                          <option value="Ogun">Ogun</option>
                          <option value="Other">Other State</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">
                          Payment Mode
                        </label>
                        <select 
                          name="paymentOption"
                          value={formData.paymentOption}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                        >
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Pay on Delivery">Pay on Delivery</option>
                          <option value="Store Pickup">Store Pickup</option>
                        </select>
                      </div>
                    </div>

                    {/* Delivery speed method */}
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">
                        Delivery Speed
                      </label>
                      <select 
                        name="deliveryMethod"
                        value={formData.deliveryMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                      >
                        <option value="Standard Delivery (2-3 Days)">Standard Delivery (2-3 Days)</option>
                        <option value="Express Dispatch (Same Day Lagos)">Express Same-Day Dispatch (Lagos)</option>
                        <option value="Self Pickup at Shop">Self-Pickup at Olit Concept Store</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:bg-rose-400 text-white font-mono text-xs uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing Order Format...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          Send WhatsApp Order Code
                        </>
                      )}
                    </button>
                  </motion.form>
                )}

                {checkoutStep === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-sans font-semibold text-slate-900 dark:text-white text-lg">Order Successfully Processed</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                        Your secure preorder format has been generated and compiled. A chat has been initiated with Olit Concept. If it did not open automatically, please trigger it using the buttons below.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 max-w-xs mx-auto">
                      <button
                        onClick={() => {
                          let itemsString = '';
                          Object.entries(cart).forEach(([id, qty]) => {
                            const p = PRODUCTS.find(prod => prod.id === Number(id));
                            const q = qty as number;
                            if (p) {
                              itemsString += `• *${p.name}* x ${q} (${formatPrice(p.price * q)})\n`;
                            }
                          });
                          const totalAmount = getCartTotalDisplay();
                          const whatsappMessage = `🛍️ *NEW ORDER FROM OLIT CONCEPT*
----------------------------------
*ITEMS ORDERED:*
${itemsString}
*TOTAL AMOUNT:* ${totalAmount}

*CUSTOMER DETAILS:*
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📍 *Address:* ${formData.address}
🗺️ *State:* ${formData.state}

*SHIPPING PREFERENCE:*
🚚 *Method:* ${formData.deliveryMethod}

*PAYMENT PREFERENCE:*
💵 *Option:* ${formData.paymentOption}
----------------------------------
_Sent via Olit Concept Interactive Store_`;
                          window.open(`https://wa.me/2348130080812?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
                        }}
                        className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" /> Trigger WhatsApp Manually
                      </button>
                      <button
                        onClick={handleResetOrder}
                        className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Reset & Clear Cart
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer (Total amounts, checkout button triggers) */}
              {checkoutStep === 'cart' && Object.keys(cart).length > 0 && (
                <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-wider">Subtotal amount</span>
                    <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">{getCartTotalDisplay()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setCart({})}
                      className="py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-mono text-[10px] uppercase tracking-wider text-center transition-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900"
                    >
                      Empty Cart
                    </button>
                    <button
                      onClick={() => setCheckoutStep('form')}
                      className="py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-mono text-[10px] uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/10"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QUICK VALUE PROPOSITIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-slate-100 dark:border-white/5">
        <div className="flex gap-4 p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-100/50 dark:border-white/5">
          <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-500 shrink-0 h-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-slate-900 dark:text-white text-sm mb-1">Olit Certified Quality</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Each item undergoes a thorough 25-point visual and functional inspection process, guaranteeing pristine performance and battery longevity.</p>
          </div>
        </div>

        <div className="flex gap-4 p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-100/50 dark:border-white/5">
          <div className="p-3.5 rounded-2xl bg-blue-500/10 text-blue-500 shrink-0 h-fit">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-slate-900 dark:text-white text-sm mb-1">Swift Nationwide Dispatch</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Enjoy secured standard delivery nationwide. Same-day premium dispatch is fully available for orders placed within Lagos state before 3 PM.</p>
          </div>
        </div>

        <div className="flex gap-4 p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-100/50 dark:border-white/5">
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0 h-fit">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-slate-900 dark:text-white text-sm mb-1">Hassle-Free Swap Plans</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Upgrade your gadgets easily. Hand over your older device for an instant valuation and deduct the value from your chosen showroom purchase.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
