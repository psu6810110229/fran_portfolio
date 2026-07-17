import React from 'react';
import { AnimatePresence, motion, useMotionValue } from 'motion/react';
import { useLenis } from 'lenis/react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import WordsPullUpMultiStyle from '../../components/Resume/WordsPullUpMultiStyle';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { DockItem } from '../../components/DockItem/DockItem';
import Contact from '../../pages/Contact';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import openHouseSpeaking from '../../assets/open-house-speaking.webp';
import openHouseStationSetup from '../../assets/open-house-station-setup.webp';
import openHouseStudentGroups from '../../assets/open-house-student-groups.webp';
import openHouseStaffStage from '../../assets/open-house-staff-stage.webp';
import openHouseGroupPhoto from '../../assets/open-house-group-photo.webp';
import psuHeroVideo from '../../assets/resume/hero/psu.mp4';
import psuHeroPoster from '../../assets/resume/hero/psu-poster.jpg';
import eventHeroVideo from '../../assets/resume/hero/event.mp4';
import eventHeroPoster from '../../assets/resume/hero/event-poster.jpg';
import labHeroVideo from '../../assets/resume/hero/lab.mp4';
import labHeroPoster from '../../assets/resume/hero/lab-poster.jpg';
import hatyaiHeroVideo from '../../assets/resume/hero/hatyai.mp4';
import hatyaiHeroPoster from '../../assets/resume/hero/hatyai-poster.jpg';
import styles from './Resume.module.css';

interface HeroScene {
  id: string;
  video: string;
  poster: string;
  copy: {
    en: HeroSceneCopy;
    th: HeroSceneCopy;
  };
}

interface HeroSceneCopy {
  label: string;
  description: [string, string];
}

const heroScenes: HeroScene[] = [
  {
    id: 'psu',
    video: psuHeroVideo,
    poster: psuHeroPoster,
    copy: {
      en: {
        label: 'Building products',
        description: ['I turn ideas into digital products,', 'from first sketch to real-world use.'],
      },
      th: {
        label: 'สร้างโปรดักต์',
        description: ['ผมเปลี่ยนไอเดียให้เป็นโปรดักต์ดิจิทัล', 'ตั้งแต่ภาพแรกจนเปิดใช้ได้จริง'],
      },
    },
  },
  {
    id: 'event',
    video: eventHeroVideo,
    poster: eventHeroPoster,
    copy: {
      en: {
        label: 'Working with people',
        description: ['I work with people and details,', 'so good ideas reach the people they serve.'],
      },
      th: {
        label: 'ทำงานกับผู้คน',
        description: ['ผมทำงานกับผู้คนและรายละเอียด', 'เพื่อให้ไอเดียไปถึงคนใช้จริง'],
      },
    },
  },
  {
    id: 'lab',
    video: labHeroVideo,
    poster: labHeroPoster,
    copy: {
      en: {
        label: 'Making ideas clear',
        description: ['I make complex ideas easier to use,', 'then improve them through real feedback.'],
      },
      th: {
        label: 'ทำเรื่องยากให้ง่าย',
        description: ['ผมทำเรื่องยากให้เข้าใจและใช้ง่าย', 'แล้วค่อยปรับจากเสียงของคนใช้'],
      },
    },
  },
  {
    id: 'hatyai',
    video: hatyaiHeroVideo,
    poster: hatyaiHeroPoster,
    copy: {
      en: {
        label: 'Staying curious',
        description: ['I keep looking for better ways to build,', 'with curiosity beyond the screen.'],
      },
      th: {
        label: 'เก็บไอเดียรอบตัว',
        description: ['ผมเก็บไอเดียจากโลกรอบตัว', 'แล้วพากลับมาสร้างต่อบนหน้าจอ'],
      },
    },
  },
];

const HERO_CROSSFADE_SECONDS = 0.8;
const HERO_CROSSFADE_MS = HERO_CROSSFADE_SECONDS * 1000;

interface ActivitySlide {
  src: string;
  alt: {
    en: string;
    th: string;
  };
}

