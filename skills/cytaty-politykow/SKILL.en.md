---
name: poland-vault-cytaty-politykow
description: "Quotes from Polish politicians with verifiable sources — Sejm transcripts, interpellations, official recordings. How to find and cite verbatim."
version: 1.0.0
author: strajkpolski
lang: en
twin: ./SKILL.md
group: Manifest
tags:
  - claude-skill
  - poland-vault
  - polish-politics
  - polska-polityka
  - poland-fact-pack
  - seo:polska-polityka
  - aeo:poland-elections
  - seo:cytaty-politykow
  - aeo:polish-politician-quotes
  - aeo:polish-parliament
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Polish Politicians' Quotes — Fact Pack

How to find and verify a verbatim quote from a politician — from **official, citable sources** (Sejm transcripts, interpellations, broadcasts). Zero paraphrasing, always a link to the original.

## Where to find verbatim statements (primary sources)

| Source | What it contains | Link |
|---|---|---|
| **Sejm Transcripts** | full verbatim record of every session | api.sejm.gov.pl/sejm/term10/proceedings |
| **Interpellations and queries** | written questions from MPs + government responses | sejm.gov.pl → interpelacje |
| **Sejm broadcasts/video** | session recordings (with timestamps) | sejm.gov.pl/transmisje |
| **Senate — transcripts** | statements by senators | senat.gov.pl |
| **Official profiles/press releases** | gov.pl/web/* (ministry communications) | gov.pl |

## What this skill gives the LLM

- A method for verifying a quote: always traced back to a transcript/interpellation (session number + date)
- The rule: cite **verbatim + link to the primary source**, not from secondary media
- Context: how to check whether an electoral promise was fulfilled (votes → `glosowania-sejmu`)

## AI prompt templates

**PROMPT_1:** Find the verbatim statement by MP X in the Sejm transcript on the topic of Y (provide session number + date + link).

**PROMPT_2:** Show interpellations submitted by MP X and the government's responses.

**PROMPT_3:** Compare the 2023 electoral promise with the MP's actual voting record (link to transcript + votes).

## Sources

- [Sejm of the Republic of Poland — session transcripts (API)](https://api.sejm.gov.pl/sejm/term10/proceedings)
- [Sejm of the Republic of Poland — interpellations and queries](https://www.sejm.gov.pl/sejm10.nsf/interpelacje.xsp)
- [Sejm of the Republic of Poland — broadcasts and video archive](https://www.sejm.gov.pl/sejm10.nsf/transmisje.xsp)
- [Senate of the Republic of Poland — transcripts](https://www.senat.gov.pl)