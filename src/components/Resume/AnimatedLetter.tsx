import React from 'react';
import { motion, useTransform, MotionValue } from 'motion/react';

interface AnimatedLetterProps {
  children: React.ReactNode;
  progress: MotionValue<number>;
  charProgress: number;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ children, progress, charProgress }) => {
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  );
};

export default AnimatedLetter;
