import Head from "next/head";
import Link from "next/link";

export default function SmsConsent() {
  return (
    <>
      <Head>
        <title>SMS Consent &amp; Opt-In Evidence — White Glove Wireless</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#070910;color:#e2e8f0;font-family:'DM Mono',monospace}
        a{color:#f97316;text-decoration:none}
        a:hover{text-decoration:underline}
      `}</style>

      {/* Nav */}
      <nav style={{padding:"20px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #0d1526"}}>
        <Link href="/">
          <div style={{cursor:"pointer"}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#f97316"}}>WHITE GLOVE</div>
            <div style={{fontSize:9,color:"#334155",letterSpacing:".18em"}}>WIRELESS · AI PLATFORM</div>
          </div>
        </Link>
        <a href="https://white-glove-frontend.vercel.app" style={{color:"#475569",fontSize:11}}>Sign In</a>
      </nav>

      {/* Content */}
      <div style={{maxWidth:780,margin:"0 auto",padding:"60px 40px 80px"}}>
        <div style={{fontSize:10,color:"#f97316",letterSpacing:".2em",marginBottom:16}}>COMPLIANCE</div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:"#f1f5f9",marginBottom:8}}>
          SMS Consent &amp; Opt-In Evidence
        </h1>
        <div style={{fontSize:11,color:"#475569",marginBottom:48}}>
          This page documents the SMS opt-in consent process used by White Glove Wireless for
          A2P 10DLC campaign compliance and TCR verification purposes.
        </div>

        {/* Section 1 — Overview */}
        <div style={{marginBottom:40,paddingBottom:40,borderBottom:"1px solid #0d1526"}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:16,letterSpacing:".04em"}}>
            1. Opt-In Method — Verbal Consent During Scheduled Call
          </h2>
          <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
            White Glove Wireless representatives contact business owners and individuals to discuss
            AT&T wireless and internet service options. When a customer agrees to schedule an
            appointment, they verbally provide their phone number and receive a verbal opt-in
            disclosure before the call concludes. SMS messages are sent exclusively to customers
            who have scheduled an appointment and explicitly consented to receive them.
          </p>
        </div>

        {/* Section 2 — Verbal Disclosure Script */}
        <div style={{marginBottom:40,paddingBottom:40,borderBottom:"1px solid #0d1526"}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:16,letterSpacing:".04em"}}>
            2. Verbal Consent Disclosure Script
          </h2>
          <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9,marginBottom:16}}>
            Every White Glove Wireless representative reads the following disclosure to each
            customer before ending the scheduling call:
          </p>
          <div style={{background:"#0d1526",border:"1px solid #1e2d47",borderLeft:"3px solid #f97316",borderRadius:8,padding:"20px 24px"}}>
            <p style={{fontSize:13,color:"#f1f5f9",lineHeight:2,fontStyle:"italic"}}>
              "By scheduling this appointment and providing your phone number, you agree to receive
              appointment confirmation and reminder text messages from White Glove Wireless.
              Message and data rates may apply. You can reply STOP at any time to opt out,
              or HELP for assistance. We will not share your number with third parties."
            </p>
          </div>
        </div>

        {/* Section 3 — Confirmation SMS Sample */}
        <div style={{marginBottom:40,paddingBottom:40,borderBottom:"1px solid #0d1526"}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:16,letterSpacing:".04em"}}>
            3. Sample Confirmation SMS (Opt-In Enrollment Message)
          </h2>
          <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9,marginBottom:16}}>
            Immediately after scheduling, each customer receives the following confirmation SMS
            from <strong style={{color:"#e2e8f0"}}>+1 (425) 569-0342</strong>:
          </p>
          <div style={{background:"#0d1526",border:"1px solid #1e2d47",borderRadius:8,padding:"20px 24px",marginBottom:12}}>
            <div style={{fontSize:10,color:"#475569",letterSpacing:".1em",marginBottom:10}}>SAMPLE MESSAGE #1 — APPOINTMENT CONFIRMATION</div>
            <p style={{fontSize:13,color:"#f1f5f9",lineHeight:1.9}}>
              White Glove Wireless: Your appointment is confirmed for [Date] at [Time]. You will
              receive a reminder before your appointment. Msg &amp; Data rates may apply.
              Reply STOP to opt out, HELP for help.
            </p>
          </div>
          <div style={{background:"#0d1526",border:"1px solid #1e2d47",borderRadius:8,padding:"20px 24px",marginBottom:12}}>
            <div style={{fontSize:10,color:"#475569",letterSpacing:".1em",marginBottom:10}}>SAMPLE MESSAGE #2 — APPOINTMENT REMINDER</div>
            <p style={{fontSize:13,color:"#f1f5f9",lineHeight:1.9}}>
              White Glove Wireless: Reminder — your appointment is tomorrow, [Date] at [Time].
              Need to reschedule? Reply to this message. Reply STOP to opt out.
            </p>
          </div>
          <div style={{background:"#0d1526",border:"1px solid #1e2d47",borderRadius:8,padding:"20px 24px"}}>
            <div style={{fontSize:10,color:"#475569",letterSpacing:".1em",marginBottom:10}}>SAMPLE MESSAGE #3 — APPOINTMENT UPDATE</div>
            <p style={{fontSize:13,color:"#f1f5f9",lineHeight:1.9}}>
              White Glove Wireless: Your appointment has been updated to [Date] at [Time].
              Reply STOP to opt out, HELP for help.
            </p>
          </div>
        </div>

        {/* Section 4 — Message Frequency & Disclosures */}
        <div style={{marginBottom:40,paddingBottom:40,borderBottom:"1px solid #0d1526"}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:16,letterSpacing:".04em"}}>
            4. Message Frequency &amp; Required Disclosures
          </h2>
          <ul style={{paddingLeft:20,color:"#94a3b8",fontSize:12,lineHeight:2.2}}>
            <li>Message frequency: 2–4 messages per scheduled appointment (confirmation + up to 3 reminders)</li>
            <li>Message and data rates may apply</li>
            <li>Customers can opt out at any time by replying <strong style={{color:"#e2e8f0"}}>STOP</strong></li>
            <li>Customers can request help by replying <strong style={{color:"#e2e8f0"}}>HELP</strong></li>
            <li>Mobile numbers are never sold or shared with third parties</li>
            <li>Messages are transactional only — no promotional or marketing content</li>
          </ul>
        </div>

        {/* Section 5 — Legal */}
        <div style={{marginBottom:40}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:16,letterSpacing:".04em"}}>
            5. Legal Documents
          </h2>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <a href="/privacy" style={{display:"inline-block",padding:"10px 20px",background:"rgba(249,115,22,.1)",
              border:"1px solid rgba(249,115,22,.3)",borderRadius:6,fontSize:12,color:"#f97316"}}>
              Privacy Policy →
            </a>
            <a href="/terms" style={{display:"inline-block",padding:"10px 20px",background:"rgba(30,45,71,.4)",
              border:"1px solid #1e2d47",borderRadius:6,fontSize:12,color:"#94a3b8"}}>
              Terms of Service →
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{padding:"32px 40px",borderTop:"1px solid #0d1526",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:10,color:"#334155"}}>
          © {new Date().getFullYear()} White Glove Wireless · Authorized AT&T Partner
        </div>
        <div style={{display:"flex",gap:24,fontSize:10}}>
          <Link href="/" style={{color:"#475569"}}>Home</Link>
          <Link href="/privacy" style={{color:"#475569"}}>Privacy Policy</Link>
          <Link href="/terms" style={{color:"#475569"}}>Terms of Service</Link>
          <Link href="/sms-consent" style={{color:"#f97316"}}>SMS Consent</Link>
        </div>
      </footer>
    </>
  );
}
