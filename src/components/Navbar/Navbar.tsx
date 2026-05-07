import styles from './Navbar.module.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="#hero" className={styles.logo}>Fran</a>
      <ul className={styles.navList}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.navLink}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
