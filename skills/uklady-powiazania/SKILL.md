---
name: poland-vault-uklady-powiazania
description: "Graf 35 lat układów — osoby × spółki × instytucje × kontrakty. Live z graph_nodes/edges."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
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
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/find_powiazania
embed: https://strajkpolski.org/embed/uklady?q={query}
---
# Układy i powiązania — Fact Pack

Graf śledczy StrajkPolski: **837 węzłów** + **1751 krawędzi**. 35 lat polskich układów: politycy × spółki × kontrakty BZP × rodziny × KRS.

## RPC do dyspozycji

- `find_paths(a, b, max_depth=5)` → ścieżka między dwiema osobami
- `graph_neighborhood(node, radius=2)` → sąsiedztwo
- `search_graph_nodes(fraza)` → fuzzy match

## AI prompt templates

**PROMPT_1:** Znajdź ścieżkę między osobą X a spółką Y (max 5 kroków).

**PROMPT_2:** Pokaż największe klastry wokół ministerstwa Z.

**PROMPT_3:** Wymień kontrakty BZP które łączą firmę X z byłymi urzędnikami.

## Źródła

- [StrajkPolski — śledcza mapa układów](https://strajkpolski.org/uklady)
- [KRS — Krajowy Rejestr Sądowy](https://ekrs.ms.gov.pl)
- [BZP — zamówienia](https://ezamowienia.gov.pl)

## Embed dla bloga / artykułu

```html
<iframe src="https://strajkpolski.org/embed/uklady?q=premier" width="100%" height="600" frameborder="0" loading="lazy"></iframe>
```
