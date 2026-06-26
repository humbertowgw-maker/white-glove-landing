import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppInstallMeta from "../components/AppInstallMeta";

const API = process.env.NEXT_PUBLIC_API_URL || "https://white-glove-backend-production-5a7d.up.railway.app";

const PRODUCTS = [
  {
    id: "wgw",
    name: "White Glove Wireless",
    label: "Sales OS",
    description: "AI sales, bill review, field reps, outreach, appointments, and owner controls for wireless teams.",
    logo: "/logos/white-glove-wireless-app-icon-selected.png",
    href: "/wireless",
    accent: "#f59e0b",
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
  ["01", "Upload the bill", "A customer sends a bill photo, PDF, or text file from the homepage."],
  ["02", "Route the record", "WGW separates household reviews from business telecom opportunities."],
  ["03", "Assign the work", "The right AI teammates receive follow-up, research, readiness, and risk tasks."],
  ["04", "Prepare the quote", "The rep sees a bill-review record with context instead of a loose website form."],
];

const ATT_FEATURES = [
  {
    icon: "📱",
    title: "Latest iPhone & Android Devices",
    description: "Get the newest iPhone 15 series, Samsung Galaxy S24, and other premium devices with flexible payment options.",
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
    phones: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14", "iPhone SE"],
    accent: "#f59e0b",
  },
  {
    category: "Samsung Galaxy",
    phones: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy Z Fold5", "Galaxy Z Flip5"],
    accent: "#3b82f6",
  },
  {
    category: "Other Premium",
    phones: ["Google Pixel 8 Pro", "Google Pixel 8", "Motorola Edge+", "OnePlus 12"],
    accent: "#10b981",
  },
];

const TRADE_IN_BRANDS = [
  "Apple", "Samsung", "Google", "Motorola", "LG", "OnePlus", "Any Other Brand"
];

const DEVICE_VALUES = {
  "iPhone 15 Pro Max": 800,
  "iPhone 15 Pro": 650,
  "iPhone 15": 500,
  "iPhone 14": 350,
  "iPhone 13": 250,
  "iPhone 12": 150,
  "iPhone 11": 100,
  "iPhone SE": 75,
  "Samsung Galaxy S24 Ultra": 700,
  "Samsung Galaxy S24+": 550,
  "Samsung Galaxy S24": 400,
  "Samsung Galaxy S23": 300,
  "Samsung Galaxy S22": 200,
  "Samsung Galaxy S21": 150,
  "Google Pixel 8 Pro": 450,
  "Google Pixel 8": 350,
  "Google Pixel 7": 200,
  "Google Pixel 6": 150,
  "Other Premium": 100,
  "Mid-range Device": 50,
  "Budget Device": 25,
};

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
    tradeInDevice: "",
    tradeInCondition: "good",
    wantsNewPhone: false,
    dataUsage: "medium",
  });
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
        aiResponse = "We have the latest devices available! Including iPhone 15 series, Samsung Galaxy S24, Google Pixel 8, and more. With flexible payment options and trade-in deals, upgrading is affordable. What type of phone are you interested in?";
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

  const calculateQuote = async () => {
    setIsCalculating(true);
    
    const currentBill = parseFloat(calculator.currentBill) || 0;
    const lines = parseInt(calculator.lines) || 1;
    const tradeInValue = DEVICE_VALUES[calculator.tradeInDevice] || 0;
    
    // Apply condition multiplier
    let conditionMultiplier = 1;
    if (calculator.tradeInCondition === "excellent") conditionMultiplier = 1.2;
    else if (calculator.tradeInCondition === "good") conditionMultiplier = 1;
    else if (calculator.tradeInCondition === "fair") conditionMultiplier = 0.7;
    else if (calculator.tradeInCondition === "poor") conditionMultiplier = 0.4;
    
    const adjustedTradeIn = tradeInValue * conditionMultiplier;
    
    // Estimate AT&T savings (typically 15-25% savings for switching)
    const estimatedSavings = currentBill * 0.20;
    const newMonthlyBill = currentBill - estimatedSavings;
    
    // First bill with trade-in credit applied
    const firstBillWithCredit = Math.max(0, newMonthlyBill - adjustedTradeIn);
    
    // Annual savings
    const annualSavings = estimatedSavings * 12;
    
    // Data usage impact on plan pricing
    let dataAdjustment = 0;
    if (calculator.dataUsage === "low") dataAdjustment = -10;
    else if (calculator.dataUsage === "high") dataAdjustment = 15;
    else if (calculator.dataUsage === "unlimited") dataAdjustment = 25;
    
    const adjustedMonthlyBill = newMonthlyBill + (dataAdjustment * lines);
    
    const quoteData = {
      currentBill,
      newMonthlyBill: adjustedMonthlyBill,
      monthlySavings: currentBill - adjustedMonthlyBill,
      tradeInValue: adjustedTradeIn,
      firstBillWithCredit,
      annualSavings: (currentBill - adjustedMonthlyBill) * 12,
      lines,
      perLineSavings: (currentBill - adjustedMonthlyBill) / lines,
    };

    // Try to get real-time quote from API
    try {
      const response = await fetch(`${API}/api/quote-generation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_provider: calculator.currentProvider,
          monthly_bill: calculator.currentBill,
          lines: calculator.lines,
          trade_in_device: calculator.tradeInDevice,
          trade_in_condition: calculator.tradeInCondition,
          data_usage: calculator.dataUsage,
          customer_type: 'consumer',
        }),
      });

      if (response.ok) {
        const apiQuote = await response.json();
        // Use API data if available, otherwise fall back to calculated estimate
        setQuoteResult({
          ...quoteData,
          ...apiQuote,
          isRealQuote: true,
        });
      } else {
        // Fall back to calculated estimate if API fails
        setQuoteResult({
          ...quoteData,
          isRealQuote: false,
        });
      }
    } catch (error) {
      // Fall back to calculated estimate if API call fails
      console.log('API quote generation failed, using estimate:', error);
      setQuoteResult({
        ...quoteData,
        isRealQuote: false,
      });
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
        <title>White Glove Wireless - Solution-Based SaaS Products</title>
        <meta
          name="description"
          content="White Glove Wireless builds solution-based SaaS products led by an AI sales operating system for wireless teams, bill review, pipelines, and owner workflows."
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
          --amber: #f59e0b;
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
            radial-gradient(circle at 82% 8%, rgba(96,165,250,.17), transparent 31%),
            radial-gradient(circle at 8% 18%, rgba(245,158,11,.18), transparent 28%),
            linear-gradient(180deg, #070707 0%, #101114 58%, #070707 100%);
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
        .nav-actions a, .primary-link {
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 10px 13px;
          font-size: 11px;
          font-weight: 800;
          background: rgba(255,255,255,.04);
        }
        .primary-link { border-color: rgba(245,158,11,.45); background: rgba(245,158,11,.12); color: #fde68a; }
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
        .hero-copy h1 span { color: #fbbf24; }
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
        .proof b { display: block; color: #fff; font-size: 21px; }
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
          background: linear-gradient(135deg, rgba(245,158,11,.14), rgba(96,165,250,.1));
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
        .segmented input { accent-color: var(--amber); }
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
          border-color: rgba(245,158,11,.55);
          box-shadow: 0 0 0 3px rgba(245,158,11,.12);
        }
        textarea.field { min-height: 84px; resize: vertical; grid-column: 1 / -1; }
        .file-field { display: grid; gap: 7px; color: var(--muted); }
        .file-field input { color: var(--muted); font-size: 12px; }
        .consent { display: flex; gap: 9px; color: var(--soft); font-size: 11px; line-height: 1.5; }
        .consent input { margin-top: 2px; accent-color: var(--amber); }
        .submit {
          border: 0;
          border-radius: 8px;
          padding: 13px 16px;
          color: #111827;
          background: linear-gradient(135deg, #fbbf24, #34d399);
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
        .system-step span { color: var(--amber); font-family: "DM Mono", monospace; font-size: 10px; }
        .system-step h3 { margin: 34px 0 9px; font-size: 20px; }
        .system-step p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.65; }
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
          background: linear-gradient(180deg, rgba(245,158,11,.06), transparent);
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
          border-color: rgba(245,158,11,.5);
          background: rgba(245,158,11,.1);
          color: #fde68a;
        }
        .trade-in-cta {
          margin-top: 40px;
          text-align: center;
        }
        .trade-in-cta button {
          padding: 16px 32px;
          font-size: 16px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border: none;
          border-radius: 12px;
          color: #111827;
          font-weight: 800;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .trade-in-cta button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,158,11,.3);
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
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(245,158,11,.4);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .sophia-chat-button:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 32px rgba(245,158,11,.5);
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
          background: linear-gradient(135deg, rgba(245,158,11,.15), rgba(96,165,250,.1));
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sophia-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #d97706);
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
          background: rgba(245,158,11,.2);
          border: 1px solid rgba(245,158,11,.4);
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
          border-color: rgba(245,158,11,.5);
          background: rgba(255,255,255,.08);
        }
        .sophia-send {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #d97706);
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
        .calculator-form {
          background: rgba(255,255,255,.02);
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 32px;
        }
        .calculator-form h3 {
          margin: 0 0 24px;
          font-size: 24px;
          color: var(--ink);
        }
        .calculator-form .form-group {
          margin-bottom: 20px;
        }
        .calculator-form label {
          display: block;
          margin-bottom: 8px;
          color: var(--soft);
          font-size: 13px;
          font-weight: 600;
        }
        .calculator-form input,
        .calculator-form select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--line);
          border-radius: 8px;
          background: rgba(255,255,255,.05);
          color: var(--soft);
          font-size: 14px;
          outline: none;
        }
        .calculator-form input:focus,
        .calculator-form select:focus {
          border-color: rgba(52,211,153,.5);
          background: rgba(255,255,255,.08);
        }
        .calculator-form .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .calculator-form .checkbox-group input {
          width: auto;
        }
        .calculator-form .checkbox-group label {
          margin-bottom: 0;
        }
        .calculator-calculate-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #34d399, #10b981);
          border: none;
          border-radius: 8px;
          color: #111827;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .calculator-calculate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(52,211,153,.3);
        }
        .calculator-calculate-btn:disabled {
          cursor: progress;
          opacity: 0.7;
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
          background: rgba(245,158,11,.2);
          color: #fbbf24;
          border: 1px solid rgba(245,158,11,.4);
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
        .calculator-results.hidden {
          display: none;
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
        @media (max-width: 980px) {
          .calculator-container {
            grid-template-columns: 1fr;
          }
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .proof, .system-grid, .products { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .att-features, .phone-categories { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .nav, .hero, .section, .footer { width: min(100% - 28px, 620px); }
          .nav { align-items: flex-start; }
          .brand span { display: none; }
          .nav-actions a:not(.primary-link) { display: none; }
          .hero { padding-top: 28px; }
          .hero-copy h1 { font-size: clamp(42px, 14vw, 62px); }
          .hero-copy p { font-size: 14px; }
          .proof, .form-grid, .system-grid, .products { grid-template-columns: 1fr; }
          .att-features, .phone-categories { grid-template-columns: 1fr; }
          .section-head { display: block; }
          .section-head p { margin-top: 14px; }
          .footer { flex-direction: column; line-height: 1.6; }
        }
      `}</style>

      <main className="shell">
        <nav className="nav">
          <Link className="brand" href="/">
            <Image src="/logos/white-glove-wireless-app-icon-selected.png" alt="White Glove Wireless logo" width={42} height={42} priority />
            <span>
              <strong>White Glove Wireless</strong>
              <span>Solution-based SaaS products</span>
            </span>
          </Link>
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
            <div className="mono">AI software company for real business workflows</div>
            <h1>
              We build SaaS products around the problem, <span>not the template.</span>
            </h1>
            <p>
              White Glove Wireless is the flagship operating system: AI sales agents, bill review,
              field execution, owner controls, and follow-up that turns customer interest into
              worked opportunities.
            </p>
            <div className="proof" aria-label="White Glove Wireless platform proof points">
              <div><b>2</b><span>Bill paths: consumer savings reviews and business telecom opportunities.</span></div>
              <div><b>5</b><span>AI teammates for outreach, market research, operations, metrics, and direction.</span></div>
              <div><b>7</b><span>Products in the portfolio, all shaped around practical workflows.</span></div>
            </div>
          </div>

          <aside className="bill-panel" id="bill-review">
            <div className="panel-head">
              <Image src="/logos/white-glove-wireless-app-icon-selected.png" alt="" width={52} height={52} />
              <div>
                <h2>Upload a wireless bill</h2>
                <p>Send the review to WGW and let the system organize the next step.</p>
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
                Trade in your current phone and get instant credit toward a new device. We accept phones from any carrier, regardless of condition.
              </p>
            </div>
            <div className="trade-in-brands">
              {TRADE_IN_BRANDS.map((brand, index) => (
                <span className="trade-in-brand" key={index}>{brand}</span>
              ))}
            </div>
            <div className="trade-in-cta">
              <button onClick={() => document.getElementById('bill-review').scrollIntoView({ behavior: 'smooth' })}>
                Get Your Trade-In Quote
              </button>
            </div>
          </div>
        </section>

        <section className="calculator-section" id="calculator" aria-label="Interactive quote calculator">
          <div className="section">
            <div className="section-head">
              <div>
                <div className="mono">Savings Calculator</div>
                <h2>Estimate Your Savings</h2>
              </div>
              <p>
                Use our interactive calculator to see how much you could save by switching to AT&T with White Glove Wireless. Includes trade-in credit estimates.
              </p>
            </div>
            <div className="calculator-container">
              <div className="calculator-form">
                <h3>Enter Your Information</h3>
                <div className="form-group">
                  <label>Current Monthly Bill ($)</label>
                  <input
                    type="number"
                    placeholder="e.g., 150"
                    value={calculator.currentBill}
                    onChange={(e) => updateCalculator('currentBill', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Number of Lines</label>
                  <input
                    type="number"
                    placeholder="e.g., 4"
                    value={calculator.lines}
                    onChange={(e) => updateCalculator('lines', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Current Provider</label>
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
                <div className="form-group">
                  <label>Trade-In Device (Optional)</label>
                  <select
                    value={calculator.tradeInDevice}
                    onChange={(e) => updateCalculator('tradeInDevice', e.target.value)}
                  >
                    <option value="">No trade-in</option>
                    {Object.keys(DEVICE_VALUES).map(device => (
                      <option key={device} value={device}>{device}</option>
                    ))}
                  </select>
                </div>
                {calculator.tradeInDevice && (
                  <div className="form-group">
                    <label>Device Condition</label>
                    <select
                      value={calculator.tradeInCondition}
                      onChange={(e) => updateCalculator('tradeInCondition', e.target.value)}
                    >
                      <option value="excellent">Excellent (like new)</option>
                      <option value="good">Good (normal wear)</option>
                      <option value="fair">Fair (scratches, minor damage)</option>
                      <option value="poor">Poor (cracked screen, functional)</option>
                    </select>
                  </div>
                )}
                <div className="form-group">
                  <label>Data Usage per Line</label>
                  <select
                    value={calculator.dataUsage}
                    onChange={(e) => updateCalculator('dataUsage', e.target.value)}
                  >
                    <option value="low">Low (&lt;5GB)</option>
                    <option value="medium">Medium (5-20GB)</option>
                    <option value="high">High (20-50GB)</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                </div>
                <button 
                  className="calculator-calculate-btn" 
                  onClick={calculateQuote}
                  disabled={isCalculating}
                >
                  {isCalculating ? "Calculating..." : "Calculate Savings"}
                </button>
              </div>
              
              <div className={`calculator-results ${quoteResult ? '' : 'hidden'}`}>
                <h3>Your Estimated Savings</h3>
                {quoteResult && (
                  <>
                    <div className={`quote-badge ${quoteResult.isRealQuote ? 'real' : 'estimate'}`}>
                      {quoteResult.isRealQuote ? '✓ Real-Time Quote' : 'Estimate'}
                    </div>
                    <div className="result-item">
                      <span className="result-label">Current Monthly Bill</span>
                      <span className="result-value">${quoteResult.currentBill.toFixed(2)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">New AT&T Monthly Bill</span>
                      <span className="result-value">${quoteResult.newMonthlyBill.toFixed(2)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Monthly Savings</span>
                      <span className="result-value savings">${quoteResult.monthlySavings.toFixed(2)}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Annual Savings</span>
                      <span className="result-value savings highlight">${quoteResult.annualSavings.toFixed(2)}</span>
                    </div>
                    {quoteResult.tradeInValue > 0 && (
                      <>
                        <div className="result-item">
                          <span className="result-label">Trade-In Credit</span>
                          <span className="result-value savings">${quoteResult.tradeInValue.toFixed(2)}</span>
                        </div>
                        <div className="result-item">
                          <span className="result-label">First Bill with Credit</span>
                          <span className="result-value">${quoteResult.firstBillWithCredit.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    <div className="result-item">
                      <span className="result-label">Savings per Line</span>
                      <span className="result-value">${quoteResult.perLineSavings.toFixed(2)}/line</span>
                    </div>
                    <div className="calculator-disclaimer">
                      {quoteResult.isRealQuote 
                        ? "*This is a real-time quote based on current AT&T pricing and promotions. Final pricing may vary based on credit approval and location. For complete details, please contact our team."
                        : "*This is an estimate based on typical AT&T switching savings. Actual savings may vary based on your specific plan, location, and current promotions. For an accurate quote, please upload your bill using the form above or contact our team."
                      }
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Bill upload workflow">
          <div className="section-head">
            <div>
              <div className="mono">Pipeline automation</div>
              <h2>Front-page intake that becomes rep-ready work.</h2>
            </div>
            <p>
              The upload is only the beginning. The platform turns the submission into a record and
              keeps the next step visible for the team.
            </p>
          </div>
          <div className="system-grid">
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
