import { useState, useEffect, useRef, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import styles from './SectionNav.module.css';

interface Section {
  id: string;
  label: string;
  observeIds: string[];
}

const MAIN_SECTIONS: Section[] = [
  { id: 'hero',           label: 'Hero',   observeIds: ['hero'] },
  { id: 'about',          label: 'About',  observeIds: ['about', 'skills'] },
  { id: 'project-9tours', label: '9tours', observeIds: ['project-9tours'] },
  { id: 'project-go-out', label: 'GO-OUT', observeIds: ['project-go-out'] },
  { id: 'contact',        label: 'Contact',observeIds: ['contact'] },
];

const RESUME_SECTIONS: Section[] = [
  { id: 'hero',           label: 'Hero',        observeIds: ['hero'] },
  { id: 'about',          label: 'My Story',    observeIds: ['about'] },
  { id: 'features',       label: 'Methodology', observeIds: ['features'] },
  { id: 'contact',        label: 'Contact',     observeIds: ['contact'] },
];

const scrollDuration = 1.25;
const navigationSettleMs = 1300;

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

// Expo easing for premium feel
const easeOutExpo = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

interface SectionNavProps {
  isResumeRoute?: boolean;
}

function SectionNav({ isResumeRoute = false }: SectionNavProps) {
  const SECTIONS = isResumeRoute ? RESUME_SECTIONS : MAIN_SECTIONS;
  const lenis = useLenis();
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [collapsing, setCollapsing] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const lockedRef = useRef(false);
  const collapseTimerRef = useRef<number | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const collapseAnimationTimerRef = useRef<number | null>(null);
  const selectedTimerRef = useRef<number | null>(null);
  const activeLabel = SECTIONS.find((section) => section.id === active)?.label ?? 'Hero';

  const startCollapse = useCallback(() => {
    if (collapsing) return;

    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }

    if (collapseAnimationTimerRef.current !== null) {
      return;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCollapsing(true);
    setExpanded(false);
    collapseAnimationTimerRef.current = window.setTimeout(() => {
      setCollapsing(false);
      collapseAnimationTimerRef.current = null;
    }, reduce ? 0 : 480);
  }, [collapsing]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id, observeIds }) => {
      observeIds.forEach((domId) => {
        const el = document.getElementById(domId);
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !lockedRef.current) setActive(id);
          },
          { threshold: 0.2 }
        );
        obs.observe(el);
        observers.push(obs);
      });
    });

    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', onScroll);
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current);
      }
      if (collapseAnimationTimerRef.current !== null) {
        window.clearTimeout(collapseAnimationTimerRef.current);
      }
      if (selectedTimerRef.current !== null) {
        window.clearTimeout(selectedTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && navRef.current && !navRef.current.contains(target)) {
        startCollapse();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [expanded, startCollapse]);

  useEffect(() => {
    if (!expanded) return;

    const onScroll = () => {
      if (lockedRef.current) return;

      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current);
      }

      collapseTimerRef.current = window.setTimeout(() => {
        startCollapse();
      }, 520);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (collapseTimerRef.current !== null) {
        window.clearTimeout(collapseTimerRef.current);
        collapseTimerRef.current = null;
      }
    };
  }, [expanded, startCollapse]);

  const scrollTo = (id: string) => {
    lockedRef.current = true;
    setActive(id);
    setSelected(id);
    setExpanded(true);
    if (navigationTimerRef.current !== null) {
      window.clearTimeout(navigationTimerRef.current);
    }
    if (selectedTimerRef.current !== null) {
      window.clearTimeout(selectedTimerRef.current);
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (id === 'hero') {
      if (lenis) {
        lenis.scrollTo(0, { duration: scrollDuration, immediate: reduce, easing: easeOutExpo });
      } else {
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }
    } else {
      const el = document.getElementById(id);
      if (!el) {
        lockedRef.current = false;
        setSelected(null);
        return;
      }
      if (lenis) {
        // Calculate static offset top to avoid bounding rect issues from active CSS transforms on pinned ScrollStack cards
        let targetScrollY = 0;
        let current: HTMLElement | null = el;
        while (current) {
          targetScrollY += current.offsetTop;
          current = current.offsetParent as HTMLElement | null;
        }

        // Subtract ScrollStack pinning offset on desktop/tablet (> 768px) to align cards properly,
        // or navbar height (72px) on mobile/tablet (<= 768px) to prevent covering headers.
        const hasPinStack = window.matchMedia('(min-width: 769px)').matches;
        const pinOffset = hasPinStack ? window.innerHeight * 0.02 : 72;
        const finalScrollY = Math.max(0, targetScrollY - pinOffset);

        lenis.scrollTo(finalScrollY, { duration: scrollDuration, immediate: reduce, easing: easeOutExpo });
      } else {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }
    }
    navigationTimerRef.current = window.setTimeout(() => {
      startCollapse();
      lockedRef.current = false;
      navigationTimerRef.current = null;
      selectedTimerRef.current = window.setTimeout(() => {
        setSelected(null);
        selectedTimerRef.current = null;
      }, reduce ? 120 : 620);
    }, reduce ? 260 : navigationSettleMs);
  };

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (lenis) {
      lenis.scrollTo(0, { duration: scrollDuration, immediate: reduce, easing: easeOutExpo });
    } else {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${expanded ? styles.navExpanded : ''} ${collapsing ? styles.navCollapsing : ''}`}
      aria-label="Section navigation"
    >
      <button
        className={styles.fab}
        type="button"
        onClick={() => {
          setSelected(null);
          if (expanded) {
            startCollapse();
            return;
          }
          if (collapseAnimationTimerRef.current !== null) {
            window.clearTimeout(collapseAnimationTimerRef.current);
            collapseAnimationTimerRef.current = null;
          }
          setCollapsing(false);
          setExpanded(true);
        }}
        aria-label={`${expanded ? 'Close' : 'Open'} section navigation. Current section: ${activeLabel}`}
        aria-controls="section-nav-list"
        aria-expanded={expanded}
      >
        <svg className={styles.fabIcon} viewBox="0 0 18 18" width="18" height="18" fill="none" aria-hidden="true" style={{ overflow: 'visible' }}>
          <line className={styles.axis} x1="4" y1="2" x2="4" y2="16" strokeWidth="1" strokeLinecap="round" />
          <line className={styles.tick} x1="8" y1="4" x2="15" y2="4" strokeWidth="1.5" strokeLinecap="round" />
          <line className={styles.tick} x1="8" y1="10" x2="15" y2="10" strokeWidth="1.5" strokeLinecap="round" />
          <line className={styles.tick} x1="8" y1="14" x2="15" y2="14" strokeWidth="1.5" strokeLinecap="round" />
          <rect className={`${styles.mark} ${styles.mark1}`} x="-3" y="4.5" width="14" height="5" rx="2.5" />
          <rect className={`${styles.mark} ${styles.mark2}`} x="-3" y="4.5" width="14" height="5" rx="2.5" />
          <rect className={`${styles.mark} ${styles.mark3}`} x="-3" y="4.5" width="14" height="5" rx="2.5" />
        </svg>
      </button>

      <ul id="section-nav-list" className={`${styles.list} ${expanded ? styles.listExpanded : ''}`}>
        {SECTIONS.map(({ id, label }) => (
          <li key={id} className={styles.item}>
            <button
              className={`${styles.dot} ${active === id ? styles.dotActive : ''} ${selected === id ? styles.dotSelected : ''}`}
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              aria-current={active === id ? 'true' : undefined}
            >
            </button>
            <span className={styles.tooltip}>{label}</span>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.topBtn} ${scrolled ? styles.topBtnVisible : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M1.5 7L5 3L8.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </nav>
  );
}

export default SectionNav;
