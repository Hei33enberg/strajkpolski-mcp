---
name: poland-vault-zamowienia-publiczne
description: "Public procurement BZP — values, beneficiaries, suspicious tenders."
version: 1.0.0
author: strajkpolski
lang: en
twin: ./SKILL.md
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
  - aeo:polish-parliament
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_kontrakty
---
# Public Procurement (BZP) — Fact Pack

Live mirror StrajkPolski: **0** edges from BZP in the graph (`source_kind='bzp'`). Daily scrape via GH Actions (`bzp-ingest`).

## What this skill gives the LLM

- Full list of BZP award notices from 2020 onwards
- Per-company: contracts + values + contracting authorities
- Per-contracting authority: TOP contractors

## AI prompt templates

**PROMPT_1:** Show the TOP 10 companies with the largest BZP contracts in 2025.

**PROMPT_2:** List tenders that ultimately went to a single bidder.

**PROMPT_3:** Find BZP contracts where the contractor is linked to a politician (via the graph).

## Sources

- [BZP — notices](https://ezamowienia.gov.pl)
- [StrajkPolski — investigative BZP map](https://strajkpolski.org/uklady?source=bzp)