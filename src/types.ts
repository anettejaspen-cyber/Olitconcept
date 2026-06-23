export interface Device {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  specs: string[];
  features: string[];
  badge?: string;
  isLaptop?: boolean;
}

export interface Accessory {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  specs: string[];
  badge?: string;
}

export interface RepairIssue {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  baseCost: number;
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  verified: boolean;
}

export interface SocialPost {
  id: string;
  type: 'instagram' | 'tiktok';
  thumbnailUrl: string;
  likes: string;
  views?: string;
  duration?: string;
  caption: string;
  category: 'unboxing' | 'repair' | 'reveal';
  accentColor: string;
}

// Structured catalog data
export const BRANDS = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Asus', 'Dell'];

export const MODELS: Record<string, string[]> = {
  Apple: [
    'iPhone 15 Pro Max',
    'iPhone 15 Pro',
    'iPhone 15 Plus',
    'iPhone 15',
    'iPhone 14 Pro Max',
    'iPhone 13',
    'iPad Pro 12.9" (M2)',
    'MacBook Pro 16" (M3 Max)',
  ],
  Samsung: [
    'Galaxy S24 Ultra',
    'Galaxy S24+',
    'Galaxy S24',
    'Galaxy Z Fold 5',
    'Galaxy Z Flip 5',
    'Galaxy S23 Ultra',
  ],
  Google: [
    'Pixel 8 Pro',
    'Pixel 8',
    'Pixel 7 Pro',
    'Pixel Fold',
  ],
  OnePlus: [
    'OnePlus 12',
    'OnePlus 12R',
    'OnePlus Open',
    'OnePlus 11',
  ],
  Xiaomi: [
    'Xiaomi 14 Ultra',
    'Xiaomi 14',
    'Redmi Note 13 Pro+',
  ],
  Asus: [
    'ROG Strix SCAR 18',
    'Zenbook Duo Dual-Screen',
  ],
  Dell: [
    'XPS 15 Extreme Slate',
  ]
};

export const REPAIR_ISSUES: RepairIssue[] = [
  {
    id: 'screen',
    name: 'Cracked Screen & Display Bleed',
    description: 'OLED / LCD glass replacement, responsive touch restoring, calibration',
    estimatedTime: '30-45 Mins',
    baseCost: 225000,
    icon: 'SmartphoneCharging',
  },
  {
    id: 'battery',
    name: 'Battery Bleed & Degraded Capacity',
    description: 'High-capacity OEM battery replacement with cycles health calibration',
    estimatedTime: '20-30 Mins',
    baseCost: 105000,
    icon: 'BatteryCharging',
  },
  {
    id: 'charging',
    name: 'Charging Port Malfunction',
    description: 'USB-C/Lightning connector block cleaning or module replacement',
    estimatedTime: '30 Mins',
    baseCost: 90000,
    icon: 'Zap',
  },
  {
    id: 'water',
    name: 'Water & Liquid Damage Retrieval',
    description: 'Ultrasonic board cleaning, moisture displacement, micro-soldering inspection',
    estimatedTime: 'Same Day',
    baseCost: 180000,
    icon: 'Droplet',
  },
  {
    id: 'backglass',
    name: 'Shattered Back Glass',
    description: 'High-precision laser shell separation and pristine glass panel alignment',
    estimatedTime: '1-2 Hours',
    baseCost: 135000,
    icon: 'Layers',
  },
  {
    id: 'camera',
    name: 'Camera Lens & Sensor Malfunction',
    description: 'Optical stabilization calibration, sapphire outer glass, or module swap',
    estimatedTime: '45 Mins',
    baseCost: 150000,
    icon: 'Camera',
  },
];

