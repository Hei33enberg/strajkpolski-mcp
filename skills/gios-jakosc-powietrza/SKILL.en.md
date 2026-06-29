---
name: poland-vault-gios-jakosc-powietrza
description: "Air quality in Poland — GIOŚ, smog PM10/PM2.5/NO2, air quality index. API api.gios.gov.pl (v1)."
version: 1.0.0
author: strajkpolski
lang: en
twin: ./SKILL.md
group: Topics
tags:
  - claude-skill
  - poland-vault
  - polish-politics
  - polska-polityka
  - poland-fact-pack
  - seo:polska-polityka
  - aeo:poland-elections
  - aeo:polish-parliament
  - seo:smog-polska
  - aeo:poland-air-quality
  - gios
  - live-data
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Air Quality (GIOŚ) — Fact Pack

The Chief Inspectorate for Environmental Protection (GIOŚ) operates a network of air quality monitoring stations across Poland. Poland has one of the worst smog problems in the EU — especially in winter (Kraków, Silesia, Lesser Poland).

> 🌫️ **Live GIOŚ API (v1):** `https://api.gios.gov.pl/pjp-api/v1/rest/station/findAll` (REST, public).
> 📊 **Air Quality Index (PJP):** `https://powietrze.gios.gov.pl` — real-time map.
> 🚨 **Main pollutants:** PM10, PM2.5, NO2, SO2, O3, C6H6 (benzene), CO.

## What this skill gives the LLM

- List of GIOŚ monitoring stations per city/voivodeship (API v1)
- Real-time PM10, PM2.5, NO2 readings per station
- Air quality index (very good → very bad)
- API endpoints: `/station/findAll`, `/station/sensors/{id}`, `/data/getData/{sensorId}`, `/aqindex/getIndex/{stationId}`

## Key facts about smog in Poland

- **33 of the 50 most polluted cities in the EU** are Polish cities (WHO/EEA measurement years)
- Main source: **low-stack emissions** (coal stoves, "smokers")
- Smog season: October–March
- WHO PM2.5 standard: 5 µg/m³ annual average; Polish cities in winter: 50–150+ µg/m³

## AI prompt templates

**PROMPT_1:** What is the current air quality in Kraków (GIOŚ)?

**PROMPT_2:** Which Polish cities have the worst smog?

**PROMPT_3:** How do I query the GIOŚ API for PM2.5 data for a specific station?

## Sources

- [powietrze.gios.gov.pl — air quality map](https://powietrze.gios.gov.pl)
- [GIOŚ API (v1)](https://api.gios.gov.pl/pjp-api/swagger-ui/)
- [European Environment Agency (EEA) — air quality](https://www.eea.europa.eu/themes/air)