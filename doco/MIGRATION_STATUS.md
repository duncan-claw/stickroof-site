# Phase 1–2 migration status

2026-09-20 — local implementation; awaiting parent review. Not published.

## Scope and provenance

Only prepared worktree stickroof-site-phase12, branch migration/phase-1-2. Verified starting HEAD 92c7c8e4f88040700aec7a4c396b9b6b70c14e3e and origin https://github.com/duncan-claw/stickroof-site.git. Rails source and walkerswhizzkids reference read only; source dirty/untracked status unchanged after work. Primary checkout untouched.

Read full migration plan, workspace BROCHURE_SITES.md, actual reference setup/components, source controllers, all pages/shared/layout views, helpers, CSS, JS/controllers, routes, Lead validations and public asset inventory. Source lock resolves Rails 8.0.4, Propshaft 1.3.1, Tailwind Ruby 4.2.1, Turbo 2.0.23, Stimulus 1.3.4, importmap 2.2.3, Solid Queue 1.3.2, Puma 7.2.0.

## Delivered

- Vite 8.3.0, React/React DOM 19.3.0, Tailwind and Tailwind Vite plugin 4.3.3, React Vite plugin 6.1.1; npm latest versions, package-lock. Playwright 1.63.0, Cheerio 1.2.0. Node 22.23.1/npm 10.9.8 locally.
- Six routes: /, /stick-roofs, /carpentry-joinery, /service-area, /contact, /thanks. Complete initial HTML, exact source title/description/canonical/OG and per-route LocalBusiness JSON-LD. Source has no OG image tag, hours or coordinates: none invented.
- React source-markup port; src/index.css byte-identical to source Tailwind input. Native details email reveal, wrapping always-visible mobile nav, static gallery preserved. Source has no hamburger/lightbox/carousel: none invented. Five images on home, first four on stick-roofs, exact titles/alts/dimensions/lazy loading. Used icons and hero mark copied; unused alternative logo drafts and Rails error assets not imported.
- Six directory indexes plus five matching .html aliases support static clean URLs without fallback. Canonicals retain extensionless paths. Real 404 document; unknown local route returns 404.
- Form fields/options, required constraints, optional email format, consent, source_path, trimmed presence validation retained. Send button disabled in initial HTML; preventDefault handler; no network/storage code. Visible notice and phone alternative. False storage fine print replaced. /thanks content/SEO preserved with prominent preview disclaimer; form cannot navigate there.
- Google AW-18100747970 and independently audited source conversion label AzAaCOOlpZ4cEML9jbdD retained. The source thank-you event definition is send_to AW-18100747970/AzAaCOOlpZ4cEML9jbdD plus Meta Lead. Definitions remain behind the hard-disabled confirmed-submission gate; visiting /thanks never invokes them. Meta 982008488091156 follows explicit instruction. PageView/config only load on production hostnames, never local/preview domains.
- CNAME stickroof.com, robots and source sitemap preserved. Sitemap intentionally retains five marketing routes; /thanks exists but is not a discovery page.
- Workflow: npm ci → build → tests → official upload-pages-artifact → deploy-pages. workflow_dispatch only, deployment restricted to main. No workflow execution or GitHub config changes.

## Verification evidence

- Build: six prerendered routes. CSS 10.86 kB / 3.53 kB gzip; JS 246.65 kB / 75.28 kB gzip. Build-only SSR module not published.
- npm ci: clean install, 0 audit vulnerabilities. Eight copied assets SHA-256 checked byte-identical against source using scripts/verify-source-assets.mjs.
- Static tests (8): source copy/headings/lists, independently frozen controller constants/SEO, exact CSS, gallery metadata, internal links/assets, JSON-LD, form fields, CNAME, tracking suppression and 404.
- Browser smoke: Chrome, all six routes at 1440×1000 desktop and 390×844 mobile, plus all six with JavaScript disabled. Navigation, image decoding, email reveal, validation, disabled send, source_path, metadata, no horizontal overflow. Zero console errors or external requests. No real submissions.
- artifacts/browser-results.json and 12 artifacts/{desktop,mobile}-*.png screenshots retained locally (gitignored). Assistant image viewer blocked screenshot display by directory policy; no claim of manual pixel-diff review against running Rails.
- Preview remains http://127.0.0.1:4173 (npm run preview, no timeout).
- Frozen source fixtures make tests independent of Rails. scripts/port-source.mjs records one-time mechanical port; do not rerun casually over maintained pages.

## Deferred gates and gaps

1. Phase 3 needs approval: recipient, Postie Website/key, accepted/error states, spam controls, delivery and conversion validation. No Postie calls, records, keys, secret storage or real messages made.
2. **Pixel discrepancy:** source config/deploy.yml:42 has 982007488091156; task/plan requests 982008488091156. Implemented requested value; confirm before publication.
3. Source noscript Meta beacon omitted during preview: static HTML cannot hostname-gate it without JS, so it would pollute no-JS localhost QA. Decide production-only artifact beacon after approval. JS tracking/events otherwise retained.
4. Parent configured GitHub Pages successfully on 2026-09-20: build type/source is GitHub Actions (`workflow`) and custom domain is `stickroof.com`. No DNS changes or deployments were made. HTTPS enforcement is not yet available, as expected before DNS cutover and certificate issuance. Keep deployment manual via `workflow_dispatch`; do not dispatch or add a `main` push trigger until separately approved after Phase 3. Public hosting, certificate and redirects remain unverified.
5. DNS was independently confirmed still pointing at the existing 13.236.107.254 origin on 2026-09-20. No DNS, Microsoft 365, AWS, source repo edits, leads export, decommission or archival actions were taken. Keep the existing site live; later phases require separate approval.
6. Parent/client visual review remains. Even source “Placeholder-friendly gallery” copy retained: no redesign or copy cleanup.
