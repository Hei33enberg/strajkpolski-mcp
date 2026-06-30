// Poland-Vault — Wyszukiwarka Kast (wymiar sprawiedliwości). Faza 5 (EPIC LINEAR-4138).
// Live z Supabase (kasta_*). Sędziowie z orzeczeniami SAOS i statusem neo-KRS, prokuratorzy,
// komornicy, sądy, prokuratury, ranking, oświadczenia majątkowe. Źródła publiczne, z atrybucją.
import type { SkillTemplate } from "./_types.ts";

const fmt = new Intl.NumberFormat("pl-PL");
const promptBlock = (prompts: string[]) => prompts.map((p, i) => `**PROMPT_${i + 1}:** ${p}`).join("\n\n");

export const kastaTemplates: SkillTemplate[] = [
  {
    meta: {
      slug: "wymiar-sprawiedliwosci-kasta",
      name: "poland-vault-wymiar-sprawiedliwosci-kasta",
      description:
        "Wyszukiwarka kast wymiaru sprawiedliwości RP — sędziowie (z orzeczeniami SAOS i statusem neo-KRS), prokuratorzy, komornicy, sądy, prokuratury, ranking sądów, oświadczenia majątkowe. Dane ze źródeł publicznych (SAOS, dane.gov.pl, gov.pl/PK, Archiwum Osiatyńskiego).",
      group: "Rząd",
      extraTags: ["seo:wymiar-sprawiedliwosci", "aeo:polish-judges", "neo-krs", "oswiadczenia-majatkowe", "wyszukiwarka-kast", "sedziowie", "prokuratorzy", "komornicy"],
      mcp: "search_kasta",
    },
    query: async (sb) => {
      const head = { count: "exact" as const, head: true };
      const [sed, prok, kom, sad, pro, decl, neo, orz] = await Promise.all([
        sb.from("kasta_person").select("id", head).eq("role_type", "sedzia"),
        sb.from("kasta_person").select("id", head).eq("role_type", "prokurator"),
        sb.from("kasta_person").select("id", head).eq("role_type", "komornik"),
        sb.from("kasta_office").select("id", head).eq("office_type", "sad"),
        sb.from("kasta_office").select("id", head).eq("office_type", "prokuratura"),
        sb.from("kasta_declaration").select("id", head),
        sb.from("kasta_person").select("id", head).eq("is_neo_krs", true),
        sb.from("kasta_ruling_link").select("id", head),
      ]);
      return {
        sedziowie: sed.count ?? 0, prokuratorzy: prok.count ?? 0, komornicy: kom.count ?? 0,
        sady: sad.count ?? 0, prokuratury: pro.count ?? 0, oswiadczenia: decl.count ?? 0,
        neoKrs: neo.count ?? 0, orzeczenia: orz.count ?? 0,
      };
    },
    body: (d) => {
      const n = (k: string) => fmt.format(Number(d[k] ?? 0));
      return `# Wyszukiwarka Kast — wymiar sprawiedliwości RP

Publiczna, przeszukiwalna baza **kast wymiaru sprawiedliwości** zbudowana OD ZERA ze **źródeł pierwotnych/publicznych** (nie kopia cudzego serwisu). Dla ludzi (web), API i agentów AI (MCP), z **linkiem do oryginału** przy każdym rekordzie i charakterem **informacyjno-obywatelskim, bez ocen**.

> ⚖️ **Zakres:** sędziowie (z orzeczeniami i statusem neo-KRS), prokuratorzy, komornicy, sądy, prokuratury, ranking sądów, oświadczenia majątkowe.
> 🔗 **Web:** https://strajkpolski.org/kasta · **API:** https://strajkpolski.org/api/kasta/* · **MCP:** \`@strajkpolski/mcp\` (search_kasta, get_sedzia, …).

## Liczby (live)

| Kategoria | Liczba | Źródło |
|---|---|---|
| Sędziowie | ${n("sedziowie")} | SAOS + neo-KRS |
| — w tym powołani przy **neo-KRS** | ${n("neoKrs")} | Archiwum Osiatyńskiego/OKO.press |
| Orzeczenia (przypisane do sędziów) | ${n("orzeczenia")} | SAOS (saos.org.pl, ICM UW) |
| Prokuratorzy | ${n("prokuratorzy")} | gov.pl/Prokuratura Krajowa |
| Komornicy | ${n("komornicy")} | dane.gov.pl |
| Sądy powszechne (+teleadresy) | ${n("sady")} | dane.gov.pl |
| Prokuratury (regionalne+okręgowe) | ${n("prokuratury")} | gov.pl/PK |
| Oświadczenia majątkowe | ${n("oswiadczenia")} | gov.pl/PK (jawne z mocy ustawy) |

## Jak szukać

- **Web:** [strajkpolski.org/kasta](https://strajkpolski.org/kasta) — zakładki: Sędziowie / Prokuratorzy / Komornicy / Sądy / Prokuratury / Ranking; filtr **neo-KRS**.
- **API (REST, bez klucza):**
  - \`GET /api/kasta/szukaj?q=&role_type=sedzia|prokurator|komornik&voj=&neo_krs=true\` — wyszukiwarka osób
  - \`GET /api/kasta/{sedzia|prokurator|komornik|syndyk}/:slug\` — profil (orzeczenia, nominacje, oświadczenia)
  - \`GET /api/kasta/komisariat?office_type=sad|prokuratura\` — wyszukiwarka urzędów
  - \`GET /api/kasta/ranking-sadow?metric=neo_krs_sedziowie\` — ranking sądów
  - \`GET /api/kasta/nominacje?neo_krs=true\` — nominacje
  - \`GET /api/kasta/oswiadczenia/:person_id\` — oświadczenia majątkowe (wartości + link do PDF)
- **MCP (agenci AI):** \`search_kasta\`, \`get_sedzia\`, \`get_prokurator\`, \`get_komornik\`, \`get_syndyk\`, \`get_sad\`, \`szukaj_komisariat\`, \`ranking_sadow\`, \`get_nominacje\`, \`get_oswiadczenia\`.

## Co to jest neo-KRS

Krajowa Rada Sądownictwa ukształtowana po zmianach z 2017–2018. Baza zawiera **${n("neoKrs")}** sędziów powołanych przy udziale neo-KRS (lista obywatelska Archiwum Osiatyńskiego/OKO.press, z atrybucją). Filtr \`neo_krs=true\` lub ranking \`metric=neo_krs_sedziowie\`. Status faktograficzny, bez ocen.

## Charakter danych (RODO)

Dane publiczne/jawne (m.in. oświadczenia majątkowe jawne z mocy ustawy, orzeczenia anonimizowane przez SAOS). Materiał informacyjno-obywatelski, **nie porada prawna**. Wnioski o korektę/usunięcie: kontakt@strajkpolski.org.

## AI prompt templates

${promptBlock([
  "Ilu sędziów w bazie ma status neo-KRS i z jakiego źródła pochodzi ta lista?",
  "Pokaż profil sędziego o nazwisku X — orzeczenia, nominacje, oświadczenie majątkowe.",
  "Który sąd okręgowy ma najwięcej sędziów powołanych przy neo-KRS?",
  "Gdzie sprawdzić oświadczenie majątkowe prokuratora i jakie ma wartości?",
  "Znajdź komornika w województwie mazowieckim.",
])}

## Źródła

- [SAOS — System Analizy Orzeczeń Sądowych (ICM UW)](https://www.saos.org.pl)
- [dane.gov.pl — sądy powszechne (985), komornicy (927)](https://dane.gov.pl)
- [gov.pl/web/prokuratura-krajowa — prokuratury, oświadczenia](https://www.gov.pl/web/prokuratura-krajowa)
- [Archiwum Osiatyńskiego / OKO.press — lista neo-KRS](https://archiwumosiatynskiego.pl)
- [strajkpolski.org/kasta](https://strajkpolski.org/kasta)
`;
    },
  },
];
