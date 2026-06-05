import TechBadge from '../TechBadge/TechBadge';
import githubIcon from '../../assets/icons/github.svg';
import styles from './CompactCard.module.css';

interface Props {
  title: string;
  description: string;
  tag: string;
  techs: string[];
  githubUrl: string;
  liveUrl?: string;
  thumbnail?: string;
}

function CompactCard({ title, description, techs, githubUrl, liveUrl, thumbnail }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.thumb}>
        {thumbnail
          ? <img src={thumbnail} alt={title} className={styles.thumbImg} />
          : <span className={styles.thumbLabel}>{title}</span>
        }
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.badges}>
          {techs.map((t) => (
            <TechBadge key={t} tech={t} className={styles.badge} />
          ))}
        </div>

        <div className={styles.links}>
          <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.lbtn} aria-label="GitHub">
            <img src={githubIcon} alt="" aria-hidden="true" className={styles.linkIcon} />
            GitHub
          </a>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className={`${styles.lbtn} ${styles.lbtnAcc}`} aria-label="Live demo">
              Live demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompactCard;
