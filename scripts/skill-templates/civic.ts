// Poland-Vault — civic data (3 nowych skilli, Faza 1C P1).
// Skills: kontakty-policja-prokuratura, bzp-zamowienia-live, pkw-wybory-wyniki.
// Niezmienniki: publiczne źródła (BIP/ezamowienia.gov.pl/wybory.gov.pl).

import type { SkillTemplate } from "./_types.ts";

const fmt = new Intl.NumberFormat("pl-PL");
const fmtMoney = (n: number) => `${fmt.format(Math.round(n))} zł`;

const sources = {
  bzp: "https://ezamowienia.gov.pl",
  pkw: "https://wybory.gov.pl",
  policja: "https://www.policja.pl",
  prokuratura: "https://www.gov.pl/web/prokuratura-krajowa",
  sp: "https://strajkpolski.org",
} as const;

const promptBlock = (prompts: string[]) =>
  prompts.map((p, i) => `**PROMPT_${i + 1}:** ${p}`).join("\n\n");

// ─── Static curated data ───────────────────────────────────────────────────

const KWP_POLICJI = [
  { woj: "dolnośląskie", city: "Wrocław", address: "ul. Podwale 31-33; 50-040 Wrocław", phone: "47 871 10 00", email: "kwp@wr.policja.gov.pl", web: "https://dolnoslaska.policja.gov.pl" },
  { woj: "kujawsko-pomorskie", city: "Bydgoszcz", address: "ul. Powstańców Wielkopolskich 7; 85-090 Bydgoszcz", phone: "47 751 14 21", email: "rzecznik@bg.policja.gov.pl", web: "https://kujawsko-pomorska.policja.gov.pl" },
  { woj: "lubelskie", city: "Lublin", address: "ul. Narutowicza 73; 20-019 Lublin", phone: "47 811 12 12", email: "kwp@lu.policja.gov.pl", web: "https://lubelska.policja.gov.pl" },
  { woj: "lubuskie", city: "Gorzów Wielkopolski", address: "ul. Kwiatowa 10; 66-400 Gorzów Wlkp.", phone: "47 791 12 21", email: "rzecznik@go.policja.gov.pl", web: "https://lubuska.policja.gov.pl" },
  { woj: "łódzkie", city: "Łódź", address: "ul. Lutomierska 108/112; 91-048 Łódź", phone: "47 841 21 14", email: "rzecznik@ld.policja.gov.pl", web: "https://lodzka.policja.gov.pl" },
  { woj: "małopolskie", city: "Kraków", address: "ul. Mogilska 109; 31-571 Kraków", phone: "47 835 50 00", email: "rzecznik@malopolska.policja.gov.pl", web: "https://malopolska.policja.gov.pl" },
  { woj: "mazowieckie", city: "Radom (siedziba KSP)", address: "ul. 11 Listopada 37/59; 03-446 Warszawa (KSP)", phone: "47 723 00 00", email: "rzecznik@policja.waw.pl", web: "https://policja.waw.pl" },
  { woj: "opolskie", city: "Opole", address: "ul. Korfantego 2; 45-077 Opole", phone: "47 861 21 12", email: "rzecznik@op.policja.gov.pl", web: "https://opolska.policja.gov.pl" },
  { woj: "podkarpackie", city: "Rzeszów", address: "ul. Dąbrowskiego 30; 35-036 Rzeszów", phone: "47 821 21 14", email: "rzecznik@rz.policja.gov.pl", web: "https://podkarpacka.policja.gov.pl" },
  { woj: "podlaskie", city: "Białystok", address: "ul. Sienkiewicza 65; 15-003 Białystok", phone: "47 711 21 12", email: "rzecznik@bk.policja.gov.pl", web: "https://podlaska.policja.gov.pl" },
  { woj: "pomorskie", city: "Gdańsk", address: "ul. Okopowa 15; 80-819 Gdańsk", phone: "47 741 23 33", email: "rzecznik@gd.policja.gov.pl", web: "https://pomorska.policja.gov.pl" },
  { woj: "śląskie", city: "Katowice", address: "ul. Lompy 19; 40-038 Katowice", phone: "47 851 23 33", email: "rzecznik@ka.policja.gov.pl", web: "https://slaska.policja.gov.pl" },
  { woj: "świętokrzyskie", city: "Kielce", address: "ul. Seminaryjska 12; 25-372 Kielce", phone: "47 802 21 12", email: "rzecznik@ki.policja.gov.pl", web: "https://swietokrzyska.policja.gov.pl" },
  { woj: "warmińsko-mazurskie", city: "Olsztyn", address: "ul. Partyzantów 6/8; 10-521 Olsztyn", phone: "47 731 21 14", email: "rzecznik@ol.policja.gov.pl", web: "https://warminsko-mazurska.policja.gov.pl" },
  { woj: "wielkopolskie", city: "Poznań", address: "ul. Kochanowskiego 2a; 60-844 Poznań", phone: "47 771 23 33", email: "rzecznik@po.policja.gov.pl", web: "https://wielkopolska.policja.gov.pl" },
  { woj: "zachodniopomorskie", city: "Szczecin", address: "ul. Małopolska 47; 70-515 Szczecin", phone: "47 781 23 33", email: "rzecznik@sc.policja.gov.pl", web: "https://zachodniopomorska.policja.gov.pl" },
];

