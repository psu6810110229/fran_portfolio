import { useCallback, useLayoutEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import styles from './ScrollStack.module.css';

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  disabled?: boolean;
  onStackComplete?: () => void;
}

export function ScrollStackItem({ children, itemClassName = '' }: ScrollStackItemProps) {
  return (
    <div className={`${styles.scrollStackCard} ${itemClassName}`.trim()} data-scroll-stack-card="true">
      {children}
    </div>
  );
}

function ScrollStack({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  disabled = false,
  onStackComplete,
}: ScrollStackProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  const cardHeightsRef = useRef<number[]>([]);
  const endTopRef = useRef(0);

  const parseOffset = useCallback((value: string, height: number) => (
    value.includes('%') ? (parseFloat(value) / 100) * height : parseFloat(value)
  ), []);

  const getProgress = useCallback((value: number, start: number, end: number) => (
    Math.min(Math.max((value - start) / (end - start), 0), 1)
  ), []);

  const getElementOffset = useCallback((element: HTMLElement) => {
    if (!useWindowScroll) return element.offsetTop;

    let top = 0;
    let current: HTMLElement | null = element;
    while (current) {
      top += current.offsetTop;
      current = current.offsetParent as HTMLElement | null;
    }
    return top;
  }, [useWindowScroll]);

  const measureElements = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    cardsRef.current = Array.from(scroller.querySelectorAll<HTMLElement>('[data-scroll-stack-card="true"]'));
    cardTopsRef.current = cardsRef.current.map((card) => getElementOffset(card));
    cardHeightsRef.current = cardsRef.current.map((card) => card.offsetHeight);
    const endElement = scroller.querySelector<HTMLElement>('[data-scroll-stack-end="true"]');
    endTopRef.current = endElement ? getElementOffset(endElement) : 0;
  }, [getElementOffset]);

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || disabled) return;

    const scrollTop = useWindowScroll ? window.scrollY : scroller.scrollTop;
    const containerHeight = useWindowScroll ? window.innerHeight : scroller.clientHeight;
    const stackPositionPx = parseOffset(stackPosition, containerHeight);
    const scaleEndPositionPx = parseOffset(scaleEndPosition, containerHeight);
    const endTop = endTopRef.current;

    cardsRef.current.forEach((card, index) => {
      const cardTop = cardTopsRef.current[index] ?? getElementOffset(card);
      const cardHeight = cardHeightsRef.current[index] ?? card.offsetHeight;
      const triggerStart = cardTop - stackPositionPx;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const progress = getProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + index * itemScale;
      const scale = targetScale;
      const scaledCardHeight = cardHeight * scale;

      const nextCardTop = cardTopsRef.current[index + 1];
      const nextTriggerStart = nextCardTop === undefined
        ? null
        : nextCardTop - stackPositionPx - itemStackDistance * (index + 1);

      // Pin each card until the next card is ~90% onto the screen, or until the end of the stack for the last card
      const pinEnd = nextTriggerStart === null
        ? endTop - stackPositionPx - scaledCardHeight - 24
        : nextTriggerStart - containerHeight * 0.10;

      const rotation = rotationAmount ? index * rotationAmount * progress : 0;
      const translateY = scrollTop >= triggerStart
        ? Math.min(scrollTop, pinEnd) - cardTop + stackPositionPx
        : 0;

      // Calculate dynamic gradient mask and opacity to fade out the overlapped bottom section of the card
      let opacity = 1;
      if (nextTriggerStart !== null) {
        const relativeY = nextTriggerStart - scrollTop;
        const percent = cardHeight > 0 ? relativeY / cardHeight : 1;

        if (percent < 1.0) {
          // Calculate linear-gradient mask bounds tracking Card 1's top edge exactly
          // Rounded to 1 decimal place to prevent subpixel rasterization jitter on slow scrolling
          const maskStart = Math.max(0, percent * 100).toFixed(1);
          const maskEnd = Math.min(100, percent * 100 + 20).toFixed(1);
          const maskVal = `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${maskStart}%, rgba(0,0,0,0) ${maskEnd}%)`;
          card.style.maskImage = maskVal;
          card.style.webkitMaskImage = maskVal;

          // Fade out the remaining top portion as it unpins
          if (percent <= 0.1) {
            opacity = Math.max(0, percent / 0.1);
          }
        } else {
          card.style.maskImage = '';
          card.style.webkitMaskImage = '';
        }
      } else {
        card.style.maskImage = '';
        card.style.webkitMaskImage = '';
      }

      const blur = blurAmount && progress === 1 ? index * blurAmount : 0;

      // Calculate buffer scroll progress to drive subtle interactive UI cues inside the card
      if (nextTriggerStart !== null) {
        const bufferProgress = getProgress(scrollTop, triggerStart, nextTriggerStart);
        card.style.setProperty('--buffer-progress', String(bufferProgress));
      } else {
        card.style.setProperty('--buffer-progress', '1');
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      card.style.opacity = String(opacity);
      card.style.filter = blur ? `blur(${blur}px)` : '';
      card.style.pointerEvents = opacity < 0.05 ? 'none' : '';

      if (index === cardsRef.current.length - 1 && scrollTop >= triggerStart && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      }
    });
  }, [
    baseScale,
    blurAmount,
    disabled,
    getElementOffset,
    getProgress,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parseOffset,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || disabled) return undefined;

    measureElements();
    cardsRef.current.forEach((card, index) => {
      card.style.marginBottom = index < cardsRef.current.length - 1 ? `${itemDistance}px` : '0';
      card.style.transformOrigin = 'top center';
    });
    measureElements();

    if (useWindowScroll) {
      const handleScroll = () => {
        updateCardTransforms();
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', measureElements);
      updateCardTransforms();

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', measureElements);
        cardsRef.current.forEach((card) => {
          card.style.marginBottom = '';
          card.style.transform = '';
          card.style.opacity = '';
          card.style.filter = '';
          card.style.pointerEvents = '';
          card.style.transformOrigin = '';
          card.style.maskImage = '';
          card.style.webkitMaskImage = '';
        });
        stackCompletedRef.current = false;
        cardsRef.current = [];
        cardTopsRef.current = [];
      };
    }

    const lenis = new Lenis({ wrapper: scroller, content: scroller.firstElementChild as HTMLElement });
    lenis.on('scroll', updateCardTransforms);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenisRef.current?.destroy();
      cardsRef.current.forEach((card) => {
        card.style.marginBottom = '';
        card.style.transform = '';
        card.style.opacity = '';
        card.style.filter = '';
        card.style.pointerEvents = '';
        card.style.transformOrigin = '';
        card.style.maskImage = '';
        card.style.webkitMaskImage = '';
      });
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardTopsRef.current = [];
    };
  }, [disabled, itemDistance, measureElements, updateCardTransforms, useWindowScroll]);

  return (
    <div className={`${styles.scrollStackScroller} ${className}`.trim()} ref={scrollerRef}>
      <div className={styles.scrollStackInner}>
        {children}
        <div className={styles.scrollStackEnd} data-scroll-stack-end="true" />
      </div>
    </div>
  );
}

export default ScrollStack;
