import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { projects } from '../data/projects';
import GalleryModal from '../components/GalleryModal/GalleryModal';
import CompactCard from '../components/CompactCard/CompactCard';
import toursLogo from '../assets/9tours/logo.png';
import styles from './Projects.module.css';

const primaryTechs = new Set(['React', 'TypeScript', 'CSS']);

const roleItems = [
  'Led front-end architecture',
  'Component design system',
  'Client-side routing',
  'Team collaboration',
];

const labels = {
  en: { secTitle: 'Projects', more: 'More Projects' },
  th: { secTitle: 'โปรเจกต์', more: 'โปรเจกต์อื่น' },
};

function Projects() {
  const project = projects[0];
  const { lang } = useLanguage();
  const [galleryOpen, setGalleryOpen]   = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (index: number) => { setGalleryIndex(index); setGalleryOpen(true); };

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>{labels[lang].secTitle}</span>
        </div>

        <div className={styles.feature}>

          {/* ── Media ── */}
          <div className={styles.media}>
            <div
              className={styles.thumb}
              onClick={() => project.gallery && openGallery(1)}
            >
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className={styles.thumbImg}
                />
              )}
              <div className={styles.thumbOverlay} aria-hidden="true" />
              {project.badge && <span className={styles.featBadge}>{project.badge}</span>}
              {project.previewVideo && (
                <button
                  className={styles.playBtn}
                  onClick={(e) => { e.stopPropagation(); openGallery(0); }}
                  aria-label="Play demo video"
                >
                  ▶
                </button>
              )}
              {project.gallery && (
                <span className={styles.ssCount}>
                  {project.gallery.length} screenshots ↗
                </span>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className={styles.sidebar}>
            <img src={toursLogo} alt="9tours" className={styles.projLogo} />

            <p className={styles.projDesc}>{lang === 'th' ? (project.descriptionTh ?? project.description) : project.description}</p>

            <div className={styles.metaRow}>
              <span>3 developers</span>
              <span className={styles.metaDot}>·</span>
              <span>2 months</span>
              <span className={styles.metaDot}>·</span>
              <span>5 pages built</span>
            </div>

            <div className={styles.section}>
              <span className={styles.sectionLbl}>Role · Front-end Developer</span>
              <div className={styles.roleList}>
                {roleItems.map((item) => (
                  <div key={item} className={styles.ri}>
                    <span className={styles.riLine} aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <span className={styles.sectionLbl}>Stack</span>
              <div className={styles.badges}>
                {project.techs.map((t) => (
                  <span
                    key={t}
                    className={`${styles.badge} ${primaryTechs.has(t) ? styles.badgePrimary : ''}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.links}>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.lbtn} aria-label="GitHub">
                <i className="devicon-github-original" aria-hidden="true" />
                GitHub
              </a>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className={`${styles.lbtn} ${styles.lbtnAcc}`} aria-label="Live demo">
                  Live demo ↗
                </a>
              )}
            </div>
          </aside>

        </div>

        {/* ── More Projects ── */}
        {projects.length > 1 && (
          <div className={styles.otherSection}>
            <span className={styles.otherTitle}>{labels[lang].more}</span>
            <div className={styles.cardGrid}>
              {projects.slice(1).map((p) => (
                <CompactCard
                  key={p.title}
                  {...p}
                  description={lang === 'th' ? (p.descriptionTh ?? p.description) : p.description}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {galleryOpen && project.gallery && (
        <GalleryModal
          images={project.gallery}
          video={project.previewVideo}
          initialIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </section>
  );
}

export default Projects;
