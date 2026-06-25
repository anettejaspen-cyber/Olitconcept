// @ts-ignore
import iphone17Boxes from './assets/images/iphone17_boxes_1782310439189.jpg';
// @ts-ignore
import iphone11Fan from './assets/images/iphone11_fan_1782310454409.jpg';
// @ts-ignore
import iphone11Blue from './assets/images/iphone11_blue_1782310469890.jpg';
// @ts-ignore
import iphoneXsMaxGold from './assets/images/iphone_xs_max_gold_1782310483039.jpg';
// @ts-ignore
import itel2160 from './assets/images/itel_2160_1782310503640.jpg';
// @ts-ignore
import jblPureBassBox from './assets/images/jbl_pure_bass_box_1782310518089.jpg';
// @ts-ignore
import jblP07HeadphonesBox from './assets/images/jbl_p07_headphones_box_1782310531877.jpg';
// @ts-ignore
import zealotS64Box from './assets/images/zealot_s64_box_1782310546545.jpg';
// @ts-ignore
import iphone7PlusRose from './assets/images/iphone7_plus_olit_receipt_1782311832181.jpg';
// @ts-ignore
import iphone11Teal128gb from './assets/images/iphone11_teal_128gb_1782312111110.jpg';

export { iphone7PlusRose, iphone11Teal128gb };

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
    name: 'iPhone 7 Plus (32gb)',
    brand: 'Apple',
    price: 70000,
    originalPrice: 85000,
    rating: 4.6,
    image: 'https://i.ibb.co/xccs6Mv/IMG-20260624-WA0010.jpg',
    specs: ['32GB Internal Storage', 'Touch ID Security Active', 'Direct UK Used 🇬🇧', 'Pristine Housing Grid'],
    features: ['High-Quality Retina Display', 'Dual-Camera with Portrait Mode', 'Crisp Stereo Speaker System'],
    badge: 'Popular Choice',
    isLaptop: false,
  },
  {
    id: 'dev-2',
    name: '17 Pro Max Chip Physical Only',
    brand: 'Apple',
    price: 1700000,
    originalPrice: 1850000,
    rating: 5.0,
    image: iphone17Boxes,
    specs: ['Next-Gen High-Speed Processing', 'Physical SIM Slot Only (No eSIM restrictions)', 'Direct UK Used 🇬🇧', '100% Battery Health Profile'],
    features: ['Premium Aerospace Titanium Shell', 'Ultrafast Chipset Frame', 'Advanced Cinematic Optics Matrix'],
    badge: 'Next-Gen Core',
    isLaptop: false,
  },
  {
    id: 'dev-3',
    name: 'iPhone 11 Available 🔥',
    brand: 'Apple',
    price: 250000,
    originalPrice: 280000,
    rating: 4.8,
    image: iphone11Fan,
    specs: ['64GB: ₦250,000', '128GB: ₦290,000', '256GB: ₦315,000', 'All Direct BH ✅', 'Direct UK Used 🇬🇧'],
    features: ['Excellent Health Condition', 'Dual 12MP Ultra-Wide optics', 'Liquid Retina TrueTone Screen'],
    badge: 'Best Value 🔥',
    isLaptop: false,
  },
  {
    id: 'dev-4',
    name: 'Apple iPhone 11 (128gb)',
    brand: 'Apple',
    price: 270000,
    originalPrice: 300000,
    rating: 4.8,
    image: iphone11Blue,
    specs: ['128GB High Capacity Storage', 'Direct UK Used 🇬🇧', 'A13 Bionic Intelligent Brain', 'Fully Unlocked Device'],
    features: ['Pristine Fluid Performance', 'All Day Battery Longevity', '4K Ultra-Stable Video capture'],
    badge: 'Direct Import',
    isLaptop: false,
  },
  {
    id: 'dev-6',
    name: 'No face Xsmax',
    brand: 'Apple',
    price: 120000,
    originalPrice: 145000,
    rating: 4.4,
    image: iphoneXsMaxGold,
    specs: ['Super Retina OLED Panel', 'No Face ID (Secure Passcode active)', 'Direct UK Used 🇬🇧', 'Pristine physical body shape'],
    features: ['Cinematic 6.5" High-Contrast screen', 'Dual 12MP Camera with Portrait Light', 'Premium Slate Metal casing'],
    badge: 'Special Promo',
    isLaptop: false,
  },
  {
    id: 'dev-7',
    name: 'Used itel 2160',
    brand: 'Itel',
    price: 7000,
    originalPrice: 10000,
    rating: 4.2,
    image: itel2160,
    specs: ['Dual SIM Dual Standby Ready', 'Wireless FM Radio Playback', 'Super Bright Integrated Torchlight'],
    features: ['Ultra Durable Long Battery Life', 'Physical Anti-Dust T9 Keyboard', 'Highly compact utility format'],
    badge: 'Super Low Cost',
    isLaptop: false,
  },
];

