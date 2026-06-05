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
  onOpenGallery?: () => void;
  onOpenCase?: () => void;
  caseLabel?: string;
}

function CompactCard({ title, description, techs, githubUrl, liveUrl, thumbnail, onOpenGallery, onOpenCase, caseLabel }: Props) {
  const thumbInner = thumbnail
    ? <img src={thumbnail} alt={title} className={styles.thumbImg} />
    : <span className={styles.thumbLabel}>{title}</span>;

  return (
    <div className={styles.card}>
      {onOpenGallery ? (
        <button
          type="button"
          className={`${styles.thumb} ${styles.thumbButton}`}
          onClick={onOpenGallery}
          aria-label={`${title} — open preview gallery`}
        >
          {thumbInner}
          <span className={styles.playBadge} aria-hidden="true">▶</span>
        </button>
      ) : (
        <div className={styles.thumb}>{thumbInner}</div>
      )}

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
          {onOpenCase && (
            <button type="button" className={`${styles.lbtn} ${styles.lbtnAcc}`} onClick={onOpenCase}>
              {caseLabel ?? 'More details'}
            </button>
          )}
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
