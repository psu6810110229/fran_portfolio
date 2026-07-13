import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

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
      className={`tw-inline-flex tw-flex-wrap ${className}`}
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        if (showAsterisk && isLastWord) {
          // Find the last 'n' to put the asterisk on. For "Patcharapon" it's the last character.
          const letters = word.split('');
          return (
            <motion.span
              key={i}
              variants={wordVariants}
              className="tw-inline-block tw-mr-[0.25em]"
              style={{ paddingRight: '0.1em' }}
            >
              {letters.map((char, charIdx) => {
                const isFinalN = charIdx === letters.length - 1 && char.toLowerCase() === 'n';
                return (
                  <span key={charIdx} className="tw-relative">
                    {char}
                    {isFinalN && (
                      <span className="tw-absolute tw-top-[0.65em] tw--right-[0.3em] tw-text-[0.31em]">
                        *
                      </span>
                    )}
                  </span>
                );
              })}
            </motion.span>
          );
        }

        return (
          <motion.span key={i} variants={wordVariants} className="tw-inline-block tw-mr-[0.25em]">
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default WordsPullUp;
