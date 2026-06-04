import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import styles from './GalleryModal.module.css';

const labels = {
  en: { close: 'Close gallery', prev: 'Previous', next: 'Next', swipe: 'swipe to navigate', screenshot: 'Screenshot' },
  th: { close: 'ปิดแกลเลอรี', prev: 'ก่อนหน้า', next: 'ถัดไป', swipe: 'ปัดเพื่อเลื่อนดู', screenshot: 'ภาพหน้าจอ' },
};

interface Props {
  images: string[];
  video?: string;
  initialIndex: number;
  onClose: () => void;
}

function GalleryModal({ images, video, initialIndex, onClose }: Props) {
  const { lang } = useLanguage();
  const t = labels[lang];
  const total = (video ? 1 : 0) + images.length;
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const isVideoSlide = video && index === 0;
  const imgSrc = video ? images[index - 1] : images[index];

  return createPortal(
    <motion.div
      className={styles.overlay}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button className={styles.close} onClick={onClose} aria-label={t.close}>✕</button>

      <span className={styles.counter}>{index + 1} / {total}</span>

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prev} aria-label={t.prev}>‹</button>

        <AnimatePresence mode="wait">
          {isVideoSlide ? (
            <motion.video
              key="gallery-video"
              src={video}
              className={styles.video}
              controls
              autoPlay
              muted
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
          ) : (
            <motion.img
              key={imgSrc}
              src={imgSrc}
              alt={`${t.screenshot} ${index + 1}`}
              className={styles.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
          )}
        </AnimatePresence>

        <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next} aria-label={t.next}>›</button>
      </div>

      <span className={styles.swipeHint} aria-hidden="true">{t.swipe}</span>
    </motion.div>,
    document.body,
  );
}

export default GalleryModal;
