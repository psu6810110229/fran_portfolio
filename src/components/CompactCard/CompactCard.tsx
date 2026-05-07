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

function CompactCard({ title, description, tag, techs, githubUrl, liveUrl, thumbnail }: Props) {
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
            <span key={t} className={styles.badge}>{t}</span>
          ))}
        </div>

        <div className={styles.links}>
          <a href={githubUrl} target="_blank" rel="noreferrer" className={styles.lbtn} aria-label="GitHub">
            <i className="devicon-github-original" aria-hidden="true" />
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
