import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Skills.module.css';

interface Skill {
  icon: string;
  label: string;
}

const primary: Skill[] = [
  { icon: 'devicon-react-original',   label: 'React' },
  { icon: 'devicon-typescript-plain', label: 'TypeScript' },
  { icon: 'devicon-vitejs-plain',     label: 'Vite' },
  { icon: 'devicon-css3-plain',       label: 'CSS' },
];

const tools: Skill[] = [
  { icon: 'devicon-mysql-plain',      label: 'SQL' },
  { icon: 'devicon-docker-plain',     label: 'Docker' },
  { icon: 'devicon-git-plain',        label: 'Git' },
  { icon: 'devicon-github-original',  label: 'GitHub' },
];

function Skills() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const { lang } = useLanguage();

  return (
    <section
      id="skills"
      className={`${styles.skills} reveal ${isVisible ? 'show' : ''}`}
      ref={ref}
    >
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>{lang === 'th' ? 'ทักษะ' : 'Stack'}</span>
        </div>

        <div className={styles.section}>
          <span className={styles.rowLabel}>Primary Stack</span>
          <div className={styles.grid}>
            {primary.map((skill) => (
              <div key={skill.label} className={styles.item}>
                <i className={`${skill.icon} ${styles.iconPrimary}`} aria-hidden="true" />
                <span>{skill.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.rowLabel}>Tools & Others</span>
          <div className={styles.grid}>
            {tools.map((skill) => (
              <div key={skill.label} className={styles.item}>
                <i className={`${skill.icon} ${styles.iconTool}`} aria-hidden="true" />
                <span>{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
