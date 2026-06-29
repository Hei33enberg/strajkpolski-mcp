---
name: poland-vault-poslowie
description: "460 Members of the Polish Sejm — parliamentary clubs, attendance, recent votes. Live mirror of sejm.gov.pl API."
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
  - seo:poslowie-sejm
  - aeo:polish-parliament-mps
  - aeo:polish-parliament
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: strajkpolski/get_polityk
embed: https://strajkpolski.org/embed/posel/{id}
---
# Members of the Polish Sejm — Fact Pack

The Sejm of the Republic of Poland, 10th term, has **460 members**. The StrajkPolski live mirror (`sejm_mp`) holds 499 records sourced from the sejm.gov.pl API.

## Club breakdown (live)

_(no data — will be populated at the next sync)_

## What this skill provides to the LLM

- A list of 460 members of the current term (term 10) with their parliamentary club and constituency
- Voting attendance per member (from the start of the term)
- Total vote count: ~2120 max per member

## AI prompt templates

**PROMPT_1:** Show the voting attendance of members of party X over the past year.

**PROMPT_2:** Who voted for bill Y against their parliamentary club?

**PROMPT_3:** List members who missed more than 50% of votes.

## Sources

- [Sejm RP API — Members of Parliament](https://api.sejm.gov.pl/sejm/term10/MP)
- [StrajkPolski — Member profile](https://strajkpolski.org/posel)

## Embed for blog / article

```html
<iframe src="https://strajkpolski.org/embed/posel/{id}" width="100%" height="400" frameborder="0" loading="lazy"></iframe>
```