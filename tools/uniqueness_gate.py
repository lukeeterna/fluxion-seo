#!/usr/bin/env python3
"""uniqueness_gate.py — anti-doorway SEO quality gate for FLUXION city pages.

Google Scaled-Content-Abuse / SpamBrain penalizza le "doorway pages": pagine
per-citta identiche in cui cambia solo il nome della citta. Questo gate misura,
per ogni pagina, quanta parte del suo TESTO VISIBILE e' unica rispetto alle
pagine-sorelle, e blocca (exit != 0) chi sta sotto la soglia dura.

METRICA (dichiarata):
  - Si lavora sul TESTO VISIBILE renderizzato (ciò che legge un utente/Google):
    via HTMLParser si scartano <script> <style> <svg> <noscript> <template> e
    tutti i tag; restano solo i nodi di testo.
  - Robustezza contro i sinonimi banali: shingling a n-gram di parole
    (default 5-gram). Due frasi che differiscono solo per un sinonimo isolato
    condividono comunque quasi tutti gli altri 5-gram → non gonfiano l'unicità.
  - uniqueness(page) = |shingle unici| / |shingle totali distinti| della pagina,
    dove "unici" = shingle che NON compaiono in NESSUNA pagina-sorella del corpus.
  - I 3 asset a livello template (screenshot agenda, player audio, "3 passi")
    sono TESTO/markup IDENTICO su ogni pagina → i loro shingle finiscono nel set
    condiviso e vengono contati come NON-unici PER COSTRUZIONE (nel denominatore,
    fuori dal numeratore). Nessun trattamento speciale: e' una proprietà della
    metrica, non un'eccezione hardcoded.

SOGLIE (fonti convergenti; Google non pubblica un numero ufficiale):
  HARD_STOP < 0.30  → doorway/clone: blocca (exit 1)
  WARNING   < 0.50  → troppo vicino al boilerplate: pubblicabile ma da arricchire
  PASS     >= 0.50  → differenziazione locale sufficiente

USO:
  uniqueness_gate.py <page1> <page2> [page3 ...]
  Ogni argomento e' un file HTML locale o un URL http(s).
  Servono >= 2 pagine: l'unicità e' relativa alle sorelle.

Big Sur / Python 3 stdlib only (nessuna dipendenza).
"""
import sys
import re
import html as htmllib
from html.parser import HTMLParser

HARD_STOP = 0.30
WARNING = 0.50
NGRAM = 5

SKIP_TAGS = {"script", "style", "noscript", "svg", "template", "head"}


class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.chunks = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in SKIP_TAGS:
            self.skip += 1

    def handle_startendtag(self, tag, attrs):
        pass  # void tags: no text

    def handle_endtag(self, tag):
        if tag in SKIP_TAGS and self.skip:
            self.skip -= 1

    def handle_data(self, data):
        if self.skip == 0:
            t = data.strip()
            if t:
                self.chunks.append(t)


def visible_text(raw):
    p = VisibleText()
    p.feed(raw)
    return " ".join(p.chunks)


def tokens(text):
    text = htmllib.unescape(text).lower()
    # parole latine (incl. accentate) e cifre; scarta punteggiatura
    return re.findall(r"[0-9a-zà-öø-ÿ]+", text)


def shingles(toks, n=NGRAM):
    if len(toks) < n:
        return {" ".join(toks)} if toks else set()
    return {" ".join(toks[i:i + n]) for i in range(len(toks) - n + 1)}


def load(src):
    if src.startswith("http://") or src.startswith("https://"):
        import urllib.request
        req = urllib.request.Request(src, headers={"User-Agent": "fluxion-uniqueness-gate"})
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.read().decode("utf-8", "replace")
    with open(src, encoding="utf-8", errors="replace") as f:
        return f.read()


def verdict_for(ratio):
    if ratio >= WARNING:
        return "PASS"
    if ratio >= HARD_STOP:
        return "WARNING"
    return "HARD_STOP"


def main(argv):
    if len(argv) < 1:
        sys.stderr.write("usage: uniqueness_gate.py <page1> <page2> [page3 ...]\n")
        return 2
    if len(argv) < 2:
        sys.stderr.write(
            "ERRORE: servono >= 2 pagine — l'unicità e' relativa alle sorelle.\n"
            "        Con una sola pagina reale non esiste un corpus di confronto.\n"
        )
        return 2

    pages = []
    for src in argv:
        raw = load(src)
        toks = tokens(visible_text(raw))
        pages.append((src, toks, shingles(toks)))

    print(f"# uniqueness gate — {NGRAM}-gram su testo visibile "
          f"| HARD_STOP<{HARD_STOP:.2f}  WARNING<{WARNING:.2f}  PASS>={WARNING:.2f}")
    fail = False
    for i, (src, toks, sh) in enumerate(pages):
        others = set()
        for j, (_, _, sh2) in enumerate(pages):
            if j != i:
                others |= sh2
        total = len(sh)
        unique = len(sh - others)
        ratio = (unique / total) if total else 0.0
        v = verdict_for(ratio)
        if ratio < HARD_STOP:
            fail = True
        print(f"{v:9} ratio={ratio:.3f}  tokens={len(toks):5d}  "
              f"shingles={total:5d}  unici={unique:5d}  :: {src}")

    print("# verdetto:", "FAIL (>=1 pagina sotto HARD_STOP)" if fail else "OK (tutte >= HARD_STOP)")
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
