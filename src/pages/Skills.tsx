import styles from './Skills.module.css';

interface Skill {
  icon: string;
  label: string;
  main?: boolean;
}

const skills: Skill[] = [
  { icon: 'devicon-react-original',     label: 'React',      main: true },
  { icon: 'devicon-typescript-plain',   label: 'TypeScript', main: true },
  { icon: 'devicon-vitejs-plain',       label: 'Vite',       main: true },
  { icon: 'devicon-css3-plain',         label: 'CSS',        main: true },
  { icon: 'devicon-mysql-plain',        label: 'SQL' },
  { icon: 'devicon-docker-plain',       label: 'Docker' },
  { icon: 'devicon-git-plain',          label: 'Git' },
  { icon: 'devicon-github-original',    label: 'GitHub' },
];

function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>Stack</span>
          <span className={styles.secSub}>primary · tools</span>
        </div>
        <div className={styles.grid}>
          {skills.map((skill) => (
            <div
              key={skill.label}
              className={`${styles.item} ${skill.main ? styles.main : ''}`}
            >
              <i className={skill.icon} aria-hidden="true" />
              <span>{skill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
