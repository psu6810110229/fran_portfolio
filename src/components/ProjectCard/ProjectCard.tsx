import { useState } from 'react';
import styles from './ProjectCard.module.css';
import type { Project } from '../../types';
import GalleryModal from '../GalleryModal/GalleryModal';

interface Props {
  project: Project;
}

function ProjectCard({ project }: Props) {
  const [isHovered, setIsHovered]     = useState(false);
  const [videoReady, setVideoReady]   = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const hasGallery = Boolean(project.gallery?.length);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => { setIsHovered(false); setVideoReady(false); };

  return (
    <>
      <article className={styles.card}>
        <div
          className={`${styles.thumb} ${hasGallery ? styles.thumbClickable : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => hasGallery && setGalleryOpen(true)}
          role={hasGallery ? 'button' : undefined}
          tabIndex={hasGallery ? 0 : undefined}
          onKeyDown={(e) => e.key === 'Enter' && hasGallery && setGalleryOpen(true)}
          aria-label={hasGallery ? `Open ${project.title} gallery` : undefined}
        >
          {project.badge && (
            <span className={styles.badge}>{project.badge}</span>
          )}

          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className={`${styles.thumbImg} ${videoReady ? styles.hidden : ''}`}
            />
          ) : (
            <div className={styles.thumbInner} aria-hidden="true">
              <div className={styles.thumbDots}>
                <span className={styles.dot1} />
                <span className={styles.dot2} />
                <span className={styles.dot3} />
              </div>
              <div className={styles.bar} style={{ width: '40%' }} />
              <div className={styles.bar} style={{ width: '70%' }} />
              <div className={styles.bar} style={{ width: '55%' }} />
              <div className={styles.bar} style={{ width: '45%' }} />
            </div>
          )}

          {isHovered && project.previewVideo && (
            <video
              src={project.previewVideo}
              className={styles.thumbVideo}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              onLoadedMetadata={(e) => { e.currentTarget.currentTime = 2; }}
              onCanPlay={() => setVideoReady(true)}
            />
          )}

          {hasGallery && (
            <span className={styles.galleryHint}>
              {isHovered ? 'Click to view gallery' : `${project.gallery!.length} screenshots`}
            </span>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.meta}>
            <h3 className={styles.title}>{project.title}</h3>
            <span className={styles.tag}>{project.tag}</span>
          </div>
          <p className={styles.desc}>{project.description}</p>
          <div className={styles.footer}>
            <div className={styles.techs}>
              {project.techs.map((t) => (
                <span key={t} className={styles.tech}>{t}</span>
              ))}
            </div>
            <div className={styles.links}>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.link} aria-label={`${project.title} GitHub (opens in new tab)`}>
                GitHub ↗
              </a>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.link} aria-label={`${project.title} live demo (opens in new tab)`}>
                Live ↗
              </a>
            </div>
          </div>
        </div>
      </article>

      {galleryOpen && project.gallery && (
        <GalleryModal
          images={project.gallery}
          initialIndex={0}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}

export default ProjectCard;
