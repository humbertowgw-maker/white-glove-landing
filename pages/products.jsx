// pages/products.jsx — White Glove product portfolio
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import AppInstallMeta from "../components/AppInstallMeta";
import ProductGrid from "../components/ProductGrid";

export default function Products() {
  return (
    <>
      <Head>
        <title>White Glove — Product Portfolio</title>
        <meta
          name="description"
          content="White Glove builds solution-based SaaS products for sales, finance, operations, and AI-assisted pipelines."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AppInstallMeta slug="portfolio" name="White Glove" themeColor="#070707" />

      <style jsx global>{`
        :root {
          color-scheme: dark;
          --page: #070707;
          --ink: #f8fafc;
          --muted: #94a3b8;
          --soft: #cbd5e1;
          --line: rgba(255,255,255,.12);
          --att: #00A8E0;
          --att-soft: rgba(0,168,224,.18);
        }
        * { box-sizing: border-box; }
        html { background: var(--page); }
        body {
          margin: 0;
          min-width: 320px;
          color: var(--ink);
          font-family: "Manrope", sans-serif;
        }
        a { color: inherit; text-decoration: none; }
        .products-page {
          min-height: 100vh;
          background: var(--page);
        }
        .products-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 24px;
          border-bottom: 1px solid var(--line);
        }
        .products-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 15px;
        }
        .products-brand span {
          color: var(--muted);
          font-weight: 500;
          font-size: 13px;
        }
        .products-nav a.back {
          font-size: 13px;
          color: var(--att);
          font-weight: 600;
        }
        .products-hero {
          padding: 64px 24px 40px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        .products-hero .mono {
          font-family: "DM Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--att);
          margin-bottom: 12px;
        }
        .products-hero h1 {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          margin: 0 0 16px;
        }
        .products-hero p {
          max-width: 640px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.6;
        }
        .products-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .product {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 14px;
          transition: transform .15s, border-color .15s, box-shadow .15s;
        }
        .product:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
          box-shadow: 0 8px 24px rgba(0,0,0,.25);
        }
        .product-logo {
          border-radius: 12px;
          flex-shrink: 0;
        }
        .product span {
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .product h3 {
          margin: 4px 0 8px;
          font-size: 17px;
          font-weight: 700;
        }
        .product p {
          margin: 0;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
        }
        .products-footer {
          text-align: center;
          padding: 40px 24px;
          border-top: 1px solid var(--line);
          color: var(--muted);
          font-size: 13px;
        }
      `}</style>

      <main className="products-page">
        <nav className="products-nav">
          <Link href="/" className="products-brand">
            <Image src="/logos/white-glove-wireless-app-icon-selected.png" alt="" width={36} height={36} />
            <div>White Glove <span>/ Products</span></div>
          </Link>
          <Link href="/" className="back">← Back to home</Link>
        </nav>

        <section className="products-hero">
          <div className="mono">Built by White Glove</div>
          <h1>Solution-based SaaS products.</h1>
          <p>
            A portfolio of operating systems, tools, and AI-assisted pipelines built to run businesses end-to-end.
          </p>
        </section>

        <section className="products-container">
          <ProductGrid />
        </section>

        <footer className="products-footer">
          <span>© {new Date().getFullYear()} White Glove Wireless · Software for sales, service, operations, and AI-assisted pipelines</span>
        </footer>
      </main>
    </>
  );
}
