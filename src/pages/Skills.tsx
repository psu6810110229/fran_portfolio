import { motion } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Skills.module.css';

interface Tech {
  label: string;
  icon?: string;
}

interface Group {
  label: string;
  primary?: boolean;
  items: Tech[];
}

const groups: Record<'en' | 'th', { secTitle: string; groups: Group[] }> = {
  en: {
    secTitle: 'Stack',
    groups: [
      {
        label: 'Interface',
        primary: true,
        items: [
          { label: 'React', icon: 'devicon-react-original' },
          { label: 'TypeScript', icon: 'devicon-typescript-plain' },
          { label: 'Vite', icon: 'devicon-vitejs-plain' },
          { label: 'CSS', icon: 'devicon-css3-plain' },
        ],
      },
      {
        label: 'Data & APIs',
        items: [
          { label: 'REST APIs' },
          { label: 'SQL', icon: 'devicon-mysql-plain' },
        ],
      },
      {
        label: 'Ship & collaborate',
        items: [
          { label: 'Git', icon: 'devicon-git-plain' },
          { label: 'GitHub', icon: 'devicon-github-original' },
          { label: 'Docker', icon: 'devicon-docker-plain' },
        ],
      },
    ],
  },
  th: {
    secTitle: 'ทักษะ',
    groups: [
      {
        label: 'หน้าจอผู้ใช้',
        primary: true,
        items: [
          { label: 'React', icon: 'devicon-react-original' },
          { label: 'TypeScript', icon: 'devicon-typescript-plain' },
          { label: 'Vite', icon: 'devicon-vitejs-plain' },
          { label: 'CSS', icon: 'devicon-css3-plain' },
        ],
      },
      {
        label: 'ข้อมูลและ API',
        items: [
          { label: 'REST APIs' },
          { label: 'SQL', icon: 'devicon-mysql-plain' },
        ],
      },
      {
        label: 'ส่งมอบและทำงานร่วมกัน',
        items: [
          { label: 'Git', icon: 'devicon-git-plain' },
          { label: 'GitHub', icon: 'devicon-github-original' },
          { label: 'Docker', icon: 'devicon-docker-plain' },
        ],
      },
    ],
  },
};

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function Skills() {
  const { lang } = useLanguage();
  const c = groups[lang];

  return (
    <motion.section
      id="skills"
      className={styles.skills}
      {...revealProps}
    >
      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>{c.secTitle}</span>
        </div>

        <div className={styles.groups}>
          {c.groups.map((group) => (
            <div key={group.label} className={styles.group}>
              <span className={styles.groupLabel}>{group.label}</span>
              <div className={styles.chips}>
                {group.items.map((tech) => (
                  <span
                    key={tech.label}
                    className={`${styles.chip} ${group.primary ? styles.chipPrimary : ''}`}
                  >
                    {tech.icon && <i className={tech.icon} aria-hidden="true" />}
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Skills;
