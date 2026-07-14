# `/resume` Frontend Audit Report

วันที่ audit: 14 กรกฎาคม 2026  
ขอบเขต: route `/resume` เท่านั้น รวม components และ shared behavior ที่ route นี้เรียกใช้  
เป้าหมาย: ตรวจ bug, production readiness, responsive behavior บนมือถือ/desktop/iPad Air และ UX/user flow เพื่อนำไปวางแผน implementation ต่อจาก [interview report](./resume-ui-interview-report.md)

## วิธีตรวจและข้อจำกัด

ตรวจจาก source จริง, design context ของโปรเจกต์, static detector, TypeScript build, ESLint และการเช็กว่า Vite dev server ตอบ route `/resume` ได้หรือไม่

ผลตรวจที่ทำ:

- `context.mjs --target src/pages/Resume`: ผ่าน และโหลด `PRODUCT.md`/`DESIGN.md` สำเร็จ
- `detect.mjs --json`: พบ design-system drift หลายจุดใน Resume และ shared SectionNav/Contact รวมถึง bounce easing หนึ่งจุด
- `npm run build`: ไม่ผ่าน TypeScript compilation
- `npm run lint`: ไม่ผ่าน — 15 errors และ 2 warnings
- `GET /resume`: ตอบกลับ HTTP 200

ยังไม่มีการยืนยันด้วย screenshot จาก browser จริง เพราะเครื่องนี้ไม่มี Playwright browser executable และไม่ได้ติดตั้ง browser เพิ่มระหว่าง audit ดังนั้นข้อสรุปเรื่อง viewport ที่ระบุว่า “ความเสี่ยง” เป็นการอนุมานจาก CSS/DOM implementation ไม่ใช่ผล screenshot ที่ยืนยันแล้ว

Viewport ที่ใช้ตรวจจาก source:

| Viewport | สิ่งที่ตรวจ | ระดับความมั่นใจ |
|---|---|---|
| 375 × 812 | mobile-first layout, nav width, touch target, card stacking | สูงจาก source / ยังไม่ยืนยันด้วย screenshot |
| 820 × 1180 | iPad Air portrait, breakpoint ที่ 768px, hero row, feature grid | สูงจาก source / layout risk ต้องทดสอบจริง |
| 1180 × 820 | iPad Air landscape, desktop grid ที่ 1024px, fixed section navigation | สูงจาก source / ยังไม่ยืนยันด้วย screenshot |
| 1280 × 800 | desktop hero, four-column features grid, content density | สูงจาก source / ยังไม่ยืนยันด้วย screenshot |

## Audit health score

| # | Dimension | Score | Key finding |
|---|---|---:|---|
| 1 | Accessibility | 1/4 | Heading semantics ไม่ถูกต้อง และ external-link modal ไม่มี dialog/focus behavior ที่จำเป็น |
| 2 | Performance | 1/4 | วิดีโอ remote autoplay 2 จุดและภาพ remote 3 จุดโหลดโดยไม่มี poster/lazy strategy |
| 3 | Responsive Design | 1/4 | Header มีความเสี่ยง overflow ที่ 375px และ breakpoint 768px ทำให้ iPad Air portrait ใช้ desktop hero layout เร็วเกินไป |
| 4 | Theming | 1/4 | มี token system แต่ Contact CSS module ไม่ตรงกับ JSX และ Resume hardcode สี/ขนาดหลายจุด |
| 5 | Anti-Patterns | 2/4 | โทนสีมีเอกลักษณ์ แต่ Features ยังเป็น repeated feature-card grid พร้อม placeholder links และ copy แบบ template |
| **Total** |  | **6/20** | **Poor — ต้องแก้ blocking และ major issues ก่อน polish** |

คะแนนนี้เป็น health score ของ implementation ปัจจุบัน ไม่ใช่คะแนนศักยภาพของ visual direction ใน interview report และไม่ใช่ acceptance score 20 ข้อด้านล่าง

## 20-point acceptance scorecard

กติกาการให้คะแนน:

- `Code score`: ผมให้ `1` เฉพาะเมื่อ implementation/behavior ตรวจยืนยันได้จาก code และ verification gate; ถ้ายังมี bug หรือยังไม่มีหลักฐาน ให้ `0`
- `Visual score`: ผู้ใช้เป็นผู้ตรวจจาก screenshot/การใช้งานจริง ให้ `1` เมื่อผ่าน และ `0` เมื่อไม่ผ่าน
- ข้อหนึ่งจะนับว่าผ่านก็ต่อเมื่อ `Code = 1` และ `Visual = 1`
- ถ้า `Code = 1` แต่ `Visual = 0` ให้ mark เป็น `รอแก้ไขภายหลัง` และยังไม่นับรวม
- เป้าหมายสุดท้ายคือ `20/20` ไม่ใช่แค่ build ผ่าน

สถานะปัจจุบันยังไม่มีการยืนยัน visual จึงยังไม่นับข้อใดเป็น overall pass แม้บางข้อมี code score เป็น 1

