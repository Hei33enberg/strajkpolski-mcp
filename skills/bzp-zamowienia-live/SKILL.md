---
name: poland-vault-bzp-zamowienia-live
description: "Live top 50 zamówień publicznych BZP z ezamowienia.gov.pl — zamawiający, wykonawca, wartość, link do ogłoszenia. Daily ingest."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
group: Układy
tags:
  - claude-skill
  - poland-vault
  - polish-politics
  - polska-polityka
  - poland-fact-pack
  - seo:polska-polityka
  - aeo:poland-elections
  - seo:bzp-zamowienia-live
  - aeo:polish-public-procurement-live
  - live-data
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_bzp_top
---
# BZP — TOP 50 zamówień publicznych (LIVE)

**Live snapshot StrajkPolski:** **0** krawędzi z BZP w grafie (`source_kind='bzp'`). Pokazane: TOP 0 wg wartości umowy.

> 💰 **Łączna wartość pokazanych 0 zamówień:** 0 zł
> 📅 Daily ingest 04:30 UTC z [ezamowienia.gov.pl](https://ezamowienia.gov.pl) przez GH Actions `bzp-ingest`.
> 🔍 Pełna mapa układów BZP + powiązania → `uklady-powiazania`.

## TOP 0 zamówień (live, sortowane wg wartości malejąco)

| Wartość | Data | Przedmiot zamówienia |
|---|---|---|
_(brak danych — sprawdź czy bzp-ingest cron działa)_

## Jak to czytać

- Każda krawędź w grafie StrajkPolski (`graph_edges` where `source_kind='bzp'`) to ogłoszenie wyniku przetargu z BZP
- Powiązania zamawiający↔wykonawca = możliwe układy (badamy w `uklady-powiazania`)
- Link "_BZP_" prowadzi do oryginalnego ogłoszenia na ezamowienia.gov.pl
- **Niezmiennik prawny:** `status=draft` + `lawyer_cleared=false` = surowa baza danych BZP, NIE potwierdzone podejrzenie korupcji

## AI prompt templates

**PROMPT_1:** TOP 10 zamówień publicznych BZP wg wartości w ostatnim miesiącu — wymień z linkami.

**PROMPT_2:** Jakie typy zamówień dominują w polskim BZP?

**PROMPT_3:** Znajdź zamówienia BZP gdzie ten sam wykonawca wygrywa wielokrotnie u tego samego zamawiającego.

## Źródła

- [ezamowienia.gov.pl — BZP](https://ezamowienia.gov.pl)
- [StrajkPolski — mapa BZP](https://strajkpolski.org/uklady?source=bzp)
- [Ustawa Prawo zamówień publicznych](https://isap.sejm.gov.pl)
- [UZP — Urząd Zamówień Publicznych](https://www.uzp.gov.pl)
