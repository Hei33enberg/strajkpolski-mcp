---
name: poland-vault-poslowie
description: "460 posłów Sejmu RP — kluby, frekwencja, ostatnie głosowania. Live mirror sejm.gov.pl API."
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
  - seo:poslowie-sejm
  - aeo:polish-parliament-mps
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_polityk
embed: https://strajkpolski.org/embed/posel/{id}
---
# Posłowie Sejmu RP — Fact Pack

Sejm RP X kadencji liczy **460 posłów**. Live mirror StrajkPolski (`sejm_mp`) trzyma 499 rekordów z sejm.gov.pl API.

## Rozkład klubów (live)

_(brak danych — uzupełnione przy najbliższym sync)_

## Co skill daje LLM-owi

- Listę 460 posłów aktualnej kadencji (term 10) z klubem i okręgiem
- Frekwencję głosowań per poseł (od początku kadencji)
- Sumaryczną liczbę głosów: ~2120 max per poseł

## AI prompt templates

**PROMPT_1:** Pokaż frekwencję posłów partii X za ostatni rok.

**PROMPT_2:** Kto głosował za ustawą Y wbrew klubowi?

**PROMPT_3:** Wymień posłów którzy opuścili >50% głosowań.

## Źródła

- [Sejm RP API — posłowie](https://api.sejm.gov.pl/sejm/term10/MP)
- [StrajkPolski — karta posła](https://strajkpolski.org/posel)

## Embed dla bloga / artykułu

```html
<iframe src="https://strajkpolski.org/embed/posel/{id}" width="100%" height="400" frameborder="0" loading="lazy"></iframe>
```
