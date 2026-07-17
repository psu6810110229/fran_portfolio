# Ultraplan: `/resume` Route (NEW Academy STAFF Application)

## Outcome
Plan the architecture and implementation of a new interactive `/resume` route tailored for the NEW Academy event STAFF application. The page will highlight Fran's soft skills, systematic thinking, and Open House experience as an interactive resume. It strictly adheres to the "Prisma" cinematic landing page design spec (React + Vite + TypeScript + Tailwind CSS + Framer Motion).

## Finalized Architectural Decisions (from /grill-me)
1. **Navigation:** Add a "Staff Profile" link to the main site's Navbar, and a "Back to Portfolio" link in the `/resume` page's Navbar.
2. **Tailwind Isolation:** Use the `tw-` prefix for all Tailwind classes (e.g., `tw-flex`, `tw-bg-black`) and disable preflight to guarantee 100% isolation from the main site's CSS Modules.
3. **Breakpoints:** Use Tailwind's default breakpoints (`sm`, `md`, `lg`, `xl`) for the `/resume` route to perfectly match the Prisma design.

## Phase 1: Dependency & Architecture Setup
**Goal:** Configure the route and isolated styling ecosystem without breaking the main site's CSS Modules ("Ember Workshop" theme).
**Steps:**
1. Install `tailwindcss`, `framer-motion`, and `lucide-react`.
2. **Tailwind Isolation Strategy:**
   - Configure `tailwind.config.js` to disable global preflight (`corePlugins: { preflight: false }`).
   - Set prefix to `tw-`.
   - Wrap the entire `/resume` route in a container with a specific ID (e.g., `<div id="prisma-root">`).
   - Define a custom Tailwind base layer scoped to `#prisma-root` for necessary resets.
   - Configure Tailwind to include the Prisma color palette (`#000`, `#101010`, `#212121`, `#E1E0CC`, `#DEDBC8`) and fonts (Almarai, Instrument Serif).
3. Update `index.html` to load the Google Fonts (Almarai, Instrument Serif).
4. Add global utility classes (`.noise-overlay`, `.bg-noise`) to `index.css`.
5. Create `src/pages/Resume/Resume.tsx` and route `/resume` in `App.tsx`. Update the main Navbar to link to `/resume`.

## Phase 2: Core Components & Framer Motion
**Goal:** Scaffold the base Framer Motion utility components.
**Steps:**
1. Create `WordsPullUp` component for staggered y:20 -> 0 animation (with `showAsterisk` support, using `tw-` prefixed classes).
2. Create `WordsPullUpMultiStyle` component for segmented styled text animations.
3. Create `AnimatedLetter` component with `useScroll` for scroll-linked character opacity reveal (0.2 to 1).

## Phase 3: Content Mapping & Layout Implementation
**Goal:** Inject the NEW Academy persona content into the Prisma sections, mapping exactly to the PRISM reference.
**Steps:**

### 1. HERO Section
- **Visuals:** Full viewport height, video background (URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4`), `.noise-overlay`, black gradient overlay.
- **Navbar:** "Back to Portfolio", "My Story", "Methodology", "Experience", "Skills", "Contact".
- **Content:** Bottom-aligned 12-column grid.
- **Heading:** "Patcharapon" (using `WordsPullUp`). The superscript asterisk (*) will be placed precisely on the final letter "**n**" of "Patcharapon".
- **Description:** "A Year 2 Computer Engineering student at PSU. Highly logical, systematic, yet approachable. I build rigorous systems with an empathetic touch, ready to support the next generation of engineers."
- **CTA:** "View Application" button with ArrowRight icon.

### 2. ABOUT Section
- **Visuals:** `tw-bg-black`, padded, inner card `tw-bg-[#101010]`.
- **Top Label:** "Systematic Thinker"
- **Heading (WordsPullUpMultiStyle):**
  - "I am Fran," (Almarai)
  - "a builder of logical systems." (Instrument Serif italic)
  - "I balance engineering precision with a soft, approachable demeanor." (Almarai)
- **Body (Scroll Reveal):**
  - "As a Computer Engineering student, I thrive under pressure and solve problems methodically. But beyond the code, my experience hosting Open Houses has taught me the value of empathy and clear communication when engaging with youth."

### 3. FEATURES Section
- **Visuals:** min-h-screen `tw-bg-black`, `.bg-noise` overlay, 4-column card grid.
- **Header:** "Rigorous execution. Empathetic support." (WordsPullUpMultiStyle)
- **Card 1 (Video):** Looping background video (URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4`). Bottom text: "Under pressure."
- **Card 2 (Methodology):** 
  - Number: "01"
  - Title: "Systematic Approach."
  - Icon: Small top image using `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85`
  - Checklist Items (with green `lucide-react` Check icons): Root cause analysis, Edge-case planning, Calm execution under stress.
  - Action: "Learn more" link with `-45deg` rotated ArrowRight.
- **Card 3 (Communication):** 
  - Number: "02"
  - Title: "Youth Engagement."
  - Icon: Small top image using `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85`
  - Checklist Items (with green `lucide-react` Check icons): Active listening, Distilling complex ideas, Approachable mentorship.
  - Action: "Learn more" link with `-45deg` rotated ArrowRight.
- **Card 4 (Experience):** 
  - Number: "03"
  - Title: "Open House."
  - Icon: Small top image using `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85`
  - Checklist Items (with green `lucide-react` Check icons): Guided lab tours, Live technical demos, Crowd management.
  - Action: "Learn more" link with `-45deg` rotated ArrowRight.

## Verification Plan
- **Automated:** `npm run build`, `tsc -b`.
- **Manual:** Verify `/resume` route renders independently without Tailwind bleeding into `Projects.tsx`. Verify animations trigger on scroll.
