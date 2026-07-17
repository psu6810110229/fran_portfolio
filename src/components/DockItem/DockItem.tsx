import React, { useRef } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'motion/react';

interface DockItemProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isDesktop: boolean;
  as?: 'div' | 'li' | 'a' | 'button';
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function DockItem({ mouseX, mouseY, isDesktop, as = 'div', children, className, href, onClick }: DockItemProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const ref = (element: HTMLElement | null) => {
    elementRef.current = element;
  };
  
  const distance = useTransform(() => {
    if (!isDesktop) return Infinity;
    const x = mouseX.get();
    const y = mouseY.get();
    if (x === Infinity || y === Infinity) return Infinity;
    
    const bounds = elementRef.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    const dx = x - (bounds.x + bounds.width / 2);
    const dy = y - (bounds.y + bounds.height / 2);
    return Math.sqrt(dx * dx + dy * dy);
  });

  const scaleSync = useTransform(distance, [0, 140], [1.15, 1], { clamp: true });
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 2025, damping: 45 });

  const props = {
    ref,
    style: { scale: isDesktop ? scale : 1, transformOrigin: 'bottom' },
    className,
    href,
    onClick
  };

  if (as === 'li') return <motion.li {...props}>{children}</motion.li>;
  if (as === 'a') return <motion.a {...props}>{children}</motion.a>;
  if (as === 'button') return <motion.button {...props}>{children}</motion.button>;
  return <motion.div {...props}>{children}</motion.div>;
}
