import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../hooks/useLanguage';
import styles from './GalleryModal.module.css';

const labels = {
  en: { close: 'Close gallery', prev: 'Previous', next: 'Next', swipe: 'swipe to navigate', screenshot: 'Screenshot', gallery: 'Image gallery' },
  th: { close: 'ปิดแกลเลอรี', prev: 'ก่อนหน้า', next: 'ถัดไป', swipe: 'ปัดเพื่อเลื่อนดู', screenshot: 'ภาพหน้าจอ', gallery: 'แกลเลอรีรูปภาพ' },
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
  const overlayRef = useRef<HTMLDivElement>(null);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // Scroll lock + initial focus + focus restore.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    overlayRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      prevFocus?.focus();
    };
  }, []);

  // Escape / arrow keys + Tab focus trap.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     { onClose(); return; }
      if (e.key === 'ArrowLeft')  { prev(); return; }
      if (e.key === 'ArrowRight') { next(); return; }
      const root = overlayRef.current;
      if (e.key !== 'Tab' || !root) return;
      const focusable = root.querySelectorAll<HTMLElement>('button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

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
      ref={overlayRef}
      className={styles.overlay}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-lenis-prevent="true"
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
