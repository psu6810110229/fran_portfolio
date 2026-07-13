import { useRef, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import VariableProximity from '../VariableProximity/VariableProximity';
import styles from './Navbar.module.css';

const navLinks = {
  en: [
    { label: 'about', href: '#about' },
    { label: 'work', href: '#projects' },
    { label: 'contact', href: '#contact' },
    { label: 'staff profile', href: '/resume' },
  ],
  th: [
    { label: 'เกี่ยวกับ', href: '#about' },
    { label: 'ผลงาน', href: '#projects' },
    { label: 'ติดต่อ', href: '#contact' },
    { label: 'โปรไฟล์สต๊าฟ', href: '/resume' },
  ],
};

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav ref={navRef} className={styles.navbar} aria-label="Main navigation">
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo} onClick={closeMenu}>
          <VariableProximity
            label="fran."
            fromFontVariationSettings="'wght' 700, 'opsz' 12"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={navRef}
            radius={120}
            falloff="linear"
          />
        </a>
        <div className={styles.right}>
          <ul className={`${styles.navList} ${menuOpen ? styles.navListOpen : ''}`}>
            {navLinks[lang].map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink} onClick={closeMenu}>
                  {lang === 'en' ? (
                    <VariableProximity
                      label={link.label}
                      fromFontVariationSettings="'wght' 500, 'opsz' 10"
                      toFontVariationSettings="'wght' 900, 'opsz' 32"
                      containerRef={navRef}
                      radius={95}
                      falloff="linear"
                    />
                  ) : (
                    link.label
                  )}
                </a>
              </li>
            ))}
          </ul>
          <button
            className={styles.langToggle}
            onClick={toggleLang}
            aria-label={`Switch to ${lang === 'en' ? 'Thai' : 'English'}`}
            title="Toggle language"
          >
            {lang === 'en' ? 'EN' : 'TH'}
          </button>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title="Toggle theme"
          >
            <span key={theme} className={styles.icon}>
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="2" x2="12" y2="4"/>
                  <line x1="12" y1="20" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="4" y2="12"/>
                  <line x1="20" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </span>
          </button>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen : ''}`} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
