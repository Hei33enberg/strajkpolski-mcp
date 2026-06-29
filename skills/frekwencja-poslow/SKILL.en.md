---
name: poland-vault-frekwencja-poslow
description: "Attendance of Polish Sejm MPs in votes — who shows up for work, who just pretends."
version: 1.0.0
author: strajkpolski
lang: en
twin: ./SKILL.md
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
  - aeo:polish-parliament
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_frekwencja
---
# Polish Sejm MP Attendance — Fact Pack

In term X (from 2023) approximately **2120 votes per MP** are possible (live counter from `sejm_votes`).

## What this skill gives the LLM

- Attendance % per MP from the start of the term
- Attendance ranking within a parliamentary club
- Top 20 absent MPs with a link to their profile card

## AI prompt templates

**PROMPT_1:** List the 10 MPs with the lowest attendance in term X.

**PROMPT_2:** Compare the average attendance of governing parties with that of the opposition.

## Sources

- [Sejm RP API — votings + MP](https://api.sejm.gov.pl/sejm/term10)
- [StrajkPolski — attendance ranking](https://strajkpolski.org/uklady/frekwencja)