| # | Acceptance criterion | Code score | Visual score | Current status / evidence |
|---:|---|:---:|:---:|---|
| 1 | `npm run build` ผ่านและสร้าง production bundle ได้ | 0 | รอผู้ใช้ตรวจ | Build ปัจจุบันล้มเหลวจาก TypeScript errors |
| 2 | `npm run lint` ผ่านทั้ง repository และ dependency chain ของ `/resume` สะอาด | 0 | รอผู้ใช้ตรวจ | พบ 15 errors และ 2 warnings |
| 3 | CSS Module keys ที่ JSX เรียกใช้มีอยู่จริงทุก key | 0 | รอผู้ใช้ตรวจ | Contact เรียก `contactSection/header/secTitle/title/subtitle/formContainer` แต่ CSS exports คนละชื่อ |
| 4 | ไม่มี `any`, unused import/value หรือ type mismatch ใน dependency chain ของ `/resume` | 0 | รอผู้ใช้ตรวจ | พบ `any`, unused values และ `DockItem` event handler mismatch |
| 5 | Path matching แสดง Resume เฉพาะ `/resume` และ `/resume/` | 0 | รอผู้ใช้ตรวจ | `includes('/resume')` match กว้างเกินไป |
| 6 | Hero/About/Features/Contact มี semantic landmarks และ heading hierarchy ที่ถูกต้อง | 0 | รอผู้ใช้ตรวจ | Hero/section titles เป็น `div`; ScrollReveal ใช้ `h2` ครอบ `p` |
| 7 | Keyboard flow มี visible focus, logical order และไม่เกิด focus trap | 0 | รอผู้ใช้ตรวจ | Global focus มี แต่ external modal ยังไม่จัดการ focus lifecycle |
| 8 | External-link modal มี dialog semantics, Escape close, focus in/out และ labelled relationship | 0 | รอผู้ใช้ตรวจ | ปัจจุบันเป็น motion div ไม่มี `role="dialog"`/focus management |
| 9 | EN/TH switching เปลี่ยน content, `lang` attribute และ persistence สอดคล้องกัน | 1 | รอผู้ใช้ตรวจ | `LanguageProvider` อัปเดต `data-lang`, `document.lang` และ localStorage; content freshness ยังเป็นงานถัดไป |
| 10 | Theme switching/persistence ทำงานผ่าน token layer โดยไม่ทำให้ route แตก | 1 | รอผู้ใช้ตรวจ | `useTheme` และ `data-theme` wiring มีอยู่; hardcoded colors ต้องเก็บให้ครบ |
| 11 | Section navigation target/active state/cleanup ทำงานกับ 4 sections ของ Resume | 1 | รอผู้ใช้ตรวจ | มี observer, cleanup, `aria-current` และ target list ครบ; ต้องยืนยันด้วย browser interaction |
| 12 | Reduced-motion ปิด scroll-linked blur และ pointer-driven motion ที่ไม่จำเป็น | 0 | รอผู้ใช้ตรวจ | GSAP ScrollReveal/DockItem/Magnet ยังทำงานโดยไม่มี reduce branch ครบ |
| 13 | Media มี alt/aria/fallback ที่เหมาะสม | 0 | รอผู้ใช้ตรวจ | feature images ใช้ `alt="Icon"`; videos ไม่มี poster/`aria-hidden`/fallback |
| 14 | Media loading ไม่บล็อก first impression และมี lazy/preload strategy | 0 | รอผู้ใช้ตรวจ | remote autoplay videos 2 จุดและ remote images 3 จุดโหลดโดยไม่มี policy ชัดเจน |
| 15 | 375px EN/TH ไม่มี horizontal overflow และ nav ใช้งานได้ | 0 | รอผู้ใช้ตรวจ | nowrap nav + 4 links + 2 toggles มีความเสี่ยงเกินความกว้าง |
| 16 | iPad Air portrait 820×1180 ใช้ layout ที่อ่านง่าย ไม่ถูกบีบแบบ desktop | 0 | รอผู้ใช้ตรวจ | breakpoint 768px เปิด hero row/2-column features เร็วเกินไป |
| 17 | iPad Air landscape และ desktop 1280px มี grid/hero/section nav ที่เสถียร | 1 | รอผู้ใช้ตรวจ | มี explicit tablet/desktop breakpoints และ 4-column grid; ต้องยืนยันจาก screenshot |
| 18 | Dynamic viewport และ touch targets ไม่ทำให้ใช้งานยาก | 0 | รอผู้ใช้ตรวจ | `100vh`, fixed heights และ 36×36/38×34 controls ยังเสี่ยง |
| 19 | User flow ตรงกับ interview: story → evidence → social contact โดยไม่มี placeholder action | 0 | รอผู้ใช้ตรวจ | generic feature cards, stale Year 1, `href="#"` และ social modal เพิ่ม friction |
| 20 | Code maintainability พร้อมต่อยอด: CSS tokens, CSS-only styling, no dead code และ animation ownership ชัด | 0 | รอผู้ใช้ตรวจ | hardcoded drift, inline styles, dead code และ 4 animation systems อยู่ใน route chain |

**Current code score: 8/20**<br>
**Current overall score: 0/20** เพราะ visual score ยังรอการตรวจของผู้ใช้และทุกข้อที่ Code/Visual ไม่ครบคู่ยังไม่นับผ่าน

## P0 Sprint 0A verification

The acceptance scorecard above was recorded before Sprint 0A. The current code score is updated only for checks verified in this sprint:

| Code item | Code score | Evidence |
|---:|:---:|---|
| 1. Production build | 1 | `npm run build` passes; Vite emits the production bundle. |
| 2. Repository lint | 1 | `npm run lint` passes with no errors or warnings. |
| 3. Contact JSX/CSS Module contract | 1 | Contact now uses existing CSS Module keys; browser smoke check confirms the route renders. |
| 4. `/resume` dependency-chain types/dead code | 1 | Removed `any`, unused values/imports, and type mismatches in the verified chain. |
| 5. Exact `/resume` path matching | 0 | Not part of Sprint 0A; the existing broader path match remains. |
| 6–20. Remaining code checks | 0 | Not implemented or not verified in this sprint. |

Verification evidence:

- `GET /resume` → HTTP 200
- `GET /resume/` → HTTP 200
- Playwright smoke check loaded both paths with no console or runtime errors.
- `git diff --check` passes.

Visual score: `รอผู้ใช้ตรวจ`

