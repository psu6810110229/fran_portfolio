# Impeccable Visual Critique & Plan — Fran Portfolio

> Critique-and-planning pass only. No implementation in this document.
> Evidence: full source read (all pages + key components + `global.css`), fresh Playwright screenshots of the live dev build (desktop dark/light, mobile dark, Thai, bento hover states) taken 2026-06-10, plus the bundled slop detector (`detect.mjs` — zero findings on `src/` and `index.html`).
> Branch at time of review: `fix/about-scroll-offset`, including the uncommitted `About.module.css` / `global.css` changes.

---

## 1. Executive summary

**Overall visual quality: strong foundation, 80% executed — a "B+ that reads like it wants to be an A".**
The Ember Workshop system (warm near-black, single `#d4651a` accent, hairline rules, Syne-for-structure) is a real identity, not a template. The hero, About, and Contact sections execute it with discipline. The automated slop detector found zero anti-pattern hits, and the layout avoids every generic-portfolio cliché the brief bans (no progress bars, no identical card grid, no gradient hero).

**Main reason it does not yet feel fully polished:** the Projects bento — the showpiece — is the one section that breaks the site's own rules. It hardcodes a darker text palette that fails WCAG AA in several places, carries the loudest hover treatment on the site (a 9px orange glow ring on a system that is otherwise flat and hairline), and ships visibly unfinished: the planned bottom row (stack badges + GitHub/live links) exists in CSS but is never rendered on desktop, and one compact card (MinusOnMine) has no thumbnail at all. The craft argument ("the site's polish is the portfolio entry") is undercut exactly where scrutiny is highest.

**Top 3 visual weaknesses**

1. **Contrast failures inside the bento island.** `#7a6e66` body text on `#1c1916` ≈ 3.6:1 at 15px (needs 4.5:1); the 12px guide text on `#141210` ≈ 3.9:1; the 9px `#403a34` fact labels on GO-OUT's role card ≈ 1.8:1 (near-invisible); the 11px white stat labels on the `#d4651a` panel ≈ 3.7:1. The site's own DESIGN.md sets AA as the floor and the global tokens clear it — only the hardcoded bento inks fall below.
2. **The One Ember Rule is broken by the Skills section.** Every devicon renders with its `colored` class: React cyan, JS yellow, Firebase amber, Redis red, Docker blue, AWS orange — a 12-hue candy strip across the only saturated-color rule the brand has. It is the single most "template" moment on the page, in both themes.
3. **Hierarchy inversion around the core content.** Project headings are 20–22px Syne, while the About lead is ~32px and the Contact heading ~38px. The drenched orange stats panel (40px numerals) out-shouts the project title in its own bento. The most important content on a portfolio — what was built — has the smallest structural type on the page.

**Top 3 visual opportunities**

1. **Finish the bento's bottom row.** Stack badges + GitHub/live-demo links are specified (CLAUDE.md current-task brief), styled (`.bentoBottom`, `.bentoBadges`, `.bentoLinks` in `Projects.module.css`), and absent from the desktop DOM. Restoring it gives recruiters the scannable stack-and-proof row in one move and removes the "missing furniture" feeling.
2. **Monochrome the skills icons (ember for the primary stack).** One CSS-level change (drop the `colored` class / restyle) restores the One Ember Rule and instantly makes the whole page read more deliberate. DESIGN.md already reserves ember for "the primary-stack skill icons".
3. **Re-weight the type scale so projects lead.** Raising the per-project bento heading toward the About-lead scale (~clamp 1.5–1.9rem) and slightly quieting the stats numerals re-aims the visual emphasis at the work itself.

---

## 2. Section-by-section critique

### 2.1 Navbar

* **Works:** quiet `fran.` wordmark in Syne; 44px circular toggles match touch-target guidance; hairline bottom rule + soft chrome shadow sits correctly on the elevation ladder; hamburger morph is restrained.
* **Weak:** the language toggle shows the *current* language ("EN" while in English) rather than the target — visually ambiguous which state the pill represents (the `aria-label` says "Switch to Thai" but the visible text says EN). Mobile dropdown list items are plain full-width links with no active-section indicator.
* **Why it matters:** the toggle is one of the most-used controls for the bilingual audience; ambiguity here is friction at the front door.
* **Severity: low · Confidence: medium** (current-vs-target labeling is a known UX coin-flip; consistent either way is acceptable, but the icon-style ambiguity is real).

