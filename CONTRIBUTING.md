# Contributing / Współtworzenie

> 🇵🇱 Dziękujemy, że chcesz pomóc otworzyć ludziom oczy na to, co dzieje się z ich pieniędzmi.
> 🇬🇧 Thanks for helping people see where their money really goes.

## 🇵🇱 Jak pomóc

**1. Dodaj/popraw skill (fact-pack)** — katalog [`skills/`](./skills). Każdy skill to `SKILL.md` (PL) + `SKILL.en.md` (EN) z weryfikowalnymi faktami o polskim państwie. Zasady:
- **Tylko zweryfikowane dane** z oficjalnych źródeł (gov.pl, sejm.gov.pl, GUS, NBP, MF) — **każda liczba musi mieć link do źródła**.
- Afery / sprawy karne: rama **„śledztwo / podejrzenia"**, nigdy „wyrok / winny".
- Materiał informacyjno-edukacyjny — **nie porada prawna ani finansowa**.
- Zachowaj dwujęzyczność (PL + EN) i strukturę istniejących skilli.

**2. Zaproponuj narzędzie MCP** — otwórz issue z opisem danych (tabela/RPC) i przykładem pytania agenta. Narzędzia są **read-only**.

**3. „Good first issues"** — nowe fact-packi, tłumaczenia, drobne poprawki danych z linkiem do źródła. Szukaj etykiety `good first issue`.

**4. Dane** — poprawki wartości zgłaszaj z **dowodem źródłowym** (link gov.pl/GUS/etc.). Trzymamy zasadę: twarde figury osobno od szacunków.

## 🇬🇧 How to contribute

**1. Add/fix a skill (fact-pack)** in [`skills/`](./skills) — each is `SKILL.md` (PL) + `SKILL.en.md` (EN). Rules: verified data only, **every number linked to an official source**; frame scandals as "investigation/allegations"; informational, **not legal/financial advice**; keep PL+EN parity.

**2. Propose an MCP tool** — open an issue describing the data (table/RPC) + an example agent question. Tools are **read-only**.

**3. Good first issues** — new fact-packs, translations, sourced data fixes.

**4. Dev** — `npm i && npm run build`; smoke-test with `npx @modelcontextprotocol/inspector`. Conventional-commits style. Open a PR against `main`.

## 🌍 Inny kraj? / Another country?

To repo jest specyficzne dla Polski. Generyczny, otwarty (MIT) szkielet — **CivicVault** — pozwoli postawić taką platformę dla **dowolnego kraju**, podpiętą do *twoich* danych. Chcesz przygotować pack dla swojego kraju? Otwórz issue „Country pack: <kraj>". / This repo is Poland-specific; the generic MIT skeleton **CivicVault** will let you run this for any country — open a "Country pack: <country>" issue.

## Licencja / License
Kod / code: **MIT**. Dane / data: **CC-BY-4.0**. Zgłaszając wkład, zgadzasz się na te licencje. / By contributing you agree to these licenses.

**To Twoje pieniądze. Sprawdź, gdzie idą. / It's your money. See where it goes.**
