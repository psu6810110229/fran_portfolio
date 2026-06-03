import { useState } from 'react';
import GalleryModal from '../components/GalleryModal/GalleryModal';
import CompactCard from '../components/CompactCard/CompactCard';
import { projects } from '../data/projects';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Projects.module.css';

const primaryTechs = new Set(['React', 'TypeScript', 'CSS']);

const roleItems = {
  en: ['Led front-end architecture', 'Component design system', 'Client-side routing', 'Team collaboration'],
  th: ['ดูแลสถาปัตยกรรมฝั่ง Front-end', 'ออกแบบระบบคอมโพเนนต์', 'จัดการ routing ฝั่ง client', 'ทำงานร่วมกับทีม'],
};

const highlights = {
  en: ['End-to-end booking flow', 'Admin dashboard', 'Responsive, accessible UI'],
  th: ['ระบบจองครบทั้งกระบวนการ', 'แดชบอร์ดสำหรับผู้ดูแล', 'UI ที่รองรับทุกอุปกรณ์และเข้าถึงง่าย'],
};

const shots = [
  { key: 'booking', index: 1, label: { en: 'Booking flow', th: 'หน้าจอง' } },
  { key: 'admin', index: 11, label: { en: 'Admin panel', th: 'หน้าผู้ดูแล' } },
];

const labels = {
  en: { secTitle: 'Projects', more: 'More Projects', role: 'Role', roleTitle: 'Front-end Developer', team: '3 developers · 2 months', stack: 'Stack', highlights: 'Highlights', open: 'Open', live: 'Live demo' },
  th: { secTitle: 'โปรเจกต์', more: 'โปรเจกต์อื่น', role: 'บทบาท', roleTitle: 'นักพัฒนา Front-end', team: '3 คน · 2 เดือน', stack: 'เทคโนโลยี', highlights: 'จุดเด่น', open: 'เปิดดู', live: 'เดโม' },
};

function Projects() {
  const project = projects[0];
  const { lang } = useLanguage();
  const t = labels[lang];
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>{t.secTitle}</span>
        </div>
        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.mainCard}`}>
            <button type="button" className={styles.browserMockup} onClick={() => openGallery(1)} aria-label={`${t.open} ${project.title}`}>
              <div className={styles.browserBar}>
                <span />
                <span />
                <span />
              </div>
              {project.thumbnail && <img src={project.thumbnail} alt={project.title} className={styles.browserImage} />}
            </button>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDescription}>{lang === 'th' ? (project.descriptionTh ?? project.description) : project.description}</p>
          </article>

          <article className={`${styles.card} ${styles.roleCard}`}>
            <span className={styles.cardLabel}>{t.role}</span>
            <h4 className={styles.roleTitle}>{t.roleTitle}</h4>
            <ul className={styles.roleList}>
              {roleItems[lang].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <span className={styles.teamPill}>{t.team}</span>
          </article>

          {shots.map((shot) => (
            <button key={shot.key} type="button" className={`${styles.card} ${styles.shotCard} ${shot.key === 'booking' ? styles.bookingCard : styles.adminCard}`} onClick={() => openGallery(shot.index)} aria-label={`${t.open} ${shot.label[lang]}`}>
              {project.gallery?.[shot.index] && <img src={project.gallery[shot.index]} alt={shot.label[lang]} className={styles.shotImage} />}
              <span className={styles.shotLabel}>{shot.label[lang]}</span>
            </button>
          ))}

          <article className={`${styles.card} ${styles.highlightsCard}`}>
            <span className={styles.cardLabel}>{t.highlights}</span>
            <ul className={styles.highlightList}>
              {highlights[lang].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <div className={`${styles.card} ${styles.bottomBar}`}>
            <div className={styles.stackBlock}>
              <span className={styles.cardLabel}>{t.stack}</span>
              <div className={styles.badges}>
                {project.techs.map((tech) => <span key={tech} className={primaryTechs.has(tech) ? styles.badgePrimary : styles.badgeSecondary}>{tech}</span>)}
              </div>
            </div>
            <div className={styles.links}>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.githubLink}>GitHub</a>
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.liveLink}>{t.live}</a>}
            </div>
          </div>
        </div>

        {projects.length > 1 && (
          <div className={styles.otherSection}>
            <span className={styles.otherTitle}>{t.more}</span>
            <div className={styles.cardGrid}>
              {projects.slice(1).map((projectItem) => <CompactCard key={projectItem.title} {...projectItem} description={lang === 'th' ? (projectItem.descriptionTh ?? projectItem.description) : projectItem.description} />)}
            </div>
          </div>
        )}
      </div>

      {galleryOpen && project.gallery && <GalleryModal images={project.gallery} video={project.previewVideo} initialIndex={galleryIndex} onClose={() => setGalleryOpen(false)} />}
    </section>
  );
}

export default Projects;
