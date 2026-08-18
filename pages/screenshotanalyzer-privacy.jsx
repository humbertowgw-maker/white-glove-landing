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

export default function ScreenshotAnalyzerPrivacy() {
  return (
    <>
      <Head>
        <title>Screenshot Analyzer Privacy Policy - White Glove Wireless</title>
        <meta
          name="description"
          content="Privacy policy for the Screenshot Analyzer iOS app: what's collected from your screenshots and account, and how it's used."
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
            <div style={{fontSize:11,color:"#ffffff",letterSpacing:".18em",marginTop:4}}>SCREENSHOT ANALYZER</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:18,fontSize:12,flexWrap:"wrap"}}>
          <Link href="/privacy" style={{color:"#ffffff"}}>WGW Privacy</Link>
        </div>
      </nav>

      <main style={{maxWidth:860,margin:"0 auto",padding:"64px 40px 84px"}}>
        <div style={{fontSize:12,color:"#FF6B00",letterSpacing:".2em",marginBottom:16,fontWeight:700}}>SCREENSHOT ANALYZER LEGAL</div>
        <h1 style={{fontSize:42,lineHeight:1.08,fontWeight:800,color:"#ffffff",marginBottom:12}}>Screenshot Analyzer Privacy Policy</h1>
        <div style={{fontSize:13,color:"#d4d4d4",marginBottom:42}}>Last updated: August 17, 2026</div>

        <p style={{...text,marginBottom:36}}>
          Screenshot Analyzer finds the screenshots you take, analyzes them with AI, and organizes them into a browsable idea board. This policy covers what the app and its backend actually collect and how it's used.
        </p>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>1. Information Collected</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Screenshots you take on your device, uploaded for analysis (stored privately, not publicly accessible)</li>
            <li>Text and visual elements extracted from those screenshots by AI analysis, and the resulting category, notes, and any research sources found for feature/competitive ideas</li>
            <li>Account information handled by our authentication provider, Clerk — typically an email address, used to sign you in</li>
            <li>A device-independent account identifier used to associate your screenshots and findings with your account</li>
            <li>Your own product/settings preferences (e.g. which products you're tracking ideas for)</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>2. What Screenshot Analyzer Never Collects</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>No advertising identifiers, and no third-party analytics or tracking SDKs of any kind</li>
            <li>No location data</li>
            <li>Face ID itself never leaves your device — it's used only to gate access to the app's Vault feature and is handled entirely by Apple's on-device Face ID system, not by us</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>3. How Information Is Used</h2>
          <p style={text}>
            Screenshots are analyzed to extract useful information and organize it into your idea board. For feature and competitive-research ideas specifically, the app runs a real web search to ground its analysis — only sources that actually appeared in that search are ever cited, and results are not stored or reused beyond producing your findings. Your account identifier and email (via Clerk) exist solely to authenticate you and keep your findings private to your account. None of this is used for advertising, sold, or shared with third parties for their own marketing purposes.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>4. AI Processing</h2>
          <p style={text}>
            Screenshot analysis runs on AI models we operate ourselves on our own infrastructure — your screenshots are not sent to a third-party AI vendor for analysis, and are not used to train any model.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>5. The Vault</h2>
          <p style={text}>
            Screenshots you mark sensitive (financial information, IDs, and similar) are kept in a separate Vault, gated by Face ID or your device passcode, and never mixed into your regular findings feed. This is an extra layer of protection on top of the account-level access controls that already apply to all of your data.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>6. Data Storage and Security</h2>
          <p style={text}>
            Screenshots are stored in private cloud storage that is not publicly accessible and is only ever served back to your authenticated account. Analysis results and account metadata are stored in a managed database. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but access to your data is limited to your own authenticated account.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>7. Your Choices</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Delete individual screenshots and findings from within the app at any time</li>
            <li>Move sensitive items in or out of the Vault at any time</li>
            <li>Contact us to request deletion of your account and all associated data</li>
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
          <Link href="/screenshotanalyzer-privacy" style={{color:"#FF6B00"}}>Screenshot Analyzer Privacy</Link>
        </div>
      </footer>
    </>
  );
}
