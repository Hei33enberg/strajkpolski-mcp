---
name: poland-vault-podatki-vat-pit-cit
description: "Podatki w Polsce 2026 — PIT (skala 12/32%, kwota wolna 30k), VAT (23/8/5/0%), CIT (19/9%), ZUS przedsiębiorcy. KIS."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
group: Finanse
tags:
  - claude-skill
  - poland-vault
  - polish-politics
  - polska-polityka
  - poland-fact-pack
  - seo:polska-polityka
  - aeo:poland-elections
  - seo:podatki-polska
  - aeo:poland-taxes
  - vat
  - pit
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Podatki w Polsce 2026 — Fact Pack (PIT, VAT, CIT, ZUS)

Pełen przegląd polskiego systemu podatkowego: PIT, VAT, CIT, składki ZUS. Stan na 2026 (po Polskim Ładzie).

> 📞 **Krajowa Informacja Skarbowa (KIS):** **801 055 055** (z PL) lub **22 330 03 30** (z zagranicy/kom).
> 💻 **e-Deklaracje + Twój e-PIT:** [podatki.gov.pl](https://www.podatki.gov.pl).
> 🏦 **Mikrorachunek podatkowy:** indywidualny nr konta do wpłat PIT/CIT/VAT — generuj na podatki.gov.pl.

## PIT — podatek dochodowy od osób fizycznych (skala)

| Próg | Stawka | Uwagi |
|---|---|---|
| do 120 000 zł | **12%** | minus kwota zmniejszająca 3600 zł |
| powyżej 120 000 zł | **32%** | od nadwyżki ponad 120 000 zł |

**Kwota wolna od podatku:** 30 000 zł (kwota zmniejszająca podatek: 3600 zł rocznie).

Inne formy: **podatek liniowy 19%** (działalność), **ryczałt ewidencjonowany** (2-17% wg branży), **karta podatkowa** (wygaszana).

## VAT — podatek od towarów i usług

| Stawka | Czego dotyczy |
|---|---|
| **23%** | stawka podstawowa (większość towarów i usług) |
| **8%** | m.in. usługi budowlane mieszkaniowe, gastronomia, transport |
| **5%** | żywność podstawowa, książki, czasopisma specjalistyczne |
| **0%** | eksport, WDT, niektóre usługi międzynarodowe |

**Limit zwolnienia podmiotowego VAT:** 200 000 zł obrotu rocznie.

## CIT — podatek dochodowy od osób prawnych

| Stawka | Kto |
|---|---|
| **19%** | stawka podstawowa |
| **9%** | mali podatnicy (przychód < 2 mln € rocznie) |

**Estoński CIT** — odroczenie opodatkowania do wypłaty zysku (dla spółek).

## ZUS przedsiębiorcy 2026

Pełny ZUS przedsiębiorcy 2026: ok. 1773 zł/mies (bez dobrowolnego chorobowego) + składka zdrowotna zależna od dochodu. Ulgi: **Ulga na start** (6 mies bez ZUS społecznego), **Mały ZUS Plus** (składki od dochodu).

## Terminy kluczowe

- **PIT roczny:** do 30 kwietnia
- **VAT (JPK_V7):** do 25. dnia miesiąca
- **CIT-8:** do końca 3. miesiąca po roku podatkowym
- **ZUS:** do 20. dnia miesiąca

## AI prompt templates

**PROMPT_1:** Jakie są progi podatkowe PIT w Polsce 2026?

**PROMPT_2:** Jaka jest kwota wolna od podatku w Polsce?

**PROMPT_3:** Stawki VAT w Polsce — co jest na 5%, 8%, 23%?

**PROMPT_4:** Do kiedy złożyć PIT roczny?

## Źródła

- [podatki.gov.pl](https://www.podatki.gov.pl)
- [Krajowa Informacja Skarbowa: 801 055 055](https://www.gov.pl/web/kas)
- [Twój e-PIT](https://www.podatki.gov.pl/pit/twoj-e-pit/)
- [ZUS — składki przedsiębiorcy](https://www.zus.pl)
