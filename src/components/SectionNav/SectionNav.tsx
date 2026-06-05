import { useState, useEffect, useRef } from 'react';
import styles from './SectionNav.module.css';

interface Section {
  id: string;
  label: string;
  observeIds: string[];
}

const SECTIONS: Section[] = [
  { id: 'hero',           label: 'Hero',   observeIds: ['hero'] },
  { id: 'about',          label: 'About',  observeIds: ['about', 'skills'] },
  { id: 'project-9tours', label: '9tours', observeIds: ['project-9tours'] },
  { id: 'project-go-out', label: 'GO-OUT', observeIds: ['project-go-out'] },
  { id: 'contact',        label: 'Contact',observeIds: ['contact'] },
];

function SectionNav() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const lockedRef = useRef(false);

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
    };
  }, []);

  const scrollTo = (id: string) => {
    lockedRef.current = true;
    setActive(id);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    }
    setTimeout(() => { lockedRef.current = false; }, 900);
  };

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <nav className={styles.nav} aria-label="Section navigation">
      <ul className={styles.list}>
        {SECTIONS.map(({ id, label }) => (
          <li key={id} className={styles.item}>
            <button
              className={`${styles.dot} ${active === id ? styles.dotActive : ''}`}
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
            />
            <span className={styles.tooltip}>{label}</span>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.topBtn} ${scrolled ? styles.topBtnVisible : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </nav>
  );
}

export default SectionNav;
