import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppInstallMeta from "../components/AppInstallMeta";

const APP = "https://sales.whitegwireless.com/";
const CONTACT = "mailto:humberto.wgw@gmail.com?subject=Sales%20Platform%20demo";

const MODULES = ["CRM Core", "Lead Pipeline", "AI Assistant", "Documents", "Team Analytics", "Automations"];

const FEATURES = [
  { title: "Your brand, not ours", desc: "Your logo, colors, and domain — nothing on the platform says White Glove Wireless." },
  { title: "Configurable pipeline", desc: "Stages, roles, and workflow shaped to how your team actually sells, not a generic CRM template." },
  { title: "AI assistant built in", desc: "Lead follow-up, drafting, and summarization run inside the platform instead of a bolted-on add-on." },
  { title: "Calling, SMS, and lead workflows", desc: "Outreach and lead intake live in the same system as the pipeline, not a separate tool you have to reconcile." },
  { title: "Hiring and onboarding modules", desc: "Bring on new reps with built-in onboarding steps instead of a spreadsheet and a Slack channel." },
  { title: "Team analytics", desc: "See what's moving and what's stuck without exporting to another dashboard tool." },
];

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 197,
    color: "#a78bfa",
    features: ["Up to 3 seats", "Core CRM + lead pipeline", "Your branding and domain from day one", "Calling and SMS workflows", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 397,
    color: "#c4b5fd",
    popular: true,
    features: ["Up to 10 seats", "Everything in Starter", "AI assistant + automations", "Team analytics", "Priority support"],
  },
  {
    id: "agency",
    name: "Agency",
    price: 697,
    color: "#f0abfc",
    features: ["Unlimited seats", "Everything in Growth", "Sub-account / multi-client mode", "Hiring & onboarding modules", "Dedicated support"],
  },
];

