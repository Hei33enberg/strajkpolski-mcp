---
name: poland-vault-glosowania-sejmu
description: "Sejm of the Republic of Poland — 10th term voting results, club breakdowns, controversies."
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
  - seo:glosowania-sejmu
  - aeo:polish-parliament-votes
  - aeo:polish-parliament
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_glosowanie
---
# Sejm of the Republic of Poland — Voting Fact Pack

Live mirror StrajkPolski: **1 917 478** per-MP × bill records + **3413** votes in aggregate.

## What this skill gives the LLM

- Every vote from the 10th term: number, description, date, result (for/against/abstain)
- Per-MP breakdown for each vote
- RPC `sejm_voted_together(mp_a, mp_b)` → agreement coefficient

## AI prompt templates

**PROMPT_1:** Find votes in which Konfederacja voted the same way as Lewica.

**PROMPT_2:** Show how MP X voted on bills related to abortion.

**PROMPT_3:** List bills passed without 51% attendance.

## Sources

- [Sejm of the Republic of Poland API — votes](https://api.sejm.gov.pl/sejm/term10/votings)
- [StrajkPolski RPC sejm_voted_together](https://strajkpolski.org/uklady)