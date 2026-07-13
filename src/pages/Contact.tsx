import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Contact.module.css';

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3v6z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.socialIcon}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const content = {
  en: {
    secTitle: 'Contact',
    heading: "Let's work together.",
    sub: 'Always open to new opportunities and conversations.',
    labelName: 'Name',
    labelEmail: 'Email',
    labelMessage: 'Message',
    btn: 'Send',
  },
  th: {
    secTitle: 'ติดต่อ',
    heading: 'ติดต่อผม',
    sub: 'หากมีข้อสงสัยเกี่ยวกับผลงาน หรือต้องการข้อมูลเพิ่มเติม\nติดต่อผมผ่านฟอร์มนี้ได้เลยครับ',
    labelName: 'ชื่อ',
    labelEmail: 'อีเมล',
    labelMessage: 'ข้อความ',
    btn: 'ส่งข้อความ',
  },
};

// CV not ready yet. When it is: add public/fran-resume.pdf and set this to '/fran-resume.pdf'.
const resumeUrl: string | null = null;
const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

function Contact() {
  const { lang } = useLanguage();
  const c = content[lang];
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!web3FormsAccessKey) {
      setSubmitStatus('error');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const fromName = formData.get('fromName')?.toString().trim() ?? '';
    const fromEmail = formData.get('fromEmail')?.toString().trim() ?? '';
    const message = formData.get('message')?.toString().trim() ?? '';

    setSubmitStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          subject: `Portfolio message from ${fromName}`,
          name: fromName,
          email: fromEmail,
          message,
        }),
      });

      const result = (await response.json()) as Web3FormsResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? 'Web3Forms submission failed');
      }

      form.reset();
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
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
            <div className={styles.nameRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-name">{c.labelName}</label>
                <input id="contact-name" name="fromName" type="text" autoComplete="name" required />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-email">{c.labelEmail}</label>
                <input id="contact-email" name="fromEmail" type="email" autoComplete="email" required />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="contact-message">{c.labelMessage}</label>
              <textarea id="contact-message" name="message" rows={5} required />
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.btnPrimary} disabled={submitStatus === 'submitting'}>
                {submitStatus === 'submitting' ? 'Sending...' : c.btn}
              </button>
              <div className={styles.inlineLinks}>
                <a href="https://youtube.com/@your_channel" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="YouTube">
                  <YoutubeIcon />
                </a>
                <a href="https://instagram.com/your_handle" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://facebook.com/your_profile" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://github.com/psu6810110229" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="GitHub">
                  <GithubIcon />
                </a>
                <a href="https://www.linkedin.com/in/patcharapon-matsuden-864883413" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
                {resumeUrl && (
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="Resume">
                    {lang === 'th' ? 'เรซูเม่' : 'CV'}
                  </a>
                )}
              </div>
            </div>

            {submitStatus === 'success' && (
              <p className={styles.formStatus}>Message sent. Thank you!</p>
            )}
            {submitStatus === 'error' && (
              <p className={styles.formStatusError}>
                {web3FormsAccessKey
                  ? 'Could not send right now. Please try again later.'
                  : 'Contact form is not configured yet.'}
              </p>
            )}
          </form>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.copy}>© 2026 Fran</span>
        </div>
      </footer>
    </motion.section>
  );
}

export default Contact;
