# Ultraplan: `/resume` Route (NEW Academy STAFF Application)

## Outcome
Plan the architecture and implementation of a new interactive `/resume` route tailored for the NEW Academy event STAFF application. The page will highlight Fran's soft skills, systematic thinking, and Open House experience as an interactive resume. It strictly adheres to the "Prisma" cinematic landing page design spec (React + Vite + TypeScript + Tailwind CSS + Framer Motion).

## User Review Required
> [!IMPORTANT]
> The Prisma design spec requires Tailwind CSS, Framer Motion, and different fonts/colors than the main portfolio site (which uses CSS Modules and a strict "Ember Workshop" theme).
> **Question 1:** Should I install `tailwindcss` and `framer-motion` for this route, and is it acceptable for the `/resume` route to diverge from the `global.css` design tokens?

> [!WARNING]
> The Prisma reference includes specific video URLs for backgrounds. 
> **Question 2:** Should I use those exact Prisma URLs, or do you have alternative video assets for Fran's resume?

## Phase 1: Dependency & Architecture Setup
**Goal:** Configure the route and isolated styling ecosystem without breaking the main site.
**Steps:**
1. Install `tailwindcss`, `framer-motion`, and `lucide-react` (if approved).
2. Configure Tailwind (`tailwind.config.js`) to include the Prisma color palette (`#000`, `#101010`, `#212121`, `#E1E0CC`, `#DEDBC8`) and fonts (Almarai, Instrument Serif).
3. Update `index.html` to load the Google Fonts.
4. Add global utility classes (`.noise-overlay`, `.bg-noise`) to `index.css`.
5. Create `src/pages/Resume/Resume.tsx` and route `/resume` in `App.tsx`.

## Phase 2: Core Components & Framer Motion
**Goal:** Scaffold the base Framer Motion utility components.
**Steps:**
1. Create `WordsPullUp` component for staggered y:20 -> 0 animation (with `showAsterisk` support).
2. Create `WordsPullUpMultiStyle` component for segmented styled text animations.
3. Create `AnimatedLetter` component with `useScroll` for scroll-linked character opacity reveal (0.2 to 1).

## Phase 3: Content Mapping & Layout Implementation
**Goal:** Inject the NEW Academy persona content into the Prisma sections.
**Steps:**

### 1. HERO Section
- **Visuals:** Full viewport height, video background, `.noise-overlay`, black gradient overlay.
- **Navbar:** "My Story", "Methodology", "Experience", "Skills", "Contact".
- **Content:** Bottom-aligned 12-column grid.
- **Heading:** "Patcharapon" (using `WordsPullUp` with asterisk).
- **Description:** "A Year 2 Computer Engineering student at PSU. Highly logical, systematic, yet approachable. I build rigorous systems with an empathetic touch, ready to support the next generation of engineers."
- **CTA:** "View Application" button with ArrowRight icon.

### 4. ABOUT Section
- **Visuals:** `bg-black`, padded, inner card `bg-[#101010]`.
- **Top Label:** "Systematic Thinker"
- **Heading (WordsPullUpMultiStyle):**
  - "I am Fran," (Almarai)
  - "a builder of logical systems." (Instrument Serif italic)
  - "I balance engineering precision with a soft, approachable demeanor." (Almarai)
- **Body (Scroll Reveal):**
  - "As a Computer Engineering student, I thrive under pressure and solve problems methodically. But beyond the code, my experience hosting Open Houses has taught me the value of empathy and clear communication when engaging with youth."

### 5. FEATURES Section
- **Visuals:** min-h-screen `bg-black`, `.bg-noise` overlay, 4-column card grid.
- **Header:** "Rigorous execution. Empathetic support."
- **Card 1 (Video):** Looping background video. Text: "Under pressure."
- **Card 2 (Methodology):** "01. Systematic Approach." Checklist: Root cause analysis, Edge-case planning, Calm execution under stress.
- **Card 3 (Communication):** "02. Youth Engagement." Checklist: Active listening, Distilling complex ideas, Approachable mentorship.
- **Card 4 (Experience):** "03. Open House." Checklist: Guided lab tours, Live technical demos, Crowd management.

## Verification Plan
- **Automated:** `npm run build`, `tsc -b`.
- **Manual:** Verify `/resume` route renders independently without Tailwind bleeding into `Projects.tsx`. Verify animations trigger on scroll.
