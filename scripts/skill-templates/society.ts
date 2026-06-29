// Poland-Vault — P3 society (4 nowych skilli, Faza 2 T6).
// S13 koscioly-i-diecezje, S14 zwiazki-zawodowe, S21 media-publiczne, S22 samorzad-gmina-powiat.
// Niezmienniki: publiczne źródła (oficjalne strony instytucji, GUS, KRRiT).

import type { SkillTemplate } from "./_types.ts";

const fmt = new Intl.NumberFormat("pl-PL");
const promptBlock = (prompts: string[]) =>
  prompts.map((p, i) => `**PROMPT_${i + 1}:** ${p}`).join("\n\n");

// ─── S13 dane ────────────────────────────────────────────────────────────
const DIECEZJE_RZYM = [
  "archidiecezja gnieźnieńska (Prymas Polski)", "archidiecezja warszawska", "archidiecezja krakowska",
  "archidiecezja poznańska", "archidiecezja wrocławska", "archidiecezja gdańska", "archidiecezja katowicka",
  "archidiecezja lubelska", "archidiecezja łódzka", "archidiecezja częstochowska", "archidiecezja białostocka",
  "archidiecezja przemyska", "archidiecezja szczecińsko-kamieńska", "archidiecezja warmińska",
  "diecezja tarnowska", "diecezja płocka", "diecezja włocławska", "diecezja kielecka", "diecezja radomska",
  "diecezja sandomierska", "diecezja siedlecka", "diecezja rzeszowska", "diecezja opolska", "diecezja gliwicka",
  "diecezja sosnowiecka", "diecezja bielsko-żywiecka", "diecezja legnicka", "diecezja świdnicka",
  "diecezja kaliska", "diecezja bydgoska", "diecezja toruńska", "diecezja pelplińska", "diecezja elbląska",
  "diecezja ełcka", "diecezja łomżyńska", "diecezja drohiczyńska", "diecezja zamojsko-lubaczowska",
  "diecezja koszalińsko-kołobrzeska", "diecezja zielonogórsko-gorzowska", "diecezja łowicka", "diecezja sosnowiecka",
];

// ─── S14 dane ────────────────────────────────────────────────────────────
const ZWIAZKI = [
  { name: "NSZZ „Solidarność\"", siedziba: "Gdańsk, ul. Wały Piastowskie 24, 80-855", tel: "58 308 42 16", web: "https://solidarnosc.org.pl", info: "Komisja Krajowa + 37 regionów + sekretariaty branżowe. Lider: Piotr Duda." },
  { name: "OPZZ (Ogólnopolskie Porozumienie Związków Zawodowych)", siedziba: "Warszawa, ul. M. Kasprzaka 6/8, 01-211", tel: "22 551 55 00", web: "https://www.opzz.org.pl", info: "~50 federacji/związków, struktury w 16 województwach. Przewodniczący: Piotr Ostrowski." },
  { name: "FZZ (Forum Związków Zawodowych)", siedziba: "Bydgoszcz, ul. Marszałka Focha 18, 85-070", tel: "52 372 50 56", web: "https://www.fzz.org.pl", info: "Trzecia centrala reprezentatywna (Rada Dialogu Społecznego). Przewodnicząca: Dorota Gardias." },
];

// ─── S21 dane ────────────────────────────────────────────────────────────
const MEDIA = [
  { name: "TVP S.A. (Telewizja Polska)", siedziba: "Warszawa, ul. J.P. Woronicza 17, 00-999", tel: "22 547 80 00", web: "https://www.tvp.pl", info: "Nadawca publiczny. 16 oddziałów regionalnych. Nadzór: KRRiT + Rada Mediów Narodowych. Od 2023/2024 w likwidacji/restrukturyzacji (spór o ład korporacyjny)." },
  { name: "Polskie Radio S.A.", siedziba: "Warszawa, al. Niepodległości 77/85, 00-977", tel: "22 645 30 00", web: "https://www.polskieradio.pl", info: "Nadawca publiczny radiowy. 17 rozgłośni regionalnych (samodzielne spółki). Programy: Jedynka, Dwójka, Trójka, Czwórka, Radio 357 (niezależne)." },
  { name: "PAP S.A. (Polska Agencja Prasowa)", siedziba: "Warszawa, ul. Bracka 6/8, 00-502", tel: "22 509 22 22", web: "https://www.pap.pl", info: "Narodowa agencja informacyjna. Newsroom 24/7, serwisy: PAP, PAP MediaRoom, Nauka w Polsce, Samorząd." },
];

