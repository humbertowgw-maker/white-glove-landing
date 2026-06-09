import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "https://white-glove-backend-production-5a7d.up.railway.app";

const PLANS = [
  {
    id: "starter", name: "Starter", price: 99, color: "#60a5fa",
    features: ["1 Sales Rep", "500 AI Calls/month", "Lead Search", "FCC Broadband Intelligence", "AI Sales Trainer", "Email Support"],
  },
  {
    id: "growth", name: "Growth", price: 199, color: "#f97316", popular: true,
    features: ["5 Sales Reps", "2,000 AI Calls/month", "Everything in Starter", "Multi-language Sofia (EN/ES)", "AI Sales Assistant", "Priority Support"],
  },
  {
    id: "pro", name: "Pro", price: 299, color: "#a78bfa",
    features: ["Unlimited Reps", "Unlimited AI Calls", "Everything in Growth", "Custom Branding", "White-label Domain", "Dedicated Support"],
  },
];

export default function Landing() {
  const [step, setStep] = useState("landing");
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ companyName: "", dealerCode: "", ownerName: "", email: "", password: "" });

  const handleSignup = async () => {
    if (!form.companyName || !form.email || !form.password) { setError("Company name, email and password are required"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true); setError(null);

    try {
      // 1. Create Supabase auth user
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      const { data: authData, error: authError } = await supabase.auth.signUp({ email: form.email, password: form.password });
      if (authError) throw new Error(authError.message);

      // 2. Create organization
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

      // 3. Create Stripe checkout session
      const checkoutRes = await fetch(`${API}/api/billing/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan, org_id: org.id, email: form.email }),
      });

      if (!checkoutRes.ok) throw new Error("Failed to create checkout");
      const { url } = await checkoutRes.json();

      // 4. Redirect to Stripe checkout
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
      `}</style>

      {step === "landing" && (
        <div>
          <nav style={{padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #0d1526"}}>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#f97316"}}>WHITE GLOVE</div>
              <div style={{fontSize:9,color:"#334155",letterSpacing:".18em"}}>WIRELESS · AI PLATFORM</div>
            </div>
            <div style={{display:"flex",gap:16,alignItems:"center"}}>
              <a href="https://white-glove-frontend.vercel.app" style={{color:"#475569",textDecoration:"none",fontSize:11}}>Sign In</a>
              <button className="btn" onClick={()=>setStep("signup")}>Start Free Trial</button>
            </div>
          </nav>

          <div style={{textAlign:"center",padding:"80px 40px 60px",maxWidth:800,margin:"0 auto"}}>
            <div style={{fontSize:10,color:"#f97316",letterSpacing:".2em",marginBottom:20}}>FOR AT&T AUTHORIZED DEALERS</div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,lineHeight:1.1,marginBottom:24,color:"#f1f5f9"}}>
              Your AI Sales Team,<br /><span style={{color:"#f97316"}}>Working 24/7</span>
            </h1>
            <p style={{fontSize:14,color:"#64748b",lineHeight:1.8,marginBottom:40,maxWidth:600,margin:"0 auto 40px"}}>
              Sofia calls your leads, speaks English and Spanish, books appointments automatically, and gives your reps real-time competitor intelligence — all powered by AT&T-specific AI.
            </p>
            <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="btn" style={{fontSize:13,padding:"16px 36px"}} onClick={()=>setStep("signup")}>Start 14-Day Free Trial</button>
              <button className="btn-outline" onClick={()=>document.getElementById("pricing").scrollIntoView({behavior:"smooth"})}>View Pricing</button>
            </div>
            <div style={{marginTop:16,fontSize:10,color:"#334155"}}>No credit card required during trial · Cancel anytime</div>
          </div>

          <div style={{padding:"60px 40px",maxWidth:1100,margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
              {[
                {icon:"🤖",title:"Sofia AI Caller",desc:"Makes real cold calls to small businesses. Speaks English & Spanish. Books appointments automatically."},
                {icon:"📶",title:"FCC Intelligence",desc:"Know every ISP at any US address before your rep walks in. Real-time competitor pricing from 3 AI sources."},
                {icon:"🎯",title:"Sales Trainer",desc:"Your reps practice WGW B2B cold calls with AI prospects. Live coaching co-pilot during practice."},
                {icon:"👥",title:"Rep Management",desc:"Assign leads, track call counts, manage territories. Role-based access for your entire team."},
                {icon:"📅",title:"Auto-Calendar",desc:"Sofia books appointments directly into your reps' calendars. No manual scheduling needed."},
                {icon:"🧠",title:"AI Assistant",desc:"Ask about AT&T promotions, competitor pricing, how to close — get verified answers from 3 AI sources."},
              ].map(f=>(
                <div key={f.title} className="card" style={{padding:24}}>
                  <div style={{fontSize:28,marginBottom:12}}>{f.icon}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:8}}>{f.title}</div>
                  <div style={{fontSize:11,color:"#475569",lineHeight:1.7}}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="pricing" style={{padding:"60px 40px",maxWidth:1000,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:48}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:"#f1f5f9",marginBottom:12}}>Simple Pricing</div>
              <div style={{fontSize:12,color:"#475569"}}>14-day free trial on all plans. No credit card required to start.</div>
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
                    Start Free Trial
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
