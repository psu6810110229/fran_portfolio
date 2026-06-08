import { motion } from 'motion/react';
import { useLanguage } from '../hooks/useLanguage';
import capacitorIcon from '../assets/icons/capacitor.svg';
import pwaIcon from '../assets/icons/pwa.svg';
import styles from './Skills.module.css';

interface Tech {
  label: string;
  icon?: string;
  imgIcon?: string;
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
        label: 'Frontend',
        primary: true,
        items: [
          { label: 'React', icon: 'devicon-react-original' },
          { label: 'TypeScript', icon: 'devicon-typescript-plain' },
          { label: 'JavaScript', icon: 'devicon-javascript-plain' },
          { label: 'HTML', icon: 'devicon-html5-plain' },
          { label: 'CSS', icon: 'devicon-css3-plain' },
          { label: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
          { label: 'Vite', icon: 'devicon-vitejs-plain' },
        ],
      },
      {
        label: 'Backend',
        items: [
          { label: 'Supabase', icon: 'devicon-supabase-plain' },
          { label: 'Firebase', icon: 'devicon-firebase-plain' },
          { label: 'MySQL', icon: 'devicon-mysql-plain' },
          { label: 'Redis', icon: 'devicon-redis-plain' },
        ],
      },
      {
        label: 'DevOps & Tools',
        items: [
          { label: 'Git', icon: 'devicon-git-plain' },
          { label: 'GitHub', icon: 'devicon-github-original' },
          { label: 'Docker', icon: 'devicon-docker-plain' },
          { label: 'AWS EC2', icon: 'devicon-amazonwebservices-plain' },
          { label: 'Capacitor', imgIcon: capacitorIcon },
          { label: 'PWA', imgIcon: pwaIcon },
        ],
      },
    ],
  },
  th: {
    secTitle: 'ทักษะ',
    groups: [
      {
        label: 'Frontend',
        primary: true,
        items: [
          { label: 'React', icon: 'devicon-react-original' },
          { label: 'TypeScript', icon: 'devicon-typescript-plain' },
          { label: 'JavaScript', icon: 'devicon-javascript-plain' },
          { label: 'HTML', icon: 'devicon-html5-plain' },
          { label: 'CSS', icon: 'devicon-css3-plain' },
          { label: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
          { label: 'Vite', icon: 'devicon-vitejs-plain' },
        ],
      },
      {
        label: 'Backend',
        items: [
          { label: 'Supabase', icon: 'devicon-supabase-plain' },
          { label: 'Firebase', icon: 'devicon-firebase-plain' },
          { label: 'MySQL', icon: 'devicon-mysql-plain' },
          { label: 'Redis', icon: 'devicon-redis-plain' },
        ],
      },
      {
        label: 'DevOps & Tools',
        items: [
          { label: 'Git', icon: 'devicon-git-plain' },
          { label: 'GitHub', icon: 'devicon-github-original' },
          { label: 'Docker', icon: 'devicon-docker-plain' },
          { label: 'AWS EC2', icon: 'devicon-amazonwebservices-plain' },
          { label: 'Capacitor', imgIcon: capacitorIcon },
          { label: 'PWA', imgIcon: pwaIcon },
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
    <motion.section id="skills" className={styles.skills} {...revealProps}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          {c.groups.map((group) => (
            <div key={group.label} className={styles.col}>
              <span className={styles.groupLabel}>{group.label}</span>
              <div className={styles.primaryChips}>
                {group.items.map((tech) => (
                  <span key={tech.label} className={styles.chipPrimary}>
                    {tech.imgIcon && <img src={tech.imgIcon} alt="" aria-hidden="true" className={styles.chipImg} />}
                    {tech.icon && <i className={`${tech.icon} colored`} aria-hidden="true" />}
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
