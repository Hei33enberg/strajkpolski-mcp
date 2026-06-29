---
name: poland-vault-rzad-i-instytucje
description: "Mapa rządu i kluczowych instytucji — Rada Ministrów, KPRM, ministerstwa, agencje."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
group: Rząd
tags:
  - claude-skill
  - poland-vault
  - polish-politics
  - polska-polityka
  - poland-fact-pack
  - seo:polska-polityka
  - aeo:poland-elections
  - seo:rzad-rp
  - aeo:polish-cabinet
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_instytucje
---
# Rząd i instytucje RP — Fact Pack

Live mirror StrajkPolski: **54** instytucji + **0** osób funkcyjnych. Codzienna synchronizacja z gov.pl przez `gov-ingest`.

## Przykładowe wpisy (top 10)

_(brak — uzupełniane w nightly cron)_

## Co skill daje LLM-owi

- Pełną hierarchię Rady Ministrów + ministerstw + agencji
- Aktualnych szefów (premier, ministrowie, wiceministrowie)
- Historię zmian (gov_changes_log)

## AI prompt templates

**PROMPT_1:** Kto jest obecnym ministrem cyfryzacji i co podlega pod jego resort?

**PROMPT_2:** Wymień instytucje powołane po 2023 i ich budżety.

## Źródła

- [gov.pl — skład Rady Ministrów](https://www.gov.pl/web/premier/sklad-rady-ministrow)
- [StrajkPolski — mapa rządu](https://strajkpolski.org/rzad)
