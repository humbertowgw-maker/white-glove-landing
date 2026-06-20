import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "https://white-glove-backend-production-5a7d.up.railway.app";

const FEATURES = [
  { key: "ai-team",     icon: "🤖", title: "AI Leadership Team",       desc: "Sophia, Scout, Atlas, Pulse, and Director think independently, share context, and coordinate the next best move.",                                           img: "/screenshots/ai-leadership.png" },
  { key: "closed-loop", icon: "🔄", title: "Closed-Loop Sales",         desc: "Lead discovery, outreach, consent, appointments, order tracking, coaching, and follow-up stay connected in one system.",                                     img: "/screenshots/closed-loop.png" },
  { key: "live-ai",     icon: "🎙️", title: "Talk to Your AI Team",      desc: "Use live meetings, microphone input, individual AI personalities, transcripts, and owner approval controls.",                                                img: "/screenshots/live-ai.png" },
  { key: "field-app",   icon: "📱", title: "Offline-Capable Field App", desc: "Install WGW on a phone and keep the app shell and key field workflows available through weak connectivity.",                                                 img: "/screenshots/field-app.png" },
  { key: "backups",     icon: "🔒", title: "Backups and Restore",        desc: "Create owner-controlled workspace backups and restore business records without technical deployment knowledge.",                                              img: "/screenshots/backups.png" },
  { key: "improving",   icon: "📈", title: "Always Improving",           desc: "Performance data, coaching plans, scorecards, analytics, and AI memory help the system get smarter with the team.",                                          img: "/screenshots/improving.png" },
  { key: "discovery",   icon: "🔍", title: "Opportunity Discovery",      desc: "Search Google businesses, run Apollo workflows, research owners, scout community events, and import qualified leads.",                                         img: "/screenshots/discovery.png" },
  { key: "coaching",    icon: "🏆", title: "Team Development",           desc: "Rep KPIs, monthly coaching plans, three-month trends, onboarding, and realistic AI sales practice live together.",                                            img: "/screenshots/coaching.png" },
  { key: "owner",       icon: "👤", title: "Owner Control",              desc: "Approvals, audit trails, permissions, platform health, personal assistance, and business-wide visibility stay in your hands.",                                img: "/screenshots/owner.png" },
];

const PLANS = [
  {
    id: "starter", name: "Launch", price: 149, color: "#60a5fa",
    features: ["1 Sales Rep", "500 AI Calls/month", "AI sales team", "Google lead discovery", "Offline field access", "Sales trainer", "Workspace backups"],
  },
  {
    id: "growth", name: "Growth", price: 349, color: "#f97316", popular: true,
    features: ["5 Sales Reps", "2,500 AI Calls/month", "Everything in Launch", "Closed-loop AI workflows", "Live AI leadership meetings", "Team coaching and analytics", "Priority support"],
  },
  {
    id: "pro", name: "Scale", price: 699, color: "#a78bfa",
    features: ["Unlimited reps", "7,500 AI Calls/month", "Everything in Growth", "Apollo workflow", "Custom branding and domain", "Advanced controls", "Dedicated support"],
  },
];

