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

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - White Glove Wireless</title>
        <meta name="description" content="White Glove Wireless privacy policy for website, CRM, AI voice, and SMS communications." />
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
          <Link href="/terms" style={{color:"#ffffff"}}>Terms</Link>
        </div>
      </nav>

      <main style={{maxWidth:860,margin:"0 auto",padding:"64px 40px 84px"}}>
        <div style={{fontSize:12,color:"#FF6B00",letterSpacing:".2em",marginBottom:16,fontWeight:700}}>LEGAL</div>
        <h1 style={{fontSize:42,lineHeight:1.08,fontWeight:800,color:"#ffffff",marginBottom:12}}>Privacy Policy</h1>
        <div style={{fontSize:13,color:"#d4d4d4",marginBottom:42}}>Last updated: June 25, 2026</div>

        <p style={{...text,marginBottom:36}}>
          White Glove Wireless ("Company," "we," "us," or "our") provides an AI-powered CRM for AT&amp;T authorized dealers. This Privacy Policy explains how we collect, use, disclose, and protect information collected through whitegwireless.com, our CRM platform, Sofia AI voice outreach via Bland.ai, and SMS communications.
        </p>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>1. Information We Collect</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Business name, address, phone number, and email address</li>
            <li>Owner or manager name and contact information</li>
            <li>Lead, appointment, account activity, and CRM notification details</li>
            <li>SMS opt-in status, message logs, STOP/HELP requests, and delivery metadata</li>
            <li>Call recordings or transcripts from AI-assisted outreach when applicable</li>
            <li>Website usage data such as page visits, device information, and basic analytics</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>2. How We Use Information</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>To provide and improve the White Glove Wireless CRM platform</li>
            <li>To send appointment reminders, lead follow-up, and CRM notifications on behalf of AT&amp;T authorized dealers</li>
            <li>To operate Sofia, our AI voice agent via Bland.ai, for appointment booking and follow-up workflows</li>
            <li>To respond to support, compliance, privacy, opt-out, and account requests</li>
            <li>To prevent misuse, maintain security, and comply with legal requirements</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>3. SMS and Mobile Data</h2>
          <p style={text}>
            SMS messages may include appointment reminders, lead follow-up, and CRM notifications sent on behalf of AT&amp;T authorized dealers. Message frequency varies based on account activity. Message and data rates may apply. Reply STOP to unsubscribe at any time. Reply HELP for help.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>4. SMS Data Is Not Shared for Third-Party Marketing</h2>
          <p style={text}>
            White Glove Wireless does not sell, rent, or share SMS opt-in data, mobile phone numbers, SMS consent records, or text message content with third parties for their own marketing or promotional purposes. We may use trusted service providers, including communications and CRM vendors, only to deliver and support our services.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>5. Service Providers and Required Disclosures</h2>
          <p style={text}>
            We may disclose information to vendors that help operate the platform, including hosting, analytics, AI voice, messaging, and customer support providers. These providers may use information only as needed to provide services to White Glove Wireless. We may also disclose information when required by law, legal process, or to protect rights, security, and safety.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>6. Data Protection</h2>
          <p style={text}>
            We use reasonable administrative, technical, and organizational safeguards designed to protect information from unauthorized access, loss, misuse, or alteration. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>7. Your Choices</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Request access to, correction, or deletion of your information</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Reply STOP to unsubscribe from SMS messages at any time</li>
            <li>Reply HELP for SMS support</li>
            <li>Contact us to ask privacy questions or request assistance</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>8. Contact Us</h2>
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
          <Link href="/privacy" style={{color:"#FF6B00"}}>Privacy</Link>
          <Link href="/terms" style={{color:"#ffffff"}}>Terms</Link>
        </div>
      </footer>
    </>
  );
}
