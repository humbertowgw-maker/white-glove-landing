import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

/* ── Mini mockup sub-components ── */
function WGWMockup({ active }) {
  const rows = [
    { name: "Sarah K.", stage: "Cold Call", color: "#f97316", icon: "📞" },
    { name: "Mike R.",  stage: "Follow-Up", color: "#fbbf24", icon: "💬" },
    { name: "Ana L.",   stage: "Closing",   color: "#4ade80", icon: "🤝" },
  ];
  return (
    <div style={{
      background: "rgba(249,115,22,.04)", border: "1px solid rgba(249,115,22,.12)",
      borderRadius: 8, padding: "10px", maxWidth: 240, margin: "0 auto 24px",
      opacity: active ? 1 : 0.55, transition: "opacity .4s",
    }}>
      <div style={{ fontSize: 8, color: "#f97316", letterSpacing: ".14em", marginBottom: 8, opacity: .7 }}>AI REP BOARD</div>
      {rows.map(r => (
        <div key={r.name} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "6px 8px", borderRadius: 4, marginBottom: 4,
          background: "rgba(249,115,22,.05)", border: "1px solid rgba(249,115,22,.08)",
        }}>
          <span style={{ fontSize: 10, color: "#94a3b8" }}>{r.icon} {r.name}</span>
          <span style={{ fontSize: 8, color: r.color, letterSpacing: ".06em", border: `1px solid ${r.color}44`, borderRadius: 3, padding: "2px 5px" }}>{r.stage}</span>
        </div>
      ))}
    </div>
  );
}

