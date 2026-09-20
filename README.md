# Traditional Stick Roof brochure site

Phase 1–2 only. **Enquiry sending disabled; not ready for public deployment.**

Node 22.12+ (tested 22.23.1), npm 10.9.8.

    npm ci
    npm run build
    npm test
    npm run preview
    npm run test:browser

Preview: http://127.0.0.1:4173. Browser tests use installed Google Chrome via Playwright. No real submissions.

Six complete prerendered HTML pages, no SPA fallback. Source Rails repo not required to build/test. See [migration status](doco/MIGRATION_STATUS.md).
