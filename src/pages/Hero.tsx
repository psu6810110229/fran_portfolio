import { useTyping } from '../hooks/useTyping';
import styles from './Hero.module.css';

const roles = ['Front-end Developer', 'Problem Solver', 'Builder', 'Learner'];

function Hero() {
  const typed = useTyping(roles);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing} />
          <div className={styles.avatar}>F</div>
          <div className={styles.avatarDot} />
        </div>

        <div className={styles.text}>
          <div className={styles.badge}>
            <span>Open to internship · 2025</span>
          </div>
          <h1 className={styles.heading}>
            Hi, I'm <em className={styles.accent}>Fran</em>.
          </h1>
          <p className={styles.role}>
            {typed}<span className={styles.caret} />
          </p>
          <div className={styles.btns}>
            <a href="#projects" className={styles.btnPrimary}>View Projects</a>
            <a href="#contact" className={styles.btnGhost}>Say hello →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
