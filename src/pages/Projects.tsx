import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react';
import { AnimatePresence } from 'motion/react';
import GalleryModal from '../components/GalleryModal/GalleryModal';
import CaseReader from '../components/CaseReader/CaseReader';
import CompactCard from '../components/CompactCard/CompactCard';
import { projects } from '../data/projects';
import { useLanguage } from '../hooks/useLanguage';
import adminPanelShot from '../assets/9tours/admin/Screenshot (463).png';
import bookingFlowShot from '../assets/9tours/user/Screenshot (456).png';
import styles from './Projects.module.css';

const primaryTechs = new Set(['React', 'TypeScript', 'CSS']);

const ui = {
  en: {
    secTitle: 'Projects',
    more: 'More projects',
    bentoHeading: '9Tours — Online Tour Booking',
    mainDetailHeader: 'Project learning',
    mainDetail1: 'Led the product direction from wireframe to build.',
    mainDetail2: 'Worked across front-end screens and API behavior.',
    mainDetail3: 'Learned how product decisions affect real booking trust.',
    myRole: 'My role',
    roleDetailHeader: 'Role learning',
    roleDetail1: 'Kept the team focused on the same product goal.',
    roleDetail2: 'Balanced project management with hands-on building.',
    roleDetail3: 'Learned to communicate scope before writing code.',
    teamPill: '3 developers · 2 months',
    bookingLabel: 'Booking flow',
    bookingDetailHeader: 'Booking flow learning',
    bookingDetail1: 'Mapped the tour path from browse to confirm.',
    bookingDetail2: 'Learned where booking state can break trust.',
    bookingDetail3: 'Kept the screen honest before showing success.',
    adminLabel: 'Admin panel',
    adminDetailHeader: 'Admin panel learning',
    adminDetail1: 'Built for the people managing the system.',
    adminDetail2: 'Learned to organize operational data clearly.',
    adminDetail3: 'Connected product decisions across both sides.',
    stat1Label: 'race bug fixed',
    stat1Body1: 'Found the booking race.',
    stat1Body2: 'Moved trust to server state.',
    stat1Body3: 'Learned to verify before success.',
    stat2Label: 'product sides',
    stat2Body1: 'Built the booking flow.',
    stat2Body2: 'Connected the admin side.',
    stat2Body3: 'Learned how both users think.',
    stat3Label: 'devs led',
    stat3Body1: 'Set the product direction.',
    stat3Body2: 'Kept teammates aligned.',
    stat3Body3: 'Learned to lead while building.',
    bottomDetail: 'Primary stack plus the two project entry points.',
    github: 'GitHub',
    liveDemo: 'Live demo',
  },
  th: {
    secTitle: 'โปรเจกต์',
    more: 'โปรเจกต์อื่น ๆ',
    bentoHeading: '9Tours เว็บไซต์จองทัวร์ออนไลน์',
    mainDetailHeader: 'สิ่งที่ได้เรียนรู้',
    mainDetail1: 'ดูแลทิศทางโปรเจกต์ตั้งแต่ wireframe ถึงเวอร์ชันจริง',
    mainDetail2: 'ทำงานทั้งฝั่ง front-end และ API',
    mainDetail3: 'เข้าใจว่าการตัดสินใจด้าน product ส่งผลต่อความน่าเชื่อถือในการจองอย่างไร',
    myRole: 'บทบาทของฉัน',
    roleDetailHeader: 'สิ่งที่ได้เรียนรู้จากบทบาท',
    roleDetail1: 'ทำให้ทีมมุ่งเน้นเป้าหมายเดียวกัน',
    roleDetail2: 'สมดุลระหว่างการจัดการโปรเจกต์และการพัฒนาจริง',
    roleDetail3: 'เรียนรู้การสื่อสาร scope ก่อนเริ่มเขียนโค้ด',
    teamPill: '3 นักพัฒนา · 2 เดือน',
    bookingLabel: 'ขั้นตอนการจอง',
    bookingDetailHeader: 'สิ่งที่ได้เรียนรู้จากระบบจอง',
    bookingDetail1: 'ออกแบบเส้นทางผู้ใช้ตั้งแต่เรียกดูถึงยืนยัน',
    bookingDetail2: 'เข้าใจจุดที่ state การจองอาจทำลายความน่าเชื่อถือ',
    bookingDetail3: 'แสดงผลที่ถูกต้องก่อนแจ้งว่าสำเร็จ',
    adminLabel: 'แผงแอดมิน',
    adminDetailHeader: 'สิ่งที่ได้เรียนรู้จากแผงแอดมิน',
    adminDetail1: 'สร้างขึ้นสำหรับผู้ดูแลระบบโดยเฉพาะ',
    adminDetail2: 'เรียนรู้การจัดระเบียบข้อมูลการดำเนินงานอย่างชัดเจน',
    adminDetail3: 'เชื่อมโยงการตัดสินใจด้าน product ทั้งสองฝั่ง',
    stat1Label: 'บัก race ที่แก้ไข',
    stat1Body1: 'พบ race condition',
    stat1Body2: 'ย้าย state ไปฝั่ง server',
    stat1Body3: 'ตรวจสอบก่อนแจ้งสำเร็จ',
    stat2Label: 'ฝั่งผลิตภัณฑ์',
    stat2Body1: 'สร้างระบบจอง',
    stat2Body2: 'เชื่อมต่อฝั่งแอดมิน',
    stat2Body3: 'เข้าใจผู้ใช้สองฝั่ง',
    stat3Label: 'นักพัฒนาในทีม',
    stat3Body1: 'กำหนดทิศทาง product',
    stat3Body2: 'รักษาทีมให้มุ่งเป้า',
    stat3Body3: 'เรียนรู้การนำทีม',
    bottomDetail: 'เทคโนโลยีหลักและสองจุดเข้าถึงโปรเจกต์',
    github: 'GitHub',
    liveDemo: 'ดูเดโม',
  },
};

