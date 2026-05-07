import { projects } from '../data/projects';
import styles from './Projects.module.css';

const primaryTechs = new Set(['React', 'TypeScript', 'Vite']);

function Projects() {
  const project = projects[0];

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>Projects</span>
        </div>

        <div className={styles.bento}>
          {/* Main card */}
          <div className={`${styles.cell} ${styles.mainCard}`}>
            <div className={styles.mockup}>
              {project.thumbnail && (
                <img src={project.thumbnail} alt={project.title} className={styles.mockupImg} />
              )}
            </div>
            <div className={styles.mainBody}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
            </div>
          </div>

          {/* Role card */}
          <div className={`${styles.cell} ${styles.roleCard}`}>
            <span className={styles.cardLabel}>Role</span>
            <h4 className={styles.roleTitle}>Front-end Developer</h4>
            <ul className={styles.roleList}>
              <li>Led front-end architecture</li>
              <li>Component design system</li>
              <li>Client-side routing</li>
              <li>Team collaboration</li>
            </ul>
            <span className={styles.teamPill}>3 developers · 2 months</span>
          </div>

          {/* Screenshot cell 1 */}
          <div className={`${styles.cell} ${styles.shot1}`}>
            <span className={styles.cardLabel}>Booking flow</span>
            <div className={styles.placeholder}>
              <div className={`${styles.mockBar} ${styles.barFull}`} />
              <div className={`${styles.mockBar} ${styles.barLong}`} />
              <div className={styles.mockCard} />
              <div className={`${styles.mockBar} ${styles.barMid}`} />
            </div>
          </div>

          {/* Screenshot cell 2 */}
          <div className={`${styles.cell} ${styles.shot2}`}>
            <span className={styles.cardLabel}>Admin panel</span>
            <div className={styles.placeholder}>
              <div className={`${styles.mockBar} ${styles.barFull}`} />
              <div className={`${styles.mockBar} ${styles.barMid}`} />
              <div className={styles.mockCard} />
              <div className={`${styles.mockBar} ${styles.barLong}`} />
            </div>
          </div>

          {/* Stats card */}
          <div className={styles.statsCard}>
            <div className={styles.stat}>
              <span className={styles.statNum}>5</span>
              <span className={styles.statLabel}>pages</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>developers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>2mo</span>
              <span className={styles.statLabel}>timeline</span>
            </div>
          </div>

          {/* Bottom row */}
          <div className={`${styles.cell} ${styles.bottomRow}`}>
            <div className={styles.techs}>
              {project.techs.map((t) => (
                <span key={t} className={`${styles.tech} ${primaryTechs.has(t) ? styles.techPrimary : styles.techDim}`}>
                  {t}
                </span>
              ))}
            </div>
            <div className={styles.links}>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className={styles.linkGhost}>
                GitHub ↗
              </a>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.linkFilled}>
                Live demo ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