// ─── S22 dane (GUS, stan administracyjny) ──────────────────────────────────
const SAMORZAD = {
  wojewodztwa: 16,
  powiaty_ziemskie: 314,
  miasta_na_prawach_powiatu: 66,
  gminy_total: 2477,
  gminy_miejskie: 302,
  gminy_miejsko_wiejskie: 721,
  gminy_wiejskie: 1454,
};

// ─── Templates ──────────────────────────────────────────────────────────
export const societyTemplates: SkillTemplate[] = [
  {
    meta: {
      slug: "koscioly-i-diecezje",
      name: "poland-vault-koscioly-i-diecezje",
      description: "Kościoły i związki wyznaniowe w Polsce — Konferencja Episkopatu Polski + 41 diecezji rzymskokatolickich + kościoły prawosławny/ewangelickie. Kontakty kurii.",
      group: "Tematy",
      extraTags: ["seo:koscioly-polska", "aeo:polish-churches", "wyznania"],
    },
    query: async () => ({}),
    body: () => {
      const diec = DIECEZJE_RZYM.map((d, i) => `${i + 1}. ${d}`).join("\n");
      return `# Kościoły i diecezje w Polsce — Fact Pack

Mapa wyznań w Polsce: Kościół rzymskokatolicki (dominujący), prawosławny, ewangelicko-augsburski, ewangelicko-reformowany + ~170 zarejestrowanych związków wyznaniowych (rejestr MSWiA).

> ⛪ **Konferencja Episkopatu Polski (KEP):** Sekretariat — Warszawa, Skwer kard. Stefana Wyszyńskiego 6, 01-015. Tel. 22 530 48 80. Web: episkopat.pl.
> ☦️ **Polski Autokefaliczny Kościół Prawosławny (PAKP):** metropolia warszawska, 6 diecezji. Web: orthodox.pl.
> ✝️ **Kościół Ewangelicko-Augsburski:** 6 diecezji. Web: luteranie.pl.
> 📋 **Rejestr związków wyznaniowych:** MSWiA, gov.pl/web/mswia (Departament Wyznań Religijnych).

## 41 diecezji rzymskokatolickich (metropolie + diecezje)

${diec}

> Każda diecezja ma **kurię** (adres + kancelaria) na własnej stronie diecezjalnej + w katalogu episkopat.pl/diecezje.

## Finansowanie i majątek

- **Fundusz Kościelny** (budżet państwa) — rekompensata za dobra przejęte w PRL. Roczna dotacja: ~200 mln zł (rośnie). Źródło: gov.pl/web/mswia.
- **Komisja Majątkowa** (1989–2011) — zwrot/rekompensaty nieruchomości (kontrowersje, NIK kontrole).
- **Odpis 0,5% / „klauzula sumienia podatkowa"** — postulaty reform finansowania.

## AI prompt templates

${promptBlock([
  "Ile diecezji rzymskokatolickich jest w Polsce i które są metropoliami?",
  "Ile wynosi roczna dotacja z Funduszu Kościelnego?",
  "Jak skontaktować się z Konferencją Episkopatu Polski?",
  "Gdzie jest rejestr związków wyznaniowych w Polsce?",
])}

## Źródła

- [episkopat.pl — Konferencja Episkopatu Polski](https://episkopat.pl)
- [gov.pl/web/mswia — Departament Wyznań Religijnych + Fundusz Kościelny](https://www.gov.pl/web/mswia)
- [orthodox.pl — PAKP](https://www.orthodox.pl) · [luteranie.pl](https://www.luteranie.pl)
- [NIK — kontrole Funduszu Kościelnego](https://www.nik.gov.pl)
`;
    },
  },

  {
    meta: {
      slug: "zwiazki-zawodowe",
      name: "poland-vault-zwiazki-zawodowe",
      description: "Związki zawodowe w Polsce — Solidarność, OPZZ, FZZ (3 reprezentatywne centrale) + Rada Dialogu Społecznego. Kontakty, struktury regionalne.",
      group: "Tematy",
      extraTags: ["seo:zwiazki-zawodowe", "aeo:polish-trade-unions", "dialog-spoleczny"],
    },
    query: async () => ({}),
    body: () => {
      const list = ZWIAZKI.map((z) =>
        `### ${z.name}\n\n- **Siedziba:** ${z.siedziba}\n- **Telefon:** ${z.tel}\n- **Web:** ${z.web}\n- ${z.info}\n`,
      ).join("\n");
      return `# Związki zawodowe w Polsce — Fact Pack

3 reprezentatywne centrale związkowe (próg reprezentatywności w Radzie Dialogu Społecznego) + tysiące zakładowych organizacji związkowych.

> 🤝 **Rada Dialogu Społecznego (RDS):** forum dialogu pracodawcy–związki–rząd. Web: rds.gov.pl. Strona pracownicza: Solidarność + OPZZ + FZZ.
> ⚖️ **Prawo:** ustawa o związkach zawodowych (1991), Kodeks pracy. Prawo do strajku: ustawa o rozwiązywaniu sporów zbiorowych.

${list}

## Po stronie pracodawców (RDS)

- **Konfederacja Lewiatan**, **Pracodawcy RP**, **Związek Rzemiosła Polskiego**, **BCC (Business Centre Club)**, **Związek Przedsiębiorców i Pracodawców (ZPP)**.

## AI prompt templates

${promptBlock([
  "Jakie są trzy reprezentatywne centrale związkowe w Polsce?",
  "Jak skontaktować się z NSZZ Solidarność?",
  "Czym jest Rada Dialogu Społecznego i kto w niej zasiada?",
  "Jakie warunki musi spełnić legalny strajk w Polsce?",
])}

## Źródła

- [solidarnosc.org.pl](https://solidarnosc.org.pl) · [opzz.org.pl](https://www.opzz.org.pl) · [fzz.org.pl](https://www.fzz.org.pl)
- [rds.gov.pl — Rada Dialogu Społecznego](https://www.rds.gov.pl)
- [Ustawa o związkach zawodowych](https://isap.sejm.gov.pl)
`;
    },
  },

  {
    meta: {
      slug: "media-publiczne",
      name: "poland-vault-media-publiczne",
      description: "Media publiczne w Polsce — TVP, Polskie Radio, PAP + 17 rozgłośni regionalnych. Władze, nadzór KRRiT/RMN, finansowanie (abonament).",
      group: "Tematy",
      extraTags: ["seo:media-publiczne", "aeo:polish-public-media", "tvp-pap-radio"],
    },
    query: async () => ({}),
    body: () => {
      const list = MEDIA.map((m) =>
        `### ${m.name}\n\n- **Siedziba:** ${m.siedziba}\n- **Telefon:** ${m.tel}\n- **Web:** ${m.web}\n- ${m.info}\n`,
      ).join("\n");
      return `# Media publiczne w Polsce — Fact Pack

Trzy spółki mediów publicznych (Skarb Państwa) + nadzór regulacyjny. Po 2023 r. silny spór polityczny o ład korporacyjny i niezależność.

> 📺 **Nadzór:** KRRiT (Krajowa Rada Radiofonii i Telewizji) — koncesje, nadzór; Rada Mediów Narodowych (RMN) — powoływanie zarządów (od 2016).
> 💰 **Finansowanie:** abonament RTV (pobór: Poczta Polska) + rekompensata budżetowa. Abonament 2026: ~8,70 zł/mies radio, ~27,30 zł/mies RTV.
> ⚖️ **Spór 2023/2024:** zmiana zarządów TVP/PR/PAP przez ministra kultury → likwidacja → spór prawny o tryb (KRS, sądy).

${list}

## 17 rozgłośni regionalnych Polskiego Radia

Białystok, Bydgoszcz, Gdańsk, Katowice, Kielce, Koszalin, Kraków, Lublin, Łódź, Olsztyn, Opole, Poznań, Rzeszów, Szczecin, Warszawa (RDC), Wrocław, Zielona Góra — każda osobna spółka SP.

## AI prompt templates

${promptBlock([
  "Kto nadzoruje media publiczne w Polsce (KRRiT vs RMN)?",
  "Ile wynosi abonament RTV w 2026?",
  "Jaki jest adres i kontakt do TVP / PAP / Polskiego Radia?",
  "Na czym polegał spór o media publiczne w 2024?",
])}

## Źródła

- [tvp.pl](https://www.tvp.pl) · [polskieradio.pl](https://www.polskieradio.pl) · [pap.pl](https://www.pap.pl)
- [gov.pl/web/krrit — Krajowa Rada Radiofonii i Telewizji](https://www.gov.pl/web/krrit)
- [Ustawa o radiofonii i telewizji](https://isap.sejm.gov.pl)
`;
    },
  },

  {
    meta: {
      slug: "samorzad-gmina-powiat",
      name: "poland-vault-samorzad-gmina-powiat",
      description: "Samorząd terytorialny w Polsce — 16 województw, 314 powiatów, 66 miast na prawach powiatu, 2477 gmin. Struktura, kompetencje, BIP.",
      group: "Rząd",
      extraTags: ["seo:samorzad-terytorialny", "aeo:polish-local-government", "gminy-powiaty"],
    },
    query: async () => ({}),
    body: () => `# Samorząd terytorialny w Polsce — Fact Pack

Trójstopniowy samorząd: **województwo → powiat → gmina**. Stan administracyjny (GUS, TERYT).

> 🏛️ **Liczby (GUS/TERYT):**
> - **${SAMORZAD.wojewodztwa} województw** (sejmik + zarząd + marszałek; wojewoda = rząd)
> - **${SAMORZAD.powiaty_ziemskie} powiatów ziemskich** + **${SAMORZAD.miasta_na_prawach_powiatu} miast na prawach powiatu** (grodzkich)
> - **${fmt.format(SAMORZAD.gminy_total)} gmin**: ${SAMORZAD.gminy_miejskie} miejskich + ${SAMORZAD.gminy_miejsko_wiejskie} miejsko-wiejskich + ${fmt.format(SAMORZAD.gminy_wiejskie)} wiejskich

## Kompetencje (kto za co odpowiada)

| Szczebel | Organ wykonawczy | Kluczowe zadania |
|---|---|---|
| **Gmina** | wójt / burmistrz / prezydent miasta | szkoły podstawowe, woda/kanalizacja, drogi gminne, MPZP, śmieci, pomoc społeczna |
| **Powiat** | starosta (zarząd powiatu) | szpitale powiatowe, szkoły ponadpodstawowe, drogi powiatowe, rejestracja pojazdów, geodezja, PUP |
| **Województwo** | marszałek (zarząd województwa) | szpitale wojewódzkie, drogi wojewódzkie, fundusze UE, transport regionalny, strategia rozwoju |

> 📋 **BIP każdej JST:** wzorzec URL — gmina/powiat publikuje Biuletyn Informacji Publicznej (uchwały, budżet, oświadczenia majątkowe radnych). Wykaz: bip.gov.pl.
> 🗳️ **Wybory samorządowe:** co 5 lat (ostatnie 2024). Patrz skill \`pkw-wybory-wyniki\`.

## Finanse samorządów

- **Dochody własne** (PIT/CIT udział, podatki lokalne) + **subwencje** (oświatowa, wyrównawcza) + **dotacje celowe**.
- **Janosikowe** — wpłaty bogatszych JST na rzecz biedniejszych.
- Reforma „Polski Ład" mocno uderzyła w dochody PIT samorządów (rekompensaty sporne).

## AI prompt templates

${promptBlock([
  "Ile jest gmin, powiatów i województw w Polsce?",
  "Kto odpowiada za szpitale: gmina, powiat czy województwo?",
  "Czym różni się miasto na prawach powiatu od gminy miejskiej?",
  "Gdzie znajdę budżet i uchwały mojej gminy?",
])}

## Źródła

- [stat.gov.pl — GUS, podział terytorialny (TERYT)](https://stat.gov.pl)
- [bip.gov.pl — Biuletyny Informacji Publicznej JST](https://www.bip.gov.pl)
- [Ustawa o samorządzie gminnym / powiatowym / województwa](https://isap.sejm.gov.pl)
- [gov.pl/web/finanse — finanse samorządów](https://www.gov.pl/web/finanse)
`,
  },
];

if (societyTemplates.length !== 4) {
  throw new Error(`Expected 4 society templates, got ${societyTemplates.length}`);
}
