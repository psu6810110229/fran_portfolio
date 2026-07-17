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
            <motion.span
              aria-hidden="true"
              className={styles.staticWord}
              initial={prefersReducedMotion ? false : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
              FRAN
            </motion.span>
          </div>
          <span className={styles.progress} aria-hidden="true">{progress}%</span>
        </motion.div>
      )}
    </AnimatePresence>, document.body,
  );
};

export default ResumeSplash;
