import Head from "next/head";
import Link from "next/link";
import { PRODUCTS } from "../components/ProductGrid";

const apps = PRODUCTS.map(product => ({
  ...product,
  icon: product.initial || product.name.split(/\s+/).map(word => word[0]).join("").slice(0, 2),
  url: `/products/${product.id}`,
  tag: product.label,
}));

export default function AppsHub() {
  return (
    <>
      <Head>
        <title>Apps | White Glove Wireless</title>
        <meta name="description" content="Explore the apps built by White Glove Wireless." />
        <meta name="theme-color" content="#07101f" />
      </Head>

      <main className="apps-page">
        <nav className="apps-nav">
          <Link href="/" className="brand" aria-label="White Glove Wireless home">
            <span className="brand-mark">WG</span>
            <span>WHITE GLOVE <b>WIRELESS</b></span>
          </Link>
          <Link href="/" className="back-link">Back to White G Wireless</Link>
        </nav>

        <section className="hero">
          <div className="eyebrow">THE WHITE G APP COLLECTION</div>
          <h1>Useful tools.<br /><em>One trusted home.</em></h1>
          <p>
            Explore every first-version product in development, from sales and finance
            to media, food, security, local discovery, and private AI.
          </p>
          <div className="hero-meta">
            <span>{apps.length} apps</span>
            <span>Coming Soon previews</span>
            <span>Built by White Glove</span>
          </div>
        </section>

        <section className="apps-section" aria-labelledby="apps-heading">
          <div className="section-heading">
            <div>
              <span>APP DIRECTORY</span>
              <h2 id="apps-heading">Choose a project for a sneak peek.</h2>
            </div>
            <p>Every card opens a short Coming Soon page explaining what the first version is becoming and what is already available to preview.</p>
          </div>

          <div className="app-grid">
            {apps.map((app) => (
              <a
                className="app-card"
                href={app.url}
                key={app.name}
                style={{ "--accent": app.accent }}
              >
                <div className="card-top">
                  <span className="app-icon">{app.icon}</span>
                  <span className="tag">{app.tag}</span>
                </div>
                <h3>{app.name}</h3>
                <p>{app.description}</p>
                <span className="open">See sneak peek <b>→</b></span>
              </a>
            ))}
          </div>
        </section>

        <section className="install">
          <div>
            <span className="install-icon">＋</span>
            <div>
              <h2>Put your favorites on your home screen.</h2>
              <p>On iPhone, tap Share, then Add to Home Screen. On Android, open the browser menu and choose Install app.</p>
            </div>
          </div>
          <Link href="/" className="home-button">Visit White G Wireless</Link>
        </section>

        <footer>
          <span>© {new Date().getFullYear()} White Glove Wireless</span>
          <span>Technology with a human touch.</span>
        </footer>
      </main>

      <style jsx>{`
        :global(*) { box-sizing: border-box; }
        :global(body) { margin: 0; background: #07101f; color: #eef4ff; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        :global(a) { color: inherit; }
        .apps-page { min-height: 100vh; overflow: hidden; background:
          radial-gradient(circle at 85% 5%, rgba(36, 99, 235, .2), transparent 31rem),
          radial-gradient(circle at 8% 28%, rgba(212, 165, 116, .12), transparent 28rem),
          #07101f; }
        .apps-nav { width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding: 24px 0; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,.08); }
        .brand { display: flex; align-items: center; gap: 12px; text-decoration: none; font-size: 12px; font-weight: 800; letter-spacing: .14em; }
        .brand b { color: #d6ad77; }
        .brand-mark { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 12px; background: linear-gradient(145deg, #e0bb88, #9e6b36); color: #07101f; font-size: 12px; letter-spacing: 0; box-shadow: 0 10px 30px rgba(214,173,119,.25); }
        .back-link { color: #aebbd0; text-decoration: none; font-size: 13px; }
        .back-link:hover { color: white; }
        .hero { width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding: 92px 0 76px; }
        .eyebrow, .section-heading span { color: #d6ad77; font-size: 11px; font-weight: 800; letter-spacing: .18em; }
        h1 { max-width: 900px; margin: 18px 0 20px; font-size: clamp(48px, 8vw, 96px); line-height: .94; letter-spacing: -.055em; }
        h1 em { color: #d6ad77; font-family: Georgia, serif; font-weight: 400; }
        .hero > p { max-width: 660px; margin: 0; color: #aebbd0; font-size: clamp(17px, 2vw, 21px); line-height: 1.65; }
        .hero-meta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 32px; }
        .hero-meta span { padding: 8px 13px; border: 1px solid rgba(255,255,255,.1); border-radius: 999px; color: #c6d1e2; font-size: 12px; background: rgba(255,255,255,.035); }
        .apps-section { width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding: 68px 0 90px; border-top: 1px solid rgba(255,255,255,.08); }
        .section-heading { display: grid; grid-template-columns: 1fr minmax(280px, 440px); gap: 40px; align-items: end; margin-bottom: 32px; }
        .section-heading h2 { margin: 8px 0 0; font-size: clamp(28px, 4vw, 44px); letter-spacing: -.035em; }
        .section-heading p { margin: 0; color: #8f9db3; line-height: 1.7; }
        .app-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
        .app-card { min-height: 290px; display: flex; flex-direction: column; padding: 24px; border: 1px solid rgba(255,255,255,.09); border-radius: 22px; background: linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.025)); text-decoration: none; transition: transform .2s ease, border-color .2s ease, background .2s ease; }
        .app-card:hover { transform: translateY(-5px); border-color: var(--accent); background: linear-gradient(145deg, color-mix(in srgb, var(--accent) 12%, transparent), rgba(255,255,255,.03)); }
        .card-top { display: flex; align-items: center; justify-content: space-between; }
        .app-icon { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 16px; background: color-mix(in srgb, var(--accent) 16%, #0a1426); border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent); font-size: 25px; }
        .tag { color: var(--accent); font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
        .app-card h3 { margin: 24px 0 10px; font-size: 21px; letter-spacing: -.02em; }
        .app-card p { margin: 0; color: #98a6ba; font-size: 14px; line-height: 1.65; }
        .open { margin-top: auto; padding-top: 24px; color: #e7edf7; font-size: 13px; font-weight: 700; }
        .open b { margin-left: 5px; color: var(--accent); }
        .install { width: min(1180px, calc(100% - 40px)); margin: 0 auto 72px; padding: 30px; display: flex; justify-content: space-between; align-items: center; gap: 30px; border: 1px solid rgba(214,173,119,.28); border-radius: 24px; background: linear-gradient(120deg, rgba(214,173,119,.12), rgba(59,130,246,.08)); }
        .install > div { display: flex; gap: 18px; align-items: center; }
        .install-icon { width: 52px; height: 52px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 16px; background: #d6ad77; color: #07101f; font-size: 28px; }
        .install h2 { margin: 0 0 7px; font-size: 21px; }
        .install p { max-width: 700px; margin: 0; color: #aebbd0; font-size: 14px; line-height: 1.55; }
        .home-button { white-space: nowrap; padding: 13px 18px; border-radius: 12px; background: #eef4ff; color: #07101f; text-decoration: none; font-size: 13px; font-weight: 800; }
        footer { width: min(1180px, calc(100% - 40px)); margin: 0 auto; padding: 28px 0 40px; display: flex; justify-content: space-between; color: #718096; font-size: 12px; border-top: 1px solid rgba(255,255,255,.07); }
        @media (max-width: 950px) { .app-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 700px) {
          .apps-nav { width: min(100% - 28px, 1180px); }
          .brand > span:last-child { display: none; }
          .hero, .apps-section, .install, footer { width: min(100% - 28px, 1180px); }
          .hero { padding: 64px 0 54px; }
          .section-heading { grid-template-columns: 1fr; gap: 14px; }
          .app-grid { grid-template-columns: 1fr; }
          .app-card { min-height: 250px; }
          .install { align-items: flex-start; flex-direction: column; padding: 24px; }
          .install > div { align-items: flex-start; }
          footer { gap: 8px; flex-direction: column; }
        }
      `}</style>
    </>
  );
}
