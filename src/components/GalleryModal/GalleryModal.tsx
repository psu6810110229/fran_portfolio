import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './GalleryModal.module.css';

interface Props {
  images: string[];
  video?: string;
  initialIndex: number;
  onClose: () => void;
}

function GalleryModal({ images, video, initialIndex, onClose }: Props) {
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
    <div
      className={styles.overlay}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <button className={styles.close} onClick={onClose} aria-label="Close gallery">✕</button>

      <span className={styles.counter}>{index + 1} / {total}</span>

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prev} aria-label="Previous">‹</button>

        {isVideoSlide ? (
          <video
            key="gallery-video"
            src={video}
            className={styles.video}
            controls
            autoPlay
            muted
            playsInline
          />
        ) : (
          <img
            key={imgSrc}
            src={imgSrc}
            alt={`Screenshot ${index + 1}`}
            className={styles.image}
          />
        )}

        <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next} aria-label="Next">›</button>
      </div>

      <span className={styles.swipeHint} aria-hidden="true">swipe to navigate</span>
    </div>,
    document.body,
  );
}

export default GalleryModal;
