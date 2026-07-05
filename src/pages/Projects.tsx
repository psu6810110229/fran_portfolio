import { lazy, Suspense, useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react';
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'motion/react';
import CompactCard from '../components/CompactCard/CompactCard';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack/ScrollStack';
import TechBadge from '../components/TechBadge/TechBadge';
import { projects } from '../data/projects';
import { useLanguage } from '../hooks/useLanguage';
import type { Localized, Project } from '../types';
import githubIcon from '../assets/icons/github.svg';
import adminPanelShot from '../assets/9tours/opt/gallery-11.webp';
import bookingFlowShot from '../assets/9tours/opt/gallery-04.webp';
import bentoHero9tours from '../assets/9tours/opt/preview-hero.webp';
import goOutShot2 from '../assets/GO-OUT/opt/preview-shot-02.webp';
import styles from './Projects.module.css';

const GalleryModal = lazy(() => import('../components/GalleryModal/GalleryModal'));
const CaseReader = lazy(() => import('../components/CaseReader/CaseReader'));
const MobileCaseDeck = lazy(() => import('../components/MobileCaseDeck/MobileCaseDeck'));

const defaultPrimaryTechs = new Set(['React', 'TypeScript', 'CSS']);

const ui = {
  en: {
    sectionTitle: 'Projects',
    more: 'More projects',
    github: 'View the code',
    readCase: 'Read the full case',
    watchPreview: 'Watch the preview',
    liveDemo: 'More details',
    caseInfo: 'Open case reader',
    comingSoon: 'Coming soon',
    comingSoonSub: 'Next project in progress…',
  },
  th: {
    sectionTitle: 'โปรเจกต์',
    more: 'โปรเจกต์อื่น ๆ',
    github: 'ดูโค้ด',
    readCase: 'อ่านเคสเต็ม',
    watchPreview: 'ดูวิดีโอตัวอย่าง',
    liveDemo: 'รายละเอียด',
    caseInfo: 'เปิดเคสเต็ม',
    comingSoon: 'เร็ว ๆ นี้',
    comingSoonSub: 'โปรเจกต์ถัดไปกำลังสร้าง…',
  },
};

type BentoIntent = 'main' | 'role' | 'booking' | 'admin' | 'stats';

interface BentoShotConfig {
  label: Localized;
  detailHeader: Localized;
  details: [Localized, Localized, Localized];
  galleryIndex: number;
  imageOverride?: string;
}

interface BentoStatConfig {
  number: string;
  label: Localized;
  details: Localized[];
}

interface ShowcaseConfig {
  kicker: Localized;
  heading: Localized;
  mainLine: Localized;
  mainDetailHeader: Localized;
  mainDetails: [Localized, Localized, Localized];
  roleLabel: Localized;
  roleTitle: Localized;
  rolePoints: [Localized, Localized, Localized];
  roleDetailHeader: Localized;
  roleDetails: [Localized, Localized, Localized];
  roleFacts: [BentoFactConfig, BentoFactConfig, BentoFactConfig, BentoFactConfig];
  heroOverride?: string;
  shots: [BentoShotConfig, BentoShotConfig];
  stats: [BentoStatConfig, BentoStatConfig, BentoStatConfig];
  bottomDetail: Localized;
  primaryTechs?: string[];
}

interface BentoFactConfig {
  label: Localized;
  value: Localized;
}

interface PointerSample {
  x: number;
  y: number;
  time: number;
}

const showcaseConfigs: Record<string, ShowcaseConfig> = {
  '9tours': {
    heroOverride: bentoHero9tours,
    kicker: {
      en: 'Project 01',
      th: 'โปรเจกต์ 01',
    },
    heading: {
      en: '9Tours — Online Tour Booking',
      th: '9Tours เว็บไซต์จองทัวร์ออนไลน์',
    },
    mainLine: {
      en: 'Browse, book, pay, confirm: one booking flow, plus the admin side that runs it.',
      th: 'ดูทริป จอง จ่าย ยืนยัน ครบในระบบเดียว พร้อมฝั่งแอดมินสำหรับจัดการ',
    },
    mainDetailHeader: {
      en: 'What I owned',
      th: 'สิ่งที่ผมดูแล',
    },
    mainDetails: [
      {
        en: 'Led the product direction from wireframe to build.',
        th: 'ดูแลทิศทางโปรเจกต์ตั้งแต่ wireframe ถึงเวอร์ชันจริง',
      },
      {
        en: 'Worked across front-end screens and API behavior.',
        th: 'ทำงานทั้งฝั่ง front-end และ API',
      },
      {
        en: 'Learned how product decisions affect real booking trust.',
        th: 'เข้าใจว่าการตัดสินใจด้าน product ส่งผลต่อความน่าเชื่อถือในการจองอย่างไร',
      },
    ],
    roleLabel: {
      en: 'My role',
      th: 'บทบาทของฉัน',
    },
    roleTitle: {
      en: 'Group lead & project manager',
      th: 'หัวหน้ากลุ่ม & ผู้จัดการโปรเจกต์',
    },
    rolePoints: [
      {
        en: 'Group lead and project manager, from wireframe to production',
        th: 'หัวหน้ากลุ่มและดูแลภาพรวมโปรเจกต์ ตั้งแต่ wireframe ถึงเวอร์ชันจริง',
      },
      {
        en: 'Solved a booking race condition across the front-end and API',
        th: 'แก้ปัญหา race condition ของการจอง ทั้งฝั่ง front-end และ API',
      },
      {
        en: 'Built the booking flow and admin side with the team',
        th: 'สร้างระบบจองและฝั่ง admin ร่วมกับทีม',
      },
    ],
    roleDetailHeader: {
      en: 'How I led',
      th: 'วิธีที่ผมนำทีม',
    },
    roleDetails: [
      {
        en: 'Kept the team focused on the same product goal.',
        th: 'ทำให้ทีมมุ่งเน้นเป้าหมายเดียวกัน',
      },
      {
        en: 'Balanced project management with hands-on building.',
        th: 'สมดุลระหว่างการจัดการโปรเจกต์และการพัฒนาจริง',
      },
      {
        en: 'Communicated scope before writing code.',
        th: 'สื่อสาร scope ให้ชัดก่อนเริ่มเขียนโค้ด',
      },
    ],
    roleFacts: [
      {
        label: {
          en: 'Team',
          th: 'ทีม',
        },
        value: {
          en: '3 developers',
          th: '3 คน',
        },
      },
      {
        label: {
          en: 'My part',
          th: 'ส่วนของผม',
        },
        value: {
          en: 'Lead + build',
          th: 'นำทีม + ลงมือทำ',
        },
      },
      {
        label: {
          en: 'Hardest fix',
          th: 'แก้ยากสุด',
        },
        value: {
          en: 'Booking race',
          th: 'Race การจอง',
        },
      },
      {
        label: {
          en: 'Tests',
          th: 'เทสต์',
        },
        value: {
          en: '146 in CI',
          th: '146 ใน CI',
        },
      },
    ],
    shots: [
      {
        label: {
          en: 'Booking flow',
          th: 'ขั้นตอนการจอง',
        },
        detailHeader: {
          en: 'Design decision',
          th: 'การตัดสินใจด้านดีไซน์',
        },
        details: [
          {
            en: 'Mapped the tour path from browse to confirm.',
            th: 'ออกแบบเส้นทางผู้ใช้ตั้งแต่เรียกดูถึงยืนยัน',
          },
          {
            en: 'Learned where booking state can break trust.',
            th: 'เข้าใจจุดที่ state การจองอาจทำลายความน่าเชื่อถือ',
          },
          {
            en: 'Kept the screen honest before showing success.',
            th: 'แสดงผลที่ถูกต้องก่อนแจ้งว่าสำเร็จ',
          },
        ],
        galleryIndex: 4,
        imageOverride: bookingFlowShot,
      },
      {
        label: {
          en: 'Admin panel',
          th: 'แผงแอดมิน',
        },
        detailHeader: {
          en: 'Built for the operators',
          th: 'สร้างเพื่อผู้ดูแลระบบ',
        },
        details: [
          {
            en: 'One panel for the people running tours and bookings.',
            th: 'แผงเดียวสำหรับคนดูแลทัวร์และการจอง',
          },
          {
            en: 'Learned to organize operational data clearly.',
            th: 'เรียนรู้การจัดระเบียบข้อมูลการดำเนินงานอย่างชัดเจน',
          },
          {
            en: 'Connected product decisions across both sides.',
            th: 'เชื่อมโยงการตัดสินใจด้าน product ทั้งสองฝั่ง',
          },
        ],
        galleryIndex: 11,
        imageOverride: adminPanelShot,
      },
    ],
    stats: [
      {
        number: '49',
        label: {
          en: 'API endpoints',
          th: 'API endpoints',
        },
        details: [
          {
            en: 'Backend built by the team',
            th: 'backend ที่ทีมสร้าง',
          },
          {
            en: 'Across 14 NestJS modules',
            th: 'ครอบคลุม 14 โมดูล NestJS',
          },
          {
            en: 'Booking, payments, auth',
            th: 'การจอง จ่ายเงิน ล็อกอิน',
          },
          {
            en: 'I built parts of the API',
            th: 'ผมลงมือทำ API บางส่วน',
          },
        ],
      },
      {
        number: '146',
        label: {
          en: 'automated tests',
          th: 'เทสต์อัตโนมัติ',
        },
        details: [
          {
            en: 'Cover the whole system',
            th: 'ครอบคลุมทั้งระบบ',
          },
          {
            en: 'Run in CI on every push',
            th: 'รันใน CI ทุกครั้งที่ push',
          },
          {
            en: 'Guard the booking logic',
            th: 'ป้องกัน logic การจอง',
          },
          {
            en: 'Catch breakage before merge',
            th: 'จับบั๊กก่อน merge',
          },
        ],
      },
      {
        number: '17',
        label: {
          en: 'pages built',
          th: 'หน้าที่สร้าง',
        },
        details: [
          {
            en: 'Front-end screens I led',
            th: 'หน้า front-end ที่ผมดูแล',
          },
          {
            en: 'Plus a 10-page admin side',
            th: 'พร้อมฝั่ง admin 10 หน้า',
          },
          {
            en: 'Browse, book, confirm flow',
            th: 'flow ดู จอง ยืนยัน',
          },
          {
            en: 'From wireframe to build',
            th: 'ตั้งแต่ wireframe ถึงจริง',
          },
        ],
      },
    ],
    bottomDetail: {
      en: 'Team build · Booking flow · Admin side',
      th: 'ทำงานเป็นทีม · ระบบจองแบบ End-To-End · มีระบบฝั่งแอดมิน',
    },
  },
  'GO-OUT': {
    kicker: {
      en: 'Project 02',
      th: 'โปรเจกต์ 02',
    },
    heading: {
      en: 'GO-OUT — Shared Savings Tracker',
      th: 'GO-OUT แอปติดตามการออมร่วมกัน',
    },
    mainLine: {
      en: 'A savings scoreboard for small groups: progress shared, money details private.',
      th: 'กระดานออมร่วมกันสำหรับกลุ่มเล็ก เห็นความคืบหน้าด้วยกัน ส่วนรายละเอียดเงินยังเป็นส่วนตัว',
    },
    mainDetailHeader: {
      en: 'Built solo, end to end',
      th: 'ทำคนเดียวตั้งแต่ต้นจนจบ',
    },
    mainDetails: [
      {
        en: 'Designed a scoreboard for shared goals without real bank access.',
        th: 'ออกแบบกระดานคะแนนสำหรับเป้าหมายร่วมกันโดยไม่แตะบัญชีธนาคารจริง',
      },
      {
        en: 'Built trust around private buckets and shared progress.',
        th: 'สร้างความน่าเชื่อถือผ่าน buckets ส่วนตัวและความคืบหน้าร่วมกัน',
      },
      {
        en: 'Shipped one codebase across web, PWA, and mobile.',
        th: 'ต่อยอดโค้ดเบสเดียวไปยัง web, PWA และ mobile',
      },
    ],
    roleLabel: {
      en: 'What it does',
      th: 'แอปนี้ทำอะไร',
    },
    roleTitle: {
      en: 'Shared savings tracker for small groups',
      th: 'ติดตามการออมร่วมกันสำหรับกลุ่มเล็ก',
    },
    rolePoints: [
      {
        en: 'Create a project room for one shared saving goal',
        th: 'สร้างห้องโปรเจกต์สำหรับเป้าหมายการออมเดียวกัน',
      },
      {
        en: 'Track each member through separate personal buckets',
        th: 'ติดตามเงินของแต่ละคนผ่าน bucket ส่วนตัวที่แยกกัน',
      },
      {
        en: 'Show progress without connecting to real bank accounts',
        th: 'เห็นความคืบหน้าโดยไม่ต้องเชื่อมต่อบัญชีธนาคารจริง',
      },
    ],
    roleDetailHeader: {
      en: 'Builder note',
      th: 'โน้ตจากคนสร้าง',
    },
    roleDetails: [
      {
        en: 'I built the product solo from UX to data rules.',
        th: 'ผมทำโปรเจกต์นี้เองตั้งแต่ UX ถึงกฎข้อมูล',
      },
      {
        en: 'The app keeps group motivation without exposing private details.',
        th: 'แอปช่วยให้มีแรงจูงใจร่วมกันโดยไม่เปิดรายละเอียดส่วนตัว',
      },
      {
        en: 'Every money change is designed to stay traceable.',
        th: 'การเปลี่ยนแปลงยอดเงินถูกออกแบบให้ตรวจสอบย้อนหลังได้',
      },
    ],
    roleFacts: [
      {
        label: {
          en: 'Room',
          th: 'ห้อง',
        },
        value: {
          en: 'Shared goal',
          th: 'เป้าหมายร่วม',
        },
      },
      {
        label: {
          en: 'Buckets',
          th: 'Buckets',
        },
        value: {
          en: 'Per member',
          th: 'แยกสมาชิก',
        },
      },
      {
        label: {
          en: 'Bank',
          th: 'ธนาคาร',
        },
        value: {
          en: 'Not connected',
          th: 'ไม่เชื่อมต่อ',
        },
      },
      {
        label: {
          en: 'History',
          th: 'ประวัติ',
        },
        value: {
          en: 'Traceable',
          th: 'ตรวจสอบได้',
        },
      },
    ],
    shots: [
      {
        label: {
          en: 'Saving plan',
          th: 'แผนการออม',
        },
        detailHeader: {
          en: 'Design decision',
          th: 'การตัดสินใจด้านดีไซน์',
        },
        details: [
          {
            en: 'Built rules for fixed and flexible saving rhythms.',
            th: 'สร้างกฎสำหรับจังหวะการออมทั้งแบบคงที่และยืดหยุ่น',
          },
          {
            en: 'Used streaks and freezes to reduce burnout.',
            th: 'ใช้ streaks และ freezes เพื่อลดความกดดัน',
          },
          {
            en: 'Kept plan changes visible before users commit.',
            th: 'ทำให้การเปลี่ยนแผนเห็นชัดก่อนผู้ใช้ยืนยัน',
          },
        ],
        galleryIndex: 1,
      },
      {
        label: {
          en: 'Project room',
          th: 'ห้องโปรเจกต์',
        },
        detailHeader: {
          en: 'Privacy by design',
          th: 'ออกแบบให้เป็นส่วนตัว',
        },
        details: [
          {
            en: 'Separated shared progress from private money details.',
            th: 'แยกความคืบหน้าร่วมกันออกจากรายละเอียดเงินส่วนตัว',
          },
          {
            en: 'Made buckets easy to scan on a small screen.',
            th: 'ทำให้ buckets อ่านง่ายบนหน้าจอขนาดเล็ก',
          },
          {
            en: 'Turned accountability into a calm dashboard.',
            th: 'เปลี่ยนแรงรับผิดชอบร่วมกันให้เป็น dashboard ที่ใช้ง่าย',
          },
        ],
        galleryIndex: 3,
        imageOverride: goOutShot2,
      },
    ],
    stats: [
      {
        number: '7',
        label: {
          en: 'people',
          th: 'คน',
        },
        details: [
          {
            en: 'Designed for small groups.',
            th: 'ออกแบบสำหรับกลุ่มเล็ก',
          },
          {
            en: 'Shared goal, separate buckets.',
            th: 'เป้าหมายร่วมกัน buckets แยกกัน',
          },
          {
            en: 'Progress without bank access.',
            th: 'ติดตามได้โดยไม่เข้าถึงธนาคาร',
          },
        ],
      },
      {
        number: '3',
        label: {
          en: 'money states',
          th: 'สถานะเงิน',
        },
        details: [
          {
            en: 'Recorded deposits.',
            th: 'เงินที่บันทึก',
          },
          {
            en: 'Verified balance.',
            th: 'เงินที่ยืนยันแล้ว',
          },
          {
            en: 'Planned balance.',
            th: 'เงินตามแผน',
          },
        ],
      },
      {
        number: '1',
        label: {
          en: 'codebase',
          th: 'โค้ดเบส',
        },
        details: [
          {
            en: 'React and Vite.',
            th: 'React และ Vite',
          },
          {
            en: 'PWA and Capacitor.',
            th: 'PWA และ Capacitor',
          },
          {
            en: 'Supabase backend.',
            th: 'backend บน Supabase',
          },
        ],
      },
    ],
    bottomDetail: {
      en: 'Solo build · Mobile-first · Traceable saving history',
      th: 'โปรเจกต์เดี่ยว · แอปพลิเคชั่นบนมือถือ · ติดตามประวัติการออมง่ายๆ',
    },
    primaryTechs: ['React', 'TypeScript', 'Supabase'],
  },
};

const joinClasses = (...classNames: string[]) => classNames.filter(Boolean).join(' ');

const L = (value: Localized, lang: 'en' | 'th') => value[lang];

const getIntentKey = (showcaseKey: string, intent: BentoIntent) => `${showcaseKey}:${intent}`;

/* ── Entrance choreography ──
   Each bento article reveals once on scroll: guide + heading first, then the
   rows stagger their cells. One easing family across the section. */
const bentoEase = [0.22, 1, 0.36, 1] as const;

const articleVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const rowVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: bentoEase } },
};

