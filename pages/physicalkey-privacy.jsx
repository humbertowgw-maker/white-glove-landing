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

export default function PhysicalKeyPrivacy() {
  return (
    <>
      <Head>
        <title>PhysicalKey Privacy Policy - White Glove Wireless</title>
        <meta
          name="description"
          content="Privacy policy for the PhysicalKey iOS app: on-device identity, Face ID authentication, and Bluetooth hardware key pairing."
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
            <div style={{fontSize:11,color:"#ffffff",letterSpacing:".18em",marginTop:4}}>PHYSICALKEY</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:18,fontSize:12,flexWrap:"wrap"}}>
          <Link href="/privacy" style={{color:"#ffffff"}}>WGW Privacy</Link>
        </div>
      </nav>

      <main style={{maxWidth:860,margin:"0 auto",padding:"64px 40px 84px"}}>
        <div style={{fontSize:12,color:"#FF6B00",letterSpacing:".2em",marginBottom:16,fontWeight:700}}>PHYSICALKEY LEGAL</div>
        <h1 style={{fontSize:42,lineHeight:1.08,fontWeight:800,color:"#ffffff",marginBottom:12}}>PhysicalKey Privacy Policy</h1>
        <div style={{fontSize:13,color:"#d4d4d4",marginBottom:42}}>Last updated: August 17, 2026</div>

        <p style={{...text,marginBottom:36}}>
          PhysicalKey is an authentication app that replaces passwords with proof of possession — a cryptographic identity generated on your phone, gated by Face ID or Touch ID, with an optional physical Bluetooth key device as a second factor. This policy covers what the PhysicalKey iOS app and its backend actually collect, which is intentionally very little.
        </p>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>1. Information Collected</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>A device identifier generated on your phone when you create an identity, used to tell devices apart during authentication</li>
            <li>Public keys and cryptographic signatures, exchanged during login to prove possession of your identity</li>
            <li>If you create or join a team: the organization name, member device identifiers, and roles</li>
            <li>Data exchanged directly with a paired PhysicalKey hardware key over Bluetooth, limited to the same challenge-response cryptography used for phone authentication</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>2. What PhysicalKey Never Collects</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Face ID, Touch ID, or any biometric data — authentication happens entirely on-device via Apple's Secure Enclave and never reaches PhysicalKey's servers</li>
            <li>Your private key — it is generated on-device and never transmitted anywhere, at any point, for any reason</li>
            <li>Name, email address, or phone number — none are required to create or use an identity</li>
            <li>Advertising identifiers, and no third-party analytics or tracking SDKs of any kind</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>3. How Information Is Used</h2>
          <p style={text}>
            The device identifier, public keys, and signatures exist solely to run the authentication challenge: your phone signs a challenge with a Face ID–gated key, the backend verifies the signature against the public key on file, and access is granted or denied. Organization data exists only to support team features — issuing and revoking access for members of a group. None of it is used for advertising, profiling, or sold or shared with third parties for their own marketing purposes.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>4. Bluetooth and the Physical Key Device</h2>
          <p style={text}>
            When you pair a PhysicalKey hardware device over Bluetooth, the phone and the device exchange only cryptographic challenge-response data as a second, independent proof of possession — the same class of information described above, nothing more. Bluetooth pairing information is not sent anywhere beyond what's needed to complete that authentication step.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>5. Data Storage and Security</h2>
          <p style={text}>
            Private keys are generated in and never leave your device's Secure Enclave. The backend, hosted on Railway, stores only public keys, device identifiers, signatures, and (if applicable) organization/team metadata — never anything that could be used to reconstruct your private key or your biometric data. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but there is deliberately very little sensitive data to protect in the first place.
          </p>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>6. Your Choices</h2>
          <ul style={{paddingLeft:22,...text}}>
            <li>Revoke a device's access to your identity at any time from another authenticated device</li>
            <li>Remove your organization or leave a team you've joined</li>
            <li>Contact us to request deletion of any account or organization data associated with your device identifier</li>
          </ul>
        </section>

        <section style={section}>
          <h2 style={{fontSize:20,fontWeight:800,color:"#ffffff",marginBottom:14}}>7. Contact</h2>
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
          <Link href="/physicalkey-privacy" style={{color:"#FF6B00"}}>PhysicalKey Privacy</Link>
        </div>
      </footer>
    </>
  );
}
