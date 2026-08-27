import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ProductItem } from '../types';

const env = (import.meta as any).env || {};
const supabaseUrl = (env.VITE_SUPABASE_URL as string) || '';
const supabaseAnonKey = (env.VITE_SUPABASE_ANON_KEY as string) || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    supabaseAnonKey.length > 10
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Initial 14 Real Tech Products Catalog across all required categories
export const defaultProducts: ProductItem[] = [
  // 1. Smartphones
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    category: 'Smartphones',
    price: 999.0,
    rating: 4.8,
    summary: 'Flagship Apple smartphone powered by the 3nm A18 Pro chip with ProRes 4K 120fps video and dedicated Camera Control.',
    specs: {
      battery: '3582 mAh with up to 27 hours video playback',
      display: '6.3-inch Super Retina XDR OLED (120Hz ProMotion)',
      processor: 'Apple A18 Pro (6-core CPU, 6-core GPU, 16-core NPU)',
      storage: '128GB / 256GB / 512GB / 1TB NVMe',
      camera: '48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto',
      weight: '199 grams',
      os: 'iOS 18 (Apple Intelligence)',
      connectivity: 'Wi-Fi 7, 5G Sub-6/mmWave, Bluetooth 5.3, USB-C 3.2 Gen 2 (10Gbps)'
    },
    pros: [
      'Unmatched single-core CPU and GPU performance with A18 Pro',
      'Studio-grade 4K 120fps Dolby Vision and ProRes log recording',
      'Tactile dedicated physical Camera Control button'
    ],
    cons: [
      'Base model starts at 128GB storage',
      'Wired charging capped at ~27W peak speeds'
    ]
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 1299.0,
    rating: 4.7,
    summary: 'Ultimate Android power-user phone with integrated S-Pen stylus, titanium frame, and 200MP quad-lens zoom camera.',
    specs: {
      battery: '5000 mAh with 45W fast charging and 15W Qi wireless',
      display: '6.8-inch Dynamic LTPO AMOLED 2X (120Hz 2600-nit anti-reflective)',
      processor: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy',
      storage: '256GB / 512GB / 1TB UFS 4.0',
      camera: '200MP Main + 50MP 5x Periscope + 10MP 3x + 12MP Ultra-Wide',
      weight: '232 grams',
      os: 'Android 14 with One UI 6.1 (7 Years OS Updates)',
      connectivity: 'Wi-Fi 7, 5G, Bluetooth 5.3, Ultra-Wideband (UWB), USB-C 3.2 Gen 1'
    },
    pros: [
      'Integrated S-Pen stylus for precision note-taking and drawing',
      'Gorilla Armor anti-reflective glass virtually eliminates glare',
      'Versatile 200MP quad-camera system with up to 100x Space Zoom'
    ],
    cons: [
      'Noticeably heavy and bulky in one-handed use',
      'Significantly higher starting MSRP at $1,299'
    ]
  },
  {
    id: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro',
    brand: 'Google',
    category: 'Smartphones',
    price: 999.0,
    rating: 4.6,
    summary: 'Google’s AI-first flagship compact phone featuring Gemini Nano on-device, 3000-nit Actua display, and 50MP triple cameras.',
    specs: {
      battery: '4700 mAh with 27W fast wired charging',
      display: '6.3-inch Super Actua LTPO OLED (120Hz 3000-nit peak)',
      processor: 'Google Tensor G4 with Titan M2 security coprocessor',
      storage: '128GB / 256GB / 512GB / 1TB UFS 3.1',
      camera: '50MP Main + 48MP Ultra-Wide Macro + 48MP 5x Telephoto',
      weight: '199 grams',
      os: 'Android 15 (7 Years Guaranteed OS & Feature Drops)',
      connectivity: 'Wi-Fi 7, 5G, Bluetooth 5.3, Satellite SOS, USB-C 3.2'
    },
    pros: [
      'Industry-leading computational HDR and authentic skin-tone rendering',
      'Deep on-device Gemini AI tools like Pixel Studio and Add Me',
      'Blinding 3,000-nit peak brightness for direct sunlight visibility'
    ],
    cons: [
      'Tensor G4 processor trails rivals in heavy sustained 3D gaming',
      'Slower peak wired fast charging speed'
    ]
  },

  // 2. Laptops
  {
    id: 'macbook-pro-14-m3-pro',
    name: 'MacBook Pro 14 (M3 Pro)',
    brand: 'Apple',
    category: 'Laptops',
    price: 1999.0,
    rating: 4.9,
    summary: 'The pinnacle of portable creator laptops featuring Apple silicon efficiency, Mini-LED Liquid Retina XDR, and 18-hour battery.',
    specs: {
      battery: '70Wh Lithium-Polymer (up to 18 hours video playback)',
      display: '14.2-inch Liquid Retina XDR Mini-LED (3024x1964 120Hz ProMotion 1600 nits HDR)',
      processor: 'Apple M3 Pro (11-core CPU, 14-core GPU, Hardware Ray Tracing)',
      storage: '512GB / 1TB / 2TB / 4TB High-Speed SSD',
      camera: '1080p FaceTime HD camera with advanced image signal processor',
      weight: '1.61 kg (3.5 lbs)',
      os: 'macOS Sonoma / Sequoia',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3, 3x Thunderbolt 4 / USB4, HDMI 2.1, SDXC slot, MagSafe 3'
    },
    pros: [
      'Unmatched power efficiency with true all-day 18-hour battery longevity',
      'Stunning Mini-LED XDR display with true deep blacks and 1600-nit HDR',
      'Whisper-quiet thermals even under sustained 4K video rendering'
    ],
    cons: [
      'Expensive unified memory and SSD upgrade pricing from Apple',
      'Limited native AAA gaming catalog compared to Windows laptops'
    ]
  },
  {
    id: 'dell-xps-14',
    name: 'Dell XPS 14 (9440)',
    brand: 'Dell',
    category: 'Laptops',
    price: 1699.0,
    rating: 4.3,
    summary: 'Futuristic CNC aluminum ultrabook with zero-lattice keyboard, seamless glass haptic touchpad, and optional OLED touchscreen.',
    specs: {
      battery: '69.5Wh with 60W or 100W USB-C ExpressCharge',
      display: '14.5-inch 3.2K (3200x2000) OLED Touchscreen (120Hz 100% DCI-P3)',
      processor: 'Intel Core Ultra 7 155H (16 cores, Intel Arc GPU + NPU)',
      storage: '512GB / 1TB / 2TB PCIe Gen 4 NVMe SSD',
      camera: '1080p FHD RGB-IR webcam with Windows Hello facial recognition',
      weight: '1.68 kg (3.7 lbs)',
      os: 'Windows 11 Home / Pro',
      connectivity: 'Wi-Fi 7, Bluetooth 5.4, 3x Thunderbolt 4, microSD card reader, 3.5mm audio jack'
    },
    pros: [
      'Gorgeous edge-to-edge minimalist CNC aluminum and Gorilla Glass chassis',
      'Vibrant 3.2K OLED touchscreen panel with deep 1,000,000:1 contrast',
      'Optional dedicated NVIDIA GeForce RTX 4050 mobile GPU'
    ],
    cons: [
      'Capacitive touch function keys and seamless trackpad require an adjustment curve',
      'Battery life drops significantly under demanding multi-threaded workloads'
    ]
  },
  {
    id: 'asus-rog-zephyrus-g14',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    brand: 'ASUS',
    category: 'Laptops',
    price: 1599.0,
    rating: 4.7,
    summary: 'Sleek ultra-portable gaming notebook with 3K 120Hz OLED ROG Nebula display, AMD Ryzen 9 8945HS, and NVIDIA RTX 4070.',
    specs: {
      battery: '73Wh battery with 100W USB-C PD and 180W fast barrel charger',
      display: '14.0-inch 3K (2880x1800) OLED 120Hz 0.2ms G-Sync ROG Nebula display',
      processor: 'AMD Ryzen 9 8945HS (8-core/16-thread with Ryzen AI NPU)',
      storage: '1TB / 2TB PCIe 4.0 NVMe M.2 SSD',
      camera: '1080p FHD IR Camera with Windows Hello',
      weight: '1.50 kg (3.3 lbs)',
      os: 'Windows 11 Home',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3, 1x USB4, 1x USB-C 3.2 Gen 2, 2x USB-A, HDMI 2.1, UHS-II SD'
    },
    pros: [
      'Incredible gaming and content creation power in a 1.5kg chassis',
      'Near-instantaneous 0.2ms response time on glossy 3K OLED panel',
      'Superb quad-speaker acoustic system with punchy bass'
    ],
    cons: [
      'Soldered LPDDR5X RAM cannot be upgraded after purchase',
      'Fans get audible under intensive AAA gaming loads'
    ]
  },

  // 3. Audio
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Audio',
    price: 399.99,
    rating: 4.7,
    summary: 'Industry standard over-ear noise cancelling headphones featuring dual V1/QN1 processors, 8 microphones, and Hi-Res LDAC.',
    specs: {
      battery: '30 hours with ANC enabled (40 hours with ANC off), 3-min quick charge = 3 hours',
      display: 'Capacitive touch gesture sensor cup (volume, skip, pause)',
      processor: 'Integrated Processor V1 + HD Noise Cancelling Processor QN1',
      storage: 'Integrated 32-bit audio DAC/amplifier',
      camera: '8 beamforming microphones with AI wind noise reduction',
      weight: '250 grams',
      connectivity: 'Bluetooth 5.2 (LDAC, AAC, SBC), Multipoint 2-device pairing, 3.5mm analog cable'
    },
    pros: [
      'Granular EQ presets and Hi-Res LDAC Bluetooth audio streaming support',
      'Superb 30-hour active battery longevity with quick USB-PD top-ups',
      'Ultra-lightweight ergonomic headband with soft-fit leather cups'
    ],
    cons: [
      'Earcups lay flat but do not fold inward into a ball for ultra-compact packing',
      'Voice calls can pick up heavy exterior wind noise outdoors'
    ]
  },
  {
    id: 'bose-quietcomfort-ultra',
    name: 'Bose QuietComfort Ultra Headphones',
    brand: 'Bose',
    category: 'Audio',
    price: 429.0,
    rating: 4.6,
    summary: 'World-class active noise cancellation with Bose Immersive Audio spatial sound and compact folding aluminum hinges.',
    specs: {
      battery: '24 hours runtime (18 hours with Immersive Audio mode active)',
      display: 'Physical tactile buttons + capacitive volume slider groove',
      processor: 'Custom Bose DSP with CustomTune sound calibration',
      storage: 'Qualcomm Snapdragon Sound aptX Adaptive certified',
      camera: '10-microphone array for voice pickup and external noise sampling',
      weight: '253 grams',
      connectivity: 'Bluetooth 5.3 (aptX Adaptive, AAC, SBC), Multipoint pairing, 2.5mm to 3.5mm cable'
    },
    pros: [
      'Best-in-class active noise cancellation that virtually silences airplanes and voices',
      'Collapsible folding hinge mechanism slips easily into small bags',
      'Bose Immersive Audio delivers a wide, out-of-head acoustic soundstage'
    ],
    cons: [
      'Battery life of 24 hours is shorter than Sony’s 30 hours',
      'Slightly higher retail price tag at $429'
    ]
  },
  {
    id: 'apple-airpods-max',
    name: 'Apple AirPods Max (USB-C)',
    brand: 'Apple',
    category: 'Audio',
    price: 549.0,
    rating: 4.5,
    summary: 'Luxury over-ear headphones with custom acoustic drivers, dual H1 computational chips, and precision Digital Crown.',
    specs: {
      battery: '20 hours listening with Active Noise Cancellation / Spatial Audio',
      display: 'Digital Crown for volume and playback + dedicated Noise Control button',
      processor: 'Dual Apple H1 headphone chips (10 audio cores per chip)',
      storage: 'High-fidelity dynamic driver designed by Apple',
      camera: '9 total microphones (8 for ANC, 3 for voice pickup)',
      weight: '384.8 grams',
      connectivity: 'Bluetooth 5.0, USB-C lossless audio input & charging'
    },
    pros: [
      'Superb build quality with stainless steel frame and anodized aluminum earcups',
      'Class-leading Transparency Mode sounds indistinguishable from real life',
      'Seamless Apple ecosystem switching between Mac, iPhone, and iPad'
    ],
    cons: [
      'Heaviest weight in class at 385 grams',
      'Smart Case offers minimal travel protection and no power switch on headset'
    ]
  },

  // 4. Wearables
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    category: 'Wearables',
    price: 799.0,
    rating: 4.8,
    summary: 'Rugged titanium adventure smartwatch with 3000-nit sapphire screen, dual-frequency GPS, and EN13319 scuba dive certification.',
    specs: {
      battery: 'Up to 36 hours regular use (up to 72 hours in Low Power Mode)',
      display: '49mm Titanium case, Sapphire Crystal OLED (3000 nits peak, 1 nit minimum)',
      processor: 'Apple S9 SiP with 64-bit dual-core processor and 4-core Neural Engine',
      storage: '64GB internal storage',
      camera: 'ECG, SpO2 blood oxygen, optical heart sensor, water temperature, depth gauge',
      weight: '61.4 grams (case only)',
      os: 'watchOS 11',
      connectivity: 'LTE & UMTS cellular, Precision Dual-frequency GPS (L1/L5), Wi-Fi 4, Bluetooth 5.3, UWB Gen 2'
    },
    pros: [
      'Full smartwatch convenience with seamless calls, cellular data, and Siri',
      'Ultra-bright 3000-nit display is readable under direct desert sunlight',
      'Certified EN13319 dive computer integration down to 40 meters'
    ],
    cons: [
      'Battery must still be recharged every 2 to 3 days',
      'Locked strictly to iPhone owners'
    ]
  },
  {
    id: 'garmin-fenix-8',
    name: 'Garmin Fenix 8 (47mm AMOLED)',
    brand: 'Garmin',
    category: 'Wearables',
    price: 999.99,
    rating: 4.9,
    summary: 'The ultimate multisport expedition GPS watch featuring multi-week battery life, leakproof inductive buttons, and offline topo maps.',
    specs: {
      battery: 'Up to 16 days in smartwatch mode (up to 47 hours continuous GPS tracking)',
      display: '1.4-inch AMOLED Sapphire crystal display (454x454 pixels)',
      processor: 'Garmin proprietary Multi-GNSS satellite chipset',
      storage: '32GB onboard topography & music storage',
      camera: 'Garmin Elevate Gen 5 Optical HR, ECG app, Pulse Ox, barometric altimeter, dive sensor',
      weight: '73 grams with band',
      os: 'Garmin OS (Compatible with iOS and Android)',
      connectivity: 'Multi-band GPS/GLONASS/Galileo, Wi-Fi, Bluetooth, ANT+, built-in speaker & microphone'
    },
    pros: [
      'Incredible multi-week 16-day battery endurance between charging sessions',
      'Deep athletic training metrics, endurance score, and offline topographical routing',
      'Universal compatibility with both Android and Apple iOS smartphones'
    ],
    cons: [
      'Limited third-party smartwatch apps compared to watchOS or Wear OS',
      'High starting price at $999'
    ]
  },
  {
    id: 'samsung-galaxy-watch-ultra',
    name: 'Samsung Galaxy Watch Ultra',
    brand: 'Samsung',
    category: 'Wearables',
    price: 649.99,
    rating: 4.6,
    summary: 'Rugged Grade 4 titanium smartwatch for Android users with 100-hour battery saver, BioActive Sensor, and Emergency Siren.',
    specs: {
      battery: '590 mAh with up to 100 hours in Power Saving (48 hours standard outdoor)',
      display: '1.5-inch Super AMOLED Sapphire Crystal (3000 nits peak)',
      processor: 'Exynos W1000 (3nm 5-core CPU)',
      storage: '32GB internal storage, 2GB RAM',
      camera: 'Samsung BioActive Sensor (Heart rate, ECG, BIA body composition, AGEs index)',
      weight: '60.5 grams (titanium cushion case)',
      os: 'Wear OS 5 with One UI 6 Watch',
      connectivity: 'LTE cellular, Dual-frequency GPS (L1+L5), Wi-Fi, Bluetooth 5.3, NFC'
    },
    pros: [
      'Fast 3nm Exynos processor powers fluid Wear OS animations and Google Maps',
      'Rugged 10ATM / IP68 water resistance with 86dB emergency safety siren',
      'Comprehensive body composition and metabolic health metrics'
    ],
    cons: [
      'Distinctive square cushion case styling is polarizing',
      'Several advanced health features require a paired Samsung Galaxy smartphone'
    ]
  },

  // 5. Tablets
  {
    id: 'ipad-pro-13-m4',
    name: 'iPad Pro 13 (M4)',
    brand: 'Apple',
    category: 'Tablets',
    price: 1299.0,
    rating: 4.8,
    summary: 'Thinnest Apple product ever at 5.1mm, featuring breakthrough Ultra Retina Tandem OLED display and desktop-grade M4 processor.',
    specs: {
      battery: '38.99Wh rechargeable lithium-polymer (up to 10 hours video/browsing)',
      display: '13.0-inch Ultra Retina XDR Tandem OLED (2752x2064 120Hz ProMotion 1000 nits full-screen)',
      processor: 'Apple M4 (9/10-core CPU, 10-core GPU with Ray Tracing, 16-core Neural Engine)',
      storage: '256GB / 512GB / 1TB / 2TB NVMe',
      camera: '12MP Wide rear with LiDAR scanner + Landscape 12MP Center Stage front',
      weight: '579 grams (5.1mm thickness)',
      os: 'iPadOS 18',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3, Thunderbolt / USB4 (40Gbps), Apple Pencil Pro support'
    },
    pros: [
      'Tandem OLED panel delivers 1000 nits full-screen brightness with infinite contrast',
      'Mind-boggling computing speed from the 3nm Apple M4 chip',
      'Ultra-svelte 5.1mm chassis feels remarkably light in the hand'
    ],
    cons: [
      'Apple Pencil Pro and Magic Keyboard add $400+ to total cost',
      'iPadOS window management still lacks full desktop macOS flexibility'
    ]
  },
  {
    id: 'samsung-galaxy-tab-s9-ultra',
    name: 'Samsung Galaxy Tab S9 Ultra',
    brand: 'Samsung',
    category: 'Tablets',
    price: 1199.99,
    rating: 4.6,
    summary: 'Colossal 14.6-inch AMOLED Android tablet with included S-Pen stylus, IP68 water resistance, and desktop Samsung DeX mode.',
    specs: {
      battery: '11200 mAh with 45W wired fast charging',
      display: '14.6-inch Dynamic AMOLED 2X (2960x1848 120Hz 16:10 aspect ratio)',
      processor: 'Qualcomm Snapdragon 8 Gen 2 for Galaxy',
      storage: '256GB / 512GB / 1TB (Expandable up to 1TB via microSD card)',
      camera: '13MP Main + 8MP Ultra-Wide rear + Dual 12MP front cameras',
      weight: '732 grams (5.5mm thickness)',
      os: 'Android 14 with One UI & Samsung DeX',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3, USB-C 3.2 Gen 1 (DisplayPort output)'
    },
    pros: [
      'Massive 14.6-inch OLED screen is unrivaled for side-by-side app multitasking',
      'Includes low-latency S-Pen in the box at no added fee',
      'Samsung DeX mode provides a true multi-window desktop interface'
    ],
    cons: [
      'Very large dimensions make it awkward to hold purely as a handheld tablet',
      'Snapdragon processor is significantly less potent than the Apple M4'
    ]
  },

  // 6. Gaming Consoles
  {
    id: 'playstation-5-slim',
    name: 'PlayStation 5 Slim',
    brand: 'Sony',
    category: 'Gaming Consoles',
    price: 499.99,
    rating: 4.8,
    summary: 'Redesigned compact PlayStation 5 with 1TB SSD, modular Ultra HD Blu-ray disc drive, and haptic DualSense controller.',
    specs: {
      battery: 'DualSense Wireless Controller (rechargeable ~6-10 hours playtime)',
      display: 'HDMI 2.1 supporting 4K 120Hz, 8K output, HDR, Variable Refresh Rate (VRR)',
      processor: 'Custom AMD Zen 2 (8-core/16-thread @ 3.5 GHz) + Custom RDNA 2 GPU (10.3 TFLOPS)',
      storage: '1TB Custom PCIe 4.0 NVMe SSD (Expandable with standard M.2 slot)',
      camera: 'Tempest 3D AudioTech hardware DSP engine',
      weight: '3.2 kg (with disc drive)',
      connectivity: 'Wi-Fi 6 (802.11ax), Gigabit Ethernet, Bluetooth 5.1, 2x USB-C front, 2x USB-A rear'
    },
    pros: [
      'Unrivaled catalog of narrative-driven first-party exclusive PlayStation titles',
      'DualSense controller delivers transformative haptic feedback and adaptive triggers',
      'Modular drive bay allows adding or removing the disc drive easily'
    ],
    cons: [
      'Vertical console stand is sold separately',
      'Cloud streaming is less versatile than Xbox Cloud Gaming on non-console devices'
    ]
  },
  {
    id: 'xbox-series-x',
    name: 'Xbox Series X',
    brand: 'Microsoft',
    category: 'Gaming Consoles',
    price: 499.99,
    rating: 4.7,
    summary: 'Most powerful Xbox console ever with 12 Teraflops of graphical compute, Quick Resume multi-game switching, and Game Pass.',
    specs: {
      battery: 'Xbox Wireless Controller (uses 2x AA batteries or optional rechargeable pack)',
      display: 'HDMI 2.1 supporting 4K 120Hz, Dolby Vision Gaming, Auto Low Latency Mode (ALLM)',
      processor: 'Custom AMD Zen 2 (8-core @ 3.8 GHz) + Custom RDNA 2 GPU (12.15 TFLOPS)',
      storage: '1TB Custom NVMe SSD (Expandable with proprietary Storage Expansion Card)',
      camera: 'Dolby Atmos and DTS:X 3D spatial audio support',
      weight: '4.45 kg',
      connectivity: 'Wi-Fi 5, Gigabit Ethernet, 3x USB-A 3.1 Gen 1, HDMI 2.1'
    },
    pros: [
      'Xbox Game Pass Ultimate delivers exceptional value with hundreds of titles',
      'Quick Resume lets you suspend and switch between multiple games in 5 seconds',
      'Deep backward compatibility across 4 generations of Xbox games'
    ],
    cons: [
      'Fewer critically acclaimed blockbuster first-party story exclusives',
      'Standard controller still uses AA batteries and lacks haptic triggers'
    ]
  },
  {
    id: 'nintendo-switch-oled',
    name: 'Nintendo Switch - OLED Model',
    brand: 'Nintendo',
    category: 'Gaming Consoles',
    price: 349.99,
    rating: 4.7,
    summary: 'Hybrid handheld and home console featuring a vivid 7-inch OLED screen, wide adjustable kickstand, and LAN port dock.',
    specs: {
      battery: '4310 mAh (approx. 4.5 to 9 hours portable play depending on game)',
      display: '7.0-inch OLED touchscreen (1280x720 handheld, 1080p docked via HDMI)',
      processor: 'NVIDIA Customized Tegra processor',
      storage: '64GB internal storage (Expandable up to 2TB via microSD)',
      camera: 'IR Motion Camera on Right Joy-Con + HD Rumble actuators',
      weight: '420 grams (with Joy-Con attached)',
      connectivity: 'Wi-Fi (802.11ac), Bluetooth 4.1, USB-C, LAN port on TV dock'
    },
    pros: [
      'Seamless on-the-go hybrid portability from living room TV to handheld',
      'Incredible library of Nintendo exclusives (Zelda, Mario, Pokémon, Smash)',
      'Vivid 7-inch OLED screen makes colors pop with deep black levels'
    ],
    cons: [
      'Graphical performance limited compared to PS5 and Xbox Series X',
      'Internal storage is only 64GB, requiring a microSD card for downloads'
    ]
  }
];