export const DEVICES_SHOWROOM: Device[] = [
  {
    id: 'dev-1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1850000,
    originalPrice: 2000000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
    specs: ['A17 Pro Titanium Chip', '5x Telephoto Optical Zoom', 'Super Retina XDR OLED', 'Stunning Natural Titanium'],
    features: ['5G Ultra-Cap', 'Action Button Integration', 'USB-C ProRes Video Protocol'],
    badge: 'Trending',
    isLaptop: false,
  },
  {
    id: 'dev-2',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1950000,
    originalPrice: 2100000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600',
    specs: ['Snapdragon 8 Gen 3 for Galaxy', '200MP Quad-Rear Camera Matrix', 'Integrated Bluetooth S-Pen', 'Armor Titanium Case'],
    features: ['Galaxy AI Native Suites', '120Hz LTPO AMOLED 2X', 'Ultra-Bright 2600 nits Peak'],
    badge: 'Popular',
    isLaptop: false,
  },
  {
    id: 'dev-3',
    name: 'Pixel 8 Pro',
    brand: 'Google',
    price: 1350000,
    originalPrice: 1500000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600',
    specs: ['Google Tensor G3 AI Chip', 'Pro Camera Controls & Video Boost', 'Clean Android 14 Core Fluidity', 'Satin Obsidian Glass back'],
    features: ['Magic Eraser & Best Take', 'Gemini Nano Offline Core', 'Thermometer Sensor Integration'],
    badge: 'Top Value',
    isLaptop: false,
  },
  {
    id: 'dev-4',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 1200000,
    originalPrice: 1350000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&q=80&w=600',
    specs: ['Snapdragon 8 Gen 3 Platform', '4th Gen Hasselblad Camera Config', '100W SUPERVOOC Jet Charging', 'Flowy Emerald Dual-Glass'],
    features: ['Aqua Touch Moisture Filter', 'Dual Cryo-velocity VC cooling', 'Alert Slider Hardware Toggle'],
    isLaptop: false,
  },
  // Laptops Section
  {
    id: 'dev-5',
    name: 'MacBook Pro 16" (M3 Max)',
    brand: 'Apple',
    price: 4850000,
    originalPrice: 5200000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
    specs: ['Apple M3 Max Chip (16-Core)', '48GB Super-Fast Unified Memory', '1TB High-Speed SSD PCIe Storage', 'Pristine Liquid Retina XDR Mini-LED'],
    features: ['120Hz ProMotion Adaptive Display', 'Studio-Grade 6-Speaker System', 'Full Thunderbolt 4 Connectivity'],
    badge: 'Elite Choice',
    isLaptop: true,
  },
  {
    id: 'dev-6',
    name: 'ROG Strix SCAR 18',
    brand: 'Asus',
    price: 3950000,
    originalPrice: 4300000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600',
    specs: ['Intel Core i9-14900HX CPU', 'NVIDIA GeForce RTX 4090 GPU', '32GB Ultra DDR5 RAM Memory', '18" QHD+ 240Hz Nebula HDR Screen'],
    features: ['Conductonaut Extreme Liquid Metal', 'Tri-Fan High Velocity Coolers', 'Full Aura Sync Custom RGB Layout'],
    badge: 'Pro Gaming',
    isLaptop: true,
  },
  {
    id: 'dev-7',
    name: 'Zenbook Duo Dual-Screen',
    brand: 'Asus',
    price: 2650000,
    originalPrice: 2900000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=600',
    specs: ['Dual 14" OLED Touchscreens', 'Intel Core Ultra 9 AI Processor', '32GB LPDDR5X Dedicated Memory', 'Ergonomic Detachable Keyboard Block'],
    features: ['Dual View Multi-task ScreenXpert', 'Intel AI Boost Neural Engine', 'Extremely Compact 1.6kg Chassis'],
    badge: 'Innovative',
    isLaptop: true,
  },
  {
    id: 'dev-8',
    name: 'XPS 15 Extreme Slate',
    brand: 'Dell',
    price: 2250000,
    originalPrice: 2450000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600',
    specs: ['Intel Core i7 13th Gen CPU Core', 'NVIDIA RTX 4060 Dedicated Graphics', '32GB RAM + 1TB High-Performance SSD', 'InfinityEdge OLED Anti-Reflective display'],
    features: ['CNC Machined Aluminum Shell Block', 'Quad Speaker Digital Studio Logic', '90-Day Parts High Capacity Protection'],
    badge: 'Popular',
    isLaptop: true,
  },
];

export const ACCESSORIES_SHOWROOM: Accessory[] = [
  {
    id: 'acc-1',
    name: 'Olit Stealth Cyber Gauntlet Pro',
    category: 'Cases & Armor',
    price: 75000,
    originalPrice: 95000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=600',
    specs: ['Military Grade MIL-STD-810H Drop protection', 'Integrated MagSafe ring with 15N magnetic latch', 'Machined Aerospace Titanium Kickstand'],
    badge: 'Best Seller',
  },
  {
    id: 'acc-2',
    name: 'AeroVolt 65W GaN Dual Charger',
    category: 'Power & Adapters',
    price: 60000,
    originalPrice: 85000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=600',
    specs: ['Ultra-Compact Gallium Nitride Architecture', 'Dual USB-C Power Delivery 3.0 Ports', 'Intelligent thermal protection cycles'],
    badge: 'Essential',
  },
  {
    id: 'acc-3',
    name: 'Nomad Cyber-Weave Carbon Band',
    category: 'Straps & Wearables',
    price: 90000,
    originalPrice: 120000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    specs: ['Genuine high-grade 3K Twill Carbon fiber link', 'FKM rubber fluoroelastomer under-liner padding', 'Hypoallergenic secure Titanium hardware buckle'],
  },
  {
    id: 'acc-4',
    name: 'Titanium-Alloy Curved Shield Pro',
    category: 'Screen Protection',
    price: 38000,
    originalPrice: 50000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=600',
    specs: ['9H+ Shatter-Proof Aluminosilicate premium compound', 'Rounded edges reinforced with Titanium-magnesium alloy', 'Full coverage dust protection hydrophobic coating'],
    badge: 'Premium',
  },
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    type: 'tiktok',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    likes: '42.5K',
    views: '240K',
    duration: '0:45',
    category: 'unboxing',
    caption: '📦 Pure titanium satisfaction. iPhone 15 Pro Max unboxing & custom setup at Olit Concept! Cyber Gauntlet case styling is absolutely mental. #unboxing #iphone15promax #techvibe',
    accentColor: '#00f0ff',
  },
  {
    id: 'post-2',
    type: 'instagram',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
    likes: '24.5K',
    views: '112K',
    category: 'unboxing',
    caption: '💻 MacBook Pro 16" (M3 Max) unboxing at Olit Concept! Look at that custom Space Black anodized shadow shell. Pure 16-core raw processing power! #macbookprom3 #unboxing #olitlaptops #premiumvibe',
    accentColor: '#10b981',
  },
  {
    id: 'post-3',
    type: 'tiktok',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=600',
    likes: '31.2K',
    views: '195K',
    duration: '0:58',
    category: 'reveal',
    caption: '💎 Custom Liquid Crystal cyber accessories range just dropped at Olit Concept. Turn your smartphone into custom aesthetic jewelry. What accessories should we fit next? #cyberaesthetic #techjewelry #aestheticphone #unboxing',
    accentColor: '#3b82f6',
  }
];

export const CLIENT_REVIEWS: Review[] = [];

