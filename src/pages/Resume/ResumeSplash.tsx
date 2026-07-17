import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import styles from './ResumeSplash.module.css';

interface ResumeSplashProps {
  isVisible: boolean;
  progress: number;
  prefersReducedMotion: boolean;
  onExitComplete: () => void;
}

const fragments = [
  { x: -92, y: -58 }, { x: 76, y: -48 }, { x: -110, y: 8 },
  { x: 104, y: 14 }, { x: -72, y: 70 }, { x: 88, y: 66 },
];

const ResumeSplash = ({ isVisible, progress, prefersReducedMotion, onExitComplete }: ResumeSplashProps) => {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('#root');
    const previousOverflow = document.body.style.overflow;
    const wasInert = root?.inert ?? false;
    if (root) root.inert = true;
    document.body.style.overflow = 'hidden';
    return () => {
      if (root) root.inert = wasInert;
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return createPortal(
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div className={styles.overlay} initial={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.46, ease: [0.22, 1, 0.36, 1] }}>
          <span className={styles.status} role="status">Loading Fran&apos;s resume</span>
          <div className={styles.word} aria-label="FRAN">
            {prefersReducedMotion ? <span className={styles.staticWord}>FRAN</span> : fragments.map((offset, index) => (
              <motion.span key={index} aria-hidden="true" className={styles.fragment}
                initial={{ x: offset.x, y: offset.y, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }}
                exit={{
                  x: offset.x,
                  y: offset.y,
                  opacity: 0,
                  transition: { duration: 0.46, delay: index * 0.02, ease: [0.22, 1, 0.36, 1] },
                }}
                transition={{ duration: 1.2, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}>
                FRAN
              </motion.span>
            ))}
          </div>
          <span className={styles.progress} aria-hidden="true">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>, document.body,
  );
};

export default ResumeSplash;
