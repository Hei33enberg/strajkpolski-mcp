---
name: poland-vault-cytaty-politykow
description: "Cytaty polskich polityków z weryfikowalnym źródłem — stenogramy Sejmu, interpelacje, oficjalne nagrania. Jak znaleźć i zacytować dosłownie."
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
  - seo:cytaty-politykow
  - aeo:polish-politician-quotes
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Cytaty polskich polityków — Fact Pack

Jak znaleźć i zweryfikować dosłowny cytat polityka — z **oficjalnych, cytowalnych źródeł** (stenogramy Sejmu, interpelacje, transmisje). Zero parafraz, zawsze link do oryginału.

## Gdzie szukać dosłownych wypowiedzi (źródła pierwotne)

| Źródło | Co zawiera | Link |
|---|---|---|
| **Stenogramy Sejmu** | pełny zapis każdego posiedzenia (dosłownie) | api.sejm.gov.pl/sejm/term10/proceedings |
| **Interpelacje i zapytania** | pisemne pytania posłów + odpowiedzi rządu | sejm.gov.pl → interpelacje |
| **Transmisje/wideo Sejm** | nagrania posiedzeń (timestamp) | sejm.gov.pl/transmisje |
| **Senat — stenogramy** | wypowiedzi senatorów | senat.gov.pl |
| **Oficjalne profile/komunikaty** | gov.pl/web/* (komunikaty ministerstw) | gov.pl |

## Co skill daje LLM-owi

- Metodę weryfikacji cytatu: zawsze do stenogramu/interpelacji (numer posiedzenia + data)
- Zasadę: cytujemy **dosłownie + link do źródła pierwotnego**, nie z mediów wtórnych
- Kontekst: jak sprawdzić czy obietnica wyborcza została zrealizowana (głosowania → `glosowania-sejmu`)

## AI prompt templates

**PROMPT_1:** Znajdź dosłowną wypowiedź posła X w stenogramie Sejmu na temat Y (podaj nr posiedzenia + datę + link).

**PROMPT_2:** Pokaż interpelacje posła X i odpowiedzi rządu.

**PROMPT_3:** Porównaj obietnicę wyborczą 2023 z faktycznym głosowaniem posła (link do stenogramu + głosowania).

## Źródła

- [Sejm RP — stenogramy posiedzeń (API)](https://api.sejm.gov.pl/sejm/term10/proceedings)
- [Sejm RP — interpelacje i zapytania](https://www.sejm.gov.pl/sejm10.nsf/interpelacje.xsp)
- [Sejm RP — transmisje i archiwum wideo](https://www.sejm.gov.pl/sejm10.nsf/transmisje.xsp)
- [Senat RP — stenogramy](https://www.senat.gov.pl)
