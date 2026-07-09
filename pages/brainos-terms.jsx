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

export default function BrainOSTerms() {
  return (
    <>
      <Head>
        <title>BrainOS SMS Terms - White Glove Wireless</title>
        <meta
          name="description"
          content="Terms for Personal BrainOS SMS and Telnyx-powered assistant messaging."
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
            <div style={{fontSize:11,color:"#ffffff",letterSpacing:".18em",marginTop:4}}>PERSONAL BRAINOS SMS</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:18,fontSize:12,flexWrap:"wrap"}}>
          <Link href="/brainos-privacy" style={{color:"#ffffff"}}>BrainOS Privacy</Link>
          <Link href="/terms" style={{color:"#ffffff"}}>WGW Terms</Link>
        </div>
      </nav>

      <main style={{maxWidth:860,margin:"0 auto",padding:"64px 40px 84px"}}>
        <div style={{fontSize:12,color:"#FF6B00",letterSpacing:".2em",marginBottom:16,fontWeight:700}}>BRAINOS LEGAL</div>
        <h1 style={{fontSize:42,lineHeight:1.08,fontWeight:800,color:"#ffffff",marginBottom:12}}>BrainOS SMS Terms</h1>
        <div style={{fontSize:13,color:"#d4d4d4",marginBottom:42}}>Last updated: July 9, 2026</div>

        <p style={{...text,marginBottom:36}}>
          These terms apply to Personal BrainOS SMS messaging, a private two-way assistant messaging service operated by White Glove Wireless through Telnyx.
        </p>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>1. Service Description</h2>
          <p style={text}>
            Personal BrainOS allows approved phone numbers to text a private AI assistant for personal productivity help, reminders, notes, planning, and general question-and-answer conversations. The service is not intended for marketing, promotional campaigns, mass texting, lead generation, or third-party outreach.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>2. SMS Messaging Terms</h2>
          <p style={text}>
            By texting the BrainOS number, you agree to receive conversational SMS replies from the BrainOS assistant. Message frequency varies based on how often you text the assistant. Message and data rates may apply. Consent to receive SMS messages is not a condition of purchase.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>3. Opt Out and Help</h2>
          <p style={text}>
            Reply STOP to opt out of SMS messages. Reply START to resume messages where supported. Reply HELP for help. BrainOS is intended to reply only to approved personal numbers configured in its allowlist.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>4. Acceptable Use</h2>
          <p style={text}>
            You agree not to use BrainOS SMS for unlawful, abusive, deceptive, harassing, or high-risk purposes. You should not send passwords, payment card numbers, protected health information, or other sensitive information by SMS.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>5. AI Output</h2>
          <p style={text}>
            BrainOS may generate incomplete, incorrect, or outdated responses. You are responsible for reviewing responses before relying on them. BrainOS is not a substitute for professional legal, medical, financial, or emergency advice.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>6. Carrier Delivery</h2>
          <p style={text}>
            SMS delivery may be delayed, blocked, filtered, or unavailable due to carrier rules, network conditions, device settings, service provider requirements, or other factors outside our control. White Glove Wireless does not guarantee message delivery.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>7. Privacy</h2>
          <p style={text}>
            Use of BrainOS SMS is also governed by the <Link href="/brainos-privacy">BrainOS SMS Privacy Policy</Link>.
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
          <Link href="/brainos-privacy" style={{color:"#ffffff"}}>BrainOS Privacy</Link>
          <Link href="/brainos-terms" style={{color:"#FF6B00"}}>BrainOS Terms</Link>
        </div>
      </footer>
    </>
  );
}
