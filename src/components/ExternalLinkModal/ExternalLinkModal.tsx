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
    preview: 'https://placehold.co/600x400/1c1916/d4651a?text=Email+Preview',
    en: {
      title: 'Send an Email',
      desc: 'You are about to open your default email client to send an email.',
    },
    th: {
      title: 'ส่งอีเมล',
      desc: 'คุณกำลังจะเปิดโปรแกรมอีเมลของคุณเพื่อส่งข้อความ',
    },
  },
  LinkedIn: {
    preview: 'https://placehold.co/600x400/1c1916/d4651a?text=LinkedIn+Preview',
    en: {
      title: 'Visit LinkedIn',
      desc: 'You are about to view my professional profile on LinkedIn.',
    },
    th: {
      title: 'เยี่ยมชม LinkedIn',
      desc: 'คุณกำลังจะเข้าไปดูโปรไฟล์การทำงานของผมบน LinkedIn',
    },
  },
  GitHub: {
    preview: 'https://placehold.co/600x400/1c1916/d4651a?text=GitHub+Preview',
    en: {
      title: 'Visit GitHub',
      desc: 'You are about to explore my open-source projects and code.',
    },
    th: {
      title: 'เยี่ยมชม GitHub',
      desc: 'คุณกำลังจะเข้าไปดูโค้ดและโปรเจกต์โอเพนซอร์ซของผม',
    },
  },
  YouTube: {
    preview: 'https://placehold.co/600x400/1c1916/d4651a?text=YouTube+Preview',
    en: {
      title: 'Visit YouTube',
      desc: 'You are about to view my YouTube channel.',
    },
    th: {
      title: 'เยี่ยมชม YouTube',
      desc: 'คุณกำลังจะเข้าไปดูช่อง YouTube ของผม',
    },
  },
  Instagram: {
    preview: 'https://placehold.co/600x400/1c1916/d4651a?text=Instagram+Preview',
    en: {
      title: 'Visit Instagram',
      desc: 'You are about to view my Instagram profile.',
    },
    th: {
      title: 'เยี่ยมชม Instagram',
      desc: 'คุณกำลังจะเข้าไปดูโปรไฟล์ Instagram ของผม',
    },
  },
  Facebook: {
    preview: 'https://placehold.co/600x400/1c1916/d4651a?text=Facebook+Preview',
    en: {
      title: 'Visit Facebook',
      desc: 'You are about to view my Facebook profile.',
    },
    th: {
      title: 'เยี่ยมชม Facebook',
      desc: 'คุณกำลังจะเข้าไปดูโปรไฟล์ Facebook ของผม',
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
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
