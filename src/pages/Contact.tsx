import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import githubIcon from '../assets/icons/github.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import styles from './Contact.module.css';

const content = {
  en: {
    heading: "Let's work together.",
    sub: 'Always open to new opportunities and conversations.',
    labelName: 'Name',
    labelEmail: 'Email',
    labelMessage: 'Message',
    btn: 'Send',
  },
  th: {
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
          <hr className={styles.divider} aria-hidden="true" />

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
                <a href="https://github.com/psu6810110229" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="GitHub">
                  <img src={githubIcon} alt="" aria-hidden="true" className={styles.socialIcon} />
                </a>
                <a href="https://www.linkedin.com/in/patcharapon-matsuden-864883413" target="_blank" rel="noreferrer" className={styles.socialButton} aria-label="LinkedIn">
                  <img src={linkedinIcon} alt="" aria-hidden="true" className={styles.socialIcon} />
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
