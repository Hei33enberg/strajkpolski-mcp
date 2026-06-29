---
name: poland-vault-kontakty-senat
description: "Senate of the Republic of Poland, 11th term — 100 senators, contacts, clubs, constituencies. Data from senat.gov.pl."
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
  - seo:senat-rp
  - aeo:polish-senate
  - aeo:polish-parliament
  - kontakt-publiczny
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Senate of the Republic of Poland — Fact Pack (100 senators, 11th term)

The Senate of the Republic of Poland has **100 senators** elected in single-member constituencies. 11th term: 2023–2027.

> 📞 **Senate switchboard:** **22 694 90 00**
> 🏛️ **Address:** **ul. Wiejska 6/8, 00-902 Warszawa** (same complex as the Sejm)
> 📧 **Senator email pattern:** `<firstname>.<lastname>@senat.gov.pl` (e.g. `Tomasz.Lenz@senat.gov.pl`)
> 🌐 **Official website:** https://www.senat.gov.pl
> 📋 **Senator list + emails + office hours:** https://www.senat.gov.pl/sklad/senatorowie/

## What this skill provides to the LLM

- Full list of 100 senators of the 11th term (available from senat.gov.pl)
- Electoral constituency + voivodeship per senator
- Senate club (KO / PiS / PSL / Lewica / independent)
- Official email (`@senat.gov.pl` schema)
- Information on Senate committees and their compositions

## Standing committees of the Senate of the Republic of Poland, 11th term

- Committee on Foreign Affairs and the European Union
- Committee on National Defence
- Committee on Human Rights, Rule of Law and Petitions
- Legislative Committee
- Committee on Budget and Public Finance
- Committee on the National Economy and Innovation
- Committee on Infrastructure
- Committee on Agriculture and Rural Development
- Committee on Health
- Committee on Family, Senior and Social Policy
- Committee on Science, Education and Sport
- Committee on Culture and Mass Media
- Committee on the Environment
- Committee on Local Government and State Administration

## AI prompt templates

**PROMPT_1:** Full list of Civic Coalition (KO) senators by constituency + emails.

**PROMPT_2:** Who chairs the Senate Health Committee?

**PROMPT_3:** Email address for Tomasz Grodzki (Marshal of the Senate) — official address.

## Sources

- [Senate of the Republic of Poland — official website](https://www.senat.gov.pl)
- [Senators of the 11th term](https://www.senat.gov.pl/sklad/senatorowie/)
- [Senate BIP (Public Information Bulletin)](https://www.senat.gov.pl/bip)

> **StrajkPolski follow-up:** the target is also a `senat_mp` table in a live Supabase instance with full data (analogous to `sejm_mp`). Currently contacts are only available manually from senat.gov.pl.