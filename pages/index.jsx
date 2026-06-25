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

  const update = event => {
    const { name, value, type, checked } = event.target;
    setForm(current => ({ ...current, [name]: type === "checkbox" ? checked : value }));
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
        @media (max-width: 980px) {
          .hero { grid-template-columns: 1fr; min-height: auto; }
          .proof, .system-grid, .products { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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
      </main>
    </>
  );
}
