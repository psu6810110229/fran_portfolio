# Projects 2.0 — Implementation Brief

> **Status:** Locked concept, documentation only. No code written yet.
> **Branch:** `chore/impeccable-redesign`.
> **Sources of truth:** this repo, `src/data/projects.ts`, existing media in `src/assets/9tours/`, `PRODUCT.md`, `DESIGN.md`, and the agreed Projects 2.0 concept.
> **Last correction folded in:** 9tours role language (team project, group lead / project manager). See section 3.

---

## 1. Goal

Projects 2.0 turns the Projects section into the strongest part of the portfolio: a short, plain-language **case study** that proves Fran can take an idea and ship a usable web product, not just style screens.

**What it must achieve**
- Reposition beyond "front-end only." The section should read as *product and software ownership*: leading direction, making decisions, solving a real cross-stack problem, and shipping with a team.
- Make the value obvious in seconds to a mixed, partly non-technical audience, with technical depth available for those who dig.
- Keep the work (real screens, real flow) front and centre, framed by an honest story.

**How it speaks to each audience**
- **HR / recruiters (often non-technical):** the inline preview tells them, without clicking, what 9tours is, what Fran led, and that it works.
- **Freelance clients / people who might hire Fran:** the framing is "I can run a product from idea to shipped," in their language.
- **Technical reviewers (secondary):** the full case reader and the "hardest issue" section give real engineering substance (the booking race condition, front-end and API collaboration), plus a link to the team code.

This section is the live proof of the repositioning in `PRODUCT.md`.

---

## 2. Locked Concept

- **9tours is the primary featured case study.** It is the only project with a real gallery and flow video, and it carries the strongest story.
- **Gear Rental and MinusOnMine are secondary projects**, shown as compact cards beneath the feature. No full case reader for them in this pass.
- **Architecture: Preview in page → full case reader (hybrid).**
  - **Inline preview** lives on the Projects section and **must communicate value on its own**, without anyone opening the full case: project name, one-line problem, Fran's role in one line, a one-line result, a hero screen, 2–3 thumbnails, stack badges, and the actions.
  - **Full case reader** is **depth on demand**: a focused, full-screen reader that opens on click and tells the complete story. The heavy media (full 16-shot gallery, flow video) lives here, loaded only when opened.
- **No scroll-jacking, no pinned-scroll narrative.** The "scroll-driven" option was considered and rejected for mobile fragility and reduced-motion cost.

---

## 3. 9tours Ownership & Role Language (honesty rules)

9tours is a **team project at PSU**. Fran was the **group lead / project manager**: he set and supervised the product and design direction from wireframe to production look, kept the team aligned, and also implemented front-end and parts of the API **together with teammates**. The GitHub repository belongs to a teammate; Fran is a contributor.

### Approved wording (use these)
- "a team project at PSU"
- "I was the group lead and project manager"
- "I led and supervised the product and design direction, from wireframe to the production look"
- "I kept the team aligned on what we were building"
- "I implemented front-end and parts of the API alongside my teammates"
- "what the team built" / "what I personally led and contributed"
- "View team code" (label for the repo link)

### Banned wording (never imply)
- "I built the whole front-end" / "I did all the front-end alone"
- "I single-handedly…" or any sole-builder framing
- "my repo" / "my project" in a way that hides the team
- anything implying the GitHub repo is Fran's
- any seniority or scale beyond a first-year student leading a class team

**Principle:** broad but honest. Leadership and direction are real and worth stating plainly; solo authorship is not. Every claim must survive a follow-up question in an interview.

---

## 4. Case-Study Content Structure (9tours)

The full case reader is organised into these sections, in order. They map onto a five-beat emotional arc (entrance → need → ownership → tension → payoff → warm close) but the **content** sections are what gets written. Draft EN/TH copy is in the Appendix.