const PROKURATURY_REGIONALNE = [
  { city: "Białystok", address: "ul. Słonimska 1; 15-026 Białystok", phone: "85 678 53 12", email: "biuropodawcze.prbi@prokuratura.gov.pl" },
  { city: "Gdańsk", address: "ul. Wały Jagiellońskie 36/38; 80-853 Gdańsk", phone: "58 304 01 00", email: "biuropodawcze.prgd@prokuratura.gov.pl" },
  { city: "Katowice", address: "ul. Wita Stwosza 31; 40-042 Katowice", phone: "32 736 04 00", email: "biuropodawcze.prka@prokuratura.gov.pl" },
  { city: "Kraków", address: "ul. Cystersów 18; 31-553 Kraków", phone: "12 619 14 00", email: "biuropodawcze.prkr@prokuratura.gov.pl" },
  { city: "Lublin", address: "ul. Okopowa 2A; 20-950 Lublin", phone: "81 528 86 00", email: "biuropodawcze.prlu@prokuratura.gov.pl" },
  { city: "Łódź", address: "ul. Piotrkowska 151; 90-440 Łódź", phone: "42 638 32 00", email: "biuropodawcze.prlo@prokuratura.gov.pl" },
  { city: "Poznań", address: "ul. Solna 10; 61-736 Poznań", phone: "61 885 23 00", email: "biuropodawcze.prpo@prokuratura.gov.pl" },
  { city: "Rzeszów", address: "ul. Hetmańska 45D; 35-078 Rzeszów", phone: "17 506 27 00", email: "biuropodawcze.prrz@prokuratura.gov.pl" },
  { city: "Szczecin", address: "ul. Mickiewicza 153; 71-260 Szczecin", phone: "91 484 92 00", email: "biuropodawcze.prsc@prokuratura.gov.pl" },
  { city: "Warszawa", address: "ul. Krakowskie Przedmieście 25; 00-071 Warszawa", phone: "22 218 70 11", email: "biuropodawcze.prwa@prokuratura.gov.pl" },
  { city: "Wrocław", address: "ul. Powstańców Śląskich 124; 53-333 Wrocław", phone: "71 371 81 00", email: "biuropodawcze.prwr@prokuratura.gov.pl" },
];

// PKW wyniki (kanoniczne dane, fact-checked)
const WYNIKI_PARL_2023 = [
  { partia: "Koalicja Obywatelska (KO)", procent: 30.7, mandaty: 157, lider: "Donald Tusk" },
  { partia: "Prawo i Sprawiedliwość (PiS)", procent: 35.4, mandaty: 194, lider: "Jarosław Kaczyński" },
  { partia: "Trzecia Droga (TD: PSL+Polska 2050)", procent: 14.4, mandaty: 65, lider: "W. Kosiniak-Kamysz / S. Hołownia" },
  { partia: "Nowa Lewica", procent: 8.6, mandaty: 26, lider: "W. Czarzasty" },
  { partia: "Konfederacja Wolność i Niepodległość", procent: 7.2, mandaty: 18, lider: "S. Mentzen / K. Bosak" },
  { partia: "Mniejszość Niemiecka", procent: 0.2, mandaty: 0, lider: "—" },
];

