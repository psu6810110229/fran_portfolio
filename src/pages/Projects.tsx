import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import GalleryModal from '../components/GalleryModal/GalleryModal';
import CaseReader from '../components/CaseReader/CaseReader';
import CompactCard from '../components/CompactCard/CompactCard';
import TechBadge from '../components/TechBadge/TechBadge';
import { projects } from '../data/projects';
import { useLanguage } from '../hooks/useLanguage';
import type { Localized, Project } from '../types';
import adminPanelShot from '../assets/9tours/admin/Screenshot (463).png';
import bookingFlowShot from '../assets/9tours/user/Screenshot (456).png';
import bentoHero9tours from '../assets/9tours/user/Screenshot (453).png';
import goOutShot2 from '../assets/GO-OUT/images/IMG_20260604_18513373_COPY.jpeg';
import githubIcon from '../assets/icons/github.svg';
import styles from './Projects.module.css';

const defaultPrimaryTechs = new Set(['React', 'TypeScript', 'CSS']);

const ui = {
  en: {
    secTitle: 'Projects',
    more: 'More projects',
    github: 'GitHub',
    liveDemo: 'More details',
    mobileMore: 'More',
    mobileLess: 'Less',
    caseInfo: 'Open case reader',
    preview: 'Open project preview',
    role: 'Role',
    outcome: 'Outcome',
    stack: 'Stack',
    purpose: 'Purpose',
    roleDetails: 'Role details',
    features: 'Features',
    stats: 'Takeaways',
    links: 'Links',
  },
  th: {
    secTitle: 'โปรเจกต์',
    more: 'โปรเจกต์อื่น ๆ',
    github: 'GitHub',
    liveDemo: 'รายละเอียด',
    mobileMore: 'เพิ่มเติม',
    mobileLess: 'ย่อ',
    caseInfo: 'เปิดเคสเต็ม',
    preview: 'ดูตัวอย่างโปรเจกต์',
    role: 'บทบาท',
    outcome: 'ผลลัพธ์',
    stack: 'สแต็ก',
    purpose: 'แอปนี้ทำอะไร',
    roleDetails: 'รายละเอียดบทบาท',
    features: 'ฟีเจอร์หลัก',
    stats: 'สิ่งที่ได้จากโปรเจกต์',
    links: 'ลิงก์',
  },
};

type BentoIntent = 'main' | 'role' | 'booking' | 'admin' | 'stats' | 'bottom';

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
  details: [Localized, Localized, Localized];
}

