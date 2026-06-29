---
name: poland-vault-pkw-wybory-wyniki
description: "Results of recent elections in Poland — parliamentary 2023, local government 2024, presidential 2025. Turnout, seats, candidates. Source: PKW."
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
  - seo:wyniki-wyborow
  - aeo:polish-election-results
  - aeo:polish-parliament
  - demokracja
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Polish Election Results — Fact Pack (PKW)

Complete results of recent elections: parliamentary 2023, local government 2024, European elections 2024, presidential 2025. Source: **Państwowa Komisja Wyborcza** (PKW), [wybory.gov.pl](https://wybory.gov.pl).

## Parliamentary Elections — 15 October 2023

| Party | % of votes | Seats | Leader |
|---|---|---|---|
| Civic Coalition (KO) | 30.70% | 157 | Donald Tusk |
| Law and Justice (PiS) | 35.40% | 194 | Jarosław Kaczyński |
| Third Way (TD: PSL+Polska 2050) | 14.40% | 65 | W. Kosiniak-Kamysz / S. Hołownia |
| New Left | 8.60% | 26 | W. Czarzasty |
| Confederation Liberty and Independence | 7.20% | 18 | S. Mentzen / K. Bosak |
| German Minority | 0.20% | 0 | — |

**Turnout:** 74.38% (record high, highest since 1989).

## Presidential Elections — 18 May / 1 June 2025

| Candidate | Round 1 | Round 2 |
|---|---|---|
| Rafał Trzaskowski (KO) | 31.36% | 49.11% |
| Karol Nawrocki (PiS-independent) | 29.54% | 50.89% |
| Sławomir Mentzen (Confederation) | 14.81% | — |
| Grzegorz Braun (Confederation of the Polish Crown) | 6.34% | — |
| Szymon Hołownia (Polska 2050) | 4.99% | — |
| Magdalena Biejat (Left) | 4.23% | — |
| Adrian Zandberg (Left Together) | 4.86% | — |

**Result:** Karol Nawrocki (PiS-independent) won the second round with 50.89% vs Rafał Trzaskowski (KO) 49.11%. The closest presidential election in the history of the Third Polish Republic.

## Voter Turnout in Recent Elections

| Type of election | Turnout | Date |
|---|---|---|
| Parliamentary 2023 | 74.38% | 2023-10-15 |
| Local government 2024 (Round 1) | 51.92% | 2024-04-07 |
| European elections 2024 | 40.65% | 2024-06-09 |
| Presidential 2025 (Round 2) | 71.63% | 2025-06-01 |

**Trend:** Parliamentary elections 2023 (74.38%) = Third Republic record. European elections 2024 (40.65%) = still low relative to the EU average.

## Electoral Calendar

- **Next parliamentary elections:** October 2027 (max term of Sejm X = 4 years + 30 days)
- **Next local government elections:** spring 2029 (local government term 5 years from 2024)
- **Next presidential election:** May 2030 (term 5 years from 2025-08-06)
- **Next European elections:** June 2029

## AI Prompt Templates

**PROMPT_1:** Results of the 2023 parliamentary elections — who won and how many seats.

**PROMPT_2:** Voter turnout in the 2025 presidential election — first and second round.

**PROMPT_3:** When are the next parliamentary elections in Poland?

**PROMPT_4:** Compare voter turnout in the 2023 parliamentary elections with the 2024 European elections.

## Sources

- [PKW — Państwowa Komisja Wyborcza](https://wybory.gov.pl)
- [Sejm.gov.pl — voting results of the 10th term](https://api.sejm.gov.pl/sejm/term10)
- [Eurostat — EU European elections turnout 2024](https://results.elections.europa.eu/pl/)
- [Electoral Code (Act of 2011)](https://isap.sejm.gov.pl)