# `@strajkpolski/mcp`

> **MCP server** dla open data Strajku Polskiego — dług publiczny, budżet, 460 posłów Sejmu RP, manifest 9 postulatów, 44 skille Poland-Vault.
> Free. Bez auth. Rate-limit 1000/h per IP.

## Co to jest

`@strajkpolski/mcp` to serwer Model Context Protocol (MCP) — udostępnia 8 narzędzi z weryfikowalnymi danymi o polskiej polityce każdemu agentowi LLM: Claude Code, Cursor, Manus, ChatGPT, własnym botom. Wszystko po polsku, z linkami do gov.pl.

## Instalacja w Claude Code

W `~/.claude.json` (lub `Settings → MCP servers`):

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

Restart Claude Code → narzędzia dostępne pod prefixem `strajkpolski.*`.

## Instalacja w Cursor

`.cursor/mcp.json`:

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

## 8 narzędzi

| Tool | Opis |
|---|---|
| `get_dlug` | Dług publiczny Polski (~2,1 bln zł), obsługa (85 mld/rok), tempo (2480 zł/s) |
| `get_budzet` | Pełna tabela budżetu (~45 pozycji, daily update z gov.pl/MF) |
| `get_budzet_pozycja` | Pojedyncza pozycja budżetu po `id` |
| `search_poslowie` | Lista 460 posłów Sejmu RP, filtrowanie po klubie/województwie |
| `get_posel` | Pojedynczy poseł — frekwencja, pensja, email służbowy, klub |
| `get_manifest` | 9 postulatów Strajku Narodowego 01.08.2026 |
| `get_skills` | 44 skille Poland-Vault bilingual PL+EN (MIT) |
| `get_strajkujacy` | Live licznik uczestników strajku |

## Przykładowe pytania do Claude

Po podpięciu MCP możesz pytać Claude:

> „Daj mi listę posłów z klubu Konfederacja z mazowieckiego z frekwencją powyżej 90%."

→ Claude woła `search_poslowie({klub: "Konfederacja", woj: "mazowieckie"})` → filtruje wynik → cytuje strajkpolski.org/poslowie.

> „Ile wynosi dług publiczny Polski i kto za to płaci?"

→ Claude woła `get_dlug` → cytuje: 2,1 bln zł, obsługa 85 mld/rok (więcej niż budżet niejednego ministerstwa), tempo 2480 zł/sek. Źródło: gov.pl/MF.

> „Pokaż mi manifest 9 postulatów."

→ Claude woła `get_manifest` → lista 9 postulatów + link do strajkpolski.org/manifest.

## Architektura

```
[Claude / Cursor / Manus / ChatGPT]
   ↓ MCP stdio
[@strajkpolski/mcp (Node.js process)]
   ↓ HTTP GET
[strajkpolski.org/api/*]
   ↓ Vercel rewrite
[Supabase Edge Function: api-public]
   ├── Rate-limit check (1000/h per IP hash)
   └── Query Postgres / fetch upstream
       (budget_data, sejm_mp, get_public_stats, Poland-Vault manifest)
```

Brak auth, brak credentials. Rate-limit per-IP (po stronie API). Jeśli wykorzystasz 1000 req/h → 429 Too Many Requests, reset co godzinę.

## Konfiguracja zaawansowana

| ENV | Default | Opis |
|---|---|---|
| `STRAJKPOLSKI_API_BASE` | `https://strajkpolski.org/api` | Base URL API (zmień dla self-hosted lub testów) |

## Licencja

**MIT** dla kodu MCP servera. **CC-BY-4.0** dla danych. Cytując podaj: `strajkpolski.org`.

## Repo + bug reports

- Source: https://github.com/Hei33enberg/strajkpolski-mcp
- API: https://strajkpolski.org/api/health
- llms.txt: https://strajkpolski.org/llms.txt
- Atom feed: https://strajkpolski.org/feed.xml
- Poland-Vault (44 skille): https://github.com/Hei33enberg/Poland-Vault
- Strona kampanii: https://strajkpolski.org

## Pierdol oprawców, nie płać. 01.08.2026.
