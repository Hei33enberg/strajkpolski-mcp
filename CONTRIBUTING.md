# Contributing — Poland-Vault

Dzięki za zainteresowanie! Poland-Vault to MIT, otwarty na kontrybucje. Poniżej jak dodać/poprawić skill.

## Zasady (niezmienniki)

1. **Tylko publiczne, oficjalne dane** — gov.pl, sejm.gov.pl API, BZP, GUS, PKW, IMGW, GIOŚ itp. Zero PII, zero prywatnych telefonów.
2. **Każda liczba ze źródłem** — link do oficjalnego źródła w sekcji `## Źródła`.
3. **BEZ LLM w generatorze** — skille to query+template. LLM tylko do PL→EN translacji.
4. **Bilingual** — PL kanoniczny + EN twin.

## Jak dodać nowy skill

1. **Wybierz plik grupy** w `scripts/skill-templates/`:
   - `contacts.ts` — kontakty instytucji/osób
   - `civic.ts` — dane obywatelskie (wybory, BZP, służby)
   - `expansion.ts` — usługi/praktyczne (podatki, NFZ, mObywatel)
   - `society.ts` — społeczeństwo (kościoły, związki, media, samorząd)
   - albo stwórz nowy plik grupy
2. **Dodaj template** do tablicy (wzór: istniejące):
   ```ts
   {
     meta: {
       slug: "moj-skill",            // ^[a-z0-9-]+$
       name: "poland-vault-moj-skill",
       description: "...",            // PL, >20 znaków
       group: "Tematy",              // Finanse|Sejm|Rząd|Układy|Manifest|Tematy
       extraTags: ["seo:...", "aeo:..."],
       mcp: "strajkpolski/...",      // opcjonalnie
       embed: "https://strajkpolski.org/embed/...", // opcjonalnie
     },
     query: async (sb) => { /* live Supabase albo {} */ return {}; },
     body: (data) => `# Tytuł\n\n...treść...\n\n## Źródła\n- [link](https://...gov.pl)\n\n**PROMPT_1:** ...`,
   }
   ```
3. **Zarejestruj** w `scripts/skill-templates/index.ts` (`templates.push(...)`) i zaktualizuj licznik (`if (templates.length !== N)`).
4. **Wygeneruj + zwaliduj:**
   ```bash
   npm run generate         # 44+ SKILL.md (PL)
   npm run translate        # PL→EN przez edge fn (tylko nowe/zmienione)
   npm run generate:manifest
   npm run validate         # MUSI przejść (bramka)
   ```
5. **Test** (w repo strajkpolski): `npm test` — asercje liczby/slug/frontmatter.
6. **PR** — CI `validate.yml` zweryfikuje strukturę automatycznie.

## Wymagania body() — checklist

- [ ] nagłówek H1 (`# ...`)
- [ ] konkretne liczby z live danych (gdy dostępne) + fallback gdy `{}`
- [ ] sekcja `## Źródła` z ≥1 linkiem gov
- [ ] ≥1 `PROMPT_N:` (AI prompt template)
- [ ] body NIE rzuca na pustych danych `body({})`

## Setup lokalny

```bash
git clone https://github.com/Hei33enberg/Poland-Vault.git
cd Poland-Vault && npm install
export SUPABASE_URL="https://lqogkpknxwryvpdgdulx.supabase.co"
export SUPABASE_PUBLISHABLE_KEY="<anon key>"
npm run generate && npm run validate
```

Architektura: [ARCHITECTURE.md](./ARCHITECTURE.md).
