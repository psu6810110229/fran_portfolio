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
        <div className={styles.thumbInner}>
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
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.link}>
              GitHub ↗
            </a>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.link}>
              Live ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
