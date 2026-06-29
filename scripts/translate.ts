#!/usr/bin/env tsx
/**
 * translate-skills.ts — one-shot translation PL → EN dla Poland-Vault.
 *
 * Decyzja CTO (LINEAR-2922 §Faza 1): WYŁĄCZNIE Vercel AI Gateway.
 * Klucz `VERCEL_AI_GATEWAY_SP` żyje w Supabase Vault (sekrety edge functions)
 * — NIE w środowisku lokalnym, NIE w GitHub Actions. Dlatego wywołujemy
 * Supabase edge function `translate-md` (deployed na lqogkpknxwryvpdgdulx),
 * która używa `tenantedKey()` żeby wziąć właściwy SP-tenanted klucz i
 * routuje request do Vercel AI Gateway.
 *
 * To rozwiązuje problem: żaden klucz Gateway nie wycieka do lokalnego env
 * ani do repo public.
 *
 * Użycie:
 *   tsx scripts/translate-skills.ts --src=../Poland-Vault/skills
 *   tsx scripts/translate-skills.ts --src=../Poland-Vault/skills --only=poslowie
 *   tsx scripts/translate-skills.ts --src=../Poland-Vault/skills --model=anthropic/claude-sonnet-4-6
 *   tsx scripts/translate-skills.ts --src=../Poland-Vault/skills --force  # nadpisz wszystkie istniejące EN
 *
 * ENV:
 *   SUPABASE_URL              = https://lqogkpknxwryvpdgdulx.supabase.co (.env: VITE_*)
 *   SUPABASE_PUBLISHABLE_KEY  = anon key (.env: VITE_*)
 */

import { readFile, readdir, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";

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
  } catch {/* OK */}
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

async function translateViaEdge(
  plMarkdown: string,
  endpoint: string,
  apikey: string,
  model: string,
): Promise<{ en: string; usage?: { input: number; output: number } }> {
  const r = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey,
      Authorization: `Bearer ${apikey}`,
    },
    body: JSON.stringify({ pl: plMarkdown, model, max_tokens: 8192 }),
  });
  const text = await r.text();
  let j: any;
  try {
    j = JSON.parse(text);
  } catch {
    throw new Error(`edge-fn non-JSON ${r.status}: ${text.slice(0, 200)}`);
  }
  if (!r.ok || j?.error) {
    throw new Error(`edge-fn ${r.status} ${j?.error || ""}: ${j?.detail || text.slice(0, 200)}`);
  }
  if (typeof j?.en !== "string" || !j.en.trim()) {
    throw new Error("Empty translation");
  }
  return { en: j.en.trim(), usage: j.usage };
}

async function main() {
  await loadDotEnv();
  const args = parseArgs(process.argv);
  const src = typeof args["src"] === "string" ? args["src"] : "../Poland-Vault/skills";
  const only = typeof args["only"] === "string" ? args["only"] : null;
  const model = typeof args["model"] === "string" ? args["model"] : "anthropic/claude-sonnet-4-6";
  const force = Boolean(args["force"]);

  const supaUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const apikey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!supaUrl || !apikey) {
    console.error("❌ Brak SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY. Patrz .env (VITE_*).");
    process.exit(1);
  }
  const endpoint = `${supaUrl}/functions/v1/translate-md`;

  console.log(`🌍 Real translator (Vercel AI Gateway via Supabase edge fn translate-md)`);
  console.log(`   Endpoint: ${endpoint}`);
  console.log(`   Model:    ${model}`);
  console.log(`   Source:   ${src}`);
  console.log(`   Force:    ${force ? "yes (overwrite all)" : "no (skip if SKILL.en.md not stub)"}`);
  console.log("");

  const dirs = await readdir(src);
  let ok = 0;
  let fail = 0;
  let skipped = 0;
  let totalIn = 0;
  let totalOut = 0;
  for (const dir of dirs) {
    if (only && dir !== only) continue;
    const slug = dir;
    const plPath = join(src, slug, "SKILL.md");
    const enPath = join(src, slug, "SKILL.en.md");
    try {
      const st = await stat(plPath);
      if (!st.isFile()) continue;
    } catch {
      continue;
    }
    if (!force) {
      try {
        const existing = await readFile(enPath, "utf8");
        if (!existing.includes("EN translation pending") && existing.length > 200) {
          skipped++;
          continue;
        }
      } catch {/* nie istnieje — wygeneruj */}
    }
    try {
      const pl = await readFile(plPath, "utf8");
      const { en, usage } = await translateViaEdge(pl, endpoint, apikey, model);
      await writeFile(enPath, en, "utf8");
      if (usage) {
        totalIn += usage.input;
        totalOut += usage.output;
      }
      console.log(
        `✅ ${slug.padEnd(32)} → ${en.length}B${usage ? ` (${usage.input}+${usage.output} tok)` : ""}`,
      );
      ok++;
    } catch (err: any) {
      console.error(`❌ ${slug}: ${err.message}`);
      fail++;
    }
  }

  console.log(`\n📊 OK: ${ok}, FAIL: ${fail}, SKIPPED: ${skipped}`);
  if (totalIn || totalOut) {
    console.log(`   Tokens: ${totalIn} input + ${totalOut} output`);
  }
  process.exit(fail > 0 ? 3 : 0);
}

main().catch((err) => {
  console.error("💥 Translator crashed:", err);
  process.exit(99);
});
