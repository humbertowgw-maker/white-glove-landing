# WGW SEO and discovery plan

## What the site now controls

- Every public route receives a canonical URL from `pages/_app.jsx`.
- `public/robots.txt` permits public indexing, blocks `/admin/`, and points crawlers to `public/sitemap.xml`.
- The home page has its own title, description, canonical URL, social image, and one H1. Product pages retain their own titles and descriptions where already defined.
- The home page links visitors to the calculator, bill review, applications, and sales platform. The footer repeats the main high-intent destinations.

## Link strategy

1. Keep the home page as the main authority page for wireless and fiber help. Link from it to only the pages that solve a distinct user need.
2. Use the application directory to link to each live product and make each product page link back to `/apps` and the home page.
3. Publish useful, original pages before seeking links: switching checklists, business wireless setup guides, and clear explanations of bill credits. Each should link to the relevant service or calculator section.
4. Earn references from real partners and local organizations: authorized-dealer profiles, local chamber/member directories, business partners, and product launch pages. Do not buy links, create fake reviews, or use automated directory spam.
5. When a partner links to a page, use the most specific stable URL available. Track the referring domain, destination URL, and date in the CRM before asking for a change.

## Owner tasks after deploy

1. Add `https://whitegwireless.com/sitemap.xml` to the verified Google Search Console property.
2. Review Search Console coverage and Core Web Vitals after Google recrawls the release. This needs the owner’s connected Search Console account; it cannot be verified from source code alone.
3. Re-test the priority outbound links quarterly and remove any that no longer point to a live product or partner.
