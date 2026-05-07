import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Contact.module.css';

function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="contact"
      className={`reveal ${isVisible ? 'show' : ''}`}
      ref={ref}
    >
      <div className={styles.cta}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>Let's work together.</h2>
          <p className={styles.sub}>Always open to new opportunities and conversations.</p>
          <a
            href="mailto:farnpatcharapon@gmail.com"
            className={styles.btnPrimary}
          >
            Get in touch →
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.copy}>© 2025 Fran</span>
          <div className={styles.socials}>
            <a href="https://github.com/psu6810110229" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:farnpatcharapon@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