function SpendSenseMockup({ active }) {
  const cats = [
    { label: "Dining",    pct: 52, amt: "$420" },
    { label: "Transport", pct: 22, amt: "$180" },
    { label: "Shopping",  pct: 73, amt: "$590" },
  ];
  return (
    <div style={{
      background: "rgba(20,184,166,.04)", border: "1px solid rgba(20,184,166,.12)",
      borderRadius: 8, padding: "10px", maxWidth: 240, margin: "0 auto 24px",
      opacity: active ? 1 : 0.55, transition: "opacity .4s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 8, color: "#14b8a6", letterSpacing: ".14em", opacity: .7 }}>MAY BUDGET</span>
        <span style={{ fontSize: 10, color: "#f1f5f9", fontWeight: 500 }}>$3,240</span>
      </div>
      <div style={{ height: 4, background: "rgba(20,184,166,.12)", borderRadius: 2, marginBottom: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: "76%", background: "linear-gradient(90deg,#14b8a6,#0d9488)", borderRadius: 2 }}/>
      </div>
      {cats.map(c => (
        <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <span style={{ fontSize: 8, color: "#475569", width: 56, flexShrink: 0 }}>{c.label}</span>
          <div style={{ flex: 1, height: 3, background: "rgba(20,184,166,.1)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${c.pct}%`, background: "#14b8a6", borderRadius: 2 }}/>
          </div>
          <span style={{ fontSize: 8, color: "#64748b", width: 30, textAlign: "right" }}>{c.amt}</span>
        </div>
      ))}
    </div>
  );
}

function SalesPlatformMockup({ active }) {
  const cols = [
    { label: "QUALIFY",  deals: ["Acme Corp", "Bright Co"], color: "#6366f1" },
    { label: "PROPOSAL", deals: ["TechFlow", "Metro AI"],   color: "#818cf8" },
    { label: "CLOSE",    deals: ["Zenith"],                  color: "#4ade80" },
  ];
  return (
    <div style={{
      background: "rgba(99,102,241,.04)", border: "1px solid rgba(99,102,241,.12)",
      borderRadius: 8, padding: "10px", maxWidth: 260, margin: "0 auto 24px",
      opacity: active ? 1 : 0.55, transition: "opacity .4s",
    }}>
      <div style={{ fontSize: 8, color: "#6366f1", letterSpacing: ".14em", marginBottom: 8, opacity: .7 }}>AI PIPELINE</div>
      <div style={{ display: "flex", gap: 4 }}>
        {cols.map(c => (
          <div key={c.label} style={{ flex: 1 }}>
            <div style={{ fontSize: 7, color: c.color, letterSpacing: ".08em", marginBottom: 4, opacity: .8 }}>{c.label}</div>
            {c.deals.map(d => (
              <div key={d} style={{
                fontSize: 8, color: "#94a3b8", background: "rgba(99,102,241,.08)",
                border: "1px solid rgba(99,102,241,.15)", borderRadius: 3,
                padding: "4px 5px", marginBottom: 3,
              }}>{d}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function RepairScoutMockup({ active }) {
  const causes = [
    { label: "Brake pads", pct: 78, color: "#4ade80" },
    { label: "Rotors", pct: 54, color: "#fbbf24" },
    { label: "Wheel bearing", pct: 21, color: "#94a3b8" },
  ];
  return (
    <div style={{
      background: "rgba(34,197,94,.04)", border: "1px solid rgba(34,197,94,.13)",
      borderRadius: 8, padding: "10px", maxWidth: 250, margin: "0 auto 24px",
      opacity: active ? 1 : 0.55, transition: "opacity .4s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 8, color: "#4ade80", letterSpacing: ".14em", opacity: .75 }}>AI REPAIR CHECK</span>
        <span style={{ fontSize: 8, color: "#94a3b8" }}>2019 ACCORD</span>
      </div>
      {causes.map(c => (
        <div key={c.label} style={{ marginBottom: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 8, color: "#94a3b8" }}>{c.label}</span>
            <span style={{ fontSize: 8, color: c.color }}>{c.pct}%</span>
          </div>
          <div style={{ height: 3, background: "rgba(34,197,94,.1)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 2 }}/>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(34,197,94,.12)", paddingTop: 7, marginTop: 8 }}>
        <span style={{ fontSize: 8, color: "#64748b" }}>EST. REPAIR</span>
        <span style={{ fontSize: 10, color: "#f1f5f9", fontWeight: 600 }}>$230–$540</span>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function Chooser() {
  const [hover, setHover] = useState(null);
  const router = useRouter();

  const go = (side) => {
    if (side === "wgw") router.push("/wireless");
    else if (side === "ss") router.push("/spendsense");
    else if (side === "sp") window.open("https://salesplatform-frontend-1zyqk0c1t-humberto-s-projects7.vercel.app", "_blank");
    else window.open("https://repairscout-smoky.vercel.app", "_blank");
  };

  const w = (side) => hover === side ? "46%" : hover ? "18%" : "25%";

  const PANEL = {
    wgw: { c: "#f97316", bg: "radial-gradient(ellipse at 30% 40%,#200e00 0%,#080910 65%)" },
    ss:  { c: "#14b8a6", bg: "radial-gradient(ellipse at 70% 40%,#001f1d 0%,#060a12 65%)" },
    sp:  { c: "#6366f1", bg: "radial-gradient(ellipse at 50% 40%,#0d0d30 0%,#07070f 65%)" },
    rs:  { c: "#22c55e", bg: "radial-gradient(ellipse at 60% 40%,#05200f 0%,#060a0a 65%)" },
  };

  const dotGrid = `radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)`;

  return (
    <>
      <Head>
        <title>Humberto Labs — WGW · SpendSense · Sales Platform · RepairScout</title>
        <meta name="description" content="Four AI-powered platforms for sales, personal finance, white-label CRM, and transparent automotive repair research." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; background: #050509; }

        @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.9} }

        .panel {
          position: relative; overflow: hidden; cursor: pointer;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          transition: width .5s cubic-bezier(.4,0,.2,1);
          height: 100svh;
        }

        .panel-content {
          position: relative; z-index: 2;
          max-width: 380px; width: 94%;
          text-align: center;
          padding: 24px 0;
        }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 8.5px; letter-spacing: .22em;
          border: 1px solid; border-radius: 20px;
          padding: 5px 12px;
          margin-bottom: 20px;
          font-family: 'DM Mono', monospace;
        }

        .big-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 2.8vw, 44px);
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1;
          letter-spacing: -.01em;
          margin-bottom: 10px;
        }

        .step-line {
          font-size: 8px; letter-spacing: .22em;
          margin-bottom: 28px; font-family: 'DM Mono', monospace;
        }

        .desc {
          font-size: 11px; line-height: 1.75;
          margin: 0 auto 24px;
          font-family: 'DM Mono', monospace;
          max-width: 300px;
          transition: color .3s;
        }

        .pills {
          display: flex; flex-wrap: wrap; gap: 6px;
          justify-content: center; margin-bottom: 24px;
        }

        .pill {
          font-size: 8.5px; letter-spacing: .06em;
          padding: 4px 9px; border-radius: 3px; border: 1px solid;
          font-family: 'DM Mono', monospace;
          transition: all .2s;
        }

        .cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 30px; border-radius: 6px; border: none;
          font-size: 10px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; cursor: pointer;
          transition: all .2s;
          font-family: 'DM Mono', monospace;
        }

        .fine-print {
          margin-top: 12px; font-size: 8.5px; letter-spacing: .1em;
          font-family: 'DM Mono', monospace; opacity: .4;
        }

        .top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          z-index: 3;
        }

        .divider {
          position: absolute; top: 0; right: 0; bottom: 0; width: 1px;
          z-index: 10; pointer-events: none;
        }

        @media (max-width: 640px) {
          html, body { overflow-y: auto; }
          .chooser-wrap { flex-direction: column !important; height: auto !important; }
          .panel { width: 100% !important; height: auto !important; min-height: 60svh; }
          .divider { display: none; }
        }
      `}</style>

      <div className="chooser-wrap" style={{ display: "flex", height: "100svh", fontFamily: "'DM Mono', monospace" }}>

        {/* ── WHITE GLOVE WIRELESS ── */}
        <div
          className="panel"
          style={{ width: w("wgw"), background: hover === "wgw" ? PANEL.wgw.bg : "#070910" }}
          onClick={() => go("wgw")}
          onMouseEnter={() => setHover("wgw")}
          onMouseLeave={() => setHover(null)}
        >
          {/* dot grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>

          {/* top accent bar */}
          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#f97316,transparent)", opacity: hover === "wgw" ? 1 : 0.35, transition: "opacity .4s" }}/>

          {/* main glow */}
          <div style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(249,115,22,.22) 0%,transparent 65%)",
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: hover === "wgw" ? 1 : 0.3, transition: "opacity .5s",
            animation: hover === "wgw" ? "pulse 3s ease-in-out infinite" : "none",
          }}/>

          {/* bottom glow */}
          <div style={{
            position: "absolute", width: 280, height: 120,
            background: "radial-gradient(ellipse,rgba(249,115,22,.18) 0%,transparent 70%)",
            bottom: 60, left: "50%", transform: "translateX(-50%)",
            pointerEvents: "none", zIndex: 1,
            opacity: hover === "wgw" ? .7 : 0, transition: "opacity .5s",
          }}/>

          {/* right divider */}
          <div className="divider" style={{
            background: (hover === "wgw" || hover === "ss")
              ? "linear-gradient(180deg,transparent,rgba(249,115,22,.3) 30%,rgba(20,184,166,.3) 70%,transparent)"
              : "linear-gradient(180deg,transparent,#1a1a2e 40%,#1a1a2e 60%,transparent)",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#f97316", borderColor: "rgba(249,115,22,.25)", background: "rgba(249,115,22,.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f97316", display: "inline-block", animation: hover === "wgw" ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              AI SALES OPERATING SYSTEM
            </div>

            <div className="big-title">
              WHITE GLOVE<br />
              <span style={{ color: "#f97316" }}>WIRELESS</span>
            </div>

            <div className="step-line" style={{ color: "#f97316", opacity: .45 }}>
              FIND · ENGAGE · COACH · CLOSE · IMPROVE
            </div>

            <WGWMockup active={hover === "wgw"} />

            <p className="desc" style={{ color: hover === "wgw" ? "#94a3b8" : "#475569" }}>
              A coordinated AI team that finds opportunities, guides outreach, coaches reps in real time, and turns every outcome into the next best action.
            </p>

            <div className="pills">
              {["AI Leadership Team","Closed-Loop Sales","Live Voice Meetings","Rep Coaching","One-Click Backups"].map(f => (
                <span key={f} className="pill" style={{
                  color: hover === "wgw" ? "#f97316" : "#475569",
                  borderColor: hover === "wgw" ? "rgba(249,115,22,.3)" : "#1e2d3a",
                  background: hover === "wgw" ? "rgba(249,115,22,.06)" : "transparent",
                }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: hover === "wgw" ? "linear-gradient(135deg,#f97316,#ea580c)" : "rgba(249,115,22,.12)",
              color: hover === "wgw" ? "#000" : "#f97316",
              border: `1px solid ${hover === "wgw" ? "transparent" : "rgba(249,115,22,.2)"}`,
              boxShadow: hover === "wgw" ? "0 0 28px rgba(249,115,22,.4),0 4px 16px rgba(249,115,22,.2)" : "none",
              transform: hover === "wgw" ? "translateY(-2px)" : "none",
            }}>
              Explore WGW →
            </button>

            <div className="fine-print" style={{ color: "#f97316" }}>14-DAY FREE TRIAL · NO CARD REQUIRED</div>
          </div>
        </div>

        {/* ── SPENDSENSE ── */}
        <div
          className="panel"
          style={{ width: w("ss"), background: hover === "ss" ? PANEL.ss.bg : "#060a12" }}
          onClick={() => go("ss")}
          onMouseEnter={() => setHover("ss")}
          onMouseLeave={() => setHover(null)}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>

          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#14b8a6,transparent)", opacity: hover === "ss" ? 1 : 0.35, transition: "opacity .4s" }}/>

          <div style={{
            position: "absolute", width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(20,184,166,.2) 0%,transparent 65%)",
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: hover === "ss" ? 1 : 0.3, transition: "opacity .5s",
            animation: hover === "ss" ? "pulse 3s ease-in-out infinite" : "none",
          }}/>

          <div style={{
            position: "absolute", width: 280, height: 120,
            background: "radial-gradient(ellipse,rgba(20,184,166,.15) 0%,transparent 70%)",
            bottom: 60, left: "50%", transform: "translateX(-50%)",
            pointerEvents: "none", zIndex: 1,
            opacity: hover === "ss" ? .7 : 0, transition: "opacity .5s",
          }}/>

          {/* right divider toward sp */}
          <div className="divider" style={{
            background: (hover === "ss" || hover === "sp")
              ? "linear-gradient(180deg,transparent,rgba(20,184,166,.3) 30%,rgba(99,102,241,.3) 70%,transparent)"
              : "linear-gradient(180deg,transparent,#1a1a2e 40%,#1a1a2e 60%,transparent)",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#14b8a6", borderColor: "rgba(20,184,166,.25)", background: "rgba(20,184,166,.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#14b8a6", display: "inline-block", animation: hover === "ss" ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              PERSONAL FINANCE · AI-POWERED
            </div>

            <div className="big-title">
              SPEND<span style={{ color: "#14b8a6" }}>SENSE</span>
            </div>

            <div className="step-line" style={{ color: "#14b8a6", opacity: .45 }}>
              CONNECT · CATEGORIZE · UNDERSTAND · SAVE
            </div>

            <SpendSenseMockup active={hover === "ss"} />

            <p className="desc" style={{ color: hover === "ss" ? "#94a3b8" : "#475569" }}>
              Connect your bank, let AI categorize every transaction, and finally understand where your money actually goes — in real time.
            </p>

            <div className="pills">
              {["Bank Sync","AI Insights","Receipt Scan","Trend Charts","Smart Alerts"].map(f => (
                <span key={f} className="pill" style={{
                  color: hover === "ss" ? "#14b8a6" : "#475569",
                  borderColor: hover === "ss" ? "rgba(20,184,166,.3)" : "#0f2030",
                  background: hover === "ss" ? "rgba(20,184,166,.06)" : "transparent",
                }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: hover === "ss" ? "linear-gradient(135deg,#14b8a6,#0d9488)" : "rgba(20,184,166,.1)",
              color: hover === "ss" ? "#000" : "#14b8a6",
              border: `1px solid ${hover === "ss" ? "transparent" : "rgba(20,184,166,.18)"}`,
              boxShadow: hover === "ss" ? "0 0 28px rgba(20,184,166,.4),0 4px 16px rgba(20,184,166,.2)" : "none",
              transform: hover === "ss" ? "translateY(-2px)" : "none",
            }}>
              Get Started →
            </button>

            <div className="fine-print" style={{ color: "#14b8a6" }}>FREE TO TRY · CONNECT IN SECONDS</div>
          </div>
        </div>

        {/* ── SALES PLATFORM ── */}
        <div
          className="panel"
          style={{ width: w("sp"), background: hover === "sp" ? PANEL.sp.bg : "#07070f" }}
          onClick={() => go("sp")}
          onMouseEnter={() => setHover("sp")}
          onMouseLeave={() => setHover(null)}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>

          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#6366f1,transparent)", opacity: hover === "sp" ? 1 : 0.35, transition: "opacity .4s" }}/>

          <div style={{
            position: "absolute", width: 520, height: 520, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(99,102,241,.22) 0%,transparent 65%)",
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: hover === "sp" ? 1 : 0.3, transition: "opacity .5s",
            animation: hover === "sp" ? "pulse 3s ease-in-out infinite" : "none",
          }}/>

          <div style={{
            position: "absolute", width: 280, height: 120,
            background: "radial-gradient(ellipse,rgba(99,102,241,.18) 0%,transparent 70%)",
            bottom: 60, left: "50%", transform: "translateX(-50%)",
            pointerEvents: "none", zIndex: 1,
            opacity: hover === "sp" ? .7 : 0, transition: "opacity .5s",
          }}/>

          <div className="divider" style={{
            background: (hover === "sp" || hover === "rs")
              ? "linear-gradient(180deg,transparent,rgba(99,102,241,.3) 30%,rgba(34,197,94,.3) 70%,transparent)"
              : "linear-gradient(180deg,transparent,#1a1a2e 40%,#1a1a2e 60%,transparent)",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#6366f1", borderColor: "rgba(99,102,241,.25)", background: "rgba(99,102,241,.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: hover === "sp" ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              WHITE-LABEL · AI CRM PLATFORM
            </div>

            <div className="big-title">
              SALES<br />
              <span style={{ color: "#6366f1" }}>PLATFORM</span>
            </div>

            <div className="step-line" style={{ color: "#6366f1", opacity: .45 }}>
              BUILD · BRAND · DEPLOY · SCALE
            </div>

            <SalesPlatformMockup active={hover === "sp"} />

            <p className="desc" style={{ color: hover === "sp" ? "#94a3b8" : "#475569" }}>
              A fully white-label AI sales CRM — brand it, deploy it for your own team, or resell to clients with AI assistant, lead pipeline, and 14-day trials built in.
            </p>

            <div className="pills">
              {["White-Label Branding","AI Sales Assistant","Lead Pipeline","14-Day Trial","Multi-Tenant"].map(f => (
                <span key={f} className="pill" style={{
                  color: hover === "sp" ? "#818cf8" : "#475569",
                  borderColor: hover === "sp" ? "rgba(99,102,241,.3)" : "#1e1e3a",
                  background: hover === "sp" ? "rgba(99,102,241,.07)" : "transparent",
                }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: hover === "sp" ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "rgba(99,102,241,.1)",
              color: hover === "sp" ? "#fff" : "#818cf8",
              border: `1px solid ${hover === "sp" ? "transparent" : "rgba(99,102,241,.2)"}`,
              boxShadow: hover === "sp" ? "0 0 28px rgba(99,102,241,.5),0 4px 16px rgba(99,102,241,.25)" : "none",
              transform: hover === "sp" ? "translateY(-2px)" : "none",
            }}>
              Sign In →
            </button>

            <div className="fine-print" style={{ color: "#6366f1" }}>EARLY ACCESS · 14-DAY FREE TRIAL</div>
          </div>
        </div>

        {/* ── REPAIRSCOUT ── */}
        <div
          className="panel"
          style={{ width: w("rs"), background: hover === "rs" ? PANEL.rs.bg : "#060a0a" }}
          onClick={() => go("rs")}
          onMouseEnter={() => setHover("rs")}
          onMouseLeave={() => setHover(null)}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>
          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#22c55e,transparent)", opacity: hover === "rs" ? 1 : 0.35, transition: "opacity .4s" }}/>
          <div style={{
            position: "absolute", width: 520, height: 520, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(34,197,94,.2) 0%,transparent 65%)",
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: hover === "rs" ? 1 : 0.3, transition: "opacity .5s",
            animation: hover === "rs" ? "pulse 3s ease-in-out infinite" : "none",
          }}/>
          <div style={{
            position: "absolute", width: 280, height: 120,
            background: "radial-gradient(ellipse,rgba(34,197,94,.16) 0%,transparent 70%)",
            bottom: 60, left: "50%", transform: "translateX(-50%)",
            pointerEvents: "none", zIndex: 1,
            opacity: hover === "rs" ? .7 : 0, transition: "opacity .5s",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#4ade80", borderColor: "rgba(34,197,94,.25)", background: "rgba(34,197,94,.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: hover === "rs" ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              AI AUTO REPAIR · TWO-SIDED
            </div>

            <div className="big-title">
              REPAIR<span style={{ color: "#4ade80" }}>SCOUT</span>
            </div>

            <div className="step-line" style={{ color: "#4ade80", opacity: .45 }}>
              DESCRIBE · DIAGNOSE · COMPARE · VERIFY
            </div>

            <RepairScoutMockup active={hover === "rs"} />

            <p className="desc" style={{ color: hover === "rs" ? "#94a3b8" : "#475569" }}>
              Drivers research symptoms, parts, labor, and nearby shops while repair businesses receive organized quote requests with diagnostic context.
            </p>

            <div className="pills">
              {["VIN Lookup","AI Assessment","Parts Research","Local Shops","Verified Quotes"].map(f => (
                <span key={f} className="pill" style={{
                  color: hover === "rs" ? "#4ade80" : "#475569",
                  borderColor: hover === "rs" ? "rgba(34,197,94,.3)" : "#143021",
                  background: hover === "rs" ? "rgba(34,197,94,.07)" : "transparent",
                }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: hover === "rs" ? "linear-gradient(135deg,#4ade80,#16a34a)" : "rgba(34,197,94,.1)",
              color: hover === "rs" ? "#04140a" : "#4ade80",
              border: `1px solid ${hover === "rs" ? "transparent" : "rgba(34,197,94,.2)"}`,
              boxShadow: hover === "rs" ? "0 0 28px rgba(34,197,94,.4),0 4px 16px rgba(34,197,94,.2)" : "none",
              transform: hover === "rs" ? "translateY(-2px)" : "none",
            }}>
              Explore RepairScout →
            </button>

            <div className="fine-print" style={{ color: "#4ade80" }}>LIVE BETA · DRIVER + SHOP PORTALS</div>
          </div>
        </div>

      </div>
    </>
  );
}