Remaining failures are intentionally uncredited: semantic heading/landmark work, modal focus lifecycle, reduced-motion coverage, media loading policy, mobile and iPad responsive behavior, exact route matching, user-flow/content corrections, and broader design-system drift remain for later phases or user visual review.

## Anti-patterns verdict

**ไม่ใช่ AI-generated แบบเต็มรูปแบบ แต่ยังมีจุดที่ทำให้รู้สึกเป็น template อยู่ชัดเจน**

สิ่งที่พบจริง:

- `featuresGrid` ใช้การ์ดขนาดใกล้เคียงกัน 3 ใบซ้ำโครงสร้าง icon + number + heading + bullet list + `Learn more` ที่ `href="#"` (`src/pages/Resume/Resume.tsx:288-338`)
- เนื้อหา Features เน้น “coding / teamwork / open house” แบบคำกว้าง ๆ แต่ยังไม่แสดงเหตุการณ์จริง วิธีคิด หรือหลักฐานที่เหมาะกับการสมัคร Staff
- `01/02/03` ถูกใช้เป็นเลขนำการ์ด ทั้งที่ section นี้ไม่ใช่ขั้นตอนที่ผู้ใช้ต้องทำตาม
- มี noise, gradient overlay, blur reveal และ cursor/magnet interaction หลายชั้น แต่ยังไม่มี narrative asset จาก Open House ที่เป็นแกนของความ immersive

สิ่งที่ควรรักษาไว้:

- warm-dark palette และ ember accent สอดคล้องกับ DESIGN.md
- hero ที่ใช้วิดีโอทำให้มีศักยภาพในการสร้าง first impression
- section navigation มี touch-sized FAB บน mobile และมี `aria-label` ให้ปุ่มหลัก
- social icons มีพื้นที่กด 52×52px ใน Contact

## Executive summary

- Audit Health Score: **7/20 — Poor**
- Issues: **1 P0, 9 P1, 5 P2, 2 P3**
- Route ตอบ HTTP 200 แต่ยัง build production ไม่ได้
- User flow ปัจจุบันยังไม่ตอบเป้าหมายจาก interview ที่ต้องการให้ผู้ชมเห็นศักยภาพในการสมัคร Staff และติดต่อผ่าน social ได้ง่าย
- ความเสี่ยง responsive สูงสุดอยู่ที่ 375px header และ 820px iPad Air portrait

Top issues:

1. `npm run build` ล้มเหลวจาก TypeScript errors รวมถึง Resume โดยตรง (`src/pages/Resume/Resume.tsx:7-144`)
2. Contact JSX กับ CSS Module เป็นคนละ contract ทำให้ class สำคัญหลายตัวกลายเป็น `undefined` และ Contact render แบบไม่มี intended styling (`src/pages/Contact.tsx:80-97`, `src/pages/Contact.module.css:1-57`)
3. Hero/About/Features ไม่มี heading semantics ที่ถูกต้อง และ `ScrollReveal` สร้าง `<h2><p>...</p></h2>` (`src/components/ScrollReveal/ScrollReveal.tsx:118-119`)
4. Mobile navbar มีเนื้อหาหลายรายการแบบ `white-space: nowrap` และไม่มี fallback เมื่อความกว้างไม่พอ (`src/pages/Resume/Resume.module.css:62-151`)
5. iPad Air portrait เข้า breakpoint `min-width: 768px` ทำให้ hero เป็น row และ features เป็น 2 columns ทั้งที่พื้นที่แนวตั้ง/แนวนอนยังจำกัด (`src/pages/Resume/Resume.module.css:164-229`, `452-514`)
6. Social contact ถูกซ่อนหลัง icon-only links และ confirmation modal; modal ไม่มี focus management หรือ keyboard close (`src/pages/Contact.tsx:119-141`, `src/components/ExternalLinkModal/ExternalLinkModal.tsx:95-160`)

## Detailed findings

### P0 — Blocking

#### [P0] Production build ไม่ผ่าน

- **Location:** `src/pages/Resume/Resume.tsx:7-144`, `src/components/ExternalLinkModal/ExternalLinkModal.tsx:135`, `src/components/ScrollReveal/ScrollReveal.tsx:1`, `src/components/SectionNav/SectionNav.tsx:29`
- **Category:** Bug / Production readiness
- **Evidence:** `npm run build` ล้มเหลวด้วย TypeScript errors เรื่อง unused imports/values, `any`, event handler type mismatch, type-only imports และ transition type
- **Impact:** ไม่สามารถสร้าง production bundle ได้ จึงไม่ควรนำ route ไป deploy หรือใช้เป็น application surface จริง
- **Recommendation:** แก้ type errors ทั้งชุดก่อนเริ่ม visual polish; แยกงานเป็น Resume-local errors และ shared-component errors แล้วรัน `npm run build` ซ้ำ
- **Suggested command:** `$impeccable harden /resume`

### P1 — Major

#### [P1] Contact JSX และ CSS Module ใช้ class contract คนละชุด

- **Location:** `src/pages/Contact.tsx:80-97`; `src/pages/Contact.module.css:1-57`
- **Category:** Bug / Responsive / UX
- **Impact:** JSX เรียก `contactSection`, `header`, `secTitle`, `title`, `subtitle` และ `formContainer` แต่ CSS มี `.cta`, `.heading` และ `.sub` แทน; ใน Vite CSS Module key ที่ไม่มีจะกลายเป็น `undefined` ทำให้ section divider, heading typography, subtitle และ form container ไม่ได้รับ style ที่ตั้งใจ หน้า Contact ซึ่งเป็นปลายทางของ `/resume` จึงเสีย visual hierarchy โดยตรง
- **Evidence:** รายการ `styles.*` จาก JSX ไม่ตรงกับ selector ใน CSS; TypeScript build ไม่ตรวจ contract นี้เพราะไม่มี generated CSS-module typings
- **Recommendation:** เลือกชื่อชุดเดียวแล้วแก้ JSX/CSS ให้ตรงกัน จากนั้นเพิ่ม smoke assertion หรือ CSS-module typing เพื่อไม่ให้ mismatch กลับมาอีก
- **Suggested command:** `$impeccable harden /resume`

