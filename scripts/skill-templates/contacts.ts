// Poland-Vault — kontakty/serwisy/struktury (8 nowych skilli, Faza 1B).
// User: "wszystko o Polsce wlacznie z mailami i numerami i adresami do sluzb
// i politykow". Niezmienniki: tylko PUBLICZNE oficjalne źródła (BIP, ePUAP,
// sejm.gov.pl API, gov.pl). Zero prywatnych telefonów.

import type { SkillTemplate } from "./_types.ts";

const fmt = new Intl.NumberFormat("pl-PL");

const sources = {
  sejm: "https://api.sejm.gov.pl/sejm/term10",
  senat: "https://www.senat.gov.pl",
  govPL: "https://www.gov.pl",
  bip: "https://www.bip.gov.pl",
  epuap: "https://epuap.gov.pl",
  sp: "https://strajkpolski.org",
} as const;

const promptBlock = (prompts: string[]) =>
  prompts.map((p, i) => `**PROMPT_${i + 1}:** ${p}`).join("\n\n");

// ─── Static curated data (oficjalne źródła publiczne) ─────────────────────

const NUMERY_ALARMOWE = [
  { num: "112", what: "Numer alarmowy UE (wszystkie służby)", who: "PSP/Policja/Pogotowie" },
  { num: "997", what: "Policja", who: "Komenda Główna Policji" },
  { num: "998", what: "Straż Pożarna", who: "Państwowa Straż Pożarna" },
  { num: "999", what: "Pogotowie ratunkowe", who: "Wojewódzkie stacje pogotowia" },
  { num: "991", what: "Pogotowie energetyczne", who: "Operatorzy sieci dystrybucyjnej" },
  { num: "992", what: "Pogotowie gazowe", who: "PGNiG / PSG" },
  { num: "993", what: "Pogotowie ciepłownicze", who: "Lokalne MPEC" },
  { num: "994", what: "Pogotowie wodno-kanalizacyjne", who: "Lokalne MPWiK" },
  { num: "984", what: "Centrum Powiadamiania Ratunkowego (krzyzysowe)", who: "RCB" },
  { num: "987", what: "WOPR — Wodne Ochotnicze Pogotowie Ratunkowe", who: "Pomoc nad wodą" },
  { num: "986", what: "Straż Miejska", who: "Miejskie/gminne" },
];

const INFOLINIE_SOCJALNE = [
  { num: "116 111", what: "Telefon Zaufania dla Dzieci i Młodzieży", who: "Fundacja Dajemy Dzieciom Siłę", url: "https://116111.pl" },
  { num: "800 12 12 12", what: "Dziecięcy Telefon Zaufania RPD", who: "Rzecznik Praw Dziecka", url: "https://brpd.gov.pl" },
  { num: "800 120 002", what: "Niebieska Linia (przemoc domowa)", who: "PARPA", url: "https://niebieskalinia.pl" },
  { num: "116 123", what: "Telefon zaufania dla dorosłych w kryzysie", who: "ITAKA", url: "https://liniawsparcia.pl" },
  { num: "22 484 88 01", what: "Antydepresyjny Telefon Zaufania", who: "Fundacja ITAKA", url: "https://stopdepresji.pl" },
  { num: "800 100 100", what: "Telefon dla rodziców i nauczycieli (problemy dzieci)", who: "Dajemy Dzieciom Siłę", url: "https://800100100.pl" },
  { num: "800 70 22 22", what: "Centrum Wsparcia dla Osób Dorosłych w Kryzysie Psychicznym", who: "ITAKA / NFZ", url: "https://liniawsparcia.pl" },
  { num: "22 654 70 70", what: "Antyterrorystyczna linia ABW", who: "Agencja Bezpieczeństwa Wewnętrznego", url: "https://www.abw.gov.pl" },
];

