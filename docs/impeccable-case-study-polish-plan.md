# Case-Study Bento Polish Plan

Status: **plan only — not yet implemented**
Branch for implementation: feature branch off `main` (per repo git rules; `chore/impeccable-redesign` is 106 commits behind `main` and should not be reused without a merge).
Scope: the Projects case-study bento (`src/pages/Projects.tsx` + `Projects.module.css`) and its directly related pieces. Nothing else.

---

## 1. What was inspected

- `src/pages/Projects.tsx` (1,133 lines): showcase config, hover-intent engine, desktop bento markup, separate mobile card markup.
- `src/pages/Projects.module.css` (2,013 lines): desktop grid, hover callout layers, stats expansion, light theme, two competing mobile blocks.
- `src/data/projects.ts` + `src/types/index.ts`: the full `CaseStudy` data model (problem, role, personalContribution, hardestIssue, decisions, result — all bilingual).
- `PRODUCT.md` / `DESIGN.md`: brand register, storytelling principles, the "Ember Workshop" system.
- Live render at 1440px, dark theme, rest + hover states (fresh Playwright captures: `.tmp-9tours-rest.png`, `.tmp-9tours-hover-main.png`, `.tmp-9tours-hover-role.png`, `.tmp-9tours-hover-stats.png`, `.tmp-goout-rest.png`).

## 2. The core design problem

**The grid demonstrates craft but withholds the story.** Almost every piece of narrative is either hidden at rest or locked behind an interaction:

1. **The main card is a bare screenshot at rest.** `.bentoMainContent` (project title + description) is `display: none` (`Projects.module.css:210`). The biggest cell in the composition says nothing a recruiter can read.
2. **The screenshot cells are anonymous at rest.** Their "Booking flow" / "Admin panel" labels are visually hidden (sr-only pattern at `Projects.module.css:447`). At rest the media row is two unlabeled app crops.
3. **The callouts float instead of belonging.** Every hover detail is an absolutely positioned, inset (12–14px on three sides), rounded, blurred box (`Projects.module.css:456–480`) — visually a tooltip, not a layer of the card. Its content is three sentences merged into one 12px paragraph: pleasant, not scannable.
4. **The callout framing is a diary, not a case study.** Four of five callouts are headed "… learning" ("Project learning", "Role learning", "Booking flow learning", "Admin panel learning"). The repetition reads as a student journal scaffold and undersells decisions that are genuinely strong (race-condition fix, server-as-source-of-truth, append-only ledger).
5. **The strongest narrative asset is unused.** `caseStudy.problem` ("People booking a tour want it done in a few taps…") — exactly the plain-language opener PRODUCT.md calls for — appears nowhere in the bento. The 12px right-aligned `bentoGuideText` carries a vaguer positioning line in near-invisible type.
6. **Recruiter actions have no visible affordance on desktop.** The bento renders no tech-badge row, no GitHub link, no "read the full case" button — the bottom row exists only as dead CSS (`.bentoBottom`, `.bentoLinks`, `.btnGhost`, `.btnPrimary`). The only path to the CaseReader is knowing to click the role card. The mobile expanded card also has no GitHub / case links (`.mobileLinkRow` CSS exists but is never rendered).
7. **The orange stats panel out-shouts its role.** It is the only cell that is fully readable at rest, with 40px numerals, so attention lands on metrics before story. The numbers themselves are honest scope evidence (49 endpoints / 146 tests / 17 pages) and should stay — but proportioned as supporting evidence, not the headline.
8. **Typography inside the cards is flat.** Everything inside cells sits at 11–13px with similar weight (role bullets 13px, callout body 12px, captions 11–12px); the jump from the 40px article heading straight down to 13px leaves no middle register for the narrative to live in.
9. **Real accessibility gap:** 11–13px white text on the ember panel (`#fff` on `#d4651a` ≈ 3.7:1) fails WCAG AA for normal-size text — labels and the hover details on the stats card are below 4.5:1 today.

Everything else — the warm-dark island palette, the hover-intent engine, the entrance choreography, the grid-width breathing on hover — is solid and should be preserved.

## 3. Files / components involved

