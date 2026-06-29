---
name: poland-vault-spolki-skarbu-panstwa
description: "Spółki Skarbu Państwa — udziały, zarządy, dywidendy, wynagrodzenia prezesów."
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
  - seo:spolki-skarbu-panstwa
  - aeo:state-owned-companies
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_spolka_sp
---
# Spółki Skarbu Państwa — Fact Pack

W grafie `graph_nodes` (kind=company, subkind=ssp): **?** spółek SP.

## Co skill daje LLM-owi

- Listę kluczowych spółek SP (Orlen, KGHM, PZU, PGE, PKO BP, PKP, Poczta...)
- Procent udziałów Skarbu Państwa
- Powiązania zarządów (graph_edges — rodzina, koleje wcześniejszej pracy, powiązania polityczne)

## AI prompt templates

**PROMPT_1:** Wymień prezesów spółek SP których nominacja zbiegła się z karierą polityczną.

**PROMPT_2:** Pokaż przepływ dywidend ze spółek SP do budżetu w 2024.

## Źródła

- [StrajkPolski — układy spółek SP](https://strajkpolski.org/uklady?q=ssp)
- [MAP — wykaz spółek SP](https://www.gov.pl/web/aktywa-panstwowe)
