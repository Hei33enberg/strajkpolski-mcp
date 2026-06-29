# Architektura Poland-Vault

> Jak działa pipeline 44 skilli — od live danych Supabase do plików `SKILL.md` gotowych dla AI.

## Diagram przepływu

```
┌─────────────────────┐
│  Źródła rządowe      │  sejm.gov.pl API, BZP (ezamowienia.gov.pl),
│  (gov.pl, GUS, PKW)  │  gov.pl, IMGW, GIOŚ, NFZ, NBP...
└──────────┬──────────┘
           │ ingest (pg_cron + GH Actions — repo strajkpolski)
           ▼
┌─────────────────────┐
│  Supabase (StrajkP.) │  budget_data, sejm_mp, sejm_votes,
│  TYLKO `published`   │  gov_persons, gov_entities, graph_nodes/edges,
│  (RLS pilnuje)       │  gov_salary_bands, stenogramy Sejmu (cytaty)
└──────────┬──────────┘
           │ publishable key (anon, read-only published)
           ▼
┌─────────────────────────────────────────────────┐
│  generator (BEZ LLM)  scripts/generate.ts         │
│  + 44 templates       scripts/skill-templates/    │
│    _types.ts / _render.ts / index.ts +            │
│    contacts.ts / civic.ts / expansion.ts /        │
│    society.ts                                     │
│  query(sb) → render() → markdown                  │
└──────────┬──────────────────────────────────────┘
           │ czyste query+template (zero halucynacji)
           ▼
┌─────────────────────┐      ┌──────────────────────────┐
│  skills/<slug>/      │      │  translate (1× per diff)  │
│  SKILL.md (PL)       │─────▶│  scripts/translate.ts →   │
│                      │      │  Supabase edge fn         │
│                      │      │  translate-md →           │
│                      │◀─────│  Vercel AI Gateway        │
│  SKILL.en.md (EN)    │      │  (VERCEL_AI_GATEWAY_SP)   │
└──────────┬──────────┘      └──────────────────────────┘
           │ generate-manifest.ts
           ▼
┌─────────────────────┐
│ skill-manifest.json  │  + root SKILL.md / SKILL.en.md (indeksy)
└──────────┬──────────┘
           │ validate.ts (bramka jakości)
           ▼
┌─────────────────────┐
│  git commit + push   │  → 4 platformy: Claude Code / Cursor /
│  (main, MIT public)  │     Manus / ChatGPT Apps
└─────────────────────┘
```

## Kluczowe decyzje (CTO)

1. **Generator BEZ LLM per regen.** SKILL.md to twarde liczby z gov źródeł — LLM tylko do PL→EN translacji (raz, committed). Zero ryzyka halucynacji w danych, zero kosztu per daily cron.
2. **Bilingual PL+EN.** PL kanoniczny + EN twin. Tagi bilingual (`poland-vault`, `polish-politics`, `poland-fact-pack`, `seo:polska-polityka`, `aeo:poland-elections`) → dziennikarz EN znajdzie nas tylko z EN tagami.
3. **AI WYŁĄCZNIE przez Vercel AI Gateway.** Klucz `VERCEL_AI_GATEWAY_SP` żyje w Supabase Vault; `translate.ts` woła edge fn `translate-md` (HTTP), klucz nigdy nie opuszcza Vaultu ani nie trafia do GH Actions/repo.

## Crony

- **`.github/workflows/sync-daily.yml`** — codziennie 04:00 UTC: regen 44 SKILL.md (PL) z live Supabase → manifest → diff → re-translate zmienione slugi (edge fn) → **validate (bramka)** → auto-commit.
- **`.github/workflows/validate.yml`** — na każdy push/PR: walidacja struktury (blokuje merge zepsutych skilli).

## Walidacja (bramka jakości)

`scripts/validate.ts` sprawdza, exit 1 przy błędzie:
- każdy `skills/<slug>/` ma SKILL.md + SKILL.en.md (>100B)
- frontmatter parsuje (gray-matter) + pola: name/lang/twin/tags/group
- **0 stubów** ("EN translation pending" zabronione na main)
- PL: lang=pl, twin=./SKILL.en.md, name=poland-vault-<slug>, ≥1 link gov
- EN: lang=en, twin=./SKILL.md
- `manifest.skills.length === liczba katalogów`

## Grupy skilli (44)

| Grupa | Skille |
|---|---|
| Finanse | budzet-publiczny, budzet-pelne-pozycje, dlug-publiczny, deficyt-budzetowy, inflacja-2021-2024, podatki-vat-pit-cit |
| Sejm | poslowie, kontakty-poslowie-pelna-lista, glosowania-sejmu, frekwencja-poslow, kontakty-senat |
| Rząd | rzad-i-instytucje, kontakty-rzad-pelne, kontakty-instytucje-centralne, urzedy-wojewodzkie, prezydenci-miast, pensje-rzadowe, spolki-skarbu-panstwa, kontakty-sady, kontakty-policja-prokuratura, mobywatel-uslugi-cyfrowe, samorzad-gmina-powiat |
| Układy | uklady-powiazania, zamowienia-publiczne, bzp-zamowienia-live, kasta-urzedicza |
| Manifest | manifest-9-zadan, cytaty-politykow, trybunal-zdrady-stanu, pkw-wybory-wyniki, partie-finansowanie |
| Tematy | stop-haraczom-na-ukraine, nfz-kolejki, nfz-leki-refundowane, lichwa-bankowa, zielony-lad-ue, system-zus, mercosur, numery-alarmowe-sluzby, imgw-pogoda-alerty, gios-jakosc-powietrza, koscioly-i-diecezje, zwiazki-zawodowe, media-publiczne |

## Niezmienniki

- Tylko `published` dane (RLS).
- Każda liczba ze źródłem (link gov).
- Zero PII; kontakty tylko publiczne (BIP/ePUAP/oficjalne).
- MIT — remix dozwolony, atrybucja do strajkpolski.org.
