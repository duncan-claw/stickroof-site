# Traditional Stick Roof brochure site

Prerendered React/Vite brochure site served via GitHub Pages. Contact form is wired to
Postie (`https://postie.duncanclaw.ai/submissions`).

Node 22.12+ (tested 22.23.1), npm 10.9.8.

    npm ci
    npm run build
    npm test
    npm run preview
    npm run test:browser

Preview: http://127.0.0.1:4173. Browser tests use installed Google Chrome via Playwright.

## Contact form → Postie

- Key comes from the build env `VITE_POSTIE_API_KEY` (production: GitHub Actions secret).
- **Production builds fail** if the key is missing (`STICKROOF_PRODUCTION=1`).
- Local/preview builds leave the key unset and keep the form visibly disabled.
- Copy `.env.example` to `.env.local` (gitignored) to key-enable a local build.
- Submission sends `name`, `email`, folded `message` (phone/suburb/service/details/
  consent/source page), hidden `nickname` honeypot, `X-Api-Key` header, 15s timeout.
- Accepted only on HTTP success **and** `ok: true`; then `sessionStorage` flag →
  `/thanks` → single Google Ads + Meta Lead conversion. Direct `/thanks` never fires.
- No-JS visitors see a phone fallback; fields are never leaked via GET.

## Environment

- `.env.local` / `.env.local` — gitignored, holds the real Postie key locally.
- `.env.example` — committed template with an empty key.

## Tests

- `npm test` — static HTML/SEO/form/tracking assertions plus mocked Postie
  submission behaviour (success, HTTP failure, ok:false, network, timeout,
  double-submit, validation, optional email, honeypot). No real emails.
- `npm run test:browser` — Playwright desktop/mobile + no-JS smoke.

See [migration status](doco/MIGRATION_STATUS.md).