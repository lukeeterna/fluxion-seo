# FLUXION SEO — pagina-template "Gestionale Parrucchieri a Bologna"

## ✅ LIVE + verificato alla fonte (runtime, non "il README dice")
- **URL live**: https://fluxion-seo.pages.dev/gestionale-parrucchieri-bologna/ → **HTTP 200**
- **Repo**: https://github.com/lukeeterna/fluxion-seo (CI ubuntu → astro build → wrangler pages deploy: **success**)
- Build locale IMPOSSIBILE su Big Sur (esbuild `Symbol not found _SecTrustCopyCertificateChain`, built per macOS 12) → confermato: il path remoto CI è l'unico. Premessa verificata empiricamente.

## Lighthouse REALE sul live (mobile, throttling 4x)
| Categoria | Score |
|---|---|
| Performance | **91** |
| Accessibility | **95** |
| Best Practices | **100** |
| SEO | **100** |

Core Web Vitals (lab): LCP **1.3s** (verde) · CLS **0.01** (verde) · FCP 1.3s · TBT 380ms · SI 1.5s.
Gate task ("<90 su Performance o SEO → itera") **superato** (91 e 100). Headroom su Performance = TBT 380ms.

## Prove richieste
- **WhatsApp reale**: `https://wa.me/393314928901?text=Ciao%2C%20ho%20visto%20la%20pagina%20su%20FLUXION%20per%20parrucchieri%20a%20Bologna%2C%20vorrei%20una%20demo` ✓ (numero +39 331 492 8901, testo precompilato, rel=nofollow)
- **JSON-LD** presente e ben formato: `Service` (+ Offer €497 EUR, areaServed City Bologna) · `FAQPage` (4 Q/A) · `BreadcrumbList`. Parsato OK.
- **SEO tecnico**: title+meta ottimizzati "gestionale parrucchieri Bologna", canonical, OG+Twitter, og-default.png 1200×630 (200 image/png), sitemap-index.xml (200), robots.txt, lang=it.
- **Zero JS runtime** (Astro static, no idratazione). Inter self-hosted (GDPR, no Google Fonts CDN).

## Contenuto (anti-thin)
Hero col pain reale ("mani occupate / telefono che squilla"), caso prima/dopo quantificato (**~8 ore/sett** recuperate), 6 feature specifiche al verticale, prezzo trasparente €497 una tantum, 4 FAQ vere → schema FAQ. Paragrafi ≤120 parole (AI Overviews 2026).

## Verdetto critico CC (4 assi) — vedi messaggio chat
1. Performance 91 (passa, non eccelle: TBT 380ms la leva).
2. Contenuto legittimo MA il caso è un esempio non-nominato + città intrecciata leggera → rischio doorway **alla scala** se si moltiplica solo cambiando il nome città.
3. Design intenzionale (design system 8px, token, Inter, brand emerald, mobile-first, focus-visible) — A11y 95.
4. Conversione legale OK (PMI-initiated, low-friction).

## Scala verticale×città
Template **regge tecnicamente** (data-driven `[...slug].astro` + `locations.ts`, basta aggiungere entry).
Ma la **qualità alla scala richiede contenuto variato per pagina** (angolo locale reale, casi diversi), non solo swap del nome città → è qui che entra il profilatore. Vedi messaggio.

## Prossimo passo (gated su review contenuto di Luke)
Se il contenuto è giudicato di valore → aggancio a **fluxion-app.com/gestionale-parrucchieri-bologna/** (subpath, eredita autorità dominio) → poi moltiplicazione zone×verticali col profilatore.
