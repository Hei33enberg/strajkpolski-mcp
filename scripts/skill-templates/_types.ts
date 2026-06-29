// Types for Poland-Vault skill templates (S2).
// Każdy template: meta (frontmatter) + query (live fetch) + body (markdown).
// BEZ LLM per regen (decyzja CTO LINEAR-2922 §Faza 1).

import type { SupabaseClient } from "@supabase/supabase-js";

export interface SkillMeta {
  slug: string;
  name: string; // frontmatter `name` — polish-strike-<slug>
  /** PL description for frontmatter. */
  description: string;
  /** Tematyczna grupa do indeksu README/manifestu. */
  group:
    | "Finanse"
    | "Sejm"
    | "Rząd"
    | "Układy"
    | "Manifest"
    | "Tematy";
  /** Extra per-skill tags poza common base (polish-strike, polish-politics, ...). */
  extraTags: string[];
  /** Powiązany MCP tool (Faza 2). */
  mcp?: string;
  /** URL embed widgetu (Faza 3). */
  embed?: string;
}

export interface SkillTemplate {
  meta: SkillMeta;
  /** Czyta live z Supabase. Zwraca dict do interpolacji w body. */
  query: (sb: SupabaseClient) => Promise<Record<string, unknown>>;
  /** Render markdown body (po frontmatter). Otrzymuje query result. */
  body: (data: Record<string, unknown>) => string;
}
