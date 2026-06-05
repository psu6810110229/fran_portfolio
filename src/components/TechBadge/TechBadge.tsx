import reactIcon from '../../assets/react.svg';
import viteIcon from '../../assets/vite.svg';
import capacitorIcon from '../../assets/icons/capacitor.svg';
import cssIcon from '../../assets/icons/css.svg';
import dockerIcon from '../../assets/icons/docker.svg';
import fcmIcon from '../../assets/icons/fcm.svg';
import gitIcon from '../../assets/icons/git.svg';
import kivyIcon from '../../assets/icons/kivy.svg';
import pwaIcon from '../../assets/icons/pwa.svg';
import pythonIcon from '../../assets/icons/python.svg';
import sqlIcon from '../../assets/icons/sql.svg';
import supabaseIcon from '../../assets/icons/supabase.svg';
import typescriptIcon from '../../assets/icons/typescript.svg';
import styles from './TechBadge.module.css';

const techIcons: Record<string, string> = {
  Capacitor: capacitorIcon,
  CSS: cssIcon,
  Docker: dockerIcon,
  FCM: fcmIcon,
  Git: gitIcon,
  Kivy: kivyIcon,
  PWA: pwaIcon,
  Python: pythonIcon,
  React: reactIcon,
  SQL: sqlIcon,
  Supabase: supabaseIcon,
  TypeScript: typescriptIcon,
  Vite: viteIcon,
};

interface Props {
  tech: string;
  className: string;
  iconClassName?: string;
}

const joinClasses = (...classNames: string[]) => classNames.filter(Boolean).join(' ');

function TechBadge({ tech, className, iconClassName = '' }: Props) {
  const icon = techIcons[tech];

  return (
    <span className={className}>
      {icon && <img src={icon} alt="" aria-hidden="true" className={joinClasses(styles.icon, iconClassName)} />}
      <span>{tech}</span>
    </span>
  );
}

export default TechBadge;
