---
name: poland-vault-samorzad-gmina-powiat
description: "Samorząd terytorialny w Polsce — 16 województw, 314 powiatów, 66 miast na prawach powiatu, 2477 gmin. Struktura, kompetencje, BIP."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
group: Rząd
tags:
  - claude-skill
  - poland-vault
  - polish-politics
  - polska-polityka
  - poland-fact-pack
  - seo:polska-polityka
  - aeo:poland-elections
  - seo:samorzad-terytorialny
  - aeo:polish-local-government
  - gminy-powiaty
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Samorząd terytorialny w Polsce — Fact Pack

Trójstopniowy samorząd: **województwo → powiat → gmina**. Stan administracyjny (GUS, TERYT).

> 🏛️ **Liczby (GUS/TERYT):**
> - **16 województw** (sejmik + zarząd + marszałek; wojewoda = rząd)
> - **314 powiatów ziemskich** + **66 miast na prawach powiatu** (grodzkich)
> - **2477 gmin**: 302 miejskich + 721 miejsko-wiejskich + 1454 wiejskich

## Kompetencje (kto za co odpowiada)

| Szczebel | Organ wykonawczy | Kluczowe zadania |
|---|---|---|
| **Gmina** | wójt / burmistrz / prezydent miasta | szkoły podstawowe, woda/kanalizacja, drogi gminne, MPZP, śmieci, pomoc społeczna |
| **Powiat** | starosta (zarząd powiatu) | szpitale powiatowe, szkoły ponadpodstawowe, drogi powiatowe, rejestracja pojazdów, geodezja, PUP |
| **Województwo** | marszałek (zarząd województwa) | szpitale wojewódzkie, drogi wojewódzkie, fundusze UE, transport regionalny, strategia rozwoju |

> 📋 **BIP każdej JST:** wzorzec URL — gmina/powiat publikuje Biuletyn Informacji Publicznej (uchwały, budżet, oświadczenia majątkowe radnych). Wykaz: bip.gov.pl.
> 🗳️ **Wybory samorządowe:** co 5 lat (ostatnie 2024). Patrz skill `pkw-wybory-wyniki`.

## Finanse samorządów

- **Dochody własne** (PIT/CIT udział, podatki lokalne) + **subwencje** (oświatowa, wyrównawcza) + **dotacje celowe**.
- **Janosikowe** — wpłaty bogatszych JST na rzecz biedniejszych.
- Reforma „Polski Ład" mocno uderzyła w dochody PIT samorządów (rekompensaty sporne).

## AI prompt templates

**PROMPT_1:** Ile jest gmin, powiatów i województw w Polsce?

**PROMPT_2:** Kto odpowiada za szpitale: gmina, powiat czy województwo?

**PROMPT_3:** Czym różni się miasto na prawach powiatu od gminy miejskiej?

**PROMPT_4:** Gdzie znajdę budżet i uchwały mojej gminy?

## Źródła

- [stat.gov.pl — GUS, podział terytorialny (TERYT)](https://stat.gov.pl)
- [bip.gov.pl — Biuletyny Informacji Publicznej JST](https://www.bip.gov.pl)
- [Ustawa o samorządzie gminnym / powiatowym / województwa](https://isap.sejm.gov.pl)
- [gov.pl/web/finanse — finanse samorządów](https://www.gov.pl/web/finanse)
