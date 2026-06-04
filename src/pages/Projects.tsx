import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import GalleryModal from '../components/GalleryModal/GalleryModal';
import CaseReader from '../components/CaseReader/CaseReader';
import CompactCard from '../components/CompactCard/CompactCard';
import { projects } from '../data/projects';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Projects.module.css';

const primaryTechs = new Set(['React', 'TypeScript', 'CSS']);

const ui = {
  en: { secTitle: 'Projects', eyebrow: 'Featured case study', more: 'More projects', stack: 'Stack', readCase: 'Read the full case', viewCode: 'View team code' },
  th: { secTitle: 'โปรเจกต์', eyebrow: 'กรณีศึกษา', more: 'โปรเจกต์อื่น ๆ', stack: 'เทคโนโลยี', readCase: 'อ่านฉบับเต็ม', viewCode: 'ดูโค้ดของทีม' },
};

// Short, honest at-a-glance points so the preview communicates value without opening the full case.
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

function Projects() {
  const featured = projects[0];
  const cs = featured.caseStudy;
  const { lang } = useLanguage();
  const t = ui[lang];
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [caseOpen, setCaseOpen] = useState(false);

  // GalleryModal puts the video at slide 0 when present, so image array index i maps to slide i + offset.
  const videoOffset = featured.previewVideo ? 1 : 0;
  const openImage = (i: number) => { setGalleryIndex(i + videoOffset); setGalleryOpen(true); };

  const thumbs = cs ? [
    { src: cs.media.thumbs[0], index: 1 },
    { src: cs.media.thumbs[1], index: 2 },
    { src: cs.media.thumbs[2], index: 11 },
  ] : [];

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>{t.secTitle}</span>
        </div>

        {cs && (
          <article className={styles.feature}>
            <button
              type="button"
              className={styles.heroFrame}
              onClick={() => setCaseOpen(true)}
              aria-label={`${t.readCase}: ${featured.title}`}
            >
              <span className={styles.heroBar} aria-hidden="true"><span /><span /><span /></span>
              <img src={cs.media.hero} alt={`${featured.title} booking screen`} className={styles.heroImg} />
            </button>

            <div className={styles.body}>
              <span className={styles.eyebrow}>{t.eyebrow}</span>
              <h3 className={styles.title}>{featured.title}</h3>
              <p className={styles.lead}>
                {lang === 'th' ? (featured.descriptionTh ?? featured.description) : featured.description}
              </p>

              <ul className={styles.points}>
                {previewPoints[lang].map((p) => <li key={p}>{p}</li>)}
              </ul>

              <div className={styles.thumbs}>
                {thumbs.map((th, i) => (
                  <button key={th.index} type="button" className={styles.thumb} onClick={() => openImage(th.index)} aria-label={`${featured.title} screenshot ${i + 1}`}>
                    <img src={th.src} alt="" className={styles.thumbImg} />
                  </button>
                ))}
              </div>

              <div className={styles.stackRow}>
                <span className={styles.stackLabel}>{t.stack}</span>
                <div className={styles.badges}>
                  {featured.techs.map((tech) => (
                    <span key={tech} className={primaryTechs.has(tech) ? styles.badgePrimary : styles.badgeSecondary}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.btnPrimary} onClick={() => setCaseOpen(true)}>{t.readCase}</button>
                <a href={featured.githubUrl} target="_blank" rel="noreferrer" className={styles.btnGhost}>{t.viewCode}</a>
              </div>
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