const INSTYTUCJE_CENTRALNE = [
  {
    name: "ZUS — Zakład Ubezpieczeń Społecznych",
    address: "ul. Szamocka 3, 5; 01-748 Warszawa",
    phone: "22 560 16 00",
    callcenter: "22 560 16 00 (Centrum Obsługi Telefonicznej)",
    email: "cot@zus.pl",
    epuap: "/ZUS/SkrytkaESP",
    web: "https://www.zus.pl",
    bip: "https://bip.zus.pl",
  },
  {
    name: "KAS — Krajowa Administracja Skarbowa (Ministerstwo Finansów)",
    address: "ul. Świętokrzyska 12; 00-916 Warszawa",
    phone: "801 055 055 (KIS)",
    callcenter: "22 330 03 30 (Krajowa Informacja Skarbowa)",
    email: "kontakt@kis.gov.pl",
    epuap: "/MFINANSE/SkrytkaESP",
    web: "https://www.podatki.gov.pl",
    bip: "https://www.gov.pl/web/finanse",
  },
  {
    name: "NFZ — Narodowy Fundusz Zdrowia",
    address: "ul. Rakowiecka 26/30; 02-528 Warszawa",
    phone: "800 392 976",
    callcenter: "800 392 976 (Telefoniczna Informacja Pacjenta TIP)",
    email: "infolinia@nfz.gov.pl",
    epuap: "/NFZ/SkrytkaESP",
    web: "https://www.nfz.gov.pl",
    bip: "https://www.nfz.gov.pl/bip",
  },
  {
    name: "NIK — Najwyższa Izba Kontroli",
    address: "ul. Filtrowa 57; 02-056 Warszawa",
    phone: "22 444 50 00",
    callcenter: "22 444 56 00 (sekretariat)",
    email: "nik@nik.gov.pl",
    epuap: "/NIK/SkrytkaESP",
    web: "https://www.nik.gov.pl",
    bip: "https://www.nik.gov.pl/bip",
  },
  {
    name: "RPO — Rzecznik Praw Obywatelskich",
    address: "Al. Solidarności 77; 00-090 Warszawa",
    phone: "22 55 17 700",
    callcenter: "800 676 676 (bezpłatna infolinia)",
    email: "biurorzecznika@brpo.gov.pl",
    epuap: "/RPO/SkrytkaESP",
    web: "https://bip.brpo.gov.pl",
    bip: "https://bip.brpo.gov.pl",
  },
  {
    name: "UODO — Urząd Ochrony Danych Osobowych",
    address: "ul. Stawki 2; 00-193 Warszawa",
    phone: "22 531 03 00",
    callcenter: "606 950 000 (infolinia)",
    email: "kancelaria@uodo.gov.pl",
    epuap: "/UODO/SkrytkaESP",
    web: "https://uodo.gov.pl",
    bip: "https://uodo.gov.pl/pl/bip",
  },
  {
    name: "UOKiK — Urząd Ochrony Konkurencji i Konsumentów",
    address: "pl. Powstańców Warszawy 1; 00-950 Warszawa",
    phone: "22 55 60 800",
    callcenter: "801 440 220 (Konsumenckie Centrum E-porad)",
    email: "kontakt@uokik.gov.pl",
    epuap: "/uokik/SkrytkaESP",
    web: "https://uokik.gov.pl",
    bip: "https://uokik.gov.pl/bip",
  },
  {
    name: "KNF — Komisja Nadzoru Finansowego",
    address: "ul. Piękna 20; 00-549 Warszawa",
    phone: "22 262 50 00",
    callcenter: "22 262 58 00 (Punkt Informacyjny)",
    email: "knf@knf.gov.pl",
    epuap: "/2447v7r6me/SkrytkaESP",
    web: "https://www.knf.gov.pl",
    bip: "https://www.knf.gov.pl/bip",
  },
  {
    name: "IPN — Instytut Pamięci Narodowej",
    address: "ul. Postępu 18; 02-676 Warszawa",
    phone: "22 581 88 24",
    callcenter: "22 581 86 00 (sekretariat)",
    email: "sekretariat.ipn@ipn.gov.pl",
    epuap: "/IPN/SkrytkaESP",
    web: "https://ipn.gov.pl",
    bip: "https://ipn.gov.pl/bip",
  },
  {
    name: "KRRiT — Krajowa Rada Radiofonii i Telewizji",
    address: "Skwer kard. Stefana Wyszyńskiego 9; 01-015 Warszawa",
    phone: "22 597 30 00",
    callcenter: "22 597 30 49 (sekretariat)",
    email: "skargi@krrit.gov.pl",
    epuap: "/KRRiT/SkrytkaESP",
    web: "https://www.gov.pl/web/krrit",
    bip: "https://www.gov.pl/web/krrit",
  },
  {
    name: "GUS — Główny Urząd Statystyczny",
    address: "al. Niepodległości 208; 00-925 Warszawa",
    phone: "22 608 30 00",
    callcenter: "22 449 40 00 (Centrum Informacji Statystycznej)",
    email: "informator@stat.gov.pl",
    epuap: "/GUS/SkrytkaESP",
    web: "https://stat.gov.pl",
    bip: "https://bip.stat.gov.pl",
  },
  {
    name: "PIP — Państwowa Inspekcja Pracy",
    address: "ul. Barska 28/30; 02-315 Warszawa",
    phone: "22 391 82 15",
    callcenter: "801 002 005 (Centrum Poradnictwa PIP)",
    email: "kancelaria@gip.pip.gov.pl",
    epuap: "/PIP/SkrytkaESP",
    web: "https://www.pip.gov.pl",
    bip: "https://www.pip.gov.pl/pl/bip",
  },
  {
    name: "GIIF — Generalny Inspektor Informacji Finansowej",
    address: "ul. Świętokrzyska 12; 00-916 Warszawa",
    phone: "22 694 30 32",
    callcenter: "—",
    email: "giif@mf.gov.pl",
    epuap: "/MFINANSE/SkrytkaESP",
    web: "https://www.gov.pl/web/finanse/giif",
    bip: "https://www.gov.pl/web/finanse",
  },
];