export default function SalesPlatform() {
  return (
    <>
      <Head>
        <title>Sales Platform — White-Label CRM & AI Sales OS</title>
        <meta
          name="description"
          content="A configurable CRM and AI sales operating system you can license, brand as your own, and run your team on. In active development."
        />
        <meta property="og:title" content="Sales Platform — White-Label CRM & AI Sales OS" />
        <meta property="og:description" content="License a configurable CRM and AI sales operating system under your own brand." />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppInstallMeta slug="sales-platform" name="Sales Platform" themeColor="#a78bfa" />
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #070611; color: #f7f5ff; font-family: Manrope, sans-serif; }
        a { color: inherit; }
        .builder { min-height: 100vh; background: linear-gradient(125deg, #070611 50%, #100b27); }
        nav { width: min(1180px, calc(100% - 48px)); margin: 0 auto; height: 76px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(167,139,250,.16); }
        .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .brand img { border-radius: 12px; }
        .mono { font: 9px "DM Mono", monospace; letter-spacing: .13em; text-transform: uppercase; color: #9189aa; }
        .nav-actions { display: flex; gap: 10px; align-items: center; }
        a.ghost, a.open { display: inline-block; text-decoration: none; font: 10px "DM Mono", monospace; text-transform: uppercase; letter-spacing: .08em; padding: 10px 14px; border-radius: 6px; }
        a.ghost { color: #c9c2e0; border: 1px solid rgba(167,139,250,.24); }
        a.open { background: #a78bfa; color: #0b0815; }

        .badge { display: inline-flex; align-items: center; gap: 8px; font: 10px "DM Mono", monospace; letter-spacing: .1em; text-transform: uppercase; color: #f0abfc; background: rgba(240,171,252,.1); border: 1px solid rgba(240,171,252,.28); border-radius: 20px; padding: 7px 14px; margin-bottom: 22px; }

        .canvas { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 70px 0 60px; }
        .canvas h1 { max-width: 800px; font-size: clamp(44px, 6.5vw, 84px); line-height: .95; letter-spacing: -.05em; margin: 0 0 22px; }
        .canvas h1 span { color: #a78bfa; }
        .canvas-copy { max-width: 600px; color: #a89fc2; line-height: 1.75; font-size: 15px; margin: 0 0 32px; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        .layer-stage { margin-top: 70px; min-height: 420px; position: relative; perspective: 1100px; }
        .layer { position: absolute; width: min(680px, 82%); height: 250px; left: 8%; border: 1px solid rgba(167,139,250,.22); border-radius: 24px; background: linear-gradient(145deg, rgba(255,255,255,.08), rgba(92,58,190,.08)); box-shadow: 0 35px 80px rgba(0,0,0,.42); transform: rotateX(58deg) rotateZ(-7deg); padding: 28px; }
        .layer.one { top: 0; opacity: .35; }
        .layer.two { top: 70px; left: 13%; opacity: .62; }
        .layer.three { top: 140px; left: 18%; opacity: 1; background: linear-gradient(145deg, #241848, #120e25); }
        .layer-label { font: 9px "DM Mono", monospace; color: #a78bfa; letter-spacing: .12em; }
        .blocks { display: grid; grid-template-columns: 1.2fr .8fr; gap: 12px; margin-top: 22px; }
        .block { height: 105px; background: rgba(255,255,255,.05); border: 1px solid rgba(167,139,250,.12); padding: 16px; }
        .block strong { display: block; margin-bottom: 6px; font-size: 13px; }
        .block span { font-size: 10px; color: #8d84a6; }
        .stage-logo { position: absolute; right: 3%; top: 20px; width: 170px; height: auto; border-radius: 24%; filter: drop-shadow(0 25px 40px #000); }

        .section { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 80px 0; border-top: 1px solid rgba(167,139,250,.14); }
        .section-head { max-width: 620px; margin-bottom: 40px; }
        .section-head .mono { display: block; margin-bottom: 10px; }
        .section-head h2 { font-size: clamp(28px, 3.5vw, 42px); letter-spacing: -.03em; margin: 0 0 12px; }
        .section-head p { color: #a89fc2; line-height: 1.7; margin: 0; }

        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .feature-card { border: 1px solid rgba(167,139,250,.16); background: rgba(255,255,255,.03); padding: 24px; border-radius: 14px; }
        .feature-card strong { display: block; font-size: 15px; margin-bottom: 8px; }
        .feature-card span { color: #9890ac; font-size: 12.5px; line-height: 1.65; }

        .price-note { display: inline-block; font-size: 11px; color: #34d399; background: rgba(52,211,153,.1); border: 1px solid rgba(52,211,153,.3); border-radius: 20px; padding: 6px 14px; font-weight: 600; margin-bottom: 32px; }
        .price-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
        .price-card { border: 1px solid rgba(167,139,250,.16); background: rgba(255,255,255,.03); border-radius: 14px; padding: 28px; position: relative; }
        .price-card.popular { border-color: rgba(196,181,253,.5); background: rgba(167,139,250,.06); }
        .price-card .most-popular { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #c4b5fd; color: #0b0815; font-size: 9px; padding: 4px 12px; border-radius: 10px; letter-spacing: .1em; font-weight: 700; }
        .price-name { font: 10px "DM Mono", monospace; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 10px; }
        .price-amount { display: flex; align-items: baseline; gap: 4px; margin-bottom: 22px; }
        .price-amount b { font-size: 38px; letter-spacing: -.02em; }
        .price-amount span { color: #8d84a6; font-size: 12px; }
        .price-feature { display: flex; gap: 8px; margin-bottom: 10px; align-items: flex-start; font-size: 12.5px; color: #c2bcd6; }
        .price-cta { display: block; text-align: center; margin-top: 22px; padding: 13px; border-radius: 8px; text-decoration: none; font: 10px "DM Mono", monospace; letter-spacing: .08em; text-transform: uppercase; border: 1px solid rgba(167,139,250,.4); color: #d7d2ea; }
        .price-card.popular .price-cta { background: #a78bfa; color: #0b0815; border-color: #a78bfa; }
        .price-disclaimer { margin-top: 28px; color: #756c8d; font-size: 11.5px; line-height: 1.7; max-width: 640px; }

        .bottom { display: grid; grid-template-columns: repeat(3, 1fr); }
        .bottom div { padding: 0 30px 0 0; }
        .bottom b { color: #a78bfa; font: 10px "DM Mono", monospace; letter-spacing: .08em; display: block; margin-bottom: 8px; }
        .bottom p { color: #8f87a8; font-size: 12px; line-height: 1.65; margin: 0; }

        footer.sp-footer { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 40px 0 60px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid rgba(167,139,250,.14); color: #756c8d; font: 10px "DM Mono", monospace; letter-spacing: .06em; text-transform: uppercase; }
        footer.sp-footer a { text-decoration: none; }

        @media (max-width: 850px) {
          .layer-stage { min-height: 380px; }
          .stage-logo { width: 120px; }
          .feature-grid { grid-template-columns: repeat(2, 1fr); }
          .bottom { grid-template-columns: 1fr; gap: 24px; }
          .bottom div { padding: 0; }
        }
        @media (max-width: 560px) {
          nav { padding: 0 4px; }
          .nav-actions .ghost { display: none; }
          .feature-grid { grid-template-columns: 1fr; }
          .layer { width: 96%; left: 0; }
          .layer.two { left: 2%; }
          .layer.three { left: 4%; }
        }
      `}</style>

      <main className="builder">
        <nav>
          <Link href="/" className="brand">
            <Image src="/logos/sales-platform-app-icon-selected.png" alt="" width={40} height={40} />
            <div>
              <strong>Sales Platform</strong>
              <div className="mono">White-label CRM &amp; sales OS</div>
            </div>
          </Link>
          <div className="nav-actions">
            <Link href="/apps" className="ghost">All apps</Link>
            <a className="ghost" href={CONTACT}>Talk to us</a>
            <a className="open" href={APP} target="_blank" rel="noopener noreferrer">See live preview ↗</a>
          </div>
        </nav>

        <section className="canvas">
          <span className="badge">● In active development — early access</span>
          <h1>Run your business on<br /><span>a platform you can call your own.</span></h1>
          <p className="canvas-copy">
            Sales Platform is the configurable CRM and AI sales operating system we built to run our own
            wireless sales operation — stripped of our branding so you can put yours on it instead. Pipeline,
            calling, SMS, AI assistance, and team analytics in one system, not six subscriptions stitched together.
          </p>
          <div className="hero-actions">
            <a className="open" style={{ padding: "13px 22px", borderRadius: 8 }} href={CONTACT}>Request early access</a>
            <a className="ghost" style={{ padding: "13px 22px", borderRadius: 8 }} href={APP} target="_blank" rel="noopener noreferrer">See live preview ↗</a>
          </div>

          <div className="layer-stage">
            <div className="layer one"><span className="layer-label">FOUNDATION · DATA · SECURITY</span></div>
            <div className="layer two"><span className="layer-label">MODULES · WORKFLOWS · AUTOMATION</span></div>
            <div className="layer three">
              <span className="layer-label">YOUR BRANDED PLATFORM</span>
              <div className="blocks">
                <div className="block"><strong>Pipeline workspace</strong><span>Configurable stages and team views</span></div>
                <div className="block"><strong>AI layer</strong><span>Context across every module</span></div>
              </div>
            </div>
            <Image className="stage-logo" src="/logos/sales-platform-app-icon-selected.png" alt="Sales Platform logo" width={200} height={200} />
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <span className="mono">MODULES</span>
            <h2>Turn on what your team needs.</h2>
            <p>Every plan starts from the same foundation. Modules stay off until you turn them on, so the platform never feels heavier than your team is ready for.</p>
          </div>
          <div className="feature-grid">
            {FEATURES.map(f => (
              <div className="feature-card" key={f.title}>
                <strong>{f.title}</strong>
                <span>{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-head">
            <span className="mono">PRICING</span>
            <h2>One platform fee. No per-tool sprawl.</h2>
            <p>Priced against configurable, white-label CRM platforms — not a bare-bones pipeline tool. Every tier can be branded and deployed as your own product.</p>
          </div>
          <div className="price-note">Early access pricing while the platform is in active development</div>
          <div className="price-grid">
            {PLANS.map(plan => (
              <div className={`price-card${plan.popular ? " popular" : ""}`} key={plan.id}>
                {plan.popular && <div className="most-popular">MOST POPULAR</div>}
                <div className="price-name" style={{ color: plan.color }}>{plan.name}</div>
                <div className="price-amount"><b>${plan.price}</b><span>/mo</span></div>
                {plan.features.map(f => (
                  <div className="price-feature" key={f}>
                    <span style={{ color: plan.color }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
                <a className="price-cta" href={CONTACT}>Request {plan.name}</a>
              </div>
            ))}
          </div>
          <p className="price-disclaimer">
            Sales Platform is separate from White Glove Wireless — no White Glove branding, pricing, or wireless-specific
            workflows ship with it. Pricing reflects an early-access platform still being built out; final packaging may
            change before general availability.
          </p>
        </section>

        <section className="section">
          <div className="bottom">
            <div><b>01 · BUILD</b><p>Choose the foundation and business model.</p></div>
            <div><b>02 · BRAND</b><p>Apply language, colors, domain, and identity.</p></div>
            <div><b>03 · DEPLOY</b><p>Launch one platform — or a portfolio of them.</p></div>
          </div>
        </section>

        <footer className="sp-footer">
          <span>Sales Platform · a White Glove Wireless portfolio product</span>
          <a href={CONTACT}>humberto.wgw@gmail.com</a>
        </footer>
      </main>
    </>
  );
}
