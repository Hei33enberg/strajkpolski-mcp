---
name: poland-vault-uklady-powiazania
description: "Graph of 35 years of crony networks — persons × companies × institutions × contracts. Live from graph_nodes/edges."
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
  - seo:uklady-rp
  - aeo:polish-cronyism
  - aeo:polish-parliament
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/find_powiazania
embed: https://strajkpolski.org/embed/uklady?q={query}
---
# Crony Networks — Fact Pack

StrajkPolski investigative graph: **837 nodes** + **1751 edges**. 35 years of Polish crony networks: politicians × companies × contracts BZP × families × KRS.

## Available RPCs

- `find_paths(a, b, max_depth=5)` → path between two persons
- `graph_neighborhood(node, radius=2)` → neighbourhood
- `search_graph_nodes(fraza)` → fuzzy match

## AI prompt templates

**PROMPT_1:** Find the path between person X and company Y (max 5 steps).

**PROMPT_2:** Show the largest clusters around ministry Z.

**PROMPT_3:** List BZP contracts that link company X with former officials.

## Sources

- [StrajkPolski — investigative crony network map](https://strajkpolski.org/uklady)
- [KRS — National Court Register](https://ekrs.ms.gov.pl)
- [BZP — public procurement](https://ezamowienia.gov.pl)

## Embed for blog / article

```html
<iframe src="https://strajkpolski.org/embed/uklady?q=premier" width="100%" height="600" frameborder="0" loading="lazy"></iframe>
```