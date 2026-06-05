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
          { label: 'Supabase', icon: 'devicon-supabase-plain' },
          { label: 'Firebase', icon: 'devicon-firebase-plain' },
          { label: 'REST APIs' },
          { label: 'SQL', icon: 'devicon-mysql-plain' },
        ],
      },
      {
        label: 'Mobile',
        items: [
          { label: 'Capacitor', imgIcon: capacitorIcon },
          { label: 'PWA', imgIcon: pwaIcon },
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
          { label: 'Supabase', icon: 'devicon-supabase-plain' },
          { label: 'Firebase', icon: 'devicon-firebase-plain' },
          { label: 'REST APIs' },
          { label: 'SQL', icon: 'devicon-mysql-plain' },
        ],
      },
      {
        label: 'Mobile',
        items: [
          { label: 'Capacitor', imgIcon: capacitorIcon },
          { label: 'PWA', imgIcon: pwaIcon },
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

  const primary = c.groups.find((g) => g.primary)!;
  const secondary = c.groups.filter((g) => !g.primary);

  return (
    <motion.section id="skills" className={styles.skills} {...revealProps}>
      <div className={styles.inner}>
        <div className={styles.layout}>

          <div className={styles.zonePrimary}>
            <span className={styles.groupLabel}>{primary.label}</span>
            <div className={styles.primaryChips}>
              {primary.items.map((tech) => (
                <span key={tech.label} className={styles.chipPrimary}>
                  {tech.icon && <i className={tech.icon} aria-hidden="true" />}
                  {tech.label}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.zoneSecondary}>
            {secondary.map((group) => (
              <div key={group.label} className={styles.secondaryGroup}>
                <span className={styles.groupLabel}>{group.label}</span>
                <div className={styles.chips}>
                  {group.items.map((tech) => (
                    <span key={tech.label} className={styles.chip}>
                      {tech.imgIcon && <img src={tech.imgIcon} alt="" aria-hidden="true" className={styles.chipImg} />}
                      {tech.icon && <i className={tech.icon} aria-hidden="true" />}
                      {tech.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}

export default Skills;
