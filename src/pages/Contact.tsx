import { useState, type FormEvent } from 'react';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import { LineIcon, InstagramIcon, FacebookIcon, GithubIcon, LinkedinIcon } from '../components/Icons/SocialIcons';
import ExternalLinkModal, { type ExternalLinkType } from '../components/ExternalLinkModal/ExternalLinkModal';
import Magnet from '../components/Magnet/Magnet';
import lineQr from '../assets/line-qr.jpg';
import styles from './Contact.module.css';

const content = {
  en: {
    secTitle: 'Contact',
    title: 'Get in touch',
    subtitle: "Have a project in mind or just want to say hi? I'm always open to new opportunities.",
    labelName: 'Name',
    labelEmail: 'Email',
    labelMessage: 'Message',
    btn: 'Send Message',
  },
  th: {
    secTitle: 'การติดต่อ',
    title: 'ติดต่อพูดคุย',
    subtitle: 'หากคุณมีโปรเจกต์ที่น่าสนใจ หรือแค่อยากทักทาย ผมเปิดรับโอกาสใหม่ๆ เสมอครับ',
    labelName: 'ชื่อ',
    labelEmail: 'อีเมล',
    labelMessage: 'ข้อความ',
    btn: 'ส่งข้อความ',
  },
};

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

function Contact({ resumeUrl }: { resumeUrl?: string }) {
  const { lang } = useLanguage();
  const c = content[lang];

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ExternalLinkType>('LinkedIn');
  const [modalUrl, setModalUrl] = useState('');

  const web3FormsAccessKey = WEB3FORMS_ACCESS_KEY || '';

  const handleOpenModal = (e: React.MouseEvent, type: ExternalLinkType, url: string) => {
    e.preventDefault();
    setModalType(type);
    setModalUrl(url);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!web3FormsAccessKey) {
      if (import.meta.env.DEV) {
        setSubmitStatus('submitting');
        setTimeout(() => {
          setSubmitStatus('success');
        }, 1200);
        return;
      }
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('submitting');
    const formData = new FormData(e.currentTarget);
    formData.append('access_key', web3FormsAccessKey);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  const socialLinksElement = (
    <div className={styles.inlineLinks}>
      <Magnet padding={10} disabled={false} magnetStrength={2}>
        <a href={lineQr} onClick={(e) => handleOpenModal(e, 'Line', lineQr)} className={styles.socialButton} aria-label="LINE">
          <LineIcon className={styles.socialIcon} />
        </a>
      </Magnet>
      <Magnet padding={10} disabled={false} magnetStrength={2}>
        <a href="https://www.instagram.com/fran_patchara?igsh=ZXVpYm5iejJnNmF4" onClick={(e) => handleOpenModal(e, 'Instagram', 'https://www.instagram.com/fran_patchara?igsh=ZXVpYm5iejJnNmF4')} className={styles.socialButton} aria-label="Instagram">
          <InstagramIcon className={styles.socialIcon} />
        </a>
      </Magnet>
      <Magnet padding={10} disabled={false} magnetStrength={2}>
        <a href="https://www.facebook.com/share/16zrE22rYU/" onClick={(e) => handleOpenModal(e, 'Facebook', 'https://www.facebook.com/share/16zrE22rYU/')} className={styles.socialButton} aria-label="Facebook">
          <FacebookIcon className={styles.socialIcon} />
        </a>
      </Magnet>
      <Magnet padding={10} disabled={false} magnetStrength={2}>
        <a href="https://github.com/psu6810110229" onClick={(e) => handleOpenModal(e, 'GitHub', 'https://github.com/psu6810110229')} className={styles.socialButton} aria-label="GitHub">
          <GithubIcon className={styles.socialIcon} />
        </a>
      </Magnet>
      <Magnet padding={10} disabled={false} magnetStrength={2}>
        <a href="https://www.linkedin.com/in/patcharapon-matsuden-864883413" onClick={(e) => handleOpenModal(e, 'LinkedIn', 'https://www.linkedin.com/in/patcharapon-matsuden-864883413')} className={styles.socialButton} aria-label="LinkedIn">
          <LinkedinIcon className={styles.socialIcon} />
        </a>
      </Magnet>
      {resumeUrl && (
        <Magnet padding={10} disabled={false} magnetStrength={2}>
          <a href={resumeUrl} onClick={(e) => handleOpenModal(e, 'Email', resumeUrl)} className={styles.socialButton} aria-label="Resume">
            <FileText className={styles.socialIcon} />
          </a>
        </Magnet>
      )}
    </div>
  );

  return (
    <motion.section 
      id="contact" 
      aria-labelledby="contact-title"
      className={styles.cta}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.inner}>
        <div>
          <h2 id="contact-title" className={styles.heading}>{c.title}</h2>
          <p className={styles.sub}>{c.subtitle}</p>
        </div>

        <div className={styles.formContainer}>
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                className={styles.successBlock}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.successIconWrapper}>
                  <CheckCircle2 className={styles.successIcon} />
                </div>
                <h3 className={styles.successTitle}>
                  {lang === 'th' ? 'ส่งข้อความสำเร็จ!' : 'Message Sent!'}
                </h3>
                <p className={styles.successText}>
                  {lang === 'th'
                    ? 'ขอบคุณที่ติดต่อมาครับ ผมจะรีบตอบกลับให้เร็วที่สุดครับ'
                    : "Thank you for reaching out. I'll get back to you shortly."}
                </p>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setSubmitStatus('idle')}
                >
                  {lang === 'th' ? 'ส่งข้อความใหม่' : 'Send another message'}
                </button>
                <div style={{ marginTop: 'var(--space-6)' }}>
                  {socialLinksElement}
                </div>
              </motion.div>
            ) : submitStatus === 'error' ? (
              <motion.div
                key="error"
                className={styles.successBlock}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={`${styles.successIconWrapper} ${styles.errorIconWrapper}`}>
                  <AlertCircle className={styles.successIcon} />
                </div>
                <h3 className={styles.successTitle}>
                  {lang === 'th' ? 'เกิดข้อผิดพลาด!' : 'Message Failed'}
                </h3>
                <p className={styles.successText}>
                  {lang === 'th'
                    ? 'ไม่สามารถส่งข้อความได้ในขณะนี้ อาจเกิดจากปัญหาการเชื่อมต่อหรือเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้งครับ'
                    : "Could not send right now due to a network or server issue. Please try again."}
                </p>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setSubmitStatus('idle')}
                >
                  {lang === 'th' ? 'ลองใหม่อีกครั้ง' : 'Try again'}
                </button>
                <div style={{ marginTop: 'var(--space-6)' }}>
                  {socialLinksElement}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.nameRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-name">{c.labelName}</label>
                    <input type="text" id="contact-name" name="name" required disabled={submitStatus === 'submitting'} />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-email">{c.labelEmail}</label>
                    <input type="email" id="contact-email" name="email" required disabled={submitStatus === 'submitting'} />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-message">{c.labelMessage}</label>
                  <textarea id="contact-message" name="message" rows={5} required disabled={submitStatus === 'submitting'} />
                </div>

                <div className={styles.actions}>
                  <button type="submit" className={styles.btnPrimary} disabled={submitStatus === 'submitting'}>
                    {submitStatus === 'submitting' ? (lang === 'th' ? 'กำลังส่ง...' : 'Sending...') : c.btn}
                  </button>
                  {socialLinksElement}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.copy}>© 2026 Fran</span>
        </div>
      </footer>

      <ExternalLinkModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        link={modalUrl}
        lang={lang}
      />
    </motion.section>
  );
}

export default Contact;
