# Product

## Register

brand

## Users

Hiring managers, recruiters, and senior developers evaluating Patcharapon ("Fran") for a **front-end internship in 2026**. Two audiences weighted equally:

- **Thai tech companies** (Hat Yai, Bangkok startups and firms) reading in Thai.
- **International / remote teams** reading in English.

They arrive skeptical and time-poor: a first-year student is an unknown quantity. They skim on a phone or a laptop between other candidates, deciding in seconds whether this person is worth a conversation. The job to be done: in one scroll, convince them Fran has real craft and is worth interviewing.

## Product Purpose

A bilingual (EN/TH) personal portfolio for Fran, a first-year Computer Engineering student at Prince of Songkla University (Hat Yai). It exists to land an internship by making the *site itself* the proof of skill: the design and front-end polish are the work sample. Success is a recruiter walking away believing "this person has real craft and attention to detail" and reaching out.

## Brand Personality

Warm, meticulous, quietly confident. Human and approachable at the core (a real person, not a faceless template), but careful and detail-obsessed in execution. Leans "designer-engineer" rather than "student" — self-assured without overplaying seniority. The voice is honest and eager-to-learn, never boastful; the craft does the bragging.

- **Three words:** warm · meticulous · self-assured.
- **Emotional goal:** quiet confidence in Fran's ability, and the sense of meeting a specific person.

## Anti-references

- **The generic template portfolio** (primary thing to avoid): the interchangeable "hero + identical card grid + skill progress bars" Bootstrap/Vercel-template look. If it could be any of a thousand bootcamp/AI-boilerplate portfolios, it has failed.
- **Corporate SaaS landing page:** big gradient hero, feature-metric grids, enterprise blue. This is a person, not a product.
- **Over-designed / try-hard:** animation and effects piled on as gimmicks that distract from the actual work.

## Design Principles

1. **Craft is the argument.** The site's own polish is the portfolio entry. Every spacing decision, transition, and contrast ratio is evidence of attention to detail; sloppiness here undercuts the whole pitch.
2. **A person, not a template.** Distinctiveness over boilerplate. Reject the interchangeable portfolio scaffold; the warm-dark + orange identity and specific voice should make it unmistakably Fran's.
3. **Quietly confident, never boastful.** Restraint that reads as senior-leaning, but still warm. Let the work speak; don't oversell with superlatives or hype copy.
4. **Bilingual as a first-class equal.** EN and TH are peers, not a primary plus an afterthought. Both must read naturally, with correct typography and language semantics.
5. **Motion that enhances, never distracts.** Calm, purposeful entrance and reveal motion. If an effect competes with the content, cut it.

## Accessibility & Inclusion

- **Target:** WCAG 2.1 AA. Body text ≥4.5:1, large text ≥3:1, in both dark (default) and light themes.
- **Reduced motion:** scroll-reveal and the Hero typing effect need a calm `prefers-reduced-motion` fallback (crossfade or instant, content always visible by default).
- **Bilingual a11y:** correct `lang` attributes on EN/TH content, comfortable Thai line-height, fonts that render both scripts cleanly (Syne/Satoshi + IBM Plex Sans Thai).
- **Keyboard & screen reader:** visible focus states, a skip link, meaningful alt text, and correct ARIA on the navbar, language toggle, theme toggle, and back-to-top control.
- The user has invited follow-up accessibility questions as the project grows.