| File | Why |
| :--- | :--- |
| `src/pages/Projects.tsx` | Showcase config copy, resting-state markup, callout headers/structure, footer link row, mobile link row, dead UI removal |
| `src/pages/Projects.module.css` | Callout anchoring, resting captions, type scale, stats proportion, footer row revival, dead-CSS removal, light-theme parity |
| `src/data/projects.ts` | Read-only source of copy (problem, contribution); at most light wording tweaks, no structural change |
| `.tmp-shot-bento.cjs` | Existing capture script reused for before/after verification |

Not expected to change: `CaseReader`, `GalleryModal`, `CompactCard`, `TechBadge`, `types/index.ts` (unless a caption needs one optional field — prefer reusing the in-file `ShowcaseConfig`), `global.css`, all other sections.

## 4. Planned improvements

### A. Give the resting state the story (problems 1, 2, 5)

- **A1 — Standfirst.** Replace the dim right-aligned `bentoGuideText` with a left-aligned standfirst under the heading: the plain-language problem line (sourced from `caseStudy.problem` / the existing guide copy, whichever reads stronger per project), ~15px, `#978b7f`-or-brighter, max 62ch. Kicker + hairline stay as-is. This single move makes each article open like a case study: kicker → title → "here is the problem".
- **A2 — Main card resting band.** Re-introduce a slim bottom band on the main card (replacing the dead `display:none` content): one line of what the product does for a person + a small visible "watch preview" affordance (play glyph + label), on the card surface with a hairline top rule. Image stays dominant; the card becomes self-describing and its click target becomes legible.
- **A3 — Screenshot captions.** Make the cell labels visible at rest as a bottom caption bar: label ("Booking flow") + one short resting line (first sentence of the existing details). Hover/focus still deepens with the full detail layer.
- **A4 — Role card density.** Fill the role card's reserved empty bottom with the 4-fact grid pattern that GO-OUT already uses (`bentoFactGrid`), applied to 9tours with true facts from existing data (e.g. Team · 3 devs / My part · Lead + build / Hardest fix · Booking race / Tests · 146 in CI). Unifies the two articles' visual language (problem 7 in the brief) and makes the resting card earn its width.

### B. Make the callout a layer of the card, not a tooltip (problems 3, 4)

- **B1 — Anchor it.** The detail layer becomes a full-width bottom panel flush with the card's edges (no 12–14px float insets): top hairline rule, bottom corners matching the card radius, background opacity raised from 0.72 to ~0.88 (blur kept, but legibility no longer depends on it). It should read as the card's lower deck sliding open.
- **B2 — Structure the content.** Three merged sentences become three short lines (the spans already exist — render them as stacked lines with tight spacing), 13px body, header 14px Syne. Scannable in under two seconds.
- **B3 — Reframe the headers.** Kill the "… learning" scaffold. Per-cell insight framing that sells decisions: main → "What I owned", role → "How I led", booking → "Design decision", admin → "Built for the operators", stats stays label-free. Body copy keeps existing meaning, trimmed to decision → reason → outcome.
- **B4 — Keyboard/touch unchanged.** `:focus-within` reveal stays; touch continues to suppress hover layers (content remains reachable via captions, mobile card, and CaseReader).

### C. Proportion the stats panel (problems 7, 9)

- Keep the single drenched ember panel — it is the system's signature and the numbers are honest evidence.
- Reduce resting numerals from 40px to ~32px and tighten the head/label group, so it reads as supporting evidence rather than the loudest voice in the row.
- **Fix the AA failure:** small text on the ember surface moves from white to a deep umber (target ≥4.5:1 on `#d4651a`); numerals at 30px+ may stay white (large-text 3:1 passes at 3.7:1). Verify in both themes.

### D. Sharpen the type ladder inside cards (problem 8)

One consistent in-card scale, both languages: captions/labels 12px (one uppercase style), card titles 16px Syne, body/bullets 13px, callout header 14px Syne 800, callout body 13px, standfirst 15px. Contrast-check every text/surface pair (≥4.5:1) in dark and light themes.

### E. Visible recruiter actions (problem 6)

