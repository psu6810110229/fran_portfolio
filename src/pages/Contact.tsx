import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Contact.module.css';

const content = {
  en: {
    heading: "Let's work together.",
    sub: 'Always open to new opportunities and conversations.',
    btn: 'Get in touch →',
  },
  th: {
    heading: 'ยินดีร่วมงานกับคุณครับ',
    sub: 'พร้อมรับฟังโอกาสและพูดคุยเสมอครับ',
    btn: 'ติดต่อผม →',
  },
};

function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <section
      id="contact"
      className={`reveal ${isVisible ? 'show' : ''}`}
      ref={ref}
    >
      <div className={styles.cta}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>{c.heading}</h2>
          <p className={styles.sub}>{c.sub}</p>
          <a
            href="mailto:farnpatcharapon@gmail.com"
            className={styles.btnPrimary}
          >
            {c.btn}
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
