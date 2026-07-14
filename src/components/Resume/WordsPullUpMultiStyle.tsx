import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import styles from './WordsPullUpMultiStyle.module.css';

interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  containerClassName?: string;
}

const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({ segments, containerClassName = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

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
      transition: { ease: [0.16, 1, 0.3, 1] as const, duration: 0.8 },
    },
  };

  const wordsWithStyles = segments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({ word, className: segment.className || '' }))
  );

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`${styles.container} ${containerClassName}`}
    >
      {wordsWithStyles.map((item, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className={`${styles.word} ${item.className}`}
        >
          {item.word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default WordsPullUpMultiStyle;
