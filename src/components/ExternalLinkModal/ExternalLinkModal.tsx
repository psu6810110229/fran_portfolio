import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExternalLinkModal.module.css';

export type ExternalLinkType = 'Email' | 'LinkedIn' | 'GitHub' | 'YouTube' | 'Instagram' | 'Facebook';

interface ExternalLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: string;
  type: ExternalLinkType;
  lang: 'en' | 'th';
}

const contentData = {
  Email: {
    preview: '/previews/email.png',
    en: {
      title: 'Send an Email',
      desc: 'Send me a direct email via your default email client.',
    },
    th: {
      title: 'ส่งอีเมล',
      desc: 'ส่งอีเมลส่วนตัวถึงผมโดยตรง',
    },
  },
  LinkedIn: {
    preview: '/previews/linkedin.png',
    en: {
      title: 'Visit LinkedIn',
      desc: 'My professional network, education, and career updates.',
    },
    th: {
      title: 'เยี่ยมชม LinkedIn',
      desc: 'ประวัติการศึกษาและคอนเนคชั่นในสายอาชีพ',
    },
  },
  GitHub: {
    preview: '/previews/github.png',
    en: {
      title: 'Visit GitHub',
      desc: 'Source code, repositories, and my development projects.',
    },
    th: {
      title: 'เยี่ยมชม GitHub',
      desc: 'รวมซอร์สโค้ดและโปรเจกต์ต่างๆ ที่ผมเคยเขียน',
    },
  },
  YouTube: {
    preview: '/previews/youtube.png',
    en: {
      title: 'Visit YouTube',
      desc: 'Videos of my past projects and video editing work.',
    },
    th: {
      title: 'เยี่ยมชม YouTube',
      desc: 'วิดีโอโปรเจกต์และผลงานตัดต่อที่ผ่านมา',
    },
  },
  Instagram: {
    preview: '/previews/instagram.png',
    en: {
      title: 'Visit Instagram',
      desc: 'Photos of my daily life, cats, aquascaping, and photography.',
    },
    th: {
      title: 'เยี่ยมชม Instagram',
      desc: 'รวมภาพถ่ายงานอดิเรก การจัดตู้ไม้น้ำ และชีวิตประจำวันทั่วไป',
    },
  },
  Facebook: {
    preview: '/previews/facebook.png',
    en: {
      title: 'Visit Facebook',
      desc: 'My personal profile for casual updates and networking.',
    },
    th: {
      title: 'เยี่ยมชม Facebook',
      desc: 'หน้าโปรไฟล์ส่วนตัวสำหรับติดตามข่าวสารและพูดคุยทั่วไป',
    },
  },
};

const commonStrings = {
  en: {
    stay: 'Stay on this site',
    go: 'Go to link',
  },
  th: {
    stay: 'อยู่เว็บนี้ต่อ',
    go: 'ไปยังลิงก์',
  },
};

export default function ExternalLinkModal({ isOpen, onClose, link, type, lang }: ExternalLinkModalProps) {
  const c = contentData[type]?.[lang] || contentData[type]?.en;
  const common = commonStrings[lang];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Define animations based on device type
  const mobileAnimation = {
    initial: { y: '100vh' },
    animate: { y: 0 },
    exit: { y: '100vh' },
    transition: { type: 'spring', bounce: 0.15, duration: 0.5 }
  };

  const desktopAnimation = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.2, ease: 'easeOut' }
  };

  const animationProps = isMobile ? mobileAnimation : desktopAnimation;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={styles.modal}
            {...animationProps}
          >
            <div className={styles.previewCol}>
              <img src={contentData[type].preview} alt={`${type} preview`} className={styles.previewImage} />
            </div>
            <div className={styles.contentCol}>
              <div className={styles.textContent}>
                <h3 className={styles.title}>{c.title}</h3>
                <p className={styles.desc}>{c.desc}</p>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={onClose} className={styles.btnStay}>
                  {common.stay}
                </button>
                <a 
                  href={link} 
                  target={type === 'Email' ? '_self' : '_blank'} 
                  rel="noreferrer" 
                  className={styles.btnGo}
                  onClick={onClose}
                >
                  {common.go}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
