# Patcharapon Matsuden — Profile

## Identity

**Name:** Patcharapon Matsuden (Fran)
**Role:** First-year Computer Engineering student, Prince of Songkla University, Hat Yai
**Email:** farnpatcharapon@gmail.com
**GitHub:** https://github.com/psu6810110229
**LinkedIn:** https://www.linkedin.com/in/patcharapon-matsuden-864883413

---

## Statement

A product-minded developer who turns ideas into usable web and mobile products. Not just front-end — full stack, from wireframe to shipped. Thinks about the user and the problem first, then the code.

---

## Personality

**Three words:** warm · meticulous · self-assured

Careful and detail-obsessed in execution. Honest and eager to learn. Confident because of the work — not because of hype. Comfortable leading a team and building alongside one. The kind of developer who owns a problem through to the end.

---

## How I Work

**01 — Plan**
Turn a rough idea into a clear scope and a path to build it. Wireframes first. Decisions made before writing code.

**02 — Build**
Write the front-end and the APIs behind it. Across the full stack — not just the screen.

**03 — Ship**
Debug, deliver, and keep a team moving to something that works and people can use.

---

## Skills

### Frontend
React · TypeScript · JavaScript · HTML · CSS · Tailwind · Vite

### Backend
Supabase · Firebase · MySQL · Redis · NestJS · PostgreSQL

### DevOps & Tools
Git · GitHub · Docker · AWS EC2 · Capacitor · PWA · FCM

---

## Projects

### 9tours — Online Tour Booking Platform
**Tag:** Team project · PSU (240-124) · 3 developers
**Stack:** React, TypeScript, CSS, SQL, Git
**GitHub:** https://github.com/psu6810110712/9Tours

A tour booking platform where users browse trips, book seats, get confirmations, and admins manage everything from one panel. Built by a student team at PSU.

**My role:** Group lead and project manager. Drove product and design direction from first wireframe to production. Built the booking flow and parts of the API alongside teammates.

**Hardest problem:** Two people could book the last seat at the same moment — both screens showed success before the server had saved either. Fixed by making the server the single source of truth: the screen now waits for server confirmation before showing success and recalculating available seats.

**What I led:** Wireframes, design decisions, component consistency, team alignment, booking flow, API coordination.

---

### GO-OUT — Shared Savings Tracker
**Tag:** Solo build · Mobile-first · Full-stack
**Stack:** React, TypeScript, Vite, Supabase, Capacitor, PWA, FCM
**GitHub:** https://github.com/psu6810110229/Project_Saving

A mobile-first savings tracker for small groups (up to 7 people). Not a bank — a scoreboard. Members save toward one shared goal through separate private buckets. Everyone sees high-level progress; personal details stay private.

**My role:** Designed and built everything solo — product design, front-end, Supabase data model, RLS/RPC security rules, saving-plan engine, Capacitor/PWA delivery, and an Android home-screen widget rendered from React UI through a hidden WebView.

**Hardest problem:** Financial records must stay trustworthy — no hard deletes, no editing old logs. Solved with an append-only ledger and three distinct money states: Recorded Deposits, Verified Balance, Planned Balance. Corrections go through a Reconcile flow that creates a signed adjustment checkpoint instead of rewriting history. Enforced at the database level with Supabase Row-Level Security and Security-Definer RPCs.

**Key design decisions:** Project rooms for shared goals with separate member buckets. Streak tracking with monthly Streak Freezes to reduce burnout. One React codebase across web, PWA, and mobile.

---

### Gear Rental — Equipment Rental System
**Tag:** Pair project · PSU (240-124) · Full-stack
**Stack:** React, TypeScript, NestJS, PostgreSQL, Docker
**GitHub:** https://github.com/psu6810110229/mini_project

A gear-rental system for the PSU photo club. Students browse cameras and lenses, request items for a date range, and admins approve, check out, return, and audit. Role-based JWT auth, booking-overlap detection, and an audit log. Built as a pair warmup before 9tours.

**My role:** Full-stack across both front-end (React screens for browsing and requesting) and the API (NestJS + PostgreSQL rental rules, item stock, booking checks).

**Hardest problem:** One physical item cannot be in two hands at once. Solved with date-range overlap detection — an existing booking conflicts when it starts before the new one ends AND ends after the new one starts. Approving a request auto-rejects all overlapping pending requests for the same item. Cart lives client-side and expires after 15 minutes; it never quietly reserves stock.

---

### MinusOnMine — Mining RPG
**Tag:** Team project · 3 developers
**Stack:** Python, Kivy
**GitHub:** https://github.com/psu6810110712/MinusOnMine

Top-down mining RPG with grid-based resource collection, equipment upgrades, and persistent save states.

---

## What I Can Do for You

- Take a product idea from zero to shipped — web or mobile
- Lead a small team: planning, scope, decisions, delivery
- Build the front-end and the API that backs it
- Work across React, TypeScript, Supabase, and mobile (PWA + Capacitor)
- Spot and fix trust-breaking edge cases in booking flows, money flows, and state management
- Ship clean, consistent UI with real attention to detail

---

## What I'm Looking For

An internship or freelance project where I can keep building with people who ship real software. I work best on products that solve a real problem — whether it's a booking platform, a utility app, or something that turns a manual process into something usable.

One message away: farnpatcharapon@gmail.com