const liftHover = { y: -3, transition: { duration: 0.18, ease: 'easeOut' as const } };

interface StatNumberProps {
  value: string;
  className: string;
}

/** Counts the stat up from 0 the first time it scrolls into view. */
function StatNumber({ value, className }: StatNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const target = Number.parseInt(value, 10);
  const animatable = !prefersReducedMotion && Number.isFinite(target);
  const [display, setDisplay] = useState(animatable ? '0' : value);

  useEffect(() => {
    if (!inView || !animatable) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: bentoEase,
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, animatable, target]);

  return <span ref={ref} className={className}>{animatable ? display : value}</span>;
}

interface PreviewVideoProps {
  src: string;
  active: boolean;
  className: string;
}

/** Muted looping preview that plays while its bento cell holds hover intent. */
function PreviewVideo({ src, active, className }: PreviewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

function Projects() {
  const { lang } = useLanguage();
  const t = ui[lang];
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [caseProject, setCaseProject] = useState<Project | null>(null);
  const [activeIntentKey, setActiveIntentKey] = useState<string | null>(null);
  const [armedVideos, setArmedVideos] = useState<Record<string, boolean>>({});
  const [showMobileDeck, setShowMobileDeck] = useState(() => (
    window.matchMedia('(max-width: 767px)').matches
  ));
  const prefersReducedMotion = useReducedMotion();
  const activeIntentRef = useRef<string | null>(null);
  const intentTimerRef = useRef<number | null>(null);
  const pendingIntentRef = useRef<string | null>(null);
  const lastPointerRef = useRef<PointerSample | null>(null);

  const setIntent = (intentKey: string | null) => {
    activeIntentRef.current = intentKey;
    setActiveIntentKey(intentKey);
  };

  const clearIntentTimer = () => {
    if (intentTimerRef.current !== null) {
      window.clearTimeout(intentTimerRef.current);
      intentTimerRef.current = null;
    }
    pendingIntentRef.current = null;
  };

  const scheduleIntent = (showcaseKey: string, intent: BentoIntent, delayMs: number) => {
    const nextIntentKey = getIntentKey(showcaseKey, intent);
    clearIntentTimer();
    pendingIntentRef.current = nextIntentKey;
    intentTimerRef.current = window.setTimeout(() => {
      setIntent(nextIntentKey);
      pendingIntentRef.current = null;
      intentTimerRef.current = null;
    }, delayMs);
  };

  useEffect(() => () => {
    if (intentTimerRef.current !== null) {
      window.clearTimeout(intentTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const updateMobileDeck = () => setShowMobileDeck(mobileQuery.matches);

    updateMobileDeck();
    mobileQuery.addEventListener('change', updateMobileDeck);

    return () => mobileQuery.removeEventListener('change', updateMobileDeck);
  }, []);

  const openVideoGallery = (project: Project) => {
    setGalleryProject(project);
    setGalleryIndex(0);
  };

  const openImageGallery = (project: Project, imageIndex: number) => {
    const videoOffset = project.previewVideo ? 1 : 0;
    setGalleryProject(project);
    setGalleryIndex(imageIndex + videoOffset);
  };

  const armVideo = (showcaseKey: string) => {
    setArmedVideos((armed) => (armed[showcaseKey] ? armed : { ...armed, [showcaseKey]: true }));
  };

  const handleIntentEnter = (showcaseKey: string, intent: BentoIntent) => (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    if (intent === 'main') armVideo(showcaseKey);
    lastPointerRef.current = { x: event.clientX, y: event.clientY, time: performance.now() };
    scheduleIntent(showcaseKey, intent, 110);
  };

  const handleIntentMove = (showcaseKey: string, intent: BentoIntent) => (event: PointerEvent<HTMLElement>) => {
    const currentIntentKey = getIntentKey(showcaseKey, intent);
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    if (activeIntentRef.current === currentIntentKey) return;

    const now = performance.now();
    const lastPointer = lastPointerRef.current;
    lastPointerRef.current = { x: event.clientX, y: event.clientY, time: now };

    if (!lastPointer) {
      scheduleIntent(showcaseKey, intent, 110);
      return;
    }

    const distance = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
    const elapsed = Math.max(now - lastPointer.time, 1);
    const speed = distance / elapsed;

    if (speed < 0.12) {
      scheduleIntent(showcaseKey, intent, 45);
      return;
    }

    if (pendingIntentRef.current !== currentIntentKey) {
      scheduleIntent(showcaseKey, intent, 110);
    }
  };

  const handleIntentLeave = (showcaseKey: string, intent: BentoIntent) => () => {
    const currentIntentKey = getIntentKey(showcaseKey, intent);
    if (pendingIntentRef.current === currentIntentKey) {
      clearIntentTimer();
    }
    lastPointerRef.current = null;
    if (activeIntentRef.current === currentIntentKey) {
      // Defer the collapse one beat: entering an adjacent cell within this
      // window swaps intents directly instead of bouncing the grid through
      // its rest layout (visible blink during the handoff).
      clearIntentTimer();
      intentTimerRef.current = window.setTimeout(() => {
        if (activeIntentRef.current === currentIntentKey) {
          setIntent(null);
        }
        intentTimerRef.current = null;
        pendingIntentRef.current = null;
      }, 140);
    }
  };

  const handleIntentFocus = (showcaseKey: string, intent: BentoIntent) => () => setIntent(getIntentKey(showcaseKey, intent));

  const handleIntentBlur = (event: FocusEvent<HTMLElement>) => {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
    setIntent(null);
  };

  const showcaseProjects = projects.filter((project) => project.caseStudy && showcaseConfigs[project.title]);
  const otherProjects = projects.filter((project) => !(project.caseStudy && showcaseConfigs[project.title]));

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionEyebrow}>{t.sectionTitle}</span>
          <span className={styles.sectionLine} aria-hidden="true" />
        </div>
        <ScrollStack
          className={styles.projectStack}
          itemDistance={84}
          itemStackDistance={26}
          stackPosition="2%"
          scaleEndPosition="2%"
          baseScale={0.86}
          itemScale={0.02}
          useWindowScroll
          disabled={showMobileDeck}
        >
          {showcaseProjects.map((featured) => {
            const cs = featured.caseStudy;
            const showcase = showcaseConfigs[featured.title];
            if (!cs || !showcase) return null;

          const showcaseKey = featured.title;
          const galleryCount = featured.gallery?.length ?? 0;
          const primaryTechs = showcase.primaryTechs ? new Set(showcase.primaryTechs) : defaultPrimaryTechs;
          const isActive = (intent: BentoIntent) => activeIntentKey === getIntentKey(showcaseKey, intent);
          const topRowClassName = joinClasses(
            styles.bentoTopRow,
            isActive('main') ? styles.bentoTopRowMainIntent : '',
            isActive('role') ? styles.bentoTopRowRoleIntent : '',
          );
          const mediaRowClassName = joinClasses(
            styles.bentoMediaRow,
            isActive('booking') ? styles.bentoMediaRowBookingIntent : '',
            isActive('admin') ? styles.bentoMediaRowAdminIntent : '',
            isActive('stats') ? styles.bentoMediaRowStatsIntent : '',
          );

            return (
              <ScrollStackItem key={featured.title} itemClassName={styles.projectStackItem}>
                <motion.article
              id={`project-${featured.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={styles.bento}
              variants={articleVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -120px 0px' }}
            >
              <motion.h2 className={styles.bentoHeading} variants={cellVariants}>{L(showcase.heading, lang)}</motion.h2>
              <motion.p className={styles.bentoStandfirst} variants={cellVariants}>{L(cs.problem, lang)}</motion.p>

              {showMobileDeck && (
                <motion.div className={styles.mobileDeckSlot} variants={cellVariants}>
                  <Suspense fallback={null}>
                    <MobileCaseDeck
                      projectTitle={featured.title}
                      githubUrl={featured.githubUrl}
                      galleryCount={galleryCount}
                      hasVideo={Boolean(featured.previewVideo)}
                      hero={cs.media.hero}
                      heading={showcase.heading}
                      tagline={showcase.mainLine}
                      meta={showcase.bottomDetail}
                      roleLabel={showcase.roleLabel}
                      roleTitle={showcase.roleTitle}
                      rolePoints={showcase.rolePoints}
                      roleFacts={showcase.roleFacts}
                      stats={showcase.stats.map((stat) => ({ number: stat.number, label: stat.label }))}
                      techs={featured.techs}
                      primaryTechs={primaryTechs}
                      shot={{
                        label: showcase.shots[0].label,
                        src: showcase.shots[0].imageOverride ?? cs.media.gallery[showcase.shots[0].galleryIndex],
                        galleryIndex: showcase.shots[0].galleryIndex,
                      }}
                      onOpenGallery={() => openVideoGallery(featured)}
                      onOpenImage={(galleryImageIndex) => openImageGallery(featured, galleryImageIndex)}
                      onOpenCase={() => setCaseProject(featured)}
                    />
                  </Suspense>
                </motion.div>
              )}

              <motion.div className={topRowClassName} variants={rowVariants}>
                <motion.button
                  type="button"
                  className={joinClasses(styles.bentoMain, isActive('main') ? styles.intentActive : '')}
                  variants={cellVariants}
                  whileHover={liftHover}
                  onClick={() => openVideoGallery(featured)}
                  onPointerEnter={handleIntentEnter(showcaseKey, 'main')}
                  onPointerMove={handleIntentMove(showcaseKey, 'main')}
                  onPointerLeave={handleIntentLeave(showcaseKey, 'main')}
                  onFocus={handleIntentFocus(showcaseKey, 'main')}
                  onBlur={handleIntentBlur}
                  aria-label={`${featured.title} — watch video preview`}
                >
                  <div className={styles.bentoThumbWrap}>
                    <img
                      src={showcase.heroOverride ?? cs.media.hero}
                      alt={`${featured.title} app screen`}
                      className={styles.bentoHeroImg}
                    />
                    {armedVideos[showcaseKey] && featured.previewVideo && !prefersReducedMotion && (
                      <PreviewVideo
                        src={featured.previewVideo}
                        active={isActive('main')}
                        className={joinClasses(
                          styles.bentoVideo,
                          isActive('main') ? styles.bentoVideoVisible : '',
                        )}
                      />
                    )}
                  </div>
                  <div className={styles.bentoMainBand}>
                    <p className={styles.bentoMainLine}>{L(showcase.mainLine, lang)}</p>
                    <span className={styles.bentoPlayCue}>
                      <span className={styles.bentoPlayIcon} aria-hidden="true" />
                      {t.watchPreview}
                    </span>
                  </div>
                  <div className={styles.bentoDetail}>
                    <span className={styles.bentoDetailHeader}>{L(showcase.mainDetailHeader, lang)}</span>
                    <p className={styles.bentoDetailBody}>
                      {showcase.mainDetails.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                    </p>
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  className={joinClasses(
                    styles.bentoRole,
                    isActive('role') ? styles.intentActive : '',
                  )}
                  variants={cellVariants}
                  whileHover={liftHover}
                  onClick={() => setCaseProject(featured)}
                  onPointerEnter={handleIntentEnter(showcaseKey, 'role')}
                  onPointerMove={handleIntentMove(showcaseKey, 'role')}
                  onPointerLeave={handleIntentLeave(showcaseKey, 'role')}
                  onFocus={handleIntentFocus(showcaseKey, 'role')}
                  onBlur={handleIntentBlur}
                  aria-label={`${t.caseInfo}: ${featured.title}`}
                >
                  <span className={styles.bentoCellLabel}>{L(showcase.roleLabel, lang)}</span>
                  <span className={styles.bentoRoleTitle}>{L(showcase.roleTitle, lang)}</span>
                  <ul className={styles.bentoRoleList}>
                    {showcase.rolePoints.map((point) => <li key={L(point, lang)}>{L(point, lang)}</li>)}
                  </ul>
                  <div className={styles.bentoFactGrid}>
                    {showcase.roleFacts.map((fact) => (
                      <span key={L(fact.label, lang)} className={styles.bentoFact}>
                        <span className={styles.bentoFactLabel}>{L(fact.label, lang)}</span>
                        <span className={styles.bentoFactValue}>{L(fact.value, lang)}</span>
                      </span>
                    ))}
                  </div>
                  <div className={styles.bentoDetail}>
                    <span className={styles.bentoDetailHeader}>{L(showcase.roleDetailHeader, lang)}</span>
                    <p className={styles.bentoDetailBody}>
                      {showcase.roleDetails.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                    </p>
                  </div>
                </motion.button>
              </motion.div>

              <motion.div className={mediaRowClassName} variants={rowVariants}>
                {showcase.shots.map((shot, index) => {
                  const shotIntent: BentoIntent = index === 0 ? 'booking' : 'admin';
                  const shotClass = index === 0 ? styles.bentoShot1 : styles.bentoShot2;
                  const shotSrc = shot.imageOverride ?? cs.media.gallery[shot.galleryIndex];

                  return (
                    <motion.button
                      key={shot.galleryIndex}
                      type="button"
                      className={joinClasses(styles.bentoShot, shotClass, isActive(shotIntent) ? styles.intentActive : '')}
                      variants={cellVariants}
                      whileHover={liftHover}
                      onClick={() => openImageGallery(featured, shot.galleryIndex)}
                      onPointerEnter={handleIntentEnter(showcaseKey, shotIntent)}
                      onPointerMove={handleIntentMove(showcaseKey, shotIntent)}
                      onPointerLeave={handleIntentLeave(showcaseKey, shotIntent)}
                      onFocus={handleIntentFocus(showcaseKey, shotIntent)}
                      onBlur={handleIntentBlur}
                      aria-label={`${featured.title} ${L(shot.label, lang)} screenshot`}
                    >
                      <div className={styles.bentoShotImgWrap}>
                        <img src={shotSrc} alt="" className={styles.bentoShotImg} />
                      </div>
                      <div className={styles.bentoShotCaption}>
                        <span className={styles.bentoCellLabel}>{L(shot.label, lang)}</span>
                        <span className={styles.bentoShotCaptionText}>{L(shot.details[0], lang)}</span>
                      </div>
                      <div className={styles.bentoDetail}>
                        <span className={styles.bentoDetailHeader}>{L(shot.detailHeader, lang)}</span>
                        <p className={styles.bentoDetailBody}>
                          {shot.details.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}

                <motion.div
                  className={joinClasses(styles.bentoStats, isActive('stats') ? styles.intentActive : '')}
                  variants={cellVariants}
                  whileHover={liftHover}
                  onPointerEnter={handleIntentEnter(showcaseKey, 'stats')}
                  onPointerMove={handleIntentMove(showcaseKey, 'stats')}
                  onPointerLeave={handleIntentLeave(showcaseKey, 'stats')}
                >
                  {showcase.stats.map((stat) => (
                    <div key={`${stat.number}-${L(stat.label, lang)}`} className={styles.bentoStat}>
                      <div className={styles.bentoStatHead}>
                        <StatNumber value={stat.number} className={styles.bentoStatNum} />
                        <span className={styles.bentoStatLabel}>{L(stat.label, lang)}</span>
                      </div>
                      <p className={styles.bentoStatBody}>
                        {stat.details.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div className={styles.bentoBottom} variants={cellVariants}>
                <div className={styles.bentoBadges}>
                  {featured.techs.map((tech) => (
                    <TechBadge
                      key={tech}
                      tech={tech}
                      className={primaryTechs.has(tech) ? styles.badgePrimary : styles.badgeSecondary}
                    />
                  ))}
                </div>
                <div className={styles.bentoLinks}>
                  <a className={styles.btnGhost} href={featured.githubUrl} target="_blank" rel="noreferrer">
                    <img src={githubIcon} alt="" aria-hidden="true" className={styles.btnIcon} />
                    {t.github}
                  </a>
                  <button type="button" className={styles.btnPrimary} onClick={() => setCaseProject(featured)}>
                    {t.readCase}
                  </button>
                </div>
              </motion.div>

                </motion.article>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>

        {otherProjects.length > 0 && (
          <div className={styles.otherSection}>
            <span className={styles.otherTitle}>{t.more}</span>
            <div className={styles.cardGrid}>
              {otherProjects.map((projectItem) => (
                <CompactCard
                  key={projectItem.title}
                  {...projectItem}
                  description={lang === 'th' ? (projectItem.descriptionTh ?? projectItem.description) : projectItem.description}
                  onOpenGallery={projectItem.gallery ? () => openVideoGallery(projectItem) : undefined}
                  onOpenCase={projectItem.caseStudy ? () => setCaseProject(projectItem) : undefined}
                  caseLabel={t.liveDemo}
                />
              ))}
              <div className={styles.ghostCard} role="note">
                <span className={styles.ghostTitle}>{t.comingSoon}</span>
                <span className={styles.ghostSub}>{t.comingSoonSub}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>
          {caseProject?.caseStudy && (
            <CaseReader
              key="case-reader"
              title={caseProject.title}
              githubUrl={caseProject.githubUrl}
              caseStudy={caseProject.caseStudy}
              lang={lang}
              onClose={() => setCaseProject(null)}
            />
          )}
        </AnimatePresence>
      </Suspense>

      <Suspense fallback={null}>
        <AnimatePresence>
          {galleryProject?.gallery && (
            <GalleryModal
              key="gallery"
              images={galleryProject.gallery}
              video={galleryProject.previewVideo}
              initialIndex={galleryIndex}
              onClose={() => setGalleryProject(null)}
            />
          )}
        </AnimatePresence>
      </Suspense>
    </section>
  );
}

export default Projects;