const RZAD_MINISTERSTWA = [
  { name: "Kancelaria Prezesa Rady Ministrów (KPRM)", address: "Al. Ujazdowskie 1/3; 00-583 Warszawa", phone: "22 694 60 00", email: "kontakt@kprm.gov.pl", epuap: "/KPRM/SkrytkaESP", web: "https://www.gov.pl/web/premier" },
  { name: "Ministerstwo Spraw Wewnętrznych i Administracji", address: "ul. Stefana Batorego 5; 02-591 Warszawa", phone: "22 60 116 23", email: "kancelaria@mswia.gov.pl", epuap: "/MSWIA/SkrytkaESP", web: "https://www.gov.pl/web/mswia" },
  { name: "Ministerstwo Spraw Zagranicznych", address: "Al. Szucha 23; 00-580 Warszawa", phone: "22 523 90 00", email: "sekretariat.minister@msz.gov.pl", epuap: "/MSZ/SkrytkaESP", web: "https://www.gov.pl/web/dyplomacja" },
  { name: "Ministerstwo Obrony Narodowej", address: "Al. Niepodległości 218; 00-911 Warszawa", phone: "22 628 02 31", email: "kontakt@mon.gov.pl", epuap: "/MON/SkrytkaESP", web: "https://www.gov.pl/web/obrona-narodowa" },
  { name: "Ministerstwo Finansów", address: "ul. Świętokrzyska 12; 00-916 Warszawa", phone: "22 694 55 55", email: "kancelaria@mf.gov.pl", epuap: "/MFINANSE/SkrytkaESP", web: "https://www.gov.pl/web/finanse" },
  { name: "Ministerstwo Sprawiedliwości", address: "Al. Ujazdowskie 11; 00-950 Warszawa", phone: "22 52 12 444", email: "kontakt@ms.gov.pl", epuap: "/Ministerstwo_Sprawiedliwosci/SkrytkaESP", web: "https://www.gov.pl/web/sprawiedliwosc" },
  { name: "Ministerstwo Zdrowia", address: "ul. Miodowa 15; 00-952 Warszawa", phone: "22 530 03 00", email: "kancelaria@mz.gov.pl", epuap: "/MZ/SkrytkaESP", web: "https://www.gov.pl/web/zdrowie" },
  { name: "Ministerstwo Edukacji Narodowej", address: "Al. Szucha 25; 00-918 Warszawa", phone: "22 34 74 100", email: "kancelaria@men.gov.pl", epuap: "/MEN/SkrytkaESP", web: "https://www.gov.pl/web/edukacja" },
  { name: "Ministerstwo Rodziny, Pracy i Polityki Społecznej", address: "ul. Nowogrodzka 1/3/5; 00-513 Warszawa", phone: "22 661 87 60", email: "info@mrips.gov.pl", epuap: "/MRiPS/SkrytkaESP", web: "https://www.gov.pl/web/rodzina" },
  { name: "Ministerstwo Klimatu i Środowiska", address: "ul. Wawelska 52/54; 00-922 Warszawa", phone: "22 36 92 000", email: "info@mos.gov.pl", epuap: "/MKiS/SkrytkaESP", web: "https://www.gov.pl/web/klimat" },
  { name: "Ministerstwo Aktywów Państwowych", address: "ul. Krucza 36/Wspólna 6; 00-522 Warszawa", phone: "22 695 80 00", email: "kontakt@map.gov.pl", epuap: "/MAP/SkrytkaESP", web: "https://www.gov.pl/web/aktywa-panstwowe" },
  { name: "Ministerstwo Cyfryzacji", address: "ul. Królewska 27; 00-060 Warszawa", phone: "22 245 59 00", email: "sekretariat.dt@mc.gov.pl", epuap: "/MC/SkrytkaESP", web: "https://www.gov.pl/web/cyfryzacja" },
  { name: "Ministerstwo Rozwoju i Technologii", address: "Plac Trzech Krzyży 3/5; 00-507 Warszawa", phone: "22 411 95 88", email: "kancelaria@mrit.gov.pl", epuap: "/MRiT/SkrytkaESP", web: "https://www.gov.pl/web/rozwoj-technologia" },
  { name: "Ministerstwo Infrastruktury", address: "ul. Tytusa Chałubińskiego 4/6; 00-928 Warszawa", phone: "22 630 10 00", email: "kancelaria@mi.gov.pl", epuap: "/MI/SkrytkaESP", web: "https://www.gov.pl/web/infrastruktura" },
  { name: "Ministerstwo Rolnictwa i Rozwoju Wsi", address: "ul. Wspólna 30; 00-930 Warszawa", phone: "22 250 03 27", email: "kancelaria@minrol.gov.pl", epuap: "/MRiRW/SkrytkaESP", web: "https://www.gov.pl/web/rolnictwo" },
  { name: "Ministerstwo Kultury i Dziedzictwa Narodowego", address: "ul. Krakowskie Przedmieście 15/17; 00-071 Warszawa", phone: "22 421 02 00", email: "minister@kultura.gov.pl", epuap: "/MKiDN/SkrytkaESP", web: "https://www.gov.pl/web/kultura" },
  { name: "Ministerstwo Sportu i Turystyki", address: "ul. Senatorska 14; 00-082 Warszawa", phone: "22 244 32 00", email: "minister@msit.gov.pl", epuap: "/MSiT/SkrytkaESP", web: "https://www.gov.pl/web/sport" },
  { name: "Ministerstwo Nauki i Szkolnictwa Wyższego", address: "ul. Wspólna 1/3; 00-529 Warszawa", phone: "22 50 17 008", email: "sekretariat.dt@nauka.gov.pl", epuap: "/MNiSW/SkrytkaESP", web: "https://www.gov.pl/web/nauka" },
  { name: "Ministerstwo Funduszy i Polityki Regionalnej", address: "ul. Wspólna 2/4; 00-926 Warszawa", phone: "22 273 70 00", email: "kancelaria@mfipr.gov.pl", epuap: "/MFiPR/SkrytkaESP", web: "https://www.gov.pl/web/fundusze-regiony" },
  { name: "Ministerstwo Przemysłu", address: "ul. Krucza 36/Wspólna 6; 00-522 Warszawa", phone: "22 695 80 00", email: "kontakt@mp.gov.pl", epuap: "/MP/SkrytkaESP", web: "https://www.gov.pl/web/przemysl" },
];

