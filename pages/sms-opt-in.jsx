import Head from "next/head";
import Link from "next/link";

const text = {
  color: "#d4d4d4",
  fontSize: 14,
  lineHeight: 1.85,
};

const section = {
  marginBottom: 32,
  paddingBottom: 32,
  borderBottom: "1px solid #1f1f1f",
};

export default function SmsOptIn() {
  return (
    <>
      <Head>
        <title>SMS Opt-In - White Glove Wireless</title>
        <meta
          name="description"
          content="White Glove Wireless SMS opt-in disclosures for appointment reminders, lead follow-up, and CRM notifications."
        />
      </Head>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#000000;color:#ffffff;font-family:Arial,Helvetica,sans-serif}
        a{color:#FF6B00;text-decoration:none}
        a:hover{text-decoration:underline}
      `}</style>

      <nav style={{padding:"22px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #1f1f1f"}}>
        <Link href="/" style={{textDecoration:"none"}}>
          <div style={{cursor:"pointer"}}>
            <div style={{fontSize:20,fontWeight:800,color:"#FF6B00",letterSpacing:".04em"}}>WHITE GLOVE WIRELESS</div>
            <div style={{fontSize:11,color:"#ffffff",letterSpacing:".18em",marginTop:4}}>AI CRM FOR AUTHORIZED DEALERS</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:18,fontSize:12,flexWrap:"wrap"}}>
          <Link href="/privacy" style={{color:"#ffffff"}}>Privacy</Link>
          <Link href="/terms" style={{color:"#ffffff"}}>Terms</Link>
        </div>
      </nav>

      <main style={{maxWidth:860,margin:"0 auto",padding:"64px 40px 84px"}}>
        <div style={{fontSize:12,color:"#FF6B00",letterSpacing:".2em",marginBottom:16,fontWeight:700}}>SMS COMPLIANCE</div>
        <h1 style={{fontSize:42,lineHeight:1.08,fontWeight:800,color:"#ffffff",marginBottom:16}}>SMS Opt-In</h1>
        <p style={{...text,marginBottom:40}}>
          White Glove Wireless provides an AI-powered CRM for AT&amp;T authorized dealers. Our SMS program supports appointment reminders, lead follow-up, and CRM notifications sent on behalf of AT&amp;T authorized dealers.
        </p>

        <section style={section}>
          <h2 style={{fontSize:20,color:"#ffffff",marginBottom:14}}>SMS Program Details</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Business name: White Glove Wireless</li>
            <li>Messages may include appointment reminders, lead follow-up, and CRM notifications sent on behalf of AT&amp;T authorized dealers.</li>
            <li>Message frequency varies based on account activity</li>
            <li>Message and data rates may apply</li>
            <li>Reply STOP to unsubscribe at any time</li>
            <li>Reply HELP for help</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,color:"#ffffff",marginBottom:14}}>Consent Statement</h2>
          <div style={{background:"#0a0a0a",border:"1px solid #FF6B00",borderRadius:8,padding:"22px 24px"}}>
            <p style={{...text,color:"#ffffff"}}>
              By providing a phone number to White Glove Wireless, scheduling an appointment, submitting a lead form, or agreeing to receive CRM notifications, you consent to receive SMS messages from White Glove Wireless and its authorized dealer users. These messages may be sent by Sofia, our AI voice agent via Bland.ai, or by sales representatives using the White Glove Wireless CRM. Consent is not a condition of purchase.
            </p>
          </div>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,color:"#ffffff",marginBottom:14}}>Opt Out and Help</h2>
          <p style={text}>
            You may unsubscribe at any time by replying STOP to any message. You may request help by replying HELP. White Glove Wireless honors STOP and HELP commands for SMS messages sent through its platform.
          </p>
        </section>

        <section>
          <h2 style={{fontSize:20,color:"#ffffff",marginBottom:14}}>Related Policies</h2>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <Link href="/privacy" style={{display:"inline-block",padding:"12px 18px",background:"#FF6B00",color:"#000000",borderRadius:6,fontSize:13,fontWeight:700}}>
              Privacy Policy
            </Link>
            <Link href="/terms" style={{display:"inline-block",padding:"12px 18px",background:"#ffffff",color:"#000000",borderRadius:6,fontSize:13,fontWeight:700}}>
              Terms of Service
            </Link>
          </div>
        </section>
      </main>

      <footer style={{padding:"32px 40px",borderTop:"1px solid #1f1f1f",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:12,color:"#d4d4d4"}}>
          © {new Date().getFullYear()} White Glove Wireless
        </div>
        <div style={{display:"flex",gap:20,fontSize:12,flexWrap:"wrap"}}>
          <Link href="/" style={{color:"#ffffff"}}>Home</Link>
          <Link href="/sms-opt-in" style={{color:"#FF6B00"}}>SMS Opt-In</Link>
          <Link href="/privacy" style={{color:"#ffffff"}}>Privacy</Link>
          <Link href="/terms" style={{color:"#ffffff"}}>Terms</Link>
        </div>
      </footer>
    </>
  );
}
