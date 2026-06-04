---
name: Fran Portfolio
description: Warm-dark, hairline-ruled portfolio for a detail-obsessed front-end developer — bilingual EN/TH, single ember accent.
colors:
  accent: "#d4651a"
  accent-hover: "#e07030"
  accent-dark: "#c4551a"
  bg: "#131110"
  surface: "#161412"
  surface-alt: "#1a1816"
  border: "#1e1c18"
  border-soft: "#1a1816"
  text: "#f0e8e0"
  text-sub: "#d0c8c0"
  text-muted: "#9a9088"
  text-dim: "#978b7f"
  text-faint: "#8a8077"
  light-bg: "#faf8f5"
  light-surface: "#f0ebe4"
  light-text: "#1a1614"
  light-accent: "#c4551a"
  bento-surface: "#1c1916"
  bento-border: "#2a2520"
  bento-ink: "#e0d4c8"
typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  stat:
    fontFamily: "Syne, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "normal"
  title:
    fontFamily: "Syne, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-th:
    fontFamily: "IBM Plex Sans Thai, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.875rem"
  button: "7px"
  card: "14px"
  bento: "24px"
  full: "9999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  6: "1.5rem"
  8: "2rem"
  10: "2.5rem"
  12: "3rem"
  gutter: "5vw"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#fdf8f4"
    rounded: "{rounded.button}"
    padding: "10px 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "#fdf8f4"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-dim}"
    rounded: "{rounded.button}"
    padding: "10px 20px"
  pill-badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    padding: "5px 14px"
  skill-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    rounded: "12px"
    padding: "20px 8px"
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.card}"
    padding: "20px"
  nav-toggle:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-sub}"
    rounded: "{rounded.full}"
    size: "36px"
---

# Design System: Fran Portfolio

## 1. Overview

**Creative North Star: "The Ember Workshop"**

A single warm light in a dark, careful room. The interface is built on a near-black warm brown (`#131110`) and lit by exactly one color: a burnt-orange ember (`#d4651a`). Everything else is structure — hairline rules, restrained type, generous air. The mood is a workshop after hours: someone who takes pride in the joinery, working by lamplight, in no hurry to shout about it. This is the visual argument that PRODUCT.md asks for: *"the site's own polish is the portfolio entry."* The craft is the pitch.

The system is **token-driven and flat**. Surfaces sit on near-invisible 0.5px borders rather than heavy shadows; depth is conveyed by tonal layering (`bg` → `surface` → `surface-alt`) and the occasional soft ambient shadow under genuinely floating elements (the sticky navbar, floating cards, the back-to-top button). Every section is separated by a single 0.5px rule — a quiet drafting-table grid that runs the length of the page. Type is set in two voices: **Syne** for anything structural or headline (architectural, geometric, confident), and a humanist body sans for prose. The page is full-bleed (`max-width: none`) with a consistent `5vw` side gutter, so the composition breathes edge to edge on large screens rather than hiding in a centered column.

It explicitly rejects the things PRODUCT.md names as anti-references. Not a **generic template portfolio**: no identical card grid, no skill progress bars, no interchangeable hero-plus-three-cards scaffold. Not a **corporate SaaS landing page**: no big gradient hero, no feature-metric template, no enterprise blue. Not **over-designed**: motion is calm and purposeful, never a pile of gimmicks competing with the work.

**Key Characteristics:**
- Warm near-black canvas lit by one ember-orange accent; no second hue competes.
- Hairline (0.5px) borders and section rules as the primary structural device.
- Flat by default; soft ambient shadow only on truly floating surfaces.
- Syne (display) paired with a humanist body sans; weight and size carry hierarchy.
- Full-bleed layout, `5vw` gutter, mobile-first at 375 → 768 → 1280.
- Dual-theme (warm-dark default, warm-light) and dual-language (EN/TH), both first-class.

## 2. Colors

A monochrome warm-neutral field with a single saturated accent — a **Committed** strategy where one color carries the brand and nothing dilutes it.

### Primary
- **Ember Orange** (`#d4651a`): The only saturated color in the system and the entire brand voice. Used sparingly and deliberately — primary buttons, the avatar status dot, link hovers, the active nav state, the typing caret, the primary-stack skill icons, and the one drenched stats panel in the Projects bento. Hover lifts to **Ember Bright** (`#e07030`); borders and pressed states use **Ember Deep** (`#c4551a`).

