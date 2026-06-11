import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from 'motion/react';
import TechBadge from '../TechBadge/TechBadge';
import { useLanguage } from '../../hooks/useLanguage';
import type { Localized } from '../../types';
import githubIcon from '../../assets/icons/github.svg';
import styles from './MobileCaseDeck.module.css';

const ui = {
  en: {
    overview: 'Overview',
    underHood: 'Under the hood',
    screens: 'Real screens',
    photos: 'photos',
    videoTag: 'video',
    github: 'View the code',
    readCase: 'Read the full case',
    preview: 'Open project preview',
    screenshot: 'screenshot',
    swipeHint: 'Swipe for more',
    card: 'Card',
    of: 'of',
  },
  th: {
    overview: 'ภาพรวม',
    underHood: 'เบื้องหลังการสร้าง',
    screens: 'หน้าจอจริง',
    photos: 'ภาพ',
    videoTag: 'วิดีโอ',
    github: 'ดูโค้ด',
    readCase: 'อ่านเคสเต็ม',
    preview: 'ดูตัวอย่างโปรเจกต์',
    screenshot: 'ภาพหน้าจอ',
    swipeHint: 'ปัดดูใบถัดไป',
    card: 'การ์ดที่',
    of: 'จาก',
  },
};

export interface DeckFact {
  label: Localized;
  value: Localized;
}

export interface DeckStat {
  number: string;
  label: Localized;
}

export interface DeckShot {
  label: Localized;
  src: string;
  galleryIndex: number;
}

interface MobileCaseDeckProps {
  projectTitle: string;
  githubUrl: string;
  galleryCount: number;
  hasVideo: boolean;
  hero: string;
  heading: Localized;
  tagline: Localized;
  meta: Localized;
  roleLabel: Localized;
  roleTitle: Localized;
  rolePoints: Localized[];
  roleFacts: DeckFact[];
  stats: DeckStat[];
  techs: string[];
  primaryTechs: Set<string>;
  shot: DeckShot;
  onOpenGallery: () => void;
  onOpenImage: (galleryIndex: number) => void;
  onOpenCase: () => void;
}

const L = (value: Localized, lang: 'en' | 'th') => value[lang];

/* Resting pose per stack slot: the front card sits flat, the two behind it
   shrink and drop a little so their bottom edges peek out under the front. */
const stackSlots = [
  { y: 0, scale: 1, opacity: 1 },
  { y: 18, scale: 0.96, opacity: 1 },
  { y: 34, scale: 0.92, opacity: 1 },
];

const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 520;
const SWIPE_INTENT_DISTANCE = 14;
const SWIPE_HINT_STORAGE_KEY = 'franPortfolio.mobileCaseDeckHintDismissed';
const SWIPE_HINT_EVENT = 'mobileCaseDeckHintDismissed';

const getHintDismissed = () => {
  try {
    return window.sessionStorage.getItem(SWIPE_HINT_STORAGE_KEY) === 'true';
  } catch {
    return true;
  }
};

const setHintDismissed = () => {
  try {
    window.sessionStorage.setItem(SWIPE_HINT_STORAGE_KEY, 'true');
  } catch {
    // The hint is decorative, so blocked storage should only stop the loop.
  }
  window.dispatchEvent(new Event(SWIPE_HINT_EVENT));
};

const wait = (duration: number) => new Promise<void>((resolve) => {
  window.setTimeout(resolve, duration);
});

interface DeckCardProps {
  position: number;
  ariaLabel: string;
  reduced: boolean;
  hintActive: boolean;
  onSwipe: () => void;
  onHintIntent: () => void;
  onHintCycle: () => void;
  className: string;
  children: ReactNode;
}

