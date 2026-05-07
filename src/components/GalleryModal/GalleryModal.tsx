import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './GalleryModal.module.css';

interface Props {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

function GalleryModal({ images, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <button className={styles.close} onClick={onClose} aria-label="Close gallery">✕</button>

      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.navBtn} onClick={prev} aria-label="Previous image">‹</button>

        <img
          src={images[index]}
          alt={`Screenshot ${index + 1}`}
          className={styles.image}
        />

        <button className={styles.navBtn} onClick={next} aria-label="Next image">›</button>
      </div>

      <span className={styles.counter}>{index + 1} / {images.length}</span>
    </div>,
    document.body,
  );
}

export default GalleryModal;
