import ProjectCard from '../components/ProjectCard/ProjectCard';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>Projects</span>
        </div>
        <div className={styles.list}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