| # | Section | What it must communicate |
|---|---------|--------------------------|
| 1 | **Problem** | The real user need, from the traveller's side, in one plain idea: booking a tour should be quick and certain. Non-technical. |
| 2 | **My role** | Fran as group lead / project manager who steered product and design from wireframe to production, and also built alongside the team. Per section 3. |
| 3 | **What the team built** | The product scope, credited to the team: browse tours, a booking flow, confirmation, and an admin side to manage it. |
| 4 | **What I personally led / contributed** | Separates leadership (direction, wireframe-to-production supervision, keeping the team aligned) from hands-on work (front-end and parts of the API, with teammates). Makes the personal contribution clear without overclaiming. |
| 5 | **Hardest issue** | The booking **race condition** (see below). The emotional and technical peak. Plain headline first, short technical depth after. |
| 6 | **Product / design decisions** | One or two real decisions Fran drove as lead (e.g. simplifying the booking flow, driving wireframe-to-production consistency). *Placeholder examples in Appendix are marked to confirm with real specifics before shipping.* |
| 7 | **Front-end / API / backend collaboration** | How the team worked across the stack and how Fran coordinated and contributed on both sides. Reinforces product-minded, full-stack-aware, honestly collaborative. |
| 8 | **Result** | The working product end to end, plus the admin side. The payoff. Leads into media. |
| 9 | **Media / gallery** | The flow video and the full 16-shot gallery, as depth on demand. |
| 10 | **Contact handoff** | A warm, human close that invites a conversation and routes to the Contact section, plus the "View team code" link. |

### Hardest issue: the booking race condition (locked for this brief)
Kept understandable for non-developers, with a short technical layer for reviewers.

- **Headline:** Two people could book the last seat at the same moment, and both screens would say it worked.
- **Plain:** On a busy tour, two people could tap "book" on the last seat at almost the same time. The screen told each of them it had worked before the server had actually saved either booking, so the seat count and the price could end up wrong.
- **What we did:** I made the server the single source of truth. The screen now waits for the server to confirm a booking before it shows success and recalculates how many seats are left, instead of trusting what the browser assumed. We worked through this across the front-end and the API together.
- **Why it matters (non-technical):** it is the difference between a booking system people can trust and one that quietly double-books them.

This is treated as confirmed enough for the brief. Technical wording may be refined later.

---

## 5. Visual Direction

Built entirely on the existing identity in `DESIGN.md`. **No new visual language.**

- **North Star:** "The Ember Workshop." Warm near-black canvas, one ember accent, hairline structure, calm and meticulous.
- **Color strategy:** *Restrained* across the section (ember ≤10%), with **one deliberate Committed moment**: a warm "lamp coming on" as the case reader opens. No second hue, no gradient, no gradient text.
- **Type:** Syne for structure and titles, Satoshi for prose, IBM Plex Sans Thai for Thai. Existing scale and the Thai heading swap under `[data-lang="th"]`.
- **Surface system:** existing tokens and hairline borders. The inline feature is a single distinct block, not another card in a uniform grid (avoids the "identical card grid" trap). Secondary projects stay as the existing compact cards.
- **Both themes:** warm-dark default and warm-light, both first-class, AA verified.
- **Premium = restraint + craft + pacing**, not effects. No SaaS hero-metric panels, no decorative stats.

---

## 6. Motion Direction

- **CSS-only for now.** No animation library is to be added without asking first.
- Motion exists to **support storytelling and inspection**, never decoration:
  - **Case entrance:** a brief "lamp-up" (warm background lift plus a single ember pulse) as the reader opens.
  - **Section reveals:** gentle staggered fade/translate as each content section scrolls into view, using an existing reveal pattern. Content is **visible by default**; the reveal only enhances (progressive enhancement, gated on `html.js`).
  - **Inline hero:** a small lift on hover/focus.
  - Ease-out curves only. No bounce, no elastic.
- **Reduced motion:** every animation has a `prefers-reduced-motion: reduce` fallback (instant or simple crossfade). The lamp-up becomes an instant warm state.
- **No scroll-jacking.** Scrolling stays native; nothing hijacks or pins the viewport.

---

## 7. Accessibility Plan

The case reader is a true modal overlay and must be fully accessible. It also corrects the known `GalleryModal` gaps noted in `DESIGN.md` (or reuses a corrected version).

- **Keyboard:** open via a real `<button>`; Escape closes; full keyboard operation inside.
- **Focus handling:** move focus into the reader on open, **trap focus** within it, and **restore focus** to the trigger on close.
- **Scroll lock:** lock body scroll while open; release on close.
- **Accessible name:** `role="dialog"`, `aria-modal="true"`, labelled by the case title (`aria-labelledby`).
- **Z-index:** slot into the existing ladder (overlay 100 / controls 101).
- **No-JS / reveal-never-fires:** the **inline preview content stays fully readable** without JavaScript. Only the overlay requires JS; nothing critical to the pitch is JS-gated.
- **Alt text:** meaningful, voice-aligned alt text on every screenshot. Bilingual where shown to the user.
- **Contrast:** AA in both themes for all new text (re-verify; do not regress).

