import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const PRODUCTS = [
  {
    id: "wgw",
    eyebrow: "AI SALES OPERATING SYSTEM",
    name: "White Glove Wireless",
    shortName: "WGW",
    description:
      "A premium AI sales command center that helps wireless teams find opportunities, coach reps, manage follow-up, and close more business.",
    steps: ["FIND", "ENGAGE", "COACH", "CLOSE"],
    logo: "/logos/white-glove-wireless-app-icon-selected.png",
    accent: "#f59e0b",
    accent2: "#f97316",
    rgb: "245,158,11",
    surface: "#17120d",
    glow: "radial-gradient(circle at 50% 28%, rgba(245,158,11,.27), transparent 43%)",
    pattern:
      "linear-gradient(135deg, rgba(255,255,255,.035) 0 1px, transparent 1px 18px)",
    status: "LIVE",
    action: "Explore WGW",
    destination: "wireless",
  },
  {
    id: "ss",
    eyebrow: "AI FINANCIAL INTELLIGENCE",
    name: "SpendSense",
    shortName: "SS",
    description:
      "An AI finance guide that connects accounts, understands spending, reveals patterns, and helps people make smarter money decisions.",
    steps: ["CONNECT", "UNDERSTAND", "PLAN", "GROW"],
    logo: "/logos/spendsense-brand-lockup-selected.png",
    accent: "#2dd4bf",
    accent2: "#0f9f8f",
    rgb: "45,212,191",
    surface: "#071b1a",
    glow: "radial-gradient(circle at 50% 30%, rgba(45,212,191,.25), transparent 44%)",
    pattern:
      "radial-gradient(circle, rgba(45,212,191,.16) 1px, transparent 1.5px)",
    status: "LIVE",
    action: "Explore SpendSense",
    destination: "spendsense",
  },
  {
    id: "sp",
    eyebrow: "CONFIGURABLE WHITE-LABEL CRM",
    name: "Sales Platform",
    shortName: "SP",
    description:
      "A modular business platform that can be branded, configured, and launched for different industries without rebuilding the foundation.",
    steps: ["BUILD", "BRAND", "CONFIGURE", "SCALE"],
    logo: "/logos/sales-platform-app-icon-selected.png",
    accent: "#a78bfa",
    accent2: "#6366f1",
    rgb: "167,139,250",
    surface: "#100c24",
    glow: "radial-gradient(circle at 50% 30%, rgba(139,92,246,.3), transparent 45%)",
    pattern:
      "linear-gradient(135deg, rgba(167,139,250,.09) 25%, transparent 25% 50%, rgba(99,102,241,.08) 50% 75%, transparent 75%)",
    status: "PRIVATE BETA",
    action: "Open Platform",
    destination: "https://salesplatform-frontend-1zyqk0c1t-humberto-s-projects7.vercel.app",
  },
  {
    id: "rs",
    eyebrow: "AI AUTOMOTIVE REPAIR SCOUT",
    name: "RepairScout",
    shortName: "RS",
    description:
      "A mechanic-focused repair guide that helps drivers understand warning signs, compare likely repairs, and find trustworthy local shops.",
    steps: ["DESCRIBE", "DIAGNOSE", "COMPARE", "VERIFY"],
    logo: "/logos/repairscout-brand-lockup-selected.png",
    accent: "#c8ff18",
    accent2: "#84cc16",
    rgb: "200,255,24",
    surface: "#111907",
    glow: "radial-gradient(circle at 50% 30%, rgba(200,255,24,.22), transparent 45%)",
    pattern:
      "repeating-radial-gradient(circle at 50% 90%, rgba(200,255,24,.08) 0 1px, transparent 2px 15px)",
    status: "LIVE",
    action: "Launch RepairScout",
    destination: "https://repairscout-smoky.vercel.app",
  },
  {
    id: "tt",
    eyebrow: "LIVE FOOD TRUCK DISCOVERY",
    name: "TruckTracker",
    shortName: "TT",
    description:
      "A social discovery map where food trucks go live, customers find what is nearby, and local food communities grow in real time.",
    steps: ["GO LIVE", "DISCOVER", "VISIT", "FOLLOW"],
    logo: "/logos/trucktracker-app-icon-selected.png",
    accent: "#ffb21c",
    accent2: "#ff4538",
    rgb: "255,178,28",
    surface: "#201307",
    glow: "radial-gradient(circle at 50% 30%, rgba(255,178,28,.25), transparent 43%)",
    pattern:
      "radial-gradient(circle at 25% 25%, rgba(255,69,56,.12) 0 2px, transparent 3px), radial-gradient(circle at 75% 70%, rgba(255,178,28,.1) 0 2px, transparent 3px)",
    status: "LIVE",
    action: "Find Food Trucks",
    destination: "https://trucktracker-eight.vercel.app",
  },
  {
    id: "pass",
    eyebrow: "MULTI-MODEL AI KITCHEN",
    name: "The Pass",
    shortName: "TP",
    description:
      "Tell the kitchen what ingredients you have. An AI chef brigade invents, refines, and critiques a recipe you can actually make.",
    steps: ["LIST", "CREATE", "REFINE", "SERVE"],
    logo: "/logos/the-pass-app-icon.svg",
    accent: "#e8541e",
    accent2: "#f3b562",
    rgb: "232,84,30",
    surface: "#17130f",
    glow: "radial-gradient(circle at 50% 30%, rgba(232,84,30,.24), transparent 45%)",
    pattern:
      "repeating-linear-gradient(0deg, rgba(242,235,221,.04) 0 1px, transparent 1px 22px)",
    status: "LIVE",
    action: "Enter The Kitchen",
    destination: "the-pass",
  },
];