#### [P1] Heading hierarchy และ semantic structure ไม่สื่อสารเนื้อหา

- **Location:** `src/pages/Resume/Resume.tsx:227-346`, `src/components/Resume/WordsPullUp.tsx:38-65`, `src/components/Resume/WordsPullUpMultiStyle.tsx:38-54`, `src/components/ScrollReveal/ScrollReveal.tsx:118-119`
- **Category:** Accessibility / UX
- **Impact:** Screen reader และ search semantics ไม่สามารถระบุได้ชัดว่าอะไรคือหน้า title, About heading และ Features heading; ผู้ชมที่อ่านแบบกวาดสายตาจะเสียโครงสร้างของเรื่องเล่า
- **WCAG/Standard:** WCAG 1.3.1 Info and Relationships, 2.4.6 Headings and Labels
- **Evidence:** Hero/section titles ถูก render เป็น `div`; `ScrollReveal` ใช้ `h2` ครอบ `p` และใช้ข้อความยาวของ biography เป็น heading
- **Recommendation:** ให้แต่ละ section มี heading จริง (`h1`, `h2`, `h3`) แล้วคง animation ไว้ที่ wrapper/span โดยไม่เปลี่ยน semantic element
- **Suggested command:** `$impeccable harden /resume`

#### [P1] Feature links เป็น placeholder และทำลาย user flow

- **Location:** `src/pages/Resume/Resume.tsx:300`, `318`, `336`
- **Category:** Bug / UX
- **Impact:** ผู้ชมที่กด `Learn more` จะไป `#` ซึ่งไม่ใช่ปลายทางของเนื้อหาและอาจทำให้ scroll กลับด้านบน ผู้ใช้จึงไม่สามารถสำรวจประสบการณ์ Open House หรือหลักฐานของทักษะได้
- **Recommendation:** ระหว่างที่ยังไม่มี detail route ให้เปลี่ยนเป็นข้อความที่ไม่ทำตัวเป็น link หรือเชื่อมไปยัง anchor ที่มีเนื้อหาจริง; ในแผนอนาคตควรให้ card เล่า problem → role → decision → outcome แทน placeholder
- **Suggested command:** `$impeccable clarify /resume`

#### [P1] Copy ปัจจุบันไม่ตรงกับเป้าหมายสมัคร Staff และมีข้อมูล stale

- **Location:** `src/pages/Resume/Resume.tsx:24-66`
- **Category:** UX / Content
- **Impact:** Hero ระบุ “Year 1” ทั้งที่ interview ระบุว่าปัจจุบันปี 2; `aboutBadge` ถูกประกาศแต่ไม่ถูก render; Features พูดถึง coding ทั่วไปมากกว่าหน้าที่พี่เลี้ยง การเตรียมของ การรันคิว และการแก้ปัญหาหน้างาน จึงไม่ช่วยให้บริษัทอีเวนต์ประเมินความเหมาะสมได้เร็ว
- **Recommendation:** ใช้ personal story ตาม interview report เป็นแกน: PSU ปี 2 → หาดใหญ่ Open House 2026 → บทบาทที่ทำจริง → วิธีตัดสินใจเมื่ออุปกรณ์มีปัญหา → soft skills ที่ต้องการพัฒนา; แยก claim ที่ทำแล้วออกจากสิ่งที่กำลังเรียนรู้
- **Suggested command:** `$impeccable clarify /resume`

#### [P1] Mobile navbar มีความเสี่ยง horizontal overflow ที่ 375px

- **Location:** `src/pages/Resume/Resume.module.css:62-151`
- **Category:** Responsive
- **Impact:** nav มี 4 links + 2 toggles, ใช้ `white-space: nowrap`, มี gap และ padding รวมกัน แต่ไม่มี wrapping/collapse rule; ที่ 375px ความกว้างขั้นต่ำของ label รวมกับ toggles มีโอกาสเกินพื้นที่ ทำให้ข้อความชนกันหรือสร้าง horizontal scroll ใน first viewport
- **Recommendation:** กำหนด mobile navigation strategy ที่ชัดเจน เช่น compact menu หรือซ่อน label บางส่วนอย่างมีชื่อ accessible; ทดสอบทั้ง EN/TH ที่ 375px และเพิ่ม visual regression check สำหรับ `document.scrollWidth`
- **Suggested command:** `$impeccable adapt /resume`

#### [P1] iPad Air portrait ใช้ breakpoint desktop เร็วเกินไป

- **Location:** `src/pages/Resume/Resume.module.css:164-229`, `452-514`
- **Category:** Responsive
- **Impact:** ที่ความกว้าง 820px hero เปลี่ยนเป็น row ทันที (`min-width: 768px`) และ right column มี `max-width: 400px`; title ที่มีขนาด `clamp(3rem, 8vw, 6rem)` อาจถูกบีบหรือ wrap ในพื้นที่ที่เหลือ ขณะที่ Features ใช้ 2 columns และ card สูง 400px ทำให้ content density หนักบน iPad Air portrait
- **Recommendation:** ออกแบบ tablet state แยกจาก desktop: ให้ hero ยัง stack หรือใช้ column ratio ที่คุมได้จนถึง desktop breakpoint; ปรับ features เป็น one-column หรือ `minmax` ที่เหมาะกับ 820px; ตรวจ Thai copy ที่ยาวกว่าภาษาอังกฤษ
- **Suggested command:** `$impeccable adapt /resume`