- **E1 — Desktop footer row per article:** revive the dead `.bentoBottom` pattern — tech badges (existing primary/secondary split) on the left; "View code on GitHub" (ghost) + "Read the full case" (ember, opens CaseReader) on the right. Slim (~56px), hairline-bordered, consistent with the existing button vocabulary.
- **E2 — Mobile expanded card:** render the link row (`.mobileLinkRow` styles already exist) with the same two actions.
- This also gives the CaseReader an honest entry point instead of relying on the role card's hidden affordance.

### F. Dead-code cleanup (repo constraint: leave no dead styles)

- Delete the first `@media (max-width: 767px)` block (`Projects.module.css:1337–1509`) — it is wholesale overridden by the second mobile block that hides `.bentoGuide/.bentoHeading/.bentoTopRow/.bentoMediaRow/.bentoBottom`.
- Remove `.bentoMoreMobile` (CSS + TSX) — its parent is hidden on mobile and itself hidden on desktop; it renders nowhere.
- Remove `.bentoTeamPill` + the `teamPill` config field (no project uses it), `.bentoStats .bentoDetail` rules (stats renders no `bentoDetail`), `.secHeader`/`.secTitle`, and unused `ui` strings (`github`, `more`, `links`, `secTitle`) — except any that sections E1/E2 newly consume (`github`, `links`, `more` likely return to use; keep those).
- Either render the existing "More projects" title above the compact-card grid (improves scanning; string + style already exist) or delete `.otherTitle` — decision at implementation, leaning render.

## 5. What will intentionally NOT be touched

- **Behavior:** click targets keep their destinations (main/shots → gallery, role → CaseReader); the hover-intent engine (pointer-speed heuristics, grid-width breathing, video arming) keeps its logic and timings.
- **Components:** `CaseReader`, `GalleryModal`, `CompactCard`, `TechBadge`, `SectionNav`, `Navbar`, all other pages/sections.
- **Data model:** `types/index.ts` `CaseStudy`/`Project` shapes; `projects.ts` structure (copy-level wording tweaks only where the plan calls for them).
- **Identity:** warm-dark hardcoded island palette, single ember accent, hairline structure, Syne/IBM Plex Thai pairing, entrance choreography, reduced-motion fallbacks.
- **Mobile card architecture:** the recently polished `mobileProjectCard` layout stays; it only gains the link row (E2).
- No new libraries, no routing, no backend/API anything (none exists in this section anyway).

## 6. Risk areas to watch

1. **Fixed row heights.** Desktop rows are locked at 318px / 325px and the hover grid-width transitions are tuned to them. Resting caption bars and the main-card band must live inside those heights (absolute/flex-end layers, not flow content) or the breathing animation will judder. Verify at 768px, 1024px, 1280px+.
2. **Thai text length.** Thai runs longer and taller (line-height 1.65 overrides exist). Every new resting line and reframed callout must be checked in `data-lang="th"` — especially the stats detail column, which already needed a Thai-specific `max-height: none`.
3. **Light theme parity.** Every new element (standfirst, captions, band, footer row, umber stat text) needs its `[data-theme="light"]` counterpart, contrast-verified.
4. **Callout over video.** The main card's hover callout now overlays the playing preview video; the raised panel opacity must keep text readable over motion without fully hiding the video.
5. **Footer row height.** Adds ~56px per article on desktop; keep it slim so the section's pacing (two articles + compact grid) doesn't stretch.
6. **Dead-CSS deletion safety.** The two mobile blocks share class names; deletion must be verified by mobile screenshot diff (375px, dark + light), not by reading alone.
7. **Entrance choreography.** New footer row should join the existing stagger (`rowVariants`/`cellVariants`) rather than popping in unanimated.

## 7. Validation plan (post-implementation)

- `npm run lint` (ESLint) and `npm run build` (runs `tsc -b`, the repo's typecheck) — the only checks the repo defines; there is no test runner or formatter configured.
- Playwright captures (script already in repo) at 1440px and 375px, dark + light, EN + TH, rest + each hover intent; diff against the `.tmp-*` baselines taken today.
- Manual keyboard pass: Tab through one article; confirm every callout reveals on focus and every action is reachable.
- `git diff --stat` review confirming changes touch only the files in section 3.