function ProductCard({ product, featured, active, onEnter, onLeave, onOpen }) {
  return (
    <article
      className={`product-card ${featured ? "featured" : ""} ${active ? "active" : ""}`}
      style={{
        "--accent": product.accent,
        "--accent-2": product.accent2,
        "--rgb": product.rgb,
        "--surface": product.surface,
        "--brand-glow": product.glow,
        "--brand-pattern": product.pattern,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <div className="card-aura" />
      <div className="card-pattern" />

      <div className="card-topline">
        <span className="project-index">0{PRODUCTS.indexOf(product) + 1}</span>
        <span className="status">
          <i />
          {product.status}
        </span>
      </div>

      <div className="logo-stage">
        <div className="logo-halo" />
        <Image
          src={product.logo}
          alt={`${product.name} logo`}
          width={featured ? 420 : 330}
          height={featured ? 420 : 330}
          sizes={featured ? "(max-width: 760px) 82vw, 420px" : "(max-width: 760px) 78vw, 330px"}
          className="project-logo"
          priority={featured}
        />
      </div>

      <div className="card-copy">
        <div className="eyebrow">{product.eyebrow}</div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <div className="steps" aria-label={`${product.name} workflow`}>
          {product.steps.map((step, index) => (
            <span key={step}>
              {step}
              {index < product.steps.length - 1 && <b>·</b>}
            </span>
          ))}
        </div>

        <button className="launch-button" onClick={() => onOpen(product)}>
          <span>{product.action}</span>
          <span className="arrow">↗</span>
        </button>
      </div>
    </article>
  );
}

export default function Chooser() {
  const [hovered, setHovered] = useState("wgw");
  const router = useRouter();

  const openProduct = (product) => {
    if (product.destination.startsWith("http")) {
      window.open(product.destination, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(`/${product.destination}`);
  };

  return (
    <>
      <Head>
        <title>Humberto Labs — Six Products, One Builder</title>
        <meta
          name="description"
          content="Explore White Glove Wireless, SpendSense, Sales Platform, RepairScout, TruckTracker, and The Pass."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        :root {
          color-scheme: dark;
          --page: #050507;
          --ink: #f7f7f5;
          --muted: #92929c;
          --line: rgba(255, 255, 255, 0.09);
        }

        * {
          box-sizing: border-box;
        }

        html {
          background: var(--page);
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          min-width: 320px;
          color: var(--ink);
          background:
            radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.075), transparent 35%),
            #050507;
          font-family: "Manrope", sans-serif;
        }

        button,
        a {
          font: inherit;
        }

        .site-shell {
          min-height: 100vh;
          overflow: hidden;
        }

        .site-header {
          width: min(1440px, calc(100% - 64px));
          margin: 0 auto;
          padding: 28px 0 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line);
        }

        .wordmark {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .wordmark-mark {
          width: 34px;
          height: 34px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          color: #0a0a0c;
          font-weight: 800;
          letter-spacing: -0.08em;
          background: linear-gradient(145deg, #ffffff, #9b9ba4);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.12);
        }

        .wordmark strong {
          display: block;
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .wordmark small,
        .header-meta {
          color: #676772;
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero {
          width: min(1180px, calc(100% - 64px));
          margin: 0 auto;
          padding: 90px 0 74px;
          text-align: center;
          position: relative;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 720px;
          height: 320px;
          left: 50%;
          top: 26px;
          transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(255, 255, 255, 0.07), transparent 66%);
          pointer-events: none;
        }

        .kicker {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          color: #a8a8b2;
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .kicker::before,
        .kicker::after {
          content: "";
          width: 36px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #74747e);
        }

        .kicker::after {
          transform: rotate(180deg);
        }

        .hero h1 {
          position: relative;
          max-width: 920px;
          margin: 0 auto 24px;
          font-size: clamp(48px, 7.2vw, 96px);
          line-height: 0.95;
          letter-spacing: -0.065em;
          text-wrap: balance;
        }

        .hero h1 span {
          color: #777782;
        }

        .hero p {
          position: relative;
          max-width: 650px;
          margin: 0 auto;
          color: #85858f;
          font-size: 15px;
          line-height: 1.8;
          text-wrap: balance;
        }

        .portfolio {
          width: min(1440px, calc(100% - 64px));
          margin: 0 auto 72px;
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 18px;
        }

        .product-card {
          --accent: #fff;
          --accent-2: #aaa;
          --rgb: 255,255,255;
          grid-column: span 4;
          min-height: 650px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          isolation: isolate;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 32%),
            var(--surface);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .product-card.active {
          transform: translateY(-6px);
          border-color: rgba(var(--rgb), 0.42);
          box-shadow:
            0 28px 80px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(var(--rgb), 0.06) inset;
        }

        .card-aura,
        .card-pattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
        }

        .card-aura {
          background: var(--brand-glow);
          opacity: 0.72;
          transition: opacity 0.35s ease, transform 0.5s ease;
        }

        .active .card-aura {
          opacity: 1;
          transform: scale(1.07);
        }

        .card-pattern {
          background-image: var(--brand-pattern);
          background-size: 24px 24px;
          mask-image: linear-gradient(to bottom, #000, transparent 68%);
          opacity: 0.45;
        }

        .card-topline {
          position: absolute;
          z-index: 3;
          top: 22px;
          left: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .project-index {
          color: rgba(255, 255, 255, 0.28);
        }

        .status {
          display: flex;
          align-items: center;
          gap: 7px;
          color: rgba(255, 255, 255, 0.46);
        }

        .status i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
        }

        .logo-stage {
          min-height: 365px;
          padding: 54px 30px 10px;
          display: grid;
          place-items: center;
          position: relative;
        }

        .logo-halo {
          position: absolute;
          width: 64%;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid rgba(var(--rgb), 0.13);
          box-shadow:
            0 0 0 28px rgba(var(--rgb), 0.025),
            0 0 0 58px rgba(var(--rgb), 0.018);
          opacity: 0.5;
          transform: scale(0.88);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }

        .active .logo-halo {
          opacity: 1;
          transform: scale(1);
        }

        .project-logo {
          position: relative;
          z-index: 2;
          width: min(100%, 330px);
          height: auto;
          border-radius: 23%;
          object-fit: contain;
          filter: saturate(0.94) drop-shadow(0 22px 36px rgba(0, 0, 0, 0.5));
          transition: transform 0.48s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;
        }

        .active .project-logo {
          transform: translateY(-5px) scale(1.025);
          filter: saturate(1.08) drop-shadow(0 28px 42px rgba(0, 0, 0, 0.52));
        }

        .card-copy {
          flex: 1;
          padding: 16px 30px 30px;
          display: flex;
          flex-direction: column;
        }

        .eyebrow {
          margin-bottom: 12px;
          color: var(--accent);
          font-family: "DM Mono", monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
        }

        .card-copy h2 {
          margin: 0 0 12px;
          color: #fff;
          font-size: clamp(27px, 2.5vw, 38px);
          line-height: 1;
          letter-spacing: -0.045em;
        }

        .card-copy p {
          margin: 0 0 22px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 12px;
          line-height: 1.75;
        }

        .steps {
          margin-top: auto;
          padding: 14px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          border-top: 1px solid rgba(255, 255, 255, 0.075);
          color: rgba(255, 255, 255, 0.36);
          font-family: "DM Mono", monospace;
          font-size: 8px;
          letter-spacing: 0.09em;
        }

        .steps span {
          display: flex;
          gap: 7px;
        }

        .steps b {
          color: var(--accent);
          font-weight: 400;
        }

        .launch-button {
          width: 100%;
          margin-top: 4px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          border: 1px solid rgba(var(--rgb), 0.24);
          border-radius: 12px;
          background: rgba(var(--rgb), 0.07);
          cursor: pointer;
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .launch-button:hover,
        .launch-button:focus-visible {
          outline: none;
          border-color: rgba(var(--rgb), 0.58);
          background: rgba(var(--rgb), 0.14);
          transform: translateY(-1px);
        }

        .arrow {
          color: var(--accent);
          font-size: 15px;
        }

        .site-footer {
          width: min(1440px, calc(100% - 64px));
          margin: 0 auto;
          padding: 28px 0 42px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          border-top: 1px solid var(--line);
          color: #5f5f69;
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 1100px) {
          .product-card {
            grid-column: span 6;
          }

        }

        @media (max-width: 720px) {
          .site-header,
          .hero,
          .portfolio,
          .site-footer {
            width: min(100% - 28px, 640px);
          }

          .site-header {
            padding-top: 18px;
          }

          .header-meta {
            display: none;
          }

          .hero {
            padding: 64px 0 52px;
          }

          .hero h1 {
            font-size: clamp(46px, 15vw, 70px);
          }

          .hero p {
            font-size: 13px;
          }

          .portfolio {
            display: block;
          }

          .product-card {
            min-height: 610px;
            margin-bottom: 14px;
          }

          .logo-stage {
            min-height: 330px;
            padding-left: 22px;
            padding-right: 22px;
          }

          .project-logo {
            width: min(100%, 300px);
          }

          .card-copy {
            padding: 12px 24px 24px;
          }

          .site-footer {
            flex-direction: column;
            line-height: 1.7;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <main className="site-shell">
        <header className="site-header">
          <div className="wordmark">
            <span className="wordmark-mark">HL</span>
            <span>
              <strong>Humberto Labs</strong>
              <small>Independent Product Studio</small>
            </span>
          </div>
          <span className="header-meta">Six products · one ecosystem</span>
        </header>

        <section className="hero">
          <div className="kicker">Built from real problems</div>
          <h1>
            Six products.
            <br />
            <span>Six distinct worlds.</span>
          </h1>
          <p>
            A growing portfolio of AI-powered tools for sales, money, business operations,
            automotive repair, local food discovery, and everyday cooking—each designed with
            its own identity.
          </p>
        </section>

        <section className="portfolio" aria-label="Product portfolio">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              featured={index === 0}
              active={hovered === product.id}
              onEnter={() => setHovered(product.id)}
              onLeave={() => setHovered(null)}
              onOpen={openProduct}
            />
          ))}
        </section>

        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Humberto Labs</span>
          <span>Designed and built as one connected portfolio</span>
        </footer>
      </main>
    </>
  );
}