---

## 8. Bilingual Plan (EN / TH)

- EN and TH are **first-class equals**. Every new string ships in both.
- **Thai must sound natural**, not a thin translation. Warm, plain, first-person where the English is first-person.
- **Technical ideas stay understandable to non-technical readers** in both languages (the race condition is explained in everyday terms first).
- Thai headings use the IBM Plex Sans Thai swap already wired under `[data-lang="th"]`.
- Draft EN/TH copy is in the Appendix and should be reviewed for natural Thai before shipping.

---

## 9. Media Strategy

### Verified inventory (`src/assets/9tours/`)
- **16 screenshots:** user `Screenshot (452–462).png` (11) + admin `Screenshot (463–467).png` (5). Confirmed on disk; matches the `gallery` array order in `projects.ts` (user = indices 0–10, admin = 11–15).
- **2 flow videos:** `user/user_flow.mp4` and `admin/admin_flow.mp4`. Only `user_flow.mp4` is currently wired (`previewVideo`).
- **1 unused logo:** `logo.png`.

### Weight reality (measured)
- `user_flow.mp4` ≈ **62 MB**, `admin_flow.mp4` ≈ **81 MB** (≈143 MB of video).
- Largest screenshot ≈ **1.8 MB** (`Screenshot (452).png`); most are smaller. Screens total ≈ 11 MB.
- **Raw 9tours media ≈ 154 MB.** Shipping this as-is would make even the modal slow and the build heavy.

### Rules
1. **Heavy media never loads with the main page.** The inline preview uses only 3–4 small, optimised images (one hero + 2–3 thumbnails) with blur-up placeholders. The full gallery and any video mount **only when the case reader opens**.
2. **Video is click-to-play with a poster, never autoplay of a raw file.** A 62–81 MB autoplay is unacceptable.
3. **Optimisation is a prerequisite (Phase 0).** Before wiring video, compress to web-friendly sizes (target a few MB each, H.264 plus a poster image) and convert/resize screenshots to WebP (cap ~1600px wide, target <200 KB each), and generate small thumbnails for the preview. *This step may need tooling (e.g. ffmpeg / an image optimiser); it will be proposed and approved separately since this task installs nothing.*
4. **No Live Demo link.** There is no real deployment. Do not add a live-demo button or contrast-fix it (out of scope). The only external link is **View team code** → `https://github.com/psu6810110712/9Tours`.
5. **Confirm indexes before use.** Verified here; the gallery has exactly 16 entries.

---

## 10. Implementation Phases (future work, each gated and reviewable)

Each phase is its own small commit on `chore/impeccable-redesign` (or a child feature branch), built and reviewed before the next.

- **Phase 0 — Media optimisation (prerequisite, separate approval).**
  Compress videos, convert/resize screenshots to WebP, generate thumbnails and a video poster.
  *Test:* total added media weight is reasonable; images render crisp; no broken imports.

- **Phase 1 — Data + types.**
  Extend the `Project` type and `projects.ts`: real `githubUrl`, remove the placeholder `liveUrl` for 9tours, add structured case-study fields with EN/TH copy.
  *Test:* `tsc` clean, no `any`, `npm run build` green, no broken asset imports.

- **Phase 2 — Inline preview block.**
  Replace the current 9tours bento cells with the single featured preview block (hero, one-line problem/role/result, thumbnails, stack, "Read the full case" + "View team code"). Keep the secondary compact cards.
  *Test:* value is readable **without** opening the case; mobile stacks cleanly; both themes; both languages; build green.

- **Phase 3 — Case reader component.**
  New full-screen reader (portal): the section structure from §4, "View all screens" launches the existing gallery, "Talk to me" routes to Contact. Full a11y per §7.
  *Test:* keyboard + screen reader (focus trap, Escape, restore, scroll lock, accessible name); mobile full-screen; no-JS preview still complete; build green.

- **Phase 4 — Motion polish (CSS only).**
  Lamp-up entrance, staggered section reveals, hero hover lift, gallery transitions, all with reduced-motion fallbacks.
  *Test:* `prefers-reduced-motion: reduce` path; no jank; no scroll-jacking.

