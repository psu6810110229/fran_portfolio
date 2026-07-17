import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import type { TrackedRoute } from '../../hooks/useRouteSwitchNotice';
import styles from './RouteSwitchNotice.module.css';

interface RouteSwitchNoticeProps {
  isOpen: boolean;
  sourcePath: TrackedRoute | null;
  onClose: () => void;
  onReturn: () => void;
}

const RouteSwitchNotice = ({ isOpen, sourcePath, onClose, onReturn }: RouteSwitchNoticeProps) => {
  const { lang } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const isFromResume = sourcePath === '/resume';
  const copy = lang === 'th'
      ? isFromResume
      ? {
        eyebrow: 'หมายเหตุการนำทาง',
        title: 'กำลังมองหางานด้านสังคมอยู่ไหมครับ?',
        message: 'หากต้องการกลับไปดูต่อ กด “งานด้านสังคมอื่น ๆ” บนเมนูด้านบนครับ',
        returnLabel: 'กลับไปงานด้านสังคม',
        stayLabel: 'อยู่หน้านี้ต่อ',
      }
      : {
        eyebrow: 'หมายเหตุการนำทาง',
        title: 'กำลังมองหาพอร์ตโฟลิโออยู่ไหมครับ?',
        message: 'หากต้องการกลับไปดูต่อ กด “พอร์ตโฟลิโอ” บนเมนูด้านบนครับ',
        returnLabel: 'กลับไปพอร์ตโฟลิโอ',
        stayLabel: 'อยู่หน้านี้ต่อ',
      }
    : isFromResume
      ? {
        eyebrow: 'Navigation note',
        title: 'Looking for community work?',
        message: 'Return with “Community work” in the top navigation.',
        returnLabel: 'Back to community work',
        stayLabel: 'Stay here',
      }
      : {
        eyebrow: 'Navigation note',
        title: 'Looking for the portfolio?',
        message: 'Return with “Back to Portfolio” in the top navigation.',
        returnLabel: 'Back to portfolio',
        stayLabel: 'Stay here',
      };

  return (
    <AnimatePresence initial={false}>
      {isOpen && sourcePath && (
        <motion.aside
          key={sourcePath}
          className={styles.notice}
          role="status"
          aria-live="polite"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.header}>
            <button type="button" className={styles.closeButton} onClick={onClose} aria-label={lang === 'th' ? 'ปิดการแจ้งเตือน' : 'Close notification'}>
              ×
            </button>
          </div>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.message}>{copy.message}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.returnButton} onClick={onReturn}>{copy.returnLabel}</button>
            <button type="button" className={styles.stayButton} onClick={onClose}>{copy.stayLabel}</button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default RouteSwitchNotice;