interface ShowcaseConfig {
  kicker: Localized;
  guide: Localized;
  heading: Localized;
  mainDetailHeader: Localized;
  mainDetails: [Localized, Localized, Localized];
  roleLabel: Localized;
  roleTitle: Localized;
  rolePoints: [Localized, Localized, Localized];
  roleDetailHeader: Localized;
  roleDetails: [Localized, Localized, Localized];
  roleFacts?: [BentoFactConfig, BentoFactConfig, BentoFactConfig, BentoFactConfig];
  heroOverride?: string;
  teamPill?: Localized;
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
    guide: {
      en: 'A booking platform focused on flow, trust, and managing both sides of the product.',
      th: 'เว็บไซต์จองทัวร์ที่ออนไลน์ที่ที่มีความน่าเชื่อถือ ใช้งานง่าย',
    },
    heading: {
      en: '9Tours — Online Tour Booking',
      th: '9Tours เว็บไซต์จองทัวร์ออนไลน์',
    },
    mainDetailHeader: {
      en: 'Project learning',
      th: 'สิ่งที่ได้เรียนรู้',
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
      en: 'Role learning',
      th: 'สิ่งที่ได้เรียนรู้จากบทบาท',
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
        en: 'Learned to communicate scope before writing code.',
        th: 'เรียนรู้การสื่อสาร scope ก่อนเริ่มเขียนโค้ด',
      },
    ],
    shots: [
      {
        label: {
          en: 'Booking flow',
          th: 'ขั้นตอนการจอง',
        },
        detailHeader: {
          en: 'Booking flow learning',
          th: 'สิ่งที่ได้เรียนรู้จากระบบจอง',
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
          en: 'Admin panel learning',
          th: 'สิ่งที่ได้เรียนรู้จากแผงแอดมิน',
        },
        details: [
          {
            en: 'Built for the people managing the system.',
            th: 'สร้างขึ้นสำหรับผู้ดูแลระบบโดยเฉพาะ',
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
        number: '1',
        label: {
          en: 'race bug fixed',
          th: 'บัก race ที่แก้ไข',
        },
        details: [
          {
            en: 'Found the booking race.',
            th: 'พบ race condition',
          },
          {
            en: 'Moved trust to server state.',
            th: 'ย้าย state ไปฝั่ง server',
          },
          {
            en: 'Learned to verify before success.',
            th: 'ตรวจสอบก่อนแจ้งสำเร็จ',
          },
        ],
      },
      {
        number: '2',
        label: {
          en: 'product sides',
          th: 'ฝั่งผลิตภัณฑ์',
        },
        details: [
          {
            en: 'Built the booking flow.',
            th: 'สร้างระบบจอง',
          },
          {
            en: 'Connected the admin side.',
            th: 'เชื่อมต่อฝั่งแอดมิน',
          },
          {
            en: 'Learned how both users think.',
            th: 'เข้าใจผู้ใช้สองฝั่ง',
          },
        ],
      },
      {
        number: '3',
        label: {
          en: 'devs led',
          th: 'นักพัฒนาในทีม',
        },
        details: [
          {
            en: 'Set the product direction.',
            th: 'กำหนดทิศทาง product',
          },
          {
            en: 'Kept teammates aligned.',
            th: 'รักษาทีมให้มุ่งเป้า',
          },
          {
            en: 'Learned to lead while building.',
            th: 'เรียนรู้การนำทีม',
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
    guide: {
      en: 'A smaller, more personal build about shared goals, private buckets, and money history people can trust.',
      th: 'ตั้งเป้า · ชวนเพื่อน · ออมด้วยกัน',
    },
    heading: {
      en: 'GO-OUT — Shared Savings Tracker',
      th: 'GO-OUT แอปติดตามการออมร่วมกัน',
    },
    mainDetailHeader: {
      en: 'Project learning',
      th: 'สิ่งที่ได้เรียนรู้',
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
          en: 'Saving plan learning',
          th: 'สิ่งที่ได้เรียนรู้จากแผนการออม',
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
          en: 'Project room learning',
          th: 'สิ่งที่ได้เรียนรู้จากห้องโปรเจกต์',
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

function Projects() {
  const { lang } = useLanguage();
  const t = ui[lang];
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [caseProject, setCaseProject] = useState<Project | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeIntentKey, setActiveIntentKey] = useState<string | null>(null);
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

  const openVideoGallery = (project: Project) => {
    setGalleryProject(project);
    setGalleryIndex(0);
  };

  const openImageGallery = (project: Project, imageIndex: number) => {
    const videoOffset = project.previewVideo ? 1 : 0;
    setGalleryProject(project);
    setGalleryIndex(imageIndex + videoOffset);
  };

  const handleIntentEnter = (showcaseKey: string, intent: BentoIntent) => (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
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
      setIntent(null);
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
        {showcaseProjects.map((featured) => {
          const cs = featured.caseStudy;
          const showcase = showcaseConfigs[featured.title];
          if (!cs || !showcase) return null;

          const showcaseKey = featured.title;
          const mobileDetailsId = `mobile-project-details-${showcaseKey.toLowerCase().replace(/\s+/g, '-')}`;
          const isMobileExpanded = expandedProject === showcaseKey;
          const featuredDescription = lang === 'th' ? (featured.descriptionTh ?? featured.description) : featured.description;
          const stackSummary = featured.techs.slice(0, 3).join(' / ');
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
            <article key={featured.title} id={`project-${featured.title.toLowerCase().replace(/\s+/g, '-')}`} className={styles.bento}>
              <div className={styles.bentoGuide}>
                <span className={styles.bentoGuideKicker}>{L(showcase.kicker, lang)}</span>
                <span className={styles.bentoGuideLine} aria-hidden="true" />
                <p className={styles.bentoGuideText}>{L(showcase.guide, lang)}</p>
              </div>
              <h2 className={styles.bentoHeading}>{L(showcase.heading, lang)}</h2>

              <div
                className={joinClasses(
                  styles.mobileProjectCard,
                  isMobileExpanded ? styles.mobileProjectCardExpanded : '',
                )}
              >
                <div className={styles.mobileHeroShell}>
                  <button
                    type="button"
                    className={styles.mobileHeroButton}
                    onClick={() => openVideoGallery(featured)}
                    aria-label={`${t.preview}: ${featured.title}`}
                  >
                    <img
                      src={cs.media.hero}
                      alt={`${featured.title} app screen`}
                      className={styles.mobileHeroImg}
                    />
                  </button>
                  <button
                    type="button"
                    className={styles.mobileInfoButton}
                    onClick={() => setCaseProject(featured)}
                    aria-label={`${t.caseInfo}: ${featured.title}`}
                  >
                    <span aria-hidden="true">i</span>
                  </button>
                </div>

                <div className={styles.mobileProjectBody}>
                  <h3 className={styles.mobileProjectTitle}>{L(showcase.heading, lang)}</h3>
                  <p className={styles.mobileProjectSummary}>{L(cs.whatTeamBuilt, lang)}</p>

                  <div className={styles.mobileSummaryGrid}>
                    <div className={styles.mobileSummaryItem}>
                      <span className={styles.mobileSummaryLabel}>{t.role}</span>
                      <strong className={styles.mobileSummaryValue}>{L(showcase.roleTitle, lang)}</strong>
                    </div>
                    <div className={styles.mobileSummaryItem}>
                      <span className={styles.mobileSummaryLabel}>{t.outcome}</span>
                      <strong className={styles.mobileSummaryValue}>{L(showcase.bottomDetail, lang)}</strong>
                    </div>
                    <div className={styles.mobileSummaryItem}>
                      <span className={styles.mobileSummaryLabel}>{t.stack}</span>
                      <strong className={styles.mobileSummaryValue}>{stackSummary}</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.mobileMoreButton}
                    aria-expanded={isMobileExpanded}
                    aria-controls={mobileDetailsId}
                    onClick={() => setExpandedProject(isMobileExpanded ? null : showcaseKey)}
                  >
                    {isMobileExpanded ? t.mobileLess : t.mobileMore}
                  </button>

                  <div id={mobileDetailsId} className={styles.mobileExpandWrap}>
                    <div className={styles.mobileExpandInner}>
                      <section className={styles.mobileExpandSection}>
                        <h4 className={styles.mobileExpandTitle}>{t.purpose}</h4>
                        <p>{featuredDescription}</p>
                      </section>

                      <section className={styles.mobileExpandSection}>
                        <h4 className={styles.mobileExpandTitle}>{t.features}</h4>
                        <ul className={styles.mobileDetailList}>
                          {showcase.shots.map((shot) => (
                            <li key={L(shot.label, lang)}>
                              <strong>{L(shot.label, lang)}</strong>
                              <span>{L(shot.details[0], lang)}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className={styles.mobileExpandSection}>
                        <h4 className={styles.mobileExpandTitle}>{t.stats}</h4>
                        <div className={styles.mobileStatsGrid}>
                          {showcase.stats.map((stat) => (
                            <div key={`${stat.number}-${L(stat.label, lang)}`} className={styles.mobileStatItem}>
                              <span className={styles.mobileStatNumber}>{stat.number}</span>
                              <span className={styles.mobileStatLabel}>{L(stat.label, lang)}</span>
                              <p className={styles.mobileStatDetails}>
                                {stat.details.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className={styles.mobileExpandSection}>
                        <h4 className={styles.mobileExpandTitle}>{t.stack}</h4>
                        <div className={styles.mobileBadgeRow}>
                          {featured.techs.map((tech) => (
                            <TechBadge
                              key={tech}
                              tech={tech}
                              className={primaryTechs.has(tech) ? styles.badgePrimary : styles.badgeSecondary}
                            />
                          ))}
                        </div>
                      </section>

                    </div>
                  </div>
                </div>
              </div>

              <div className={topRowClassName}>
                <button
                  type="button"
                  className={joinClasses(styles.bentoMain, isActive('main') ? styles.intentActive : '')}
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
                  </div>
                  <div className={styles.bentoMainContent}>
                    <h3 className={styles.bentoTitle}>{featured.title}</h3>
                    <p className={styles.bentoDesc}>{featuredDescription}</p>
                  </div>
                  <div className={styles.bentoDetail}>
                    <span className={styles.bentoDetailHeader}>{L(showcase.mainDetailHeader, lang)}</span>
                    <p className={styles.bentoDetailBody}>
                      {showcase.mainDetails.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  className={joinClasses(
                    styles.bentoRole,
                    showcase.roleFacts ? styles.bentoRoleWithFacts : '',
                    isActive('role') ? styles.intentActive : '',
                  )}
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
                  <div className={styles.bentoDetail}>
                    <span className={styles.bentoDetailHeader}>{L(showcase.roleDetailHeader, lang)}</span>
                    <p className={styles.bentoDetailBody}>
                      {showcase.roleDetails.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                    </p>
                  </div>
                  {showcase.roleFacts && (
                    <div className={styles.bentoFactGrid}>
                      {showcase.roleFacts.map((fact) => (
                        <span key={L(fact.label, lang)} className={styles.bentoFact}>
                          <span className={styles.bentoFactLabel}>{L(fact.label, lang)}</span>
                          <span className={styles.bentoFactValue}>{L(fact.value, lang)}</span>
                        </span>
                      ))}
                    </div>
                  )}
                  {showcase.teamPill && (
                    <span className={styles.bentoTeamPill}>{L(showcase.teamPill, lang)}</span>
                  )}
                </button>

                <button
                  type="button"
                  className={styles.bentoMoreMobile}
                  onClick={() => setCaseProject(featured)}
                >
                  {t.liveDemo}
                </button>
              </div>

              <div className={mediaRowClassName}>
                {showcase.shots.map((shot, index) => {
                  const shotIntent: BentoIntent = index === 0 ? 'booking' : 'admin';
                  const shotClass = index === 0 ? styles.bentoShot1 : styles.bentoShot2;
                  const shotSrc = shot.imageOverride ?? cs.media.gallery[shot.galleryIndex];

                  return (
                    <button
                      key={L(shot.label, lang)}
                      type="button"
                      className={joinClasses(styles.bentoShot, shotClass, isActive(shotIntent) ? styles.intentActive : '')}
                      onClick={() => openImageGallery(featured, shot.galleryIndex)}
                      onPointerEnter={handleIntentEnter(showcaseKey, shotIntent)}
                      onPointerMove={handleIntentMove(showcaseKey, shotIntent)}
                      onPointerLeave={handleIntentLeave(showcaseKey, shotIntent)}
                      onFocus={handleIntentFocus(showcaseKey, shotIntent)}
                      onBlur={handleIntentBlur}
                      aria-label={`${featured.title} ${L(shot.label, lang)} screenshot`}
                    >
                      <span className={styles.bentoCellLabel}>{L(shot.label, lang)}</span>
                      <div className={styles.bentoShotImgWrap}>
                        <img src={shotSrc} alt="" className={styles.bentoShotImg} />
                      </div>
                      <div className={styles.bentoDetail}>
                        <span className={styles.bentoDetailHeader}>{L(shot.detailHeader, lang)}</span>
                        <p className={styles.bentoDetailBody}>
                          {shot.details.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                        </p>
                      </div>
                    </button>
                  );
                })}

                <div
                  className={joinClasses(styles.bentoStats, isActive('stats') ? styles.intentActive : '')}
                  onPointerEnter={handleIntentEnter(showcaseKey, 'stats')}
                  onPointerMove={handleIntentMove(showcaseKey, 'stats')}
                  onPointerLeave={handleIntentLeave(showcaseKey, 'stats')}
                >
                  {showcase.stats.map((stat) => (
                    <div key={`${stat.number}-${L(stat.label, lang)}`} className={styles.bentoStat}>
                      <span className={styles.bentoStatNum}>{stat.number}</span>
                      <span className={styles.bentoStatLabel}>{L(stat.label, lang)}</span>
                      <p className={styles.bentoStatBody}>
                        {stat.details.map((detail) => <span key={L(detail, lang)}>{L(detail, lang)}</span>)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </article>
          );
        })}

        {otherProjects.length > 0 && (
          <div className={styles.otherSection}>
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
            </div>
          </div>
        )}
      </div>

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
    </section>
  );
}

export default Projects;
