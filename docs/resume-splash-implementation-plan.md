# `/resume` Splash Screen — Implementation Plan

**Status:** Ready to implement; no splash code has been written yet

**Route:** `/resume` and `/resume/` only

**Date:** 2026-07-17

**Design reference:** [Southern Guild pre-loader on Awwwards](https://www.awwwards.com/inspiration/pre-loader-southern-guild)

## 1. Goal

Create a premium first-visit splash for the Resume route that makes **FRAN** memorable. Orange letter fragments assemble into the word, the loading percentage reports real first-view readiness, then the fragments separate to reveal the existing Resume hero.

The splash must:

- run only on the exact `/resume` route, including the trailing-slash form;
- play once per browser-tab session;
- remain visible for at least 2 seconds;
- remain visible longer when the critical first view is not ready;
- work in the existing dark and light themes;
- use fewer fragments on mobile without feeling like a reduced-quality version;
- replace fragment motion with a static FRAN and a crossfade under reduced motion;
- use only the libraries already installed in the repository.

## 2. Confirmed design decisions

| Area | Decision |
| --- | --- |
| Primary memory | FRAN is the hero; art direction and motion support the name. |
| Motion language | Letter fragments assemble, hold, then separate to reveal the page. |
| Visual reference | Southern Guild's constructed-piece pre-loader, adapted rather than copied. |
| Dark theme | Warm dark background with ember-orange fragments. |
| Light theme | Existing light background with the same ember-orange fragments. |
| Copy | FRAN plus a loading percentage only. |
| Duration | Minimum 2 seconds; longer only when critical loading is incomplete. |
| Frequency | Once per tab session. |
| Mobile | Fewer, larger fragments with the same choreography and finish quality. |
| Reduced motion | Static FRAN + real percentage, followed by a short crossfade. |

## 3. Repository findings that shape the implementation

### Route and component ownership

- `src/App.tsx` currently detects Resume with `window.location.pathname.includes('/resume')`. This is too broad for the requirement because paths such as `/resume-preview` would also match.
- `src/pages/Resume/Resume.tsx` is the only Resume route page and is therefore the correct owner of the single-use splash.
- `SectionNav` is rendered by `App.tsx` outside `Resume`. The splash should use a portal and temporarily make `#root` inert so the nav and the Resume page cannot receive pointer or keyboard interaction behind the overlay. `SectionNav` itself does not need modification.

### Existing motion and accessibility

- The project already uses `motion/react` and wraps the app in `MotionConfig reducedMotion="user"`.
- `Resume.tsx` also observes `prefers-reduced-motion` for hero videos and local motion.
- `AnimatePresence` is already used in the Resume hero and can provide the splash exit lifecycle without installing another animation library. Motion documents that direct children can run an `exit` animation before unmounting: [AnimatePresence documentation](https://motion.dev/docs/react-animate-presence).
- Motion's existing reduced-motion hook can drive the static fallback: [useReducedMotion documentation](https://motion.dev/docs/react-use-reduced-motion).

### Critical media and loading scope

The Resume hero currently includes four local videos:

| Asset | Approximate size |
| --- | ---: |
| `psu.mp4` | 4.00 MB |
| `event.mp4` | 4.06 MB |
| `lab.mp4` | 3.82 MB |
| `hatyai.mp4` | 2.88 MB |
| **Total** | **14.76 MB** |

The existing page intentionally preloads the active and next videos with `auto` and the remaining videos with `metadata`. Preserve that strategy. Waiting for all four full videos would make the splash a performance blocker.

The splash percentage will therefore represent **measured critical first-view readiness**, not downloaded bytes for the entire page:

1. React Resume shell mounted — 10%.
2. Required document fonts ready — 20%.
3. First hero poster decoded or safely failed to its fallback — 25%.
4. First hero video has its first frame ready, or has safely failed to the poster — 45%.

The result is a truthful weighted readiness score. It reaches 100 only when the first view can be revealed. The browser exposes media readiness through `readyState` and events such as `loadeddata`; `loadeddata` means the first frame has loaded: [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) and [readyState](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState). Font readiness is available through `document.fonts.ready`: [CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API).

### Current uncommitted work

At plan creation time, the branch is `codex/resume-activity-hub` and these relevant files already contain user changes:

- `src/pages/Resume/Resume.tsx`
- `src/pages/Resume/Resume.module.css`
- all four `src/assets/resume/hero/*.mp4` files

Implementation must preserve those changes and start only after the current worktree is clean or the user has intentionally carried that work onto the splash feature branch.

The baseline `npm run lint` and `npm run build` check did not produce a result before the 124-second command timeout. Treat both as unverified gates, not as passes or failures.

## 4. Planned file changes

### Create

| File | Responsibility |
| --- | --- |
| `src/pages/Resume/ResumeSplash.tsx` | Presentational, route-specific splash rendered through a portal. Typed props only. Keep under 100 lines. |
| `src/pages/Resume/ResumeSplash.module.css` | Theme-aware full-screen layout, fragment masks, mobile composition, and reduced-motion CSS fallback. |
| `src/hooks/useResumeSplash.ts` | Session check, readiness aggregation, 2-second minimum, error timeout, exit state, and cleanup. |

### Modify

| File | Minimal change |
| --- | --- |
| `src/App.tsx` | Replace substring route detection with exact normalized matching for `/resume` and `/resume/`. |
| `src/pages/Resume/Resume.tsx` | Mount the hook and splash, report first-video readiness/error, and avoid replaying the Hero FRAN entrance underneath the first splash. |
| `src/styles/global.css` | Add one named route-splash z-index token only if required; do not change existing colors or other components. |

Do not modify `SectionNav`, other pages, shared components, or the Resume content beyond the small integration points above.

## 5. Component and hook contracts

Use explicit interfaces and no `any`.

```ts
interface ResumeSplashProps {
  isVisible: boolean;
  progress: number;
  prefersReducedMotion: boolean;
  onExitComplete: () => void;
}

interface UseResumeSplashOptions {
  isCriticalVideoSettled: boolean;
}

interface UseResumeSplashResult {
  isVisible: boolean;
  progress: number;
  prefersReducedMotion: boolean;
  completeExit: () => void;
}
```

Names may be tightened during implementation, but the ownership must remain the same: the hook owns behavior; `ResumeSplash` owns rendering; `Resume` only supplies critical-video state and mounts the feature.

## 6. Route isolation

In `App.tsx`, normalize only a trailing slash and compare exactly:

```ts
const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
const isResumeRoute = normalizedPath === '/resume';
```

Acceptance cases:

- `/resume` → Resume with eligible splash.
- `/resume/` → Resume with eligible splash.
- `/resume-preview`, `/work/resume`, and `/?resume=true` → must not activate the Resume splash.

No router or new dependency is required.

## 7. Loading and session state machine

Use the session key `resumeSplash:v1`. `sessionStorage` is scoped to the browser tab and cleared when that tab closes, matching the approved once-per-session behavior: [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

```text
session key exists
  -> skipped -> render Resume normally

session key missing
  -> loading -> minimum 2-second timer + critical readiness checks
  -> ready   -> progress is 100 and minimum timer has elapsed
  -> exiting -> fragments separate / reduced-motion crossfade
  -> complete -> write session key, restore page interaction, unmount portal
```

Implementation details:

1. Read and write `sessionStorage` inside `try/catch`; storage denial must not break the route.
2. Start the 2-second minimum timer when the splash first mounts.
3. Resolve font readiness using `document.fonts.ready`.
4. Decode `psu-poster.jpg` with an `Image` instance; resolve the poster check on either decode success or error.
5. In `Resume.tsx`, mark the first hero video settled when `loadeddata` fires or when `readyState >= HTMLMediaElement.HAVE_CURRENT_DATA` at ref assignment.
6. Treat video error as settled and reveal the existing poster rather than trapping the visitor.
7. Add an 8-second safety timeout for missing browser events or data-saving behavior. At timeout, reveal the poster-backed Hero and complete the splash; do not leave the route blocked indefinitely.
8. Clear every timer and listener in effect cleanup so React Strict Mode does not duplicate completion or storage writes in development.
9. Write the session key only when exit begins or completes successfully, not at initial mount.

Do not use `fetch`, XHR, or a second full video download to simulate byte-level progress. The existing `<video>` element remains the source of media truth and the browser retains control of buffering.

## 8. Motion choreography

Use `motion/react`; do not add GSAP code or another library for this feature.

### Standard motion

1. **0–1.2s — Assemble:** Six desktop text layers containing `FRAN` begin offset around the center. Each layer uses a different `clip-path` slice so the visible pieces assemble into one word with the existing ease-out-quint character.
2. **1.2–2.0s — Resolve:** The complete word holds still. The percentage continues to report readiness. Do not add a looping idle animation.
3. **After 2.0s and 100% — Separate:** The slices leave in the reverse spatial direction with a short 400–500ms exit, revealing the already-rendered Resume hero beneath.
4. **Slow loading:** If readiness takes longer than 2 seconds, keep FRAN assembled and still; update only the percentage.

All fragment copies must be `aria-hidden="true"`. Provide one non-heading accessible label for “FRAN” so the document keeps the existing Resume `h1` as its only primary heading.

### Hero handoff

- Render the Resume page behind the portal from the start so the first video can load.
- During the first splash, render the existing Hero FRAN in its settled state rather than letting its entrance animation finish invisibly behind the overlay.
- Keep the existing Hero entrance behavior when the splash is skipped on repeat visits.
- The exit is a reveal, not a shared-layout morph; this avoids tightly coupling the full-screen FRAN geometry to the responsive Hero heading.

### Mobile

- Below 768px, render four larger slices instead of six smaller slices.
- Keep the same type weight, orange treatment, easing, and exit rhythm.
- Scale FRAN with `clamp()` and protect 320–375px widths from horizontal overflow.
- Respect safe-area insets when placing the percentage.

### Reduced motion

- Render a single static FRAN instead of clipped moving copies.
- Keep the real percentage and the same loading/session rules.
- Exit with a short opacity crossfade, or instantly when the global reduced-motion rule reduces transition duration.
- Do not play the Resume Hero entrance immediately afterward.

## 9. Theme and visual styling

Use the committed design tokens already in `src/styles/global.css`:

- overlay background: `var(--color-bg)`;
- FRAN fragments: `var(--color-accent)`;
- percentage and supporting linework: `var(--color-text-dim)` or `var(--color-text)` after contrast verification;
- display type: `var(--font-heading)`;
- percentage type: `var(--font-body)`.

The overlay automatically follows `[data-theme="dark"]` and `[data-theme="light"]`. Do not duplicate hardcoded dark/light palettes in the CSS Module, add gradients, add sound, or add a second accent color.

## 10. Interaction and accessibility

1. Render the splash with `createPortal(..., document.body)` so it sits outside `#root`.
2. While visible, set `#root` to `inert` and lock body scrolling. Store and restore the previous values during cleanup.
3. Use a status region with a stable accessible message such as “Loading Fran's resume”. Do not announce every percentage change to screen readers.
4. Mark the visual percentage and duplicated fragment layers `aria-hidden` when the stable status message already communicates loading.
5. Do not add a fake button, skip link, focus trap, or sound prompt; the approved interaction has no user action.
6. Restore page interaction before or at portal unmount. Do not force keyboard focus to a new element after the reveal.
7. Verify orange/text contrast in both themes and ensure FRAN never clips at 200% text zoom.

## 11. Error and edge-case behavior

- **Font request fails:** continue with the declared fallback family and count the font check as settled.
- **Poster fails:** continue to the video check; use the hero background color if both media sources fail.
- **First video fails:** count media as settled, keep the poster, and reveal the page.
- **Storage unavailable:** play the splash for that navigation, catch the exception, and allow the page to complete normally.
- **Tab becomes hidden:** timers may be throttled; completion must re-evaluate elapsed time and readiness when the tab becomes visible.
- **React Strict Mode:** no duplicate timers, exit callbacks, or storage writes.
- **Theme changes in another lifecycle step:** CSS variables determine the visible theme; no captured hardcoded theme state in the splash.
- **Reload during splash:** because the session key is written only at successful exit, the splash may replay; this is preferable to marking an incomplete experience as seen.

## 12. Implementation sequence

1. Clean or intentionally preserve the current Resume work and create the splash feature branch from `dev`.
2. Tighten exact Resume route detection in `App.tsx`.
3. Add `useResumeSplash.ts` with session, readiness, minimum duration, timeout, and cleanup.
4. Add the presentational `ResumeSplash.tsx` and its CSS Module.
5. Integrate first-video readiness/error reporting and Hero handoff behavior in `Resume.tsx`.
6. Add portal inert/scroll-lock lifecycle and reduced-motion behavior.
7. Verify route, session, loading, theme, responsive, accessibility, and failure cases.
8. Run repository gates, review the diff, then make one scoped commit.

## 13. Verification matrix

### Automated gates

- `git diff --check`
- `npm run lint`
- `npm run build`
- Confirm no new package or lockfile change.
- Confirm every new prop uses an interface and no `any` appears.
- Confirm each component remains under 100 lines; if not, pause and ask before splitting further.

### Browser checks

| Case | Expected result |
| --- | --- |
| First `/resume` visit | Splash plays, lasts at least 2s, reports readiness, exits once. |
| Refresh in same tab | Splash is skipped. |
| Open `/resume` in a new tab | Splash plays again. |
| Clear `resumeSplash:v1` | Splash becomes eligible again. |
| `/resume/` | Same behavior as `/resume`. |
| Non-Resume path containing “resume” | Splash and Resume route do not activate. |
| Slow network | FRAN holds after 2s until ready; no looping distraction. |
| Video request failure | Splash completes using poster fallback. |
| Dark/light theme | Correct background and ember-orange fragments in both. |
| Reduced motion | Static FRAN + percentage + crossfade; no fragment travel. |
| Keyboard during splash | Underlying nav and page cannot receive focus. |
| 375×812 | Four-fragment mobile composition; no overflow. |
| 768×1024 | Tablet composition remains centered and clear. |
| 1280×800 | Six-fragment composition and percentage placement are balanced. |
| 200% text zoom | FRAN and percentage remain visible without clipping. |

Also inspect the console for media, storage, hydration, and animation errors and confirm no duplicate effects appear under React Strict Mode.

## 14. Definition of done

- The splash can only activate on `/resume` or `/resume/`.
- The first visit per tab session plays; repeat visits skip.
- The percentage is tied to documented first-view readiness checks and never reaches 100 before they settle.
- The splash remains for at least 2 seconds and cannot trap a visitor indefinitely.
- The standard, mobile, light, dark, and reduced-motion variants match the approved direction.
- Existing Resume video rotation, language/theme toggles, SectionNav, Lenis scrolling, and Hero content still work after reveal.
- No unrelated component is changed, no package is installed, and all TypeScript props are explicitly typed without `any`.
- Lint, build, route smoke checks, interaction checks, and visual checks pass.

## 15. Git workflow for implementation

Do not implement on `main` and do not merge or push without the required approval.

1. Finish or intentionally commit the current `codex/resume-activity-hub` work so the worktree is clean.
2. Switch to `dev`; do not switch to or modify `main`.
3. Create `feat/resume-splash` from the current `dev` branch.
4. Implement only the files listed in this plan.
5. Review `git status` and `git diff`; stage only splash-related files.
6. Commit with:

   ```text
   feat: add Resume splash screen
   ```

7. Before any `git push`, show the exact commit message and wait for user approval.
8. Before any merge into `dev`, ask the user for approval.
9. Never merge or push directly to `main`.
