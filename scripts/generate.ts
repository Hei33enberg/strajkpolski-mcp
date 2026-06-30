#!/usr/bin/env tsx
/**
 * generate-skills.ts — generator 22 SKILL.md (PL) dla Poland-Vault.
 *
 * Decyzja CTO (LINEAR-2922 §Faza 1): BEZ LLM per regen.
 * Czyste query+template z live Supabase (publishable key, RLS pilnuje).
 *
 * Użycie:
 *   tsx scripts/generate-skills.ts                       → write do ../Poland-Vault/skills/
 *   tsx scripts/generate-skills.ts --out=./tmp           → write do ./tmp
 *   tsx scripts/generate-skills.ts --dry-run             → stdout zamiast file write
 *   tsx scripts/generate-skills.ts --only=poslowie       → tylko jeden slug
 *
 * ENV:
 *   SUPABASE_URL                = https://lqogkpknxwryvpdgdulx.supabase.co (StrajkPolski)
 *   SUPABASE_PUBLISHABLE_KEY    = anon key (publishable, OK exposed)
 *
 * Tenant: strajkpolski (single-tenant skill pack).
 */

import { createClient } from "@supabase/supabase-js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { templates } from "./skill-templates/index.ts";
import { renderSkill } from "./skill-templates/_render.ts";

// Lekki loader .env (bez dotenv dep) — czyta tylko KEY=VALUE i KEY="VALUE".
async function loadDotEnv(path = ".env"): Promise<void> {
  try {
    const txt = await readFile(path, "utf8");
    for (const raw of txt.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq < 0) continue;
      const k = line.slice(0, eq).trim();
      let v = line.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (!(k in process.env)) process.env[k] = v;
    }
  } catch {
    /* brak .env to OK */
  }
}

function parseArgs(argv: string[]) {
  const args: Record<string, string | boolean> = {};
  for (const a of argv.slice(2)) {
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      args[k] = v ?? true;
    }
  }
  return args;
}

async function main() {
  await loadDotEnv();
  const args = parseArgs(process.argv);
  const dryRun = Boolean(args["dry-run"]);
  const only = typeof args["only"] === "string" ? args["only"] : null;
  const outDir = typeof args["out"] === "string" ? args["out"] : "./skills";

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.error("❌ Brak SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY w env. Patrz .env (VITE_*).");
    process.exit(1);
  }

  const sb = createClient(url, key, { auth: { persistSession: false } });

  const list = only ? templates.filter((t) => t.meta.slug === only) : templates;
  if (only && list.length === 0) {
    console.error(`❌ Nie znaleziono template o slug=${only}. Dostępne: ${templates.map((t) => t.meta.slug).join(", ")}`);
    process.exit(2);
  }

  console.log(`📦 Poland-Vault generator — ${list.length} skill${list.length === 1 ? "" : "i"} (PL, BEZ LLM).`);
  console.log(`   Supabase: ${url}`);
  console.log(`   Output:   ${dryRun ? "(stdout — dry-run)" : resolve(outDir)}`);
  console.log("");

  let ok = 0;
  let fail = 0;
  for (const tpl of list) {
    const slug = tpl.meta.slug;
    try {
      const md = await renderSkill(tpl, sb);
      if (dryRun) {
        console.log(`\n══════════ ${slug} ══════════\n${md}`);
      } else {
        const filePath = join(outDir, slug, "SKILL.md");
        await mkdir(dirname(filePath), { recursive: true });
        await writeFile(filePath, md, "utf8");
        console.log(`✅ ${slug.padEnd(28)} → ${filePath} (${md.length}B)`);
      }
      ok++;
    } catch (err: any) {
      console.error(`❌ ${slug}: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n📊 OK: ${ok}/${list.length}, FAIL: ${fail}`);
  process.exit(fail > 0 ? 3 : 0);
}

main().catch((err) => {
  console.error("💥 Generator crashed:", err);
  process.exit(99);
});
