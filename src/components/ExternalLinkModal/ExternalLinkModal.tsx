import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import lineQr from '../../assets/line-qr.jpg';
import styles from './ExternalLinkModal.module.css';

export type ExternalLinkType = 'Email' | 'LinkedIn' | 'GitHub' | 'Line' | 'Instagram' | 'Facebook';

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
      desc: 'A direct communication channel for work inquiries or further questions. This will automatically open your device\'s default email client.',
    },
    th: {
      title: 'ส่งอีเมล',
      desc: 'ช่องทางสำหรับติดต่อพูดคุยเรื่องงานหรือสอบถามรายละเอียดเพิ่มเติม โดยระบบจะเปิดแอปพลิเคชันอีเมลหลักในเครื่องของคุณเพื่อส่งข้อความหาผมโดยตรง',
    },
  },
  LinkedIn: {
    preview: '/previews/linkedin.png',
    en: {
      title: 'Visit LinkedIn',
      desc: 'A detailed view of my educational background, university activities, and a professional platform to connect and network within the industry.',
    },
    th: {
      title: 'เยี่ยมชม LinkedIn',
      desc: 'รวบรวมประวัติการศึกษา ประสบการณ์การทำกิจกรรมในมหาวิทยาลัย และช่องทางสำหรับเชื่อมต่อกับผู้คนหรือติดตามข่าวสารในสายอาชีพ',
    },
  },
  GitHub: {
    preview: '/previews/github.png',
    en: {
      title: 'Visit GitHub',
      desc: 'A repository of my source code and technical projects, ranging from university coursework assignments to personal coding practice and side projects.',
    },
    th: {
      title: 'เยี่ยมชม GitHub',
      desc: 'พื้นที่เก็บซอร์สโค้ดของโปรเจกต์ทั้งหมดที่ผมเคยพัฒนา ทั้งงานที่ทำส่งในรายวิชาต่างๆ ของมหาวิทยาลัยและโปรเจกต์ส่วนตัวที่ทำขึ้นเพื่อฝึกฝนทักษะ',
    },
  },
  Line: {
    preview: lineQr,
    en: {
      title: 'Add me on LINE',
      desc: 'Scan the QR code with LINE to contact me directly. This is the best channel for work inquiries and quick follow-ups.',
    },
    th: {
      title: 'เพิ่มเพื่อนทาง LINE',
      desc: 'สแกน QR Code ผ่านแอป LINE เพื่อติดต่อผมโดยตรง ช่องทางนี้เป็นช่องทางหลักสำหรับพูดคุยเรื่องงานและติดตามรายละเอียดต่าง ๆ',
    },
  },
  Instagram: {
    preview: '/previews/instagram.png',
    en: {
      title: 'Visit Instagram',
      desc: 'A collection of photos and videos from my daily life, including maintaining aquascapes, photography trips, and other personal leisure activities.',
    },
    th: {
      title: 'เยี่ยมชม Instagram',
      desc: 'รวมภาพถ่ายและวิดีโอจากชีวิตประจำวันของผม ไม่ว่าจะเป็นการดูแลตู้ไม้น้ำ การออกไปถ่ายภาพสถานที่ต่างๆ และกิจกรรมยามว่างอื่นๆ',
    },
  },
  Facebook: {
    preview: '/previews/facebook.png',
    en: {
      title: 'Visit Facebook',
      desc: 'My personal social media profile, primarily used for keeping up with general news, posting personal updates, and sharing casual day-to-day moments.',
    },
    th: {
      title: 'เยี่ยมชม Facebook',
      desc: 'หน้าโปรไฟล์โซเชียลมีเดียส่วนตัวของผม สำหรับใช้ติดตามข่าวสารทั่วไป อัปเดตความเคลื่อนไหว และแชร์เรื่องราวต่างๆ ในชีวิตประจำวัน',
    },
  },
};

const commonStrings = {
  en: {
    stay: 'Stay on this site',
    close: 'Close',
    downloadQr: 'Download QR',
    go: 'Go to link',
  },
  th: {
    stay: 'อยู่เว็บนี้ต่อ',
    close: 'ปิด',
    downloadQr: 'ดาวน์โหลด QR',
    go: 'ไปยังลิงก์',
  },
};

export default function ExternalLinkModal({ isOpen, onClose, link, type, lang }: ExternalLinkModalProps) {
  const c = contentData[type]?.[lang] || contentData[type]?.en;
  const common = commonStrings[lang];

  const [isMobile, setIsMobile] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusableSelector = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

    dialog?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  // Define animations based on device type
  const mobileAnimation = {
    initial: { y: '100vh' },
    animate: { y: 0 },
    exit: { y: '100vh' },
    transition: { type: 'spring' as const, bounce: 0.15, duration: 0.5 }
  };

  const desktopAnimation = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.2, ease: 'easeOut' as const }
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
            ref={dialogRef}
            className={`${styles.modal} ${type === 'Line' ? styles.lineModal : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="external-link-title"
            aria-describedby="external-link-description"
            tabIndex={-1}
            {...animationProps}
          >
            <div className={`${styles.previewCol} ${type === 'Line' ? styles.linePreview : ''}`}>
              <img
                src={contentData[type].preview}
                alt={type === 'Line' ? 'LINE QR code for Fran' : `${type} preview`}
                className={styles.previewImage}
              />
            </div>
            <div className={styles.contentCol}>
              <div className={styles.textContent}>
                <h3 id="external-link-title" className={styles.title}>{c.title}</h3>
                <p id="external-link-description" className={styles.desc}>{c.desc}</p>
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={onClose} className={styles.btnStay}>
                  {type === 'Line' ? common.close : common.stay}
                </button>
                {type === 'Line' && (
                  <a href={lineQr} download="fran-line-qr.jpg" className={styles.btnGo}>
                    {common.downloadQr}
                  </a>
                )}
                {type !== 'Line' && (
                  <a
                    href={link}
                    target={type === 'Email' ? '_self' : '_blank'}
                    rel="noreferrer"
                    className={styles.btnGo}
                    onClick={onClose}
                  >
                    {common.go}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
