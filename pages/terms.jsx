import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service — White Glove Wireless</title>
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
        <div style={{fontSize:10,color:"#f97316",letterSpacing:".2em",marginBottom:16}}>LEGAL</div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:"#f1f5f9",marginBottom:8}}>Terms of Service</h1>
        <div style={{fontSize:11,color:"#475569",marginBottom:48}}>Effective Date: June 4, 2026</div>

        <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9,marginBottom:40}}>
          These Terms of Service govern your interaction with White Glove Wireless LLC, an authorized AT&T dealer. By engaging with our services, you agree to these Terms.
        </p>

        {[
          {
            title: "1. Services",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                White Glove Wireless LLC provides sales consultation for AT&T wireless and internet products. We are an independent authorized dealer and not a direct employee or subsidiary of AT&T Inc.
              </p>
            ),
          },
          {
            title: "2. AI Outreach Consent",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                By engaging with White Glove Wireless, you acknowledge that we use AI-powered tools ("Sofia") to conduct outreach. Sofia identifies herself as an AI. Calls may be recorded. You may opt out or request a human representative at any time.
              </p>
            ),
          },
          {
            title: "3. No Obligation",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                All consultations and site visits are completely free. There is no obligation to purchase. Any AT&T product purchase is subject to AT&T's standard terms.
              </p>
            ),
          },
          {
            title: "4. SMS Disclosures",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                White Glove Wireless may send you text messages about appointment reminders, consultations, and AT&T product and service updates.{" "}
                <strong style={{color:"#e2e8f0"}}>Message frequency varies.</strong>{" "}
                <strong style={{color:"#e2e8f0"}}>Message and data rates may apply.</strong>{" "}
                <strong style={{color:"#e2e8f0"}}>Reply STOP to cancel. Reply HELP for help.</strong>
              </p>
            ),
          },
          {
            title: "5. Limitation of Liability",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                White Glove Wireless LLC is not liable for indirect or consequential damages. All pricing is subject to change and must be confirmed with AT&T directly.
              </p>
            ),
          },
          {
            title: "6. Opt-Out Rights",
            content: (
              <ul style={{paddingLeft:20,color:"#94a3b8",fontSize:12,lineHeight:2}}>
                <li><strong style={{color:"#e2e8f0"}}>Reply STOP</strong> to any text message to cancel</li>
                <li><strong style={{color:"#e2e8f0"}}>Reply HELP</strong> to any text message for help</li>
                <li>Request removal during any phone call</li>
                <li>Email <a href="mailto:humberto.wgw@gmail.com">humberto.wgw@gmail.com</a> — honored within 10 business days</li>
              </ul>
            ),
          },
          {
            title: "7. Governing Law",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                These Terms are governed by the laws of the State of Washington. Disputes shall be resolved in Snohomish County, Washington.
              </p>
            ),
          },
          {
            title: "8. Contact",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                White Glove Wireless LLC<br />
                <a href="mailto:humberto.wgw@gmail.com">humberto.wgw@gmail.com</a><br />
                <a href="https://whitegwireless.com">whitegwireless.com</a>
              </p>
            ),
          },
        ].map(({ title, content }) => (
          <div key={title} style={{marginBottom:40,paddingBottom:40,borderBottom:"1px solid #0d1526"}}>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:"#f1f5f9",marginBottom:16,letterSpacing:".04em"}}>
              {title}
            </h2>
            {content}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{padding:"32px 40px",borderTop:"1px solid #0d1526",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:10,color:"#334155"}}>
          © {new Date().getFullYear()} White Glove Wireless · Authorized AT&T Partner
        </div>
        <div style={{display:"flex",gap:24,fontSize:10}}>
          <Link href="/" style={{color:"#475569"}}>Home</Link>
          <Link href="/privacy" style={{color:"#475569"}}>Privacy Policy</Link>
          <Link href="/terms" style={{color:"#f97316"}}>Terms of Service</Link>
        </div>
      </footer>
    </>
  );
}