#### [P1] Hero/feature media โหลดหนักและไม่มี resilient fallback

- **Location:** `src/pages/Resume/Resume.tsx:129-140`, `274-285`, `289-326`
- **Category:** Performance / Resilience
- **Impact:** วิดีโอ remote autoplay 2 จุดและภาพ remote 3 จุดไม่มี `poster`, `preload` policy, `loading="lazy"`, `decoding` หรือ local fallback; first impression ขึ้นกับ network และอาจมี blank/black frame บนอุปกรณ์หรือเครือข่ายช้า
- **Recommendation:** ใช้ poster ที่มี local/optimized asset, กำหนด `preload="metadata"` หรือโหลดเฉพาะ hero ตามลำดับ, lazy-load media ต่ำกว่า fold, ใช้ขนาดภาพตาม rendered size และเตรียม static fallback; สำหรับวิดีโอ decorative ให้ใส่ `aria-hidden="true"`
- **Suggested command:** `$impeccable optimize /resume`

#### [P1] Social contact flow เพิ่ม friction และ modal ยังไม่ accessible

- **Location:** `src/pages/Contact.tsx:119-141`, `src/components/ExternalLinkModal/ExternalLinkModal.tsx:95-160`
- **Category:** UX / Accessibility
- **Impact:** เป้าหมายจาก interview คือให้ติดต่อผ่าน social แต่ผู้ใช้ต้อง scroll ผ่าน form → หา icon-only link → เปิด confirmation modal → กด `Go to link`; modal ไม่มี `role="dialog"`, `aria-modal`, labelled relationship, Escape close, backdrop close หรือ focus trap จึงเสี่ยง keyboard/screen-reader dead end
- **WCAG/Standard:** WCAG 2.1.2 No Keyboard Trap, 2.4.3 Focus Order, 4.1.2 Name Role Value
- **Recommendation:** ทำ social links ให้เป็นปลายทางที่ชัดเจนใน Contact flow โดยยังคงไม่ต้องเพิ่ม CTA copy ตาม interview; ถ้าคง modal ให้ใช้ dialog semantics, ย้าย focus เข้า modal, คืน focus เมื่อปิด, ปิดด้วย Escape และประกาศสถานะให้ screen reader
- **Suggested command:** `$impeccable harden /resume`

#### [P1] Reduced motion ไม่ครอบคลุม animation ทั้ง route

- **Location:** `src/components/ScrollReveal/ScrollReveal.tsx:69-112`, `src/components/DockItem/DockItem.tsx:19-27`, `src/components/Magnet/Magnet.tsx:27-67`
- **Category:** Accessibility / Performance
- **Impact:** App มี `MotionConfig reducedMotion="user"` และ CSS fallback บางส่วน แต่ GSAP ScrollReveal ยังสร้าง scrub/blur ต่อ และ mouse-driven transform ยังติดตั้ง listener; ผู้ใช้ที่ลด motion อาจยังเจอ blur, scroll-linked movement และ pointer motion
- **WCAG/Standard:** WCAG 2.3.3 Animation from Interactions, 2.3.1 Three Flashes or Below Threshold (risk control)
- **Recommendation:** ตรวจ `prefers-reduced-motion` ก่อนสร้าง GSAP triggers และปิด blur/mouse magnet เมื่อ reduce; ให้ content visible ใน initial state เสมอ
- **Suggested command:** `$impeccable animate /resume`

### P2 — Minor / next pass

#### [P2] Touch targets ของ toggles และ section dots ต่ำกว่าเป้าหมายที่เหมาะกับ mobile

- **Location:** `src/pages/Resume/Resume.module.css:129-143`, `src/components/SectionNav/SectionNav.module.css:58-74`, `src/components/SectionNav/SectionNav.module.css:326-352`
- **Category:** Responsive / Accessibility
- **Impact:** language/theme buttons มีขนาด 36×36px และ mobile section dots มีพื้นที่ 38×34px; แม้ไม่ใช่พื้นที่ที่เล็กจนใช้ไม่ได้เสมอไป แต่เสี่ยงกดยากบนมือถือและ iPad ที่ใช้นิ้ว
- **WCAG/Standard:** WCAG 2.2 Target Size (เป็นข้อควรตรวจตาม target size policy)
- **Recommendation:** ทำให้ controls มี hit area อย่างน้อย 44×44px โดยคง visual icon ให้เล็กได้ และตรวจระยะห่างไม่ให้ปุ่มอยู่ชิดกันเกินไป
- **Suggested command:** `$impeccable adapt /resume`

#### [P2] Fixed `100vh` และ fixed card heights เสี่ยงกับ dynamic viewport

- **Location:** `src/pages/Resume/Resume.module.css:8-10`, `463`, `472`, `509`
- **Category:** Responsive
- **Impact:** mobile Safari/iPad browser chrome อาจทำให้ hero สูงเกินหรือต่ำกว่าพื้นที่ที่มองเห็นจริง; feature cards สูง 400px ทุก mobile width ทำให้เนื้อหายาวและอาจเกิดพื้นที่ว่างไม่สมดุลเมื่อภาษาไทย wrap มากขึ้น
- **Recommendation:** ใช้ `min-height` ร่วมกับ `svh/dvh` ตาม interaction ที่ต้องการ และให้ card ใช้ `min-height`/content-driven height พร้อมตรวจ EN/TH
- **Suggested command:** `$impeccable adapt /resume`

#### [P2] Theming มี hardcoded color และ radius drift

