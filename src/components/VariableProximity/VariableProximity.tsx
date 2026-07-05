import { forwardRef, useEffect, useMemo, useRef } from 'react';
import type { MouseEventHandler, RefObject } from 'react';
import { motion } from 'motion/react';
import styles from './VariableProximity.module.css';

type Falloff = 'linear' | 'exponential' | 'gaussian';

interface FontVariationAxis {
  axis: string;
  fromValue: number;
  toValue: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface IndexedWord {
  word: string;
  letters: Array<{
    letter: string;
    index: number;
  }>;
}

interface VariableProximityProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef?: RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: Falloff;
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let frameId = 0;

    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef?: RefObject<HTMLElement | null>) {
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
        return;
      }

      positionRef.current = { x, y };
    };

    const handleMouseMove = (event: MouseEvent) => updatePosition(event.clientX, event.clientY);
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

const parseSettings = (settings: string) =>
  new Map(
    settings
      .split(',')
      .map((setting) => setting.trim())
      .map((setting) => {
        const [name, value] = setting.split(' ');
        return [name.replace(/['"]/g, ''), Number.parseFloat(value)];
      }),
  );

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  (
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = 'linear',
      className = '',
      onClick,
    },
    ref,
  ) => {
    const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    const parsedSettings = useMemo<FontVariationAxis[]>(() => {
      const fromSettings = parseSettings(fromFontVariationSettings);
      const toSettings = parseSettings(toFontVariationSettings);

      return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
        axis,
        fromValue,
        toValue: toSettings.get(axis) ?? fromValue,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calculateFalloff = (distance: number) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);

      if (falloff === 'exponential') {
        return norm ** 2;
      }

      if (falloff === 'gaussian') {
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      }

      return norm;
    };

    useAnimationFrame(() => {
      if (!containerRef?.current) {
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const { x, y } = mousePositionRef.current;

      if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
        return;
      }

      lastPositionRef.current = { x, y };

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) {
          return;
        }

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
        const distance = calculateDistance(x, y, letterCenterX, letterCenterY);

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }

        const falloffValue = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(', ');

        interpolatedSettingsRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      });
    });

    const indexedWords = useMemo<IndexedWord[]>(() => {
      const words = label.split(' ');

      return words.map((word, wordIndex) => {
        const offset = words.slice(0, wordIndex).reduce((sum, previousWord) => sum + previousWord.length, 0);

        return {
          word,
          letters: word.split('').map((letter, index) => ({
            letter,
            index: offset + index,
          })),
        };
      });
    }, [label]);

    return (
      <span ref={ref} className={`${className} ${styles.variableProximity}`} onClick={onClick}>
        {indexedWords.map((word, wordIndex) => (
          <span key={`${word.word}-${wordIndex}`} className={styles.word}>
            {word.letters.map(({ letter, index }) => (
              <motion.span
                key={index}
                ref={(el) => {
                  letterRefs.current[index] = el;
                }}
                className={styles.letter}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            ))}
            {wordIndex < indexedWords.length - 1 && <span className={styles.space}>&nbsp;</span>}
          </span>
        ))}
        <span className={styles.srOnly}>{label}</span>
      </span>
    );
  },
);

VariableProximity.displayName = 'VariableProximity';

export default VariableProximity;