### Neutral
- **Forge Black** (`#131110`): The page canvas. A near-black warm brown, not a true black — it reads as a dark room, not a void.
- **Char** (`#161412`) / **Char Light** (`#1a1816`): Raised surfaces. Cards, badges, toggles, and nav buttons sit one or two steps above the canvas via tone, not shadow.
- **Hairline** (`#1e1c18`) / **Hairline Soft** (`#1a1816`): Border and divider colors. Almost imperceptible at 0.5px; they define structure without drawing attention.
- **Warm Bone** (`#f0e8e0`): Primary text and headings. A warm off-white, never pure `#fff`.
- **Stone** (`#d0c8c0` → `#9a9088`): Sub-text and muted body copy.
- **Driftwood** (`#978b7f` → `#8a8077`): Dim text and faint labels. Both now clear WCAG AA on the dark canvas (~5.7:1 and ~4.9:1), so they carry small labels and secondary copy safely.

### Light Theme (secondary surface)
- **Warm Paper** (`#faf8f5`) canvas, **Linen** (`#f0ebe4`) surfaces, **Espresso Ink** (`#1a1614`) text, **Ember Deep** (`#c4551a`) accent. The light theme keeps the same warm temperature and the same single-accent discipline; it is the same room with the lights on, not a different brand.

### Named Rules
**The One Ember Rule.** Exactly one accent color exists. `#d4651a` is the only saturated hue anywhere on the site, and it is used on roughly ≤10% of any screen. Its rarity is the entire point — the moment a second accent appears, the workshop becomes a template.

**The No-Pure-Black, No-Pure-White Rule.** The canvas is `#131110`, never `#000`. Text is `#f0e8e0`, never `#fff`. Warmth lives in the neutrals; bleaching either end breaks the lamplit mood.

## 3. Typography

**Display Font:** Syne (with `sans-serif` fallback), weights 600/700/800 — loaded via Google Fonts.
**Body Font (EN):** Satoshi, with `sans-serif` fallback. Loaded from the Fontshare CDN via a `<link>` in `index.html` (weights 300/400/500/700). Note the **split font-loading strategy**: Satoshi loads from Fontshare, while Syne and IBM Plex Sans Thai load via `@import` in `global.css`. The `sans-serif` fallback covers the brief load window.
**Body Font (TH):** IBM Plex Sans Thai (weights 400/500/600), swapped in automatically under `[data-lang="th"]` — loaded via Google Fonts.

**Character:** Syne is geometric, slightly mechanical, and architectural — it gives headings and the `fran.` wordmark a designed, confident edge without reading as a generic sans. Against a humanist body sans, the pairing is contrast-on-axis (geometric display vs. humanist body), not two near-identical sans-serifs. The root font size is **17px** (not the usual 16px), so the whole rem scale runs a touch larger and calmer than default.

### Hierarchy
- **Display** (Syne, 700, `clamp(2.25rem → 3rem)`, line-height 1.15, tracking -0.02em): The Hero `h1` ("Hi, I'm Fran."). The single largest type on the page; the accented name is the one ember word.
- **Stat** (Syne, 800, 30px, line-height 1): The big numbers in the Projects stats panel. Tight and emphatic on the drenched ember card.
- **Title** (Syne, 700–800, 16–22px, line-height 1.1–1.2): Section headings, project titles, role titles, contact heading. Structural type, always Syne.
- **Body** (body sans, 1rem ≈ 17px, weight 400, line-height 1.6): Bio and descriptive prose. Cap measure at **65–75ch**; the About column already runs comfortably below that.
- **Label** (sans, 11–13px, weight 400–500, tracking 0.06–0.14em, UPPERCASE): Section eyebrows ("Stack", "About"), row labels, nav links, card tags. Short labels only — never sentences.

### Named Rules
**The Syne-for-Structure Rule.** Anything structural — headings, titles, the wordmark, stat numbers — is Syne. Anything you read in sentences is the body sans. The two never trade jobs.

**The Short-Label Rule.** Uppercase + letter-spacing is reserved for labels of four words or fewer. Body copy is never set in all-caps and never tracked out; the eyebrow treatment is a label device, not a prose device.

## 4. Elevation

Flat by default. The system conveys depth through **tonal layering and hairline borders**, not stacked shadows. A surface is "raised" because it is `#161412` against a `#131110` canvas with a 0.5px `#1e1c18` border — not because it casts a shadow. Shadows appear only on elements that genuinely float above the document.

