import styles from './Navbar.module.css';

const navLinks = [
  { label: 'about', href: '#about' },
  { label: 'work', href: '#projects' },
  { label: 'contact', href: '#contact' },
];

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>fran.</a>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.navLink}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