const LOCAL_STORAGE_KEY = 'specversus_products_catalog_v2';

// In-memory or LocalStorage Fallback Helper
const getStoredMockProducts = (): ProductItem[] => {
  if (typeof window === 'undefined') return defaultProducts;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProducts));
      return defaultProducts;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
  } catch {
    return defaultProducts;
  }
};

const saveStoredMockProducts = (products: ProductItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to localStorage:', err);
  }
};

// ==========================================
// CRUD OPERATIONS
// ==========================================

export async function getProducts(): Promise<ProductItem[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data && data.length > 0) {
        // Map database record to ProductItem
        return data.map((item: any) => ({
          id: item.id || item.slug,
          name: item.name,
          brand: item.brand,
          category: item.category,
          price: Number(item.price),
          rating: Number(item.rating),
          image: item.image,
          summary: item.summary,
          specs: typeof item.specs === 'object' ? item.specs : JSON.parse(item.specs || '{}'),
          pros: Array.isArray(item.pros) ? item.pros : JSON.parse(item.pros || '[]'),
          cons: Array.isArray(item.cons) ? item.cons : JSON.parse(item.cons || '[]')
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local catalog:', e);
    }
  }

  return getStoredMockProducts();
}

export async function getProductById(id: string): Promise<ProductItem | null> {
  const all = await getProducts();
  const found = all.find((p) => p.id === id || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id);
  return found || null;
}

export async function addProduct(product: ProductItem): Promise<ProductItem> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('products').insert([
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: product.price,
          rating: product.rating,
          image: product.image || null,
          summary: product.summary || null,
          specs: product.specs,
          pros: product.pros,
          cons: product.cons
        }
      ]).select();

      if (!error && data && data[0]) {
        return product;
      }
    } catch (e) {
      console.warn('Supabase insert failed, persisting to local storage:', e);
    }
  }

  const existing = getStoredMockProducts();
  const updated = [product, ...existing.filter((p) => p.id !== product.id)];
  saveStoredMockProducts(updated);
  return product;
}

