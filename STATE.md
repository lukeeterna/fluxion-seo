# STATE — fluxion-seo (pagina "Bologna guardalo funzionare")

> Fonte durevole di stato. Committato e pushato. **MAI /tmp** (cancellato al reboot — già persi sorgenti S384/S385).
> Ultimo aggiornamento: 2026-06-30 (T1a).

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
| 2 | Screenshot agenda reale (Passo 2) | **PENDING T1b**. Ora solo prosa nel "Passo 2". Nessun placeholder/immagine finta. |
| 3 | Audio reale Sara (Passo 3) | **PENDING T1b**. Ora solo prosa nel "Passo 3". Nessun player finto. |
| 4 | Copy vago "ridotti drasticamente" | **CHIUSO** (T1a, commit `411be76`): quantificato a `~8 ore a settimana`, provato sul live. |

## Done-condition T1a (verificata sul live, grezzo)
- CI run `28474581325` = completed/success.
- `curl` live: "Come funziona, in 3 passi" PRESENTE · "8 ore" PRESENTE · "ridotti drasticamente" COUNT=0.

## Guardrail Lighthouse — DA RI-MISURARE
- Metodo storico (Perf 91) NON riproducibile in questa sessione: `lighthouse` CLI assente su Big Sur, nessun metodo/config nel repo. Numeri NON fabbricati. Da ri-misurare con metodo documentato (idealmente su CI o ambiente macOS 12+).

## Regole operative
- Lavorare SOLO in repo pushato; artefatti durevoli in repo, **mai /tmp, mai T7**.
- Nessun media fabbricato, nessuna testimonianza, nessun numero inventato finché non c'è la fonte reale.
