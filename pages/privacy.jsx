import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — White Glove Wireless</title>
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
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:"#f1f5f9",marginBottom:8}}>Privacy Policy</h1>
        <div style={{fontSize:11,color:"#475569",marginBottom:48}}>Effective Date: June 4, 2026</div>

        <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9,marginBottom:40}}>
          White Glove Wireless LLC ("Company," "we," "us," or "our") is an authorized AT&T dealer operating in Western Washington. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with our services, website (whitegwireless.com), or AI-powered outreach tools.
        </p>

        {[
          {
            title: "1. Information We Collect",
            content: (
              <ul style={{paddingLeft:20,color:"#94a3b8",fontSize:12,lineHeight:2}}>
                <li>Business name, address, phone number, and email address</li>
                <li>Owner or manager name and contact information</li>
                <li>Current internet and wireless service provider information</li>
                <li>Call recordings and transcripts from AI-assisted outreach calls</li>
                <li>Appointment scheduling information</li>
              </ul>
            ),
          },
          {
            title: "2. AI-Powered Communications Disclosure",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                White Glove Wireless uses artificial intelligence (AI) to conduct initial outreach calls and send text messages. Our AI assistant "Sofia" is programmed to disclose that it is an AI at the start of each interaction. All AI calls may be recorded for quality assurance purposes.
              </p>
            ),
          },
          {
            title: "3. SMS / Text Message Communications",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                By providing your phone number, you consent to receive text messages from White Glove Wireless regarding AT&T products and services. <strong style={{color:"#e2e8f0"}}>Message and data rates may apply.</strong> <strong style={{color:"#e2e8f0"}}>Reply STOP to opt out at any time. Reply HELP for assistance.</strong> We will not sell your phone number to third parties.
              </p>
            ),
          },
          {
            title: "4. TCPA Compliance",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                White Glove Wireless complies with the Telephone Consumer Protection Act (TCPA). We only contact business phone numbers obtained through legitimate public sources. To be removed from our contact list, reply STOP to any text or email <a href="mailto:humberto.wgw@gmail.com">humberto.wgw@gmail.com</a>.
              </p>
            ),
          },
          {
            title: "5. Data Sharing",
            content: (
              <p style={{fontSize:12,color:"#94a3b8",lineHeight:1.9}}>
                We do not sell your personal information. We may share data with AT&T for service fulfillment, and with service providers (Twilio, Bland.ai) solely to operate our business. We may disclose information when required by law.
              </p>
            ),
          },
          {
            title: "6. Your Rights",
            content: (
              <ul style={{paddingLeft:20,color:"#94a3b8",fontSize:12,lineHeight:2}}>
                <li>Request access to, correction, or deletion of your information</li>
                <li>Opt out of marketing communications at any time</li>
                <li>File a complaint with the FTC or your state attorney general</li>
              </ul>
            ),
          },
          {
            title: "7. Contact Us",
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
          <Link href="/privacy" style={{color:"#f97316"}}>Privacy Policy</Link>
          <Link href="/terms" style={{color:"#475569"}}>Terms of Service</Link>
        </div>
      </footer>
    </>
  );
}