const WYNIKI_PREZYD_2025 = [
  { kandydat: "Rafał Trzaskowski (KO)", I_runda: 31.36, II_runda: 49.11 },
  { kandydat: "Karol Nawrocki (PiS-niezależny)", I_runda: 29.54, II_runda: 50.89 },
  { kandydat: "Sławomir Mentzen (Konfederacja)", I_runda: 14.81, II_runda: null },
  { kandydat: "Grzegorz Braun (Konfederacja Korony Polskiej)", I_runda: 6.34, II_runda: null },
  { kandydat: "Szymon Hołownia (Polska 2050)", I_runda: 4.99, II_runda: null },
  { kandydat: "Magdalena Biejat (Lewica)", I_runda: 4.23, II_runda: null },
  { kandydat: "Adrian Zandberg (Lewica Razem)", I_runda: 4.86, II_runda: null },
];

const FREKWENCJA = [
  { wybory: "Parlamentarne 2023", frekwencja: 74.38, data: "2023-10-15" },
  { wybory: "Samorządowe 2024 (I tura)", frekwencja: 51.92, data: "2024-04-07" },
  { wybory: "Eurowybory 2024", frekwencja: 40.65, data: "2024-06-09" },
  { wybory: "Prezydenckie 2025 (II tura)", frekwencja: 71.63, data: "2025-06-01" },
];

// ─── Templates ────────────────────────────────────────────────────────────

