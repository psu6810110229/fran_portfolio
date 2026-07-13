# Phase 1 — Projects 2.0, 9tours Case Study, Media Optimisation

Branch: `chore/impeccable-redesign`
Merge target: `dev`

## Outcome
Redesign the Projects section into a plain-language case study focusing on 9tours. Demonstrate product ownership, full-stack collaboration, and project management skills without compromising the "Ember Workshop" aesthetic. Heavy media is optimized and deferred to a deep-dive reader.

## Current code grounding
- Types/Data: `src/types/index.ts`, `src/data/projects.ts`
- Pages/Styles: `src/pages/Projects.tsx`, `src/pages/Projects.module.css`
- Assets: `src/assets/9tours/`
- Design docs/tokens: `PRODUCT.md`, `DESIGN.md`, `PROJECTS_2_0_BRIEF.md`, `AGENTS.md`, `src/styles/global.css`

---

## Sprint 1 — Phase 0: Media optimisation

**Goal**
Compress 154MB of raw 9tours media into web-friendly sizes before any UI work.

**Expected file surfaces**
- `src/assets/9tours/*`

**Work**
1. Compress `user_flow.mp4` to a manageable size (< 5MB) using `ffmpeg` (H.264).
2. Extract a poster image for the video for click-to-play usage.
3. Convert `Screenshot (452-467).png` to WebP format, capping width at 1600px.
4. Generate small thumbnails for the inline preview block.

**Focused checks**
- `npm run build`
- verify folder size is drastically reduced (from 154MB).
- browser visual QA 1440p: check image crispness on high-DPI screens.
- ensure no broken asset imports across the app.

**Commit**
- Example: `chore(media): compress 9tours video and convert screenshots to webp`
- Commit: media weights verified; push branch

---

## Sprint 2 — Phase 1: Data + types

**Goal**
Extend the Project type and populate real case-study data for 9tours.

**Expected file surfaces**
- `src/types/index.ts`
- `src/data/projects.ts`

**Work**
1. Add case-study fields (problem, role, built, issue, decisions, result) to the `Project` type.
2. Populate `projects.ts` with the approved EN/TH copy from the brief.
3. Ensure `githubUrl` points strictly to the team repo (`psu6810110712/9Tours`).
4. Remove the placeholder `liveUrl` for 9tours to ensure no live demo is promised.

**Focused checks**
- `tsc -b` (ensure strict typings pass, no `any`).
- `npm run build`

**Commit**
- Example: `feat(data): extend project schema and add 9tours case study copy`
- Commit: types strict; push branch

---

## Sprint 3 — Phase 2: Inline preview block

**Goal**
Replace the current bento cells with the single featured preview block for 9tours.

**Expected file surfaces**
- `src/pages/Projects.tsx`
- `src/pages/Projects.module.css`

**Work**
1. Implement CSS Grid for the featured block (hero screen, 2-3 thumbnails, stack badges, actions).
2. Integrate one-line problem, role, and result text in `Satoshi`.
3. Wire up "Read the full case" and "View team code" (ghost/ember) buttons.
4. Retain Gear Rental and MinusOnMine as secondary compact cards below the feature block.

**Focused checks**
- `npm run build`
- browser visual QA 1440p/laptop/tablet/mobile: ensure the block stacks cleanly.
- verify inline value is completely readable without opening the case reader.
- verify both EN/TH languages render without breaking the grid.

**Commit**
- Example: `feat(ui): implement 9tours inline preview block`
- Commit: responsive matrix verified; push branch

---

## Sprint 4 — Phase 3 & 4: Case reader component & motion

**Goal**
Build the deep-dive, full-screen case reader modal with strict a11y and CSS-only motion.

**Expected file surfaces**
- `src/components/CaseReader/CaseReader.tsx`
- `src/components/CaseReader/CaseReader.module.css`

**Work**
1. Build a React Portal overlay to `document.body` (`z-index: 100`).
2. Implement strict keyboard a11y: Escape to close, focus trap (Tab/Shift+Tab), focus restoration, body scroll lock.
3. Map the 10-beat narrative structure utilizing `Syne` (headings) and `Satoshi` (body).
4. Integrate the click-to-play optimized video and "View all screens" gallery launcher.
5. Implement CSS-only motion: "lamp-up" entrance, staggered section fade/translates (using progressive enhancement).
6. Apply `prefers-reduced-motion: reduce` fallbacks (instant/crossfade) to all animations.

**Focused checks**
- keyboard/screen-reader QA: verify focus trap, `role="dialog"`, `aria-modal="true"`.
- OS reduced motion toggle: verify animations disable gracefully.
- mobile visual QA: verify full-screen reader usability on 375px.

**Commit**
- Example: `feat(ui): build accessible case reader overlay with motion`
- Commit: a11y and motion fallbacks verified; push branch

---

## Sprint 5 — Phase 5 & 6: Bilingual & final audit

**Goal**
Perfect EN/TH language switching, ensure WCAG AA contrast, and perform final ops checks.

**Expected file surfaces**
- `src/pages/Projects.tsx`
- `src/components/CaseReader/CaseReader.tsx`
- `src/styles/global.css`

**Work**
1. Audit natural-sounding Thai copy and ensure IBM Plex Sans Thai swaps correctly via `[data-lang="th"]`.
2. Verify WCAG AA contrast ratios (≥4.5:1 for body) in both dark and light themes (specifically checking `#978b7f` and `#8a8077`).
3. Verify non-JS / headless rendering: ensure inline preview remains fully readable without JS.

**Focused checks**
- `npm run build`
- Lighthouse accessibility and performance scan.
- verify headless/JS-disabled states.

**Commit**
- Example: `chore(audit): finalise bilingual copy and accessibility contrast`
- Commit: QA signed off; push branch

---

## Integration gate
- `npm run build`
- `tsc -b`
- end-to-end local test: inline preview → open case reader → play video → close reader.
- manual responsive/design review against `PRODUCT.md` and `DESIGN.md`.
- No new NPM packages added (strict enforcement).

## Merge / rollback
- Merge non-FF to `dev` for daily review.
- Rollback: Revert UI changes, restore old `projects.ts` data, drop `CaseReader` component.

## Phase acceptance
- Case reader is fully accessible via keyboard.
- Media size is successfully reduced, no large autoplay videos block rendering.
- Code firmly adheres to CSS Modules without new styling dependencies.