### Shadow Vocabulary
- **Sticky chrome** (`box-shadow: 0 4px 24px rgba(0,0,0,0.18)`): The sticky navbar, anchoring it above scrolling content.
- **Floating card** (`box-shadow: 0 4px 20px rgba(0,0,0,0.15)`): The compact project cards, which read as lifted tiles.
- **Floating control** (`box-shadow: 0 4px 16px rgba(0,0,0,0.2)`): The fixed back-to-top button.

All three are the same gesture: a soft, diffuse, downward ambient shadow at low opacity. There is no sharp or layered shadow anywhere; nothing "pops" with a hard edge.

### Z-index Scale
A small semantic ladder, never arbitrary 999s: **navbar 10 → back-to-top 50 → modal overlay 100 → modal controls 101**. New layered UI should slot into this ladder, not invent values above it.

### Named Rules
**The Hairline Rule.** Structure is drawn with 0.5px borders and 0.5px section rules in the `#1e1c18`/`#1a1816` family. Reach for a hairline border before reaching for a shadow; shadows are earned only by elements that truly float.

## 5. Components

For each: a character line, then shape, color, states, behavior.

### Buttons
*Quiet, compact, low-radius — they look like part of the furniture, not glossy CTAs.*
- **Shape:** Gently rounded, **7px** (`rounded.button`).
- **Primary:** Ember fill (`#d4651a`), warm off-white label (`#fdf8f4`), padding `10px 22px`, weight 500. Hover lifts the fill to `#e07030`. Used for "View Projects" and the Contact CTA.
- **Ghost:** Transparent fill, dim text (`text-dim`), 0.5px border. Hover warms the text to `text-muted` and softens the border. Used for "Say hello".
- **Link buttons (cards):** Pill-adjacent rounded-rect (8px), 0.5px border, with an inline devicon. The accent variant (`lbtnAcc`) fills ember for the live-demo action.

### Chips / Badges
- **Pill badge:** `surface` fill, 0.5px border, `radius-full`, padding `5px 14px`, muted text with `0.04em` tracking — the Hero "Open to internship" status pill.
- **Tech badge:** Hairline-outlined pill (no fill), `text-sub`, 13px — the per-card tech list. In the Projects bento, badges split into **primary** (ember border, bright ink) and **secondary** (hairline border, muted ink).

### Cards / Containers
- **Corner style:** 12px (skill tiles), 14px (compact project cards), up to **24px** for the large bento cells — bigger surfaces get softer corners.
- **Background:** `surface` (`#161412`); the bento island runs a slightly warmer/lighter `#1c1916`.
- **Border:** 0.5px hairline (`#1e1c18`); the bento uses a more visible `#2a2520`.
- **Shadow:** None at rest (skill tiles) or the soft "floating card" ambient shadow (compact cards). See Elevation.
- **Padding:** 18–22px interior on cards; skill tiles use `20px 8px` to center their icon+label stack.

### Inputs / Fields
No text inputs exist yet (contact is mailto/social links, not a form). When a field is introduced, follow the system: `surface` fill, 0.5px hairline border, ~8px radius, and an **ember focus ring or border-shift** (never a default browser blue glow) to stay inside The One Ember Rule.

### Navigation
- **Style:** Sticky top bar, `bg`-filled, 0.5px bottom rule, soft sticky-chrome shadow, `z-index: 10`. Wordmark `fran.` in Syne on the left; links + language toggle + theme toggle on the right.
- **Links:** 13px, UPPERCASE, `0.06em` tracking, `text-muted`, hover → ember. Lowercase Thai labels swap in under `[data-lang="th"]`.
- **Toggles:** 36px circular buttons (`radius-full`), `surface` fill, 0.5px border, hover warms text + border to ember. The theme icon (sun/moon SVG) plays a 0.3s rotate-and-scale swap on toggle.
- **Mobile:** The same bar; links stay inline (short labels keep it compact).

### Signature: The Projects Bento
A 12-column CSS grid (≥768px) of asymmetric cells: a main project card (cols 1–7) with a browser-chrome mockup thumbnail, a role card (cols 8–12) with a bulleted contribution list and a "team" pill, two screenshot cells, and one **drenched ember stats panel** (`#d4651a`) carrying 30px Syne white numbers. On mobile it collapses to a single stacked column. This is the one place the palette is intentionally **hardcoded** (its own slightly warmer `#1c1916`/`#2a2520`/`#e0d4c8` set) and the one place that does **not** theme-switch — a deliberate, self-contained art-directed island, per its original brief.

### Projects: Content & Storytelling (non-visual)

*Guidance for the words in Projects, not its visual layout. Full positioning lives in PRODUCT.md.*

