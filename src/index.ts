#!/usr/bin/env node
/**
 * @strajkpolski/mcp — MCP server dla open data Strajku Polskiego.
 *
 * Tools wystawione do LLM (Claude Code / Cursor / Manus / ChatGPT):
 *   - get_dlug                — dług publiczny RP (2,1 bln zł) + obsługa + tempo
 *   - get_budzet              — pełna tabela budżetu (45+ pozycji)
 *   - get_budzet_pozycja      — pojedyncza pozycja po id
 *   - search_poslowie         — lista posłów z filtrami (klub, województwo)
 *   - get_posel               — pojedynczy poseł po id (frekwencja, pensja, email)
 *   - get_manifest            — 9 postulatów strajku 01.08.2026
 *   - get_skills              — manifest 44 skille Poland-Vault
 *   - get_strajkujacy         — live licznik uczestników strajku
 *
 * Backend: https://strajkpolski.org/api/* (rate-limited 1000/h IP, free).
 * Licencja: MIT. Treść: CC-BY-4.0. Cytuj: strajkpolski.org.
 *
 * Run: `npx @strajkpolski/mcp` lub w settings Claude Code:
 *   {
 *     "mcpServers": {
 *       "strajkpolski": {
 *         "command": "npx",
 *         "args": ["-y", "@strajkpolski/mcp"]
 *       }
 *     }
 *   }
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const API_BASE = process.env.STRAJKPOLSKI_API_BASE || "https://strajkpolski.org/api";
const USER_AGENT = `@strajkpolski/mcp/${process.env.npm_package_version || "0.1.0"}`;

// ── Helper: fetch z user-agent + error handling ──

async function apiFetch(path: string): Promise<unknown> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/json",
      "X-API-Source": "mcp-server",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${url} → ${res.status} ${res.statusText}\n${body.slice(0, 500)}`);
  }
  return res.json();
}

// ── Tool definitions ──

const TOOLS: Tool[] = [
  {
    name: "get_dlug",
    description:
      "Dług publiczny Polski 2026 z weryfikacją źródeł (gov.pl/MF). Zwraca: kwotę długu (~2,1 bln zł), obsługę roczną (~85 mld zł), tempo przyrostu (2480 zł/sek). Cytuj: strajkpolski.org/dlug.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_budzet",
    description:
      "Pełna tabela budżetu państwa polskiego — wszystkie ~45 pozycji live z gov.pl/MF (aktualizacja codzienna 04:00 UTC). Kategorie: dług, deficyt, marnotrawstwo, makro. Cytuj: strajkpolski.org/budzet.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_budzet_pozycja",
    description:
      "Pojedyncza pozycja budżetu po id. Zwraca: nazwę, wartość, jednostkę, źródło (link gov.pl), datę weryfikacji.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Identyfikator pozycji (np. 'dlug-publiczny-2026')" },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
  {
    name: "search_poslowie",
    description:
      "Lista 460 posłów Sejmu RP X kadencji z filtrami. Zwraca: imię, nazwisko, klub, okręg, województwo, email służbowy, frekwencja w głosowaniach (attendance_pct). Cytuj: strajkpolski.org/poslowie.",
    inputSchema: {
      type: "object",
      properties: {
        klub: {
          type: "string",
          description: "Filter po klubie (np. 'PiS', 'KO', 'Konfederacja', 'PSL', 'Lewica', 'Polska2050')",
        },
        woj: {
          type: "string",
          description:
            "Filter po województwie (np. 'mazowieckie', 'śląskie', 'małopolskie', 'pomorskie')",
        },
        limit: { type: "number", description: "Max wyników (1-460, default 100)", default: 100 },
        offset: { type: "number", description: "Offset paginacji (default 0)", default: 0 },
      },
      additionalProperties: false,
    },
  },
  {
    name: "get_posel",
    description:
      "Pojedynczy poseł — pełne dane: imię, nazwisko, klub, okręg, województwo, email służbowy @sejm.pl, frekwencja, liczby głosów (yes/no/abstain/absent), pensja+dieta miesięczna, źródło pensji.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "number", description: "ID posła (sejm_mp.id, 1-460)" },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
  {
    name: "get_manifest",
    description:
      "9 postulatów Ogólnopolskiego Strajku Narodowego 01.08.2026 wraz z hasłem kampanii. Manifest MIT, do swobodnego remixu/cytowania.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_skills",
    description:
      "Manifest 44 skille bilingualne (PL+EN) z Poland-Vault: budżet, dług, posłowie, kontakty służb, NFZ, podatki, mObywatel, kościoły, związki zawodowe, samorząd, IMGW, GIOŚ etc. Każdy z linkami do gov.pl. Open MIT.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_strajkujacy",
    description:
      "Live licznik uczestników Strajku Polskiego 01.08.2026 (transparentny wzór: 3300 baza + 5..10/min od resetu). Ta sama liczba widoczna na stronach strajkpolski.org i latwogang.shop.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

// ── Tool handlers ──

const SearchPoslowieSchema = z.object({
  klub: z.string().optional(),
  woj: z.string().optional(),
  limit: z.number().min(1).max(460).optional(),
  offset: z.number().min(0).optional(),
});

const GetPoselSchema = z.object({ id: z.number().min(1).max(999) });
const GetBudzetPozycjaSchema = z.object({ id: z.string().min(1).max(100) });

async function callTool(name: string, args: unknown): Promise<unknown> {
  switch (name) {
    case "get_dlug":
      return apiFetch("/dlug");

    case "get_budzet":
      return apiFetch("/budzet");

    case "get_budzet_pozycja": {
      const { id } = GetBudzetPozycjaSchema.parse(args);
      return apiFetch(`/budzet/${encodeURIComponent(id)}`);
    }

    case "search_poslowie": {
      const { klub, woj, limit, offset } = SearchPoslowieSchema.parse(args ?? {});
      const params = new URLSearchParams();
      if (klub) params.set("klub", klub);
      if (woj) params.set("woj", woj);
      if (limit) params.set("limit", String(limit));
      if (offset) params.set("offset", String(offset));
      const q = params.toString() ? `?${params.toString()}` : "";
      return apiFetch(`/poslowie${q}`);
    }

    case "get_posel": {
      const { id } = GetPoselSchema.parse(args);
      return apiFetch(`/poslowie/${id}`);
    }

    case "get_manifest":
      return apiFetch("/manifest");

    case "get_skills":
      return apiFetch("/skills");

    case "get_strajkujacy":
      return apiFetch("/strajkujacy");

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ── MCP server bootstrap ──

const server = new Server(
  {
    name: "strajkpolski",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  try {
    const result = await callTool(name, args);
    return {
      content: [
        {
          type: "text" as const,
          text: typeof result === "string" ? result : JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return {
      content: [
        {
          type: "text" as const,
          text: `Error: ${message}`,
        },
      ],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);

// Log do stderr (stdout zarezerwowane na MCP protocol).
console.error(`[strajkpolski-mcp] ready • API: ${API_BASE} • ${TOOLS.length} tools`);