- **Location:** `src/pages/Resume/Resume.module.css:30`, `115-147`, `193`, `221`, `236`; `src/components/SectionNav/SectionNav.module.css:82-395`; `src/pages/Contact.module.css:142`
- **Category:** Theming / Maintainability
- **Impact:** detector พบสีที่ไม่อยู่ใน DESIGN.md, `2rem` radius และ `#fff/#ffffff`; light/dark behavior จึงต้องตรวจแยกหลายจุด และแก้ palette ในอนาคตมีโอกาสไม่ครบ
- **Recommendation:** map สีทั้งหมดเข้าสู่ existing tokens หรือบันทึก token ใหม่ใน DESIGN.md ก่อนใช้; อย่าเพิ่มสีเฉพาะ component โดยไม่มีเหตุผลด้าน contrast
- **Suggested command:** `$impeccable colorize /resume`

#### [P2] มี animation runtimes หลายชุดและ global transition กว้างเกินไป

- **Location:** `src/App.tsx:2-3`, `src/pages/Contact.tsx:3`, `src/components/ScrollReveal/ScrollReveal.tsx:2-3`, `src/styles/global.css:6-12`
- **Category:** Performance / Maintainability
- **Impact:** route เดียวใช้ `motion/react`, `framer-motion`, GSAP และ Lenis; เพิ่ม bundle/mental overhead และ `transition` บน `*` ทำให้ทุก property ที่ระบุเปลี่ยนผ่านแม้ไม่ได้ตั้งใจ อาจทำให้ state/theme change ดูช้าหรือสร้างงานเกินจำเป็น
- **Recommendation:** วาง animation ownership ต่อ interaction และจำกัด transition เฉพาะ properties ที่ต้องเปลี่ยน; พิจารณารวม runtime ใน future refactor หลัง build กลับมาผ่านแล้ว
- **Suggested command:** `$impeccable optimize /resume`

#### [P2] Route matching กว้างเกิน path `/resume`

- **Location:** `src/App.tsx:37`
- **Category:** Bug / Routing
- **Impact:** ทุก path ที่มีข้อความ `/resume` จะถูกมองว่าเป็น resume route เช่น path ที่มี suffix/prefix โดยไม่ตั้งใจ ทำให้ app แสดงหน้าผิดและไม่มี 404 behavior ที่ชัดเจน
- **Recommendation:** ตรวจ path ด้วย exact pathname หรือ router rule ที่ชัดเจน เช่น `/resume` และ `/resume/` เท่านั้น
- **Suggested command:** `$impeccable harden /resume`

### P3 — Polish

#### [P3] Dead code เพิ่ม noise ใน route

- **Location:** `src/pages/Resume/Resume.tsx:7`, `9`, `113-121`; `src/components/SectionNav/SectionNav.tsx:29`
- **Category:** Maintainability
- **Impact:** `AnimatedLetter`, `Magnet`, `scrollYProgress` และ `clamp` ไม่ถูกใช้ ทำให้ compiler/linter fail และทำให้ผู้ดูแลโค้ดแยกไม่ออกว่าส่วนไหนเป็น behavior ที่ตั้งใจ
- **Recommendation:** ลบหรือเชื่อมใช้งานให้ครบก่อน commit ต่อไป; ไม่ควรปล่อย unused behavior ในหน้า production
- **Suggested command:** `$impeccable harden /resume`

#### [P3] Alt text ของ feature icons ไม่สื่อความหมาย

- **Location:** `src/pages/Resume/Resume.tsx:289`, `307`, `325`
- **Category:** Accessibility / Content
- **Impact:** ผู้ใช้ screen reader ได้ยินเพียง “Icon” ซึ่งไม่ช่วยอธิบายว่าภาพเกี่ยวข้องกับ Coding, Teamwork หรือ Open House อย่างไร
- **Recommendation:** ถ้าภาพ decorative ให้ใช้ `alt=""`; ถ้ามีความหมายให้เขียน alt ตามเนื้อหาจริง ไม่ใช้คำกว้าง ๆ ว่า Icon
- **Suggested command:** `$impeccable harden /resume`

## UX / user flow audit

### Current flow

```text
เปิด /resume
  → Hero video + ชื่อ + Explore My Story
  → About ที่เล่าเป็นนักศึกษาวิศวะคอมและ Open House แบบกว้าง ๆ
  → Methodology ที่จริงเป็น feature cards ทั่วไป
  → Contact form
  → social icon
  → confirmation modal
  → Go to link
  → external social profile
```

### Flow gaps เทียบกับ interview

1. **ความสนใจแรกยังไม่เชื่อมกับ Staff role:** Hero สื่อ web development มากกว่าความพร้อมทำอีเวนต์และดูแลน้อง ๆ
2. **เรื่องเล่าไม่มี proof moment:** ไม่มีลำดับเหตุการณ์ที่ทำให้ผู้ชมเห็นว่าคุณเตรียมของ รันคิว ประเมินปัญหา และจัดสรรทางเลือกอย่างไร
3. **Methodology ไม่ใช่ methodology จริง:** ผู้ใช้เห็น skill cards แต่ยังไม่เห็น 3-keyword explanation หรือ decision process ที่เป็นจุดแข็งเฉพาะตัว
4. **จุดหมายหลักอยู่ท้ายหน้า:** Social contact ซึ่งเป็นเป้าหมายหลักถูกวางหลัง form และผ่าน modal เพิ่มหนึ่งขั้น
5. **ภาษายังไม่พร้อมเป็น bilingual equal:** English/Thai มีโครงสร้างเดียวกัน แต่เนื้อหาเป็นคนละ maturity เพราะ English/Thai ยังใช้ข้อมูลเดิมที่ stale และยังไม่สะท้อน Staff brief

### Future flow ที่ควรใช้เป็น implementation target

