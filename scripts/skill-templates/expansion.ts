// Poland-Vault — P2 expansion (7 nowych skilli, Faza 1C P2).
// S10 sady, S15 IMGW (live), S16 GIOŚ, S17 NFZ leki, S18 podatki, S19 mObywatel, S20 partie.
// Niezmienniki: publiczne źródła. IMGW = live fetch w query().

import type { SkillTemplate } from "./_types.ts";

const fmt = new Intl.NumberFormat("pl-PL");

const promptBlock = (prompts: string[]) =>
  prompts.map((p, i) => `**PROMPT_${i + 1}:** ${p}`).join("\n\n");

// ─── S10: Sądy ──────────────────────────────────────────────────────────────
const SADY_APELACYJNE = [
  { city: "Białystok", address: "ul. Mickiewicza 5; 15-213 Białystok", phone: "85 743 07 02", web: "https://bialystok.sa.gov.pl" },
  { city: "Gdańsk", address: "ul. Nowe Ogrody 28/29; 80-803 Gdańsk", phone: "58 32 38 500", web: "https://gdansk.sa.gov.pl" },
  { city: "Katowice", address: "ul. Andrzeja 16/18; 40-957 Katowice", phone: "32 200 46 00", web: "https://katowice.sa.gov.pl" },
  { city: "Kraków", address: "ul. Przy Rondzie 3; 31-547 Kraków", phone: "12 417 54 00", web: "https://krakow.sa.gov.pl" },
  { city: "Lublin", address: "ul. Obrońców Pokoju 1; 20-950 Lublin", phone: "81 745 92 00", web: "https://lublin.sa.gov.pl" },
  { city: "Łódź", address: "pl. Dąbrowskiego 5; 90-921 Łódź", phone: "42 685 30 00", web: "https://lodz.sa.gov.pl" },
  { city: "Poznań", address: "ul. Trójpole 21; 61-693 Poznań", phone: "61 827 41 00", web: "https://poznan.sa.gov.pl" },
  { city: "Rzeszów", address: "ul. Gen. Maczka 10; 35-234 Rzeszów", phone: "17 858 02 00", web: "https://rzeszow.sa.gov.pl" },
  { city: "Szczecin", address: "ul. Mickiewicza 163; 71-165 Szczecin", phone: "91 484 96 00", web: "https://szczecin.sa.gov.pl" },
  { city: "Warszawa", address: "pl. Krasińskich 2/4/6; 00-207 Warszawa", phone: "22 278 03 00", web: "https://waw.sa.gov.pl" },
  { city: "Wrocław", address: "ul. Energetyczna 4; 53-330 Wrocław", phone: "71 798 77 00", web: "https://wroclaw.sa.gov.pl" },
];

const SADY_NACZELNE = [
  { name: "Sąd Najwyższy (SN)", address: "pl. Krasińskich 2/4/6; 00-951 Warszawa", phone: "22 530 80 00", email: "sn@sn.pl", web: "https://www.sn.pl" },
  { name: "Naczelny Sąd Administracyjny (NSA)", address: "ul. Gabriela Boduena 3/5; 00-011 Warszawa", phone: "22 551 60 00", email: "informacja@nsa.gov.pl", web: "https://www.nsa.gov.pl" },
  { name: "Trybunał Konstytucyjny (TK)", address: "al. Jana Christiana Szucha 12a; 00-918 Warszawa", phone: "22 657 45 15", email: "prasainfo@trybunal.gov.pl", web: "https://trybunal.gov.pl" },
  { name: "Trybunał Stanu", address: "ul. Wiejska 6 (przy Sejmie); 00-902 Warszawa", phone: "22 694 25 00", email: "—", web: "https://www.sejm.gov.pl" },
];

