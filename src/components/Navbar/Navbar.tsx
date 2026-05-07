import { useTheme } from '../../hooks/useTheme';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'about', href: '#about' },
  { label: 'work', href: '#projects' },
  { label: 'contact', href: '#contact' },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>fran.</a>
        <div className={styles.right}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>{link.label}</a>
              </li>
            ))}
          </ul>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