- **Phase 5 — Bilingual + copy pass.**
  Finalise EN/TH, natural-Thai review, button labels (verb + object), AA contrast both themes.
  *Test:* language toggle; Thai font swap; contrast re-verified.

- **Phase 6 — Final audit / polish.**
  A11y audit, performance check with optimised media, cross-breakpoint (375 / 768 / 1280), both themes.
  *Test:* clean audit; page weight sane; build green.

---

## 11. Files Likely Touched / Created (not created yet)

**Created**
- `PROJECTS_2_0_BRIEF.md` — this file.
- `src/components/CaseReader/CaseReader.tsx` + `CaseReader.module.css` — the full-screen case reader overlay (mirrors how `GalleryModal` lives in `components/`).
- Optimised media + thumbnails + video poster under `src/assets/9tours/` (Phase 0).

**Modified**
- `src/pages/Projects.tsx` + `Projects.module.css` — restructure to the featured preview block + secondary cards + open logic. (Inline preview stays in `pages/` since it is used once, per the file-placement rules.)
- `src/data/projects.ts` — real repo URL, remove placeholder `liveUrl`, add structured case-study content (EN/TH).
- `src/types/index.ts` — extend `Project` with the case-study fields.

**Reused (not rewritten)**
- `src/components/GalleryModal/*` — the deep 16-shot gallery (address its known a11y gaps if reused).
- `src/components/CompactCard/*` — secondary project cards.
- `src/hooks/useLanguage` — EN/TH.

No implementation files are created in this task.

---

## 12. Non-Goals

- Do **not** redesign the whole site.
- Do **not** touch Hero, Contact, About, Skills, or `global.css` unless separately approved.
- Do **not** fix the Live Demo button contrast in this work (and do not add a live-demo link at all for 9tours).
- Do **not** add any library (animation or otherwise) without asking first.
- Do **not** claim solo ownership of team work, or imply the GitHub repo is Fran's.
- Do **not** rely on unoptimised 62–81 MB videos on any user-visible path.

---

## Appendix A — Verified media index map

| Gallery index | File | Group |
|---|---|---|
| 0–10 | `Screenshot (452–462).png` | user (11) |
| 11–15 | `Screenshot (463–467).png` | admin (5) |
| — | `user_flow.mp4` (≈62 MB) | flow video (wired) |
| — | `admin_flow.mp4` (≈81 MB) | flow video (available, unused) |
| — | `logo.png` | brand mark (unused) |

## Appendix B — Draft EN/TH copy (review before shipping)

Buttons use verb + object. No em dashes. First person where the voice is personal.

**Problem**
- EN: "People booking a tour want it done in a few taps: pick a trip, choose a date, pay, done. No dead ends, no guessing whether it went through."
- TH: "คนจองทัวร์อยากให้จบในไม่กี่แตะ เลือกทริป เลือกวัน จ่าย จบ ไม่มีทางตัน ไม่ต้องเดาว่าจองติดหรือยัง"

**My role**
- EN: "9tours was a team project at PSU, and I was the group lead and project manager. I set and supervised the product and design direction, from the first wireframes through to the production look, and kept the team aligned on what we were building. I also built alongside my teammates, on both the front-end and parts of the API."
- TH: "9tours เป็นงานทีมที่ ม.อ. โดยผมเป็นหัวหน้ากลุ่มและดูแลภาพรวมโปรเจกต์ ผมเป็นคนกำหนดและคุมทิศทางของโปรดักต์และดีไซน์ ตั้งแต่ wireframe แรกจนถึงหน้าตาเวอร์ชันจริง และคอยทำให้ทีมเห็นภาพเดียวกันว่าเรากำลังสร้างอะไร นอกจากคุมทิศทาง ผมลงมือทำเองด้วย ทั้งฝั่ง front-end และบางส่วนของ API ร่วมกับเพื่อนในทีม"

**What the team built**
- EN: "Together we built the booking experience end to end: browse tours, book a trip, get a confirmation, and an admin side to manage it all."
- TH: "ทั้งทีมช่วยกันสร้างระบบจองครบทั้งกระบวนการ ตั้งแต่ดูทริป จองทริป ได้รับการยืนยัน ไปจนถึงฝั่ง admin สำหรับจัดการทั้งหมด"