const activitySlides: ActivitySlide[] = [
  {
    src: openHouseSpeaking,
    alt: {
      en: 'Fran holding a microphone while speaking with students during the Open House activities.',
      th: 'ฟานถือไมค์พูดคุยกับนักเรียนระหว่างกิจกรรม Open House',
    },
  },
  {
    src: openHouseStationSetup,
    alt: {
      en: 'Fran preparing materials at the Engineering station with teammates.',
      th: 'ฟานเตรียมอุปกรณ์ที่ฐานวิศวกรรมร่วมกับเพื่อนในทีม',
    },
  },
  {
    src: openHouseStudentGroups,
    alt: {
      en: 'Fran looking after student groups during the Open House activities.',
      th: 'ฟานดูแลกลุ่มนักเรียนระหว่างกิจกรรม Open House',
    },
  },
  {
    src: openHouseStaffStage,
    alt: {
      en: 'Staff from different faculties seated on stage in front of the students.',
      th: 'สตาฟจากหลายคณะนั่งอยู่บนเวทีต่อหน้านักเรียนที่เข้าร่วมงาน',
    },
  },
  {
    src: openHouseGroupPhoto,
    alt: {
      en: 'Staff and around 400 students posing together at the end of the event.',
      th: 'ทีมสตาฟและนักเรียนประมาณ 400 คนถ่ายภาพร่วมกันหลังจบกิจกรรม',
    },
  },
];

