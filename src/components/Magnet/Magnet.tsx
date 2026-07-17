import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Magnet.module.css';

interface MagnetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

const joinClasses = (...classNames: string[]) => classNames.filter(Boolean).join(' ');

function Magnet({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  className = '',
  ...props
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const resetPosition = () => {
      if (!innerRef.current) return;

      innerRef.current.style.transform = 'translate3d(0px, 0px, 0)';
      innerRef.current.style.transition = inactiveTransition;
    };

    if (disabled || prefersReducedMotion) {
      resetPosition();
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!wrapperRef.current || !innerRef.current) return;

      const { left, top, width, height } = wrapperRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - event.clientX);
      const distY = Math.abs(centerY - event.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        const offsetX = (event.clientX - centerX) / magnetStrength;
        const offsetY = (event.clientY - centerY) / magnetStrength;

        innerRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        innerRef.current.style.transition = activeTransition;
        return;
      }

      resetPosition();
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeTransition, disabled, inactiveTransition, magnetStrength, padding, prefersReducedMotion]);

  return (
    <div
      {...props}
      ref={wrapperRef}
      className={joinClasses(styles.wrapper, wrapperClassName, className)}
    >
      <div ref={innerRef} className={joinClasses(styles.inner, innerClassName)}>
        {children}
      </div>
    </div>
  );
}

export default Magnet;
