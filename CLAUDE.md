# Fran Portfolio — CLAUDE.md

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

## Implementation Order

Complete in this order. Do not skip or reorder.

- [ ] 1\. Vite \+ React TS setup \+ push to GitHub  
- [ ] 2\. Create full file structure \+ global.css variables  
- [ ] 3\. Navbar component  
- [ ] 4\. Hero section  
- [ ] 5\. About section  
- [ ] 6\. Skills section  
- [ ] 7\. Projects section \+ ProjectCard component  
- [ ] 8\. Contact section  
- [ ] 9\. Responsive check all sections (375px, 768px, 1280px)  
- [ ] 10\. Deploy to Vercel

---

## What Claude Must NOT Do

- Do not create files outside the defined structure.  
- Do not install packages without asking.  
- Do not refactor code that wasn't mentioned in the task.  
- Do not add animations or effects unless asked.  
- Do not use `any` type.  
- Do not write inline styles.  
- Do not combine multiple tasks in one response.

---

