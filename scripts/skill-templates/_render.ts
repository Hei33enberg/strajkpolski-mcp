// Shared markdown renderer for Polish Strike skills.
// Frontmatter (YAML) + body. Brand: poland-vault. SEO tags PL + EN.

import type { SkillTemplate } from "./_types.ts";

const COMMON_TAGS = [
  "claude-skill",
  "poland-vault",
  "polish-politics",
  "polska-polityka",
  "poland-fact-pack",
  "seo:polska-polityka",
  "aeo:poland-elections",
];

const PLATFORMS = "[CLAUDE_CODE, CURSOR, MANUS, CHATGPT_APPS]";

function yaml(value: unknown): string {
  if (Array.isArray(value)) {
    return "\n" + value.map((v) => `  - ${v}`).join("\n");
  }
  if (typeof value === "string" && value.includes(":")) {
    return JSON.stringify(value);
  }
  return String(value);
}

export function renderFrontmatter(tpl: SkillTemplate, lang: "pl" | "en"): string {
  const m = tpl.meta;
  const tags = [...COMMON_TAGS, ...m.extraTags];
  const twin = lang === "pl" ? "./SKILL.en.md" : "./SKILL.md";

  return [
    "---",
    `name: poland-vault-${m.slug}`,
    `description: ${JSON.stringify(m.description)}`,
    `version: 1.0.0`,
    `author: strajkpolski`,
    `lang: ${lang}`,
    `twin: ${twin}`,
    `group: ${m.group}`,
    `tags:${yaml(tags)}`,
    `platforms: ${PLATFORMS}`,
    ...(m.mcp ? [`mcp: ${m.mcp}`] : []),
    ...(m.embed ? [`embed: ${m.embed}`] : []),
    "---",
    "",
  ].join("\n");
}

export async function renderSkill(
  tpl: SkillTemplate,
  sb: import("@supabase/supabase-js").SupabaseClient
): Promise<string> {
  const data = await tpl.query(sb).catch((err) => {
    console.warn(`[render] ${tpl.meta.slug} query failed:`, err.message);
    return {};
  });
  return renderFrontmatter(tpl, "pl") + tpl.body(data);
}