Projects are the core of the pitch and are read by a mixed, partly non-technical audience (recruiters, clients), with depth available for reviewers. Treat each project as a short, plain-language case study:
- **Lead with the problem and what the product does for a person**, in language a non-developer follows. Screens illustrate that story; they are not the story on their own.
- **Make Fran's contribution explicit** — the thinking, the building across the stack, the debugging, the shipping — especially on team projects.
- **Keep technical depth on demand:** stack, links, and the gallery serve reviewers without making the first read technical.
- **No metrics theater.** Any number shown must reflect a real outcome; never invent scale or stats for decoration.

This keeps the visual signature intact while making sure the copy argues that Fran ships usable products, not only polished front-ends.

### Signature: Hero Typing Effect
The role line cycles through "Front-end Developer / Problem Solver / Builder / Learner" via a typewriter effect with a blinking 2px ember caret. The visible typed text carries `aria-label` with the full string so it is announced sensibly.

### Signature: The Gallery Lightbox
*A focused, full-screen viewer for project screenshots and the demo video.*
- Rendered through a React **portal** to `document.body`, escaping the section's stacking context. It is the **only true overlay** in the system — everything else is inline.
- A dim scrim (`rgba(0,0,0,0.85)`) with an 0.18s fade-in. The media (image, or autoplay-muted `<video>`) is centered and capped at `90vw` / `82vh` with a light 6px radius.
- Controls are translucent-white circles on hairline borders: prev/next arrows (44px, vertically centered on desktop, stacked below the media on mobile), a close ✕ and an `N / M` counter pinned to the top corners, and a one-shot "swipe to navigate" hint that fades out.
- Layered on the z-index ladder: overlay `100`, controls `101`. Keyboard: Escape closes, ←/→ navigate. Touch: a horizontal swipe over 50px navigates. Marked `role="dialog"` + `aria-modal="true"`.
- **Known gaps** (see audit, not yet addressed): no focus trap, no focus restoration on close, no body-scroll lock, and the dialog has no accessible name.

## 6. Do's and Don'ts

### Do:
- **Do** keep `#d4651a` as the only accent. One ember, used on ≤10% of any screen (The One Ember Rule).
- **Do** build structure with 0.5px hairline borders and section rules before reaching for a shadow (The Hairline Rule).
- **Do** use Syne for every structural/heading element and the body sans for every readable sentence (The Syne-for-Structure Rule).
- **Do** keep the canvas warm near-black (`#131110`) and text warm bone (`#f0e8e0`) — never `#000`, never `#fff`.
- **Do** set EN and TH as equals: correct `lang`/`[data-lang]` semantics, comfortable Thai line-height, and the IBM Plex Sans Thai swap.
- **Do** slot new layered UI into the existing z-index ladder (10 / 50 / 100 / 101), never arbitrary 999s.
- **Do** keep the full-bleed `5vw` gutter and the mobile-first 375 → 768 → 1280 breakpoints.

### Don't:
- **Don't** build a **generic template portfolio**: no identical card grid, no skill progress bars, no interchangeable hero-plus-three-cards scaffold. (PRODUCT.md anti-reference.)
- **Don't** drift toward a **corporate SaaS landing page**: no big gradient hero, no feature-metric template, no enterprise blue. (PRODUCT.md anti-reference.)
- **Don't** **over-design**: no pile of competing animations or decorative effects that distract from the work itself. (PRODUCT.md anti-reference.)
- **Don't** introduce a second accent hue, a gradient, or gradient text. The system is monochrome-plus-ember on purpose.
- **Don't** use `border-left`/`border-right` as a colored accent stripe; structure is full hairline borders or nothing.
- **Don't** gate content visibility purely on a JS-added class. The current `.reveal` starts at `opacity: 0` and only shows when JavaScript runs — content must remain readable if the reveal never fires (headless render, disabled JS, reduced motion).
- **Don't** ship animations without a `@media (prefers-reduced-motion: reduce)` fallback. Reduced motion is a stated accessibility expectation and is not yet implemented across reveals, the typing effect, and the icon swap.
- **Don't** assume the fonts all load from one place. Satoshi loads from the Fontshare CDN (`index.html`); Syne and IBM Plex Sans Thai load via `@import` in `global.css`. Keep both wired and keep the `sans-serif` fallback when adding body styles.
- **Don't** set sustained text dimmer than the dim/faint tokens (`#978b7f` / `#8a8077`, which clear AA on the dark canvas). Anything fainter fails ≥4.5:1; verify contrast in both themes.
