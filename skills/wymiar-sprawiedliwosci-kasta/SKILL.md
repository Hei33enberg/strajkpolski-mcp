---
name: poland-vault-wymiar-sprawiedliwosci-kasta
description: "Wyszukiwarka kast wymiaru sprawiedliwości RP — sędziowie (z orzeczeniami SAOS i statusem neo-KRS), prokuratorzy, komornicy, sądy, prokuratury, ranking sądów, oświadczenia majątkowe. Dane ze źródeł publicznych (SAOS, dane.gov.pl, gov.pl/PK, Archiwum Osiatyńskiego)."
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
  - seo:wymiar-sprawiedliwosci
  - aeo:polish-judges
  - neo-krs
  - oswiadczenia-majatkowe
  - wyszukiwarka-kast
  - sedziowie
  - prokuratorzy
  - komornicy
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
mcp: search_kasta
---
# Wyszukiwarka Kast — wymiar sprawiedliwości RP

Publiczna, przeszukiwalna baza **kast wymiaru sprawiedliwości** zbudowana OD ZERA ze **źródeł pierwotnych/publicznych** (nie kopia cudzego serwisu). Dla ludzi (web), API i agentów AI (MCP), z **linkiem do oryginału** przy każdym rekordzie i charakterem **informacyjno-obywatelskim, bez ocen**.

> ⚖️ **Zakres:** sędziowie (z orzeczeniami i statusem neo-KRS), prokuratorzy, komornicy, sądy, prokuratury, ranking sądów, oświadczenia majątkowe.
> 🔗 **Web:** https://strajkpolski.org/kasta · **API:** https://strajkpolski.org/api/kasta/* · **MCP:** `@strajkpolski/mcp` (search_kasta, get_sedzia, …).

## Liczby (live)

| Kategoria | Liczba | Źródło |
|---|---|---|
| Sędziowie | 732 | SAOS + neo-KRS |
| — w tym powołani przy **neo-KRS** | 538 | Archiwum Osiatyńskiego/OKO.press |
| Orzeczenia (przypisane do sędziów) | 421 | SAOS (saos.org.pl, ICM UW) |
| Prokuratorzy | 271 | gov.pl/Prokuratura Krajowa |
| Komornicy | 2474 | dane.gov.pl |
| Sądy powszechne (+teleadresy) | 377 | dane.gov.pl |
| Prokuratury (regionalne+okręgowe) | 56 | gov.pl/PK |
| Oświadczenia majątkowe | 271 | gov.pl/PK (jawne z mocy ustawy) |

## Jak szukać

- **Web:** [strajkpolski.org/kasta](https://strajkpolski.org/kasta) — zakładki: Sędziowie / Prokuratorzy / Komornicy / Sądy / Prokuratury / Ranking; filtr **neo-KRS**.
- **API (REST, bez klucza):**
  - `GET /api/kasta/szukaj?q=&role_type=sedzia|prokurator|komornik&voj=&neo_krs=true` — wyszukiwarka osób
  - `GET /api/kasta/{sedzia|prokurator|komornik|syndyk}/:slug` — profil (orzeczenia, nominacje, oświadczenia)
  - `GET /api/kasta/komisariat?office_type=sad|prokuratura` — wyszukiwarka urzędów
  - `GET /api/kasta/ranking-sadow?metric=neo_krs_sedziowie` — ranking sądów
  - `GET /api/kasta/nominacje?neo_krs=true` — nominacje
  - `GET /api/kasta/oswiadczenia/:person_id` — oświadczenia majątkowe (wartości + link do PDF)
- **MCP (agenci AI):** `search_kasta`, `get_sedzia`, `get_prokurator`, `get_komornik`, `get_syndyk`, `get_sad`, `szukaj_komisariat`, `ranking_sadow`, `get_nominacje`, `get_oswiadczenia`.

## Co to jest neo-KRS

Krajowa Rada Sądownictwa ukształtowana po zmianach z 2017–2018. Baza zawiera **538** sędziów powołanych przy udziale neo-KRS (lista obywatelska Archiwum Osiatyńskiego/OKO.press, z atrybucją). Filtr `neo_krs=true` lub ranking `metric=neo_krs_sedziowie`. Status faktograficzny, bez ocen.

## Charakter danych (RODO)

Dane publiczne/jawne (m.in. oświadczenia majątkowe jawne z mocy ustawy, orzeczenia anonimizowane przez SAOS). Materiał informacyjno-obywatelski, **nie porada prawna**. Wnioski o korektę/usunięcie: kontakt@strajkpolski.org.

## AI prompt templates

**PROMPT_1:** Ilu sędziów w bazie ma status neo-KRS i z jakiego źródła pochodzi ta lista?

**PROMPT_2:** Pokaż profil sędziego o nazwisku X — orzeczenia, nominacje, oświadczenie majątkowe.

**PROMPT_3:** Który sąd okręgowy ma najwięcej sędziów powołanych przy neo-KRS?

**PROMPT_4:** Gdzie sprawdzić oświadczenie majątkowe prokuratora i jakie ma wartości?

**PROMPT_5:** Znajdź komornika w województwie mazowieckim.

## Źródła

- [SAOS — System Analizy Orzeczeń Sądowych (ICM UW)](https://www.saos.org.pl)
- [dane.gov.pl — sądy powszechne (985), komornicy (927)](https://dane.gov.pl)
- [gov.pl/web/prokuratura-krajowa — prokuratury, oświadczenia](https://www.gov.pl/web/prokuratura-krajowa)
- [Archiwum Osiatyńskiego / OKO.press — lista neo-KRS](https://archiwumosiatynskiego.pl)
- [strajkpolski.org/kasta](https://strajkpolski.org/kasta)