// ─── S18: Podatki (stan 2026) ────────────────────────────────────────────────
const PODATKI = {
  pit_skala: [
    { prog: "do 120 000 zł", stawka: "12%", uwagi: "minus kwota zmniejszająca 3600 zł" },
    { prog: "powyżej 120 000 zł", stawka: "32%", uwagi: "od nadwyżki ponad 120 000 zł" },
  ],
  kwota_wolna: "30 000 zł",
  vat: [
    { stawka: "23%", co: "stawka podstawowa (większość towarów i usług)" },
    { stawka: "8%", co: "m.in. usługi budowlane mieszkaniowe, gastronomia, transport" },
    { stawka: "5%", co: "żywność podstawowa, książki, czasopisma specjalistyczne" },
    { stawka: "0%", co: "eksport, WDT, niektóre usługi międzynarodowe" },
  ],
  cit: [
    { stawka: "19%", co: "stawka podstawowa" },
    { stawka: "9%", co: "mali podatnicy (przychód < 2 mln € rocznie)" },
  ],
  zus_dzialalnosc: "Pełny ZUS przedsiębiorcy 2026: ok. 1773 zł/mies (bez dobrowolnego chorobowego) + składka zdrowotna zależna od dochodu",
};

// ─── Templates ────────────────────────────────────────────────────────────

