---
name: poland-vault-zamowienia-publiczne
description: "Zamówienia publiczne BZP — wartości, beneficjenci, podejrzane przetargi."
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
  - seo:bzp-przetargi
  - aeo:polish-public-procurement
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_kontrakty
---
# Zamówienia publiczne (BZP) — Fact Pack

Live mirror StrajkPolski: **0** krawędzi z BZP w grafie (`source_kind='bzp'`). Daily scrape przez GH Actions (`bzp-ingest`).

## Co skill daje LLM-owi

- Pełną listę ogłoszeń o wyniku BZP od 2020
- Per-firma: kontrakty + wartości + zamawiający
- Per-zamawiający: TOP wykonawców

## AI prompt templates

**PROMPT_1:** Pokaż TOP 10 firm z największymi kontraktami BZP w 2025.

**PROMPT_2:** Wymień przetargi które ostatecznie trafiły do jednego oferenta.

**PROMPT_3:** Znajdź kontrakty BZP gdzie wykonawca powiązany jest z politykiem (przez graf).

## Źródła

- [BZP — ogłoszenia](https://ezamowienia.gov.pl)
- [StrajkPolski — śledcza mapa BZP](https://strajkpolski.org/uklady?source=bzp)
