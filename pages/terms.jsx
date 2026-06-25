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

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - White Glove Wireless</title>
        <meta name="description" content="White Glove Wireless terms of service for platform use and SMS messaging." />
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
          <Link href="/sms-opt-in" style={{color:"#ffffff"}}>SMS Opt-In</Link>
          <Link href="/privacy" style={{color:"#ffffff"}}>Privacy</Link>
        </div>
      </nav>

      <main style={{maxWidth:860,margin:"0 auto",padding:"64px 40px 84px"}}>
        <div style={{fontSize:12,color:"#FF6B00",letterSpacing:".2em",marginBottom:16,fontWeight:700}}>LEGAL</div>
        <h1 style={{fontSize:42,lineHeight:1.08,fontWeight:800,color:"#ffffff",marginBottom:12}}>Terms of Service</h1>
        <div style={{fontSize:13,color:"#d4d4d4",marginBottom:42}}>Last updated: June 25, 2026</div>

        <p style={{...text,marginBottom:36}}>
          These Terms of Service govern use of White Glove Wireless, an AI-powered CRM for AT&amp;T authorized dealers, including website access, platform use, AI-assisted appointment workflows, and SMS messaging.
        </p>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>1. Platform Use</h2>
          <p style={text}>
            White Glove Wireless provides CRM, appointment, lead follow-up, AI voice, and messaging tools for authorized dealer workflows. Users are responsible for using the platform lawfully, maintaining accurate account information, and ensuring their outreach complies with applicable laws and carrier requirements.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>2. SMS Messaging Terms</h2>
          <p style={text}>
            White Glove Wireless may send SMS messages for appointment reminders, lead follow-up, and CRM notifications sent on behalf of AT&amp;T authorized dealers. Message frequency varies based on account activity. Message and data rates may apply. Consent to receive SMS messages is not a condition of purchase.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>3. STOP and HELP Commands</h2>
          <p style={text}>
            Reply STOP to unsubscribe at any time. Reply HELP for help. White Glove Wireless honors STOP and HELP commands for SMS messages sent through its platform.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>4. Carrier Delivery</h2>
          <p style={text}>
            White Glove Wireless does not guarantee that calls, texts, emails, or platform notifications will be delivered by any carrier, provider, device, or network. Delivery may be delayed, blocked, filtered, or unavailable for reasons outside our control.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>5. AI Voice and CRM Notifications</h2>
          <p style={text}>
            Sofia, our AI voice agent via Bland.ai, may contact business owners to book appointments and support lead follow-up. Users must review AI-assisted workflows for accuracy and compliance. White Glove Wireless may update or limit platform features at any time.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>6. Limitation of Liability</h2>
          <p style={text}>
            To the fullest extent permitted by law, White Glove Wireless is not liable for indirect, incidental, consequential, special, or punitive damages, including lost profits, lost leads, failed message delivery, or interrupted platform access.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>7. Changes to These Terms</h2>
          <p style={text}>
            We may update these Terms from time to time. Updates will be posted on this page with a new last updated date.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>8. Contact</h2>
          <p style={text}>
            White Glove Wireless<br />
            <a href="mailto:humberto.wgw@gmail.com">humberto.wgw@gmail.com</a><br />
            <a href="https://whitegwireless.com">whitegwireless.com</a>
          </p>
        </section>
      </main>

      <footer style={{padding:"32px 40px",borderTop:"1px solid #1f1f1f",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:12,color:"#d4d4d4"}}>
          © {new Date().getFullYear()} White Glove Wireless
        </div>
        <div style={{display:"flex",gap:20,fontSize:12,flexWrap:"wrap"}}>
          <Link href="/" style={{color:"#ffffff"}}>Home</Link>
          <Link href="/sms-opt-in" style={{color:"#ffffff"}}>SMS Opt-In</Link>
          <Link href="/privacy" style={{color:"#ffffff"}}>Privacy</Link>
          <Link href="/terms" style={{color:"#FF6B00"}}>Terms</Link>
        </div>
      </footer>
    </>
  );
}
