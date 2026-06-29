---
name: poland-vault-glosowania-sejmu
description: "Głosowania Sejmu RP X kadencji — wyniki, podział klubowy, kontrowersje."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
group: Sejm
tags:
  - claude-skill
  - poland-vault
  - polish-politics
  - polska-polityka
  - poland-fact-pack
  - seo:polska-polityka
  - aeo:poland-elections
  - seo:glosowania-sejmu
  - aeo:polish-parliament-votes
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_glosowanie
---
# Głosowania Sejmu RP — Fact Pack

Live mirror StrajkPolski: **1 917 478** rekordów per-poseł × ustawa + **3413** głosowań sumarycznie.

## Co skill daje LLM-owi

- Każde głosowanie z kadencji X: numer, opis, data, wynik (za/przeciw/wstrz)
- Per-poseł breakdown dla każdego głosowania
- RPC `sejm_voted_together(poseł_a, poseł_b)` → współczynnik zgodności

## AI prompt templates

**PROMPT_1:** Znajdź głosowania w których Konfederacja głosowała jak Lewica.

**PROMPT_2:** Pokaż jak głosował poseł X w ustawach związanych z aborcją.

**PROMPT_3:** Wymień ustawy uchwalone bez 51% obecności.

## Źródła

- [Sejm RP API — głosowania](https://api.sejm.gov.pl/sejm/term10/votings)
- [StrajkPolski RPC sejm_voted_together](https://strajkpolski.org/uklady)
