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
      borderRadius: 8, padding: "10px", maxWidth: 240, margin: "0 auto 12px",
      opacity: active ? 1 : 0.45, transition: "opacity .4s",
    }}>
      <div style={{ fontSize: 8, color: "#f97316", letterSpacing: ".14em", marginBottom: 8, opacity: .7 }}>AI REP BOARD</div>
      {rows.map(r => (
        <div key={r.name} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "5px 8px", borderRadius: 4, marginBottom: 3,
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
      borderRadius: 8, padding: "10px", maxWidth: 240, margin: "0 auto 12px",
      opacity: active ? 1 : 0.45, transition: "opacity .4s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 8, color: "#14b8a6", letterSpacing: ".14em", opacity: .7 }}>MAY BUDGET</span>
        <span style={{ fontSize: 10, color: "#f1f5f9", fontWeight: 500 }}>$3,240</span>
      </div>
      <div style={{ height: 4, background: "rgba(20,184,166,.12)", borderRadius: 2, marginBottom: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: "76%", background: "linear-gradient(90deg,#14b8a6,#0d9488)", borderRadius: 2 }}/>
      </div>
      {cats.map(c => (
        <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
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
    { label: "CLOSE",    deals: ["Zenith", "BluePeak"],       color: "#4ade80" },
  ];
  return (
    <div style={{
      background: "rgba(99,102,241,.04)", border: "1px solid rgba(99,102,241,.12)",
      borderRadius: 8, padding: "10px", maxWidth: 260, margin: "0 auto 12px",
      opacity: active ? 1 : 0.45, transition: "opacity .4s",
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
    { label: "Brake pads",    pct: 78, color: "#4ade80" },
    { label: "Rotors",        pct: 54, color: "#fbbf24" },
    { label: "Wheel bearing", pct: 21, color: "#94a3b8" },
  ];
  return (
    <div style={{
      background: "rgba(34,197,94,.04)", border: "1px solid rgba(34,197,94,.13)",
      borderRadius: 8, padding: "10px", maxWidth: 250, margin: "0 auto 12px",
      opacity: active ? 1 : 0.45, transition: "opacity .4s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 8, color: "#4ade80", letterSpacing: ".14em", opacity: .75 }}>AI REPAIR CHECK</span>
        <span style={{ fontSize: 8, color: "#94a3b8" }}>2019 ACCORD</span>
      </div>
      {causes.map(c => (
        <div key={c.label} style={{ marginBottom: 5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 8, color: "#94a3b8" }}>{c.label}</span>
            <span style={{ fontSize: 8, color: c.color }}>{c.pct}%</span>
          </div>
          <div style={{ height: 3, background: "rgba(34,197,94,.1)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 2 }}/>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(34,197,94,.12)", paddingTop: 6, marginTop: 6 }}>
        <span style={{ fontSize: 8, color: "#64748b" }}>EST. REPAIR</span>
        <span style={{ fontSize: 10, color: "#f1f5f9", fontWeight: 600 }}>$230–$540</span>
      </div>
    </div>
  );
}

function TruckTrackerMockup({ active }) {
  const updates = [
    { icon: "🚚", title: "Taco Trail", meta: "LIVE · 0.8 mi" },
    { icon: "📸", title: "Birria snap", meta: "posted 4m ago" },
    { icon: "🗼", title: "Space Needle", meta: "landmark nearby" },
  ];
  return (
    <div style={{
      background: "rgba(244,63,94,.04)", border: "1px solid rgba(244,63,94,.14)",
      borderRadius: 8, padding: "10px", maxWidth: 250, margin: "0 auto 12px",
      opacity: active ? 1 : 0.45, transition: "opacity .4s",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 8, color: "#fb7185", letterSpacing: ".14em", opacity: .8 }}>LIVE FOOD FEED</span>
        <span style={{ fontSize: 8, color: "#4ade80" }}>● 3 NEARBY</span>
      </div>
      {updates.map(item => (
        <div key={item.title} style={{
          display: "flex", alignItems: "center", gap: 8, padding: "5px 7px",
          borderRadius: 5, marginBottom: 4, background: "rgba(244,63,94,.06)",
          border: "1px solid rgba(244,63,94,.1)", textAlign: "left",
        }}>
          <span style={{ fontSize: 15 }}>{item.icon}</span>
          <span style={{ flex: 1 }}>
            <strong style={{ display: "block", color: "#cbd5e1", fontSize: 9 }}>{item.title}</strong>
            <span style={{ color: "#64748b", fontSize: 7.5 }}>{item.meta}</span>
          </span>
        </div>
      ))}
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
    else if (side === "rs") window.open("https://repairscout-smoky.vercel.app", "_blank");
    else window.open("https://trucktracker-eight.vercel.app", "_blank");
  };

  const BG = {
    wgw: "radial-gradient(ellipse at 30% 40%,#200e00 0%,#080910 65%)",
    ss:  "radial-gradient(ellipse at 70% 40%,#001f1d 0%,#060a12 65%)",
    sp:  "radial-gradient(ellipse at 50% 40%,#0d0d30 0%,#07070f 65%)",
    rs:  "radial-gradient(ellipse at 60% 40%,#05200f 0%,#060a0a 65%)",
    tt:  "radial-gradient(ellipse at 50% 40%,#2a0712 0%,#0c070b 65%)",
  };
  const DEFAULT_BG = { wgw: "#070910", ss: "#060a12", sp: "#07070f", rs: "#060a0a", tt: "#0c070b" };

  const dotGrid = `radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)`;
  const h = (id) => hover === id;

  const glowColor = { wgw: "249,115,22", ss: "20,184,166", sp: "99,102,241", rs: "34,197,94", tt: "244,63,94" };

  return (
    <>
      <Head>
        <title>Humberto Labs — WGW · SpendSense · Sales Platform · RepairScout · TruckTracker</title>
        <meta name="description" content="Five connected platforms for sales, personal finance, white-label CRM, automotive repair research, and live food-truck discovery." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { min-height: 100%; overflow-x: hidden; background: #050509; }

        @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.9} }

        .grid-wrap {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          min-height: 100svh;
        }

        .panel {
          position: relative; overflow: hidden; cursor: pointer;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          border: 1px solid #0f0f1a;
          transition: background .4s ease;
          grid-column: span 2;
          min-height: 560px;
        }

        .panel:nth-child(4),
        .panel:nth-child(5) {
          grid-column: span 3;
        }

        .panel-content {
          position: relative; z-index: 2;
          max-width: 360px; width: 90%;
          text-align: center;
          padding: 8px 0;
        }

        .eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9.5px; letter-spacing: .2em;
          border: 1px solid; border-radius: 20px;
          padding: 5px 14px; margin-bottom: 14px;
          font-family: 'DM Mono', monospace;
        }

        .big-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 2.8vw, 46px);
          font-weight: 800; color: #f1f5f9;
          line-height: 1; letter-spacing: -.01em;
          margin-bottom: 10px;
        }

        .step-line {
          font-size: 9px; letter-spacing: .2em;
          margin-bottom: 16px; font-family: 'DM Mono', monospace;
        }

        .desc {
          font-size: 12px; line-height: 1.75; color: #94a3b8;
          margin: 0 auto 14px; font-family: 'DM Mono', monospace;
          max-width: 300px;
          transition: opacity .3s ease;
        }

        .pills {
          display: flex; flex-wrap: wrap; gap: 6px; justify-content: center;
          margin-bottom: 16px;
          transition: opacity .3s ease;
        }

        .pill {
          font-size: 9px; letter-spacing: .05em;
          padding: 4px 10px; border-radius: 3px; border: 1px solid;
          font-family: 'DM Mono', monospace;
        }

        .cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 30px; border-radius: 6px; border: none;
          font-size: 11px; font-weight: 600; letter-spacing: .14em;
          text-transform: uppercase; cursor: pointer;
          transition: all .2s; font-family: 'DM Mono', monospace;
        }

        .fine-print {
          margin-top: 10px; font-size: 8.5px; letter-spacing: .1em;
          font-family: 'DM Mono', monospace; opacity: .4;
        }

        .top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 3;
        }

        @media (max-width: 1050px) {
          .grid-wrap { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .panel, .panel:nth-child(4), .panel:nth-child(5) { grid-column: span 1; }
          .panel:last-child { grid-column: 1 / -1; }
        }

        @media (max-width: 640px) {
          .grid-wrap { grid-template-columns: 1fr; }
          .panel, .panel:nth-child(4), .panel:nth-child(5), .panel:last-child { grid-column: 1; min-height: 650px; }
        }
      `}</style>

      <div className="grid-wrap">

        {/* ── WHITE GLOVE WIRELESS (top-left) ── */}
        <div
          className="panel"
          style={{ background: h("wgw") ? BG.wgw : DEFAULT_BG.wgw }}
          onClick={() => go("wgw")}
          onMouseEnter={() => setHover("wgw")}
          onMouseLeave={() => setHover(null)}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>
          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#f97316,transparent)", opacity: h("wgw") ? 1 : 0.3, transition: "opacity .4s" }}/>
          <div style={{
            position: "absolute", width: 420, height: 420, borderRadius: "50%",
            background: `radial-gradient(circle,rgba(${glowColor.wgw},.22) 0%,transparent 65%)`,
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: h("wgw") ? 1 : 0.2, transition: "opacity .5s",
            animation: h("wgw") ? "pulse 3s ease-in-out infinite" : "none",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#f97316", borderColor: "rgba(249,115,22,.25)", background: "rgba(249,115,22,.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f97316", display: "inline-block", animation: h("wgw") ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              AI SALES OPERATING SYSTEM
            </div>
            <div className="big-title">WHITE GLOVE<br /><span style={{ color: "#f97316" }}>WIRELESS</span></div>
            <div className="step-line" style={{ color: "#f97316", opacity: .45 }}>FIND · ENGAGE · COACH · CLOSE · IMPROVE</div>

            <WGWMockup active={h("wgw")} />

            <p className="desc" style={{ opacity: h("wgw") ? 1 : 0.3 }}>
              A coordinated AI team that finds opportunities, guides outreach, coaches reps in real time, and turns every outcome into the next best action.
            </p>
            <div className="pills" style={{ opacity: h("wgw") ? 1 : 0.3 }}>
              {["🤖 AI Leadership","🎙️ Live Voice","🏆 Rep Coaching","🔄 Closed-Loop"].map(f => (
                <span key={f} className="pill" style={{ color: "#f97316", borderColor: "rgba(249,115,22,.3)", background: "rgba(249,115,22,.06)" }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: h("wgw") ? "linear-gradient(135deg,#f97316,#ea580c)" : "rgba(249,115,22,.12)",
              color: h("wgw") ? "#000" : "#f97316",
              border: `1px solid ${h("wgw") ? "transparent" : "rgba(249,115,22,.2)"}`,
              boxShadow: h("wgw") ? "0 0 28px rgba(249,115,22,.4),0 4px 16px rgba(249,115,22,.2)" : "none",
              transform: h("wgw") ? "translateY(-2px)" : "none",
            }}>Explore WGW →</button>
            <div className="fine-print" style={{ color: "#f97316" }}>14-DAY FREE TRIAL · NO CARD REQUIRED</div>
          </div>
        </div>

        {/* ── SPENDSENSE (top-right) ── */}
        <div
          className="panel"
          style={{ background: h("ss") ? BG.ss : DEFAULT_BG.ss }}
          onClick={() => go("ss")}
          onMouseEnter={() => setHover("ss")}
          onMouseLeave={() => setHover(null)}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>
          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#14b8a6,transparent)", opacity: h("ss") ? 1 : 0.3, transition: "opacity .4s" }}/>
          <div style={{
            position: "absolute", width: 420, height: 420, borderRadius: "50%",
            background: `radial-gradient(circle,rgba(${glowColor.ss},.2) 0%,transparent 65%)`,
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: h("ss") ? 1 : 0.2, transition: "opacity .5s",
            animation: h("ss") ? "pulse 3s ease-in-out infinite" : "none",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#14b8a6", borderColor: "rgba(20,184,166,.25)", background: "rgba(20,184,166,.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#14b8a6", display: "inline-block", animation: h("ss") ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              PERSONAL FINANCE · AI-POWERED
            </div>
            <div className="big-title">SPEND<br /><span style={{ color: "#14b8a6" }}>SENSE</span></div>
            <div className="step-line" style={{ color: "#14b8a6", opacity: .45 }}>CONNECT · CATEGORIZE · UNDERSTAND · SAVE</div>

            <SpendSenseMockup active={h("ss")} />

            <p className="desc" style={{ opacity: h("ss") ? 1 : 0.3 }}>
              Connect your bank, let AI categorize every transaction, and finally understand where your money actually goes — in real time.
            </p>
            <div className="pills" style={{ opacity: h("ss") ? 1 : 0.3 }}>
              {["🔗 Bank Sync","✨ AI Insights","📸 Receipt Scan","🔔 Smart Alerts"].map(f => (
                <span key={f} className="pill" style={{ color: "#14b8a6", borderColor: "rgba(20,184,166,.3)", background: "rgba(20,184,166,.06)" }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: h("ss") ? "linear-gradient(135deg,#14b8a6,#0d9488)" : "rgba(20,184,166,.1)",
              color: h("ss") ? "#000" : "#14b8a6",
              border: `1px solid ${h("ss") ? "transparent" : "rgba(20,184,166,.18)"}`,
              boxShadow: h("ss") ? "0 0 28px rgba(20,184,166,.4),0 4px 16px rgba(20,184,166,.2)" : "none",
              transform: h("ss") ? "translateY(-2px)" : "none",
            }}>Get Started →</button>
            <div className="fine-print" style={{ color: "#14b8a6" }}>FREE TO TRY · CONNECT IN SECONDS</div>
          </div>
        </div>

        {/* ── SALES PLATFORM (bottom-left) ── */}
        <div
          className="panel"
          style={{ background: h("sp") ? BG.sp : DEFAULT_BG.sp }}
          onClick={() => go("sp")}
          onMouseEnter={() => setHover("sp")}
          onMouseLeave={() => setHover(null)}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>
          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#6366f1,transparent)", opacity: h("sp") ? 1 : 0.3, transition: "opacity .4s" }}/>
          <div style={{
            position: "absolute", width: 420, height: 420, borderRadius: "50%",
            background: `radial-gradient(circle,rgba(${glowColor.sp},.22) 0%,transparent 65%)`,
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: h("sp") ? 1 : 0.2, transition: "opacity .5s",
            animation: h("sp") ? "pulse 3s ease-in-out infinite" : "none",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#6366f1", borderColor: "rgba(99,102,241,.25)", background: "rgba(99,102,241,.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", display: "inline-block", animation: h("sp") ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              WHITE-LABEL · AI CRM PLATFORM
            </div>
            <div className="big-title">SALES<br /><span style={{ color: "#6366f1" }}>PLATFORM</span></div>
            <div className="step-line" style={{ color: "#6366f1", opacity: .45 }}>BUILD · BRAND · DEPLOY · SCALE</div>

            <SalesPlatformMockup active={h("sp")} />

            <p className="desc" style={{ opacity: h("sp") ? 1 : 0.3 }}>
              A fully white-label AI sales CRM — brand it, deploy it for your team, or resell to clients with AI assistant, lead pipeline, and 14-day trials built in.
            </p>
            <div className="pills" style={{ opacity: h("sp") ? 1 : 0.3 }}>
              {["🏷️ White-Label","🤖 AI Assistant","📊 Lead Pipeline","👥 Multi-Tenant"].map(f => (
                <span key={f} className="pill" style={{ color: "#818cf8", borderColor: "rgba(99,102,241,.3)", background: "rgba(99,102,241,.07)" }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: h("sp") ? "linear-gradient(135deg,#6366f1,#4f46e5)" : "rgba(99,102,241,.1)",
              color: h("sp") ? "#fff" : "#818cf8",
              border: `1px solid ${h("sp") ? "transparent" : "rgba(99,102,241,.2)"}`,
              boxShadow: h("sp") ? "0 0 28px rgba(99,102,241,.5),0 4px 16px rgba(99,102,241,.25)" : "none",
              transform: h("sp") ? "translateY(-2px)" : "none",
            }}>Sign In →</button>
            <div className="fine-print" style={{ color: "#6366f1" }}>EARLY ACCESS · 14-DAY FREE TRIAL</div>
          </div>
        </div>

        {/* ── REPAIRSCOUT (bottom-right) ── */}
        <div
          className="panel"
          style={{ background: h("rs") ? BG.rs : DEFAULT_BG.rs }}
          onClick={() => go("rs")}
          onMouseEnter={() => setHover("rs")}
          onMouseLeave={() => setHover(null)}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>
          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#22c55e,transparent)", opacity: h("rs") ? 1 : 0.3, transition: "opacity .4s" }}/>
          <div style={{
            position: "absolute", width: 420, height: 420, borderRadius: "50%",
            background: `radial-gradient(circle,rgba(${glowColor.rs},.2) 0%,transparent 65%)`,
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: h("rs") ? 1 : 0.2, transition: "opacity .5s",
            animation: h("rs") ? "pulse 3s ease-in-out infinite" : "none",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#4ade80", borderColor: "rgba(34,197,94,.25)", background: "rgba(34,197,94,.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: h("rs") ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              AI AUTO REPAIR · TWO-SIDED
            </div>
            <div className="big-title">REPAIR<br /><span style={{ color: "#4ade80" }}>SCOUT</span></div>
            <div className="step-line" style={{ color: "#4ade80", opacity: .45 }}>DESCRIBE · DIAGNOSE · COMPARE · VERIFY</div>

            <RepairScoutMockup active={h("rs")} />

            <p className="desc" style={{ opacity: h("rs") ? 1 : 0.3 }}>
              Drivers research symptoms, parts, labor, and nearby shops while repair businesses receive organized quote requests with diagnostic context.
            </p>
            <div className="pills" style={{ opacity: h("rs") ? 1 : 0.3 }}>
              {["🔍 VIN Lookup","🔧 AI Diagnosis","🔩 Parts Research","✅ Verified Quotes"].map(f => (
                <span key={f} className="pill" style={{ color: "#4ade80", borderColor: "rgba(34,197,94,.3)", background: "rgba(34,197,94,.07)" }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: h("rs") ? "linear-gradient(135deg,#4ade80,#16a34a)" : "rgba(34,197,94,.1)",
              color: h("rs") ? "#04140a" : "#4ade80",
              border: `1px solid ${h("rs") ? "transparent" : "rgba(34,197,94,.2)"}`,
              boxShadow: h("rs") ? "0 0 28px rgba(34,197,94,.4),0 4px 16px rgba(34,197,94,.2)" : "none",
              transform: h("rs") ? "translateY(-2px)" : "none",
            }}>Explore RepairScout →</button>
            <div className="fine-print" style={{ color: "#4ade80" }}>LIVE BETA · DRIVER + SHOP PORTALS</div>
          </div>
        </div>

        {/* ── TRUCKTRACKER ── */}
        <div
          className="panel"
          style={{ background: h("tt") ? BG.tt : DEFAULT_BG.tt }}
          onClick={() => go("tt")}
          onMouseEnter={() => setHover("tt")}
          onMouseLeave={() => setHover(null)}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: dotGrid, backgroundSize: "22px 22px", opacity: .8, zIndex: 1, pointerEvents: "none" }}/>
          <div className="top-bar" style={{ background: "linear-gradient(90deg,transparent,#fb7185,transparent)", opacity: h("tt") ? 1 : 0.3, transition: "opacity .4s" }}/>
          <div style={{
            position: "absolute", width: 420, height: 420, borderRadius: "50%",
            background: `radial-gradient(circle,rgba(${glowColor.tt},.22) 0%,transparent 65%)`,
            top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            pointerEvents: "none", zIndex: 1,
            opacity: h("tt") ? 1 : 0.2, transition: "opacity .5s",
            animation: h("tt") ? "pulse 3s ease-in-out infinite" : "none",
          }}/>

          <div className="panel-content">
            <div className="eyebrow" style={{ color: "#fb7185", borderColor: "rgba(244,63,94,.28)", background: "rgba(244,63,94,.07)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fb7185", display: "inline-block", animation: h("tt") ? "pulse 1.4s ease-in-out infinite" : "none" }}/>
              LIVE FOOD · SOCIAL DISCOVERY
            </div>
            <div className="big-title">TRUCK<br /><span style={{ color: "#fb7185" }}>TRACKER</span></div>
            <div className="step-line" style={{ color: "#fb7185", opacity: .45 }}>GO LIVE · DISCOVER · SNAP · RATE · FOLLOW</div>

            <TruckTrackerMockup active={h("tt")} />

            <p className="desc" style={{ opacity: h("tt") ? 1 : 0.3 }}>
              A live social network for mobile food. Customers find trucks, fresh snaps, reviews, wait times, and landmark-based locations while owners turn their location into a crowd.
            </p>
            <div className="pills" style={{ opacity: h("tt") ? 1 : 0.3 }}>
              {["📍 Live GPS","📸 Food Feed","⭐ Real Ratings","🗼 Landmark Map"].map(f => (
                <span key={f} className="pill" style={{ color: "#fb7185", borderColor: "rgba(244,63,94,.3)", background: "rgba(244,63,94,.07)" }}>{f}</span>
              ))}
            </div>

            <button className="cta" style={{
              background: h("tt") ? "linear-gradient(135deg,#fb7185,#e11d48)" : "rgba(244,63,94,.1)",
              color: h("tt") ? "#190308" : "#fb7185",
              border: `1px solid ${h("tt") ? "transparent" : "rgba(244,63,94,.22)"}`,
              boxShadow: h("tt") ? "0 0 28px rgba(244,63,94,.42),0 4px 16px rgba(244,63,94,.22)" : "none",
              transform: h("tt") ? "translateY(-2px)" : "none",
            }}>Find Food Trucks →</button>
            <div className="fine-print" style={{ color: "#fb7185" }}>FREE FOR FOOD LOVERS · LOW-COST TRUCK PLANS</div>
          </div>
        </div>

      </div>
    </>
  );
}
