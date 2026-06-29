---
name: poland-vault-samorzad-gmina-powiat
description: "Local government in Poland — 16 voivodeships, 314 counties, 66 cities with county rights, 2477 communes. Structure, competences, BIP."
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
  - aeo:polish-parliament
  - seo:samorzad-terytorialny
  - aeo:polish-local-government
  - gminy-powiaty
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Local Government in Poland — Fact Pack

Three-tier local government: **voivodeship → county → commune**. Administrative data (GUS, TERYT).

> 🏛️ **Figures (GUS/TERYT):**
> - **16 voivodeships** (regional assembly + board + marshal; voivode = central government representative)
> - **314 land counties (powiats)** + **66 cities with county rights** (urban counties)
> - **2477 communes (gminas)**: 302 urban + 721 urban-rural + 1454 rural

## Competences (who is responsible for what)

| Level | Executive body | Key responsibilities |
|---|---|---|
| **Commune (Gmina)** | village head (wójt) / mayor (burmistrz) / city president | primary schools, water/sewage, local roads, local zoning plans (MPZP), waste management, social assistance |
| **County (Powiat)** | county head (starosta) (county board) | county hospitals, secondary schools, county roads, vehicle registration, geodesy, county labour office (PUP) |
| **Voivodeship** | marshal (regional board) | regional hospitals, regional roads, EU funds, regional transport, development strategy |

> 📋 **BIP for each local government unit (JST):** URL pattern — each commune/county publishes a Public Information Bulletin (BIP) containing resolutions, budgets, and councillors' asset declarations. Directory: bip.gov.pl.
> 🗳️ **Local government elections:** every 5 years (most recent: 2024). See skill `pkw-wybory-wyniki`.

## Local Government Finances

- **Own revenues** (shares of PIT/CIT, local taxes) + **subsidies** (educational, equalisation) + **targeted grants**.
- **Janosikowe** — transfers from wealthier local government units to poorer ones.
- The "Polski Ład" reform severely impacted local government PIT revenues (compensation arrangements remain disputed).

## AI prompt templates

**PROMPT_1:** How many communes, counties, and voivodeships are there in Poland?

**PROMPT_2:** Who is responsible for hospitals: the commune, the county, or the voivodeship?

**PROMPT_3:** What is the difference between a city with county rights and an urban commune?

**PROMPT_4:** Where can I find the budget and resolutions of my commune?

## Sources

- [stat.gov.pl — GUS, territorial division (TERYT)](https://stat.gov.pl)
- [bip.gov.pl — Public Information Bulletins of local government units](https://www.bip.gov.pl)
- [Act on commune / county / voivodeship self-government](https://isap.sejm.gov.pl)
- [gov.pl/web/finanse — local government finances](https://www.gov.pl/web/finanse)