export const ACCESSORIES_SHOWROOM: Accessory[] = [
  {
    id: 'acc-1',
    name: 'JBL pure bass',
    category: 'Audio',
    price: 14000,
    originalPrice: 18000,
    rating: 4.7,
    image: jblPureBassBox,
    specs: ['Powerful Pure Bass acoustics', 'Up to 24 hours of massive playback time', 'Ergonomic comfortable secure ear tip fit'],
    badge: 'Hot Seller',
  },
  {
    id: 'acc-2',
    name: 'JBL headset',
    category: 'Audio',
    price: 15000,
    originalPrice: 20000,
    rating: 4.8,
    image: jblP07HeadphonesBox,
    specs: ['Soft Cushion Over-Ear Fitment', 'Wireless High Fidelity Sound', 'Compact Foldable Travel Design'],
    badge: 'Best Acoustics',
  },
  {
    id: 'acc-3',
    name: 'Zealot S64',
    category: 'Speakers',
    price: 40000,
    originalPrice: 50000,
    rating: 4.9,
    image: zealotS64Box,
    specs: ['High-Volume Deep Bass Audio', 'IPX5 Moisture and Splash protection', 'Extended Multi-day Battery Pack'],
    badge: 'Outdoor Heavyweight',
  },
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    type: 'tiktok',
    thumbnailUrl: iphone17Boxes,
    likes: '42.5K',
    views: '240K',
    duration: '0:45',
    category: 'unboxing',
    caption: '📦 Fresh batch of iPhone 17 Pro Max (Physical SIM Only) just deployed at Olit Concept! Direct UK Used 🇬🇧. Pure luxury titanium aesthetics. Unboxing & setup! #unboxing #iphone17 #titanium #premiumvibe',
    accentColor: '#00f0ff',
  },
  {
    id: 'post-2',
    type: 'instagram',
    thumbnailUrl: iphone11Fan,
    likes: '24.5K',
    views: '112K',
    category: 'reveal',
    caption: '🔥 iPhone 11 (64GB/128GB/256GB) fully stocked at Olit Concept! All in pristine direct battery health condition. Spot your favorite color! #stockreveal #iphone11 #apple #directimport',
    accentColor: '#10b981',
  },
  {
    id: 'post-3',
    type: 'tiktok',
    thumbnailUrl: jblPureBassBox,
    likes: '31.2K',
    views: '195K',
    duration: '0:58',
    category: 'unboxing',
    caption: '🎵 Sound test on the JBL Pure Bass wireless buds! Crystal clear acoustics, intense bass response, 24h battery life. Premium sound only at Olit. #jbl #audiotech #wirelessbuds #musicvibe',
    accentColor: '#3b82f6',
  },
  {
    id: 'post-4',
    type: 'instagram',
    thumbnailUrl: 'https://i.ibb.co/xccs6Mv/IMG-20260624-WA0010.jpg',
    likes: '18.9K',
    views: '98K',
    category: 'reveal',
    caption: '✍️ Done deal! High-grade Rose Gold iPhone 7 Plus (32gb) handpicked and verified with official Olit Concept warranty invoice. True trust and transparency! #apple #iphone7plus #warranty #customerlove',
    accentColor: '#f43f5e',
  },
  {
    id: 'post-5',
    type: 'tiktok',
    thumbnailUrl: zealotS64Box,
    likes: '15.4K',
    views: '76K',
    duration: '1:15',
    category: 'unboxing',
    caption: '🔊 Bringing the heavy bass! Zealot S64 outdoor wireless speaker unboxing. 40W deep sound, water-resistant armor. Perfect for active outdoor vibes. #zealots64 #speaker #partymusic #unboxing',
    accentColor: '#84cc16',
  },
  {
    id: 'post-6',
    type: 'instagram',
    thumbnailUrl: itel2160,
    likes: '12.8K',
    views: '64K',
    category: 'repair',
    caption: '🔋 Talk about battery longevity! The rugged, super-affordable Used itel 2160 with built-in FM Radio and torchlight. Direct UK pre-owned batch. #itel #classictech #batteryking #utility',
    accentColor: '#eab308',
  }
];

export const CLIENT_REVIEWS: Review[] = [];

