#!/usr/bin/env tsx
/**
 * validate.ts — bramka jakości Poland-Vault (FAZA 2 T5).
 *
 * Sprawdza PRZED commitem (CI validate.yml + krok w sync-daily.yml):
 *  1. każdy katalog skills/<slug>/ ma SKILL.md (PL) + SKILL.en.md (EN)
 *  2. frontmatter parsuje się (gray-matter) + wymagane pola (name/lang/twin/tags/group)
 *  3. ZERO wystąpień "EN translation pending" (stuby zabronione na main)
 *  4. skill-manifest.json `.skills.length === liczba katalogów`
 *  5. każdy PL SKILL.md ma ≥1 link do gov źródła
 *  6. lang PL=pl, EN=en; twin wskazuje na bliźniaka
 *
 * Exit 1 przy jakimkolwiek błędzie (blokuje merge/commit).
 *
 * Użycie: npx tsx scripts/validate.ts
 */

import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

const SKILLS_DIR = "skills";
const MANIFEST = "skill-manifest.json";
const REQUIRED_FIELDS = ["name", "lang", "twin", "tags", "group"];
const SOURCE_RE = /https:\/\/(www\.)?[a-z0-9.-]*(gov\.pl|sejm\.gov\.pl|nbp\.pl|stat\.gov\.pl|nfz\.gov\.pl|pkw\.gov\.pl|wybory\.gov\.pl|ezamowienia\.gov\.pl|isap\.sejm\.gov\.pl|zus\.pl|policja\.pl|imgw\.pl|gios\.gov\.pl|epuap\.gov\.pl|pz\.gov\.pl|senat\.gov\.pl|strajkpolski\.org|europa\.eu|ifw-kiel\.de)/i;

const errors: string[] = [];
const err = (m: string) => errors.push(m);

async function main() {
  let dirs: string[];
  try {
    dirs = (await readdir(SKILLS_DIR, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    console.error(`❌ Brak katalogu ${SKILLS_DIR}/`);
    process.exit(1);
  }

  console.log(`🔍 Walidacja ${dirs.length} skilli...`);

  for (const slug of dirs.sort()) {
    const plPath = join(SKILLS_DIR, slug, "SKILL.md");
    const enPath = join(SKILLS_DIR, slug, "SKILL.en.md");

    // 1. oba pliki istnieją
    for (const [p, lbl] of [[plPath, "SKILL.md"], [enPath, "SKILL.en.md"]] as const) {
      try {
        const s = await stat(p);
        if (!s.isFile() || s.size < 100) err(`${slug}: ${lbl} brak/za mały (${s.size}B)`);
      } catch {
        err(`${slug}: brak ${lbl}`);
      }
    }

    // 2-6. PL
    try {
      const pl = await readFile(plPath, "utf8");
      const fm = matter(pl);
      for (const f of REQUIRED_FIELDS) {
        if (!(f in fm.data)) err(`${slug}: PL brak frontmatter pola "${f}"`);
      }
      if (fm.data.lang !== "pl") err(`${slug}: PL lang!=pl (${fm.data.lang})`);
      if (fm.data.twin !== "./SKILL.en.md") err(`${slug}: PL twin!=./SKILL.en.md`);
      if (fm.data.name !== `poland-vault-${slug}`) err(`${slug}: PL name!=poland-vault-${slug}`);
      if (pl.includes("EN translation pending")) err(`${slug}: PL zawiera 'EN translation pending'`);
      if (!SOURCE_RE.test(pl)) err(`${slug}: PL brak linku do gov źródła`);
    } catch (e: any) {
      err(`${slug}: PL parse error — ${e.message}`);
    }

    // EN
    try {
      const en = await readFile(enPath, "utf8");
      const fm = matter(en);
      if (fm.data.lang !== "en") err(`${slug}: EN lang!=en (${fm.data.lang})`);
      if (fm.data.twin !== "./SKILL.md") err(`${slug}: EN twin!=./SKILL.md`);
      if (en.includes("EN translation pending")) err(`${slug}: EN to STUB ('translation pending')`);
    } catch (e: any) {
      err(`${slug}: EN parse error — ${e.message}`);
    }
  }

  // 4. manifest count == dirs
  try {
    const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
    const n = manifest?.skills?.length ?? -1;
    if (n !== dirs.length) err(`manifest.skills.length=${n} != katalogów=${dirs.length}`);
  } catch (e: any) {
    err(`manifest parse error — ${e.message}`);
  }

  if (errors.length) {
    console.error(`\n❌ WALIDACJA NIEUDANA — ${errors.length} błędów:`);
    for (const e of errors) console.error(`   • ${e}`);
    process.exit(1);
  }
  console.log(`✅ Walidacja OK — ${dirs.length} skilli, PL+EN kompletne, 0 stubów, manifest match.`);
}

main().catch((e) => {
  console.error("💥 validate crashed:", e);
  process.exit(99);
});