```text
Hero: ตัวตน + ความพร้อมทำงานกับผู้คน
  → Story: Open House 2026 / บทบาทที่ทำจริง
  → How I work: Plan → communicate → adapt
  → Evidence: ภาพจริง/วิดีโอ loop + decision example
  → Contact: social icons ที่เข้าใจได้ทันที
```

หลักสำคัญคือผู้ชมควรตอบได้ภายในหนึ่งรอบการเลื่อนว่า “คนนี้ทำอะไรได้จริง, ทำงานกับเด็กและทีมอย่างไร, และติดต่อได้ทางไหน”

## Implementation plan ที่ต่อกับ interview report

ลำดับนี้เป็นแผนสำหรับอนาคต ไม่ใช่การแก้ไขที่ทำใน audit นี้

### Phase 0 — Release gate

1. แก้ TypeScript/compiler errors และ lint errors ที่เกี่ยวกับ `/resume`/shared dependencies
2. ยืนยัน `npm run build` ผ่าน
3. ทำ exact route check สำหรับ `/resume` และ `/resume/`

### Phase 1 — Semantic and flow foundation

1. ใส่ semantic headings และ landmarks ที่ถูกต้องโดยรักษา animation wrapper
2. ตัดหรือเปลี่ยน `Learn more` placeholder ให้เป็น destination จริง
3. ตัดสินใจว่า social flow จะ direct link หรือ modal; ถ้าใช้ modal ต้องทำ dialog/focus/Escape ให้ครบ
4. แก้ข้อมูล stale จาก Year 1 เป็นข้อมูลปัจจุบัน และวาง content ตาม personal story ใน interview report

### Phase 2 — Responsive architecture

1. กำหนด mobile nav strategy สำหรับ 375px ทั้ง EN/TH และตรวจ `scrollWidth`
2. แยก mobile/tablet/desktop behavior โดยไม่ใช้ 768px เป็น desktop hero โดยอัตโนมัติ
3. ออกแบบ iPad Air portrait 820px เป็น state แยก: hero, nav, feature grid และ Contact
4. แก้ `100vh`/fixed-height behavior ให้รองรับ dynamic viewport และข้อความภาษาไทย
5. ตรวจ touch area ของ toggles และ section navigation

### Phase 3 — Immersive media ที่ไม่ทำลาย performance

1. เลือกภาพจริงจาก Open House เป็น primary evidence
2. สร้าง video loop 5–10 วินาทีจากภาพที่ได้รับอนุญาต และเตรียม poster ทุกจุด
3. โหลด hero media ตามลำดับความสำคัญ ส่วนต่ำกว่า fold ใช้ lazy strategy
4. ตัด noise/blur/magnet ที่ไม่ช่วย narrative และคงเฉพาะ motion ที่ช่วย pacing
5. เพิ่ม reduced-motion branch สำหรับ scroll-linked effects และ pointer effects

### Phase 4 — Production polish

1. รวม hardcoded colors/radii เข้ากับ DESIGN.md และ token system
2. ตรวจ contrast dark/light theme อีกครั้งหลังเปลี่ยน copy และ assets
3. ตรวจ alt text, language semantics, keyboard flow และ modal focus
4. ทดสอบจริงที่ 375px, 820×1180, 1180×820 และ 1280px ด้วย browser screenshot/interaction pass
5. รัน audit ซ้ำหลัง fixes ก่อน deploy

## Score-driven implementation plan

### Git flow ที่ต้องใช้

- `main` เป็น production branch และห้ามแตะในงานนี้
- `dev` เป็น integration branch สำหรับงาน Resume
- `feat/resume-audit-report` เป็น branch เอกสารที่ใช้อยู่ในปัจจุบัน; ไม่ควรนำไปใช้พัฒนา UI ต่อโดยตรง
- เมื่อเริ่ม implementation ให้แตก branch ใหม่จาก `dev` แยกตาม phase และอย่าแก้หลาย phase ใน branch เดียว
- ทุก sprint ต้อง commit เฉพาะ scope ของ sprint ด้วย commit message ที่บอกผลลัพธ์
- หลัง gate ผ่าน ให้หยุดเพื่อขออนุมัติ merge เข้า `dev`; audit นี้ไม่ทำ merge หรือ push

โครงสร้างที่แนะนำ:

```text
main (protected)
  ↑ approved merge only
dev
  ├─ feat/resume-p0-foundation
  ├─ feat/resume-p1-structure-flow
  ├─ feat/resume-p2-responsive-media
  └─ feat/resume-p3-final-polish
```

ตัวอย่าง commit ที่ควรใช้:

- `fix: restore Contact CSS module contract`
- `fix: repair Resume TypeScript build`
- `fix: add semantic headings to Resume`
- `fix: harden social link dialog`
- `fix: adapt Resume layout for iPad Air`
- `perf: defer Resume media and motion`
- `refactor: remove dead Resume dependencies`

### Phase / sprint breakdown

| Phase | Sprint | Branch | งานหลัก | Code score gate |
|---|---|---|---|---|
| P0 Release unblock | 0A | `feat/resume-p0-foundation` | แก้ TypeScript, lint, CSS-module mismatch, `any`, unused code | #1–#4 = 1 |
| P0 Release unblock | 0B | `feat/resume-p0-foundation` | exact route matching, `/resume` smoke path, regression check | #5 = 1 และ #1–#4 ยังเป็น 1 |
| P1 Structure + flow | 1A | `feat/resume-p1-structure-flow` | semantic headings, landmarks, alt strategy, bilingual copy contract | #6, #9, #13 = 1 |
| P1 Structure + flow | 1B | `feat/resume-p1-structure-flow` | remove placeholder links, dialog focus lifecycle, section navigation | #7, #8, #11, #19 = 1 |
| P2 Device + media | 2A | `feat/resume-p2-responsive-media` | 375px, EN/TH nav, iPad Air portrait/landscape, desktop regression | #15–#18 = 1 |
| P2 Device + media | 2B | `feat/resume-p2-responsive-media` | poster/lazy strategy, decorative media semantics, reduced motion | #12, #14 = 1 |
| P3 Final quality | 3A | `feat/resume-p3-final-polish` | token cleanup, CSS-only styling, animation ownership, final dead-code sweep | #10, #20 = 1 |
| P3 Final quality | 3B | `feat/resume-p3-final-polish` | full regression, update scorecard, user visual sign-off | all Code = 1; user fills all Visual scores |

