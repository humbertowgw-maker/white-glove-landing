import Head from "next/head";
import Link from "next/link";

const SS_APP = "https://spendsense.vercel.app";

const FEATURES = [
  {
    icon: "🏦",
    title: "Live Bank Sync",
    desc: "Connect your accounts via Plaid and see every transaction in real time. Supports thousands of US banks and credit unions.",
    color: "#14b8a6",
  },
  {
    icon: "🤖",
    title: "AI Categorization",
    desc: "Every transaction is automatically labeled and sorted. Claude AI understands context — 'Chipotle' is food, 'Shell' is gas.",
    color: "#6366f1",
  },
  {
    icon: "📸",
    title: "Receipt Analyzer",
    desc: "Snap a photo of any receipt and AI pulls out the merchant, amount, items, and category in seconds. No manual entry.",
    color: "#14b8a6",
  },
  {
    icon: "📊",
    title: "Spending Trends",
    desc: "See where your money actually goes, week by week, category by category. Identify patterns you'd never notice manually.",
    color: "#6366f1",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    desc: "Set budget limits per category. Get notified before you overspend — not after. Stay on track without constant checking.",
    color: "#14b8a6",
  },
  {
    icon: "🧠",
    title: "AI Finance Guide",
    desc: "Ask questions about your spending. 'Where am I overspending?' or 'How does this month compare to last?' — get real answers.",
    color: "#6366f1",
  },
];

