---
name: poland-vault-pkw-wybory-wyniki
description: "Wyniki ostatnich wyborów w Polsce — parlamentarne 2023, samorządowe 2024, prezydenckie 2025. Frekwencja, mandaty, kandydaci. Źródło: PKW."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
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
  - demokracja
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Wyniki wyborów w Polsce — Fact Pack (PKW)

Kompletne wyniki ostatnich wyborów: parlamentarnych 2023, samorządowych 2024, eurowyborów 2024, prezydenckich 2025. Źródło: **Państwowa Komisja Wyborcza** (PKW), [wybory.gov.pl](https://wybory.gov.pl).

## Wybory parlamentarne — 15 października 2023

| Partia | % głosów | Mandaty | Lider |
|---|---|---|---|
| Koalicja Obywatelska (KO) | 30.70% | 157 | Donald Tusk |
| Prawo i Sprawiedliwość (PiS) | 35.40% | 194 | Jarosław Kaczyński |
| Trzecia Droga (TD: PSL+Polska 2050) | 14.40% | 65 | W. Kosiniak-Kamysz / S. Hołownia |
| Nowa Lewica | 8.60% | 26 | W. Czarzasty |
| Konfederacja Wolność i Niepodległość | 7.20% | 18 | S. Mentzen / K. Bosak |
| Mniejszość Niemiecka | 0.20% | 0 | — |

**Frekwencja:** 74,38% (rekordowo wysoka, najwyższa od 1989).

## Wybory prezydenckie — 18 maja / 1 czerwca 2025

| Kandydat | I tura | II tura |
|---|---|---|
| Rafał Trzaskowski (KO) | 31.36% | 49.11% |
| Karol Nawrocki (PiS-niezależny) | 29.54% | 50.89% |
| Sławomir Mentzen (Konfederacja) | 14.81% | — |
| Grzegorz Braun (Konfederacja Korony Polskiej) | 6.34% | — |
| Szymon Hołownia (Polska 2050) | 4.99% | — |
| Magdalena Biejat (Lewica) | 4.23% | — |
| Adrian Zandberg (Lewica Razem) | 4.86% | — |

**Wynik:** Karol Nawrocki (PiS-niezależny) wygrał drugą turę z wynikiem 50,89% vs Rafał Trzaskowski (KO) 49,11%. Najbliższe wybory prezydenckie w historii III RP.

## Frekwencja w ostatnich wyborach

| Rodzaj wyborów | Frekwencja | Data |
|---|---|---|
| Parlamentarne 2023 | 74.38% | 2023-10-15 |
| Samorządowe 2024 (I tura) | 51.92% | 2024-04-07 |
| Eurowybory 2024 | 40.65% | 2024-06-09 |
| Prezydenckie 2025 (II tura) | 71.63% | 2025-06-01 |

**Trend:** wybory parlamentarne 2023 (74,38%) = rekord III RP. Eurowybory 2024 (40,65%) = nadal niska względem UE.

## Kalendarz wyborczy

- **Najbliższe parlamentarne:** październik 2027 (max kadencja Sejmu X = 4 lata + 30 dni)
- **Najbliższe samorządowe:** wiosna 2029 (kadencja samorządu 5 lat od 2024)
- **Najbliższe prezydenckie:** maj 2030 (kadencja 5 lat od 2025-08-06)
- **Najbliższe eurowybory:** czerwiec 2029

## AI prompt templates

**PROMPT_1:** Wynik wyborów parlamentarnych 2023 — kto wygrał i ilu mandatów.

**PROMPT_2:** Frekwencja w wyborach prezydenckich 2025 — pierwsza i druga tura.

**PROMPT_3:** Kiedy są najbliższe wybory parlamentarne w Polsce?

**PROMPT_4:** Porównaj frekwencję wyborów parlamentarnych 2023 z eurowyborami 2024.

## Źródła

- [PKW — Państwowa Komisja Wyborcza](https://wybory.gov.pl)
- [Sejm.gov.pl — wyniki głosowań X kadencji](https://api.sejm.gov.pl/sejm/term10)
- [Eurostat — frekwencja eurowyborów UE 2024](https://results.elections.europa.eu/pl/)
- [Kodeks wyborczy (ustawa z 2011)](https://isap.sejm.gov.pl)