**What I personally led / contributed**
- EN: "As lead I owned the direction: the wireframes, the design decisions, and keeping the build consistent from sketch to the final look. Hands-on, I worked with teammates on the front-end and on parts of the API."
- TH: "ในฐานะหัวหน้า ผมดูแลทิศทางทั้งหมด ทั้ง wireframe การตัดสินใจด้านดีไซน์ และคุมให้งานออกมาสอดคล้องกันตั้งแต่ภาพร่างจนถึงเวอร์ชันจริง ส่วนงานลงมือ ผมทำร่วมกับเพื่อนทั้งฝั่ง front-end และบางส่วนของ API"

**Hardest issue (race condition)**
- Headline EN: "The bug that mattered most: two people could book the last seat at the same moment, and both screens would say it worked."
- Headline TH: "บั๊กที่สำคัญที่สุด คนสองคนกดจองที่นั่งสุดท้ายพร้อมกันได้ แล้วจอทั้งสองฝั่งขึ้นว่าจองสำเร็จ"
- Plain EN: "On a busy tour, two people could tap book on the last seat at almost the same time. The screen told each of them it had worked before the server had actually saved either booking, so the seat count and the price could end up wrong."
- Plain TH: "เวลาทริปไหนคนจองเยอะ สองคนอาจกดจองที่นั่งสุดท้ายพร้อมกันได้ จอขึ้นว่าสำเร็จทั้งคู่ก่อนที่เซิร์ฟเวอร์จะบันทึกจริง ทำให้จำนวนที่นั่งและราคาเพี้ยนได้"
- What we did EN: "I made the server the single source of truth. The screen now waits for the server to confirm a booking before it shows success and recalculates how many seats are left, instead of trusting what the browser assumed. We worked through it across the front-end and the API together."
- What we did TH: "ผมแก้โดยให้เซิร์ฟเวอร์เป็นแหล่งความจริงเพียงหนึ่งเดียว จอจะรอให้เซิร์ฟเวอร์ยืนยันก่อน ค่อยขึ้นว่าสำเร็จและคำนวณที่นั่งที่เหลือใหม่ แทนที่จะเชื่อค่าที่เบราว์เซอร์เดาเอง โดยเราช่วยกันไล่แก้ทั้งฝั่ง front-end และ API"

**Product / design decisions** *(placeholder examples, confirm real specifics before shipping)*
- EN: "I pushed the booking flow to the fewest clear steps, and drove a shared set of components so the product looked consistent from wireframe to production."
- TH: "ผมดันให้ flow การจองเหลือขั้นตอนที่ชัดและน้อยที่สุด และผลักดันให้ใช้ชุด component ร่วมกัน เพื่อให้หน้าตาโปรดักต์สอดคล้องกันตั้งแต่ wireframe จนถึงเวอร์ชันจริง"

**Front-end / API / backend collaboration**
- EN: "I coordinated the work across the team and stayed close to both sides of the stack, so the screens and the API agreed on what was true, especially around booking."
- TH: "ผมประสานงานในทีมและดูแลใกล้ชิดทั้งสองฝั่งของระบบ เพื่อให้หน้าจอกับ API เข้าใจตรงกันว่าอะไรคือข้อมูลจริง โดยเฉพาะเรื่องการจอง"

**Result**
- EN: "The flow holds up end to end: browse, book, confirm, plus an admin side to manage it. Here it is, actually running."
- TH: "ทั้ง flow ทำงานครบตั้งแต่ต้นจนจบ ดูทริป จอง ยืนยัน และมีฝั่ง admin ไว้จัดการ นี่คือตอนมันทำงานจริง"

**Contact handoff**
- EN: "That is 9tours. If you want to hear how I would lead and build something like this for you, I am one message away."
- TH: "นี่แหละครับ 9tours ถ้าอยากรู้ว่าผมจะนำทีมและสร้างแบบนี้ให้คุณยังไง ทักผมมาได้เลย"

**Buttons / labels**
- "Read the full case" / "อ่านเคสแบบเต็ม"
- "View team code" / "ดูโค้ดของทีม" → `https://github.com/psu6810110712/9Tours`
- "View all 16 screens" / "ดูภาพทั้งหมด 16 จอ"
- "Talk to me" / "คุยกับผม" → Contact
