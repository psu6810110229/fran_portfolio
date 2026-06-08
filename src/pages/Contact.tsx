import type { FormEvent } from 'react';
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fromName = formData.get('fromName')?.toString().trim() ?? '';
    const fromEmail = formData.get('fromEmail')?.toString().trim() ?? '';
    const message = formData.get('message')?.toString().trim() ?? '';
    const subject = encodeURIComponent(`Portfolio message from ${fromName}`);
    const body = encodeURIComponent(
      `Name: ${fromName}\nEmail: ${fromEmail}\n\n${message}`,
    );

    window.location.href = `mailto:farnpatcharapon@gmail.com?subject=${subject}&body=${body}`;
  };

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
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="fromName" type="text" autoComplete="name" required />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="fromEmail" type="email" autoComplete="email" required />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={5} required />
            </div>
            <button type="submit" className={styles.btnPrimary}>
              {c.btn}
            </button>
          </form>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.copy}>© 2026 Fran</span>
          <div className={styles.socials}>
            <a href="https://github.com/psu6810110229" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/patcharapon-matsuden-864883413" target="_blank" rel="noreferrer">LinkedIn</a>
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