function DeckCard({
  position,
  ariaLabel,
  reduced,
  hintActive,
  onSwipe,
  onHintIntent,
  onHintCycle,
  className,
  children,
}: DeckCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-280, 280], [-7, 7]);
  const [leaving, setLeaving] = useState(false);
  const isFront = position === 0;

  useEffect(() => {
    if (!isFront || !hintActive || reduced || leaving) return;

    let cancelled = false;
    let controls: ReturnType<typeof animate> | null = null;

    const playHint = async () => {
      await wait(520);
      while (!cancelled) {
        controls = animate(x, 34, { duration: 0.48, ease: [0.22, 1, 0.36, 1] });
        await controls;
        if (cancelled) break;

        controls = animate(x, 0, { type: 'spring', stiffness: 170, damping: 18, mass: 0.8 });
        await controls;
        if (cancelled) break;

        await wait(960);
        onHintCycle();
      }
    };

    playHint();

    return () => {
      cancelled = true;
      controls?.stop();
      animate(x, 0, { duration: 0.18, ease: 'easeOut' });
    };
  }, [hintActive, isFront, leaving, onHintCycle, reduced, x]);

  const commitSwipe = (direction: number) => {
    if (leaving) return;
    onHintIntent();
    if (reduced) {
      onSwipe();
      x.set(0);
      return;
    }
    setLeaving(true);
    const distance = (cardRef.current?.offsetWidth ?? 340) * 1.15;
    // Promote the next card while this one is still in flight so the stack
    // reorganizes in one continuous motion instead of two separate steps.
    window.setTimeout(onSwipe, 90);
    animate(x, direction * distance, { duration: 0.32, ease: [0.3, 0.7, 0.2, 1] }).then(() => {
      setLeaving(false);
      animate(x, 0, { type: 'spring', stiffness: 150, damping: 25 });
    });
  };

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_DISTANCE || Math.abs(info.velocity.x) > SWIPE_VELOCITY) {
      commitSwipe((info.offset.x || info.velocity.x) < 0 ? -1 : 1);
    }
  };

  const handleDrag = (_event: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > SWIPE_INTENT_DISTANCE) onHintIntent();
  };

  const slot = reduced
    ? { y: 0, scale: 1, opacity: isFront ? 1 : 0 }
    : stackSlots[position];

  return (
    <motion.div
      ref={cardRef}
      role="group"
      aria-label={ariaLabel}
      className={className}
      style={{ x, rotate: reduced ? undefined : rotate, zIndex: leaving ? 4 : 3 - position }}
      initial={false}
      animate={slot}
      transition={reduced ? { duration: 0.25, ease: 'easeOut' } : { type: 'spring', stiffness: 260, damping: 30 }}
      drag={isFront && !leaving ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      dragMomentum={false}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      inert={!isFront || undefined}
    >
      {children}
    </motion.div>
  );
}

