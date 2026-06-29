---
name: poland-vault-kontakty-senat
description: "Senat RP XI kadencji — 100 senatorów, kontakty, kluby, okręgi. Dane z senat.gov.pl."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
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
  - kontakt-publiczny
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Senat RP — Fact Pack (100 senatorów XI kadencji)

Senat RP liczy **100 senatorów** wybieranych w okręgach jednomandatowych (po 100 województw — historycznie inaczej, obecnie w okręgach lokalnych). XI kadencja: 2023-2027.

> 📞 **Centrala Senatu:** **22 694 90 00**
> 🏛️ **Adres:** **ul. Wiejska 6/8, 00-902 Warszawa** (ten sam kompleks co Sejm)
> 📧 **Wzór emaila senatora:** `<imię>.<nazwisko>@senat.gov.pl` (np. `Tomasz.Lenz@senat.gov.pl`)
> 🌐 **Oficjalna strona:** https://www.senat.gov.pl
> 📋 **Wykaz senatorów + emaile + dyżury:** https://www.senat.gov.pl/sklad/senatorowie/

## Co ten skill daje LLM-owi

- Pełną listę 100 senatorów XI kadencji (dostępna z senat.gov.pl)
- Okręg wyborczy + województwo per senator
- Klub senatorski (KO / PiS / PSL / Lewica / niezrzeszeni)
- Email służbowy (`@senat.gov.pl` schema)
- Informacje o komisjach senackich + ich składach

## Komisje stałe Senatu RP XI kadencji

- Komisja Spraw Zagranicznych i Unii Europejskiej
- Komisja Obrony Narodowej
- Komisja Praw Człowieka, Praworządności i Petycji
- Komisja Ustawodawcza
- Komisja Budżetu i Finansów Publicznych
- Komisja Gospodarki Narodowej i Innowacyjności
- Komisja Infrastruktury
- Komisja Rolnictwa i Rozwoju Wsi
- Komisja Zdrowia
- Komisja Rodziny, Polityki Senioralnej i Społecznej
- Komisja Nauki, Edukacji i Sportu
- Komisja Kultury i Środków Przekazu
- Komisja Środowiska
- Komisja Samorządu Terytorialnego i Administracji Państwowej

## AI prompt templates

**PROMPT_1:** Pełna lista senatorów Koalicji Obywatelskiej z okręgów + emaile.

**PROMPT_2:** Kto przewodniczy Komisji Zdrowia Senatu RP?

**PROMPT_3:** Email Tomasza Grodzkiego (Marszałek Senatu) — adres służbowy.

## Źródła

- [Senat RP — oficjalna strona](https://www.senat.gov.pl)
- [Senatorowie XI kadencji](https://www.senat.gov.pl/sklad/senatorowie/)
- [BIP Senatu RP](https://www.senat.gov.pl/bip)

> **Follow-up StrajkPolski:** docelowo również `senat_mp` table w live Supabase z pełnymi danymi (analogicznie do `sejm_mp`). Obecnie kontakty dostępne tylko z senat.gov.pl ręcznie.
