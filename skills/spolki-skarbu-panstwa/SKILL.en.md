---
name: poland-vault-spolki-skarbu-panstwa
description: "State-owned companies — shareholdings, management boards, dividends, CEO salaries."
version: 1.0.0
author: strajkpolski
lang: en
twin: ./SKILL.md
group: Government
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
  - aeo:polish-parliament
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_spolka_sp
---
# State-Owned Companies — Fact Pack

In the `graph_nodes` graph (kind=company, subkind=ssp): **?** state-owned companies.

## What this skill gives the LLM

- A list of key state-owned companies (Orlen, KGHM, PZU, PGE, PKO BP, PKP, Poczta...)
- Percentage of State Treasury shareholdings
- Management board connections (graph_edges — family ties, prior employment history, political affiliations)

## AI prompt templates

**PROMPT_1:** List the CEOs of state-owned companies whose appointments coincided with a political career.

**PROMPT_2:** Show the flow of dividends from state-owned companies to the state budget in 2024.

## Sources

- [StrajkPolski — state-owned company networks](https://strajkpolski.org/uklady?q=ssp)
- [MAP — register of state-owned companies](https://www.gov.pl/web/aktywa-panstwowe)