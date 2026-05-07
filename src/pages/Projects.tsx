import { useScrollReveal } from '../hooks/useScrollReveal';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import { projects } from '../data/projects';
import styles from './Projects.module.css';

function Projects() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="projects"
      className={`${styles.projects} reveal ${isVisible ? 'show' : ''}`}
      ref={ref}
    >
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