const previewPoints = {
  en: [
    'Group lead and project manager, from wireframe to production',
    'Solved a booking race condition across the front-end and API',
    'Built the booking flow and admin side with the team',
  ],
  th: [
    'หัวหน้ากลุ่มและดูแลภาพรวมโปรเจกต์ ตั้งแต่ wireframe ถึงเวอร์ชันจริง',
    'แก้ปัญหา race condition ของการจอง ทั้งฝั่ง front-end และ API',
    'สร้างระบบจองและฝั่ง admin ร่วมกับทีม',
  ],
};

const roleTitle = {
  en: 'Group lead & project manager',
  th: 'หัวหน้ากลุ่ม & ผู้จัดการโปรเจกต์',
};

type BentoIntent = 'main' | 'role' | 'booking' | 'admin' | 'stats' | 'bottom';

interface PointerSample {
  x: number;
  y: number;
  time: number;
}

const joinClasses = (...classNames: string[]) => classNames.filter(Boolean).join(' ');

function Projects() {
  const featured = projects[0];
  const cs = featured.caseStudy;
  const { lang } = useLanguage();
  const t = ui[lang];
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [caseOpen, setCaseOpen] = useState(false);
  const [activeIntent, setActiveIntent] = useState<BentoIntent | null>(null);
  const activeIntentRef = useRef<BentoIntent | null>(null);
  const intentTimerRef = useRef<number | null>(null);
  const pendingIntentRef = useRef<BentoIntent | null>(null);
  const lastPointerRef = useRef<PointerSample | null>(null);

  const setIntent = (intent: BentoIntent | null) => {
    activeIntentRef.current = intent;
    setActiveIntent(intent);
  };

  const clearIntentTimer = () => {
    if (intentTimerRef.current !== null) {
      window.clearTimeout(intentTimerRef.current);
      intentTimerRef.current = null;
    }
    pendingIntentRef.current = null;
  };

  const scheduleIntent = (intent: BentoIntent, delayMs: number) => {
    clearIntentTimer();
    pendingIntentRef.current = intent;
    intentTimerRef.current = window.setTimeout(() => {
      setIntent(intent);
      pendingIntentRef.current = null;
      intentTimerRef.current = null;
    }, delayMs);
  };

  useEffect(() => () => {
    if (intentTimerRef.current !== null) {
      window.clearTimeout(intentTimerRef.current);
    }
  }, []);

  const videoOffset = featured.previewVideo ? 1 : 0;
  const openGallery = (imageIndex: number) => {
    setGalleryIndex(imageIndex + videoOffset);
    setGalleryOpen(true);
  };

  const handleIntentEnter = (intent: BentoIntent) => (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    lastPointerRef.current = { x: event.clientX, y: event.clientY, time: performance.now() };
    scheduleIntent(intent, 110);
  };

  const handleIntentMove = (intent: BentoIntent) => (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    if (activeIntentRef.current === intent) return;

    const now = performance.now();
    const lastPointer = lastPointerRef.current;
    lastPointerRef.current = { x: event.clientX, y: event.clientY, time: now };

    if (!lastPointer) {
      scheduleIntent(intent, 110);
      return;
    }

    const distance = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
    const elapsed = Math.max(now - lastPointer.time, 1);
    const speed = distance / elapsed;

    if (speed < 0.12) {
      scheduleIntent(intent, 45);
      return;
    }

    if (pendingIntentRef.current !== intent) {
      scheduleIntent(intent, 110);
    }
  };

  const handleIntentLeave = (intent: BentoIntent) => () => {
    if (pendingIntentRef.current === intent) {
      clearIntentTimer();
    }
    lastPointerRef.current = null;
    if (activeIntentRef.current === intent) {
      setIntent(null);
    }
  };

  const handleIntentFocus = (intent: BentoIntent) => () => setIntent(intent);

  const handleIntentBlur = (event: FocusEvent<HTMLElement>) => {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
    setIntent(null);
  };

  const topRowClassName = joinClasses(
    styles.bentoTopRow,
    activeIntent === 'main' ? styles.bentoTopRowMainIntent : '',
    activeIntent === 'role' ? styles.bentoTopRowRoleIntent : '',
  );

  const mediaRowClassName = joinClasses(
    styles.bentoMediaRow,
    activeIntent === 'booking' ? styles.bentoMediaRowBookingIntent : '',
    activeIntent === 'admin' ? styles.bentoMediaRowAdminIntent : '',
    activeIntent === 'stats' ? styles.bentoMediaRowStatsIntent : '',
  );

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>{t.secTitle}</span>
        </div>

        {cs && (
          <article className={styles.bento}>
            <h2 className={styles.bentoHeading}>{t.bentoHeading}</h2>

            {/* Row 1: main card + role card */}
            <div className={topRowClassName}>
            <button
              type="button"
              className={joinClasses(styles.bentoMain, activeIntent === 'main' ? styles.intentActive : '')}
              onClick={() => { setGalleryIndex(0); setGalleryOpen(true); }}
              onPointerEnter={handleIntentEnter('main')}
              onPointerMove={handleIntentMove('main')}
              onPointerLeave={handleIntentLeave('main')}
              onFocus={handleIntentFocus('main')}
              onBlur={handleIntentBlur}
              aria-label={`${featured.title} — watch video preview`}
            >
              <div className={styles.bentoThumbWrap}>
                <img
                  src={cs.media.hero}
                  alt={`${featured.title} booking screen`}
                  className={styles.bentoHeroImg}
                />
              </div>
              <div className={styles.bentoMainContent}>
                <h3 className={styles.bentoTitle}>{featured.title}</h3>
                <p className={styles.bentoDesc}>
                  {lang === 'th' ? (featured.descriptionTh ?? featured.description) : featured.description}
                </p>
              </div>
              <div className={styles.bentoDetail}>
                <span className={styles.bentoDetailHeader}>{t.mainDetailHeader}</span>
                <p className={styles.bentoDetailBody}>
                  <span>{t.mainDetail1}</span>
                  <span>{t.mainDetail2}</span>
                  <span>{t.mainDetail3}</span>
                </p>
              </div>
            </button>

            <div
              className={joinClasses(styles.bentoRole, activeIntent === 'role' ? styles.intentActive : '')}
              onPointerEnter={handleIntentEnter('role')}
              onPointerMove={handleIntentMove('role')}
              onPointerLeave={handleIntentLeave('role')}
              onFocus={handleIntentFocus('role')}
              onBlur={handleIntentBlur}
            >
              <span className={styles.bentoCellLabel}>{t.myRole}</span>
              <span className={styles.bentoRoleTitle}>{roleTitle[lang]}</span>
              <ul className={styles.bentoRoleList}>
                {previewPoints[lang].map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className={styles.bentoDetail}>
                <span className={styles.bentoDetailHeader}>{t.roleDetailHeader}</span>
                <p className={styles.bentoDetailBody}>
                  <span>{t.roleDetail1}</span>
                  <span>{t.roleDetail2}</span>
                  <span>{t.roleDetail3}</span>
                </p>
              </div>
              <span className={styles.bentoTeamPill}>{t.teamPill}</span>
            </div>

            </div>

            {/* Row 2: screenshots + stats */}
            <div className={mediaRowClassName}>
            <button
              type="button"
              className={joinClasses(styles.bentoShot, styles.bentoShot1, activeIntent === 'booking' ? styles.intentActive : '')}
              onClick={() => openGallery(4)}
              onPointerEnter={handleIntentEnter('booking')}
              onPointerMove={handleIntentMove('booking')}
              onPointerLeave={handleIntentLeave('booking')}
              onFocus={handleIntentFocus('booking')}
              onBlur={handleIntentBlur}
              aria-label={`${featured.title} booking flow screenshot`}
            >
              <span className={styles.bentoCellLabel}>{t.bookingLabel}</span>
              <div className={styles.bentoShotImgWrap}>
                <img src={bookingFlowShot} alt="" className={styles.bentoShotImg} />
              </div>
              <div className={styles.bentoDetail}>
                <span className={styles.bentoDetailHeader}>{t.bookingDetailHeader}</span>
                <p className={styles.bentoDetailBody}>
                  <span>{t.bookingDetail1}</span>
                  <span>{t.bookingDetail2}</span>
                  <span>{t.bookingDetail3}</span>
                </p>
              </div>
            </button>

            <button
              type="button"
              className={joinClasses(styles.bentoShot, styles.bentoShot2, activeIntent === 'admin' ? styles.intentActive : '')}
              onClick={() => openGallery(11)}
              onPointerEnter={handleIntentEnter('admin')}
              onPointerMove={handleIntentMove('admin')}
              onPointerLeave={handleIntentLeave('admin')}
              onFocus={handleIntentFocus('admin')}
              onBlur={handleIntentBlur}
              aria-label={`${featured.title} admin panel screenshot`}
            >
              <span className={styles.bentoCellLabel}>{t.adminLabel}</span>
              <div className={styles.bentoShotImgWrap}>
                <img src={adminPanelShot} alt="" className={styles.bentoShotImg} />
              </div>
              <div className={styles.bentoDetail}>
                <span className={styles.bentoDetailHeader}>{t.adminDetailHeader}</span>
                <p className={styles.bentoDetailBody}>
                  <span>{t.adminDetail1}</span>
                  <span>{t.adminDetail2}</span>
                  <span>{t.adminDetail3}</span>
                </p>
              </div>
            </button>

              <div
                className={joinClasses(styles.bentoStats, activeIntent === 'stats' ? styles.intentActive : '')}
                onPointerEnter={handleIntentEnter('stats')}
                onPointerMove={handleIntentMove('stats')}
                onPointerLeave={handleIntentLeave('stats')}
              >
                <div className={styles.bentoStat}>
                  <span className={styles.bentoStatNum}>1</span>
                  <span className={styles.bentoStatLabel}>{t.stat1Label}</span>
                  <p className={styles.bentoStatBody}>
                    <span>{t.stat1Body1}</span>
                    <span>{t.stat1Body2}</span>
                    <span>{t.stat1Body3}</span>
                  </p>
                </div>
                <div className={styles.bentoStat}>
                  <span className={styles.bentoStatNum}>2</span>
                  <span className={styles.bentoStatLabel}>{t.stat2Label}</span>
                  <p className={styles.bentoStatBody}>
                    <span>{t.stat2Body1}</span>
                    <span>{t.stat2Body2}</span>
                    <span>{t.stat2Body3}</span>
                  </p>
                </div>
                <div className={styles.bentoStat}>
                  <span className={styles.bentoStatNum}>3</span>
                  <span className={styles.bentoStatLabel}>{t.stat3Label}</span>
                  <p className={styles.bentoStatBody}>
                    <span>{t.stat3Body1}</span>
                    <span>{t.stat3Body2}</span>
                    <span>{t.stat3Body3}</span>
                  </p>
                </div>
            </div>
            </div>

            {/* Row 3: stack + links */}
            <div
              className={joinClasses(styles.bentoBottom, activeIntent === 'bottom' ? styles.intentActive : '')}
              onPointerEnter={handleIntentEnter('bottom')}
              onPointerMove={handleIntentMove('bottom')}
              onPointerLeave={handleIntentLeave('bottom')}
              onFocus={handleIntentFocus('bottom')}
              onBlur={handleIntentBlur}
            >
              <div className={styles.bentoBadges}>
                {featured.techs.map((tech) => (
                  <span key={tech} className={primaryTechs.has(tech) ? styles.badgePrimary : styles.badgeSecondary}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={styles.bentoLinks}>
                <a href={featured.githubUrl} target="_blank" rel="noreferrer" className={styles.btnGhost}>{t.github}</a>
                <button type="button" className={styles.btnPrimary} onClick={() => setCaseOpen(true)}>{t.liveDemo}</button>
              </div>
              <span className={styles.bentoDetail}>{t.bottomDetail}</span>
            </div>

          </article>
        )}

        {projects.length > 1 && (
          <div className={styles.otherSection}>
            <span className={styles.otherTitle}>{t.more}</span>
            <div className={styles.cardGrid}>
              {projects.slice(1).map((projectItem) => (
                <CompactCard
                  key={projectItem.title}
                  {...projectItem}
                  description={lang === 'th' ? (projectItem.descriptionTh ?? projectItem.description) : projectItem.description}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {caseOpen && cs && (
          <CaseReader key="case-reader" title={featured.title} githubUrl={featured.githubUrl} caseStudy={cs} lang={lang} onClose={() => setCaseOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {galleryOpen && featured.gallery && (
          <GalleryModal key="gallery" images={featured.gallery} video={featured.previewVideo} initialIndex={galleryIndex} onClose={() => setGalleryOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
