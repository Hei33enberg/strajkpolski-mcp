---
name: poland-vault-rzad-i-instytucje
description: "Map of the government and key institutions — Council of Ministers, KPRM, ministries, agencies."
version: 1.0.0
author: strajkpolski
lang: en
twin: ./SKILL.md
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
  - aeo:polish-parliament
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_instytucje
---
# Government and Institutions of the Republic of Poland — Fact Pack

Live mirror StrajkPolski: **54** institutions + **0** officeholders. Daily synchronisation with gov.pl via `gov-ingest`.

## Sample entries (top 10)

_(none — populated by nightly cron)_

## What this skill gives the LLM

- Full hierarchy of the Council of Ministers + ministries + agencies
- Current heads (Prime Minister, ministers, deputy ministers)
- Change history (gov_changes_log)

## AI prompt templates

**PROMPT_1:** Who is the current Minister of Digital Affairs and what falls under their ministry?

**PROMPT_2:** List the institutions established after 2023 and their budgets.

## Sources

- [gov.pl — composition of the Council of Ministers](https://www.gov.pl/web/premier/sklad-rady-ministrow)
- [StrajkPolski — government map](https://strajkpolski.org/rzad)