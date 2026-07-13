import { useState, type FormEvent } from 'react';
import { FileText, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import { YoutubeIcon, InstagramIcon, FacebookIcon, GithubIcon, LinkedinIcon } from '../components/Icons/SocialIcons';
import ExternalLinkModal, { type ExternalLinkType } from '../components/ExternalLinkModal/ExternalLinkModal';
import Magnet from '../components/ui/Magnet';
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
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  return (
    <motion.section 
      id="contact" 
      className={styles.contactSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.secTitle}>{c.secTitle}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-name">{c.labelName}</label>
                <input type="text" id="contact-name" name="name" required />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-email">{c.labelEmail}</label>
                <input type="email" id="contact-email" name="email" required />
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
                <Magnet padding={10} disabled={false} magnetStrength={2}>
                  <a href="https://www.youtube.com/@farnpatcharapon5393" onClick={(e) => handleOpenModal(e, 'GitHub', 'https://www.youtube.com/@farnpatcharapon5393')} className={styles.socialButton} aria-label="YouTube">
                    <YoutubeIcon className={styles.socialIcon} />
                  </a>
                </Magnet>
                <Magnet padding={10} disabled={false} magnetStrength={2}>
                  <a href="https://www.instagram.com/fran_patchara?igsh=ZXVpYm5iejJnNmF4" onClick={(e) => handleOpenModal(e, 'GitHub', 'https://www.instagram.com/fran_patchara?igsh=ZXVpYm5iejJnNmF4')} className={styles.socialButton} aria-label="Instagram">
                    <InstagramIcon className={styles.socialIcon} />
                  </a>
                </Magnet>
                <Magnet padding={10} disabled={false} magnetStrength={2}>
                  <a href="https://www.facebook.com/share/16zrE22rYU/" onClick={(e) => handleOpenModal(e, 'GitHub', 'https://www.facebook.com/share/16zrE22rYU/')} className={styles.socialButton} aria-label="Facebook">
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
            </div>

            {submitStatus === 'success' && (
              <p className={styles.formStatus}>Message sent. Thank you!</p>
            )}
            {submitStatus === 'error' && (
              <p className={styles.formStatusError}>
                Could not send right now. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div>

import { useState, type FormEvent } from 'react';
import { FileText, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import { YoutubeIcon, InstagramIcon, FacebookIcon, GithubIcon, LinkedinIcon } from '../components/Icons/SocialIcons';
import ExternalLinkModal, { type ExternalLinkType } from '../components/ExternalLinkModal/ExternalLinkModal';
import Magnet from '../components/ui/Magnet';
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
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  return (
    <motion.section 
      id="contact" 
      className={styles.contactSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.secTitle}>{c.secTitle}</span>
          <h2 className={styles.title}>{c.title}</h2>
          <p className={styles.subtitle}>{c.subtitle}</p>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameRow}>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-name">{c.labelName}</label>
                <input type="text" id="contact-name" name="name" required />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-email">{c.labelEmail}</label>
                <input type="email" id="contact-email" name="email" required />
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
                <Magnet padding={10} disabled={false} magnetStrength={2}>
                  <a href="https://www.youtube.com/@farnpatcharapon5393" onClick={(e) => handleOpenModal(e, 'YouTube', 'https://www.youtube.com/@farnpatcharapon5393')} className={styles.socialButton} aria-label="YouTube">
                    <YoutubeIcon className={styles.socialIcon} />
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
            </div>

            {submitStatus === 'success' && (
              <p className={styles.formStatus}>Message sent. Thank you!</p>
            )}
            {submitStatus === 'error' && (
              <p className={styles.formStatusError}>
                Could not send right now. Please try again later.
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
