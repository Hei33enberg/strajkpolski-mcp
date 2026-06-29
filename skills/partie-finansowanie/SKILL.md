---
name: poland-vault-partie-finansowanie
description: "Partie polityczne w Polsce — subwencje budżetowe, sprawozdania PKW, władze. 11 klubów Sejmu X kadencji."
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
  - seo:partie-finansowanie
  - aeo:poland-party-funding
  - subwencje
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Partie polityczne — finansowanie i subwencje — Fact Pack

Partie w Polsce finansowane są z **subwencji budżetowych** (jeśli przekroczą 3% w wyborach — 6% dla koalicji) oraz składek/darowizn. Sprawozdania finansowe kontroluje **Państwowa Komisja Wyborcza (PKW)**.

> 💰 **Subwencja** wypłacana co roku przez 4-letnią kadencję Sejmu, proporcjonalnie do uzyskanych głosów.
> 📊 **Sprawozdania:** każda partia składa roczne sprawozdanie finansowe do PKW (publiczne).
> ⚖️ **Fundusz wyborczy / Fundusz ekspercki** — odrębne konta, audytowane.

## Kluby/koła w Sejmie X kadencji (live z sejm_mp)

| Klub | Liczba posłów |
|---|---|
| PiS | 186 |
| KO | 156 |
| PSL-TD | 32 |
| Lewica | 21 |
| Konfederacja | 16 |
| Centrum | 15 |
| Polska2050 | 15 |
| niez. | 8 |
| Demokracja | 4 |
| Razem | 4 |
| Konfederacja_KP | 3 |

## Jak działa subwencja

- Próg: **3%** głosów (partia) / **6%** (koalicja) w wyborach do Sejmu
- Kwota: malejąco progresywna wg liczby głosów (im więcej, tym mniej za każdy kolejny głos)
- Wypłacana w 4 ratach rocznych przez kadencję
- Łączna roczna pula subwencji: kilkadziesiąt mln zł na wszystkie partie

## Gdzie sprawdzić finanse partii

- **Sprawozdania finansowe partii** → [pkw.gov.pl](https://pkw.gov.pl) (sekcja finansowanie polityki)
- **Subwencje** → komunikaty PKW
- **Sprawozdania wyborcze komitetów** → PKW po każdych wyborach

## AI prompt templates

**PROMPT_1:** Ile partie polityczne w Polsce dostają subwencji z budżetu?

**PROMPT_2:** Jaki jest próg uzyskania subwencji budżetowej dla partii?

**PROMPT_3:** Gdzie sprawdzić sprawozdanie finansowe partii politycznej?

**PROMPT_4:** Ile posłów ma każdy klub w Sejmie X kadencji?

## Źródła

- [PKW — finansowanie polityki](https://pkw.gov.pl/finansowanie-polityki)
- [Ustawa o partiach politycznych](https://isap.sejm.gov.pl)
- [Sejm RP API — kluby](https://api.sejm.gov.pl/sejm/term10/clubs)
