import styles from './About.module.css';

const snapshot = [
  { label: 'Studying', value: 'Computer Eng.', sub: 'Year 1 · PSU' },
  { label: 'Focus', value: 'Front-end', sub: 'React · TypeScript' },
  { label: 'Based in', value: 'Hat Yai', sub: 'Songkhla, TH' },
];

function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.snapshot}>
        <div className={styles.snapshotInner}>
          {snapshot.map((item) => (
            <div key={item.label} className={styles.snapItem}>
              <span className={styles.snapLabel}>{item.label}</span>
              <p className={styles.snapVal}>
                <strong>{item.value}</strong><br />{item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.secHeader}>
          <span className={styles.secTitle}>About</span>
        </div>
        <div className={styles.content}>
          <p className={styles.bio}>
            I'm a first-year Computer Engineering student at Prince of Songkla University (PSU),
            Hat Yai. I build front-end interfaces with React and TypeScript — focused on clean,
            minimal UI that actually works.
          </p>
          <p className={styles.bio}>
            Outside of class I'm exploring web performance, design systems, and picking up
            new tools. I'm currently open to internship opportunities where I can contribute
            and keep learning.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
