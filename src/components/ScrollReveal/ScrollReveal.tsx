import React, { useEffect, useRef, useMemo, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollReveal.module.css';

gsap.registerPlugin(ScrollTrigger);

interface TextSegment {
  text: string;
  className?: string;
}

interface ScrollRevealProps {
  children?: ReactNode;
  segments?: TextSegment[];
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  segments,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom 50%',
  wordAnimationEnd = 'bottom 50%'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    const processSegments: TextSegment[] = segments || [{ text: typeof children === 'string' ? children : '' }];
    
    let elementIndex = 0;
    return processSegments.map((seg) => {
      // Use Intl.Segmenter to properly split words for Thai and other languages
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
        const intlSegments = Array.from(segmenter.segment(seg.text));
        return intlSegments.map((wordSeg) => {
          const key = elementIndex++;
          if (wordSeg.segment.match(/^\s+$/)) return <span key={key}>{wordSeg.segment}</span>;
          return (
            <span className={`${styles.word} ${seg.className || ''}`.trim()} key={key}>
              {wordSeg.segment}
            </span>
          );
        });
      }

      // Fallback for older browsers
      return seg.text.split(/(\s+)/).map((word) => {
        const key = elementIndex++;
        if (word.match(/^\s+$/)) return <span key={key}>{word}</span>;
        return (
          <span className={`${styles.word} ${seg.className || ''}`.trim()} key={key}>
            {word}
          </span>
        );
      });
    });
  }, [children, segments]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth >= 768;
    const startPoint = isDesktop ? 'top 100%' : 'top 90%';
    const endPoint = isDesktop ? 'bottom 85%' : 'bottom 75%';

    const wordElements = el.querySelectorAll(`.${styles.word}`);

    if (reduce) {
      gsap.set(el, { clearProps: 'all' });
      gsap.set(wordElements, { opacity: 1, filter: 'none', clearProps: 'willChange' });
      return;
    }

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: startPoint,
          end: rotationEnd === 'bottom 50%' ? endPoint : rotationEnd,
          scrub: true
        }
      }
    );

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: startPoint,
          end: wordAnimationEnd === 'bottom 50%' ? endPoint : wordAnimationEnd,
          scrub: true
        }
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: startPoint,
            end: wordAnimationEnd === 'bottom 50%' ? endPoint : wordAnimationEnd,
            scrub: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`${styles.scrollReveal} ${containerClassName}`}>
      <p className={`${styles.scrollRevealText} ${textClassName}`}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
