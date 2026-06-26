import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppInstallMeta from "../components/AppInstallMeta";

const API = process.env.NEXT_PUBLIC_API_URL || "https://white-glove-backend-production-5a7d.up.railway.app";

async function fetchTradeInPromos() {
  try {
    const res = await fetch(`${API}/api/trade-in-promos`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data.promos) ? data.promos : [];
  } catch (err) {
    console.warn("[landing] could not load trade-in promos:", err.message);
    return [];
  }
}

async function fetchDevices(search = "") {
  try {
    const url = new URL(`${API}/api/devices`);
    if (search) url.searchParams.set("search", search);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data.devices) ? data.devices : [];
  } catch (err) {
    console.warn("[landing] could not load devices:", err.message);
    return [];
  }
}

const DEFAULT_TRADE_IN_TIERS = [
  { tier: "Premium", promo_credit: 1000, eligible_devices: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 16 Pro Max", "iPhone 16 Pro", "Galaxy S24 Ultra", "Galaxy Z Fold6", "Galaxy Z Fold7", "Pixel 9 Pro XL", "Pixel 9 Pro", "Motorola Razr+ (2024)"], example_models: ["iPhone 15 Pro Max", "iPhone 16 Pro Max", "Galaxy S24 Ultra", "Galaxy Z Fold7", "Pixel 9 Pro XL"], color: "#34d399" },
  { tier: "High", promo_credit: 800, eligible_devices: ["iPhone 15 Plus", "iPhone 15", "iPhone 16 Plus", "iPhone 16", "Galaxy S24+", "Galaxy S24", "Galaxy S25+", "Galaxy S25", "Galaxy Z Flip6", "Galaxy Z Flip7", "Pixel 9", "Pixel 9 Pro Fold"], example_models: ["iPhone 15", "iPhone 16", "Galaxy S24", "Galaxy Z Flip7", "Pixel 9 Pro Fold"], color: "#2dd4bf" },
  { tier: "Mid", promo_credit: 600, eligible_devices: ["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14", "iPhone 13 Pro Max", "iPhone 13 Pro", "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy S22 Ultra", "Galaxy Z Fold5", "Galaxy Z Flip5", "Pixel 8 Pro", "Pixel 8", "Pixel 8a"], example_models: ["iPhone 14", "iPhone 13 Pro", "Galaxy S23", "Pixel 8 Pro"], color: "#fbbf24" },
  { tier: "Standard", promo_credit: 400, eligible_devices: ["iPhone 13", "iPhone 13 mini", "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "Galaxy S22+", "Galaxy S22", "Galaxy S21 Ultra", "Galaxy S21+", "Galaxy S21", "Galaxy Z Fold4", "Galaxy Z Flip4", "Pixel 7 Pro", "Pixel 7", "Pixel 7a", "Motorola Razr (2024)"], example_models: ["iPhone 13", "Galaxy S22", "Pixel 7 Pro", "Motorola Razr (2024)"], color: "#60a5fa" },
  { tier: "Base", promo_credit: 200, eligible_devices: ["iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max", "iPhone SE (3rd gen)", "iPhone SE (2nd gen)", "Galaxy S20", "Galaxy S20+", "Galaxy S20 Ultra", "Galaxy S21 FE", "Galaxy Note20", "Galaxy Note20 Ultra", "Pixel 6", "Pixel 6 Pro", "Pixel 6a", "Pixel 5", "Pixel 5a", "OnePlus 11", "OnePlus 10 Pro", "LG V60", "LG Velvet"], example_models: ["iPhone 11", "Galaxy S20", "Pixel 6", "OnePlus 11"], color: "#94a3b8" },
  { tier: "Trade-in value only", promo_credit: 0, eligible_devices: ["Older or damaged devices not listed above"], example_models: ["Older iPhone, Android, or feature phones"], color: "#64748b" },
];

// AT&T Unlimited 2.0 consumer plans — per-line pricing for 1, 2, 3, 4, 5+ lines.
const ATT_PLANS = [
  {
    id: "unlimited_starter",
    name: "AT&T Unlimited 2.0 Starter SL",
    shortName: "Starter SL",
    pricePerLine: [65.99, 60.99, 50.99, 45.99, 35.99],
    features: "Unlimited talk, text & data · SD streaming · 3 GB hotspot",
    recommendedFor: "Light streamers and budget-conscious households",
  },
  {
    id: "unlimited_extra",
    name: "AT&T Unlimited 2.0 Extra EL",
    shortName: "Extra EL",
    pricePerLine: [75.99, 65.99, 55.99, 50.99, 40.99],
    features: "Unlimited talk, text & data · 50 GB premium data · 15 GB hotspot",
    recommendedFor: "Most families and remote workers",
  },
  {
    id: "unlimited_premium",
    name: "AT&T Unlimited 2.0 Premium PL",
    shortName: "Premium PL",
    pricePerLine: [85.99, 75.99, 65.99, 60.99, 50.99],
    features: "Unlimited talk, text & data · Unlimited premium data · 50 GB hotspot · 4K UHD streaming",
    recommendedFor: "Power users and heavy streamers",
  },
];

function getAttPlanPrice(planId, lines) {
  const plan = ATT_PLANS.find(p => p.id === planId) || ATT_PLANS[1];
  const idx = Math.max(0, Math.min(lines - 1, plan.pricePerLine.length - 1));
  return plan.pricePerLine[idx];
}

function applyPlanDiscounts(basePricePerLine, lines, discounts) {
  // AT&T does not stack most discounts — apply the single best eligible discount.
  const { is55Plus, isMilitary, isTeacher, hasEmployerDiscount } = discounts || {};

  const candidates = [];
  if (is55Plus) candidates.push({ type: "55+", amount: 10 * lines, label: "55+ discount" }); // $10 off per line
  if (isMilitary) candidates.push({ type: "military", factor: 0.25, label: "Military / veteran discount" });
  if (isTeacher) candidates.push({ type: "teacher", factor: 0.25, label: "Teacher discount" });
  if (hasEmployerDiscount) candidates.push({ type: "employer", factor: 0.15, label: "Employer discount" });

  if (!candidates.length) return { pricePerLine: basePricePerLine, totalDiscount: 0, discountLabel: null };

  // Choose the discount that saves the most per month.
  let best = candidates[0];
  let bestSavings = best.factor ? basePricePerLine * lines * best.factor : best.amount;
  for (const c of candidates) {
    const savings = c.factor ? basePricePerLine * lines * c.factor : c.amount;
    if (savings > bestSavings) {
      best = c;
      bestSavings = savings;
    }
  }

  const totalDiscount = best.factor ? basePricePerLine * lines * best.factor : best.amount;
  const newTotal = Math.max(0, basePricePerLine * lines - totalDiscount);
  return {
    pricePerLine: newTotal / lines,
    totalDiscount,
    discountLabel: best.label,
  };
}

// Default device catalog for financing estimates (36-month device payments).
// The landing page will fetch the live catalog from /api/devices when available.
const DEFAULT_DEVICES = [
  { id: "iphone-17-pro-max", slug: "iphone-17-pro-max", name: "iPhone 17 Pro Max", brand: "Apple", full_price: 1199, monthly_payment: 33.31, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "iphone-17-pro", slug: "iphone-17-pro", name: "iPhone 17 Pro", brand: "Apple", full_price: 999, monthly_payment: 27.75, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "iphone-17", slug: "iphone-17", name: "iPhone 17", brand: "Apple", full_price: 799, monthly_payment: 22.19, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "iphone-17e", slug: "iphone-17e", name: "iPhone 17e", brand: "Apple", full_price: 599, monthly_payment: 16.64, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_starter", "unlimited_extra", "unlimited_premium"] },
  { id: "iphone-16", slug: "iphone-16", name: "iPhone 16", brand: "Apple", full_price: 699, monthly_payment: 19.42, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_starter", "unlimited_extra", "unlimited_premium"] },
  { id: "galaxy-s26-ultra", slug: "galaxy-s26-ultra", name: "Samsung Galaxy S26 Ultra", brand: "Samsung", full_price: 1299, monthly_payment: 36.08, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "galaxy-s26-plus", slug: "galaxy-s26-plus", name: "Samsung Galaxy S26+", brand: "Samsung", full_price: 1099, monthly_payment: 30.53, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "galaxy-s26", slug: "galaxy-s26", name: "Samsung Galaxy S26", brand: "Samsung", full_price: 899, monthly_payment: 24.97, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "galaxy-z-fold7", slug: "galaxy-z-fold7", name: "Galaxy Z Fold7", brand: "Samsung", full_price: 1899, monthly_payment: 52.75, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "galaxy-z-flip7", slug: "galaxy-z-flip7", name: "Galaxy Z Flip7", brand: "Samsung", full_price: 999, monthly_payment: 27.75, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "pixel-10-pro", slug: "pixel-10-pro", name: "Pixel 10 Pro", brand: "Google", full_price: 999, monthly_payment: 27.75, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_extra", "unlimited_premium"] },
  { id: "pixel-10", slug: "pixel-10", name: "Pixel 10", brand: "Google", full_price: 799, monthly_payment: 22.19, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_starter", "unlimited_extra", "unlimited_premium"] },
  { id: "motorola-razr", slug: "motorola-razr", name: "Motorola Razr", brand: "Motorola", full_price: 699, monthly_payment: 19.42, financing_months: 36, qualifies_for_trade_in_promo: true, requires_plan: ["unlimited_starter", "unlimited_extra", "unlimited_premium"] },
];

const FINANCING_MONTHS = 36;
const AUTOPAY_DISCOUNT_PER_LINE = 10;

function getPhone(deviceCatalog, nameOrId) {
  return deviceCatalog.find(p => p.id === nameOrId || p.slug === nameOrId || p.name === nameOrId) || null;
}

function monthlyDevicePayment(fullPrice, downPayment = 0, months = FINANCING_MONTHS) {
  return Math.max(0, (fullPrice - downPayment) / months);
}

function promoQualifiesForPlan(planId) {
  // Max trade-in promo credits require a qualifying AT&T Unlimited 2.0 plan.
  // Starter SL typically does not qualify for the full promotional credits.
  return planId === "unlimited_premium" || planId === "unlimited_extra";
}

function effectivePromoCredit(promoCredit, planId) {
  if (!promoQualifiesForPlan(planId)) return 0;
  return promoCredit || 0;
}

function normalizeDeviceName(name) {
  // Keep letters, numbers, spaces, and '+' (e.g. Razr+ vs Razr). Replace everything else with space.
  return String(name || "").toLowerCase().replace(/[^a-z0-9\s+]/g, " ").replace(/\s+/g, " ").trim();
}

function deviceBaseName(name) {
  return normalizeDeviceName(name)
    .replace(/\b(pro max|pro|plus|ultra|max|mini|fe|5g|fold|flip)\b/g, "")
    .replace(/\+\s/g, " ")
    .replace(/\s\+/g, " ")
    .replace(/^\+|\+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findPromoForDevice(deviceName, promos) {
  if (!deviceName || !promos?.length) return null;
  const target = normalizeDeviceName(deviceName);
  const targetBase = deviceBaseName(deviceName);

  const candidates = [];
  for (const promo of promos) {
    const devices = Array.isArray(promo.eligible_devices) ? promo.eligible_devices : [];
    for (const d of devices) {
      const dn = normalizeDeviceName(d);
      if (!dn) continue;
      const exact = target === dn;
      const contains = dn.includes(target) || target.includes(dn);
      const baseMatch = targetBase && targetBase === deviceBaseName(d);
      if (exact) return promo;
      if (contains || baseMatch) {
        candidates.push({ promo, specificity: dn.split(" ").length, deviceName: d });
      }
    }
  }

  if (candidates.length) {
    candidates.sort((a, b) => b.specificity - a.specificity);
    return candidates[0].promo;
  }

  return promos.find(p => p.tier === "Trade-in value only") || promos[promos.length - 1] || null;
}

const PRODUCTS = [
  {
    id: "wgw",
    name: "White Glove Wireless",
    label: "Sales OS",
    description: "AI sales, bill review, field reps, outreach, appointments, and owner controls for wireless teams.",
    logo: "/logos/white-glove-wireless-app-icon-selected.png",
    href: "/wireless",
    accent: "#00A8E0",
  },
  {
    id: "spendsense",
    name: "SpendSense",
    label: "Finance OS",
    description: "Connected spending intelligence, financial guidance, and owner-level money visibility.",
    logo: "/logos/spendsense-brand-lockup-selected.png",
    href: "/spendsense",
    accent: "#2dd4bf",
  },
  {
    id: "sales-platform",
    name: "Sales Platform",
    label: "Configurable CRM",
    description: "A white-label SaaS foundation for industry-specific pipelines, roles, and workflows.",
    logo: "/logos/sales-platform-app-icon-selected.png",
    href: "/sales-platform",
    accent: "#a78bfa",
  },
  {
    id: "repairscout",
    name: "RepairScout",
    label: "Repair intelligence",
    description: "AI diagnostics and quote context for drivers who need a clearer repair path.",
    logo: "/logos/repairscout-brand-lockup-selected.png",
    href: "/repairscout",
    accent: "#c8ff18",
  },
  {
    id: "trucktracker",
    name: "TruckTracker",
    label: "Local discovery",
    description: "Live food truck maps, follow signals, and local commerce discovery tools.",
    logo: "/logos/trucktracker-app-icon-selected.png",
    href: "/trucktracker",
    accent: "#ffb21c",
  },
  {
    id: "poopsense",
    name: "PoopSense",
    label: "Pet health AI",
    description: "Browser-based clinical image analysis for pet stool health and urgency reports.",
    logo: "/logos/poopsense-app-icon.svg",
    href: "https://web-production-fb2d1.up.railway.app/",
    accent: "#fb7185",
  },
  {
    id: "the-pass",
    name: "The Pass",
    label: "AI kitchen",
    description: "A multi-model chef brigade that turns ingredients into usable recipes.",
    logo: "/logos/the-pass-app-icon.svg",
    href: "/the-pass",
    accent: "#e8541e",
  },
];

const SYSTEM_STEPS = [
  ["01", "Upload the bill", "Send us a photo, PDF, or text of your current wireless or fiber bill."],
  ["02", "Compare your savings", "We analyze your plan, usage, and current provider to find what AT&T can save you."],
  ["03", "Order from home", "Pick your devices or fiber plan and check out online — no store visit required."],
  ["04", "Get it set up", "Next-day delivery plus personalized setup so everything works before we leave."],
];

const ATT_FEATURES = [
  {
    icon: "📱",
    title: "Latest iPhone & Android Devices",
    description: "Get the newest iPhone 17 series, Samsung Galaxy S26 series, Google Pixel 10 series, and Motorola Razr with flexible payment options.",
  },
  {
    icon: "🔄",
    title: "Seamless Switching",
    description: "We handle the entire porting process. Keep your number, transfer contacts, and switch carriers hassle-free.",
  },
  {
    icon: "💰",
    title: "Trade-In Deals",
    description: "Get instant credit for your old devices. We accept phones from any carrier - cracked screens and all.",
  },
  {
    icon: "📡",
    title: "5G Coverage",
    description: "Access America's most reliable 5G network with coverage in 99% of the U.S. population.",
  },
  {
    icon: "🎁",
    title: "Switching Bonuses",
    description: "Exclusive offers for new customers including bill credits, free devices, and premium accessories.",
  },
  {
    icon: "🛡️",
    title: "Device Protection",
    description: "Comprehensive protection plans with next-day device replacement and unlimited screen repairs.",
  },
];

const PHONE_CATEGORIES = [
  {
    category: "iPhone",
    phones: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17", "iPhone 17e", "iPhone 16"],
    accent: "#f59e0b",
  },
  {
    category: "Samsung Galaxy",
    phones: ["Galaxy S26 Ultra", "Galaxy S26+", "Galaxy S26", "Galaxy Z Fold7", "Galaxy Z Flip7"],
    accent: "#3b82f6",
  },
  {
    category: "Google Pixel & More",
    phones: ["Pixel 10 Pro", "Pixel 10", "Pixel 10a", "Motorola Razr"],
    accent: "#10b981",
  },
];

const TRADE_IN_BRANDS = [
  "Apple", "Samsung", "Google", "Motorola", "LG", "OnePlus", "Any Other Brand"
];

const DEVICE_VALUES = {
  "iPhone 17 Pro Max": 950,
  "iPhone 17 Pro": 800,
  "iPhone 17": 650,
  "iPhone 17e": 500,
  "iPhone 16": 430,
  "iPhone 15": 320,
  "iPhone 14": 220,
  "iPhone 13": 160,
  "iPhone 12": 120,
  "iPhone 11": 90,
  "iPhone SE": 60,
  "Samsung Galaxy S26 Ultra": 850,
  "Samsung Galaxy S26+": 700,
  "Samsung Galaxy S26": 550,
  "Samsung Galaxy S25": 380,
  "Samsung Galaxy S24": 260,
  "Samsung Galaxy S23": 180,
  "Samsung Galaxy S22": 140,
  "Samsung Galaxy S21": 100,
  "Galaxy Z Fold7": 600,
  "Galaxy Z Flip7": 450,
  "Galaxy Z Fold6": 480,
  "Galaxy Z Flip6": 360,
  "Pixel 10 Pro": 600,
  "Pixel 10": 450,
  "Pixel 10a": 300,
  "Pixel 9": 210,
  "Pixel 8": 150,
  "Pixel 7": 110,
  "Motorola Razr": 350,
  "Motorola Razr (2024)": 280,
  "Other Premium": 100,
  "Mid-range Device": 50,
  "Budget Device": 25,
};

const TRADE_IN_SHOWCASE = [
  "iPhone 16", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone SE",
  "Samsung Galaxy S25", "Samsung Galaxy S24", "Samsung Galaxy S23", "Samsung Galaxy S22", "Samsung Galaxy S21",
  "Galaxy Z Fold6", "Galaxy Z Flip6", "Pixel 9", "Pixel 8", "Pixel 7", "Motorola Razr (2024)",
];

function ProductLink({ product }) {
  const external = product.href.startsWith("http");
  const content = (
    <article className="product" style={{ "--accent": product.accent }}>
      <Image src={product.logo} alt={`${product.name} logo`} width={56} height={56} className="product-logo" />
      <div>
        <span>{product.label}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    </article>
  );
  if (external) return <a href={product.href} target="_blank" rel="noreferrer">{content}</a>;
  return <Link href={product.href}>{content}</Link>;
}

export default function Home() {
  const [tradeInPromos, setTradeInPromos] = useState(DEFAULT_TRADE_IN_TIERS);
  const [promosLoaded, setPromosLoaded] = useState(false);
  const [deviceCatalog, setDeviceCatalog] = useState(DEFAULT_DEVICES);
  const [devicesLoaded, setDevicesLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchTradeInPromos().then(promos => {
      if (!mounted) return;
      if (promos.length > 0) {
        // Preserve color fallback for tiers that come back without a color.
        const colored = promos.map(p => {
          const def = DEFAULT_TRADE_IN_TIERS.find(d => d.tier === p.tier);
          return { ...p, color: p.color || (def && def.color) || "#94a3b8" };
        });
        setTradeInPromos(colored);
      }
      setPromosLoaded(true);
    });
    fetchDevices().then(devices => {
      if (!mounted) return;
      if (devices.length > 0) {
        setDeviceCatalog(devices.map(d => ({ ...d, id: d.slug || d.id })));
      }
      setDevicesLoaded(true);
    });
    return () => { mounted = false; };
  }, []);

  const [form, setForm] = useState({
    customer_type: "consumer",
    name: "",
    business_name: "",
    phone: "",
    email: "",
    current_provider: "",
    monthly_bill: "",
    lines: "",
    zip: "",
    notes: "",
    permission_to_contact: false,
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ kind: "idle", message: "" });
  
  // Sophia AI Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I'm Sophia, your White Glove Wireless assistant. I can help you with AT&T switching, phone upgrades, trade-in quotes, or any questions about our services. How can I help you today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Quote Calculator State
  const [calculator, setCalculator] = useState({
    currentBill: "",
    lines: "",
    currentProvider: "",
    attPlan: "unlimited_extra",
    wantsNewPhone: false,
    newPhones: [], // { id, phoneId, name, fullPrice }
    newPhoneSearch: "",
    dataUsage: "medium",
    tradeIns: [], // { id, device, condition, value, promoCredit, promoTier, color }
    tradeInSearch: "",
    is55Plus: false,
    isMilitary: false,
    isTeacher: false,
    hasEmployerDiscount: false,
    autopay: true,
  });
  const [tradeInSuggestions, setTradeInSuggestions] = useState([]);
  const [showTradeInSuggestions, setShowTradeInSuggestions] = useState(false);
  const [newPhoneSuggestions, setNewPhoneSuggestions] = useState([]);
  const [showNewPhoneSuggestions, setShowNewPhoneSuggestions] = useState(false);
  const [quoteStep, setQuoteStep] = useState(0);
  const [quoteResult, setQuoteResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const update = event => {
    const { name, value, type, checked } = event.target;
    setForm(current => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  // Sophia AI Chat Functions
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: "user", content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = userMessage.content.toLowerCase();
      
      if (lowerInput.includes("switch") || lowerInput.includes("at&t")) {
        aiResponse = "Great question! Switching to AT&T with White Glove Wireless is seamless. We handle the entire porting process, you keep your number, and you'll get access to America's most reliable 5G network. Plus, we have exclusive switching bonuses including bill credits and device deals. Would you like me to help you start the switching process?";
      } else if (lowerInput.includes("phone") || lowerInput.includes("iphone") || lowerInput.includes("samsung")) {
        aiResponse = "We have the latest devices available! Including iPhone 17 series, Samsung Galaxy S26 series, Google Pixel 10 series, Motorola Razr, and more. With flexible payment options and trade-in deals, upgrading is affordable. What type of phone are you interested in?";
      } else if (lowerInput.includes("trade") || lowerInput.includes("credit")) {
        aiResponse = "Our trade-in program is fantastic! We accept phones from any carrier regardless of condition - even cracked screens qualify. You get instant credit toward a new device. Just upload your current bill in the form above, and I can help estimate your trade-in value. What device are you currently using?";
      } else if (lowerInput.includes("quote") || lowerInput.includes("price") || lowerInput.includes("cost")) {
        aiResponse = "I'd be happy to help you get a quote! The fastest way is to upload your current wireless bill using the form on this page. Our AI team will analyze it and provide personalized savings recommendations. You can also use our interactive calculator coming soon. What's your current monthly bill roughly?";
      } else if (lowerInput.includes("help") || lowerInput.includes("hello") || lowerInput.includes("hi")) {
        aiResponse = "Hello! I'm here to help you with anything related to White Glove Wireless services. I can assist with AT&T switching information, phone upgrades, trade-in quotes, bill reviews, or answer any questions you might have. What would you like to know more about?";
      } else {
        aiResponse = "Thanks for your question! I can help you with AT&T switching, new phones, trade-in deals, and bill reviews. For specific quotes, I recommend uploading your bill using the form on this page so our team can give you personalized recommendations. Is there anything specific about our services you'd like to know more about?";
      }

      setChatMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  // Quote Calculator Functions
  const updateCalculator = (field, value) => {
    setCalculator(prev => ({ ...prev, [field]: value }));
  };

  const toggleDiscount = (field) => {
    setCalculator(prev => ({ ...prev, [field]: !prev[field] }));
  };

  function getConditionMultiplier(condition) {
    if (condition === "excellent") return 1.2;
    if (condition === "good") return 1;
    if (condition === "fair") return 0.7;
    if (condition === "poor") return 0.4;
    return 1;
  }

  function adjustTradeInValue(value, condition) {
    return (value || 0) * getConditionMultiplier(condition);
  }

  function getTradeInSuggestions(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return Object.keys(DEVICE_VALUES)
      .filter(d => d.toLowerCase().includes(q))
      .slice(0, 8);
  }

  function addTradeIn(device) {
    const value = DEVICE_VALUES[device] || 0;
    const promo = findPromoForDevice(device, tradeInPromos) || {};
    const tradeIn = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      device,
      condition: "good",
      value,
      promoCredit: promo.promo_credit || 0,
      promoTier: promo.tier || "Trade-in value only",
      color: promo.color || "#94a3b8",
    };
    setCalculator(prev => ({
      ...prev,
      tradeIns: [...prev.tradeIns, tradeIn],
      tradeInSearch: "",
    }));
    setShowTradeInSuggestions(false);
    setTradeInSuggestions([]);
  }

  function updateTradeIn(id, updates) {
    setCalculator(prev => ({
      ...prev,
      tradeIns: prev.tradeIns.map(t => {
        if (t.id !== id) return t;
        const next = { ...t, ...updates };
        if (updates.condition) {
          next.value = adjustTradeInValue(DEVICE_VALUES[t.device] || 0, next.condition);
        }
        return next;
      }),
    }));
  }

  function removeTradeIn(id) {
    setCalculator(prev => ({ ...prev, tradeIns: prev.tradeIns.filter(t => t.id !== id) }));
  }

  function getNewPhoneSuggestions(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return deviceCatalog.filter(p => p.name.toLowerCase().includes(q)).slice(0, 8);
  }

  function addNewPhone(phone) {
    setCalculator(prev => ({
      ...prev,
      newPhones: [...prev.newPhones, {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
        phoneId: phone.id || phone.slug,
        name: phone.name,
        fullPrice: phone.full_price,
        monthlyPayment: phone.monthly_payment,
      }],
      newPhoneSearch: "",
    }));
    setShowNewPhoneSuggestions(false);
    setNewPhoneSuggestions([]);
  }

  function removeNewPhone(id) {
    setCalculator(prev => ({ ...prev, newPhones: prev.newPhones.filter(p => p.id !== id) }));
  }

  const calculateQuote = async () => {
    setIsCalculating(true);

    const currentBill = parseFloat(calculator.currentBill) || 0;
    const lines = Math.max(1, parseInt(calculator.lines) || 1);
    const basePlanPricePerLine = getAttPlanPrice(calculator.attPlan, lines);
    const discounted = applyPlanDiscounts(basePlanPricePerLine, lines, {
      is55Plus: calculator.is55Plus,
      isMilitary: calculator.isMilitary,
      isTeacher: calculator.isTeacher,
      hasEmployerDiscount: calculator.hasEmployerDiscount,
    });

    // Autopay/paperless discount ($10/line on Unlimited 2.0 plans).
    const autopayDiscount = calculator.autopay ? AUTOPAY_DISCOUNT_PER_LINE * lines : 0;
    const planTotalAfterAutopay = Math.max(0, discounted.pricePerLine * lines - autopayDiscount);
    const planPricePerLineAfterAutopay = planTotalAfterAutopay / lines;

    // Trade-in totals — promo credits require a qualifying plan.
    const tradeInDetails = calculator.tradeIns.map(t => {
      const adjustedValue = adjustTradeInValue(t.value, t.condition);
      const promoCredit = effectivePromoCredit(t.promoCredit, calculator.attPlan);
      return {
        ...t,
        adjustedValue,
        promoCredit,
        monthlyPromoCredit: promoCredit / FINANCING_MONTHS,
      };
    });
    const totalTradeInValue = tradeInDetails.reduce((sum, t) => sum + t.adjustedValue, 0);
    const totalPromoCredit = tradeInDetails.reduce((sum, t) => sum + t.promoCredit, 0);
    const totalMonthlyPromoCredit = totalPromoCredit / FINANCING_MONTHS;
    const promoRequiresQualifyingPlan = calculator.tradeIns.length > 0 && !promoQualifiesForPlan(calculator.attPlan);

    // New phone financing (36 months). Trade-in value is kept separate as bill credits;
    // promo credits reduce the financed amount evenly over 36 months.
    const newPhoneDetails = calculator.newPhones.map(p => {
      const device = getPhone(deviceCatalog, p.phoneId) || p;
      const fullPrice = device.full_price || p.fullPrice || 0;
      const months = device.financing_months || FINANCING_MONTHS;
      const monthlyPayment = p.monthlyPayment || monthlyDevicePayment(fullPrice, 0, months);
      const monthlyCredit = totalMonthlyPromoCredit / calculator.newPhones.length;
      const netMonthlyPayment = Math.max(0, monthlyPayment - monthlyCredit);
      return { ...p, fullPrice, monthlyPayment, netMonthlyPayment };
    });
    const totalPhoneMonthlyPayment = newPhoneDetails.reduce((sum, p) => sum + p.monthlyPayment, 0);
    const totalNetPhoneMonthlyPayment = newPhoneDetails.reduce((sum, p) => sum + p.netMonthlyPayment, 0);

    const newMonthlyBill = planTotalAfterAutopay + totalNetPhoneMonthlyPayment;
    const monthlySavings = Math.max(0, currentBill - newMonthlyBill);
    const annualSavings = monthlySavings * 12;
    const firstBillWithCredit = Math.max(0, planTotalAfterAutopay - totalTradeInValue) + totalNetPhoneMonthlyPayment;
    const firstYearTotalValue = annualSavings + totalTradeInValue + totalPromoCredit;

    const quoteData = {
      currentBill,
      lines,
      attPlan: ATT_PLANS.find(p => p.id === calculator.attPlan) || ATT_PLANS[1],
      basePlanPricePerLine,
      planTotalBeforeAutopay: discounted.pricePerLine * lines,
      newMonthlyBill,
      monthlySavings,
      annualSavings,
      totalTradeInValue,
      totalPromoCredit,
      totalMonthlyPromoCredit,
      tradeInDetails,
      newPhoneDetails,
      totalPhoneMonthlyPayment,
      totalNetPhoneMonthlyPayment,
      firstBillWithCredit,
      firstYearTotalValue,
      perLineSavings: monthlySavings / lines,
      perLineNewBill: planPricePerLineAfterAutopay,
      discountLabel: discounted.discountLabel,
      totalDiscount: discounted.totalDiscount,
      autopayDiscount,
      autopay: calculator.autopay,
      promoRequiresQualifyingPlan,
      financingMonths: FINANCING_MONTHS,
    };

    // Try to get real-time quote from API
    try {
      const response = await fetch(`${API}/api/quote-generation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_provider: calculator.currentProvider,
          monthly_bill: calculator.currentBill,
          lines: calculator.lines,
          att_plan: calculator.attPlan,
          trade_ins: calculator.tradeIns.map(t => ({ device: t.device, condition: t.condition })),
          data_usage: calculator.dataUsage,
          customer_type: 'consumer',
        }),
      });

      if (response.ok) {
        const apiQuote = await response.json();
        setQuoteResult({ ...quoteData, ...apiQuote, isRealQuote: true });
      } else {
        setQuoteResult({ ...quoteData, isRealQuote: false });
      }
    } catch (error) {
      console.log('API quote generation failed, using estimate:', error);
      setQuoteResult({ ...quoteData, isRealQuote: false });
    } finally {
      setIsCalculating(false);
    }
  };

  const submitBill = async event => {
    event.preventDefault();
    setStatus({ kind: "loading", message: "Sending the bill review to the AI team..." });
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, String(value)));
      if (file) body.append("bill", file);
      const res = await fetch(`${API}/api/public-bill-intake`, { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Bill upload failed.");
      setStatus({
        kind: "success",
        message: `Submitted to the ${data.pipeline} pipeline. ${data.ai_assignments?.length || 0} AI team task(s) created.`,
      });
      setForm(current => ({
        ...current,
        name: "",
        business_name: "",
        phone: "",
        email: "",
        current_provider: "",
        monthly_bill: "",
        lines: "",
        zip: "",
        notes: "",
        permission_to_contact: false,
      }));
      setFile(null);
      event.target.reset();
    } catch (error) {
      setStatus({ kind: "error", message: error.message });
    }
  };

  return (
    <>
      <Head>
        <title>White Glove Wireless - Wireless & Fiber Without the Store</title>
        <meta
          name="description"
          content="Switch to AT&T wireless and fiber from your couch. Next-day delivery, personalized setup, no store upsells — upload your bill and see your savings."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppInstallMeta slug="portfolio" name="White Glove Wireless" themeColor="#070707" />

      <style jsx global>{`
        :root {
          color-scheme: dark;
          --page: #070707;
          --ink: #f8fafc;
          --muted: #94a3b8;
          --soft: #cbd5e1;
          --line: rgba(255,255,255,.12);
          --att: #00A8E0;
          --att-soft: rgba(0,168,224,.18);
          --att-glow: rgba(0,168,224,.35);
          --amber: #f59e0b;
          --amber-soft: rgba(245,158,11,.18);
          --green: #34d399;
          --blue: #60a5fa;
        }
        * { box-sizing: border-box; }
        html { background: var(--page); scroll-behavior: smooth; }
        body {
          margin: 0;
          min-width: 320px;
          color: var(--ink);
          font-family: "Manrope", sans-serif;
          background:
            radial-gradient(circle at 82% 8%, rgba(0,168,224,.22), transparent 32%),
            radial-gradient(circle at 8% 18%, rgba(0,119,182,.15), transparent 26%),
            radial-gradient(circle at 50% 75%, rgba(0,168,224,.08), transparent 45%),
            linear-gradient(180deg, #070707 0%, #0a0d12 58%, #070707 100%);
        }
        a { color: inherit; text-decoration: none; }
        button, input, select, textarea { font: inherit; }
        .shell { min-height: 100vh; overflow: hidden; }
        .nav {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 22px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }
        .brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .brand img { border-radius: 8px; }
        .brand strong { display: block; font-size: 13px; letter-spacing: .12em; text-transform: uppercase; }
        .brand span, .mono {
          color: var(--muted);
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .nav-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .att-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(0,168,224,.35);
          background: rgba(0,168,224,.08);
          border-radius: 8px;
          padding: 7px 11px;
          color: #7dd3fc;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .att-globe { width: 18px; height: 18px; flex-shrink: 0; }
        .nav-actions a, .primary-link {
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 10px 13px;
          font-size: 11px;
          font-weight: 800;
          background: rgba(255,255,255,.04);
        }
        .primary-link { border-color: rgba(0,168,224,.45); background: rgba(0,168,224,.12); color: #7dd3fc; }
        .hero {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          min-height: calc(100vh - 88px);
          padding: 42px 0 54px;
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(360px, .78fr);
          gap: 36px;
          align-items: center;
        }
        .hero-copy h1 {
          margin: 18px 0 22px;
          font-size: clamp(48px, 7vw, 92px);
          line-height: .94;
          letter-spacing: 0;
          max-width: 760px;
        }
        .hero-copy h1 span { color: var(--att); }
        .hero-copy p {
          margin: 0;
          max-width: 640px;
          color: var(--soft);
          font-size: 17px;
          line-height: 1.72;
        }
        .proof {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          max-width: 740px;
        }
        .proof div {
          border-top: 1px solid var(--line);
          padding-top: 13px;
        }
        .proof b { display: block; color: var(--att); font-size: 21px; }
        .proof span { display: block; margin-top: 4px; color: var(--muted); font-size: 11px; line-height: 1.45; }
        .bill-panel {
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 8px;
          background: rgba(9,12,18,.86);
          box-shadow: 0 34px 90px rgba(0,0,0,.36);
          overflow: hidden;
        }
        .panel-head {
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid var(--line);
          background: linear-gradient(135deg, rgba(0,168,224,.18), rgba(0,119,182,.1));
        }
        .panel-head img { border-radius: 8px; flex: 0 0 auto; }
        .panel-head h2 { margin: 0 0 4px; font-size: 20px; line-height: 1.05; }
        .panel-head p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.5; }
        .bill-form { padding: 18px; display: grid; gap: 12px; }
        .segmented {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .segmented label {
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 10px;
          display: flex;
          gap: 8px;
          align-items: center;
          color: var(--soft);
          font-size: 12px;
          cursor: pointer;
          background: rgba(255,255,255,.035);
        }
        .segmented input { accent-color: var(--att); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .field, .file-field {
          width: 100%;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,.045);
          color: #fff;
          padding: 11px 12px;
          font-size: 13px;
          outline: none;
        }
        .field:focus, .file-field:focus-within {
          border-color: var(--att-glow);
          box-shadow: 0 0 0 3px var(--att-soft);
        }
        textarea.field { min-height: 84px; resize: vertical; grid-column: 1 / -1; }
        .file-field { display: grid; gap: 7px; color: var(--muted); }
        .file-field input { color: var(--muted); font-size: 12px; }
        .consent { display: flex; gap: 9px; color: var(--soft); font-size: 11px; line-height: 1.5; }
        .consent input { margin-top: 2px; accent-color: var(--att); }
        .submit {
          border: 0;
          border-radius: 8px;
          padding: 13px 16px;
          color: #fff;
          background: linear-gradient(135deg, var(--att), #0077b6);
          font-weight: 900;
          cursor: pointer;
        }
        .submit:disabled { cursor: progress; opacity: .72; }
        .status-line {
          min-height: 20px;
          color: var(--muted);
          font-size: 11px;
          line-height: 1.5;
        }
        .status-line.success { color: #86efac; }
        .status-line.error { color: #fca5a5; }
        .section {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 70px 0;
        }
        .section-head {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          align-items: end;
          margin-bottom: 22px;
        }
        .section h2 {
          margin: 8px 0 0;
          font-size: clamp(32px, 4.8vw, 58px);
          line-height: 1;
          letter-spacing: 0;
          max-width: 760px;
        }
        .section-head p { margin: 0; color: var(--muted); max-width: 370px; line-height: 1.6; font-size: 13px; }
        .system-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        .system-step {
          min-height: 220px;
          padding: 18px;
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: rgba(255,255,255,.035);
        }
        .system-step span { color: var(--att); font-family: "DM Mono", monospace; font-size: 10px; }
        .system-step h3 { margin: 34px 0 9px; font-size: 20px; }
        .system-step p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.65; }
        .bill-compare-cta {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        .bill-compare-card {
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 24px;
          background: rgba(255,255,255,.04);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bill-compare-card:hover { border-color: var(--att); background: rgba(0,168,224,.06); }
        .bill-compare-icon { font-size: 28px; line-height: 1; }
        .bill-compare-card h3 { margin: 0; font-size: 18px; }
        .bill-compare-card p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.6; }
        .bill-compare-card .primary-link { margin-top: auto; }
        .products {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .product {
          min-height: 180px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 16px;
          background: rgba(255,255,255,.035);
          transition: border-color .2s ease, transform .2s ease, background .2s ease;
        }
        a:hover .product, a:focus-visible .product {
          border-color: var(--accent);
          transform: translateY(-2px);
          background: rgba(255,255,255,.06);
        }
        .product-logo {
          width: 56px;
          height: 56px;
          object-fit: contain;
          border-radius: 8px;
          flex: 0 0 auto;
        }
        .product span {
          color: var(--accent);
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .product h3 { margin: 8px 0 8px; font-size: 22px; line-height: 1.05; }
        .product p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.58; }
        .footer {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          padding: 28px 0 44px;
          border-top: 1px solid var(--line);
          display: flex;
          justify-content: space-between;
          gap: 18px;
          color: #64748b;
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .att-section {
          background: linear-gradient(180deg, rgba(96,165,250,.08), transparent);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 80px 0;
        }
        .att-features {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-top: 40px;
        }
        .att-feature {
          padding: 24px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: rgba(255,255,255,.03);
          transition: border-color .2s ease, background .2s ease;
        }
        .att-feature:hover {
          border-color: rgba(96,165,250,.4);
          background: rgba(255,255,255,.06);
        }
        .att-feature-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }
        .att-feature h3 {
          margin: 0 0 8px;
          font-size: 18px;
          line-height: 1.3;
        }
        .att-feature p {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
        }
        .phones-section {
          padding: 80px 0;
        }
        .phone-categories {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 40px;
        }
        .phone-category {
          border: 1px solid var(--line);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255,255,255,.02);
        }
        .phone-category-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--line);
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .phone-category-header::before {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }
        .phone-list {
          padding: 20px;
          list-style: none;
          margin: 0;
        }
        .phone-list li {
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
          color: var(--soft);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .phone-list li:last-child {
          border-bottom: none;
        }
        .phone-list li::before {
          content: "→";
          color: var(--accent);
          font-size: 12px;
        }
        .trade-in-section {
          background: linear-gradient(180deg, rgba(0,168,224,.08), transparent);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 80px 0;
        }
        .trade-in-brands {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
          justify-content: center;
        }
        .trade-in-brand {
          padding: 12px 24px;
          border: 1px solid var(--line);
          border-radius: 30px;
          background: rgba(255,255,255,.04);
          color: var(--soft);
          font-size: 14px;
          font-weight: 600;
          transition: border-color .2s ease, background .2s ease;
        }
        .trade-in-brand:hover {
          border-color: var(--att-glow);
          background: var(--att-soft);
          color: #7dd3fc;
        }
        .trade-in-legend {
          margin: 0 auto 32px;
          max-width: 780px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: rgba(255,255,255,.04);
          padding: 20px 24px;
        }
        .legend-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--soft);
          margin-bottom: 14px;
          text-align: center;
        }
        .legend-items {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .legend-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
          padding: 14px;
          border-radius: 8px;
          background: rgba(255,255,255,.03);
        }
        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .legend-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .legend-range {
          font-size: 11px;
          color: var(--muted);
        }
        .legend-credit {
          font-size: 12px;
          font-weight: 700;
          color: #34d399;
        }
        .trade-in-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 32px;
        }
        .trade-in-card {
          border: 1px solid var(--line);
          border-left: 3px solid var(--tier-color);
          border-radius: 10px;
          background: rgba(255,255,255,.04);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: transform .2s ease, border-color .2s ease, background .2s ease;
        }
        .trade-in-card:hover {
          transform: translateY(-2px);
          border-color: var(--tier-color);
          background: rgba(255,255,255,.07);
        }
        .trade-in-device {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
        }
        .trade-in-value {
          font-size: 18px;
          font-weight: 800;
          color: var(--att);
        }
        .trade-in-tier {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .06em;
          color: var(--soft);
        }
        .tier-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .trade-in-qualifies {
          font-size: 12px;
          color: var(--muted);
          margin-top: 4px;
        }
        .trade-in-qualifies b { color: var(--ink); }
        .trade-in-disclaimer {
          margin: 0 auto 32px;
          max-width: 780px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: rgba(255,255,255,.04);
          padding: 20px 24px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }
        .trade-in-disclaimer p { margin: 0 0 10px; }
        .trade-in-disclaimer p:last-child { margin-bottom: 0; }
        .trade-in-disclaimer a { color: #7dd3fc; text-decoration: underline; }
        .trade-in-source {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid var(--line);
          color: var(--soft);
          font-size: 11px;
        }
        .trade-in-cta {
          margin-top: 40px;
          text-align: center;
        }
        .trade-in-cta .trade-in-link {
          display: inline-block;
          padding: 16px 32px;
          font-size: 16px;
          background: linear-gradient(135deg, var(--att), #0077b6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-weight: 800;
          cursor: pointer;
          text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .trade-in-cta .trade-in-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,168,224,.35);
        }
        /* Sophia AI Chat Widget Styles */
        .sophia-chat-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          font-family: "Manrope", sans-serif;
        }
        .sophia-chat-button {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--att), #0077b6);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,168,224,.4);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .sophia-chat-button:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 32px rgba(0,168,224,.5);
        }
        .sophia-chat-button svg {
          width: 32px;
          height: 32px;
          fill: white;
        }
        .sophia-chat-panel {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          max-height: 600px;
          background: rgba(9,12,18,.95);
          border: 1px solid var(--line);
          border-radius: 16px;
          box-shadow: 0 24px 64px rgba(0,0,0,.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px) scale(0.95);
          pointer-events: none;
          transition: opacity .3s ease, transform .3s ease;
        }
        .sophia-chat-panel.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }
        .sophia-chat-header {
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(0,168,224,.15), rgba(96,165,250,.1));
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sophia-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--att), #0077b6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .sophia-info h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }
        .sophia-info p {
          margin: 2px 0 0;
          color: var(--muted);
          font-size: 12px;
        }
        .sophia-close {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--muted);
          cursor: pointer;
          font-size: 24px;
          padding: 4px;
          line-height: 1;
        }
        .sophia-close:hover {
          color: var(--soft);
        }
        .sophia-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 300px;
          max-height: 400px;
        }
        .sophia-message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
        }
        .sophia-message.assistant {
          align-self: flex-start;
          background: rgba(96,165,250,.15);
          border: 1px solid rgba(96,165,250,.3);
        }
        .sophia-message.user {
          align-self: flex-end;
          background: rgba(0,168,224,.2);
          border: 1px solid rgba(0,168,224,.4);
        }
        .sophia-typing {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: rgba(96,165,250,.15);
          border-radius: 12px;
          align-self: flex-start;
        }
        .sophia-typing span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--muted);
          animation: sophia-bounce 1.4s infinite ease-in-out;
        }
        .sophia-typing span:nth-child(1) { animation-delay: 0s; }
        .sophia-typing span:nth-child(2) { animation-delay: 0.2s; }
        .sophia-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes sophia-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        .sophia-input-area {
          padding: 16px;
          border-top: 1px solid var(--line);
          display: flex;
          gap: 8px;
        }
        .sophia-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid var(--line);
          border-radius: 24px;
          background: rgba(255,255,255,.05);
          color: var(--soft);
          font-size: 14px;
          outline: none;
        }
        .sophia-input:focus {
          border-color: var(--att-glow);
          background: rgba(255,255,255,.08);
        }
        .sophia-send {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--att), #0077b6);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform .2s ease;
        }
        .sophia-send:hover {
          transform: scale(1.05);
        }
        .sophia-send svg {
          width: 20px;
          height: 20px;
          fill: white;
        }
        @media (max-width: 640px) {
          .sophia-chat-widget {
            bottom: 16px;
            right: 16px;
          }
          .sophia-chat-panel {
            width: calc(100vw - 32px);
            right: -16px;
            bottom: 80px;
          }
        }
        /* Quote Calculator Styles */
        .calculator-section {
          background: linear-gradient(180deg, rgba(52,211,153,.06), transparent);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 80px 0;
        }
        .calculator-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .quote-wizard {
          background: rgba(255,255,255,.02);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .quote-wizard-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--line);
        }
        .quote-wizard-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--att), #0077b6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }
        .quote-wizard-header h3 {
          margin: 0 0 4px;
          font-size: 18px;
          color: var(--ink);
        }
        .quote-wizard-header p {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.5;
        }
        .quote-step-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .quote-step {
          padding: 16px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: rgba(255,255,255,.03);
          opacity: 0.65;
          transition: opacity .2s ease, border-color .2s ease, background .2s ease;
        }
        .quote-step.active {
          opacity: 1;
          border-color: var(--att-glow);
          background: rgba(0,168,224,.06);
        }
        .quote-step-question {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 10px;
          line-height: 1.5;
        }
        .quote-step-question b { color: var(--att); }
        .quote-step-hint {
          margin: -6px 0 12px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.5;
        }
        .quote-step-input input,
        .quote-step-input select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,.05);
          color: var(--soft);
          font-size: 14px;
          outline: none;
        }
        .quote-step-input input:focus,
        .quote-step-input select:focus {
          border-color: var(--att-glow);
          background: rgba(255,255,255,.08);
        }
        .quote-step-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .quote-step-option {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 14px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,.04);
          color: var(--soft);
          font-size: 14px;
          cursor: pointer;
          transition: border-color .2s ease, background .2s ease;
        }
        .quote-step-option:hover {
          border-color: var(--att-glow);
          background: rgba(0,168,224,.08);
        }
        .quote-step-option.selected {
          border-color: var(--att);
          background: rgba(0,168,224,.12);
        }
        .quote-step-option b { color: var(--ink); }
        .quote-step-option span { font-size: 12px; color: var(--muted); }
        .quote-step-warning {
          margin-top: 12px;
          padding: 12px;
          border: 1px solid rgba(245,158,11,.4);
          border-radius: 8px;
          background: rgba(245,158,11,.1);
          color: #fde68a;
          font-size: 12px;
          line-height: 1.5;
        }
        .quote-step-warning a { color: #7dd3fc; text-decoration: underline; }
        .quote-wizard-nav {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }
        .quote-wizard-nav button {
          flex: 1;
          padding: 14px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 15px;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .quote-wizard-back {
          border: 1px solid var(--line);
          background: rgba(255,255,255,.04);
          color: var(--soft);
        }
        .quote-wizard-next {
          border: none;
          background: linear-gradient(135deg, var(--att), #0077b6);
          color: #fff;
        }
        .quote-wizard-nav button:hover {
          transform: translateY(-1px);
        }
        .quote-wizard-nav button:disabled {
          cursor: progress;
          opacity: 0.7;
        }
        .quote-wizard-preview {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: rgba(255,255,255,.03);
          margin-bottom: 16px;
        }
        .quote-preview-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--att), #0077b6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .quote-wizard-preview p {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.5;
        }
        .quote-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }
        .quote-badge.estimate {
          background: rgba(0,168,224,.2);
          color: #7dd3fc;
          border: 1px solid rgba(0,168,224,.4);
        }
        .quote-badge.real {
          background: rgba(52,211,153,.2);
          color: #34d399;
          border: 1px solid rgba(52,211,153,.4);
        }
        .calculator-results {
          background: rgba(52,211,153,.08);
          border: 1px solid rgba(52,211,153,.3);
          border-radius: 16px;
          padding: 32px;
        }
        .calculator-results h3 {
          margin: 0 0 24px;
          font-size: 24px;
          color: #34d399;
        }
        .result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(52,211,153,.2);
        }
        .result-item:last-child {
          border-bottom: none;
        }
        .result-label {
          color: var(--soft);
          font-size: 14px;
        }
        .result-value {
          font-size: 20px;
          font-weight: 700;
          color: var(--ink);
        }
        .result-value.savings {
          color: #34d399;
        }
        .result-value.highlight {
          font-size: 28px;
          color: #34d399;
        }
        .calculator-disclaimer {
          margin-top: 24px;
          padding: 16px;
          background: rgba(255,255,255,.02);
          border-radius: 8px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.6;
        }
        .calculator-placeholder {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .placeholder-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(52,211,153,.15);
        }
        .placeholder-row:last-child {
          border-bottom: none;
        }
        .placeholder-label {
          color: var(--soft);
          font-size: 14px;
        }
        .placeholder-value {
          font-size: 20px;
          font-weight: 700;
          color: rgba(248,250,252,.45);
        }
        .placeholder-row.highlight .placeholder-value {
          color: rgba(52,211,153,.55);
        }
        .discount-group { margin-bottom: 20px; }
        .discount-hint {
          margin: -4px 0 10px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.5;
        }
        .discount-options {
          display: grid;
          gap: 10px;
        }
        .discount-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,.04);
          cursor: pointer;
          transition: border-color .2s ease, background .2s ease;
        }
        .discount-option:hover {
          border-color: var(--att-glow);
          background: rgba(0,168,224,.06);
        }
        .discount-option input {
          width: 18px;
          height: 18px;
          accent-color: var(--att);
          flex-shrink: 0;
        }
        .discount-option span {
          color: var(--soft);
          font-size: 14px;
          font-weight: 600;
        }
        .discount-row {
          background: rgba(0,168,224,.08);
          border-radius: 6px;
          padding: 12px 0;
        }
        .discount-row .result-label { color: #7dd3fc; }
        .trade-in-selector { position: relative; }
        .trade-in-selector input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,.05);
          color: var(--soft);
          font-size: 14px;
          outline: none;
        }
        .trade-in-selector input:focus {
          border-color: var(--att-glow);
          background: rgba(255,255,255,.08);
        }
        .trade-in-suggestions {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          right: 0;
          max-height: 220px;
          overflow-y: auto;
          background: rgba(9,12,18,.98);
          border: 1px solid var(--line);
          border-radius: 8px;
          z-index: 10;
          display: flex;
          flex-direction: column;
        }
        .trade-in-suggestion {
          padding: 12px 16px;
          text-align: left;
          background: none;
          border: none;
          border-bottom: 1px solid var(--line);
          color: var(--soft);
          font-size: 14px;
          cursor: pointer;
          transition: background .15s ease;
        }
        .trade-in-suggestion:last-child { border-bottom: none; }
        .trade-in-suggestion:hover {
          background: rgba(0,168,224,.1);
          color: #7dd3fc;
        }
        .trade-in-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .trade-in-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 10px;
          align-items: center;
          padding: 12px;
          border: 1px solid var(--line);
          border-left: 3px solid var(--row-color, var(--att));
          border-radius: 8px;
          background: rgba(255,255,255,.04);
        }
        .trade-in-row-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .trade-in-row-device {
          font-weight: 700;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .trade-in-row-credit {
          font-size: 11px;
          color: var(--muted);
        }
        .trade-in-row-condition {
          padding: 8px 10px;
          border: 1px solid var(--line);
          border-radius: 6px;
          background: rgba(255,255,255,.05);
          color: var(--soft);
          font-size: 12px;
          cursor: pointer;
        }
        .trade-in-row-remove {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,.05);
          color: var(--muted);
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
        }
        .trade-in-row-remove:hover {
          background: rgba(239,68,68,.15);
          color: #fca5a5;
          border-color: rgba(239,68,68,.4);
        }
        .result-trade-in-block {
          margin: 10px 0 16px;
          padding: 14px;
          background: rgba(0,0,0,.15);
          border: 1px solid var(--line);
          border-radius: 10px;
        }
        .result-trade-in-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-size: 13px;
          font-weight: 700;
          color: var(--soft);
        }
        .result-trade-in-total {
          font-weight: 700;
          color: var(--att);
        }
        .result-trade-in-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,.06);
          font-size: 13px;
          color: var(--soft);
        }
        .result-trade-in-item:last-child { border-bottom: none; }
        .result-trade-in-item small { color: var(--muted); }
        .result-total {
          background: rgba(0,168,224,.08);
          border-radius: 8px;
          padding: 16px;
          margin: 8px 0;
        }
        .result-total .result-value {
          font-size: 28px;
          color: var(--att);
        }
        .placeholder-hint {
          margin: 18px 0 0;
          padding: 14px;
          background: rgba(255,255,255,.04);
          border-radius: 8px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.6;
          text-align: center;
        }
        @media (max-width: 980px) {
          .calculator-container {
            grid-template-columns: 1fr;
          }
          .quote-step-options { grid-template-columns: 1fr; }
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .proof, .system-grid, .products, .bill-compare-cta { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .att-features, .phone-categories, .trade-in-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .legend-items { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .nav, .hero, .section, .footer { width: min(100% - 28px, 620px); }
          .nav { align-items: flex-start; }
          .brand span { display: none; }
          .att-badge { display: none; }
          .nav-actions a:not(.primary-link) { display: none; }
          .hero { padding-top: 28px; }
          .hero-copy h1 { font-size: clamp(42px, 14vw, 62px); }
          .hero-copy p { font-size: 14px; }
          .proof, .form-grid, .system-grid, .products, .bill-compare-cta { grid-template-columns: 1fr; }
          .att-features, .phone-categories, .trade-in-grid { grid-template-columns: 1fr; }
          .legend-items { grid-template-columns: 1fr; }
          .section-head { display: block; }
          .section-head p { margin-top: 14px; }
          .footer { flex-direction: column; line-height: 1.6; }
          .quote-wizard { padding: 18px; }
          .quote-wizard-header { flex-direction: column; text-align: center; }
          .quote-wizard-avatar { margin: 0 auto; }
        }
      `}</style>

      <main className="shell">
        <nav className="nav">
          <Link className="brand" href="/">
            <Image src="/logos/white-glove-wireless-app-icon-selected.png" alt="White Glove Wireless logo" width={42} height={42} priority />
            <span>
              <strong>White Glove Wireless</strong>
              <span>Wireless & fiber without the store</span>
            </span>
          </Link>
          <div className="att-badge">
            <svg className="att-globe" viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="22" fill="#00A8E0"/>
              <path d="M24 2a22 22 0 0 1 0 44 22 22 0 0 1 0-44" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
              <path d="M24 2c-6 8-6 36 0 44M24 2c6 8 6 36 0 44" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
              <ellipse cx="24" cy="24" rx="10" ry="22" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
              <path d="M2 24h44" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5"/>
            </svg>
            <span>AT&T Authorized Dealer</span>
          </div>

          <div className="nav-actions">
            <Link href="#att-features">Switch to AT&T</Link>
            <Link href="#phones">New Phones</Link>
            <Link href="#trade-in">Trade-In Deals</Link>
            <Link href="#calculator">Calculator</Link>
            <Link href="#products">Products</Link>
            <Link href="/wireless">WGW platform</Link>
            <a className="primary-link" href="#bill-review">Upload bill</a>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-copy">
            <div className="mono">Wireless & fiber, delivered to your door</div>
            <h1>
              Switch to AT&T without stepping into a store. <span>We come to you.</span>
            </h1>
            <p>
              White Glove Wireless makes switching to AT&T wireless and fiber simple. Skip the line,
              skip the upsell, skip the setup headache. Compare your current bill, order online, get
              next-day delivery, and get a personalized setup that fits how you actually use your service.
            </p>
            <div className="proof" aria-label="White Glove Wireless convenience proof points">
              <div><b>No store</b><span>Compare, order, and switch entirely online or by text.</span></div>
              <div><b>Next-day</b><span>Devices and equipment delivered as fast as tomorrow.</span></div>
              <div><b>No upsell</b><span>Personalized setup based on your bill, not a sales quota.</span></div>
            </div>
          </div>

          <aside className="bill-panel" id="bill-review">
            <div className="panel-head">
              <Image src="/logos/white-glove-wireless-app-icon-selected.png" alt="" width={52} height={52} />
              <div>
                <h2>Upload your bill. See your savings.</h2>
                <p>We'll compare your current wireless or fiber plan and show what AT&T can save you.</p>
              </div>
            </div>
            <form className="bill-form" onSubmit={submitBill}>
              <div className="segmented" aria-label="Choose bill review type">
                <label>
                  <input type="radio" name="customer_type" value="consumer" checked={form.customer_type === "consumer"} onChange={update} />
                  Consumer
                </label>
                <label>
                  <input type="radio" name="customer_type" value="business" checked={form.customer_type === "business"} onChange={update} />
                  Business
                </label>
              </div>
              <div className="form-grid">
                <input className="field" name="name" value={form.name} onChange={update} placeholder="Your name" />
                <input className="field" name="business_name" value={form.business_name} onChange={update} placeholder="Business name if any" />
                <input className="field" name="phone" value={form.phone} onChange={update} placeholder="Phone" />
                <input className="field" name="email" value={form.email} onChange={update} placeholder="Email" />
                <input className="field" name="current_provider" value={form.current_provider} onChange={update} placeholder="Current provider" />
                <input className="field" name="monthly_bill" value={form.monthly_bill} onChange={update} placeholder="Monthly bill" />
                <input className="field" name="lines" value={form.lines} onChange={update} placeholder="Lines or users" />
                <input className="field" name="zip" value={form.zip} onChange={update} placeholder="ZIP code" />
                <textarea className="field" name="notes" value={form.notes} onChange={update} placeholder="Anything the team should know?" />
              </div>
              <label className="file-field">
                <span>Bill file: PDF, photo, CSV, or text</span>
                <input type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,.heic,.txt,.csv,image/*,application/pdf,text/*" onChange={event => setFile(event.target.files?.[0] || null)} />
              </label>
              <label className="consent">
                <input type="checkbox" name="permission_to_contact" checked={form.permission_to_contact} onChange={update} />
                I agree White Glove Wireless may contact me about this bill review. Consent is not a condition of purchase.
              </label>
              <button className="submit" disabled={status.kind === "loading"}>
                {status.kind === "loading" ? "Sending..." : "Send to AI team"}
              </button>
              <div className={`status-line ${status.kind === "success" ? "success" : status.kind === "error" ? "error" : ""}`}>
                {status.message || "Choose consumer or business so WGW starts the right workflow."}
              </div>
            </form>
          </aside>
        </section>

        <section className="section" aria-label="Why White Glove Wireless">
          <div className="section-head">
            <div>
              <div className="mono">Why White Glove</div>
              <h2>The easier way to switch to AT&T.</h2>
            </div>
            <p>
              Most people dread switching carriers because it means a store visit, a pushy pitch, and a
              half-day of setup. We built White Glove Wireless to remove all of that.
            </p>
          </div>
          <div className="system-grid">
            <div className="system-step">
              <span>🏠</span>
              <h3>Skip the store entirely</h3>
              <p>Compare plans, pick your devices, and place your order from your couch. No lines, no parking, no waiting.</p>
            </div>
            <div className="system-step">
              <span>🚚</span>
              <h3>Next-day delivery</h3>
              <p>Your new phones, tablets, or fiber equipment arrive as fast as tomorrow — ready to activate.</p>
            </div>
            <div className="system-step">
              <span>🛡️</span>
              <h3>No upsell, no pressure</h3>
              <p>We review your actual bill and usage, then recommend only what you need. No hidden extras, no quotas.</p>
            </div>
            <div className="system-step">
              <span>🔧</span>
              <h3>Personalized setup</h3>
              <p>We configure your service, transfer your data, and walk you through everything so it works the way you want.</p>
            </div>
          </div>
        </section>

        <section className="att-section" id="att-features" aria-label="Switch to AT&T features">
          <div className="section">
            <div className="section-head">
              <div>
                <div className="mono">Why Switch to AT&T</div>
                <h2>America's Most Reliable 5G Network</h2>
              </div>
              <p>
                Experience the benefits of switching to AT&T with White Glove Wireless. We make the transition seamless while you get better coverage, faster speeds, and exclusive deals.
              </p>
            </div>
            <div className="att-features">
              {ATT_FEATURES.map((feature, index) => (
                <div className="att-feature" key={index}>
                  <div className="att-feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="phones-section section" id="phones" aria-label="New phones available">
          <div className="section-head">
            <div>
              <div className="mono">Latest Devices</div>
              <h2>New Phones Available</h2>
            </div>
            <p>
              Get the latest smartphones with flexible payment options. Choose from iPhone, Samsung Galaxy, Google Pixel, and other premium devices.
            </p>
          </div>
          <div className="phone-categories">
            {PHONE_CATEGORIES.map((category, index) => (
              <div className="phone-category" key={index} style={{ "--accent": category.accent }}>
                <div className="phone-category-header">{category.category}</div>
                <ul className="phone-list">
                  {category.phones.map((phone, phoneIndex) => (
                    <li key={phoneIndex}>{phone}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="trade-in-section" id="trade-in" aria-label="Trade-in deals">
          <div className="section">
            <div className="section-head">
              <div>
                <div className="mono">Device Trade-In</div>
                <h2>Get Credit for Your Old Device</h2>
              </div>
              <p>
                Trade in your current phone and get instant credit toward a new device. The grid below shows example devices you can trade in — not the new phones you are buying — along with estimated trade-in values and the AT&T promotional credit tier each may qualify for.
              </p>
            </div>

            <div className="trade-in-legend">
              <div className="legend-title">Promotional credit tiers</div>
              <div className="legend-items">
                {tradeInPromos.filter(t => t.promo_credit > 0).map((tier, index) => (
                  <div className="legend-item" key={index}>
                    <span className="legend-dot" style={{ background: tier.color }} />
                    <span className="legend-label">{tier.tier}</span>
                    <span className="legend-range">{tier.notes || `Eligible: ${(tier.example_models || tier.eligible_devices || []).slice(0, 3).join(", ")}`}</span>
                    <span className="legend-credit">Up to ${tier.promo_credit} credit</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="trade-in-grid">
              {TRADE_IN_SHOWCASE.map((device, index) => {
                const value = DEVICE_VALUES[device] || 0;
                const tier = findPromoForDevice(device, tradeInPromos) || tradeInPromos[tradeInPromos.length - 1];
                return (
                  <div className="trade-in-card" key={index} style={{ "--tier-color": tier.color }}>
                    <div className="trade-in-device">{device}</div>
                    <div className="trade-in-value">${value} est. value</div>
                    <div className="trade-in-tier">
                      <span className="tier-dot" style={{ background: tier.color }} />
                      {tier.tier} tier
                    </div>
                    <div className="trade-in-qualifies">
                      {tier.promo_credit > 0
                        ? <>Qualifies for up to <b>${tier.promo_credit}</b> in promo credits</>
                        : <>Trade-in value only — no current promo credit</>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="trade-in-disclaimer">
              <p>
                <b>Estimates only.</b> Promotional credit tiers are researched daily and refreshed automatically from current AT&T offers. Values shown are representative examples based on AT&T’s promotional trade-in tiers and do not guarantee the actual amount you will receive. Trade-in value depends on device condition, carrier, model, storage, and current AT&T promotions.
              </p>
              <p>
                Always confirm your actual trade-in value and eligible credits directly with <a href="https://www.att.com/trade-in/" target="_blank" rel="noreferrer">AT&T</a> before making a purchase decision.
              </p>
              <p className="trade-in-source">
                Source: AT&T Trade-In program (<a href="https://www.att.com/trade-in/" target="_blank" rel="noreferrer">att.com/trade-in</a>) · Refreshed daily by WGW Director AI
              </p>
            </div>

            <div className="trade-in-brands">
              {TRADE_IN_BRANDS.map((brand, index) => (
                <span className="trade-in-brand" key={index}>{brand}</span>
              ))}
            </div>
            <div className="trade-in-cta">
              <a className="trade-in-link" href="https://www.att.com/trade-in/" target="_blank" rel="noreferrer">
                Get Your Trade-In Quote
              </a>
            </div>
          </div>
        </section>

        <section className="calculator-section" id="calculator" aria-label="Interactive quote calculator">
          <div className="section">
            <div className="section-head">
              <div>
                <div className="mono">Savings Calculator</div>
                <h2>Build Your Personalized AT&T Quote</h2>
              </div>
              <p>
                Answer a few quick questions and we’ll show you exactly what you could save by switching to AT&T with White Glove Wireless — including your eligible trade-in credits and any discounts you qualify for.
              </p>
            </div>
            <div className="calculator-container">
              <div className="quote-wizard">
                <div className="quote-wizard-header">
                  <div className="quote-wizard-avatar">🤖</div>
                  <div>
                    <h3>Sophia, your WGW quote assistant</h3>
                    <p>I’ll research current AT&T Unlimited 2.0 plans, trade-in promos, and discounts to build your personalized quote.</p>
                  </div>
                </div>

                <div className="quote-step-list">
                  {quoteStep >= 0 && (
                    <div className={`quote-step ${quoteStep === 0 ? 'active' : ''}`}>
                      <div className="quote-step-question">How many lines do you need?</div>
                      <div className="quote-step-input">
                        <input
                          type="number"
                          min="1"
                          placeholder="e.g., 4"
                          value={calculator.lines}
                          onChange={(e) => updateCalculator('lines', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {quoteStep >= 1 && (
                    <div className={`quote-step ${quoteStep === 1 ? 'active' : ''}`}>
                      <div className="quote-step-question">What’s your current monthly bill?</div>
                      <div className="quote-step-input">
                        <input
                          type="number"
                          placeholder="e.g., 150"
                          value={calculator.currentBill}
                          onChange={(e) => updateCalculator('currentBill', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {quoteStep >= 2 && (
                    <div className={`quote-step ${quoteStep === 2 ? 'active' : ''}`}>
                      <div className="quote-step-question">Who’s your current provider?</div>
                      <div className="quote-step-input">
                        <select
                          value={calculator.currentProvider}
                          onChange={(e) => updateCalculator('currentProvider', e.target.value)}
                        >
                          <option value="">Select provider</option>
                          <option value="verizon">Verizon</option>
                          <option value="tmobile">T-Mobile</option>
                          <option value="sprint">Sprint</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {quoteStep >= 3 && (
                    <div className={`quote-step ${quoteStep === 3 ? 'active' : ''}`}>
                      <div className="quote-step-question">How much data does each line use?</div>
                      <div className="quote-step-options">
                        {[
                          { value: 'low', label: 'Light', desc: '< 5GB per line' },
                          { value: 'medium', label: 'Average', desc: '5–20GB per line' },
                          { value: 'high', label: 'Heavy', desc: '20–50GB per line' },
                          { value: 'unlimited', label: 'Unlimited', desc: '50GB+ per line' },
                        ].map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`quote-step-option ${calculator.dataUsage === opt.value ? 'selected' : ''}`}
                            onClick={() => updateCalculator('dataUsage', opt.value)}
                          >
                            <b>{opt.label}</b>
                            <span>{opt.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {quoteStep >= 4 && (
                    <div className={`quote-step ${quoteStep === 4 ? 'active' : ''}`}>
                      <div className="quote-step-question">
                        Based on your answers, I recommend the <b>{ATT_PLANS.find(p => p.id === calculator.attPlan)?.name}</b>. Want to change it?
                      </div>
                      <div className="quote-step-input">
                        <select
                          value={calculator.attPlan}
                          onChange={(e) => updateCalculator('attPlan', e.target.value)}
                        >
                          {ATT_PLANS.map(plan => (
                            <option key={plan.id} value={plan.id}>{plan.name} — {plan.features}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {quoteStep >= 5 && (
                    <div className={`quote-step ${quoteStep === 5 ? 'active' : ''}`}>
                      <div className="quote-step-question">Do any of these discounts apply?</div>
                      <p className="quote-step-hint">I’ll automatically apply the best eligible AT&T discount and the autopay/paperless savings.</p>
                      <div className="discount-options">
                        <label className="discount-option">
                          <input type="checkbox" checked={calculator.autopay} onChange={() => toggleDiscount('autopay')} />
                          <span>I’ll use autopay & paperless billing <small>— saves $10/line</small></span>
                        </label>
                        <label className="discount-option">
                          <input type="checkbox" checked={calculator.is55Plus} onChange={() => toggleDiscount('is55Plus')} />
                          <span>I’m 55 or older</span>
                        </label>
                        <label className="discount-option">
                          <input type="checkbox" checked={calculator.isMilitary} onChange={() => toggleDiscount('isMilitary')} />
                          <span>Military or veteran</span>
                        </label>
                        <label className="discount-option">
                          <input type="checkbox" checked={calculator.isTeacher} onChange={() => toggleDiscount('isTeacher')} />
                          <span>Teacher or educator</span>
                        </label>
                        <label className="discount-option">
                          <input type="checkbox" checked={calculator.hasEmployerDiscount} onChange={() => toggleDiscount('hasEmployerDiscount')} />
                          <span>My employer may offer an AT&T discount</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {quoteStep >= 6 && (
                    <div className={`quote-step ${quoteStep === 6 ? 'active' : ''}`}>
                      <div className="quote-step-question">Any devices to trade in?</div>
                      <p className="quote-step-hint">I’ll look up the current AT&T trade-in promo credit for each device.</p>
                      <div className="trade-in-selector">
                        <input
                          type="text"
                          placeholder="Start typing a device (e.g. iPhone 16)"
                          value={calculator.tradeInSearch}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCalculator('tradeInSearch', val);
                            setTradeInSuggestions(getTradeInSuggestions(val));
                            setShowTradeInSuggestions(val.length >= 2);
                          }}
                          onFocus={() => setShowTradeInSuggestions(calculator.tradeInSearch.length >= 2)}
                          onBlur={() => setTimeout(() => setShowTradeInSuggestions(false), 150)}
                        />
                        {showTradeInSuggestions && tradeInSuggestions.length > 0 && (
                          <div className="trade-in-suggestions">
                            {tradeInSuggestions.map(device => (
                              <button
                                type="button"
                                key={device}
                                className="trade-in-suggestion"
                                onMouseDown={(e) => { e.preventDefault(); addTradeIn(device); }}
                              >
                                {device}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {calculator.tradeIns.length > 0 && (
                        <div className="trade-in-list">
                          {calculator.tradeIns.map(t => (
                            <div className="trade-in-row" key={t.id} style={{ "--row-color": t.color }}>
                              <div className="trade-in-row-info">
                                <span className="trade-in-row-device">{t.device}</span>
                                <span className="trade-in-row-credit">
                                  ${t.value} value · {t.promoTier} · up to ${t.promoCredit} promo credit
                                </span>
                              </div>
                              <select
                                value={t.condition}
                                onChange={(e) => updateTradeIn(t.id, { condition: e.target.value })}
                                className="trade-in-row-condition"
                              >
                                <option value="excellent">Excellent</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                              </select>
                              <button
                                type="button"
                                className="trade-in-row-remove"
                                onClick={() => removeTradeIn(t.id)}
                                aria-label={`Remove ${t.device}`}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {calculator.tradeIns.length > 0 && !promoQualifiesForPlan(calculator.attPlan) && (
                        <div className="quote-step-warning">
                          Your selected plan does not qualify for the maximum trade-in promo credits. Choose Extra EL or Premium PL to unlock the full promo amount.
                          <a href="https://www.att.com/trade-in/" target="_blank" rel="noreferrer"> See AT&T trade-in terms</a>.
                        </div>
                      )}
                    </div>
                  )}

                  {quoteStep >= 7 && (
                    <div className={`quote-step ${quoteStep === 7 ? 'active' : ''}`}>
                      <div className="quote-step-question">Any new phones to finance?</div>
                      <p className="quote-step-hint">I’ll split the cost over 36 months and apply your trade-in promo credits as monthly bill credits.</p>
                      <div className="trade-in-selector">
                        <input
                          type="text"
                          placeholder="Start typing a phone (e.g. iPhone 17)"
                          value={calculator.newPhoneSearch}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCalculator('newPhoneSearch', val);
                            setNewPhoneSuggestions(getNewPhoneSuggestions(val));
                            setShowNewPhoneSuggestions(val.length >= 2);
                          }}
                          onFocus={() => setShowNewPhoneSuggestions(calculator.newPhoneSearch.length >= 2)}
                          onBlur={() => setTimeout(() => setShowNewPhoneSuggestions(false), 150)}
                        />
                        {showNewPhoneSuggestions && newPhoneSuggestions.length > 0 && (
                          <div className="trade-in-suggestions">
                            {newPhoneSuggestions.map(phone => (
                              <button
                                type="button"
                                key={phone.id}
                                className="trade-in-suggestion"
                                onMouseDown={(e) => { e.preventDefault(); addNewPhone(phone); }}
                              >
                                {phone.name} — ${phone.fullPrice}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {calculator.newPhones.length > 0 && (
                        <div className="trade-in-list">
                          {calculator.newPhones.map(p => (
                            <div className="trade-in-row" key={p.id}>
                              <div className="trade-in-row-info">
                                <span className="trade-in-row-device">{p.name}</span>
                                <span className="trade-in-row-credit">${p.fullPrice} · 36 mo financing</span>
                              </div>
                              <button
                                type="button"
                                className="trade-in-row-remove"
                                onClick={() => removeNewPhone(p.id)}
                                aria-label={`Remove ${p.name}`}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="quote-wizard-nav">
                  {quoteStep > 0 && (
                    <button type="button" className="quote-wizard-back" onClick={() => setQuoteStep(s => s - 1)}>Back</button>
                  )}
                  {quoteStep < 7 ? (
                    <button type="button" className="quote-wizard-next" onClick={() => setQuoteStep(s => s + 1)}>Next</button>
                  ) : (
                    <button type="button" className="quote-wizard-next" onClick={calculateQuote} disabled={isCalculating}>
                      {isCalculating ? 'Building your quote...' : 'Get my quote'}
                    </button>
                  )}
                </div>
              </div>

              <div className="calculator-results">
                <h3>Your AT&T Quote</h3>
                {quoteResult ? (
                  <>
                    <div className={`quote-badge ${quoteResult.isRealQuote ? 'real' : 'estimate'}`}>
                      {quoteResult.isRealQuote ? '✓ Real-Time Quote' : 'Estimate'}
                    </div>

                    <div className="result-item">
                      <span className="result-label">Current Monthly Bill</span>
                      <span className="result-value">${quoteResult.currentBill.toFixed(2)}</span>
                    </div>

                    <div className="result-item">
                      <span className="result-label">New AT&T Plan</span>
                      <span className="result-value">{quoteResult.attPlan?.name || "AT&T Unlimited 2.0 Extra EL"}</span>
                    </div>

                    <div className="result-item">
                      <span className="result-label">Plan Before Discounts</span>
                      <span className="result-value">${(quoteResult.basePlanPricePerLine * quoteResult.lines).toFixed(2)} <small>(${quoteResult.basePlanPricePerLine?.toFixed(2)}/line)</small></span>
                    </div>

                    {quoteResult.discountLabel && (
                      <div className="result-item discount-row">
                        <span className="result-label">{quoteResult.discountLabel}</span>
                        <span className="result-value savings">-${quoteResult.totalDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    {quoteResult.autopayDiscount > 0 && (
                      <div className="result-item discount-row">
                        <span className="result-label">Autopay & paperless discount</span>
                        <span className="result-value savings">-${quoteResult.autopayDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    {quoteResult.totalNetPhoneMonthlyPayment > 0 && (
                      <div className="result-item">
                        <span className="result-label">New Phone Financing ({quoteResult.newPhoneDetails.length})</span>
                        <span className="result-value">${quoteResult.totalNetPhoneMonthlyPayment.toFixed(2)}/mo</span>
                      </div>
                    )}

                    <div className="result-item">
                      <span className="result-label">New Monthly Bill</span>
                      <span className="result-value">${quoteResult.newMonthlyBill.toFixed(2)} <small>(${quoteResult.perLineNewBill?.toFixed(2)}/line)</small></span>
                    </div>

                    <div className="result-item">
                      <span className="result-label">Monthly Savings</span>
                      <span className="result-value savings">${quoteResult.monthlySavings.toFixed(2)}</span>
                    </div>

                    <div className="result-item">
                      <span className="result-label">Annual Savings</span>
                      <span className="result-value savings highlight">${quoteResult.annualSavings.toFixed(2)}</span>
                    </div>

                    {quoteResult.tradeInDetails?.length > 0 && (
                      <div className="result-trade-in-block">
                        <div className="result-trade-in-header">
                          <span>Trade-Ins ({quoteResult.tradeInDetails.length})</span>
                          <span className="result-trade-in-total">
                            ${quoteResult.totalTradeInValue.toFixed(2)} value · ${quoteResult.totalPromoCredit.toFixed(2)} promo credit
                          </span>
                        </div>
                        {quoteResult.tradeInDetails.map((t, i) => (
                          <div className="result-trade-in-item" key={t.id || i} style={{ "--row-color": t.color }}>
                            <span>{t.device} <small>({t.condition})</small></span>
                            <span>${t.adjustedValue.toFixed(2)} value · up to ${t.promoCredit.toFixed(2)} credit</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {quoteResult.totalPromoCredit > 0 && (
                      <div className="result-item">
                        <span className="result-label">Total AT&T Promo Credit</span>
                        <span className="result-value savings highlight">Up to ${quoteResult.totalPromoCredit.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="result-item result-total">
                      <span className="result-label">First Year Total Value</span>
                      <span className="result-value savings highlight">${quoteResult.firstYearTotalValue.toFixed(2)}</span>
                    </div>

                    <div className="result-item">
                      <span className="result-label">Savings per Line</span>
                      <span className="result-value">${quoteResult.perLineSavings.toFixed(2)}/line</span>
                    </div>

                    {(quoteResult.totalPromoCredit > 0 || quoteResult.totalNetPhoneMonthlyPayment > 0) && (
                      <div className="calculator-disclaimer">
                        <b>Trade-in & financing details:</b> Trade-in promo credits are typically split over {quoteResult.financingMonths} months as bill credits and require an eligible AT&T Unlimited 2.0 plan with autopay/paperless billing. If you cancel service early, remaining credits may be forfeited. Device financing is separate and may require credit approval.
                        <a href="https://www.att.com/trade-in/" target="_blank" rel="noreferrer"> See AT&T trade-in terms</a> and <a href="https://www.att.com/support/article/wireless/KM1218200/" target="_blank" rel="noreferrer">installment details</a>.
                      </div>
                    )}

                    <div className="calculator-disclaimer">
                      {quoteResult.isRealQuote
                        ? "*This is a real-time quote based on current AT&T pricing and promotions. Final pricing may vary based on credit approval and location. For complete details, please contact our team."
                        : "*This is an estimate based on current AT&T Unlimited 2.0 plan pricing, autopay discounts, and promotional trade-in tiers. Actual savings may vary based on your specific plan, location, device condition, and current promotions."
                      }
                    </div>
                  </>
                ) : (
                  <div className="calculator-placeholder">
                    <div className="quote-wizard-preview">
                      <div className="quote-preview-avatar">🤖</div>
                      <p>Answer the questions on the left and I’ll build your personalized AT&T quote here — with plan pricing, autopay savings, trade-in credits, and 36-month financing.</p>
                    </div>
                    <div className="placeholder-row">
                      <span className="placeholder-label">Current monthly bill</span>
                      <span className="placeholder-value">--</span>
                    </div>
                    <div className="placeholder-row">
                      <span className="placeholder-label">New AT&T plan</span>
                      <span className="placeholder-value">--</span>
                    </div>
                    <div className="placeholder-row highlight">
                      <span className="placeholder-label">Monthly savings</span>
                      <span className="placeholder-value">$0.00</span>
                    </div>
                    <div className="placeholder-row highlight">
                      <span className="placeholder-label">Annual savings</span>
                      <span className="placeholder-value">$0.00</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Compare your bill">
          <div className="section-head">
            <div>
              <div className="mono">Compare your bill</div>
              <h2>Upload your bill to see your savings.</h2>
            </div>
            <p>
              The fastest way to find out what AT&T wireless and fiber can save you is to let us
              review your current bill. No store visit, no pressure — just a clear side-by-side
              comparison and a recommendation that fits your actual usage.
            </p>
          </div>
          <div className="bill-compare-cta">
            <div className="bill-compare-card">
              <div className="bill-compare-icon">📄</div>
              <h3>See what you could save</h3>
              <p>Upload a photo or PDF of your current wireless or fiber bill. Our team compares your plan, lines, and usage against current AT&T pricing.</p>
              <a className="primary-link" href="#bill-review" onClick={e => { e.preventDefault(); const el = document.getElementById('bill-review'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                Upload your bill →
              </a>
            </div>
            <div className="bill-compare-card">
              <div className="bill-compare-icon">📊</div>
              <h3>Get a clear recommendation</h3>
              <p>We show you the difference line by line — monthly cost, features, and any trade-in or switching bonuses you qualify for.</p>
            </div>
            <div className="bill-compare-card">
              <div className="bill-compare-icon">🚚</div>
              <h3>Switch without the store</h3>
              <p>Approve your new plan and devices online, schedule next-day delivery, and get personalized setup — all from home.</p>
            </div>
          </div>
          <div className="system-grid" style={{ marginTop: 48 }}>
            {SYSTEM_STEPS.map(([number, title, copy]) => (
              <div className="system-step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="products" aria-label="Solution products">
          <div className="section-head">
            <div>
              <div className="mono">Built by White Glove</div>
              <h2>Solution-based SaaS products, led by WGW.</h2>
            </div>
            <p>
              The other apps stay available from the main page, but the front door now points at
              the company, the operating system, and the practical workflow behind the products.
            </p>
          </div>
          <div className="products">
            {PRODUCTS.map(product => <ProductLink product={product} key={product.id} />)}
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} White Glove Wireless</span>
          <span>Software for sales, service, operations, and AI-assisted pipelines</span>
        </footer>

        {/* Sophia AI Chat Widget */}
        <div className="sophia-chat-widget">
          <div className={`sophia-chat-panel ${chatOpen ? 'open' : ''}`}>
            <div className="sophia-chat-header">
              <div className="sophia-avatar">🤖</div>
              <div className="sophia-info">
                <h3>Sophia</h3>
                <p>AI Assistant • Online</p>
              </div>
              <button className="sophia-close" onClick={() => setChatOpen(false)}>×</button>
            </div>
            <div className="sophia-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`sophia-message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isTyping && (
                <div className="sophia-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
            <form className="sophia-input-area" onSubmit={handleChatSubmit}>
              <input
                type="text"
                className="sophia-input"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="sophia-send">
                <svg viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          </div>
          <button className="sophia-chat-button" onClick={() => setChatOpen(!chatOpen)} aria-label="Open chat with Sophia">
            <svg viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
          </button>
        </div>
      </main>
    </>
  );
}
