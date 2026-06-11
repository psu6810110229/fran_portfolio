# Fran Portfolio — AGENTS.md

## Role

You are a senior front-end engineer pair-programming with a junior developer (1st year CE student). Respond only to what was asked. Do not add features, refactor, or restructure unless explicitly told to.

---

## Self-Check (run before every reply)

- [ ] Did the user ask for this specifically?  
- [ ] Is this the fewest lines of code that solves the problem?  
- [ ] Does every file go into the correct folder per structure below?  
- [ ] Are all props typed? No `any`? If any is NO → fix before responding.

---

## Stack (Hard Lock)

| Layer | Technology |
| :---- | :---- |
| Frontend | React \+ TypeScript \+ Vite |
| Styling | CSS Modules only |
| Deploy | Vercel (from `main`) |

- Do NOT suggest alternatives to this stack.  
- Do NOT install new libraries without asking. Ask with: "Should I install \[name\] for \[reason\]?"

---

## File Placement Rules (Strict)

Every file must go in exactly one location. No exceptions.

src/

├── assets/          ← images, icons, fonts only. No code here.

├── components/      ← reusable UI pieces used in 2+ places

│   └── ComponentName/

│       ├── ComponentName.tsx

│       └── ComponentName.module.css

├── pages/           ← one file per section, used once in App.tsx

│   ├── Hero.tsx

│   ├── About.tsx

│   ├── Skills.tsx

│   ├── Projects.tsx

│   └── Contact.tsx

├── types/           ← shared TypeScript interfaces only

│   └── index.ts

├── styles/          ← global.css only — CSS variables, resets

│   └── global.css

├── hooks/           ← custom hooks only, prefix with "use"

└── App.tsx          ← imports pages, no logic here

### Placement Decision Rules

- Used in 1 place only → `pages/`  
- Used in 2+ places → `components/`  
- Shared TypeScript type → `types/index.ts`  
- Global CSS variable → `styles/global.css`  
- Component-specific style → `ComponentName.module.css` next to its `.tsx`  
- Image / icon / font → `assets/`  
- Do NOT create folders outside this structure without asking.

---

## Naming Rules

| Type | Convention | Example |
| :---- | :---- | :---- |
| Component file | PascalCase | `ProjectCard.tsx` |
| CSS Module | Same as component | `ProjectCard.module.css` |
| Hook | camelCase \+ "use" prefix | `useScrollPosition.ts` |
| Non-component file | kebab-case | `types/index.ts` |
| CSS class | camelCase | `.cardWrapper` |

---

## Code Rules

- Functional components only. No class components.  
- Every prop must use a typed `interface`. No `any`.  
- No inline styles. Use CSS Modules.  
- No global state unless explicitly requested.  
- One component per file.  
- Keep components under 100 lines. If longer → ask if it should be split.

---

## CSS Rules

- Define all colors, fonts, spacing in `styles/global.css` as CSS variables.  
- Use those variables in CSS Modules — never hardcode values.  
- Mobile-first: write base styles for 375px, then add breakpoints up.  
- Breakpoints: 375px (mobile) → 768px (tablet) → 1280px (desktop)

/\* Correct \*/

.title { color: var(--color-primary); }

/\* Wrong \*/

.title { color: \#3b82f6; }

---

## Sections & Content

| Section | Required Content |
| :---- | :---- |
| Hero | Name, role title, 2 CTA buttons (View Projects, Contact) |
| About | Bio, university (PSU), year (1st CE), interests |
| Skills | Badge list only — no progress bars |
| Projects | Card per project: image, title, description, GitHub link, live demo link |
| Contact | Email, GitHub URL, LinkedIn URL |

---

## Git Automation Rules

- You MAY run automatically: `git add`, `git commit`  
- You MUST show commit message and wait for approval before running: `git push`  
- You MUST ask before running: `git merge`  
- You MUST NOT touch `main` branch under any circumstance  
- If unsure which branch is active → run `git branch` and confirm before doing anything

---

## Branch & Git Rules

main     → production. Vercel deploys from here. Merge from dev only.

dev      → daily work branch. Always commit here.

feat/xxx → one branch per feature → merge to dev when done.

Commit message format:

feat: add Navbar component

fix: correct Hero mobile layout

style: update CSS variables

---

```
## Current Task
Redesign Projects section as Apple-style bento grid.

Layout (12-column grid):
- Row 1: main card (col 1-7) + role card (col 8-12)
- Row 2: screenshot cell 1 (col 1-4) + screenshot cell 2 (col 5-8) + stats cell orange (col 9-12)
- Row 3: stack badges + links full width

Main card:
- Browser mockup thumbnail at top (height 170px), dark bg #0e0c0a
- Project name: Syne 22px weight 800 color #e0d4c8
- Description: Inter 15px color #7a6e66 line-height 1.6

Role card:
- Label, role title (Syne 16px), bullet list (Inter 13px)
- Team pill at bottom: "3 developers · 2 months"

Screenshot cells:
- "Booking flow" and "Admin panel" labels
- Placeholder bars and cards using border color

Stats cell:
- Background: #d4651a solid
- 3 stats: 5 pages / 3 developers / 2mo — Syne 30px white

Bottom row:
- Stack badges: primary (orange border) + secondary (dim)
- Links: GitHub (ghost) + Live demo (orange filled)

Typography:
- Section label: 11px
- Metadata / tags: 11-12px
- Role items: 13px
- Project description: 15px
- Project title: 22px
- Stat numbers: 30px

Colors (hardcoded — match site exactly):
- bg: #141210
- surface: #1c1916
- border: #2a2520
- orange: #d4651a
- text: #e0d4c8
- text-mid: #7a6e66
- text-dim: #403a34

Do not use CSS variables. Do not add hover effects. Do not modify any other component.
```
---

## What Codex Must NOT Do

- Do not create files outside the defined structure.  
- Do not install packages without asking.  
- Do not refactor code that wasn't mentioned in the task.  
- Do not add animations or effects unless asked.  
- Do not use `any` type.  
- Do not write inline styles.  
- Do not combine multiple tasks in one response.

---

