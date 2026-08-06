# White Glove Wireless Product Portfolio

Public Next.js site for White Glove Wireless and the products built under its portfolio.

**Live site:** [whitegwireless.com](https://whitegwireless.com)

## Product pages

- White Glove Wireless — AI-assisted sales operations
- Sales Platform — approximately halfway-built white-label CRM in active development
- SpendSense — financial intelligence for founders
- RepairScout — AI-assisted automotive repair research and quoting
- TruckTracker — live food-truck discovery and community
- BrainOS — private local-first personal AI operator
- The Pass — multi-model AI kitchen brigade for reviewed, practical recipes

The site also hosts product-specific privacy, terms, SMS consent, and opt-in pages.

## Stack

- Next.js 14
- React 18
- Supabase
- Vercel

## Local development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Repository scope

This public repository contains the portfolio and product-information site. The primary application repositories are maintained separately, and some remain private because they contain proprietary implementation details.

## Notable engineering work

A sample of real decisions and fixes from the commit history, not a generic feature list:

- **Replaced a fake AI chat with a real one.** The "Sophia" chat widget on the homepage looked like an AI assistant but was actually a hardcoded keyword-match (`if lowerInput.includes("switch")...`) behind a `setTimeout` to fake a typing delay. [`2c8e406`](https://github.com/humbertowgw-maker/white-glove-landing/commit/2c8e4063427d9cf3f05bdcd8eba791520707db5b) wired it to a real backend endpoint (`POST /api/public-chat`, scoped to FAQ/pricing with no account access) with actual conversation history — closing the gap between what the UI implied and what the code did.

- **Fail-closed admin gate, not just a login screen.** The Agent Builder admin console (dialer controls, orchestrator triggers) lives on the same domain as the public marketing site. Backend routes already enforce `requireAuth` + `requireAdmin`, but the page itself was publicly loadable. [`81f9c4f`](https://github.com/humbertowgw-maker/white-glove-landing/commit/81f9c4f7cc0ddb94e8b7b810530ae0d659863667) adds Next.js middleware in front of `/admin/*` that 404s unconditionally if `ADMIN_GATE_SECRET` isn't set in the environment, rather than degrading to an open route — a second, independent layer on top of the backend's own auth.

- **Removed unnecessary checkout friction after watching the real flow.** Signup used to always bounce the user to Stripe checkout immediately after creating their org — even though org creation already grants a 3-day, no-card Platinum trial server-side. [`d11260f`](https://github.com/humbertowgw-maker/white-glove-landing/commit/d11260fefe303f0191850612f5dce2650329af2d) removed the premature checkout call entirely so signup drops users straight into the trial they were already entitled to, and renamed the plan tiers to match.

- **Security posture is automated, not aspirational.** [`7a49f63`](https://github.com/humbertowgw-maker/white-glove-landing/commit/7a49f6388e11bec1e0af60241e0b5672047d1c08) upgraded Next.js off a vulnerable version and added a CI workflow (`.github/workflows/security.yml`) that runs `npm audit --audit-level=high` and a production build on every push, PR, and a weekly cron, plus Dependabot grouped updates. Dependency bumps (Next.js 14 → 15 → 16, React 18 → 19, Supabase client) have landed and been reviewed on an ongoing basis rather than left to rot — see the commit log for the cadence.
- One workflow experiment ([`94a751f`](https://github.com/humbertowgw-maker/white-glove-landing/commit/94a751fc229ea957d8a7815f4a70d8edad690330)) was added to auto-repair and auto-push lockfile fixes via `npm audit fix`, then pulled three minutes later ([`eef26bf`](https://github.com/humbertowgw-maker/white-glove-landing/commit/eef26bfab49adc35d22b6ca080b34632c92fadab)) rather than left in place half-considered — a CI job with `contents: write` and an unattended `git push` is worth reverting quickly if it isn't clearly safe.

**Deployed and live:** [whitegwireless.com](https://whitegwireless.com) is the production marketing/portfolio site; the linked product dashboard at `white-glove-frontend.vercel.app` is the actual application signup flows above lead into. Both were confirmed reachable (HTTP 200) as of this writing.

**Honest scope note:** this is a marketing/portfolio front end, not the product itself — the substantive backend logic (auth, billing, org provisioning, the real chat model) lives in separate, mostly private repos this one calls into over HTTP. There's no automated test suite here; correctness is enforced by the CI build/audit gate and manual verification against the live site, which is a reasonable tradeoff for a low-logic marketing site but worth naming plainly.