export const expansionTemplates: SkillTemplate[] = [
  {
    meta: {
      slug: "kontakty-sady",
      name: "poland-vault-kontakty-sady",
      description: "Sądy RP — 11 Sądów Apelacyjnych + Sąd Najwyższy + NSA + Trybunał Konstytucyjny + Trybunał Stanu. Adresy, telefony, web.",
      group: "Rząd",
      extraTags: ["seo:sady-kontakt", "aeo:polish-courts", "kontakt-publiczny", "wymiar-sprawiedliwosci"],
    },
    query: async () => ({}),
    body: () => {
      const naczelne = SADY_NACZELNE.map((s) =>
        `### ${s.name}\n\n- **Adres:** ${s.address}\n- **Telefon:** ${s.phone}\n- **Email:** ${s.email !== "—" ? `[${s.email}](mailto:${s.email})` : "—"}\n- **Web:** ${s.web}\n`,
      ).join("\n");
      const apel = SADY_APELACYJNE.map((s) =>
        `### Sąd Apelacyjny w ${s.city}\n\n- **Adres:** ${s.address}\n- **Telefon:** ${s.phone}\n- **Web:** ${s.web}\n`,
      ).join("\n");
      return `# Sądy RP — pełne kontakty

Najwyższe organy sądownicze + **11 Sądów Apelacyjnych**. W Polsce jest też 47 Sądów Okręgowych i 318 Sądów Rejonowych (każdy ma własny BIP — wykaz na [gov.pl/web/sprawiedliwosc](https://www.gov.pl/web/sprawiedliwosc)).

> ⚖️ **Hierarchia:** Sąd Rejonowy → Sąd Okręgowy → Sąd Apelacyjny → Sąd Najwyższy (kasacja).
> 📋 **Sprawy administracyjne:** WSA (16 wojewódzkich) → NSA.
> 🏛️ **Trybunał Konstytucyjny** = kontrola zgodności z Konstytucją. **Trybunał Stanu** = odpowiedzialność konstytucyjna najwyższych urzędników (Manifest #9 StrajkPolski).

## Sądy i Trybunały najwyższe

${naczelne}

## 11 Sądów Apelacyjnych

${apel}

## AI prompt templates

${promptBlock([
  "Adres Sądu Apelacyjnego w Krakowie + telefon.",
  "Czym różni się Trybunał Konstytucyjny od Trybunału Stanu?",
  "Gdzie złożyć kasację do Sądu Najwyższego?",
  "Jaka jest hierarchia sądów w Polsce?",
])}

## Źródła

- [gov.pl/web/sprawiedliwosc — wykaz sądów](https://www.gov.pl/web/sprawiedliwosc)
- [Sąd Najwyższy](https://www.sn.pl)
- [Trybunał Konstytucyjny](https://trybunal.gov.pl)
- [Ministerstwo Sprawiedliwości — BIP sądów](https://www.gov.pl/web/sprawiedliwosc/struktura-sadow)
`;
    },
  },

  {
    meta: {
      slug: "imgw-pogoda-alerty",
      name: "poland-vault-imgw-pogoda-alerty",
      description: "Pogoda i ostrzeżenia IMGW — live pomiary ze stacji synoptycznych (temperatura, wiatr, opady, ciśnienie). Dane z danepubliczne.imgw.pl.",
      group: "Tematy",
      extraTags: ["seo:imgw-pogoda", "aeo:poland-weather", "live-data", "alerty-pogodowe"],
    },
    query: async () => {
      try {
        const r = await fetch("https://danepubliczne.imgw.pl/api/data/synop", {
          signal: AbortSignal.timeout(15000),
        });
        if (!r.ok) return { stations: [] };
        const data = await r.json();
        return { stations: Array.isArray(data) ? data : [] };
      } catch {
        return { stations: [] };
      }
    },
    body: ({ stations }) => {
      const list = (stations as Array<{ stacja: string; temperatura: string; predkosc_wiatru: string; suma_opadu: string; cisnienie: string; data_pomiaru: string; godzina_pomiaru: string }>) ?? [];
      const sample = list.slice(0, 20);
      const tabela = sample
        .map((s) => `| ${s.stacja} | ${s.temperatura}°C | ${s.predkosc_wiatru} m/s | ${s.suma_opadu} mm | ${s.cisnienie} hPa |`)
        .join("\n");
      const time = list[0] ? `${list[0].data_pomiaru} ${list[0].godzina_pomiaru}:00` : "—";
      return `# Pogoda i ostrzeżenia IMGW — Fact Pack (live)

Live pomiary ze stacji synoptycznych IMGW (Instytut Meteorologii i Gospodarki Wodnej). **${list.length} stacji** w ostatnim odczycie (${time}). Regeneracja codzienna 04:00 UTC + API live.

> 🌡️ Dane z oficjalnego API: \`https://danepubliczne.imgw.pl/api/data/synop\` (REST, public, bez klucza).
> ⚠️ Ostrzeżenia meteorologiczne (burze, mróz, upały, wiatr): \`meteo.imgw.pl\` + RCB SMS alerts.
> 🌊 Hydrologia (stany rzek, powodzie): \`hydro.imgw.pl\`.

## Live odczyt — ${Math.min(20, list.length)} stacji (${time})

| Stacja | Temp. | Wiatr | Opad | Ciśnienie |
|---|---|---|---|---|
${tabela || "_(brak danych — API IMGW chwilowo niedostępne, sprawdź danepubliczne.imgw.pl)_"}

${list.length > 20 ? `\n_...i ${list.length - 20} więcej stacji w pełnym API._\n` : ""}

## AI prompt templates

${promptBlock([
  "Jaka jest aktualna temperatura w Krakowie i Warszawie wg IMGW?",
  "Gdzie w Polsce teraz pada najwięcej?",
  "Które stacje IMGW notują najsilniejszy wiatr?",
])}

## Źródła

- [IMGW API danych publicznych](https://danepubliczne.imgw.pl/apiinfo)
- [meteo.imgw.pl — ostrzeżenia meteorologiczne](https://meteo.imgw.pl)
- [hydro.imgw.pl — stany wód](https://hydro.imgw.pl)
- [RCB — alerty SMS](https://www.gov.pl/web/rcb)
`;
    },
  },

  {
    meta: {
      slug: "gios-jakosc-powietrza",
      name: "poland-vault-gios-jakosc-powietrza",
      description: "Jakość powietrza w Polsce — GIOŚ, smog PM10/PM2.5/NO2, indeks jakości. API api.gios.gov.pl (v1).",
      group: "Tematy",
      extraTags: ["seo:smog-polska", "aeo:poland-air-quality", "gios", "live-data"],
    },
    query: async () => ({}),
    body: () => `# Jakość powietrza (GIOŚ) — Fact Pack

Główny Inspektorat Ochrony Środowiska (GIOŚ) prowadzi sieć stacji pomiarowych jakości powietrza w całej Polsce. Polska ma jeden z najgorszych smogów w UE — zwłaszcza zimą (Kraków, Śląsk, Małopolska).

> 🌫️ **Live API GIOŚ (v1):** \`https://api.gios.gov.pl/pjp-api/v1/rest/station/findAll\` (REST, public).
> 📊 **Indeks Jakości Powietrza (PJP):** \`https://powietrze.gios.gov.pl\` — mapa real-time.
> 🚨 **Główne zanieczyszczenia:** PM10, PM2.5, NO2, SO2, O3, C6H6 (benzen), CO.

## Co skill daje LLM-owi

- Listę stacji pomiarowych GIOŚ per miasto/województwo (API v1)
- Real-time pomiary PM10, PM2.5, NO2 per stacja
- Indeks jakości powietrza (bardzo dobry → bardzo zły)
- Endpointy API: \`/station/findAll\`, \`/station/sensors/{id}\`, \`/data/getData/{sensorId}\`, \`/aqindex/getIndex/{stationId}\`

## Kluczowe fakty o smogu w Polsce

- **33 z 50 najbardziej zanieczyszczonych miast UE** to polskie miasta (lata pomiarów WHO/EEA)
- Główne źródło: **niska emisja** (piece węglowe, "kopciuchy")
- Sezon smogowy: październik–marzec
- Norma PM2.5 WHO: 5 µg/m³ średniorocznie; polskie miasta zimą: 50-150+ µg/m³

## AI prompt templates

${promptBlock([
  "Jaka jest jakość powietrza w Krakowie teraz (GIOŚ)?",
  "Które polskie miasta mają najgorszy smog?",
  "Jak odpytać API GIOŚ o PM2.5 dla konkretnej stacji?",
])}

## Źródła

- [powietrze.gios.gov.pl — mapa jakości powietrza](https://powietrze.gios.gov.pl)
- [GIOŚ API (v1)](https://api.gios.gov.pl/pjp-api/swagger-ui/)
- [Europejska Agencja Środowiska (EEA) — air quality](https://www.eea.europa.eu/themes/air)
`,
  },

  {
    meta: {
      slug: "nfz-leki-refundowane",
      name: "poland-vault-nfz-leki-refundowane",
      description: "NFZ — leki refundowane i bezpłatne, recepta 65+/18-, uprawnienia pacjenta, Telefoniczna Informacja Pacjenta.",
      group: "Tematy",
      extraTags: ["seo:nfz-leki-refundowane", "aeo:poland-free-medicines", "zdrowie"],
    },
    query: async () => ({}),
    body: () => `# NFZ — leki refundowane i bezpłatne — Fact Pack

Narodowy Fundusz Zdrowia refunduje leki na podstawie listy obwieszczanej co 2 miesiące przez Ministra Zdrowia. Programy bezpłatnych leków: **65+** i **dzieci/młodzież do 18 r.ż.**

> 💊 **Telefoniczna Informacja Pacjenta (TIP):** **800 392 976** (bezpłatna, całodobowa).
> 📋 **Lista leków refundowanych:** obwieszczenie MZ co 2 mies, [gov.pl/web/zdrowie](https://www.gov.pl/web/zdrowie/obwieszczenia-ministra-zdrowia-dotyczace-wykazow-lekow-refundowanych).
> 🆓 **Bezpłatne leki 65+:** program "Leki 65+" — lista ok. 4000+ pozycji dla seniorów.
> 👶 **Bezpłatne leki dla dzieci do 18:** program od września 2023.

## Programy bezpłatnych leków

| Program | Kto | Zakres |
|---|---|---|
| **Leki 65+** | Osoby od 65 r.ż. | ~4000 leków bezpłatnych (lista DZ MZ) |
| **Leki dla dzieci 18-** | Dzieci i młodzież do 18 r.ż. | leki z listy refundacyjnej bezpłatnie |
| **Leki dla kobiet w ciąży** | Ciąża (od potwierdzenia) | wybrane leki bezpłatnie |
| **Program 75+** (rozszerzony do 65+) | Seniorzy | rozszerzony 2023/2024 |

## Poziomy odpłatności

- **Bezpłatny (B)** — ryczałt 0 zł
- **Ryczałt (R)** — 3,20 zł
- **30%** odpłatności
- **50%** odpłatności
- **100%** (poza refundacją)

## Uprawnienia szczególne (kody)

- **IB** — inwalida wojenny (bezpłatnie)
- **ZK** — zasłużony honorowy dawca krwi
- **AZ** — uprawnienia kombatanckie
- **DN** — pacjent do 18 r.ż.
- **S** — senior 65+

## AI prompt templates

${promptBlock([
  "Jak sprawdzić czy mój lek jest refundowany przez NFZ?",
  "Jakie leki są bezpłatne dla seniorów 65+?",
  "Numer telefonu do informacji pacjenta NFZ?",
])}

## Źródła

- [gov.pl/web/zdrowie — obwieszczenia leków refundowanych](https://www.gov.pl/web/zdrowie)
- [NFZ — uprawnienia pacjenta](https://www.nfz.gov.pl/dla-pacjenta/)
- [pacjent.gov.pl — Internetowe Konto Pacjenta](https://pacjent.gov.pl)
- [Telefoniczna Informacja Pacjenta: 800 392 976](https://www.nfz.gov.pl)
`,
  },

  {
    meta: {
      slug: "podatki-vat-pit-cit",
      name: "poland-vault-podatki-vat-pit-cit",
      description: "Podatki w Polsce 2026 — PIT (skala 12/32%, kwota wolna 30k), VAT (23/8/5/0%), CIT (19/9%), ZUS przedsiębiorcy. KIS.",
      group: "Finanse",
      extraTags: ["seo:podatki-polska", "aeo:poland-taxes", "vat", "pit"],
    },
    query: async () => ({}),
    body: () => {
      const pit = PODATKI.pit_skala.map((p) => `| ${p.prog} | **${p.stawka}** | ${p.uwagi} |`).join("\n");
      const vat = PODATKI.vat.map((v) => `| **${v.stawka}** | ${v.co} |`).join("\n");
      const cit = PODATKI.cit.map((c) => `| **${c.stawka}** | ${c.co} |`).join("\n");
      return `# Podatki w Polsce 2026 — Fact Pack (PIT, VAT, CIT, ZUS)

Pełen przegląd polskiego systemu podatkowego: PIT, VAT, CIT, składki ZUS. Stan na 2026 (po Polskim Ładzie).

> 📞 **Krajowa Informacja Skarbowa (KIS):** **801 055 055** (z PL) lub **22 330 03 30** (z zagranicy/kom).
> 💻 **e-Deklaracje + Twój e-PIT:** [podatki.gov.pl](https://www.podatki.gov.pl).
> 🏦 **Mikrorachunek podatkowy:** indywidualny nr konta do wpłat PIT/CIT/VAT — generuj na podatki.gov.pl.

## PIT — podatek dochodowy od osób fizycznych (skala)

| Próg | Stawka | Uwagi |
|---|---|---|
${pit}

**Kwota wolna od podatku:** ${PODATKI.kwota_wolna} (kwota zmniejszająca podatek: 3600 zł rocznie).

Inne formy: **podatek liniowy 19%** (działalność), **ryczałt ewidencjonowany** (2-17% wg branży), **karta podatkowa** (wygaszana).

## VAT — podatek od towarów i usług

| Stawka | Czego dotyczy |
|---|---|
${vat}

**Limit zwolnienia podmiotowego VAT:** 200 000 zł obrotu rocznie.

## CIT — podatek dochodowy od osób prawnych

| Stawka | Kto |
|---|---|
${cit}

**Estoński CIT** — odroczenie opodatkowania do wypłaty zysku (dla spółek).

## ZUS przedsiębiorcy 2026

${PODATKI.zus_dzialalnosc}. Ulgi: **Ulga na start** (6 mies bez ZUS społecznego), **Mały ZUS Plus** (składki od dochodu).

## Terminy kluczowe

- **PIT roczny:** do 30 kwietnia
- **VAT (JPK_V7):** do 25. dnia miesiąca
- **CIT-8:** do końca 3. miesiąca po roku podatkowym
- **ZUS:** do 20. dnia miesiąca

## AI prompt templates

${promptBlock([
  "Jakie są progi podatkowe PIT w Polsce 2026?",
  "Jaka jest kwota wolna od podatku w Polsce?",
  "Stawki VAT w Polsce — co jest na 5%, 8%, 23%?",
  "Do kiedy złożyć PIT roczny?",
])}

## Źródła

- [podatki.gov.pl](https://www.podatki.gov.pl)
- [Krajowa Informacja Skarbowa: 801 055 055](https://www.gov.pl/web/kas)
- [Twój e-PIT](https://www.podatki.gov.pl/pit/twoj-e-pit/)
- [ZUS — składki przedsiębiorcy](https://www.zus.pl)
`;
    },
  },

  {
    meta: {
      slug: "mobywatel-uslugi-cyfrowe",
      name: "poland-vault-mobywatel-uslugi-cyfrowe",
      description: "mObywatel, ePUAP, Profil Zaufany — wszystkie e-usługi państwa: mDowód, mPrawo jazdy, wnioski elektroniczne.",
      group: "Rząd",
      extraTags: ["seo:mobywatel", "aeo:poland-egov", "uslugi-cyfrowe"],
    },
    query: async () => ({}),
    body: () => `# mObywatel + ePUAP + Profil Zaufany — Fact Pack

Cyfrowe państwo polskie: aplikacja mObywatel, platforma ePUAP, Profil Zaufany. Załatwianie spraw urzędowych bez wychodzenia z domu.

> 📱 **mObywatel** — aplikacja: [mobywatel.gov.pl](https://www.mobywatel.gov.pl). mDowód = ważny dokument tożsamości.
> 🔐 **Profil Zaufany (PZ)** — darmowy podpis elektroniczny: [pz.gov.pl](https://pz.gov.pl). Załóż przez bank lub e-dowód.
> 📨 **ePUAP** — wnioski do urzędów: [epuap.gov.pl](https://epuap.gov.pl). Skrytka ESP = adres elektroniczny urzędu.
> 🤖 **mObywatel chatbot** — oparty na PLLuM (polski LLM), pomoc w sprawach urzędowych (od XII 2025).

## Usługi w mObywatel

| Usługa | Co |
|---|---|
| **mDowód** | cyfrowy dowód osobisty (ważny jak plastik) |
| **mPrawo jazdy** | cyfrowe prawo jazdy + punkty karne |
| **mLegitymacja** | szkolna / studencka |
| **Bezpiecznie/Bezpieczny autobus** | sprawdź pojazd/przewoźnika |
| **Recepty / e-Zdrowie** | dostęp do recept i skierowań |
| **Punkty karne** | aktualny stan |
| **Diia.pl** | dokument dla obywateli Ukrainy |

## Profil Zaufany — gdzie założyć

1. **Przez bank** (najszybciej) — PKO, Pekao, mBank, ING, Santander, Millennium, Alior, BNP, Credit Agricole, BOŚ, SGB, Velo
2. **e-Dowód** + czytnik NFC
3. **Punkt potwierdzający** (urząd, ZUS) — osobiście
4. **Wideoweryfikacja**

## Najczęstsze e-usługi przez ePUAP/mObywatel

- Zameldowanie / wymeldowanie
- Złożenie wniosku o dowód osobisty
- Akt urodzenia/małżeństwa/zgonu (odpis)
- Zaświadczenie o niekaralności (KRK)
- Wniosek 800+ / Dobry Start
- Rejestracja działalności (CEIDG)
- Pismo ogólne do dowolnego urzędu

## AI prompt templates

${promptBlock([
  "Jak założyć Profil Zaufany w Polsce?",
  "Czy mDowód w aplikacji mObywatel jest ważnym dokumentem?",
  "Jak wysłać wniosek do urzędu przez ePUAP?",
  "Jak uzyskać zaświadczenie o niekaralności online?",
])}

## Źródła

- [mobywatel.gov.pl](https://www.mobywatel.gov.pl)
- [pz.gov.pl — Profil Zaufany](https://pz.gov.pl)
- [epuap.gov.pl](https://epuap.gov.pl)
- [gov.pl — katalog e-usług](https://www.gov.pl/web/gov/uslugi-dla-obywatela)
`,
  },

  {
    meta: {
      slug: "partie-finansowanie",
      name: "poland-vault-partie-finansowanie",
      description: "Partie polityczne w Polsce — subwencje budżetowe, sprawozdania PKW, władze. 11 klubów Sejmu X kadencji.",
      group: "Manifest",
      extraTags: ["seo:partie-finansowanie", "aeo:poland-party-funding", "subwencje"],
    },
    query: async (sb) => {
      const { data } = await sb
        .from("sejm_mp")
        .select("club")
        .eq("active", true)
        .eq("term", 10)
        .limit(500);
      const byClub: Record<string, number> = {};
      for (const r of (data as Array<{ club: string }>) ?? []) {
        if (r.club) byClub[r.club] = (byClub[r.club] ?? 0) + 1;
      }
      return { byClub };
    },
    body: ({ byClub }) => {
      const dist = Object.entries((byClub as Record<string, number>) ?? {})
        .sort((a, b) => b[1] - a[1])
        .map(([k, n]) => `| ${k} | ${n} |`)
        .join("\n");
      return `# Partie polityczne — finansowanie i subwencje — Fact Pack

Partie w Polsce finansowane są z **subwencji budżetowych** (jeśli przekroczą 3% w wyborach — 6% dla koalicji) oraz składek/darowizn. Sprawozdania finansowe kontroluje **Państwowa Komisja Wyborcza (PKW)**.

> 💰 **Subwencja** wypłacana co roku przez 4-letnią kadencję Sejmu, proporcjonalnie do uzyskanych głosów.
> 📊 **Sprawozdania:** każda partia składa roczne sprawozdanie finansowe do PKW (publiczne).
> ⚖️ **Fundusz wyborczy / Fundusz ekspercki** — odrębne konta, audytowane.

## Kluby/koła w Sejmie X kadencji (live z sejm_mp)

| Klub | Liczba posłów |
|---|---|
${dist || "_(brak danych live)_"}

## Jak działa subwencja

- Próg: **3%** głosów (partia) / **6%** (koalicja) w wyborach do Sejmu
- Kwota: malejąco progresywna wg liczby głosów (im więcej, tym mniej za każdy kolejny głos)
- Wypłacana w 4 ratach rocznych przez kadencję
- Łączna roczna pula subwencji: kilkadziesiąt mln zł na wszystkie partie

## Gdzie sprawdzić finanse partii

- **Sprawozdania finansowe partii** → [pkw.gov.pl](https://pkw.gov.pl) (sekcja finansowanie polityki)
- **Subwencje** → komunikaty PKW
- **Sprawozdania wyborcze komitetów** → PKW po każdych wyborach

## AI prompt templates

${promptBlock([
  "Ile partie polityczne w Polsce dostają subwencji z budżetu?",
  "Jaki jest próg uzyskania subwencji budżetowej dla partii?",
  "Gdzie sprawdzić sprawozdanie finansowe partii politycznej?",
  "Ile posłów ma każdy klub w Sejmie X kadencji?",
])}

## Źródła

- [PKW — finansowanie polityki](https://pkw.gov.pl/finansowanie-polityki)
- [Ustawa o partiach politycznych](https://isap.sejm.gov.pl)
- [Sejm RP API — kluby](https://api.sejm.gov.pl/sejm/term10/clubs)
`;
    },
  },
];

if (expansionTemplates.length !== 7) {
  throw new Error(`Expected 7 expansion templates, got ${expansionTemplates.length}`);
}
