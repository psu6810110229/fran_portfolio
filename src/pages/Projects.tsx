import ProjectCard from '../components/ProjectCard/ProjectCard';
import type { Project } from '../types';
import toursThumb from '../assets/9tours/user/Screenshot (452).png';
import styles from './Projects.module.css';

const projects: Project[] = [
  {
    title: '9tours',
    description: 'Tour booking platform built at PSU. Led front-end architecture, routing, and component design for the team.',
    tag: 'Team · 240-124',
    techs: ['React', 'CSS', 'SQL'],
    githubUrl: '#',
    liveUrl: '#',
    badge: 'Featured',
    thumbnail: toursThumb,
  },
];

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
