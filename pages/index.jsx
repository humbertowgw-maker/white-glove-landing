import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Chooser() {
  const [hover, setHover] = useState(null); // "wgw" | "ss" | "sp" | null
  const router = useRouter();

  const go = (side) => {
    if (side === "wgw") router.push("/wireless");
    else if (side === "ss") router.push("/spendsense");
    else window.open("https://salesplatform-frontend-1zyqk0c1t-humberto-s-projects7.vercel.app", "_blank");
  };

  const w = (side) => hover === side ? "50%" : hover ? "25%" : "33.333%";

  return (
    <>
      <Head>
        <title>Humberto Labs — White Glove Wireless & SpendSense</title>
        <meta name="description" content="White Glove Wireless is an AI sales operating system. SpendSense brings AI-powered clarity to personal finance." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{overflow:hidden}
        @media(max-width:640px){
          body{overflow-y:auto}
          .chooser-wrap{flex-direction:column!important;height:auto!important;min-height:100svh}
          .side-wgw,.side-ss{width:100%!important;min-height:50svh;flex:none!important}
        }
      `}</style>

      <div
        className="chooser-wrap"
        style={{
          display: "flex",
          height: "100svh",
          fontFamily: "'DM Mono', monospace",
          cursor: "default",
        }}
      >
        {/* ── WHITE GLOVE WIRELESS ── */}
        <div
          className="side-wgw"
          onClick={() => go("wgw")}
          onMouseEnter={() => setHover("wgw")}
          onMouseLeave={() => setHover(null)}
          style={{
            width: w("wgw"),
            transition: "width .45s cubic-bezier(.4,0,.2,1), background .3s",
            background: hover === "wgw"
              ? "radial-gradient(ellipse at 30% 50%, #1a0a00 0%, #070910 70%)"
              : "#070910",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "60px 48px",
            position: "relative",
            overflow: "hidden",
            borderRight: "1px solid #1a1a2e",
          }}
        >
          {/* Glow orb */}
          <div style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249,115,22,.18) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            transition: "opacity .4s",
            opacity: hover === "wgw" ? 1 : 0.4,
          }}/>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: 420, width: "100%", textAlign: "center" }}>
            <div style={{
              fontSize: 10,
              color: "#f97316",
              letterSpacing: ".24em",
              marginBottom: 20,
              opacity: .7,
            }}>AI SALES OPERATING SYSTEM</div>

            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 44,
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.05,
              marginBottom: 8,
            }}>WHITE GLOVE<br /><span style={{ color: "#f97316" }}>WIRELESS</span></div>

            <div style={{ fontSize: 10, color: "#334155", letterSpacing: ".18em", marginBottom: 32 }}>
              FIND · ENGAGE · COACH · CLOSE · IMPROVE
            </div>

            <p style={{
              fontSize: 13,
              color: "#64748b",
              lineHeight: 1.8,
              marginBottom: 36,
              maxWidth: 340,
              margin: "0 auto 36px",
            }}>
              A coordinated AI team helps find opportunities, guide outreach, coach reps, protect follow-up, and turn every outcome into the next best action.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
              {["AI Leadership Team","Closed-Loop Sales","Offline Field Access","Live Voice Meetings","One-Click Backups","Rep Coaching"].map(f => (
                <span key={f} style={{
                  fontSize: 10,
                  color: "#475569",
                  border: "1px solid #1e2d47",
                  borderRadius: 4,
                  padding: "4px 10px",
                  letterSpacing: ".04em",
                }}>{f}</span>
              ))}
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#f97316",
              color: "#000",
              padding: "13px 28px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              transition: "background .15s, transform .15s",
              transform: hover === "wgw" ? "translateY(-2px)" : "none",
            }}>
              Explore WGW →
            </div>

            <div style={{ marginTop: 12, fontSize: 9, color: "#1e2d47", letterSpacing: ".1em" }}>
              14-DAY FREE TRIAL · NO CARD REQUIRED
            </div>
          </div>
        </div>

        {/* ── SPENDSENSE ── */}
        <div
          className="side-ss"
          onClick={() => go("ss")}
          onMouseEnter={() => setHover("ss")}
          onMouseLeave={() => setHover(null)}
          style={{
            width: w("ss"),
            transition: "width .45s cubic-bezier(.4,0,.2,1), background .3s",
            background: hover === "ss"
              ? "radial-gradient(ellipse at 70% 50%, #001a1a 0%, #060a12 70%)"
              : "#060a12",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "60px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow orb */}
          <div style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,184,166,.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            transition: "opacity .4s",
            opacity: hover === "ss" ? 1 : 0.4,
          }}/>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: 420, width: "100%", textAlign: "center" }}>
            <div style={{
              fontSize: 10,
              color: "#14b8a6",
              letterSpacing: ".24em",
              marginBottom: 20,
              opacity: .7,
            }}>PERSONAL FINANCE · AI-POWERED</div>

            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 44,
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.05,
              marginBottom: 8,
            }}>SPEND<span style={{ color: "#14b8a6" }}>SENSE</span></div>

            <div style={{ fontSize: 10, color: "#1e3a3a", letterSpacing: ".18em", marginBottom: 32 }}>
              SMART MONEY TRACKING
            </div>

            <p style={{
              fontSize: 13,
              color: "#4b6060",
              lineHeight: 1.8,
              marginBottom: 36,
              maxWidth: 340,
              margin: "0 auto 36px",
            }}>
              Connect your bank, let AI categorize every transaction, and finally understand where your money actually goes — in real time.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
              {["🏦 Bank Sync","🤖 AI Insights","📸 Receipt Scan","📊 Trend Charts","🔔 Smart Alerts"].map(f => (
                <span key={f} style={{
                  fontSize: 10,
                  color: "#2d4a4a",
                  border: "1px solid #0f2e2e",
                  borderRadius: 4,
                  padding: "4px 10px",
                  letterSpacing: ".04em",
                }}>{f}</span>
              ))}
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#14b8a6",
              color: "#000",
              padding: "13px 28px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              transition: "background .15s, transform .15s",
              transform: hover === "ss" ? "translateY(-2px)" : "none",
            }}>
              Get Started →
            </div>

            <div style={{ marginTop: 12, fontSize: 9, color: "#0f2e2e", letterSpacing: ".1em" }}>
              FREE TO TRY · CONNECT IN SECONDS
            </div>
          </div>
        </div>
        {/* ── SALES PLATFORM ── */}
        <div
          className="side-sp"
          onClick={() => go("sp")}
          onMouseEnter={() => setHover("sp")}
          onMouseLeave={() => setHover(null)}
          style={{
            width: w("sp"),
            transition: "width .45s cubic-bezier(.4,0,.2,1), background .3s",
            background: hover === "sp"
              ? "radial-gradient(ellipse at 70% 50%, #0a0a2e 0%, #07070f 70%)"
              : "#07070f",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "60px 48px",
            position: "relative",
            overflow: "hidden",
            borderLeft: "1px solid #1a1a2e",
          }}
        >
          {/* Glow orb */}
          <div style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,.18) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            transition: "opacity .4s",
            opacity: hover === "sp" ? 1 : 0.4,
          }}/>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, maxWidth: 420, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "#6366f1", letterSpacing: ".24em", marginBottom: 20, opacity: .7 }}>
              WHITE-LABEL · AI CRM PLATFORM
            </div>

            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 44,
              fontWeight: 800,
              color: "#f1f5f9",
              lineHeight: 1.05,
              marginBottom: 8,
            }}>SALES<br /><span style={{ color: "#6366f1" }}>PLATFORM</span></div>

            <div style={{ fontSize: 10, color: "#1e1e45", letterSpacing: ".18em", marginBottom: 32 }}>
              BUILD · BRAND · DEPLOY · SCALE
            </div>

            <p style={{
              fontSize: 13,
              color: "#3d3d6b",
              lineHeight: 1.8,
              marginBottom: 36,
              maxWidth: 340,
              margin: "0 auto 36px",
            }}>
              A fully white-label AI sales CRM you can brand and deploy for your own teams or resell to clients — complete with AI assistant, lead management, and 14-day trials.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 32 }}>
              {["White-Label Branding","AI Sales Assistant","Lead Pipeline","14-Day Trial","Multi-Tenant","Agency Ready"].map(f => (
                <span key={f} style={{
                  fontSize: 10,
                  color: "#2d2d5e",
                  border: "1px solid #1e1e45",
                  borderRadius: 4,
                  padding: "4px 10px",
                  letterSpacing: ".04em",
                }}>{f}</span>
              ))}
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#6366f1",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              transition: "background .15s, transform .15s",
              transform: hover === "sp" ? "translateY(-2px)" : "none",
            }}>
              Sign In →
            </div>

            <div style={{ marginTop: 12, fontSize: 9, color: "#1e1e45", letterSpacing: ".1em" }}>
              🚧 UNDER CONSTRUCTION · EARLY ACCESS
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
