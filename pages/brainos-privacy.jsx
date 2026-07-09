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

export default function BrainOSPrivacy() {
  return (
    <>
      <Head>
        <title>BrainOS SMS Privacy Policy - White Glove Wireless</title>
        <meta
          name="description"
          content="Privacy policy for Personal BrainOS SMS and Telnyx-powered assistant messaging."
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
          <Link href="/brainos-terms" style={{color:"#ffffff"}}>BrainOS Terms</Link>
          <Link href="/privacy" style={{color:"#ffffff"}}>WGW Privacy</Link>
        </div>
      </nav>

      <main style={{maxWidth:860,margin:"0 auto",padding:"64px 40px 84px"}}>
        <div style={{fontSize:12,color:"#FF6B00",letterSpacing:".2em",marginBottom:16,fontWeight:700}}>BRAINOS LEGAL</div>
        <h1 style={{fontSize:42,lineHeight:1.08,fontWeight:800,color:"#ffffff",marginBottom:12}}>BrainOS SMS Privacy Policy</h1>
        <div style={{fontSize:13,color:"#d4d4d4",marginBottom:42}}>Last updated: July 9, 2026</div>

        <p style={{...text,marginBottom:36}}>
          Personal BrainOS is a private AI assistant operated by White Glove Wireless for personal productivity, notes, reminders, and general question-and-answer conversations. This policy covers SMS messages sent to and from the Personal BrainOS assistant through Telnyx.
        </p>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>1. Information Collected</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Phone numbers that send messages to the BrainOS Telnyx number</li>
            <li>Inbound and outbound SMS message content</li>
            <li>Message delivery metadata, timestamps, and carrier status information</li>
            <li>Assistant conversation history used to provide replies</li>
            <li>STOP, START, HELP, and support-related requests</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>2. How Information Is Used</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>To receive and respond to SMS messages sent by approved personal phone numbers</li>
            <li>To operate the BrainOS personal AI assistant and maintain conversation context</li>
            <li>To troubleshoot delivery, security, and compliance issues</li>
            <li>To honor opt-out, help, and support requests</li>
            <li>To protect against unauthorized use of the assistant</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>3. SMS Consent and Scope</h2>
          <p style={text}>
            BrainOS SMS is intended for private two-way conversational messaging with phone numbers owned or controlled by the operator. Messages are initiated by the user texting the BrainOS number. BrainOS only replies to approved numbers configured in a private allowlist.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>4. No Marketing or Sale of Mobile Data</h2>
          <p style={text}>
            BrainOS SMS is not used for marketing, promotions, mass messaging, lead generation, or third-party outreach. Mobile phone numbers, SMS opt-in data, message content, and consent records are not sold, rented, or shared with third parties for their own marketing or promotional purposes.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>5. Service Providers</h2>
          <p style={text}>
            Telnyx is used to provide SMS delivery and messaging infrastructure. Other infrastructure providers may be used to host the local or remote services required to operate BrainOS. Service providers are used only as needed to provide, secure, troubleshoot, and support the assistant.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>6. Data Protection</h2>
          <p style={text}>
            Reasonable safeguards are used to protect BrainOS SMS data, including limiting replies to approved numbers and protecting webhook access. No transmission or storage system is guaranteed to be completely secure.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>7. Your Choices</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Reply STOP to opt out of SMS messages</li>
            <li>Reply START to resume messages where supported</li>
            <li>Reply HELP for assistance</li>
            <li>Contact us to request access, deletion, correction, or privacy assistance</li>
          </ul>
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
          <Link href="/brainos-privacy" style={{color:"#FF6B00"}}>BrainOS Privacy</Link>
          <Link href="/brainos-terms" style={{color:"#ffffff"}}>BrainOS Terms</Link>
        </div>
      </footer>
    </>
  );
}
