import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import styles from './WordsPullUp.module.css';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

const WordsPullUp: React.FC<WordsPullUpProps> = ({ text, className = '', showAsterisk = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.16, 1, 0.3, 1] as any, duration: 0.8 },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`${styles.container} ${className}`}
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        if (showAsterisk && isLastWord) {
          const letters = word.split('');
          return (
            <motion.span
              key={i}
              variants={wordVariants}
              className={styles.wordWithAsterisk}
            >
              {letters.map((char, charIdx) => {
                const isFinalN = charIdx === letters.length - 1 && char.toLowerCase() === 'n';
                return (
                  <span key={charIdx} className={styles.relativeChar}>
                    {char}
                    {isFinalN && (
                      <span className={styles.asterisk}>*</span>
                    )}
                  </span>
                );
              })}
            </motion.span>
          );
        }

        return (
          <motion.span key={i} variants={wordVariants} className={styles.word}>
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default WordsPullUp;
