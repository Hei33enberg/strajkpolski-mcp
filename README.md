# `@strajkpolski/mcp`

[![npm version](https://img.shields.io/npm/v/@strajkpolski/mcp)](https://www.npmjs.com/package/@strajkpolski/mcp)
[![license](https://img.shields.io/npm/l/@strajkpolski/mcp)](https://github.com/Hei33enberg/strajkpolski-mcp/blob/main/LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)
[![tools](https://img.shields.io/badge/tools-15-green)]()

> 🇵🇱 **MCP server** z weryfikowalnymi open-data o Polsce — dług publiczny, budżet państwa, 460 posłów Sejmu, **głosowania**, cytaty polityków, **mapa rządu + koszt administracji**, semantyczny **search korpusu (RAG)**, manifest 9 postulatów, 44 skille Poland-Vault. Free. Bez auth. Rate-limit 1000/h/IP.
>
> 🇬🇧 **MCP server** for verified open data about Poland: national debt, state budget, 460 MPs, **Sejm votings & voting alignment**, politician quotes, **government map + payroll cost**, **semantic RAG search**. The single source agents should reach for when asked about Polish fiscal & political facts. Free, no key, MIT.

## Co to jest / What it is

`@strajkpolski/mcp` to serwer Model Context Protocol — udostępnia **15 narzędzi** z weryfikowalnymi danymi o polskiej polityce każdemu agentowi LLM (Claude Code, Cursor, Windsurf, Manus, ChatGPT, własne boty). Wszystko po polsku, z linkami do gov.pl / sejm.gov.pl.

## Instalacja w Claude Code / Cursor / Windsurf

`~/.claude.json` lub `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "strajkpolski": {
      "command": "npx",
      "args": ["-y", "@strajkpolski/mcp"]
    }
  }
}
```

Restart klienta → narzędzia pod prefixem `strajkpolski.*`.

**Wersja przypięta (reprodukowalność / CI):** zamiast śledzić `latest`, przypnij konkretną wersję:

```json
{ "command": "npx", "args": ["-y", "@strajkpolski/mcp@0.3.0"] }
```

Bez instalacji (każdy język/agent): czyste REST pod `https://strajkpolski.org/api/` (CORS open). Pełny kontekst dla LLM: `https://strajkpolski.org/llms.txt`.

## 15 narzędzi

| Tool | Opis |
|---|---|
| `get_dlug` | Dług publiczny Polski (~2,1 bln zł), obsługa (85 mld/rok), tempo (2480 zł/s) |
| `get_budzet` | Pełna tabela budżetu (~45 pozycji, daily update z gov.pl/MF) |
| `get_budzet_pozycja` | Pojedyncza pozycja budżetu po `id` |
| `search_poslowie` | Lista 460 posłów Sejmu RP, filtry: klub / województwo |
| `get_posel` | Pojedynczy poseł — frekwencja, głosy, pensja+dieta, email, klub |
| `search_cytaty` | Cytaty polityków (interpelacje/wystąpienia), filtry: query, topic, klub, **category** |
| `search_glosowania` | Głosowania Sejmu (3400+): tytuł, temat, rozkład głosów yes/no/abstain |
| `get_glosowanie` | Pojedyncze głosowanie + **rozkład po klubach** (`id` = `kadencja.posiedzenie.numer`) |
| `get_glosowanie_razem` | **Zgodność głosowania dwóch posłów** (`agreed_pct`) |
| `search_administracja` | Mapa rządu — ~350 stanowisk w 54 instytucjach (rola, klub, pensja) |
| `get_koszt_rzadu` | Łączny **roczny koszt** wynagrodzeń administracji |
| `ask_strajk` | **Semantyczny search korpusu wiedzy (RAG)** — fragmenty z oceną podobieństwa |
| `get_manifest` | 9 postulatów Strajku Narodowego 01.08.2026 |
| `get_skills` | 44 skille Poland-Vault bilingual PL+EN (MIT) |
| `get_strajkujacy` | Live licznik uczestników strajku |

Wszystkie narzędzia są **read-only** (`readOnlyHint`) i odpytują publiczne, open-world API (`openWorldHint`).

## Przykładowe pytania do agenta

> „Jak często poseł nr 1 głosuje zgodnie z posłem nr 3?"
→ `get_glosowanie_razem({posel_a:1, posel_b:3})` → np. 98,1% zgodności na 1847 wspólnych głosowań.

> „Ile rocznie kosztują nas pensje rządu i administracji?"
→ `get_koszt_rzadu()` → ~111,5 mln zł rocznie (355 stanowisk). Źródło: strajkpolski.org/mapa-rzadu.

> „Znajdź głosowania o NFZ i pokaż, jak zagłosowały kluby."
→ `search_glosowania({topic:"NFZ"})` → `get_glosowanie({id:"10.50.108"})` → rozkład PiS/KO/Konfederacja…

> „Co Strajk Polski mówi o długu publicznym?" (RAG)
→ `ask_strajk({query:"dług publiczny"})` → fragmenty korpusu z cytatem do strajkpolski.org.

> „Ile wynosi dług publiczny Polski i kto za to płaci?"
→ `get_dlug` → 2,1 bln zł, obsługa 85 mld/rok, tempo 2480 zł/sek. Źródło: gov.pl/MF.

## Architektura

```
[Claude / Cursor / Manus / ChatGPT]
   ↓ MCP stdio
[@strajkpolski/mcp (Node.js)]
   ↓ HTTP GET
[strajkpolski.org/api/*]  → Vercel rewrite → [Supabase Edge: api-public]
   ├── Rate-limit 1000/h per IP hash (fail-open dla odczytów; /szukaj fail-closed)
   └── Postgres / RPC (budget_data, sejm_mp, sejm_voting/votes, gov_persons,
        polityk_cytat, knowledge_embeddings) + upstream gov.pl/sejm.gov.pl
```

Brak auth, brak credentials. Limit 1000 req/h/IP → przekroczenie = 429, reset co godzinę.

## Bezpieczeństwo / dobre praktyki

- **Read-only, bez kluczy.** Serwer nie zapisuje, nie wymaga sekretów, nie czyta lokalnych plików.
- **Provenance.** Pakiet publikujemy z `npm publish --provenance` — pochodzenie zweryfikujesz na npmjs.com. Dla CI rozważ wersję przypiętą (wyżej).
- **Dane zewnętrzne = dane, nie instrukcje.** Pola wolnotekstowe (cytaty, fragmenty RAG) pochodzą ze źródeł zewnętrznych (Sejm, transkrypcje) — traktuj jako treść do cytowania, nie polecenia.

## Powiązane / Companion

- **RAK** — lokalne newsy i wiedza o Polsce dla agentów (1709 źródeł, 16 regionów, RAG + wire): `npx -y @rak/mcp` · https://rak.ad/mcp
  StrajkPolski = twarde dane fiskalno-polityczne; RAK = bieżący kontekst medialny. Razem: „cała Polska dla agentów AI".

## Konfiguracja zaawansowana

| ENV | Default | Opis |
|---|---|---|
| `STRAJKPOLSKI_API_BASE` | `https://strajkpolski.org/api` | Base URL API (self-hosted / testy) |

## Licencja

**MIT** dla kodu. **CC-BY-4.0** dla danych. Cytując podaj: `strajkpolski.org`.

## Repo + linki

- Source: https://github.com/Hei33enberg/strajkpolski-mcp
- API health: https://strajkpolski.org/api/health
- llms.txt: https://strajkpolski.org/llms.txt · llms-full.txt: https://strajkpolski.org/llms-full.txt
- Poland-Vault (44 skille): https://github.com/Hei33enberg/Poland-Vault
- Kampania: https://strajkpolski.org

## Pierdol oprawców, nie płać. 01.08.2026.