### 2.2 Hero

* **Works:** strongest section on the site. Display heading with the single ember phrase ("real products") is the One Ember Rule executed perfectly; `text-wrap: balance`, -0.02em tracking, 18–20ch measure are all disciplined; staggered `heroRise` entrance is `prefers-reduced-motion`-gated *and* visible-by-default (the one place the reveal pattern is done right); avatar with ember status dot is warm without being cute.
* **Weak:**
  * The blinking caret (`.cursor`) renders only in the Thai heading; the English hero has none. A signature applied to one language only reads as an accident, not a choice. (DESIGN.md still describes a typing effect that no longer exists — doc drift.)
  * Vertical rhythm: `padding: 56px 5vw 28px` — the 28px bottom puts the CTA row tight against the hairline, while About opens with 36px. The seam is slightly pinched on desktop.
  * The "Say hello" ghost button at `--font-size-xs` / `text-dim` is close to invisible next to the filled primary; on the 375px row, four controls (`View Projects`, `Say hello`, GitHub, LinkedIn) compress with 6px gaps.
  * Copy note (out of visual scope but trust-relevant): EN says "First-year", TH hero says "ปี 2" (second year) — the two languages disagree about a fact.
* **Why it matters:** the hero sets the polish expectation for everything below; small asymmetries here are cheap to fix and disproportionately visible.
* **Severity: low · Confidence: high.**

### 2.3 About

* **Works:** the lead-sentence-as-heading device (32px Syne with one ember phrase) is distinctive and on-voice; the Plan/Build/Ship numbered rail is a *legitimate* numbered sequence (a real process, not eyebrow scaffolding); 60ch prose measure and 1.7 line-height read comfortably; hairline separators between rail items continue the drafting-table grammar.
* **Weak:**
  * The section has no marker at all (`.secTitle` styles exist in the CSS but nothing renders them). Combined with Skills (also unmarked) and Projects (per-project "PROJECT 01" kickers), the page has three different section-labeling grammars: none, none, numbered-kicker. Deliberate eyebrow-avoidance is good; *inconsistent* grammar is not.
  * The lead repeats the hero subhead's facts (first-year CE at PSU) within one viewport — same claim twice in 600px of scroll.
  * On desktop the rail column is top-aligned against the prose with `align-items: start`; with the short prose block, the rail's third item frequently hangs below the prose baseline, leaving an L-shaped hole bottom-left (visible in the desktop screenshot).
* **Why it matters:** About is the "specific person, not a template" section; redundancy and the empty corner soften an otherwise confident composition.
* **Severity: low–medium · Confidence: high.**

### 2.4 Skills

* **Works:** three hairline-divided columns (Frontend / Backend / DevOps & Tools) with stacked icon+label chips is a clean, anti-progress-bar answer; mobile column dividers keep rhythm.
* **Weak:**
  * **Full-color devicons.** `<i className={icon + ' colored'}>` paints ~17 icons in their vendor brand colors. This is the only place on the entire site where a second (and third, and tenth) saturated hue exists. In dark mode it reads as a sticker sheet; on the cream light theme it is louder still. It directly violates the system's own One Ember Rule and is the most "every bootcamp portfolio" moment on the page.
  * Labels are 12px Syne at 0.04em on `text-muted` — Syne used for non-structural micro-labels blurs the Syne-for-Structure rule, and 12px geometric caps at low contrast get murky under the colored icons.
  * The section renders with `initial={{opacity: 0}}` + `whileInView` — in the full-page headless capture the whole section is blank (see §5 risk note).
* **Why it matters:** Skills sits between the two strongest narrative sections; the palette break interrupts the brand exactly mid-scroll, and recruiters skim this section specifically.
* **Severity: high (palette) / medium (labels) · Confidence: high.**

### 2.5 Projects — desktop bento (the showpiece)

