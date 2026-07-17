import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useSpring, useTransform } from 'motion/react';
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

  const springProgress = useSpring(0, { stiffness: 50, damping: 16, restDelta: 0.5 });
  
  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  const progressText = useTransform(springProgress, (latest) => `${Math.round(latest)}%`);

  return createPortal(
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div 
          className={styles.overlay} 
          initial={{ clipPath: 'inset(0% 0 0% 0)' }}
          exit={prefersReducedMotion ? { opacity: 0 } : { clipPath: 'inset(0% 0 100% 0)' }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className={styles.status} role="status">Loading Fran&apos;s resume</span>
          <div className={styles.word} aria-label="FRAN">
            <motion.span
              aria-hidden="true"
              className={styles.staticWord}
              initial={prefersReducedMotion ? false : { y: 20, opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { y: -40, opacity: 0, scale: 1.05, filter: 'blur(12px)' }}
              transition={prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              FRAN
            </motion.span>
          </div>
          <motion.span 
            className={styles.progress} 
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {progressText}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>, 
    document.body
  );
};

export default ResumeSplash;