### Verification gate at the end of every sprint

ต้องรันครบทุกครั้งก่อน commit/merge decision:

1. `git diff --check`
2. `npm run lint`
3. `npm run build`
4. เปิด dev/preview server แล้วตรวจ `GET /resume` และ `GET /resume/` ได้ HTTP 200
5. Smoke interaction: hero anchor → About, section nav → ทุก section, EN/TH toggle, theme toggle, social link flow, modal close, back-to-top
6. ตรวจ console/runtime error และตรวจว่าไม่มี horizontal overflow ที่ 375px
7. เมื่อถึง phase responsive ให้ capture 375×812, 820×1180, 1180×820 และ 1280×800 เพื่อให้ผู้ใช้ให้ Visual score

ปัจจุบัน repository ยังไม่มี `smoke:resume` script และ Playwright browser executable ในเครื่องนี้ยังไม่พร้อม ดังนั้นรอบวางแผนใช้ checklist ข้างต้นเป็น manual smoke gate ก่อน หากจะทำเป็น automated script ให้เพิ่มใน sprint P0 โดยไม่ติดตั้ง library ใหม่โดยไม่ได้รับอนุญาต

### Definition of done ต่อ scorecard

- Code score ขยับจาก `0 → 1` ได้เมื่อ fix มี test/evidence ตาม gate ไม่ใช่แค่ code ดูถูกต้อง
- Visual score ขยับจาก `รอผู้ใช้ตรวจ → 1` เมื่อผู้ใช้ตรวจภาพและ interaction ที่ viewport ของ phase นั้นแล้ว
- ถ้า Code = 1 แต่ Visual = 0 ให้คง Code = 1, Visual = 0 และ status เป็น `รอแก้ไขภายหลัง`; overall ข้อนั้นยังไม่ผ่าน
- ถ้า Visual = 1 แต่ Code = 0 ให้ถือว่า implementation ยังไม่ผ่านและห้ามนับคะแนน
- Phase ถัดไปเริ่มได้เมื่อ phase ก่อนหน้าผ่าน Code gate และไม่มี P0/P1 ค้างโดยไม่มี owner
- เป้าหมาย release คือ Code 20/20 + Visual 20/20 = **20/20 overall**

## Positive findings to preserve

- Route isolation ใน `App.tsx` ชัดเจน: `/resume` ไม่โหลด Grainient และ Navbar หลักของ portfolio
- `LanguageProvider` ตั้ง `document.documentElement.lang` และรองรับ EN/TH เป็น behavior จริง
- มี `MotionConfig reducedMotion="user"` เป็นฐานที่ดีสำหรับการทำ motion accessibility ให้ครบ
- Section navigation มี `aria-label`, `aria-expanded`, `aria-controls` และ `aria-current` ในจุดสำคัญ
- Contact form มี label ที่เชื่อมกับ input ด้วย `htmlFor` และมี status/error state
- Social icons มีขนาด visual และ hit area ที่เหมาะสมใน Contact แล้ว เพียงแต่ flow และ modal ยังต้องปรับ
- สีหลักและ typography direction สอดคล้องกับ “The Ember Workshop” ใน DESIGN.md

## Recommended commands

1. **[P0] `$impeccable harden /resume`** — ทำให้ build ผ่านและแก้ semantic/interaction blockers
2. **[P1] `$impeccable clarify /resume`** — เขียน story และ labels ให้ตรงกับ Staff application brief
3. **[P1] `$impeccable adapt /resume`** — แก้ 375px, iPad Air portrait/landscape และ touch targets
4. **[P1] `$impeccable optimize /resume`** — จัดการวิดีโอ/ภาพ remote และ animation runtime cost
5. **[P2] `$impeccable animate /resume`** — ทำ reduced-motion และเลือก motion ที่ช่วย story จริง
6. **[P2] `$impeccable colorize /resume`** — เก็บ token/hardcoded color drift ให้เป็นระบบเดียว
7. **[P3] `$impeccable polish /resume`** — final visual QA หลัง fixes และ browser verification

## Audit conclusion

หน้า `/resume` มีทิศทาง visual ที่ต่อยอดเป็น premium + emotional ได้จริง แต่ implementation ปัจจุบันยังไม่ควรนำไป production เพราะ build ไม่ผ่าน และ narrative/interaction ยังไม่พาผู้ชมไปสู่เป้าหมายสมัคร Staff อย่างตรงจุด

ลำดับที่ปลอดภัยคือ **แก้ release blockers → จัด semantic/content/user flow → แก้ responsive สำหรับ 375px และ iPad Air → วาง media จริง → ค่อย polish motion และ micro detail** เพื่อให้ผลจาก interview ถูกแปลงเป็นประสบการณ์ที่วัดผลได้ ไม่ใช่เพิ่ม effect ก่อนแก้โครงสร้าง

สถานะล่าสุดของ scorecard คือ **Code 4/20, Overall 0/20**; คะแนนนี้ตั้งใจให้เป็น backlog ที่ตรวจซ้ำได้ทุก sprint จนกว่าจะครบ 20/20