function MobileCaseDeck(props: MobileCaseDeckProps) {
  const { lang } = useLanguage();
  const t = ui[lang];
  const reduced = useReducedMotion() ?? false;
  const [front, setFront] = useState(0);
  const [hintActive, setHintActive] = useState(() => !reduced && !getHintDismissed());
  const [, setHintCycles] = useState(0);
  const advance = () => setFront((current) => (current + 1) % 3);

  useEffect(() => {
    if (reduced || !hintActive) return;

    const stopHint = () => setHintActive(false);
    window.addEventListener(SWIPE_HINT_EVENT, stopHint);
    return () => window.removeEventListener(SWIPE_HINT_EVENT, stopHint);
  }, [hintActive, reduced]);

  const dismissHint = useCallback(() => {
    if (!hintActive) return;
    setHintActive(false);
    setHintDismissed();
  }, [hintActive]);

  const handleHintCycle = useCallback(() => {
    setHintCycles((current) => {
      const next = current + 1;
      if (next >= 3) dismissHint();
      return next;
    });
  }, [dismissHint]);

  const dismissHintFromKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ') dismissHint();
  };

  const visibleTechs = props.techs.filter((tech) => tech !== 'Git');
  const cardNames = [t.overview, L(props.roleLabel, lang), t.underHood];
  const cardLabel = (index: number) => `${t.card} ${index + 1} ${t.of} 3 — ${cardNames[index]}`;

  const hookCard = (
    <>
      <div className={styles.heroShell}>
        <button
          type="button"
          className={styles.heroButton}
          onClick={props.onOpenGallery}
          aria-label={`${t.preview}: ${props.projectTitle}`}
        >
          <img src={props.hero} alt={`${props.projectTitle} app screen`} className={styles.heroImg} draggable={false} />
          <span className={styles.galleryPill}>
            <span className={styles.playGlyph} aria-hidden="true" />
            {props.galleryCount} {t.photos}
            {props.hasVideo ? ` · ${t.videoTag}` : ''}
          </span>
        </button>
      </div>
      <div className={styles.hookBody}>
        <h3 className={styles.title}>{L(props.heading, lang)}</h3>
        <p className={styles.tagline}>{L(props.tagline, lang)}</p>
      </div>
      <p className={styles.metaLine}>{L(props.meta, lang)}</p>
    </>
  );

  const storyCard = (
    <>
      <span className={styles.blockLabel}>{L(props.roleLabel, lang)}</span>
      <h4 className={styles.roleTitle}>{L(props.roleTitle, lang)}</h4>
      <ul className={styles.roleList}>
        {props.rolePoints.map((point) => <li key={L(point, lang)}>{L(point, lang)}</li>)}
      </ul>
      <div className={styles.factGrid}>
        {props.roleFacts.map((fact) => (
          <span key={L(fact.label, lang)} className={styles.fact}>
            <span className={styles.factLabel}>{L(fact.label, lang)}</span>
            <span className={styles.factValue}>{L(fact.value, lang)}</span>
          </span>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <button type="button" className={styles.quietLink} onClick={props.onOpenCase}>
          {t.readCase}
        </button>
      </div>
    </>
  );

  const buildCard = (
    <>
      <span className={styles.blockLabel}>{t.underHood}</span>
      <div className={styles.badgeRow}>
        {visibleTechs.map((tech) => (
          <TechBadge
            key={tech}
            tech={tech}
            className={props.primaryTechs.has(tech) ? styles.badgePrimary : styles.badgeSecondary}
          />
        ))}
      </div>
      <div className={styles.statRow}>
        {props.stats.map((stat) => (
          <div key={`${stat.number}-${L(stat.label, lang)}`} className={styles.statItem}>
            <span className={styles.statNumber}>{stat.number}</span>
            <span className={styles.statLabel}>{L(stat.label, lang)}</span>
          </div>
        ))}
      </div>
      <div className={styles.screenBlock}>
        <span className={styles.blockLabel}>{t.screens}</span>
        <button
          type="button"
          className={styles.screenShot}
          onClick={() => props.onOpenImage(props.shot.galleryIndex)}
          aria-label={`${props.projectTitle} ${L(props.shot.label, lang)} ${t.screenshot}`}
        >
          <img src={props.shot.src} alt="" className={styles.screenImg} draggable={false} />
        </button>
      </div>
      <div className={styles.cardFooter}>
        <a className={styles.ghostLink} href={props.githubUrl} target="_blank" rel="noreferrer">
          <img src={githubIcon} alt="" aria-hidden="true" className={styles.linkIcon} />
          {t.github}
        </a>
        <button type="button" className={styles.primaryLink} onClick={props.onOpenCase}>
          {t.readCase}
        </button>
      </div>
    </>
  );

  const cards = [
    { body: hookCard, className: `${styles.card} ${styles.cardHook}` },
    { body: storyCard, className: `${styles.card} ${styles.cardPanel}` },
    { body: buildCard, className: `${styles.card} ${styles.cardPanel}` },
  ];

  return (
    <div className={styles.deck} onKeyDownCapture={dismissHintFromKeyboard}>
      <div className={styles.stack}>
        {cards.map((card, index) => (
          <DeckCard
            key={cardNames[index]}
            position={(index - front + 3) % 3}
            ariaLabel={cardLabel(index)}
            reduced={reduced}
            hintActive={hintActive}
            onSwipe={advance}
            onHintIntent={dismissHint}
            onHintCycle={handleHintCycle}
            className={card.className}
          >
            {card.body}
          </DeckCard>
        ))}
      </div>
      <div className={styles.deckFooter}>
        <div className={styles.deckSteps}>
          {cardNames.map((name, index) => (
            <button
              key={name}
              type="button"
              className={index === front ? `${styles.dot} ${styles.dotActive}` : styles.dot}
              aria-label={cardLabel(index)}
              aria-current={index === front}
              onClick={() => setFront(index)}
            />
          ))}
          <span className={styles.stepName}>{cardNames[front]}</span>
        </div>
      </div>
    </div>
  );
}

export default MobileCaseDeck;