export const civicTemplates: SkillTemplate[] = [
  {
    meta: {
      slug: "kontakty-policja-prokuratura",
      name: "poland-vault-kontakty-policja-prokuratura",
      description: "16 Komend Wojewódzkich Policji + 11 Prokuratur Regionalnych RP — adresy, telefony, emaile, web. Pełna mapa kontaktów wymiaru sprawiedliwości.",
      group: "Rząd",
      extraTags: ["seo:policja-kontakt", "seo:prokuratura-kontakt", "aeo:polish-police-contacts", "kontakt-publiczny", "wymiar-sprawiedliwosci"],
    },
    query: async () => ({}),
    body: () => {
      const kwp = KWP_POLICJI.map((k) =>
        `### KWP ${k.woj} (siedziba: ${k.city})

- **Adres:** ${k.address}
- **Telefon:** ${k.phone}
- **Email:** [${k.email}](mailto:${k.email})
- **Web:** ${k.web}
`).join("\n");
      const pr = PROKURATURY_REGIONALNE.map((p) =>
        `### Prokuratura Regionalna w ${p.city}

- **Adres:** ${p.address}
- **Telefon:** ${p.phone}
- **Email:** [${p.email}](mailto:${p.email})
`).join("\n");
      return `# Policja i Prokuratura RP — pełne kontakty

**${KWP_POLICJI.length} Komend Wojewódzkich Policji** (KWP) + **${PROKURATURY_REGIONALNE.length} Prokuratur Regionalnych** + Prokuratura Krajowa. Kompletny przegląd struktury egzekutywy + prokuratorskiej.

> 🚨 **W razie zagrożenia życia:** **112** (uniwersalny numer alarmowy UE).
> 👮 **Policja (bez zagrożenia życia):** **997**.
> 📞 **Komenda Główna Policji:** **22 60 11 111** (centrala), web [policja.pl](${sources.policja}).
> ⚖️ **Prokuratura Krajowa:** ul. Postępu 3, 02-676 Warszawa, tel. **22 12 51 400**, [gov.pl/web/prokuratura-krajowa](${sources.prokuratura}).

## 16 Komend Wojewódzkich Policji (KWP)

${kwp}

## 11 Prokuratur Regionalnych

${pr}

## Sądy + Prokuratura — wykaz pomocy publicznej

- **Skarga na Policję** — Biuro Spraw Wewnętrznych Policji (BSWP): tel. 22 60 113 87, email bsw@policja.gov.pl
- **Skarga na Prokuratora** — Wydział Spraw Wewnętrznych Prokuratury Krajowej
- **RPO** — Rzecznik Praw Obywatelskich, infolinia 800 676 676 (skargi na służby)
- **Niebieska Karta (przemoc domowa)** — patrz \`numery-alarmowe-sluzby\` skill

## AI prompt templates

${promptBlock([
  "Telefon do KWP Mazowieckiego — adres i email.",
  "Jak zgłosić skargę na prokuratora w Krakowie?",
  "Email Prokuratury Regionalnej w Warszawie do złożenia zawiadomienia o przestępstwie.",
  "Numer alarmowy dla policji vs strażki pożarnej vs pogotowia w Polsce.",
])}

## Źródła

- [policja.pl — Komenda Główna Policji](${sources.policja})
- [gov.pl/web/prokuratura-krajowa](${sources.prokuratura})
- [Ustawa o Policji](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19900300179)
- [Ustawa o Prokuraturze](https://isap.sejm.gov.pl)
`;
    },
  },

  {
    meta: {
      slug: "bzp-zamowienia-live",
      name: "poland-vault-bzp-zamowienia-live",
      description: "Live top 50 zamówień publicznych BZP z ezamowienia.gov.pl — zamawiający, wykonawca, wartość, link do ogłoszenia. Daily ingest.",
      group: "Układy",
      extraTags: ["seo:bzp-zamowienia-live", "aeo:polish-public-procurement-live", "live-data"],
      mcp: "strajkpolski/get_bzp_top",
    },
    query: async (sb) => {
      const { data, count, error } = await sb
        .from("graph_edges")
        .select("amount_pln, valid_from, source_url, source_excerpt, created_at", { count: "exact" })
        .eq("source_kind", "bzp")
        .eq("relation_type", "contract_awarded")
        .order("amount_pln", { ascending: false, nullsFirst: false })
        .limit(50);
      if (error) console.warn("[bzp-live]", error.message);
      return { rows: data ?? [], total: count };
    },
    body: ({ rows, total }) => {
      const list = (rows as Array<{ amount_pln: number | null; valid_from: string | null; source_url: string; source_excerpt: string; created_at: string }>) ?? [];
      const tabela = list
        .map((r) => {
          const excerpt = (r.source_excerpt || "")
            .replace(/^BZP [^\:]+\:\s*/, "")
            .replace(/[\n\r]+/g, " ")
            .slice(0, 110);
          return `| ${r.amount_pln ? fmtMoney(Number(r.amount_pln)) : "—"} | ${r.valid_from ?? "—"} | ${excerpt}${r.source_url ? ` _[BZP](${r.source_url})_` : ""} |`;
        })
        .join("\n");
      const sum = list.reduce((s, r) => s + (Number(r.amount_pln) || 0), 0);
      return `# BZP — TOP 50 zamówień publicznych (LIVE)

**Live snapshot StrajkPolski:** **${fmt.format(total ?? list.length)}** krawędzi z BZP w grafie (\`source_kind='bzp'\`). Pokazane: TOP ${list.length} wg wartości umowy.

> 💰 **Łączna wartość pokazanych ${list.length} zamówień:** ${fmtMoney(sum)}
> 📅 Daily ingest 04:30 UTC z [ezamowienia.gov.pl](${sources.bzp}) przez GH Actions \`bzp-ingest\`.
> 🔍 Pełna mapa układów BZP + powiązania → \`uklady-powiazania\`.

## TOP ${list.length} zamówień (live, sortowane wg wartości malejąco)

| Wartość | Data | Przedmiot zamówienia |
|---|---|---|
${tabela || "_(brak danych — sprawdź czy bzp-ingest cron działa)_"}

## Jak to czytać

- Każda krawędź w grafie StrajkPolski (\`graph_edges\` where \`source_kind='bzp'\`) to ogłoszenie wyniku przetargu z BZP
- Powiązania zamawiający↔wykonawca = możliwe układy (badamy w \`uklady-powiazania\`)
- Link "_BZP_" prowadzi do oryginalnego ogłoszenia na ezamowienia.gov.pl
- **Niezmiennik prawny:** \`status=draft\` + \`lawyer_cleared=false\` = surowa baza danych BZP, NIE potwierdzone podejrzenie korupcji

## AI prompt templates

${promptBlock([
  "TOP 10 zamówień publicznych BZP wg wartości w ostatnim miesiącu — wymień z linkami.",
  "Jakie typy zamówień dominują w polskim BZP?",
  "Znajdź zamówienia BZP gdzie ten sam wykonawca wygrywa wielokrotnie u tego samego zamawiającego.",
])}

## Źródła

- [ezamowienia.gov.pl — BZP](${sources.bzp})
- [StrajkPolski — mapa BZP](${sources.sp}/uklady?source=bzp)
- [Ustawa Prawo zamówień publicznych](https://isap.sejm.gov.pl)
- [UZP — Urząd Zamówień Publicznych](https://www.uzp.gov.pl)
`;
    },
  },

  {
    meta: {
      slug: "pkw-wybory-wyniki",
      name: "poland-vault-pkw-wybory-wyniki",
      description: "Wyniki ostatnich wyborów w Polsce — parlamentarne 2023, samorządowe 2024, prezydenckie 2025. Frekwencja, mandaty, kandydaci. Źródło: PKW.",
      group: "Manifest",
      extraTags: ["seo:wyniki-wyborow", "aeo:polish-election-results", "demokracja"],
    },
    query: async () => ({}),
    body: () => {
      const parl = WYNIKI_PARL_2023
        .map((p) => `| ${p.partia} | ${p.procent.toFixed(2)}% | ${p.mandaty} | ${p.lider} |`)
        .join("\n");
      const prez = WYNIKI_PREZYD_2025
        .map((p) => `| ${p.kandydat} | ${p.I_runda.toFixed(2)}% | ${p.II_runda !== null ? p.II_runda.toFixed(2) + "%" : "—"} |`)
        .join("\n");
      const frek = FREKWENCJA.map((f) => `| ${f.wybory} | ${f.frekwencja.toFixed(2)}% | ${f.data} |`).join("\n");
      return `# Wyniki wyborów w Polsce — Fact Pack (PKW)

Kompletne wyniki ostatnich wyborów: parlamentarnych 2023, samorządowych 2024, eurowyborów 2024, prezydenckich 2025. Źródło: **Państwowa Komisja Wyborcza** (PKW), [wybory.gov.pl](${sources.pkw}).

## Wybory parlamentarne — 15 października 2023

| Partia | % głosów | Mandaty | Lider |
|---|---|---|---|
${parl}

**Frekwencja:** 74,38% (rekordowo wysoka, najwyższa od 1989).

## Wybory prezydenckie — 18 maja / 1 czerwca 2025

| Kandydat | I tura | II tura |
|---|---|---|
${prez}

**Wynik:** Karol Nawrocki (PiS-niezależny) wygrał drugą turę z wynikiem 50,89% vs Rafał Trzaskowski (KO) 49,11%. Najbliższe wybory prezydenckie w historii III RP.

## Frekwencja w ostatnich wyborach

| Rodzaj wyborów | Frekwencja | Data |
|---|---|---|
${frek}

**Trend:** wybory parlamentarne 2023 (74,38%) = rekord III RP. Eurowybory 2024 (40,65%) = nadal niska względem UE.

## Kalendarz wyborczy

- **Najbliższe parlamentarne:** październik 2027 (max kadencja Sejmu X = 4 lata + 30 dni)
- **Najbliższe samorządowe:** wiosna 2029 (kadencja samorządu 5 lat od 2024)
- **Najbliższe prezydenckie:** maj 2030 (kadencja 5 lat od 2025-08-06)
- **Najbliższe eurowybory:** czerwiec 2029

## AI prompt templates

${promptBlock([
  "Wynik wyborów parlamentarnych 2023 — kto wygrał i ilu mandatów.",
  "Frekwencja w wyborach prezydenckich 2025 — pierwsza i druga tura.",
  "Kiedy są najbliższe wybory parlamentarne w Polsce?",
  "Porównaj frekwencję wyborów parlamentarnych 2023 z eurowyborami 2024.",
])}

## Źródła

- [PKW — Państwowa Komisja Wyborcza](${sources.pkw})
- [Sejm.gov.pl — wyniki głosowań X kadencji](https://api.sejm.gov.pl/sejm/term10)
- [Eurostat — frekwencja eurowyborów UE 2024](https://results.elections.europa.eu/pl/)
- [Kodeks wyborczy (ustawa z 2011)](https://isap.sejm.gov.pl)
`;
    },
  },
];

if (civicTemplates.length !== 3) {
  throw new Error(`Expected 3 civic templates, got ${civicTemplates.length}`);
}
