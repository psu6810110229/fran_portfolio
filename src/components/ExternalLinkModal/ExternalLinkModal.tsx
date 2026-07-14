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
  YouTube: {
    preview: '/previews/youtube.png',
    en: {
      title: 'Visit YouTube',
      desc: 'A channel dedicated to my video content, featuring showcases of my past collaborative projects along with various video editing works.',
    },
    th: {
      title: 'เยี่ยมชม YouTube',
      desc: 'ช่องสำหรับรวบรวมผลงานในรูปแบบวิดีโอ ซึ่งมีทั้งคลิปวิดีโอโปรเจกต์ต่างๆ ที่ผมเคยร่วมทำ และผลงานการตัดต่อวิดีโออื่นๆ ที่ผ่านมา',
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