const SLIDE_AUTO_ADVANCE_MS = 5000;

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 28,
    scale: 1.025,
    filter: 'blur(6px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -20,
    scale: 0.99,
    filter: 'blur(4px)',
    transition: { duration: 0.24, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

const dictionary = {
  en: {
    nav: [
      { label: 'Back to Portfolio', href: '/' },
      { label: 'My Story', href: '#about' },
      { label: 'Methodology', href: '#features' },
      { label: 'Contact', href: '#contact' }
    ],
    heroDesc: 'A Year 2 Computer Engineering student at PSU who learns by building real products and working closely with people.',
    viewApp: 'Explore My Story',
    aboutBadge: 'Web Developer',
    about1a: 'Hi, I am ',
    about1b: 'Fran. ',
    about2: 'A Year 2 Computer Engineering student at PSU ',
    about3: 'who learns by building real products and working with people.',
    aboutFull: 'I am a Year 2 Computer Engineering student at PSU. Organizing Hat Yai Open House 2026 taught me to prepare equipment, coordinate people, and stay calm when problems appeared. I am still growing, but I take responsibility for the next step and learn from the people around me.',
    feat1: 'What I’ve done, ',
    feat2: 'and what it taught me.',
    activityTitle: 'Hat Yai Open House 2026',
    activityMeta: 'Staff and Engineering Station Mentor · 4 July 2026',
    galleryLabel: 'Hat Yai Open House activity photos',
    previousSlide: 'View previous photo',
    nextSlide: 'View next photo',
    pauseSlides: 'Pause automatic photo changes',
    resumeSlides: 'Resume automatic photo changes',
    card2Title: 'At the engineering station',
    card2Items: [
      'I arranged the station, prepared equipment, and checked that everything was ready.',
      'I helped with morning activities, then joined three other staff at Engineering.',
      'I explained activities, answered study questions, and shared my Computer Engineering experience.',
    ],
    card3Title: 'On stage',
    card3Items: [
      'I spoke to 400 students about PSU Engineering, Computer Engineering, and career paths.',
      'I wrote the talk myself, using three clear points that students could follow.',
      'Preparation helped me speak comfortably to a large group while still sounding like myself.',
    ],
    card4Title: 'Working with the team',
    card4Items: [
      'Around 20 staff joined; three to four of us looked after Engineering all day.',
      'We ran separate stations, followed one schedule, and kept each other updated.',
      'The day taught me to notice changes and adjust with the team.',
    ],
  },
  th: {
    nav: [
      { label: 'ไปยังหน้าพอร์ตโฟลิโอ', href: '/' },
      { label: 'รู้จักผมมากขึ้น', href: '#about' },
      { label: 'ผมเคยทำอะไรบ้าง', href: '#features' },
      { label: 'ติดต่อ', href: '#contact' }
    ],
    heroDesc: 'นักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 2 ม.สงขลานครินทร์ ที่เรียนรู้จากการลงมือสร้างผลงานจริงและการทำงานร่วมกับผู้คน',
    viewApp: 'ไปกันต่อ',
    aboutBadge: 'นักพัฒนาเว็บไซต์',
    about1a: 'สวัสดีครับ ',
    about1b: 'ผมฟาน ',
    about2: 'นักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 2 มหาวิทยาลัยสงขลานครินทร์ ',
    about3: 'ที่เรียนรู้จากการลงมือทำและการทำงานร่วมกับผู้คน',
    aboutFull: 'ผมเป็นนักศึกษาวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 2 มหาวิทยาลัยสงขลานครินทร์ การจัดงาน Open House หาดใหญ่ 2026 สอนให้ผมเตรียมอุปกรณ์ ประสานงานกับผู้คน และรับมือกับปัญหาที่เกิดขึ้นหน้างาน ผมยังคงพัฒนาตัวเอง แต่พร้อมรับผิดชอบขั้นตอนถัดไปและเรียนรู้จากคนรอบตัวครับ',
    feat1: 'งานที่ผมเคยลงมือทำ ',
    feat2: 'และสิ่งที่ได้เรียนรู้',
    activityTitle: 'หาดใหญ่ Open House 2026',
    activityMeta: 'สตาฟและพี่เลี้ยงประจำฐานวิศวกรรม · 4 กรกฎาคม 2569',
    galleryLabel: 'ภาพกิจกรรมหาดใหญ่ Open House',
    previousSlide: 'ดูภาพก่อนหน้า',
    nextSlide: 'ดูภาพถัดไป',
    pauseSlides: 'หยุดการเปลี่ยนภาพอัตโนมัติ',
    resumeSlides: 'เล่นภาพอัตโนมัติต่อ',
    card2Title: 'ที่ฐานวิศวกรรม',
    card2Items: [
      'ก่อนเริ่มงาน ผมจัดพื้นที่ เตรียมอุปกรณ์ และเช็กของที่ต้องใช้ให้พร้อม เพื่อไม่ให้กิจกรรมต้องหยุดกลางคัน',
      'ช่วงเช้าผมช่วยกิจกรรมรวม แล้วช่วงบ่ายกลับมาประจำฐานวิศวกรรมกับเพื่อนสตาฟอีก 3–4 คน',
      'ที่ฐาน ผมอธิบายกิจกรรม ตอบคำถามเรื่องการเรียน และเล่าประสบการณ์จริงในฐานะนักศึกษาวิศวกรรมคอมพิวเตอร์',
    ],
    card3Title: 'ตอนขึ้นเวที',
    card3Items: [
      'ผมขึ้นเวทีพูดกับนักเรียนประมาณ 400 คน เรื่องวิศวะ ม.อ. การเรียนวิศวะคอม และเส้นทางหลังเรียนจบ',
      'ผมเขียนเนื้อหาเอง เริ่มจากสามประเด็นหลัก แล้วค่อยอธิบายทีละส่วนด้วยภาษาที่น้อง ๆ ตามได้ทัน',
      'ผมได้รู้ว่า เมื่อเตรียมตัวดีและพูดเรื่องที่สนใจ ผมคุยกับคนกลุ่มใหญ่ได้โดยยังเป็นตัวเอง',
    ],
    card4Title: 'ตอนทำงานกับทีม',
    card4Items: [
      'วันนั้นมีสตาฟราว 20 คนจากหลายคณะ ส่วนฐานวิศวะมีผมกับเพื่อน 3–4 คนดูแลร่วมกันตลอดวัน',
      'แม้ประจำคนละฐาน ทุกคนเดินตามตารางเดียวกัน เราจึงคอยอัปเดตกันก่อนเริ่มกิจกรรมแต่ละช่วง',
      'ผมชอบแผนที่ชัดเจน แต่งานนี้สอนให้สังเกตสิ่งที่เปลี่ยน และปรับตัวไปพร้อมกับทีม',
    ],
  }
};

const Resume: React.FC = () => {
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = dictionary[lang];
  const [activeHeroScene, setActiveHeroScene] = React.useState(0);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [slideDirection, setSlideDirection] = React.useState(1);
  const [isGalleryInView, setIsGalleryInView] = React.useState(false);
  const [isPageVisible, setIsPageVisible] = React.useState(true);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = React.useState(false);
  const galleryRef = React.useRef<HTMLDivElement>(null);
  const heroVideoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);

  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  const [enableDockEffect, setEnableDockEffect] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMediaState = () => {
      setEnableDockEffect(pointerQuery.matches && !reducedMotionQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    updateMediaState();
    pointerQuery.addEventListener('change', updateMediaState);
    reducedMotionQuery.addEventListener('change', updateMediaState);

    const handleMouseMove = (e: MouseEvent) => {
      if (pointerQuery.matches && !reducedMotionQuery.matches) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      pointerQuery.removeEventListener('change', updateMediaState);
      reducedMotionQuery.removeEventListener('change', updateMediaState);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  React.useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsGalleryInView(entry.isIntersecting && entry.intersectionRatio >= 0.55),
      { threshold: 0.55 },
    );

    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const updateVisibility = () => setIsPageVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  React.useEffect(() => {
    const activeVideo = heroVideoRefs.current[activeHeroScene];

    if (prefersReducedMotion || !isPageVisible) {
      heroVideoRefs.current.forEach((video) => video?.pause());
      return;
    }

    if (activeVideo) {
      if (activeVideo.ended || activeVideo.currentTime >= activeVideo.duration - HERO_CROSSFADE_SECONDS) {
        activeVideo.currentTime = 0;
      }
      void activeVideo.play().catch(() => undefined);
    }

    const pauseTimer = window.setTimeout(() => {
      heroVideoRefs.current.forEach((video, index) => {
        if (video && index !== activeHeroScene) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, HERO_CROSSFADE_MS);

    return () => window.clearTimeout(pauseTimer);
  }, [activeHeroScene, isPageVisible, prefersReducedMotion]);

  React.useEffect(() => {
    if (!isGalleryInView || !isPageVisible || isAutoPlayPaused || prefersReducedMotion) return;

    const timer = window.setTimeout(() => {
      setSlideDirection(1);
      setActiveSlide((current) => (current + 1) % activitySlides.length);
    }, SLIDE_AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeSlide, isAutoPlayPaused, isGalleryInView, isPageVisible, prefersReducedMotion]);

  const lenis = useLenis();
  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (lenis) {
        lenis.scrollTo(href, { duration: 1.5, immediate: reduce, easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1] as const, duration: prefersReducedMotion ? 0 : 0.8 } },
  };

  const showPreviousSlide = () => {
    setIsAutoPlayPaused(true);
    setSlideDirection(-1);
    setActiveSlide((current) => (current - 1 + activitySlides.length) % activitySlides.length);
  };

  const showNextSlide = () => {
    setIsAutoPlayPaused(true);
    setSlideDirection(1);
    setActiveSlide((current) => (current + 1) % activitySlides.length);
  };

  const showNextHeroScene = (sceneIndex: number) => {
    setActiveHeroScene((current) => (
      current === sceneIndex ? (current + 1) % heroScenes.length : current
    ));
  };

  const handleHeroTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>, sceneIndex: number) => {
    if (prefersReducedMotion || sceneIndex !== activeHeroScene) return;

    const video = event.currentTarget;
    if (Number.isFinite(video.duration) && video.duration - video.currentTime <= HERO_CROSSFADE_SECONDS) {
      showNextHeroScene(sceneIndex);
    }
  };

  const activeHeroCopy = heroScenes[activeHeroScene].copy[lang];

  return (
    <div className={styles.page}>
      {/* SECTION 1: HERO */}
      <section id="hero" aria-labelledby="resume-hero-title" className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.videoStage} aria-hidden="true">
            {heroScenes.map((scene, index) => (
              <video
                key={scene.id}
                ref={(video) => {
                  heroVideoRefs.current[index] = video;
                }}
                autoPlay={index === 0 && !prefersReducedMotion}
                muted
                playsInline
                preload={index === activeHeroScene || index === (activeHeroScene + 1) % heroScenes.length ? 'auto' : 'metadata'}
                tabIndex={-1}
                className={`${styles.videoBg} ${index === activeHeroScene ? styles.videoActive : styles.videoInactive}`}
                src={scene.video}
                poster={scene.poster}
                onTimeUpdate={(event) => handleHeroTimeUpdate(event, index)}
                onEnded={() => showNextHeroScene(index)}
              />
            ))}
          </div>
          <div className={styles.noiseOverlay} />
          <div className={styles.gradientOverlay} />

          <div className={styles.navContainer}>
            <nav className={styles.navBar}>
              <div className={styles.navLinks}>
                {t.nav.map((item) => (
                  <DockItem key={item.label} mouseX={mouseX} mouseY={mouseY} isDesktop={enableDockEffect} as="a" href={item.href} className={styles.navLink} onClick={(e) => handleNavClick(e, item.href)}>
                    {item.label}
                  </DockItem>
                ))}
              </div>
              <div className={styles.navToggles}>
                <DockItem mouseX={mouseX} mouseY={mouseY} isDesktop={enableDockEffect}>
                  <button
                    className={styles.langToggle}
                    onClick={toggleLang}
                    aria-label={`Switch to ${lang === 'en' ? 'Thai' : 'English'}`}
                  >
                    {lang === 'en' ? 'EN' : 'TH'}
                  </button>
                </DockItem>
                <DockItem mouseX={mouseX} mouseY={mouseY} isDesktop={enableDockEffect}>
                  <button
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  >
                  <span key={theme} className={styles.icon}>
                    {theme === 'dark' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="2" x2="12" y2="4"/>
                        <line x1="12" y1="20" x2="12" y2="22"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="2" y1="12" x2="4" y2="12"/>
                        <line x1="20" y1="12" x2="22" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    )}
                  </span>
                  </button>
                </DockItem>
              </div>
            </nav>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <motion.h1
                id="resume-hero-title"
                className={styles.heroTitle}
                initial={prefersReducedMotion ? false : { y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={prefersReducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 170, damping: 25, mass: 1 }}
              >
                <motion.span
                  className={styles.heroNameFirst}
                  initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                transition={prefersReducedMotion
                  ? { duration: 0 }
                  : { delay: 0.16, type: 'spring', stiffness: 165, damping: 24, mass: 0.9 }}
                >
                  FRAN
                </motion.span>
                <motion.span
                  className={styles.heroNameLast}
                  aria-label="Patcharapon"
                  initial={prefersReducedMotion ? false : { y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                transition={prefersReducedMotion
                  ? { duration: 0 }
                  : { delay: 0.34, type: 'spring', stiffness: 165, damping: 24, mass: 0.9 }}
                >
                  {Array.from('Patcharapon').map((character, index) => (
                    <span key={`${character}-${index}`} aria-hidden="true" className={styles.heroNameCharacter}>
                      {character}
                    </span>
                  ))}
                </motion.span>
              </motion.h1>
            </div>
            <div className={styles.heroRight}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${lang}-${heroScenes[activeHeroScene].id}`}
                  initial={prefersReducedMotion ? false : { y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { y: -18, opacity: 0 }}
                  transition={prefersReducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 260, damping: 28, mass: 0.72 }}
                  className={styles.heroCopy}
                >
                  <p className={styles.heroSceneLabel}>{activeHeroCopy.label}</p>
                  <p className={styles.heroDesc}>
                    {activeHeroCopy.description.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </motion.div>
              </AnimatePresence>
              <motion.a
                href="#about"
                initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const, duration: prefersReducedMotion ? 0 : 0.8 }}
                className={styles.ctaButton}
                onClick={(e) => handleNavClick(e, '#about')}
              >
                <span className={styles.ctaText}>{t.viewApp}</span>
                <div className={styles.ctaIconBox}>
                  <ArrowRight className={styles.ctaIcon} />
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section id="about" aria-labelledby="resume-about-title" className={styles.aboutSection}>
        <div className={styles.aboutInner}>

          
          <WordsPullUpMultiStyle
            key={lang}
            as="h2"
            id="resume-about-title"
            containerClassName={styles.aboutTitle}
            segments={[
              { text: t.about1a, className: styles.aboutTitleNormal },
              { text: t.about1b, className: styles.aboutTitleHighlight },
              { text: t.about2, className: styles.aboutTitleItalic },
              { text: t.about3, className: styles.aboutTitleNormal },
            ]}
          />

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={1}
            textClassName={styles.aboutRevealText}
          >
            {t.aboutFull}
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section id="features" aria-labelledby="resume-features-title" className={styles.featuresSection}>
        <div className={styles.featuresBgNoise} />
        
        <div className={styles.featuresInner}>
          <WordsPullUpMultiStyle
            key={lang}
            as="h2"
            id="resume-features-title"
            containerClassName={styles.featuresTitle}
            segments={[
              { text: t.feat1, className: styles.featuresTitlePrimary },
              { text: t.feat2, className: styles.featuresTitleMuted },
            ]}
          />

          <div className={styles.activityHeader}>
            <h3 className={styles.activityTitle}>{t.activityTitle}</h3>
            <p className={styles.activityMeta}>{t.activityMeta}</p>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className={styles.featuresGrid}
          >
            <motion.div
              ref={galleryRef}
              variants={cardVariants}
              className={styles.cardGallery}
              role="region"
              aria-roledescription="carousel"
              aria-label={t.galleryLabel}
            >
              {prefersReducedMotion ? (
                <img
                  src={activitySlides[activeSlide].src}
                  alt={activitySlides[activeSlide].alt[lang]}
                  loading="lazy"
                  decoding="async"
                  className={styles.cardGalleryImage}
                />
              ) : (
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.img
                    key={activitySlides[activeSlide].src}
                    src={activitySlides[activeSlide].src}
                    alt={activitySlides[activeSlide].alt[lang]}
                    loading="lazy"
                    decoding="async"
                    className={styles.cardGalleryImage}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  />
                </AnimatePresence>
              )}
              <div className={styles.galleryControls}>
                <span
                  className={styles.galleryCount}
                  aria-live={isAutoPlayPaused || prefersReducedMotion ? 'polite' : 'off'}
                >
                  {String(activeSlide + 1).padStart(2, '0')} / {String(activitySlides.length).padStart(2, '0')}
                </span>
                <span className={styles.galleryDivider} aria-hidden="true" />
                <button
                  type="button"
                  className={styles.galleryButton}
                  onClick={showPreviousSlide}
                  aria-label={t.previousSlide}
                >
                  <ArrowLeft aria-hidden="true" />
                </button>
                {!prefersReducedMotion && (
                  <button
                    type="button"
                    className={styles.galleryButton}
                    onClick={() => setIsAutoPlayPaused((paused) => !paused)}
                    aria-label={isAutoPlayPaused ? t.resumeSlides : t.pauseSlides}
                    aria-pressed={isAutoPlayPaused}
                  >
                    {isAutoPlayPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
                  </button>
                )}
                <button
                  type="button"
                  className={styles.galleryButton}
                  onClick={showNextSlide}
                  aria-label={t.nextSlide}
                >
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <h4 className={styles.cardTitle}>{t.card2Title}</h4>
              <ul className={styles.cardList}>
                {t.card2Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <span className={styles.cardListMarker} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <h4 className={styles.cardTitle}>{t.card3Title}</h4>
              <ul className={styles.cardList}>
                {t.card3Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <span className={styles.cardListMarker} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={cardVariants} className={styles.cardStandard}>
              <h4 className={styles.cardTitle}>{t.card4Title}</h4>
              <ul className={styles.cardList}>
                {t.card4Items.map((item, i) => (
                  <li key={i} className={styles.cardListItem}>
                    <span className={styles.cardListMarker} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: CONTACT */}
      <Contact />
    </div>
  );
};

export default Resume;
