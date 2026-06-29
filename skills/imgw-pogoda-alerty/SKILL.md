---
name: poland-vault-imgw-pogoda-alerty
description: "Pogoda i ostrzeżenia IMGW — live pomiary ze stacji synoptycznych (temperatura, wiatr, opady, ciśnienie). Dane z danepubliczne.imgw.pl."
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
  - seo:imgw-pogoda
  - aeo:poland-weather
  - live-data
  - alerty-pogodowe
platforms: [CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]
---
# Pogoda i ostrzeżenia IMGW — Fact Pack (live)

Live pomiary ze stacji synoptycznych IMGW (Instytut Meteorologii i Gospodarki Wodnej). **62 stacji** w ostatnim odczycie (2026-06-11 5:00). Regeneracja codzienna 04:00 UTC + API live.

> 🌡️ Dane z oficjalnego API: `https://danepubliczne.imgw.pl/api/data/synop` (REST, public, bez klucza).
> ⚠️ Ostrzeżenia meteorologiczne (burze, mróz, upały, wiatr): `meteo.imgw.pl` + RCB SMS alerts.
> 🌊 Hydrologia (stany rzek, powodzie): `hydro.imgw.pl`.

## Live odczyt — 20 stacji (2026-06-11 5:00)

| Stacja | Temp. | Wiatr | Opad | Ciśnienie |
|---|---|---|---|---|
| Białystok | 15°C | 2 m/s | 0 mm | 1009.7 hPa |
| Bielsko Biała | 10.3°C | 2 m/s | 45.3 mm | 1016.2 hPa |
| Chojnice | 10.7°C | 2 m/s | 2.6 mm | 1015.9 hPa |
| Częstochowa | 10°C | 3 m/s | 0.9 mm | 1014.9 hPa |
| Elbląg | 11.3°C | 2 m/s | 12.3 mm | 1013.9 hPa |
| Gdańsk | 13.8°C | 1 m/s | 4.7 mm | 1014.6 hPa |
| Gorzów | 11.5°C | 1 m/s | 0.01 mm | 1016 hPa |
| Hel | 14.1°C | 3 m/s | 3.6 mm | 1014.5 hPa |
| Jelenia Góra | 10°C | 1 m/s | 1.9 mm | 1017.5 hPa |
| Kalisz | 10.9°C | 5 m/s | 2 mm | 1015.4 hPa |
| Kasprowy Wierch | 3.8°C | 4 m/s | 22.4 mm | null hPa |
| Katowice | 10.7°C | 2 m/s | 0.8 mm | 1015.9 hPa |
| Kętrzyn | 12.1°C | 3 m/s | 1.2 mm | 1012 hPa |
| Kielce | 11.6°C | 3 m/s | 3 mm | 1012.1 hPa |
| Kłodzko | 10.2°C | 2 m/s | 0.6 mm | 1017.6 hPa |
| Koło | 11.7°C | 5 m/s | 2.9 mm | 1013.9 hPa |
| Kołobrzeg | 11.4°C | 2 m/s | 0.8 mm | 1015.7 hPa |
| Koszalin | 11.5°C | 1 m/s | 2.5 mm | 1015.8 hPa |
| Kozienice | 13.5°C | 2 m/s | 0.01 mm | 1009.6 hPa |
| Kraków | 11.7°C | 7 m/s | 15.2 mm | 1014.4 hPa |


_...i 42 więcej stacji w pełnym API._


## AI prompt templates

**PROMPT_1:** Jaka jest aktualna temperatura w Krakowie i Warszawie wg IMGW?

**PROMPT_2:** Gdzie w Polsce teraz pada najwięcej?

**PROMPT_3:** Które stacje IMGW notują najsilniejszy wiatr?

## Źródła

- [IMGW API danych publicznych](https://danepubliczne.imgw.pl/apiinfo)
- [meteo.imgw.pl — ostrzeżenia meteorologiczne](https://meteo.imgw.pl)
- [hydro.imgw.pl — stany wód](https://hydro.imgw.pl)
- [RCB — alerty SMS](https://www.gov.pl/web/rcb)