export async function updateProduct(id: string, updates: Partial<ProductItem>): Promise<ProductItem> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          brand: updates.brand,
          category: updates.category,
          price: updates.price,
          rating: updates.rating,
          image: updates.image,
          summary: updates.summary,
          specs: updates.specs,
          pros: updates.pros,
          cons: updates.cons
        })
        .eq('id', id)
        .select();

      if (!error && data && data[0]) {
        const item = data[0];
        return {
          id: item.id,
          name: item.name,
          brand: item.brand,
          category: item.category,
          price: Number(item.price),
          rating: Number(item.rating),
          image: item.image,
          summary: item.summary,
          specs: typeof item.specs === 'object' ? item.specs : JSON.parse(item.specs || '{}'),
          pros: Array.isArray(item.pros) ? item.pros : JSON.parse(item.pros || '[]'),
          cons: Array.isArray(item.cons) ? item.cons : JSON.parse(item.cons || '[]')
        };
      }
    } catch (e) {
      console.warn('Supabase update failed, updating local storage:', e);
    }
  }

  const existing = getStoredMockProducts();
  const index = existing.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Product ${id} not found`);

  const updatedItem: ProductItem = {
    ...existing[index],
    ...updates,
    specs: { ...existing[index].specs, ...updates.specs }
  };

  existing[index] = updatedItem;
  saveStoredMockProducts(existing);
  return updatedItem;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase delete failed, deleting from local storage:', e);
    }
  }

  const existing = getStoredMockProducts();
  const filtered = existing.filter((p) => p.id !== id);
  saveStoredMockProducts(filtered);
  return true;
}

export async function resetToDefaultCatalog(): Promise<ProductItem[]> {
  saveStoredMockProducts(defaultProducts);
  return defaultProducts;
}

export function exportProductsJson(products: ProductItem[]): string {
  return JSON.stringify(products, null, 2);
}