export default function SpendSenseLanding() {
  return (
    <>
      <Head>
        <title>SpendSense — AI-Powered Personal Finance</title>
        <meta name="description" content="Connect your bank, let AI categorize every transaction, and finally understand where your money goes. Smart budgets, receipt scanning, and AI insights." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#060a12;color:#e2e8f0;font-family:'DM Mono',monospace}
        .btn-ss{background:#14b8a6;color:#000;border:none;padding:14px 28px;font-family:inherit;font-size:12px;font-weight:500;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;transition:all .15s;border-radius:4px}
        .btn-ss:hover{background:#2dd4bf;transform:translateY(-1px)}
        .btn-outline-ss{background:transparent;color:#e2e8f0;border:1px solid #0f2e2e;padding:12px 24px;font-family:inherit;font-size:11px;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;transition:all .15s;border-radius:4px;text-decoration:none;display:inline-block}
        .btn-outline-ss:hover{border-color:#14b8a6;color:#14b8a6}
        .card-ss{border:1px solid #0a2020;background:#080f18;border-radius:8px}
        .check{color:#14b8a6;font-size:12px;margin-top:1px}
      `}</style>

      <div>
        {/* Nav */}
        <nav style={{padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #0a1a1a"}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <Link href="/" style={{color:"#1e3a3a",textDecoration:"none",fontSize:10,letterSpacing:".1em",transition:"color .15s"}}>← All Products</Link>
            <div style={{width:1,height:16,background:"#0f2e2e"}}/>
            <div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800}}>
                <span style={{color:"#f1f5f9"}}>SPEND</span><span style={{color:"#14b8a6"}}>SENSE</span>
              </div>
              <div style={{fontSize:9,color:"#1e3a3a",letterSpacing:".18em"}}>SMART MONEY TRACKING</div>
            </div>
          </div>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            <a href={SS_APP} style={{color:"#2d4a4a",textDecoration:"none",fontSize:11}}>Sign In</a>
            <a href={SS_APP} className="btn-ss" style={{textDecoration:"none",padding:"12px 24px",fontSize:11}}>Get Started Free</a>
          </div>
        </nav>

        {/* Hero */}
        <div style={{textAlign:"center",padding:"80px 40px 60px",maxWidth:800,margin:"0 auto",position:"relative"}}>
          {/* glow */}
          <div style={{position:"absolute",width:600,height:300,borderRadius:"50%",background:"radial-gradient(circle, rgba(20,184,166,.1) 0%, transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>

          <div style={{fontSize:10,color:"#14b8a6",letterSpacing:".2em",marginBottom:20,opacity:.8}}>PERSONAL FINANCE · AI-POWERED</div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,lineHeight:1.1,marginBottom:24,color:"#f1f5f9",position:"relative"}}>
            Finally Know<br /><span style={{color:"#14b8a6"}}>Where Your Money Goes</span>
          </h1>
          <p style={{fontSize:14,color:"#2d4a4a",lineHeight:1.8,marginBottom:40,maxWidth:560,margin:"0 auto 40px",position:"relative"}}>
            Connect your bank, let AI handle the categorization, and get honest answers about your spending — without spreadsheets or manual tracking.
          </p>
          <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",position:"relative"}}>
            <a href={SS_APP} className="btn-ss" style={{textDecoration:"none",fontSize:13,padding:"16px 36px"}}>Connect Your Bank Free</a>
            <a href="#features" className="btn-outline-ss" onClick={e=>{e.preventDefault();document.getElementById("features").scrollIntoView({behavior:"smooth"})}}>See How It Works</a>
          </div>
          <div style={{marginTop:16,fontSize:10,color:"#1e3a3a",position:"relative"}}>Bank-grade Plaid connection · Read-only access · Cancel anytime</div>
        </div>

        {/* Stats */}
        <div style={{padding:"40px",maxWidth:800,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:1,border:"1px solid #0a2020",borderRadius:8,overflow:"hidden"}}>
            {[
              {n:"Auto-categorized","v":"Every transaction"},
              {n:"Plaid-powered","v":"10,000+ banks"},
              {n:"AI receipt scan","v":"Seconds not minutes"},
              {n:"Real-time alerts","v":"Before you overspend"},
            ].map((s,i)=>(
              <div key={i} style={{padding:"24px 28px",background:"#080f18",borderRight:i<3?"1px solid #0a2020":"none"}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:"#14b8a6",marginBottom:4}}>{s.v}</div>
                <div style={{fontSize:10,color:"#1e3a3a",letterSpacing:".06em"}}>{s.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div id="features" style={{padding:"60px 40px",maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:"#f1f5f9",marginBottom:12}}>Everything You Need</div>
            <div style={{fontSize:12,color:"#2d4a4a"}}>Automation and AI where they actually help — not just buzzwords.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20}}>
            {FEATURES.map(f=>(
              <div key={f.title} className="card-ss" style={{padding:28,borderLeft:`3px solid ${f.color}44`}}>
                <div style={{fontSize:28,marginBottom:14}}>{f.icon}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:10}}>{f.title}</div>
                <div style={{fontSize:11,color:"#2d4a4a",lineHeight:1.8}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{padding:"60px 40px",maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:"#f1f5f9",marginBottom:12}}>Up and Running in Minutes</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20}}>
            {[
              {n:"1",title:"Connect Your Bank",desc:"Securely link your accounts via Plaid. Read-only — we never touch your money."},
              {n:"2",title:"AI Syncs & Sorts",desc:"Transactions pull in automatically. Claude AI categorizes everything in real time."},
              {n:"3",title:"Get Insights",desc:"See your spending patterns, set budgets, and ask the AI anything about your finances."},
            ].map(s=>(
              <div key={s.n} style={{textAlign:"center",padding:"32px 24px",background:"#080f18",border:"1px solid #0a2020",borderRadius:8}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:"#14b8a6",marginBottom:16,opacity:.3}}>{s.n}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:10}}>{s.title}</div>
                <div style={{fontSize:11,color:"#2d4a4a",lineHeight:1.7}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{padding:"80px 40px",textAlign:"center",borderTop:"1px solid #0a1a1a",position:"relative"}}>
          <div style={{position:"absolute",width:500,height:250,borderRadius:"50%",background:"radial-gradient(circle, rgba(20,184,166,.08) 0%, transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}/>
          <div style={{position:"relative"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:"#f1f5f9",marginBottom:16}}>
              Start Tracking Today
            </div>
            <p style={{fontSize:13,color:"#2d4a4a",lineHeight:1.8,marginBottom:36,maxWidth:440,margin:"0 auto 36px"}}>
              No credit card. No spreadsheets. Just connect your bank and let AI do the work.
            </p>
            <a href={SS_APP} className="btn-ss" style={{textDecoration:"none",fontSize:13,padding:"16px 40px"}}>
              Get Started Free →
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer style={{padding:"28px 40px",borderTop:"1px solid #0a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontSize:10,color:"#1e3a3a"}}>
            © {new Date().getFullYear()} SpendSense · Powered by Plaid &amp; Claude AI
          </div>
          <div style={{display:"flex",gap:20,fontSize:10}}>
            <Link href="/" style={{color:"#1e3a3a",textDecoration:"none"}}>← Back to All Products</Link>
            <a href={SS_APP} style={{color:"#14b8a6",textDecoration:"none"}}>Launch App →</a>
          </div>
        </footer>
      </div>
    </>
  );
}
