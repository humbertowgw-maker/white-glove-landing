import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found | White Glove Wireless</title>
        <meta name="description" content="The White Glove Wireless page you requested is not available." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <main className="not-found">
        <div className="not-found-card">
          <span className="eyebrow">404 · WHITE GLOVE WIRELESS</span>
          <h1>That page is not here.</h1>
          <p>The link may be outdated, or the page may have moved. Return home to compare wireless and fiber options or access your dashboard.</p>
          <div className="actions">
            <Link href="/">Go to White Glove Wireless</Link>
            <a href="https://white-glove-frontend.vercel.app/">Open dashboard</a>
          </div>
        </div>
      </main>
      <style jsx global>{`
        * { box-sizing: border-box; }
        body { margin: 0; min-width: 320px; background: #0b1120; color: #f1f5f9; font-family: Manrope, ui-sans-serif, system-ui, sans-serif; }
        .not-found { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: radial-gradient(circle at 82% 8%, rgba(212,163,115,.22), transparent 32%), linear-gradient(160deg, #0b1120, #111c33); }
        .not-found-card { width: min(100%, 680px); padding: clamp(28px, 7vw, 68px); border: 1px solid rgba(255,255,255,.14); border-radius: 20px; background: rgba(11,17,32,.76); box-shadow: 0 24px 70px rgba(0,0,0,.34); }
        .eyebrow { color: #d4a373; font: 800 11px "DM Mono", monospace; letter-spacing: .14em; }
        h1 { margin: 16px 0; font-size: clamp(40px, 8vw, 68px); line-height: .98; letter-spacing: -.05em; }
        p { margin: 0; color: #b8c3d4; line-height: 1.75; }
        .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .actions a { border: 1px solid rgba(255,255,255,.16); border-radius: 9px; padding: 12px 15px; color: #f1f5f9; font-weight: 800; text-decoration: none; }
        .actions a:first-child { border-color: #d4a373; background: #d4a373; color: #0b1120; }
        :focus-visible { outline: 3px solid #d4a373; outline-offset: 3px; }
      `}</style>
    </>
  );
}
