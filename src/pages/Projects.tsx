import { useState } from 'react';
import { projects } from '../data/projects';
import GalleryModal from '../components/GalleryModal/GalleryModal';
import shot456 from '../assets/9tours/user/Screenshot (456).png';
import shot463 from '../assets/9tours/admin/Screenshot (463).png';
import toursLogo from '../assets/9tours/logo.png';
import styles from './Projects.module.css';

const primaryTechs = new Set(['React', 'TypeScript', 'CSS']);

const roleItems = [
  'Led front-end architecture',
  'Component design system',
  'Client-side routing',
  'Team collaboration',
];

function Projects() {
  const project = projects[0];
  const [isHovered, setIsHovered]     = useState(false);
  const [videoReady, setVideoReady]   = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (index: number) => { setGalleryIndex(index); setGalleryOpen(true); };
  // video occupies modal index 0 when previewVideo exists, so images are offset by 1
  const videoOffset = project.previewVideo ? 1 : 0;
  const imgIndex = (src: string) => (project.gallery?.indexOf(src) ?? 0) + videoOffset;

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>Projects</span>
        </div>

        <div className={styles.bento}>

          {/* ── Main card ── */}
          <div className={`${styles.cell} ${styles.cMain}`}>
            <div
              className={styles.thumb}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => { setIsHovered(false); setVideoReady(false); }}
              onClick={() => project.gallery && openGallery(0)}
            >
              {project.thumbnail && (
                <img src={project.thumbnail} alt={project.title} className={`${styles.thumbImg} ${videoReady ? styles.hidden : ''}`} />
              )}
              {isHovered && project.previewVideo && (
                <video src={project.previewVideo} className={styles.thumbVideo} autoPlay muted loop playsInline aria-hidden="true"
                  onLoadedMetadata={(e) => { e.currentTarget.currentTime = 2; }}
                  onCanPlay={() => setVideoReady(true)}
                />
              )}
              <div className={styles.thumbOverlay} aria-hidden="true" />
              {project.badge && <span className={styles.featBadge}>{project.badge}</span>}
              {project.gallery && (
                <span className={styles.ssCount}>
                  {project.previewVideo ? `1 video · ${project.gallery.length} screenshots` : `${project.gallery.length} screenshots`} ↗
                </span>
              )}
            </div>
            <div className={styles.mainFoot}>
              <img src={toursLogo} alt="9tours" className={styles.projLogo} />
              <p className={styles.projDesc}>{project.description}</p>
            </div>
          </div>

          {/* ── Role card ── */}
          <div className={`${styles.cell} ${styles.cRole}`}>
            <span className={styles.roleLbl}>Role</span>
            <h4 className={styles.roleTitle}>Front-end<br />Developer</h4>
            <div className={styles.roleList}>
              {roleItems.map((item) => (
                <div key={item} className={styles.ri}>
                  <span className={styles.riLine} aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ── Screenshot 1 ── */}
          <div className={`${styles.cell} ${styles.cS1} ${styles.clickable}`} onClick={() => openGallery(imgIndex(shot456))}>
            <img src={shot456} alt="Booking flow" className={styles.screenImg} />
            <span className={styles.screenLabel}>Booking flow ↗</span>
          </div>

          {/* ── Screenshot 2 ── */}
          <div className={`${styles.cell} ${styles.cS2} ${styles.clickable}`} onClick={() => openGallery(imgIndex(shot463))}>
            <img src={shot463} alt="Admin panel" className={styles.screenImg} />
            <span className={styles.screenLabel}>Admin panel ↗</span>
          </div>

          {/* ── Stats ── */}
          <div className={`${styles.cell} ${styles.cStats}`}>
            <span className={styles.statLbl}>Impact</span>
            <div className={styles.statGroup}><span className={styles.statN}>5</span><span className={styles.statD}>pages built</span></div>
            <div className={styles.statDiv} />
            <div className={styles.statGroup}><span className={styles.statN}>3</span><span className={styles.statD}>developers</span></div>
            <div className={styles.statDiv} />
            <div className={styles.statGroup}><span className={styles.statN}>2mo</span><span className={styles.statD}>timeline</span></div>
          </div>

          {/* ── Bottom row ── */}
          <div className={`${styles.cell} ${styles.cBot}`}>
            <div className={styles.badges}>
              {project.techs.map((t) => (
                <span key={t} className={`${styles.badge} ${primaryTechs.has(t) ? styles.badgePrimary : ''}`}>{t}</span>
              ))}
            </div>
            <div className={styles.dividerV} />
            <div className={styles.links}>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.lbtn} aria-label="GitHub">
                <i className="devicon-github-original" aria-hidden="true" />
                GitHub
              </a>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className={`${styles.lbtn} ${styles.lbtnAcc}`} aria-label="Live demo">
                Live demo ↗
              </a>
            </div>
          </div>

        </div>
      </div>

      {galleryOpen && project.gallery && (
        <GalleryModal images={project.gallery} video={project.previewVideo} initialIndex={galleryIndex} onClose={() => setGalleryOpen(false)} />
      )}
    </section>
  );
}

export default Projects;
