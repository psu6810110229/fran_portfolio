import styles from './ProjectCard.module.css';
import type { Project } from '../../types';

interface Props {
  project: Project;
}

function ProjectCard({ project }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        {project.badge && (
          <span className={styles.badge}>{project.badge}</span>
        )}
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className={styles.thumbImg}
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
  );
}

export default ProjectCard;
