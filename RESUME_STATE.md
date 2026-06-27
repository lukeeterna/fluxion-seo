# SEO page-template — build state (resume)

## What's built (in /tmp/seo-prod, NOT committed anywhere yet)
- Astro 5 project, zero client JS, self-hosted Inter woff2 (GDPR-safe).
- `src/data/locations.ts` — data-driven verticale×città (1 entry: parrucchieri×Bologna). Scale = add entries.
- `src/pages/[...slug].astro` — full page (hero pain, before/after quantified ~8h/sett, 6 feature, prezzo €497, FAQ 4Q, final CTA, footer GDPR).
- `src/layouts/Base.astro` — meta, canonical, OG, Twitter, preload font, JSON-LD injection.
- JSON-LD: Service + FAQPage + BreadcrumbList.
- WhatsApp CTA → wa.me/393314928901 con testo precompilato (encodeURIComponent).
- `public/og-default.png` 1200×630 branded (Chrome headless).
- `.github/workflows/deploy.yml` — ubuntu → astro build → wrangler pages deploy (project fluxion-seo).
- robots.txt, favicon.svg, sitemap via @astrojs/sitemap.

## Blocker confirmed
- Local build IMPOSSIBLE: esbuild built for macOS 12, MacBook = Big Sur 11 → `dyld: Symbol not found _SecTrustCopyCertificateChain`. Remote CI (ubuntu) is the only path. Lighthouse needs the live URL.

## Next steps (GATED on Luke yes/no — public act)
1. Create dedicated public GitHub repo, push /tmp/seo-prod.
2. Set repo secrets: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID (from ~/.claude/.env).
3. Push → Actions builds + `wrangler pages deploy` → live https://fluxion-seo.pages.dev/gestionale-parrucchieri-bologna/
4. Verify: 200 + render, Lighthouse 4 scores on live (iterate if Perf/SEO<90), WhatsApp href, JSON-LD valid.
5. Quality verdict + report in TextEdit.

## Deploy creds (present)
- ~/.claude/.env: CLOUDFLARE_API_TOKEN, CF_ACCOUNT_ID (22ddff3a4ef544511523a841b3dcadf8 per memory).
