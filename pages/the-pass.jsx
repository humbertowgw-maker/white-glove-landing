import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AppInstallMeta from "../components/AppInstallMeta";

const APP_URL = "https://purple-beach-0c1e8a510.7.azurestaticapps.net/";
const TIP_URL = `${APP_URL}?tip=brigade`;

const BRIGADE = [
  ["01", "Head Chef", "Invents the dish", "Turns your available ingredients into a complete recipe concept—without adding a fantasy grocery list."],
  ["02", "Sous Chef", "Refines the plan", "Improves the method, balances flavors, and makes the recipe practical for a real home kitchen."],
  ["03", "The Critic", "Approves the plate", "Reviews the final recipe and decides whether it is good enough to leave the pass."],
];

export default function ThePassLanding() {
  return (
    <>
      <Head>
        <title>The Pass — Turn Your Ingredients Into Dinner</title>
        <meta name="description" content="Enter the ingredients you have and let a multi-model AI kitchen brigade create, refine, and review a recipe for you." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Manrope:wght@400;500;600&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <AppInstallMeta slug="the-pass" name="The Pass" themeColor="#e8541e" />

      <style jsx global>{`
        :root{color-scheme:dark;--ink:#f2ebdd;--paper:#16130f;--panel:#1c1812;--line:rgba(242,235,221,.13);--muted:#a99e8b;--fire:#e8541e;--gold:#f3b562}
        *{box-sizing:border-box}html{background:var(--paper);scroll-behavior:smooth}
        body{margin:0;min-width:320px;background:radial-gradient(circle at 50% 0%,rgba(232,84,30,.1),transparent 28%),#16130f;color:var(--ink);font-family:"Manrope",sans-serif}
        a{color:inherit}.pass-shell{min-height:100vh;overflow:hidden}
        .pass-nav{width:min(1180px,calc(100% - 48px));margin:0 auto;padding:24px 0;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line)}
        .back-link,.nav-launch,.ticket-label,.micro{font-family:"DM Mono",monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase}
        .back-link{color:#8f8575;text-decoration:none}.back-link:hover{color:var(--ink)}
        .nav-actions{display:flex;align-items:center;gap:10px}.nav-launch{padding:11px 15px;color:#16130f;background:var(--fire);text-decoration:none;font-weight:500}.nav-tip{padding:10px 13px;border:1px solid rgba(232,84,30,.72);color:var(--ink);text-decoration:none;background:rgba(232,84,30,.14);box-shadow:0 0 0 1px rgba(232,84,30,.12)}
        .hero{width:min(1180px,calc(100% - 48px));margin:0 auto;padding:86px 0 76px;display:grid;grid-template-columns:1.08fr .92fr;gap:70px;align-items:center}.pass-logo{width:70px;height:70px;border-radius:18px;margin-bottom:24px;box-shadow:0 15px 40px rgba(0,0,0,.45)}
        .micro{color:var(--gold);margin-bottom:20px}h1,h2,h3{font-family:"Oswald",sans-serif;text-transform:uppercase}
        h1{margin:0 0 24px;font-size:clamp(76px,11vw,156px);line-height:.82;letter-spacing:-.055em}h1 span{color:var(--fire)}
        .hero-copy>p{max-width:610px;margin:0 0 32px;color:#b9ad9b;font-size:17px;line-height:1.7}
        .hero-actions{display:flex;flex-wrap:wrap;gap:12px}.primary,.secondary{padding:15px 20px;text-decoration:none;font-family:"DM Mono",monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;transition:transform .2s,border-color .2s}
        .primary{color:#16130f;background:var(--fire);font-weight:500}.secondary{color:var(--ink);border:1px solid var(--line)}.tip-cta{position:relative;padding-right:52px;border-color:rgba(232,84,30,.72);background:linear-gradient(135deg,rgba(232,84,30,.2),rgba(243,181,98,.06));box-shadow:0 10px 34px rgba(0,0,0,.22)}.tip-cta:after{content:"→";position:absolute;right:15px;top:50%;width:25px;height:25px;display:grid;place-items:center;border-radius:50%;background:var(--fire);color:#16130f;transform:translateY(-50%);font-weight:700}.primary:hover,.secondary:hover{transform:translateY(-2px)}.secondary:hover{border-color:var(--gold)}.tip-cta:hover{border-color:#ff6326}
        .order-ticket{position:relative;padding:28px;border:1px solid var(--line);background:repeating-linear-gradient(0deg,transparent 0 27px,rgba(242,235,221,.028) 28px),#1b1711;box-shadow:0 30px 90px rgba(0,0,0,.36)}
        .order-ticket:before{content:"";position:absolute;inset:10px;border:1px dashed rgba(242,235,221,.08);pointer-events:none}
        .ticket-head{display:flex;justify-content:space-between;gap:20px;margin-bottom:24px;padding-bottom:18px;border-bottom:1px solid var(--line)}.ticket-label{color:#8f8575}
        .ingredients{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:28px}.ingredients span{padding:8px 10px;border:1px solid rgba(243,181,98,.22);color:#d8c9b2;background:rgba(243,181,98,.04);font-family:"DM Mono",monospace;font-size:10px}
        .ticket-result{padding:19px;border-left:3px solid var(--fire);background:rgba(232,84,30,.07)}.ticket-result small{display:block;margin-bottom:7px;color:var(--fire);font-family:"DM Mono",monospace;font-size:9px;letter-spacing:.12em}.ticket-result strong{font-family:"Oswald",sans-serif;font-size:25px;text-transform:uppercase}
        .brigade{width:min(1180px,calc(100% - 48px));margin:0 auto;padding:70px 0 88px;border-top:1px solid var(--line)}
        .section-head{display:flex;align-items:end;justify-content:space-between;gap:30px;margin-bottom:34px}.section-head h2{max-width:650px;margin:0;font-size:clamp(44px,6vw,76px);line-height:.95}.section-head p{max-width:390px;margin:0;color:var(--muted);font-size:13px;line-height:1.7}
        .brigade-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.chef-card{min-height:290px;padding:25px;border:1px solid var(--line);background:var(--panel)}.chef-number{color:var(--fire);font-family:"DM Mono",monospace;font-size:10px}.chef-role{margin:72px 0 8px;color:var(--gold);font-family:"DM Mono",monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase}.chef-card h3{margin:0 0 14px;font-size:28px}.chef-card p{margin:0;color:var(--muted);font-size:12px;line-height:1.75}
        .tip-band{width:min(1180px,calc(100% - 48px));margin:0 auto 88px;padding:28px;border:1px solid rgba(243,181,98,.22);background:linear-gradient(135deg,rgba(232,84,30,.12),rgba(28,24,18,.92));display:flex;align-items:center;justify-content:space-between;gap:24px}.tip-band p{max-width:530px;margin:8px 0 0;color:var(--muted);line-height:1.6}.tip-band h2{margin:0;font-size:clamp(34px,5vw,62px);line-height:.95}.tip-band .secondary{border-color:rgba(243,181,98,.38)}
        .cta{padding:90px 24px;text-align:center;border-top:1px solid var(--line);background:radial-gradient(circle at 50% 100%,rgba(232,84,30,.17),transparent 42%)}.cta h2{margin:0 0 18px;font-size:clamp(48px,8vw,96px);line-height:.9}.cta p{margin:0 auto 30px;color:var(--muted)}
        .pass-footer{width:min(1180px,calc(100% - 48px));margin:0 auto;padding:28px 0 38px;display:flex;justify-content:space-between;gap:20px;color:#70685d;border-top:1px solid var(--line);font-family:"DM Mono",monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase}
        @media(max-width:820px){.hero{grid-template-columns:1fr;gap:46px;padding-top:62px}.section-head{display:block}.section-head p{margin-top:18px}.brigade-grid{grid-template-columns:1fr}.chef-card{min-height:230px}.chef-role{margin-top:45px}.tip-band{display:block}.tip-band .secondary{display:inline-block;margin-top:22px}}
        @media(max-width:520px){.pass-nav,.hero,.brigade,.tip-band,.pass-footer{width:calc(100% - 28px)}.pass-nav{padding-top:17px}.nav-actions{gap:7px}.nav-tip{display:none}.hero{padding:54px 0 60px}h1{font-size:28vw}.hero-copy>p{font-size:15px}.order-ticket{padding:21px}.pass-footer{flex-direction:column;line-height:1.6}}
      `}</style>

      <main className="pass-shell">
        <nav className="pass-nav">
          <Link href="/" className="back-link">← All products</Link>
          <div className="nav-actions">
            <a href={TIP_URL} className="nav-tip back-link">Wallet tip →</a>
            <a href={APP_URL} className="nav-launch">Open The Pass ↗</a>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-copy">
            <Image src="/logos/the-pass-app-icon.svg" alt="The Pass logo" width={70} height={70} className="pass-logo"/>
            <div className="micro">Multi-model kitchen brigade</div>
            <h1>The <span>Pass</span></h1>
            <p>Stop staring into the fridge waiting for inspiration. Tell The Pass what you have on hand and three AI kitchen roles work together to turn it into dinner.</p>
            <div className="hero-actions">
              <a href={APP_URL} className="primary">Fire The Pass ↗</a>
              <a href={TIP_URL} className="secondary tip-cta">Tip with Apple Pay / Google Pay</a>
              <a href="#brigade" className="secondary">Meet the brigade</a>
            </div>
          </div>

          <div className="order-ticket" aria-label="Example ingredient order">
            <div className="ticket-head"><span className="ticket-label">Order ticket — On hand</span><span className="ticket-label">Table 01</span></div>
            <div className="ingredients">
              {["eggs","day-old bread","parmesan","garlic","half an onion","butter","chili flakes"].map(item=><span key={item}>{item}</span>)}
            </div>
            <div className="ticket-result"><small>THE KITCHEN SUGGESTS</small><strong>Spicy Parmesan Bread Frittata</strong></div>
          </div>
        </section>

        <section className="brigade" id="brigade">
          <div className="section-head">
            <h2>Three minds.<br/>One finished plate.</h2>
            <p>The Pass uses a kitchen-brigade workflow so the first idea is challenged, improved, and reviewed before it reaches you.</p>
          </div>
          <div className="brigade-grid">
            {BRIGADE.map(([number,role,title,copy])=>(
              <article className="chef-card" key={number}>
                <div className="chef-number">{number}</div><div className="chef-role">{role}</div><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tip-band">
          <div>
            <div className="micro">Kitchen appreciation</div>
            <h2>Tip the brigade.</h2>
            <p>When the Head Chef, Sous Chef, and Critic save dinner, send a little thanks back to the line with Apple Pay, Google Pay, cards, or supported wallet checkout.</p>
          </div>
          <a href={TIP_URL} className="secondary tip-cta">Open tip jar</a>
        </section>

        <section className="cta">
          <div className="micro">Dinner starts with what you already have</div>
          <h2>What’s in your fridge?</h2>
          <p>List your ingredients. Pantry staples are assumed.</p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <a href={APP_URL} className="primary">Create My Recipe ↗</a>
            <a href={TIP_URL} className="secondary tip-cta">Tip with wallet checkout</a>
          </div>
        </section>

        <footer className="pass-footer"><span>The Pass · A White Glove product</span><span>Application hosted on Azure Static Web Apps</span></footer>
      </main>
    </>
  );
}
