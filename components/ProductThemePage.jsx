import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function ProductThemePage({ product }) {
  return (
    <>
      <Head>
        <title>{product.name} — {product.tagline}</title>
        <meta name="description" content={product.description} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>{`
        :root{color-scheme:dark;--accent:${product.accent};--accent2:${product.accent2};--rgb:${product.rgb};--page:${product.page};--panel:${product.panel};--ink:#f7f7f5;--muted:${product.muted}}
        *{box-sizing:border-box}html{background:var(--page);scroll-behavior:smooth}body{margin:0;min-width:320px;background:var(--page);color:var(--ink);font-family:"Manrope",sans-serif}a{color:inherit}
        .theme-shell{min-height:100vh;overflow:hidden;background:${product.background}}
        .theme-nav{width:min(1240px,calc(100% - 48px));margin:auto;padding:22px 0;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(var(--rgb),.16)}
        .nav-brand{display:flex;align-items:center;gap:12px}.nav-logo{width:44px;height:44px;border-radius:13px;object-fit:cover;box-shadow:0 10px 30px rgba(0,0,0,.35)}.nav-name{font-weight:800;letter-spacing:-.03em}.nav-sub,.micro,.step-number{font-family:"DM Mono",monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase}.nav-sub{display:block;color:var(--muted);margin-top:2px}.back{color:var(--muted);text-decoration:none;font:10px "DM Mono",monospace;letter-spacing:.1em;text-transform:uppercase}
        .hero{width:min(1240px,calc(100% - 48px));margin:auto;padding:76px 0 86px;display:grid;grid-template-columns:1fr .9fr;gap:72px;align-items:center}.micro{color:var(--accent);margin-bottom:18px}.hero h1{margin:0 0 23px;font-size:clamp(54px,7vw,96px);line-height:.94;letter-spacing:-.065em}.hero h1 span{color:var(--accent)}.hero-copy>p{max-width:620px;margin:0 0 32px;color:var(--muted);font-size:16px;line-height:1.75}.actions{display:flex;gap:12px;flex-wrap:wrap}.primary,.secondary{padding:15px 20px;text-decoration:none;font:500 10px "DM Mono",monospace;letter-spacing:.1em;text-transform:uppercase;transition:.2s}.primary{background:var(--accent);color:${product.buttonText}}.secondary{border:1px solid rgba(var(--rgb),.26)}.primary:hover,.secondary:hover{transform:translateY(-2px)}
        .logo-world{min-height:520px;display:grid;place-items:center;position:relative}.logo-world:before,.logo-world:after{content:"";position:absolute;border-radius:50%;border:1px solid rgba(var(--rgb),.14)}.logo-world:before{width:92%;aspect-ratio:1}.logo-world:after{width:70%;aspect-ratio:1;box-shadow:0 0 90px rgba(var(--rgb),.16)}.hero-logo{position:relative;z-index:2;width:min(100%,480px);height:auto;border-radius:23%;filter:drop-shadow(0 34px 54px rgba(0,0,0,.55))}
        .signal-strip{border-top:1px solid rgba(var(--rgb),.14);border-bottom:1px solid rgba(var(--rgb),.14);background:rgba(var(--rgb),.035)}.signal-inner{width:min(1240px,calc(100% - 48px));margin:auto;display:grid;grid-template-columns:repeat(4,1fr)}.signal{padding:22px;border-right:1px solid rgba(var(--rgb),.12)}.signal:last-child{border:0}.signal strong{display:block;color:var(--accent);font-size:13px;margin-bottom:5px}.signal span{color:var(--muted);font-size:10px}
        .process{width:min(1240px,calc(100% - 48px));margin:auto;padding:90px 0}.section-head{display:flex;justify-content:space-between;align-items:end;gap:30px;margin-bottom:36px}.section-head h2{margin:0;max-width:700px;font-size:clamp(40px,5vw,66px);line-height:1;letter-spacing:-.05em}.section-head p{max-width:400px;margin:0;color:var(--muted);font-size:13px;line-height:1.7}.step-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.step-card{min-height:270px;padding:25px;border:1px solid rgba(var(--rgb),.15);background:var(--panel);position:relative;overflow:hidden}.step-card:after{content:"";position:absolute;inset:auto -30px -60px auto;width:150px;height:150px;border-radius:50%;border:1px solid rgba(var(--rgb),.12)}.step-number{color:var(--accent)}.step-card h3{margin:70px 0 12px;font-size:24px;letter-spacing:-.03em}.step-card p{margin:0;color:var(--muted);font-size:12px;line-height:1.7}
        .cta{padding:90px 24px;text-align:center;border-top:1px solid rgba(var(--rgb),.15);background:radial-gradient(circle at 50% 100%,rgba(var(--rgb),.15),transparent 43%)}.cta h2{margin:0 0 18px;font-size:clamp(44px,7vw,80px);letter-spacing:-.055em}.cta p{margin:0 auto 30px;color:var(--muted)}.theme-footer{width:min(1240px,calc(100% - 48px));margin:auto;padding:28px 0 38px;display:flex;justify-content:space-between;gap:20px;border-top:1px solid rgba(var(--rgb),.12);color:var(--muted);font:9px "DM Mono",monospace;letter-spacing:.1em;text-transform:uppercase}
        @media(max-width:820px){.hero{grid-template-columns:1fr;gap:30px}.logo-world{min-height:390px}.signal-inner{grid-template-columns:repeat(2,1fr)}.section-head{display:block}.section-head p{margin-top:18px}.step-grid{grid-template-columns:1fr}.step-card{min-height:220px}.step-card h3{margin-top:42px}}
        @media(max-width:520px){.theme-nav,.hero,.signal-inner,.process,.theme-footer{width:calc(100% - 28px)}.nav-brand .nav-copy{display:none}.hero{padding:55px 0}.hero h1{font-size:14vw}.hero-copy>p{font-size:14px}.logo-world{min-height:330px}.signal{padding:17px 10px}.theme-footer{flex-direction:column;line-height:1.6}}
      `}</style>
      <main className="theme-shell">
        <nav className="theme-nav">
          <div className="nav-brand">
            <Image src={product.logo} alt="" width={44} height={44} className="nav-logo" />
            <span className="nav-copy"><span className="nav-name">{product.name}</span><span className="nav-sub">{product.eyebrow}</span></span>
          </div>
          <Link href="/" className="back">All products ↗</Link>
        </nav>
        <section className="hero">
          <div className="hero-copy">
            <div className="micro">{product.eyebrow}</div>
            <h1>{product.heroBefore}<br/><span>{product.heroAccent}</span></h1>
            <p>{product.description}</p>
            <div className="actions"><a href={product.appUrl} className="primary">{product.primary} ↗</a><a href="#how" className="secondary">See how it works</a></div>
          </div>
          <div className="logo-world"><Image src={product.logo} alt={`${product.name} logo`} width={520} height={520} priority className="hero-logo" /></div>
        </section>
        <section className="signal-strip"><div className="signal-inner">{product.signals.map(([value,label])=><div className="signal" key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
        <section className="process" id="how">
          <div className="section-head"><h2>{product.sectionTitle}</h2><p>{product.sectionCopy}</p></div>
          <div className="step-grid">{product.steps.map((step,index)=><article className="step-card" key={step.title}><div className="step-number">0{index+1}</div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        </section>
        <section className="cta"><div className="micro">{product.ctaKicker}</div><h2>{product.ctaTitle}</h2><p>{product.ctaCopy}</p><a href={product.appUrl} className="primary">{product.primary} ↗</a></section>
        <footer className="theme-footer"><span>{product.name} · A Humberto Labs product</span><span>{product.footer}</span></footer>
      </main>
    </>
  );
}