* **Works:** the asymmetric 12-col composition with intent-driven column flexing (`grid-template-columns` easing on hover) is genuinely distinctive — closer to "how was this made?" than anything else on the site. Real product screenshots fill the cells (per the brand register: imagery shipped, not placeholders). The single drenched ember stats panel is a correct, deliberate use of a Drenched moment. The mobile fallback is thoughtfully art-directed (16:10 hero, summary grid, expandable detail) with its reasoning documented in CSS comments.
* **Weak:**
  1. **Contrast failures (measured):** `bentoDesc`/`bentoGuideText`/`bentoRoleList` at `#7a6e66` ≈ 3.6–3.9:1 on their surfaces (12–15px body, needs 4.5:1); `bentoFactLabel` `#403a34` at 9px ≈ 1.8:1 (GO-OUT's Room/Buckets/Bank/History labels are effectively invisible — confirmed in screenshots); `bentoStatLabel` 11px white on `#d4651a` ≈ 3.7:1. The 28–40px stat numerals pass as large text; the small labels under them do not.
  2. **Unfinished bottom row:** `.bentoBottom` / `.bentoBadges` / `.bentoLinks` are fully styled and specified in the project brief, but `Projects.tsx` never renders them on desktop. Consequence: the desktop showcase has **no visible stack badges and no GitHub/demo links** — they exist only inside the CaseReader overlay and on the compact cards. A technical reviewer scanning the bento finds no path to the code.
  3. **Hover glow vs. flat system:** every cell hover applies `box-shadow: 0 0 0 2px rgba(212,101,26,.72), 0 0 0 7px rgba(212,101,26,.18)` + border swap. On a site whose elevation vocabulary is "hairline first, soft ambient shadow only for floating things", a 9px two-ring glow is the loudest gesture on the page and fires on *five adjacent cells*, including orange-on-orange around the stats panel. It reads gamer-RGB, not lamplit workshop.
  4. **Heading scale:** `bentoHeading` 20px / `bentoTitle` 22px — the project name is smaller than the About lead and barely larger than the role-card title. The orange stats panel (40px numerals) dominates its own project's name.
  5. **Hidden depth, zero affordance:** the "Project learning" / "Role learning" overlays exist only on hover/focus with no visual cue that cells are interactive beyond the cursor. Touch and skim users never learn the layer exists. (Acceptable as progressive depth, but nothing invites the first hover.)
  6. **Numbered kickers:** "PROJECT 01 / PROJECT 02" eyebrows are the banned numbered-section-marker pattern *unless* the sequence carries meaning; here the order is just display order. Borderline — one deliberate system could own it, but combined with About's 01/02/03 rail the page now has two unrelated numbering systems.
  7. **Stats copy reads metrics-forward:** "49 API endpoints / 146 automated tests / 17 pages built" are real (honesty guardrail respected) but the *presentation* — biggest type in the section, drenched panel — is exactly the "decorative stat panel" emphasis PRODUCT.md warns about. The numbers outrank the story.
  8. **Layout grammar shift at ≥1280px:** `.inner` clamps to `max-width: 1100px` centered while every other section runs full-bleed with 5vw gutters. The showpiece is the only section that abandons the site's edge-to-edge composition; on a 1440px screen the bento floats in a centered column with the rest of the page running wider above and below it.
* **Why it matters:** this is where HR decides whether the work is real and reviewers decide whether the craft is real. Contrast failures and a missing specified row are precisely the "sloppiness undercuts the whole pitch" scenario DESIGN.md names.
* **Severity: high · Confidence: high** (contrast figures computed; missing row verified against TSX + screenshots).

### 2.6 Projects — compact cards ("More projects")

* **Works:** 2-up mobile grid with 16:9 thumbs and single-action logic (`links:has(.lbtnAcc)` dropping GitHub) is smart density management; floating-card shadow matches the elevation vocabulary.
* **Weak:**
  * **MinusOnMine has no thumbnail** — a Syne text label centered on an empty `surface-alt` block. Beside Gear Rental's real screenshot it reads as a placeholder that shipped.
  * The compact grid begins with no transition from the bento — `.otherTitle` ("More projects") is styled but never rendered, so two small cards just appear under GO-OUT's island with nothing marking the register change from "case study" to "also-rans".
  * Desktop `cardGrid` is 2 columns at ≥768px with no ≥1280 step; two ~620px-wide cards with 200px thumbs look stretched at 1440px.
* **Severity: medium · Confidence: high.**

### 2.7 Contact + footer

* **Works:** underline-only fields with ember focus underline are exactly on-system (quiet, hairline, one accent); heading scale (38px Syne 800) is confident; the 680px column is a sane form measure.
* **Weak:**
  * The section is the page's largest type moment after the hero — bigger than any project heading. Generous for a goodbye, mis-weighted relative to the work sections (see hierarchy inversion).
  * Status messages ("Message sent. Thank you!" / "Could not send right now…") are hardcoded English in both languages, and the success state is ember-colored text only — easy to miss below the button.
  * No visible email address anywhere on the site (form + icon links only). PRODUCT.md's section contract lists Email as required Contact content; if the form fails (it depends on a `VITE_WEB3FORMS_ACCESS_KEY` env var), there is no fallback path shown.
  * Footer is a single 13px `© 2026 Fran` — minimal is fine, but it's also the only place a `text-faint` token sits on the page's darkest band; it nearly vanishes.
* **Severity: medium (email/status), low (footer) · Confidence: high.**

### 2.8 SectionNav (right-edge dots)

* **Works:** 5px dots morphing to a 20px ember pill on active is a lovely micro-detail; 44px hit areas; reduced-motion fallback written; tooltips on-system.
* **Weak:** rest-state dots are `#4a3f38` on `#131110` — discoverability near zero until hovered (arguably intentional ambient furniture). The hardcoded `#4a3f38` bypasses tokens.
* **Severity: low · Confidence: medium.**

### 2.9 Light theme (cross-section)

* **Works:** same temperature, same single accent — "the same room with the lights on" holds for Hero/About/Contact.
* **Weak:** in the bento, light-mode cards `#f7f1ea` sit on `#faf8f5` page bg with `#e0d8d0` borders — tonal separation collapses and the island reads as outlines on paper; the dark mode's layered depth doesn't translate. Skills' colored icons are even louder on cream.
* **Severity: medium · Confidence: high** (verified in light-mode full-page capture).

### 2.10 Thai language (cross-section)

* **Works:** IBM Plex Sans Thai swap with corrected line-heights is wired everywhere it matters, including inside the hardcoded bento; Thai renders cleanly in all captures.
* **Weak:** the TH-only hero caret (see 2.2); EN-only form status strings; minor — TH stat-label strings wrap to more lines inside fixed-height stat cells (`max-height: none` override exists, so handled).
* **Severity: low · Confidence: high.**

---

## 3. Prioritized improvement plan

### Must fix (perceived quality + accessibility floor)

> **Owner review 2026-06-10:** M2 and M3 dropped by deliberate decision; M4 superseded. See notes per row.

| # | Item | Status / Problem | Expected impact |
|---|------|---------|-----------------|
| M1 | Bento text contrast | **Kept.** `#7a6e66` body (3.6–3.9:1), `#403a34` 9px labels (~1.8:1), 11px white-on-ember labels (3.7:1) all below AA | Readability for the primary audience; protects the "craft is the argument" claim under any accessibility check. Lift inks toward the proven global tokens (`#978b7f`+). Residual accepted: hover-only white stat detail text on ember stays slightly below strict AA (transient content; mitigated by darker gradient bottom on the panel) |
| M2 | ~~Skills icon palette~~ | **Dropped — owner decision:** colored devicons stay; per-vendor color aids icon recognition. Accepted as a deliberate exception to the One Ember Rule | — |
| M3 | ~~Desktop bento bottom row~~ | **Dropped — owner decision:** the bento intentionally has no bottom badges/links row; GitHub/stack live in the CaseReader | — |
| M4 | MinusOnMine card | **Superseded:** MinusOnMine removed from the site entirely; a non-interactive "Coming soon" ghost card (dashed hairline border, dim centered label, bilingual) takes its slot in the compact grid | Removes the unfinished artifact and signals momentum instead |

### Should improve (hierarchy + system coherence)

| # | Item | Problem | Expected impact |
|---|------|---------|-----------------|
| S1 | Project heading scale | 20–22px project names vs 32px About lead / 38px Contact; stats numerals dominate | Re-aims emphasis at the work; the portfolio's core content finally leads |
| S2 | Bento hover treatment | **Folded into the premium-elevation direction (owner decision 2026-06-10):** orange double-ring glow replaced by Apple-style lift (`translateY(-3px)`) + layered soft shadow; rest state gains a 3-layer ambient shadow + inset top highlight across the whole Projects section (bento cells, stats panel, mobile card, compact cards) | Hover becomes a material lift, not an alarm; the section reads premium and dimensional while the rest of the page stays flat/hairline |
| S3 | Section grammar | Three labeling systems (none / none / numbered kicker); `.secTitle`/`.otherTitle` styled but unrendered | One deliberate cadence across sections; "More projects" gets its register break |
| S4 | Light-theme bento depth | Cards ≈ bg in light mode; island identity lost | Light theme keeps the layered depth (slightly darker card tone or stronger surface step) |
| S5 | Stats panel emphasis | Drenched panel + biggest type = metrics-forward presentation | Quieter numerals (or label-forward layout) keep honesty signals without metrics theater |
| S6 | Layout width grammar | Projects-only 1100px centering inside a full-bleed site | Either commit the whole page to a max-width or let the bento breathe full-bleed; one grammar |

### Nice to polish (micro-details)

| # | Item | Problem |
|---|------|---------|
| N1 | Hero caret parity | Blinking caret TH-only; pick one signature for both languages (and update DESIGN.md's stale typing-effect description) |
| N2 | Hero bottom padding | 28px bottom vs 36px About top; equalize the seam |
| N3 | About rail balance | Bottom-left hole when prose is shorter than rail; `align-items` or measure tuning |
| N4 | Bilingual form status | EN-only success/error strings; success state easy to miss |
| N5 | Visible email fallback | Required by PRODUCT.md contact contract; one mailto line under the form |
| N6 | SectionNav rest-dot token | Hardcoded `#4a3f38`; near-invisible at rest |
| N7 | Compact cards ≥1280px | 2-up grid stretches; consider 3-up or capped card width |
| N8 | EN/TH fact mismatch | "First-year" vs "ปี 2" in hero (copy, not visual — flagged for honesty guardrail) |

---

## 4. Visual direction options

### Direction A — "Tighten the Ember Workshop" (enforce the existing system everywhere)

* **Feeling:** the current identity, finished. Lamplit, meticulous, quietly confident — no new ideas, total discipline.
* **Strengths:** zero rebrand risk; every fix (M1–M4, S2–S4) is the system policing itself; fastest path to "every detail intentional"; preserves the bento's distinctiveness while removing its rule-breaks.
* **Risks:** none structural; the risk is settling — the page stays good-restrained rather than memorable-bold. Skills monochrome could read flat if the ember-primary distinction isn't crisp.
* **Fits best:** everything; it *is* the site. Hero/About/Contact already live here.
* **Candidate impression:** "this person sweats details and finishes things" — the senior-leaning, trustworthy read PRODUCT.md asks for.

### Direction B — "Case-study editorial" (projects lead the typography)

* **Feeling:** a designed dossier of work. Bigger project display type (toward the About-lead scale), stats demoted to captions, kickers replaced by one strong per-project title moment, generous whitespace between islands.
* **Strengths:** fixes the hierarchy inversion at the root; flatters the genuinely good case-study content; makes the one-scroll recruiter read land on project names, not numbers.
* **Risks:** type-scale changes inside fixed-height bento rows (318/325px) can clip or reflow the intent-animation choreography; "editorial" is a saturated 2026 lane — must stay Syne-geometric, not drift into display-serif magazine affectation; more files touched than A.
* **Fits best:** Projects and About; Hero already has the display register.
* **Candidate impression:** "this person thinks like a product storyteller" — strongest for HR/clients, slightly riskier to execute cleanly.

### Direction C — "Drench the threshold" (commit harder to ember at key moments)

* **Feeling:** bolder brand: one drenched ember moment beyond the stats panel — e.g. an ember-flooded contact band or per-project ember title plates — pushing toward Committed/Drenched color strategy.
* **Strengths:** memorability; uses brand-register permission for ambitious color; differentiates from every restrained dark portfolio.
* **Risks:** directly strains the One Ember ≤10% rule that defines the current system; on-orange text contrast is already the weakest measured area; easy to tip "quietly confident" into "shouting" — the anti-reference PRODUCT.md fears most.
* **Fits best:** the stats panel (already there) and possibly Contact.
* **Candidate impression:** "bold designer" — but for an internship-seeking engineer whose pitch is meticulousness, it argues the wrong virtue.

**Recommendation:** the evidence supports **A as the base, with B's heading-scale move (S1) folded in**. Nothing found argues for C; the system's restraint is its identity, and its current failures are discipline gaps, not boldness gaps.

> **Direction A amended (owner decision 2026-06-10):** the Projects section adopts an Apple-style layered-shadow elevation (soft ambient stack + inset top highlight, lift on hover) as a deliberate exception to the "flat by default" vocabulary — the bento is already the art-directed island, and premium depth is part of its identity. DESIGN.md's flat/hairline rule continues to govern the rest of the page (DESIGN.md sync is an optional follow-up).

---

## 5. Implementation risk notes

**Low risk (color/ink-only, no geometry changes):**

* M1 contrast lifts — text color values only; no metrics change. Verify both themes after (light-theme bento has its own hardcoded overrides to retune in the same pass).
* M2 skills monochrome — remove/replace the `colored` class usage and style `i`/`img` color; flex layout untouched. (Note: `imgIcon` SVGs like Capacitor/PWA need a CSS `filter` treatment, not a class change.)
* N2 hero padding, N6 SectionNav token, S3 rendering already-styled labels.

**Medium risk (touches layout boxes; test at 375/768/1280 + both themes + TH):**

* M3 bottom row — re-adding a grid row to the bento changes article height and the mobile override blocks (`display:none` rules in two separate `@media (max-width:767px)` blocks already hide `.bentoBottom`/`.bentoLinks` — interactions must be re-checked, including which row mobile keeps).
* M4 thumbnail — asset addition; safe, but compact-card `object-position` cropping needs a check.
* S1 heading scale — `bentoTopRow`/`bentoMediaRow` have **fixed pixel heights** (318/325/360px) tuned to current type metrics; larger headings sit outside those rows but shift everything below; TH line-heights wrap differently. Reflow, don't clip.
* S4/S6 — surface tones and width grammar are visually global within the section; screenshot-diff both themes.

**High risk (entangled with animation/behavior — isolate from visual passes):**

* S2 hover treatment — the glow is part of the intent system (`intentActive`, pointer-speed scheduling, grid-template-columns easing in `Projects.tsx` + module CSS). Changing the *shadow* is safe; changing *when/what* activates is behavior. Keep strictly to the box-shadow/border declarations.
* Anything near `.bentoStats` hover choreography (fixed-width head track, max-height reveals, TH overrides) — the CSS comments document hard-won edge cases; visual tweaks here need the full hover/focus/touch/reduced-motion matrix re-verified.
* The `whileInView` reveal gating (Skills/About/Contact start at `opacity: 0`): confirmed in this review's full-page headless captures — **Skills and Contact render blank** when no scroll occurs. DESIGN.md explicitly bans visibility gated on JS. This is a behavior/robustness fix, not a styling fix; schedule it separately from any visual pass so regressions are attributable.

**Out of scope for any visual pass (flagged, untouched):** EN/TH fact mismatch (hero year), form-status localization, missing visible email, CaseReader/GalleryModal a11y gaps already listed in DESIGN.md.

---

## 6. Recommended next step

**Implement the "must fix" CSS-ink pass first: M1 (bento contrast) + M2 (skills monochrome) in one small, reversible change.**

Rationale: both are color-value-only edits with zero layout, animation, or behavior surface; both are the highest-severity findings (AA floor + brand-rule break); both are verifiable with a before/after screenshot at 1280/375 in both themes in minutes. M3 (bottom row) is the most valuable single addition but is medium-risk (touches markup + two mobile override blocks), so it goes second, alone, with the breakpoint matrix check. Do not bundle the hover-glow change (S2) or any heading-scale work (S1) into these passes — they need their own verification rounds.

---

*Areas intentionally not assessed: copywriting quality beyond visual-trust flags, SEO/meta, CaseReader and GalleryModal internals (overlay UX is a separate audit), build performance, and the recovery/screenshot artifacts in the repo root.*
