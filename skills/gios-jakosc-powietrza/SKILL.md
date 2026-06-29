---
name: poland-vault-gios-jakosc-powietrza
description: "Jakość powietrza w Polsce — GIOŚ, smog PM10/PM2.5/NO2, indeks jakości. API api.gios.gov.pl (v1)."
version: 1.0.0
author: strajkpolski
lang: pl
twin: ./SKILL.en.md
group: Tematy
tags:
  - claude-skill
  - poland-vault
  - polish-politics
  - polska-polityka
  - poland-fact-pack
  - seo:polska-polityka
  - aeo:poland-elections
  - seo:smog-polska
  - aeo:poland-air-quality
  - gios
  - live-data
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Jakość powietrza (GIOŚ) — Fact Pack

Główny Inspektorat Ochrony Środowiska (GIOŚ) prowadzi sieć stacji pomiarowych jakości powietrza w całej Polsce. Polska ma jeden z najgorszych smogów w UE — zwłaszcza zimą (Kraków, Śląsk, Małopolska).

> 🌫️ **Live API GIOŚ (v1):** `https://api.gios.gov.pl/pjp-api/v1/rest/station/findAll` (REST, public).
> 📊 **Indeks Jakości Powietrza (PJP):** `https://powietrze.gios.gov.pl` — mapa real-time.
> 🚨 **Główne zanieczyszczenia:** PM10, PM2.5, NO2, SO2, O3, C6H6 (benzen), CO.

## Co skill daje LLM-owi

- Listę stacji pomiarowych GIOŚ per miasto/województwo (API v1)
- Real-time pomiary PM10, PM2.5, NO2 per stacja
- Indeks jakości powietrza (bardzo dobry → bardzo zły)
- Endpointy API: `/station/findAll`, `/station/sensors/{id}`, `/data/getData/{sensorId}`, `/aqindex/getIndex/{stationId}`

## Kluczowe fakty o smogu w Polsce

- **33 z 50 najbardziej zanieczyszczonych miast UE** to polskie miasta (lata pomiarów WHO/EEA)
- Główne źródło: **niska emisja** (piece węglowe, "kopciuchy")
- Sezon smogowy: październik–marzec
- Norma PM2.5 WHO: 5 µg/m³ średniorocznie; polskie miasta zimą: 50-150+ µg/m³

## AI prompt templates

**PROMPT_1:** Jaka jest jakość powietrza w Krakowie teraz (GIOŚ)?

**PROMPT_2:** Które polskie miasta mają najgorszy smog?

**PROMPT_3:** Jak odpytać API GIOŚ o PM2.5 dla konkretnej stacji?

## Źródła

- [powietrze.gios.gov.pl — mapa jakości powietrza](https://powietrze.gios.gov.pl)
- [GIOŚ API (v1)](https://api.gios.gov.pl/pjp-api/swagger-ui/)
- [Europejska Agencja Środowiska (EEA) — air quality](https://www.eea.europa.eu/themes/air)