const URZEDY_WOJEWODZKIE = [
  { voivode: "dolnośląski", address: "pl. Powstańców Warszawy 1; 50-153 Wrocław", phone: "71 340 60 00", email: "wuwr@duw.pl", epuap: "/duw/SkrytkaESP", web: "https://www.duw.pl" },
  { voivode: "kujawsko-pomorski", address: "ul. Jagiellońska 3; 85-950 Bydgoszcz", phone: "52 349 7 200", email: "kancelaria@bydgoszcz.uw.gov.pl", epuap: "/kpuw/SkrytkaESP", web: "https://www.gov.pl/web/uw-kujawsko-pomorski" },
  { voivode: "lubelski", address: "ul. Spokojna 4; 20-914 Lublin", phone: "81 74 24 100", email: "kancelaria@lublin.uw.gov.pl", epuap: "/LUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-lubelski" },
  { voivode: "lubuski", address: "ul. Jagiellończyka 8; 66-400 Gorzów Wielkopolski", phone: "95 711 56 86", email: "kancelaria@lubuskie.uw.gov.pl", epuap: "/LUW_GORZOW/SkrytkaESP", web: "https://www.gov.pl/web/uw-lubuski" },
  { voivode: "łódzki", address: "ul. Piotrkowska 104; 90-926 Łódź", phone: "42 664 10 00", email: "kancelaria@lodz.uw.gov.pl", epuap: "/LUW_LODZ/SkrytkaESP", web: "https://www.gov.pl/web/uw-lodzki" },
  { voivode: "małopolski", address: "ul. Basztowa 22; 31-156 Kraków", phone: "12 39 21 200", email: "wuw@malopolska.uw.gov.pl", epuap: "/MUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-malopolski" },
  { voivode: "mazowiecki", address: "pl. Bankowy 3/5; 00-950 Warszawa", phone: "22 695 60 00", email: "info@mazowieckie.pl", epuap: "/mazowieckieuw/SkrytkaESP", web: "https://www.gov.pl/web/uw-mazowiecki" },
  { voivode: "opolski", address: "ul. Piastowska 14; 45-082 Opole", phone: "77 45 24 125", email: "bok@opole.uw.gov.pl", epuap: "/OPUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-opolski" },
  { voivode: "podkarpacki", address: "ul. Grunwaldzka 15; 35-959 Rzeszów", phone: "17 867 12 11", email: "kancelaria@rzeszow.uw.gov.pl", epuap: "/PUWR/SkrytkaESP", web: "https://rzeszow.uw.gov.pl" },
  { voivode: "podlaski", address: "ul. Mickiewicza 3; 15-213 Białystok", phone: "85 743 93 35", email: "bok@bialystok.uw.gov.pl", epuap: "/PUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-podlaski" },
  { voivode: "pomorski", address: "ul. Okopowa 21/27; 80-810 Gdańsk", phone: "58 30 77 500", email: "biuro@gdansk.uw.gov.pl", epuap: "/g82eob67se/SkrytkaESP", web: "https://www.gov.pl/web/uw-pomorski" },
  { voivode: "śląski", address: "ul. Jagiellońska 25; 40-032 Katowice", phone: "32 20 77 777", email: "kancelaria@katowice.uw.gov.pl", epuap: "/SLAUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-slaski" },
  { voivode: "świętokrzyski", address: "al. IX Wieków Kielc 3; 25-516 Kielce", phone: "41 342 11 11", email: "wuw@kielce.uw.gov.pl", epuap: "/SUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-swietokrzyski" },
  { voivode: "warmińsko-mazurski", address: "Al. Marszałka Piłsudskiego 7/9; 10-575 Olsztyn", phone: "89 523 22 00", email: "wuw@olsztyn.uw.gov.pl", epuap: "/WMUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-warminsko-mazurski" },
  { voivode: "wielkopolski", address: "al. Niepodległości 16/18; 61-713 Poznań", phone: "61 854 10 00", email: "kancelaria@poznan.uw.gov.pl", epuap: "/WUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-wielkopolski" },
  { voivode: "zachodniopomorski", address: "Wały Chrobrego 4; 70-502 Szczecin", phone: "91 43 03 333", email: "kancelaria@szczecin.uw.gov.pl", epuap: "/ZUW/SkrytkaESP", web: "https://www.gov.pl/web/uw-zachodniopomorski" },
];

const PREZYDENCI_MIAST = [
  { city: "Warszawa", mayor: "Rafał Trzaskowski", address: "Pl. Bankowy 3/5; 00-950 Warszawa", phone: "19 115 (call center)", email: "warszawa19115@um.warszawa.pl", web: "https://um.warszawa.pl" },
  { city: "Kraków", mayor: "Aleksander Miszalski", address: "pl. Wszystkich Świętych 3-4; 31-004 Kraków", phone: "12 616 12 00", email: "prezydent@um.krakow.pl", web: "https://www.krakow.pl" },
  { city: "Łódź", mayor: "Hanna Zdanowska", address: "ul. Piotrkowska 104; 90-926 Łódź", phone: "42 638 40 00", email: "lckm@uml.lodz.pl", web: "https://uml.lodz.pl" },
  { city: "Wrocław", mayor: "Jacek Sutryk", address: "pl. Nowy Targ 1-8; 50-141 Wrocław", phone: "71 777 77 77", email: "kum@um.wroc.pl", web: "https://www.wroclaw.pl" },
  { city: "Poznań", mayor: "Jacek Jaśkowiak", address: "pl. Kolegiacki 17; 61-841 Poznań", phone: "61 646 33 44", email: "prezydent@um.poznan.pl", web: "https://www.poznan.pl" },
  { city: "Gdańsk", mayor: "Aleksandra Dulkiewicz", address: "ul. Nowe Ogrody 8/12; 80-803 Gdańsk", phone: "58 323 60 00", email: "umg@gdansk.gda.pl", web: "https://www.gdansk.pl" },
  { city: "Szczecin", mayor: "Piotr Krzystek", address: "pl. Armii Krajowej 1; 70-456 Szczecin", phone: "91 42 45 000", email: "boi@um.szczecin.pl", web: "https://www.szczecin.eu" },
  { city: "Bydgoszcz", mayor: "Rafał Bruski", address: "ul. Jezuicka 1; 85-102 Bydgoszcz", phone: "52 58 58 913", email: "info@um.bydgoszcz.pl", web: "https://www.bydgoszcz.pl" },
  { city: "Lublin", mayor: "Krzysztof Żuk", address: "pl. Króla Władysława Łokietka 1; 20-109 Lublin", phone: "81 466 10 00", email: "prezydent@lublin.eu", web: "https://lublin.eu" },
  { city: "Białystok", mayor: "Tadeusz Truskolaski", address: "ul. Słonimska 1; 15-950 Białystok", phone: "85 879 79 79", email: "prezydent@um.bialystok.pl", web: "https://www.bialystok.pl" },
  { city: "Katowice", mayor: "Marcin Krupa", address: "ul. Młyńska 4; 40-098 Katowice", phone: "32 25 93 222", email: "urzad_miasta@katowice.eu", web: "https://www.katowice.eu" },
  { city: "Gdynia", mayor: "Aleksandra Kosiorek", address: "Al. Marszałka Piłsudskiego 52/54; 81-382 Gdynia", phone: "58 626 26 26", email: "kontakt@gdynia.pl", web: "https://www.gdynia.pl" },
  { city: "Częstochowa", mayor: "Krzysztof Matyjaszczyk", address: "ul. Śląska 11/13; 42-217 Częstochowa", phone: "34 370 71 00", email: "info@czestochowa.um.gov.pl", web: "https://www.czestochowa.pl" },
  { city: "Radom", mayor: "Radosław Witkowski", address: "ul. Kilińskiego 30; 26-600 Radom", phone: "48 36 20 200", email: "info@umradom.pl", web: "https://www.radom.pl" },
  { city: "Sosnowiec", mayor: "Arkadiusz Chęciński", address: "al. Zwycięstwa 20; 41-200 Sosnowiec", phone: "32 296 06 00", email: "um@um.sosnowiec.pl", web: "https://www.sosnowiec.pl" },
  { city: "Toruń", mayor: "Paweł Gulewski", address: "ul. Wały Generała Sikorskiego 8; 87-100 Toruń", phone: "56 611 88 88", email: "ratusz@um.torun.pl", web: "https://www.torun.pl" },
  { city: "Kielce", mayor: "Agata Wojda", address: "Rynek 1; 25-303 Kielce", phone: "41 36 76 000", email: "biuroprezydenta@um.kielce.pl", web: "https://www.kielce.eu" },
  { city: "Rzeszów", mayor: "Konrad Fijołek", address: "Rynek 1; 35-064 Rzeszów", phone: "17 875 47 00", email: "urzad@erzeszow.pl", web: "https://erzeszow.pl" },
  { city: "Gliwice", mayor: "Adam Neumann", address: "ul. Zwycięstwa 21; 44-100 Gliwice", phone: "32 238 54 00", email: "boi@um.gliwice.pl", web: "https://www.gliwice.eu" },
  { city: "Olsztyn", mayor: "Robert Szewczyk", address: "pl. Jana Pawła II 1; 10-101 Olsztyn", phone: "89 535 32 32", email: "umolsztyn@olsztyn.eu", web: "https://www.olsztyn.eu" },
];

