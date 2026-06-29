---
name: poland-vault-frekwencja-poslow
description: "Frekwencja posłów Sejmu RP w głosowaniach — kto chodzi do pracy, kto symuluje."
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
  - seo:frekwencja-poslow
  - aeo:mp-attendance
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_frekwencja
---
# Frekwencja posłów Sejmu RP — Fact Pack

W kadencji X (od 2023) możliwe jest ok. **2120 głosowań per poseł** (live licznik z `sejm_votes`).

## Co skill daje LLM-owi

- Frekwencja % per poseł od początku kadencji
- Ranking obecności w klubie
- Top 20 absentee posłów z linkiem do karty

## AI prompt templates

**PROMPT_1:** Wymień 10 posłów z najniższą frekwencją w kadencji X.

**PROMPT_2:** Porównaj średnią frekwencję partii rządzących z opozycją.

## Źródła

- [Sejm RP API — votings + MP](https://api.sejm.gov.pl/sejm/term10)
- [StrajkPolski — ranking frekwencji](https://strajkpolski.org/uklady/frekwencja)