export default function WirelessLanding() {
  const [step, setStep] = useState("landing");
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ companyName: "", dealerCode: "", ownerName: "", email: "", password: "" });
  const [activeFeature, setActiveFeature] = useState("ai-team");

  const handleSignup = async () => {
    if (!form.companyName || !form.email || !form.password) { setError("Company name, email and password are required"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true); setError(null);

    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      const { data: authData, error: authError } = await supabase.auth.signUp({ email: form.email, password: form.password });
      if (authError) throw new Error(authError.message);

      const orgRes = await fetch(`${API}/api/organizations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.companyName,
          owner_email: form.email,
          dealer_code: form.dealerCode,
          user_id: authData.user?.id,
          plan: selectedPlan,
          owner_name: form.ownerName,
        }),
      });
      if (!orgRes.ok) throw new Error("Failed to create organization");
      const { org } = await orgRes.json();

      const checkoutRes = await fetch(`${API}/api/billing/create-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authData.session?.access_token ? { "Authorization": `Bearer ${authData.session.access_token}` } : {}),
        },
        body: JSON.stringify({ plan: selectedPlan, org_id: org.id, email: form.email }),
      });

      if (!checkoutRes.ok) throw new Error("Failed to create checkout");
      const { url } = await checkoutRes.json();

      if (url) {
        window.location.href = url;
      } else {
        setStep("success");
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>White Glove Wireless — AI-Powered AT&T Sales Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#070910;color:#e2e8f0;font-family:'DM Mono',monospace}
        .btn{background:#f97316;color:#000;border:none;padding:14px 28px;font-family:inherit;font-size:12px;font-weight:500;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;transition:all .15s;border-radius:4px}
        .btn:hover{background:#fb923c;transform:translateY(-1px)}
        .btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
        .btn-outline{background:transparent;color:#e2e8f0;border:1px solid #1e2d47;padding:12px 24px;font-family:inherit;font-size:11px;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;transition:all .15s;border-radius:4px}
        .btn-outline:hover{border-color:#f97316;color:#f97316}
        .input{background:#0a1020;border:1px solid #1e2d47;color:#e2e8f0;padding:12px 16px;font-family:inherit;font-size:12px;outline:none;transition:border .15s;width:100%;border-radius:4px}
        .input:focus{border-color:#f97316}
        .card{border:1px solid #151c2a;background:#0c1018;border-radius:8px}
        .value-band{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1100px;margin:0 auto;padding:0 40px 40px}
        @media(max-width:760px){.value-band{grid-template-columns:repeat(2,1fr);padding:0 20px 30px}nav{padding:16px 20px!important}.hero{padding:60px 20px 40px!important}.hero h1{font-size:38px!important}.feature-grid{grid-template-columns:1fr!important}.feature-preview{display:none!important}}
      `}</style>

      {step === "landing" && (
        <div>
          <nav style={{padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #0d1526"}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <Link href="/" style={{color:"#334155",textDecoration:"none",fontSize:10,letterSpacing:".1em"}}>← All Products</Link>
              <div style={{width:1,height:16,background:"#1e2d47"}}/>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#f97316"}}>WHITE GLOVE</div>
                <div style={{fontSize:9,color:"#334155",letterSpacing:".18em"}}>WIRELESS · AI PLATFORM</div>
              </div>
            </div>
            <div style={{display:"flex",gap:16,alignItems:"center"}}>
              <a href="https://white-glove-frontend.vercel.app" style={{color:"#475569",textDecoration:"none",fontSize:11}}>Sign In</a>
              <button className="btn" onClick={()=>setStep("signup")}>Start Free Trial</button>
            </div>
          </nav>

          <div style={{textAlign:"center",padding:"80px 40px 60px",maxWidth:800,margin:"0 auto"}}>
            <div style={{fontSize:10,color:"#f97316",letterSpacing:".2em",marginBottom:20}}>AI SALES OPERATING SYSTEM</div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,lineHeight:1.1,marginBottom:24,color:"#f1f5f9"}}>
              One System That Helps<br /><span style={{color:"#f97316"}}>Your Team Keep Selling</span>
            </h1>
            <p style={{fontSize:14,color:"#64748b",lineHeight:1.8,marginBottom:40,maxWidth:600,margin:"0 auto 40px"}}>
              White Glove connects prospecting, AI outreach, live coaching, appointments, orders, follow-up, analytics, and backups. Sophia, Scout, Atlas, Pulse, and Director work together so opportunities do not disappear between tools.
            </p>
            <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn" style={{fontSize:13,padding:"16px 36px"}} onClick={()=>setStep("signup")}>Start 14-Day Free Trial</button>
              <button className="btn-outline" onClick={()=>document.getElementById("pricing").scrollIntoView({behavior:"smooth"})}>View Pricing</button>
            </div>
            <div style={{marginTop:16,fontSize:10,color:"#334155"}}>No credit card required during trial · Cancel anytime</div>
          </div>

          <div className="value-band">
            {[
              ["5 AI leaders","Coordinate sales, research, operations, performance, and owner priorities."],
              ["Closed loop","Every call, task, appointment, and outcome creates the next action."],
              ["Field ready","Installable mobile experience keeps key screens available when service drops."],
              ["Protected","Owner-controlled backups and safe restore points protect business records."],
            ].map(([value,label])=><div key={value} className="card" style={{padding:"16px 18px"}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:"#f1f5f9",marginBottom:6}}>{value}</div><div style={{fontSize:10,color:"#64748b",lineHeight:1.55}}>{label}</div></div>)}
          </div>

          <div style={{padding:"60px 40px",maxWidth:1100,margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}>

              {/* Feature list */}
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {FEATURES.map(f => {
                  const active = activeFeature === f.key;
                  return (
                    <div
                      key={f.key}
                      className="card"
                      onMouseEnter={() => setActiveFeature(f.key)}
                      style={{
                        padding:"14px 18px",
                        border: active ? "1px solid rgba(249,115,22,.35)" : "1px solid #151c2a",
                        background: active ? "rgba(249,115,22,.05)" : "#0c1018",
                        cursor:"pointer", transition:"all .2s",
                      }}
                    >
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <span style={{fontSize:20,lineHeight:1}}>{f.icon}</span>
                        <div style={{flex:1}}>
                          <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color: active ? "#f1f5f9" : "#64748b",transition:"color .2s"}}>{f.title}</div>
                          {active && <div style={{fontSize:11,color:"#475569",lineHeight:1.7,marginTop:5}}>{f.desc}</div>}
                        </div>
                        <span style={{fontSize:10,color: active ? "#f97316" : "#1e2d47",transition:"color .2s"}}>→</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Screenshot preview */}
              <div style={{position:"sticky",top:40}}>
                {FEATURES.filter(f => f.key === activeFeature).map(f => (
                  <div key={f.key} className="card" style={{overflow:"hidden",border:"1px solid rgba(249,115,22,.2)"}}>
                    <div style={{padding:"12px 16px",borderBottom:"1px solid #151c2a",display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontSize:18}}>{f.icon}</span>
                      <span style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:"#f97316"}}>{f.title}</span>
                    </div>
                    <div style={{background:"#070910",minHeight:340,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <img
                        src={f.img}
                        alt={f.title}
                        style={{width:"100%",display:"block",objectFit:"cover"}}
                        onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                      />
                      <div style={{display:"none",flexDirection:"column",alignItems:"center",gap:12,padding:40,textAlign:"center"}}>
                        <span style={{fontSize:48}}>{f.icon}</span>
                        <div style={{fontSize:11,color:"#334155",letterSpacing:".1em"}}>SCREENSHOT COMING SOON</div>
                        <div style={{fontSize:10,color:"#1e2d47"}}>Add image to /public/screenshots/{f.key}.png</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div id="pricing" style={{padding:"60px 40px",maxWidth:1000,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:"#f1f5f9",marginBottom:12}}>Platform Pricing, Not Another Tool Fee</div>
              <div style={{fontSize:12,color:"#475569",lineHeight:1.7}}>Replace disconnected CRM, dialer, coaching, research, task, and reporting subscriptions with one operating system. Every plan includes a 14-day trial.</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
              {PLANS.map(plan=>(
                <div key={plan.id} className="card" style={{padding:28,border:plan.popular?`1px solid ${plan.color}44`:"1px solid #151c2a",position:"relative"}}>
                  {plan.popular&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:plan.color,color:"#000",fontSize:9,padding:"4px 12px",borderRadius:10,letterSpacing:".1em",fontWeight:500}}>MOST POPULAR</div>}
                  <div style={{fontSize:10,color:plan.color,letterSpacing:".1em",marginBottom:8}}>{plan.name.toUpperCase()}</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:20}}>
                    <span style={{fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,color:"#f1f5f9"}}>${plan.price}</span>
                    <span style={{fontSize:12,color:"#475569"}}>/mo</span>
                  </div>
                  {plan.features.map(f=>(
                    <div key={f} style={{display:"flex",gap:8,marginBottom:10,alignItems:"flex-start"}}>
                      <span style={{color:plan.color,fontSize:12,marginTop:1}}>✓</span>
                      <span style={{fontSize:11,color:"#94a3b8"}}>{f}</span>
                    </div>
                  ))}
                  <button className="btn" style={{width:"100%",marginTop:20,background:plan.popular?plan.color:"transparent",color:plan.popular?"#000":plan.color,border:`1px solid ${plan.color}`}} onClick={()=>{setSelectedPlan(plan.id);setStep("signup");}}>
                    Start 14-Day Trial
                  </button>
                </div>
              ))}
            </div>
          </div>

          <footer style={{padding:"32px 40px",borderTop:"1px solid #0d1526",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div style={{fontSize:10,color:"#334155"}}>
              © {new Date().getFullYear()} White Glove Wireless · Authorized AT&T Partner
            </div>
            <div style={{display:"flex",gap:24,fontSize:10}}>
              <Link href="/privacy" style={{color:"#475569"}}>Privacy Policy</Link>
              <Link href="/terms" style={{color:"#475569"}}>Terms of Service</Link>
            </div>
          </footer>
        </div>
      )}

      {step === "signup" && (
        <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div className="card" style={{width:"100%",maxWidth:480,padding:40}}>
            <button onClick={()=>setStep("landing")} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:11,marginBottom:24,letterSpacing:".08em"}}>← BACK</button>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#f97316",marginBottom:4}}>WHITE GLOVE</div>
            <div style={{fontSize:10,color:"#334155",letterSpacing:".18em",marginBottom:28}}>WIRELESS · AI PLATFORM</div>
            <div style={{fontSize:14,fontWeight:600,color:"#f1f5f9",marginBottom:6}}>Start your free trial</div>
            <div style={{fontSize:11,color:"#475569",marginBottom:24}}>14 days free · No credit card charged until trial ends · Cancel anytime</div>

            <div style={{display:"flex",gap:8,marginBottom:24}}>
              {PLANS.map(p=>(
                <button key={p.id} onClick={()=>setSelectedPlan(p.id)} style={{flex:1,padding:"8px 4px",fontSize:10,cursor:"pointer",borderRadius:4,fontFamily:"inherit",background:selectedPlan===p.id?"rgba(249,115,22,.15)":"transparent",color:selectedPlan===p.id?"#f97316":"#475569",border:selectedPlan===p.id?"1px solid rgba(249,115,22,.3)":"1px solid #1e2d47"}}>
                  {p.name}<br/><span style={{fontSize:9}}>${p.price}/mo</span>
                </button>
              ))}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {[
                {label:"COMPANY NAME *",key:"companyName",placeholder:"e.g. Pacific Northwest Wireless"},
                {label:"YOUR NAME",key:"ownerName",placeholder:"First and last name"},
                {label:"AT&T DEALER CODE (optional)",key:"dealerCode",placeholder:"e.g. WGW001"},
                {label:"EMAIL ADDRESS *",key:"email",placeholder:"you@company.com",type:"email"},
                {label:"PASSWORD *",key:"password",placeholder:"Min 6 characters",type:"password"},
              ].map(f=>(
                <div key={f.key}>
                  <div style={{fontSize:9,color:"#475569",marginBottom:5}}>{f.label}</div>
                  <input className="input" type={f.type||"text"} placeholder={f.placeholder} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&handleSignup()}/>
                </div>
              ))}
            </div>

            {error&&<div style={{marginTop:16,padding:"10px 14px",background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.2)",borderRadius:4,fontSize:11,color:"#ef4444"}}>{error}</div>}

            <button className="btn" style={{width:"100%",marginTop:20,padding:14}} onClick={handleSignup} disabled={loading}>
              {loading ? "Setting up your account..." : "Start Free Trial → Checkout"}
            </button>

            <div style={{marginTop:12,fontSize:10,color:"#334155",textAlign:"center",lineHeight:1.6}}>
              By continuing you agree to our terms. You'll be redirected to Stripe to enter payment details. Your card won't be charged for 14 days.
            </div>

            <div style={{marginTop:16,fontSize:10,color:"#334155",textAlign:"center"}}>
              Already have an account? <a href="https://white-glove-frontend.vercel.app" style={{color:"#f97316"}}>Sign in</a>
            </div>
          </div>
        </div>
      )}

      {step === "success" && (
        <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div className="card" style={{width:"100%",maxWidth:480,padding:48,textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:20}}>🎉</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#f1f5f9",marginBottom:8}}>Welcome to White Glove Wireless!</div>
            <div style={{fontSize:12,color:"#475569",lineHeight:1.7,marginBottom:32}}>Your 14-day free trial has started. Check your email to confirm your account, then sign into your dashboard.</div>
            <a href="https://white-glove-frontend.vercel.app"><button className="btn" style={{width:"100%",padding:14}}>Go to Dashboard →</button></a>
          </div>
        </div>
      )}
    </>
  );
}
