# STATE — fluxion-seo (pagina "Bologna guardalo funzionare")

> Fonte durevole di stato. Committato e pushato. **MAI /tmp** (cancellato al reboot — già persi sorgenti S384/S385).
> Ultimo aggiornamento: 2026-07-01 (T1c-A — re-seed screenshot agenda PIENA e credibile, 22 appuntamenti su Luglio 2026, founder ZERO). **Bologna §6 al 100% (netto #1).**

## Coordinate
- **Repo**: `git@github.com:lukeeterna/fluxion-seo.git` (clone durevole su `~/Documents/fluxion-seo`, SSD interno).
- **URL live**: https://fluxion-seo.pages.dev/gestionale-parrucchieri-bologna/
- **Build**: SOLO su CI (Cloudflare Pages, runner ubuntu). Astro NON builda su Big Sur (esbuild prebuilt richiede macOS 12). `astro build` locale è rotto by design — NON tentare. Loop = push → CI builda → verifica curl sul live.
- **Layer dati**: `src/data/locations.ts` (un'entry: Parrucchieri × Bologna). Template render: `src/pages/[...slug].astro`.

## Stato pagina Bologna
- Online, CI verde (commit `411be76`), sezione "Come funziona, in 3 passi" presente nel live (prosa autonoma, zero media).
- Copy #4 quantificato: rimosso "ridotti drasticamente", riusata la cifra reale `~8 ore a settimana` già presente (metric + caseBefore "circa un'ora ogni sera").

## Stato dei 4 buchi §6
| # | Buco | Stato |
|---|------|-------|
| 1 | Prova sociale / testimonianze | **BLOCCATO** fino al 1° cliente reale. Vietato fabbricare testimonianze/recensioni. |
| 2 | Screenshot agenda reale (Passo 2) | **CHIUSO + MIGLIORATO** (T1c-A re-seed, 2026-07-01, commit `540fa9d`, founder ZERO). Screenshot REALE del Calendario FLUXION su Windows con **agenda PIENA**: 22 appuntamenti FITTIZI su Luglio 2026 (3 operatori, 8 servizi, 15 clienti VARI), mese credibile con più giorni popolati + "+2 altri" su Mer 1. Crop pulito (no banner-licenza, no taskbar), `<img loading=lazy width=1200 height=502>`, 133604 B. Servito live 200. Prova sotto. |
| 3 | Audio reale Sara (Passo 3) | **CHIUSO** (T1b, commit `b0b4db7`, 2026-07-01): player `<audio controls preload="none">` con audio REALE generato da Sara viva (iMac `:3002` `/api/voice/say`), frase parrucchiere. File `public/audio/sara-sample.m4a` (AAC 22050Hz mono, 9.29s, 53030 B — sorgente WAV PCM16 16kHz da endpoint, transcodifica `afconvert` zero-install). Servito live 200. NB: player nel template condiviso `[...slug].astro` → appare su tutte le pagine (boilerplate, non uniqueness per-pagina). |
| 4 | Copy vago "ridotti drasticamente" | **CHIUSO** (T1a, commit `411be76`): quantificato a `~8 ore a settimana`, provato sul live. |

## Done-condition T1a (verificata sul live, grezzo)
- CI run `28474581325` = completed/success.
- `curl` live: "Come funziona, in 3 passi" PRESENTE · "8 ore" PRESENTE · "ridotti drasticamente" COUNT=0.

## Done-condition T1b FATTO B — audio Sara (verificata sul live, grezzo)
- Sara viva iMac: `curl localhost:3002/health` = 200 (dopo restart `python3 main.py --port 3002`; il 000 iniziale era pre-warm TTS, non crash).
- Endpoint verificato dal codice `main.py:560` say_handler: POST `/api/voice/say` body `{"text":...}` → `{"success":true,"audio_base64":<HEX>}` (campo mal-nominato: è hex, non base64).
- Audio generato REALE: `file` = WAV PCM16 mono 16kHz, 301312 B; transcodifica AAC/m4a 53030 B, 9.29s.
- CI run `28529080983` = completed/success (59s).
- `curl` live pagina Bologna: `<audio controls preload="none" src="/audio/sara-sample.m4a">` PRESENTE + `audio-label` PRESENTE.
- `curl` file: `audio_http=200 size=53030 type=audio/mp4`.

## T1b FATTO A — screenshot agenda: CHIUSO via bypass session-1 + DB seed (prova disco, 2026-07-01, founder ZERO)
Il blocco session-0 della sessione precedente è stato AGGIRATO con tecnica legittima. Due leve:
- **LEVA 1 — cattura in session-1**: `explorer`+`tauri-app` girano in `SessionId 1` (desktop interattivo attivo, `LogonUI` assente = sbloccato). Registrato uno **scheduled task interattivo** (`schtasks /Create ... /RU gianluca /IT`) che gira NELLA sessione utente → `[Graphics]::CopyFromScreen` funziona lì (il muro era solo la sessione-0 di OpenSSH). Test capture = 156941 B (non-nero) = bypass provato.
- **LEVA 2 — dati fittizi via seed**: DB app = `C:\Users\gianluca\AppData\Roaming\com.fluxion.desktop\fluxion.db`, era **VUOTO** (`clienti/servizi/operatori/appuntamenti = 0`, `encryption_migration_state = 0`). Backup verificato `fluxion.db.bak-preseed-t1b` (995328 B) PRIMA di scrivere (#1d). Seed di 1 operatore + 3 servizi + 3 clienti (plaintext) + 3 appuntamenti oggi, ID `seed-t1b-*`.
- **Nomi plaintext OK sull'agenda**: la lettura agenda `appuntamenti.rs:462` usa `decrypt_field(&s).unwrap_or(s)` = **fallback grazioso al plaintext** (diversamente da `clienti.rs:70` che erroro). Quindi i nomi in chiaro si vedono corretti nel Calendario.
- **Navigazione auto**: script `cap_nav.ps1` (P/Invoke `user32` SetCursorPos+mouse_event) clicca "Calendario" a (120,175) nella finestra in foreground → React Query refetch → 3 appuntamenti visibili → cattura. Interazione founder = **ZERO**.
- **Cleanup DB**: il restore via `Copy-Item` NON funzionava (app viva tiene il DB aperto in WAL, sidecar `-wal` non ripristinato → seed riappariva). CORRETTO con **DELETE mirato** `WHERE id LIKE 'seed-t1b-%'` + `wal_checkpoint(TRUNCATE)` → counts finali tutti 0, residual_seed 0. DB tornato allo stato vuoto iniziale.

## Done-condition T1b FATTO A — screenshot agenda (verificata sul live, grezzo)
- Screenshot reale 1366×768 → crop (rimosso titlebar+searchbar+banner-licenza+taskbar) → resize 1200×502, PNG 89285 B (`public/img/agenda-fluxion.png`).
- CI run `28531817108` = completed/success.
- `curl` live: `<img src="/img/agenda-fluxion.png" loading="lazy" width="1200" height="502" ...>` PRESENTE nel "Passo 2".
- `curl` file: `img_http=200 size=89285 type=image/png`.
- NB: il player audio (buco #3) e questo screenshot stanno nel template condiviso `[...slug].astro` → boilerplate su tutte le pagine, NON uniqueness per-città.

## Done-condition T1c-A — re-seed agenda PIENA (verificata sul live, grezzo, 2026-07-01)
- **Discordanza risolta**: il rendering NON è vista giorno/settimana ma **vista MESE** (`Calendario.tsx` `getMonthDays`, griglia 6×7, chip = ora + nome cliente, max 3 + "+N altri"). Seed distribuito sui feriali di Luglio 2026 per riempire il mese.
- **Discordanza cache**: primo capture mostrava dati STALE (seed T1b "Giulia Verdi" ecc.) perché l'app viva (pid T1b) serviva cache React Query e il click nav non forza refetch. RISOLTO con **cold-restart app in Session 1** (kill + relaunch via scheduled task) → lettura DB a freddo.
- **Seed** (prefix `seed-t1c-`, #1d): backup WAL-safe `fluxion.db.bak-t1c` (995328 B, Python `.backup()`) PRIMA di scrivere; pre-seed counts tutti 0. Inseriti 3 operatori (Laura Bianchi, Giulia Ferrari, Marco Conti) + 8 servizi (Taglio Donna €32 … Balayage €85) + 15 clienti italiani vari + 22 appuntamenti (09:00-16:00, durate 20-120 min, no overlap stesso operatore, orari UTC=locale-2h CEST).
- **RESTORE** (#1d, stessa sessione): `DELETE WHERE id LIKE 'seed-t1c-%'` (22+15+8+3) + `wal_checkpoint(TRUNCATE)` = (0,0,0) → counts finali tutti 0, residual_seed 0. Backup `.bak-t1c` rimosso dopo conferma. **DB tornato pulito.**
- **Immagine**: full 1366×768 → crop offset PIL (rimosso titlebar/search/banner-licenza/taskbar) → 1200×502, PNG optimize 133604 B. Dimensioni = template `<img>` esistente → nessuna modifica markup.
- CI run `28537619001` = completed/success.
- `curl` file: `img=200 size=133604` (≠ 89285 = nuova immagine servita).

## Guardrail Lighthouse — DA RI-MISURARE
- Metodo storico (Perf 91) NON riproducibile in questa sessione: `lighthouse` CLI assente su Big Sur, nessun metodo/config nel repo. Numeri NON fabbricati. Da ri-misurare con metodo documentato (idealmente su CI o ambiente macOS 12+).

## Regole operative
- Lavorare SOLO in repo pushato; artefatti durevoli in repo, **mai /tmp, mai T7**.
- Nessun media fabbricato, nessuna testimonianza, nessun numero inventato finché non c'è la fonte reale.

## T2 — Quality gate anti-doorway (uniqueness ratio) — OPERATIVO (2026-07-01)
- **Tool**: `tools/uniqueness_gate.py` — stdlib only (html.parser+re), gira su Big Sur/Python3, NO Astro build. Opera su HTML renderizzato (file locale o URL). Exit!=0 se ≥1 pagina < HARD_STOP → usabile come step CI bloccante.
- **Metrica**: 5-gram shingle sul TESTO VISIBILE (scarta script/style/svg/head/tag). uniqueness(pagina) = |shingle unici vs sorelle| / |shingle distinti|. I 3 asset template (screenshot agenda, audio Sara, "3 passi") sono testo/markup identico → contati NON-unici PER COSTRUZIONE (nel denominatore condiviso, non hardcoded).
- **Soglie**: HARD_STOP<0.30 (blocca), WARNING<0.50, PASS≥0.50.
- **PROVA rilevamento clone (done-condition HARD, grezzo)**:
  - Bologna live vs clone-solo-swap (`sed Bologna→Modena`) → **ratio 0.028, HARD_STOP, exit=1**. Solo 25/897 shingle differiscono (le finestre col nome città). Il gate FALLISCE il clone, onestamente.
  - Bologna vs Modena-genuina che localizza SOLO hero/case/metric (riusa features+faq+template) → **0.185, HARD_STOP, exit=1**.
  - Bologna vs Modena-piena (hero+case+metric+features+faq riscritti) → **0.505/0.527, PASS, exit=0**. Prova che il gate NON è always-FAIL: 0.50 raggiungibile solo con contenuto per-città genuino su TUTTI i blocchi.
- **VERDETTO BASELINE (onesto)**: coi campi per-città ATTUALI di locations.ts, una 2ª città che rifà solo hero/case/metric sta a ~0.18 → **sotto HARD_STOP**. Per superare 0.50 servono anche features+faq genuinamente locali, meglio ancora DATI locali reali. Il collo di bottiglia per scalare NON è il gate: è la MANCANZA di dati locali per-città.
- **CAMPI-DATO LOCALI da aggiungere a PageData (→ §4 profilatore)** per portare ogni pagina ≥0.50:
  - `nSaloniZona` (n. parrucchieri in città/quartiere) — FONTE: dato pubblico (Google Maps count / Camera Commercio) — da reperire.
  - `prezzoMedioLocale` (taglio/piega medio città) — FONTE: listini pubblici locali / survey — da reperire.
  - `quartieri[]` (zone reali citate: es. "Sacca", "centro") — FONTE: pubblico, gratis.
  - `casoLocale` (caso/testimonianza concreta locale) — FONTE: §4 profilatore FB/IG attività reali, OPPURE cliente reale (BLOCCATO fino al 1° cliente — vietato fabbricare).
  - `stagionalitaLocale` (eventi/picchi città) — FONTE: pubblico.
- **Integrazione CI**: `python3 tools/uniqueness_gate.py <url1> <url2> ...` come step; exit!=0 fa fallire la build → nessuna doorway page pubblicabile. Non ancora agganciato al workflow (da fare in fase scala).
