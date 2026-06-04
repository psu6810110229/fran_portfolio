import { motion } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Contact.module.css';

const content = {
  en: {
    heading: "Let's work together.",
    sub: 'Always open to new opportunities and conversations.',
    btn: 'Get in touch →',
  },
  th: {
    heading: 'หวังว่าเราจะได้ร่วมงานกันนะครับ',
    sub: 'พร้อมรับฟังโอกาสและพูดคุยเสมอครับ',
    btn: 'ติดต่อผม →',
  },
};

// CV not ready yet. When it is: add public/fran-resume.pdf and set this to '/fran-resume.pdf'.
const resumeUrl: string | null = null;

function Contact() {
  const { lang } = useLanguage();
  const c = content[lang];

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
          <span className={styles.copy}>© 2026 Fran</span>
          <div className={styles.socials}>
            <a href="https://github.com/psu6810110229" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/fran-patcharapon-864883413" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:farnpatcharapon@gmail.com">Email</a>
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noreferrer">{lang === 'th' ? 'เรซูเม่' : 'Resume'}</a>
            )}
          </div>
        </div>
      </footer>
    </motion.section>
  );
}

export default Contact;
