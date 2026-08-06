import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppInstallMeta from "../../components/AppInstallMeta";
import { PRODUCTS } from "../../components/ProductGrid";

export function getStaticPaths() {
  return {
    paths: PRODUCTS.map(product => ({ params: { id: product.id } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return { props: { product: PRODUCTS.find(item => item.id === params.id) } };
}

export default function ProductSneakPeek({ product }) {
  const external = product.previewHref?.startsWith("http");
  return (
    <>
      <Head>
        <title>{product.name} — Coming Soon | White Glove</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} — Coming Soon`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://whitegwireless.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} — Coming Soon`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content="https://whitegwireless.com/og-image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <AppInstallMeta slug="portfolio" name="White Glove" themeColor="#070707" />
      <style jsx global>{`
        :root { color-scheme: dark; --accent: ${product.accent}; }
        * { box-sizing: border-box; }
        html, body { margin: 0; min-width: 320px; background: #070707; color: #f8fafc; font-family: "Manrope", sans-serif; }
        a { color: inherit; text-decoration: none; }
        .peek-page { min-height: 100vh; background: radial-gradient(circle at 75% 15%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 28%), #070707; }
        .peek-nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid rgba(255,255,255,.1); }
        .peek-nav a { font-size: 13px; color: #cbd5e1; }
        .peek-nav .brand { font-weight: 800; color: #fff; }
        .peek-shell { width: min(1080px, calc(100% - 40px)); margin: 0 auto; padding: 76px 0 96px; }
        .peek-status { display: inline-flex; align-items: center; gap: 9px; padding: 8px 12px; border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent); border-radius: 999px; color: var(--accent); font: 500 11px "DM Mono", monospace; letter-spacing: .08em; text-transform: uppercase; }
        .peek-status::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 18px var(--accent); }
        .peek-hero { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr); gap: 64px; align-items: center; margin-top: 32px; }
        .peek-mark { width: 84px; height: 84px; display: grid; place-items: center; margin-bottom: 28px; border-radius: 22px; overflow: hidden; background: color-mix(in srgb, var(--accent) 18%, #111827); border: 1px solid color-mix(in srgb, var(--accent) 48%, transparent); color: var(--accent); font: 800 24px "DM Mono", monospace; }
        .peek-mark img { width: 100%; height: 100%; object-fit: cover; }
        .peek-kicker { color: var(--accent); font: 500 12px "DM Mono", monospace; text-transform: uppercase; letter-spacing: .12em; }
        .peek-copy h1 { margin: 12px 0 18px; font-size: clamp(42px, 7vw, 76px); line-height: .98; letter-spacing: -.045em; }
        .peek-copy .lead { max-width: 720px; margin: 0; color: #cbd5e1; font-size: clamp(18px, 2vw, 23px); line-height: 1.55; }
        .peek-copy .detail { max-width: 680px; margin: 24px 0 0; color: #94a3b8; font-size: 15px; line-height: 1.75; }
        .peek-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
        .peek-button { display: inline-flex; min-height: 46px; align-items: center; justify-content: center; padding: 0 18px; border-radius: 10px; background: var(--accent); color: #050505; font-weight: 800; font-size: 13px; }
        .peek-button.secondary { background: transparent; color: #e2e8f0; border: 1px solid rgba(255,255,255,.16); }
        .peek-panel { padding: 28px; border-radius: 22px; border: 1px solid rgba(255,255,255,.11); background: rgba(15,23,42,.72); box-shadow: 0 30px 80px rgba(0,0,0,.28); }
        .peek-panel-label { color: #64748b; font: 500 11px "DM Mono", monospace; letter-spacing: .1em; text-transform: uppercase; }
        .peek-panel h2 { margin: 10px 0 22px; font-size: 24px; }
        .peek-panel ul { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; }
        .peek-panel li { display: flex; gap: 12px; padding: 14px; border-radius: 12px; background: rgba(255,255,255,.04); color: #cbd5e1; font-size: 14px; line-height: 1.45; }
        .peek-panel li::before { content: "↗"; color: var(--accent); font-weight: 800; }
        .peek-note { margin-top: 22px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,.09); color: #64748b; font-size: 12px; line-height: 1.6; }
        @media (max-width: 780px) { .peek-hero { grid-template-columns: 1fr; gap: 40px; } .peek-shell { padding-top: 48px; } .peek-copy h1 { font-size: clamp(38px, 12vw, 58px); } }
      `}</style>
      <main className="peek-page">
        <nav className="peek-nav">
          <Link href="/" className="brand">White Glove</Link>
          <Link href="/products">← All products</Link>
        </nav>
        <div className="peek-shell">
          <div className="peek-status">Coming soon · First version in progress</div>
          <section className="peek-hero">
            <div className="peek-copy">
              <div className="peek-mark">
                {product.logo ? <Image src={product.logo} alt="" width={84} height={84} /> : product.initial}
              </div>
              <div className="peek-kicker">{product.label}</div>
              <h1>{product.name}</h1>
              <p className="lead">{product.description}</p>
              <p className="detail">{product.sneakPeek}</p>
              <div className="peek-actions">
                {product.previewHref && (external
                  ? <a className="peek-button" href={product.previewHref} target="_blank" rel="noreferrer">Open current preview ↗</a>
                  : <Link className="peek-button" href={product.previewHref}>Explore the current preview →</Link>)}
                <Link className="peek-button secondary" href="/products">View every product</Link>
              </div>
            </div>
            <aside className="peek-panel">
              <div className="peek-panel-label">Sneak peek</div>
              <h2>What it is becoming</h2>
              <ul>{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              <div className="peek-note">This page describes the first version currently being developed. Features and availability may change as the product is tested.</div>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}