// ─── Templates ────────────────────────────────────────────────────────────

export const contactsTemplates: SkillTemplate[] = [
  {
    meta: {
      slug: "kontakty-poslowie-pelna-lista",
      name: "poland-vault-kontakty-poslowie-pelna-lista",
      description: "PEŁNA lista 460 posłów Sejmu RP X kadencji — imię, klub, okręg, województwo, email, frekwencja, pensje. Live z sejm.gov.pl API.",
      group: "Sejm",
      extraTags: ["seo:kontakty-poslowie", "aeo:mp-contact-list", "kontakt-publiczny"],
      mcp: "strajkpolski/get_polityk",
      embed: "https://strajkpolski.org/embed/posel/{id}",
    },
    query: async (sb) => {
      const { data, count } = await sb
        .from("sejm_mp")
        .select("id, first_name, last_name, second_name, club, district_name, district_num, voivodeship, email, attendance_pct, votings_total, votings_attended, monthly_salary_pln, monthly_diet_pln, profession, education_level", { count: "exact" })
        .eq("active", true)
        .eq("term", 10)
        .order("club", { ascending: true })
        .order("last_name", { ascending: true })
        .limit(500);
      return { rows: data ?? [], count };
    },
    body: ({ rows, count }) => {
      const list = (rows as Array<{ id: number; first_name: string; last_name: string; second_name: string; club: string; district_name: string; district_num: number; voivodeship: string; email: string; attendance_pct: string; monthly_salary_pln: string; monthly_diet_pln: string; profession: string }>) ?? [];
      const byClub: Record<string, typeof list> = {};
      for (const mp of list) {
        const club = mp.club || "(niezrzeszony)";
        (byClub[club] ||= []).push(mp);
      }
      const clubOrder = Object.keys(byClub).sort((a, b) => byClub[b].length - byClub[a].length);
      const sections = clubOrder.map((club) => {
        const mps = byClub[club];
        const rows = mps
          .map(
            (m) =>
              `| ${m.last_name} ${m.first_name}${m.second_name ? ` ${m.second_name}` : ""} | ${m.district_num} ${m.district_name} (${m.voivodeship}) | [${m.email}](mailto:${m.email}) | ${m.attendance_pct || "—"}% | ${m.profession || "—"} |`
          )
          .join("\n");
        return `### ${club} (${mps.length} posłów)\n\n| Imię i nazwisko | Okręg | Email | Frekwencja | Profesja |\n|---|---|---|---|---|\n${rows}`;
      }).join("\n\n");
      const sample = list[0];
      return `# Posłowie Sejmu RP — PEŁNA lista kontaktów (X kadencja)

**${count ?? list.length} posłów** Sejmu RP. Wszyscy aktywni (\`active=true\`). Live z \`sejm.gov.pl\` API przez StrajkPolski. Codzienna aktualizacja 04:00 UTC.

**Pensja poselska** (live snapshot): ${sample ? `${fmt.format(Number(sample.monthly_salary_pln))} PLN brutto/mies. + ${fmt.format(Number(sample.monthly_diet_pln))} PLN dieta` : "—"}.

> 📧 **Wszystkie maile są publiczne**, oficjalne z domeny \`@sejm.pl\`. Bezpośrednio z BIP Sejmu.
> 📞 Telefon do posła: **22 694 25 00** (centrala Sejmu) → poproś o połączenie z biurem konkretnego posła.
> 🏛️ Korespondencja papierowa: **ul. Wiejska 4/6/8, 00-902 Warszawa**.

## Sumaryczne statystyki

- **Aktywnych posłów X kadencji:** ${count ?? list.length}
- **Klubów parlamentarnych:** ${Object.keys(byClub).length}
- **Średnia frekwencja:** ${list.length ? (list.reduce((s, m) => s + Number(m.attendance_pct || 0), 0) / list.length).toFixed(2) : "—"}%

## Pełna lista posłów wg klubów

${sections}

## AI prompt templates

${promptBlock([
  "Wymień wszystkich posłów PiS z województwa małopolskiego z mailami.",
  "Pokaż 10 posłów z najwyższą frekwencją + ich maile.",
  "Daj mi maile wszystkich posłów Lewicy do napisania petycji.",
  "Znajdź posłów którzy przed wyborami byli prawnikami i głosowali za usunięciem immunitetu.",
])}

## Źródła

- [Sejm RP API — posłowie](${sources.sejm}/MP)
- [BIP Sejmu](https://www.sejm.gov.pl/bip)
- [Pensje poselskie — uposażenie + dieta (ustawowa)](https://isap.sejm.gov.pl)
- [StrajkPolski — karta posła](${sources.sp}/posel)

## Embed

\`\`\`html
<iframe src="https://strajkpolski.org/embed/posel/{id}" width="100%" height="400"></iframe>
\`\`\`
`;
    },
  },

  {
    meta: {
      slug: "numery-alarmowe-sluzby",
      name: "poland-vault-numery-alarmowe-sluzby",
      description: "Numery alarmowe i infolinie służb w Polsce — 112/999/998/997 + alarmy energetyczne/gazowe/wodne + infolinie wsparcia psychicznego.",
      group: "Tematy",
      extraTags: ["seo:numery-alarmowe", "aeo:polish-emergency-numbers", "ratownictwo"],
    },
    query: async () => ({}),
    body: () => {
      const alarms = NUMERY_ALARMOWE.map(
        (a) => `| **${a.num}** | ${a.what} | ${a.who} |`
      ).join("\n");
      const infos = INFOLINIE_SOCJALNE.map(
        (i) => `| **${i.num}** | ${i.what} | ${i.who} | ${i.url ? `[strona](${i.url})` : "—"} |`
      ).join("\n");
      return `# Numery alarmowe i infolinie — Polska — Fact Pack

Pełna lista oficjalnych numerów ratunkowych Polski + infolinie wsparcia psychicznego. **Wszystkie numery są bezpłatne lub w cenie standardowego połączenia.**

## 🚨 Numery alarmowe — służby

| Numer | Czym jest | Operator |
|---|---|---|
${alarms}

> **W razie zagrożenia życia:** dzwoń **112** (działa też z zablokowanej karty SIM).

## 💚 Infolinie wsparcia psychicznego / kryzysowe

| Numer | Czym jest | Organizator | Strona |
|---|---|---|---|
${infos}

> **Telefon Zaufania dla Dzieci 116 111** — bezpłatny, czynny codziennie 12:00–02:00.
> **Niebieska Linia 800 120 002** (przemoc domowa) — bezpłatna, czynna całą dobę.
> **Antydepresyjny Telefon Zaufania 22 484 88 01** — wtorek/środa 17:00–20:00.

## AI prompt templates

${promptBlock([
  "Jaki numer wybrać przy pożarze w Polsce?",
  "Gdzie zgłosić przemoc domową w Polsce (bezpłatny telefon)?",
  "Czym różni się 112 od 999/998/997 w Polsce?",
])}

## Źródła

- [RCB — Rządowe Centrum Bezpieczeństwa](https://www.gov.pl/web/rcb)
- [112.gov.pl — Centra Powiadamiania Ratunkowego](https://112.gov.pl)
- [Niebieska Linia](https://niebieskalinia.pl)
- [116 111 — Telefon Zaufania dla Dzieci](https://116111.pl)
`;
    },
  },

  {
    meta: {
      slug: "kontakty-rzad-pelne",
      name: "poland-vault-kontakty-rzad-pelne",
      description: "Pełne dane kontaktowe Kancelarii Premiera + 20 ministerstw — adresy, telefony, emaile, ePUAP, BIP.",
      group: "Rząd",
      extraTags: ["seo:kontakty-rzad", "aeo:polish-cabinet-contacts", "kontakt-publiczny"],
    },
    query: async () => ({}),
    body: () => {
      const list = RZAD_MINISTERSTWA
        .map((m) => `### ${m.name}

- **Adres:** ${m.address}
- **Telefon:** ${m.phone}
- **Email:** [${m.email}](mailto:${m.email})
- **ePUAP:** \`${m.epuap}\`
- **Web:** ${m.web}
`)
        .join("\n");
      return `# Rząd RP — pełne kontakty (KPRM + ministerstwa)

**${RZAD_MINISTERSTWA.length} instytucji centralnej władzy wykonawczej**, każda z oficjalnym kontaktem.

> 📧 **Korespondencja elektroniczna ZGODNIE Z PRAWEM:** używaj **ePUAP** (skrytka ESP) zamiast emaila — pisma trafiają od razu do KRPM. Email = nieformalny kontakt.
> 🏛️ **Pisma papierowe:** adresy jak niżej, prefiks ZAW. (zwrotne potwierdzenie odbioru).

${list}

## AI prompt templates

${promptBlock([
  "Jaki ePUAP do Ministerstwa Cyfryzacji aby zgłosić wniosek?",
  "Email Ministerstwa Zdrowia do pytań o NFZ.",
  "Adres KPRM do skierowania petycji do premiera.",
])}

## Źródła

- [gov.pl/web/premier — Kancelaria Prezesa Rady Ministrów](${sources.govPL}/web/premier)
- [BIP wszystkich ministerstw — wykaz](https://www.bip.gov.pl)
- [ePUAP — Elektroniczna Platforma Usług Administracji Publicznej](${sources.epuap})
`;
    },
  },

  {
    meta: {
      slug: "kontakty-instytucje-centralne",
      name: "poland-vault-kontakty-instytucje-centralne",
      description: "ZUS, KAS, NFZ, NIK, RPO, UODO, UOKiK, KNF, IPN, KRRiT, GUS, PIP, GIIF — kompletne kontakty (adres/telefon/email/ePUAP/BIP).",
      group: "Rząd",
      extraTags: ["seo:instytucje-centralne", "aeo:central-agencies-poland", "kontakt-publiczny"],
    },
    query: async () => ({}),
    body: () => {
      const list = INSTYTUCJE_CENTRALNE.map((i) => `### ${i.name}

- **Adres:** ${i.address}
- **Telefon:** ${i.phone}
- **Call center / infolinia:** ${i.callcenter}
- **Email:** [${i.email}](mailto:${i.email})
- **ePUAP:** \`${i.epuap}\`
- **Web:** ${i.web}
- **BIP:** ${i.bip}
`).join("\n");
      return `# Instytucje centralne RP — pełne kontakty

**${INSTYTUCJE_CENTRALNE.length} kluczowych agencji** ZUS, KAS, NFZ, NIK, RPO, UODO, UOKiK, KNF, IPN, KRRiT, GUS, PIP, GIIF.

> 📞 Numery 800 są bezpłatne. **801** to opłata jak za połączenie lokalne.
> 📧 ePUAP > email > telefon — gdy potrzebujesz potwierdzenia dostarczenia.
> ⚖️ Reklamacje/skargi do urzędu CENTRALNEGO trafiają poprzez ePUAP do skrytki ESP.

${list}

## AI prompt templates

${promptBlock([
  "Gdzie zgłosić naruszenie RODO — adres + telefon UODO?",
  "Email do RPO żeby zgłosić nieprawidłowości urzędu.",
  "ePUAP do ZUS aby złożyć skargę elektronicznie.",
])}

## Źródła

- [BIP — Biuletyn Informacji Publicznej](${sources.bip})
- [ePUAP — wszystkie skrytki](${sources.epuap})
- [gov.pl — instytucje rządowe](${sources.govPL})
`;
    },
  },

  {
    meta: {
      slug: "urzedy-wojewodzkie",
      name: "poland-vault-urzedy-wojewodzkie",
      description: "16 Urzędów Wojewódzkich RP — adresy, telefony, emaile, ePUAP. Pełna mapa.",
      group: "Rząd",
      extraTags: ["seo:urzedy-wojewodzkie", "aeo:voivodeship-offices", "kontakt-publiczny"],
    },
    query: async () => ({}),
    body: () => {
      const list = URZEDY_WOJEWODZKIE.map((u) => `### Województwo ${u.voivode}

- **Adres:** ${u.address}
- **Telefon:** ${u.phone}
- **Email:** [${u.email}](mailto:${u.email})
- **ePUAP:** \`${u.epuap}\`
- **Web:** ${u.web}
`).join("\n");
      return `# Urzędy Wojewódzkie RP — pełne kontakty

**16 województw**, **16 Urzędów Wojewódzkich**. Każdy jest organem administracji rządowej w terenie — wydaje decyzje administracyjne, prowadzi rejestry, koordynuje służby wojewódzkie.

> 📍 **Marszałek województwa** = organ administracji samorządowej (sejmik wojewódzki, urząd marszałkowski) — różny od **wojewody** (rząd).
> 🏛️ **Wojewoda** = przedstawiciel rządu w województwie (Urząd Wojewódzki).
> 📋 **Skargi i wnioski** — wszyscy wojewodowie mają obowiązek przyjąć w trybie KPA.

${list}

## AI prompt templates

${promptBlock([
  "Telefon do Mazowieckiego Urzędu Wojewódzkiego dla cudzoziemców.",
  "Email do UW śląskiego do skargi na decyzję starosty.",
  "ePUAP wojewody małopolskiego.",
])}

## Źródła

- [Wykaz Urzędów Wojewódzkich — gov.pl](${sources.govPL}/web/uw)
- [Ustawa o wojewodzie i administracji rządowej w województwie](https://isap.sejm.gov.pl)
`;
    },
  },

  {
    meta: {
      slug: "prezydenci-miast",
      name: "poland-vault-prezydenci-miast",
      description: "20 największych miast Polski — prezydenci, adresy, telefony, emaile urzędów.",
      group: "Rząd",
      extraTags: ["seo:prezydenci-miast", "aeo:polish-mayors", "kontakt-publiczny"],
    },
    query: async () => ({}),
    body: () => {
      const list = PREZYDENCI_MIAST.map((m) => `### ${m.city} — Prezydent ${m.mayor}

- **Adres urzędu:** ${m.address}
- **Telefon:** ${m.phone}
- **Email:** [${m.email}](mailto:${m.email})
- **Web:** ${m.web}
`).join("\n");
      return `# Prezydenci 20 największych miast Polski — Fact Pack

**Top 20 miast** (>~150k mieszkańców) z prezydentem, adresem, telefonem, emailem. Stan na 2026-06-07.

> 🗳️ **Prezydenci** = wybierani w wyborach bezpośrednich (kadencja 5 lat od 2024).
> 📞 Większość urzędów ma **call center** — łatwiej niż dzwonić do sekretariatu.

${list}

## AI prompt templates

${promptBlock([
  "Email Rafała Trzaskowskiego do napisania skargi na ZTM.",
  "Telefon do urzędu Krakowa dla sprawy mieszkaniowej.",
  "Pełna lista prezydentów miast z mailami do rozesłania petycji.",
])}

## Źródła

- [Wykaz miast prezydenckich — Wikipedia](https://pl.wikipedia.org/wiki/Prezydent_miasta)
- [BIP poszczególnych urzędów miast — gov.pl/web/bip](${sources.bip})
- [Najnowsze wyniki wyborów samorządowych 2024 — PKW](https://wybory.gov.pl)
`;
    },
  },

  {
    meta: {
      slug: "budzet-pelne-pozycje",
      name: "poland-vault-budzet-pelne-pozycje",
      description: "PEŁNA tabela budżetu Polski — wszystkie pozycje live z budget_data StrajkPolski (mirror gov.pl / MF).",
      group: "Finanse",
      extraTags: ["seo:budzet-pelne-pozycje", "aeo:polish-full-budget", "finanse-publiczne"],
    },
    query: async (sb) => {
      const { data, count } = await sb
        .from("budget_data")
        .select("id, name, category, value, unit, source, source_url, last_verified", { count: "exact" })
        .order("value", { ascending: false });
      return { rows: data ?? [], count };
    },
    body: ({ rows, count }) => {
      const list = (rows as Array<{ id: string; name: string; category: string; value: number; unit: string; source: string; source_url: string; last_verified: string }>) ?? [];
      const byCat: Record<string, typeof list> = {};
      for (const r of list) (byCat[r.category || "inne"] ||= []).push(r);
      const catOrder = Object.keys(byCat).sort((a, b) => byCat[b].length - byCat[a].length);
      const sections = catOrder.map((cat) => {
        const items = byCat[cat]
          .map((r) => `| ${r.name} | ${fmt.format(r.value)} ${r.unit} | [${r.source}](${r.source_url}) |`)
          .join("\n");
        return `### Kategoria: \`${cat}\` (${byCat[cat].length} pozycji)\n\n| Pozycja | Wartość | Źródło |\n|---|---|---|\n${items}`;
      }).join("\n\n");
      return `# Budżet Polski — PEŁNE pozycje — Fact Pack

**${count ?? list.length} pozycji** z live mirror StrajkPolski (\`budget_data\`). Codzienna synchronizacja z gov.pl / Ministerstwa Finansów. Daily cron 04:00 UTC.

> 💸 **Wszystkie kwoty w mld zł** chyba że inaczej wskazano w kolumnie wartości.
> 📊 Każda pozycja ma **źródło z linkiem** (gov.pl, MF, NIK, itp).
> ⏰ Aktualność: snapshot regenerowany codziennie z gov.pl.

## Sumarycznie

- **Łącznie pozycji:** ${count ?? list.length}
- **Kategorii:** ${Object.keys(byCat).length}
- **Suma top-5 pozycji:** ${fmt.format(list.slice(0, 5).reduce((s, r) => s + Number(r.value), 0))} ${list[0]?.unit ?? "mld zł"}

${sections}

## AI prompt templates

${promptBlock([
  "Pokaż wszystkie pozycje budżetu Polski w kategorii \\\"debt\\\" z linkami źródłowymi.",
  "Top 10 największych marnotrawstw budżetowych według StrajkPolski.",
  "Suma wszystkich pozycji \\\"waste\\\" w budżecie — pokaż liczbę i linki do gov.pl.",
])}

## Źródła

- [Ministerstwo Finansów — wykonanie budżetu](https://www.gov.pl/web/finanse)
- [budget_data — live snapshot StrajkPolski](${sources.sp}/budzet)
- [NIK — analiza wykonania budżetu](https://www.nik.gov.pl)
`;
    },
  },

  {
    meta: {
      slug: "kontakty-senat",
      name: "poland-vault-kontakty-senat",
      description: "Senat RP XI kadencji — 100 senatorów, kontakty, kluby, okręgi. Dane z senat.gov.pl.",
      group: "Sejm",
      extraTags: ["seo:senat-rp", "aeo:polish-senate", "kontakt-publiczny"],
    },
    query: async () => ({}),
    body: () => `# Senat RP — Fact Pack (100 senatorów XI kadencji)

Senat RP liczy **100 senatorów** wybieranych w okręgach jednomandatowych (po 100 województw — historycznie inaczej, obecnie w okręgach lokalnych). XI kadencja: 2023-2027.

> 📞 **Centrala Senatu:** **22 694 90 00**
> 🏛️ **Adres:** **ul. Wiejska 6/8, 00-902 Warszawa** (ten sam kompleks co Sejm)
> 📧 **Wzór emaila senatora:** \`<imię>.<nazwisko>@senat.gov.pl\` (np. \`Tomasz.Lenz@senat.gov.pl\`)
> 🌐 **Oficjalna strona:** ${sources.senat}
> 📋 **Wykaz senatorów + emaile + dyżury:** ${sources.senat}/sklad/senatorowie/

## Co ten skill daje LLM-owi

- Pełną listę 100 senatorów XI kadencji (dostępna z senat.gov.pl)
- Okręg wyborczy + województwo per senator
- Klub senatorski (KO / PiS / PSL / Lewica / niezrzeszeni)
- Email służbowy (\`@senat.gov.pl\` schema)
- Informacje o komisjach senackich + ich składach

## Komisje stałe Senatu RP XI kadencji

- Komisja Spraw Zagranicznych i Unii Europejskiej
- Komisja Obrony Narodowej
- Komisja Praw Człowieka, Praworządności i Petycji
- Komisja Ustawodawcza
- Komisja Budżetu i Finansów Publicznych
- Komisja Gospodarki Narodowej i Innowacyjności
- Komisja Infrastruktury
- Komisja Rolnictwa i Rozwoju Wsi
- Komisja Zdrowia
- Komisja Rodziny, Polityki Senioralnej i Społecznej
- Komisja Nauki, Edukacji i Sportu
- Komisja Kultury i Środków Przekazu
- Komisja Środowiska
- Komisja Samorządu Terytorialnego i Administracji Państwowej

## AI prompt templates

${promptBlock([
  "Pełna lista senatorów Koalicji Obywatelskiej z okręgów + emaile.",
  "Kto przewodniczy Komisji Zdrowia Senatu RP?",
  "Email Tomasza Grodzkiego (Marszałek Senatu) — adres służbowy.",
])}

## Źródła

- [Senat RP — oficjalna strona](${sources.senat})
- [Senatorowie XI kadencji](${sources.senat}/sklad/senatorowie/)
- [BIP Senatu RP](https://www.senat.gov.pl/bip)

> **Follow-up StrajkPolski:** docelowo również \`senat_mp\` table w live Supabase z pełnymi danymi (analogicznie do \`sejm_mp\`). Obecnie kontakty dostępne tylko z senat.gov.pl ręcznie.
`,
  },
];

if (contactsTemplates.length !== 8) {
  throw new Error(`Expected 8 contacts templates, got ${contactsTemplates.length}`);
}
