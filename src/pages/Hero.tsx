import { useTyping } from '../hooks/useTyping';
import franImg from '../assets/fran.jpg';
import styles from './Hero.module.css';

const roles = ['Front-end Developer', 'Problem Solver', 'Builder', 'Learner'];

function Hero() {
  const typed = useTyping(roles);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing} aria-hidden="true" />
          <img src={franImg} alt="Fran" className={styles.avatar} />
          <div className={styles.avatarDot} aria-hidden="true" />
        </div>

        <div className={styles.text}>
          <div className={styles.badge}>
            <span>Open to internship · 2025</span>
          </div>
          <h1 className={styles.heading}>
            Hi, I'm <em className={styles.accent}>Fran</em>.
          </h1>
          <p className={styles.role} aria-label={typed}>
            <span aria-hidden="true">{typed}</span>
            <span className={styles.caret} aria-hidden="true" />
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
