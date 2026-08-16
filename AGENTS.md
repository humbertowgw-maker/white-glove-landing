# Recent work — read before touching components/ProductGrid.jsx or pages/apps.jsx

As of 2026-08-16, Claude added to the product catalog (`components/ProductGrid.jsx`):
- `screenshot-analyzer` (Screenshot Analyzer) — live at screenshots.whitegwireless.com
- `canine-cgm-bridge` (Aegis CGM Bridge) — coming-soon, no live deploy yet

Also added real caution-tape styling in `pages/apps.jsx` (`.caution-ribbon` — a
diagonal yellow/black striped ribbon) for every `status: "coming-soon"` product
card, replacing the old plain "Coming soon" text-only tag. Keep this pattern
when adding future coming-soon products — don't revert to a plain tag.

If you're working on this repo in parallel with another session: this repo's
remote history has been force-pushed before. Before pushing, run
`git fetch origin && git log HEAD..origin/main --oneline` and check for
unexpected commits rather than assuming your local clone is current.
