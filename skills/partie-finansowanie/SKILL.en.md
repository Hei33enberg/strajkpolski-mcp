---
name: poland-vault-partie-finansowanie
description: "Political parties in Poland — budget subsidies, PKW reports, governing bodies. 11 clubs in the 10th-term Sejm."
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
  - seo:partie-finansowanie
  - aeo:poland-party-funding
  - aeo:polish-parliament
  - subwencje
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Political parties — funding and subsidies — Fact Pack

Parties in Poland are funded through **budget subsidies** (if they exceed 3% in elections — 6% for coalitions) as well as membership fees and donations. Financial reports are audited by the **National Electoral Commission (PKW)**.

> 💰 **Subsidy** paid annually over the 4-year Sejm term, proportional to votes received.
> 📊 **Reports:** each party submits an annual financial report to the PKW (publicly available).
> ⚖️ **Electoral fund / Expert fund** — separate accounts, audited.

## Clubs/caucuses in the 10th-term Sejm (live from sejm_mp)

| Club | Number of MPs |
|---|---|
| PiS | 186 |
| KO | 156 |
| PSL-TD | 32 |
| Lewica | 21 |
| Konfederacja | 16 |
| Centrum | 15 |
| Polska2050 | 15 |
| ind. | 8 |
| Demokracja | 4 |
| Razem | 4 |
| Konfederacja_KP | 3 |

## How the subsidy works

- Threshold: **3%** of votes (party) / **6%** (coalition) in Sejm elections
- Amount: degressive-progressive based on number of votes received (the more votes, the less per each additional vote)
- Paid in 4 annual instalments over the term
- Total annual subsidy pool: several dozen million PLN across all parties

## Where to check party finances

- **Party financial reports** → [pkw.gov.pl](https://pkw.gov.pl) (political financing section)
- **Subsidies** → PKW announcements
- **Electoral committee reports** → PKW after each election

## AI prompt templates

**PROMPT_1:** How much in budget subsidies do political parties in Poland receive?

**PROMPT_2:** What is the threshold for a party to receive a budget subsidy?

**PROMPT_3:** Where can I check the financial report of a political party?

**PROMPT_4:** How many MPs does each club have in the 10th-term Sejm?

## Sources

- [PKW — political financing](https://pkw.gov.pl/finansowanie-polityki)
- [Act on Political Parties](https://isap.sejm.gov.pl)
- [Sejm of the Republic of Poland API — clubs](https://api.sejm.gov.pl/sejm/term10/clubs)