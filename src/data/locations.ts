// Data-driven SEO pages: verticale × città.
// One real entry now (Parrucchieri × Bologna). Add entries to scale —
// the [...slug].astro template renders any entry shaped like PageData.

export interface Feature {
  icon: 'calendar' | 'bell' | 'phone' | 'whatsapp' | 'card' | 'chart';
  title: string;
  body: string;
}
export interface Faq {
  q: string;
  a: string;
}
export interface PageData {
  slug: string;            // url segment, no slashes
  verticale: string;       // machine key
  verticaleLabel: string;  // "Parrucchieri"
  professioneSingolare: string; // "parrucchiere"
  citta: string;           // "Bologna"
  title: string;           // <title>
  description: string;     // meta description
  heroH1: string;
  heroLead: string;
  caseBefore: string;
  caseAfter: string;
  metricNum: string;
  metricLabel: string;
  features: Feature[];
  faq: Faq[];
}

const WA_TEXT_BOLOGNA =
  'Ciao, ho visto la pagina su FLUXION per parrucchieri, vorrei una demo';

export const WHATSAPP_NUMBER = '393314928901';

export function waHref(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const pages: PageData[] = [
  {
    slug: 'gestionale-parrucchieri-bologna',
    verticale: 'parrucchiere',
    verticaleLabel: 'Parrucchieri',
    professioneSingolare: 'parrucchiere',
    citta: 'Bologna',
    title: 'Gestionale per Parrucchieri a Bologna | Agenda, Promemoria, Sara — FLUXION',
    description:
      'Il gestionale pensato per i parrucchieri di Bologna: agenda online, promemoria WhatsApp automatici e Sara che risponde al telefono. €497 una tantum, nessun abbonamento.',
    heroH1: 'Il gestionale per parrucchieri a Bologna che lavora anche quando hai le mani occupate',
    heroLead:
      'Gestisci ancora appuntamenti tra quaderno e telefono che squilla mentre hai le mani nei capelli? FLUXION mette agenda, promemoria automatici e una receptionist vocale in un\u2019unica app desktop. Niente abbonamenti.',
    caseBefore:
      'Un salone con 3 postazioni in centro a Bologna passava ogni sera circa un\u2019ora a chiamare i clienti del giorno dopo per confermare. Telefono che squilla durante il servizio, appunti persi, due clienti prenotati sullo stesso slot.',
    caseAfter:
      'Con i promemoria WhatsApp automatici e l\u2019agenda condivisa tra le postazioni, le conferme partono da sole la sera prima. Le telefonate a vuoto sono sparite e i mancati appuntamenti si sono ridotti drasticamente.',
    metricNum: '~8 ore',
    metricLabel:
      'a settimana recuperate eliminando le chiamate di conferma manuali \u2014 tempo che torna sulla sedia, non al telefono.',
    features: [
      {
        icon: 'calendar',
        title: 'Agenda online sempre aggiornata',
        body: 'Tutte le postazioni vedono lo stesso calendario in tempo reale. Niente doppie prenotazioni, niente quaderno da decifrare. Sposti un appuntamento in due tocchi.',
      },
      {
        icon: 'bell',
        title: 'Promemoria WhatsApp automatici',
        body: 'Il messaggio di conferma e il promemoria partono da soli il giorno prima. Il cliente conferma con un tap e tu riduci i buchi in agenda senza alzare il telefono.',
      },
      {
        icon: 'phone',
        title: 'Sara risponde quando tu non puoi',
        body: 'La receptionist vocale AI prende le chiamate mentre lavori: propone gli slot liberi, fissa l\u2019appuntamento e te lo scrive in agenda. 24 ore su 24, anche a salone chiuso.',
      },
      {
        icon: 'card',
        title: 'Schede cliente e storico servizi',
        body: 'Colore, formula, ultimo taglio, preferenze: tutto sulla scheda del cliente. Ogni collaboratore sa cosa fare anche se è il primo a riceverlo.',
      },
      {
        icon: 'chart',
        title: 'Incassi e pacchetti sotto controllo',
        body: 'Cassa giornaliera, pacchetti prepagati e clienti fedeli in un colpo d\u2019occhio. Sai cosa rende davvero senza aprire un foglio Excel.',
      },
      {
        icon: 'whatsapp',
        title: 'Funziona anche offline',
        body: 'Agenda, clienti e cassa girano sul tuo computer, senza dipendere dalla connessione. I tuoi dati restano tuoi, sul tuo dispositivo.',
      },
    ],
    faq: [
      {
        q: 'Devo pagare ogni mese come gli altri gestionali?',
        a: 'No. FLUXION costa 497\u20ac una sola volta e resta tuo per sempre. Nessun abbonamento mensile, nessun costo a sorpresa: paghi una volta e lo usi finché vuoi.',
      },
      {
        q: 'I miei clienti devono scaricare un\u2019app per prenotare?',
        a: 'No. I promemoria e le conferme arrivano via WhatsApp, l\u2019app che già usano tutti i giorni. Nessuna installazione lato cliente, nessuna password da ricordare.',
      },
      {
        q: 'Cos\u2019è Sara e come risponde al telefono?',
        a: 'Sara è la receptionist vocale AI di FLUXION: risponde alle chiamate quando sei occupato, propone gli orari liberi del tuo salone e fissa l\u2019appuntamento, scrivendolo subito in agenda. Lavora anche fuori orario, così non perdi prenotazioni la sera o di domenica.',
      },
      {
        q: 'Funziona sul computer che ho già in salone?',
        a: 'Sì. FLUXION è un\u2019app desktop per Windows 10+ e macOS 12+, con 8 GB di RAM. Agenda, clienti e cassa funzionano anche senza internet; serve la connessione solo per i messaggi WhatsApp e per Sara.',
      },
    ],
  },
];

export function getPage(slug: string): PageData | undefined {
  return pages.find((p) => p.slug === slug);
}
