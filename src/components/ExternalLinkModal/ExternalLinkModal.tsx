import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExternalLinkModal.module.css';

export type ExternalLinkType = 'Email' | 'LinkedIn' | 'GitHub';

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
      title: 'ไปยัง LinkedIn',
      desc: 'คุณกำลังจะเปิดดูโปรไฟล์การทำงานของผมบน LinkedIn',
    },
  },
  GitHub: {
    preview: 'https://placehold.co/600x400/1c1916/d4651a?text=GitHub+Preview',
    en: {
      title: 'Explore GitHub',
      desc: 'You are about to see my code repositories and projects on GitHub.',
    },
    th: {
      title: 'สำรวจ GitHub',
      desc: 'คุณกำลังจะเข้าไปดูโค้ดและโปรเจกต์ต่างๆ ของผมบน GitHub',
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
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
