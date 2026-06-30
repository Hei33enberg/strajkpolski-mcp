#!/usr/bin/env tsx
/**
 * generate-manifest.ts — buduje root manifest + indexy dla Poland-Vault.
 *
 * Output (do --out, default ../Poland-Vault/):
 *   skill-manifest.json       — bilingual JSON hub (22 skille × {pl, en, mcp, embed})
 *   SKILL.md                  — root index PL (grupy + linki do skills/<slug>/SKILL.md)
 *   SKILL.en.md               — root index EN
 *
 * Czyta z każdego skills/<slug>/{SKILL.md, SKILL.en.md} frontmatter (pierwsze 30 linii).
 */

import { readFile, readdir, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";

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

interface Frontmatter {
  name?: string;
  description?: string;
  group?: string;
  lang?: string;
  tags?: string[];
  mcp?: string;
  embed?: string;
}

function parseFrontmatter(md: string): Frontmatter {
  const m = md.match(/^---\n([\s\S]+?)\n---/);
  if (!m) return {};
  const fm: Frontmatter = {};
  const lines = m[1].split("\n");
  let inTags = false;
  const tags: string[] = [];
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (inTags) {
      if (line.startsWith("  - ")) {
        tags.push(line.slice(4).trim());
        continue;
      }
      inTags = false;
    }
    if (line === "tags:") {
      inTags = true;
      continue;
    }
    const eq = line.indexOf(":");
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    let v = line.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    (fm as any)[k] = v;
  }
  if (tags.length) fm.tags = tags;
  return fm;
}

const GROUP_ORDER = ["Finanse", "Sejm", "Rząd", "Układy", "Manifest", "Tematy"] as const;
const GROUP_EN: Record<string, string> = {
  Finanse: "Finance",
  Sejm: "Parliament",
  Rząd: "Government",
  Układy: "Connections",
  Manifest: "Manifesto",
  Tematy: "Topics",
};

async function main() {
  const args = parseArgs(process.argv);
  const root = typeof args["out"] === "string" ? args["out"] : ".";
  const skillsDir = join(root, "skills");

  const dirs = await readdir(skillsDir);
  type Entry = { slug: string; pl: Frontmatter; en: Frontmatter };
  const entries: Entry[] = [];

  for (const slug of dirs) {
    try {
      const plPath = join(skillsDir, slug, "SKILL.md");
      const enPath = join(skillsDir, slug, "SKILL.en.md");
      const st = await stat(plPath);
      if (!st.isFile()) continue;
      const plMd = await readFile(plPath, "utf8");
      const enMd = await readFile(enPath, "utf8").catch(() => "");
      entries.push({ slug, pl: parseFrontmatter(plMd), en: parseFrontmatter(enMd) });
    } catch {
      /* skip */
    }
  }

  entries.sort((a, b) => a.slug.localeCompare(b.slug));

  // ── skill-manifest.json (bilingual) ─────────────────────────────────────
  const manifest = {
    version: "1.0.0",
    name: "Poland-Vault",
    description: "Polish politics fact-pack skills — 22 SKILL.md (PL) + 22 SKILL.en.md (EN). Live data via StrajkPolski.",
    repo: "https://github.com/Hei33enberg/Poland-Vault",
    license: "MIT",
    skills: entries.map((e) => ({
      slug: e.slug,
      name: e.pl.name ?? `poland-vault-${e.slug}`,
      group: e.pl.group ?? null,
      pl: {
        path: `skills/${e.slug}/SKILL.md`,
        description: e.pl.description ?? "",
        tags: e.pl.tags ?? [],
      },
      en: {
        path: `skills/${e.slug}/SKILL.en.md`,
        description: e.en.description ?? "",
        tags: e.en.tags ?? [],
      },
      mcp_tool: e.pl.mcp ?? null,
      embed_url: e.pl.embed ?? null,
    })),
  };
  await writeFile(join(root, "skill-manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
  console.log(`✅ skill-manifest.json (${entries.length} skills)`);

  // ── root SKILL.md (PL) ─────────────────────────────────────────────────
  const grouped: Record<string, Entry[]> = {};
  for (const e of entries) {
    const g = e.pl.group ?? "Tematy";
    (grouped[g] ||= []).push(e);
  }
  const sectionsPl = GROUP_ORDER.map((g) => {
    const list = grouped[g];
    if (!list?.length) return null;
    const items = list
      .map((e) => `- [\`${e.pl.name ?? e.slug}\`](./skills/${e.slug}/SKILL.md) — ${e.pl.description ?? ""}`)
      .join("\n");
    return `### ${g}\n\n${items}`;
  }).filter(Boolean).join("\n\n");
  const skillMd = `# Poland-Vault — index PL

> **${entries.length} skill${entries.length === 1 ? "" : "i"}** Polskiej polityki dla Claude Code / Cursor / Manus / ChatGPT Apps. Live data ze StrajkPolski. MIT. PL+EN bilingual.

→ EN index: [SKILL.en.md](./SKILL.en.md) · GH: [Hei33enberg/Poland-Vault](https://github.com/Hei33enberg/Poland-Vault) · Live: [strajkpolski.org](https://strajkpolski.org)

---

${sectionsPl}

---

🔴 **PIERDOL, NIE PŁAĆ** — [strajkpolski.org/dolacz](https://strajkpolski.org/dolacz)
`;
  await writeFile(join(root, "SKILL.md"), skillMd, "utf8");
  console.log(`✅ SKILL.md (PL index, ${entries.length} entries)`);

  // ── root SKILL.en.md (EN) ──────────────────────────────────────────────
  const sectionsEn = GROUP_ORDER.map((g) => {
    const list = grouped[g];
    if (!list?.length) return null;
    const heading = GROUP_EN[g] ?? g;
    const items = list
      .map((e) => `- [\`${e.en.name ?? e.pl.name ?? e.slug}\`](./skills/${e.slug}/SKILL.en.md) — ${e.en.description ?? "EN translation pending"}`)
      .join("\n");
    return `### ${heading}\n\n${items}`;
  }).filter(Boolean).join("\n\n");
  const skillEnMd = `# Poland-Vault — EN index

> **${entries.length} skill${entries.length === 1 ? "" : "s"}** of Polish politics for Claude Code / Cursor / Manus / ChatGPT Apps. Live data from StrajkPolski. MIT. PL+EN bilingual.

→ PL index: [SKILL.md](./SKILL.md) · GH: [Hei33enberg/Poland-Vault](https://github.com/Hei33enberg/Poland-Vault) · Live: [strajkpolski.org](https://strajkpolski.org)

---

${sectionsEn}

---

🔴 **PIERDOL, NIE PŁAĆ** — _"Fuck them, don't pay"_ → [strajkpolski.org/dolacz](https://strajkpolski.org/dolacz)
`;
  await writeFile(join(root, "SKILL.en.md"), skillEnMd, "utf8");
  console.log(`✅ SKILL.en.md (EN index, ${entries.length} entries)`);

  console.log(`\n📊 Manifest + indexy gotowe. Output: ${root}`);
}

main().catch((err) => {
  console.error("💥 Manifest generator crashed:", err);
  process.exit(99);
});
