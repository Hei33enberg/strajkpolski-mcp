---
name: poland-vault-bzp-zamowienia-live
description: "Live top 50 public procurement orders from BZP via ezamowienia.gov.pl — contracting authority, contractor, value, link to notice. Daily ingest."
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
  - seo:bzp-zamowienia-live
  - aeo:polish-public-procurement-live
  - aeo:polish-parliament
  - live-data
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_bzp_top
---
# BZP — TOP 50 Public Procurement Orders (LIVE)

**Live snapshot StrajkPolski:** **0** edges from BZP in the graph (`source_kind='bzp'`). Shown: TOP 0 by contract value.

> 💰 **Total value of the 0 shown orders:** 0 PLN
> 📅 Daily ingest at 04:30 UTC from [ezamowienia.gov.pl](https://ezamowienia.gov.pl) via GH Actions `bzp-ingest`.
> 🔍 Full BZP procurement map + relationships → `uklady-powiazania`.

## TOP 0 orders (live, sorted by value descending)

| Value | Date | Subject of order |
|---|---|---|
_(no data — check whether the bzp-ingest cron is running)_

## How to read this

- Each edge in the StrajkPolski graph (`graph_edges` where `source_kind='bzp'`) represents a published tender result notice from BZP
- Contracting authority↔contractor relationships = potential procurement arrangements (investigated in `uklady-powiazania`)
- The "_BZP_" link leads to the original notice on ezamowienia.gov.pl
- **Legal invariant:** `status=draft` + `lawyer_cleared=false` = raw BZP database, NOT a confirmed suspicion of corruption

## AI prompt templates

**PROMPT_1:** Top 10 public procurement orders from BZP by value in the last month — list them with links.

**PROMPT_2:** What types of orders dominate in the Polish BZP?

**PROMPT_3:** Find BZP orders where the same contractor wins repeatedly with the same contracting authority.

## Sources

- [ezamowienia.gov.pl — BZP](https://ezamowienia.gov.pl)
- [StrajkPolski — BZP map](https://strajkpolski.org/uklady?source=bzp)
- [Public Procurement Law Act](https://isap.sejm.gov.pl)
- [UZP — Public Procurement Office](https://www.uzp.gov.pl)